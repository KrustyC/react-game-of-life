import React, { Fragment } from 'react'

const Description = () => (
  <Fragment>
    <h1 className="title">Introduction</h1>
    <p>
      The Game of Life was invented in 1970 by the British mathematician{' '}
      <b>John Horton Conway</b>. Conway developed an interest in a problem which was
      made evident in the 1940’s by mathematician <b>John von Neumann</b>, who aimed
      to find a hypothetical machine that had the ability to create copies of itself
      and was successful when he discovered a mathematical model for such a machine
      with very complicated rules on a rectangular grid. Thus, the Game of Life was
      Conway’s way of simplifying von Neumann’s ideas. It is the best-known example of
      a cellular automaton which is any system in which rules are applied to cells
      and their neighbors in a regular grid. Martin Gardner popularized the Game of Life
      by writing two articles for his column <i>“Mathematical Games”</i> in the
      journal <b>Scientific American</b> in 1970 and 1971.
      <br />
      <i>Source:{' '}
        <a
          className="is-link"
          href="http://web.stanford.edu/~cdebs/GameOfLife/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Stanford University
        </a>
      </i>
    </p>
    <br />
    <h1 className="title">How to play</h1>
    <p>
      Simply select a number of rows and columns, then generate the matrix,
      click start and enjoying watching the world evolving.
    </p>
  </Fragment>
)

export default Description
