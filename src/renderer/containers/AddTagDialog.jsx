import React from "react"
import { connect } from "react-redux"
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { addTag } from "../actions/index"

const flattenTags = (tags) => {
  return tags.map(tag => [tag, ...flattenTags(tag.children)]).flat()
}

const AddTagDialog = ({ dispatch, tags }) => {
  const [open, setOpen] = React.useState(false)
  let inputText = ""
  const [parentTag, setParentTag] = React.useState("")

  const handleOpen = () => {
    setOpen(true)
    setParentTag("")
  }
  const handleClose = () => {
    setOpen(false)
    setParentTag("")
  }
  const handleChangeParentTag = (event) => {
    setParentTag(event.target.value)
  }
  const handleSubmit = () => {
    dispatch(addTag(inputText.value, parentTag))
    handleClose()
  }

  return (
    <div style={{ display: "inline" }}>
      <Button variant="outlined" display="inline" color="primary" onClick={handleOpen}>
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
            inputRef={ref => { inputText = ref }}
            fullWidth
          />
          <TextField
            select
            margin="dense"
            id="parent-tag"
            label="Parent Tag"
            value={parentTag}
            onChange={handleChangeParentTag}
            fullWidth
          >
            {flattenTags(tags).map(tag => (
              <MenuItem key={tag.name} value={tag.name}>
                {tag.name}
              </MenuItem>
            ))}
          </TextField>
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

export default connect()(AddTagDialog)
