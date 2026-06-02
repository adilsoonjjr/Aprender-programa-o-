// python-testes.js — Testes, TDD, Docker e FastAPI Avançado
window.PYTHON_TESTES = [
  {
    id: 'py-pytest',
    title: 'pytest — Testes Profissionais',
    xp: 30,
    lesson: {
      title: 'pytest — O Framework de Testes Padrão do Mercado',
      theory: `pytest é o framework de testes padrão do ecossistema Python. Mais poderoso que unittest com muito menos boilerplate.

<strong>Todo projeto Python profissional tem testes</strong> — é cobrado em entrevistas e exigido em code reviews.

Conceitos essenciais:
• <strong>test functions</strong> — funções que começam com <code>test_</code>
• <strong>fixtures</strong> — setup/teardown reutilizável com <code>@pytest.fixture</code>
• <strong>parametrize</strong> — rodar o mesmo teste com múltiplos inputs
• <strong>markers</strong> — categorizar testes (<code>@pytest.mark.slow</code>, <code>@pytest.mark.integration</code>)
• <strong>conftest.py</strong> — fixtures compartilhadas entre arquivos de teste
• <strong>plugins</strong> — pytest-cov, pytest-mock, pytest-asyncio, pytest-xdist

Por que pytest venceu o unittest:
• assert simples em vez de self.assertEqual()
• Fixtures composíveis em vez de setUp/tearDown
• Saída de erro mais legível
• Ecossistema de plugins gigantesco`,
      examples: [
        {
          title: 'Fundamentos do pytest — asserts, fixtures e conftest',
          code: `# ── Estrutura do projeto ──────────────────────────────────
# meu_projeto/
# ├── app/
# │   ├── __init__.py
# │   └── services.py
# └── tests/
#     ├── conftest.py          ← fixtures compartilhadas
#     ├── test_services.py
#     └── test_integration.py

# ── app/services.py ───────────────────────────────────────
class UserService:
    def __init__(self, db):
        self.db = db

    def create_user(self, name: str, email: str) -> dict:
        if not email or "@" not in email:
            raise ValueError("Email inválido")
        user = {"id": self.db.next_id(), "name": name, "email": email}
        self.db.save(user)
        return user

    def get_user(self, user_id: int) -> dict | None:
        return self.db.find_by_id(user_id)

# ── tests/conftest.py ─────────────────────────────────────
import pytest
from app.services import UserService

class FakeDB:
    """Banco em memória para testes — sem tocar banco real"""
    def __init__(self):
        self._store = {}
        self._seq   = 0

    def next_id(self) -> int:
        self._seq += 1
        return self._seq

    def save(self, obj: dict):
        self._store[obj["id"]] = obj

    def find_by_id(self, id: int) -> dict | None:
        return self._store.get(id)

@pytest.fixture                        # scope padrão = 'function'
def db():
    """Banco limpo a cada teste — total isolamento"""
    return FakeDB()

@pytest.fixture
def user_service(db):
    """Injeta o FakeDB no serviço automaticamente"""
    return UserService(db)

@pytest.fixture(scope="module")
def shared_config():
    """Criado UMA vez por módulo — útil para configs pesadas"""
    return {"base_url": "http://localhost:8000", "timeout": 30}

@pytest.fixture(scope="session")
def heavy_resource():
    """Criado UMA vez por sessão inteira de testes"""
    resource = create_expensive_connection()
    yield resource                     # yield = teardown depois do yield
    resource.close()                   # cleanup após todos os testes

# ── tests/test_services.py ───────────────────────────────
import pytest

def test_create_user_success(user_service):
    """pytest injeta a fixture user_service automaticamente pelo nome"""
    user = user_service.create_user("Alice", "alice@example.com")

    # assert simples — sem assertEqual, assertTrue, etc.
    assert user["id"] == 1
    assert user["name"] == "Alice"
    assert user["email"] == "alice@example.com"

def test_create_user_email_invalido(user_service):
    """Testa que exceção é levantada para email inválido"""
    with pytest.raises(ValueError, match="Email inválido"):
        user_service.create_user("Bob", "email-sem-arroba")

def test_create_user_email_vazio(user_service):
    with pytest.raises(ValueError):
        user_service.create_user("Carol", "")

def test_get_user_existente(user_service):
    user = user_service.create_user("Dave", "dave@test.com")
    encontrado = user_service.get_user(user["id"])
    assert encontrado == user

def test_get_user_inexistente(user_service):
    assert user_service.get_user(9999) is None

def test_ids_sao_unicos(user_service):
    u1 = user_service.create_user("A", "a@test.com")
    u2 = user_service.create_user("B", "b@test.com")
    assert u1["id"] != u2["id"]

# Rodar: pytest tests/ -v
# Saída:
# tests/test_services.py::test_create_user_success PASSED
# tests/test_services.py::test_create_user_email_invalido PASSED
# ... (todos verdes)`,
          explanation: 'A chave do pytest é que fixtures são injetadas pelo nome do parâmetro. scope="function" (padrão) recria a fixture a cada teste — isolamento total. scope="module" e scope="session" economizam tempo para recursos caros. yield nas fixtures permite cleanup garantido (como finally).'
        },
        {
          title: '@pytest.mark.parametrize — testar múltiplos casos sem repetição',
          code: `# ── app/validators.py ────────────────────────────────────
import re

def validar_email(email: str) -> bool:
    padrao = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(padrao, email))

def validar_cpf(cpf: str) -> bool:
    """Valida CPF com dígitos verificadores"""
    numeros = re.sub(r'\\D', '', cpf)
    if len(numeros) != 11 or len(set(numeros)) == 1:
        return False
    for j in range(9, 11):
        soma = sum(int(numeros[i]) * (j + 1 - i) for i in range(j))
        digito = (soma * 10 % 11) % 10
        if digito != int(numeros[j]):
            return False
    return True

def validar_senha(senha: str) -> dict:
    return {
        "comprimento": len(senha) >= 8,
        "maiuscula":   any(c.isupper() for c in senha),
        "minuscula":   any(c.islower() for c in senha),
        "numero":      any(c.isdigit() for c in senha),
        "especial":    any(c in "!@#$%^&*" for c in senha),
    }

# ── tests/test_validators.py ──────────────────────────────
import pytest
from app.validators import validar_email, validar_cpf, validar_senha

# ── básico: uma lista de (input, esperado) ─────────────────
@pytest.mark.parametrize("email,esperado", [
    ("user@example.com",  True),
    ("nome.sobrenome@empresa.com.br", True),
    ("user+tag@gmail.com", True),
    ("sem-arroba.com",    False),
    ("@semdominio.com",   False),
    ("espacos @test.com", False),
    ("",                  False),
    ("a@b.c",             True),   # domínio mínimo válido
])
def test_validar_email(email, esperado):
    assert validar_email(email) == esperado
# Substitui 8 funções test_email_valido_1, test_email_valido_2...

# ── ids para legibilidade nos relatórios ──────────────────
@pytest.mark.parametrize("cpf,esperado", [
    ("529.982.247-25", True),
    ("111.111.111-11", False),   # todos iguais — inválido
    ("000.000.000-00", False),
    ("123.456.789-09", False),   # dígitos errados
    ("não-é-cpf",      False),
], ids=["cpf_valido", "todos_iguais", "todos_zeros", "digitos_errados", "texto"])
def test_validar_cpf(cpf, esperado):
    """IDs aparecem no relatório: test_validar_cpf[cpf_valido] PASSED"""
    assert validar_cpf(cpf) == esperado

# ── múltiplos parâmetros ──────────────────────────────────
@pytest.mark.parametrize("senha,campo,esperado", [
    ("Senha@123",  "comprimento", True),
    ("abc",        "comprimento", False),
    ("SEMMINUSCULA1!", "minuscula", False),
    ("semMaiuscula1!", "maiuscula", False),
    ("SemNumero!",  "numero",     False),
    ("SemEspecial1", "especial",  False),
    ("Completa@1",  "especial",   True),
])
def test_validar_senha(senha, campo, esperado):
    resultado = validar_senha(senha)
    assert resultado[campo] == esperado

# ── parametrize + fixture (indirect) ──────────────────────
@pytest.fixture
def usuario_db(request):
    """Cria usuários com diferentes roles no banco fake"""
    roles = {"admin": {"id": 1, "role": "admin"}, "user": {"id": 2, "role": "user"}}
    return roles[request.param]

@pytest.mark.parametrize("usuario_db,pode_deletar", [
    ("admin", True),
    ("user",  False),
], indirect=["usuario_db"])
def test_permissao_delecao(usuario_db, pode_deletar):
    result = usuario_db["role"] == "admin"
    assert result == pode_deletar

# Rodar apenas os testes de email:  pytest -k "test_validar_email" -v
# Rodar com IDs específicos:        pytest -k "cpf_valido or todos_zeros" -v`,
          explanation: 'parametrize elimina duplicação drástica. Sem ele, você teria 8 funções test_email_* idênticas. ids= torna o relatório legível (test_validar_cpf[cpf_valido] vs test_validar_cpf[0]). indirect= permite que o fixture processe o parâmetro antes de entregá-lo ao teste — poderoso para criar objetos complexos com base no parâmetro.'
        },
        {
          title: 'Mocking com unittest.mock e pytest-mock — isolar dependências',
          code: `# pip install pytest-mock requests

# ── app/email_service.py ──────────────────────────────────
import smtplib
import requests
from email.mime.text import MIMEText

class EmailService:
    def __init__(self, smtp_host: str, smtp_port: int):
        self.smtp_host = smtp_host
        self.smtp_port = smtp_port

    def enviar_boas_vindas(self, destinatario: str, nome: str) -> bool:
        msg = MIMEText(f"Olá {nome}, bem-vindo!")
        msg["Subject"] = "Bem-vindo!"
        msg["From"]    = "noreply@app.com"
        msg["To"]      = destinatario
        with smtplib.SMTP(self.smtp_host, self.smtp_port) as smtp:
            smtp.sendmail("noreply@app.com", destinatario, msg.as_string())
        return True

class GithubService:
    BASE_URL = "https://api.github.com"

    def buscar_repos(self, usuario: str) -> list[dict]:
        resp = requests.get(f"{self.BASE_URL}/users/{usuario}/repos")
        resp.raise_for_status()
        return resp.json()

    def repo_existe(self, usuario: str, repo: str) -> bool:
        resp = requests.get(f"{self.BASE_URL}/repos/{usuario}/{repo}")
        return resp.status_code == 200

# ── tests/test_mocks.py ───────────────────────────────────
import pytest
from unittest.mock import patch, MagicMock, call
from app.email_service import EmailService, GithubService

# ── FORMA 1: patch como decorator ─────────────────────────
@patch("app.email_service.smtplib.SMTP")
def test_enviar_email_sucesso(mock_smtp_class):
    """smtplib.SMTP é substituído por um MagicMock"""
    mock_smtp = MagicMock()
    mock_smtp_class.return_value.__enter__.return_value = mock_smtp

    service = EmailService("smtp.test.com", 587)
    resultado = service.enviar_boas_vindas("user@test.com", "Alice")

    assert resultado is True
    mock_smtp.sendmail.assert_called_once_with(
        "noreply@app.com", "user@test.com",
        mock_smtp.sendmail.call_args[0][2]  # o conteúdo do email
    )

# ── FORMA 2: patch como context manager ───────────────────
def test_buscar_repos_github():
    repos_fake = [{"name": "projeto-a"}, {"name": "projeto-b"}]

    with patch("app.email_service.requests.get") as mock_get:
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = repos_fake
        mock_get.return_value.raise_for_status = MagicMock()

        service = GithubService()
        repos = service.buscar_repos("octocat")

        assert repos == repos_fake
        mock_get.assert_called_once_with(
            "https://api.github.com/users/octocat/repos"
        )

# ── FORMA 3: side_effect para simular exceções ────────────
def test_buscar_repos_falha_rede():
    with patch("app.email_service.requests.get") as mock_get:
        mock_get.side_effect = requests.exceptions.ConnectionError("Sem rede")

        service = GithubService()
        with pytest.raises(requests.exceptions.ConnectionError):
            service.buscar_repos("octocat")

def test_repos_diferentes_status():
    """side_effect como lista: cada chamada retorna um valor diferente"""
    respostas = [
        MagicMock(status_code=200),
        MagicMock(status_code=404),
        MagicMock(status_code=500),
    ]
    with patch("app.email_service.requests.get", side_effect=respostas):
        service = GithubService()
        assert service.repo_existe("user", "repo-existe") is True
        assert service.repo_existe("user", "repo-404")    is False
        assert service.repo_existe("user", "repo-500")    is False

# ── FORMA 4: pytest-mock (mocker fixture) — mais limpo ────
def test_buscar_repos_mocker(mocker):
    """mocker é uma fixture do pytest-mock — sem context manager"""
    mock_get = mocker.patch("app.email_service.requests.get")
    mock_get.return_value.json.return_value = [{"name": "repo-1"}]
    mock_get.return_value.raise_for_status = MagicMock()

    service = GithubService()
    repos = service.buscar_repos("dev")

    assert len(repos) == 1
    assert repos[0]["name"] == "repo-1"

    # Verificar chamadas
    mock_get.assert_called_once()
    mock_get.assert_called_with("https://api.github.com/users/dev/repos")

def test_email_chamado_multiplas_vezes(mocker):
    mock_smtp = mocker.patch("app.email_service.smtplib.SMTP")
    mock_instance = mock_smtp.return_value.__enter__.return_value

    service = EmailService("smtp.test.com", 587)
    service.enviar_boas_vindas("a@test.com", "Alice")
    service.enviar_boas_vindas("b@test.com", "Bob")

    assert mock_instance.sendmail.call_count == 2
    calls = mock_instance.sendmail.call_args_list
    assert calls[0][0][1] == "a@test.com"
    assert calls[1][0][1] == "b@test.com"`,
          explanation: 'Mockear dependências externas (SMTP, HTTP, banco) é essencial para testes rápidos e confiáveis. patch() intercepta o import no módulo que usa o recurso (não onde ele é definido) — por isso "app.email_service.requests.get" e não "requests.get". side_effect acepta exceção (levanta), lista (retorna um por vez) ou função callable. pytest-mock (mocker) é mais limpo: o patch é desfeito automaticamente após cada teste, sem precisar de with ou decorator.'
        }
      ]
    },
    quiz: [
      {
        q: 'Qual a principal diferença prática entre pytest e unittest?',
        options: [
          'pytest é mais lento que unittest',
          'pytest usa assert simples; unittest exige métodos como assertEqual e assertTrue',
          'unittest suporta fixtures, pytest não',
          'pytest só funciona com Python 3.10+'
        ],
        answer: 1,
        explanation: 'Com pytest você escreve assert resultado == esperado. Com unittest: self.assertEqual(resultado, esperado). pytest intercepta o assert e gera mensagens de erro detalhadas. Menos boilerplate, mesma (ou mais) capacidade.'
      },
      {
        q: 'Qual o efeito de scope="session" em uma fixture do pytest?',
        options: [
          'A fixture é recriada a cada função de teste',
          'A fixture é recriada a cada arquivo de teste',
          'A fixture é criada uma única vez para toda a execução do pytest',
          'A fixture é compartilhada apenas dentro de uma classe de teste'
        ],
        answer: 2,
        explanation: 'scope="session" cria a fixture uma vez e reutiliza em todos os testes da sessão. Útil para conexões de banco caras ou serviços externos. scope="function" (padrão) isola cada teste. scope="module" uma vez por arquivo.'
      },
      {
        q: 'Para que serve o conftest.py no pytest?',
        options: [
          'Configurar o Python path do projeto',
          'Definir fixtures compartilhadas entre múltiplos arquivos de teste sem importação manual',
          'Gerar relatório HTML dos testes',
          'Desabilitar avisos do pytest'
        ],
        answer: 1,
        explanation: 'O pytest descobre fixtures no conftest.py automaticamente. Fixtures definidas ali ficam disponíveis para todos os arquivos de teste no mesmo diretório e subdiretórios — sem precisar importar explicitamente.'
      },
      {
        q: 'Quando é apropriado usar Mock em vez de um objeto real?',
        options: [
          'Sempre — mocks são mais rápidos que objetos reais',
          'Apenas quando o código tem bugs',
          'Para isolar dependências externas (APIs, banco de dados, email, sistema de arquivos) em testes unitários',
          'Apenas em testes de integração'
        ],
        answer: 2,
        explanation: 'Mocks isolam a unidade sob teste de suas dependências. Testes unitários devem ser rápidos, determinísticos e não depender de rede/banco/serviços externos. Use mocks para isso. Testes de integração usam as dependências reais (ou versões de teste delas).'
      },
      {
        q: 'O que @pytest.mark.parametrize resolve?',
        options: [
          'Executa testes em paralelo',
          'Elimina funções de teste repetidas ao rodar o mesmo teste com múltiplos conjuntos de dados',
          'Marca testes para serem ignorados',
          'Gera documentação automática dos testes'
        ],
        answer: 1,
        explanation: 'Sem parametrize você escreveria test_email_valido_1, test_email_valido_2... Com parametrize, uma única função test_validar_email roda para cada par (input, esperado) que você definir. O pytest reporta cada caso separadamente.'
      }
    ]
  },

  {
    id: 'py-tdd',
    title: 'TDD e Qualidade de Código',
    xp: 30,
    lesson: {
      title: 'TDD — Test-Driven Development e Qualidade',
      theory: `TDD é a prática de escrever o teste <strong>antes</strong> do código de produção.

<strong>Ciclo Red-Green-Refactor:</strong>
1. <strong>Red</strong> — escreve um teste que falha (o código ainda não existe)
2. <strong>Green</strong> — escreve o código mínimo para o teste passar
3. <strong>Refactor</strong> — melhora o código sem quebrar os testes

<strong>Pirâmide de testes:</strong>
• <strong>Unit tests</strong> — rápidos, isolados, sem dependências externas (base da pirâmide)
• <strong>Integration tests</strong> — testam componentes juntos (banco real, APIs)
• <strong>E2E tests</strong> — testam o fluxo completo do usuário (topo, lentos)

<strong>Cobertura de código (coverage):</strong>
• 80%+ é o mínimo aceitável em projetos sérios
• 100% não garante ausência de bugs — testa os comportamentos, não apenas as linhas

<strong>Property-based testing (Hypothesis):</strong>
• Em vez de exemplos manuais, o Hypothesis gera centenas de inputs aleatórios
• Encontra edge cases que você jamais pensaria`,
      examples: [
        {
          title: 'Ciclo Red-Green-Refactor — TDD na prática com ShoppingCart',
          code: `# ══════════════════════════════════════════════════════════
# TDD: construindo ShoppingCart do zero, um teste por vez
# ══════════════════════════════════════════════════════════

# ── ITERAÇÃO 1: RED ───────────────────────────────────────
# Escrevemos o teste PRIMEIRO. Ele FALHA porque a classe não existe.

# tests/test_cart.py
def test_carrinho_vazio_tem_total_zero():
    cart = ShoppingCart()          # NameError: ShoppingCart não existe
    assert cart.total() == 0.0

# ── ITERAÇÃO 1: GREEN ─────────────────────────────────────
# Código MÍNIMO para passar — nada mais.

# app/cart.py
class ShoppingCart:
    def total(self):
        return 0.0

# pytest tests/test_cart.py ✓ PASSED

# ── ITERAÇÃO 2: RED ───────────────────────────────────────
def test_adicionar_item_atualiza_total():
    cart = ShoppingCart()
    cart.add_item("Camiseta", price=49.90, qty=2)
    assert cart.total() == 99.80   # FALHA: total() sempre retorna 0.0

# ── ITERAÇÃO 2: GREEN ─────────────────────────────────────
class ShoppingCart:
    def __init__(self):
        self._items = []

    def add_item(self, name: str, price: float, qty: int = 1):
        self._items.append({"name": name, "price": price, "qty": qty})

    def total(self) -> float:
        return sum(item["price"] * item["qty"] for item in self._items)

# pytest tests/test_cart.py ✓✓ 2 PASSED

# ── ITERAÇÃO 3: RED ───────────────────────────────────────
def test_remover_item():
    cart = ShoppingCart()
    cart.add_item("Camiseta", price=49.90)
    cart.add_item("Calça",    price=89.90)
    cart.remove_item("Camiseta")
    assert cart.total() == pytest.approx(89.90)  # approx para float

# ── ITERAÇÃO 3: GREEN ─────────────────────────────────────
    def remove_item(self, name: str):
        self._items = [i for i in self._items if i["name"] != name]

# ── ITERAÇÃO 4: RED ───────────────────────────────────────
def test_desconto_percentual():
    cart = ShoppingCart()
    cart.add_item("Notebook", price=3000.00)
    cart.apply_discount(10)   # 10% de desconto
    assert cart.total() == pytest.approx(2700.00)

def test_desconto_invalido_levanta_excecao():
    cart = ShoppingCart()
    with pytest.raises(ValueError, match="Desconto deve ser entre 0 e 100"):
        cart.apply_discount(150)

# ── ITERAÇÃO 4: GREEN ─────────────────────────────────────
    def apply_discount(self, percent: float):
        if not 0 <= percent <= 100:
            raise ValueError("Desconto deve ser entre 0 e 100")
        self._discount = percent

    def total(self) -> float:
        subtotal = sum(item["price"] * item["qty"] for item in self._items)
        return subtotal * (1 - self._discount / 100)

# ── ITERAÇÃO 5: REFACTOR ──────────────────────────────────
# Código está funcionando. Agora melhoramos sem quebrar testes.
from dataclasses import dataclass, field
from decimal import Decimal

@dataclass
class CartItem:
    name:  str
    price: Decimal
    qty:   int = 1

    @property
    def subtotal(self) -> Decimal:
        return self.price * self.qty

class ShoppingCart:
    def __init__(self):
        self._items:    list[CartItem] = []
        self._discount: Decimal        = Decimal("0")

    def add_item(self, name: str, price: float, qty: int = 1):
        self._items.append(CartItem(name, Decimal(str(price)), qty))

    def remove_item(self, name: str):
        self._items = [i for i in self._items if i.name != name]

    def apply_discount(self, percent: float):
        if not 0 <= percent <= 100:
            raise ValueError("Desconto deve ser entre 0 e 100")
        self._discount = Decimal(str(percent))

    def total(self) -> float:
        subtotal = sum(item.subtotal for item in self._items)
        return float(subtotal * (1 - self._discount / 100))

# pytest tests/test_cart.py ✓✓✓✓✓ 5 PASSED — refactor não quebrou nada!`,
          explanation: 'TDD força você a pensar na interface antes da implementação. O resultado é código mais testável e com menos acoplamento. Decimal evita erros de ponto flutuante em valores monetários (0.1 + 0.2 != 0.3 com float). pytest.approx() é essencial para comparar floats com tolerância.'
        },
        {
          title: 'Cobertura de código com pytest-cov',
          code: `# pip install pytest-cov

# ── Rodar com cobertura ───────────────────────────────────
# pytest --cov=app --cov-report=term-missing tests/
# pytest --cov=app --cov-report=html tests/          → gera htmlcov/index.html
# pytest --cov=app --cov-report=term-missing --cov-branch tests/

# ── Saída típica no terminal ──────────────────────────────
# Name                    Stmts   Miss Branch BrPart  Cover   Missing
# -----------------------------------------------------------------------
# app/__init__.py             0      0      0      0   100%
# app/cart.py                28      3      6      2    87%   45-47, 52
# app/validators.py          19      0      4      0   100%
# -----------------------------------------------------------------------
# TOTAL                      47      3     10      2    92%

# ── .coveragerc — configuração ───────────────────────────
# [coverage:run]
# source = app
# branch = True
# omit =
#     app/migrations/*
#     app/settings.py
#     */tests/*
#
# [coverage:report]
# fail_under = 80          ← CI falha se coverage < 80%
# show_missing = True
# exclude_lines =
#     pragma: no cover
#     if __name__ == .__main__.:
#     raise NotImplementedError
#     \\.\\.\\.

# ── Ignorar linhas triviais ───────────────────────────────
# app/cart.py
class ShoppingCart:
    def __str__(self):          # pragma: no cover
        return f"Cart({len(self._items)} items)"

    def debug_dump(self):       # pragma: no cover
        """Apenas para desenvolvimento"""
        for item in self._items:
            print(f"  {item.name}: R${item.subtotal:.2f}")

# ── O que cobertura NÃO garante ───────────────────────────
# Linha executada ≠ comportamento correto testado!

def calcular_frete(peso_kg: float) -> float:
    if peso_kg <= 5:
        return 15.90
    return 25.90

# Teste com 100% de cobertura de linha:
def test_frete():
    assert calcular_frete(3.0) == 15.90
    assert calcular_frete(10.0) == 25.90

# Mas este caso não foi testado (boundary condition):
# calcular_frete(5.0)  → o limite exato é correto?
# calcular_frete(5.1)  → primeiro caso da segunda faixa?

# ── Branch coverage detecta isso ──────────────────────────
# Com --cov-branch, o pytest verifica se AMBOS os lados
# de cada if/else foram exercitados.

# ── pytest.ini ou pyproject.toml ─────────────────────────
# [tool.pytest.ini_options]
# addopts = "--cov=app --cov-report=term-missing --cov-fail-under=80"
# testpaths = ["tests"]

# ── Integração com CI (GitHub Actions) ───────────────────
# - name: Run tests with coverage
#   run: pytest --cov=app --cov-report=xml
# - name: Upload to Codecov
#   uses: codecov/codecov-action@v3`,
          explanation: 'Branch coverage é mais honesto que line coverage — detecta condições não testadas. fail_under no .coveragerc faz o CI falhar automaticamente se a cobertura cair. pragma: no cover evita que código de debug/boilerplate influe nos números. Em projetos reais, 80% de cobertura com testes significativos é melhor que 100% com testes vazios (assert True).'
        },
        {
          title: 'Testes de integração — testando banco de dados real',
          code: `# pip install pytest sqlalchemy pytest-postgresql

# ── app/models.py ─────────────────────────────────────────
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import DeclarativeBase, Session

class Base(DeclarativeBase):
    pass

class Product(Base):
    __tablename__ = "products"
    id    = Column(Integer, primary_key=True, autoincrement=True)
    name  = Column(String(100), nullable=False, unique=True)
    price = Column(Float, nullable=False)
    stock = Column(Integer, default=0)

# ── app/repository.py ─────────────────────────────────────
from sqlalchemy.orm import Session
from app.models import Product

class ProductRepository:
    def __init__(self, session: Session):
        self.session = session

    def save(self, product: Product) -> Product:
        self.session.add(product)
        self.session.flush()  # persiste sem commit — gera o ID
        return product

    def find_by_id(self, id: int) -> Product | None:
        return self.session.get(Product, id)

    def find_by_name(self, name: str) -> Product | None:
        return self.session.query(Product).filter_by(name=name).first()

    def find_in_stock(self) -> list[Product]:
        return self.session.query(Product).filter(Product.stock > 0).all()

    def update_stock(self, product_id: int, delta: int) -> Product:
        product = self.find_by_id(product_id)
        if not product:
            raise ValueError(f"Product {product_id} not found")
        if product.stock + delta < 0:
            raise ValueError("Estoque insuficiente")
        product.stock += delta
        return product

# ── tests/conftest.py — fixtures de banco ─────────────────
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import Base

@pytest.fixture(scope="session")
def engine():
    """SQLite em memória — criado uma vez por sessão"""
    engine = create_engine("sqlite:///:memory:", echo=False)
    Base.metadata.create_all(engine)
    yield engine
    Base.metadata.drop_all(engine)

@pytest.fixture
def session(engine):
    """
    Cada teste recebe uma sessão com rollback automático.
    O banco nunca fica "sujo" entre testes.
    """
    connection = engine.connect()
    transaction = connection.begin()
    Session = sessionmaker(bind=connection)
    sess = Session()

    yield sess

    sess.close()
    transaction.rollback()   # ← desfaz TUDO que o teste fez
    connection.close()

@pytest.fixture
def product_repo(session):
    from app.repository import ProductRepository
    return ProductRepository(session)

# ── tests/test_product_repository.py ─────────────────────
import pytest
from app.models import Product

def test_save_and_find_by_id(product_repo, session):
    """Testa persistência real no SQLite"""
    product = Product(name="Notebook", price=3999.90, stock=10)
    saved = product_repo.save(product)

    assert saved.id is not None          # ID gerado pelo banco
    found = product_repo.find_by_id(saved.id)
    assert found.name == "Notebook"
    assert found.price == pytest.approx(3999.90)

def test_find_by_name_inexistente(product_repo):
    result = product_repo.find_by_name("Produto que não existe")
    assert result is None

def test_find_in_stock_filtra_sem_estoque(product_repo):
    product_repo.save(Product(name="Com estoque",  price=100.0, stock=5))
    product_repo.save(Product(name="Sem estoque",  price=200.0, stock=0))
    product_repo.save(Product(name="Com estoque 2",price=300.0, stock=1))

    em_estoque = product_repo.find_in_stock()
    nomes = [p.name for p in em_estoque]

    assert len(em_estoque) == 2
    assert "Com estoque"   in nomes
    assert "Sem estoque" not in nomes

def test_update_stock_incrementa(product_repo):
    p = product_repo.save(Product(name="Mouse", price=89.90, stock=3))
    atualizado = product_repo.update_stock(p.id, delta=5)
    assert atualizado.stock == 8

def test_update_stock_estoque_insuficiente(product_repo):
    p = product_repo.save(Product(name="Teclado", price=199.90, stock=2))
    with pytest.raises(ValueError, match="Estoque insuficiente"):
        product_repo.update_stock(p.id, delta=-10)

def test_rollback_entre_testes(product_repo):
    """Garante que os dados do teste anterior não vazaram"""
    # Se rollback funciona, o banco está vazio aqui
    resultado = product_repo.find_by_name("Notebook")
    assert resultado is None  # Notebook do test_save não persiste`,
          explanation: 'A chave é o rollback na fixture de session — cada teste roda dentro de uma transação que é desfeita no teardown. Isso é muito mais rápido que recriar o banco. SQLite em memória torna os testes de integração rápidos (ms). Para PostgreSQL real em CI, use pytest-postgresql que gerencia uma instância temporária.'
        }
      ]
    },
    quiz: [
      {
        q: 'No ciclo TDD, qual é a ordem correta?',
        options: [
          'Green → Red → Refactor',
          'Refactor → Red → Green',
          'Red → Green → Refactor',
          'Red → Refactor → Green'
        ],
        answer: 2,
        explanation: 'Red: escreve teste que falha. Green: escreve código mínimo para passar. Refactor: melhora o código sem quebrar os testes. O ciclo se repete para cada nova funcionalidade.'
      },
      {
        q: 'O que é "cobertura de branch" (branch coverage)?',
        options: [
          'Mede quantos arquivos foram testados',
          'Verifica se ambos os lados de cada condição if/else foram exercitados nos testes',
          'Conta quantas branches do git têm testes',
          'Mede o tempo de execução de cada teste'
        ],
        answer: 1,
        explanation: 'Line coverage apenas verifica se a linha foi executada. Branch coverage verifica se o if e o else (ou o caminho verdadeiro e falso de cada condição) foram ambos testados — detecta condições limítrofes não testadas.'
      },
      {
        q: 'Por que usar SQLite em memória para testes de integração?',
        options: [
          'SQLite é mais parecido com PostgreSQL de produção',
          'É mais rápido: sem I/O de disco, banco descartado ao fechar conexão',
          'SQLite suporta mais tipos de dados que PostgreSQL',
          'É o único banco compatível com SQLAlchemy'
        ],
        answer: 1,
        explanation: 'SQLite :memory: é criado e destruído em memória RAM — extremamente rápido. Ideal para testes unitários e de integração rápidos. Para garantir compatibilidade com PostgreSQL de produção, adicione testes de integração com banco real em CI (pytest-postgresql).'
      },
      {
        q: 'Qual a diferença entre testes unitários e de integração?',
        options: [
          'Testes unitários testam Python, testes de integração testam JavaScript',
          'Testes unitários isolam uma unidade com mocks; de integração testam componentes reais interagindo',
          'Testes de integração são mais rápidos que unitários',
          'Não há diferença prática — são sinônimos'
        ],
        answer: 1,
        explanation: 'Testes unitários isolam a unidade sob teste usando mocks para dependências (banco, API, email). São rápidos e determinísticos. Testes de integração usam os componentes reais juntos (banco real, HTTP real) — mais lentos mas testam que a integração funciona de verdade.'
      },
      {
        q: 'O que o Hypothesis oferece que os testes manuais não oferecem?',
        options: [
          'Testes mais lentos mas mais precisos',
          'Geração automática de centenas de inputs aleatórios para encontrar edge cases que você não pensou',
          'Integração com banco de dados automática',
          'Geração automática de código de produção'
        ],
        answer: 1,
        explanation: 'Property-based testing (Hypothesis) gera inputs aleatórios baseados em estratégias que você define. Em vez de test_soma(1, 2) == 3, você testa propriedades: para qualquer a, b: soma(a, b) == soma(b, a). O Hypothesis encontra contraexemplos que quebram essas propriedades — incluindo edge cases como 0, -1, strings vazias, None.'
      }
    ]
  },

  {
    id: 'py-docker',
    title: 'Docker para Python',
    xp: 30,
    lesson: {
      title: 'Docker — Empacote sua Aplicação Python',
      theory: `Docker empacota sua aplicação Python com <strong>todas as dependências</strong> em um container que roda igual em qualquer ambiente.

<strong>Por que Docker é essencial?</strong>
• Elimina "funciona na minha máquina" — o container é idêntico em dev, staging e produção
• Deploy simples para qualquer cloud (AWS ECS/EKS, GCP Cloud Run, Azure Container Apps)
• Microserviços: cada serviço em seu próprio container
• CI/CD: builds reproduzíveis

<strong>Conceitos fundamentais:</strong>
• <strong>Dockerfile</strong> — receita para construir a imagem
• <strong>Imagem</strong> — snapshot imutável do container
• <strong>Container</strong> — instância rodando de uma imagem
• <strong>docker-compose</strong> — orquestrar múltiplos containers localmente
• <strong>Volume</strong> — persistir dados fora do container
• <strong>Network</strong> — comunicação entre containers

<strong>Comandos essenciais:</strong>
<code>docker build -t minha-app .</code>
<code>docker run -p 8000:8000 minha-app</code>
<code>docker-compose up -d</code>
<code>docker-compose logs -f api</code>`,
      examples: [
        {
          title: 'Dockerfile para API Python — FastAPI com multi-stage build',
          code: `# ── Dockerfile ────────────────────────────────────────────
# Multi-stage: estágio de build separado do runtime
# Resultado: imagem final ~150MB em vez de ~1GB

# ════ ESTÁGIO 1: builder ══════════════════════════════════
FROM python:3.12-slim AS builder

# Variáveis de ambiente para Python
ENV PYTHONDONTWRITEBYTECODE=1 \\
    PYTHONUNBUFFERED=1 \\
    PIP_NO_CACHE_DIR=1 \\
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /build

# COPIAR requirements PRIMEIRO — aproveita cache de camada
# Se requirements.txt não mudou, esta camada é reutilizada
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \\
    pip install --no-cache-dir -r requirements.txt --target=/build/deps

# ════ ESTÁGIO 2: runtime ══════════════════════════════════
FROM python:3.12-slim AS runtime

ENV PYTHONDONTWRITEBYTECODE=1 \\
    PYTHONUNBUFFERED=1 \\
    PYTHONPATH=/app/deps

WORKDIR /app

# Copiar dependências já instaladas do builder
COPY --from=builder /build/deps ./deps

# Copiar código da aplicação
COPY ./app ./app

# ── Segurança: rodar como usuário não-root ─────────────────
RUN addgroup --system appgroup && \\
    adduser  --system --ingroup appgroup appuser && \\
    chown -R appuser:appgroup /app

USER appuser

# Expor porta (documentação — não publica automaticamente)
EXPOSE 8000

# Healthcheck para Docker e orquestradores (k8s, ECS)
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\
    CMD python -c "import requests; requests.get('http://localhost:8000/health')"

# Comando de inicialização
CMD ["python", "-m", "uvicorn", "app.main:app", \\
     "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]

# ── .dockerignore (fundamental para build rápido) ─────────
# .git
# .gitignore
# .env
# .env.*
# __pycache__
# *.pyc
# *.pyo
# .pytest_cache
# .coverage
# htmlcov/
# venv/
# .venv/
# tests/
# *.md
# docker-compose*.yml

# ── Comandos Docker ────────────────────────────────────────
# docker build -t minha-api:latest .
# docker build -t minha-api:latest --no-cache .   # forçar rebuild
# docker run -d -p 8000:8000 --name api minha-api:latest
# docker logs -f api
# docker exec -it api /bin/sh    # entrar no container rodando
# docker stop api && docker rm api

# ── app/main.py ───────────────────────────────────────────
from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI(title="Minha API", version="1.0.0")

@app.get("/health")
async def health():
    return JSONResponse({"status": "ok", "version": "1.0.0"})

@app.get("/")
async def root():
    return {"message": "API rodando em container Docker!"}`,
          explanation: 'Multi-stage build é fundamental: o estágio builder instala compiladores e ferramentas de build, o estágio runtime copia apenas os artefatos necessários. Isso reduz drasticamente o tamanho da imagem. Copiar requirements.txt antes do código aproveita o cache de camadas — se o código mudou mas as dependências não, o pip install não roda novamente. USER não-root é obrigatório em produção por segurança.'
        },
        {
          title: 'docker-compose — API + PostgreSQL + Redis juntos',
          code: `# ── docker-compose.yml ────────────────────────────────────
version: "3.9"

services:
  # ── API FastAPI ────────────────────────────────────────
  api:
    build:
      context: .
      dockerfile: Dockerfile
      target: runtime
    container_name: minha_api
    ports:
      - "8000:8000"
    env_file:
      - .env                         # variáveis de ambiente do arquivo .env
    environment:
      - DATABASE_URL=postgresql+asyncpg://\${POSTGRES_USER}:\${POSTGRES_PASSWORD}@postgres:5432/\${POSTGRES_DB}
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      postgres:
        condition: service_healthy   # aguarda postgres ficar saudável
      redis:
        condition: service_started
    networks:
      - app_network
    volumes:
      - ./app:/app/app               # hot reload em desenvolvimento
    restart: unless-stopped

  # ── PostgreSQL ────────────────────────────────────────
  postgres:
    image: postgres:16-alpine        # alpine = imagem mínima
    container_name: minha_postgres
    environment:
      POSTGRES_USER:     \${POSTGRES_USER}
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD}
      POSTGRES_DB:       \${POSTGRES_DB}
    volumes:
      - postgres_data:/var/lib/postgresql/data  # dados persistem!
      - ./scripts/init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"                  # expor para DBeaver/DataGrip local
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U \${POSTGRES_USER} -d \${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - app_network

  # ── Redis ─────────────────────────────────────────────
  redis:
    image: redis:7-alpine
    container_name: minha_redis
    command: redis-server --appendonly yes --requirepass \${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"
    networks:
      - app_network
    restart: unless-stopped

# ── Volumes nomeados (dados persistem entre restarts) ────
volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local

# ── Rede isolada (containers se comunicam pelo nome) ─────
networks:
  app_network:
    driver: bridge

# ── .env (NUNCA comitar no git!) ──────────────────────────
# POSTGRES_USER=devuser
# POSTGRES_PASSWORD=devpass123
# POSTGRES_DB=minhaapp_db
# REDIS_PASSWORD=redispass123
# SECRET_KEY=uma-chave-secreta-muito-longa-aqui
# DEBUG=false

# ── Comandos úteis ────────────────────────────────────────
# docker-compose up -d              # subir tudo em background
# docker-compose up -d --build      # rebuild antes de subir
# docker-compose logs -f api        # logs em tempo real da api
# docker-compose logs -f postgres   # logs do banco
# docker-compose ps                 # status de todos os serviços
# docker-compose exec api /bin/sh   # shell dentro do container
# docker-compose exec postgres psql -U devuser -d minhaapp_db
# docker-compose stop               # parar sem remover
# docker-compose down               # parar e remover containers
# docker-compose down -v            # também remove volumes (CUIDADO!)`,
          explanation: 'depends_on com condition: service_healthy garante que a API não sobe antes do PostgreSQL estar pronto para aceitar conexões. Volumes nomeados persistem os dados mesmo após docker-compose down. A rede bridge permite que os containers se comuniquem pelo nome do serviço (postgres, redis) — não pelo IP, que muda a cada restart.'
        },
        {
          title: 'Variáveis de ambiente e segredos — padrão profissional',
          code: `# pip install python-dotenv pydantic-settings

# ── app/config.py ─────────────────────────────────────────
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import PostgresDsn, RedisDsn, field_validator
from typing import Literal

class Settings(BaseSettings):
    """
    Pydantic valida e faz type-casting automaticamente.
    Falha na inicialização se variável obrigatória estiver ausente.
    """
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    # ── App ──────────────────────────────────────────────
    app_name:    str = "Minha API"
    app_version: str = "1.0.0"
    debug:       bool = False
    environment: Literal["development", "staging", "production"] = "development"

    # ── Banco de dados ───────────────────────────────────
    database_url: PostgresDsn       # obrigatório — falha se ausente
    db_pool_size: int = 10
    db_max_overflow: int = 20

    # ── Redis ────────────────────────────────────────────
    redis_url: RedisDsn = "redis://localhost:6379/0"

    # ── Auth ─────────────────────────────────────────────
    secret_key: str                 # obrigatório
    access_token_expire_minutes: int = 30
    algorithm: str = "HS256"

    # ── Email ─────────────────────────────────────────────
    smtp_host:     str  = "smtp.gmail.com"
    smtp_port:     int  = 587
    smtp_user:     str  = ""
    smtp_password: str  = ""

    @field_validator("secret_key")
    @classmethod
    def secret_key_minimo(cls, v: str) -> str:
        if len(v) < 32:
            raise ValueError("SECRET_KEY deve ter no mínimo 32 caracteres")
        return v

    @field_validator("environment")
    @classmethod
    def validar_ambiente(cls, v: str) -> str:
        if v == "production" and not True:  # em prod, verificações extras
            pass
        return v

    @property
    def is_production(self) -> bool:
        return self.environment == "production"

# Singleton — instanciado uma vez na inicialização
settings = Settings()

# ── app/main.py ───────────────────────────────────────────
from app.config import settings
from fastapi import FastAPI

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    docs_url=None if settings.is_production else "/docs",  # sem docs em prod
)

@app.on_event("startup")
async def startup():
    print(f"[startup] Ambiente: {settings.environment}")
    print(f"[startup] Debug: {settings.debug}")
    # Se alguma variável obrigatória faltar, Settings() já teria levantado
    # ValidationError aqui — fail fast, não em runtime

# ── Arquivos por ambiente ─────────────────────────────────
# .env             → valores padrão (pode ir ao git se não tiver segredos)
# .env.development → sobrescreve para dev local
# .env.production  → NUNCA no git — gerenciado por segredos do CI/CD

# .gitignore:
# .env
# .env.*
# !.env.example     ← exemplo SEM segredos reais pode ir ao git

# ── .env.example (pode ser commitado) ────────────────────
# DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/db
# REDIS_URL=redis://localhost:6379/0
# SECRET_KEY=troque-por-uma-chave-de-pelo-menos-32-caracteres
# ENVIRONMENT=development
# DEBUG=true
# SMTP_USER=
# SMTP_PASSWORD=

# ── Docker Secrets (produção segura) ─────────────────────
# No docker-compose.yml para produção:
# services:
#   api:
#     secrets:
#       - db_password
#       - secret_key
# secrets:
#   db_password:
#     external: true        # gerenciado pelo Docker Swarm/K8s
#   secret_key:
#     external: true`,
          explanation: 'pydantic-settings é a forma moderna de gerenciar configuração em Python. Ele lê variáveis de ambiente, faz type casting (string "true" → bool True), valida e falha na inicialização se algo estiver errado — fail fast. Isso evita descobrir em runtime que uma variável crítica estava ausente. Nunca commite .env ao git — use .env.example com valores fictícios para documentar o que é necessário.'
        }
      ]
    },
    quiz: [
      {
        q: 'Por que copiar requirements.txt antes do código da aplicação no Dockerfile?',
        options: [
          'É obrigatório pela sintaxe do Dockerfile',
          'Para aproveitar o cache de camadas: se o código mudou mas as dependências não, o pip install não roda novamente',
          'Para que o pip instale mais rápido',
          'Para evitar erros de permissão'
        ],
        answer: 1,
        explanation: 'Docker constrói imagens em camadas. Se uma camada não mudou, ela é reutilizada do cache. Copiar requirements.txt primeiro e instalar dependências antes do código garante que o pip install só roda quando as dependências realmente mudaram — builds muito mais rápidos.'
      },
      {
        q: 'O que volumes nomeados no docker-compose garantem?',
        options: [
          'Que os dados do banco são compartilhados entre containers',
          'Que os dados persistem mesmo após docker-compose down — sem volumes, os dados somem ao remover o container',
          'Que o container tem acesso ao sistema de arquivos do host',
          'Que o container roda com permissões de root'
        ],
        answer: 1,
        explanation: 'Containers são efêmeros por natureza. Sem volumes, todos os dados do PostgreSQL somem ao fazer docker-compose down. Volumes nomeados persistem no host gerenciados pelo Docker. docker-compose down -v remove os volumes também — use com cuidado em produção!'
      },
      {
        q: 'Por que rodar o processo da aplicação como usuário não-root no container?',
        options: [
          'Para melhorar a performance do container',
          'É exigido pela Docker Hub',
          'Princípio de menor privilégio: se o container for comprometido, o atacante não tem root no host',
          'Para poder usar a porta 8000'
        ],
        answer: 2,
        explanation: 'Rodar como root no container é um risco de segurança. Se houver uma vulnerabilidade na aplicação ou nas dependências, um atacante root no container pode potencialmente escalar para root no host. USER appuser no Dockerfile e configurações de seccomp/AppArmor são camadas de defesa.'
      },
      {
        q: 'Qual a vantagem do pydantic-settings BaseSettings sobre python-dotenv simples?',
        options: [
          'pydantic-settings é mais rápido de instalar',
          'BaseSettings valida tipos, exige variáveis obrigatórias e falha na inicialização — fail fast em vez de erros em runtime',
          'pydantic-settings suporta mais formatos de arquivo',
          'BaseSettings gera o arquivo .env automaticamente'
        ],
        answer: 1,
        explanation: 'python-dotenv apenas carrega o .env em os.environ — sem validação. BaseSettings do pydantic-settings valida tipos (int, bool, URL), exige campos sem default e levanta ValidationError claro se algo estiver errado — na inicialização da aplicação, não em runtime quando já está em produção.'
      },
      {
        q: 'O que significa depends_on com condition: service_healthy no docker-compose?',
        options: [
          'O serviço dependente não é iniciado nunca se o serviço principal falhar',
          'O serviço dependente aguarda o healthcheck do serviço principal passar antes de iniciar',
          'Os dois serviços iniciam ao mesmo tempo',
          'O docker-compose reinicia automaticamente se o serviço falhar'
        ],
        answer: 1,
        explanation: 'depends_on sem condition apenas espera o container iniciar (não significa que o serviço está pronto). Com condition: service_healthy, o Docker aguarda o healthcheck definido retornar sucesso. Para PostgreSQL, pg_isready verifica se o banco aceita conexões — essencial para evitar erros de "connection refused" na inicialização da API.'
      }
    ]
  },

  {
    id: 'py-fastapi-avancado',
    title: 'FastAPI Avançado',
    xp: 35,
    lesson: {
      title: 'FastAPI Avançado — Dependency Injection, WebSockets e Pydantic v2',
      theory: `FastAPI é o framework web Python mais popular para APIs modernas. Usado em produção por Netflix, Uber e Microsoft.

Construído em cima de <strong>Pydantic</strong> (validação) e <strong>Starlette</strong> (ASGI), combina performance com produtividade.

<strong>Diferenciais do FastAPI:</strong>
• Documentação OpenAPI/Swagger automática (<code>/docs</code>)
• Validação automática de request/response com Pydantic
• Suporte nativo a async/await
• Sistema de <strong>Dependency Injection</strong> flexível e testável
• Background Tasks para operações não-críticas
• WebSockets para comunicação em tempo real

<strong>Por que é o padrão de mercado:</strong>
• Performance comparável ao Node.js/Go para I/O bound
• Type hints tornam o código autodocumentado
• Dependency injection torna os testes triviais (override de dependências)
• Ecossistema maduro: middleware, OAuth2, JWT, rate limiting`,
      examples: [
        {
          title: 'Dependency Injection — autenticação e banco de dados',
          code: `# pip install fastapi sqlalchemy python-jose[cryptography] passlib

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from typing import Annotated, Generator

app = FastAPI()
security = HTTPBearer()

# ── Configuração ───────────────────────────────────────────
SECRET_KEY = "sua-chave-secreta-aqui"
ALGORITHM  = "HS256"

# ── Simulação de banco ─────────────────────────────────────
class FakeSession:
    def query(self, model): return self
    def filter_by(self, **kw): return self
    def first(self): return {"id": 1, "email": "admin@test.com", "role": "admin"}
    def close(self): pass

FAKE_DB = FakeSession()

# ── DEPENDENCY: sessão de banco ───────────────────────────
def get_db() -> Generator[Session, None, None]:
    """
    Injeta uma sessão de banco de dados.
    yield garante que a sessão é fechada após a requisição.
    """
    db = FAKE_DB
    try:
        yield db
    finally:
        db.close()

# Tipo anotado para usar nos endpoints
DB = Annotated[Session, Depends(get_db)]

# ── DEPENDENCY: verificar token JWT ──────────────────────
def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido ou expirado",
            headers={"WWW-Authenticate": "Bearer"},
        )

TokenPayload = Annotated[dict, Depends(verify_token)]

# ── DEPENDENCY: usuário atual ─────────────────────────────
def get_current_user(payload: TokenPayload, db: DB) -> dict:
    """
    Encadeia get_db e verify_token automaticamente.
    FastAPI resolve o grafo de dependências.
    """
    user_email = payload.get("sub")
    user = db.query(None).filter_by(email=user_email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return user

CurrentUser = Annotated[dict, Depends(get_current_user)]

# ── DEPENDENCY: exigir admin ──────────────────────────────
def require_admin(current_user: CurrentUser) -> dict:
    """
    Encadeia get_current_user → require_admin.
    FastAPI constrói a cadeia automaticamente.
    """
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Acesso negado: requer admin")
    return current_user

AdminUser = Annotated[dict, Depends(require_admin)]

# ── ENDPOINTS ─────────────────────────────────────────────
@app.get("/me")
async def get_me(user: CurrentUser):
    """Qualquer usuário autenticado acessa"""
    return {"user": user}

@app.delete("/users/{user_id}")
async def delete_user(user_id: int, admin: AdminUser, db: DB):
    """Apenas admin pode deletar — depend chain: token → user → admin"""
    return {"deleted": user_id, "by": admin["email"]}

# ── OVERRIDE PARA TESTES ──────────────────────────────────
# Em tests/conftest.py:
from fastapi.testclient import TestClient

def override_get_current_user():
    """Substitui autenticação real nos testes"""
    return {"id": 1, "email": "test@test.com", "role": "admin"}

def test_delete_user():
    app.dependency_overrides[get_current_user] = override_get_current_user
    client = TestClient(app)
    # Agora não precisa de token JWT real!
    response = client.delete("/users/1", headers={"Authorization": "Bearer fake"})
    app.dependency_overrides.clear()`,
          explanation: 'Dependency Injection no FastAPI é declarativo — você descreve O QUE precisa (get_db, get_current_user), não COMO obtê-lo. O FastAPI resolve o grafo de dependências automaticamente. dependency_overrides é a killer feature para testes: substituir qualquer dependência sem modificar o código de produção.'
        },
        {
          title: 'Background Tasks, WebSockets e eventos lifespan',
          code: `# pip install fastapi redis websockets

from fastapi import FastAPI, BackgroundTasks, WebSocket, WebSocketDisconnect
from contextlib import asynccontextmanager
import asyncio
import redis.asyncio as aioredis
import json
from typing import Any

# ── LIFESPAN — substituiu @app.on_event (deprecated) ─────
@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Código ANTES do yield: startup (inicializar recursos)
    Código APÓS o yield: shutdown (liberar recursos)
    """
    print("[startup] Conectando ao Redis...")
    app.state.redis = await aioredis.from_url("redis://localhost:6379")

    print("[startup] Aquecendo cache...")
    await app.state.redis.set("app:status", "running")

    yield  # ← aplicação roda aqui

    print("[shutdown] Fechando conexão Redis...")
    await app.state.redis.aclose()
    print("[shutdown] Concluído.")

app = FastAPI(lifespan=lifespan)

# ── BACKGROUND TASKS ──────────────────────────────────────
async def enviar_email_boas_vindas(email: str, nome: str):
    """Roda APÓS a resposta ser enviada ao cliente"""
    await asyncio.sleep(2)  # simula envio real de email
    print(f"[bg] Email enviado para {email}")
    # Em produção: usar smtp ou serviço como SendGrid

async def registrar_auditoria(user_id: int, acao: str, dados: dict):
    """Log de auditoria assíncrono — não bloqueia a resposta"""
    await asyncio.sleep(0.1)
    print(f"[audit] user={user_id} acao={acao} dados={dados}")

@app.post("/users/register", status_code=201)
async def register_user(
    email: str,
    nome: str,
    background_tasks: BackgroundTasks
):
    """
    Registra o usuário e retorna 201 imediatamente.
    Email e auditoria acontecem depois, sem o cliente esperar.
    """
    user = {"id": 1, "email": email, "nome": nome}

    # Adiciona tarefas — rodam após a response ser enviada
    background_tasks.add_task(enviar_email_boas_vindas, email, nome)
    background_tasks.add_task(registrar_auditoria, 1, "register", {"email": email})

    return user  # resposta imediata!

# ── WEBSOCKET — chat em tempo real ────────────────────────
class ConnectionManager:
    """Gerencia conexões WebSocket ativas"""
    def __init__(self):
        self.active: dict[str, WebSocket] = {}

    async def connect(self, ws: WebSocket, user_id: str):
        await ws.accept()
        self.active[user_id] = ws

    def disconnect(self, user_id: str):
        self.active.pop(user_id, None)

    async def send_to(self, user_id: str, message: dict):
        ws = self.active.get(user_id)
        if ws:
            await ws.send_json(message)

    async def broadcast(self, message: dict, exclude: str | None = None):
        for uid, ws in list(self.active.items()):
            if uid != exclude:
                await ws.send_json(message)

manager = ConnectionManager()

@app.websocket("/ws/chat/{user_id}")
async def websocket_chat(ws: WebSocket, user_id: str):
    await manager.connect(ws, user_id)
    await manager.broadcast({"type": "join", "user": user_id}, exclude=user_id)

    try:
        while True:
            data = await ws.receive_json()
            message = {
                "type":    "message",
                "from":    user_id,
                "content": data.get("content", ""),
            }
            if data.get("to"):
                # Mensagem privada
                await manager.send_to(data["to"], message)
            else:
                # Broadcast para todos
                await manager.broadcast(message, exclude=user_id)
    except WebSocketDisconnect:
        manager.disconnect(user_id)
        await manager.broadcast({"type": "leave", "user": user_id})

# ── Conectar via JavaScript ───────────────────────────────
# const ws = new WebSocket("ws://localhost:8000/ws/chat/user123");
# ws.onmessage = (e) => console.log(JSON.parse(e.data));
# ws.send(JSON.stringify({ content: "Olá!" }));
# ws.send(JSON.stringify({ to: "user456", content: "Mensagem privada" }));`,
          explanation: 'lifespan com @asynccontextmanager é o padrão moderno (FastAPI 0.93+). Garante que recursos são liberados mesmo se a aplicação travar. BackgroundTasks é ideal para operações que o cliente não precisa esperar (email, log, notificações) — melhora latência percebida. WebSockets com ConnectionManager centralizado permitem broadcast e mensagens diretas; o padrão try/except WebSocketDisconnect é obrigatório para limpeza correta.'
        },
        {
          title: 'Pydantic v2 — validação e serialização avançada',
          code: `# pip install pydantic[email] pydantic-settings

from pydantic import (
    BaseModel, field_validator, model_validator,
    computed_field, Field, EmailStr, TypeAdapter
)
from pydantic.alias_generators import to_camel
from typing import Literal, Annotated
from datetime import datetime
from decimal import Decimal

# ── Validators ────────────────────────────────────────────
class UserCreate(BaseModel):
    name:     str     = Field(min_length=2, max_length=100)
    email:    EmailStr
    password: str     = Field(min_length=8)
    age:      int     = Field(ge=0, le=150)

    @field_validator("name")
    @classmethod
    def nome_nao_pode_ser_so_espacos(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Nome não pode ser apenas espaços")
        return v.strip().title()   # capitaliza automaticamente

    @field_validator("password")
    @classmethod
    def senha_deve_ter_numeros(cls, v: str) -> str:
        if not any(c.isdigit() for c in v):
            raise ValueError("Senha deve conter pelo menos um número")
        return v

    @model_validator(mode="after")
    def validar_contexto(self) -> "UserCreate":
        """Validação cruzada entre campos"""
        if self.name.lower() in self.email.lower():
            # Só um aviso — não bloqueia
            pass
        return self

# ── computed_field ────────────────────────────────────────
class OrderResponse(BaseModel):
    id:         int
    items:      list[dict]
    created_at: datetime

    @computed_field
    @property
    def total(self) -> Decimal:
        return sum(
            Decimal(str(item["price"])) * item["qty"]
            for item in self.items
        )

    @computed_field
    @property
    def item_count(self) -> int:
        return sum(item["qty"] for item in self.items)

# ── Aliases — camelCase para frontend JS ─────────────────
class ProductAPI(BaseModel):
    model_config = {
        "alias_generator": to_camel,    # snake_case → camelCase
        "populate_by_name": True,       # aceita snake_case também
        "from_attributes": True,        # ORM mode (SQLAlchemy objects)
    }

    product_id:   int
    product_name: str
    unit_price:   Decimal
    in_stock:     bool

# ProductAPI(product_id=1, ...) serializa como
# {"productId": 1, "productName": ..., "unitPrice": ..., "inStock": ...}

# ── Discriminated Unions — resposta polimórfica ───────────
class CreditCardPayment(BaseModel):
    method:       Literal["credit_card"]
    card_last4:   str
    installments: int = 1

class PixPayment(BaseModel):
    method:    Literal["pix"]
    pix_key:   str
    expires_at: datetime

class BoletoPayment(BaseModel):
    method:     Literal["boleto"]
    barcode:    str
    due_date:   datetime

# FastAPI serializa corretamente com base no campo "method"
Payment = Annotated[
    CreditCardPayment | PixPayment | BoletoPayment,
    Field(discriminator="method")
]

class CheckoutResponse(BaseModel):
    order_id: int
    payment:  Payment   # retorna o tipo correto automaticamente
    status:   str

# ── Serialization control ─────────────────────────────────
class UserResponse(BaseModel):
    id:         int
    name:       str
    email:      str
    password:   str = Field(exclude=True)   # NUNCA aparece na resposta
    created_at: datetime = Field(serialization_alias="createdAt")

    model_config = {"from_attributes": True}

# ── TypeAdapter — validar listas e tipos sem BaseModel ────
from pydantic import TypeAdapter

# Validar lista de emails sem criar um modelo só para isso
email_list_adapter = TypeAdapter(list[EmailStr])
emails = email_list_adapter.validate_python(["a@test.com", "b@test.com"])

# Validar dados arbitrários
int_adapter = TypeAdapter(Annotated[int, Field(ge=0, le=100)])
score = int_adapter.validate_python(85)  # OK
# int_adapter.validate_python(150)       # ValidationError!

# ── Exemplo de uso no FastAPI ─────────────────────────────
from fastapi import FastAPI

app = FastAPI()

@app.post("/users", response_model=UserResponse, status_code=201)
async def create_user(data: UserCreate):
    # Pydantic já validou: name, email, password, age
    user_db = {
        "id": 1,
        **data.model_dump(),
        "created_at": datetime.utcnow()
    }
    return UserResponse(**user_db)`,
          explanation: 'Pydantic v2 é ~17x mais rápido que v1 (reescrito em Rust). @field_validator substitui @validator do v1. @model_validator para validações cruzadas entre campos. computed_field para propriedades calculadas serializadas. Discriminated unions com Literal + discriminator geram OpenAPI correto e validação eficiente. exclude=True em Field garante que senhas e dados sensíveis jamais apareçam nas respostas — sem precisar de DTOs separados.'
        }
      ]
    },
    quiz: [
      {
        q: 'O que Depends() faz no FastAPI?',
        options: [
          'Importa módulos Python dinamicamente',
          'Declara uma dependência que o FastAPI resolve e injeta automaticamente, podendo ser compartilhada e sobrescrita em testes',
          'Verifica se um pacote está instalado',
          'Faz chamadas assíncronas ao banco de dados'
        ],
        answer: 1,
        explanation: 'Depends() é o sistema de injeção de dependências do FastAPI. Você declara O QUE precisa e o FastAPI resolve o grafo (incluindo dependências de dependências). A killer feature é dependency_overrides em testes: substituir get_current_user por uma versão fake sem modificar o código de produção.'
      },
      {
        q: 'Qual a diferença entre BackgroundTasks e asyncio.create_task()?',
        options: [
          'BackgroundTasks roda antes de enviar a resposta; create_task roda depois',
          'BackgroundTasks é integrado ao ciclo de vida do FastAPI (roda após a response), create_task é um coroutine independente no event loop — pode sobreviver ao request',
          'create_task é mais rápido que BackgroundTasks',
          'Não há diferença prática entre os dois'
        ],
        answer: 1,
        explanation: 'BackgroundTasks é gerenciado pelo FastAPI: roda após a response ser enviada, na mesma request. asyncio.create_task() cria uma coroutine independente no event loop — útil para fire-and-forget de longa duração, mas sem garantia de execução se o processo morrer. Para tarefas críticas (envio de email garantido), use uma fila (Celery + Redis/RabbitMQ).'
      },
      {
        q: 'O que @model_validator(mode="after") permite que @field_validator não permite?',
        options: [
          'Validar campos individuais com mais detalhes',
          'Validações cruzadas entre múltiplos campos do mesmo modelo',
          'Validar dados aninhados (nested models)',
          'Converter tipos automaticamente'
        ],
        answer: 1,
        explanation: '@field_validator valida um campo por vez. @model_validator(mode="after") recebe o modelo já instanciado — permite validações que dependem de múltiplos campos: verificar se data_fim > data_inicio, se senha e confirmacao_senha são iguais, se um campo é obrigatório quando outro tem determinado valor.'
      },
      {
        q: 'Para que serve o discriminator em Pydantic Discriminated Unions?',
        options: [
          'Para filtrar campos na serialização',
          'Para indicar qual campo determina qual subtype será desserializado — mais eficiente e gera OpenAPI correto',
          'Para excluir campos da documentação',
          'Para validar enums'
        ],
        answer: 1,
        explanation: 'Sem discriminator, Pydantic tenta cada tipo da Union em ordem — lento e propenso a falsos positivos. Com Field(discriminator="method"), Pydantic vai direto ao tipo correto baseado no valor do campo discriminador. Também gera documentação OpenAPI com oneOf correto, mostrando cada variante separadamente.'
      },
      {
        q: 'Por que usar o padrão lifespan (@asynccontextmanager) em vez de @app.on_event("startup")?',
        options: [
          '@app.on_event é mais recente e deve ser preferido',
          'lifespan é o padrão moderno (FastAPI 0.93+), garante cleanup via yield mesmo em caso de erro, e é testável com TestClient',
          'lifespan é mais rápido',
          'on_event não funciona com async'
        ],
        answer: 1,
        explanation: '@app.on_event foi depreciado. lifespan com asynccontextmanager é mais idiomático Python: o código após yield é garantido (como finally), o par startup/shutdown fica no mesmo lugar, e o TestClient do FastAPI suporta lifespan corretamente para testes de integração.'
      }
    ]
  }
];

if (window.PYTHON_DATA) {
  window.PYTHON_DATA.topics = window.PYTHON_DATA.topics.concat(window.PYTHON_TESTES);
}
