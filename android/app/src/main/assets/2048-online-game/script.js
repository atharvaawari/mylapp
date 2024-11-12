

// Automatically focus the game container on page load


import e, {
    updateScore as t,
    resetCurrentScore as n,
    updateHighscore as o,
    getAllScore as l,
    getViewPort as i,
} from "./Grid.js";
import a from "./Tile.js";

let slug = "2048-online-game";
let closebtn = document.getElementById("close-btn");
let loginToSubmit = document.getElementById("login-to-submit");
let backBtn = document.getElementById("back-btn")

let gameLevels = null;
let userName = null;
const urlParams = new URLSearchParams(window.location.search);

const user = urlParams.get('user');
const levels = urlParams.get('levels');


if (user && JSON.parse(user)) {
    userName = true;
    console.log("login");
} else {
    console.log("logout");
}

if (levels && JSON.parse(levels)) {
    gameLevels = levels;
    console.log("gameLevels -- ", JSON.parse(levels));
}



let initialX = null,
    initialY = null,
    viewportWidth = window.innerWidth,
    isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
    gameBoard = document.getElementById("gameBoard"),
    newGame = document.getElementById("newGame"),
    startGame = document.getElementById("startGame"),
    headBox = document.getElementById("headBox"),
    popUp = document.getElementById("pop-up"),
    loading = document.getElementById("loading"),
    gameBox = document.getElementById("game-container"),
    highBox = document.getElementById("highBox"),
    fullScreen = document.getElementById("game-Container"),
    scorePopup = document.querySelector("#pop-up"),
    loginPopup = document.querySelector("#loginPopup"),
    overlay = document.querySelector("#overlay"),
    grid = new e(gameBoard);
