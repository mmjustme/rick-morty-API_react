import { urls } from "../constants/urls";
import { axiosService } from "./axios.service";

const characterService = {
  allCharacters: (params) => axiosService.get(urls.characters, { params }),

  singleCharacter: (id) => axiosService.get(`${urls.characters}/${id}`),

  getCharacterEpisodes: (ids) => axiosService.get(`${urls.episodes}/${ids}`),

  getCharackterByparams: (filter) =>
    axiosService.get(urls.characters, { params: filter })
};

export { characterService };
