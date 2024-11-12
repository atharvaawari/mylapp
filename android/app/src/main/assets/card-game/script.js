const moves = document.getElementById("moves");
const timeValue = document.getElementById("time");
const mach = document.getElementById("matches");
const startButton = document.getElementById("startGame");
const restartButton = document.getElementById("restart");
const intermediateButton = document.querySelector(".intermediate-btn")
const expertButton = document.querySelector(".expert-btn")
const gameContainer = document.querySelector(".card-game-container");
const result = document.getElementById("result");
const mainContainer = document.querySelector(".game-screen-two");
const startButtonContainer = document.getElementById("startButton");
const buttons = document.querySelectorAll('.game-mode-btn');
const begBtn = document.querySelector('.beginner-btn');
const intBtn = document.querySelector('.intermediate-btn');
const expBtn = document.querySelector('.expert-btn');
const popUp = document.getElementById("score-popUp");
const retry = document.querySelector('#retry');
const closeBtn = document.getElementById("close-btn");
const backBtn = document.getElementById("back-btn");
let fullScreen = document.querySelector(".Memory-game-main-container");// To make the whole page fullscreen; adjust as needed
const loginToSubmit = document.querySelector('#login-to-submit');
let levelBtnBox = document.getElementById('level-btn-box');
const menuBtn = document.querySelector('#menu-btn');
const popup = document.querySelector('#popup');
const closeingBtn = document.querySelector('#close-btn');
const selectLevel = document.querySelector('#select-level');
// const gameScreenTwo = document.querySelector('.game-screen-two');

let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
let loginPopup = document.getElementById("loginPopup");
let overlay = document.getElementById("overlay")
const slug = "card-game";


    let gameLevels = null;
    let userName = null;
    const urlParams = new URLSearchParams(window.location.search);
  
    const user = urlParams.get('user');
    const levels = urlParams.get('levels');
    
  
    if(user && JSON.parse(user)){
      userName = true;
      console.log("login");
    }else{
      console.log("logout");
    }
    
    if(levels && JSON.parse(levels)){
      gameLevels = levels;
      console.log("gameLevels -- ", JSON.parse(levels));
    }  



var gameMode = "beginner";
let cards;
let interval;
let firstCard = false;
let secondCard = false;
let firstClicked = true;
let firstTimeClicked = false;
let size = 0;
let stars = 3;
let maches = 0;
let isStart = true;
let viewportWidth = window.innerWidth;
let cardValues = [];
let score;
let isGameActive = false;


const items = [
  { name: "bee", image: "/static/web-games/memory-card-game/bee.png" },
  { name: "crocodile", image: "/static/web-games/memory-card-game/crocodile.png" },
  { name: "macaw", image: "/static/web-games/memory-card-game/macaw.png" },
  { name: "gorilla", image: "/static/web-games/memory-card-game/gorilla.png" },
  { name: "tiger", image: "/static/web-games/memory-card-game/tiger.png" },
  { name: "monkey", image: "/static/web-games/memory-card-game/monkey.png" },
  { name: "chameleon", image: "/static/web-games/memory-card-game/chameleon.png" },
  { name: "piranha", image: "/static/web-games/memory-card-game/piranha.png" },
  { name: "anaconda", image: "/static/web-games/memory-card-game/anaconda.png" },
  { name: "sloth", image: "/static/web-games/memory-card-game/sloth.png" },
  { name: "cockatoo", image: "/static/web-games/memory-card-game/cockatoo.png" },
  { name: "toucan", image: "/static/web-games/memory-card-game/toucan.png" },
  { name: "snail", image: "/static/web-games/memory-card-game/snail.png" },
  { name: "octopus", image: "/static/web-games/memory-card-game/octopus.png" },
  { name: "owl", image: "/static/web-games/memory-card-game/owl.png" },
  { name: "sea-turtle", image: "/static/web-games/memory-card-game/sea-turtle.png" },
  { name: "crab", image: "/static/web-games/memory-card-game/crab.png" },
  { name: "cow", image: "/static/web-games/memory-card-game/cow.png" },
  { name: "fox", image: "/static/web-games/memory-card-game/fox.png" },
  { name: "panda", image: "/static/web-games/memory-card-game/panda.png" },
  { name: "deer", image: "/static/web-games/memory-card-game/deer.png" },
  { name: "bat", image: "/static/web-games/memory-card-game/bat.png" },
  { name: "strawberry", image: "/static/web-games/memory-card-game/strawberry.png" },
  { name: "grapes", image: "/static/web-games/memory-card-game/grapes.png" },
  { name: "grapefruit", image: "/static/web-games/memory-card-game/grapefruit.png" },
  { name: "mango", image: "/static/web-games/memory-card-game/mango.png" },
  { name: "watermelon", image: "/static/web-games/memory-card-game/watermelon.png" },
  { name: "bananas", image: "/static/web-games/memory-card-game/bananas.png" },
  { name: "coconut", image: "/static/web-games/memory-card-game/coconut.png" },
  { name: "sea-urchin", image: "/static/web-games/memory-card-game/sea-urchin.png" },
  { name: "forest", image: "/static/web-games/memory-card-game/forest.png" },
  { name: "tree", image: "/static/web-games/memory-card-game/tree.png" },
  { name: "christmas-tree", image: "/static/web-games/memory-card-game/christmas-tree.png" },
  { name: "palm-tree", image: "/static/web-games/memory-card-game/palm-tree.png" },

];

