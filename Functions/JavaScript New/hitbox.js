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

function collisonRedirect() {
    for (let i = 0; i < hitboxes.length; i++) {
        if (hitboxes[i].id != "player") {
            checkIfColliding(player, hitboxes[i]);
        }
    }
}

function collide(objColliding, CollisionObj) {
    if (
        objColliding.x + objColliding.w + objColliding.speedX >
            CollisionObj.x &&
        objColliding.x + objColliding.speedX <
            CollisionObj.x + CollisionObj.w &&
        objColliding.y + objColliding.h > CollisionObj.y &&
        objColliding.y < CollisionObj.y + CollisionObj.h
    ) {
        objColliding.speedY = 0;
        objColliding.hitboxCollided = true;
    } else if (
        objColliding.x + objColliding.w > CollisionObj.x &&
        objColliding.x < CollisionObj.x + CollisionObj.w &&
        objColliding.y + objColliding.h + objColliding.speedY >
            CollisionObj.y &&
        objColliding.y + objColliding.speedY < CollisionObj.y + CollisionObj.h
    ) {
        objColliding.speedX = 0;
        objColliding.hitboxCollided = true;
    }
}

function checkIfColliding(obj1, obj2) {
    if (obj1.shape === "rect" && obj2.shape === "rect") {
        if (rectCollideCheck(obj1, obj2) === true) {
            collide(obj1, obj2);
        } else {
            obj1.hitboxCollided = false;
            return;
        }
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
