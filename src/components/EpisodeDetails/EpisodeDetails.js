import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { episodeActions } from "../../redux";
import { EpisodeCharacters } from "../EpisodeCharacters/EpisodeCharacters";

const EpisodeDetails = () => {
  const { episode, isLoading } = useSelector((state) => state.episodeReducer);

  const dispatch = useDispatch();
  const { episodeId } = useParams();
  const { characters } = episode;

  useEffect(() => {
    dispatch(episodeActions.episodeById({ id: episodeId }));
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {
        <div className={"episode_infoBlock"}>
          <h2>{episode.name}</h2>
          <div>{episode.episode}</div>
          <div>Air date: {episode.air_date}</div>
        </div>
      }

      <div className={"episodesCharacter"}>
        <h2>Characters in episode:</h2>
        {characters && <EpisodeCharacters />}
      </div>
    </div>
  );
};

export { EpisodeDetails };