let seconds = 0;
let minutes = 0;
let movesCount = 0;
let winCount = 0;


function gameSetup(gameContainerWidth) {
  gameContainer.style.setProperty("--gameContainer-size", gameContainerWidth + "px");
}

const timeGenerator = () => {
  seconds += 1;
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span style= "display: flex; justify-content: center;  align-items: center;"> 
  <img src="/static/web-games/memory-card-game/time.png" height="35px" alt="icon"> : ${minutesValue}:${secondsValue}</span>`;
};

const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = movesCount < 10 ? `<span>Moves: 0${movesCount}</span>` : `<span>Moves: ${movesCount}</span>`;
};

const generateRandom = (size = 4) => {
  let cardValuesInGenerateRandom = [];
  let tempArray = [...items];
  if (size === 8 && viewportWidth < 586) {
    size = (size * size + 2) / 2;
  } else {
    size = (size * size) / 2;
  }

  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValuesInGenerateRandom.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }

  return cardValuesInGenerateRandom;
};

const matrixGenerator = (cardValues, size = 4, cardWidth = 60) => {

  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  cardValues.sort(() => Math.random() - 0.5);

  if (size === 8 && viewportWidth < 586) {
    size = (size * size + 2);
  } else {
    size = (size * size);
  }
  //card inner html of pictre
  for (let i = 0; i < size; i++) {
    gameContainer.innerHTML += `
       <div class="card-container" style="height: ${cardWidth}px; width: ${cardWidth}px;"  data-card-value="${cardValues[i].name}">
          <div class="card-before"> 
          <img src="/static/web-games/memory-card-game/queIcon.svg" class="image"/>
          </div>
          <div class="card-after">
            <img src="${cardValues[i].image}" class="image"/>
           
          </div>
       </div>
       `;
  }
  gameContainer.style.gridTemplateColumns = `repeat(${size},1fr)`;

  let firstCardValue;
  let secondCardValue;

  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", async () => {

      // Start counter
      if (firstClicked) {
        startCounter();
        firstClicked = false;

      }


      if (card.classList.contains("flipped")) return;


      //If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
      if (!card.classList.contains("matched")) {
        //flip the cliked card
        card.classList.add("flipped");
        //if it is the firstcard (!firstCard since firstCard is initially false)
        if (!firstCard) {
          //so current card will become firstCard
          firstCard = card;
          //current cards value becomes firstCardValue
          firstCardValue = card.getAttribute("data-card-value");
          // console.log(firstCardValue);
        } else {
          //increment moves since user selected second card
          movesCounter();
          // console.log(movesCount);

          //secondCard and value
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            //if both cards match add matched class so these cards would beignored next time
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");


            //   firstCard.classList.toggle('active');
            //  secondCard.classList.toggle('active');


            maches += 1;
            // console.log(maches);
            mach.innerHTML = `<span style= "display: flex; justify-content: center;  align-items: center;"> 
  <img src="/static/web-games/memory-card-game/matches.png" height="35px" alt="icon">: ${maches}</span`;

            //set firstCard to false since next card would be first now
            firstCard = false;
            // * winCount increment as user found a correct match

            winCount += 1;

            if (winCount == Math.floor(cardValues.length / 2)) {

              clearInterval(interval);
              //startButton.classList.remove("hide");
              //mainContainer.classList.add("hide");
              // startButtonContainer.classList.remove("reduce-startButton-area");

              win(movesCount, minutes, seconds);

            }

          } else {
            //if the cards dont match
            //flip the cards back to normal
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 600);
          }
        }
      }
    });
  });
};

function openPopup() {
  console.log("POPUP open")
  document.getElementById('popup').classList.remove('hidePopUp');
  document.getElementById('overlay').classList.remove('hidePopUp');
}

function calculateScore(clicks, timeInSeconds, clicksBeforePenalty, timeBeforePenalty, maximumScore, movesPenaltyPerMove, timePenaltyPerSecond) {
  const maxScore = maximumScore;

  const movesPenalty = Math.max(500, (clicks - clicksBeforePenalty) * movesPenaltyPerMove);
  const timePenalty = Math.max(500, (timeInSeconds - timeBeforePenalty) * timePenaltyPerSecond);
  const finalScore = Math.max(500, maxScore - timePenalty - movesPenalty);

  return finalScore;
}

function win(moves, minutes, seconds) {
  firstClicked = true;

  let time_value = minutes * 60 + seconds;

  if (gameMode == "beginner") {
    score = Math.round(calculateScore(moves * 2, time_value, 20, 25, 5000, 30, 10)); // changed 20 to 18

  } else if (gameMode == "intermediate") {
    score = Math.round(calculateScore(moves * 2, time_value, 35, 120, 10000, 25, 50)); // changed 50 to 54 and 6o to 90

  } else if (gameMode == "expert") {
    score = Math.round(calculateScore(moves * 2, time_value, 70, 150, 15000, 15, 15)); // changed 100 to 180
  }


  getScore().then(highestScore => {
    if (highestScore !== null) {

      let setScore = document.getElementById('user-score');

      if (score > highestScore) {
        setScore = `Congratulations! You set a new highest score of ${score}.`;
      } else {
        const difference = highestScore - score;
        //   setScore = `You were ${difference} points away from the top score of ${highestScore}.`;
      }

      setScore = ` score ${score}.`;

      document.getElementById('user-score').innerHTML = `${setScore}`;

      if (!userName) {
        localStorage.setItem('gameScore', score);
        loginToSubmit.style.display = 'block';
      } else {
        submitScore(score);
        loginToSubmit.style.display = 'none';
        
        sendScoreToParent({
         submitGameScore: true
        })
      }

      popUp.style.display = "flex";

    }
  });

}

function startCounter() {
  clearInterval(interval);
  interval = setInterval(timeGenerator, 1000);
}

restartButton.addEventListener("click", restartGame, false);

function restartGame() {

  switch (gameMode) {
    case "beginner":
      memoryCardBeginnerGame();
      break;
    case "intermediate":
      memoryCardIntermediateGame();
      break;
    case "expert":
      memoryCardExpertGame();
      break;
    default:
      memoryCardBeginnerGame();
      break;
  }


}


  if (isGameActive) {
    mainContainer.classList.remove("hide");
  } else {
    levelBtnBox.style.display = 'flex';


  }




function stopGame() {
  resetData();
}

function startMemoryGame() {
  try {

    startButton.classList.add("hide");
    restartButton.classList.remove("hide")


    movesCount = 0;
    seconds = 0;
    minutes = 0;
    maches = 0;
    clearInterval(interval);
    startCounter();

    moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
    timeValue.innerHTML = `<span style= "display: flex; justify-content: center;  align-items: center;"> 
  <img src="/static/web-games/memory-card-game/time.png" height="35px" alt="icon"> : 00:00</span>`;
    mach.innerHTML = `<span style= "display: flex; justify-content: center;  align-items: center;"> 
  <img src="/static/web-games/memory-card-game/matches.png" height="35px" alt="icon">: 0</span>`;

  } catch (error) {
    console.log(error)
  }

}


function handleFullScreen() {
  console.log("fullScreen");

  if (fullScreen.requestFullscreen) {
    fullScreen.requestFullscreen();
  } else if (fullScreen.mozRequestFullScreen) { /* Firefox */
    fullScreen.mozRequestFullScreen();
  } else if (fullScreen.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    fullScreen.webkitRequestFullscreen();
  } else if (fullScreen.msRequestFullscreen) { /* IE/Edge */
    fullScreen.msRequestFullscreen();
  } else if (isIOS) {

    fullScreen.style.width = '100vw';
    fullScreen.style.height = '100vh';
    fullScreen.style.position = 'fixed';
    fullScreen.style.top = '0';
    fullScreen.style.left = '0';
    fullScreen.style.zIndex = '999999999';
    fullScreen.style.background = 'aliceblue';
    fullScreen.style.paddingTop = '2rem';
    fullScreen.style.paddingBottom = '2rem';
    fullScreen.style.overflow = 'scroll';

    // Apply overflow and set a specific height to enable scrolling
    fullScreen.style.overflow = 'scroll'; // or 'scroll' if you always want the scrollbar to be visible
    fullScreen.style.maxHeight = 'calc(100vh - 2rem)'; // Adjust the height based on your layout
  }

}

function resetData() {
  winCount = 0;
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  maches = 0;
  firstClicked = true;

  moves.innerHTML = `<span>Moves: </span>${movesCount}`;
  timeValue.innerHTML = `<span style= "display: flex; justify-content: center;  align-items: center;"> 
  <img src="/static/web-games/memory-card-game/time.png" height="35px" alt="icon">: 00:00</span>`;
  mach.innerHTML = `<span style= "display: flex; justify-content: center;  align-items: center;"> 
  <img src="/static/web-games/memory-card-game/matches.png" height="35px" alt="icon">: 0</span>`;
  clearInterval(interval);
}

function memoryCardBeginnerGame() {
  try {
    levelBtnBox.style.display = 'none';
    restartButton.classList.remove("hide");
    mainContainer.classList.remove("hide");

    // changeBtnSizes(85, 10);
    viewportWidth = window.innerWidth;
    size = 4;
    gameMode = "beginner";
    stopGame();
    result.innerText = "";
    winCount = 0;
    cardValues = generateRandom(size);

    if (viewportWidth < 586) {
      gameSetup(300);
      // changeBtnSizes(85, 10);
      matrixGenerator(cardValues, size, 65);
    } else {
      gameSetup(380);
      // changeBtnSizes(110, 15);
      matrixGenerator(cardValues, size, 85);
    }

  } catch (error) {

    console.log(error)

  }


}

function memoryCardIntermediateGame() {
  levelBtnBox.style.display = 'none';
  restartButton.classList.remove("hide");
  mainContainer.classList.remove("hide");

  gameModeChanger();
  viewportWidth = window.innerWidth;

  size = 6;
  gameMode = "intermediate";
  stopGame();
  result.innerText = "";
  winCount = 0;
  cardValues = generateRandom(size);

  if (viewportWidth < 586) {
    gameSetup(300);
    // changeBtnSizes(85, 10);
    matrixGenerator(cardValues, size, 45);
  } else {
    gameSetup(414);
    // changeBtnSizes(110, 15);
    matrixGenerator(cardValues, size, 60);
  }

}

function memoryCardExpertGame() {

  levelBtnBox.style.display = 'none';
  restartButton.classList.remove("hide");
  mainContainer.classList.remove("hide");

  gameModeChanger()
  viewportWidth = window.innerWidth;

  size = 8;
  gameMode = "expert";
  stopGame();
  result.innerText = "";
  winCount = 0;
  cardValues = generateRandom(size);

  if (viewportWidth < 586) {
    gameSetup(300);
    // changeBtnSizes(85, 10);
    matrixGenerator(cardValues, size, 45);
  } else {
    gameSetup(530);
    // changeBtnSizes(110, 15);
    matrixGenerator(cardValues, size, 60);
  }

}

function gameModeChanger() {

  // Loop through each button
  buttons.forEach(button => {
    // Add click event listener to each button
    button.addEventListener('click', function () {
      // Remove 'active' class from all buttons
      buttons.forEach(btn => {
        btn.classList.remove('game-mode-active');
      });
      // Add 'active' class to the clicked button
      this.classList.add('game-mode-active');
    });
  });

}

function changeBtnSizes(btnWidth, btnFontSize) {

  begBtn.style.setProperty('width', `${btnWidth}px`);
  begBtn.style.setProperty('font-size', `${btnFontSize}px`);

  intBtn.style.setProperty('width', `${btnWidth}px`);
  intBtn.style.setProperty('font-size', `${btnFontSize}px`);

  expBtn.style.setProperty('width', `${btnWidth}px`);
  expBtn.style.setProperty('font-size', `${btnFontSize}px`);

}

begBtn.addEventListener("click", memoryCardBeginnerGame);
intBtn.addEventListener("click", memoryCardIntermediateGame);
expBtn.addEventListener("click", memoryCardExpertGame);

//NEW CHANGES
menuBtn.addEventListener('click', function () {
  popup.style.display = 'flex'; // Show the popup
});

closeingBtn.addEventListener('click', function () {
  console.log('close')
  popup.style.display = 'none'; // Hide the popup
});


selectLevel.addEventListener('click', function (e) {
  mainContainer.classList.add("hide");
  popup.style.display = 'none';
  levelBtnBox.style.display = 'flex';
})

backBtn.addEventListener('click', function (e) {
  exitGame();
})

fullScreen.addEventListener('fullscreenchange', (event) => {
  if (!document.fullscreenElement) {
    exitGame();
  }
})

function getPage() {
  localStorage.setItem('gameScore', score);
  openAuthPopup()
}

function submitScore(score) {
  
  if (!gameLevels) {
    gameLevels = null;
    console.log("gameLevels:", gameLevels)
  }

  const data = {
    score: score,
    gameNo: 4,
    slug: "card-game",
    gameLevels:gameLevels
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
    },
    body: JSON.stringify(data), 
  };

  fetch("https://www.mindyourlogic.com/submit-game-data", options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse response body as JSON
    })
    .then((data) => {
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error); // Handle errors
    });
}

async function getScore() {

  try {
    const response = await fetch('/get-web-game-highest-score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        gameNo: 4,
        slug: slug
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch highest score');
    }

    const data = await response.json();

    return data.highestScore;
    // return 500
  } catch (error) {
    console.error('Error fetching highest score:', error);
    return null; 
  }
}


function closeScorePopup() {
  popUp.style.display = 'none';
  gameModeChanger();
  startMemoryGame();
  resetData()
  // location.reload();

  if (gameMode == "beginner") {
    memoryCardBeginnerGame();

  } else if (gameMode == "intermediate") {
    memoryCardIntermediateGame();

  } else if (gameMode == "expert") {
    memoryCardExpertGame();
  }
}

document.addEventListener('selectstart', function (e) {
  e.preventDefault();
});


function openAuthPopup() {
   sendScoreToParent({
     showLoginPrompt: true
  })
}

retry.addEventListener('click', function () {
  popUp.style.display = 'none';
  restartGame()
})

function exitGame() {
  isGameActive = true;
  sendScoreToParent({
    exit: true
  })
}

document.addEventListener('DOMContentLoaded', () => {

  const loginToSubmitBtn = document.getElementById("login-to-submit");
  if (loginToSubmitBtn) {
    loginToSubmitBtn.addEventListener("click", getPage);
  }

  if (closeBtn) {
    console.log("closePopup");
    closeBtn.addEventListener("click", closeScorePopup);
  }
});

function sendScoreToParent(t) {
    window.parent.postMessage(t, "*")
}

