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
  flex: 1;
  flex-direction: row;
`

const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10px;
  min-width: 10px;
  background: ${({ alive }) => alive ? '#000' : '#FFF'};
  border: 1px solid black;
`

const Button = styled.button`
  background: #218c74 !important;
  border: 1px solid #218c74 !important;
  color: #fff !important;
  font-size: 16px;
  width: 200px;
  height: 40px;

  &:disabled {
    opacity: 0.9;
  }
`

class Game extends Component {
  static propTypes = {
    rows: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      interval: null,
      nRows: props.rows,
      nColumns: props.columns,
      world: generateMatrix(props.rows, props.columns)
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.rows !== prevState.nRows || nextProps.columns !== prevState.nColumns) {
      clearInterval(prevState.interval)
      return { 
        interval: null,
        nRows: nextProps.rows,
        nColumns: nextProps.columns,
        world: generateMatrix(nextProps.rows, nextProps.columns)
      }
    }
    return prevState
  }

  start = () => {
    const interval = setInterval(() => {
      this.setState(( { world, nRows, nColumns }) => ({ world: getNextStep(world, nRows, nColumns) }))
    }, 100)
    this.setState({ interval })
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
        <Button className="button" onClick={this.start}>
          Start the game
        </Button>
      </Div>
    )
  }
}

export default Game
