const fs = require('fs')

const FILEPATH = './tests/data_ok.dat'

//Leitura do arquivo é armazenado em um array na qual cada linha representa um espaço no vetor
let instructionsMemory
let dataMemory = []

//Registradores
let $r1 = {}, $r2 = {}, $r3 = {}, $r4 = {}, $r5 = {}, $r6 = {}, $r7 = {}, $r8 = {}, $r9 = {}, $r10 = {}
let PC = {}, IR = {}

const readFile = filePath => {
  try {
    const data = fs.readFileSync(filePath).toString()
    return data.split('\n')

  } catch (err) {
    console.error("Error 0: Erro ao abrir o arquivo:");
    console.log(err)
    return null
  }
}

const initialize = () => {
  instructionsMemory = readFile(FILEPATH)
  if (instructionsMemory.length > 25) {
    console.error('Erro Initialize: Overflow na memória de instruções,' +
      ' ultrapassou a quantidade de instruções permitida em: ' + (instructionsMemory.length - 25))
    process.exit(1)
  }
  $r1.value = $r2.value = $r3.value = $r4.value = $r5.value = $r6.value = $r7.value = $r8.value = $r9.value = $r10.value = 0
  PC.value = 0
  for (let i = 0; i < 20; i++) {
    dataMemory[i] = { value: 0 }
  }
}

const printDataMemory = () => {
  console.log('--------------Memória de Dados--------------')
  console.log('Posição\t\tValor')
  dataMemory.forEach((v, index) => {
    console.log(index + '\t\t' + v.value)
  })
  console.log('------------------------------------------')
}

const printRegisters = () => {
  console.log('--------------Registradores--------------')
  console.log('Registrador\tValor')
  console.log('$r1\t\t' + $r1.value)
  console.log('$r2\t\t' + $r2.value)
  console.log('$r3\t\t' + $r3.value)
  console.log('$r4\t\t' + $r4.value)
  console.log('$r5\t\t' + $r5.value)
  console.log('$r6\t\t' + $r6.value)
  console.log('$r7\t\t' + $r7.value)
  console.log('$r8\t\t' + $r8.value)
  console.log('$r9\t\t' + $r9.value)
  console.log('$r10\t\t' + $r10.value)
  console.log('------------------------------------------')
}

const printPC = () => {
  console.log('PC\t\t' + PC.value)
  console.log()
}

const printPipeline = () => { }

const isInteger = n => Number.isInteger(n)

const lw = (reg, address) => {
  (address < dataMemory.length) && (address >= 0) ?
    reg.value = dataMemory[address].value : console.error('Error 1: Valor do endereço inválido')
}

const sw = (reg, address) => {
  (address < dataMemory.length) && (address >= 0) && isInteger(reg.value) ?
    dataMemory[address].value = reg.value : console.error('Error 2: Valores inseridos não foram validados com sucesso')
}

const li = (reg, immediate) => {
  isInteger(immediate) ?
    reg.value = immediate : console.error('Error 3: Valor imediato não é do tipo inteiro ' + immediate)
}

const move = (reg1, reg2) => {
  isInteger(reg2.value) ?
    reg1.value = reg2.value : console.error('Error 4: Valor do segundo parâmetro inválido: ' + reg2.value)
}

const add = (reg1, reg2, reg3) => {
  isInteger(reg2.value) && isInteger(reg3.value) ?
    reg1.value = reg2.value + reg3.value : console.error('Error 5: Valor do segundo ou do terceiro parâmetro inválido')
}

const addi = (reg1, reg2, immediate) => {
  isInteger(immediate) && (reg2.value != undefined) ?
    reg1.value = reg2.value + immediate : console.log('Error 6: Valores inseridos inválidos')
}

const sub = (reg1, reg2, reg3) => {
  isInteger(reg2.value) && isInteger(reg3.value) ?
    reg1.value = reg2.value - reg3.value : console.log('Error 7: Valores de entrada inválidos')
}

const subi = (reg1, reg2, immediate) => {
  isInteger(immediate) && (reg2.value != undefined) ?
    reg1.value = reg2.value - immediate : console.log('Error 6: Valores inseridos inválidos')
}

const j = label => { }
const beq = (reg1, reg2, label) => { }

const fetchInstruction = () => { }
const decode = () => { }
const execute = () => { }
const write = () => { }

initialize()
// printDataMemory()
// printRegisters()
// printPC()