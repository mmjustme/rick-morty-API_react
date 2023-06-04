import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { episodeActions } from "../../redux";
import { Character } from "../Character/Character";

const EpisodeCharacters = ({ arrayIds }) => {
  const { setEpisodeCharacters, isLoading } = useSelector(
    (state) => state.episodeReducer
  );
  const { episodeId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(episodeActions.episodeCharacters({ ids: arrayIds }));
  }, [episodeId]);

  if (!isLoading) {
    return <h1>Waite a sek..</h1>;
  }

  return (
    <div className={"charactersWrapper"}>
      {setEpisodeCharacters &&
        setEpisodeCharacters.map((c) => <Character character={c} key={c.id} />)}
    </div>
  );
};

export { EpisodeCharacters };
