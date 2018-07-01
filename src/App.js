import React, { Component } from 'react'
import GameOfLife from './game-of-life'

class App extends Component {
  constructor() {
    super()

    this.state = {
      generate: false,
      rows: 30,
      columns: 30
    }
  }

  setColumns = ({ target: { value } }) => this.setState({ columns: value <= 100 ? value: 100  })

  setRows = ({ target: { value } }) => this.setState({ rows: value <= 100 ? value: 100 })

  generate = () => this.setState({ generate: true })

  render() {
    return (
      <div>
        <div className="hero has-text-centered is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Conway's game of life</h1>
                <div className="field is-grouped">
                  <p className="control is-expanded">
                    <input
                      className="input is-primary"
                      type="number"
                      placeholder="Rows"
                      min="0"
                      max="100"
                      onChange={this.setRows}
                      value={this.state.rows}
                    />
                  </p>
                  <p className="control is-expanded">
                    <input
                      className="input is-primary"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Columns"
                      onChange={this.setColumns}
                      value={this.state.columns}
                    />
                  </p>
                  <p className="control">
                    <button
                      class="button is-info"
                      onClick={this.generate}
                      disabled={!this.state.rows || !this.state.columns}
                    >
                      Generate Matrix
                    </button>
                  </p>
                </div>
            </div>
          </div>
        </div>
        {!this.state.generate && (
          <div className="hero is-medium">
            <div className="hero-body">
            <div className="container">
              <GameOfLife rows={this.state.rows} columns={this.state.columns} />
            </div>
          </div>
          </div>
        )}
      </div>
    )
  }
}

export default App
