import React from "react"
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { normal, selected } from "./TagItem.scss"

const TagItem = ({ tag, selectedPaper, checkTag }) => {
  //console.log("tag: " + JSON.stringify(tag))
  const handleChange = () => {
    checkTag(tag.name)
  }

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={tag.checked}
          onChange={handleChange}
          color="primary"
        />
      }
      label={
        <span className={tag.papers.includes(selectedPaper) ? selected : normal}>
          {tag.name}
        </span>
      }
    />
  )
}

export default TagItem