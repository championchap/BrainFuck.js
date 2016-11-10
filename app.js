let memory = [0]
let pointer = 0

function fuckBrains (input) {
  let memory = [0]
  const chars = strip(input)
  const tree = parse(chars)

  console.log({ memory: memory, tree: tree })

  return memory
}

function strip (input) {
  const stripCharacters = /[^\[\]<>+-]/g

  return input
    .replace(stripCharacters, '')
    .split('')
}

function parse (input) {
  return {}
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

const input = '[@$%@$%*@#$%][wer]pdfs-d9f0s9dfio23j5492805979234"sd"f\'sd\'fS"DF'

fuckBrains(input)
