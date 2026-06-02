// python-fundamentos2.js — Fundamentos essenciais que todo dev/analista precisa dominar
window.PYTHON_FUND2 = [
  {
    id: 'py-comprehensions',
    title: 'Comprehensions e Estruturas',
    xp: 15,
    lesson: {
      title: 'List, Dict e Set Comprehensions — Código Pythônico',
      theory: `Comprehensions são uma das features mais características do Python — permitem criar listas, dicionários e conjuntos em uma linha, com código mais legível e geralmente mais rápido.

São usadas em praticamente todo código Python profissional. Dominar comprehensions é um sinal imediato de que você sabe Python de verdade.

• <strong>List comprehension</strong> — cria lista filtrando/transformando
• <strong>Dict comprehension</strong> — cria dicionário a partir de qualquer iterável
• <strong>Set comprehension</strong> — cria conjunto (valores únicos)
• <strong>Generator expression</strong> — igual a list, mas lazy (economiza memória)`,
      examples: [
        {
          title: 'List comprehension — substitui loops de transformação',
          code: `# ❌ Forma verbosa (iniciante)
numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
pares_ao_quadrado = []
for n in numeros:
    if n % 2 == 0:
        pares_ao_quadrado.append(n ** 2)

# ✅ Com list comprehension (pythônico)
pares_ao_quadrado = [n ** 2 for n in numeros if n % 2 == 0]
print(pares_ao_quadrado)  # [4, 16, 36, 64, 100]

# Transformar lista de strings
nomes = ["ana silva", "BRUNO COSTA", "carla LIMA"]
nomes_formatados = [nome.title().strip() for nome in nomes]
print(nomes_formatados)  # ['Ana Silva', 'Bruno Costa', 'Carla Lima']

# Achatar lista de listas (flatten)
matriz = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [x for linha in matriz for x in linha]
print(flat)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Comprehension com condição ternária (if/else inline)
classificados = ["aprovado" if nota >= 7 else "reprovado"
                 for nota in [8, 5, 9, 3, 7]]
print(classificados)  # ['aprovado', 'reprovado', 'aprovado', 'reprovado', 'aprovado']`,
          explanation: 'List comprehension é [expressão for item in iterável if condição]. A condição é opcional. O if/else ternário vem antes do for, não depois.'
        },
        {
          title: 'Dict e Set comprehension — transformar dicionários',
          code: `# Dict comprehension
precos = {"notebook": 4500, "mouse": 120, "monitor": 1200, "teclado": 350}

# Filtrar produtos com preço > 500 e aplicar desconto
com_desconto = {
    produto: round(preco * 0.9, 2)
    for produto, preco in precos.items()
    if preco > 500
}
print(com_desconto)  # {'notebook': 4050.0, 'monitor': 1080.0}

# Inverter chave/valor de um dicionário
invertido = {v: k for k, v in precos.items()}
print(invertido)  # {4500: 'notebook', 120: 'mouse', ...}

# Criar dicionário a partir de duas listas (zip)
chaves  = ["nome", "cargo", "salario"]
valores = ["Ana", "Dev", 8000]
pessoa  = {k: v for k, v in zip(chaves, valores)}
print(pessoa)  # {'nome': 'Ana', 'cargo': 'Dev', 'salario': 8000}

# Set comprehension — valores únicos
emails = ["ana@empresa.com", "bruno@empresa.com", "ana@empresa.com", "carla@outra.com"]
dominios = {email.split("@")[1] for email in emails}
print(dominios)  # {'empresa.com', 'outra.com'}

# Generator expression — lazy, não carrega tudo na memória
total = sum(n ** 2 for n in range(1_000_000))  # não cria lista de 1M elementos
print(total)`,
          explanation: 'Set comprehension usa {}  sem :. Generator expression usa () e é lazy — ideal para somas/max/min em sequências grandes. dict.items() retorna tuplas (chave, valor).'
        },
        {
          title: 'Estruturas de dados avançadas — defaultdict, Counter, namedtuple',
          code: `from collections import defaultdict, Counter, namedtuple
from dataclasses import dataclass

# Counter — contagem automática
palavras = ["python", "java", "python", "go", "python", "java", "rust"]
contagem = Counter(palavras)
print(contagem)                    # Counter({'python': 3, 'java': 2, ...})
print(contagem.most_common(2))     # [('python', 3), ('java', 2)]

# defaultdict — evita KeyError em dicionários agrupados
vendas_por_vendedor = defaultdict(list)
transacoes = [("Ana", 500), ("Bruno", 200), ("Ana", 800), ("Bruno", 300), ("Ana", 150)]
for vendedor, valor in transacoes:
    vendas_por_vendedor[vendedor].append(valor)  # sem KeyError!

for vendedor, vals in vendas_por_vendedor.items():
    print(f"{vendedor}: total={sum(vals)}, qtd={len(vals)}")

# namedtuple — tupla com nomes de campos (imutável, legível)
Produto = namedtuple("Produto", ["id", "nome", "preco", "estoque"])
p = Produto(id=1, nome="Notebook", preco=4500.0, estoque=10)
print(p.nome, p.preco)   # Notebook 4500.0
print(p._asdict())        # OrderedDict com todos os campos

# dataclass — versão moderna (Python 3.7+)
@dataclass
class Funcionario:
    nome: str
    cargo: str
    salario: float
    ativo: bool = True

f = Funcionario("Ana", "Dev Senior", 12000.0)
print(f)  # Funcionario(nome='Ana', cargo='Dev Senior', salario=12000.0, ativo=True)`,
          explanation: 'Counter e defaultdict são da stdlib — não precisa instalar nada. namedtuple e dataclass são preferíveis a dicionários quando o dado tem estrutura fixa e conhecida.'
        },
        {
          title: 'Generators e itertools — processar dados sem memória',
          code: `import itertools

# Generator function — yield em vez de return
def ler_csv_em_blocos(arquivo_simulado, tamanho=3):
    """Lê arquivo linha por linha sem carregar tudo na memória"""
    linhas = arquivo_simulado  # simulando linhas de arquivo
    bloco = []
    for linha in linhas:
        bloco.append(linha)
        if len(bloco) >= tamanho:
            yield bloco
            bloco = []
    if bloco:
        yield bloco  # último bloco

dados = list(range(1, 11))  # simulando 10 linhas
for bloco in ler_csv_em_blocos(dados):
    print(f"Processando bloco: {bloco}")

# itertools — combinatórias e agrupamentos
vendedores  = ["Ana", "Bruno", "Carla"]
produtos    = ["Notebook", "Mouse"]
# Produto cartesiano (todas as combinações)
combinacoes = list(itertools.product(vendedores, produtos))
print(f"\nCombinações: {combinacoes[:3]}...")

# groupby — agrupar sequência já ordenada
from itertools import groupby
funcionarios = [
    {"nome": "Ana", "cargo": "Dev"},
    {"nome": "Bruno", "cargo": "Dev"},
    {"nome": "Carla", "cargo": "QA"},
    {"nome": "Diego", "cargo": "QA"},
]
funcionarios.sort(key=lambda x: x["cargo"])
for cargo, grupo in groupby(funcionarios, key=lambda x: x["cargo"]):
    nomes = [f["nome"] for f in grupo]
    print(f"{cargo}: {nomes}")`,
          explanation: 'Generators com yield são a base de pipelines de dados eficientes. Para arquivos de GB, nunca use readlines() — processe linha a linha com yield. itertools faz parte da stdlib.'
        }
      ],
      quiz: [
        {
          q: 'Qual é a forma correta de criar uma list comprehension que retorna apenas números pares de 1 a 10?',
          options: ['[n for n if n%2==0 in range(10)]', '[n for n in range(1,11) if n%2==0]', '[n%2==0 for n in range(10)]', '{n for n in range(10) if n%2==0}'],
          answer: 1,
          explanation: 'Sintaxe: [expressão for variável in iterável if condição]. range(1,11) gera de 1 a 10 inclusive. n%2==0 verifica se é par.'
        },
        {
          q: 'Qual estrutura usar para contar ocorrências de elementos em uma lista sem escrever loops?',
          options: ['defaultdict(int)', 'Counter(lista)', 'set(lista)', 'dict.fromkeys(lista)'],
          answer: 1,
          explanation: 'Counter da collections conta automaticamente as ocorrências. Counter(lista) retorna um dicionário {elemento: quantidade} ordenado por frequência.'
        },
        {
          q: 'Qual a diferença entre list comprehension e generator expression?',
          options: ['Não há diferença, são sinônimos', 'List comprehension usa [] e cria a lista inteira na memória; generator usa () e é lazy', 'Generator comprehension não suporta filtros com if', 'List comprehension é mais lenta'],
          answer: 1,
          explanation: 'List comprehension: [x for x in range(10^6)] cria 1M de elementos em memória. Generator: (x for x in range(10^6)) cria um iterador que gera um elemento por vez — ideal para grandes volumes.'
        },
        {
          q: 'O que faz defaultdict(list)?',
          options: ['Cria um dicionário cujos valores são listas fixas', 'Cria um dicionário que inicializa automaticamente valores inexistentes como lista vazia', 'Converte listas para dicionários', 'Ordena as chaves do dicionário'],
          answer: 1,
          explanation: 'defaultdict(list) inicializa chaves inexistentes com [] automaticamente. Assim, d["nova_chave"].append(1) funciona sem KeyError.'
        },
        {
          q: 'Como criar um dicionário invertido (chaves viram valores e vice-versa) de forma pythônica?',
          options: ['dict.reverse(original)', '{v: k for k, v in original.items()}', 'reversed(original)', 'dict.flip(original)'],
          answer: 1,
          explanation: 'Dict comprehension com items() e os papéis de k e v invertidos: {v: k for k, v in d.items()}. Funciona desde que todos os valores sejam hashable (strings, números, tuplas).'
        }
      ]
    }
  },

  {
    id: 'py-erros-arquivos',
    title: 'Erros, Arquivos e JSON',
    xp: 15,
    lesson: {
      title: 'Tratamento de Erros e Manipulação de Arquivos',
      theory: `Dois fundamentos que todo programador usa diariamente:

<strong>Tratamento de Erros:</strong>
• <code>try/except</code> — captura erros sem travar o programa
• <code>finally</code> — executa sempre (ótimo para fechar conexões)
• <code>raise</code> — lança erros customizados
• Erros mais comuns: ValueError, TypeError, FileNotFoundError, KeyError, IndexError

<strong>Arquivos:</strong>
• <code>open()</code> com <code>with</code> — sempre use with (fecha automaticamente)
• JSON — formato universal de troca de dados (APIs, configs)
• CSV — planilhas e dados tabulares
• os e pathlib — navegar sistema de arquivos`,
      examples: [
        {
          title: 'try/except/finally — tratamento robusto de erros',
          code: `# Erros comuns e como capturá-los
def converter_para_float(valor):
    """Converte string para float com tratamento de erro"""
    try:
        resultado = float(valor)
        if resultado < 0:
            raise ValueError(f"Valor não pode ser negativo: {resultado}")
        return resultado
    except ValueError as e:
        print(f"❌ Erro de valor: {e}")
        return None
    except TypeError as e:
        print(f"❌ Tipo inválido: {e}")
        return None

print(converter_para_float("42.5"))   # 42.5
print(converter_para_float("abc"))    # ❌ Erro de valor
print(converter_para_float(None))     # ❌ Tipo inválido
print(converter_para_float("-10"))    # ❌ negativo

# Múltiplos except + finally
def abrir_arquivo(nome):
    arquivo = None
    try:
        arquivo = open(nome, "r")
        return arquivo.read()
    except FileNotFoundError:
        print(f"Arquivo '{nome}' não encontrado")
        return ""
    except PermissionError:
        print(f"Sem permissão para ler '{nome}'")
        return ""
    finally:
        if arquivo:
            arquivo.close()   # sempre executado

# Exceções customizadas (padrão profissional)
class ErroValidacao(Exception):
    def __init__(self, campo, mensagem):
        self.campo = campo
        super().__init__(f"[{campo}] {mensagem}")

def validar_cpf(cpf: str):
    if not cpf.replace(".", "").replace("-", "").isdigit():
        raise ErroValidacao("cpf", "CPF deve conter apenas números")
    if len(cpf.replace(".", "").replace("-", "")) != 11:
        raise ErroValidacao("cpf", "CPF deve ter 11 dígitos")
    return True

try:
    validar_cpf("123.456.abc-00")
except ErroValidacao as e:
    print(f"Validação falhou — Campo: {e.campo}, Msg: {e}")`,
          explanation: 'Capture sempre o erro mais específico primeiro. finally é ideal para fechar arquivos, conexões de banco e sockets. Nunca use except: vazio (silencia todos os erros, incluindo bugs).'
        },
        {
          title: 'Leitura e escrita de arquivos — JSON e texto',
          code: `import json
import os
from pathlib import Path

# JSON — formato padrão de APIs e configurações
dados = {
    "empresa": "TechCorp",
    "funcionarios": [
        {"nome": "Ana", "cargo": "Dev", "salario": 8000},
        {"nome": "Bruno", "cargo": "QA", "salario": 5500}
    ],
    "ativo": True
}

# Salvar JSON
with open("empresa.json", "w", encoding="utf-8") as f:
    json.dump(dados, f, indent=2, ensure_ascii=False)

# Ler JSON
with open("empresa.json", "r", encoding="utf-8") as f:
    lido = json.load(f)

print(lido["funcionarios"][0]["nome"])  # Ana
print(type(lido["ativo"]))              # <class 'bool'>

# JSON de string (resposta de API)
resposta_api = '{"status": "ok", "total": 42, "itens": [1, 2, 3]}'
obj = json.loads(resposta_api)  # string → dict
print(obj["total"])  # 42

de_volta = json.dumps(obj, indent=2)  # dict → string

# pathlib — navegação de arquivos moderna
pasta = Path("dados")
pasta.mkdir(exist_ok=True)  # cria se não existir

arquivo = pasta / "relatorio.txt"  # / concatena caminhos!
arquivo.write_text("Relatório gerado automaticamente\n", encoding="utf-8")
conteudo = arquivo.read_text(encoding="utf-8")
print(conteudo)

# Listar arquivos
for arq in pasta.iterdir():
    print(f"{arq.name} — {arq.stat().st_size} bytes")

# Verificações úteis
print(arquivo.exists())   # True
print(arquivo.suffix)     # .txt
print(arquivo.stem)       # relatorio`,
          explanation: 'Sempre use encoding="utf-8" para arquivos com acentos. json.load() lê de arquivo, json.loads() lê de string. pathlib.Path é mais moderna e legível que os.path.'
        },
        {
          title: 'Leitura e escrita de CSV e Excel com pandas',
          code: `import pandas as pd
from pathlib import Path
import json

# Ler CSV com configurações avançadas
# df = pd.read_csv(
#     "dados.csv",
#     sep=";",               # separador (padrão é vírgula)
#     encoding="utf-8",      # ou "latin-1" para arquivos antigos do Excel
#     parse_dates=["data"],  # converte coluna para datetime
#     dtype={"cpf": str},    # força tipo (evita que CPF perca zeros)
#     skiprows=2,            # pula 2 linhas iniciais (cabeçalhos extras)
#     nrows=1000,            # lê apenas 1000 linhas (preview)
#     usecols=["id","nome","valor"]  # apenas colunas necessárias
# )

# Criar DataFrame de exemplo para demonstração
df = pd.DataFrame({
    "id": [1, 2, 3],
    "nome": ["Ana", "Bruno", "Carla"],
    "vendas": [45000, 32000, 58000],
    "regiao": ["SP", "RJ", "SP"]
})

# Salvar CSV
df.to_csv("relatorio.csv", index=False, encoding="utf-8", sep=";")

# Salvar Excel com múltiplas abas
with pd.ExcelWriter("relatorio.xlsx", engine="openpyxl") as writer:
    df.to_excel(writer, sheet_name="Geral", index=False)

    resumo = df.groupby("regiao")["vendas"].sum().reset_index()
    resumo.to_excel(writer, sheet_name="Por Região", index=False)

print("Arquivos salvos!")
print(f"CSV: {Path('relatorio.csv').stat().st_size} bytes")

# Ler múltiplas abas do Excel
abas = pd.read_excel("relatorio.xlsx", sheet_name=None)  # None = todas as abas
for nome_aba, dados in abas.items():
    print(f"Aba '{nome_aba}': {dados.shape}")`,
          explanation: 'Para CSV de sistemas brasileiros, tente sep=";" e encoding="latin-1" se o utf-8 falhar. ExcelWriter com "with" garante que o arquivo seja salvo e fechado corretamente.'
        }
      ],
      quiz: [
        {
          q: 'Qual é a forma correta de ler um arquivo em Python para garantir que ele seja fechado mesmo em caso de erro?',
          options: ['file = open("f.txt"); file.close()', 'with open("f.txt", "r") as f: conteudo = f.read()', 'try: open("f.txt") except: pass', 'file = open("f.txt"); try: file.read() finally: file.close()'],
          answer: 1,
          explanation: 'O context manager with garante o fechamento automático do arquivo mesmo se ocorrer uma exceção. É a forma idiomática e preferida em Python.'
        },
        {
          q: 'Qual função converte uma string JSON para um objeto Python?',
          options: ['json.load()', 'json.loads()', 'json.parse()', 'json.decode()'],
          answer: 1,
          explanation: 'json.loads() (load string) converte string → dict/list. json.load() lê de arquivo. json.dumps() converte dict → string. json.dump() escreve em arquivo.'
        },
        {
          q: 'O que acontece no bloco finally de um try/except?',
          options: ['Executa apenas se não houver exceção', 'Executa apenas se houver exceção', 'Sempre executa, independente de erro ou não', 'Executa apenas se o except capturar o erro'],
          answer: 2,
          explanation: 'finally sempre executa — com exceção, sem exceção, mesmo com return dentro do try. É ideal para liberar recursos (fechar arquivo, conexão de banco, socket).'
        },
        {
          q: 'Como usar pathlib para criar um caminho "dados/relatorio.csv"?',
          options: ['Path("dados") + "relatorio.csv"', 'Path("dados") / "relatorio.csv"', 'Path.join("dados", "relatorio.csv")', 'Path("dados\\relatorio.csv")'],
          answer: 1,
          explanation: 'pathlib usa o operador / para concatenar caminhos. Funciona em Windows, Mac e Linux automaticamente (sem precisar do separador correto).'
        },
        {
          q: 'Para ler um CSV brasileiro com separador ";" e acentos, qual configuração está correta?',
          options: ['pd.read_csv("f.csv")', 'pd.read_csv("f.csv", sep=";", encoding="latin-1")', 'pd.read_csv("f.csv", delimiter=",", codec="br")', 'pd.read_csv("f.csv", locale="pt-BR")'],
          answer: 1,
          explanation: 'Planilhas exportadas do Excel Brasil geralmente usam ; como separador e encoding latin-1 (ISO-8859-1). Se aparecer caracteres estranhos, tente encoding="cp1252".'
        }
      ]
    }
  },

  {
    id: 'py-regex-strings',
    title: 'Regex e Manipulação de Texto',
    xp: 15,
    lesson: {
      title: 'Regex — Buscas e Validações em Texto',
      theory: `Expressões regulares (regex) são padrões para buscar, validar e extrair texto. Aparecem em:
• Validação de e-mail, CPF, telefone, CEP
• Extração de dados de HTML/PDF/logs
• Limpeza de dados (remover caracteres especiais)
• Web scraping e análise de texto

Python usa o módulo <code>re</code> da stdlib. Com Pandas, use o accessor <code>.str.extract()</code> e <code>.str.findall()</code>.

Padrões essenciais:
• <code>\\d</code> — dígito  • <code>\\w</code> — letra/número  • <code>\\s</code> — espaço
• <code>+</code> — 1 ou mais  • <code>*</code> — 0 ou mais  • <code>?</code> — 0 ou 1
• <code>{n,m}</code> — entre n e m  • <code>^</code> — início  • <code>$</code> — fim
• <code>()</code> — grupo de captura`,
      examples: [
        {
          title: 'Validações essenciais — e-mail, CPF, telefone, CEP',
          code: `import re

def validar(padrao, valor, flags=0):
    return bool(re.fullmatch(padrao, valor, flags))

# E-mail
EMAIL = r"^[\w.+\-]+@[\w\-]+\.[a-z]{2,}$"
print(validar(EMAIL, "ana@empresa.com"))     # True
print(validar(EMAIL, "ana@"))               # False
print(validar(EMAIL, "Ana.Silva@Gmail.COM", re.IGNORECASE))  # True

# CPF (com ou sem formatação)
CPF = r"\d{3}\.?\d{3}\.?\d{3}-?\d{2}"
print(validar(CPF, "123.456.789-00"))  # True
print(validar(CPF, "12345678900"))     # True

# Telefone BR (fixo e celular)
TEL = r"(\+55\s?)?(\(?\d{2}\)?\s?)(\d{4,5}-?\d{4})"
print(bool(re.fullmatch(TEL, "(11) 98765-4321")))  # True
print(bool(re.fullmatch(TEL, "+55 11 91234-5678"))) # True

# CEP
CEP = r"\d{5}-?\d{3}"
print(validar(CEP, "01310-100"))  # True
print(validar(CEP, "01310100"))   # True

# Extrair grupos (captura)
m = re.search(r"(\d{2})/(\d{2})/(\d{4})", "Data: 25/12/2024")
if m:
    dia, mes, ano = m.groups()
    print(f"dia={dia}, mês={mes}, ano={ano}")`,
          explanation: 're.fullmatch() exige que o padrão case o texto inteiro. re.search() encontra o padrão em qualquer posição. re.IGNORECASE ignora maiúsculas/minúsculas.'
        },
        {
          title: 'Extração e limpeza de texto — padrões reais',
          code: `import re

# Extrair dados de texto não estruturado (como log ou e-mail)
log = """
[2024-01-15 14:32:01] ERROR user=ana@empresa.com action=login ip=192.168.1.10
[2024-01-15 14:33:45] INFO  user=bruno@empresa.com action=upload ip=10.0.0.5
[2024-01-15 14:35:12] ERROR user=carla@empresa.com action=delete ip=192.168.1.20
"""

# Extrair todas as ocorrências
erros   = re.findall(r"\[(.+?)\] ERROR", log)
emails  = re.findall(r"user=([\w.@]+)", log)
ips     = re.findall(r"ip=(\d+\.\d+\.\d+\.\d+)", log)

print("Erros:", erros)
print("Emails:", emails)
print("IPs:", ips)

# Limpeza: remover caracteres indesejados
def limpar_texto(texto):
    texto = re.sub(r"<[^>]+>", "", texto)          # remove HTML tags
    texto = re.sub(r"http\S+", "", texto)           # remove URLs
    texto = re.sub(r"[^\w\sÀ-ɏ]", "", texto)  # remove pontuação (mantém acentos)
    texto = re.sub(r"\s+", " ", texto).strip()      # normaliza espaços
    return texto

html = '<p>Confira nossa <a href="https://site.com">oferta</a>!</p>'
limpo = limpar_texto(html)
print(limpo)  # Confira nossa oferta

# Substituição com função
def mascara_cpf(m):
    return f"{m.group(1)}.***.***-{m.group(2)}"

texto = "CPF do cliente: 123.456.789-00 e CPF do sócio: 987.654.321-11"
mascarado = re.sub(r"(\d{3})\.\d{3}\.\d{3}-(\d{2})", mascara_cpf, texto)
print(mascarado)  # CPF do cliente: 123.***.***-00 e CPF do sócio: 987.***.***-11`,
          explanation: 're.findall() retorna lista de matches. re.sub() substitui matches. O r"..." (raw string) evita conflito com \\ do Python. Grupos () capturam partes específicas do match.'
        },
        {
          title: 'Regex com Pandas — extrair dados de colunas',
          code: `import pandas as pd

df = pd.DataFrame({
    "descricao": [
        "Venda #1234 — Cliente: Ana Silva (SP)",
        "Venda #5678 — Cliente: Bruno Costa (RJ)",
        "Venda #9012 — Cliente: Carla Lima (MG)",
    ],
    "contato": [
        "ana@empresa.com / (11) 98765-4321",
        "bruno@empresa.com / (21) 91234-5678",
        "carla@empresa.com / (31) 99876-5432",
    ]
})

# Extrair número do pedido
df["num_pedido"] = df["descricao"].str.extract(r"#(\d+)")

# Extrair nome do cliente
df["cliente"] = df["descricao"].str.extract(r"Cliente: ([A-Za-záéíóúãõçÁÉÍÓÚÃÕÇ ]+) \(")

# Extrair estado (2 letras entre parênteses)
df["estado"] = df["descricao"].str.extract(r"\(([A-Z]{2})\)")

# Extrair e-mail
df["email"] = df["contato"].str.extract(r"([\w.]+@[\w.]+)")

# Extrair telefone
df["telefone"] = df["contato"].str.extract(r"(\(\d{2}\) \d{4,5}-\d{4})")

print(df[["num_pedido", "cliente", "estado", "email", "telefone"]].to_string())`,
          explanation: 'str.extract() captura o primeiro grupo (). str.extractall() captura todos os matches. str.contains(r"padrão") filtra linhas que contenham o padrão.'
        }
      ],
      quiz: [
        {
          q: 'Qual método re usa para encontrar TODOS os matches de um padrão em uma string?',
          options: ['re.search()', 're.match()', 're.findall()', 're.fullmatch()'],
          answer: 2,
          explanation: 're.findall() retorna uma lista com todos os matches. re.search() retorna apenas o primeiro. re.match() só verifica o início da string. re.fullmatch() verifica a string inteira.'
        },
        {
          q: 'O que faz o padrão \\d{2,4} no regex?',
          options: ['Captura exatamente 3 dígitos', 'Captura entre 2 e 4 dígitos consecutivos', 'Captura 2 ou 4 dígitos (não 3)', 'Captura 2 dígitos seguidos de qualquer coisa'],
          answer: 1,
          explanation: '{n,m} significa "entre n e m repetições". \\d{2,4} casa 2, 3 ou 4 dígitos. {2} = exatamente 2, {2,} = 2 ou mais.'
        },
        {
          q: 'Por que usar r"..." (raw string) em padrões regex?',
          options: ['Para melhorar a performance', 'Para evitar que o Python interprete \\ como escape antes do regex processar', 'Para suportar Unicode', 'É apenas estilo, não faz diferença'],
          answer: 1,
          explanation: 'Em Python, "\\n" é quebra de linha. r"\\n" é a string literal \\n (dois caracteres). No regex, \\d significa dígito — sem raw string, precisaria escrever "\\\\d".'
        },
        {
          q: 'Como extrair o domínio de uma coluna de e-mails no Pandas?',
          options: ['df["email"].str.split("@")[1]', 'df["email"].str.extract(r"@(.+)")', 'df["email"].str.replace("@", "").str[1]', 're.findall(df["email"])'],
          answer: 1,
          explanation: 'str.extract(r"@(.+)") captura tudo após o @. O grupo () define o que será retornado. str.split("@") também funciona, mas retorna listas e precisa de str[1] aplicado diferente.'
        },
        {
          q: 'Para substituir todos os números em uma string por "#", qual código usar?',
          options: ['re.replace(r"\\d+", "#", texto)', 're.sub(r"\\d+", "#", texto)', 'texto.replace(r"\\d+", "#")', 're.findall(r"\\d+", texto, "#")'],
          answer: 1,
          explanation: 're.sub(padrão, substituto, texto) substitui todos os matches. str.replace() não aceita regex. re.sub() aceita função como substituto para substituições dinâmicas.'
        }
      ]
    }
  },

  {
    id: 'py-poo-avancada',
    title: 'OOP Avançada e Design',
    xp: 20,
    lesson: {
      title: 'OOP Avançada — Herança, Mixins e Protocolos',
      theory: `OOP básico (classes, métodos, __init__) você já sabe. O mercado exige mais:

• <strong>Herança e polimorfismo</strong> — reutilizar e especializar comportamento
• <strong>Métodos especiais (dunder)</strong> — __str__, __len__, __eq__, __iter__
• <strong>Properties</strong> — getter/setter elegante sem métodos get/set explícitos
• <strong>Abstract classes</strong> — definir interfaces/contratos
• <strong>Mixins</strong> — compartilhar comportamento entre classes não relacionadas
• <strong>dataclass</strong> — classes de dados sem boilerplate

Esses padrões aparecem em frameworks como Django, FastAPI, SQLAlchemy e nos testes de entrevistas de posições Senior.`,
      examples: [
        {
          title: 'Herança, polimorfismo e métodos abstratos',
          code: `from abc import ABC, abstractmethod
from typing import List

# Classe abstrata — define contrato (interface)
class Repositorio(ABC):
    @abstractmethod
    def buscar_por_id(self, id: int): ...

    @abstractmethod
    def salvar(self, entidade): ...

    @abstractmethod
    def listar_todos(self) -> List: ...

# Implementação em memória (para testes)
class RepositorioEmMemoria(Repositorio):
    def __init__(self):
        self._dados = {}
        self._proximo_id = 1

    def buscar_por_id(self, id: int):
        return self._dados.get(id)

    def salvar(self, entidade):
        entidade.id = self._proximo_id
        self._dados[self._proximo_id] = entidade
        self._proximo_id += 1
        return entidade

    def listar_todos(self) -> List:
        return list(self._dados.values())

# Implementação em banco (produição)
class RepositorioBanco(Repositorio):
    def buscar_por_id(self, id: int):
        return f"SELECT * FROM tabela WHERE id={id}"  # simplificado

    def salvar(self, entidade):
        return f"INSERT INTO tabela VALUES (...)"

    def listar_todos(self):
        return "SELECT * FROM tabela"

# Polimorfismo — mesma interface, comportamentos diferentes
class Produto:
    def __init__(self, nome, preco):
        self.nome = nome
        self.preco = preco
        self.id = None
    def __repr__(self):
        return f"Produto(id={self.id}, nome={self.nome!r})"

repo = RepositorioEmMemoria()
repo.salvar(Produto("Notebook", 4500))
repo.salvar(Produto("Mouse", 120))
print(repo.listar_todos())  # [Produto(id=1, nome='Notebook'), ...]
print(repo.buscar_por_id(1))`,
          explanation: 'ABCs (Abstract Base Classes) definem contratos que as subclasses devem cumprir. Se uma subclasse não implementar um método abstrato, Python levanta TypeError na instanciação.'
        },
        {
          title: 'Métodos especiais (dunder) — comportamento customizado',
          code: `from dataclasses import dataclass, field
from typing import List

@dataclass
class Carrinho:
    itens: List[dict] = field(default_factory=list)

    def adicionar(self, produto: str, preco: float, qtd: int = 1):
        self.itens.append({"produto": produto, "preco": preco, "qtd": qtd})
        return self  # permite encadeamento

    # __len__ — permite len(carrinho)
    def __len__(self):
        return sum(item["qtd"] for item in self.itens)

    # __contains__ — permite "produto" in carrinho
    def __contains__(self, produto: str):
        return any(i["produto"] == produto for i in self.itens)

    # __str__ — representação legível
    def __str__(self):
        linhas = [f"  • {i['produto']} x{i['qtd']} — R${i['preco']*i['qtd']:.2f}"
                  for i in self.itens]
        return "Carrinho:\n" + "\n".join(linhas) + f"\n  Total: R${self.total:.2f}"

    # Property — atributo calculado (sem parênteses na chamada)
    @property
    def total(self) -> float:
        return sum(i["preco"] * i["qtd"] for i in self.itens)

    @property
    def vazio(self) -> bool:
        return len(self.itens) == 0

# Uso natural graças aos dunders
c = (Carrinho()
     .adicionar("Notebook", 4500)
     .adicionar("Mouse", 120, qtd=2)
     .adicionar("Monitor", 1200))

print(len(c))              # 4 (total de itens)
print("Mouse" in c)        # True
print(c.total)             # 5940.0
print(c.vazio)             # False
print(c)`,
          explanation: 'Dunders fazem suas classes se comportarem como tipos nativos do Python. @property transforma um método em atributo — c.total em vez de c.total(). É mais pythônico que getters/setters.'
        },
        {
          title: 'Context managers e decorators de classe',
          code: `from contextlib import contextmanager
import time
import functools

# Context manager customizado com classe
class Timer:
    def __init__(self, nome="operação"):
        self.nome = nome

    def __enter__(self):
        self.inicio = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.duracao = time.perf_counter() - self.inicio
        print(f"⏱ {self.nome}: {self.duracao:.4f}s")
        return False  # não suprime exceções

# Context manager com generator (mais simples)
@contextmanager
def conexao_banco_simulada(nome_banco: str):
    print(f"✅ Conectando a {nome_banco}...")
    conn = {"banco": nome_banco, "ativo": True}  # simulação
    try:
        yield conn
    finally:
        conn["ativo"] = False
        print(f"🔒 Desconectando de {nome_banco}")

# Decorator de classe — singleton pattern
class Singleton:
    _instancia = None

    def __new__(cls, *args, **kwargs):
        if cls._instancia is None:
            cls._instancia = super().__new__(cls)
        return cls._instancia

class Configuracao(Singleton):
    def __init__(self, debug=False):
        if not hasattr(self, "_inicializado"):
            self.debug = debug
            self._inicializado = True

# Uso
with Timer("processamento"):
    total = sum(i**2 for i in range(100_000))

with conexao_banco_simulada("producao") as db:
    print(f"Banco ativo: {db['ativo']}")

c1 = Configuracao(debug=True)
c2 = Configuracao()
print(c1 is c2)   # True — mesma instância!`,
          explanation: '__enter__ e __exit__ são os dunders do context manager (with). @contextmanager é uma alternativa mais simples com yield. Singleton garante uma única instância de uma classe.'
        }
      ],
      quiz: [
        {
          q: 'O que é um método abstrato em Python?',
          options: ['Um método privado que começa com __', 'Um método decorado com @abstractmethod que subclasses DEVEM implementar', 'Um método estático sem acesso ao self', 'Um método que não retorna nada'],
          answer: 1,
          explanation: '@abstractmethod define um contrato: subclasses que não implementarem esse método causarão TypeError ao serem instanciadas. Requer que a classe herde de ABC.'
        },
        {
          q: 'Qual dunder permite usar "item in objeto"?',
          options: ['__has__()', '__in__()', '__contains__()', '__find__()'],
          answer: 2,
          explanation: '__contains__ define o comportamento do operador in. __len__ define len(), __str__ define str() e print(), __iter__ define iteração em for loops.'
        },
        {
          q: 'Qual a vantagem de @property em relação a um método get_valor()?',
          options: ['@property é mais rápido', 'Permite acesso como atributo (obj.valor) sem parênteses, mas com lógica de cálculo', 'Permite modificar o atributo', '@property é a única forma de criar atributos somente-leitura'],
          answer: 1,
          explanation: '@property permite obj.total em vez de obj.total() — mais pythônico. Também permite criar setter (@total.setter) e deleter (@total.deleter) associados.'
        },
        {
          q: 'Em um context manager, qual método é chamado ao sair do bloco "with"?',
          options: ['__close__()', '__exit__()', '__end__()', '__finally__()'],
          answer: 1,
          explanation: '__enter__ é chamado ao entrar no bloco with (retorna o objeto após "as"). __exit__ é chamado ao sair, mesmo em caso de exceção. Se retornar True, suprime a exceção.'
        },
        {
          q: 'O que faz o padrão Singleton?',
          options: ['Cria uma nova instância a cada chamada', 'Garante que existe apenas uma instância da classe em toda a aplicação', 'Permite herança múltipla', 'Torna a classe imutável'],
          answer: 1,
          explanation: 'Singleton garante uma única instância. Comum para conexões de banco, configurações, loggers. Implementado sobrescrevendo __new__ para retornar sempre a mesma instância.'
        }
      ]
    }
  }
];

if (window.PYTHON_DATA) {
  window.PYTHON_DATA.topics = window.PYTHON_DATA.topics.concat(window.PYTHON_FUND2);
}
