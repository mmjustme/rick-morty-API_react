import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { characterActions } from "../../redux";
import { CharacterEpisodes } from "../CharacterEpisodes/CharacterEpisodes";

const CharacterDetails = () => {
  const { character, isLoading } = useSelector(
    (state) => state.characterReducer
  );

  const {
    name,
    image,
    status,
    gender,
    species,
    location,
    origin,
    episode
  } = character;

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(characterActions.characterById({ id }));
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const arrayIds = [];

  for (const e in episode) {
    const ids = episode[e].split("/").pop();
    arrayIds.push(ids);
  }

  return (
    <div>
      <div className={"singleCharacterEpisodes"}>
        <img src={image} alt={"logo"} />
        <div className={"singleCharacterEpisodes_infoBlock"}>
          <h3>{name}</h3>
          <div>
            {species} - {gender} - {status}
          </div>
          <div className={"orignDiv"}>Origin: {origin && origin.name}</div>
          <div>Location: {location && character.location.name}</div>
        </div>
      </div>
      <div className={"episodesCharacter"}>
        <h2>Episodes with hero:</h2>
        <CharacterEpisodes ids={arrayIds} id={character.id} key={id} />
      </div>
    </div>
  );
};

export { CharacterDetails };
