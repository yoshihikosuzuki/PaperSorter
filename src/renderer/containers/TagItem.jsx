import React from "react"
import { connect } from "react-redux"
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { tagitem, normal, selected } from "./TagItem.scss"
import { checkTag } from "../actions/index"

const TagItem = ({ dispatch, tag, currentPaper }) => {
  const handleChange = () => {
    dispatch(checkTag(tag.name))
  }

  return (
    <li
      className={[
        tagitem,
        tag.papers.includes(currentPaper) ? selected : normal
      ].join(" ")}>
      <FormControlLabel
        control={
          <Checkbox
            checked={tag.checked}
            onChange={handleChange}
            color="primary"
          />
        }
        label={tag.name}
      />
    </li>
  )
}

export default connect()(TagItem)