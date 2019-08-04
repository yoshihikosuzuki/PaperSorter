import React from "react"
import AddPaperDialog from "../containers/AddPaperDialog"
import { list, selected, normal } from "./PaperList.scss"
const { shell } = require("electron").remote

export default function PaperList({
  selectedPapers,
  currentPaper,
  selectPaper
}) {
  console.log("selected papers: " + JSON.stringify(selectedPapers))
  console.log("current paper: " + JSON.stringify(currentPaper))
  return (
    <div className={list}>
      <AddPaperDialog />
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(selectedPapers).map((paper, index) => (
            <tr
              key={index}
              className={
                currentPaper && currentPaper === paper ? selected : normal
              }
              onClick={() => selectPaper(paper)}
              onDoubleClick={() => shell.openItem(paper)}
            >
              <td>{paper}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
