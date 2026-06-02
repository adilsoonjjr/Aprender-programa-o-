window.PYTHON_DATA = {
  id: 'python',
  name: 'Python',
  icon: '🐍',
  color: '#3776ab',
  gradient: 'linear-gradient(135deg, #3776ab, #ffd43b)',
  topics: [
    {
      id: 'py-basics',
      title: 'Variáveis e Tipos',
      xp: 10,
      lesson: {
        title: 'Variáveis e Tipos de Dados',
        theory: `Em Python, variáveis são criadas automaticamente quando você atribui um valor. Não é necessário declarar o tipo — Python é <strong>dinamicamente tipado</strong>.

Os tipos básicos são:
• <code>int</code> — números inteiros
• <code>float</code> — números decimais
• <code>str</code> — texto (string)
• <code>bool</code> — verdadeiro/falso
• <code>list</code> — lista de valores
• <code>dict</code> — chave → valor`,
        examples: [
          {
            title: 'Declarando variáveis',
            code: `nome = "Adil"          # str
idade = 25             # int
altura = 1.80          # float
ativo = True           # bool

# Python descobre o tipo automaticamente
print(type(nome))      # <class 'str'>
print(type(idade))     # <class 'int'>`,
            explanation: 'Basta escrever nome = valor. Python define o tipo sozinho.'
          },
          {
            title: 'F-strings (interpolação)',
            code: `nome = "Adil"
idade = 25

# Forma moderna: f-string
mensagem = f"Olá, {nome}! Você tem {idade} anos."
print(mensagem)
# Saída: Olá, Adil! Você tem 25 anos.`,
            explanation: 'Coloque f antes das aspas e use {} para inserir variáveis.'
          },
          {
            title: 'Listas e Dicionários',
            code: `# Lista
linguagens = ["Python", "Java", "JavaScript"]
linguagens.append("TypeScript")
print(linguagens[0])   # Python

# Dicionário
dev = {
    "nome": "Adil",
    "nivel": "júnior",
    "xp": 450
}
print(dev["nome"])     # Adil
print(dev.get("xp"))   # 450`,
            explanation: 'Listas usam [], dicionários usam {} com chave: valor.'
          }
        ]
      },
      quiz: [
        {
          question: 'Como criar uma variável chamada "pontos" com valor 100 em Python?',
          options: ['int pontos = 100', 'pontos = 100', 'var pontos = 100', 'pontos: int = 100 (obrigatório)'],
          answer: 1,
          explanation: 'Em Python basta escrever pontos = 100. O tipo int é inferido automaticamente.'
        },
        {
          question: 'Qual saída de print(type(3.14))?',
          options: ["<class 'int'>", "<class 'number'>", "<class 'float'>", "<class 'double'>"],
          answer: 2,
          explanation: '3.14 é um número decimal, portanto o tipo é float.'
        },
        {
          question: 'Como acessar o primeiro elemento da lista linguagens = ["Python", "Java"]?',
          options: ['linguagens[1]', 'linguagens.first()', 'linguagens[0]', 'linguagens.get(0)'],
          answer: 2,
          explanation: 'Índices em Python começam em 0. linguagens[0] retorna "Python".'
        },
        {
          question: 'O que é uma f-string?',
          options: [
            'Uma função especial de string',
            'Uma string que permite interpolação com {}',
            'Uma string formatada como JSON',
            'Uma string imutável'
          ],
          answer: 1,
          explanation: 'f-string: escreva f"texto {variavel}" para inserir valores diretamente na string.'
        }
      ]
    },
    {
      id: 'py-functions',
      title: 'Funções',
      xp: 15,
      lesson: {
        title: 'Funções em Python',
        theory: `Funções organizam código reutilizável. Em Python usamos a palavra <code>def</code> para definir uma função.

Conceitos importantes:
• <strong>Parâmetros</strong> — valores de entrada
• <strong>Return</strong> — valor de saída
• <strong>Parâmetros padrão</strong> — valores opcionais
• <strong>*args / **kwargs</strong> — número variável de argumentos`,
        examples: [
          {
            title: 'Função básica',
            code: `def saudacao(nome):
    return f"Olá, {nome}!"

resultado = saudacao("Adil")
print(resultado)  # Olá, Adil!`,
            explanation: 'def nome_funcao(parametros): e return para retornar valor.'
          },
          {
            title: 'Parâmetros padrão',
            code: `def criar_usuario(nome, nivel="iniciante", xp=0):
    return {
        "nome": nome,
        "nivel": nivel,
        "xp": xp
    }

# Só passamos o obrigatório
u1 = criar_usuario("Adil")
print(u1)
# {'nome': 'Adil', 'nivel': 'iniciante', 'xp': 0}

u2 = criar_usuario("Maria", nivel="sênior", xp=9000)
print(u2["nivel"])  # sênior`,
            explanation: 'Parâmetros com = têm valor padrão e são opcionais na chamada.'
          },
          {
            title: 'Lambda (função anônima)',
            code: `# Lambda: função em uma linha
dobrar = lambda x: x * 2
print(dobrar(5))   # 10

# Usando em lista
numeros = [3, 1, 4, 1, 5, 9]
pares = list(filter(lambda n: n % 2 == 0, numeros))
print(pares)  # [4]

# sorted com lambda
devs = [{"nome": "B", "xp": 300}, {"nome": "A", "xp": 900}]
devs.sort(key=lambda d: d["xp"], reverse=True)
print(devs[0]["nome"])  # A`,
            explanation: 'lambda parâmetros: expressão — útil para funções simples inline.'
          }
        ]
      },
      quiz: [
        {
          question: 'Qual keyword define uma função em Python?',
          options: ['function', 'func', 'def', 'fn'],
          answer: 2,
          explanation: 'Python usa def para definir funções: def minha_funcao():'
        },
        {
          question: 'O que acontece se uma função não tem return?',
          options: ['Erro', 'Retorna 0', 'Retorna None', 'Retorna ""'],
          answer: 2,
          explanation: 'Sem return explícito, a função retorna None automaticamente.'
        },
        {
          question: 'Como definir parâmetro opcional com valor padrão?',
          options: ['def f(x, y=10)', 'def f(x, y?=10)', 'def f(x, optional y=10)', 'def f(x, y default 10)'],
          answer: 0,
          explanation: 'Use def f(x, y=10). Se y não for passado, vale 10.'
        },
        {
          question: 'O que faz: dobrar = lambda x: x * 2?',
          options: [
            'Cria uma variável dobrar com valor x*2',
            'Define uma função anônima que dobra x',
            'Multiplica lambda por x',
            'Erro de sintaxe'
          ],
          answer: 1,
          explanation: 'lambda cria uma função anônima. dobrar(5) retorna 10.'
        }
      ]
    },
    {
      id: 'py-oop',
      title: 'Classes e OOP',
      xp: 20,
      lesson: {
        title: 'Orientação a Objetos',
        theory: `Python é uma linguagem orientada a objetos. Classes são moldes para criar objetos.

Pilares da OOP:
• <strong>Encapsulamento</strong> — dados e métodos juntos
• <strong>Herança</strong> — uma classe herda de outra
• <strong>Polimorfismo</strong> — mesmo método, comportamentos diferentes
• <strong>Abstração</strong> — esconder detalhes`,
        examples: [
          {
            title: 'Classe básica',
            code: `class Dev:
    def __init__(self, nome, linguagem):
        self.nome = nome
        self.linguagem = linguagem
        self.xp = 0

    def estudar(self, horas):
        self.xp += horas * 10
        return f"{self.nome} ganhou {horas * 10} XP!"

    def __str__(self):
        return f"Dev({self.nome}, XP={self.xp})"

adil = Dev("Adil", "Python")
print(adil.estudar(3))   # Adil ganhou 30 XP!
print(adil)              # Dev(Adil, XP=30)`,
            explanation: '__init__ é o construtor. self referencia a instância atual.'
          },
          {
            title: 'Herança',
            code: `class Animal:
    def __init__(self, nome):
        self.nome = nome

    def falar(self):
        return "..."

class Cachorro(Animal):
    def falar(self):          # sobrescreve o método
        return f"{self.nome} diz: Au!"

class Gato(Animal):
    def falar(self):
        return f"{self.nome} diz: Miau!"

animais = [Cachorro("Rex"), Gato("Mia")]
for a in animais:
    print(a.falar())
# Rex diz: Au!
# Mia diz: Miau!`,
            explanation: 'class Filho(Pai) herda tudo do pai. Pode sobrescrever métodos (polimorfismo).'
          }
        ]
      },
      quiz: [
        {
          question: 'O que é __init__ em uma classe Python?',
          options: ['Um método estático', 'O construtor da classe', 'Um método privado', 'A função principal'],
          answer: 1,
          explanation: '__init__ é chamado automaticamente quando um objeto é criado.'
        },
        {
          question: 'O que self representa em um método?',
          options: ['A classe em si', 'A instância do objeto', 'O método pai', 'Um parâmetro opcional'],
          answer: 1,
          explanation: 'self é a referência ao objeto atual (como this em Java/JS).'
        },
        {
          question: 'Como Cachorro herda de Animal em Python?',
          options: ['class Cachorro extends Animal', 'class Cachorro(Animal)', 'class Cachorro : Animal', 'class Cachorro implements Animal'],
          answer: 1,
          explanation: 'Python usa parênteses: class Cachorro(Animal).'
        },
        {
          question: 'O que é polimorfismo?',
          options: [
            'Criar muitas classes',
            'Herdar de múltiplas classes',
            'Mesmo método com comportamentos diferentes em subclasses',
            'Encapsular dados privados'
          ],
          answer: 2,
          explanation: 'Polimorfismo: Animal.falar() tem resultado diferente em Cachorro e Gato.'
        }
      ]
    },
    {
      id: 'py-loops',
      title: 'Loops e Condicionais',
      xp: 10,
      lesson: {
        title: 'Controle de Fluxo',
        theory: `Python usa indentação (espaços) para definir blocos de código — não usa {} como Java/JS.

Estruturas:
• <code>if / elif / else</code> — condicionais
• <code>for item in coleção</code> — loop sobre itens
• <code>while condição</code> — loop enquanto verdadeiro
• <code>break / continue</code> — controle de loop`,
        examples: [
          {
            title: 'If/elif/else',
            code: `xp = 450

if xp >= 1000:
    nivel = "Sênior"
elif xp >= 500:
    nivel = "Pleno"
elif xp >= 100:
    nivel = "Júnior"
else:
    nivel = "Iniciante"

print(f"Nível: {nivel}")  # Nível: Júnior`,
            explanation: 'Python usa elif (não else if). Indentação define o bloco.'
          },
          {
            title: 'For loop',
            code: `# Loop em lista
linguagens = ["Python", "Java", "Angular"]
for lang in linguagens:
    print(f"Aprendendo {lang}...")

# Loop com índice
for i, lang in enumerate(linguagens):
    print(f"{i+1}. {lang}")

# Loop numérico
for n in range(1, 6):  # 1 a 5
    print(n)`,
            explanation: 'for item in lista percorre cada elemento. range(inicio, fim) gera números.'
          },
          {
            title: 'List Comprehension',
            code: `# Tradicional
quadrados = []
for n in range(1, 6):
    quadrados.append(n ** 2)

# List comprehension (Pythônico!)
quadrados = [n ** 2 for n in range(1, 6)]
print(quadrados)  # [1, 4, 9, 16, 25]

# Com filtro
pares = [n for n in range(10) if n % 2 == 0]
print(pares)  # [0, 2, 4, 6, 8]`,
            explanation: 'List comprehension: [expressão for item in lista if condição] — elegante e rápido.'
          }
        ]
      },
      quiz: [
        {
          question: 'Como Python define blocos de código?',
          options: ['Chaves {}', 'Parênteses ()', 'Indentação (espaços)', 'Colchetes []'],
          answer: 2,
          explanation: 'Python usa indentação consistente. 4 espaços é o padrão PEP8.'
        },
        {
          question: 'O que range(0, 5) gera?',
          options: ['0, 1, 2, 3, 4, 5', '0, 1, 2, 3, 4', '1, 2, 3, 4, 5', '1, 2, 3, 4'],
          answer: 1,
          explanation: 'range(0, 5) gera 0, 1, 2, 3, 4. O último valor (5) é exclusivo.'
        },
        {
          question: 'Qual é a versão Pythônica de criar lista de quadrados?',
          options: [
            'quadrados = map(n**2, range(5))',
            'quadrados = [n**2 for n in range(5)]',
            'quadrados = foreach(n in range(5)) n**2',
            'quadrados = Array.from(range(5)).map(n => n**2)'
          ],
          answer: 1,
          explanation: 'List comprehension é a forma Pythônica: [n**2 for n in range(5)].'
        },
        {
          question: 'Como escrever "senão se" em Python?',
          options: ['else if', 'elseif', 'elif', 'otherwise'],
          answer: 2,
          explanation: 'Python usa elif (abreviação de else if).'
        }
      ]
    }
  ]
};
