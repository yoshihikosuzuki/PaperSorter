export const ADD_TAG = "ADD_TAG"
/*export const CHECK_TAG = "CHECK_TAG"
export const LOAD_TAG_LIST = "LOAD_TAG_LIST"
export const ADD_PAPER = "ADD_PAPER"
export const ADD_TAG_TO_PAPER = "ADD_TAG_TO_PAPER"
export const LOAD_PAPER_LIST = "LOAD_PAPER_LIST"*/

export function addTag(name) {
  return ({
    type: ADD_TAG,
    name
  })
}