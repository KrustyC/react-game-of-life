import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'styled-components'
import 'bulma/css/bulma.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

injectGlobal`
  html, body, #root, #app {
    min-height: 100% !important;
    height: 100%;
    margin: 0 !important;
    padding: 0 !important;
  }
`;

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
