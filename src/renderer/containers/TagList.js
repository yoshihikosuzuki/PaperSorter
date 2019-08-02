import { connect } from "react-redux"
import TagList from "../components/TagList"
import { addTag } from "../actions/index"

function mapStateToProps(state) {
  return {
    tags: state.tags
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleClick: (name) => {
    dispatch(addTag(name))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TagList)
