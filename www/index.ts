import init, {World, Direction, GameStatus} from "wasm-game";
import Universe from "wasm-game";
import { rnd } from "./utils/rnd";

init().then(wasm => {
    //wasm.memory
    const CELL_SIZE = 50;

    const GRID_COLOR = "#5490a9";
    const DEAD_COLOR = "#f80000";
    const ALIVE_COLOR = "#ffffff";

    const WORLD_WIDTH = 8;
    const snakeSpawnIdx = rnd(WORLD_WIDTH * WORLD_WIDTH);

    const world = World.new(WORLD_WIDTH, snakeSpawnIdx);
    const worldWidth = world.width();

    const points = document.getElementById("points");
    const gameControlBtn = document.getElementById("game-control-btn");
    const gameStatus = document.getElementById("game-status");

    const canvas = <HTMLCanvasElement> document.getElementById("wasm-canvas");
    const ctx = canvas.getContext("2d");
    canvas.height = worldWidth * CELL_SIZE;
    canvas.width = worldWidth * CELL_SIZE;

    gameControlBtn.addEventListener("click", _ => {
        const Status = world.game_status();

        if (Status === undefined) {
            gameControlBtn.textContent = "Press to stop playing .."
            world.start_game();
            play();
        } else {
            location.reload();
        }
    });

    const snakeCellPtr = world.snake_cells();
    const snakeLen = world.snake_length();

    document.addEventListener("keydown", (e) => {
        //console.log(e.code);
        switch(e.code) {
            case "ArrowUp":
                world.change_snake_dir(Direction.Up);
                break;
            case "ArrowRight":
                world.change_snake_dir(Direction.Right);
                break;
            case "ArrowDown":
                world.change_snake_dir(Direction.Down);
                break;
            case "ArrowLeft":
                world.change_snake_dir(Direction.Left);
                break;
        }
    })

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

    function drawReward() {
        const idx = world.reward_cell();

        const col = idx % worldWidth;
        const row = Math.floor(idx / worldWidth);

        ctx.beginPath();
        ctx.fillStyle = '#456b9b';
        ctx.fillRect(
            col * CELL_SIZE,
            row * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
        );
        ctx.stroke();

        if (idx === undefined) {
            alert("the Snake ate all");
        }
    }


    function drawSnake() {
        //const snakeIdx = world.snake_head_idx();
        const snakeCells = new Uint32Array(
            wasm.memory.buffer,
            world.snake_cells(),
            world.snake_length()
        )


        snakeCells
            .filter((cellIdx, i) => !(i > 0 && cellIdx === snakeCells[0]))
            .forEach((cellIdx, i) => {
            const col = cellIdx % worldWidth;
            const row = Math.floor(cellIdx / worldWidth);

            ctx.fillStyle = i === 0 ? "#7878db" : "#985555";

            ctx.beginPath();
            ctx.fillRect(
                col * CELL_SIZE,
                row * CELL_SIZE,
                CELL_SIZE,
                CELL_SIZE
            );
        })
        ctx.stroke();
    }

    function drawGameStatus() {
        gameStatus.textContent = world.game_status_text();
        points.textContent = world.points().toString();
    }

    function paint() {
        drawWorld();
        drawSnake();
        drawReward();
        drawGameStatus();
    }
    function play() {
        const status = world.game_status();
        if (status == GameStatus.Won) {
            alert("Won");
            gameControlBtn.textContent = "Press to replay";
            return;
        }
        if (status == GameStatus.Lost) {
            alert("Lost");
            gameControlBtn.textContent = "Press to replay";
            return;
        }

        const fps = 10;
        setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            world.step();
            paint();
            requestAnimationFrame(play)
        }, 1000 / fps)
    }
    paint();
})
