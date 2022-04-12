fn main() {
    println!("Hello, world!");

    let a = 10;
    let b = a; //copying
    let c = 15;
    let d = add(a, b);
    println!("{}", a);

    let message = String::from("Hello");
    let message_2 = message;
    println!("{}", message_2);
}
fn add(x: u32, y:u32) -> u32 {
    x + y
}
