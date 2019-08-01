import { connect } from "react-redux"
import AddTagDialog from "../components/AddTagDialog"
import { addTag } from "../actions/index"

const mapStateToProps = state => {
  return {
    tags: state.tags
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(addTag(ownProps.name))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTagDialog)
