const fs = require('fs')

const FILEPATH = './tests/data_ok.dat'

//Leitura do arquivo é armazenado em um array na qual cada linha representa um espaço no vetor
let instructionsMemory
let dataMemory = []

let busca = "-"
let decodificacao = "-"
let execucao = "-"
let escrita = "-"
let clock = 0

//Registradores
let $r1 = {}, $r2 = {}, $r3 = {}, $r4 = {}, $r5 = {}, $r6 = {}, $r7 = {}, $r8 = {}, $r9 = {}, $r10 = {}
let PC = {}, IR = {}

//Auxiliar
let LABELS = []
let ARGS = {}
let response

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

const disruptAllInstructions = () => {
  let i = 0
  while (i < instructionsMemory.length) {
    const opcode = instructionsMemory[i].split(' ', 1)
    const operandsWithOpcode = instructionsMemory[i].split(',')
    operandsWithOpcode[0] = operandsWithOpcode[0].split(' ')[1]
    const operands = operandsWithOpcode.map(v => v.trim())
    const result = [...opcode, ...operands]
    instructionsMemory[i] = result
    i++
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
  disruptAllInstructions()
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

const printPipeline = () => {
  console.log("-----------------Pipeline-----------------")
  console.log("Busca instrucao: " + busca + "\nDecodificacao: " + decodificacao + "\nExecucao: " + execucao + "\nEscrita resultado: " + escrita)
}

const isInteger = n => Number.isInteger(n)

const register = name => {
  switch (name) {
    case '$r1': return $r1
    case '$r2': return $r2
    case '$r3': return $r3
    case '$r4': return $r4
    case '$r5': return $r5
    case '$r6': return $r6
    case '$r7': return $r7
    case '$r8': return $r8
    case '$r9': return $r9
    case '$r10': return $r10
    default: return false
  }
}

//Usei para remover os colchetes
const getOnlyNumbers = str => {
  if (
    str === undefined ||
    str === null) return ''
  return str.replace(/\D/g, '');
}

const lw = (reg, address) => {
  const position = parseInt(getOnlyNumbers(address))
  if ((position < dataMemory.length) && (position >= 0)) {
    // reg.value = dataMemory[position].value
    return {
      value: reg.value,
      memoryPosition: position
    }
  } else {
    console.error('Error 1: Valor do endereço inválido')
  }
}

const sw = (reg, address) => {
  const position = parseInt(getOnlyNumbers(address))
  if ((position < dataMemory.length) && (position >= 0) && isInteger(reg.value)) {
    // dataMemory[position].value = reg.value
    return {
      value: reg.value,
      position: position
    }
  } else {
    console.error('Error 2: Valores inseridos não foram validados com sucesso')
  }
}

const li = immediate =>
  isInteger(immediate) ?
    immediate : console.error('Error 3: Valor imediato não é do tipo inteiro ' + immediate)

const move = reg2 =>
  isInteger(reg2.value) ?
    reg2.value : console.error('Error 4: Valor do segundo parâmetro inválido: ' + reg2.value)

const add = (reg2, reg3) =>
  isInteger(reg2.value) && isInteger(reg3.value) ?
    reg2.value + reg3.value : console.error('Error 5: Valor do segundo ou do terceiro parâmetro inválido')

const addi = (reg2, immediate) =>
  isInteger(immediate) && (reg2.value != undefined) ?
    reg2.value + immediate : console.log('Error 6: Valores inseridos inválidos')

const sub = (reg2, reg3) =>
  isInteger(reg2.value) && isInteger(reg3.value) ?
    reg2.value - reg3.value : console.log('Error 7: Valores de entrada inválidos')

const subi = (reg2, immediate) =>
  isInteger(immediate) && (reg2.value != undefined) ?
    reg2.value - immediate : console.log('Error 6: Valores inseridos inválidos')


const j = label => {
  let labelLine = LABELS.findIndex(v => v.label === label)
  if (labelLine === -1) {
    labelLine = instructionsMemory.findIndex(v => v[0] === label)
    if (labelLine === -1) return console.error('Error x: to find label or undefined operation')
  }
}

const beq = (reg1, reg2, label) => {
  if (reg1.value === reg2.value) {
    let labelLine = LABELS.findIndex(v => v.label === label)
    if (labelLine === -1) {
      labelLine = instructionsMemory.findIndex(v => v[0] === label)
      if (labelLine === -1) return console.error('Error y: to find label or undefined operation')
    }
    console.log("OLHA O LABEL LINE AQUI PORRA:" + labelLine)
    PC.value = labelLine
    escrita = "-"
    execucao = "-"
    decodificacao = "-"
  }
}

const fetchInstruction = () => {
  IR = instructionsMemory[PC.value]
  PC.value += 1
  return IR
}

const decode = () => IR

const execute = (args, line) => {
  switch (args[0]) {
    case 'lw': return lw(register(args[1]), args[2])
    case 'sw': return sw(register(args[1]), args[2])
    case 'li': return li(parseInt(args[2]))
    case 'move': return move(register(args[2]))
    case 'add': return add(register(args[2]), register(args[3]))
    case 'addi': return addi(register(args[2]), parseInt(args[3]))
    case 'sub': return sub(register(args[2]), register(args[3]))
    case 'subi': return subi(register(args[2]), parseInt(args[3]))
    case 'j': return j(args[1])
    case 'beq': return beq(register(args[1]), register(args[2]), args[3])
    default: LABELS.push({
      label: args[0] + ':',
      line: line
    })
  }
}

const write = (destination, source, opcode) => {
  if (opcode === 'sw') {
    dataMemory[source.position].value = source.value
    return
  }
  register(destination) ? register(destination).value = source : null
}

const printarTodasInformacoes = () => {
  console.log("\n\tCiclo de clock: " + clock.toString())
  printDataMemory()
  console.log()
  printRegisters()
  printPC()
  printPipeline()
}

const runPipeline = () => {
  printarTodasInformacoes()
  clock++
  let dependencia = 0
  let guardarRespostaDaExecucao;
  busca = fetchInstruction()
  printarTodasInformacoes()
  let contador = 0;
  do {
    guardarRespostaDaExecucao = response
    if (busca != "-") {
      escrita = execucao;
      if (dependencia != 1) {
        execucao = decodificacao
        decodificacao = busca
        busca = fetchInstruction()
        console.log(busca)
      }
      else {
        execucao = "-"
        dependencia = 0
      }
    }
    if (decodificacao.length < 3 && decodificacao !== '-')
      decodificacao.push(null)
    if (execucao.length < 3 && execucao !== '-')
      execucao.push(null)
    if (decodificacao != "-") {
      ARGS = decode()
    }
    if (execucao != "-") {
      // console.log("OLHA O LACO AQUI : " + laco + "\n" + "OLHA A EXECUCAO AQUI :" + execucao)
      if (
        execucao[1] == decodificacao[2] ||
        execucao[1] == decodificacao[3] ||
        execucao[2] == decodificacao[1] ||
        execucao[3] == decodificacao[1]
      ) {
        dependencia = 1
      }
      if (execucao[0] === 'beq') {
        clock++
        printarTodasInformacoes()
      }
      response = execute(execucao, PC.value - 1)
      if (execucao[0] === 'lw' || execucao[0] === 'sw' || execucao[0] === 'add' || execucao[0] === 'sub') {
        clock++
        printarTodasInformacoes()
      }
    }
    clock++
    printarTodasInformacoes()
    console.log(execucao)
    if (escrita != "-")
      write(escrita[1], guardarRespostaDaExecucao, escrita[0])
    contador++
  } while ((busca != "-" || decodificacao != "-" || execucao != "-" || escrita != "-"))
}

initialize()

runPipeline()
// printDataMemory()
// printRegisters()
// printPC()

