import init, {World} from "wasm-game";

/*
async function start() {
    const wasm = await init();
    greet("myName");
    console.log("no probs");
}
*/


init().then(_ => {

    const world = World.new();

    const CELL_SIZE = 10;
    const worldWidth = world.width();

    console.log(world.width());
    const canvas = document.getElementById("wasm-canvas");
    const ctx = canvas.getContext("2d");

    canvas.height = worldWidth * CELL_SIZE;
    canvas.width = worldWidth * CELL_SIZE;

    function drawWorld() {
        ctx.beginPath();
        for (let x = 0; x < worldWidth + 1; x++) {
            ctx.moveTo(CELL_SIZE * x, 0);
            ctx.lineTo(CELL_SIZE * x, worldWidth * CELL_SIZE);

        }
        for (let y = 0; y <worldWidth + 1; y++) {
            ctx.moveTo(0, CELL_SIZE * y);
            ctx.lineTo(worldWidth * CELL_SIZE, CELL_SIZE * y, );
        }


        ctx.stroke();
    }

    function drawSnake() {
        const snakeIdx = world.snake_head_idx();
        const col = snakeIdx % worldWidth;
        const row = Math.floor(snakeIdx / worldWidth);

        ctx.beginPath();
        ctx.fillRect(
            col * CELL_SIZE,
            row * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
        );
        ctx.stroke();
    }


    drawWorld();
    drawSnake();
})
