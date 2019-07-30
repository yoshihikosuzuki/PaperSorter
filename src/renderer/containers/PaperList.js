import { connect } from "react-redux"

import PaperList from "../components/PaperList"

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(PaperList)
