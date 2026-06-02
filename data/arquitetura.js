// arquitetura.js — Arquitetura de Software: do Clean ao System Design
window.ARQUITETURA_DATA = {
  id: 'arquitetura',
  name: 'Arquitetura',
  icon: '🏛️',
  color: '#0ea5e9',
  topics: [
    {
      id: 'arq-clean',
      title: 'Clean e Hexagonal Architecture',
      xp: 30,
      lesson: {
        title: 'Clean Architecture e Hexagonal — Código que não prende ao framework',
        theory: `Clean Architecture (Uncle Bob) e Hexagonal Architecture (Alistair Cockburn) resolvem o mesmo problema: <strong>desacoplar a lógica de negócio do framework, banco de dados e interfaces externas</strong>.

<strong>Clean Architecture — camadas concêntricas:</strong>
• <strong>Entities</strong> — regras de negócio universais (não dependem de nada)
• <strong>Use Cases</strong> — regras de negócio da aplicação
• <strong>Interface Adapters</strong> — controllers, presenters, gateways
• <strong>Frameworks & Drivers</strong> — Django, FastAPI, SQLAlchemy, HTTP

<strong>Regra de dependência:</strong> código interno nunca importa código externo.

<strong>Hexagonal (Ports & Adapters):</strong>
• <strong>Ports</strong> — interfaces (contratos) definidas pelo domínio
• <strong>Adapters</strong> — implementações concretas que ficam fora do domínio`,
        examples: [
          {
            title: 'Estrutura de pastas e camadas — Clean Architecture em Python',
            code: `# Estrutura de um projeto com Clean Architecture
#
# src/
# ├── domain/               ← Entities + regras de negócio (sem imports externos)
# │   ├── entities.py
# │   ├── exceptions.py
# │   └── value_objects.py
# ├── use_cases/            ← Application Business Rules
# │   ├── create_user.py
# │   └── get_user.py
# ├── infrastructure/       ← Adapters: banco, e-mail, APIs externas
# │   ├── repositories/
# │   │   ├── sql_user_repo.py
# │   │   └── mongo_user_repo.py
# │   └── services/
# │       └── smtp_email_service.py
# └── api/                  ← Framework (FastAPI, Flask)
#     ├── routes/
#     └── schemas/

# ─── domain/entities.py ───────────────────────────────────────────────────────
from dataclasses import dataclass, field
from datetime import datetime
import re

@dataclass
class Email:
    """Value Object — imutável, igualdade por valor"""
    value: str

    def __post_init__(self):
        if not re.fullmatch(r"[\\w.+\\-]+@[\\w\\-]+\\.[a-z]{2,}", self.value):
            raise ValueError(f"Email inválido: {self.value}")

    def __eq__(self, other):
        return isinstance(other, Email) and self.value == other.value

@dataclass
class User:
    """Entity — tem identidade (id), pode mudar de estado"""
    id: str
    name: str
    email: Email
    created_at: datetime = field(default_factory=datetime.utcnow)
    active: bool = True

    def deactivate(self):
        if not self.active:
            raise ValueError("Usuário já está inativo")
        self.active = False

    def change_email(self, new_email: Email):
        self.email = new_email

# ─── use_cases/create_user.py ─────────────────────────────────────────────────
from abc import ABC, abstractmethod
from typing import Protocol

# Port (interface) — o Use Case só conhece o contrato, não a implementação
class UserRepository(Protocol):
    def find_by_email(self, email: str) -> "User | None": ...
    def save(self, user: "User") -> "User": ...

class EmailService(Protocol):
    def send_welcome(self, to: str, name: str) -> None: ...

# Use Case — orquestra a lógica, sem saber nada de banco ou HTTP
class CreateUserUseCase:
    def __init__(self, repo: UserRepository, email_svc: EmailService):
        self._repo = repo
        self._email_svc = email_svc

    def execute(self, name: str, email_str: str) -> "User":
        email = Email(email_str)                  # valida no domínio
        if self._repo.find_by_email(email_str):
            raise ValueError("Email já cadastrado")
        import uuid
        user = User(id=str(uuid.uuid4()), name=name, email=email)
        saved = self._repo.save(user)
        self._email_svc.send_welcome(email_str, name)
        return saved`,
            explanation: 'Entities e Value Objects ficam no domain/ sem NENHUM import externo. Use Cases recebem as dependências por injeção via Protocol (duck typing do Python). Isso permite testar o Use Case com um FakeRepository sem banco de dados real.'
          },
          {
            title: 'Dependency Inversion — trocar banco sem mudar negócio',
            code: `# ─── infrastructure/repositories/sql_user_repo.py ───────────────────────────
from sqlalchemy.orm import Session
from domain.entities import User, Email
from datetime import datetime

class SQLAlchemyUserRepository:
    """Adapter concreto — implementa o Port UserRepository"""
    def __init__(self, db: Session):
        self._db = db

    def find_by_email(self, email: str) -> User | None:
        row = self._db.query(UserModel).filter_by(email=email).first()
        if not row:
            return None
        return User(
            id=str(row.id),
            name=row.name,
            email=Email(row.email),
            created_at=row.created_at,
            active=row.active
        )

    def save(self, user: User) -> User:
        model = UserModel(
            id=user.id, name=user.name,
            email=user.email.value, active=user.active
        )
        self._db.add(model)
        self._db.commit()
        return user

# ─── tests/test_create_user.py ────────────────────────────────────────────────
# FakeRepository — sem banco, sem I/O, execução em milissegundos
class FakeUserRepository:
    def __init__(self):
        self._users: dict[str, User] = {}

    def find_by_email(self, email: str) -> User | None:
        return next((u for u in self._users.values() if u.email.value == email), None)

    def save(self, user: User) -> User:
        self._users[user.id] = user
        return user

class FakeEmailService:
    def __init__(self):
        self.sent = []
    def send_welcome(self, to: str, name: str):
        self.sent.append({"to": to, "name": name})

import pytest
def test_create_user_success():
    repo  = FakeUserRepository()
    email = FakeEmailService()
    uc    = CreateUserUseCase(repo, email)
    user  = uc.execute("Ana Silva", "ana@empresa.com")
    assert user.name == "Ana Silva"
    assert user.email == Email("ana@empresa.com")
    assert len(email.sent) == 1  # e-mail foi enviado

def test_duplicate_email_raises():
    repo = FakeUserRepository()
    uc   = CreateUserUseCase(repo, FakeEmailService())
    uc.execute("Ana", "ana@empresa.com")
    with pytest.raises(ValueError, match="já cadastrado"):
        uc.execute("Ana 2", "ana@empresa.com")

# ─── api/routes/users.py ──────────────────────────────────────────────────────
# O framework é apenas um detalhe — pode ser FastAPI, Flask, CLI, gRPC
from fastapi import APIRouter, Depends
router = APIRouter()

@router.post("/users")
def create_user(body: CreateUserRequest, db: Session = Depends(get_db)):
    repo  = SQLAlchemyUserRepository(db)        # adapter concreto
    email = SmtpEmailService()                  # adapter concreto
    uc    = CreateUserUseCase(repo, email)       # Use Case puro
    user  = uc.execute(body.name, body.email)
    return {"id": user.id, "name": user.name}`,
            explanation: 'O teste usa FakeRepository e FakeEmailService — sem banco, sem SMTP, roda em <1ms. Para ir para produção, basta trocar o Fake pelo adaptador real na camada de API. O Use Case não muda.'
          },
          {
            title: 'Ports & Adapters — múltiplos adapters para o mesmo Port',
            code: `# O mesmo Port (interface) com vários Adapters
from typing import Protocol

# PORT — contrato definido pelo domínio
class NotificationPort(Protocol):
    def notify(self, user_id: str, message: str) -> None: ...

# ADAPTER 1 — E-mail
class EmailNotificationAdapter:
    def __init__(self, smtp_host: str, smtp_port: int):
        self._host = smtp_host
        self._port = smtp_port

    def notify(self, user_id: str, message: str) -> None:
        print(f"[SMTP] Enviando para user {user_id}: {message}")
        # smtplib.SMTP(self._host, self._port)...

# ADAPTER 2 — SMS via Twilio
class SmsNotificationAdapter:
    def __init__(self, account_sid: str, auth_token: str):
        self._sid   = account_sid
        self._token = auth_token

    def notify(self, user_id: str, message: str) -> None:
        print(f"[SMS/Twilio] SMS para user {user_id}: {message}")

# ADAPTER 3 — Slack (para notificações internas)
class SlackNotificationAdapter:
    def __init__(self, webhook_url: str):
        self._url = webhook_url

    def notify(self, user_id: str, message: str) -> None:
        print(f"[Slack] #alerts user={user_id}: {message}")

# ADAPTER 4 — Fake para testes
class FakeNotificationAdapter:
    def __init__(self):
        self.notifications: list[dict] = []

    def notify(self, user_id: str, message: str) -> None:
        self.notifications.append({"user_id": user_id, "message": message})

# Use Case não muda — qualquer adapter funciona
class PlaceOrderUseCase:
    def __init__(self, orders_repo, notifier: NotificationPort):
        self._orders   = orders_repo
        self._notifier = notifier

    def execute(self, user_id: str, items: list):
        order = self._orders.create(user_id, items)
        self._notifier.notify(user_id, f"Pedido #{order.id} confirmado!")
        return order

# main.py — wiring (só aqui o framework escolhe qual adapter usar)
import os
channel = os.environ.get("NOTIFICATION_CHANNEL", "email")
if channel == "sms":
    notifier = SmsNotificationAdapter(os.environ["TWILIO_SID"], os.environ["TWILIO_TOKEN"])
elif channel == "slack":
    notifier = SlackNotificationAdapter(os.environ["SLACK_WEBHOOK"])
else:
    notifier = EmailNotificationAdapter("smtp.empresa.com", 587)`,
            explanation: 'Trocar de e-mail para SMS é uma mudança de configuração, não de código. O Use Case, os testes e o domínio permanecem idênticos. Isso é o princípio Open/Closed (SOLID) na prática arquitetural.'
          }
        ],
        quiz: [
          {
            q: 'Na Clean Architecture, qual camada NUNCA pode importar da camada externa?',
            options: ['Frameworks podem importar Use Cases', 'Entities podem importar do banco de dados', 'Use Cases nunca importam de Frameworks — a dependência é sempre de fora para dentro', 'Todas as camadas podem importar de todas'],
            answer: 2,
            explanation: 'A Regra de Dependência: dependências apontam para dentro. Frameworks importam Use Cases, Use Cases importam Entities. Entities não importam nada externo. Isso garante que o núcleo do negócio seja testável e independente.'
          },
          {
            q: 'O que é um "Port" na Hexagonal Architecture?',
            options: ['Uma porta de rede (TCP/HTTP)', 'Uma interface/contrato definida pelo domínio que adapters externos devem implementar', 'Um método público de uma classe', 'Uma configuração de banco de dados'],
            answer: 1,
            explanation: 'Port = interface (Protocol/ABC). O domínio define o contrato. Adapters (implementações concretas) ficam fora do domínio. Isso permite trocar o banco ou serviço externo sem mudar regras de negócio.'
          },
          {
            q: 'Qual a principal vantagem de usar FakeRepository nos testes de Use Case?',
            options: ['Fake é mais correto que o banco real', 'Testes rodam em milissegundos sem I/O, sem banco, sem rede — completamente isolados', 'Fake detecta mais bugs que o banco real', 'É exigido pelo framework de testes'],
            answer: 1,
            explanation: 'FakeRepository é uma implementação em memória do Port. O Use Case não sabe a diferença. Resultado: testes ultrarrápidos, sem setup de banco, sem flakiness por conexão — a base de uma boa suite de testes unitários.'
          },
          {
            q: 'Onde fica a "lógica de wiring" (conectar adapters concretos ao Use Case)?',
            options: ['Dentro do Use Case', 'Dentro do Entity', 'Na camada mais externa: main.py, container de DI, ou factory', 'Em qualquer lugar — não importa'],
            answer: 2,
            explanation: 'O wiring (conectar SQLAlchemyRepository ao Use Case) fica na borda externa da aplicação: main.py, um container de injeção de dependência (dependency-injector, punq) ou factory. Use Cases e Entities nunca instanciam adapters concretos.'
          },
          {
            q: 'Na Clean Architecture, qual é a regra para Value Objects como "Email" e "Money"?',
            options: ['Devem ter id único e ser mutáveis', 'São imutáveis, sem identidade, igualdade por valor — e ficam na camada Domain', 'Devem herdar de uma classe base do framework', 'São apenas DTOs sem validação'],
            answer: 1,
            explanation: 'Value Objects: imutáveis (frozen dataclass ou __setattr__ bloqueado), igualdade por valor (email1 == email2 se value igual), ficam no Domain. Validação dentro deles: Email("invalido") levanta ValueError antes de sair do domínio.'
          }
        ]
      }
    },

    {
      id: 'arq-ddd',
      title: 'DDD — Domain-Driven Design',
      xp: 30,
      lesson: {
        title: 'DDD — Modelar código que fala a língua do negócio',
        theory: `Domain-Driven Design (Eric Evans) é uma abordagem para desenvolver software complexo alinhando código e linguagem de negócio.

<strong>Conceitos fundamentais:</strong>
• <strong>Ubiquitous Language</strong> — mesmos termos no código e nas reuniões de negócio
• <strong>Bounded Context</strong> — fronteira explícita onde um modelo é válido
• <strong>Entity</strong> — tem identidade única, pode mudar de estado (Order, User)
• <strong>Value Object</strong> — definido pelos valores, imutável (Money, Address, Email)
• <strong>Aggregate</strong> — grupo de objetos tratados como unidade de consistência
• <strong>Aggregate Root</strong> — único ponto de entrada para mutar o Aggregate
• <strong>Domain Event</strong> — algo importante que aconteceu no domínio`,
        examples: [
          {
            title: 'Entities vs Value Objects — a diferença que muda tudo',
            code: `from dataclasses import dataclass, field
from decimal import Decimal
from typing import Optional
import uuid

# ─── VALUE OBJECTS — imutáveis, igualdade por valor ──────────────────────────

@dataclass(frozen=True)  # frozen=True = imutável
class Money:
    amount: Decimal
    currency: str = "BRL"

    def __post_init__(self):
        if self.amount < 0:
            raise ValueError("Valor não pode ser negativo")

    def __add__(self, other: "Money") -> "Money":
        if self.currency != other.currency:
            raise ValueError("Moedas diferentes")
        return Money(self.amount + other.amount, self.currency)

    def __mul__(self, factor: Decimal) -> "Money":
        return Money(self.amount * factor, self.currency)

    def __str__(self):
        return f"R$ {self.amount:.2f}"

@dataclass(frozen=True)
class Address:
    street: str
    city: str
    state: str
    zipcode: str

    def __post_init__(self):
        if len(self.state) != 2:
            raise ValueError("Estado deve ter 2 letras (ex: SP)")

@dataclass(frozen=True)
class ProductId:
    value: str

    def __post_init__(self):
        if not self.value:
            raise ValueError("ProductId não pode ser vazio")

# ─── ENTITY — tem identidade, pode mudar ─────────────────────────────────────

@dataclass
class Product:
    id: ProductId
    name: str
    price: Money
    stock: int

    def update_price(self, new_price: Money) -> None:
        if new_price.amount <= 0:
            raise ValueError("Preço deve ser positivo")
        self.price = new_price

    def decrease_stock(self, quantity: int) -> None:
        if quantity > self.stock:
            raise ValueError(f"Estoque insuficiente: {self.stock} disponíveis")
        self.stock -= quantity

# Demonstração
p1 = Product(ProductId("prod-1"), "Notebook", Money(Decimal("4500")), 10)
p2 = Product(ProductId("prod-1"), "Notebook", Money(Decimal("4500")), 10)

# Entities: mesma identidade = mesmo objeto
print(p1.id == p2.id)   # True (mesmo ID)

# Value Objects: igualdade por valor
m1 = Money(Decimal("100"))
m2 = Money(Decimal("100"))
print(m1 == m2)  # True (frozen dataclass)
print(m1 + m2)   # R$ 200.00`,
            explanation: 'frozen=True no dataclass garante imutabilidade — qualquer tentativa de modificar gera FrozenInstanceError. Money com Decimal (não float) evita erros de ponto flutuante em cálculos financeiros. Esta é a modelagem correta em domínios financeiros.'
          },
          {
            title: 'Aggregate Root — única porta de entrada para consistência',
            code: `from dataclasses import dataclass, field
from decimal import Decimal
from datetime import datetime
from enum import Enum
import uuid

class OrderStatus(Enum):
    PENDING   = "pending"
    CONFIRMED = "confirmed"
    SHIPPED   = "shipped"
    CANCELLED = "cancelled"

@dataclass
class OrderItem:
    """Parte do Aggregate — só existe dentro de Order"""
    product_id: str
    product_name: str
    unit_price: Money
    quantity: int

    @property
    def subtotal(self) -> Money:
        return self.unit_price * Decimal(self.quantity)

@dataclass
class Order:
    """Aggregate Root — toda mutação passa por aqui"""
    id: str
    customer_id: str
    _items: list = field(default_factory=list, repr=False)
    _status: OrderStatus = field(default=OrderStatus.PENDING, repr=False)
    _events: list = field(default_factory=list, repr=False)
    created_at: datetime = field(default_factory=datetime.utcnow)

    # ─── INVARIANTS (regras de negócio do aggregate) ─────────────────────────

    def add_item(self, product_id: str, name: str, price: Money, qty: int) -> None:
        if self._status != OrderStatus.PENDING:
            raise ValueError("Só é possível adicionar itens em pedidos pendentes")
        if qty <= 0:
            raise ValueError("Quantidade deve ser maior que zero")
        # Regra: máximo 10 itens diferentes por pedido
        if len(self._items) >= 10:
            raise ValueError("Pedido não pode ter mais de 10 tipos de produto")
        # Se produto já existe, aumenta quantidade
        for item in self._items:
            if item.product_id == product_id:
                item.quantity += qty
                return
        self._items.append(OrderItem(product_id, name, price, qty))

    def confirm(self) -> None:
        if not self._items:
            raise ValueError("Pedido sem itens não pode ser confirmado")
        if self._status != OrderStatus.PENDING:
            raise ValueError(f"Pedido {self._status.value} não pode ser confirmado")
        self._status = OrderStatus.CONFIRMED
        self._events.append(OrderConfirmed(order_id=self.id, total=self.total))

    def cancel(self, reason: str) -> None:
        if self._status in (OrderStatus.SHIPPED,):
            raise ValueError("Pedido já enviado não pode ser cancelado")
        self._status = OrderStatus.CANCELLED
        self._events.append(OrderCancelled(order_id=self.id, reason=reason))

    @property
    def total(self) -> Money:
        if not self._items:
            return Money(Decimal("0"))
        result = self._items[0].subtotal
        for item in self._items[1:]:
            result = result + item.subtotal
        return result

    @property
    def items(self) -> tuple:
        return tuple(self._items)  # retorna cópia imutável — ninguém modifica por fora

    def pull_events(self) -> list:
        events = self._events.copy()
        self._events.clear()
        return events

# Uso: o Aggregate Root garante as invariantes
order = Order(id=str(uuid.uuid4()), customer_id="cust-1")
order.add_item("prod-1", "Notebook", Money(Decimal("4500")), 1)
order.add_item("prod-2", "Mouse",    Money(Decimal("120")),  2)
order.confirm()
print(order.total)          # R$ 4740.00
print(order.pull_events())  # [OrderConfirmed(...)]`,
            explanation: 'O Aggregate Root (Order) é o guardião das invariantes. Ninguém acessa _items diretamente — toda mutação passa pelos métodos da Order, que validam as regras. A propriedade items retorna tuple (imutável) para impedir modificações externas.'
          },
          {
            title: 'Domain Events — comunicação desacoplada entre contextos',
            code: `from dataclasses import dataclass, field
from datetime import datetime
from typing import Callable, Type
import uuid

# ─── Domain Events ────────────────────────────────────────────────────────────

@dataclass(frozen=True)
class DomainEvent:
    event_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    occurred_at: datetime = field(default_factory=datetime.utcnow)

@dataclass(frozen=True)
class OrderConfirmed(DomainEvent):
    order_id: str = ""
    customer_id: str = ""
    total: Money = None

@dataclass(frozen=True)
class PaymentReceived(DomainEvent):
    order_id: str = ""
    amount: Money = None
    payment_method: str = ""

@dataclass(frozen=True)
class ItemShipped(DomainEvent):
    order_id: str = ""
    tracking_code: str = ""

# ─── Event Dispatcher (simples, in-process) ──────────────────────────────────

class EventDispatcher:
    def __init__(self):
        self._handlers: dict[Type, list[Callable]] = {}

    def subscribe(self, event_type: Type, handler: Callable) -> None:
        self._handlers.setdefault(event_type, []).append(handler)

    def dispatch(self, event: DomainEvent) -> None:
        for handler in self._handlers.get(type(event), []):
            handler(event)

# ─── Handlers em outros Bounded Contexts ─────────────────────────────────────

class InventoryContext:
    """Bounded Context de Estoque — reage a eventos do contexto de Pedidos"""
    def on_order_confirmed(self, event: OrderConfirmed) -> None:
        print(f"[Estoque] Reservando itens para pedido {event.order_id}")

class NotificationContext:
    """Bounded Context de Notificações"""
    def on_order_confirmed(self, event: OrderConfirmed) -> None:
        print(f"[Email] Confirmação enviada para pedido {event.order_id}")

    def on_item_shipped(self, event: ItemShipped) -> None:
        print(f"[SMS] Rastreio {event.tracking_code} para pedido {event.order_id}")

class AnalyticsContext:
    """Registra eventos para análise"""
    def on_any_event(self, event: DomainEvent) -> None:
        print(f"[Analytics] Evento: {type(event).__name__} em {event.occurred_at}")

# ─── Wiring ───────────────────────────────────────────────────────────────────

dispatcher = EventDispatcher()
inventory  = InventoryContext()
notify     = NotificationContext()
analytics  = AnalyticsContext()

dispatcher.subscribe(OrderConfirmed, inventory.on_order_confirmed)
dispatcher.subscribe(OrderConfirmed, notify.on_order_confirmed)
dispatcher.subscribe(OrderConfirmed, analytics.on_any_event)
dispatcher.subscribe(ItemShipped,    notify.on_item_shipped)

# Publicar eventos gerados pelo Aggregate
order = Order(id="ord-1", customer_id="cust-1")
order.add_item("prod-1", "Notebook", Money(Decimal("4500")), 1)
order.confirm()

for event in order.pull_events():
    dispatcher.dispatch(event)
# [Estoque] Reservando itens para pedido ord-1
# [Email] Confirmação enviada para pedido ord-1
# [Analytics] Evento: OrderConfirmed em 2024-01-15 10:00:00`,
            explanation: 'Domain Events desacoplam Bounded Contexts. O contexto de Pedidos não conhece Estoque nem Notificações — ele apenas publica o que aconteceu. Cada contexto reage de forma independente. Em sistemas distribuídos, esses eventos vão para um message broker (Kafka, RabbitMQ).'
          }
        ],
        quiz: [
          {
            q: 'Qual a diferença entre Entity e Value Object no DDD?',
            options: ['Entity tem mais métodos que Value Object', 'Entity tem identidade única e pode mudar; Value Object é definido pelos seus valores, é imutável', 'Entity usa banco relacional; Value Object usa NoSQL', 'São sinônimos no contexto do DDD'],
            answer: 1,
            explanation: 'Entity: mesma identidade = mesmo objeto (Order#123 é sempre Order#123, mesmo com itens diferentes). Value Object: igualdade por valor (Money(100) == Money(100), independente de qual objeto). Trocar email de um User cria um novo Email VO, não muda o User.'
          },
          {
            q: 'O que garante um Aggregate Root?',
            options: ['Performance de leitura do banco de dados', 'Que toda mutação passe pela sua interface, garantindo as invariantes de negócio', 'Que os dados sejam persistidos em uma única tabela', 'Que outros aggregates não possam existir'],
            answer: 1,
            explanation: 'Aggregate Root é o guardião da consistência. Todo acesso e mutação passa por ele. Isso garante que as regras de negócio (invariantes) sejam sempre verificadas. OrderItem não pode ser adicionado diretamente — passa pela Order.add_item().'
          },
          {
            q: 'O que é Ubiquitous Language no DDD?',
            options: ['Uma linguagem de programação específica para DDD', 'Os mesmos termos usados tanto no código quanto nas conversas com especialistas de negócio', 'Um padrão de nomenclatura de variáveis', 'Uma linguagem de consulta de banco de dados'],
            answer: 1,
            explanation: 'Se o time de negócio fala "pedido", "item", "fatura" — o código usa Order, Item, Invoice. Nunca "record", "data", "object". Isso reduz o abismo entre negócio e tecnologia e evita mal-entendidos.'
          },
          {
            q: 'Para que servem os Domain Events?',
            options: ['Para substituir exceções Python', 'Para registrar o que aconteceu no domínio e permitir comunicação desacoplada entre Bounded Contexts', 'Para versionar o banco de dados', 'São apenas para logging'],
            answer: 1,
            explanation: 'Domain Events (OrderConfirmed, PaymentReceived) comunicam o que aconteceu. Outros contextos (Estoque, Notificações) reagem sem que o contexto origem os conheça. Isso é desacoplamento real — em microservices, os eventos vão pelo Kafka.'
          },
          {
            q: 'O que é um Bounded Context no DDD?',
            options: ['Um limite de memória para o banco de dados', 'Uma fronteira explícita onde um modelo de domínio específico é válido e consistente', 'Uma restrição de acesso baseada em roles', 'O tamanho máximo de um Aggregate'],
            answer: 1,
            explanation: '"Produto" no contexto de Catálogo tem nome, descrição, fotos. "Produto" no contexto de Estoque tem código, quantidade, localização. Bounded Contexts separam esses modelos para evitar que um domínio inche com responsabilidades de outro.'
          }
        ]
      }
    },

    {
      id: 'arq-cqrs',
      title: 'CQRS e Event Sourcing',
      xp: 30,
      lesson: {
        title: 'CQRS e Event Sourcing — Escalar leitura e escrita independentemente',
        theory: `<strong>CQRS (Command Query Responsibility Segregation):</strong>
Separa o modelo de <em>escrita</em> (Commands) do modelo de <em>leitura</em> (Queries).
• <strong>Command</strong> — muda estado, não retorna dados (CreateOrder, CancelOrder)
• <strong>Query</strong> — retorna dados, não muda estado (GetOrder, ListOrders)

Benefícios: otimizar leitura e escrita independentemente, escalabilidade, clareza de intenção.

<strong>Event Sourcing:</strong>
Em vez de salvar o estado atual, salva a <em>sequência de eventos</em> que levaram a esse estado.
• Estado atual = replay de todos os eventos
• Auditoria 100% gratuita
• Pode reconstruir qualquer estado histórico
• Base para CQRS distribuído`,
        examples: [
          {
            title: 'CQRS — separar Commands de Queries',
            code: `from dataclasses import dataclass
from typing import Any
from abc import ABC, abstractmethod

# ─── Commands (write side) ────────────────────────────────────────────────────

@dataclass
class CreateOrderCommand:
    customer_id: str
    items: list[dict]  # [{product_id, quantity, price}]

@dataclass
class CancelOrderCommand:
    order_id: str
    reason: str

@dataclass
class AddItemCommand:
    order_id: str
    product_id: str
    quantity: int
    unit_price: float

# ─── Queries (read side) ──────────────────────────────────────────────────────

@dataclass
class GetOrderQuery:
    order_id: str

@dataclass
class ListCustomerOrdersQuery:
    customer_id: str
    page: int = 1
    page_size: int = 20

@dataclass
class GetOrderSummaryQuery:
    order_id: str

# ─── Command Handlers ─────────────────────────────────────────────────────────

class CreateOrderHandler:
    def __init__(self, order_repo, event_bus):
        self._repo = order_repo
        self._bus  = event_bus

    def handle(self, cmd: CreateOrderCommand) -> str:
        order = Order.create(cmd.customer_id, cmd.items)
        self._repo.save(order)
        for event in order.pull_events():
            self._bus.publish(event)
        return order.id

class CancelOrderHandler:
    def __init__(self, order_repo, event_bus):
        self._repo = order_repo
        self._bus  = event_bus

    def handle(self, cmd: CancelOrderCommand) -> None:
        order = self._repo.find_by_id(cmd.order_id)
        if not order:
            raise ValueError(f"Pedido {cmd.order_id} não encontrado")
        order.cancel(cmd.reason)
        self._repo.save(order)
        for event in order.pull_events():
            self._bus.publish(event)

# ─── Query Handlers (leem de read model otimizado) ───────────────────────────

class GetOrderQueryHandler:
    def __init__(self, read_db):  # banco de leitura — pode ser diferente do escrita
        self._db = read_db

    def handle(self, query: GetOrderQuery) -> dict | None:
        # Read model pode ser desnormalizado (JOIN já feito, índices otimizados)
        return self._db.fetch_one(
            "SELECT o.*, c.name as customer_name FROM orders_view o "
            "JOIN customers c ON o.customer_id = c.id WHERE o.id = ?",
            query.order_id
        )

# ─── Command/Query Bus ────────────────────────────────────────────────────────

class CommandBus:
    def __init__(self):
        self._handlers = {}

    def register(self, command_type, handler):
        self._handlers[command_type] = handler

    def dispatch(self, command) -> Any:
        handler = self._handlers.get(type(command))
        if not handler:
            raise ValueError(f"Sem handler para {type(command).__name__}")
        return handler.handle(command)

# Uso limpo e explícito
# bus.dispatch(CreateOrderCommand(customer_id="c1", items=[...]))
# order = query_bus.dispatch(GetOrderQuery(order_id="ord-1"))`,
            explanation: 'CQRS torna a intenção explícita: CreateOrderCommand é diferente de GetOrderQuery. O lado de leitura pode usar uma view desnormalizada, cache Redis, ou até um banco diferente (Elasticsearch para busca). Cada lado escala independentemente.'
          },
          {
            title: 'Event Sourcing — estado como sequência de eventos',
            code: `from dataclasses import dataclass, field
from datetime import datetime
from decimal import Decimal
import uuid

# ─── Eventos (imutáveis, o que aconteceu) ────────────────────────────────────

@dataclass(frozen=True)
class AccountOpened:
    account_id: str
    owner_name: str
    initial_balance: Decimal
    occurred_at: datetime = field(default_factory=datetime.utcnow)

@dataclass(frozen=True)
class MoneyDeposited:
    account_id: str
    amount: Decimal
    description: str
    occurred_at: datetime = field(default_factory=datetime.utcnow)

@dataclass(frozen=True)
class MoneyWithdrawn:
    account_id: str
    amount: Decimal
    description: str
    occurred_at: datetime = field(default_factory=datetime.utcnow)

@dataclass(frozen=True)
class AccountSuspended:
    account_id: str
    reason: str
    occurred_at: datetime = field(default_factory=datetime.utcnow)

# ─── Aggregate reconstruído a partir de eventos ──────────────────────────────

class BankAccount:
    def __init__(self):
        self.id = None
        self.owner = None
        self.balance = Decimal("0")
        self.suspended = False
        self._uncommitted: list = []

    # Reconstrói estado aplicando eventos (puro, sem side effects)
    def apply(self, event) -> None:
        match type(event).__name__:
            case "AccountOpened":
                self.id      = event.account_id
                self.owner   = event.owner_name
                self.balance = event.initial_balance
            case "MoneyDeposited":
                self.balance += event.amount
            case "MoneyWithdrawn":
                self.balance -= event.amount
            case "AccountSuspended":
                self.suspended = True

    # Comandos — validam e geram novos eventos
    def deposit(self, amount: Decimal, description: str) -> None:
        if self.suspended:
            raise ValueError("Conta suspensa")
        if amount <= 0:
            raise ValueError("Valor deve ser positivo")
        event = MoneyDeposited(self.id, amount, description)
        self.apply(event)
        self._uncommitted.append(event)

    def withdraw(self, amount: Decimal, description: str) -> None:
        if self.suspended:
            raise ValueError("Conta suspensa")
        if amount > self.balance:
            raise ValueError(f"Saldo insuficiente: {self.balance}")
        event = MoneyWithdrawn(self.id, amount, description)
        self.apply(event)
        self._uncommitted.append(event)

    def pull_events(self) -> list:
        events = self._uncommitted.copy()
        self._uncommitted.clear()
        return events

    @classmethod
    def rebuild_from_events(cls, events: list) -> "BankAccount":
        """Reconstrói o estado atual a partir do histórico de eventos"""
        account = cls()
        for event in events:
            account.apply(event)
        return account

# ─── Event Store (persiste eventos) ──────────────────────────────────────────

class InMemoryEventStore:
    def __init__(self):
        self._streams: dict[str, list] = {}

    def append(self, stream_id: str, events: list) -> None:
        self._streams.setdefault(stream_id, []).extend(events)

    def load(self, stream_id: str) -> list:
        return self._streams.get(stream_id, [])

# Demonstração
store   = InMemoryEventStore()
account = BankAccount()
account.apply(AccountOpened("acc-1", "Ana Silva", Decimal("1000")))
store.append("acc-1", [AccountOpened("acc-1", "Ana Silva", Decimal("1000"))])

account.deposit(Decimal("500"), "Salário")
account.withdraw(Decimal("200"), "Aluguel")
store.append("acc-1", account.pull_events())

# Reconstruir estado do zero a partir dos eventos
eventos_salvos = store.load("acc-1")
conta_reconstruida = BankAccount.rebuild_from_events(eventos_salvos)
print(f"Saldo: R$ {conta_reconstruida.balance}")  # R$ 1300.00
print(f"Histórico: {len(eventos_salvos)} eventos")`,
            explanation: 'Event Sourcing armazena APENAS eventos. O estado atual é derivado fazendo replay. Isso dá auditoria 100% gratuita (você sabe exatamente o que aconteceu e quando), possibilidade de "time travel" (reconstruir estado de qualquer momento), e base para múltiplas projeções.'
          },
          {
            title: 'Projeções — múltiplas visões dos mesmos eventos',
            code: `# O mesmo stream de eventos alimenta múltiplas projeções (read models)

class BalanceProjection:
    """Projeção: saldo atual por conta"""
    def __init__(self):
        self._balances: dict[str, Decimal] = {}

    def project(self, event) -> None:
        match type(event).__name__:
            case "AccountOpened":
                self._balances[event.account_id] = event.initial_balance
            case "MoneyDeposited":
                self._balances[event.account_id] += event.amount
            case "MoneyWithdrawn":
                self._balances[event.account_id] -= event.amount

    def get_balance(self, account_id: str) -> Decimal:
        return self._balances.get(account_id, Decimal("0"))

class TransactionHistoryProjection:
    """Projeção: histórico de transações para extrato"""
    def __init__(self):
        self._transactions: dict[str, list] = {}

    def project(self, event) -> None:
        match type(event).__name__:
            case "MoneyDeposited" | "MoneyWithdrawn":
                tipo = "+" if "Deposited" in type(event).__name__ else "-"
                self._transactions.setdefault(event.account_id, []).append({
                    "tipo":        tipo,
                    "valor":       event.amount,
                    "descricao":   event.description,
                    "data":        event.occurred_at.strftime("%d/%m/%Y %H:%M")
                })

    def get_history(self, account_id: str) -> list:
        return self._transactions.get(account_id, [])

class SuspendedAccountsProjection:
    """Projeção: contas suspensas para compliance"""
    def __init__(self):
        self._suspended: dict[str, str] = {}

    def project(self, event) -> None:
        if type(event).__name__ == "AccountSuspended":
            self._suspended[event.account_id] = event.reason

    def is_suspended(self, account_id: str) -> bool:
        return account_id in self._suspended

# Replay de todos os eventos em todas as projeções
eventos = store.load("acc-1")
balance_proj  = BalanceProjection()
history_proj  = TransactionHistoryProjection()
suspend_proj  = SuspendedAccountsProjection()

for event in eventos:
    balance_proj.project(event)
    history_proj.project(event)
    suspend_proj.project(event)

print(f"Saldo: R$ {balance_proj.get_balance('acc-1')}")
print(f"Extrato: {history_proj.get_history('acc-1')}")

# Se encontrar um bug na projeção, basta corrigir e fazer replay dos eventos!
# Os dados originais (eventos) nunca são apagados`,
            explanation: 'Cada projeção é uma visão diferente dos mesmos eventos. Se uma projeção tiver bug, basta corrigir e refazer o replay — os eventos originais são imutáveis. Isso é impossível com banco tradicional (se você sobrescreveu, perdeu o histórico).'
          }
        ],
        quiz: [
          {
            q: 'No CQRS, qual é a diferença entre Command e Query?',
            options: ['Command é mais rápido que Query', 'Command muda estado (sem retorno de dados); Query retorna dados (sem mudar estado)', 'Command usa SQL; Query usa NoSQL', 'São sinônimos modernos para POST e GET'],
            answer: 1,
            explanation: 'Command Responsibility: CreateOrder, CancelOrder — mudam estado, não retornam dados. Query Responsibility: GetOrder, ListOrders — retornam dados, nunca mudam estado. Separar esses modelos permite otimizá-los independentemente.'
          },
          {
            q: 'O que é "reconstruir estado" em Event Sourcing?',
            options: ['Restaurar backup do banco de dados', 'Fazer replay de todos os eventos em ordem para obter o estado atual', 'Buscar o último snapshot salvo', 'Sincronizar múltiplos bancos de dados'],
            answer: 1,
            explanation: 'Em Event Sourcing não existe estado salvo diretamente. O estado atual = AccountOpened + MoneyDeposited + MoneyWithdrawn + ... aplicados em sequência. rebuild_from_events() itera todos os eventos e aplica um por um.'
          },
          {
            q: 'Qual é a grande vantagem do Event Sourcing sobre bancos relacionais tradicionais?',
            options: ['É mais rápido para qualquer tipo de consulta', 'Auditoria 100% gratuita, histórico completo e possibilidade de reconstruir qualquer estado passado', 'Usa menos espaço em disco', 'É mais simples de implementar'],
            answer: 1,
            explanation: 'Com banco tradicional, ao atualizar um registro, o valor anterior é perdido. Com Event Sourcing, cada evento é imutável — você sempre sabe o que aconteceu, quando, e pode reconstruir o estado de qualquer momento do passado.'
          },
          {
            q: 'O que é uma "projeção" no contexto de Event Sourcing?',
            options: ['Uma estimativa de custo de infraestrutura', 'Uma visão derivada dos eventos, otimizada para um caso de uso específico de leitura', 'Um índice de banco de dados', 'Uma cópia de segurança dos dados'],
            answer: 1,
            explanation: 'Projeção = read model construído a partir dos eventos. BalanceProjection para saldo, TransactionHistoryProjection para extrato. Se uma projeção tiver bug, corrija e refaça o replay — os eventos originais são imutáveis e ficam intactos.'
          },
          {
            q: 'Por que CQRS permite escalar leitura e escrita independentemente?',
            options: ['Porque usa dois bancos de dados obrigatoriamente', 'Porque leitura e escrita têm modelos separados que podem ser implantados, otimizados e escalados de forma independente', 'Porque CQRS usa cache automático', 'Porque elimina a necessidade de índices'],
            answer: 1,
            explanation: 'O modelo de escrita pode ser um banco relacional normalizado para integridade. O modelo de leitura pode ser Elasticsearch para busca, Redis para cache, ou views desnormalizadas para performance. Cada lado escala conforme a demanda — independentemente.'
          }
        ]
      }
    },

    {
      id: 'arq-system-design',
      title: 'System Design — Fundamentos',
      xp: 35,
      lesson: {
        title: 'System Design — Como Escalar Sistemas para Milhões de Usuários',
        theory: `System Design é pedido em toda entrevista de engenheiro Senior/Staff. Você precisa projetar sistemas que aguentem carga real.

<strong>Problemas de escala:</strong>
• 1 servidor aguenta ~1.000 req/s
• 1M usuários = ~1.000 req/s em pico
• 100M usuários = ~100.000 req/s
• Twitter: 500M tweets/dia = ~6.000 tweets/s

<strong>Estratégias fundamentais:</strong>
• <strong>Escala vertical</strong> — servidor maior (limite físico e $$$)
• <strong>Escala horizontal</strong> — mais servidores + load balancer
• <strong>Cache</strong> — evitar recomputar (Redis, CDN)
• <strong>Banco de dados</strong> — sharding, replicação, tipo certo
• <strong>Message Queue</strong> — desacoplar e absorver picos
• <strong>CDN</strong> — assets estáticos perto do usuário`,
        examples: [
          {
            title: 'Estratégias de cache — Cache-Aside, Write-Through e TTL',
            code: `import redis
import json
from functools import wraps
from typing import Any, Callable
import hashlib

# ─── Padrão Cache-Aside (Lazy Loading) — mais comum ─────────────────────────
# 1. Verifica cache → 2. Se miss, busca DB → 3. Salva no cache → 4. Retorna

class ProductService:
    def __init__(self, db, cache: redis.Redis):
        self._db    = db
        self._cache = cache

    def get_product(self, product_id: str) -> dict | None:
        cache_key = f"product:{product_id}"

        # 1. Tenta cache primeiro
        cached = self._cache.get(cache_key)
        if cached:
            return json.loads(cached)      # cache HIT

        # 2. Cache miss — busca no banco
        product = self._db.find_product(product_id)
        if not product:
            return None

        # 3. Salva no cache (TTL = 1 hora)
        self._cache.setex(cache_key, 3600, json.dumps(product))
        return product                     # cache MISS → DB

    def update_product(self, product_id: str, data: dict) -> dict:
        updated = self._db.update_product(product_id, data)
        # Invalidar cache após update (cache-aside pattern)
        self._cache.delete(f"product:{product_id}")
        return updated

# ─── Decorator para cachear qualquer função ──────────────────────────────────

def cached(ttl: int = 300, prefix: str = ""):
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs):
            # Gerar chave única baseada nos argumentos
            key_data = f"{prefix}:{func.__name__}:{args}:{sorted(kwargs.items())}"
            cache_key = hashlib.md5(key_data.encode()).hexdigest()

            result = _cache.get(cache_key)
            if result:
                return json.loads(result)

            result = func(*args, **kwargs)
            _cache.setex(cache_key, ttl, json.dumps(result))
            return result
        return wrapper
    return decorator

# Estratégias de cache — quando usar cada uma:
#
# Cache-Aside (Lazy): App controla o cache. Dados lidos com frequência.
#   + Resiliente: se Redis cair, app busca do DB
#   - Cache miss na primeira leitura (cold start)
#
# Write-Through: Escreve em cache E DB simultaneamente.
#   + Dados sempre atualizados no cache
#   - Latência maior no write
#
# Write-Behind (Write-Back): Escreve no cache, DB depois (assíncrono).
#   + Muito rápido para writes
#   - Risco de perda de dados se cache cair antes de persistir
#
# Read-Through: Cache busca no DB automaticamente no miss.
#   + Código da app mais simples
#   - Depende do suporte do cache (Redis não faz isso nativamente)

print("Estratégias de cache documentadas e exemplificadas!")`,
            explanation: 'Cache-Aside é o padrão mais seguro e mais comum. Regra de ouro: dados que mudam raramente e são lidos com frequência são os melhores candidatos ao cache. Nunca cache dados por tempo indefinido em produção — sempre use TTL.'
          },
          {
            title: 'Escolher o banco de dados certo — framework de decisão',
            code: `# Framework para escolha de banco de dados — pergunte-se:
#
# 1. Qual o padrão de acesso? (leitura intensa, escrita intensa, misto)
# 2. Os dados têm schema fixo ou flexível?
# 3. Precisa de ACID (transações)?
# 4. Qual o volume? (GB, TB, PB)
# 5. Que tipo de query? (relacional, texto, geoespacial, grafo)

DECISION_MATRIX = {
    "PostgreSQL / MySQL": {
        "use_when": [
            "Dados relacionais com integridade referencial",
            "Transações ACID obrigatórias (financeiro, e-commerce)",
            "Queries complexas com JOINs",
            "Schema bem definido e estável"
        ],
        "examples": ["Users, Orders, Payments", "Qualquer sistema transacional"],
        "limit": "Sharding manual é complexo acima de ~10TB"
    },
    "MongoDB": {
        "use_when": [
            "Documentos com schema variável (catálogos, configs)",
            "Dados hierárquicos (embedded documents)",
            "Iteração rápida (schema evolui com frequência)",
            "Scale horizontal nativo (sharding automático)"
        ],
        "examples": ["Catálogo de produtos", "Perfis de usuário", "Logs estruturados"],
        "limit": "Transações multi-documento são possíveis mas complexas"
    },
    "Redis": {
        "use_when": [
            "Cache (sessões, resultados de queries)",
            "Contadores e rankings (INCR, ZADD)",
            "Pub/Sub e filas (leve)",
            "Dados temporários com TTL",
            "Rate limiting"
        ],
        "examples": ["Session store", "Leaderboard de jogos", "Cache de API"],
        "limit": "Dados ficam em memória — custo por GB é alto"
    },
    "Elasticsearch": {
        "use_when": [
            "Busca full-text (produtos, artigos, logs)",
            "Análise de logs em tempo real (ELK Stack)",
            "Queries complexas de texto (stemming, fuzzy, relevância)"
        ],
        "examples": ["Busca de produtos", "Análise de logs", "Autocomplete"],
        "limit": "Não é source of truth — use como índice secundário"
    },
    "Apache Cassandra": {
        "use_when": [
            "Altíssimo volume de writes (IoT, métricas, eventos)",
            "Dados de séries temporais",
            "Escala para petabytes com disponibilidade 99.999%",
            "Queries sempre pelo partition key"
        ],
        "examples": ["Métricas de sensores IoT", "Histórico de atividade"],
        "limit": "Sem JOINs, sem transações — modelo orientado a queries"
    },
    "S3 / Object Storage": {
        "use_when": [
            "Arquivos: imagens, vídeos, PDFs, backups",
            "Data lake (arquivos Parquet, CSV para análise)",
            "Assets estáticos servidos via CDN"
        ],
        "examples": ["Fotos de perfil", "Uploads de usuários", "Relatórios PDF"],
        "limit": "Não é banco de dados — sem queries, sem índices"
    }
}

for banco, info in DECISION_MATRIX.items():
    print(f"\\n{'='*50}")
    print(f"✅ {banco}")
    print(f"   Usar quando: {info['use_when'][0]}")
    print(f"   Exemplos: {', '.join(info['examples'])}")`,
            explanation: 'Em entrevistas de System Design, a pergunta sobre banco de dados é sempre armadilha. A resposta correta é "depende do padrão de acesso". Um sistema real usa múltiplos bancos: PostgreSQL para dados transacionais, Redis para cache, Elasticsearch para busca, S3 para arquivos.'
          },
          {
            title: 'Projetar um URL Shortener — entrevista clássica passo a passo',
            code: `"""
System Design: URL Shortener (estilo bit.ly, tinyurl)
Pergunta: "Projete um sistema que encurta URLs"

PASSO 1 — Requisitos funcionais:
- POST /shorten {url} → {short_code}
- GET /{code} → redirect 301/302 para URL original
- Analytics: quantos cliques por link

PASSO 2 — Estimativas (Back-of-envelope):
- 100M URLs novas por dia = ~1.200/s
- Leitura/escrita ratio: 100:1 → 120.000 redirects/s
- 5 anos × 100M/dia = 182.5 bilhões de URLs
- Cada registro ~500 bytes → ~91 TB de dados

PASSO 3 — API Design:
POST /api/shorten
  Request:  { "url": "https://exemplo.com/pagina-muito-longa" }
  Response: { "short_url": "https://bit.ly/abc123", "code": "abc123" }

GET /{code}
  Response: 301 Redirect → URL original

PASSO 4 — Geração do código curto:
"""

import hashlib
import base64
import string
import random

# Abordagem 1: Hash MD5 + primeiros 7 chars
def hash_url(long_url: str) -> str:
    md5 = hashlib.md5(long_url.encode()).hexdigest()
    # Base62 encode dos primeiros bytes
    chars = string.ascii_letters + string.digits  # 62 chars
    hash_bytes = bytes.fromhex(md5[:8])
    num = int.from_bytes(hash_bytes, "big")
    result = []
    while num and len(result) < 7:
        result.append(chars[num % 62])
        num //= 62
    return "".join(reversed(result))

# Abordagem 2: Auto-increment ID + Base62 (sem colisão)
def id_to_base62(num: int) -> str:
    chars = string.ascii_letters + string.digits
    result = []
    while num:
        result.append(chars[num % 62])
        num //= 62
    return "".join(reversed(result)) or "0"

# PASSO 5 — Arquitetura do sistema:
ARCHITECTURE = """
Client
  │
  ▼
[Load Balancer] (NGINX / AWS ALB)
  │
  ├─► [App Servers] × N (stateless, escala horizontal)
  │         │
  │    ┌────┴────────────────────────────┐
  │    │                                 │
  │    ▼                                 ▼
  │  [Redis Cache]              [PostgreSQL Primary]
  │  TTL: 24h para hot URLs     Escrita de novas URLs
  │                                      │
  │                             [PostgreSQL Replicas] ×N
  │                             Leitura de redirects
  │
  └─► [Analytics Service] (async, via Kafka)
        │
        ▼
     [ClickHouse / BigQuery]
     Análise de cliques em tempo real
"""

# PASSO 6 — Fluxo de redirect otimizado:
REDIRECT_FLOW = """
GET /abc123
1. App busca "abc123" no Redis (< 1ms)
2. Cache HIT? → Redirect 301 (cached no browser)
3. Cache MISS? → Busca no PostgreSQL Read Replica
4. Salva no Redis (TTL 24h)
5. Async: publica evento de clique no Kafka
6. Redirect 302 (não cache no browser — para analytics)
"""
print(ARCHITECTURE)
print(REDIRECT_FLOW)
print(f"Exemplo de código: {hash_url('https://google.com/very/long/url')}")
print(f"ID para Base62: {id_to_base62(1000000)}")`,
            explanation: 'Em entrevistas, sempre siga: Requisitos → Estimativas → API → Modelo de dados → Componentes → Bottlenecks → Escala. URL Shortener é pedido em ~30% das entrevistas Senior. O ponto crítico é: GET tem 100x mais tráfego que POST — otimize a leitura com cache agressivo.'
          }
        ],
        quiz: [
          {
            q: 'Qual é a diferença entre escalabilidade vertical e horizontal?',
            options: ['Vertical = mais servidores; Horizontal = servidor maior', 'Vertical = servidor maior (mais CPU/RAM); Horizontal = mais servidores em paralelo com load balancer', 'São sinônimos para o mesmo conceito', 'Vertical é para banco; Horizontal é para aplicação'],
            answer: 1,
            explanation: 'Vertical (scale up): troca servidor por um maior. Tem limite físico e custo exponencial. Horizontal (scale out): adiciona mais servidores menores. Requer que a aplicação seja stateless. A maioria dos sistemas modernos usa horizontal + load balancer.'
          },
          {
            q: 'Quando usar Redis em vez de PostgreSQL?',
            options: ['Quando precisar de transações ACID', 'Para dados temporários, cache, sessões e operações de alta velocidade que cabem em memória', 'Para dados relacionais com JOINs complexos', 'Quando o volume de dados excede 1TB'],
            answer: 1,
            explanation: 'Redis é armazenamento em memória — muito rápido (<1ms) mas caro por GB. Use para: cache de queries lentas, sessions, contadores, rate limiting, leaderboards. PostgreSQL é o source of truth; Redis é o acelerador.'
          },
          {
            q: 'Por que usar 302 em vez de 301 para redirects em um URL shortener com analytics?',
            options: ['302 é mais rápido que 301', '301 é cached pelo browser permanentemente — cliques futuros não passam pelo servidor, perdendo dados de analytics', '302 é o único status code para redirect', '301 não funciona em mobile'],
            answer: 1,
            explanation: '301 Permanent Redirect: o browser cacheia e não faz mais request no servidor. Perfeito para performance, mas destrói analytics. 302 Temporary Redirect: o browser sempre volta ao servidor, permitindo contar cliques. Escolha baseada no requisito de negócio.'
          },
          {
            q: 'O que é o padrão Cache-Aside (Lazy Loading)?',
            options: ['O banco escreve no cache automaticamente', 'A aplicação busca no cache; se miss, busca no banco e preenche o cache manualmente', 'O cache sincroniza com o banco em tempo real', 'O cache é preenchido na inicialização do sistema'],
            answer: 1,
            explanation: 'Cache-Aside: 1) busca no cache, 2) cache hit → retorna, 3) cache miss → busca no banco, 4) salva no cache com TTL. É o padrão mais resiliente: se Redis cair, a aplicação funciona com degradação graceful.'
          },
          {
            q: 'Em uma estimativa back-of-envelope para System Design, 1M usuários gerando 1 ação por hora equivale a aproximadamente:',
            options: ['1M req/s', '~280 req/s', '~10.000 req/s', '1 req/s'],
            answer: 1,
            explanation: '1M ações/hora ÷ 3600 segundos ≈ 278 req/s ≈ 300 req/s. Back-of-envelope: divida por 3600 para hourly→per second, por 86400 para daily→per second. Um servidor padrão aguenta ~1.000-10.000 req/s dependendo da complexidade.'
          }
        ]
      }
    },

    {
      id: 'arq-observabilidade',
      title: 'Observabilidade — Logs, Métricas e Traces',
      xp: 25,
      lesson: {
        title: 'Observabilidade — Entender sistemas em produção',
        theory: `Observabilidade é a capacidade de entender o estado interno de um sistema a partir de suas saídas externas. Em produção, você não pode "depurar" — precisa observar.

<strong>Os 3 pilares (The Three Pillars of Observability):</strong>
• <strong>Logs</strong> — O que aconteceu? Eventos discretos com contexto. Texto ou JSON.
• <strong>Métricas</strong> — Quanto / quão rápido? Números ao longo do tempo.
• <strong>Traces</strong> — Como longo levou cada etapa? Rastreio distribuído de requests.

<strong>Ferramentas comuns:</strong>
• Logs: ELK Stack (Elasticsearch + Logstash + Kibana), Grafana Loki
• Métricas: Prometheus + Grafana, Datadog, CloudWatch
• Traces: Jaeger, Zipkin, AWS X-Ray
• Tudo junto: OpenTelemetry (padrão aberto)`,
        examples: [
          {
            title: 'Structured Logging — logs que máquinas e humanos entendem',
            code: `import logging
import json
import uuid
from datetime import datetime
from contextvars import ContextVar
from functools import wraps

# ─── Correlation ID — rastrear request do início ao fim ─────────────────────
correlation_id_var: ContextVar[str] = ContextVar("correlation_id", default="")

def get_correlation_id() -> str:
    return correlation_id_var.get() or str(uuid.uuid4())

# ─── Formatter JSON — structured logging ─────────────────────────────────────

class JSONFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        log_entry = {
            "timestamp":      datetime.utcnow().isoformat() + "Z",
            "level":          record.levelname,
            "service":        "order-service",
            "version":        "1.2.3",
            "correlation_id": get_correlation_id(),
            "logger":         record.name,
            "message":        record.getMessage(),
        }
        # Adicionar campos extras se existirem
        if hasattr(record, "extra"):
            log_entry.update(record.extra)
        # Adicionar exceção se houver
        if record.exc_info:
            log_entry["exception"] = self.formatException(record.exc_info)
        return json.dumps(log_entry, ensure_ascii=False)

# Setup
logger = logging.getLogger("order-service")
handler = logging.StreamHandler()
handler.setFormatter(JSONFormatter())
logger.addHandler(handler)
logger.setLevel(logging.INFO)

# ─── Middleware FastAPI — correlation ID por request ─────────────────────────
# (Em produção, isso vai num middleware real)

def with_correlation_id(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        cid = str(uuid.uuid4())
        correlation_id_var.set(cid)
        return func(*args, **kwargs)
    return wrapper

# ─── Uso correto de levels ────────────────────────────────────────────────────

def process_order(order_id: str, customer_id: str):
    # INFO — eventos normais de negócio
    logger.info("Processando pedido", extra={"extra": {
        "order_id": order_id, "customer_id": customer_id, "action": "order.process"
    }})

    try:
        # ... lógica ...
        total = 4500.0
        # WARNING — algo inesperado mas recuperável
        if total > 10000:
            logger.warning("Pedido de alto valor requer aprovação manual", extra={"extra": {
                "order_id": order_id, "total": total, "action": "order.high_value_alert"
            }})

        logger.info("Pedido processado com sucesso", extra={"extra": {
            "order_id": order_id, "total": total, "duration_ms": 45
        }})

    except Exception as e:
        # ERROR — falha que precisa de atenção
        logger.error("Falha ao processar pedido", exc_info=True, extra={"extra": {
            "order_id": order_id, "error_type": type(e).__name__
        }})
        raise

# O QUE NUNCA LOGAR:
NEVER_LOG = [
    "Senhas e tokens (password, token, secret, api_key)",
    "Dados de cartão de crédito (PCI DSS)",
    "CPF, RG, dados pessoais sensíveis (LGPD/GDPR)",
    "Chaves de criptografia",
    "Dados completos de requisições em produção (pode ter PII)"
]`,
            explanation: 'Structured logging (JSON) é indexável e pesquisável. correlation_id rastreia uma request por todo o sistema. Nunca use print() em produção. Use sempre levels corretos: DEBUG para desenvolvimento, INFO para eventos de negócio, WARNING para anomalias, ERROR para falhas.'
          },
          {
            title: 'Métricas com Prometheus — RED e USE método',
            code: `# RED Method (para Services): Rate, Errors, Duration
# USE Method (para Resources): Utilization, Saturation, Errors

from prometheus_client import Counter, Histogram, Gauge, start_http_server
import time
import random

# ─── Métricas RED para uma API ────────────────────────────────────────────────

# Rate — requisições por segundo
http_requests_total = Counter(
    "http_requests_total",
    "Total de requisições HTTP",
    labelnames=["method", "endpoint", "status_code"]
)

# Errors — taxa de erro (extraída do Counter acima filtrando 5xx)

# Duration — latência por endpoint
http_request_duration_seconds = Histogram(
    "http_request_duration_seconds",
    "Duração das requisições HTTP em segundos",
    labelnames=["method", "endpoint"],
    buckets=[0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1.0, 2.5, 5.0]
)

# ─── Métricas de negócio customizadas ────────────────────────────────────────

orders_created_total = Counter(
    "orders_created_total",
    "Total de pedidos criados",
    labelnames=["channel", "payment_method"]
)

order_value = Histogram(
    "order_value_brl",
    "Valor dos pedidos em BRL",
    buckets=[100, 500, 1000, 5000, 10000, 50000]
)

active_sessions = Gauge(
    "active_sessions",
    "Sessões de usuário ativas no momento"
)

queue_depth = Gauge(
    "processing_queue_depth",
    "Itens na fila de processamento",
    labelnames=["queue_name"]
)

# ─── Decorator para instrumentar endpoints ───────────────────────────────────

def track_request(endpoint: str):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            method = "GET"
            start  = time.time()
            status = "200"
            try:
                result = func(*args, **kwargs)
                return result
            except Exception as e:
                status = "500"
                raise
            finally:
                duration = time.time() - start
                http_requests_total.labels(method, endpoint, status).inc()
                http_request_duration_seconds.labels(method, endpoint).observe(duration)
        return wrapper
    return decorator

# ─── SLI, SLO e SLA — o que cada um significa ────────────────────────────────
SLO_EXAMPLES = {
    "SLI (Indicador)":    "99.2% das requests retornam em < 200ms (medido pelo Prometheus)",
    "SLO (Objetivo)":     "99.5% das requests em < 200ms (meta interna)",
    "SLA (Acordo)":       "99% das requests em < 500ms (contrato com cliente + penalidade)",
    "Error Budget":       "0.5% de requests podem falhar por mês antes de violar o SLO",
}
for term, definition in SLO_EXAMPLES.items():
    print(f"{term}: {definition}")`,
            explanation: 'RED Method: Rate (req/s), Errors (%), Duration (p99 latency). USE Method: Utilization (CPU%), Saturation (queue depth), Errors. Defina SLOs antes de ir para produção — sem objetivo, você não sabe quando está com problema.'
          },
          {
            title: 'Distributed Tracing — rastrear request entre microservices',
            code: `# Conceitos de Distributed Tracing com OpenTelemetry

"""
Distributed Tracing — Glossário:

TRACE: Representa a jornada completa de uma request.
       Composto por um ou mais Spans.
       Identificado por TraceId (único globalmente).

SPAN: Representa uma operação dentro do trace.
      Tem: SpanId, TraceId pai, nome, start/end time, atributos.
      Exemplo: "HTTP GET /orders", "DB SELECT", "Redis GET"

CONTEXT PROPAGATION: O TraceId viaja nos headers HTTP
      entre microservices para conectar todos os spans.
      Header padrão: traceparent: 00-{traceId}-{spanId}-01

WATERFALL: Visualização em Jaeger/Zipkin mostrando spans
      em cascata — facilita identificar o gargalo.
"""

from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import ConsoleSpanExporter, SimpleSpanProcessor

# Setup (em produção, exporta para Jaeger ou Tempo)
provider = TracerProvider()
provider.add_span_processor(SimpleSpanProcessor(ConsoleSpanExporter()))
trace.set_tracer_provider(provider)

tracer = trace.get_tracer("order-service")

# ─── Instrumentar código com spans ───────────────────────────────────────────

def get_order(order_id: str) -> dict:
    with tracer.start_as_current_span("get_order") as span:
        span.set_attribute("order.id", order_id)
        span.set_attribute("service.name", "order-service")

        order = fetch_from_cache(order_id)
        if not order:
            order = fetch_from_db(order_id)

        span.set_attribute("order.found", order is not None)
        return order

def fetch_from_cache(order_id: str) -> dict | None:
    with tracer.start_as_current_span("redis.get") as span:
        span.set_attribute("db.system", "redis")
        span.set_attribute("db.operation", "GET")
        span.set_attribute("cache.key", f"order:{order_id}")
        # simular cache miss
        return None

def fetch_from_db(order_id: str) -> dict:
    with tracer.start_as_current_span("postgresql.query") as span:
        span.set_attribute("db.system", "postgresql")
        span.set_attribute("db.statement", "SELECT * FROM orders WHERE id = $1")
        span.set_attribute("db.operation", "SELECT")
        return {"id": order_id, "status": "confirmed", "total": 4500.0}

# ─── O que você vê no Jaeger UI ──────────────────────────────────────────────
TRACE_WATERFALL = """
Trace: abc123 — GET /orders/ord-1 — Total: 45ms
├── [order-service] get_order                    0ms → 45ms (45ms)
│   ├── [order-service] redis.get                1ms → 3ms  (2ms)  ← cache miss
│   └── [order-service] postgresql.query         5ms → 43ms (38ms) ← GARGALO aqui!
│
Trace: def456 — POST /payments — Total: 320ms
├── [payment-service] process_payment            0ms → 320ms
│   ├── [payment-service] validate_card         10ms → 25ms
│   ├── [payment-service] charge_gateway        30ms → 300ms ← lento! problema externo
│   └── [order-service]   update_order_status  305ms → 315ms
"""
print(TRACE_WATERFALL)`,
            explanation: 'Distributed tracing é impossível sem ferramentas — você não consegue debugar manualmente requests que passam por 5 microservices. O waterfall do Jaeger mostra imediatamente onde está o gargalo. OpenTelemetry é o padrão aberto — não depende de vendor.'
          }
        ],
        quiz: [
          {
            q: 'Qual é o Método RED para monitorar serviços?',
            options: ['Reliability, Efficiency, Durability', 'Rate (req/s), Errors (%), Duration (latência)', 'Response, Errors, Downtime', 'Requests, Events, Data'],
            answer: 1,
            explanation: 'RED Method: Rate (quantas requests por segundo), Errors (qual % falha), Duration (quanto tempo cada request leva — foque no p99, não na média). Essas 3 métricas cobrem a saúde de qualquer serviço HTTP.'
          },
          {
            q: 'O que é um "TraceId" no contexto de distributed tracing?',
            options: ['O ID do servidor que processou a request', 'Um identificador único que conecta todos os spans de uma única request através de múltiplos serviços', 'O número de versão do serviço', 'Um hash do corpo da request HTTP'],
            answer: 1,
            explanation: 'TraceId é gerado no primeiro serviço e propagado via headers HTTP (traceparent) para todos os serviços subsequentes. Isso permite que o Jaeger/Zipkin conecte todos os spans em uma árvore e mostre o waterfall completo.'
          },
          {
            q: 'Qual a diferença entre SLI, SLO e SLA?',
            options: ['São sinônimos para "disponibilidade do sistema"', 'SLI é o que se mede; SLO é a meta interna; SLA é o contrato com cliente (com penalidades)', 'SLI é para infra; SLO para apps; SLA para banco de dados', 'SLA é mais técnico que SLI'],
            answer: 1,
            explanation: 'SLI (indicador medido): "99.2% das requests < 200ms". SLO (objetivo interno): "meta de 99.5%". SLA (acordo externo): "99% garantido ao cliente, com reembolso se violar". Error Budget = diferença entre o que você pode perder antes de violar o SLO.'
          },
          {
            q: 'Por que nunca logar senhas e tokens mesmo em modo DEBUG?',
            options: ['Porque ocupam muito espaço em disco', 'Logs são armazenados e acessados por múltiplas pessoas — exposição cria vulnerabilidade de segurança permanente', 'Porque o formatter JSON não suporta', 'Apenas por convenção de estilo'],
            answer: 1,
            explanation: 'Logs vão para Elasticsearch, S3, Splunk — acessíveis por times de infra, segurança, auditoria. Um token logado é um token comprometido. Dados pessoais em logs violam LGPD/GDPR. Filtre SEMPRE antes de logar: [REDACTED], ***.'
          },
          {
            q: 'O que o "waterfall" do Jaeger/Zipkin mostra?',
            options: ['O uso de memória ao longo do tempo', 'Os spans de uma trace em cascata, mostrando duração e ordem — facilita identificar o gargalo de uma request', 'O número de requisições por segundo', 'Os logs estruturados de um serviço'],
            answer: 1,
            explanation: 'O waterfall mostra visualmente cada etapa de uma request: ordem temporal, duração de cada span, relação pai-filho entre spans. Imediatamente você vê qual serviço ou operação (DB? Cache? API externa?) está causando lentidão.'
          }
        ]
      }
    }
  ]
};
