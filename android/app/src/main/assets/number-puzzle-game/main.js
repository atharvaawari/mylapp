const gameContainer = document.querySelector('#game-cont-1');
let loginPopup = document.querySelector('#loginPopup');
let overlay = document.querySelector('#overlay');


var tiles = [];
const gameOptions = {
  TileSize: 288,
  tileSpacing: 15,
  boardSize: { rows: 5, cols: 5 },
  tweenSpeed: 50,
  aspectRatio: 16 / 9,
},
  startGameBtn = document.querySelector("#startGame");
var tileSize = 100;
let game,
  clicks = 0,
  gameScore = 2345,
  startGame = !1,
  nextLavel = !1,
  level,
  gameOver = !1,
  reset = !1,
  numbers = [],
  shuffledNumbers = [],
  gridWidth = 0,
  scaleValue = 0,
  gridAdjustValX = 0,
  gridAdjustValY = 0,
  gridAdjustValue = 0,
  gameLevel = 0,
  padding = 100,
  backtoboot = !1,
  backtomenu = !1,
  myTime = 0,
  startTimer = 0,
  timeText,
  gameTimer,
  stopTimer = !0,
  stopMinutes,
  stopSeconds,
  seconds = 0;
class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: "UIScene", active: !0 });
  }
  create() {
    let o = this.add.image(100, 20, "exitButton").setInteractive().setScale(1);
    o.setOrigin(1, 0),
      o.on("pointerup", () => {
        quitGame();
      });
    this.input.setGlobalTopOnly(!1);
  }

}
class bootGame extends Phaser.Scene {
  constructor() {
    super("BootGame");
  }
  preload() {
    var e = this.add.graphics(),
      t = this.add.graphics();
    t.fillStyle(2236962, 0.8),
      t.fillRect(game.config.width / 2, game.config.height / 2, 0, 40);
    let i = gameOptions.boardSize.cols * padding,
      a = i * gameOptions.aspectRatio;
    var s = this.make.text({
      x: i / 2,
      y: a / 2 - 25,
      text: "Loading...",
      style: { font: "20px monospace", fill: "#000000" },
    });
    s.setOrigin(0.5, 0.5);
    var n = this.make.text({
      x: i / 2,
      y: a / 2 + 20,
      text: "0%",
      style: { font: "18px monospace", fill: "#000000" },
    });
    n.setOrigin(0.5, 0.5);
    var r = this.make.text({
      x: i / 2,
      y: a / 2 + 70,
      text: "",
      style: { font: "18px monospace", fill: "#000000" },
    });
    r.setOrigin(0.5, 0.5),
      this.load.on("progress", function (t) {
        n.setText(parseInt(100 * t) + "%"),
          e.clear(),
          e.fillStyle(16726586, 1),
          e.fillRect(
            game.config.width / 2 - 150,
            game.config.height / 2,
            300 * t,
            40
          );
      }),
      this.load.on("fileprogress", function (e) {
        r.setText("Loading asset: " + e.key);
      }),
      this.load.on("complete", function () {
        e.destroy(), t.destroy(), s.destroy(), n.destroy(), r.destroy();
      });
    for (let l = 1; l <= 25; l++)
      this.load.image(
        `${l}`,
        `./gameImages/SlidePuzzleGameTileNum${l}.png`
      );
    for (let o = 1; o <= 24; o++)
      this.load.image(
        `green_${o}`,
        `./gameImages/SlidePuzzleGameGreenTileNum${o}.png`
      );
    this.load.image("999", "./gameImages/SlidePuzzleGameBlankTile.png"),
      this.load.image("bg", "./gameImages/SlidePuzzleGamebackground.png"),
      this.load.image("title", "./gameImages/SlidePuzzleGametitle.png"),
      this.load.image("play", "./gameImages/SlidePuzzleGamePlay_Button.png"),
      this.load.image("reset", "./gameImages/SlidePuzzleGameReset.png"),
      this.load.image("back", "./gameImages/SlidePuzzleGameBack_Button.png"),
      this.load.image("cross", "./gameImages/SlidePuzzleGameCross.png"),
      this.load.image("menu", "./gameImages/SlidePuzzleGameMenu.png"),
      this.load.image("level_bg", "./gameImages/SlidePuzzleGameLevel_bg.png"),
      this.load.image("number_holder", "./gameImages/SlidePuzzleGameNumber_Holder.png"),
      this.load.image("timer", "./gameImages/SlidePuzzleGameTimer.png"),
      this.load.image("easy", "./gameImages/SlidePuzzleGameEasy.png"),
      this.load.image("medium", "./gameImages/SlidePuzzleGameMedium.png"),
      this.load.image("hard", "./gameImages/SlidePuzzleGameHard.png"),
      this.load.image("winner", "./gameImages/SlidePuzzleGamewinner.png"),
      this.load.image("score_bg", "./gameImages/SlidePuzzleGamescore_Background.png"),
      this.load.image("score_bgf", "./gameImages/SlidePuzzleGamescore_bg_frame.png"),
      this.load.image("restart", "./gameImages/SlidePuzzleGamerestart.png"),
      this.load.image("exitButton", "./gameImages/exitButton.png");
    this.load.image("loginToSubmitBtn", "./gameImages/loginToSubmit.png");
  }
  create() {
    this.scene.start("TitleGame");
  }
}
class titleGame extends Phaser.Scene {
  constructor() {
    super("TitleGame");
  }
  create() {
    backtoboot = !1;
    this.add
      .image(game.config.width / 2, game.config.height / 2, "bg")
      .setDisplaySize(game.config.width, game.config.height),
      this.add
        .sprite(game.config.width / 2, game.config.height / 3, "title")
        .setInteractive()
        .setScale(0.4);
    let e = this.add
      .sprite(game.config.width / 2, game.config.height / 1.5, "play")
      .setInteractive()
      .setScale(0.6);
    e.on("pointerup", function () {
      e.clearTint(), (startGame = !0);
    });
    let o = this.add.image(100, 20, "exitButton").setInteractive().setScale(1);
    o.setOrigin(1, 0),
      o.on("pointerup", () => {
        quitGame();
      });
  }
  update() {
    !0 === startGame && ((startGame = !1), this.scene.start("MenuGame"));
  }
}
class menuGame extends Phaser.Scene {
  constructor() {
    super("MenuGame");
  }
  create() {
    backtomenu = !1;
    this.add
      .image(game.config.width / 2, game.config.height / 2, "bg")
      .setDisplaySize(game.config.width, game.config.height),
      this.add
        .sprite(game.config.width / 2, game.config.height / 2, "level_bg")
        .setInteractive()
        .setScale(0.4);
    let e = this.add.sprite(250, 360, "easy").setInteractive().setScale(0.5),
      t = this.add.sprite(250, 460, "medium").setInteractive().setScale(0.5),
      i = this.add.sprite(250, 560, "hard").setInteractive().setScale(0.5),
      a = this.add.sprite(420, 280, "cross").setInteractive().setScale(0.5),
      s = this.add
        .sprite(game.config.width / 10, game.config.height / 9, "back")
        .setInteractive()
        .setScale(0.5);
    e.on("pointerup", function () {
      e.clearTint(), (nextLavel = !0), (gameLevel = 1);
    }),
      t.on("pointerup", function () {
        t.clearTint(), (nextLavel = !0), (gameLevel = 2);
      }),
      i.on("pointerup", function () {
        i.clearTint(), (nextLavel = !0), (gameLevel = 3);
      }),
      a.on("pointerdown", function () {
        backtoboot = !0;
      }),
      s.on("pointerdown", function () {
        backtoboot = !0;
      });
  }
  update() {
    !1 !== backtoboot && this.scene.start("TitleGame"),
      !1 !== nextLavel &&
      ((nextLavel = !1), (stopTimer = !1), this.scene.start("PlayGame"));
    // ((nextLavel = !1), (stopTimer = !1), this.scene.start("SuccessGame"));
  }
}
class playGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }
  create() {
    (level = !1),
      (gameOver = !1),
      (reset = !1),
      (tiles = []),
      (clicks = 0),
      (gameScore = 0);
    let e = 0.5;
    this.add
      .image(game.config.width / 2, game.config.height / 2, "bg")
      .setDisplaySize(game.config.width, game.config.height),
      this.add
        .sprite(game.config.width / 2, game.config.height / 2, "number_holder")
        .setInteractive()
        .setScale(0.56),
      this.add.sprite(103, 170, "timer").setInteractive().setScale(0.6);
    let t = this.add.sprite(400, 120, "reset").setInteractive().setScale(0.6);
    this.add
      .sprite(400, 174, "menu")
      .setInteractive()
      .setScale(0.6)
      .on("pointerdown", function () {
        backtomenu = !0;
      }),
      t.on("pointerdown", function () {
        reset = !0;
      }),
      (myTime = 0),
      (startTimer = 1),
      (timeText = this.add.text(87, 147, "_", {
        fontFamily: "Suez One",
        fontWeight: 400,
        fontSize: "35px",
        fill: "#494949",
      })),
      (gameTimer = this.time.addEvent({
        delay: 1e3,
        callback: increamentTime,
        callbackScope: this,
        loop: !0,
      })),
      1 === gameLevel
        ? ((shuffledNumbers = getSolvableArray(3)),
          (gridWidth = 3),
          (gridAdjustValX = 0.94),
          (gridAdjustValY = 2.4),
          (tileSize = 130),
          (e = 0.7))
        : 2 === gameLevel
          ? ((shuffledNumbers = getSolvableArray(4)),
            (gridWidth = 4),
            (gridAdjustValX = 1.17),
            (gridAdjustValY = 3.2),
            (tileSize = 95),
            (e = 0.54))
          : 3 === gameLevel &&
          ((shuffledNumbers = getSolvableArray(5)),
            (gridWidth = 5),
            (gridAdjustValX = 0.78),
            (gridAdjustValY = 2.95),
            (tileSize = 90));
    let i = 0,
      a = this;
    for (var s = 0; s < gridWidth; s++)
      for (var n = 0; n < gridWidth; n++) {
        var r = shuffledNumbers[i];
        if (
          (1 === gameLevel && 9 === shuffledNumbers[i]) ||
          (2 === gameLevel && 16 === shuffledNumbers[i]) ||
          (3 === gameLevel && 25 === shuffledNumbers[i])
        )
          var l = this.add
            .image(n * tileSize, s * tileSize, 999)
            .setInteractive();
        else
          var l = this.add
            .image(n * tileSize, s * tileSize, r)
            .setInteractive();
        (l.number = r),
          l.setScale(e),
          (l.pos = { x: n + gridAdjustValX, y: s + gridAdjustValY }),
          l.on("pointerdown", function () {
            (clicks += 1), swapTiles(a, this);
          }),
          tiles.push(l),
          (i += 1);
      }
    rearrangeTiles();
    let o = this.add.image(100, 20, "exitButton").setInteractive().setScale(1);
    o.setOrigin(1, 0),
      o.on("pointerup", () => {
        quitGame();
      });
  }


  update() {
    let e = Math.floor(myTime / 60),
      t;
    (t = myTime > 59 ? myTime % 60 : myTime),
      !1 === stopTimer
        ? t < 10
          ? timeText.setText(e + ":0" + t)
          : timeText.setText(e + ":" + t)
        : stopSeconds < 10
          ? timeText.setText(stopMinutes + ":0" + stopSeconds)
          : timeText.setText(stopMinutes + ":" + stopSeconds),
      !1 !== reset && this.scene.start("PlayGame"),
      !1 !== gameOver &&
      (timeText.setText(e + ":" + t),
        this.time.delayedCall(
          500,
          () => {
            this.scene.get("SuccessGame")
              ? this.scene.start("SuccessGame")
              : console.error("Next scene is not loaded or does not exist.");
          },
          [],
          this
        )),
      !0 === backtomenu && ((backtomenu = !1), this.scene.start("MenuGame"));
  }
}

