let memory = [0]
let pointer = 0

function fuck_brains(input) {
  let chars = input.split('')

  chars.forEach((item) => {
    switch(item) {
      case '+': increment();  break;
      case '-': decrement();  break;
      case '<': left();       break;
      case '>': right();      break;
      case '[': open_loop();  break;
      case ']': close_loop(); break;

      default: // Everything else is ignored
    }
  })

  return memory

}

function increment() {
  console.log('Incrementing the current value by one')
  memory[pointer] ++
}

function decrement() {
  console.log('Decrementing the current value by one')
  memory[pointer] --
}

function left() {
  console.log('Moving the memory pointer left one address')
  if(pointer > 0) {
    pointer --
  } else {
    throw { error: 'Already at the first position in memory' }
  }
}

function right() {
  console.log('Moving the memory pointer right one address')
  pointer ++

  if(!memory[pointer]) {
    addMoreMemory()
  }
}

function open_loop() {
  console.log('Opening a new loop')
}

function close_loop() {
  console.log('Closing an open loop')
}

function addMoreMemory() {
  memory.push(0)
}

const input = '+++>++>+<<--<<<'

let output = fuck_brains(input)
console.log(output)
