import $ from "jquery";
import "./style.css";

//set up grid play area
const gridArray = [
  [
    { position: "00" },
    { position: "01", id: "empty" },
    { position: "02", id: "empty" },
    { position: "03" },
    { position: "04", id: "empty" },
  ],
  [
    { position: "10" },
    { position: "11", id: "empty" },
    { position: "12" },
    { position: "13" },
    { position: "14" },
  ],
  [
    { position: "20" },
    { position: "21" },
    { position: "22", id: "empty" },
    { position: "23" },
    { position: "24" },
  ],
  [
    { position: "30" },
    { position: "31" },
    { position: "32" },
    { position: "33", id: "empty" },
    { position: "34" },
  ],
  [
    { position: "40" },
    { position: "41" },
    { position: "42" },
    { position: "43" },
    { position: "44" },
  ],
];

//Set up starting player location, flags, and audio
let x = 0,
  y = 0,
  timerStart = false,
  finalScore = false;
const $jumpSound = new Audio("/jump.ogg"),
  $musicSound = new Audio("/My-Fat-Cat.mp3");
$jumpSound.volume = 1;
$musicSound.volume = 1;
$musicSound.loop = true;
$musicSound.play();

//Make grid according to grid play area
const makeGrid = (gridTemplate) => {
  for (let x = 0; x < gridTemplate.length; x++) {
    for (let y = 0; y < gridTemplate[x].length; y++) {
      if (gridTemplate[x][y].hasOwnProperty("id") === true) {
        $(".grid").append(
          $("<div>")
            .addClass("box")
            .text(gridTemplate[x][y].position)
            .attr("id", gridTemplate[x][y].id)
        );
      } else {
        $(".grid").append(
          $("<div>").addClass("box").text(gridTemplate[x][y].position)
        );
      }
    }
  }
};

//Adding into page
const makeDivs = () => {
  $("body").prepend(
    $("<div>")
      .addClass("win")
      .text("You Won!")
      .append($("<div>").addClass("score"))
  );

  $("body")
    .prepend($("<div>").addClass("break"))
    .prepend($("<button>").attr("id", "resetBtn").text("Reset"));

  $("body")
    .prepend($("<div>").addClass("break"))
    .prepend(
      $("<div>")
        .addClass("sound")
        .prepend($("<button>").attr("id", "muteMusicBtn").text("Mute Music"))
        .prepend($("<button>").attr("id", "muteSFXBtn").text("Mute SFX"))
    )
    .prepend($("<button>").attr("id", "soundBtn").text("Sound Settings"));

  $("body")
    .prepend($("<div>").addClass("break"))
    .prepend(
      $("<div>")
        .addClass("help")
        .append(
          $("<p>").html(
            "Use arrow keys to move<br>Tile colours will change when you move on to them. Brown tiles will block your movement path<br>Goal: change all tile colours quickly as you can"
          )
        )
    );

  $("body")
    .prepend($("<div>").addClass("break"))
    .prepend($("<button>").attr("id", "helpBtn").text("Help"));

  $("body")
    .prepend($("<div>").addClass("break"))
    .prepend($("<span>").attr("id", "timer"));

  $("body").prepend($("<div>").addClass("grid"));

  $("body").prepend($("<h1>").text("Project 1"));
};
makeDivs();
makeGrid(gridArray);
$(".box:contains(" + gridArray[x][y].position + ")").addClass("player");

$(".help").hide();
$(".win").hide();
$(".sound").hide();

//Functions
$(document).keydown(function (event) {
  var keyCode = event.keyCode || event.which;
  var arrow = { left: 37, up: 38, right: 39, down: 40 };

  switch (keyCode) {
    case arrow.left:
      // console.log("left press");
      leftMovement();
      $jumpSound.pause();
      $jumpSound.currentTime = 0;
      $jumpSound.play();
      break;

    case arrow.up:
      // console.log("up press");
      upMovement();
      $jumpSound.pause();
      $jumpSound.currentTime = 0;
      $jumpSound.play();
      break;

    case arrow.right:
      // console.log("right press");
      rightMovement();
      $jumpSound.pause();
      $jumpSound.currentTime = 0;
      $jumpSound.play();
      break;

    case arrow.down:
      // console.log("down press");
      downMovement();
      $jumpSound.pause();
      $jumpSound.currentTime = 0;
      $jumpSound.play();
      break;
  }

  // console.log(gridArray);
  if (!timerStart) {
    if (keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40)
      countdown(10000);
    timerStart = true;
  }

  winCheck();
});

//Movement logic
const rightMovement = () => {
  if (y < gridArray[x].length - 1) {
    y++;
    if (
      $(".box:contains(" + gridArray[x][y].position + ")").attr("id") != "empty"
    ) {
      $(".box:contains(" + gridArray[x][y].position + ")")
        .addClass("player")
        .removeClass("passed");
      $(".box:contains(" + gridArray[x][y - 1].position + ")")
        .removeClass("player")
        .addClass("passed");
    } else {
      y--;
      $(".box:contains(" + gridArray[x][y].position + ")")
        .addClass("player")
        .removeClass("passed");
    }
  } else if ((y = gridArray[x].length - 1)) {
    $(".box:contains(" + gridArray[x][y].position + ")")
      .addClass("player")
      .removeClass("passed");
  }
  console.log("X", x, "Y", y);
};