function increamentTime() {
  1 === startTimer && (myTime += 1);
}
class successGame extends Phaser.Scene {
  constructor() {
    super("SuccessGame");
  }
  create() {
    let background = this.add.image(game.config.width / 2, game.config.height / 2, "bg");
    background.setDisplaySize(game.config.width, game.config.height);

    let score_bgf = this.add.sprite(game.config.width / 2, game.config.height / 2, "score_bgf").setInteractive().setScale(0.8);
    let score_bg = this.add.sprite(250, 110, "score_bg").setInteractive().setScale(0.6);

    let winner = this.add.sprite(game.config.width / 2, game.config.height / 2, "winner").setInteractive().setScale(0.5);
    let menu_btn = this.add.sprite(game.config.width / 2, game.config.height / 1.4, "menu").setInteractive().setScale(0.6);

    if (!checkUserLoginStatus()) {
        saveScoreLocally(gameScore);
        sendScoreToParent({
          saveScoreLocal: true
        })
      } else {
         submitScore(gameScore);

      }

    let restart;
    if (checkUserLoginStatus() !== true) {
      restart = this.add.sprite(game.config.width / 2, game.config.height / 1.14, "restart").setInteractive().setScale(0.5);
    } else {
      restart = this.add.sprite(game.config.width / 2, game.config.height / 1.25, "restart").setInteractive().setScale(0.5);
    }

    


    let scoreTitleText = this.add.text(115, 50, "Game Score", {
      fontFamily: "Suez One",
      fontWeight: 400, fontSize: '50px', fill: '#ededed'
    });
    let scoreText = this.add.text(190, 100, Math.round(gameScore), {
      fontFamily: "Suez One",
      fontWeight: 400, fontSize: '50px', fill: '#ededed'
    });

    restart.on('pointerup', function () {
      restart.clearTint();
      reset = true;
    });

    menu_btn.on("pointerdown", function () {
      backtomenu = true;
    });

    let loginToSubmit = null;
    if (checkUserLoginStatus() !== true) {
      loginToSubmit = this.add.sprite(game.config.width / 2, game.config.height / 1.38 + (game.config.height / 15), "loginToSubmitBtn");
      loginToSubmit.setDepth(2);
      loginToSubmit.setInteractive();
      loginToSubmit.setScale(.6);
    }

    if (checkUserLoginStatus() !== true) {
      console.log("true")
      loginToSubmit.on('pointerover', () => {
        loginToSubmit.setScale(.65);
      });

      loginToSubmit.on('pointerout', () => {
        loginToSubmit.setScale(0.6);
      });

      loginToSubmit.on('pointerdown', () => {
        showLoginPrompt();
      });
    }
  }

