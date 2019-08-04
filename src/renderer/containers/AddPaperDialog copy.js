import React from "react"
import { connect } from "react-redux"
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { addPaper } from "../actions/index"

const AddPaperDialog = ({ dispatch }) => {   // TODO: change to Electron's file open dialog
  const [open, setOpen] = React.useState(false)
  let inputText = ""

  const handleOpen = () => { setOpen(true) }
  const handleClose = () => { setOpen(false) }
  const handleSubmit = () => {
    dispatch(addPaper(inputText.value))
    handleClose()
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Add a paper
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a paper</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="paper-name"
            label="Paper Name"
            inputRef={ref => {inputText = ref}}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
      </Button>
          <Button onClick={handleSubmit} color="primary">
            OK
      </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default connect()(AddPaperDialog)
