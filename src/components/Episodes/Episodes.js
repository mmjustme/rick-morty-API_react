import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { episodeActions } from "../../redux";
import { Episode } from "../Episode/Episode";

const Episodes = () => {
  const { episodes, queryParams, next, prev } = useSelector(
    (state) => state.episodeReducer
  );
  const [query, setQuery] = useSearchParams({ page: "1" });

  const dispatch = useDispatch();

  useEffect(() => {
    const params = { ...queryParams, page: query.get("page") };
    if (queryParams) setQuery(params);

    dispatch(episodeActions.allEpisodes(params));
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
        {episodes.map((episode) => (
          <Episode episode={episode} key={episode.id} />
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

export { Episodes };
