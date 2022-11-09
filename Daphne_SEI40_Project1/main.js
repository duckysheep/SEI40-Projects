import $ from "jquery";
import "./style.css";

const gridArray = [
  [
    { position: "00" },
    { position: "01" },
    { position: "02" },
    { position: "03" },
    { position: "04" },
  ],
  [
    { position: "10" },
    { position: "11" },
    { position: "12" },
    { position: "13" },
    { position: "14" },
  ],
  [
    { position: "20" },
    { position: "21" },
    { position: "22" },
    { position: "23" },
    { position: "24" },
  ],
  [
    { position: "30" },
    { position: "31" },
    { position: "32" },
    { position: "33" },
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

let x = 0,
  y = 0,
  timerStart = false;

const $jumpSound = new Audio("/jump.ogg");
const $musicSound = new Audio("/My-Fat-Cat.mp3");
$jumpSound.volume = 1;
$musicSound.volume = 1;
$musicSound.loop = true;
$musicSound.play();

$(".help").hide();
$(".win").hide();
$(".sound").hide();
$(".box:contains(" + gridArray[x][y].position + ")").addClass("player");

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
      countdown(10);
    timerStart = true;
  }

  winCheck();
});

//try adding classes for css changes
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
      // gridArray[x][y].colour = "aquamarine";
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
      // gridArray[x][y].colour = "aquamarine";
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
    // gridArray[x][y].colour = "aquamarine";
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
      // gridArray[x][y].colour = "aquamarine";
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
    // gridArray[x][y].colour = "aquamarine";
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
      // gridArray[x][y].colour = "aquamarine";
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

const winCheck = () => {
  if (
    $(".passed").length == 25 - $(".box#empty").length - 1 &&
    $(".player").length == 1
  ) {
    let remainingTime = document.getElementById("timer").innerHTML;
    $(".score").text(`Score: ${remainingTime / 10}`);
    $(".grid").hide(50);
    $("#timer").hide();
    $(".win").show(100);
  } else {
    console.log("incomplete");
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
