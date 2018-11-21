[![Build Status](https://travis-ci.org/AshleyByeUK/tictactoe-ruby-react-frontend.svg?branch=master)](https://travis-ci.org/AshleyByeUK/tictactoe-ruby-react-frontend)
[![codecov](https://codecov.io/gh/AshleyByeUK/tictactoe-ruby-react-frontend/branch/master/graph/badge.svg)](https://codecov.io/gh/AshleyByeUK/tictactoe-ruby-react-frontend)

# tictactoe-ruby-react-frontend

A React frontend to a [game of TicTacToe](https://github.com/AshleyByeUK/tictactoe-ruby-json-api). You can also
[play online](https://react-tictactoe-frontend.herokuapp.com/).

## Requirements

To use this frontend, a running instance of the [TicTacToe JSON API](https://github.com/AshleyByeUK/tictactoe-ruby-json-api)
is required. Follow the instructions in the repo to get this up and running. The remaining instructions assume
this will be on port 9292.

Yarn needs to be installed, although you can substitue Node as a replacement.

## Instructions

Clone this repositiory:

```
git clone git@github.com:AshleyByeUK/tictactoe-ruby-react-frontend.git
cd tictactoe-ruby-react-frontend
```

Install the required dependencies:

```
yarn install
```

Start Node server:

```
yarn start
```

Open a browser at [http://localhost:3000](http://localhost:3000) if it does not open automatically.

## Tests

To run the tests, follow the above instructions up until starting the server.

Tests can be run with:

```
yarn test
```

To see test coverage results:

```
yarn test --coverage
```
