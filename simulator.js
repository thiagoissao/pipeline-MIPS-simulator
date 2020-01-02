const fs = require('fs')

const FILEPATH = './tests/data_ok.dat'

//Leitura do arquivo é armazenado em um array na qual cada linha representa um espaço no vetor
let instructionsMemory
let dataMemory = []

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
  for (let i = 0; i < 20; i++) {
    dataMemory[i] = { pos: i, value: 0 }
  }
}

const printDataMemory = () => {
  console.log('--------------Memória de Dados--------------')
  console.log('Posição\t\tValor')
  dataMemory.forEach(v => {
    console.log(v.pos + '\t\t' + v.value)
  })
  console.log('------------------------------------------')
}

const printRegisters = () => {
  console.log('--------------Registradores--------------')
  console.log('Registrador\tValor')
  console.log('$r1\t\t' + $r1)
  console.log('$r2\t\t' + $r2)
  console.log('$r3\t\t' + $r3)
  console.log('$r4\t\t' + $r4)
  console.log('$r5\t\t' + $r5)
  console.log('$r6\t\t' + $r6)
  console.log('$r7\t\t' + $r7)
  console.log('$r8\t\t' + $r8)
  console.log('$r9\t\t' + $r9)
  console.log('$r10\t\t' + $r10)
  console.log('------------------------------------------')
}

const printPC = () => {
  console.log('PC\t\t' + PC)
  console.log()
}

const printPipeline = () => { }

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
printDataMemory()
printRegisters()
printPC()