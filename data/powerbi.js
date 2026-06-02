window.POWERBI_DATA = {
  id: 'powerbi',
  name: 'Power BI',
  icon: '📊',
  color: '#f2c811',
  gradient: 'linear-gradient(135deg, #f2c811, #e8a000)',
  topics: [
    {
      id: 'pbi-intro',
      title: 'Interface e Fluxo de Trabalho',
      xp: 10,
      lesson: {
        title: 'Power BI Desktop — Primeiros Passos',
        theory: `Power BI é a ferramenta de BI mais usada no mercado. Combina <strong>Power Query + Modelo de Dados + DAX + Visualizações</strong>.

Fluxo completo no Power BI:
1. <strong>Obter Dados</strong> — Excel, SQL, API, SharePoint…
2. <strong>Power Query</strong> — limpar e transformar
3. <strong>Modelo</strong> — relacionar tabelas (estrela)
4. <strong>DAX</strong> — criar métricas e colunas calculadas
5. <strong>Visualizações</strong> — montar o dashboard
6. <strong>Publicar</strong> — Power BI Service (web)

Visões do Power BI Desktop:
• 📊 <strong>Relatório</strong> — canvas de visualizações
• 🗄️ <strong>Dados</strong> — ver tabelas
• 🔗 <strong>Modelo</strong> — ver e criar relacionamentos`,
        examples: [
          {
            title: 'Fontes de dados mais usadas',
            code: `Início → Obter Dados → escolha a fonte:

┌─────────────────────────────────────────────┐
│  FONTES MAIS COMUNS NO MERCADO              │
├─────────────────┬───────────────────────────┤
│ Excel/CSV       │ Arquivo → Excel/CSV        │
│ SQL Server      │ Banco → SQL Server         │
│ PostgreSQL      │ Banco → PostgreSQL         │
│ SharePoint      │ Online → Lista SharePoint  │
│ Google Sheets   │ Online → Google Sheets     │
│ API REST        │ Outro → Web                │
│ Azure           │ Azure → Synapse/Blob       │
└─────────────────┴───────────────────────────┘

DICA: Sempre use "Transformar Dados" ao importar
para entrar no Power Query antes de carregar.

Modo de Armazenamento:
• Importar     → dados copiados para o .pbix (recomendado)
• DirectQuery  → consulta ao vivo (mais lento, dados sempre frescos)
• Dual         → combinação`,
            explanation: 'Para a maioria dos projetos, use Importar. DirectQuery só quando os dados são muito grandes ou precisam ser em tempo real.'
          },
          {
            title: 'Modelo estrela — o segredo do bom BI',
            code: `MODELO ESTRELA (Star Schema) — padrão de mercado:

┌──────────────┐    ┌─────────────────────┐
│  Dim_Tempo   │    │     Fato_Vendas      │
├──────────────┤    ├─────────────────────┤
│ Data (PK)    │◄───│ Data_FK             │
│ Ano          │    │ Produto_FK          │
│ Mês          │    │ Cliente_FK          │
│ Trimestre    │    │ Vendedor_FK         │
│ Dia_Semana   │    │ Quantidade          │
└──────────────┘    │ Valor_Bruto         │
                    │ Desconto            │
┌──────────────┐    │ Valor_Liquido       │
│ Dim_Produto  │    └─────────────────────┘
├──────────────┤          ▲         ▲
│ Produto_ID(PK)◄─────────┘         │
│ Nome         │                    │
│ Categoria    │    ┌──────────────┐│
│ Custo        │    │ Dim_Cliente  ││
└──────────────┘    ├──────────────┤│
                    │ Cliente_ID(PK)◄┘
                    │ Nome         │
                    │ Cidade       │
                    │ Segmento     │
                    └──────────────┘

REGRA: Tabela Fato ao centro, Dimensões ao redor.
Relacionamentos: 1:N (dimensão → fato)`,
            explanation: 'Modelo estrela garante performance e DAX simples. Nunca relacione fato com fato diretamente.'
          },
          {
            title: 'Tipos de visualização e quando usar',
            code: `GUIA DE VISUALIZAÇÕES:

📊 Gráfico de Barras/Colunas
  → Comparar categorias
  → Ex: Vendas por Produto, por Região

📈 Gráfico de Linhas
  → Tendência no tempo
  → Ex: Receita mensal, crescimento de usuários

🍩 Pizza/Rosca
  → Proporção do todo (máx 5 fatias)
  → Ex: Market share, distribuição por categoria

🗺️ Mapa/Mapa Preenchido
  → Dados geográficos
  → Ex: Vendas por estado/cidade

📋 Tabela/Matriz
  → Detalhamento numérico
  → Ex: Top 10 clientes, detalhes de pedidos

🔢 Cartão (Card)
  → KPI único em destaque
  → Ex: Receita Total, Nº Clientes

🌡️ Medidor (Gauge)
  → % de meta atingida
  → Ex: Meta de vendas do mês

KPIs (Key Performance Indicators):
• Use Cartão para valor atual
• Use Cartão de KPI para atual vs meta`,
            explanation: 'Escolha o visual pelo objetivo da análise, não pelo visual mais bonito. Menos é mais em dashboards.'
          }
        ]
      },
      quiz: [
        {
          question: 'Qual é a estrutura de modelo recomendada no Power BI?',
          options: ['Floco de neve', 'Modelo estrela (Star Schema)', 'Tabela única desnormalizada', 'Modelo ORM'],
          answer: 1,
          explanation: 'Modelo estrela: fato central + dimensões ao redor. Performance melhor e DAX mais simples.'
        },
        {
          question: 'Quando usar DirectQuery em vez de Importar?',
          options: [
            'Sempre — DirectQuery é mais rápido',
            'Quando os dados são muito grandes ou precisam ser em tempo real',
            'Quando o arquivo Excel tem fórmulas',
            'Quando há mais de 10 tabelas'
          ],
          answer: 1,
          explanation: 'Importar é mais rápido para análise. DirectQuery consulta ao vivo — use só quando necessário.'
        },
        {
          question: 'Qual visual é mais adequado para mostrar tendência ao longo do tempo?',
          options: ['Gráfico de pizza', 'Treemap', 'Gráfico de linhas', 'Gráfico de dispersão'],
          answer: 2,
          explanation: 'Gráfico de linhas é ideal para mostrar evolução temporal — tendências de alta, baixa e sazonalidade.'
        },
        {
          question: 'No modelo estrela, como são os relacionamentos entre dimensão e fato?',
          options: ['M:N (muitos para muitos)', '1:1 (um para um)', '1:N (um dimensão → muitos fato)', 'N:1 (fato → dimensão)'],
          answer: 2,
          explanation: '1:N: um produto pode aparecer em muitas linhas de venda. A chave primária da dimensão é FK na fato.'
        }
      ]
    },
    {
      id: 'pbi-powerquery',
      title: 'Power Query — ETL',
      xp: 20,
      lesson: {
        title: 'Power Query — Transformação de Dados',
        theory: `Power Query é o <strong>ETL visual</strong> do Power BI (e Excel). Cada transformação gera um passo gravado e repetível.

Operações mais importantes:
• <strong>Promover cabeçalhos</strong> — primeira linha como nome de coluna
• <strong>Alterar tipo</strong> — texto, número, data, etc.
• <strong>Dividir coluna</strong> — separar por delimitador
• <strong>Mesclar consultas</strong> — JOIN entre tabelas
• <strong>Agrupar por</strong> — GROUP BY visual
• <strong>Tabela dinâmica/Cancelar dinâmica</strong> — pivot/unpivot`,
        examples: [
          {
            title: 'Linguagem M — Power Query avançado',
            code: `// Editor Avançado do Power Query — linguagem M

// Exemplo: Tratamento de planilha de vendas
let
    // 1. Conectar ao arquivo
    Fonte = Excel.Workbook(
        File.Contents("C:\\dados\\vendas.xlsx"),
        null, true
    ),

    // 2. Selecionar aba "Vendas"
    Vendas = Fonte{[Item="Vendas",Kind="Sheet"]}[Data],

    // 3. Promover 1ª linha como cabeçalho
    Cabecalhos = Table.PromoteHeaders(Vendas, [PromoteAllScalars=true]),

    // 4. Alterar tipos
    Tipos = Table.TransformColumnTypes(Cabecalhos, {
        {"Data",     type date},
        {"Valor",    type number},
        {"Produto",  type text},
        {"Qtd",      Int64.Type}
    }),

    // 5. Filtrar linhas válidas
    Filtrado = Table.SelectRows(Tipos, each
        [Valor] <> null and [Valor] > 0
    ),

    // 6. Adicionar coluna calculada
    ComMes = Table.AddColumn(Filtrado, "Mês", each
        Date.MonthName([Data], "pt-BR"), type text
    ),

    // 7. Remover coluna desnecessária
    Final = Table.RemoveColumns(ComMes, {"Coluna_Vazia"})
in
    Final`,
            explanation: 'Cada "let ... in" é um passo. Cada variável é o resultado do passo anterior. Power Query grava isso visualmente.'
          },
          {
            title: 'Mesclar e Acrescentar consultas',
            code: `// MESCLAR (JOIN entre tabelas) — feito visualmente:
// Home → Mesclar Consultas → escolha tabelas e colunas

// Tipos de mesclagem:
┌────────────────┬──────────────────────────────────┐
│ Externa Esq.   │ Todos da esq + correspondentes   │ ← mais usado
│ Interna        │ Só correspondentes (INNER JOIN)  │
│ Externa Dir.   │ Todos da dir + correspondentes   │
│ Externa Completa│ Todos de ambos                  │
│ Anti-esquerda  │ Só da esq SEM correspondente     │ ← para encontrar erros
└────────────────┴──────────────────────────────────┘

// Resultado em M:
let
    MesclarVendas = Table.NestedJoin(
        Vendas, {"Produto_ID"},   // tabela esquerda + coluna
        Produtos, {"ID"},         // tabela direita + coluna
        "Produtos",               // nome da coluna expandida
        JoinKind.LeftOuter        // tipo de join
    ),
    Expandir = Table.ExpandTableColumn(
        MesclarVendas, "Produtos",
        {"Nome", "Categoria", "Custo"},
        {"Prod_Nome", "Prod_Cat", "Custo"}
    )
in Expandir

// ACRESCENTAR (UNION — empilhar tabelas iguais):
// Home → Acrescentar Consultas
// Útil para: unir Janeiro + Fevereiro + Março em uma tabela só`,
            explanation: 'Mesclar = JOIN (horizontal). Acrescentar = UNION (vertical). São as operações mais frequentes no dia a dia.'
          },
          {
            title: 'Boas práticas Power Query',
            code: `// ✅ BOAS PRÁTICAS — Power Query

// 1. Renomeie as etapas com nomes descritivos
//    (duplo clique no passo no painel "Etapas Aplicadas")
//    ❌ "Personalizado1"  ✅ "AdicionarColunaMes"

// 2. Crie uma consulta de parâmetro para caminhos de arquivo
//    Nova Consulta → Parâmetro
//    PastaArquivos = "C:\dados\"
//    Use: File.Contents(PastaArquivos & "vendas.xlsx")

// 3. Crie funções para lógica repetida
let
    LimparTexto = (texto as text) as text =>
        Text.Trim(Text.Upper(texto))
in LimparTexto
// Use em: Table.TransformColumns(tabela, {{"Nome", LimparTexto}})

// 4. Organize em grupos
//    (clique dir. na consulta → Mover para Grupo)
//    📁 Fontes (consultas brutas — não carregadas no modelo)
//    📁 Transformações (lógica intermediária)
//    📁 Modelo (tabelas finais carregadas)

// 5. Desabilite o carregamento de consultas intermediárias
//    Clique dir. → desmarcar "Habilitar Carga"
//    Reduz tamanho do arquivo e melhora performance`,
            explanation: 'Consultas intermediárias com carga desabilitada não entram no modelo — arquivo menor e mais rápido.'
          }
        ]
      },
      quiz: [
        {
          question: 'O que é "Cancelar Dinamização de Colunas" (Unpivot) no Power Query?',
          options: [
            'Remover colunas desnecessárias',
            'Transformar colunas em linhas — converter formato wide para long',
            'Transpor linhas e colunas',
            'Desfazer a última transformação'
          ],
          answer: 1,
          explanation: 'Unpivot: planilha com colunas Jan, Fev, Mar vira 3 linhas com coluna "Mês" e coluna "Valor" — formato ideal para BI.'
        },
        {
          question: 'Qual operação do Power Query equivale ao INNER JOIN do SQL?',
          options: ['Acrescentar Consultas', 'Mesclar — Externa Esquerda', 'Mesclar — Interna', 'Agrupar Por'],
          answer: 2,
          explanation: 'Mesclar Interna = INNER JOIN: retorna só as linhas que têm correspondência nas duas tabelas.'
        },
        {
          question: 'Por que desabilitar o carregamento de consultas intermediárias?',
          options: [
            'Para acelerar o Power Query Editor',
            'Para reduzir o tamanho do .pbix e melhorar performance do modelo',
            'Para evitar erros de tipo',
            'Para poder editar as consultas depois'
          ],
          answer: 1,
          explanation: 'Consultas de staging carregadas no modelo ocupam memória sem serventia. Só carregue as tabelas finais.'
        },
        {
          question: 'O que "Acrescentar Consultas" faz no Power Query?',
          options: [
            'Adiciona novas colunas de outra tabela (JOIN)',
            'Empilha tabelas com mesma estrutura (UNION vertical)',
            'Cria uma nova coluna calculada',
            'Adiciona um parâmetro à consulta'
          ],
          answer: 1,
          explanation: 'Acrescentar = UNION ALL: une tabelas com mesma estrutura verticalmente. Útil para consolidar dados mensais/regionais.'
        }
      ]
    },
    {
      id: 'pbi-dax',
      title: 'DAX — Medidas e Colunas',
      xp: 30,
      lesson: {
        title: 'DAX — Data Analysis Expressions',
        theory: `DAX é a linguagem de fórmulas do Power BI. Dominar DAX é o <strong>principal diferencial de analistas de BI no mercado</strong>.

Tipos de cálculo:
• <strong>Medida</strong> — calculada dinamicamente pelo contexto (filtros, slicers)
• <strong>Coluna calculada</strong> — calculada linha a linha, armazenada no modelo

Contextos DAX:
• <strong>Contexto de filtro</strong> — filtros ativos (slicer, visual)
• <strong>Contexto de linha</strong> — linha atual (em colunas calculadas)

Funções essenciais:
<code>CALCULATE</code> • <code>FILTER</code> • <code>ALL</code> • <code>SUMX</code> • <code>DIVIDE</code> • <code>RELATED</code>`,
        examples: [
          {
            title: 'Medidas básicas e intermediárias',
            code: `// ═══ MEDIDAS BÁSICAS ═══

// Nunca use SUM direto em visual — crie medidas!
Receita Total =
    SUM(Fato_Vendas[Valor_Liquido])

Qtd Pedidos =
    COUNTROWS(Fato_Vendas)

Ticket Médio =
    DIVIDE(
        [Receita Total],
        [Qtd Pedidos],
        0   // retorna 0 se divisão por zero (não erro)
    )

// ═══ MEDIDAS COM CALCULATE ═══
// CALCULATE muda o contexto de filtro

Receita Online =
    CALCULATE(
        [Receita Total],
        Dim_Canal[Canal] = "Online"
    )

Receita SP =
    CALCULATE(
        [Receita Total],
        Dim_Cliente[UF] = "SP"
    )

// Múltiplos filtros (AND implícito)
Receita SP Online =
    CALCULATE(
        [Receita Total],
        Dim_Cliente[UF] = "SP",
        Dim_Canal[Canal] = "Online"
    )`,
            explanation: 'CALCULATE é a função mais poderosa do DAX. Sempre crie medidas — nunca arraste colunas brutas para gráficos.'
          },
          {
            title: 'Inteligência de tempo — YTD, MoM, crescimento',
            code: `// ═══ TIME INTELLIGENCE ═══
// Requer tabela de datas com todas as datas contínuas
// e marcada como "Tabela de Datas" no modelo

// Receita do mês anterior
Receita Mês Anterior =
    CALCULATE(
        [Receita Total],
        PREVIOUSMONTH(Dim_Tempo[Data])
    )

// Crescimento Mês a Mês (MoM)
Crescimento MoM % =
    DIVIDE(
        [Receita Total] - [Receita Mês Anterior],
        [Receita Mês Anterior],
        BLANK()
    )

// Acumulado do Ano (YTD — Year to Date)
Receita YTD =
    CALCULATE(
        [Receita Total],
        DATESYTD(Dim_Tempo[Data])  // 1 Jan até data atual
    )

// Mesmo período do ano anterior (SPLY)
Receita Ano Anterior =
    CALCULATE(
        [Receita Total],
        SAMEPERIODLASTYEAR(Dim_Tempo[Data])
    )

// Crescimento Ano a Ano (YoY)
Crescimento YoY % =
    DIVIDE(
        [Receita Total] - [Receita Ano Anterior],
        [Receita Ano Anterior],
        BLANK()
    )`,
            explanation: 'Time Intelligence exige tabela de datas marcada e relacionada à fato. DATESYTD, PREVIOUSMONTH e SAMEPERIODLASTYEAR são as mais usadas.'
          },
          {
            title: 'Funções avançadas — RANKX, TOPN, variáveis',
            code: `// ═══ VARIÁVEIS — tornam o DAX legível ═══
Margem % =
    VAR Receita = SUM(Fato_Vendas[Valor_Liquido])
    VAR Custo   = SUMX(
                    Fato_Vendas,
                    Fato_Vendas[Qtd] * RELATED(Dim_Produto[Custo])
                  )
    VAR Margem  = Receita - Custo
    RETURN
        DIVIDE(Margem, Receita, 0)

// ═══ RANKING ═══
Rank Produto =
    RANKX(
        ALL(Dim_Produto[Produto]),  // contexto sem filtro de produto
        [Receita Total],            // métrica para ranquear
        ,                           // valor (deixar em branco = mesmo)
        DESC,                       // ordem decrescente
        DENSE                       // 1, 2, 3 (sem pular números)
    )

// ═══ ALL e ALLSELECTED ═══
// % do total geral (ignora todos os filtros da tabela)
% do Total =
    DIVIDE(
        [Receita Total],
        CALCULATE([Receita Total], ALL(Dim_Produto))
    )

// % do total filtrado (respeita outros filtros, ignora só o visual)
% do Selecionado =
    DIVIDE(
        [Receita Total],
        CALCULATE([Receita Total], ALLSELECTED(Dim_Produto))
    )`,
            explanation: 'VAR torna o DAX legível e evita recalcular a mesma expressão. RANKX com ALL cria ranking independente de filtros.'
          }
        ]
      },
      quiz: [
        {
          question: 'Qual a diferença entre Medida e Coluna Calculada no DAX?',
          options: [
            'São idênticas, só a sintaxe muda',
            'Medida é calculada no contexto do visual (dinâmica); Coluna é calculada linha a linha e armazenada',
            'Colunas são mais lentas',
            'Medidas não podem usar CALCULATE'
          ],
          answer: 1,
          explanation: 'Medidas respondem a filtros — recalculam para cada visual. Colunas calculadas são estáticas e ocupam memória.'
        },
        {
          question: 'O que CALCULATE faz de diferente de outras funções DAX?',
          options: [
            'Faz cálculos matemáticos avançados',
            'Modifica o contexto de filtro antes de avaliar a expressão',
            'Calcula mais rápido que SUM',
            'Substitui o SUMX'
          ],
          answer: 1,
          explanation: 'CALCULATE é a única função que altera o contexto de filtro. É a base de todas as análises comparativas em DAX.'
        },
        {
          question: 'Para que serve DIVIDE(numerador, denominador, 0)?',
          options: [
            'Divisão com 0 casas decimais',
            'Divisão que retorna 0 em vez de erro quando denominador é zero',
            'Divisão inteira (sem decimais)',
            'Divisão acumulada'
          ],
          answer: 1,
          explanation: 'DIVIDE trata divisão por zero retornando o valor alternativo (0 ou BLANK). Evita o erro #DIV/0 nos visuais.'
        },
        {
          question: 'O que DATESYTD faz na inteligência de tempo?',
          options: [
            'Retorna as datas do ano todo',
            'Retorna datas do dia atual ao fim do ano',
            'Retorna todas as datas desde 1 de janeiro até a data no contexto atual',
            'Retorna o mesmo período do ano anterior'
          ],
          answer: 2,
          explanation: 'YTD = Year to Date. DATESYTD retorna de 1/Jan até a data atual — usado para acumulado do ano.'
        }
      ]
    },
    {
      id: 'pbi-dashboard',
      title: 'Dashboard Profissional',
      xp: 25,
      lesson: {
        title: 'Construir Dashboards Eficazes',
        theory: `Um dashboard profissional comunica insights de forma clara. Analistas de BI são avaliados pela <strong>qualidade dos seus dashboards</strong>.

Princípios:
• <strong>Hierarquia visual</strong> — KPIs no topo, detalhes embaixo
• <strong>Consistência de cores</strong> — uma cor por métrica
• <strong>Contexto</strong> — sempre mostrar comparação (vs meta, vs anterior)
• <strong>Filtros inteligentes</strong> — slicers úteis, não decorativos
• <strong>Menos é mais</strong> — cada visual precisa justificar sua presença`,
        examples: [
          {
            title: 'Estrutura de dashboard de vendas',
            code: `LAYOUT RECOMENDADO — Dashboard de Vendas:

╔══════════════════════════════════════════════════╗
║  FILTROS: [Ano ▼] [Mês ▼] [Região ▼] [Produto ▼]║
╠══════════╦══════════╦════════════╦═══════════════╣
║ 💰       ║ 📦       ║ 👥         ║ 🎯            ║
║ R$1.2M   ║ 3.847    ║ 892        ║ 94%           ║
║ Receita  ║ Pedidos  ║ Clientes   ║ Meta          ║
║ ▲12% YoY ║ ▲8% YoY  ║ ▲15% YoY  ║ Meta: R$1.27M ║
╠══════════╩═════════╦╩════════════╩═══════════════╣
║                    ║                             ║
║  📈 Receita Mensal ║  📊 Top 10 Produtos         ║
║  (linha + área)    ║  (barras horizontais)       ║
║                    ║                             ║
╠════════════════════╬═════════════════════════════╣
║ 🗺️ Receita por UF  ║  📋 Tabela Detalhada        ║
║ (mapa preenchido)  ║  (com drill-through)        ║
╚════════════════════╩═════════════════════════════╝

DICA: Use "Página de Drill-Through" para detalhes
ao clicar em um produto/cliente específico.`,
            explanation: 'KPIs no topo com comparação. Gráficos de tendência no meio. Detalhe na base. Hierarquia clara de informação.'
          },
          {
            title: 'Formatação condicional e tooltips',
            code: `// FORMATAÇÃO CONDICIONAL — realçar outliers

// Em tabela/matriz:
// Selecione coluna → Formatação Condicional → Escala de Cor
// Ou: Regras baseadas em valor

// DAX para seta de crescimento (usado em cartão de KPI):
Ícone Crescimento =
    VAR Crescimento = [Crescimento YoY %]
    RETURN
        SWITCH(
            TRUE(),
            Crescimento > 0.1,  "🟢 ▲ " & FORMAT(Crescimento, "0.0%"),
            Crescimento > 0,    "🟡 ▲ " & FORMAT(Crescimento, "0.0%"),
            Crescimento > -0.1, "🟠 ▼ " & FORMAT(Crescimento, "0.0%"),
                                "🔴 ▼ " & FORMAT(Crescimento, "0.0%")
        )

// TOOLTIP PERSONALIZADA:
// 1. Crie nova página → Formato da Página → Tipo: Dica de Ferramenta
// 2. Coloque visuais detalhados nessa página
// 3. No visual principal: Formatação → Dica de Ferramenta → Página
// Resultado: ao passar o mouse no gráfico, aparece mini-dashboard

// BOOKMARKS (Indicadores):
// Para criar botões que alternam entre views:
// Exibição → Indicadores → Adicionar
// Crie um por estado (com/sem filtro, diferentes visões)
// Vincule a botões na tela`,
            explanation: 'FORMAT em DAX funciona como printf. SWITCH(TRUE(), ...) é o IF encadeado do DAX — mais legível.'
          }
        ]
      },
      quiz: [
        {
          question: 'Qual é a estrutura ideal para um dashboard de vendas?',
          options: [
            'Tabelas detalhadas no topo, KPIs na base',
            'KPIs com comparação no topo, gráficos de tendência no meio, detalhes na base',
            'Apenas gráficos de pizza para cada métrica',
            'Um único gráfico de barras com todas as métricas'
          ],
          answer: 1,
          explanation: 'Hierarquia: KPI (o quê) → tendência (como evoluiu) → detalhe (por quê). O executivo vê o que importa primeiro.'
        },
        {
          question: 'O que é Drill-Through no Power BI?',
          options: [
            'Filtrar hierarquia (ano → mês → dia)',
            'Navegar para página de detalhe ao clicar em um elemento',
            'Exportar dados para Excel',
            'Conectar a banco de dados em tempo real'
          ],
          answer: 1,
          explanation: 'Drill-Through: clique direito em produto → navega para página de análise daquele produto específico.'
        },
        {
          question: 'Para que servem Indicadores (Bookmarks)?',
          options: [
            'Marcar páginas favoritas no relatório',
            'Criar botões que capturam e restauram o estado da página (filtros, visibilidade)',
            'Salvar versões do .pbix',
            'Publicar o relatório no Power BI Service'
          ],
          answer: 1,
          explanation: 'Indicadores salvam o estado da página. Use para criar menus de navegação e alternar entre diferentes visualizações.'
        },
        {
          question: 'Qual o problema de ter muitos visuais em uma página de dashboard?',
          options: [
            'O Power BI não suporta mais de 10 visuais',
            'Degrada a performance e dilui o foco — dificulta a leitura dos insights',
            'Causa erro ao publicar',
            'Impede o uso de DAX'
          ],
          answer: 1,
          explanation: 'Cada visual competindo por atenção = nenhum se destaca. Dashboards eficazes têm poucos visuais, muito bem escolhidos.'
        }
      ]
    }
  ]
};
