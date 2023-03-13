import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Character = ({ character }) => {
  const { name, image, id, status } = character;

  return (
    <Link to={`/character/${id}`}>
      <div className={"single_characterWrapper"}>
        {/* <img src={image} alt={`logo`} loading="lazy" /> */}
        <div>
          <LazyLoadImage
            alt={"hero"}
            key={id}
            height={100}
            width={100}
            src={image}
            effect="blur"
            placeholderSrc={image}
            className={"img"}
          />
        </div>
        <div className={"characterTittle"}>
          <h2>{name}</h2>
          <span>{status}</span>
        </div>
      </div>
    </Link>
  );
};

export { Character };
