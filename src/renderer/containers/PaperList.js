import { connect } from "react-redux"
import PaperList from "../components/PaperList"
import { selectPaper, deletePaper } from "../actions/index"

function mapStateToProps(state) {
  return {
    tags: state.tags,
    filteredPapers: state.filteredPapers,
    selectedPaper: state.selectedPaper
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectPaper: (name) => dispatch(selectPaper(name)),
    deletePaper: () => dispatch(deletePaper())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaperList)
