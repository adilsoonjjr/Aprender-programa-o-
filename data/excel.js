window.EXCEL_DATA = {
  id: 'excel',
  name: 'Excel Avançado',
  icon: '📗',
  color: '#217346',
  gradient: 'linear-gradient(135deg, #217346, #1a5c38)',
  topics: [
    {
      id: 'xl-formulas',
      title: 'Fórmulas Avançadas',
      xp: 20,
      lesson: {
        title: 'Fórmulas Essenciais do Mercado',
        theory: `Dominar fórmulas avançadas é o que separa usuários comuns de <strong>analistas de dados no Excel</strong>.

Fórmulas mais cobradas em vagas:
• <code>XLOOKUP</code> / <code>PROCX</code> — substitui PROCV/ÍNDICE+CORRESP
• <code>INDEX+MATCH</code> — busca bidirecional
• <code>SUMIFS/COUNTIFS</code> — soma/contagem com múltiplos critérios
• <code>IF aninhado / IFS</code> — condicionais
• <code>TEXTO / TEXT</code> — formatar como texto
• Fórmulas dinâmicas: <code>FILTER, SORT, UNIQUE, SEQUENCE</code>`,
        examples: [
          {
            title: 'XLOOKUP — o novo PROCV (Excel 365/2021)',
            code: `// XLOOKUP (PROCX em português) — mais poderoso que PROCV
// Sintaxe: =XLOOKUP(valor_buscado; matriz_busca; matriz_retorno; [se_não_encontrado]; [modo])

// ✅ Busca simples — encontrar salário pelo nome
=XLOOKUP(A2; Funcionários[Nome]; Funcionários[Salário]; "Não encontrado")

// ✅ Busca bidirecional — linha E coluna
=XLOOKUP(A2; A:A; XLOOKUP(B1; 1:1; C2:Z100))

// ✅ Busca aproximada — faixa salarial
//    -1 = menor ou igual (tabela em ordem crescente)
=XLOOKUP(Salário; Faixas[Min]; Faixas[Nível]; "Fora"; -1)

// Comparação PROCV vs XLOOKUP:
┌────────────────────┬──────────────┬──────────────┐
│                    │    PROCV     │   XLOOKUP    │
├────────────────────┼──────────────┼──────────────┤
│ Busca à esquerda   │     ❌       │      ✅      │
│ Se não encontrado  │  #N/D        │ Valor custom │
│ Inserir coluna     │ Quebra       │ Não quebra   │
│ Busca horizontal   │     ❌       │      ✅      │
│ Compatibilidade    │ Todas versões│ 365/2021+    │
└────────────────────┴──────────────┴──────────────┘

// Para versões antigas — ÍNDICE + CORRESP (bidirecional)
=ÍNDICE(Funcionários[Salário]; CORRESP(A2; Funcionários[Nome]; 0))`,
            explanation: 'XLOOKUP/PROCX substitui PROCV e PROCH. Se sua empresa usa Excel 365, prefira XLOOKUP — mais robusto.'
          },
          {
            title: 'SOMASES/CONT.SES e fórmulas condicionais',
            code: `// SOMASES — soma com múltiplos critérios
// =SOMASES(intervalo_soma; critério1_col; critério1; critério2_col; critério2; ...)

// Vendas de Python em São Paulo em Jan/2024:
=SOMASES(
    Vendas[Valor];
    Vendas[Produto];  "Python";
    Vendas[Estado];   "SP";
    Vendas[Mês];      "Janeiro";
    Vendas[Ano];      2024
)

// CONT.SES — contar com critérios
// Quantos clientes SP com pedido > R$500:
=CONT.SES(
    Clientes[Estado]; "SP";
    Pedidos[Valor];   ">"&500
)

// IFS — múltiplas condições (substitui IF aninhado)
// =IFS(cond1; valor1; cond2; valor2; ...; VERDADEIRO; padrão)
=IFS(
    A2>=1000; "Sênior";
    A2>=500;  "Pleno";
    A2>=100;  "Júnior";
    VERDADEIRO; "Iniciante"
)

// SOMARPRODUTO — soma de produtos (sem CTRL+SHIFT+ENTER)
// Receita total = SUM(Qtd * Valor)
=SOMARPRODUTO(Vendas[Qtd]; Vendas[Valor_Unit])

// Com critério:
=SOMARPRODUTO((Vendas[Produto]="Python") * Vendas[Qtd] * Vendas[Valor])`,
            explanation: 'SOMASES é mais eficiente que SOMASE para múltiplos critérios. SOMARPRODUTO é versátil — evita fórmulas matriciais complexas.'
          },
          {
            title: 'Fórmulas dinâmicas — Excel 365',
            code: `// As fórmulas dinâmicas derramam resultados automaticamente (spill)
// Resultado ocupa múltiplas células sem Ctrl+Shift+Enter

// FILTER — filtrar lista com critérios
// =FILTRO(array; condição; [se_vazio])
=FILTRO(
    Tabela1[Produto]:Tabela1[Valor];   // colunas retornadas
    Tabela1[Estado]="SP";              // critério
    "Nenhum resultado"                 // se vazio
)

// FILTER com múltiplos critérios (* = AND, + = OR):
=FILTRO(Tabela1; (Tabela1[Estado]="SP") * (Tabela1[Valor]>500))

// UNIQUE — valores únicos (remove duplicatas)
=ÚNICO(Clientes[Estado])   // lista de estados sem repetição

// SORT — ordenar
=CLASSIFICAR(ÚNICO(Clientes[Estado]))  // estados ordenados A-Z

// SEQUENCE — sequência numérica
=SEQUÊNCIA(12; 1; 1; 1)   // lista 1 a 12 (meses)

// Combinando:
// Top 5 produtos por receita:
=ÍNDICE(
    CLASSIFICAR(Produtos; 2; -1);  // ordenado por col 2 desc
    SEQUÊNCIA(5)                   // linhas 1 a 5
)`,
            explanation: 'Fórmulas dinâmicas eliminam tabelas auxiliares. FILTRO+ÚNICO+CLASSIFICAR substituem tabelas dinâmicas em muitos casos.'
          }
        ]
      },
      quiz: [
        {
          question: 'O que XLOOKUP tem de melhor em relação ao PROCV?',
          options: [
            'É mais rápido em arquivos grandes',
            'Funciona em todas as versões do Excel',
            'Busca à esquerda, não quebra com inserção de colunas e trata erro nativo',
            'Suporta mais de um critério de busca'
          ],
          answer: 2,
          explanation: 'PROCV só busca à direita e quebra ao inserir colunas. XLOOKUP é bidirecional, robusto e com tratamento de erro integrado.'
        },
        {
          question: 'Como somar valores onde Estado = "SP" E Valor > 500 com SOMASES?',
          options: [
            '=SOMASE(Valor; ">500") E SOMASE(Estado; "SP")',
            '=SOMASES(Valor; Estado; "SP"; Valor; ">500")',
            '=SOMA(SE(Estado="SP"; SE(Valor>500; Valor)))',
            '=SOMASES(Estado; "SP"; Valor; ">500")'
          ],
          answer: 1,
          explanation: 'SOMASES: primeiro argumento é o intervalo de soma, depois pares critério_col + critério. Ordem importa!'
        },
        {
          question: 'O que são "fórmulas dinâmicas" (FILTRO, ÚNICO, CLASSIFICAR)?',
          options: [
            'Fórmulas que se atualizam a cada segundo',
            'Fórmulas que derramam resultados em múltiplas células automaticamente',
            'Fórmulas que funcionam sem conexão',
            'Fórmulas que criam tabelas dinâmicas automaticamente'
          ],
          answer: 1,
          explanation: 'Spill (derramamento): a fórmula em uma célula preenche automaticamente as células adjacentes com os resultados.'
        },
        {
          question: 'O que ÍNDICE + CORRESP permite que PROCV não permite?',
          options: [
            'Busca mais rápida',
            'Busca à esquerda da coluna de referência (bidirecional)',
            'Busca em múltiplas planilhas',
            'Busca sem diferenciar maiúsculas'
          ],
          answer: 1,
          explanation: 'PROCV só busca à direita. ÍNDICE+CORRESP busca em qualquer direção — essencial para tabelas onde a chave não é a primeira coluna.'
        }
      ]
    },
    {
      id: 'xl-pivot',
      title: 'Tabela Dinâmica e Power Query',
      xp: 25,
      lesson: {
        title: 'Tabela Dinâmica e Power Query no Excel',
        theory: `Tabela Dinâmica (Pivot Table) é a ferramenta mais poderosa do Excel para <strong>análise de dados sem fórmulas</strong>.

Power Query no Excel (mesmo motor do Power BI) permite importar e transformar dados de múltiplas fontes.

Fluxo profissional:
1. Dados brutos → <strong>Power Query</strong> (limpar, transformar)
2. Dados tratados → <strong>Tabela Dinâmica</strong> (analisar, resumir)
3. Gráfico Dinâmico → <strong>Dashboard</strong> (visualizar)`,
        examples: [
          {
            title: 'Tabela Dinâmica — configuração completa',
            code: `CRIAR TABELA DINÂMICA:
Inserir → Tabela Dinâmica → Nova Planilha

ZONAS DA TABELA DINÂMICA:
┌─────────────────────────────────────────────────┐
│  FILTROS (relatório):  Ano  ▼  Região  ▼        │
├────────────────────┬────────────────────────────┤
│  COLUNAS:          │       2023      2024        │
│                    ├───────────┬────────────────┤
│  LINHAS:           │ Jan       │  R$1.2M  R$1.4M│
│  Produto           │ Fev       │  R$0.9M  R$1.1M│
│  Subcategoria      │ Mar       │  R$1.5M  R$1.8M│
├────────────────────┼───────────┴────────────────┤
│  VALORES:          │  TOTAL    │  R$3.6M  R$4.3M│
│  Soma de Receita   └───────────┴────────────────┘

DICAS ESSENCIAIS:
✅ Sempre use Tabela (Ctrl+T) como fonte de dados
   — A TD atualiza quando a tabela cresce

✅ "Mostrar Valores Como" → % do Total, % do Pai
   → Sem fórmula extra!

✅ Campos Calculados:
   Análise → Campos, Itens e Conjuntos → Campo Calculado
   Nome: Margem %
   Fórmula: = (Receita - Custo) / Receita

✅ Segmentação de Dados (Slicer):
   Análise → Inserir Segmentação → filtra visualmente
   Conecte a múltiplas TDs: clique dir. → Conexões`,
            explanation: 'Sempre use Tabela Formatada (Ctrl+T) como fonte. A TD atualiza com Atualizar Tudo (Alt+F5) quando novos dados chegam.'
          },
          {
            title: 'Power Query no Excel — pipeline de dados',
            code: `// Dados → Obter Dados → Do Arquivo → Da Pasta de Trabalho
// OU: Dados → Obter e Transformar → Nova Consulta

// TRANSFORMAÇÕES MAIS USADAS:

// 1. Mesclar múltiplos arquivos de uma pasta:
//    Dados → Obter Dados → Arquivo → Da Pasta
//    Selecione a pasta com os arquivos mensais
//    Power Query consolida automaticamente!

// 2. Cancelar dinamização (Unpivot) — planilha wide → long
//    Antes: colunas Jan, Fev, Mar
//    Depois: coluna Mês + coluna Valor

//    Selecione colunas dos meses → Transformar
//    → Cancelar Dinamização de Colunas

// 3. Dividir coluna
//    "Nome Sobrenome" → coluna Nome + coluna Sobrenome
//    Transformar → Dividir Coluna → Por Delimitador (espaço)

// 4. Agrupar por (GROUP BY):
//    Transformar → Agrupar Por
//    Agrupar por: Produto
//    Nova coluna: Total, Operação: Soma, Coluna: Valor

// ATUALIZAR DADOS:
//    Ao clicar "Fechar e Carregar", os dados vão para planilha
//    Para atualizar: Dados → Atualizar Tudo
//    Para automático: Dados → Propriedades → Atualizar a cada N min`,
            explanation: 'Power Query no Excel: mesmo editor do Power BI. Dados → Obter Dados. Use para consolidar planilhas mensais em uma só.'
          },
          {
            title: 'Gráfico Dinâmico e dashboard no Excel',
            code: `// CRIAR DASHBOARD COM TABELAS DINÂMICAS:

// 1. ESTRUTURA:
//    Aba "Dados"      → dados brutos (tabela formatada)
//    Aba "Análise"    → tabelas dinâmicas (ocultar)
//    Aba "Dashboard"  → apenas gráficos e KPIs visíveis

// 2. KPI COM FÓRMULA (na aba Dashboard):
//    A célula mostra valor da TD em outra aba:
//    = 'Análise'!B2    (referencia célula da TD)

// 3. FORMATAÇÃO CONDICIONAL em tabelas:
//    Início → Formatação Condicional
//    → Barra de Dados (mostra proporcional)
//    → Conjunto de Ícones (setas ▲▼)
//    → Escala de Cor (heatmap verde-amarelo-vermelho)

// 4. GRÁFICO DINÂMICO conectado à Segmentação:
//    Inserir → Gráfico Dinâmico (na célula da TD)
//    Ferramentas de TD → Análise → Inserir Segmentação
//    Clique dir. na Segmentação → Conexões
//    → conecte a TODOS os gráficos da página

// 5. PROTEGER O DASHBOARD:
//    Selecione células com dados → Formatar → Bloquear
//    Revisão → Proteger Planilha → deixe só seleção livre
//    Senha opcional para editar fórmulas`,
            explanation: 'Estrutura em 3 abas profissional: dados brutos intocáveis, análise oculta, dashboard limpo para o usuário final.'
          }
        ]
      },
      quiz: [
        {
          question: 'Por que usar Tabela Formatada (Ctrl+T) como fonte da Tabela Dinâmica?',
          options: [
            'Deixa a planilha mais bonita',
            'A TD inclui automaticamente novas linhas ao atualizar',
            'Melhora a performance do Excel',
            'Permite usar XLOOKUP na TD'
          ],
          answer: 1,
          explanation: 'Com tabela formatada, ao adicionar novas linhas, a TD captura os novos dados ao Atualizar. Com intervalo fixo, precisa redefinir a fonte.'
        },
        {
          question: 'O que "Cancelar Dinamização" (Unpivot) faz no Power Query?',
          options: [
            'Remove a tabela dinâmica',
            'Transforma colunas em linhas — de formato wide para long (ideal para análise)',
            'Desfaz a última transformação',
            'Cancela o carregamento dos dados'
          ],
          answer: 1,
          explanation: 'Wide: colunas Jan, Fev, Mar. Long: linhas com coluna Mês + Valor. Format long é obrigatório para Tabela Dinâmica e Power BI.'
        },
        {
          question: 'Como conectar uma Segmentação de Dados a múltiplas Tabelas Dinâmicas?',
          options: [
            'Criar uma segmentação para cada TD',
            'Clique direito na segmentação → Conexões de Relatório → marcar todas as TDs',
            'Usar fórmula =SEGMENTAÇÃO()',
            'Vincular células manualmente'
          ],
          answer: 1,
          explanation: 'Uma única segmentação pode filtrar múltiplas TDs e gráficos dinâmicos. Clique dir. → Conexões de Relatório.'
        },
        {
          question: 'Qual a melhor estrutura de abas para um dashboard Excel profissional?',
          options: [
            'Tudo em uma única aba para facilitar',
            'Dados na 1ª aba, gráficos na 2ª',
            'Dados brutos + Análise (TDs ocultas) + Dashboard (só visuais)',
            'Uma aba por mês'
          ],
          answer: 2,
          explanation: 'Dados separados da análise e do visual. Dashboard só para o usuário final ver. Análise oculta protege as TDs de edição acidental.'
        }
      ]
    },
    {
      id: 'xl-vba',
      title: 'Macros e VBA',
      xp: 30,
      lesson: {
        title: 'VBA — Automatizar Tarefas no Excel',
        theory: `VBA (Visual Basic for Applications) automatiza tarefas repetitivas no Excel. Muito pedido em vagas de analista financeiro e operacional.

Quando usar VBA:
• Processar centenas de arquivos automaticamente
• Gerar relatórios com formatação específica
• Automatizar envio de emails com dados
• Validações e formulários customizados

Onde escrever: <strong>Alt + F11</strong> → Editor VBA`,
        examples: [
          {
            title: 'VBA — fundamentos essenciais',
            code: `' ═══ VBA BÁSICO ═══

' Declarar variáveis
Dim nome       As String
Dim valor      As Double
Dim quantidade As Integer
Dim data       As Date
Dim ativo      As Boolean

' Ler e escrever células
nome = Cells(2, 1).Value    ' célula A2 (linha 2, col 1)
nome = Range("A2").Value    ' equivalente

Range("B2").Value = "Resultado"
Cells(2, 2).Value = 42

' Condicional
If valor > 1000 Then
    Range("C2").Value = "Alto"
ElseIf valor > 500 Then
    Range("C2").Value = "Médio"
Else
    Range("C2").Value = "Baixo"
End If

' Loop For — percorrer linhas
Dim i As Integer
Dim ultimaLinha As Long
ultimaLinha = Cells(Rows.Count, 1).End(xlUp).Row  ' última linha com dado

For i = 2 To ultimaLinha  ' começa em 2 (pula cabeçalho)
    If Cells(i, 3).Value > 1000 Then
        Cells(i, 4).Value = "Acima da meta"
        Cells(i, 4).Interior.Color = RGB(198, 239, 206) ' verde
    End If
Next i

MsgBox "Processadas " & (ultimaLinha - 1) & " linhas!"`,
            explanation: 'Cells(linha, coluna) é mais prático em loops. Rows.Count.End(xlUp) detecta a última linha com dados.'
          },
          {
            title: 'Macro real — consolidar planilhas mensais',
            code: `' Macro para consolidar dados de múltiplas abas em uma só
Sub ConsolidarDados()
    Dim wsDestino  As Worksheet
    Dim ws         As Worksheet
    Dim ultimaLinha As Long
    Dim destLinha   As Long

    ' Cria ou limpa aba de destino
    On Error Resume Next
    Set wsDestino = ThisWorkbook.Sheets("Consolidado")
    If wsDestino Is Nothing Then
        Set wsDestino = ThisWorkbook.Sheets.Add
        wsDestino.Name = "Consolidado"
    Else
        wsDestino.Cells.ClearContents
    End If
    On Error GoTo 0

    ' Cabeçalho
    wsDestino.Range("A1:D1").Value = Array("Mês", "Produto", "Valor", "Qtd")
    destLinha = 2

    ' Percorre todas as abas (exceto Consolidado)
    For Each ws In ThisWorkbook.Worksheets
        If ws.Name <> "Consolidado" And ws.Name <> "Config" Then
            ultimaLinha = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row

            ' Copia dados (sem cabeçalho)
            If ultimaLinha >= 2 Then
                ws.Range("A2:D" & ultimaLinha).Copy _
                    wsDestino.Cells(destLinha, 1)
                destLinha = destLinha + (ultimaLinha - 1)
            End If
        End If
    Next ws

    ' Formatar como tabela
    wsDestino.ListObjects.Add(xlSrcRange, _
        wsDestino.Range("A1").CurrentRegion, , xlYes).Name = "tbl_Consolidado"

    MsgBox "✅ Consolidado! " & (destLinha - 2) & " registros.", vbInformation
End Sub`,
            explanation: 'For Each ws percorre todas as abas. CurrentRegion detecta o intervalo preenchido. ListObjects.Add cria Tabela Formatada.'
          },
          {
            title: 'Formulário VBA — entrada de dados',
            code: `' InputBox para receber dados do usuário
Sub AdicionarVenda()
    Dim produto  As String
    Dim valor    As Double
    Dim qtd      As Integer

    produto = InputBox("Nome do produto:", "Nova Venda")
    If produto = "" Then Exit Sub  ' usuário cancelou

    valor = CDbl(InputBox("Valor unitário (R$):", "Nova Venda"))
    qtd   = CInt(InputBox("Quantidade:", "Nova Venda"))

    ' Encontra próxima linha vazia
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("Vendas")
    Dim novaLinha As Long
    novaLinha = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row + 1

    ' Insere os dados
    ws.Cells(novaLinha, 1).Value = Date
    ws.Cells(novaLinha, 2).Value = produto
    ws.Cells(novaLinha, 3).Value = valor
    ws.Cells(novaLinha, 4).Value = qtd
    ws.Cells(novaLinha, 5).Formula = "=C" & novaLinha & "*D" & novaLinha

    ' Confirma
    MsgBox "✅ Venda registrada!" & vbNewLine & _
           produto & " | R$" & Format(valor * qtd, "#,##0.00"), _
           vbInformation, "Sucesso"
End Sub

' ATALHO: Atribuir macro a botão
' Inserir → Formas → desenhe um botão
' Clique dir. → Atribuir Macro → AdicionarVenda`,
            explanation: 'InputBox captura input do usuário. CDbl/CInt converte para número. Atribua macros a botões para facilitar o uso.'
          }
        ]
      },
      quiz: [
        {
          question: 'Como abrir o editor VBA no Excel?',
          options: ['Ctrl + V', 'Alt + F11', 'Ctrl + F11', 'Arquivo → VBA'],
          answer: 1,
          explanation: 'Alt + F11 abre o Visual Basic for Applications Editor. Também acessível em Desenvolvedor → Visual Basic.'
        },
        {
          question: 'O que Cells(Rows.Count, 1).End(xlUp).Row retorna?',
          options: [
            'O número total de linhas do Excel',
            'A última linha preenchida na coluna A',
            'A primeira linha vazia na coluna A',
            'O número de células selecionadas'
          ],
          answer: 1,
          explanation: 'Sobe (xlUp) a partir da última linha do Excel na coluna 1 até encontrar o último dado — detecta dinamicamente o fim dos dados.'
        },
        {
          question: 'Para que serve On Error Resume Next no VBA?',
          options: [
            'Para repetir o código em caso de erro',
            'Para ignorar o erro e continuar a execução da próxima linha',
            'Para mostrar uma mensagem de erro',
            'Para pausar a macro quando há erro'
          ],
          answer: 1,
          explanation: 'On Error Resume Next ignora erros temporariamente. Use com cuidado — sempre adicione On Error GoTo 0 depois para reativar o tratamento.'
        },
        {
          question: 'Como verificar se o usuário cancelou um InputBox?',
          options: [
            'If InputBox = Nothing',
            'If variavel = "" Then Exit Sub',
            'Try/Catch ao redor do InputBox',
            'On Error Goto Cancelado'
          ],
          answer: 1,
          explanation: 'InputBox retorna "" (string vazia) se o usuário clicar em Cancelar ou apertar Esc. Verificar e usar Exit Sub é a prática padrão.'
        }
      ]
    },
    {
      id: 'xl-advanced-functions',
      title: 'Funções de Texto, Data e Matriciais',
      xp: 20,
      lesson: {
        title: 'Funções Profissionais de Texto e Data',
        theory: `Analistas de dados passam muito tempo <strong>limpando e padronizando dados</strong> no Excel. Funções de texto e data são essenciais.

Categorias:
• <strong>Texto</strong> — TEXTO, ARRUMAR, EXT.TEXTO, CONCATENAR, DIVIDIRTEXTO
• <strong>Data</strong> — DIATRABALHOTOTAL, DATADIF, DIA.DA.SEMANA
• <strong>Lookup</strong> — CORRESP, ÍNDICE, ESCOLHER
• <strong>Lógica</strong> — SEERRO, SENÃODISP, E, OU`,
        examples: [
          {
            title: 'Funções de texto — limpeza de dados',
            code: `// ═══ FUNÇÕES DE TEXTO ESSENCIAIS ═══

// Limpar e padronizar texto
=ARRUMAR(A2)              // remove espaços extras
=MAIÚSCULA(A2)            // TUDO MAIÚSCULO
=MINÚSCULA(A2)            // tudo minúsculo
=PRI.MAIÚSCULA(A2)        // Primeira Letra Maiúscula

// Extrair partes do texto
=ESQUERDA(A2; 3)          // primeiros 3 caracteres
=DIREITA(A2; 4)           // últimos 4 caracteres
=EXT.TEXTO(A2; 4; 5)      // 5 chars a partir da posição 4

// Localizar posição
=LOCALIZAR(" "; A2)       // posição do 1º espaço (não diferencia maiúsc)
=PROCURAR("@"; A2)        // posição do @ (diferencia maiúsc)

// Separar nome e sobrenome
=ESQUERDA(A2; LOCALIZAR(" "; A2) - 1)  // Nome
=DIREITA(A2; NÚM.CARACT(A2) - LOCALIZAR(" "; A2))  // Sobrenome

// DIVIDIRTEXTO (Excel 365) — splitter moderno
=DIVIDIRTEXTO(A2; " ")    // divide pelo espaço → array

// Construir texto
=CONCAT(A2; " "; B2)      // junta strings (moderno)
=A2 & " - " & B2          // concatenação direta

// Converter número para texto formatado
=TEXTO(A2; "R$ #.##0,00")   // R$ 1.234,56
=TEXTO(A2; "dd/mm/aaaa")    // 31/12/2024
=TEXTO(A2; "0,0%")          // 15,3%`,
            explanation: 'DIVIDIRTEXTO retorna array dinâmico. TEXTO(valor; formato) é essencial para combinar números com texto em células.'
          },
          {
            title: 'Funções de data — cálculos profissionais',
            code: `// ═══ FUNÇÕES DE DATA ═══

// Data atual e partes
=HOJE()                    // data de hoje (dinâmica)
=AGORA()                   // data + hora atual
=ANO(A2)                   // extrai o ano
=MÊS(A2)                   // extrai o mês (1-12)
=DIA(A2)                   // extrai o dia
=DIA.DA.SEMANA(A2; 2)      // 1=Seg, 7=Dom (padrão BR, modo=2)

// Diferença entre datas
=A2 - B2                   // diferença em dias
=DATADIF(B2; A2; "d")      // dias entre datas (início; fim; "d")
=DATADIF(B2; A2; "m")      // meses completos
=DATADIF(B2; A2; "y")      // anos completos (para calcular idade!)

// Dias úteis
=DIATRABALHOTOTAL(A2; B2)          // dias úteis entre datas
=DIATRABALHOTOTAL(A2; B2; feriados) // excluindo feriados
=DIA.TRABALHO(A2; 30)              // data +30 dias úteis

// Texto para data
=DATEVAL("31/12/2024")             // converte texto para data
=DATA(ANO(A2); MÊS(A2); 1)        // primeiro dia do mês
=DATA(ANO(A2); MÊS(A2)+1; 0)      // último dia do mês

// Caso prático: calcular vencimento (30 dias úteis)
=DIA.TRABALHO(HOJE(); 30; Feriados[Data])`,
            explanation: 'DATADIF não aparece no autocompletar mas funciona — é legado do Lotus. Para idade: DATADIF(nascimento; HOJE(); "y").'
          },
          {
            title: 'SEERRO e tratamento de erros',
            code: `// ═══ TRATAMENTO DE ERROS ═══

// SEERRO — captura qualquer erro
=SEERRO(PROCV(A2; Tabela; 2; 0); "Não encontrado")
// Se PROCV der #N/D, retorna "Não encontrado"

// SENÃODISP — só captura #N/D (mais específico)
=SENÃODISP(PROCV(A2; Tabela; 2; 0); "")
// Deixa outros erros (#VALOR, #REF) aparecerem

// Verificar tipos de erro
=SE.ERRO(fórmula; "Erro genérico")    // qualquer erro
=ÉERROS(A2)                           // VERDADEIRO se A2 tem erro

// ═══ FUNÇÕES LÓGICAS AVANÇADAS ═══

// E / OU
=SE(E(A2>0; B2>0); "Ambos positivos"; "Algum negativo")
=SE(OU(A2="SP"; A2="RJ"); "Sudeste"; "Outro")

// NÃO
=SE(NÃO(ÉERRO(A2)); A2 * 1.1; "Erro na fonte")

// ESCOLHER — alternativa ao SE encadeado
// =ESCOLHER(índice; valor1; valor2; valor3; ...)
=ESCOLHER(
    DIA.DA.SEMANA(HOJE(); 2);     // índice 1-7 (seg=1)
    "Segunda"; "Terça"; "Quarta";
    "Quinta"; "Sexta"; "Sábado"; "Domingo"
)`,
            explanation: 'SENÃODISP é mais preciso que SEERRO — só mascara o erro esperado (não encontrado), não esconde erros reais de fórmula.'
          }
        ]
      },
      quiz: [
        {
          question: 'Como calcular a idade em anos completos a partir da data de nascimento?',
          options: [
            '=ANO(HOJE()) - ANO(nascimento)',
            '=DATADIF(nascimento; HOJE(); "y")',
            '=(HOJE() - nascimento) / 365',
            '=ANOS(nascimento; HOJE())'
          ],
          answer: 1,
          explanation: 'DATADIF(início; fim; "y") conta anos completos. ANO(HOJE())-ANO(nasc) dá erro para quem não fez aniversário no ano corrente.'
        },
        {
          question: 'Qual a diferença entre SEERRO e SENÃODISP?',
          options: [
            'São idênticos',
            'SEERRO captura qualquer erro; SENÃODISP só captura #N/D',
            'SENÃODISP é mais moderno e substitui SEERRO',
            'SEERRO só funciona com PROCV'
          ],
          answer: 1,
          explanation: 'Use SENÃODISP com PROCV/XLOOKUP — só mascara "não encontrado". SEERRO mascararia todos os erros, escondendo bugs.'
        },
        {
          question: 'O que =ARRUMAR(A2) faz?',
          options: [
            'Ordena os valores da célula A2',
            'Remove espaços extras no início, fim e entre palavras',
            'Remove todos os espaços',
            'Formata o texto em maiúsculas'
          ],
          answer: 1,
          explanation: 'ARRUMAR: "  João  Silva  " → "João Silva". Essencial para limpar dados importados de sistemas que têm espaços extras.'
        },
        {
          question: 'Como contar dias úteis entre duas datas excluindo feriados?',
          options: [
            '=A2-B2',
            '=DIATRABALHOTOTAL(início; fim; intervalo_feriados)',
            '=DATADIF(início; fim; "wu")',
            '=CONT.SE(intervalo; "útil")'
          ],
          answer: 1,
          explanation: 'DIATRABALHOTOTAL(início; fim; feriados) já exclui sábados, domingos e o intervalo de feriados que você fornecer.'
        }
      ]
    }
  ]
};
