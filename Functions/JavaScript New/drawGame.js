// draw the game
requestAnimationFrame(drawGame);
function drawGame() {
    collisonRedirect();
    background("orange");
    drawWorld(world);
    gravity(player);
    jump();
    drawAllHitboxes("stroke");
    drawCharacter(player);
    requestAnimationFrame(drawGame);
}

function jump() {
    if (player.jumping.isJumping === true) {
        player.jumping.animationFrame++;
        if (player.jumping.animationFrame < 100) {
            player.y--;
        } else {
            player.jumping = {};
        }
    }
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
