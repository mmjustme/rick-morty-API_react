import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { episodeService } from "../../services/episode.service";

const initialState = {
  episodes: [],
  episode: [],
  setEpisodeCharacters: [],
  error: null,
  queryParams: null,
  prev: null,
  next: null,
  isLoading: false,
  isLoadingEpisods: false,
  idsCharacters: [],
};

const allEpisodes = createAsyncThunk(
  "episodeSlice/allEpisodes",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await episodeService.allEpisodes(params);
      // console.log(data, "from episodeSlice/allEpisodes");
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const episodeById = createAsyncThunk(
  "episodeSlice/EpisodeById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await episodeService.episodeBiId(id);
      // console.log(data, "from episodeSlice/episodeById");
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const episodeCharacters = createAsyncThunk(
  "episodeSlice/episodeCharacters",
  async ({ ids }, { rejectWithValue }) => {
    try {
      const { data } = await episodeService.episodeCharaters(ids);
      // console.log(data, "episodeSlice/episodeCharacters");
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const episodeSlice = createSlice({
  name: "episodeSlice",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.queryParams = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allEpisodes.fulfilled, (state, action) => {
        state.episodes = action.payload.results;
        state.prev = action.payload.info.prev;
        state.next = action.payload.info.next;
      })
      .addCase(episodeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.episode = action.payload;
        for (const i in action.payload.characters) {
          state.idsCharacters.push(i.split("/").pop());
        }
      })
      .addCase(episodeById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(episodeCharacters.pending, (state) => {
        state.isLoadingEpisods = true;
      })
      .addCase(episodeCharacters.fulfilled, (state, action) => {
        state.isLoadingEpisods = false;
        state.setEpisodeCharacters = action.payload;
      })
      .addDefaultCase((state, action) => {
        const [type] = action.type.split("/").splice(-1);
        type === "rejected"
          ? (state.error = action.payload)
          : (state.error = null);
      });
  },
});

const {
  reducer: episodeReducer,
  actions: { setQuery, setLoading },
} = episodeSlice;

const episodeActions = {
  allEpisodes,
  setQuery,
  episodeById,
  episodeCharacters,
  setLoading,
};

export { episodeActions, episodeReducer };
