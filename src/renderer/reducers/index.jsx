import { ADD_TAG, addTag } from "../actions/index"

const initState = {
  tags: [],
  papers: []
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case 'ADD_TAG':
      return Object.assign({}, state, {
        tags: [
          ...state.tags,
          {
            name: action.name,
            childs: [],
            papers: []
          }
        ]
      })
    default:
      return state
  }
}
