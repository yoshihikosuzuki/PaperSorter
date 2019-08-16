export function addTag(name) {
  return ({
    type: 'ADD_TAG',
    name
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

export function addPaper(name) {
  return ({
    type: 'ADD_PAPER',
    name
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