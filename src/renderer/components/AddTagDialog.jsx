import React, { useEffect } from "react"
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function AddTagDialog(props) {
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState("")
  let inputText = ""

  function handleClickOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  function handleSubmit() {
    setName(inputText.value)
    handleClose()
  }

  useEffect(() => {
    console.log(name)
  })

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add a tag
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a tag</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="tag-name"
            label="Tag Name"
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