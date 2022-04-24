async function init() {

    const memory = new WebAssembly.Memory({initial: 1});

    const importObject = {
        js: {
            mem: memory
        },
        console: {
            log: () => {
                console.log("Just logging something...");
            },
            error: () => {
                console.log("error!");
            }
        }
    }

    const response = await fetch("sum.wasm");
    const buffer = await response.arrayBuffer();
    debugger
    await WebAssembly.instantiate(buffer, importObject);
    debugger

    const uint8Array = new Uint8Array(memory.buffer, 0, 2);
    const hiText = new TextDecoder().decode(uint8Array);
    console.log(hiText);
}
init();