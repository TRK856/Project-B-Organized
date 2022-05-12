// Demo
createCharacter(10, 10, 50, 50);
addHitbox(player);
addPlatform(0, 200, cnv.width, cnv.height - 200);

const lol = (element) => {
    if (element.occurance === 1 && element.id === "GriddedGrassPlatform") {
        return true;
    } else {
        return;
    }
};
// console.log(world.find(lol));
