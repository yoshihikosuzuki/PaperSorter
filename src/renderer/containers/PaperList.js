import { connect } from "react-redux"
import PaperList from "../components/PaperList"

function mapStateToProps(state) {
  return {
    currentPaperList: state.currentPaperList
  }
}

export default connect(mapStateToProps)(PaperList)
