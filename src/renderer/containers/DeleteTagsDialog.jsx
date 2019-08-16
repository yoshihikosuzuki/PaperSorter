import React from "react"
import { connect } from "react-redux"
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { deleteTags } from "../actions/index"

const DeleteTagsDialog = ({ dispatch, tags }) => {
  const [open, setOpen] = React.useState(false)
  const [checkedTags, setCheckedTags] = React.useState([])

  const handleOpen = () => {
    setOpen(true)
    setCheckedTags([])
  }
  const handleClose = () => {
    setOpen(false)  
    setCheckedTags([])
  }
  const handleSubmit = () => {
    dispatch(deleteTags(checkedTags))
    handleClose()
  }
  const handleChange = (tagName) => {
    setCheckedTags(checkedTags.includes(tagName)
      ? checkedTags.filter(tag => tag !== tagName)
      : [...checkedTags, tagName]
    )
  }

  return (
    <div style={{display: "inline"}}>
      <Button variant="outlined" display="inline" color="primary" onClick={handleOpen}>
        Delete tag(s)
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete tag(s)</DialogTitle>
        <DialogContent>
          <ul>
            {tags.map((tag, index) => (
              <li key={index}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedTags.includes(tag.name)}
                      onChange={() => handleChange(tag.name)}
                      color="primary"
                    />
                  }
                  label={tag.name}
                />
              </li>
            ))}
          </ul>
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

export default connect()(DeleteTagsDialog)
