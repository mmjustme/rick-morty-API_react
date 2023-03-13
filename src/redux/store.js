import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { characterReducer, episodeReducer } from "./index";

const rootReducer = combineReducers({
  characterReducer,
  episodeReducer
});

const setupStore = () =>
  configureStore({
    reducer: rootReducer
  });

export { setupStore };
