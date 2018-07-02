import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Aside = styled.aside`
  background: #218c74;
  p, label {
    color: #FFF !important;
  }
`

const Button = styled.button`
  background: #ffb142 !important;
  border: 1px solid #ffb142 !important;
  color: #2d3436 !important;
  text-transform: uppercase;
  font-size: 14px;

  &:disabled {
    opacity: 0.9;
  }
`

class Sidebar extends Component {
  static propTypes = {
    onGenerateWorld: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      rows: null,
      columns: null,
      error: null
    }
  }

  setColumns = ({ target: { value } }) => this.setState({ columns: value <= 70 ? parseInt(value, 10) : 70 })
  setRows = ({ target: { value } }) => this.setState({ rows: value <= 70 ? parseInt(value, 10) : 70 })

  onGenerate = () => {
    const { rows, columns } = this.state
    if (rows && columns) {
      return this.props.onGenerateWorld(rows, columns)
    }
    return this.setState({ error: 'Please choose a number of rows and columns' })
  }

  render() {
    return (
      <Aside className="column is-2 is-narrow-mobile is-fullheight section">
        <p className="menu-label is-hidden-touch">Selection</p>
        <div className="field">
          <label className="label">Rows</label>
          <div className="control">
            <input
              className="input"
              placeholder="Number of rows..."
              type="number"
              min="0"
              max="100"
              onChange={this.setRows}
              value={this.state.rows || ''}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Columns</label>
          <div className="control">
            <input
              className="input"
              placeholder="Number of columns..."
              type="number"
              min="0"
              max="100"
              onChange={this.setColumns}
              value={this.state.columns || ''}
            />
          </div>
        </div>
        <div className="control">
          <Button
            className="button is-fullwidth"
            onClick={this.onGenerate}
            disabled={!this.state.rows || !this.state.columns}
          >
            Generate Matrix
          </Button>
        </div>
      </Aside>
    )
  }
}

export default Sidebar
