// Análise de Dados com Python — mercado
window.PYTHON_DADOS = [
  {
    id: 'py-numpy',
    title: 'NumPy — Arrays e Álgebra',
    xp: 20,
    lesson: {
      title: 'NumPy — Computação Numérica',
      theory: `NumPy é a base de toda computação científica em Python. <strong>Pandas, Scikit-learn e TensorFlow</strong> são construídos sobre NumPy.

Por que NumPy é rápido?
• Opera em <strong>arrays contíguos na memória</strong> (C internamente)
• <strong>Vetorização</strong>: operações em todo o array sem loop Python
• Até 100x mais rápido que listas Python para cálculos numéricos

Conceitos chave:
• <code>ndarray</code> — array N-dimensional
• <code>dtype</code> — tipo de dado (float64, int32, bool)
• <strong>Broadcasting</strong> — operações entre arrays de formas diferentes`,
      examples: [
        {
          title: 'Arrays vs listas — por que NumPy é mais rápido',
          code: `import numpy as np
import time

# Somar 10 milhões de números
tamanho = 10_000_000

# Lista Python (lento)
lista = list(range(tamanho))
inicio = time.time()
soma_lista = sum([x * 2 for x in lista])
print(f"Lista:  {time.time() - inicio:.3f}s")

# NumPy (rápido)
arr = np.arange(tamanho)
inicio = time.time()
soma_numpy = (arr * 2).sum()
print(f"NumPy:  {time.time() - inicio:.3f}s")
# NumPy: ~30x mais rápido

# Criando arrays
vetor    = np.array([1, 2, 3, 4, 5])
matriz   = np.array([[1, 2, 3], [4, 5, 6]])
zeros    = np.zeros((3, 3))
uns      = np.ones((2, 4), dtype=np.float32)
aleatorio = np.random.rand(3, 3)  # valores 0-1
intervalo = np.linspace(0, 1, 10) # 10 pts entre 0 e 1

print(matriz.shape)   # (2, 3) — 2 linhas, 3 colunas
print(matriz.dtype)   # int64
print(matriz.ndim)    # 2 dimensões`,
          explanation: 'np.arange() é o range() do NumPy. .shape retorna dimensões. NumPy opera em C — sem overhead do Python.'
        },
        {
          title: 'Indexação, slicing e operações',
          code: `import numpy as np

arr = np.array([10, 20, 30, 40, 50])

# Indexação (igual a listas, mas mais poderosa)
print(arr[0])     # 10
print(arr[-1])    # 50
print(arr[1:4])   # [20, 30, 40]

# Boolean indexing — filtro sem loop!
print(arr[arr > 25])    # [30, 40, 50]
print(arr[arr % 20 == 0]) # [20, 40]

# Operações vetorizadas (sem loop)
precos = np.array([100.0, 200.0, 150.0, 300.0])
desconto = 0.1
precos_finais = precos * (1 - desconto)
print(precos_finais)  # [90. 180. 135. 270.]

# Estatísticas básicas
vendas = np.array([1500, 2300, 1800, 3100, 2700, 1950])
print(f"Média:    {vendas.mean():.2f}")   # 2225.00
print(f"Mediana:  {np.median(vendas):.2f}")  # 2125.00
print(f"Desvio:   {vendas.std():.2f}")   # 537.77
print(f"Máximo:   {vendas.max()}")       # 3100
print(f"Índice máx: {vendas.argmax()}")  # 3`,
          explanation: 'Boolean indexing substitui filtros com loop. Operações como * e + aplicam em todo array instantaneamente.'
        },
        {
          title: 'Álgebra linear — usado em ML e dados',
          code: `import numpy as np

# Matrizes — multiplicação e transposição
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

# Multiplicação de matrizes (não é elemento a elemento!)
C = A @ B          # ou np.matmul(A, B)
print(C)
# [[19 22]
#  [43 50]]

print(A.T)         # transposta
# [[1 3]
#  [2 4]]

# Resolver sistema linear: Ax = b
# 2x + y = 5
# x + 3y = 10
A = np.array([[2, 1], [1, 3]], dtype=float)
b = np.array([5, 10], dtype=float)
x = np.linalg.solve(A, b)
print(x)  # [1. 3.]  → x=1, y=3

# Verificar: A @ x ≈ b
print(np.allclose(A @ x, b))  # True

# Correlação entre variáveis
horas_estudo = np.array([2, 4, 6, 8, 10])
notas        = np.array([55, 65, 70, 85, 95])
corr = np.corrcoef(horas_estudo, notas)[0, 1]
print(f"Correlação: {corr:.3f}")  # 0.991 — forte correlação positiva`,
          explanation: '@ é o operador de multiplicação matricial. np.linalg.solve resolve sistemas lineares. corrcoef mede relação entre variáveis.'
        }
      ]
    },
    quiz: [
      {
        question: 'Por que NumPy é mais rápido que listas Python?',
        options: [
          'Porque usa GPU automaticamente',
          'Porque opera em arrays contíguos na memória com código C — sem overhead do Python',
          'Porque tem menos funcionalidades',
          'Porque usa threads automaticamente'
        ],
        answer: 1,
        explanation: 'NumPy chama funções C otimizadas. Listas Python têm overhead por objeto. Para 10M elementos, a diferença é ~30-100x.'
      },
      {
        question: 'O que arr[arr > 25] faz em NumPy?',
        options: [
          'Erro — não se pode usar > em arrays',
          'Retorna o índice dos elementos > 25',
          'Filtra o array, retornando só elementos maiores que 25',
          'Modifica o array in-place'
        ],
        answer: 2,
        explanation: 'Boolean indexing: arr > 25 cria array de True/False. Usar como índice filtra os True — sem loop!'
      },
      {
        question: 'Qual operador faz multiplicação de matrizes em NumPy (Python 3.5+)?',
        options: ['*', '**', '@', '&'],
        answer: 2,
        explanation: '@ é o operador matmul. * faz multiplicação elemento a elemento (Hadamard), não produto matricial.'
      },
      {
        question: 'O que np.corrcoef(x, y)[0,1] retorna?',
        options: [
          'A covariância entre x e y',
          'O coeficiente de correlação de Pearson entre x e y (valor entre -1 e 1)',
          'A regressão linear entre x e y',
          'O erro quadrático médio'
        ],
        answer: 1,
        explanation: 'corrcoef retorna matriz de correlação. [0,1] pega a correlação cruzada. 1 = correlação perfeita, 0 = sem correlação.'
      }
    ]
  },
  {
    id: 'py-viz',
    title: 'Visualização — Matplotlib/Seaborn',
    xp: 20,
    lesson: {
      title: 'Visualização de Dados',
      theory: `Visualização é essencial para comunicar insights. No mercado você vai encontrar:

• <strong>Matplotlib</strong> — base, controle total
• <strong>Seaborn</strong> — estatístico, bonito por padrão
• <strong>Plotly</strong> — interativo para dashboards web

Tipos de gráfico e quando usar:
• <strong>Barras</strong> — comparar categorias
• <strong>Linhas</strong> — evolução no tempo
• <strong>Dispersão (scatter)</strong> — correlação entre variáveis
• <strong>Histograma</strong> — distribuição de uma variável
• <strong>Heatmap</strong> — correlação entre múltiplas variáveis`,
      examples: [
        {
          title: 'Matplotlib — gráficos essenciais',
          code: `import matplotlib.pyplot as plt
import numpy as np

# Configurar estilo uma vez
plt.style.use('dark_background')  # ou 'seaborn-v0_8-darkgrid'

# ── Gráfico de linhas — evolução de vendas ──
meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']
vendas_2023 = [1200, 1500, 1350, 1800, 2100, 1950]
vendas_2024 = [1400, 1700, 1600, 2100, 2400, 2300]

fig, axes = plt.subplots(1, 2, figsize=(12, 4))

axes[0].plot(meses, vendas_2023, 'o-', color='#6c63ff', label='2023')
axes[0].plot(meses, vendas_2024, 's--', color='#fbbf24', label='2024')
axes[0].set_title('Evolução de Vendas')
axes[0].set_ylabel('Vendas (R$)')
axes[0].legend()
axes[0].grid(alpha=0.3)

# ── Gráfico de barras — vendas por categoria ──
categorias = ['Python', 'Angular', 'Java', 'DevOps']
valores    = [4500, 3200, 3800, 5100]
cores      = ['#3776ab', '#dd0031', '#f89820', '#2496ed']

axes[1].bar(categorias, valores, color=cores, edgecolor='white', linewidth=0.5)
axes[1].set_title('Cursos Mais Vendidos')
axes[1].set_ylabel('Vendas')
for i, v in enumerate(valores):
    axes[1].text(i, v + 50, f'R${v:,}', ha='center', fontsize=9)

plt.tight_layout()
plt.savefig('dashboard.png', dpi=150, bbox_inches='tight')
plt.show()`,
          explanation: 'subplots(1,2) cria 2 gráficos lado a lado. tight_layout() evita sobreposição. savefig salva em arquivo.'
        },
        {
          title: 'Seaborn — análise estatística visual',
          code: `import seaborn as sns
import pandas as pd
import matplotlib.pyplot as plt

# Dataset de desenvolvedores
df = pd.DataFrame({
    'linguagem':  ['Python','Python','Python','Java','Java','Angular','Angular'],
    'anos_exp':   [1, 3, 5, 2, 6, 2, 4],
    'salario':    [4500, 7000, 11000, 5500, 12000, 6000, 9500],
    'satisfacao': [8, 9, 9, 7, 8, 8, 9]
})

fig, axes = plt.subplots(2, 2, figsize=(12, 10))
sns.set_theme(style="darkgrid", palette="husl")

# 1. Boxplot — distribuição salarial por linguagem
sns.boxplot(data=df, x='linguagem', y='salario', ax=axes[0,0])
axes[0,0].set_title('Salários por Linguagem')

# 2. Scatter com regressão — experiência vs salário
sns.regplot(data=df, x='anos_exp', y='salario',
            scatter_kws={'s': 80}, ax=axes[0,1])
axes[0,1].set_title('Experiência vs Salário')

# 3. Heatmap de correlação
corr = df[['anos_exp','salario','satisfacao']].corr()
sns.heatmap(corr, annot=True, fmt='.2f', cmap='coolwarm', ax=axes[1,0])
axes[1,0].set_title('Correlação entre Variáveis')

# 4. Histograma com KDE
sns.histplot(df['salario'], kde=True, bins=6, ax=axes[1,1])
axes[1,1].set_title('Distribuição Salarial')

plt.tight_layout()
plt.show()`,
          explanation: 'Seaborn integra com DataFrames diretamente. regplot adiciona linha de tendência. heatmap visualiza correlações.'
        },
        {
          title: 'Plotly — gráficos interativos para web',
          code: `import plotly.express as px
import plotly.graph_objects as go
import pandas as pd

df = pd.DataFrame({
    'mes':    ['Jan','Fev','Mar','Abr','Mai','Jun'] * 2,
    'vendas': [1200,1500,1350,1800,2100,1950,
               1400,1700,1600,2100,2400,2300],
    'ano':    ['2023']*6 + ['2024']*6
})

# Gráfico interativo (hover, zoom, pan)
fig = px.line(
    df, x='mes', y='vendas', color='ano',
    title='Evolução de Vendas',
    labels={'vendas': 'Vendas (R$)', 'mes': 'Mês'},
    template='plotly_dark',
    markers=True
)

# Adicionar anotação
fig.add_annotation(
    x='Mai', y=2400,
    text="📈 Pico 2024",
    showarrow=True, arrowhead=2
)

fig.update_layout(hovermode='x unified')

# Para Jupyter: fig.show()
# Para HTML: fig.write_html("dashboard.html")
# Para imagem: fig.write_image("chart.png")

print("HTML salvo!")`,
          explanation: 'Plotly gera HTML interativo — perfeito para dashboards web e relatórios. px é a API de alto nível mais simples.'
        }
      ]
    },
    quiz: [
      {
        question: 'Qual biblioteca é melhor para dashboards web interativos?',
        options: ['Matplotlib', 'Seaborn', 'Plotly', 'NumPy'],
        answer: 2,
        explanation: 'Plotly gera HTML interativo (hover, zoom, pan). Matplotlib/Seaborn geram imagens estáticas.'
      },
      {
        question: 'O que plt.subplots(2, 2) cria?',
        options: [
          'Um gráfico com 4 eixos sobrepostos',
          'Uma grade de 2x2 = 4 subgráficos independentes',
          'Dois gráficos um ao lado do outro',
          'Um gráfico com 2 escalas Y'
        ],
        answer: 1,
        explanation: 'subplots(linhas, colunas) retorna (fig, array_de_axes). axes[0,0] é superior esquerdo, axes[1,1] inferior direito.'
      },
      {
        question: 'O que um heatmap de correlação exibe?',
        options: [
          'Temperatura de pontos no mapa',
          'A força de relação entre pares de variáveis numéricas (valor entre -1 e 1)',
          'Densidade de pontos em scatter plot',
          'Distribuição de uma variável'
        ],
        answer: 1,
        explanation: '1 = correlação positiva perfeita, -1 = negativa perfeita, 0 = sem correlação. Usado para selecionar features em ML.'
      },
      {
        question: 'Para que serve sns.regplot()?',
        options: [
          'Registra um novo plot no Seaborn',
          'Cria scatter plot com linha de regressão linear',
          'Plota dados de registro (logs)',
          'Cria gráfico de regressão múltipla'
        ],
        answer: 1,
        explanation: 'regplot exibe os pontos + linha de tendência (regressão linear). Ótimo para visualizar correlação.'
      }
    ]
  },
  {
    id: 'py-stats',
    title: 'Estatística para Dados',
    xp: 25,
    lesson: {
      title: 'Estatística Aplicada com Python',
      theory: `Estatística é o alicerce da análise de dados e ciência de dados. Você precisa entender:

• <strong>Estatística descritiva</strong> — resumir os dados
• <strong>Distribuições</strong> — como os dados se comportam
• <strong>Testes de hipótese</strong> — tomar decisões com dados
• <strong>Correlação vs Causalidade</strong> — erro clássico
• <strong>Scipy</strong> — biblioteca de computação científica`,
      examples: [
        {
          title: 'Estatística descritiva completa',
          code: `import pandas as pd
import numpy as np
from scipy import stats

salarios = pd.Series([3200, 4500, 5000, 4800, 7200, 6500,
                      5800, 4200, 9500, 3800, 5200, 4700])

print("═══ ESTATÍSTICA DESCRITIVA ═══")
print(f"Contagem:       {salarios.count()}")
print(f"Média:          R${salarios.mean():,.2f}")
print(f"Mediana:        R${salarios.median():,.2f}")
print(f"Moda:           R${salarios.mode()[0]:,.2f}")
print(f"Desvio padrão:  R${salarios.std():,.2f}")
print(f"Variância:      {salarios.var():,.2f}")
print(f"Mínimo:         R${salarios.min():,.2f}")
print(f"Máximo:         R${salarios.max():,.2f}")
print(f"Amplitude:      R${salarios.max() - salarios.min():,.2f}")

# Quartis e IQR (detecção de outliers)
q1, q3  = salarios.quantile(0.25), salarios.quantile(0.75)
iqr     = q3 - q1
lim_inf = q1 - 1.5 * iqr
lim_sup = q3 + 1.5 * iqr

outliers = salarios[(salarios < lim_inf) | (salarios > lim_sup)]
print(f"\nOutliers (método IQR): {outliers.tolist()}")

# Assimetria e curtose
print(f"Assimetria:  {salarios.skew():.3f}")  # >0 cauda direita
print(f"Curtose:     {salarios.kurt():.3f}")`,
          explanation: 'Mediana é mais robusta que média na presença de outliers. IQR detecta outliers estatisticamente.'
        },
        {
          title: 'Testes de hipótese — tomada de decisão',
          code: `from scipy import stats
import numpy as np

# Pergunta: "A nova campanha aumentou o ticket médio?"
# Grupo A (controle):  clientes sem campanha
# Grupo B (tratamento): clientes com campanha

grupo_a = [85, 92, 78, 95, 88, 76, 91, 84, 79, 93]
grupo_b = [97, 105, 88, 112, 99, 95, 108, 101, 94, 110]

print(f"Média A: R${np.mean(grupo_a):.2f}")   # R$86.10
print(f"Média B: R${np.mean(grupo_b):.2f}")   # R$100.90

# Teste t de Student — compara duas médias
# H0 (hipótese nula): não há diferença
# H1 (alternativa): B > A (campanha funcionou)
t_stat, p_value = stats.ttest_ind(grupo_a, grupo_b)
print(f"\nEstatística t: {t_stat:.4f}")
print(f"P-value:       {p_value:.4f}")

alpha = 0.05  # nível de significância
if p_value < alpha:
    print(f"✅ Rejeitamos H0: a campanha aumentou o ticket (p={p_value:.4f})")
else:
    print(f"❌ Não rejeitamos H0: diferença pode ser acaso (p={p_value:.4f})")

# Teste de normalidade (Shapiro-Wilk)
stat, p = stats.shapiro(grupo_b)
print(f"\nShapiro-Wilk p={p:.4f}: {'Normal' if p > 0.05 else 'Não normal'}"),`,
          explanation: 'P-value < 0.05: resultado estatisticamente significativo. Não prove causalidade — prove que não é acaso.'
        },
        {
          title: 'Análise exploratória completa (EDA)',
          code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

def eda_completa(df: pd.DataFrame, nome: str = "DataFrame") -> None:
    """Pipeline de Análise Exploratória — padrão de mercado."""
    print(f"{'═'*50}")
    print(f"  EDA: {nome}")
    print(f"{'═'*50}")

    # 1. Forma e tipos
    print(f"\n📐 Shape: {df.shape} ({df.shape[0]:,} linhas, {df.shape[1]} colunas)")
    print(f"\n📋 Tipos:\n{df.dtypes}")

    # 2. Valores nulos
    nulos = df.isnull().sum()
    nulos_pct = (nulos / len(df) * 100).round(2)
    if nulos.any():
        print(f"\n⚠️  Valores nulos:")
        for col in nulos[nulos > 0].index:
            print(f"   {col}: {nulos[col]} ({nulos_pct[col]}%)")

    # 3. Duplicatas
    dupl = df.duplicated().sum()
    print(f"\n🔁 Duplicatas: {dupl}")

    # 4. Estatísticas numéricas
    print(f"\n📊 Estatísticas:\n{df.describe().T.round(2)}")

    # 5. Correlação
    numericas = df.select_dtypes(include=np.number)
    if len(numericas.columns) > 1:
        print(f"\n🔗 Correlação:\n{numericas.corr().round(3)}")

# Exemplo de uso:
df = pd.read_csv("dados.csv")
eda_completa(df, "Vendas 2024")`,
          explanation: 'EDA é o primeiro passo em todo projeto de dados. Essa função padroniza a análise — reutilizável em qualquer dataset.'
        }
      ]
    },
    quiz: [
      {
        question: 'Quando usar mediana em vez de média?',
        options: [
          'Sempre — mediana é sempre melhor',
          'Quando os dados têm outliers que distorcem a média',
          'Quando os dados são binários',
          'Quando há menos de 30 observações'
        ],
        answer: 1,
        explanation: 'Salário médio no Brasil é inflado por salários altíssimos. Mediana representa melhor o "salário típico".'
      },
      {
        question: 'O que um p-value de 0.03 significa no teste de hipótese?',
        options: [
          '3% de chance de a hipótese alternativa ser verdadeira',
          '3% de chance de observar esse resultado se H0 fosse verdadeira',
          '97% de chance de erro',
          'O efeito tem 3% de magnitude'
        ],
        answer: 1,
        explanation: 'p-value < 0.05 → rejeitamos H0. Não significa que H1 é verdadeira — apenas que o resultado provavelmente não é acaso.'
      },
      {
        question: 'O que é um outlier pelo método IQR?',
        options: [
          'Qualquer valor acima da média + desvio padrão',
          'Valor abaixo de Q1 - 1.5*IQR ou acima de Q3 + 1.5*IQR',
          'Os 5% extremos dos dados',
          'Valores com z-score > 2'
        ],
        answer: 1,
        explanation: 'IQR = Q3 - Q1. Limites: Q1-1.5*IQR e Q3+1.5*IQR. É o critério do boxplot do Seaborn/Matplotlib.'
      },
      {
        question: 'O que é EDA (Exploratory Data Analysis)?',
        options: [
          'Um algoritmo de machine learning',
          'Análise inicial para entender distribuição, nulos, outliers e padrões dos dados',
          'Um tipo de banco de dados',
          'Uma biblioteca Python'
        ],
        answer: 1,
        explanation: 'EDA é o primeiro passo em todo projeto de dados: entender o que você tem antes de modelar.'
      }
    ]
  },
  {
    id: 'py-ml-intro',
    title: 'Machine Learning com Scikit-learn',
    xp: 35,
    lesson: {
      title: 'Machine Learning na Prática',
      theory: `Scikit-learn é a biblioteca de ML mais usada no mercado. Oferece algoritmos prontos com interface padronizada.

Pipeline de ML:
1. <strong>Coletar e limpar dados</strong>
2. <strong>Feature engineering</strong> — criar/transformar variáveis
3. <strong>Dividir</strong> treino/teste
4. <strong>Treinar</strong> o modelo
5. <strong>Avaliar</strong> com métricas
6. <strong>Ajustar</strong> hiperparâmetros

Tipos de problema:
• <strong>Classificação</strong> — prever categoria (spam ou não)
• <strong>Regressão</strong> — prever valor numérico (preço)
• <strong>Clusterização</strong> — agrupar sem rótulo`,
      examples: [
        {
          title: 'Pipeline completo de classificação',
          code: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
import pandas as pd

# 1. Dados
iris = load_iris()
X = pd.DataFrame(iris.data, columns=iris.feature_names)
y = iris.target

print(f"Shape: {X.shape}")
print(f"Classes: {iris.target_names}")
print(f"Distribuição:\n{pd.Series(y).value_counts()}")

# 2. Divisão treino/teste (80/20)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# 3. Normalização (escala os dados)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)  # aprende a escala no treino
X_test  = scaler.transform(X_test)       # aplica a mesma escala no teste

# 4. Modelo
modelo = RandomForestClassifier(n_estimators=100, random_state=42)
modelo.fit(X_train, y_train)

# 5. Avaliação
y_pred = modelo.predict(X_test)
print("\n" + classification_report(y_test, y_pred, target_names=iris.target_names))

# Cross-validation — avaliação mais robusta
scores = cross_val_score(modelo, X, y, cv=5, scoring='accuracy')
print(f"CV Accuracy: {scores.mean():.3f} ± {scores.std():.3f}")`,
          explanation: 'fit_transform no treino, só transform no teste — regra de ouro para evitar data leakage.'
        },
        {
          title: 'Regressão — previsão de preço',
          code: `from sklearn.linear_model import LinearRegression, Ridge
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from sklearn.model_selection import train_test_split
import numpy as np
import pandas as pd

# Dataset de imóveis (simplificado)
np.random.seed(42)
n = 200
df = pd.DataFrame({
    'area':      np.random.uniform(40, 200, n),
    'quartos':   np.random.randint(1, 5, n),
    'banheiros': np.random.randint(1, 4, n),
    'garagem':   np.random.randint(0, 3, n),
    'distancia_centro': np.random.uniform(1, 30, n)
})
# Preço = função das features + ruído
df['preco'] = (
    df['area'] * 5000 +
    df['quartos'] * 15000 +
    df['banheiros'] * 10000 +
    df['garagem'] * 20000 -
    df['distancia_centro'] * 3000 +
    np.random.normal(0, 20000, n)
)

X = df.drop('preco', axis=1)
y = df['preco']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

modelos = {
    'Linear':    LinearRegression(),
    'Ridge':     Ridge(alpha=1.0),
    'GBoosting': GradientBoostingRegressor(n_estimators=100)
}

for nome, m in modelos.items():
    m.fit(X_train, y_train)
    pred = m.predict(X_test)
    rmse = np.sqrt(mean_squared_error(y_test, pred))
    r2   = r2_score(y_test, pred)
    print(f"{nome:10s} | R²={r2:.3f} | RMSE=R${rmse:,.0f}")`,
          explanation: 'R² próximo de 1 = bom. RMSE = erro médio em reais. Comparar modelos é prática padrão antes de escolher.'
        },
        {
          title: 'Pipeline Scikit-learn — padrão de produção',
          code: `from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV
import joblib

# Definir quais colunas são numéricas vs categóricas
num_features = ['idade', 'salario', 'anos_exp']
cat_features = ['cargo', 'linguagem']

# Transformador para numéricas: preenche nulos + normaliza
num_transformer = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler',  StandardScaler())
])

# Transformador para categóricas: preenche nulos + one-hot
cat_transformer = Pipeline([
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('encoder', OneHotEncoder(handle_unknown='ignore'))
])

# Combina os transformadores
preprocessor = ColumnTransformer([
    ('num', num_transformer, num_features),
    ('cat', cat_transformer, cat_features)
])

# Pipeline completo: preprocessamento + modelo
pipeline = Pipeline([
    ('prep',   preprocessor),
    ('modelo', RandomForestClassifier(random_state=42))
])

# Busca os melhores hiperparâmetros
params = {
    'modelo__n_estimators': [50, 100, 200],
    'modelo__max_depth':    [None, 5, 10]
}
grid = GridSearchCV(pipeline, params, cv=5, n_jobs=-1, scoring='accuracy')
grid.fit(X_train, y_train)

print(f"Melhores parâmetros: {grid.best_params_}")
print(f"Melhor accuracy: {grid.best_score_:.3f}")

# Salvar modelo treinado
joblib.dump(grid.best_estimator_, 'modelo_producao.pkl')

# Carregar e usar depois:
# modelo = joblib.load('modelo_producao.pkl')
# pred = modelo.predict(novos_dados)`,
          explanation: 'Pipeline garante que o mesmo preprocessamento é aplicado em treino e produção. joblib salva/carrega modelos treinados.'
        }
      ]
    },
    quiz: [
      {
        question: 'Por que usar scaler.fit_transform no treino e apenas scaler.transform no teste?',
        options: [
          'Por convenção do Scikit-learn',
          'Para evitar data leakage: a escala deve ser aprendida SÓ no treino',
          'Porque transform é mais rápido',
          'Porque o teste já vem normalizado'
        ],
        answer: 1,
        explanation: 'Se você fit no teste, "vaza" informação do futuro para o modelo — o modelo parece melhor do que é na produção.'
      },
      {
        question: 'O que R² (R-squared) mede em regressão?',
        options: [
          'O erro médio em unidades absolutas',
          'A proporção da variância dos dados explicada pelo modelo (0 a 1)',
          'O número de iterações do treinamento',
          'A correlação entre features'
        ],
        answer: 1,
        explanation: 'R²=1 = modelo perfeito. R²=0 = modelo não explica nada. R²<0 = pior que uma constante (modelo muito ruim).'
      },
      {
        question: 'O que cross_val_score com cv=5 faz?',
        options: [
          'Treina 5 modelos diferentes',
          'Divide os dados em 5 partes, treina 5 vezes usando cada parte como teste — avaliação mais robusta',
          'Usa 5% dos dados para validação',
          'Repete o treinamento 5 vezes com seeds diferentes'
        ],
        answer: 1,
        explanation: '5-fold CV reduz a variância da avaliação. Mais confiável que um único split treino/teste.'
      },
      {
        question: 'Para que serve Pipeline do Scikit-learn em produção?',
        options: [
          'Para acelerar o treinamento com paralelismo',
          'Para garantir que o mesmo preprocessamento usado no treino seja aplicado nos dados novos',
          'Para criar pipelines de dados no banco',
          'Para fazer deploy automático na nuvem'
        ],
        answer: 1,
        explanation: 'Pipeline encapsula preprocessamento + modelo. Um único .predict() aplica tudo — impossível esquecer um passo.'
      }
    ]
  }
];

if (window.PYTHON_DATA) {
  window.PYTHON_DATA.topics = window.PYTHON_DATA.topics.concat(window.PYTHON_DADOS);
}
