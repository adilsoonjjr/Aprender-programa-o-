// python-analise.js — Análise de Dados com Python (caminho completo)
window.PYTHON_ANALISE = [
  {
    id: 'py-pandas-avancado',
    title: 'Pandas Avançado',
    xp: 25,
    lesson: {
      title: 'Pandas Avançado — Do Básico ao Profissional',
      theory: `Pandas é a ferramenta #1 de todo analista de dados. Depois do básico (DataFrame, filtros, groupby), o mercado exige domínio de operações mais profundas.

Operações avançadas essenciais:
• <strong>apply / lambda</strong> — transformar coluna com lógica customizada
• <strong>MultiIndex</strong> — DataFrames com índice hierárquico
• <strong>Window functions</strong> — médias móveis, acumuladas (como SQL OVER)
• <strong>string accessor (.str)</strong> — tratar texto dentro de colunas
• <strong>category dtype</strong> — economizar memória em colunas com poucos valores únicos`,
      examples: [
        {
          title: 'apply, lambda e map — transformar dados coluna a coluna',
          code: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    "nome":    ["ana silva", "BRUNO COSTA", "Carla Lima"],
    "salario": [8000, 5500, 9500],
    "cargo":   ["dev", "qa", "dev"]
})

# apply com lambda — coluna calculada
df["bonus"] = df["salario"].apply(lambda s: s * 0.15 if s > 7000 else s * 0.10)

# map — substituir valores por um dicionário
nivel = {"dev": "Engenharia", "qa": "Qualidade", "devops": "Infra"}
df["area"] = df["cargo"].map(nivel)

# str accessor — normalizar texto
df["nome"] = df["nome"].str.title()   # Capitaliza
df["nome"] = df["nome"].str.strip()   # Remove espaços

# apply em múltiplas colunas (axis=1)
df["resumo"] = df.apply(
    lambda row: f"{row['nome']} ({row['cargo'].upper()}) — R${row['salario']:,.0f}",
    axis=1
)

print(df[["nome", "resumo", "bonus"]])`,
          explanation: 'apply(axis=1) percorre linha a linha. apply(axis=0) percorre coluna a coluna. Para operações simples em uma coluna, prefira vetorização direta (mais rápida).'
        },
        {
          title: 'Window Functions — médias móveis e acumulado (padrão SQL OVER)',
          code: `import pandas as pd

vendas = pd.DataFrame({
    "data":   pd.date_range("2024-01-01", periods=10, freq="D"),
    "valor":  [100, 150, 80, 200, 175, 90, 210, 130, 160, 195]
})

# Média móvel de 3 dias (remove ruído, tendência)
vendas["media_3d"] = vendas["valor"].rolling(window=3).mean().round(2)

# Acumulado (cumsum) — total progressivo
vendas["acumulado"] = vendas["valor"].cumsum()

# Diferença em relação ao dia anterior (variação diária)
vendas["variacao"] = vendas["valor"].diff()

# % de crescimento dia a dia
vendas["crescimento_pct"] = vendas["valor"].pct_change().mul(100).round(2)

# Rank — posição por valor (equivale ao RANK() do SQL)
vendas["rank"] = vendas["valor"].rank(ascending=False).astype(int)

print(vendas.to_string())`,
          explanation: 'rolling() é o equivalente ao OVER (ORDER BY ... ROWS BETWEEN) do SQL. Essencial para dashboards e relatórios de tendência.'
        },
        {
          title: 'MultiIndex e reshape — pivot e melt',
          code: `import pandas as pd

# Dados de vendas por produto e mês
df = pd.DataFrame({
    "produto": ["A","A","A","B","B","B"],
    "mes":     ["Jan","Fev","Mar","Jan","Fev","Mar"],
    "vendas":  [100, 120, 90, 200, 180, 220]
})

# PIVOT — transforma linhas em colunas (útil para relatórios)
tabela = df.pivot_table(
    index="produto",
    columns="mes",
    values="vendas",
    aggfunc="sum",
    fill_value=0
)
print("--- PIVOT ---")
print(tabela)
# mes      Fev  Jan  Mar
# produto
# A        120  100   90
# B        180  200  220

# MELT — inverso do pivot, volta para formato longo
longo = tabela.reset_index().melt(
    id_vars="produto",
    var_name="mes",
    value_name="vendas"
)
print("\n--- MELT (formato longo) ---")
print(longo.head())`,
          explanation: 'pivot_table → formato largo (bom para Excel/dashboard). melt → formato longo (bom para gráficos e ML). Saber os dois é obrigatório para analistas.'
        },
        {
          title: 'Otimização de memória — categoria e tipos corretos',
          code: `import pandas as pd
import numpy as np

# Simular dataset grande
n = 100_000
df = pd.DataFrame({
    "id":     range(n),
    "status": np.random.choice(["ativo", "inativo", "pendente"], n),
    "valor":  np.random.uniform(10, 1000, n).astype("float64"),
    "qtd":    np.random.randint(1, 100, n).astype("int64")
})

print(f"Memória ANTES: {df.memory_usage(deep=True).sum() / 1024:.1f} KB")

# Otimizar tipos
df["status"] = df["status"].astype("category")   # string → category
df["valor"]  = df["valor"].astype("float32")     # float64 → float32
df["qtd"]    = df["qtd"].astype("int16")          # int64 → int16

print(f"Memória DEPOIS: {df.memory_usage(deep=True).sum() / 1024:.1f} KB")
# Redução de ~70% de memória!

# Verificar categorias únicas
print(df["status"].cat.categories.tolist())  # ['ativo', 'inativo', 'pendente']`,
          explanation: 'Em datasets de milhões de linhas, otimizar dtypes pode fazer a diferença entre o código travar ou não. category é especialmente eficiente para colunas com poucos valores únicos.'
        }
      ],
      quiz: [
        {
          q: 'Qual método do Pandas aplica uma função customizada linha por linha em um DataFrame?',
          options: ['df.map(func)', 'df.apply(func, axis=1)', 'df.transform(func)', 'df.pipe(func)'],
          answer: 1,
          explanation: 'apply(axis=1) percorre linha a linha. apply(axis=0) percorre coluna a coluna.'
        },
        {
          q: 'O que faz o método rolling(window=7).mean()?',
          options: ['Calcula a média total do DataFrame', 'Calcula a média dos últimos 7 valores (média móvel)', 'Seleciona as 7 primeiras linhas', 'Agrupa por janelas de 7 grupos'],
          answer: 1,
          explanation: 'rolling cria uma janela deslizante. window=7 considera os 7 períodos anteriores para cada cálculo.'
        },
        {
          q: 'Para transformar colunas em linhas (formato largo → longo), qual método usar?',
          options: ['pivot_table()', 'melt()', 'stack()', 'unstack()'],
          answer: 1,
          explanation: 'melt() transforma colunas em linhas (largo → longo). pivot_table() faz o inverso (longo → largo).'
        },
        {
          q: 'Por que converter uma coluna string com poucos valores únicos para dtype "category"?',
          options: ['Para ordenar os valores automaticamente', 'Para reduzir uso de memória significativamente', 'Para permitir operações matemáticas', 'Para compatibilidade com SQL'],
          answer: 1,
          explanation: 'category armazena os valores únicos uma vez e usa índices inteiros internamente. Em colunas repetitivas como "status" ou "cidade", reduz memória em até 90%.'
        },
        {
          q: 'Qual é o equivalente do SQL "PARTITION BY ... ORDER BY ..." no Pandas?',
          options: ['groupby().sort_values()', 'rolling().mean()', 'groupby().transform() combinado com rank()/cumsum()', 'merge() com sort'],
          answer: 2,
          explanation: 'groupby().transform() aplica funções de janela dentro de cada grupo, preservando o índice original — equivalente ao OVER(PARTITION BY) do SQL.'
        }
      ]
    }
  },

  {
    id: 'py-data-cleaning',
    title: 'Limpeza de Dados (Data Cleaning)',
    xp: 25,
    lesson: {
      title: 'Limpeza de Dados — 80% do Trabalho Real',
      theory: `Na prática, <strong>80% do tempo de um analista de dados é limpeza</strong>. Dados reais têm:
• Valores nulos (NaN) — cliente não preencheu, sistema falhou
• Duplicatas — importações repetidas, erros de sistema
• Tipos errados — data como string, número como texto
• Outliers — erros de digitação, valores impossíveis
• Inconsistências — "SP", "São Paulo", "sp" para a mesma coisa

Dominar esse processo é o que separa analistas junior de senior no mercado.`,
      examples: [
        {
          title: 'Pipeline completo de limpeza — padrão de mercado',
          code: `import pandas as pd
import numpy as np

# Simular dado sujo (igual ao que você vai receber no trabalho)
dados_sujos = {
    "id":        [1, 2, 2, 3, 4, 5],
    "nome":      ["Ana", "Bruno", "Bruno", " Carla ", None, "Diego"],
    "idade":     [25, 200, 200, 30, -5, 28],      # 200 e -5 são outliers
    "salario":   ["8.000", "5,500", "9500", None, "7200", "abc"],
    "data_nasc": ["1999-01-15", "1990-05-20", "1990-05-20", "1994-07-11", None, "invalida"],
    "cidade":    ["sp", "RJ", "RJ", "São Paulo", "mg", "MG"]
}
df = pd.DataFrame(dados_sujos)

print("=== DIAGNÓSTICO INICIAL ===")
print(f"Shape: {df.shape}")
print(f"Nulos:\n{df.isnull().sum()}")
print(f"Duplicatas: {df.duplicated().sum()}")

# 1. Remover duplicatas
df = df.drop_duplicates()
print(f"\nApós remover duplicatas: {df.shape}")

# 2. Normalizar strings
df["nome"]   = df["nome"].str.strip().str.title()
df["cidade"] = df["cidade"].str.upper().str.strip()

# 3. Padronizar cidade (mapeamento)
mapa_cidade = {"SP": "São Paulo", "RJ": "Rio de Janeiro", "MG": "Minas Gerais"}
df["cidade"] = df["cidade"].map(mapa_cidade).fillna(df["cidade"])

# 4. Converter salário (string com pontos/vírgulas → float)
df["salario"] = (
    df["salario"]
    .str.replace(".", "", regex=False)
    .str.replace(",", ".", regex=False)
    .pipe(pd.to_numeric, errors="coerce")   # "abc" → NaN
)

# 5. Converter datas
df["data_nasc"] = pd.to_datetime(df["data_nasc"], errors="coerce")  # "invalida" → NaT

# 6. Tratar outliers de idade
df.loc[(df["idade"] < 16) | (df["idade"] > 100), "idade"] = np.nan

# 7. Preencher nulos com estratégia
df["salario"] = df["salario"].fillna(df["salario"].median())  # mediana é mais robusta
df["nome"]    = df["nome"].fillna("Desconhecido")

print("\n=== DADOS LIMPOS ===")
print(df.to_string())
print(f"\nNulos restantes:\n{df.isnull().sum()}")`,
          explanation: 'Sempre diagnostique antes de limpar: shape, dtypes, isnull(), value_counts(). Nunca delete dados sem entender o impacto — use fillna estratégico (mediana para numérico, moda para categórico).'
        },
        {
          title: 'Detecção e tratamento de outliers',
          code: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    "salario": [3000, 4500, 5000, 8000, 9000, 7500, 6000, 150000, 4800, 200]
})

# Método 1: IQR (Interquartile Range) — mais robusto
Q1 = df["salario"].quantile(0.25)
Q3 = df["salario"].quantile(0.75)
IQR = Q3 - Q1

limite_inf = Q1 - 1.5 * IQR
limite_sup = Q3 + 1.5 * IQR

outliers_iqr = df[(df["salario"] < limite_inf) | (df["salario"] > limite_sup)]
print(f"IQR — Outliers encontrados:\n{outliers_iqr}")
# 150000 e 200 são outliers

# Método 2: Z-Score — bom para dados normais
from scipy import stats
z_scores = np.abs(stats.zscore(df["salario"]))
outliers_z = df[z_scores > 3]
print(f"\nZ-Score — Outliers encontrados:\n{outliers_z}")

# Tratamento: clamping (limitar ao limite) em vez de deletar
df["salario_limpo"] = df["salario"].clip(lower=limite_inf, upper=limite_sup)
print(f"\nApós clip:\n{df}")`,
          explanation: 'IQR é preferível para dados com distribuição não-normal (maioria dos dados reais). Z-Score assume distribuição normal. clip() é melhor que deletar — preserva a linha.'
        },
        {
          title: 'Validação e auditoria de dados',
          code: `import pandas as pd

df = pd.DataFrame({
    "cpf":      ["123.456.789-00", "111.111.111-11", "123.456.789-00", "abc"],
    "email":    ["ana@empresa.com", "bruno@", "carla@empresa.com", "diego@empresa.com"],
    "idade":    [25, 30, 25, -1],
    "salario":  [8000, 5500, 8000, 7000]
})

# Relatório de qualidade de dados
print("=== RELATÓRIO DE QUALIDADE ===")

# CPF duplicados
cpfs_dup = df[df["cpf"].duplicated(keep=False)]
print(f"\nCPFs duplicados ({len(cpfs_dup)} linhas):")
print(cpfs_dup[["cpf"]])

# Email inválido (sem @ e domínio)
df["email_valido"] = df["email"].str.contains(r"^[\w.]+@[\w.]+\.\w{2,}$", regex=True, na=False)
print(f"\nEmails inválidos:\n{df[~df['email_valido']][['email']]}")

# Idade fora do range esperado
df["idade_valida"] = df["idade"].between(16, 100)
print(f"\nIdades inválidas:\n{df[~df['idade_valida']][['idade']]}")

# Resumo de qualidade
total = len(df)
print(f"\n--- RESUMO ---")
print(f"Total de registros: {total}")
print(f"CPFs duplicados: {df['cpf'].duplicated().sum()}")
print(f"Emails inválidos: (~df['email_valido']).sum()}: {(~df['email_valido']).sum()}")
print(f"Idades inválidas: {(~df['idade_valida']).sum()}")
print(f"Score de qualidade: {((df['email_valido'] & df['idade_valida']).sum() / total * 100):.1f}%")`,
          explanation: 'Em projetos reais, sempre crie um relatório de qualidade antes de apresentar análises. Dados ruins geram insights errados — "garbage in, garbage out".'
        }
      ],
      quiz: [
        {
          q: 'Qual é a melhor estratégia para preencher valores nulos em uma coluna numérica com outliers?',
          options: ['Usar a média', 'Usar a mediana', 'Usar o valor 0', 'Deletar as linhas'],
          answer: 1,
          explanation: 'A mediana é mais robusta a outliers. A média é distorcida por valores extremos. Deletar linhas pode introduzir viés na análise.'
        },
        {
          q: 'O que faz pd.to_numeric(series, errors="coerce")?',
          options: ['Converte números para string', 'Converte para número e transforma valores inválidos em NaN', 'Lança exceção em valores inválidos', 'Arredonda todos os valores'],
          answer: 1,
          explanation: 'errors="coerce" substitui valores que não podem ser convertidos por NaN, em vez de lançar erro. Ideal para dados sujos vindos de CSV.'
        },
        {
          q: 'Qual método é preferível para remover outliers sem perder a linha do DataFrame?',
          options: ['drop() com a condição de outlier', 'dropna()', 'clip(lower=, upper=)', 'fillna(0)'],
          answer: 2,
          explanation: 'clip() limita os valores ao range definido sem remover linhas. Manter as linhas com valores ajustados é geralmente preferível a deletá-las.'
        },
        {
          q: 'Qual a principal vantagem do método IQR sobre Z-Score para detecção de outliers?',
          options: ['É mais preciso matematicamente', 'Funciona bem mesmo sem distribuição normal', 'É mais rápido computacionalmente', 'Detecta mais outliers'],
          answer: 1,
          explanation: 'IQR baseia-se em quantis e não assume distribuição normal, sendo mais robusto para dados reais que geralmente não são normalmente distribuídos.'
        },
        {
          q: 'Ao receber um novo dataset, qual deve ser o primeiro passo antes de limpar?',
          options: ['Remover duplicatas imediatamente', 'Fazer diagnóstico: shape, dtypes, isnull(), value_counts()', 'Converter todos os tipos para string', 'Deletar colunas com muitos nulos'],
          answer: 1,
          explanation: '"Diagnosticar antes de agir" é regra de ouro. Entender o perfil dos dados evita limpezas erradas que destroem informação válida.'
        }
      ]
    }
  },

  {
    id: 'py-series-temporais',
    title: 'Séries Temporais',
    xp: 25,
    lesson: {
      title: 'Séries Temporais com Pandas',
      theory: `Séries temporais aparecem em quase toda análise de negócios: vendas mensais, acessos diários, preço de ações, métricas de produto.

Pandas tem suporte nativo e poderoso para trabalhar com datas e tempo:
• <strong>DatetimeIndex</strong> — índice temporal que permite resample, slice por data
• <strong>resample()</strong> — equivalente ao GROUP BY período (dia, semana, mês, ano)
• <strong>shift()</strong> — comparar com período anterior (YoY, MoM)
• <strong>rolling()</strong> — médias móveis, tendências
• <strong>dt accessor</strong> — extrair ano, mês, dia da semana, hora`,
      examples: [
        {
          title: 'Análise de vendas por período — padrão de mercado',
          code: `import pandas as pd
import numpy as np

# Gerar 2 anos de dados diários de vendas
np.random.seed(42)
datas = pd.date_range("2023-01-01", "2024-12-31", freq="D")
vendas = pd.Series(
    np.random.normal(1000, 200, len(datas)) + np.sin(np.arange(len(datas)) / 30) * 150,
    index=datas,
    name="vendas"
)
vendas = vendas.clip(lower=0).round(2)

# dt accessor — extrair componentes de data
df = vendas.reset_index()
df.columns = ["data", "vendas"]
df["ano"]           = df["data"].dt.year
df["mes"]           = df["data"].dt.month
df["dia_semana"]    = df["data"].dt.day_name()
df["trimestre"]     = df["data"].dt.quarter

# resample — agrupar por período
vendas_mensais   = vendas.resample("ME").sum()    # ME = Month End
vendas_semanais  = vendas.resample("W").mean()
vendas_trimestrais = vendas.resample("QE").sum()

print("Vendas mensais (últimos 3 meses):")
print(vendas_mensais.tail(3).to_string())

# Comparação ano a ano (YoY)
vendas_2023 = vendas["2023"].resample("ME").sum()
vendas_2024 = vendas["2024"].resample("ME").sum()
yoy = ((vendas_2024.values - vendas_2023.values) / vendas_2023.values * 100).round(2)
print(f"\nCrescimento YoY por mês: {yoy[:6]}")`,
          explanation: 'resample() é essencial — equivale ao GROUP BY MONTH/YEAR do SQL, mas muito mais flexível. "ME" = Month End, "W" = Week, "QE" = Quarter End, "YE" = Year End.'
        },
        {
          title: 'shift e pct_change — variação período a período',
          code: `import pandas as pd

# Receita mensal de uma empresa
receita = pd.Series(
    [95000, 98000, 102000, 89000, 110000, 115000, 108000, 120000, 118000, 125000, 130000, 140000],
    index=pd.date_range("2024-01-01", periods=12, freq="ME"),
    name="receita"
)

# Variação mês a mês (MoM %)
receita_mom = receita.pct_change().mul(100).round(2)

# shift — comparar com mês anterior
receita_anterior = receita.shift(1)           # mês -1
receita_3m_atras = receita.shift(3)           # 3 meses atrás
diferenca_abs    = receita - receita_anterior

# Média móvel de 3 meses
media_3m = receita.rolling(3).mean().round(0)

# Montar relatório final
relatorio = pd.DataFrame({
    "receita":     receita,
    "mes_anterior": receita_anterior,
    "variacao_abs": diferenca_abs,
    "variacao_pct": receita_mom,
    "media_3m":    media_3m
})

print(relatorio.to_string())

# Melhor e pior mês
print(f"\nMelhor mês: {receita.idxmax().strftime('%B/%Y')} — R${receita.max():,.0f}")
print(f"Pior mês:   {receita.idxmin().strftime('%B/%Y')} — R${receita.min():,.0f}")`,
          explanation: 'pct_change() é atalho para (atual - anterior) / anterior. shift(n) desloca a série n períodos — positivo para o passado, negativo para o futuro.'
        },
        {
          title: 'Análise de tendência e sazonalidade',
          code: `import pandas as pd
import numpy as np

# Dados mensais com sazonalidade (padrão de e-commerce)
meses = pd.date_range("2023-01-01", "2024-12-31", freq="ME")
np.random.seed(0)

# Tendência crescente + sazonalidade (pico em Nov/Dez)
tendencia = np.linspace(50000, 80000, len(meses))
sazonalidade = np.array([0.8, 0.75, 0.9, 0.85, 0.9, 0.95, 0.85, 0.9, 1.0, 1.1, 1.4, 1.6] * 2)
ruido = np.random.normal(0, 2000, len(meses))

vendas = pd.Series(tendencia * sazonalidade + ruido, index=meses, name="vendas")

# Análise por dia da semana (usando dados diários reindexados)
vendas_diarias = vendas.resample("D").interpolate("linear")
df_dia = vendas_diarias.reset_index()
df_dia.columns = ["data", "vendas"]
df_dia["dia_semana"] = df_dia["data"].dt.day_name()

media_por_dia = df_dia.groupby("dia_semana")["vendas"].mean().round(0)
print("Média de vendas por dia da semana:")
print(media_por_dia.sort_values(ascending=False))

# Detectar meses de pico
media_por_mes = vendas.groupby(vendas.index.month).mean()
mes_pico = media_por_mes.idxmax()
print(f"\nMês de pico histórico: {mes_pico} (mês {mes_pico})")

# Projeção simples com média móvel
projecao = vendas.rolling(3).mean().iloc[-1]
print(f"Projeção próximo mês (média 3m): R${projecao:,.0f}")`,
          explanation: 'Identificar sazonalidade é crucial para planejar estoque, equipe e budget. A média móvel é a projeção mais simples e surpreendentemente eficaz para horizontes curtos.'
        }
      ],
      quiz: [
        {
          q: 'Qual método agrupa dados de uma série temporal por mês, somando os valores?',
          options: ['groupby("mes").sum()', 'resample("ME").sum()', 'rolling(30).sum()', 'pivot_table(freq="M")'],
          answer: 1,
          explanation: 'resample("ME").sum() agrupa por mês (Month End) e soma. É o equivalente ao GROUP BY MONTH do SQL para séries temporais.'
        },
        {
          q: 'O que faz series.shift(1)?',
          options: ['Desloca os valores 1 posição para o futuro (índice +1)', 'Desloca os valores 1 posição para o passado (índice -1)', 'Remove o primeiro elemento', 'Ordena os valores'],
          answer: 0,
          explanation: 'shift(1) desloca os valores uma posição para frente, fazendo o valor atual aparecer no índice seguinte. Isso é equivalente a "trazer o valor do mês anterior" para comparação.'
        },
        {
          q: 'Qual método calcula a variação percentual período a período automaticamente?',
          options: ['diff()', 'pct_change()', 'rolling(1).mean()', 'cumsum()'],
          answer: 1,
          explanation: 'pct_change() calcula (atual - anterior) / anterior automaticamente. Equivale ao cálculo de crescimento MoM/YoY.'
        },
        {
          q: 'Como filtrar uma série temporal para apenas o ano de 2024?',
          options: ['series[series.year == 2024]', 'series["2024"]', 'series.filter(year=2024)', 'series.loc[2024]'],
          answer: 1,
          explanation: 'O DatetimeIndex do Pandas permite slicing por string de data: series["2024"] retorna todo o ano, series["2024-06"] retorna junho de 2024.'
        },
        {
          q: 'Para criar uma média móvel de 7 dias, qual código está correto?',
          options: ['series.mean(window=7)', 'series.rolling(7).mean()', 'series.shift(7).mean()', 'series.resample("7D").mean()'],
          answer: 1,
          explanation: 'rolling(7).mean() cria uma janela deslizante de 7 períodos. Os primeiros 6 valores serão NaN por não ter dados suficientes para a janela.'
        }
      ]
    }
  },

  {
    id: 'py-sql-python',
    title: 'SQL + Python (integração)',
    xp: 20,
    lesson: {
      title: 'Conectar Python a Bancos de Dados',
      theory: `Analistas e engenheiros de dados passam muito tempo buscando dados direto de bancos de dados. Python tem integração nativa e via bibliotecas:

• <strong>sqlite3</strong> — banco embutido no Python, perfeito para praticar e para apps pequenos
• <strong>pandas.read_sql()</strong> — resultado de query SQL direto para DataFrame
• <strong>SQLAlchemy</strong> — ORM e conexão com qualquer banco (PostgreSQL, MySQL, Oracle)
• <strong>psycopg2 / pymysql</strong> — drivers diretos para PostgreSQL e MySQL

Na prática: você escreve a query SQL, Python traz o resultado como DataFrame, e aí usa Pandas para análise.`,
      examples: [
        {
          title: 'sqlite3 — banco local para praticar SQL + Python',
          code: `import sqlite3
import pandas as pd

# Criar banco em memória (ou use "dados.db" para arquivo)
conn = sqlite3.connect(":memory:")

# Criar e popular tabela
conn.executescript("""
    CREATE TABLE vendas (
        id INTEGER PRIMARY KEY,
        produto TEXT,
        categoria TEXT,
        valor REAL,
        data_venda TEXT,
        vendedor TEXT
    );
    INSERT INTO vendas VALUES
        (1,'Notebook','Tech',4500,'2024-01-15','Ana'),
        (2,'Mouse','Tech',120,'2024-01-16','Bruno'),
        (3,'Mesa','Moveis',800,'2024-01-17','Ana'),
        (4,'Notebook','Tech',4500,'2024-02-01','Carla'),
        (5,'Cadeira','Moveis',600,'2024-02-05','Bruno'),
        (6,'Monitor','Tech',1200,'2024-02-10','Ana');
""")

# Query SQL direto para DataFrame
df = pd.read_sql("""
    SELECT
        vendedor,
        categoria,
        COUNT(*) as total_vendas,
        SUM(valor) as receita_total,
        AVG(valor) as ticket_medio
    FROM vendas
    GROUP BY vendedor, categoria
    ORDER BY receita_total DESC
""", conn)

print(df.to_string())

# Filtro com parâmetros (NUNCA use f-string em SQL — SQL Injection!)
categoria = "Tech"
df_tech = pd.read_sql(
    "SELECT * FROM vendas WHERE categoria = ?",
    conn,
    params=(categoria,)
)
print(f"\nVendas Tech:\n{df_tech}")
conn.close()`,
          explanation: 'NUNCA monte queries SQL com f-string ou concatenação de string — isso abre SQL Injection. Sempre use parâmetros (? no sqlite3, %s no psycopg2).'
        },
        {
          title: 'SQLAlchemy — conexão com PostgreSQL/MySQL em produção',
          code: `import pandas as pd
from sqlalchemy import create_engine, text

# Strings de conexão por banco:
# PostgreSQL: "postgresql://user:senha@host:5432/banco"
# MySQL:      "mysql+pymysql://user:senha@host:3306/banco"
# SQLite:     "sqlite:///arquivo.db"
# SQLite mem: "sqlite:///:memory:"

engine = create_engine("sqlite:///:memory:")

# Criar dados de exemplo
df_produtos = pd.DataFrame({
    "id": [1, 2, 3],
    "nome": ["Notebook", "Mouse", "Monitor"],
    "preco": [4500.0, 120.0, 1200.0],
    "estoque": [10, 50, 20]
})

# Escrever DataFrame direto no banco (if_exists: replace, append, fail)
df_produtos.to_sql("produtos", engine, if_exists="replace", index=False)

# Ler com query complexa
with engine.connect() as con:
    df_resultado = pd.read_sql(
        text("""
            SELECT
                nome,
                preco,
                estoque,
                preco * estoque AS valor_em_estoque,
                CASE
                    WHEN preco > 1000 THEN 'Premium'
                    WHEN preco > 100  THEN 'Médio'
                    ELSE 'Básico'
                END AS categoria_preco
            FROM produtos
            ORDER BY valor_em_estoque DESC
        """),
        con
    )

print(df_resultado.to_string())

# Atualizar dados com to_sql
novos = pd.DataFrame({"id": [4], "nome": ["Teclado"], "preco": [350.0], "estoque": [30]})
novos.to_sql("produtos", engine, if_exists="append", index=False)`,
          explanation: 'to_sql() é bidirecional: lê e escreve. if_exists="replace" recria a tabela. if_exists="append" adiciona linhas. Use text() para queries com SQLAlchemy 2.x.'
        },
        {
          title: 'Pipeline completo: DB → análise → relatório',
          code: `import pandas as pd
import sqlite3
from datetime import datetime

# Pipeline típico de analista de dados
conn = sqlite3.connect(":memory:")
conn.executescript("""
    CREATE TABLE pedidos (
        id INTEGER, cliente TEXT, produto TEXT,
        valor REAL, status TEXT, data TEXT
    );
    INSERT INTO pedidos VALUES
        (1,'Ana','A',500,'pago','2024-01-10'),
        (2,'Bruno','B',200,'pago','2024-01-15'),
        (3,'Ana','C',800,'cancelado','2024-01-20'),
        (4,'Carla','A',500,'pago','2024-02-05'),
        (5,'Bruno','B',200,'pendente','2024-02-10'),
        (6,'Ana','A',500,'pago','2024-02-15'),
        (7,'Diego','C',800,'pago','2024-03-01'),
        (8,'Carla','B',200,'pago','2024-03-10');
""")

# 1. Extrair dados do banco
df = pd.read_sql(
    "SELECT * FROM pedidos WHERE status = 'pago'",
    conn, parse_dates=["data"]
)

# 2. Transformar
df["mes"] = df["data"].dt.to_period("M")
df["ano"] = df["data"].dt.year

# 3. Análise: receita por cliente e mês
pivot = df.pivot_table(
    index="cliente", columns="mes",
    values="valor", aggfunc="sum", fill_value=0
)
print("Receita por cliente/mês:")
print(pivot)

# 4. KPIs
total_receita = df["valor"].sum()
ticket_medio  = df["valor"].mean()
top_cliente   = df.groupby("cliente")["valor"].sum().idxmax()

print(f"\n--- KPIs ---")
print(f"Receita total: R${total_receita:,.0f}")
print(f"Ticket médio:  R${ticket_medio:,.0f}")
print(f"Top cliente:   {top_cliente}")

# 5. Exportar (para enviar por e-mail, Slack, etc.)
# df.to_excel("relatorio.xlsx", index=False)
# df.to_csv("relatorio.csv", index=False)
conn.close()`,
          explanation: 'O pipeline Extract → Transform → Load (ETL) básico: SQL extrai, Pandas transforma, to_excel/to_csv exporta. É a base de 80% dos relatórios que analistas de dados produzem.'
        }
      ],
      quiz: [
        {
          q: 'Por que NUNCA usar f-string para montar queries SQL com dados do usuário?',
          options: ['Porque é mais lento', 'Porque abre vulnerabilidade de SQL Injection', 'Porque o Pandas não suporta', 'Porque quebra em nomes com acentos'],
          answer: 1,
          explanation: 'SQL Injection permite que um atacante execute SQL arbitrário no banco. Sempre use parâmetros: ? no sqlite3, %s no psycopg2, :nome no SQLAlchemy.'
        },
        {
          q: 'Qual função do Pandas lê o resultado de uma query SQL diretamente para um DataFrame?',
          options: ['pd.from_sql()', 'pd.read_sql()', 'pd.query_db()', 'pd.sql_to_df()'],
          answer: 1,
          explanation: 'pd.read_sql(query, connection) retorna um DataFrame com o resultado da query. Aceita também pd.read_sql_query() para queries e pd.read_sql_table() para tabelas inteiras.'
        },
        {
          q: 'O que faz df.to_sql("tabela", engine, if_exists="replace")?',
          options: ['Atualiza linhas existentes na tabela', 'Recria a tabela com os dados do DataFrame', 'Adiciona linhas sem apagar existentes', 'Lança erro se a tabela existir'],
          answer: 1,
          explanation: 'if_exists="replace" DROPA a tabela existente e recria. Use "append" para adicionar linhas, "fail" para lançar erro se já existir.'
        },
        {
          q: 'Qual é a vantagem do SQLAlchemy em relação ao sqlite3 direto?',
          options: ['SQLAlchemy é mais rápido para queries simples', 'SQLAlchemy suporta qualquer banco (PostgreSQL, MySQL, Oracle) com a mesma API', 'SQLAlchemy não precisa de SQL', 'SQLAlchemy é nativo do Python'],
          answer: 1,
          explanation: 'SQLAlchemy abstrai o banco de dados. Você muda apenas a connection string para trocar de SQLite para PostgreSQL em produção, sem alterar o código.'
        },
        {
          q: 'No pipeline ETL com Python, qual é a ordem correta das etapas?',
          options: ['Load → Extract → Transform', 'Transform → Extract → Load', 'Extract → Transform → Load', 'Extract → Load → Transform'],
          answer: 2,
          explanation: 'ETL: Extract (buscar dados da fonte), Transform (limpar e transformar com Pandas), Load (salvar no destino: CSV, Excel, banco, dashboard).'
        }
      ]
    }
  },

  {
    id: 'py-analise-negocios',
    title: 'Análise de Negócios com Python',
    xp: 30,
    lesson: {
      title: 'Análise de Negócios — O que Empresas Pedem',
      theory: `Analistas de dados não trabalham só com DataFrames. Eles resolvem perguntas de negócios:
• "Quantos clientes abandonam por mês?" → <strong>Churn Rate</strong>
• "Qual campanha trouxe mais conversão?" → <strong>Funil de conversão</strong>
• "Clientes que compram juntos produto A também compram B?" → <strong>Cohort / segmentação</strong>
• "Qual produto dá mais retorno por real investido?" → <strong>ROI analysis</strong>

Essas análises aparecem em entrevistas e nos primeiros projetos reais de toda empresa.`,
      examples: [
        {
          title: 'Funil de conversão — e-commerce / produto SaaS',
          code: `import pandas as pd
import numpy as np

# Funil de usuários (dados fictícios de um SaaS)
etapas = ["Visitou o site", "Criou conta", "Ativou produto", "Fez upgrade", "Renovação"]
usuarios = [10000, 3500, 1800, 420, 310]

df_funil = pd.DataFrame({"etapa": etapas, "usuarios": usuarios})

# Taxa de conversão entre etapas
df_funil["conversao_etapa"] = df_funil["usuarios"] / df_funil["usuarios"].shift(1)
df_funil["conversao_total"] = df_funil["usuarios"] / df_funil["usuarios"].iloc[0]

# Perda em cada etapa
df_funil["perdas"] = df_funil["usuarios"].shift(1) - df_funil["usuarios"]

df_funil["conversao_etapa"] = df_funil["conversao_etapa"].mul(100).round(1)
df_funil["conversao_total"] = df_funil["conversao_total"].mul(100).round(1)

print(df_funil.to_string(index=False))

# Identificar maior gargalo
maior_perda_idx = df_funil["perdas"].idxmax()
print(f"\nMaior gargalo: {df_funil.loc[maior_perda_idx, 'etapa']}")
print(f"Perda: {df_funil.loc[maior_perda_idx, 'perdas']:.0f} usuários")
print(f"Taxa de conversão total: {df_funil['conversao_total'].iloc[-1]}%")`,
          explanation: 'Análise de funil é pedida em quase toda entrevista de Data Analyst em empresas de produto. O gargalo (maior perda) é onde o negócio deve focar.'
        },
        {
          title: 'Cohort Analysis — retenção de clientes',
          code: `import pandas as pd
import numpy as np

# Simular dados de compras de clientes
np.random.seed(42)
n_clientes = 200
n_pedidos  = 600

dados = pd.DataFrame({
    "cliente_id": np.random.randint(1, n_clientes + 1, n_pedidos),
    "data_pedido": pd.to_datetime(
        np.random.choice(pd.date_range("2024-01-01", "2024-12-31"), n_pedidos)
    )
})

# Mês do primeiro pedido de cada cliente (cohort de aquisição)
primeira_compra = dados.groupby("cliente_id")["data_pedido"].min().dt.to_period("M")
primeira_compra.name = "cohort"

dados = dados.join(primeira_compra, on="cliente_id")
dados["mes_pedido"] = dados["data_pedido"].dt.to_period("M")

# Número de meses após a primeira compra
dados["periodo"] = (dados["mes_pedido"] - dados["cohort"]).apply(lambda x: x.n)

# Clientes únicos por cohort e período
cohort_data = dados.groupby(["cohort", "periodo"])["cliente_id"].nunique().reset_index()
cohort_pivot = cohort_data.pivot_table(index="cohort", columns="periodo", values="cliente_id")

# Taxa de retenção (% em relação ao período 0)
cohort_size = cohort_pivot[0]
retention   = cohort_pivot.divide(cohort_size, axis=0).mul(100).round(1)

print("=== TABELA DE RETENÇÃO (%) ===")
print(retention.iloc[:6, :5].to_string())
print("\nLeitura: linha = mês de aquisição, coluna = meses depois")
print(f"Retenção média mês 1: {retention[1].mean():.1f}%")`,
          explanation: 'Cohort analysis é uma das análises mais valorizadas em startups e e-commerce. Ela responde: "de cada 100 clientes que adquirimos em janeiro, quantos ainda estão ativos em março?"'
        },
        {
          title: 'RFM — segmentação de clientes para marketing',
          code: `import pandas as pd
import numpy as np
from datetime import datetime

# Dados de compras (padrão CRM/e-commerce)
np.random.seed(0)
n = 300
df = pd.DataFrame({
    "cliente_id": np.random.randint(1, 101, n),
    "data":       pd.to_datetime(np.random.choice(
                    pd.date_range("2024-01-01", "2024-12-31"), n
                  )),
    "valor":      np.random.exponential(200, n).round(2)
})

data_ref = pd.Timestamp("2025-01-01")

# RFM: Recency, Frequency, Monetary
rfm = df.groupby("cliente_id").agg(
    recency   = ("data",  lambda x: (data_ref - x.max()).days),
    frequency = ("data",  "count"),
    monetary  = ("valor", "sum")
).round(2)

# Score de 1 a 4 (4 = melhor para F e M, 1 = melhor para R)
rfm["R"] = pd.qcut(rfm["recency"],   4, labels=[4,3,2,1]).astype(int)
rfm["F"] = pd.qcut(rfm["frequency"], 4, labels=[1,2,3,4]).astype(int)
rfm["M"] = pd.qcut(rfm["monetary"],  4, labels=[1,2,3,4]).astype(int)
rfm["rfm_score"] = rfm["R"].astype(str) + rfm["F"].astype(str) + rfm["M"].astype(str)

# Segmentação de clientes
def segmentar(row):
    if row["R"] >= 3 and row["F"] >= 3:    return "Campeões"
    if row["R"] >= 3 and row["F"] >= 2:    return "Clientes Leais"
    if row["R"] >= 2 and row["F"] == 1:    return "Potenciais"
    if row["R"] == 1 and row["F"] >= 2:    return "Em Risco"
    return "Hibernando"

rfm["segmento"] = rfm.apply(segmentar, axis=1)

print("Distribuição de segmentos:")
print(rfm["segmento"].value_counts())
print(f"\nTop 5 clientes (por monetary):")
print(rfm.sort_values("monetary", ascending=False).head())`,
          explanation: 'RFM é a segmentação de clientes mais usada no mercado. Recency (última compra), Frequency (qtd compras), Monetary (valor total). Usada para campanhas de e-mail, reativação e upsell.'
        }
      ],
      quiz: [
        {
          q: 'O que mede uma análise de Cohort?',
          options: ['O lucro total por produto', 'A retenção de clientes ao longo do tempo por grupo de aquisição', 'A segmentação por valor de compra', 'O funil de conversão entre etapas'],
          answer: 1,
          explanation: 'Cohort analysis agrupa clientes pelo momento de aquisição (cohort) e mede quantos permanecem ativos nos meses seguintes. É a principal métrica de retenção.'
        },
        {
          q: 'Na análise de funil, o que é um "gargalo"?',
          options: ['O total de usuários no início do funil', 'A etapa com maior perda percentual de usuários', 'O número de conversões finais', 'A etapa com mais usuários'],
          answer: 1,
          explanation: 'O gargalo é onde ocorre a maior queda de usuários entre etapas. É o ponto de maior oportunidade de melhoria para o negócio.'
        },
        {
          q: 'No RFM, o que significa "Recency"?',
          options: ['Receita total do cliente', 'Quantidade de compras nos últimos 30 dias', 'Quão recentemente o cliente fez a última compra', 'Taxa de retorno do cliente'],
          answer: 2,
          explanation: 'Recency = dias desde a última compra. Clientes com baixo Recency (compraram recentemente) tendem a responder melhor a campanhas de marketing.'
        },
        {
          q: 'Um cliente com scores RFM alto em R (recente), alto em F (frequente) e alto em M (alto valor) é classificado como?',
          options: ['Em Risco', 'Hibernando', 'Potencial', 'Campeão'],
          answer: 3,
          explanation: 'Clientes Campeões têm alto R (compraram recentemente), alto F (compram com frequência) e alto M (gastam muito). São os clientes mais valiosos e leais.'
        },
        {
          q: 'Qual a diferença entre análise de funil e análise de cohort?',
          options: ['São a mesma análise com nomes diferentes', 'Funil mede conversão entre etapas de um processo; Cohort mede retenção ao longo do tempo', 'Cohort é para e-commerce; Funil é para SaaS', 'Funil usa SQL; Cohort usa Pandas'],
          answer: 1,
          explanation: 'Funil = conversão entre etapas (quantos chegam ao fim). Cohort = retenção temporal (quantos continuam ao longo do tempo). Empresas usam os dois juntos para entender aquisição e retenção.'
        }
      ]
    }
  }
];

if (window.PYTHON_DATA) {
  window.PYTHON_DATA.topics = window.PYTHON_DATA.topics.concat(window.PYTHON_ANALISE);
}