const leftMovement = () => {
  if (y > 0) {
    y--;
    if (
      $(".box:contains(" + gridArray[x][y].position + ")").attr("id") != "empty"
    ) {
      $(".box:contains(" + gridArray[x][y].position + ")")
        .addClass("player")
        .removeClass("passed");
      $(".box:contains(" + gridArray[x][y + 1].position + ")")
        .removeClass("player")
        .addClass("passed");
    } else {
      y++;
      $(".box:contains(" + gridArray[x][y].position + ")")
        .addClass("player")
        .removeClass("passed");
    }
  } else if ((y = 0)) {
    $(".box:contains(" + gridArray[x][y].position + ")")
      .addClass("player")
      .removeClass("passed");
  }

  console.log("X", x, "Y", y);
};

const upMovement = () => {
  if (x > 0) {
    x--;
    if (
      $(".box:contains(" + gridArray[x][y].position + ")").attr("id") != "empty"
    ) {
      $(".box:contains(" + gridArray[x][y].position + ")")
        .addClass("player")
        .removeClass("passed");
      $(".box:contains(" + gridArray[x + 1][y].position + ")")
        .removeClass("player")
        .addClass("passed");
    } else {
      x++;
      $(".box:contains(" + gridArray[x][y].position + ")")
        .addClass("player")
        .removeClass("passed");
    }
  } else if ((x = 0)) {
    $(".box:contains(" + gridArray[x][y].position + ")")
      .addClass("player")
      .removeClass("passed");
  }

  console.log("X", x, "Y", y);
};

const downMovement = () => {
  if (x < gridArray.length - 1) {
    x++;
    if (
      $(".box:contains(" + gridArray[x][y].position + ")").attr("id") != "empty"
    ) {
      $(".box:contains(" + gridArray[x][y].position + ")")
        .addClass("player")
        .removeClass("passed");
      $(".box:contains(" + gridArray[x - 1][y].position + ")")
        .removeClass("player")
        .addClass("passed");
    } else {
      x--;
      $(".box:contains(" + gridArray[x][y].position + ")")
        .addClass("player")
        .removeClass("passed");
    }
  } else if ((x = gridArray.length - 1)) {
    $(".box:contains(" + gridArray[x][y].position + ")")
      .addClass("player")
      .removeClass("passed");
  }
  console.log("X", x, "Y", y);
};

//Win logic
const winCheck = () => {
  if (
    $(".passed").length == 25 - $(".box#empty").length - 1 &&
    $(".player").length == 1
  ) {
    $(".grid").hide(50);
    $("#timer").hide();
    $(".win").show(100);
    $jumpSound.volume = 0;
    finalScore = true;
    $(".score").text(
      `Score: ${document.getElementById("timer").innerHTML / 10}`
    );
  } else {
    finalScore = false;
    console.log(finalScore);
  }
};

//timer
const countdown = (milli) => {
  setInterval(function () {
    if (milli >= 0 && finalScore != true) {
      milli -= 5;
      document.getElementById("timer").innerHTML = milli;
    } else {
      clearInterval(countdown);
      return;
    }
  }, 5);
};

//https://stackoverflow.com/questions/22385368/jquery-countdown-timer-with-milliseconds
// We actually only run our method every x millisecs, due to browser constraints
// var THROTTLE_AMOUNT = 4;
// const countdown = (secs) => {
//   var milli = secs * 1000;
//   var counter = setInterval(function () {
//     if (milli <= 0) {
//       clearInterval(counter);
//       return;
//     }
//     milli -= THROTTLE_AMOUNT;
//     document.getElementById("timer").innerHTML = milli; // + " ms"; // watch for spelling
//   }, THROTTLE_AMOUNT);
// };

//Button functions
const $resetBtn = $("#resetBtn");
const reset = () => {
  location.reload();
};
$resetBtn.on("click", reset);

const $helpBtn = $("#helpBtn");
const help = () => {
  $(".help").toggle();
};
$helpBtn.on("click", help);

const $soundBtn = $("#soundBtn");
const sound = () => {
  $(".sound").toggle();
};
$soundBtn.on("click", sound);

const $muteSFXBtn = $("#muteSFXBtn");
const muteSFX = () => {
  if ($muteSFXBtn.text() === "Mute SFX") {
    $jumpSound.volume = 0;
    $muteSFXBtn.text("Unmute SFX");
  } else {
    $jumpSound.volume = 1;
    $muteSFXBtn.text("Mute SFX");
  }
};
$muteSFXBtn.on("click", muteSFX);

const $muteMusicBtn = $("#muteMusicBtn");
const muteMusic = () => {
  if ($muteMusicBtn.text() === "Mute Music") {
    $musicSound.pause();
    $muteMusicBtn.text("Unmute Music");
  } else {
    $musicSound.play();
    $muteMusicBtn.text("Mute Music");
  }
};
$muteMusicBtn.on("click", muteMusic);
