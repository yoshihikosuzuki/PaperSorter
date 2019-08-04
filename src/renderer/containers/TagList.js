import { connect } from "react-redux"
import TagList from "../components/TagList"

function mapStateToProps(state) {
  return {
    tags: state.tags,
    currentPaper: state.currentPaper
  }
}

export default connect(mapStateToProps)(TagList)
