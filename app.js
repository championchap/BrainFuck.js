// Idea for handling loops
//
// We could find the matching bracket and send
// all of the code between them into the parse function.
// This should let us build nested stacks of functions.
// Then we just need some logic for how they work.

const fs = require('fs')

let memory = [0]
let pointer = 0

// Input is the program, a string
function fuckBrains (input) {
  const chars = strip(input)
  const charList = chars.split('')
  const program = parse(charList)

  if (program.length !== 0) {
    run(program)
  } else {
    return result()
  }
}

function result () {
  console.log({ memory: memory })
}

function run (program) {
  let node = program.shift()

  node()

  if (program.length !== 0) {
    run(program)
  } else {
    result()
    return
  }
}

// Returns the program with all invalid characters removed
function strip (input) {
  const stripCharacters = /[^\[\]<>+-,.]/g

  return input
    .replace(stripCharacters, '')
}

// Reads and tokenises the input program, returns a tree
// Errors if there are syntax problems
function parse (input) {
  let result = []

  // I think this should be a regular for loop
  input.forEach(char => {
    switch (char) {
      // Plus one at current address
      case '+':
        result.push(increment)
        break

      // Minus one at current address
      case '-':
        result.push(decrement)
        break

      // Move left a single address
      case '<':
        result.push(left)
        break

      // Move right a single address
      case '>':
        result.push(right)
        break

      // output current byte
      case '.':
        result.push(output)
        break

      // accept and save one byte of input
      case ',':
        result.push(save)
        break

      // Open loop
      case '[':
        break

      // Close loop
      case ']':
        break
    }
  })

  return result
}

function output () {
  console.log(String.fromCharCode(memory[pointer]))
}

function save () {

}

function increment () {
  memory[pointer] ++
}

function decrement () {
  memory[pointer] --
}

function left () {
  if (pointer > 0) {
    pointer -= 1
  } else {
    throw new Error('Already at the first position in memory')
  }
}

function right () {
  pointer += 1

  if (!memory[pointer]) {
    addMoreMemory()
  }
}

function openLoop () {
}

function closeLoop () {
}

// Brainfuck Memory Space is 30000 addresses long.
// Maybe I should make it loop around instead of erroring?
// No idea.
function addMoreMemory () {
  if (memory.length < 30000) {
    memory.push(0)
  } else {
    throw new Error('Exceded maximum memory address')
  }
}

fs.readFile('./input/program.bf', 'utf8', (err, data) => {
  if (err) {
    console.log(err)
  }

  fuckBrains(data)
})
