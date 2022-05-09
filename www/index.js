import init, {World} from "wasm-game";
import Universe from "wasm-game";

init().then(_ => {
    const GRID_COLOR = "#5490a9";
    const DEAD_COLOR = "#f80000";
    const ALIVE_COLOR = "#ffffff";

// Construct the universe, and get its width and height.
    /*const universe = Universe.new();
    const width = universe.width();
    const height = universe.height();*/

    const world = World.new();

    const CELL_SIZE = 50;
    const worldWidth = world.width();

    console.log(world.width());
    const canvas = document.getElementById("wasm-canvas");
    const ctx = canvas.getContext("2d");

    canvas.height = worldWidth * CELL_SIZE;
    canvas.width = worldWidth * CELL_SIZE;

    /*document.addEventListener("keydown", (e) => {
        console.log(e.code)
    })
    document.addEventListener("mousemove", mousemove)

    function mousemove(event){
        console.log("pageX: ",event.pageX,
            "pageY: ", event.pageY,)
    }*/

    /*document.addEventListener("click", function() {
        alert("Hello World!");
    });*/

    /*canvas.addEventListener("mousedown", event => {
        const boundingRect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / boundingRect.width;
        const scaleY = canvas.height / boundingRect.height;

        const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
        const canvasTop = (event.clientY - boundingRect.top) * scaleY;

        const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
        const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

        universe.toggle_cell(row, col);

        drawCells();
        drawGrid();
    });*/



    function drawWorld() {
        ctx.beginPath();
        ctx.strokeStyle = GRID_COLOR;
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
        ctx.fillStyle = DEAD_COLOR;
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

    /*setInterval(() => {
        console.log("Update 100ms")
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawWorld();
        drawSnake();
        world.update();
    }, 100)*/
})
