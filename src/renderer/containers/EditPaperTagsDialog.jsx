import React from "react"
import { connect } from "react-redux"
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { editPaperTags } from "../actions/index"

const EditPaperTagsDialog = ({ dispatch, tags, selectedPaper }) => {
  const [open, setOpen] = React.useState(false)
  const [checkedTags, setCheckedTags] = React.useState([])

  const handleOpen = () => {
    if (selectedPaper === "") return
    setOpen(true)
    setCheckedTags(tags.filter(tag => tag.papers.includes(selectedPaper)).map(tag => tag.name))
  }
  const handleClose = () => {
    setOpen(false)
    setCheckedTags([])
  }
  const handleSubmit = () => {
    dispatch(editPaperTags(selectedPaper, checkedTags))
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
        Edit tags of selected paper
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit tags of the selected paper</DialogTitle>
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

export default connect()(EditPaperTagsDialog)
