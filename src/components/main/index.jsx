import React from 'react'
import Game from './Game'
import Description from './Description'

const Main = ({ generated, rows, columns }) => (
  <div className="container column is-10">
    <div className="section">
      {(generated && rows && columns) ? <Game rows={rows} columns={columns} /> : <Description />}
    </div>
  </div>
)

export default Main
