import React from "react"
import AddTagDialog from "../containers/AddTagDialog"
import DeleteTagsDialog from "../containers/DeleteTagsDialog"
import TagItem from "../containers/TagItem"

export default function TagList({ tags, selectedPaper }) {
  console.log("tags: " + JSON.stringify(tags))
  return (
    <div>
      <AddTagDialog />
      <DeleteTagsDialog
        tags={tags}
      />
      <ul>
        {tags.sort((a, b) => {
          const nameA = a.name.toUpperCase()
          const nameB = b.name.toUpperCase()
          return nameA < nameB ? -1 : (nameA > nameB ? 1 : 0)
        }).map((tag, index) => (
          <TagItem
            key={index}
            tag={tag}
            selectedPaper={selectedPaper}
          />
        ))}
      </ul>
    </div>
  )
}