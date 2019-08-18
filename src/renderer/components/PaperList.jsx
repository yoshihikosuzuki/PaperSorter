import { basename } from "path"
import React from "react"
import Button from '@material-ui/core/Button'
import AddPapersDialog from "../containers/AddPapersDialog"
import EditPaperTagsDialog from "../containers/EditPaperTagsDialog"
import { list, scroll, selected, normal } from "./PaperList.scss"
const { shell } = require("electron").remote

export default function PaperList({
  tags,
  filteredPapers,
  selectedPaper,
  selectPaper,
  deletePaper
}) {
  console.log("filtered papers: " + JSON.stringify(filteredPapers))
  console.log("selected paper: " + JSON.stringify(selectedPaper))

  const handleClickDelete = () => {
    if (selectedPaper !== "") deletePaper()
  }

  return (
    <div className={list}>
      <AddPapersDialog />
      <EditPaperTagsDialog
        tags={tags}
        selectedPaper={selectedPaper}
      />
      <Button variant="outlined" display="inline" color="primary" onClick={handleClickDelete}>
        Delete selected paper
      </Button>
      <div className={scroll}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(filteredPapers)
              .sort((a, b) => {
                const baseA = basename(a).toUpperCase()
                const baseB = basename(b).toUpperCase()
                return baseA < baseB ? -1 : (baseA > baseB ? 1 : 0)
              })
              .map((paper, index) => (
                <tr
                  key={index}
                  className={
                    selectedPaper && selectedPaper === paper ? selected : normal
                  }
                  onClick={() => selectPaper(paper)}
                  onDoubleClick={() => shell.openItem(paper)}
                >
                  <td>{basename(paper)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
