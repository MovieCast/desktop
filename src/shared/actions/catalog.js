import { fetchMovies } from './entities';

export const SET_FILTER = 'SET_FILTER';
export const CATALOG_VIEW_LOADED = 'CATALOG_VIEW_LOADED';
export const CATALOG_VIEW_UNLOADED = 'CATALOG_VIEW_UNLOADED';

// Temp fix
export const resetResult = () => ({
  type: 'RESET_RESULT'
});

export const setFilter = (payload) => (dispatch) => {
  dispatch({
    type: SET_FILTER,
    payload
  });
  dispatch(fetchMovies());
};
