import { connect } from "react-redux"
import TagList from "../components/TagList"
import { addTag } from "../actions/index"

function mapStateToProps(state) {
  return {
    tags: state.tags
  }
}

export default connect(mapStateToProps)(TagList)
