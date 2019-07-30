const initState = {
    tags: null,
    papers: null
}

export default function reducer(state=initState, action) {
    switch (action.type) {
    case 'OPEN':
        return state
    default:
        return state
    }
}
