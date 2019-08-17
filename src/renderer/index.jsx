import React from "react"
import { render } from "react-dom"
import { createStore } from "redux"
import { Provider } from "react-redux"
import SplitPane from "react-split-pane"
import TagList from "./containers/TagList"
import PaperList from "./containers/PaperList"
import reducer from "./reducers/index"
import "./search.js"
import "./style.scss"

const store = createStore(reducer)

render(
  <Provider store={store}>
    <SplitPane split="vertical" minSize={256} defaultSize={256}>
      <TagList />
      <PaperList />
    </SplitPane>
  </Provider>,
  document.getElementById("content")
)
