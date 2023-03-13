import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { episodeActions } from "../../redux/slices/episode.slice";

import { EpisodeCharacters } from "../EpisodeCharacters/EpisodeCharacters";

const EpisodeDetails = () => {
  const { episode, isLoading } = useSelector((state) => state.episodeReducer);
  const dispatch = useDispatch();
  const { episodeId } = useParams();
  const { characters } = episode;

  useEffect(() => {
    dispatch(episodeActions.episodeById({ id: episodeId }));
  }, []);

  const idsArray = [];

  if (!isLoading) {
    return <h1>Loading...</h1>;
  } else {
    for (const i of characters) {
      idsArray.push(i.split("/").pop());
    }
  }

  return (
    <div>
      <div className={"episode_infoBlock"}>
        <h2>{episode.name}</h2>
        <div>{episode.episode}</div>
        <div>Air date: {episode.air_date}</div>
      </div>

      <div className={"episodesCharacter"}>
        <h2>Characters in episode:</h2>

        {episode && <EpisodeCharacters arrayIds={idsArray} id={episodeId} />}
      </div>
    </div>
  );
};

export { EpisodeDetails };
