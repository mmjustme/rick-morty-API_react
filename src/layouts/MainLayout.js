import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Header } from "../components";

const MainLayout = () => {
  const { error } = useSelector((state) => state.characterReducer);
  return (
    <div className={"mainWrapper"}>
      <Header />
      {error && JSON.stringify(error)}
      <div className={"outlet"}>
        <Outlet />
      </div>
    </div>
  );
};

export { MainLayout };
