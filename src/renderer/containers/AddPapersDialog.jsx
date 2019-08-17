import React from "react"
import { connect } from "react-redux"
import Button from '@material-ui/core/Button'
import { addPapers } from "../actions/index"
const { dialog } = require("electron").remote

const AddPapersDialog = ({ dispatch }) => {
  const handleOpen = () => {
    const fileNames = dialog.showOpenDialogSync({
      filters: [{ name: 'PDF', extensions: ['pdf'] }],
      properties: ['openFile', 'multiSelections']
    })
    if (fileNames !== undefined) {
      dispatch(addPapers(fileNames))
    }
  }

  return (
    <Button variant="outlined" display="inline" color="primary" onClick={handleOpen}>
      Add paper(s)
    </Button>
  )
}

export default connect()(AddPapersDialog)
