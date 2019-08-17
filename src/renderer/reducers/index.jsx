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

const updateFilteredPapers = (tags, papers) => {
  /* Calculate intersection of the papers in the checked tags */
  const checkedTags = tags.filter((tag) => tag.checked)
  return checkedTags.length == 0
    ? papers.map(paper => paper.name)
    : checkedTags.map((tag) => tag.papers).reduce((acc, cur) => acc.filter(x => cur.includes(x)))
}

const initState = {
  tags: store.get("tags"),
  papers: store.get("papers"),
  filteredPapers: updateFilteredPapers(store.get("tags"), store.get("papers")),
  selectedPaper: ""
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
  const newTags = state.tags.map(tag => Object.assign({}, tag, {
    checked: tag.name === action.name ? !tag.checked : tag.checked
  })
  )
  store.set("tags", newTags)
  const newFilteredPapers = updateFilteredPapers(newTags, state.papers)
  return Object.assign({}, state, {
    tags: newTags,
    filteredPapers: newFilteredPapers,
    selectedPaper: newFilteredPapers.includes(state.selectedPaper) ? state.selectedPaper : ""
  })
}

const deleteTags = (state, action) => {
  console.log(action.names)
  const newTags = state.tags.filter(tag => !action.names.includes(tag.name))
  const newPapers = state.papers.map(paper => Object.assign({}, paper, {
    tags: paper.tags.filter(tagName => !action.names.includes(tagName))   // TODO: set ["unclassified"] if tags become empty
  }))
  store.set("tags", newTags)
  store.set("papers", newPapers)
  const newFilteredPapers = updateFilteredPapers(newTags, newPapers)
  return Object.assign({}, state, {
    tags: newTags,
    papers: newPapers,
    filteredPapers: newFilteredPapers,
    selectedPaper: newFilteredPapers.includes(state.selectedPaper) ? state.selectedPaper : ""
  })
}

const addPapers = (state, action) => {
  const registeredPapers = state.papers.map(paper => paper.name)
  const notRegisteredPapers = action.paperNames.filter(paperName => !registeredPapers.includes(paperName))
  if (notRegisteredPapers.length == 0) {
    return state
  }
  const newTags = state.tags.map((tag) => Object.assign({}, tag, {
    papers: tag.name !== "unclassified"
      ? tag.papers
      : [...tag.papers, ...notRegisteredPapers]
  }))
  const newPapers = [...state.papers, ...notRegisteredPapers.map(paperName => ({
    name: paperName,
    tags: ["unclassified"]
  }))]
  const newFilteredPapers = updateFilteredPapers(newTags, newPapers)
  store.set("tags", newTags)
  store.set("papers", newPapers)
  return Object.assign({}, state, {
    tags: newTags,
    papers: newPapers,
    filteredPapers: newFilteredPapers
  })
}

const selectPaper = (state, action) => {
  return Object.assign({}, state, {
    selectedPaper: action.name
  })
}

const deletePaper = (state) => {
  const newTags = state.tags.map(tag => Object.assign({}, tag, {
    papers: tag.papers.filter(paperName => paperName !== state.selectedPaper)
  }))
  const newPapers = state.papers.filter(paper => paper.name !== state.selectedPaper)
  const newFilteredPapers = state.filteredPapers.filter(paperName => paperName !== state.selectedPaper)
  store.set("tags", newTags)
  store.set("papers", newPapers)
  return Object.assign({}, state, {
    tags: newTags,
    papers: newPapers,
    filteredPapers: newFilteredPapers,
    selectedPaper: ""
  })
}

const editPaperTags = (state, action) => {
  const newTags = state.tags.map(tag => Object.assign({}, tag, {
    papers: action.checkedTags.includes(tag.name)
      ? Array.from(new Set([...tag.papers, action.paperName]))
      : tag.papers.filter(paperName => paperName !== action.paperName)
  }))
  const newPapers = state.papers.map(paper => Object.assign({}, paper, {
    tags: action.checkedTags
  }))
  store.set("tags", newTags)
  store.set("papers", newPapers)
  return Object.assign({}, state, {
    tags: newTags,
    papers: newPapers
  })
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case 'ADD_TAG':
      return addTag(state, action)
    case 'CHECK_TAG':
      return checkTag(state, action)
    case 'DELETE_TAGS':
      return deleteTags(state, action)
    case 'ADD_PAPERS':
      return addPapers(state, action)
    case 'SELECT_PAPER':
      return selectPaper(state, action)
    case 'DELETE_PAPER':
      return deletePaper(state)
    case 'EDIT_PAPER_TAGS':
      return editPaperTags(state, action)
    default:
      return state
  }
}
