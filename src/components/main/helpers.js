import _ from 'lodash'

export const DEAD = 0
export const ALIVE = 1

export const generateMatrix = (rows, columns) =>  (
  _.map(_.range(0, rows), () => (
    _.map(_.range(0, columns), () => Math.round(Math.random()) === 0 ? DEAD : ALIVE)
  ))
)

export const isCellAlive = cell => cell === ALIVE

const isTopLeftEdge = (rowIndex, columnIndex) => rowIndex === 0 && columnIndex === 0
const isTopRightEdge = (rowIndex, columnIndex, nColumns) => rowIndex === 0 && columnIndex === (nColumns - 1)
const isBottomLeftEdge = (rowIndex, columnIndex, nRows) => rowIndex === (nRows - 1) && columnIndex === 0
const isBottomRightEdge = (rowIndex, columnIndex, nRows, nColumns) => rowIndex === (nRows - 1) && columnIndex === (nColumns - 1)

const isFirstRow = rowIndex => rowIndex === 0
const isLastRow = (rowIndex, nRows) => rowIndex === (nRows - 1)

const isFirstColumn = columnIndex => columnIndex === 0
const isLastColumn = (columnIndex, nColumns) => columnIndex === (nColumns - 1)

const getTopLeft = (rowIndex, columnIndex, nRows, nColumns) => {
  if (isTopLeftEdge(rowIndex, columnIndex)) {
    return [nRows -1, nColumns -1]
  }

  if (isFirstRow(rowIndex)) {
    return [nRows -1, columnIndex -1]
  }

  if (isFirstColumn(columnIndex)) {
    return [rowIndex -1, nColumns -1]
  }

  return [rowIndex -1, columnIndex -1]
}

const getTopCenter = (rowIndex, columnIndex, nRows) => {
  if (isFirstRow(rowIndex)) {
    return [nRows -1, columnIndex]
  }
  return [rowIndex -1, columnIndex]
}

const getTopRight = (rowIndex, columnIndex, nRows, nColumns) => {
  if (isTopRightEdge(rowIndex, columnIndex, nColumns)) {
    return [nRows -1, 0]
  }

  if (isFirstRow(rowIndex)) {
    return [nRows -1, columnIndex + 1]
  }

  if (isLastColumn(columnIndex, nColumns)) {
    return [rowIndex - 1, 0]
  }

  return [rowIndex - 1, columnIndex + 1]
}

const getCenterLeft = (rowIndex, columnIndex, nColumns) => {
  if (isFirstColumn(columnIndex)) {
    return [rowIndex, nColumns - 1]
  }

  return [rowIndex, columnIndex - 1]
}

const getCenterRight = (rowIndex, columnIndex, nColumns) => {
  if (isLastColumn(columnIndex, nColumns)) {
    return [rowIndex, 0]
  }
  return [rowIndex, columnIndex + 1]
}

const getBottomLeft = (rowIndex, columnIndex, nRows, nColumns) => {
  if (isBottomLeftEdge(rowIndex, columnIndex, nRows)) {
    return [0, nColumns - 1]
  }

  if (isLastRow(rowIndex, nRows)) {
    return [0, 0]
  }

  if (isFirstColumn(columnIndex)) {
    return [rowIndex + 1, nColumns - 1]
  }

  return [rowIndex + 1, columnIndex - 1]
}

const getBottomCenter = (rowIndex, columnIndex, nRows) => {
  if (isLastRow(rowIndex, nRows)) {
    return [0, columnIndex]
  }

  return [rowIndex + 1, columnIndex]
}

const getBottomRight = (rowIndex, columnIndex, nRows, nColumns) => {
  if (isBottomRightEdge(rowIndex, columnIndex, nRows, nColumns)) {
    return [0, 0]
  }

  if (isLastRow(rowIndex, nRows)) {
    return [0, columnIndex + 1]
  }

  if (isLastColumn(columnIndex, nColumns)) {
    return [rowIndex + 1, 0]
  }

  return [rowIndex + 1, columnIndex + 1]
}

const countCellNeighbours = (matrix, rowIndex, columnIndex, nRows, nColumns) => {
  const sorroundingPoints = [
    getTopLeft(rowIndex, columnIndex, nRows, nColumns),
    getTopCenter(rowIndex, columnIndex, nRows),
    getTopRight(rowIndex, columnIndex, nRows, nColumns),
    getCenterLeft(rowIndex, columnIndex, nColumns),
    getCenterRight(rowIndex, columnIndex, nColumns),
    getBottomLeft(rowIndex, columnIndex, nRows, nColumns),
    getBottomCenter(rowIndex, columnIndex, nRows),
    getBottomRight (rowIndex, columnIndex, nRows, nColumns)
  ]

  return _.sum(_.map(sorroundingPoints, point => {
    const cell = matrix[point[0]][point[1]]
    return isCellAlive(cell) ? 1 : 0
  }))
}

const getNextState = (cell, neighbours) => {
  if (isCellAlive(cell)) {
    if (neighbours < 2) {
      return DEAD
    }
    return neighbours < 4 ? ALIVE : DEAD
  }
  // Cell is dead
  return neighbours === 3 ? ALIVE : DEAD 
}

export const getNextStep = (matrix, nRows, nColumns) => {
  return _.map(matrix, (row, rowIndex) => (
    _.map(row, (cell, columnIndex) => {
      const neighbours = countCellNeighbours(matrix, rowIndex, columnIndex, nRows, nColumns)
      return getNextState(cell, neighbours)
    })
  ))
}
