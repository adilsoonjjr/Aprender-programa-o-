// Tópicos extras de Python — mercado de trabalho
window.PYTHON_EXTRA = [
  {
    id: 'py-decorators',
    title: 'Decoradores (mercado)',
    xp: 25,
    lesson: {
      title: 'Decoradores — Flask, FastAPI, Django',
      theory: `Decoradores são usados em <strong>todo projeto Python de mercado</strong>. Flask e FastAPI definem rotas com decoradores. Django usa para permissões e cache.

Padrões que você vai encontrar em vagas:
• <code>@app.route("/path")</code> — Flask
• <code>@router.get("/path")</code> — FastAPI
• <code>@login_required</code> — Django
• <code>@cache_page(60)</code> — Django cache
• Decoradores customizados para log, auth, timing`,
      examples: [
        {
          title: 'Decorador customizado — timing e log',
          code: `import time
import functools

def medir_tempo(func):
    """Mede o tempo de execução de qualquer função."""
    @functools.wraps(func)  # preserva nome e docstring
    def wrapper(*args, **kwargs):
        inicio = time.perf_counter()
        resultado = func(*args, **kwargs)
        fim = time.perf_counter()
        print(f"[{func.__name__}] executou em {fim - inicio:.4f}s")
        return resultado
    return wrapper

@medir_tempo
def processar_pedidos(pedidos: list) -> list:
    # Simula processamento pesado
    time.sleep(0.1)
    return [p for p in pedidos if p["ativo"]]

pedidos = [{"id": 1, "ativo": True}, {"id": 2, "ativo": False}]
resultado = processar_pedidos(pedidos)
# [processar_pedidos] executou em 0.1002s`,
          explanation: 'functools.wraps preserva os metadados da função original. *args/**kwargs permite decorar qualquer função.'
        },
        {
          title: 'Rotas com FastAPI (padrão de mercado)',
          code: `from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="DevQuest API", version="1.0.0")

# Schema com validação automática
class Pergunta(BaseModel):
    enunciado: str
    resposta: str
    linguagem: str
    xp: int = 10

# Banco em memória (simples para exemplo)
db: list[Pergunta] = []

@app.get("/perguntas")
async def listar(linguagem: Optional[str] = None):
    if linguagem:
        return [p for p in db if p.linguagem == linguagem]
    return db

@app.post("/perguntas", status_code=201)
async def criar(pergunta: Pergunta):
    db.append(pergunta)
    return pergunta

@app.get("/perguntas/{idx}")
async def buscar(idx: int):
    if idx >= len(db):
        raise HTTPException(status_code=404, detail="Não encontrado")
    return db[idx]`,
          explanation: 'FastAPI gera documentação automática em /docs. Pydantic valida os dados recebidos automaticamente.'
        },
        {
          title: 'Decorador de autenticação (padrão real)',
          code: `from functools import wraps
from flask import request, jsonify
import jwt

SECRET = "minha-chave-secreta"

def requer_token(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.headers.get("Authorization", "")
        if not auth.startswith("Bearer "):
            return jsonify({"erro": "Token ausente"}), 401
        token = auth.split(" ")[1]
        try:
            payload = jwt.decode(token, SECRET, algorithms=["HS256"])
            request.usuario = payload  # disponível na rota
        except jwt.ExpiredSignatureError:
            return jsonify({"erro": "Token expirado"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"erro": "Token inválido"}), 401
        return f(*args, **kwargs)
    return decorated

# Usando na rota Flask
@app.route("/perfil")
@requer_token
def perfil():
    return jsonify({"usuario": request.usuario})`,
          explanation: 'Decoradores empilham de baixo para cima: primeiro requer_token, depois a rota. Padrão real em APIs Flask.'
        }
      ]
    },
    quiz: [
      {
        question: 'Por que usar @functools.wraps no decorador?',
        options: [
          'Para tornar a função mais rápida',
          'Para preservar nome, docstring e metadados da função original',
          'Para permitir parâmetros no decorador',
          'Para criar um decorador assíncrono'
        ],
        answer: 1,
        explanation: 'Sem @wraps, func.__name__ retornaria "wrapper" em vez do nome real — problemático para logs e debug.'
      },
      {
        question: 'O que FastAPI faz com as classes Pydantic no @app.post?',
        options: [
          'Apenas tipagem, sem efeito real',
          'Valida e desserializa o JSON recebido automaticamente',
          'Cria a tabela no banco de dados',
          'Gera o SQL de insert'
        ],
        answer: 1,
        explanation: 'Pydantic valida tipo, formato e obrigatoriedade dos campos. Se inválido, retorna 422 automaticamente.'
      },
      {
        question: 'Qual a ordem de execução dos decoradores empilhados?',
        options: [
          'De cima para baixo',
          'De baixo para cima',
          'Simultâneos',
          'Ordem aleatória'
        ],
        answer: 0,
        explanation: '@requer_token acima de @app.route: requer_token envolve a função primeiro. A ordem importa.'
      },
      {
        question: 'Onde a FastAPI gera documentação automática?',
        options: ['/api-docs', '/swagger', '/docs', '/readme'],
        answer: 2,
        explanation: 'FastAPI gera Swagger UI em /docs e ReDoc em /redoc automaticamente, sem configuração.'
      }
    ]
  },
  {
    id: 'py-async',
    title: 'Async/Await (Python moderno)',
    xp: 25,
    lesson: {
      title: 'Programação Assíncrona',
      theory: `<code>async/await</code> permite executar tarefas de I/O (banco, HTTP, arquivos) sem bloquear o programa. <strong>FastAPI, Django 4+, SQLAlchemy 2</strong> usam async nativamente.

Quando usar:
• Chamadas HTTP externas simultâneas
• Múltiplas queries de banco em paralelo
• WebSockets e streaming
• Qualquer operação que "espera" algo externo`,
      examples: [
        {
          title: 'async/await básico com httpx',
          code: `import asyncio
import httpx  # pip install httpx

async def buscar_usuario(id: int) -> dict:
    async with httpx.AsyncClient() as client:
        resp = await client.get(f"https://jsonplaceholder.typicode.com/users/{id}")
        return resp.json()

async def buscar_multiplos():
    # Busca 3 usuários em PARALELO (não sequencial!)
    tarefas = [
        buscar_usuario(1),
        buscar_usuario(2),
        buscar_usuario(3),
    ]
    usuarios = await asyncio.gather(*tarefas)
    for u in usuarios:
        print(f"{u['id']}: {u['name']}")

# Executar
asyncio.run(buscar_multiplos())
# Resultado: 3 chamadas em paralelo, ~3x mais rápido`,
          explanation: 'asyncio.gather() executa corrotinas em paralelo. 3 chamadas HTTP simultâneas no mesmo tempo de 1.'
        },
        {
          title: 'FastAPI com banco assíncrono (SQLAlchemy 2)',
          code: `from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import DeclarativeBase, mapped_column, Mapped
from sqlalchemy import select

DATABASE_URL = "postgresql+asyncpg://user:pass@localhost/devquest"

engine = create_async_engine(DATABASE_URL)

class Base(DeclarativeBase):
    pass

class Usuario(Base):
    __tablename__ = "usuarios"
    id: Mapped[int] = mapped_column(primary_key=True)
    nome: Mapped[str]
    email: Mapped[str]

app = FastAPI()

async def get_db():
    async with AsyncSession(engine) as session:
        yield session

@app.get("/usuarios/{id}")
async def buscar(id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Usuario).where(Usuario.id == id))
    usuario = result.scalar_one_or_none()
    if not usuario:
        raise HTTPException(404, "Não encontrado")
    return usuario`,
          explanation: 'SQLAlchemy 2 + asyncpg: queries async reais. Depends() injeta a sessão automaticamente (igual ao Spring DI).'
        },
        {
          title: 'Context manager assíncrono',
          code: `import asyncio
import aiofiles  # pip install aiofiles

async def processar_arquivo(caminho: str) -> list[str]:
    """Lê arquivo sem bloquear o event loop."""
    async with aiofiles.open(caminho, mode='r', encoding='utf-8') as f:
        conteudo = await f.read()
    return conteudo.splitlines()

async def salvar_resultado(dados: list, saida: str):
    async with aiofiles.open(saida, mode='w') as f:
        await f.write("\\n".join(dados))
    print(f"Salvo: {saida}")

async def pipeline():
    linhas = await processar_arquivo("dados.csv")
    filtradas = [l for l in linhas if l.strip()]
    await salvar_resultado(filtradas, "resultado.csv")
    print(f"Processadas {len(filtradas)} linhas")

asyncio.run(pipeline())`,
          explanation: 'aiofiles para I/O de arquivo sem bloquear. Em produção com FastAPI, evita travar o servidor.'
        }
      ]
    },
    quiz: [
      {
        question: 'Qual a principal vantagem de async/await sobre threads?',
        options: [
          'Usa múltiplos núcleos da CPU',
          'Menor overhead: cooperativo, sem bloqueio em I/O',
          'Executa mais rápido em CPU-bound tasks',
          'É mais fácil de debugar'
        ],
        answer: 1,
        explanation: 'async/await é ideal para I/O (HTTP, banco). Threads têm overhead de contexto. CPU-bound use multiprocessing.'
      },
      {
        question: 'O que asyncio.gather() faz?',
        options: [
          'Executa corrotinas sequencialmente',
          'Cancela corrotinas em caso de erro',
          'Executa múltiplas corrotinas em paralelo e aguarda todas',
          'Cria um pool de threads'
        ],
        answer: 2,
        explanation: 'gather(*tasks) inicia todas as corrotinas juntas e retorna os resultados na mesma ordem.'
      },
      {
        question: 'Quando NÃO usar async/await em Python?',
        options: [
          'Chamadas HTTP externas',
          'Queries de banco de dados',
          'Cálculos matemáticos pesados (CPU-bound)',
          'Leitura de arquivos'
        ],
        answer: 2,
        explanation: 'async é para I/O. Para CPU-bound (ML, cálculos), use multiprocessing ou concurrent.futures.'
      },
      {
        question: 'Como executar uma corrotina a partir de código síncrono?',
        options: [
          'await minha_corrotina()',
          'asyncio.run(minha_corrotina())',
          'async(minha_corrotina())',
          'loop.start(minha_corrotina())'
        ],
        answer: 1,
        explanation: 'asyncio.run() cria o event loop e executa a corrotina. É o ponto de entrada para código async.'
      }
    ]
  },
  {
    id: 'py-pandas',
    title: 'Pandas — Dados (mercado)',
    xp: 20,
    lesson: {
      title: 'Pandas para Análise de Dados',
      theory: `Pandas é a biblioteca mais usada em <strong>Data Science, Engenharia de Dados e Backend</strong> com Python. Aparece em praticamente toda vaga que envolve dados.

Estruturas principais:
• <strong>DataFrame</strong> — tabela com linhas e colunas (como SQL/Excel)
• <strong>Series</strong> — coluna única
• <strong>Operações vetorizadas</strong> — muito mais rápidas que loops`,
      examples: [
        {
          title: 'Operações essenciais com DataFrame',
          code: `import pandas as pd

# Criar DataFrame (como uma tabela SQL)
df = pd.DataFrame({
    "nome":      ["Ana",  "Bruno", "Carla", "Diego"],
    "cargo":     ["Dev",  "QA",    "Dev",   "DevOps"],
    "salario":   [8000,   5500,    9500,    7200],
    "anos_exp":  [3,      1,       5,       4]
})

# Filtrar: apenas Devs com salário > 8000
devs_senior = df[(df["cargo"] == "Dev") & (df["salario"] > 8000)]
print(devs_senior)
#    nome cargo  salario  anos_exp
# 2  Carla   Dev     9500         5

# Agrupar por cargo e calcular média salarial
media_por_cargo = df.groupby("cargo")["salario"].mean().round(2)
print(media_por_cargo)
# cargo
# Dev      8750.0
# DevOps   7200.0
# QA       5500.0

# Ordenar por salário decrescente
print(df.sort_values("salario", ascending=False).head(3))`,
          explanation: 'groupby + agg é o equivalente ao GROUP BY do SQL. Filtros com [] usam condições booleanas.'
        },
        {
          title: 'Leitura de CSV e limpeza de dados (pipeline real)',
          code: `import pandas as pd
import numpy as np

# Leitura de CSV (arquivo real de dados)
df = pd.read_csv("vendas.csv", parse_dates=["data_venda"])

print(f"Shape: {df.shape}")          # (1000, 8) — linhas x colunas
print(df.dtypes)                      # tipos de cada coluna
print(df.isnull().sum())              # quantidade de nulos por coluna

# Limpeza de dados
df = df.dropna(subset=["valor"])      # remove linhas sem valor
df["valor"] = df["valor"].fillna(0)  # preenche nulos com 0
df["cliente"] = df["cliente"].str.strip().str.upper()  # normaliza texto

# Criar coluna derivada
df["mes"] = df["data_venda"].dt.month
df["ano"] = df["data_venda"].dt.year

# Relatório de vendas por mês
relatorio = df.groupby(["ano", "mes"]).agg(
    total_vendas=("valor", "sum"),
    num_pedidos=("id", "count"),
    ticket_medio=("valor", "mean")
).round(2).reset_index()

# Exportar resultado
relatorio.to_csv("relatorio_mensal.csv", index=False)
print(relatorio.head())`,
          explanation: 'Pipeline padrão de mercado: leitura → limpeza → transformação → agregação → exportação.'
        },
        {
          title: 'Merge (JOIN) e pivot table',
          code: `import pandas as pd

# Tabela de pedidos
pedidos = pd.DataFrame({
    "id":          [1, 2, 3, 4],
    "cliente_id":  [10, 10, 20, 30],
    "produto":     ["Curso Python", "Curso Angular", "Curso Java", "Curso Python"],
    "valor":       [299, 399, 449, 299]
})

# Tabela de clientes
clientes = pd.DataFrame({
    "id":    [10, 20, 30],
    "nome":  ["Alice", "Bruno", "Carla"],
    "plano": ["Pro", "Free", "Pro"]
})

# JOIN (merge) — equivale a SQL INNER JOIN
resultado = pedidos.merge(
    clientes,
    left_on="cliente_id",
    right_on="id",
    how="inner"
)
print(resultado[["nome", "produto", "valor", "plano"]])

# Pivot table — total gasto por cliente e produto
pivot = resultado.pivot_table(
    values="valor",
    index="nome",
    columns="produto",
    aggfunc="sum",
    fill_value=0
)
print(pivot)`,
          explanation: 'merge() é o JOIN do pandas. pivot_table() cria tabelas dinâmicas como Excel — muito usado em relatórios.'
        }
      ]
    },
    quiz: [
      {
        question: 'Como filtrar linhas onde salario > 5000 E cargo == "Dev"?',
        options: [
          'df.filter(salario > 5000 and cargo == "Dev")',
          'df[(df["salario"] > 5000) & (df["cargo"] == "Dev")]',
          'df.where(df.salario > 5000 & df.cargo == "Dev")',
          'df.query(salario > 5000 AND cargo = "Dev")'
        ],
        answer: 1,
        explanation: 'Use & (AND) e | (OR) com parênteses em cada condição. df.query("salario > 5000 & cargo == \'Dev\'") também funciona.'
      },
      {
        question: 'O que df.groupby("cargo")["salario"].mean() faz?',
        options: [
          'Ordena por cargo e calcula média geral',
          'Agrupa por cargo e calcula a média salarial de cada grupo',
          'Filtra apenas o cargo e retorna salários',
          'Cria uma nova coluna com a média'
        ],
        answer: 1,
        explanation: 'Equivale a: SELECT cargo, AVG(salario) FROM df GROUP BY cargo em SQL.'
      },
      {
        question: 'Qual método remove linhas com valores nulos na coluna "valor"?',
        options: [
          'df.remove_null("valor")',
          'df.clean(subset=["valor"])',
          'df.dropna(subset=["valor"])',
          'df.fillna(subset=["valor"])'
        ],
        answer: 2,
        explanation: 'dropna(subset=[]) remove apenas linhas onde as colunas especificadas são nulas.'
      },
      {
        question: 'O equivalente do JOIN SQL no pandas é:',
        options: ['df.join_sql()', 'df.concat()', 'df.merge()', 'df.append()'],
        answer: 2,
        explanation: 'df.merge(outro, left_on="chave", right_on="chave", how="inner/left/right/outer") é o JOIN do pandas.'
      }
    ]
  },
  {
    id: 'py-solid',
    title: 'Boas Práticas (SOLID/Clean)',
    xp: 30,
    lesson: {
      title: 'Clean Code e SOLID em Python',
      theory: `Em entrevistas e no trabalho, você será cobrado por escrever código limpo e seguir os princípios <strong>SOLID</strong>.

Princípios mais cobrados:
• <strong>S</strong> — Single Responsibility (uma classe = uma responsabilidade)
• <strong>O</strong> — Open/Closed (aberto para extensão, fechado para modificação)
• <strong>D</strong> — Dependency Inversion (dependa de abstrações)

Além disso: type hints, docstrings, testes unitários.`,
      examples: [
        {
          title: 'Type hints e código legível (PEP 8)',
          code: `from dataclasses import dataclass, field
from typing import Protocol
from datetime import datetime

@dataclass
class Usuario:
    id: int
    nome: str
    email: str
    xp: int = 0
    criado_em: datetime = field(default_factory=datetime.now)

    def eh_senior(self) -> bool:
        return self.xp >= 1000

    def ganhar_xp(self, quantidade: int) -> None:
        if quantidade <= 0:
            raise ValueError(f"XP deve ser positivo, recebeu: {quantidade}")
        self.xp += quantidade

# Protocol = interface do Python (duck typing formal)
class Repositorio(Protocol):
    def salvar(self, usuario: Usuario) -> Usuario: ...
    def buscar(self, id: int) -> Usuario | None: ...
    def listar(self) -> list[Usuario]: ...

# Implementação concreta
class RepositorioMemoria:
    def __init__(self) -> None:
        self._dados: dict[int, Usuario] = {}

    def salvar(self, usuario: Usuario) -> Usuario:
        self._dados[usuario.id] = usuario
        return usuario

    def buscar(self, id: int) -> Usuario | None:
        return self._dados.get(id)

    def listar(self) -> list[Usuario]:
        return list(self._dados.values())`,
          explanation: '@dataclass elimina __init__ boilerplate. Protocol define interfaces sem herança forçada (Dependency Inversion).'
        },
        {
          title: 'Testes unitários com pytest (obrigatório em mercado)',
          code: `# test_usuario.py
import pytest
from usuario import Usuario

class TestUsuario:
    def test_criar_usuario(self):
        u = Usuario(id=1, nome="Adil", email="adil@dev.com")
        assert u.xp == 0
        assert u.eh_senior() is False

    def test_ganhar_xp(self):
        u = Usuario(id=1, nome="Adil", email="adil@dev.com", xp=950)
        u.ganhar_xp(100)
        assert u.xp == 1050
        assert u.eh_senior() is True

    def test_xp_negativo_levanta_erro(self):
        u = Usuario(id=1, nome="Adil", email="adil@dev.com")
        with pytest.raises(ValueError, match="XP deve ser positivo"):
            u.ganhar_xp(-10)

    @pytest.mark.parametrize("xp_inicial,ganho,esperado", [
        (0,   10,  10),
        (500, 500, 1000),
        (999, 1,   1000),
    ])
    def test_ganhar_xp_parametrizado(self, xp_inicial, ganho, esperado):
        u = Usuario(id=1, nome="Test", email="t@t.com", xp=xp_inicial)
        u.ganhar_xp(ganho)
        assert u.xp == esperado

# Executar: pytest test_usuario.py -v`,
          explanation: 'pytest é o padrão do mercado. @parametrize testa múltiplos cenários sem repetir código. pytest.raises testa exceções.'
        },
        {
          title: 'Dependency Injection com Service',
          code: `from abc import ABC, abstractmethod

# Abstração (interface)
class NotificadorABC(ABC):
    @abstractmethod
    def enviar(self, destinatario: str, mensagem: str) -> bool: ...

# Implementações concretas
class NotificadorEmail(NotificadorABC):
    def enviar(self, destinatario: str, mensagem: str) -> bool:
        print(f"📧 Email para {destinatario}: {mensagem}")
        return True  # Em prod: usar SMTP/SendGrid

class NotificadorSMS(NotificadorABC):
    def enviar(self, destinatario: str, mensagem: str) -> bool:
        print(f"📱 SMS para {destinatario}: {mensagem}")
        return True  # Em prod: usar Twilio

# Service recebe a abstração (não a implementação)
class ServicoUsuario:
    def __init__(self, notificador: NotificadorABC) -> None:
        self.notificador = notificador  # injetado!

    def registrar(self, nome: str, email: str) -> Usuario:
        u = Usuario(id=1, nome=nome, email=email)
        self.notificador.enviar(email, f"Bem-vindo, {nome}!")
        return u

# Troca email por SMS sem mudar ServicoUsuario
servico = ServicoUsuario(NotificadorEmail())
servico.registrar("Adil", "adil@dev.com")`,
          explanation: 'Dependency Inversion: ServicoUsuario não conhece Email nem SMS, só a interface. Fácil de testar com mock.'
        }
      ]
    },
    quiz: [
      {
        question: 'O que o princípio Single Responsibility diz?',
        options: [
          'Uma função deve ter apenas um parâmetro',
          'Uma classe deve ter apenas um método',
          'Uma classe deve ter apenas uma razão para mudar',
          'Um módulo deve ter apenas uma classe'
        ],
        answer: 2,
        explanation: 'SRP: se uma classe muda por 2 razões diferentes, ela tem 2 responsabilidades e deve ser dividida.'
      },
      {
        question: 'Qual a vantagem de Protocol vs herança direta em Python?',
        options: [
          'Protocol é mais rápido em runtime',
          'Protocol permite duck typing: qualquer classe que implemente os métodos é compatível',
          'Protocol obriga a usar super()',
          'Protocol só funciona com dataclasses'
        ],
        answer: 1,
        explanation: 'Com Protocol, não é necessário herdar explicitamente — qualquer classe com os métodos corretos satisfaz o contrato.'
      },
      {
        question: 'O que @pytest.mark.parametrize faz?',
        options: [
          'Pula o teste se o parâmetro for None',
          'Executa o mesmo teste com múltiplos conjuntos de dados',
          'Marca o teste como lento',
          'Injeta fixtures automaticamente'
        ],
        answer: 1,
        explanation: 'parametrize elimina duplicação: o mesmo teste roda para cada linha de dados que você definir.'
      },
      {
        question: 'Por que usar type hints em Python de mercado?',
        options: [
          'São obrigatórios para rodar o código',
          'Melhoram performance em 10x',
          'Documentam o código, permitem análise estática (mypy) e melhoram autocomplete',
          'Substituem os testes unitários'
        ],
        answer: 2,
        explanation: 'Type hints + mypy detectam bugs antes de rodar. Em equipes, são essenciais para manutenção.'
      }
    ]
  }
];

// Mescla com os tópicos existentes
if (window.PYTHON_DATA) {
  window.PYTHON_DATA.topics = window.PYTHON_DATA.topics.concat(window.PYTHON_EXTRA);
}
