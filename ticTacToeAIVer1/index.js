const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const options = document.querySelectorAll("[name='player-option']");
const rows = document.querySelectorAll(".row");
const result = document.querySelector(".result");

let ai = "O",
  human = "X";

const playerTurn = () => {
  rows.forEach((e) => {
    const span = e.children[0].children[0];
    e.addEventListener("click", () => {
      const dataRow = e.getAttribute("data-row");
      const dataCol = e.getAttribute("data-column");
      if (board[dataRow][dataCol] === "") {
        span.innerHTML = human;
        board[dataRow][dataCol] = human;
      }
    });
  });
};
playerTurn()

const bestMove = () => {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "") {
        board[i][j] = ai;
        let score = minimax(board, 0, false);
        board[i][j] = "";
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  return move;
};

const minimax = (board, depth, isMaximising) => {
  let result = checkWinner();
  if (result !== null) {
    return scores[result];
  }
  if (isMaximising) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          board[i][j] = ai;
          let score = minimax(board, depth + 1, false);
          board[i][j] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          board[i][j] = human;
          let score = minimax(board, depth + 1, true);
          board[i][j] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  }
};

const scores = {
    X: 10,
    O: -10,
    tie: 0
}

const updateSelector = () => {
    if (value === '1') {
        human = 'X'
        ai= 'O'
    } else {
        human = 'O'
        ai = 'X'
    }
    scores[human] = -10
    scores[ai] = 10
}

let start = options[0].value
updateSelector(start)

options.forEach((option) => {
    option.addEventListener('change',(e) => {
        const {value} = e.target
        updateSelector(value)
    })
})

const equals3 = (a, b,c) => {
    return a !== '' && a === b && b === c
}

const checkWinner = () => {
    let winner = null

    for (let i = 0; i < 3; i++) {
        if (equals3(board[i][0], board[i][1], board[i][2])) {
            winner = board[i][0]
        }
    }

    for (let i = 0; i < 3; i++) {
        if (equals3(board[0][i], board[1][i], board[2][i])) {
            winner = board[0][i]
        }
    }

    if (equals3(board[0][0], board[1][1],board[2][1])) {
        winner = board[0][0]
    }
    if (equals3(board[2][0],board[1][1],board[0][2])) {
        winner = board[2][0]
    }

    let openSpots = 0
    for (let i = 0;i < 3; i++) {
        for (let j = 0; j< 3; j++) {
            if (board[i][j] === '') {
                openSpots++
            }
        }
    }

    if (winner === null && openSpots === 0) {
        return 'tie'
    } else {
        return winner
    }
}

const aiTurn = () => {
    rows.forEach((row) => {
        const span = row.children[0].children[0]
        row.addEventListener('click',(e) => {
            const dataRow = row.getAttribute('data-row')
            const dataColumn = row.getAttribute('data-column')
            if (board[dataRow][dataColumn] === '') {
                // player move
                span.innerHTML = human
                board[dataRow][dataColumn] = human

                // bot move
                const botMove = bestMove()

                if (botMove) {
                    board[botMove.i][botMove.j] = ai
                    const botPlace = document.querySelector(`[data-row='${botMove.i}'][data-column='${botMove.j}'] span`)
                    botPlace.innerHTML = ai
                }
                const outcome = checkWinner()
                if (outcome) {
                    if (outcome === 'tie') {
                        result.innerHTML = outcome
                    } else {
                        result.innerHTML = `${outcome} wins`
                    }
                }
            }
        })
    })
}

aiTurn()