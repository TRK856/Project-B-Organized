// world
world.gravity = 0.05;
world.gravitySpeed = 0;

function gravity(obj) {
    if (obj.hitboxCreate === true && obj.hitboxCollided === true) {
        world.gravitySpeed = 0;
        return;
    } else {
        world.gravitySpeed += world.gravity;
        obj.y += world.gravitySpeed;
        updateHitbox(player);
    }
}

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