  update() {
    !1 !== reset && ((stopTimer = !1), this.scene.start("PlayGame")),
      !0 === backtomenu && ((backtomenu = !1), this.scene.start("MenuGame"));
  }
}
function resizeGame() {
  let e = document.querySelector("canvas"),
    t = window.innerWidth,
    i = window.innerHeight,
    a = game.config.width / game.config.height;
  t / i < a
    ? ((e.style.width = t + "px"), (e.style.height = t / a + "px"))
    : ((e.style.width = i * a + "px"), (e.style.height = i + "px"));
}
function shuffleArray(e) {
  for (let t = e.length - 1; t > 0; t--) {
    let i = Math.floor(Math.random() * (t + 1));
    [e[t], e[i]] = [e[i], e[t]];
  }
  return e;
}
function swapTiles(e, t) {
  var i;
  if (
    (1 === gameLevel
      ? (i = tiles.find((e) => 9 === e.number))
      : 2 === gameLevel
        ? (i = tiles.find((e) => 16 === e.number))
        : 3 === gameLevel && (i = tiles.find((e) => 25 === e.number)),
      areAdjacent(arrayToMatrix(getTilesArray()), t.number, i.number))
  ) {
    let a = e.tweens.create({
      targets: t,
      x: i.x,
      y: i.y,
      duration: 200,
      ease: "Quad.easeOut",
      yoyo: !1,
      repeat: 0,
    });
    a.play(),
      setTimeout(() => {
        try {
          let e = tiles.findIndex((e) => e.number === t.number),
            a = tiles.findIndex((e) => e.number === i.number);
          [tiles[e], tiles[a]] = [tiles[a], tiles[e]];
        } catch (s) {
          console.log("error", s);
        }
        var n = { x: t.pos.x, y: t.pos.y };
        (t.pos = { x: i.pos.x, y: i.pos.y }), (i.pos = n), rearrangeTiles();
      }, 200);
  }
}
function checkWin() {
  for (var e = 0; e < tiles.length; e++)
    if (tiles[e].number !== e + 1) return !1;
  return !0;
}
function rearrangeTiles() {
  for (var e = 0; e < tiles.length; e++) {
    var t = tiles[e];
    (t.x = t.pos.x * tileSize),
      (t.y = t.pos.y * tileSize),
      (1 === gameLevel && 9 === t.number) ||
        (2 === gameLevel && 16 === t.number) ||
        (3 === gameLevel && 25 === t.number)
        ? t.setTexture("999")
        : t.number === e + 1
          ? t.setTexture(`green_${t.number}`)
          : t.setTexture(`${t.number}`);
  }
  checkWin() &&
    (gameTimer.remove(),
      (stopTimer = !0),
      (gameOver = !0)),
     (gameScore = calculateScore(clicks, myTime, gameLevel));
}
function getSolvableArray(e) {
  let t = generateSolvableSlidingPuzzle(e),
    i = [],
    a = 0;
  for (let s = 0; s < t.length; s++)
    for (let n = 0; n < t[0].length; n++) (i[a] = t[s][n]), a++;
  return i;
}

