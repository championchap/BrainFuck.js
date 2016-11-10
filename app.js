const fs = require('fs')

let memory = [0]
let pointer = 0

// Input is the program, a string
function fuckBrains (input) {
  let memory = [0]

  const program = strip(input)
  const charList = program.split('')
  const tree = parse(charList)

  console.log({ memory: memory, program: tree })

  return memory
}

// Returns the program with all invalid characters removed
function strip (input) {
  const stripCharacters = /[^\[\]<>+-]/g

  return input
    .replace(stripCharacters, '')
}

// Reads and tokenises the input program, returns a tree
// Errors if there are syntax problems
function parse (input) {
  let result = []

  input.forEach(char => {
    switch (char) {
      case '+':
        result.push(increment)
        break

      case '-':
        result.push(decrement)
        break

      case '<':
        result.push(left)
        break

      case '>':
        result.push(right)
        break

      case '[':
        result.push(openLoop)
        break

      case ']':
        result.push(closeLoop)
        break
    }
  })

  return result
}

function increment () {
  console.log('Incrementing the current value by one')
  memory[pointer] ++
}

function decrement () {
  console.log('Decrementing the current value by one')
  memory[pointer] --
}

function left () {
  console.log('Moving the memory pointer left one address')
  if (pointer > 0) {
    pointer -= 1
  } else {
    throw new Error('Already at the first position in memory')
  }
}

function right () {
  console.log('Moving the memory pointer right one address')
  pointer += 1

  if (!memory[pointer]) {
    addMoreMemory()
  }
}

function openLoop () {
  console.log('Opening a new loop')
}

function closeLoop () {
  console.log('Closing an open loop')
}

function addMoreMemory () {
  memory.push(0)
}

const input = fs.readFile('./input/program.txt', 'utf8', (err, data) => {
  if (err) {
    console.log(err)
  }

  fuckBrains(data)
})
