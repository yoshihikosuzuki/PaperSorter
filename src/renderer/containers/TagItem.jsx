import React from "react"
import { connect } from "react-redux"
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { tagitem, normal, selected } from "./TagItem.scss"
import { checkTag } from "../actions/index"

const TagItem = ({ dispatch, tag, selectedPaper }) => {
  const handleChange = () => {
    dispatch(checkTag(tag.name))
  }

  return (
    <li className={tagitem}>
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
    </li>
  )
}

export default connect()(TagItem)