import { connect } from "react-redux"
import TagList from "../components/TagList"
import { checkTag } from "../actions/index"

function mapStateToProps(state) {
  return {
    tags: state.tags,
    selectedPaper: state.selectedPaper
  }
}

function mapDispatchToProps(dispatch) {
  return {
    checkTag: (name) => dispatch(checkTag(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagList)
