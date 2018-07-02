import React, { Component } from 'react'
import Main from './components/main'
import Sidebar from './components/sidebar'

class App extends Component {
  constructor() {
    super()

    // @TODO this should be handled with context 
    this.state = {
      generated: false,
      rows: null,
      columns: null
    }
  }

  onGenerateWorld = (rows, columns) => this.setState({ generated: true, rows, columns })

  render() {
    return (
      <section id="app" className="columns">
        <Sidebar onGenerateWorld={this.onGenerateWorld}/>
        <Main
          generated={this.state.generated}
          rows={this.state.rows}
          columns={this.state.columns}
        />
      </section>
    )
  }
}

export default App