function generateSolvableSlidingPuzzle(e) {
  let t = Array.from({ length: e * e - 1 }, (e, t) => t + 1);
  t.push(e * e);
  for (let i = 0; i < Math.floor(41 * Math.random()) + 300; i++) {
    let a = t.indexOf(e * e),
      s = getNeighbors(a, e),
      n = s[Math.floor(Math.random() * s.length)];
    [t[a], t[n]] = [t[n], t[a]];
  }
  return chunkArray(t, e);
}
function getNeighbors(e, t) {
  let i = [],
    a = Math.floor(e / t),
    s = e % t;
  return (
    a > 0 && i.push(e - t),
    a < t - 1 && i.push(e + t),
    s > 0 && i.push(e - 1),
    s < t - 1 && i.push(e + 1),
    i
  );
}
function chunkArray(e, t) {
  let i = [];
  for (let a = 0; a < e.length; a += t) i.push(e.slice(a, a + t));
  return i;
}
function arrayToMatrix(e) {
  let t = Math.sqrt(e.length),
    i = [];
  for (let a = 0; a < t; a++) i[a] = e.slice(a * t, (a + 1) * t);
  return i;
}
function areAdjacent(e, t, i) {
  let a = e.flat().indexOf(t),
    s = e.flat().indexOf(i);
  if (-1 === a || -1 === s) return !1;
  let n = Math.floor(a / e[0].length),
    r = a % e[0].length,
    l = Math.floor(s / e[0].length),
    o = s % e[0].length;
  return (
    (1 === Math.abs(n - l) && r === o) || (1 === Math.abs(r - o) && n === l)
  );
}
function getTilesArray() {
  let e = [];
  for (let t = 0; t < tiles.length; t++) e[t] = tiles[t].number;
  return e;
}
// function calculateScore(e, t, i) {
//   let a = 0,
//     s = 1,
//     n = 1;
//   switch (i) {
//     case 1:
//       (a = 5e3), (s = 2), (n = 3);
//       break;
//     case 2:
//       (a = 1e4), (s = 4), (n = 6);
//       break;
//     case 3:
//       (a = 15e3), (s = 4), (n = 6);
//       break;
//     default:
//       return console.error("Invalid level specified."), null;
//   }

