import { urls } from "../constants";
import { axiosService } from "./axios.service";

const episodeService = {
  allEpisodes: (params) => axiosService.get(urls.episodes, { params }),
  episodeBiId: (id) => axiosService.get(`${urls.episodes}/${id}`),
  episodeCharaters: (ids) => axiosService.get(`${urls.characters}/${ids}`)
};

export { episodeService };
