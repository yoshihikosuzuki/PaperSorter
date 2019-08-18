export function addTag(tagName, parentTagName) {
  return ({
    type: 'ADD_TAG',
    tagName,
    parentTagName
  })
}

export function checkTag(name) {
return ({
    type: 'CHECK_TAG',
    name
  })
}

export function deleteTags(names) {
return ({
    type: 'DELETE_TAGS',
    names
  })
}

export function addPapers(paperNames) {
  return ({
    type: 'ADD_PAPERS',
    paperNames
  })
}

export function selectPaper(name) {
  return ({
    type: 'SELECT_PAPER',
    name
  })
}

export function deletePaper() {
  return ({
    type: 'DELETE_PAPER'
  })
}

export function editPaperTags(paperName, checkedTags) {
  return ({
    type: 'EDIT_PAPER_TAGS',
    paperName,
    checkedTags
  })
}