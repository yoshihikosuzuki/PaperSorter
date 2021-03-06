import React from "react"
import AddTagDialog from "../containers/AddTagDialog"
import DeleteTagsDialog from "../containers/DeleteTagsDialog"
import TagItem from "./TagItem"
import { list, tagitem, childtag, scroll } from "./TagItem.scss"

export default function TagList({ tags, selectedPaper, checkTag }) {
  //console.log("tags: " + JSON.stringify(tags))

  const _tagList = (tag) => {
    return (
      <li
        className={tagitem}
        key={tag.name}
      >
        <TagItem
          tag={tag}
          selectedPaper={selectedPaper}
          checkTag={checkTag}
        />
        {
          tag.children.length === 0 ? null : (
            <ul className={childtag}>
              {tag.children.map(childTag => _tagList(childTag))}
            </ul>
          )
        }
      </li>
    )
  }

  return (
    <div className={list}>
      <AddTagDialog tags={tags} />
      <DeleteTagsDialog tags={tags} />
      <div className={scroll}>
        <ul>
          {tags.map(tag => _tagList(tag))}
        </ul>
      </div>
    </div>
  )
}