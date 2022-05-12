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
