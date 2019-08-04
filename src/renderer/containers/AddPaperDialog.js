import React from "react"
import { connect } from "react-redux"
import Button from '@material-ui/core/Button'
import { addPaper } from "../actions/index"
const { dialog } = require("electron").remote

const AddPaperDialog = ({ dispatch }) => {
  const handleOpen = () => {
    const fileNames = dialog.showOpenDialog({
      filters: [{ name: 'PDF', extensions: ['pdf'] }]
    })
    if (fileNames !== undefined) {
      dispatch(addPaper(fileNames[0]))
    }
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Add a paper
      </Button>
    </div>
  )
}

export default connect()(AddPaperDialog)
