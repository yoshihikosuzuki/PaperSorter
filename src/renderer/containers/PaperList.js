import { connect } from "react-redux"
import PaperList from "../components/PaperList"
import { selectPaper } from "../actions/index"

function mapStateToProps(state) {
  console.log("papers: " + JSON.stringify(state.papers))
  return {
    selectedPapers: state.selectedPapers,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectPaper: (name) => dispatch(selectPaper(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaperList)
