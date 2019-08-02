import React from "react"
import AddTagDialog from "../containers/AddTagDialog"
import TagItem from "../containers/TagItem"

export default function TagList({ tags }) {
  console.log(JSON.stringify(tags))
  return (
    <div>
      <AddTagDialog />
      <ul>
        {tags.map((tag, index) => (
          <TagItem key={index} tag={tag} />
        ))}
      </ul>
    </div>
  )
}