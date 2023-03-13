import { Link } from "react-router-dom";

const Episode = ({ episode }) => {
  return (
    <Link to={`/episode/${episode.id}`}>
      <div className={"episodeWrapper"}>
        <div>
          <h4>{episode.name}</h4>
          {episode.episode}
        </div>
        <div>Air date: {episode.air_date}</div>
      </div>
    </Link>
  );
};

export { Episode };
