let board = [0, 10, 60, 90, 100, 50, 70, 20, 40, 80, 30, 160];
let player1btn = document.getElementById("player-1");
let player2btn = document.getElementById("player-2");

class Player {
  constructor(name, pos, money) {
    this.name = name;
    this.pos = pos;
    this.money = money;
  }
  rollDice() {
    let dice = Math.floor(Math.random() * 6) + 1;
    console.log(`${this.name} dice`, dice);
    showDice(dice);
    this.updatePosition(dice);
  }
  updatePosition(dice) {
    this.pos += dice;
    updateBoard(this.pos, this.name);
    console.log(`${this.name} pos`, this.pos);
    this.updateMoney();
  }
  updateMoney() {
    if (this.pos < board.length) {
      this.money -= board[this.pos];
    } else {
      this.pos %= 12;
      this.money -= board[this.pos];
    }
    if (this.money <= 0) {
      gameOver(this.name);
    } else {
      _("#mon1").textContent = `Rs. ${player1.money}`;
      _("#mon2").textContent = `Rs. ${player2.money}`;
    }
  }
}

let pdata = getPData();
let player1 = new Player(pdata[0], 0, pdata[2]);
let player2 = new Player(pdata[1], 0, pdata[2]);
setPData();

player1btn.addEventListener("click", () => {
  btnSwitch(1);
});

player2btn.addEventListener("click", () => {
  btnSwitch(2);
});

function btnSwitch(player) {
  if (player == 1) {
    _("#player-1").classList.remove("show");
    _("#player-1").classList.add("hide");
    _("#player-2").classList.remove("hide");
    _("#player-2").classList.add("show");
    _(".btn").style.background = "darkred";
    player1.rollDice();
  } else {
    _(".btn").style.background = "green";
    _("#player-2").classList.remove("show");
    _("#player-2").classList.add("hide");
    _("#player-1").classList.remove("hide");
    _("#player-1").classList.add("show");
    player2.rollDice();
  }
}

function getPData() {
  let p1 = prompt("Enter the name for player 1!");
  let p2 = prompt("Enter the name for player 2!");
  let mon = parseInt(prompt("Enter the starting money (minimum 500)!"));
  return [
    p1 == "" ? "Player 1" : p1,
    p2 == "" ? "Player 2" : p2,
    mon < 500 ? 500 : mon,
  ];
}

function setPData() {
  _("#p1name").textContent = `${player1.name}`;
  _("#p2name").textContent = `${player2.name}`;
  _("#mon1").textContent = `Rs. ${player1.money}`;
  _("#mon2").textContent = `Rs. ${player2.money}`;
  _("#player-1").textContent = `${player1.name}'s turn \n Roll The Dice!`;
  _("#player-2").textContent = `${player2.name}'s turn \n Roll The Dice!`;
}

function _(selector) {
  return document.querySelector(selector);
}

function updateBoard(pos, name) {
  removePrev(name);
  if (pos < board.length) {
  } else {
    pos %= 12;
  }
  if (player1.name == name) {
    _(`.p1bx${board[pos]}`).classList.remove("hide");
    _(`.p1bx${board[pos]}`).classList.add("show");
  } else {
    _(`.p2bx${board[pos]}`).classList.remove("hide");
    _(`.p2bx${board[pos]}`).classList.add("show");
  }
}

function removePrev(name) {
  if (player1.name == name) {
    for (let i = 0; i < board.length; i++) {
      _(`.p1bx${board[i]}`).classList.remove("show");
      _(`.p1bx${board[i]}`).classList.add("hide");
    }
  } else {
    for (let i = 0; i < board.length; i++) {
      _(`.p2bx${board[i]}`).classList.remove("show");
      _(`.p2bx${board[i]}`).classList.add("hide");
    }
  }
}

function gameOver(name) {
  if (player1.name == name) {
    _("#mon1").textContent = `Rs. 0`;
    _("#p2").style.background = "lawngreen";
    _("#p1").style.background = "indianred";
    _("#player-1").textContent = `${player2.name} Wins!!`;
    _("#player-2").textContent = `${player2.name} Wins!!`;
    _("#player-2").disabled = true;
    _("#player-1").disabled = true;
  } else {
    _("#mon2").textContent = `Rs. 0`;
    _("#p1").style.background = "lawngreen";
    _("#p2").style.background = "indianred";
    _("#player-1").textContent = `${player1.name} Wins!!`;
    _("#player-2").textContent = `${player2.name} Wins!!`;
    _("#player-2").disabled = true;
    _("#player-1").disabled = true;
  }
}

function showDice(dice) {
  _("#dice").src = `./imgs/${dice}.png`;
}
