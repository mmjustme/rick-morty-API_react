import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { characterActions } from "../../redux";
import { Character } from "../Character/Character";

const Characters = () => {
  const { characters, next, prev, queryParams } = useSelector(
    (state) => state.characterReducer
  );
  // console.log(queryParams, "from Characters");
  const [query, setQuery] = useSearchParams({ page: "1" });

  const dispatch = useDispatch();

  useEffect(() => {
    const params = { ...queryParams, page: query.get("page") };
    if (queryParams) setQuery(params);

    dispatch(characterActions.allCharacters(params));
  }, [query]);

  const nextPage = () => {
    const next = +query.get("page") + 1;
    setQuery({ ...queryParams, page: `${next}` });
  };

  const prevPage = () => {
    const prev = +query.get("page") - 1;
    setQuery({ ...queryParams, page: `${prev}` });
  };

  return (
    <div>
      <div className={"charactersWrapper"}>
        {characters &&
          characters.map((character) => (
            <Character key={character.id} character={character} />
          ))}
      </div>
      <div className={"btnDiv"}>
        <button disabled={!prev} onClick={prevPage}>
          prev
        </button>
        <button disabled={!next} onClick={nextPage}>
          next
        </button>
      </div>
    </div>
  );
};

export { Characters };
