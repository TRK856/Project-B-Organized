// presets
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");

// canvas hiegth + width
cnv.width = 800;
cnv.height = 600;

// varibles + array nessasary for function of code
let world = [];
let hitboxes = [];
let player = {};
requestAnimationFrame(drawGame);

// Demo
createCharacter(10, 10, 50, 50);
addHitbox(player);
addPlatform(10, 10, 100, 300);

// Event Listners
document.addEventListener("keydown", (e) => {
    player.keyHandler[e.code] = true;
    moveCharacter();
    updateHitbox(player);
});
document.addEventListener("keyup", (e) => {
    player.keyHandler[e.code] = false;
});

// Accessory Functions
function findAllOccurancesID(obj, findValue) {
    let numberOfFindValues = 0;
    let placeInArray = [];
    for (let i = 0; i < obj.length; i++) {
        if (obj[i].id === findValue) {
            numberOfFindValues++;
            placeInArray.push(i);
        }
    }
    return [placeInArray, numberOfFindValues];
}

// draw the game
function drawGame() {
    background("orange");
    drawAllHitboxes("stroke");
    drawCharacter(player);
    drawWorld(world);
    requestAnimationFrame(drawGame);
}

function drawCharacter(aCharacter) {
    if (aCharacter.shape === "rect") {
        fill("green");
        rect(aCharacter.x, aCharacter.y, aCharacter.w, aCharacter.h, "fill");
    }
}

function drawWorld(aWorld) {
    for (let i = 0; i < aWorld.length; i++) {
        if (aWorld[i].id === "GriddedGrassPlatform") {
            drawPlatform(aWorld[i]);
        }
    }
}

function drawPlatform(obj) {
    newGriddedPlatform(obj.x, obj.y, obj.w, obj.h);
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
        occurance: 1,
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
        (obj.hitboxActive = true),
            hitboxes.push({
                id: obj.id,
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

function updateHitbox(obj) {
    // currently only need a moving htibox for the player, but for (moving) enimies in the futrue perhaps i will add more;
    if (obj.hitboxActive === true) {
        let allIdOccurances = findAllOccurancesID(hitboxes, obj.id);
        if (allIdOccurances[1] === 1) {
            let randomConst = hitboxes[allIdOccurances[0][0]];

            randomConst.x = obj.x;
            randomConst.y = obj.y;
            randomConst.w = obj.w;
            randomConst.h = obj.h;
        }
    }
}

// world
// Platform Functions
function addPlatform(x, y, w, h) {
    world.push({
        id: "GriddedGrassPlatform",
        occurance: ++findAllOccurancesID(world, "GriddedGrassPlatform")[1],
        hitboxCreate: true,
        hitboxActive: false,
        keyHandler: {},
        speed: 2,
        shape: "rect",
        x: x,
        y: y,
        w: w,
        h: h,
    });
    addHitbox(world[world.length - 1]);
    newGriddedPlatform(x, y, w, h);
}

function newGriddedPlatform(x1, y1, w, h) {
    h = h - 20;
    fill("green");
    rect(x1, y1, w, 20, "fill");
    fill("#F5F5DC");
    rect(x1, y1 + 20, w, h, "fill");
    stroke("black", 0.9);
    createGrid(x1, y1 + 20, w, h);
    stroke("#c6ccc8", 1);
    createGrid(x1, y1 + 20, w, h);
}

function createGrid(x1, y1, w, h) {
    for (let f = 0; f < h / 10; f++) {
        for (let i = 0; i < w / 10; i++) {
            rect(x1 + i * 10, y1 + 10 * f, 10, 10, "stroke");
        }
    }
}
