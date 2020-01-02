const fs = require('fs')

const FILEPATH = './tests/data_ok.dat'

//Leitura do arquivo é armazenado em um array na qual cada linha representa um espaço no vetor
let instructionsMemory

//Registradores
let $r1, $r2, $r3, $r4, $r5, $r6, $r7, $r8, $r9, $r10
let PC, IR

const readFile = filePath => {
  try {
    const data = fs.readFileSync(filePath).toString()
    return data.split('\n')

  } catch (err) {
    console.error("Erro ao abrir o arquivo:");
    console.log(err)
    return null
  }
}

const initialize = () => {
  instructionsMemory = readFile(FILEPATH)
  if (instructionsMemory.length > 25) {
    console.error('Overflow na memória de instruções,' +
      ' ultrapassou a quantidade de instruções permitida em: ' + (instructionsMemory.length - 25))
    process.exit(1)
  }
  $r1 = $r2 = $r3 = $r4 = $r5 = $r6 = $r7 = $r8 = $r9 = $r10 = 0
  PC = 0
}

const lw = (reg, adress) => { }
const sw = (reg, address) => { }
const li = (reg, immediate) => { }
const move = (reg1, reg2) => { }
const add = (reg1, reg2, reg3) => { }
const addi = (reg1, reg2, immediate) => { }
const sub = (reg1, reg2, reg3) => { }
const subi = (reg1, reg2, immediate) => { }
const j = label => { }
const beq = (reg1, reg2, label) => { }

const fetchInstruction = () => { }
const decode = () => { }
const execute = () => { }
const write = () => { }

initialize()
console.log(PC)