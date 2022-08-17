const screenHeight = document.body.clientHeight;
let SQ_NUM;

if (screenHeight === 629) {
  SQ_NUM = 375;
} else if (screenHeight === 669) {
  SQ_NUM = 405;
}

const board = document.querySelector("#board");
const clearBtn = document.querySelector(".clear");
const setColorBtn = document.querySelector("#setColor");
const setRandomColors = document.querySelector("#setRandomColors");

let color = "#1612e2";
let trueRandom = true;

clearBtn?.addEventListener("click", clearBoard);

setColorBtn.onchange = () => console.log((color = setColorBtn.value));

trueRandom ? (setColorBtn.style.opasity = "0") : false;

setRandomColors.addEventListener("click", toggleRandomColor);

for (let index = 0; index < SQ_NUM; index++) {
  const square = document.createElement("div");
  square.classList.add(`sq`);

  square.addEventListener("mouseover", () => {
    setColor(square);
  });

  square.addEventListener("touchmove", (event) => {
    // get coordinates depending on pointer type:
    var xcoord = event.touches ? event.touches[0].pageX : event.pageX;
    var ycoord = event.touches ? event.touches[0].pageY : event.pageY;
    // get element in coordinates:
    var targetElement = document.elementFromPoint(xcoord, ycoord);
    // validate if this is a valid element for our case:
    if (targetElement && targetElement.classList.contains("sq")) {
      setColor(targetElement);
    }
  });
  board?.append(square);
}

function setColor(element) {
  if (trueRandom) {
    let color = randcolor();
    element.style.backgroundColor = color;
    // element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
  } else {
    element.style.backgroundColor = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
  }
}

function removeColor(element) {
  element.style.backgroundColor = "#1d1d1d";
  element.style.boxShadow = `0 0 2px #000`;
}

function randcolor() {
  let rflags = new Array(
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F"
  );
  let colors = "";
  for (let i = 0; i < 6; i++) {
    let numb = Math.floor(Math.random() * 15);
    colors += rflags[numb];
  }
  return "#" + colors;
}
function clearBoard() {
  document.querySelectorAll(".sq").forEach((item) => {
    item.style.backgroundColor = "#1d1d1d";
    item.style.boxShadow = `0 0 2px #000`;
  });
}

function toggleRandomColor() {
  if (trueRandom) {
    trueRandom = false;
    setRandomColors.innerHTML = "Off-RandColors";
    setRandomColors.style.backgroundColor = "grey";
    setColorBtn.style.opacity = 1;
  } else {
    trueRandom = true;
    setRandomColors.innerHTML = "On-RandColors";
    setRandomColors.style.backgroundColor = "limegreen";

    setColorBtn.style.opacity = 0;
  }
}