//   return Math.max(a - t * s - e * n, 0);
// }

function calculateScore(e, t, i) {
  let baseScore = 0,    // Base score based on level
    clickMultiplier = 1,   // Multiplier for clicks
    timeMultiplier = 1;    // Multiplier for time

  // Set base score, click multiplier, and time multiplier based on the level
  switch (i) {
    case 1:
      baseScore = 5000;
      clickMultiplier = 2;
      timeMultiplier = 3;
      break;
    case 2:
      baseScore = 10000;
      clickMultiplier = 4;
      timeMultiplier = 6;
      break;
    case 3:
      baseScore = 15000;
      clickMultiplier = 4;
      timeMultiplier = 6;
      break;
    default:
      console.error("Invalid level specified.");
      return null;
  }

  // Calculate the score based on clicks and time taken
  let score = baseScore - (e * clickMultiplier) - (t * timeMultiplier);

  // Ensure that score does not go below 0
  score = Math.max(score, 0);

  // Debugging: Print the values of e, t, and score
  console.log("Level:", i);
  console.log("Clicks (e):", e, "Click Multiplier:", clickMultiplier);
  console.log("Time Taken (t):", t, "Time Multiplier:", timeMultiplier);
  console.log("Calculated Score:", score);

  return score;
}

async function submitScore(e) {

 if (!gameLevels) {
   gameLevels = null;
   console.log("gameLevels:", gameLevels)
 }
 let t = { score: e, gameNo: 4, slug:"number-puzzle-game" ,gameLevels : gameLevels },
   i = {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(t),
   };
 fetch("https://www.mindyourlogic.com/submit-game-data", i)
   .then((e) => {

      if (!e.ok) {
        return response.text().then(text => {
          throw new Error(`Failed to submit score: ${text}`);
        });
      }
        sendScoreToParent({
          submitGameScore: true
        });
      return e.json();
   })
   .then((e) => { })
   .catch((e) => {
     console.error("There was a problem with the fetch operation:", e);
  });
}