function loadGame() {
    restartGame(),
        (gameBoard.style.display = "grid");
}
function handleFullScreen() {
    fullScreen.classList.remove("game-box-bg-img"),
        (backBtn.style.display = "block"),
        fullScreen.requestFullscreen
            ? fullScreen.requestFullscreen()
            : fullScreen.mozRequestFullScreen
                ? fullScreen.mozRequestFullScreen()
                : fullScreen.webkitRequestFullscreen
                    ? fullScreen.webkitRequestFullscreen()
                    : fullScreen.msRequestFullscreen
                        ? fullScreen.msRequestFullscreen()
                        : isIOS &&
                        ((gameBox.style.width = "100vw"),
                            (gameBox.style.height = "100vh"),
                            (gameBox.style.position = "fixed"),
                            (gameBox.style.top = "0"),
                            (gameBox.style.left = "0"),
                            (gameBox.style.zIndex = "999999999"),
                            (gameBox.style.background = "aliceblue"),
                            (gameBox.style.paddingTop = "2rem"),
                            gameBox.addEventListener(
                                "touchmove",
                                function (e) {
                                    e.preventDefault();
                                },
                                { passive: !1 }
                            ));
}
function backToStartGame() {
    (startGame.style.display = "block"),
        (gameBoard.style.display = "none"),
        (headBox.style.display = "none");
}
function restartGame() {
    clearGrid(),
        t(0),
        n(),
        (grid.randomEmptyCell().tile = new a(gameBoard)),
        (grid.randomEmptyCell().tile = new a(gameBoard)),
        setupInputWeb(),
        setupInputMobile();
}
function clearGrid() {
    for (let e of grid.cells)
        e.tile && (e.tile.remove(), e.tile, (e.tile = null));
}
function setupInputWeb() {
    window.addEventListener("keydown", handleInputWeb, { once: !0 });
}
async function handleInputWeb(e) {
    switch (e.key) {
        case "ArrowUp":
            if (!canMoveUp()) {
                setupInputWeb();
                return;
            }
            await moveUp();
            break;
        case "ArrowDown":
            if (!canMoveDown()) {
                setupInputWeb();
                return;
            }
            await moveDown();
            break;
        case "ArrowLeft":
            if (!canMoveLeft()) {
                setupInputWeb();
                return;
            }
            await moveLeft();
            break;
        case "ArrowRight":
            if (!canMoveRight()) {
                setupInputWeb();
                return;
            }
            await moveRight();
            break;
        default:
            setupInputWeb();
            return;
    }
    grid.cells.forEach((e) => e.mergeTiles());
    let t = new a(gameBoard);
    if (
        ((grid.randomEmptyCell().tile = t),
            !canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight())
    ) {
        t.waitForTransition(!0).then(() => {
            getScore().then((e) => {
                if (null !== e) {
                    let { currentScore: t, highScore: n } = l(),
                        o = document.getElementById("user-score");
                    (o =
                        t > e
                            ? `Congratulations! You set a new highest score of ${t}.`
                            : `You were ${e - t} points away from the top score of ${e}.`),
                        (document.getElementById("user-score").innerHTML = `${o}`),
                        (highBox.innerHTML = `<h3>Best <br>${e}</h3>`),
                        (popUp.style.display = "block");
                }
            }),
                endGame();
        });
        return;
    }
    setupInputWeb();
}
function setupInputMobile() {
    gameBoard.addEventListener(
        "touchstart",
        handleTouchStart,
        { passive: !0 },
        { once: !0 }
    );
}
function handleTouchStart(e) {
    gameBoard.addEventListener(
        "touchmove",
        handleTouchMove,
        { passive: !0 },
        { once: !0 }
    ),
        (initialX = e.touches[0].clientX),
        (initialY = e.touches[0].clientY);
}
async function handleSwipeRight() {
    if (!canMoveRight()) {
        setupInputMobile();
        return;
    }
    await moveRight();
}
async function handleSwipeLeft() {
    if (!canMoveLeft()) {
        setupInputMobile();
        return;
    }
    await moveLeft();
}
async function handleSwipeDown() {
    if (!canMoveDown()) {
        setupInputMobile();
        return;
    }
    await moveDown();
}
async function handleSwipeUp() {
    if (!canMoveUp()) {
        setupInputMobile();
        return;
    }
    await moveUp();
}
async function handleTouchMove(e) {
    if ((setupInputMobile(), !initialX || !initialY)) return;
    let t = e.touches[0].clientX,
        n = e.touches[0].clientY,
        o = t - initialX,
        i = n - initialY;
    if (
        (Math.abs(o) > Math.abs(i)
            ? o > 0
                ? await handleSwipeRight()
                : await handleSwipeLeft()
            : i > 0
                ? await handleSwipeDown()
                : await handleSwipeUp(),
            (initialX = null),
            (initialY = null),
            await grid.cells.forEach((e) => e.mergeTiles()),
            grid.cells.some((e) => null === e.tile))
    ) {
        let r = new a(gameBoard);
        if (
            ((grid.randomEmptyCell().tile = r),
                !canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight())
        ) {
            r.waitForTransition(!0).then(() => {
                getScore().then((e) => {
                    if (null !== e) {
                        let { currentScore: t, highScore: n } = l(),
                            o = document.getElementById("user-score");
                        (o =
                            t > e
                                ? `Congratulations! You set a new highest score of ${t}.`
                                : `You were ${e - t} points away from the top score of ${e}.`),
                            (document.getElementById("user-score").innerHTML = `${o}`),
                            (highBox.innerHTML = `<h3>Best <br>${e}</h3>`),
                            (popUp.style.display = "block");
                    }
                    
                });
                endGame();
            });
            return;
        }
        setupInputMobile();
    }
}
function moveUp() {
    slideTiles(grid.cellsByColumn);
}
function moveDown() {
    slideTiles(grid.cellsByColumn.map((e) => [...e].reverse()));
}
function moveLeft() {
    slideTiles(grid.cellsByRow);
}
function moveRight() {
    slideTiles(grid.cellsByRow.map((e) => [...e].reverse()));
}
function slideTiles(e) {
    return Promise.all(
        e.flatMap((e) => {
            let t = [];
            for (let n = 1; n < e.length; n++) {
                let o = e[n];
                if (null == o.tile) continue;
                let l;
                for (let i = n - 1; i >= 0; i--) {
                    let a = e[i];
                    if (!a.canAccept(o.tile)) break;
                    l = a;
                }
                null != l &&
                    (t.push(o.tile.waitForTransition()),
                        null != l.tile ? (l.mergeTile = o.tile) : (l.tile = o.tile),
                        (o.tile = null));
            }
            return t;
        })
    );
}
function canMoveUp() {
    return canMove(grid.cellsByColumn);
}
function canMoveDown() {
    return canMove(grid.cellsByColumn.map((e) => [...e].reverse()));
}
function canMoveLeft() {
    return canMove(grid.cellsByRow);
}
function canMoveRight() {
    return canMove(grid.cellsByRow.map((e) => [...e].reverse()));
}
function canMove(e) {
    return e.some((e) =>
        e.some((t, n) => {
            if (0 === n) return !1;
            if (null == t.tile) return !0;
            let o = e[n - 1];
            return o.canAccept(t.tile);
        })
    );
}
function endGame() {
    let { currentScore: e, highScore: t } = l();
    if (!userName) {
        saveScoreLocally(e)
        loginToSubmit.style.display = "block";
    }
    submitScore(e);
}
function submitScore(e) {
    if (!gameLevels) {
        gameLevels = null;
    }

    let t = { score: e, gameNo: 1, slug: "2048-online-game", gameLevels: gameLevels },
        n = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(t),
        };
    fetch("https://www.mindyourlogic.com/submit-game-data", n)
        .then((e) => {
            if (!e.ok) throw Error("Network response was not ok");

            sendScoreToParent({
                submitGameScore: true
            })
            return e.json();
        })
        .then((e) => { })
        .catch((e) => {
            console.error("There was a problem with the fetch operation:", e);
        });
}
async function getScore() {
    try {
        let e = await fetch("/get-web-game-highest-score", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameNo: 1, slug: slug }),
        });
        if (!e.ok) throw Error("Failed to fetch highest score");
        let t = await e.json();
        return t.highestScore;
    } catch (n) {
        return console.error("Error fetching highest score:", n), null;
    }
}
function getPage() {
    let { currentScore: e, highScore: t } = l();
    localStorage.setItem("gameScore", e);


}
function closeScorePopup() {

    (popUp.style.display = "none"), restartGame();
}

newGame.addEventListener("click", restartGame),
    document.addEventListener("DOMContentLoaded", function () {
        (loading.style.display = "none"),
            (gameBox.style.display = "block")
        let o = JSON.parse(localStorage.getItem("gameScore"));
        o && (localStorage.removeItem("gameScore"), submitScore(o)),
            getScore().then((e) => {
                null !== e && (highBox.innerHTML = `<h3>Best <br>${e}</h3>`);
            });
    });

function showLoginPrompt() {
    loginPopup.style.display = "block";
    overlay.style.display = "block";
    scorePopup.style.display = "none";
}

function sendScoreToParent(t) {
    window.parent.postMessage(t, "*")
}

function saveScoreLocally(score) {
    console.log("setting game score", score)
    localStorage.setItem('gameScore', score);
}

closebtn.addEventListener("click", closeScorePopup);
backBtn.addEventListener("click", () => {
    sendScoreToParent({
        exit: true
    })
});


loginToSubmit.addEventListener("click",
    () => {

        sendScoreToParent({
            showLoginPrompt: true
        })
    });

loadGame()
