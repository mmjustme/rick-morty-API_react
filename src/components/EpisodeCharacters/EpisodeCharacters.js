import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { episodeActions } from "../../redux";
import { Character } from "../Character/Character";

const EpisodeCharacters = () => {
  const { setEpisodeCharacters, idsCharacters } = useSelector(
    (state) => state.episodeReducer
  );
  const { episodeId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(episodeActions.episodeCharacters({ ids: idsCharacters }));
  }, [episodeId]);

  return (
    <div className={"charactersWrapper"}>
      {setEpisodeCharacters &&
        setEpisodeCharacters.map((item) => (
          <Character character={item} key={item.id} />
        ))}
    </div>
  );
};

export { EpisodeCharacters };
