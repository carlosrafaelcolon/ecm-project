
import { COMMENTS_SEARCH_TERM, RESET_SEARCH_TERM } from '../type';

export const updateSearchTerm = term => {
  return {
    type: COMMENTS_SEARCH_TERM,
    payload: term
  };
};
export const onTermReset = () => {
  return {
    type: RESET_SEARCH_TERM
  };
};