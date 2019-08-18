import Store from "electron-store"

const store = new Store({
  defaults: {
    tags: [
      {
        name: "# file status",
        checked: false,
        children: [
          {
            name: "unclassified",
            checked: true,
            children: [],
            papers: []
          },
          {
            name: "unread",
            checked: false,
            children: [],
            papers: []
          },
          {
            name: "read",
            checked: false,
            children: [],
            papers: []
          }
        ],
        papers: []
      }
    ],
    papers: []
  }
})

const flattenTags = (tags) => {
  /* Flatten tag tree (in order of DFS) */
  return tags.map(tag => [tag, ...flattenTags(tag.children)]).flat()
}

const updateFilteredPapers = (tags, papers) => {
  /* Calculate intersection of the papers in the checked tags */
  const checkedTags = flattenTags(tags).filter(tag => tag.checked)
  return checkedTags.length == 0
    ? papers.map(paper => paper.name)
    : checkedTags.map(tag => tag.papers).reduce((acc, cur) => acc.filter(x => cur.includes(x)))
}

const initState = {
  tags: store.get("tags"),
  papers: store.get("papers"),
  filteredPapers: updateFilteredPapers(store.get("tags"), store.get("papers")),
  selectedPaper: ""
}

const _doesExists = (tag, tagName) => {
  if (tag.name === tagName) {
    return true
  }
  for (const childTag of tag.children) {
    if (_doesExists(childTag, tagName)) {
      return true
    }
  }
  return false
}

const doesExists = (tags, tagName) => {
  for (const tag of tags) {
    if (_doesExists(tag, tagName)) {
      return true
    }
  }
  return false
}

const sortTags = (tags) => {
  return tags.sort((a, b) => {
    const nameA = a.name.toUpperCase()
    const nameB = b.name.toUpperCase()
    return nameA < nameB ? -1 : (nameA > nameB ? 1 : 0)
  })
}

const _addTag = (tag, tagName, parentTagName) => {
  return Object.assign({}, tag, {
    children: tag.name === parentTagName
      ? sortTags([...tag.children, {
        name: tagName,
        checked: false,
        children: [],
        papers: []
      }])
      : tag.children.map(childTag => _addTag(childTag, tagName, parentTagName))
  })
}

const addTag = (state, action) => {
  /* Add a tag as a child of the specified tag while keeping the name order sorted */
  if (doesExists(state.tags, action.tagName)) {
    return state
  }
  const newTags = action.parentTagName === ""
    ? sortTags([...state.tags, {
      name: action.tagName,
      checked: false,
      children: [],
      papers: []
    }])   // root tag
    : state.tags.map(tag => _addTag(tag, action.tagName, action.parentTagName))   // child tag
  store.set("tags", newTags)
  return Object.assign({}, state, {
    tags: newTags
  })
}

const _checkTag = (tag, tagName) => {
  return Object.assign({}, tag, {
    checked: tag.name === tagName ? !tag.checked : tag.checked,
    children: tag.children.map(childTag => _checkTag(childTag, tagName))
  })
}

const checkTag = (state, action) => {
  const newTags = state.tags.map(tag => _checkTag(tag, action.name))
  store.set("tags", newTags)
  const newFilteredPapers = updateFilteredPapers(newTags, state.papers)
  return Object.assign({}, state, {
    tags: newTags,
    filteredPapers: newFilteredPapers,
    selectedPaper: newFilteredPapers.includes(state.selectedPaper) ? state.selectedPaper : ""
  })
}

const _deleteTags = (tags, tagNames) => {
  return tags.filter(tag => !tagNames.includes(tag.name)).map(tag => Object.assign({}, tag, {
    children: _deleteTags(tag.children, tagNames)
  }))
}

const deleteTags = (state, action) => {
  /* Delete the tag(s) and all of its/their children tags */
  const newTags = _deleteTags(state.tags, action.names)
  const remainingTags = flattenTags(newTags)
  const newPapers = state.papers.map(paper => Object.assign({}, paper, {
    tags: paper.tags.filter(tagName => remainingTags.includes(tagName))
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

const _addPapers = (tag, paperNames) => {
  return Object.assign({}, tag, {
    papers: tag.name !== "unclassified"
      ? tag.papers
      : [...tag.papers, ...paperNames],
    children: tag.children.map(childTag => _addPapers(childTag, paperNames))
  })
}

const addPapers = (state, action) => {
  const registeredPapers = state.papers.map(paper => paper.name)
  const notRegisteredPapers = action.paperNames.filter(paperName => !registeredPapers.includes(paperName))
  if (notRegisteredPapers.length == 0) {
    return state
  }
  const newTags = state.tags.map(tag => _addPapers(tag, notRegisteredPapers))
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

const _deletePaper = (tag, selectedPaper) => {
  return Object.assign({}, tag, {
    papers: tag.papers.filter(paper => paper !== selectedPaper),
    children: tag.children.map(childTag => _deletePaper(childTag, selectedPaper))
  })
}

const deletePaper = (state) => {
  const newTags = state.tags.map(tag => _deletePaper(tag, state.selectedPaper))
  const newPapers = state.papers.filter(paper => paper.name !== state.selectedPaper)
  const newFilteredPapers = state.filteredPapers.filter(paper => paper !== state.selectedPaper)
  store.set("tags", newTags)
  store.set("papers", newPapers)
  return Object.assign({}, state, {
    tags: newTags,
    papers: newPapers,
    filteredPapers: newFilteredPapers,
    selectedPaper: ""
  })
}

const _editPaperTags = (tag, paperName, checkedTags) => {
  return Object.assign({}, tag, {
    papers: checkedTags.includes(tag.name)
      ? Array.from(new Set([...tag.papers, paperName]))
      : tag.papers.filter(paper => paper !== paperName),
    children: tag.children.map(childTag => _editPaperTags(childTag, paperName, checkedTags))
  })
}

const editPaperTags = (state, action) => {
  const newTags = state.tags.map(tag => _editPaperTags(tag, action.paperName, action.checkedTags))
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
