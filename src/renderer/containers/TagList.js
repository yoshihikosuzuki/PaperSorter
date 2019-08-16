import { connect } from "react-redux"
import TagList from "../components/TagList"

function mapStateToProps(state) {
  return {
    tags: state.tags,
    selectedPaper: state.selectedPaper
  }
}

export default connect(mapStateToProps)(TagList)
