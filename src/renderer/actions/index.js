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

export function addPaper(name) {
  return ({
    type: 'ADD_PAPER',
    name
  })
}

export function addTagToPaper(name) {
  return ({
    type: 'ADD_TAG_TO_PAPER',
    name
  })
}

export function selectPaper(name) {
  return ({
    type: 'SELECT_PAPER',
    name
  })
}