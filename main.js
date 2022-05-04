// presets
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");

// canvas hiegth + width
cnv.width = 800;
cnv.height = 600;

// Event Listners
document.addEventListener("keydown", (e) => {
    player.keyHandler[e.code] = true;
    moveCharacter();
});
document.addEventListener("keyup", (e) => {
    player.keyHandler[e.code] = false;
});

// varibles + array nessasary for function of code
let hitboxes = [];
let player = {};
requestAnimationFrame(drawGame);

// Demo
createCharacter(10, 10, 50, 50);
addHitbox(player);
// console.log(checkCollision(aosdf, aosdf2));

// draw the game
function drawGame() {
    background("orange");
    drawCharacter(player);
    drawAllHitboxes("stroke");
    requestAnimationFrame(drawGame);
}

function drawCharacter(aCharacter) {
    if (aCharacter.shape === "rect") {
        fill("orange");
        rect(aCharacter.x, aCharacter.y, aCharacter.w, aCharacter.h, "fill");
    }
}

function drawAllHitboxes(mode) {
    fill("red");
    stroke("red", 4);
    for (i = 0; i < hitboxes.length; i++) {
        if (hitboxes[i].shape === "rect") {
            rect(
                hitboxes[i].x,
                hitboxes[i].y,
                hitboxes[i].w,
                hitboxes[i].h,
                `${mode}`
            );
        } else {
            console.log(
                `Error: "rect" = ${hitboxes[i].shape} @drawAllHitboxes`
            );
        }
    }
}

// player
function createCharacter(x, y, w, h) {
    player = {
        id: "player",
        hitboxCreate: true,
        hitboxActive: false,
        keyHandler: {},
        speed: 2,
        shape: "rect",
        x: x,
        y: y,
        w: w,
        h: h,
    };
}

function moveCharacter() {
    if (player.keyHandler.ArrowLeft === true) {
        player.x = player.x - player.speed;
    }
    if (player.keyHandler.ArrowUp === true) {
        player.y = player.y - player.speed;
    }
    if (player.keyHandler.ArrowRight === true) {
        player.x = player.x + player.speed;
    }
    if (player.keyHandler.ArrowDown === true) {
        player.y = player.y + player.speed;
    }
}
// hitboxes
function addHitbox(obj) {
    if (obj.hitboxCreate === true) {
        hitboxes.push({
            id: obj.id + " hitbox",
            hitboxActive: true,
            shape: "rect",
            x: obj.x,
            y: obj.y,
            w: obj.w,
            h: obj.h,
        });
    } else {
        console.log(obj.id + ": hitboxCreate === false");
    }
}

function checkCollision(obj1, obj2) {
    if (obj1.shape === "rect" && obj2.shape === "rect") {
        return rectCollideCheck(obj1, obj2);
    }
}

function rectCollideCheck(rect1, rect2) {
    let le1 = rect1.x;
    let re1 = rect1.x + rect1.w;
    let te1 = rect1.y;
    let be1 = rect1.y + rect1.h;
    let le2 = rect2.x;
    let re2 = rect2.x + rect2.w;
    let te2 = rect2.y;
    let be2 = rect2.y + rect2.h;
    return le1 < re2 && re1 > le2 && be1 > te2 && te1 < be2;
}

// world
// Platform Functions
function newPlatform(x1, y1, w, h) {
    fill("green");
    rect(x1, y1, w, 20, "fill");
    fill("#F5F5DC");
    rect(x1, y1 + 20, w, h, "fill");
    stroke("black", 0.9);
    grid(x1, y1, w, h);
    stroke("#c6ccc8", 1);
    grid(x1, y1, w, h);
}

function grid(x1, y1, w, h) {
    for (let f = 0; f < h / 10; f++) {
        for (let i = 0; i < w / 10; i++) {
            rect(x1 + i * 10, y1 + 20 + 10 * f, 10, 10, "stroke");
        }
    }
}
