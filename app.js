const fs = require('fs')

let memory = [0]
let pointer = 0

// Input is the program, a string
function fuckBrains (input) {
  const chars = strip(input)
  const charList = chars.split('')
  const program = parse(charList)

  run(program)
  result()
}

function result () {
  console.log({ memory: memory })
}

function run (program) {
  let node = program.shift()

  if (typeof node === 'function') {
    node()
  } else {
    let currentPointer = pointer
    let currentProgram = clone(node)

    while (memory[currentPointer] > 0) {
      run(currentProgram)
      currentProgram = clone(node)
    }
  }

  if (program.length !== 0) {
    run(program)
  }
}

function clone (array) {
  return array.slice(0)
}

// Returns the program with all invalid characters removed
function strip (input) {
  const stripCharacters = /[^\[\]<>+,-.]/g

  return input
    .replace(stripCharacters, '')
}

// Reads and tokenises the input program, returns a tree
// Errors if there are syntax problems
function parse (input) {
  let result = []

  for (let i = 0; i < input.length; i++) {
    let char = input[i]

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
      // This bit takes care of closing the loops too
      case '[':
        let closingIndex = getMatchingIndex(input, i)
        let section = input.slice(i + 1, closingIndex)

        result.push(parse(section))
        i = closingIndex

        break
    }
  }

  return result
}

function getMatchingIndex (input, index) {
  let count = 0

  for (let i = index + 1; i < input.length; i++) {
    switch (input[i]) {
      case '[':
        count += 1
        break

      case ']':
        if (count === 0) {
          return i
        } else {
          count -= 1
        }
        break
    }
  }

  throw Error('Found no matching bracket for loop at position ' + index)
}

function output () {
  console.log(String.fromCharCode(memory[pointer]))
}

function save () {
  // TODO
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

fs.readFile('./input/hello_world.bf', 'utf8', (err, data) => {
  if (err) {
    console.log(err)
  }

  fuckBrains(data)
})
