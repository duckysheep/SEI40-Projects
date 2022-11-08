import $ from "jquery";
import "./style.css";

const gridArray = [
  [
    { position: "00", colour: "" },
    { position: "01", colour: "" },
    { position: "02", colour: "" },
    { position: "03", colour: "" },
    { position: "04", colour: "" },
  ],
  [
    { position: "10", colour: "" },
    { position: "11", colour: "" },
    { position: "12", colour: "" },
    { position: "13", colour: "" },
    { position: "14", colour: "" },
  ],
  [
    { position: "20", colour: "" },
    { position: "21", colour: "brown" },
    { position: "22", colour: "brown" },
    { position: "23", colour: "brown" },
    { position: "24", colour: "" },
  ],
  [
    { position: "30", colour: "" },
    { position: "31", colour: "" },
    { position: "32", colour: "" },
    { position: "33", colour: "brown" },
    { position: "34", colour: "" },
  ],
  [
    { position: "40", colour: "" },
    { position: "41", colour: "" },
    { position: "42", colour: "" },
    { position: "43", colour: "brown" },
    { position: "44", colour: "" },
  ],
];

let x = 0,
  y = 0,
  timerStart = false;

$(".help").hide();
$(".win").hide();

$(document).keydown(function (event) {
  var keyCode = event.keyCode || event.which;
  var arrow = { left: 37, up: 38, right: 39, down: 40 };

  switch (keyCode) {
    case arrow.left:
      // console.log("left press");
      leftMovement();
      break;

    case arrow.up:
      // console.log("up press");
      upMovement();
      break;

    case arrow.right:
      // console.log("right press");
      rightMovement();
      break;

    case arrow.down:
      // console.log("down press");
      downMovement();
      break;
  }

  // console.log(gridArray);
  if (!timerStart) {
    if (keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40)
      countdown(10);
    timerStart = true;
  }

  winCheck();
});

const rightMovement = () => {
  if (y < gridArray[x].length - 1) {
    y++;
    if (
      $(".box:contains(" + gridArray[x][y].position + ")").attr("id") != "empty"
    ) {
      if (
        $(".box:contains(" + gridArray[x][y].position + ")").css(
          "background-color"
        ) != "rgb(255,255,255)"
      ) {
        $(".box:contains(" + gridArray[x][y].position + ")").css(
          "background-color",
          "aquamarine"
        );
        gridArray[x][y].colour = "aquamarine";
      } else if ((y = gridArray[x].length)) {
        $(".box:contains(" + gridArray[x][y].position + ")").css(
          "background-color",
          "aquamarine"
        );
        gridArray[x][y].colour = "aquamarine";
      }
    } else {
      y--;
      // gridArray[x][y].colour = "brown";
    }
  }
  console.log("X", x, "Y", y);
};

const leftMovement = () => {
  if (y > 0) {
    y--;
    if (
      $(".box:contains(" + gridArray[x][y].position + ")").attr("id") != "empty"
    ) {
      if (
        $(".box:contains(" + gridArray[x][y].position + ")").css(
          "background-color"
        ) != "rgb(255,255,255)"
      ) {
        $(".box:contains(" + gridArray[x][y].position + ")").css(
          "background-color",
          "aquamarine"
        );
        gridArray[x][y].colour = "aquamarine";
      } else if ((y = 0)) {
        $(".box:contains(" + gridArray[x][y].position + ")").css(
          "background-color",
          "aquamarine"
        );
        gridArray[x][y].colour = "aquamarine";
      }
    } else {
      y++;
      // gridArray[x][y].colour = "brown";
    }
  }
  console.log("X", x, "Y", y);
};

const upMovement = () => {
  if (x > 0) {
    x--;
    if (
      $(".box:contains(" + gridArray[x][y].position + ")").attr("id") != "empty"
    ) {
      if (
        $(".box:contains(" + gridArray[x][y].position + ")").css(
          "background-color"
        ) != "rgb(255,255,255)"
      ) {
        $(".box:contains(" + gridArray[x][y].position + ")").css(
          "background-color",
          "aquamarine"
        );
        gridArray[x][y].colour = "aquamarine";
      } else if ((x = 0)) {
        $(".box:contains(" + gridArray[x][y].position + ")").css(
          "background-color",
          "aquamarine"
        );
        gridArray[x][y].colour = "aquamarine";
      }
    } else {
      x++;
      // gridArray[x][y].colour = "brown";
    }
  }
  console.log("X", x, "Y", y);
};

const downMovement = () => {
  if (x < gridArray.length - 1) {
    x++;
    if (
      $(".box:contains(" + gridArray[x][y].position + ")").attr("id") != "empty"
    ) {
      if (
        $(".box:contains(" + gridArray[x][y].position + ")").css(
          "background-color"
        ) != "rgb(255,255,255)"
      ) {
        $(".box:contains(" + gridArray[x][y].position + ")").css(
          "background-color",
          "aquamarine"
        );
        gridArray[x][y].colour = "aquamarine";
      } else if ((x = gridArray.length)) {
        $(".box:contains(" + gridArray[x][y].position + ")").css(
          "background-color",
          "aquamarine"
        );
        gridArray[x][y].colour = "aquamarine";
      }
    } else {
      x--;
      // gridArray[x][y].colour = "brown";
    }
  }
  console.log("X", x, "Y", y);
};

const winCheck = () => {
  let gridArrCheck = [];
  for (let i of gridArray) {
    for (let j of i) {
      gridArrCheck.push(j.colour);
    }
  }
  console.log(gridArrCheck);
  if (gridArrCheck.indexOf("") >= 0) {
    console.log("incomplete");
  } else {
    let remainingTime = document.getElementById("timer").innerHTML;
    $(".score").text(`Score: ${remainingTime / 10}`);
    $(".grid").hide();
    $("#timer").hide();
    $(".win").show();
  }
};

//https://stackoverflow.com/questions/22385368/jquery-countdown-timer-with-milliseconds
// We actually only run our method every x millisecs, due to browser constraints
var THROTTLE_AMOUNT = 4;
const countdown = (secs) => {
  var milli = secs * 1000;
  var counter = setInterval(function () {
    if (milli <= 0) {
      clearInterval(counter);
      return;
    }
    milli -= THROTTLE_AMOUNT;
    document.getElementById("timer").innerHTML = milli; // + " ms"; // watch for spelling
  }, THROTTLE_AMOUNT);
};

const $resetBtn = $("#resetBtn");
const reset = () => {
  location.reload();
  // (x = 0), (y = 0);
  // $(".box").css("background-color", "white");
  // timerStart = false;
};
$resetBtn.on("click", reset);

const $helpBtn = $("#helpBtn");
const help = () => {
  $(".help").toggle();
};
$helpBtn.on("click", help);
