// player
function createCharacter(x, y, w, h) {
    player = {
        id: "player",
        occurance: 1,
        hitboxCreate: true,
        hitboxActive: false,
        hitboxCollided: false,
        jumping: {},
        keyHandler: {},
        speedX: 5,
        speedY: 5,
        shape: "rect",
        x: x,
        y: y,
        w: w,
        h: h,
    };
}

function moveCharacter() {
    if (player.keyHandler.ArrowLeft === true) {
        player.x = player.x - player.speedX;
    }
    if (player.keyHandler.ArrowUp === true) {
        if (player.hitboxCollided === true) {
            player.speedY = 5;
            player.jumping = { isJumping: true, animationFrame: 0 };
        }
    }
    if (player.keyHandler.ArrowRight === true) {
        player.x = player.x + player.speedX;
    }
    if (player.keyHandler.ArrowDown === true) {
        player.y = player.y + player.speedY;
    }
    if (player.keyHandler.KeyR === true) {
        location.reload();
    }
}
