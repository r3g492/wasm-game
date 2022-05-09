use wasm_bindgen::prelude::*;
use std::rc::Rc;
use wasm_bindgen::JsCast;
use std::fmt;

struct SnakeCell(usize);

struct Snake {
    body: Vec<SnakeCell>
}
impl Snake {
    fn new(spawn_index: usize) -> Snake {
        Snake {
            body: vec!(SnakeCell(spawn_index))
        }
    }
}


#[wasm_bindgen]
struct World {
    pub width: usize,
    snake: Snake,
}

#[wasm_bindgen]
impl World {
    pub fn new() -> World {
        World {
            width: 16,
            snake: Snake::new(10),
        }
    }
    pub fn width(&self) -> usize {
        self.width
    }
    pub fn snake_head_idx(&self) -> usize {
        self.snake.body[0].0
    }
    pub fn update(&mut self) {
        let snake_idx = self.snake_head_idx();
        self.snake.body[0].0 = snake_idx + 1;
    }
}


// wasm-pack build --target web