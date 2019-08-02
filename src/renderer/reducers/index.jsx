import {
  ADD_TAG,
  addTag,
  CHECK_TAG,
  checkTag,
  ADD_PAPER,
  addPaper
} from "../actions/index"

const initState = {
  selectedPapers: [],
  tags: [{ name: "unclassified", checked: true, childs: [], papers: [] }],
  papers: []
}

const updateSelectedPapers = (tags) => {
  const checkedTags = tags.filter((tag) => tag.checked)
  console.log(checkedTags)
  if (checkedTags.length == 0) return []
  const tagPapers = checkedTags.map((tag) => tag.papers)
  let newSelectedPapers = tagPapers[0]
  for (let i = 1; i < tagPapers.length; ++i) {
    newSelectedPapers = newSelectedPapers.filter(x => tagPapers[i].includes(x));
  }
  return newSelectedPapers
}

const checkTagReducer = (state, action) => {
  const newTags = state.tags.map(
    (tag) =>
      Object.assign({}, tag, {
        checked: tag.name === action.name ? !tag.checked : tag.checked
      })
  )
  return Object.assign({}, state, {
    selectedPapers: updateSelectedPapers(newTags),
    tags: newTags
  })
}

const addPaperReducer = (state, action) => {
  const newTags = state.tags.map(
    (tag) =>
      Object.assign({}, tag, {
        papers: tag.name !== "unclassified"
          ? tag.papers
          : [...tag.papers, action.name]
      })
  )
  const newPapers = [
    ...state.papers,
    {
      name: action.name,
      tags: ["unclassified"]
    }
  ]
  return Object.assign({}, state, {
    selectedPapers: updateSelectedPapers(newTags),
    tags: newTags,
    papers: newPapers
  })
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
      return checkTagReducer(state, action)
    case 'ADD_PAPER':
      return addPaperReducer(state, action)
    case 'ADD_TAG_TO_PAPER':
      return Object.assign({}, state, {
        papers: state.papers.map(
          (paper) =>
            Object.assign({}, paper, {
              tags: paper.path === action.name ? paper.tags.add(action.name) : paper.tags
            })
        )
      })
    default:
      return state
  }
}
