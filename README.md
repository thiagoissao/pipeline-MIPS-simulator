**Descrição**
Escreva um programa (em qualquer linguagem) que simula a execução do pipeline de um programa MIPS de 32
bits. O programa precisa simular a memória principal (dividida em dados e instruções) e os registradores (seção
2). O pipeline deve conter quatro estágios: busca de instrução, decodificação, execução e escrita dos resultados
(seção 3). O programa deve simular apenas um subconjunto do conjunto de instruções do MIPS R2000 (seção 4).
O simulador deve executar as instruções passo-a-passo, sempre apresentando as instruções sendo executadas
em cada estágio do pipeline, os valores dos registradores e os valores da memória (seção 5).

**Memória**
A memória principal deve ser separada em instruções e dados: a memória de instruções deve conter o programa
em execução e deve possuir espaço para 25 instruções de 32 bits; a memória de dados é usada para armaze-
namento de dados manipulados pelo programa e deve possuir espaço para no mínimo 20 posições de 32 bits
cada.
O banco de registradores de uso geral deve conter 10 registradores, nomeados de $r1 até $r10, que serão
usados para a manipulação de dados. Além disso, os registradores PC (program counter - contador de programa)
e IR (instruction register - registrador de instrução) também devem ser simulados.
No início da simulação, o programa (instruções) deve ser carregado totalmente na memória de instruções,
a memória deve dados e os registradores devem ser limpos (zerados). O registrador PC (program counter -
contador de programa) deve apontar para o endereço da primeira instrução do programa.
Os valores das posições de memória e dos registradores devem ser apresentados em todas as etapas da
simulação.

**Pipeline**
O pipeline simulado deve possuir quatro estágios:
* Busca de instrução: a busca de instrução é responsável por buscar a próxima instrução da memória de
instruções, a próxima instrução é referenciada pelo valor do contador de programa (PC). A instução buscada
deve ser colocada no registrador IR e o valor de PC deve ser atualizada para a instrução seguinte.
* Decodificação: a decodificação é responsável por determinar a operação da instrução, seus operandos
fontes e destino e se existe a necessidade de - por causa da dependência de dados.
* Execução: a execução realiza a operação e o resultado é mantido temporariamente dentro do próprio
pipeline por enquanto.
* Escrita de resultado: a última etapa escreve o resultado da etapa de execução de volta no registrador de
destino, seja uma operação aritmética ou um salto, ou na memória, se for um store.
Com exceção da etapa de execução, todas as outras etapas demoram um ciclo de clock para completar suas
tarefas.Universidade Estadual de Maringá (UEM)
Departamento de Informática (DIN)

**Instruções**
O programa precisa simular apenas um subconjunto do conjunto de instruções MIPS, sendo elas:
Instrução
Descrição
Execução
lw $r1, [endereço] Carrega uma palavra de um endereço de memória para o registrador r1 2 ciclos de clock
sw $r1, [endereço] Armazena o conteúdo do registrador r1 em um endereço de memória 2 ciclos de clock
li $r1, imediato
move $r1, $r2 Carrega o valor do imediato (um valor inteiro) para o registrador r1
Copia o conteúdo do registrador r2 para r1 1 ciclo de clock
1 ciclo de clock
add $r1, $r2, $r3 Soma os valores de r2 e r3 e coloca o resultado em r1 (r1 = r2 + r3) 2 ciclos de clock
addi $r1, $r2, imediato Soma os valores de r2 e imediato (um valor inteiro) e coloca o resultado
em r1 (r1 = r2 + imediato) 1 ciclo de clock
sub $r1, $r2, $r3
subi $r1, $r2, imediato Subtrai os valores de r2 e r3 e coloca o resultado em r1 (r1 = r2 - r3)
Subtrai os valores de r2 e imediato (um valor inteiro) e coloca o resultado
em r1 (r1 = r2 - imediato) 2 ciclos de clock
1 ciclo de clock
j label Salto incondicional, altera o fluxo de execução do programa para o label
especificado 1 ciclo de clock
beq $r1, $r2, label Salto condicional, altera o fluxo de execução do programa para o label
especificado se r1 == r2 1 ciclo de clock

**Simulação**
O programa deve receber uma sequência de instruções especificadas anteriormente, carregar essas instruções
na memória simulada e executar as instruções passo-a-passo (um ciclo de clock por vez) dentro do pipeline. O
simulador deve apresentar as instruções em cada estágio do pipeline, os valores da memória e dos registradores.
A entrada da sequência de instruções é livre, pode ser um arquivo, um campo para digitação ou simplesmente
uma sequência de leitura do teclado.
O simulador precisa sempre considerar o tempo de execução de cada instrução e também possíveis conflitos
de dados. Por exemplo, as instruções add e sub precisam de dois ciclos de clock na etapa de execução, assim
todas as instruções das etapas anteriores precisam ficar esperando até tais instruções terminarem de executar.
O simulador não precisa realizar nenhum tipo de previsão de desvio. Com isso, um salto só deve ser tomado
após a etapa de execução do pipeline.
Os conflitos de dados também precisam ser considerados, por exemplo o trecho de código abaixo possui um
conflito de dados:

* 1 add $r1, $r2, $r3
* 2 add $r10, $r20, $r1

O registrador $r1 é destino de uma instrução e fonte de outra instrução logo na sequência. O problema com
isso é que $r1 só será alterado após o término do quarto estágio e a instrução seguinte deve ficar parada na etapa
de decodificação até os valores de todos os operandos fontes estarem atualizados.

**Detalhes finais**
O trabalho pode ser desenvolvido em qualquer linguagem de programação com qualquer tipo de interface (gráfica
ou terminal) em grupos de até 3 alunos. Qualquer detalhe não especificado é livre e o grupo pode tomar qualquer
decisão.
Exemplos de simuladores de pipeline do MIPS (podem ser diferentes do simulador especificado):
* http://www.ecs.umass.edu/ece/koren/architecture/windlx/main.htmlUniversidade Estadual de Maringá (UEM)
Departamento de Informática (DIN)
* http://www.icsa.inf.ed.ac.uk/research/groups/hase/models/mips/
* http://euler.vcsu.edu/curt.hill/mips.html
Todas as instruções assembly do MIPS podem ser encontradas em: https://usermanual.wiki/Document/
MIPSinstructions.789708754.pdf
Ao final, o código-fonte deverá ser entregue na data estabelecida e o simulador funcionando deverá ser apre-
sentado e explicado pelo grupo