import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { isCellAlive, generateMatrix, getNextStep } from './helpers'


const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
`

const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10px;
  width: 10px;
  background: ${({ alive }) => alive ? '#000' : '#FFF'};
  border: 1px solid black;
`

class GameOfLife extends Component {
  static propTypes = {
    rows: PropTypes.number,
    columns: PropTypes.number
  }

  static defaultProps = {
    rows: 50,
    columns: 50
  }

  constructor(props) {
    super(props)

    this.state = {
      nRows: props.rows,
      nColumns: props.columns,
      world: generateMatrix(props.rows, props.columns)
    }
  }

  start = () => {
    setInterval(() => {
      this.setState(( { world, nRows, nColumns }) => ({ world: getNextStep(world, nRows, nColumns) }))
    }, 100)
  }

  render() {
    const { world } = this.state
    return (
      <Div>
        {_.map(world, (row, i) => (
          <Row key={i}>
            {_.map(row, (cell, i) => (
              <Cell key={i} alive={isCellAlive(cell)}/>
            ))}   
          </Row>
        ))}
        <br />
        <button class="button is-info is-medium" onClick={this.start}>
          Start
        </button>
      </Div>
    )
  }
}

export default GameOfLife
