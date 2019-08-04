import Store from "electron-store"

const store = new Store({
  defaults: {
    tags: [{
      name: "unclassified",
      checked: true,
      childs: [],
      papers: []
    }],
    papers: []
  }
})

const updateSelectedPapers = (tags) => {
  /* Calculater intersection of the papers in the checked tags */
  const checkedTags = tags.filter((tag) => tag.checked)
  if (checkedTags.length == 0) return []
  return checkedTags.map((tag) => tag.papers).reduce((acc, cur) => acc.filter(x => cur.includes(x)))
}

const initState = {
  tags: store.get("tags"),
  papers: store.get("papers"),
  selectedPapers: updateSelectedPapers(store.get("tags")),
  currentPaper: ""
}

const addTag = (state, action) => {
  const newTags = [...state.tags, {
    name: action.name,
    checked: false,
    childs: [],
    papers: []
  }]
  store.set("tags", newTags)
  return Object.assign({}, state, {
    tags: newTags
  })
}

const checkTag = (state, action) => {
  const newTags = state.tags.map((tag) =>
    Object.assign({}, tag, {
      checked: tag.name === action.name ? !tag.checked : tag.checked
    })
  )
  store.set("tags", newTags)
  const newSelectedPapers = updateSelectedPapers(newTags)
  return Object.assign({}, state, {
    tags: newTags,
    selectedPapers: newSelectedPapers,
    currentPaper: newSelectedPapers.includes(state.currentPaper) ? state.currentPaper : ""
  })
}

const addPaper = (state, action) => {
  const paperNames = state.papers.map((paper) => paper.name)
  if (paperNames.includes(action.name)) {
    return state
  }
  const newTags = state.tags.map((tag) => Object.assign({}, tag, {
    papers: tag.name !== "unclassified"
      ? tag.papers
      : [...tag.papers, action.name]
  }))
  const newPapers = [...state.papers, {
    name: action.name,
    tags: ["unclassified"]
  }]
  const newSelectedPapers = updateSelectedPapers(newTags)
  store.set("tags", newTags)
  store.set("papers", newPapers)
  return Object.assign({}, state, {
    tags: newTags,
    papers: newPapers,
    selectedPapers: newSelectedPapers
  })
}

const addTagToPaper = (state, action) => {
  const newPapers = state.papers.map((paper) => Object.assign({}, paper, {
    tags: paper.path === action.name ? paper.tags.add(action.name) : paper.tags
  }))
  store.set("papers", newPapers)
  return Object.assign({}, state, {
    papers: newPapers
  })
}

const selectPaper = (state, action) => {
  return Object.assign({}, state, {
    currentPaper: action.name
  })
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case 'ADD_TAG':
      return addTag(state, action)
    case 'CHECK_TAG':
      return checkTag(state, action)
    case 'ADD_PAPER':
      return addPaper(state, action)
    case 'ADD_TAG_TO_PAPER':
      return addTagToPaper(state, action)
    case 'SELECT_PAPER':
      return selectPaper(state, action)
    default:
      return state
  }
}
