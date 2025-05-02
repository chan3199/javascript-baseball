import {
  SHUFFLE_ARRAY,
  SHUFFLE_NUMBER,
  SLICE_MIN_NUMBER,
  SLICE_MAX_NUMBER,
} from "../constants.js";

export function getRandom() {
  return SHUFFLE_ARRAY.sort(() => Math.random() - SHUFFLE_NUMBER).slice(
    SLICE_MIN_NUMBER,
    SLICE_MAX_NUMBER
  );
}
