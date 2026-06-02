// python-pro.js — Nível Profissional: APIs, Web Scraping, Dashboards, Automação
window.PYTHON_PRO = [
  {
    id: 'py-apis-requests',
    title: 'APIs REST com Python',
    xp: 20,
    lesson: {
      title: 'Consumir APIs REST — Coleta de Dados do Mundo Real',
      theory: `APIs REST são a principal fonte de dados em empresas modernas: dados de vendas, redes sociais, clima, finanças, geolocalização. Todo analista e desenvolvedor precisa saber consumir APIs.

A biblioteca <code>requests</code> é o padrão do mercado para fazer chamadas HTTP em Python.

Conceitos essenciais:
• <strong>GET</strong> — buscar dados  • <strong>POST</strong> — enviar dados
• <strong>Headers</strong> — autenticação, content-type
• <strong>Params</strong> — filtros na URL (?page=1&limit=10)
• <strong>JSON response</strong> — resultado vira dict/list automaticamente
• <strong>Status codes</strong> — 200 OK, 401 Unauthorized, 404 Not Found, 429 Rate Limited`,
      examples: [
        {
          title: 'GET, autenticação e paginação — padrão real de mercado',
          code: `import requests
import pandas as pd
from time import sleep

# --- GET simples ---
BASE_URL = "https://jsonplaceholder.typicode.com"  # API pública para testes

resposta = requests.get(f"{BASE_URL}/users")
resposta.raise_for_status()  # levanta HTTPError se status >= 400

dados = resposta.json()       # dict/list automaticamente
print(f"Status: {resposta.status_code}")
print(f"Usuários encontrados: {len(dados)}")
print(dados[0]["name"], dados[0]["email"])

# --- GET com parâmetros (filtros na URL) ---
params = {"userId": 1, "_limit": 5}
posts = requests.get(f"{BASE_URL}/posts", params=params).json()
print(f"\nPosts do usuário 1: {len(posts)}")

# --- Autenticação com API Key (padrão mais comum) ---
headers = {
    "Authorization": "Bearer SEU_TOKEN_AQUI",  # Token JWT
    "Content-Type": "application/json",
    "X-API-Key": "sua-chave-aqui"              # Alguns usam header customizado
}
# resposta = requests.get(url, headers=headers)

# --- Paginação — buscar TODOS os dados ---
def buscar_todos(url, params=None, max_paginas=10):
    """Percorre paginação automática"""
    todos = []
    params = params or {}

    for pagina in range(1, max_paginas + 1):
        params["_page"] = pagina
        params["_limit"] = 10
        resp = requests.get(url, params=params)
        resp.raise_for_status()
        dados = resp.json()
        if not dados:
            break
        todos.extend(dados)
        sleep(0.2)  # rate limiting: não sobrecarregue a API!

    return todos

posts = buscar_todos(f"{BASE_URL}/posts")
df = pd.DataFrame(posts)
print(f"\nTotal de posts: {len(df)}")
print(df[["id", "userId", "title"]].head())`,
          explanation: 'raise_for_status() é obrigatório — sem ele, erros 404/500 passam silenciosamente. sleep() entre requests evita bloqueio por rate limiting. Sempre leia a documentação da API sobre limites de requisição.'
        },
        {
          title: 'POST, tratamento de erros e retry automático',
          code: `import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
import json

# Session com retry automático — padrão para produção
def criar_session(tentativas=3, backoff=1.0):
    session = requests.Session()
    retry = Retry(
        total=tentativas,
        backoff_factor=backoff,          # espera: 1s, 2s, 4s...
        status_forcelist=[429, 500, 502, 503, 504],  # erros para retry
    )
    adapter = HTTPAdapter(max_retries=retry)
    session.mount("http://", adapter)
    session.mount("https://", adapter)
    return session

session = criar_session()

# POST — enviar dados
BASE_URL = "https://jsonplaceholder.typicode.com"
novo_post = {
    "title": "Meu artigo sobre Python",
    "body": "Python é incrível para análise de dados...",
    "userId": 1
}

resp = session.post(f"{BASE_URL}/posts", json=novo_post)
resp.raise_for_status()
criado = resp.json()
print(f"Post criado com id: {criado['id']}")

# Tratamento robusto de erros de API
def chamar_api_seguro(url, **kwargs):
    try:
        resp = session.get(url, timeout=10, **kwargs)
        resp.raise_for_status()
        return resp.json(), None
    except requests.exceptions.Timeout:
        return None, "Timeout — API demorou mais de 10 segundos"
    except requests.exceptions.ConnectionError:
        return None, "Sem conexão com a internet"
    except requests.exceptions.HTTPError as e:
        if e.response.status_code == 401:
            return None, "Não autorizado — verifique o token"
        if e.response.status_code == 429:
            return None, "Rate limit atingido — aguarde antes de tentar novamente"
        return None, f"Erro HTTP {e.response.status_code}"
    except Exception as e:
        return None, f"Erro inesperado: {e}"

dados, erro = chamar_api_seguro(f"{BASE_URL}/posts/1")
if erro:
    print(f"❌ {erro}")
else:
    print(f"✅ {dados['title']}")`,
          explanation: 'Em produção, SEMPRE use Session com retry e timeout. Sem timeout, um request travado pode paralisar o programa indefinidamente. O backoff_factor evita sobrecarregar a API em falhas consecutivas.'
        },
        {
          title: 'Integração API → DataFrame → relatório (pipeline completo)',
          code: `import requests
import pandas as pd
from datetime import datetime

# Pipeline: API pública de ações (exemplo com dados fictícios)
# Na prática: Yahoo Finance, Alpha Vantage, Banco Central, IBGE...

def buscar_dados_api(url, params=None):
    resp = requests.get(url, params=params, timeout=10)
    resp.raise_for_status()
    return resp.json()

# Usando API pública de teste
posts = buscar_dados_api("https://jsonplaceholder.typicode.com/posts")
usuarios = buscar_dados_api("https://jsonplaceholder.typicode.com/users")

# Converter para DataFrame
df_posts    = pd.DataFrame(posts)
df_usuarios = pd.DataFrame(usuarios)[["id", "name", "company"]].rename(
    columns={"id": "userId", "name": "nome_usuario"}
)
df_usuarios["empresa"] = df_usuarios["company"].apply(lambda x: x["name"])
df_usuarios = df_usuarios.drop("company", axis=1)

# Merge (JOIN) — combinar datasets
df = df_posts.merge(df_usuarios, on="userId", how="left")

# Análise
posts_por_usuario = (
    df.groupby("nome_usuario")
    .agg(total_posts=("id", "count"))
    .sort_values("total_posts", ascending=False)
    .reset_index()
)

print("Posts por usuário:")
print(posts_por_usuario.head())

# Salvar relatório
timestamp = datetime.now().strftime("%Y%m%d_%H%M")
posts_por_usuario.to_csv(f"relatorio_api_{timestamp}.csv", index=False)
print(f"\n✅ Relatório salvo!")`,
          explanation: 'O pipeline API → DataFrame → merge → análise → export é o workflow diário de analistas de dados. Aprenda a ler a documentação de APIs públicas (IBGE, Banco Central, OpenWeather) para praticar com dados reais.'
        }
      ],
      quiz: [
        {
          q: 'O que faz resposta.raise_for_status()?',
          options: ['Retorna o status code como inteiro', 'Levanta HTTPError automaticamente se o status code for >= 400', 'Verifica se a resposta é JSON', 'Reinicia a request em caso de erro'],
          answer: 1,
          explanation: 'raise_for_status() é um atalho para verificar erros HTTP. Sem ele, um 404 ou 500 não gera exceção e você processa dados inválidos silenciosamente.'
        },
        {
          q: 'Como passar parâmetros de filtro em uma request GET (?page=1&limit=10)?',
          options: ['requests.get(url + "?page=1&limit=10")', 'requests.get(url, params={"page": 1, "limit": 10})', 'requests.get(url, filters={"page": 1})', 'requests.get(url, query={"page": 1})'],
          answer: 1,
          explanation: 'O parâmetro params=dict monta a query string automaticamente, com URL encoding correto. Montar a URL na mão com f-string pode causar erros com caracteres especiais.'
        },
        {
          q: 'Por que usar requests.Session() em vez de requests.get() direto?',
          options: ['Session é mais rápido para uma única request', 'Session reutiliza conexões TCP, suporta retry automático e mantém headers/cookies para todas as requests', 'Session é obrigatório para requests com autenticação', 'Não há diferença prática'],
          answer: 1,
          explanation: 'Session mantém conexão TCP aberta (connection pooling), o que é muito mais eficiente para múltiplas requests. Também permite configurar retry, timeout e headers globais uma única vez.'
        },
        {
          q: 'Qual status code indica que o limite de requisições da API foi atingido?',
          options: ['401 Unauthorized', '403 Forbidden', '404 Not Found', '429 Too Many Requests'],
          answer: 3,
          explanation: '429 Too Many Requests = rate limit atingido. A resposta geralmente inclui um header Retry-After indicando quantos segundos aguardar. Implemente sleep() ou retry com backoff.'
        },
        {
          q: 'Ao fazer POST para uma API REST com JSON, qual o parâmetro correto do requests?',
          options: ['requests.post(url, data=dict)', 'requests.post(url, json=dict)', 'requests.post(url, body=dict)', 'requests.post(url, payload=dict)'],
          answer: 1,
          explanation: 'json=dict serializa automaticamente para JSON e define Content-Type: application/json. data=dict envia como form-encoded (application/x-www-form-urlencoded), que a maioria das APIs REST não aceita.'
        }
      ]
    }
  },

  {
    id: 'py-webscraping',
    title: 'Web Scraping',
    xp: 25,
    lesson: {
      title: 'Web Scraping com BeautifulSoup e Selenium',
      theory: `Web scraping extrai dados de sites quando não há API disponível. Usos reais:
• Monitorar preços de concorrentes
• Coletar dados de imóveis, vagas de emprego, noticias
• Agregar informações públicas (dados governamentais, portais)

Ferramentas principais:
• <strong>requests + BeautifulSoup</strong> — sites estáticos (HTML gerado pelo servidor)
• <strong>Selenium</strong> — sites dinâmicos (JavaScript que carrega dados após a página)
• <strong>lxml</strong> — parser mais rápido para HTML/XML

⚠️ <strong>Ética e legalidade:</strong> Sempre verifique o robots.txt do site, respeite rate limits, não armazene dados pessoais sem consentimento, e verifique os termos de uso.`,
      examples: [
        {
          title: 'BeautifulSoup — extrair dados de HTML estático',
          code: `from bs4 import BeautifulSoup
import requests

# Simular HTML de uma página de produtos
html = """
<html>
<body>
  <div class="produto" data-id="1">
    <h2 class="nome">Notebook Dell</h2>
    <span class="preco">R$ 4.599,00</span>
    <span class="disponibilidade disponivel">Em estoque</span>
    <div class="specs">
      <li>Intel Core i7</li>
      <li>16GB RAM</li>
      <li>512GB SSD</li>
    </div>
  </div>
  <div class="produto" data-id="2">
    <h2 class="nome">Notebook Lenovo</h2>
    <span class="preco">R$ 3.299,00</span>
    <span class="disponibilidade indisponivel">Fora de estoque</span>
    <div class="specs">
      <li>AMD Ryzen 5</li>
      <li>8GB RAM</li>
      <li>256GB SSD</li>
    </div>
  </div>
</body>
</html>
"""

# Para um site real: html = requests.get(url).text
soup = BeautifulSoup(html, "html.parser")

# Extrair todos os produtos
produtos_extraidos = []
for produto in soup.find_all("div", class_="produto"):
    # Texto de elementos
    nome  = produto.find("h2", class_="nome").text.strip()
    preco = produto.find("span", class_="preco").text.strip()
    disponivel = "disponivel" in produto.find("span", class_="disponibilidade").get("class", [])

    # Atributo data-id
    produto_id = produto.get("data-id")

    # Lista de itens
    specs = [li.text.strip() for li in produto.find_all("li")]

    # Limpar preço → float
    preco_num = float(preco.replace("R$ ", "").replace(".", "").replace(",", "."))

    produtos_extraidos.append({
        "id": produto_id,
        "nome": nome,
        "preco": preco_num,
        "disponivel": disponivel,
        "specs": ", ".join(specs)
    })

import pandas as pd
df = pd.DataFrame(produtos_extraidos)
print(df.to_string())`,
          explanation: 'find() retorna o primeiro match, find_all() retorna lista. .text.strip() pega o texto visível. .get("class") pega atributos HTML. Sempre inspecione o HTML no devtools do browser antes de escrever o scraper.'
        },
        {
          title: 'Scraping robusto — múltiplas páginas com tratamento de erros',
          code: `import requests
from bs4 import BeautifulSoup
import pandas as pd
from time import sleep
from typing import Optional

def extrair_pagina(url: str, session: requests.Session) -> Optional[BeautifulSoup]:
    """Faz request com retry e retorna BeautifulSoup ou None"""
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
        resp = session.get(url, headers=headers, timeout=15)
        resp.raise_for_status()
        return BeautifulSoup(resp.text, "html.parser")
    except requests.exceptions.RequestException as e:
        print(f"❌ Erro na página {url}: {e}")
        return None

def scrape_multiplas_paginas(base_url: str, total_paginas: int = 5):
    """Scrape paginado com controle de rate"""
    session  = requests.Session()
    produtos = []

    for pagina in range(1, total_paginas + 1):
        url  = f"{base_url}?page={pagina}"
        soup = extrair_pagina(url, session)

        if soup is None:
            print(f"Pulando página {pagina}")
            continue

        # Extrair dados (adaptar seletores ao site alvo)
        itens = soup.select(".produto")     # seletor CSS
        for item in itens:
            nome_tag = item.select_one(".nome")
            if not nome_tag:
                continue
            produtos.append({
                "nome":   nome_tag.text.strip(),
                "pagina": pagina
            })

        print(f"✅ Página {pagina}: {len(itens)} itens")
        sleep(1.5)  # IMPORTANTE: respeite o servidor!

    return pd.DataFrame(produtos)

# Seletores CSS úteis:
# soup.select("div.produto")          → <div class="produto">
# soup.select("#resultado")           → id="resultado"
# soup.select("table > tr > td:nth-child(2)")  → segunda coluna da tabela
# soup.select("[data-price]")         → atributo data-price (qualquer valor)
print("Funções de scraping prontas para uso!")`,
          explanation: 'User-Agent evita bloqueios (muitos sites bloqueiam requests sem ele). sleep() é obrigatório — sem espera, você sobrecarrega o servidor e pode ser bloqueado. select() usa seletores CSS, mais flexível que find_all().'
        },
        {
          title: 'Extrair tabelas HTML com Pandas — o mais simples',
          code: `import pandas as pd
import requests

# pd.read_html() extrai TODAS as tabelas de uma página HTML
# É o método mais rápido quando os dados estão em <table>

# Exemplo com tabela pública da Wikipedia
url = "https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)"

try:
    # Isso já faz o request + parsing de todas as tabelas
    tabelas = pd.read_html(url)
    print(f"Tabelas encontradas: {len(tabelas)}")

    # Geralmente a tabela de interesse é a primeira ou segunda
    df = tabelas[1]  # ajuste o índice conforme necessário
    print(df.head())
    print(f"Shape: {df.shape}")

except Exception as e:
    print(f"Não foi possível acessar: {e}")
    # Fallback com HTML local para demonstração
    html = """
    <table>
      <tr><th>País</th><th>PIB (bi USD)</th></tr>
      <tr><td>EUA</td><td>26.949</td></tr>
      <tr><td>China</td><td>17.700</td></tr>
      <tr><td>Alemanha</td><td>4.430</td></tr>
      <tr><td>Brasil</td><td>2.126</td></tr>
    </table>
    """
    tabelas = pd.read_html(html)
    df = tabelas[0]
    print("Dados de exemplo:")
    print(df.to_string())

# pd.read_html() retorna lista de DataFrames (um por tabela)
# Útil para:
# - Wikipedia (dados históricos, rankings)
# - Sites de governos com dados tabulares
# - Relatórios HTML de sistemas`,
          explanation: 'pd.read_html() é o atalho mais rápido para tabelas HTML. Internamente usa BeautifulSoup ou lxml. Para tabelas simples, é muito mais rápido que escrever o scraper do zero.'
        }
      ],
      quiz: [
        {
          q: 'Qual é a diferença entre requests + BeautifulSoup e Selenium para scraping?',
          options: ['Selenium é mais rápido para qualquer site', 'requests+BS4 funciona apenas em HTML estático; Selenium executa JavaScript, necessário para SPAs e conteúdo carregado dinamicamente', 'BeautifulSoup precisa de um browser instalado', 'São ferramentas equivalentes'],
          answer: 1,
          explanation: 'requests busca o HTML inicial da página. Se o conteúdo é carregado depois por JavaScript (React, Angular, Vue), requests não verá esses dados. Selenium controla um browser real e espera o JavaScript executar.'
        },
        {
          q: 'Por que definir um User-Agent nos headers ao fazer scraping?',
          options: ['Para autenticação na API', 'Para evitar bloqueios — muitos servidores rejeitam requests sem User-Agent (identificam como bot)', 'Para acelerar o download', 'É exigido pelo protocolo HTTP'],
          answer: 1,
          explanation: 'Servidores verificam o User-Agent para identificar o cliente. Requests sem ele são frequentemente bloqueados. Um User-Agent de browser real reduz a chance de bloqueio.'
        },
        {
          q: 'Qual seletor CSS extrai todos os elementos <a> dentro de um <div class="lista">?',
          options: ['soup.find("a", class_="lista")', 'soup.select("div.lista a")', 'soup.find_all("lista > a")', 'soup.get("div.lista > a")'],
          answer: 1,
          explanation: 'select() usa seletores CSS. "div.lista a" = todos os <a> descendentes de <div class="lista">. "div.lista > a" = apenas filhos diretos. É mais expressivo que find_all().'
        },
        {
          q: 'Qual o método mais rápido para extrair tabelas HTML para um DataFrame?',
          options: ['BeautifulSoup + loop manual', 'pd.read_html(url)', 'requests.get(url) + csv.reader', 'Selenium + pandas'],
          answer: 1,
          explanation: 'pd.read_html() faz request + parsing + conversão para DataFrame em uma linha. Retorna uma lista de DataFrames (um por tabela encontrada na página).'
        },
        {
          q: 'Por que usar sleep() entre requests em um scraper?',
          options: ['Para sincronizar as respostas', 'Para respeitar o servidor, evitar rate limiting e não ser bloqueado por comportamento de bot', 'Para economizar dados móveis', 'sleep() é exigido pelo protocolo HTTP'],
          answer: 1,
          explanation: 'Fazer centenas de requests em segundos sobrecarrega o servidor e ativa sistemas anti-bot. Um sleep de 1-2 segundos imita comportamento humano e evita bloqueios. Sempre verifique o robots.txt do site.'
        }
      ]
    }
  },

  {
    id: 'py-streamlit',
    title: 'Dashboards com Streamlit',
    xp: 25,
    lesson: {
      title: 'Streamlit — Dashboards Interativos em Python Puro',
      theory: `Streamlit é a ferramenta preferida de analistas e cientistas de dados para criar dashboards e aplicações interativas <strong>sem precisar de HTML, CSS ou JavaScript</strong>.

Com poucas linhas de Python você cria:
• Gráficos interativos (Plotly, Altair, Matplotlib)
• Filtros e widgets (slider, selectbox, date_input)
• Upload de arquivos + análise automática
• Mapas, tabelas editáveis, download de resultados

Para instalar: <code>pip install streamlit</code>
Para rodar: <code>streamlit run app.py</code>

Streamlit aparece cada vez mais em vagas de Data Analyst, Data Scientist e Analytics Engineer.`,
      examples: [
        {
          title: 'Dashboard completo — estrutura base',
          code: `# app_dashboard.py — rode com: streamlit run app_dashboard.py
import streamlit as st
import pandas as pd
import plotly.express as px
import numpy as np

# Configuração da página (deve ser o primeiro comando st.)
st.set_page_config(
    page_title="Dashboard de Vendas",
    page_icon="📊",
    layout="wide"
)

# Título
st.title("📊 Dashboard de Vendas")
st.markdown("Análise de performance de vendas por região e produto")

# ── Gerar dados de exemplo ──
@st.cache_data  # cacheia para não recarregar a cada interação
def carregar_dados():
    np.random.seed(42)
    n = 200
    return pd.DataFrame({
        "data":    pd.date_range("2024-01-01", periods=n, freq="D")[:n],
        "regiao":  np.random.choice(["SP", "RJ", "MG", "RS"], n),
        "produto": np.random.choice(["Notebook", "Mouse", "Monitor"], n),
        "vendas":  np.random.randint(1, 20, n),
        "receita": np.random.uniform(100, 5000, n).round(2)
    })

df = carregar_dados()

# ── Sidebar com filtros ──
st.sidebar.header("Filtros")
regioes    = st.sidebar.multiselect("Região", df["regiao"].unique(), default=df["regiao"].unique())
produtos   = st.sidebar.multiselect("Produto", df["produto"].unique(), default=df["produto"].unique())
data_range = st.sidebar.date_input("Período", value=[df["data"].min(), df["data"].max()])

# Aplicar filtros
mask = (
    df["regiao"].isin(regioes) &
    df["produto"].isin(produtos) &
    (df["data"] >= pd.Timestamp(data_range[0])) &
    (df["data"] <= pd.Timestamp(data_range[1]))
)
df_filtrado = df[mask]

# ── Métricas em destaque ──
col1, col2, col3, col4 = st.columns(4)
col1.metric("Total Vendas", f"{df_filtrado['vendas'].sum():,}")
col2.metric("Receita Total", f"R${df_filtrado['receita'].sum():,.0f}")
col3.metric("Ticket Médio", f"R${df_filtrado['receita'].mean():.0f}")
col4.metric("Registros", len(df_filtrado))

# ── Gráficos ──
col_a, col_b = st.columns(2)

with col_a:
    fig = px.line(
        df_filtrado.groupby("data")["receita"].sum().reset_index(),
        x="data", y="receita", title="Receita Diária"
    )
    st.plotly_chart(fig, use_container_width=True)

with col_b:
    fig = px.bar(
        df_filtrado.groupby("regiao")["receita"].sum().reset_index(),
        x="regiao", y="receita", title="Receita por Região", color="regiao"
    )
    st.plotly_chart(fig, use_container_width=True)

# ── Tabela de dados ──
st.subheader("Dados Detalhados")
st.dataframe(df_filtrado.sort_values("receita", ascending=False), use_container_width=True)

# ── Download ──
csv = df_filtrado.to_csv(index=False).encode("utf-8")
st.download_button("⬇️ Baixar CSV", csv, "dados_filtrados.csv", "text/csv")`,
          explanation: '@st.cache_data evita reprocessar dados a cada clique do usuário. st.columns() cria layout em colunas. st.sidebar é o painel lateral. use_container_width=True ajusta os gráficos automaticamente.'
        },
        {
          title: 'Upload de arquivo + análise automática',
          code: `# Parte de um app Streamlit para análise de CSV enviado pelo usuário
import streamlit as st
import pandas as pd
import plotly.express as px

st.title("📁 Analise seus Dados")

# Upload de arquivo
arquivo = st.file_uploader(
    "Faça upload do seu CSV",
    type=["csv", "xlsx"],
    help="Tamanho máximo: 200MB"
)

if arquivo is not None:
    # Detectar tipo e ler
    if arquivo.name.endswith(".csv"):
        # Tentar diferentes separadores
        try:
            df = pd.read_csv(arquivo, encoding="utf-8")
        except UnicodeDecodeError:
            df = pd.read_csv(arquivo, encoding="latin-1")
    else:
        df = pd.read_excel(arquivo)

    st.success(f"✅ Arquivo carregado: {df.shape[0]} linhas × {df.shape[1]} colunas")

    # Aba de preview
    tab1, tab2, tab3 = st.tabs(["📋 Preview", "📊 Análise", "🔍 Qualidade"])

    with tab1:
        st.dataframe(df.head(20))
        st.write(f"**dtypes:**")
        st.dataframe(df.dtypes.rename("tipo").reset_index())

    with tab2:
        colunas_num = df.select_dtypes(include="number").columns.tolist()
        if colunas_num:
            coluna = st.selectbox("Selecione a coluna para análise", colunas_num)
            col1, col2 = st.columns(2)
            with col1:
                st.write(df[coluna].describe())
            with col2:
                fig = px.histogram(df, x=coluna, title=f"Distribuição — {coluna}")
                st.plotly_chart(fig, use_container_width=True)

    with tab3:
        nulos = df.isnull().sum()
        nulos_pct = (nulos / len(df) * 100).round(1)
        qualidade = pd.DataFrame({"Nulos": nulos, "% Nulos": nulos_pct})
        st.dataframe(qualidade[qualidade["Nulos"] > 0])
        duplicatas = df.duplicated().sum()
        st.metric("Linhas duplicadas", duplicatas)
else:
    st.info("👆 Faça upload de um arquivo CSV ou Excel para começar")
    # Mostrar exemplo de dados esperados
    st.code("id,nome,valor,data\n1,Produto A,100.0,2024-01-15")`,
          explanation: 'st.tabs() cria abas. st.file_uploader() aceita arquivos do usuário. @st.cache_data(ttl=3600) cacheia por 1 hora — útil para APIs. O app reinicia completamente a cada interação do usuário (comportamento normal do Streamlit).'
        },
        {
          title: 'Widgets interativos — controles avançados',
          code: `# Exemplos de todos os widgets mais usados no Streamlit
import streamlit as st
import pandas as pd
from datetime import date, timedelta

st.title("🎛️ Widgets do Streamlit")

# Texto e número
nome    = st.text_input("Nome", placeholder="Ex: Ana Silva")
idade   = st.number_input("Idade", min_value=1, max_value=120, value=25)
salario = st.slider("Salário", 1000, 30000, value=8000, step=500,
                    format="R$%d")

# Seleção
cargo     = st.selectbox("Cargo", ["Dev", "QA", "DevOps", "Data"])
habilidades = st.multiselect("Habilidades", ["Python", "SQL", "Excel", "Power BI", "AWS"])

# Booleano
aceita_remoto = st.checkbox("Aceita trabalho remoto", value=True)
contrato      = st.radio("Tipo de contrato", ["CLT", "PJ", "Estágio"])

# Data
data_inicio = st.date_input("Início", value=date.today())
data_fim    = st.date_input("Fim", value=date.today() + timedelta(days=30))

# Botão e ação
if st.button("Gerar Relatório"):
    if nome:
        st.success(f"Relatório gerado para **{nome}**!")
        dados = {
            "Nome": nome, "Cargo": cargo, "Salário": salario,
            "Habilidades": ", ".join(habilidades)
        }
        st.json(dados)
        st.balloons()  # animação
    else:
        st.error("⚠️ Preencha o nome!")

# Expandir seção
with st.expander("Ver configurações avançadas"):
    debug = st.toggle("Modo debug")
    max_registros = st.number_input("Máx. registros", 100, 10000, 1000)

# Progress bar (para operações longas)
# with st.spinner("Processando..."):
#     resultado = funcao_demorada()
# st.success("Concluído!")`,
          explanation: 'st.spinner() bloqueia a tela com loading enquanto processa. st.cache_data() evita reprocessar. st.session_state permite persistir dados entre interações. Streamlit reroda o script inteiro a cada widget alterado.'
        }
      ],
      quiz: [
        {
          q: 'Como evitar que o Streamlit recarregue dados pesados a cada interação do usuário?',
          options: ['st.save_data()', '@st.cache_data', 'st.persist()', 'global df'],
          answer: 1,
          explanation: '@st.cache_data cacheia o retorno da função. Enquanto os argumentos forem os mesmos, Streamlit retorna o resultado em cache sem reexecutar a função.'
        },
        {
          q: 'Como criar um layout de 3 colunas no Streamlit?',
          options: ['st.layout(cols=3)', 'col1, col2, col3 = st.columns(3)', 'st.grid(3)', 'st.cols([1,1,1])'],
          answer: 1,
          explanation: 'st.columns(n) retorna n objetos de coluna. Você adiciona elementos dentro de cada coluna usando with col1: ou col1.metric(). Aceita lista para larguras relativas: st.columns([2,1,1]).'
        },
        {
          q: 'Qual o comando para rodar um app Streamlit?',
          options: ['python app.py', 'streamlit run app.py', 'flask run app.py', 'streamlit start app.py'],
          answer: 1,
          explanation: 'streamlit run arquivo.py inicia um servidor local e abre o browser automaticamente. O app fica em localhost:8501 por padrão.'
        },
        {
          q: 'Qual widget permite que o usuário faça upload de um arquivo CSV?',
          options: ['st.upload()', 'st.file_uploader()', 'st.open_file()', 'st.import_csv()'],
          answer: 1,
          explanation: 'st.file_uploader() aceita arquivos do browser. O parâmetro type=["csv","xlsx"] restringe os tipos aceitos. O retorno é um objeto file-like que funciona com pd.read_csv().'
        },
        {
          q: 'Por que o Streamlit re-executa o script inteiro a cada interação?',
          options: ['É um bug do Streamlit', 'É o modelo de execução: cada mudança de widget reinicia o script, mantendo estado em st.session_state', 'Porque Python não tem estado', 'Para garantir dados sempre atualizados'],
          answer: 1,
          explanation: 'Esse é o modelo de programação reativa do Streamlit — simples de entender, mas requer atenção. Use @st.cache_data para dados pesados e st.session_state para persistir variáveis entre re-execuções.'
        }
      ]
    }
  },

  {
    id: 'py-automacao',
    title: 'Automação de Relatórios',
    xp: 20,
    lesson: {
      title: 'Automatizar Relatórios — Python Trabalhando por Você',
      theory: `Automação é onde Python se destaca: relatórios que antes levavam horas toda semana passam a ser gerados automaticamente e enviados por e-mail ou Slack.

Ferramentas essenciais:
• <strong>openpyxl / xlsxwriter</strong> — criar Excel formatado com Python
• <strong>schedule</strong> — agendar tarefas periódicas
• <strong>smtplib</strong> — enviar e-mails com Python
• <strong>Jinja2</strong> — templates HTML para relatórios
• <strong>pdfkit / reportlab</strong> — gerar PDFs

Na prática: empresas usam Python para gerar relatórios diários de vendas, alertas de anomalia, dashboards enviados por e-mail toda segunda-feira.`,
      examples: [
        {
          title: 'Excel formatado com openpyxl — relatório profissional',
          code: `import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.chart import BarChart, Reference
from openpyxl.utils import get_column_letter
import pandas as pd
from datetime import datetime

# Dados de exemplo
df = pd.DataFrame({
    "Produto":  ["Notebook", "Mouse", "Monitor", "Teclado", "Headset"],
    "Vendas":   [45, 120, 32, 78, 56],
    "Receita":  [202500, 14400, 38400, 27300, 22400],
    "Meta":     [50, 100, 40, 80, 60]
})
df["Atingimento%"] = (df["Vendas"] / df["Meta"] * 100).round(1)

# Criar workbook
wb = openpyxl.Workbook()
ws = wb.active
ws.title = "Relatório de Vendas"

# Título
ws.merge_cells("A1:E1")
ws["A1"] = f"Relatório de Vendas — {datetime.now().strftime('%B %Y')}"
ws["A1"].font      = Font(bold=True, size=14, color="FFFFFF")
ws["A1"].fill      = PatternFill("solid", fgColor="4472C4")
ws["A1"].alignment = Alignment(horizontal="center")
ws.row_dimensions[1].height = 30

# Cabeçalhos
cabecalhos = list(df.columns)
for col, header in enumerate(cabecalhos, start=1):
    cell = ws.cell(row=2, column=col, value=header)
    cell.font = Font(bold=True, color="FFFFFF")
    cell.fill = PatternFill("solid", fgColor="2F5496")
    cell.alignment = Alignment(horizontal="center")

# Dados com formatação condicional simples
for row_idx, row in df.iterrows():
    for col_idx, value in enumerate(row, start=1):
        cell = ws.cell(row=row_idx + 3, column=col_idx, value=value)
        cell.alignment = Alignment(horizontal="center")
        # Destacar linhas que bateram a meta
        if col_idx == 5:  # coluna Atingimento%
            if value >= 100:
                cell.fill = PatternFill("solid", fgColor="C6EFCE")  # verde
                cell.font = Font(color="276221", bold=True)
            elif value < 80:
                cell.fill = PatternFill("solid", fgColor="FFC7CE")  # vermelho

# Auto-ajustar largura das colunas
for col in ws.columns:
    max_len = max(len(str(cell.value or "")) for cell in col)
    ws.column_dimensions[get_column_letter(col[0].column)].width = max_len + 4

# Salvar
nome_arquivo = f"relatorio_vendas_{datetime.now().strftime('%Y%m')}.xlsx"
wb.save(nome_arquivo)
print(f"✅ Relatório salvo: {nome_arquivo}")`,
          explanation: 'openpyxl permite formatação completa do Excel via Python. Ideal para relatórios que precisam de aparência profissional. xlsxwriter é alternativa mais rápida para datasets grandes, mas sem leitura.'
        },
        {
          title: 'Agendamento com schedule e envio por e-mail',
          code: `import schedule
import time
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import pandas as pd
from datetime import datetime
import os

def gerar_relatorio_csv():
    """Gera relatório diário em CSV"""
    df = pd.DataFrame({
        "produto":  ["Notebook", "Mouse", "Monitor"],
        "vendas":   [12, 45, 8],
        "receita":  [54000, 5400, 9600]
    })
    nome = f"relatorio_{datetime.now().strftime('%Y%m%d')}.csv"
    df.to_csv(nome, index=False, encoding="utf-8")
    print(f"📊 Relatório gerado: {nome}")
    return nome

def enviar_email(destinatario, assunto, corpo, arquivo_anexo=None):
    """Envia e-mail com anexo opcional via Gmail"""
    # Para Gmail: ative "Acesso a app menos seguro" ou use App Password
    remetente = os.environ.get("EMAIL_USER")    # use variáveis de ambiente!
    senha     = os.environ.get("EMAIL_PASS")    # nunca hardcode senha!

    if not remetente or not senha:
        print("⚠️  Configure EMAIL_USER e EMAIL_PASS nas variáveis de ambiente")
        print(f"   Simulando envio para: {destinatario}")
        print(f"   Assunto: {assunto}")
        return

    msg = MIMEMultipart()
    msg["From"]    = remetente
    msg["To"]      = destinatario
    msg["Subject"] = assunto
    msg.attach(MIMEText(corpo, "html"))

    if arquivo_anexo and os.path.exists(arquivo_anexo):
        with open(arquivo_anexo, "rb") as f:
            parte = MIMEBase("application", "octet-stream")
            parte.set_payload(f.read())
        encoders.encode_base64(parte)
        parte.add_header("Content-Disposition", f"attachment; filename={os.path.basename(arquivo_anexo)}")
        msg.attach(parte)

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(remetente, senha)
        server.send_message(msg)
    print(f"✉️  E-mail enviado para {destinatario}")

def job_relatorio_diario():
    print(f"▶ Executando job: {datetime.now().strftime('%H:%M:%S')}")
    arquivo = gerar_relatorio_csv()
    enviar_email(
        "gestor@empresa.com",
        f"Relatório Diário — {datetime.now().strftime('%d/%m/%Y')}",
        "<h2>Relatório em anexo</h2><p>Gerado automaticamente.</p>",
        arquivo
    )

# Agendar execução
schedule.every().day.at("08:00").do(job_relatorio_diario)
schedule.every().monday.at("09:00").do(job_relatorio_diario)  # segunda-feira

print("⏰ Agendador iniciado. Aguardando...")
job_relatorio_diario()  # Executar uma vez imediatamente
# while True:
#     schedule.run_pending()
#     time.sleep(60)`,
          explanation: 'NUNCA coloque senhas no código. Use variáveis de ambiente (os.environ) ou python-dotenv. Em produção, prefira serviços como AWS Lambda (cron), GitHub Actions ou Airflow para agendar tasks.'
        },
        {
          title: 'Pipeline de automação completo — do dado ao relatório',
          code: `"""
Pipeline completo:
1. Busca dados (API / banco / CSV)
2. Processa com Pandas
3. Gera Excel formatado
4. Envia relatório por e-mail
"""
import pandas as pd
import requests
from datetime import datetime
from pathlib import Path

class PipelineRelatorio:
    def __init__(self, nome: str):
        self.nome = nome
        self.dados = None
        self.arquivo_saida = None

    def extrair(self, fonte: str) -> "PipelineRelatorio":
        """Etapa 1: Buscar dados"""
        print(f"📥 Extraindo dados de: {fonte}")
        # Simulação — na prática seria API ou banco
        self.dados = pd.DataFrame({
            "vendedor": ["Ana", "Bruno", "Carla", "Diego"],
            "vendas":   [45000, 32000, 58000, 27000],
            "meta":     [40000, 35000, 50000, 30000],
            "regiao":   ["SP", "RJ", "SP", "MG"]
        })
        return self  # fluent interface

    def transformar(self) -> "PipelineRelatorio":
        """Etapa 2: Processar e enriquecer dados"""
        print("⚙️  Transformando dados...")
        df = self.dados.copy()
        df["atingimento_pct"] = (df["vendas"] / df["meta"] * 100).round(1)
        df["status"] = df["atingimento_pct"].apply(
            lambda x: "✅ Bateu meta" if x >= 100 else "⚠️ Abaixo da meta"
        )
        df["receita_acima_meta"] = df["vendas"] - df["meta"]
        df = df.sort_values("vendas", ascending=False)
        self.dados = df
        return self

    def carregar(self, diretorio: str = ".") -> "PipelineRelatorio":
        """Etapa 3: Salvar resultado"""
        print("💾 Salvando relatório...")
        ts = datetime.now().strftime("%Y%m%d_%H%M")
        self.arquivo_saida = Path(diretorio) / f"relatorio_{self.nome}_{ts}.csv"
        self.dados.to_csv(self.arquivo_saida, index=False, encoding="utf-8")
        print(f"✅ Salvo em: {self.arquivo_saida}")
        return self

    def resumo(self) -> dict:
        """KPIs do relatório"""
        return {
            "total_receita": self.dados["vendas"].sum(),
            "media_atingimento": self.dados["atingimento_pct"].mean(),
            "bateram_meta": (self.dados["atingimento_pct"] >= 100).sum(),
            "top_vendedor": self.dados.iloc[0]["vendedor"]
        }

# Executar pipeline (método encadeado)
pipeline = (
    PipelineRelatorio("vendas_mensais")
    .extrair("api/vendas")
    .transformar()
    .carregar(".")
)

print("\n📊 Resumo:")
for k, v in pipeline.resumo().items():
    print(f"  {k}: {v}")`,
          explanation: 'O padrão ETL (Extract, Transform, Load) com interface fluente (return self) é elegante e testável. Cada etapa é independente — fácil de trocar a fonte ou o destino sem alterar a lógica de negócio.'
        }
      ],
      quiz: [
        {
          q: 'Qual biblioteca Python é usada para criar arquivos Excel com formatação?',
          options: ['xlrd', 'openpyxl', 'csv', 'tablib'],
          answer: 1,
          explanation: 'openpyxl lê e escreve Excel (.xlsx) com formatação completa. xlrd é apenas leitura. pandas usa openpyxl internamente no to_excel(). xlsxwriter é mais rápido para escrita, mas sem leitura.'
        },
        {
          q: 'Por que senhas nunca devem ser escritas diretamente no código?',
          options: ['O Python não aceita strings longas', 'O código pode ser versionado no Git, compartilhado ou vazado — expondo as credenciais', 'Senhas no código são mais lentas', 'É uma convenção de estilo'],
          answer: 1,
          explanation: 'Código vai para o Git, para code reviews, para pull requests. Use variáveis de ambiente (os.environ) ou .env com python-dotenv. Nunca commite arquivos .env — adicione-os ao .gitignore.'
        },
        {
          q: 'Como agendar uma função para rodar toda segunda-feira às 9h com schedule?',
          options: ['schedule.weekly("monday", "09:00").do(func)', 'schedule.every().monday.at("09:00").do(func)', 'schedule.cron("0 9 * * 1").do(func)', 'schedule.add("monday 09:00", func)'],
          answer: 1,
          explanation: 'A API do schedule é fluente e legível. every().day.at("08:00"), every().hour, every(10).minutes, every().monday.at("09:00"). Lembre de manter o loop: while True: schedule.run_pending(); time.sleep(60)'
        },
        {
          q: 'No padrão ETL, o que significa cada etapa?',
          options: ['Executar, Testar, Lançar', 'Extrair dados da fonte, Transformar/limpar, Load (carregar no destino)', 'Editar, Testar, Logar', 'Extrair, Treinar modelo, Lançar'],
          answer: 1,
          explanation: 'ETL: Extract (buscar dados de banco/API/arquivo), Transform (limpar, agregar, enriquecer com Pandas), Load (salvar em CSV/Excel/banco/dashboard). É o fluxo base de toda engenharia de dados.'
        },
        {
          q: 'Qual o benefício de usar interface fluente (return self) em um pipeline?',
          options: ['Melhora a performance', 'Permite encadear métodos em uma linha: pipeline.extrair().transformar().carregar()', 'É exigido pelo Pandas', 'Reduz uso de memória'],
          answer: 1,
          explanation: 'Retornar self permite encadeamento: obj.a().b().c(). Torna o código mais legível (lê como uma sequência de passos) e facilita testes (cada método pode ser testado isoladamente).'
        }
      ]
    }
  }
];

if (window.PYTHON_DATA) {
  window.PYTHON_DATA.topics = window.PYTHON_DATA.topics.concat(window.PYTHON_PRO);
}
