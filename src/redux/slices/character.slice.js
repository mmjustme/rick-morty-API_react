import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { characterService } from "../../services/character.service";

const initialState = {
  characters: [],
  character: [],
  characterEpisodes: [],
  isLoading: false,
  next: null,
  prev: null,
  error: null,
  queryParams: null,
  isL: false
};

const allCharacters = createAsyncThunk(
  "characterSlice/allCharacters",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await characterService.allCharacters(params);
      // console.log(data, "from characterSlice/allCharacters");
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const characterById = createAsyncThunk(
  "characterSlice/characterById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await characterService.singleCharacter(id);
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const characterEpisodes = createAsyncThunk(
  "characterSlice/characterEpisodes",
  async ({ ids }, { rejectWithValue }) => {
    try {
      const { data } = await characterService.getCharacterEpisodes(ids);

      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const characterSlice = createSlice({
  name: "characterSlice",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.queryParams = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(allCharacters.fulfilled, (state, action) => {
        state.characters = action.payload.results;
        state.prev = action.payload.info.prev;
        state.next = action.payload.info.next;
      })
      .addCase(characterById.fulfilled, (state, action) => {       
        state.isLoading = false;
        state.character = action.payload;
      })
      .addCase(characterById.pending, (state) => {
        state.isLoading = true;        
      })

      .addCase(characterEpisodes.fulfilled, (state, action) => {
        if (!Array.isArray(action.payload)) {
          const array = [];
          array.push(action.payload);
          state.characterEpisodes = array;
        } else {
          state.characterEpisodes = action.payload;
        }
      })

      .addDefaultCase((state, action) => {
        const [type] = action.type.split("/").splice(-1);
        type === "rejected"
          ? (state.error = action.payload)
          : (state.error = null);
      });
  }
});

const {
  reducer: characterReducer,
  actions: { setQuery }
} = characterSlice;

const characterActions = {
  allCharacters,
  characterById,
  characterEpisodes,
  setQuery
};

export { characterReducer, characterActions };
