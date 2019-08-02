import {
  ADD_TAG,
  addTag,
  CHECK_TAG,
  checkTag
} from "../actions/index"

const initState = {
  currentPaperList: new Set(),
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
            checked: false,
            childs: [],
            papers: []
          }
        ]
      })
    case 'CHECK_TAG':
      return Object.assign({}, state, {
        tags: state.tags.map(
          (tag) =>
            Object.assign({}, tag, {
              checked: (tag.name === action.name ? !tag.checked : tag.checked)
            })
        ),
        currentPaperList: new Set(state.tags.flatMap(
          (tag) => tag.papers
        ))
      })
    default:
      return state
  }
}
