import { connect } from "react-redux"

import TagList from "../components/TagList"

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(TagList)
