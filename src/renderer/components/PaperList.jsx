import React from "react"
import AddPaperDialog from "../containers/AddPaperDialog"
import { list } from "./PaperList.scss"


export default function PaperList({ selectedPapers, selectPaper }) {
  console.log("selected papers: " + JSON.stringify(selectedPapers))
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
