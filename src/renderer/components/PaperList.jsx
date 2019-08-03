import React from "react"
import AddPaperDialog from "../containers/AddPaperDialog"
import { list, paper_normal, paper_selected } from "./PaperList.scss"


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
                currentPaper && currentPaper === paper ? paper_selected : paper_normal
              }
              onClick={() => selectPaper(paper)}
            >
              <td>{paper}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