function quitGame() {
  console.log("done");
    sendScoreToParent({
    exit: true
  })

}



function checkUserLoginStatus() {
  if (!userName) {
    console.log("logout");
   return false;
  } else {
    console.log("login");
   return true;
 }
}

function saveScoreLocally(score) {
  console.log("setting game score", score)
  localStorage.setItem('gameScore', score);
}
//changes
function showLoginPrompt() {
  sendScoreToParent({
    showLoginPrompt: true
  })
}
//changes
function handleGameEnd(score) {
  console.log(checkUserLoginStatus())
  if (checkUserLoginStatus()) {
    console.log("Score Submitted");
    // submitScore(score)
  } else {
    saveScoreLocally(score)
    // showLoginPrompt();
  }
}

//Baner-advertisement
function createAndInsertAdContainer() {
  // Create ad container
  const adContainer = document.createElement('div');
  adContainer.id = 'ad-container';
  adContainer.style.width = `100%`;
  adContainer.style.textAlign = 'center';
  adContainer.style.padding = '0px 0';
  adContainer.style.position = 'fixed';
  adContainer.style.bottom = '0';
  adContainer.style.left = '0';
  adContainer.style.zIndex = '1000';
  adContainer.style.boxSizing = 'border-box';

  // Create ad element
  const adElement = document.createElement('ins');
  adElement.className = 'adsbygoogle';
  adElement.style.display = 'inline-block';
  adElement.style.width = '300px';
  adElement.style.height = '50px';
  adElement.setAttribute('data-ad-client', 'ca-pub-8799532619904947');
  adElement.setAttribute('data-ad-slot', '1043697660');


  // Append ad element to ad container
  adContainer.appendChild(adElement);

  // Append the ad container to the game container
  gameContainer.appendChild(adContainer);

  // Load Google AdSense script
  const initScript = document.createElement('script');
  initScript.textContent = `(adsbygoogle = window.adsbygoogle || []).push({});`;
  adContainer.appendChild(initScript);

}

function sendScoreToParent(t) {
    window.parent.postMessage(t, "*")
    console.log("posting message..")
}



  let e = gameOptions.boardSize.cols * padding,
    t = e * gameOptions.aspectRatio;

  let config = {
    width: e,
    height: t,
    parent: "memory-blink-game-container",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        fullscreenTarget: 'Phaser-game'
    },
    backgroundColor: 15528177,
    scene: [bootGame, titleGame, menuGame, playGame, successGame],
  }


game = new Phaser.Game(config);

  window.focus();
  resizeGame();
  window.addEventListener("resize", resizeGame);

