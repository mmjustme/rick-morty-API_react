import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={"headerWrapper"}>
      <div className={"headerContent"}>
        <div className={"headerLogo"}>
          <Link to={"/character"}>
            <img src={"logo.png"} alt="logo" />
          </Link>
        </div>
        <div className={"header_btnMenu"}>
          <button onClick={() => navigate("/character")}>Characters</button>
          <button onClick={() => navigate("/episode")}>Episodes</button>
        </div>
      </div>
    </div>
  );
};

export { Header };
