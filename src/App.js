import "./AppStyle.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import {
  CharactersPage,
  CharacterDetailsPage,
  EpisodesPage,
  EpisodeDetailsPage
} from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path={""} element={<MainLayout />}>
        <Route index element={<Navigate to={"/character"} />} />
        <Route path={"character"} element={<CharactersPage />} />
        <Route path={"character/:id"} element={<CharacterDetailsPage />} />
        <Route path={"episode"} element={<EpisodesPage />} />
        <Route path={"episode/:episodeId"} element={<EpisodeDetailsPage />} />
      </Route>
    </Routes>
  );
};

export { App };
