window.BANCARIO_DATA = {
  id: 'bancario',
  name: 'Conhecimentos Bancários',
  icon: '🏦',
  color: '#0066CC',
  gradient: 'linear-gradient(135deg, #0066CC, #004499)',
  topics: [
    {
      id: 'ban-sfn',
      title: 'Sistema Financeiro Nacional',
      xp: 25,
      lesson: {
        title: 'Estrutura do Sistema Financeiro Nacional (SFN)',
        theory: `<p>O <strong>Sistema Financeiro Nacional (SFN)</strong> é o conjunto de instituições e instrumentos que viabilizam o fluxo financeiro entre poupadores e tomadores de recursos no Brasil. Sua estrutura é hierárquica, com três níveis.</p>

<h3>Nível 1 — Órgãos Normativos (criam as regras)</h3>
<ul>
  <li><strong>CMN — Conselho Monetário Nacional:</strong> topo do SFN. Órgão deliberativo, não executa. Composto pelo Ministro da Fazenda (presidente), Ministro do Planejamento e Presidente do BCB. Competências: regular moeda, crédito, câmbio e capital estrangeiro; fixar metas de inflação; regular as instituições financeiras.</li>
  <li><strong>CNSP — Conselho Nacional de Seguros Privados:</strong> regula seguros, previdência complementar aberta e capitalização.</li>
  <li><strong>CNPC — Conselho Nacional de Previdência Complementar:</strong> regula fundos de pensão (previdência fechada).</li>
</ul>

<h3>Nível 2 — Órgãos Supervisores (fiscalizam)</h3>
<ul>
  <li><strong>BCB — Banco Central do Brasil:</strong> executor da política monetária. Fiscaliza bancos. Emite papel-moeda. Administra o câmbio. Gestor do SFN. Presidente e diretores indicados pelo Presidente da República com mandato fixo.</li>
  <li><strong>CVM — Comissão de Valores Mobiliários:</strong> regula e fiscaliza o mercado de capitais (ações, debêntures, fundos de investimento). Protege investidores.</li>
  <li><strong>Susep — Superintendência de Seguros Privados:</strong> supervisiona seguradoras, corretoras de seguros e planos de previdência aberta.</li>
  <li><strong>Previc — Superintendência Nacional de Previdência Complementar:</strong> supervisiona fundos de pensão fechados (PREVI-BB, por exemplo).</li>
</ul>

<h3>Nível 3 — Operadores (executam)</h3>
<p>Bancos comerciais, bancos múltiplos, caixas econômicas (Caixa Econômica Federal), cooperativas de crédito, bancos de investimento, distribuidoras e corretoras de valores, seguradoras, administradoras de cartões.</p>

<h3>Instrumentos de Política Monetária do BCB</h3>
<ul>
  <li><strong>Taxa SELIC (meta):</strong> taxa básica de juros — definida pelo Copom a cada 45 dias</li>
  <li><strong>Depósito compulsório:</strong> percentual dos depósitos que os bancos devem recolher ao BCB (reduz a quantidade de dinheiro em circulação)</li>
  <li><strong>Open market (mercado aberto):</strong> compra e venda de títulos públicos pelo BCB para controlar a liquidez</li>
  <li><strong>Redesconto:</strong> empréstimo do BCB aos bancos em dificuldade de liquidez (taxa punitiva)</li>
</ul>`,
        examples: [
          {
            title: 'Hierarquia do SFN — quem manda em quem',
            code: `DIAGRAMA DO SFN:

ÓRGÃOS NORMATIVOS (criam as regras)
┌─────────────────────────────────────────────┐
│  CMN (moeda, crédito, câmbio, capitais)    │
│  CNSP (seguros privados)                   │
│  CNPC (previdência fechada)                │
└─────────────────────────────────────────────┘
           ↓ supervisionam ↓
ÓRGÃOS SUPERVISORES (fiscalizam)
┌─────────────────────────────────────────────┐
│  BCB (bancos, política monetária)          │
│  CVM (mercado de capitais, ações)          │
│  Susep (seguradoras, previdência aberta)   │
│  Previc (fundos de pensão fechados)        │
└─────────────────────────────────────────────┘
           ↓ operadores são fiscalizados ↓
OPERADORES (executam as operações)
┌─────────────────────────────────────────────┐
│  Bancos múltiplos (BB, Bradesco, Itaú)     │
│  Caixa Econômica Federal                   │
│  Cooperativas de crédito (Sicoob, Sicredi) │
│  Bancos de investimento, corretoras, etc.  │
└─────────────────────────────────────────────┘

DICA DE PROVA:
CMN → não executa operações
BCB → executa a política monetária do CMN
CVM → cuida de VALORES MOBILIÁRIOS (ações, fundos)
Susep → SEGUROS e previdência ABERTA
Previc → previdência FECHADA (fundos de pensão)`,
            explanation: 'A hierarquia do SFN é um dos pontos mais cobrados. Memorize: CMN é o topo (normatiza, não executa), BCB executa no segmento bancário/monetário, CVM no mercado de capitais. A distinção Susep (previdência ABERTA — qualquer pessoa pode contratar) vs Previc (previdência FECHADA — só funcionários de empresas) é clássica em questões.'
          },
          {
            title: 'Instrumentos de política monetária do BCB',
            code: `OBJETIVO: o BCB usa instrumentos para controlar a inflação
e garantir a estabilidade do sistema financeiro.

1. TAXA SELIC (meta):
   - Definida pelo Copom (Comitê de Política Monetária)
   - Se inflação SOBE → BCB ELEVA a SELIC → crédito fica mais caro
     → consumo cai → inflação recua (política contracionista)
   - Se inflação CEDE → BCB REDUZ a SELIC → crédito fica barato
     → consumo cresce → aquece a economia (política expansionista)

2. DEPÓSITO COMPULSÓRIO:
   - Porcentagem dos depósitos que bancos devem recolher ao BCB
   - BCB ELEVA compulsório → bancos têm menos $ para emprestar
     → crédito diminui → inflação cede
   - BCB REDUZ compulsório → bancos têm mais $ para emprestar
     → crédito aumenta → aquece a economia

3. OPEN MARKET (mercado aberto):
   - BCB VENDE títulos → retira dinheiro de circulação → contrai
   - BCB COMPRA títulos → injeta dinheiro em circulação → expande

4. REDESCONTO:
   - Banco em crise de liquidez pede empréstimo ao BCB
   - Taxa punitiva (acima da SELIC) — evita uso indiscriminado
   - BCB age como "emprestador de última instância"`,
            explanation: 'Os quatro instrumentos de política monetária são cobrados diretamente em questões do BB. A lógica é sempre: instrumento contracionista (reduz liquidez, combate inflação) vs expansionista (aumenta liquidez, estimula economia). O Open Market é o instrumento mais ágil e utilizado no dia a dia pelo BCB. O compulsório é o mais impactante quando alterado, pois afeta todo o sistema bancário simultaneamente.'
          },
          {
            title: 'Tipos de instituições financeiras — diferenças',
            code: `BANCO COMERCIAL:
- Capta depósitos à vista (conta corrente)
- Fornece crédito de curto prazo
- Pode criar moeda escritural (multiplicador bancário)
- Ex: Banco do Brasil (na carteira comercial)

BANCO MÚLTIPLO:
- Opera diversas carteiras: comercial, investimento,
  câmbio, crédito imobiliário, leasing
- Mínimo de 2 carteiras, sendo uma delas comercial ou investimento
- Maioria dos grandes bancos brasileiros são múltiplos

BANCO DE INVESTIMENTO:
- NÃO capta depósitos à vista
- Foca em financiamento de longo prazo para empresas
- Underwriting (lançamento de ações/debêntures)
- Ex: BTG Pactual

CAIXA ECONÔMICA FEDERAL:
- Empresa pública federal (não é banco múltiplo)
- Foco em habitação (FGTS, financiamento imobiliário)
- Jogo do bicho/loterias; penhor
- Agente do governo em programas sociais

BANCO DE DESENVOLVIMENTO:
- BNDES: financiamento de longo prazo para infraestrutura
- Não atende pessoas físicas diretamente

COOPERATIVA DE CRÉDITO:
- Mutualidade: serve apenas a seus associados
- Sem fins lucrativos — lucro = "sobras"
- Exemplo: Sicoob, Sicredi, Unicred`,
            explanation: 'A distinção mais cobrada é banco comercial vs banco de investimento: o comercial capta depósito à vista e faz crédito de curto prazo; o de investimento não capta depósito à vista e faz operações de longo prazo (underwriting, M&A). O banco múltiplo opera ambas as carteiras. A CEF é única por sua missão social (habitação, FGTS) e monopólio das loterias.'
          }
        ]
      },
      quiz: [
        {
          q: 'Qual órgão do Sistema Financeiro Nacional é responsável por FIXAR AS DIRETRIZES da política monetária, de crédito e de câmbio no Brasil?',
          options: [
            'Banco Central do Brasil (BCB)',
            'Comissão de Valores Mobiliários (CVM)',
            'Conselho Monetário Nacional (CMN)',
            'Superintendência de Seguros Privados (Susep)'
          ],
          answer: 2,
          explanation: 'O CMN é o órgão NORMATIVO máximo do SFN — define as diretrizes, as metas e as regras gerais. O BCB EXECUTA a política monetária definida pelo CMN, fiscaliza as instituições financeiras e emite papel-moeda. A CVM regula o mercado de capitais. A Susep supervisiona seguros. CMN = legislativo financeiro; BCB = executivo financeiro.'
        },
        {
          q: 'Quando o Banco Central eleva o depósito compulsório, qual é o efeito esperado na economia?',
          options: [
            'Os bancos têm mais recursos disponíveis para emprestar, estimulando o crédito',
            'A liquidez da economia aumenta, reduzindo as taxas de juros do mercado',
            'Os bancos têm menos recursos disponíveis para emprestar, contraindo o crédito e a inflação',
            'O câmbio se valoriza imediatamente, barateando as importações'
          ],
          answer: 2,
          explanation: 'Compulsório maior → bancos recolhem mais ao BCB → sobra menos para emprestar → crédito se contrai → consumo cai → pressão inflacionária diminui. É um instrumento de política CONTRACIONISTA. O efeito inverso ocorre ao reduzir o compulsório: bancos têm mais recursos, crédito aumenta, economia se aquece. O compulsório não afeta diretamente o câmbio.'
        },
        {
          q: 'Qual a diferença entre a SUSEP e a PREVIC no SFN?',
          options: [
            'A Susep regula bancos comerciais e a Previc regula bancos de investimento',
            'A Susep supervisiona seguros e previdência complementar ABERTA; a Previc supervisiona previdência complementar FECHADA (fundos de pensão)',
            'A Susep é órgão normativo e a Previc é órgão supervisor',
            'A Susep atua no mercado de capitais e a Previc no mercado monetário'
          ],
          answer: 1,
          explanation: 'SUSEP: supervisora de seguradoras, resseguradoras e planos de previdência/capitalização ABERTA — qualquer pessoa pode contratar (Ex: VGBL, PGBL, seguros de vida comercializados pelos bancos). PREVIC: supervisora de previdência complementar FECHADA — os chamados fundos de pensão, restritos a funcionários de determinadas empresas (Ex: PREVI — fundo de pensão dos funcionários do BB).'
        },
        {
          q: 'O Banco do Brasil atua como banco MÚLTIPLO. O que isso significa?',
          options: [
            'Que o BB opera apenas em múltiplos estados da federação',
            'Que o BB possui múltiplos acionistas, sendo o governo apenas um deles',
            'Que o BB pode operar diversas carteiras (comercial, investimento, câmbio, etc.) sob um mesmo CNPJ',
            'Que o BB é fiscalizado por múltiplos órgãos reguladores simultaneamente'
          ],
          answer: 2,
          explanation: 'Banco múltiplo é aquele autorizado a operar diversas carteiras financeiras (mínimo de 2, sendo pelo menos uma comercial ou de investimento) sob um único CNPJ, dispensando a criação de empresas separadas para cada atividade. O BB possui carteiras comercial, de crédito imobiliário, de investimento, de câmbio e de leasing. Isso simplifica a estrutura administrativa e operacional.'
        },
        {
          q: 'No contexto da política monetária, o Banco Central realiza operações de "open market" (mercado aberto). Ao VENDER títulos públicos, qual efeito produz?',
          options: [
            'Injeta dinheiro na economia, estimulando o consumo e o crédito',
            'Retira dinheiro de circulação, reduzindo a liquidez (política contracionista)',
            'Aumenta a taxa de câmbio, beneficiando os exportadores',
            'Amplia o crédito bancário, pois os bancos recebem os títulos'
          ],
          answer: 1,
          explanation: 'Open market: quando o BCB VENDE títulos, os bancos e outros participantes PAGAM ao BCB → dinheiro SAI de circulação → liquidez cai → crédito fica mais caro → inflação recua. É uma política CONTRACIONISTA. Quando o BCB COMPRA títulos, injeta dinheiro no sistema (política expansionista). O open market é o instrumento mais ágil e utilizado diariamente pelo BCB para controlar a taxa SELIC.'
        },
        {
          q: 'O Conselho Monetário Nacional (CMN) é composto por:',
          options: [
            'Presidente do BCB, Ministro da Saúde e Ministro da Educação',
            'Ministro da Fazenda, Ministro do Planejamento e Presidente do BCB',
            'Presidente do BCB, Presidente da CEF e Diretor da CVM',
            'Ministro da Fazenda, Presidente do BNDES e Presidente da B3'
          ],
          answer: 1,
          explanation: 'O CMN é composto por três membros: Ministro da Fazenda (presidente do CMN), Ministro do Planejamento e Presidente do Banco Central do Brasil. É um órgão colegiado deliberativo — não executa, apenas define as regras e diretrizes do SFN. (Lei nº 4.595/64, atualizada pela LC 179/2021)'
        },
        {
          q: '(CESGRANRIO BB) O Banco Central do Brasil, na condição de banqueiro dos bancos, tem como atribuição:',
          options: [
            'Conceder financiamentos habitacionais diretamente à população de baixa renda',
            'Receber depósitos compulsórios e voluntários das instituições financeiras',
            'Emitir ações no mercado de capitais para financiar o Tesouro Nacional',
            'Fiscalizar o mercado de valores mobiliários e proteger os investidores'
          ],
          answer: 1,
          explanation: 'Como "banqueiro dos bancos", o BCB recebe os depósitos compulsórios (parcela obrigatória dos depósitos que os bancos devem recolher ao BCB) e também aceita depósitos voluntários das instituições financeiras. Além disso, oferece o redesconto (empréstimo de última instância) aos bancos com problemas de liquidez. Financiamento habitacional é função da CEF/SBPE; emissão de ações é do Tesouro; mercado de capitais é da CVM.'
        },
        {
          q: 'A CVM — Comissão de Valores Mobiliários — tem como principal atribuição:',
          options: [
            'Fixar a meta da taxa SELIC para controle da inflação',
            'Fiscalizar e regular o mercado de capitais, protegendo investidores',
            'Supervisionar seguradoras e planos de previdência complementar aberta',
            'Emitir papel-moeda e controlar as reservas internacionais'
          ],
          answer: 1,
          explanation: 'A CVM é o órgão supervisor do mercado de capitais: fiscaliza emissão de ações, debêntures, fundos de investimento, garante transparência das informações e protege investidores. A meta SELIC é definida pelo Copom (BCB); seguros são fiscalizados pela Susep; papel-moeda e reservas são funções do BCB.'
        },
        {
          q: 'O Fundo Garantidor de Créditos (FGC) garante depósitos bancários até o limite de:',
          options: [
            'R$ 100.000 por CPF/CNPJ por instituição associada',
            'R$ 150.000 por CPF/CNPJ por instituição associada',
            'R$ 250.000 por CPF/CNPJ por instituição associada',
            'R$ 500.000 por CPF/CNPJ por instituição associada'
          ],
          answer: 2,
          explanation: 'O FGC garante até R$ 250.000 por CPF ou CNPJ por conglomerado financeiro, com teto total de R$ 1.000.000 por CPF/CNPJ a cada período de 4 anos. Produtos cobertos: contas correntes, poupança, CDB, LCI, LCA, entre outros. Produtos NÃO cobertos: cotas de fundos de investimento, ações, debêntures.'
        },
        {
          q: '(Estilo CESGRANRIO) Qual instrumento de política monetária é utilizado DIARIAMENTE pelo BCB para ajustar a taxa SELIC ao patamar definido pelo Copom?',
          options: [
            'Depósito compulsório',
            'Redesconto bancário',
            'Operações de open market (mercado aberto)',
            'Emissão de papel-moeda'
          ],
          answer: 2,
          explanation: 'O open market (mercado aberto) é o instrumento mais ágil e frequente: o BCB compra ou vende títulos públicos diariamente para manter a taxa SELIC na meta definida pelo Copom. O compulsório é alterado com menor frequência; o redesconto é para situações de iliquidez bancária; emissão de moeda não é instrumento de política monetária — é consequência dela.'
        }
      ]
    },
    {
      id: 'ban-produtos',
      title: 'Produtos e Serviços Bancários',
      xp: 25,
      lesson: {
        title: 'Produtos Bancários — Captação, Crédito e Investimento',
        theory: `<p>Conhecer os <strong>produtos e serviços bancários</strong> é essencial tanto para a prova teórica quanto para as questões de vendas e atendimento. O BB oferece um portfólio completo para pessoas físicas e jurídicas.</p>

<h3>Produtos de Captação (o banco "capta" recursos dos clientes)</h3>
<ul>
  <li><strong>Conta Corrente:</strong> depósito à vista. Permite cheque, débito automático. Garantia FGC: R$ 250 mil.</li>
  <li><strong>Poupança:</strong> rendimento: SELIC ≤ 8,5% a.a. → 70% da SELIC + TR; SELIC > 8,5% → 0,5% ao mês + TR. Isenta de IR para PF. Garantia FGC.</li>
  <li><strong>CDB (Certificado de Depósito Bancário):</strong> renda fixa, tributação pelo IR regressivo (22,5% a 15% conforme prazo). Garantia FGC até R$ 250 mil.</li>
  <li><strong>LCI (Letra de Crédito Imobiliário):</strong> isenta de IR para PF. Recursos direcionados ao setor imobiliário. Garantia FGC.</li>
  <li><strong>LCA (Letra de Crédito do Agronegócio):</strong> isenta de IR para PF. Recursos direcionados ao agronegócio. Garantia FGC.</li>
  <li><strong>CRI/CRA:</strong> sem garantia FGC. Emitidos por securitizadoras, não por bancos. Isentos de IR para PF.</li>
</ul>

<h3>Produtos de Crédito</h3>
<ul>
  <li><strong>Cheque Especial:</strong> limite rotativo — uma das taxas mais altas do mercado. Limitado a 8% ao mês (regulação BCB).</li>
  <li><strong>CDC (Crédito Direto ao Consumidor):</strong> crédito parcelado para compra de bens e serviços.</li>
  <li><strong>Leasing:</strong> arrendamento mercantil — use o bem, pague parcelas; ao final, opção de compra pelo valor residual.</li>
  <li><strong>Financiamento Imobiliário — SAC:</strong> Sistema de Amortização Constante — parcelas DECRESCENTES (amortização fixa, juros caem).</li>
  <li><strong>Financiamento Imobiliário — PRICE (Sistema Francês):</strong> parcelas IGUAIS — amortização crescente, juros decrescentes.</li>
</ul>

<h3>Produtos de Investimento</h3>
<ul>
  <li><strong>Fundos de Investimento:</strong> condomínio de investidores. Cotistas. Administrador e gestor. "Come-cotas" (IR semestral em maio e novembro para fundos de longo prazo).</li>
  <li><strong>Tesouro Direto:</strong> títulos públicos federais vendidos ao investidor pessoa física pelo Tesouro Nacional via plataforma digital.</li>
</ul>`,
        examples: [
          {
            title: 'Comparativo CDB × Poupança × LCI',
            code: `PRODUTO       TRIBUTAÇÃO   LIQUIDEZ    FGC?   RISCO
Poupança      Isento (PF)  Mensal(*)   Sim    Baixo
CDB           IR 22,5→15%  Conforme    Sim    Baixo
              (regressivo)  contrato
LCI           Isento (PF)  Conforme    Sim    Baixo
              contrato
CRI/CRA       Isento (PF)  Mercado     NÃO    Médio
                           secundário

(*) Poupança: o rendimento só é creditado na "data de
    aniversário" — sacar antes perde o rendimento do período

TABELA REGRESSIVA DE IR (CDB):
- Até 180 dias: 22,5%
- De 181 a 360 dias: 20%
- De 361 a 720 dias: 17,5%
- Acima de 720 dias: 15%

QUANDO ESCOLHER CADA UM:
LCI/LCA: isenção de IR compensa se prazo > 90 dias e
         rendimento bruto equivalente ao CDB
CDB: mais flexível em prazos, variedade de liquidez
Poupança: só compensa se outros investimentos renderem
          menos que ela após IR (cenário de SELIC baixa)`,
            explanation: 'A comparação CDB vs LCI é clássica no BB: a LCI é isenta de IR, enquanto o CDB paga alíquota regressiva. Para saber qual rende mais liquido, calcule: CDB após IR vs LCI bruta. Exemplo: CDB a 14% a.a. com IR de 17,5% (prazo 1-2 anos) → líquido: 14% × (1-0,175) = 11,55%. LCI a 11,8% a.a. isenta → LCI é melhor. O FGC garante ambos até R$250 mil por CPF por instituição.'
          },
          {
            title: 'SAC vs PRICE — sistemas de amortização',
            code: `FINANCIAMENTO: R$ 120.000 em 3 anos (36 meses)
Taxa: 1% ao mês

SISTEMA SAC (Amortização Constante):
Amortização mensal = 120.000 / 36 = R$ 3.333,33 (sempre igual)
Juros: calculados sobre saldo devedor (caem mês a mês)

Mês 1: Saldo=120.000 | Juros=1.200 | Amort.=3.333 | Parcela=4.533
Mês 2: Saldo=116.667 | Juros=1.167 | Amort.=3.333 | Parcela=4.500
Mês 3: Saldo=113.333 | Juros=1.133 | Amort.=3.333 | Parcela=4.467
...
Mês 36: parcela mais baixa ← PARCELAS DECRESCENTES

SISTEMA PRICE (Parcelas Iguais — Sistema Francês):
Parcela fixa = calculada pela fórmula financeira
Para este exemplo ≈ R$ 3.982 ao mês (constante)

Mês 1: Juros=1.200 | Amort.=2.782 | Saldo=117.218
Mês 2: Juros=1.172 | Amort.=2.810 | Saldo=114.408
(amortização CRESCE, juros CAEM — parcela fixa)

COMPARAÇÃO:
SAC: total de juros MENOR (saldo cai mais rápido)
PRICE: parcelas iniciais MENORES (mais fácil no início)
SAC: recomendado se pode pagar mais no início
PRICE: recomendado se prefere parcelas previsíveis e iguais`,
            explanation: 'SAC e PRICE são os dois sistemas mais cobrados no BB. Memorize: SAC tem parcelas DECRESCENTES (amortização fixa, juros caem sobre saldo menor); PRICE tem parcelas IGUAIS (amortização cresce, juros decrescem, mas a parcela não muda). O SAC paga menos juros totais ao longo do contrato, pois o saldo devedor cai mais rapidamente. O PRICE é mais comum em financiamentos habitacionais por facilitar o planejamento do mutuário.'
          },
          {
            title: 'Fundos de Investimento — tipos e tributação',
            code: `TIPOS DE FUNDO:
┌──────────────┬──────────────────────────────────────┐
│ Tipo         │ Características                      │
├──────────────┼──────────────────────────────────────┤
│ Renda Fixa   │ Mín. 80% em RF. Baixo risco.        │
│              │ Come-cotas: 15% (longo) ou 20%      │
│              │ (curto prazo) em mai e nov           │
├──────────────┼──────────────────────────────────────┤
│ Ações        │ Mín. 67% em ações B3.               │
│              │ IR: 15% no resgate. SEM come-cotas  │
├──────────────┼──────────────────────────────────────┤
│ Multimercado │ Sem limites por classe de ativo.    │
│              │ Risco e retorno variados             │
├──────────────┼──────────────────────────────────────┤
│ Cambial      │ Mín. 80% em ativos cambiais.        │
│              │ Protege contra desvalorização do R$ │
└──────────────┴──────────────────────────────────────┘

COME-COTAS:
- Antecipação do IR, ocorre em maio e novembro
- Reduz o número de cotas do investidor
- Aplica-se a fundos de RF, Multimercado (não a ações)
- Alíquota: 15% (longo prazo) ou 20% (curto prazo)

PARTICIPANTES DO FUNDO:
Cotista: investidor (não é sócio da empresa investida)
Administrador: responsável legal, distribui cotas
Gestor: toma as decisões de investimento
Custodiante: guarda os ativos do fundo`,
            explanation: 'Fundos de ações são exceção: não têm come-cotas e a alíquota de IR é sempre 15% independentemente do prazo de permanência. Fundos de renda fixa têm come-cotas semestrais e tabela regressiva (22,5% a 15%) — mas o come-cotas usa sempre a alíquota do prazo atual, sem esperar o resgate. A distinção entre administrador (responsabilidade legal) e gestor (decisões de investimento) é cobrada em provas.'
          }
        ]
      },
      quiz: [
        {
          q: 'Qual das seguintes características é EXCLUSIVA da poupança em comparação com o CDB?',
          options: [
            'Garantia do FGC até R$ 250.000',
            'Possibilidade de liquidez diária',
            'Isenção de Imposto de Renda para pessoa física',
            'Emissão por qualquer instituição financeira autorizada pelo BCB'
          ],
          answer: 2,
          explanation: 'Tanto poupança quanto CDB têm garantia do FGC (até R$250 mil). A poupança, porém, é ISENTA de IR para pessoa física — diferencial importante. O CDB tem tributação pelo IR regressivo (22,5% a 15%). Atenção: a LCI e a LCA também são isentas de IR para PF, assim como a poupança — mas CDB não é. A liquidez da poupança é mensal (na data de aniversário), não diária.'
        },
        {
          q: 'Qual a diferença entre LCI e CRI no que se refere à garantia do FGC?',
          options: [
            'Ambos têm garantia do FGC até R$ 250.000 por CPF por instituição',
            'A LCI tem garantia do FGC; o CRI NÃO tem garantia do FGC',
            'O CRI tem garantia do FGC; a LCI NÃO tem garantia do FGC',
            'Nenhum dos dois tem garantia do FGC'
          ],
          answer: 1,
          explanation: 'LCI (Letra de Crédito Imobiliário): emitida por BANCOS, portanto tem cobertura do FGC até R$250 mil. CRI (Certificado de Recebíveis Imobiliários): emitido por SECURITIZADORAS (não são bancos), portanto NÃO tem cobertura do FGC. Ambos são isentos de IR para PF e têm recursos direcionados ao setor imobiliário. A ausência de FGC no CRI aumenta o risco e, em compensação, geralmente oferece rentabilidade maior.'
        },
        {
          q: 'No Sistema SAC (Sistema de Amortização Constante), como se comportam as parcelas ao longo do tempo?',
          options: [
            'Parcelas iguais durante todo o contrato',
            'Parcelas crescentes, pois os juros compostos aumentam o saldo',
            'Parcelas decrescentes, pois a amortização é fixa e os juros diminuem sobre saldo menor',
            'Parcelas variáveis, ajustadas mensalmente pela taxa SELIC'
          ],
          answer: 2,
          explanation: 'SAC = Sistema de Amortização CONSTANTE: a amortização (devolução do principal) é SEMPRE igual a cada mês (total ÷ prazo). Os juros incidem sobre o saldo devedor, que vai diminuindo. Como o saldo cai, os juros também caem. Resultado: parcelas DECRESCENTES. Diferente do PRICE (Sistema Francês), onde as parcelas são iguais (amortização cresce conforme os juros caem, mantendo a parcela constante).'
        },
        {
          q: 'O que é o "come-cotas" em fundos de investimento?',
          options: [
            'Taxa de administração cobrada pelo gestor mensalmente',
            'Antecipação semestral do Imposto de Renda, que reduz as cotas do investidor em maio e novembro',
            'Taxa de saída cobrada quando o cotista resgata antes do prazo mínimo',
            'Comissão paga ao distribuidor do fundo na entrada'
          ],
          answer: 1,
          explanation: 'Come-cotas é a antecipação semestral do IR que ocorre em maio e novembro nos fundos de renda fixa e multimercado. O IR é calculado sobre o rendimento do período e cobrado pela redução do número de cotas do investidor (não em dinheiro). Fundos de ações são ISENTOS do come-cotas. A alíquota do come-cotas é sempre a mínima da tabela: 15% (fundos de longo prazo) ou 20% (curto prazo), independentemente do tempo de aplicação.'
        },
        {
          q: 'Qual produto bancário é ideal para um cliente que precisa de LIQUIDEZ DIÁRIA, sem tributação de IR e com garantia do FGC?',
          options: [
            'CDB com liquidez diária',
            'Poupança',
            'LCI com vencimento de 30 dias',
            'Fundo de Renda Fixa com resgate em D+1'
          ],
          answer: 1,
          explanation: 'Poupança: isenta de IR para PF (único produto nesse perfil com essa combinação), tem garantia do FGC e a liquidez é diária (embora o rendimento só seja creditado na data de aniversário mensal, o saque é possível a qualquer momento sem perda do valor aplicado). CDB com liquidez diária tem IR. LCI tem carência mínima de 90 dias. Fundos têm come-cotas e IR. A poupança é única na combinação: isenção + FGC + acesso imediato ao principal.'
        },
        {
          q: '(CESGRANRIO BB) O CDB — Certificado de Depósito Bancário — é um título:',
          options: [
            'Público, emitido pelo Tesouro Nacional para financiar o governo',
            'Privado de renda fixa emitido por bancos para captar recursos',
            'De renda variável negociado na B3 como ação bancária',
            'Emitido por empresas não financeiras para captar dívida corporativa'
          ],
          answer: 1,
          explanation: 'O CDB é um título de renda fixa PRIVADO emitido por bancos (comerciais, múltiplos, etc.) como forma de captar recursos junto aos investidores. O banco paga juros ao investidor e usa o dinheiro para financiar suas operações de crédito. É coberto pelo FGC até R$ 250.000. Diferentemente dos títulos públicos (Tesouro Direto), o CDB representa dívida do banco, não do governo.'
        },
        {
          q: 'A diferença fundamental entre LCI e LCA é:',
          options: [
            'A LCI financia o agronegócio e a LCA financia o setor imobiliário',
            'A LCA é isenta de IR para pessoas físicas e a LCI é tributada',
            'A LCI está vinculada ao crédito imobiliário e a LCA ao agronegócio — ambas isentas de IR para PF',
            'A LCI é garantida pelo FGC e a LCA não tem garantia'
          ],
          answer: 2,
          explanation: 'LCI (Letra de Crédito Imobiliário) — recursos destinados ao setor imobiliário. LCA (Letra de Crédito do Agronegócio) — recursos para o agronegócio. AMBAS são isentas de IR para pessoa física e ambas têm cobertura do FGC. A diferença é apenas o setor de destino dos recursos. Ambas têm carência mínima (LCI: 90 dias; LCA: 90 dias) e são emitidas por instituições financeiras.'
        },
        {
          q: '(Estilo CESGRANRIO) O Tesouro Direto é um programa que permite:',
          options: [
            'A compra de títulos privados de bancos diretamente pelo investidor',
            'A aquisição de cotas de fundos de ações da B3 por qualquer cidadão',
            'A compra de títulos públicos federais por pessoas físicas via internet',
            'O acesso a financiamentos do BNDES para pequenas empresas'
          ],
          answer: 2,
          explanation: 'O Tesouro Direto, criado em 2002 pelo Tesouro Nacional em parceria com a B3, permite que PESSOAS FÍSICAS comprem títulos públicos federais pela internet, com investimento mínimo de R$ 30. Os principais títulos: Tesouro Selic (pós-fixado), Tesouro Prefixado e Tesouro IPCA+. Não há cobertura do FGC (o emissor é o próprio governo federal), mas o risco é considerado baixo.'
        },
        {
          q: 'O Custo Efetivo Total (CET) de uma operação de crédito representa:',
          options: [
            'Apenas a taxa de juros nominal cobrada na operação',
            'Somente as tarifas e encargos, excluindo os juros contratados',
            'O custo total da operação, incluindo juros, tarifas, seguros e outros encargos',
            'A diferença entre a taxa Selic e a taxa cobrada pelo banco'
          ],
          answer: 2,
          explanation: 'O CET, obrigatório desde 2007 (Resolução CMN 3.517), representa o custo total da operação em base anual. Inclui: taxa de juros + tarifas + seguros obrigatórios + outros encargos. O objetivo é facilitar a comparação entre produtos de crédito. Por exemplo, duas operações com a mesma taxa de juros podem ter CET diferente se uma cobrar tarifas adicionais. Consumidor deve sempre comparar pelo CET.'
        },
        {
          q: '(CESGRANRIO BB) Em relação ao cheque especial, é correto afirmar que:',
          options: [
            'É um produto de investimento garantido pelo FGC',
            'É uma modalidade de crédito rotativo pré-aprovado com altas taxas de juros',
            'Tem taxa de juros máxima fixada em 8% ao ano pelo CMN',
            'Só pode ser utilizado por pessoas jurídicas'
          ],
          answer: 1,
          explanation: 'O cheque especial é um limite de crédito pré-aprovado vinculado à conta corrente — é ativado automaticamente quando o saldo vai a zero. É considerada uma das modalidades de crédito MAIS CARAS do mercado, com taxas que podem superar 10% ao mês. O CMN estabeleceu um teto de 8% ao mês a partir de 2020. É destinado a pessoas físicas e jurídicas. Não é produto de investimento.'
        }
      ]
    },
    {
      id: 'ban-mercado',
      title: 'Mercado de Capitais',
      xp: 25,
      lesson: {
        title: 'Mercado de Capitais — Ações, Bolsa e Instrumentos',
        theory: `<p>O <strong>mercado de capitais</strong> é onde empresas captam recursos de longo prazo e investidores negociam valores mobiliários. No Brasil, é regulado pela <strong>CVM</strong> e as negociações de ações ocorrem na <strong>B3</strong> (Brasil, Bolsa, Balcão).</p>

<h3>Mercado Primário vs Mercado Secundário</h3>
<ul>
  <li><strong>Mercado primário:</strong> empresa emite novas ações ou títulos → capta recursos diretamente. Ex: IPO (oferta pública inicial), emissão de debêntures. O dinheiro vai para a empresa.</li>
  <li><strong>Mercado secundário:</strong> investidores compram e vendem entre si na bolsa (B3). A empresa não recebe novos recursos — apenas os preços são determinados pelo mercado.</li>
</ul>

<h3>Ações — Tipos</h3>
<ul>
  <li><strong>Ações Ordinárias (ON):</strong> têm <em>direito a VOTO</em> nas assembleias. Tag along: direito de vender nas mesmas condições em mudança de controle. Código com 3 no final (ex: BBAS3).</li>
  <li><strong>Ações Preferenciais (PN):</strong> <em>prioridade no recebimento de dividendos</em>. Podem não ter voto (salvo se ficar 3 anos sem dividendos). Código com 4 no final (ex: PETR4).</li>
  <li><strong>Units (BDR/UNIT):</strong> certificados de depósito que representam um conjunto de ON e PN (ex: BBDC11 = 1 ON + 1 PN do Bradesco).</li>
</ul>

<h3>Dividendos vs JCP</h3>
<ul>
  <li><strong>Dividendos:</strong> distribuição do lucro líquido após IR. Isentos de IR para o acionista PF. Mínimo obrigatório: 25% do lucro ajustado.</li>
  <li><strong>JCP (Juros sobre Capital Próprio):</strong> dedutível do IRPJ da empresa → vantagem fiscal para a empresa. Paga 15% de IR na fonte para o acionista.</li>
</ul>

<h3>Índices de Mercado</h3>
<ul>
  <li><strong>IBOVESPA:</strong> principal índice acionário brasileiro — carteira teórica das ações mais negociadas na B3</li>
  <li><strong>IFIX:</strong> índice de fundos de investimento imobiliário (FIIs) listados na B3</li>
</ul>

<h3>Risco em Investimentos</h3>
<ul>
  <li><strong>Risco de mercado:</strong> variação de preços (ações, juros, câmbio)</li>
  <li><strong>Risco de crédito:</strong> o devedor não paga (calote)</li>
  <li><strong>Risco de liquidez:</strong> não consegue vender o ativo rapidamente sem perda</li>
  <li><strong>Risco operacional:</strong> falhas de sistemas, processos ou pessoas</li>
</ul>`,
        examples: [
          {
            title: 'IPO — mercado primário vs mercado secundário na prática',
            code: `EMPRESA X QUER CAPTAR R$ 500 MILHÕES:

MERCADO PRIMÁRIO — IPO (Initial Public Offering):
1. Empresa contrata banco de investimento (underwriter)
2. Elabora prospecto com informações financeiras
3. Registra oferta na CVM (aprovação necessária)
4. Período de reserva: investidores fazem pedidos
5. Preço é definido por book building (coleta de demanda)
6. Ações são emitidas e transferidas aos investidores
7. Empresa recebe os R$ 500 milhões (mercado primário)
8. Ações passam a ser negociadas na B3

MERCADO SECUNDÁRIO — depois do IPO:
- Investidor A compra ações da Empresa X de Investidor B
- Preço flutua conforme oferta e demanda
- Empresa X NÃO recebe nada — apenas os preços mudam
- Liquidez: investidor pode vender quando quiser

DEBÊNTURES — captação sem emitir ações:
- Empresa emite título de dívida (mercado primário)
- Investidor empresta dinheiro, recebe juros + principal
- Pode ser conversível em ações (debênture conversível)
- Incentivadas (Res. 476): isentas de IR para PF se
  direcionadas à infraestrutura`,
            explanation: 'A diferença mercado primário × secundário é conceito fundamental: no primário, a empresa capta recursos; no secundário, investidores negociam entre si. O IPO é o momento em que a empresa "abre o capital" — só nesse momento o dinheiro vai para a empresa. Após o IPO, toda negociação na bolsa é mercado secundário. Debêntures são alternativa às ações para captar recursos: a empresa se endivida, não dilui o capital.'
          },
          {
            title: 'Análise fundamentalista básica — P/L e P/VP',
            code: `INDICADORES FUNDAMENTALISTAS MAIS COBRADOS:

P/L — PREÇO SOBRE LUCRO:
Fórmula: P/L = Preço da ação / Lucro por ação (LPA)
Interpretação: em quantos anos o lucro da empresa
pagaria o preço atual da ação.

Exemplo:
Ação da empresa vale R$ 30,00
Lucro por ação no último ano: R$ 3,00
P/L = 30 / 3 = 10 (o mercado paga 10 anos de lucro)

P/L alto: mercado tem expectativas altas (ou ação cara)
P/L baixo: mercado tem baixas expectativas (ou ação barata)
Comparar com o P/L do setor (não há valor "certo" universal)

P/VP — PREÇO SOBRE VALOR PATRIMONIAL:
Fórmula: P/VP = Preço / (Patrimônio Líquido / nº ações)
P/VP < 1: ação negociada ABAIXO do valor contábil
P/VP > 1: mercado acredita que a empresa vale mais
           que seu patrimônio (intangíveis, crescimento)

DIVIDEND YIELD (DY):
DY = Dividendo por ação / Preço da ação × 100%
Indica o rendimento em dividendos relativo ao preço.
Exemplo: R$3 de dividendo com ação a R$60 → DY = 5%`,
            explanation: 'Indicadores fundamentalistas permitem comparar o preço de uma ação com os fundamentos da empresa. P/L e P/VP são os mais cobrados no BB. Importante: esses indicadores só fazem sentido comparando empresas do MESMO SETOR — uma empresa de tecnologia naturalmente tem P/L maior que uma empresa de energia elétrica. Dividend Yield é especialmente relevante para investidores focados em renda passiva.'
          },
          {
            title: 'Tipos de risco no setor bancário — exemplos concretos',
            code: `RISCO DE MERCADO:
Banco tem carteira de R$ 500M em títulos prefixados.
Se a taxa de juros SOBE, o valor de mercado dos títulos
CAIR (relação inversa preço-juros em renda fixa).
Perda: queda no valor da carteira. Banco pode ser
obrigado a reconhecer prejuízo ("marcação a mercado").

RISCO DE CRÉDITO:
Cliente toma empréstimo de R$ 50.000 e para de pagar.
Banco precisa provisionar a perda (PCLD — Provisão para
Crédito de Liquidação Duvidosa). Em crise, risco de crédito
sistêmico (muitos calotes simultâneos).

RISCO DE LIQUIDEZ:
Banco captou depósitos de curto prazo e emprestou por
longo prazo (transformação de maturidade). Se muitos
clientes sacam ao mesmo tempo ("corrida bancária"),
banco pode não ter caixa suficiente.
Ex: crise de 2008 (Lehman Brothers).

RISCO OPERACIONAL:
- Sistema de internet banking fora do ar 12 horas
- Funcionário que digitou R$100.000 em vez de R$10.000
- Fraude interna em agência
- Ataque hacker ao sistema de pagamentos
BCB exige capital mínimo para cobertura desse risco.`,
            explanation: 'Os quatro tipos de risco são cobrados em concursos e também no contexto de compliance/gestão de riscos. Risco de mercado afeta o valor dos ativos; crédito afeta recebimento de pagamentos; liquidez afeta a capacidade de honrar saques e obrigações; operacional afeta os processos. O Acordo de Basileia (Basileia III) define requisitos mínimos de capital para cada tipo de risco.'
          }
        ]
      },
      quiz: [
        {
          q: 'Quando uma empresa realiza um IPO (oferta pública inicial de ações), em qual mercado está operando?',
          options: [
            'Mercado secundário, pois as ações serão negociadas na B3',
            'Mercado primário, pois está emitindo novas ações para captar recursos',
            'Mercado monetário, pois envolve instrumentos de curto prazo',
            'Mercado cambial, pois pode captar recursos em moeda estrangeira'
          ],
          answer: 1,
          explanation: 'IPO é uma operação de MERCADO PRIMÁRIO: a empresa emite novas ações e capta recursos diretamente dos investidores. Após o IPO, quando os investidores negociam essas ações entre si na B3, passam para o mercado SECUNDÁRIO — e a empresa não recebe nada dessas negociações posteriores. A distinção é fundamental: mercado primário = novo capital para a empresa; secundário = apenas transferência de ações entre investidores.'
        },
        {
          q: 'Qual a diferença entre ações ORDINÁRIAS (ON) e ações PREFERENCIAIS (PN)?',
          options: [
            'ON têm prioridade no recebimento de dividendos; PN têm direito a voto',
            'ON têm direito a voto; PN têm prioridade no recebimento de dividendos',
            'ON e PN têm os mesmos direitos — a diferença é apenas no código de negociação',
            'ON são emitidas apenas por bancos; PN por demais empresas'
          ],
          answer: 1,
          explanation: 'Mnemônico: ON = Ordinárias = têm direito de vOtar. PN = Preferenciais = têm Prioridade nos dividendos. As PN normalmente não têm direito a voto, mas têm prioridade quando há distribuição de dividendos. As ON levam a designação 3 no código (ex: BBAS3) e as PN levam 4 (ex: PETR4). Se a empresa ficar 3 anos consecutivos sem pagar dividendos às PN, elas adquirem direito a voto temporariamente.'
        },
        {
          q: 'O IBOVESPA é o principal índice do mercado acionário brasileiro. O que ele representa?',
          options: [
            'A variação do câmbio dólar-real ao longo do tempo',
            'A carteira teórica das ações mais negociadas na B3, ponderada pelo volume',
            'O retorno médio dos fundos de investimento de renda fixa',
            'A taxa de crescimento do PIB brasileiro em base trimestral'
          ],
          answer: 1,
          explanation: 'O IBOVESPA (Índice Bovespa) é a carteira teórica das ações mais negociadas na B3, representando cerca de 80% do volume financeiro e do número de negócios do mercado de ações brasileiro. É calculado em tempo real e reflete a variação de preço das ações que o compõem. É o principal termômetro do mercado acionário. O IFIX é o índice equivalente para fundos imobiliários (FIIs).'
        },
        {
          q: 'Um cliente que tem ações de uma empresa e quer receber renda periódica prefere ações com alto DIVIDEND YIELD. O que indica um alto Dividend Yield?',
          options: [
            'A empresa tem alta alavancagem financeira (dívida elevada)',
            'A empresa distribui um percentual elevado de dividendos em relação ao preço da ação',
            'A ação tem grande potencial de valorização de preço no futuro',
            'A empresa tem alta volatilidade de resultados ao longo do tempo'
          ],
          answer: 1,
          explanation: 'Dividend Yield = dividendo por ação / preço da ação × 100%. Alto DY significa que a empresa distribui muito em relação ao preço pago. Exemplo: ação a R$20 que distribui R$2/ano → DY = 10%. Empresas maduras e estáveis (bancos, utilities) tendem a ter DY mais alto. Empresas de crescimento geralmente têm DY baixo (reinvestem o lucro em vez de distribuir). DY alto não significa necessariamente boa empresa — pode indicar preço deprimido.'
        },
        {
          q: 'Um banco que tem muitos clientes sacando simultâneamente suas contas, sem que o banco tenha caixa para atender a todos, está sofrendo qual tipo de risco?',
          options: [
            'Risco de mercado, pela variação nas taxas de juros',
            'Risco de crédito, pelo não pagamento de empréstimos',
            'Risco de liquidez, pela incapacidade de honrar saques no curto prazo',
            'Risco operacional, por falha nos sistemas de processamento'
          ],
          answer: 2,
          explanation: 'Risco de LIQUIDEZ: incapacidade de cumprir obrigações imediatas (pagamentos, saques) sem incorrer em perdas significativas. A "corrida bancária" é o caso extremo — muitos clientes sacam simultaneamente, e o banco não tem caixa suficiente pois emprestou os recursos por prazos mais longos. O BCB exige que bancos mantenham reservas mínimas (compulsório e LCR — Liquidity Coverage Ratio) para mitigar esse risco.'
        },
        {
          q: '(CESGRANRIO BB) No mercado primário de valores mobiliários, os recursos captados na emissão de ações:',
          options: [
            'Vão para os acionistas vendedores das ações existentes',
            'Vão para a empresa emissora, que os utiliza para se financiar',
            'São retidos pela B3 como taxa de intermediação',
            'Retornam ao investidor como dividendos imediatos'
          ],
          answer: 1,
          explanation: 'No mercado PRIMÁRIO, a empresa emite novas ações (IPO ou follow-on) e os recursos da venda vão diretamente para a empresa emissora — é como a empresa capta capital para investir. No mercado SECUNDÁRIO (Bolsa), as ações já emitidas são negociadas entre investidores, e os recursos vão para quem vende, não para a empresa. A B3 cobra taxas de corretagem, mas não retém o principal.'
        },
        {
          q: 'As debêntures são títulos emitidos por:',
          options: [
            'O governo federal para financiar a dívida pública',
            'Bancos comerciais para captação de depósitos',
            'Empresas não financeiras (sociedades anônimas) para captar dívida de longo prazo',
            'Cooperativas de crédito para financiar seus associados'
          ],
          answer: 2,
          explanation: 'Debêntures são títulos de renda fixa emitidos por EMPRESAS NÃO FINANCEIRAS (SA de capital aberto ou fechado) para captar recursos no mercado. O investidor empresta dinheiro à empresa e recebe juros. Prazo geralmente longo (2 a 10+ anos). NÃO têm cobertura do FGC. Reguladas pela CVM. Diferem do CDB (emitido por bancos) e dos títulos públicos (emitidos pelo governo).'
        },
        {
          q: 'Em relação aos Fundos de Investimento, é correto afirmar que:',
          options: [
            'São garantidos pelo FGC em caso de insolvência da gestora',
            'O investidor se torna acionista das empresas investidas pelo fundo',
            'O investidor adquire cotas e passa a ser coproprietário do patrimônio do fundo',
            'São regulados exclusivamente pelo Banco Central do Brasil'
          ],
          answer: 2,
          explanation: 'Ao investir em um fundo, o aplicador adquire COTAS — frações do patrimônio total. O fundo é um condomínio de investidores (cotistas) administrado por um gestor profissional. Fundos NÃO são cobertos pelo FGC (o risco é do mercado, não do banco). São regulados pela CVM. O gestor toma as decisões de investimento; o cotista não escolhe individualmente quais ativos comprar.'
        },
        {
          q: '(Estilo CESGRANRIO) O Ibovespa é:',
          options: [
            'A taxa básica de juros definida pelo Copom do Banco Central',
            'O principal índice de desempenho das ações mais negociadas na B3',
            'O índice de inflação medido mensalmente pelo IBGE',
            'O indicador de rentabilidade dos fundos de renda fixa'
          ],
          answer: 1,
          explanation: 'O Ibovespa (Índice Bovespa) é o principal indicador de desempenho do mercado de ações brasileiro — mede a variação de uma carteira teórica formada pelas ações mais negociadas e de maior representatividade da B3. Quando o Ibovespa sobe, indica que, em média, as ações subiram; quando cai, o mercado acionário recuou. Não é taxa de juros (isso é a SELIC) nem índice de inflação (IPCA/INPC).'
        },
        {
          q: 'O que diferencia ações ordinárias (ON) de ações preferenciais (PN)?',
          options: [
            'As ON têm preferência no recebimento de dividendos; as PN têm direito a voto',
            'As ON dão direito a voto nas assembleias; as PN têm prioridade no recebimento de dividendos',
            'Ambas têm direito a voto e recebem dividendos iguais',
            'As ON são emitidas apenas por bancos; as PN por outras empresas'
          ],
          answer: 1,
          explanation: 'Ações Ordinárias (ON — código terminado em 3): conferem direito de VOTO nas assembleias de acionistas. Ações Preferenciais (PN — código terminado em 4): têm PRIORIDADE no recebimento de dividendos e, em caso de liquidação, no reembolso do capital — mas geralmente sem direito a voto. Mnemônico: ON = "Ordinárias votam"; PN = "Preferenciais recebem primeiro".'
        }
      ]
    },
    {
      id: 'ban-atendimento',
      title: 'Vendas e Atendimento',
      xp: 20,
      lesson: {
        title: 'Técnicas de Vendas e Atendimento Bancário',
        theory: `<p>O atendimento e as vendas no banco envolvem <strong>entender as necessidades do cliente</strong> e oferecer soluções adequadas — não apenas produtos que gerem comissão. O BB valoriza a visão de <strong>consultoria financeira</strong>.</p>

<h3>Processo de Venda Consultiva</h3>
<ol>
  <li><strong>Abordagem:</strong> recepcionar o cliente com atenção e simpatia — primeiros 30 segundos são cruciais</li>
  <li><strong>Sondagem (levantamento de necessidades):</strong> perguntas abertas para descobrir objetivos, prazos e perfil de risco</li>
  <li><strong>Apresentação da solução:</strong> apresentar o produto adequado com foco nos BENEFÍCIOS para o cliente, não nas características técnicas</li>
  <li><strong>Gestão de objeções:</strong> escutar, validar, responder com empatia e informação precisa</li>
  <li><strong>Fechamento:</strong> convite para a tomada de decisão, sem pressão</li>
  <li><strong>Pós-venda:</strong> acompanhar a satisfação, base para fidelização e novas vendas</li>
</ol>

<h3>Cross-selling e Up-selling</h3>
<ul>
  <li><strong>Cross-selling:</strong> oferecer produto COMPLEMENTAR ao que o cliente já tem ou está contratando. Ex: conta corrente + cartão de crédito + seguro.</li>
  <li><strong>Up-selling:</strong> oferecer versão SUPERIOR/mais completa do produto. Ex: conta comum → conta Estilo; cartão básico → cartão gold.</li>
</ul>

<h3>Segmentação de Clientes no BB</h3>
<ul>
  <li><strong>Varejo:</strong> clientes com perfil geral — agências convencionais</li>
  <li><strong>Varejo Preferencial:</strong> renda ou investimentos em faixa intermediária — atendimento diferenciado</li>
  <li><strong>Estilo (alta renda):</strong> clientes com renda mensal a partir de R$ 5.000 ou investimentos acima de R$ 100.000 — gerente exclusivo, produtos diferenciados</li>
  <li><strong>Private (altíssima renda):</strong> patrimônio investido muito elevado — gestão de patrimônio personalizada</li>
  <li><strong>PJ (Pessoa Jurídica):</strong> empresas — carteira diferenciada por porte (MEI, pequena, média, grande empresa)</li>
</ul>

<h3>Satisfação, NPS e Canais de Atendimento</h3>
<ul>
  <li><strong>NPS (Net Promoter Score):</strong> nota de 0 a 10. Promotores (9-10), Neutros (7-8), Detratores (0-6). NPS = %Promotores - %Detratores.</li>
  <li><strong>SAC:</strong> primeiro nível de reclamação. 24h/7 dias. Gratuito. Sem transferência. Resolve problemas imediatos.</li>
  <li><strong>Ouvidoria:</strong> segundo nível. Atua quando SAC não resolveu. Prazo de 10 dias úteis. Registra na plataforma Consumidor.gov.br e BCB.</li>
</ul>`,
        examples: [
          {
            title: 'Sondagem de necessidades — descobrindo o objetivo real do cliente',
            code: `SITUAÇÃO:
Cliente entra na agência e diz: "Quero investir R$ 10.000."

ABORDAGEM INCORRETA (produto-centrismo):
Gerente: "Temos CDB a 13% ao ano, quer aplicar?"
→ Não sabe se o produto é adequado para o cliente

ABORDAGEM CORRETA — Sondagem com perguntas abertas:
1. "Para qual finalidade o senhor está pensando em investir?"
   → Pode ser viagem, reserva de emergência, aposentadoria...

2. "Em quanto tempo vai precisar desse dinheiro?"
   → Determina o prazo/liquidez necessária

3. "Como o senhor se sente em relação a riscos?
    Prefere segurança ou aceita alguma oscilação?"
   → Define o perfil de risco (conservador, moderado, arrojado)

4. "Já tem alguma reserva de emergência?"
   → Se não tem: primeiro passo é a reserva (liquidez)

RESULTADO DO DIAGNÓSTICO:
Cliente tem 32 anos, quer se aposentar confortavelmente,
aceita risco moderado, já tem reserva de emergência.
→ Produto adequado: Previdência Privada (PGBL se deduz IR)
   e/ou fundo multimercado de longo prazo

SEM A SONDAGEM: risco de vender produto inadequado
→ misselling (venda inadequada) — problema ético e legal`,
            explanation: 'A sondagem de necessidades é o coração da venda consultiva. Perguntas abertas (que começam com "para quê", "como", "quando", "qual") são mais eficazes que perguntas fechadas (sim/não). Os quatro pilares da sondagem: OBJETIVO (para quê?), PRAZO (quando precisa?), RISCO (quanto aceita perder?), SITUAÇÃO ATUAL (já tem algum investimento?). Só após essa análise o gerente deve apresentar produtos.'
          },
          {
            title: 'Gestão de objeções — as mais comuns no banco',
            code: `OBJEÇÃO 1: "Está caro" / "A taxa é muito alta"
RESPOSTA: Não discuta o preço — demonstre o VALOR
"Entendo sua preocupação com o custo. Deixa eu mostrar
o quanto esse seguro cobre e o que aconteceria sem ele..."
→ Foque nos benefícios, no custo da NÃO contratação

OBJEÇÃO 2: "Vou pensar" / "Deixa eu consultar minha esposa"
RESPOSTA: Discover e a razão real da hesitação
"Claro! Enquanto o senhor decide, posso tirar alguma dúvida
que esteja ficando? Às vezes fica mais fácil decidir com
todas as informações em mãos."
→ Talvez haja uma objeção real não expressa (preço? dúvida?)

OBJEÇÃO 3: "Já tenho isso em outro banco"
RESPOSTA: Diferenciação — o que o BB oferece a mais?
"Que bom que o senhor já tem essa proteção! Muitos clientes
mantêm produtos complementares. O nosso seguro oferece
[diferencial específico]. Posso apresentar uma simulação?"
→ Não critique o concorrente — destaque seus diferenciais

OBJEÇÃO 4: "Não confio em investimentos"
RESPOSTA: Educação financeira + segurança
"Entendo perfeitamente. O FGC garante até R$250 mil em CDB
e poupança. Posso explicar como funciona essa proteção?"`,
            explanation: 'Objeção não é rejeição — é um pedido de mais informação ou um sinal de interesse. A técnica CVBA (Característica → Vantagem → Benefício → Adaptação ao cliente) ajuda a transformar objeções em oportunidade. Nunca contradiga o cliente diretamente. Sempre valide a preocupação primeiro ("entendo", "faz sentido") antes de responder. Isso constrói rapport e mantém o diálogo aberto.'
          },
          {
            title: 'Cross-selling no contexto bancário — momento e abordagem',
            code: `CONTEXTO: Cliente abre conta corrente no BB.
Objetivo: realizar cross-selling adequado.

HIERARQUIA DE OFERTAS (mais relevante primeiro):
1. CARTÃO DE DÉBITO: incluído automaticamente — explique os
   benefícios (sem taxa de saque, pagamentos)

2. CARTÃO DE CRÉDITO: "Como o senhor vai realizar pagamentos
   maiores? Um cartão de crédito com cashback pode ajudar e
   ainda pontua no programa de benefícios."

3. SEGURO DE VIDA: "A conta corrente no BB vem com a opção
   de seguro de vida a partir de R$9,90/mês. É uma proteção
   importante para quem tem dependentes."

4. PREVIDÊNCIA PRIVADA: "Pensando no longo prazo: o senhor
   já tem alguma reserva para aposentadoria além do INSS?"

REGRA DE OURO DO CROSS-SELLING:
- Máximo 2-3 ofertas na mesma abordagem (não sobrecarregue)
- O produto deve ser RELEVANTE para a situação do cliente
- Timing: ofereça no momento certo do atendimento
- Documentação: registre o perfil e as ofertas no sistema
- Proibido: venda casada (exigir seguro para aprovar crédito)

NPS alto = cliente satisfeito → mais aberto ao cross-selling
NPS baixo = resolver problema PRIMEIRO, depois vender`,
            explanation: 'Cross-selling eficaz segue a lógica de RELEVÂNCIA: o produto oferecido deve fazer sentido para a situação do cliente naquele momento. A conta corrente abre oportunidades naturais para cartão, seguro e previdência. A venda casada (condicionar um produto a outro) é prática abusiva proibida pelo CDC e pelo BCB. Registrar todas as abordagens no CRM garante histórico e continuidade no relacionamento.'
          }
        ]
      },
      quiz: [
        {
          q: 'Na técnica de venda consultiva bancária, qual é o objetivo da etapa de SONDAGEM?',
          options: [
            'Apresentar as características e taxas dos produtos disponíveis',
            'Descobrir as necessidades reais, objetivos, prazo e perfil de risco do cliente antes de oferecer qualquer produto',
            'Convencer o cliente a fechar o produto que o gerente tem meta para vender',
            'Verificar o score de crédito e a capacidade de pagamento do cliente'
          ],
          answer: 1,
          explanation: 'A sondagem é o levantamento de necessidades — a fase mais importante da venda consultiva. Perguntas abertas revelam: o OBJETIVO do cliente (para quê quer investir/contratar?), o PRAZO (quando precisará dos recursos?), o PERFIL DE RISCO (quanto aceita perder?), a SITUAÇÃO ATUAL (já tem outros produtos?). Só com essas informações é possível indicar o produto ADEQUADO — e não apenas o que o gerente tem meta para vender.'
        },
        {
          q: 'Qual a diferença entre CROSS-SELLING e UP-SELLING no contexto bancário?',
          options: [
            'Cross-selling é vender produto mais caro; up-selling é vender produto complementar',
            'Cross-selling é oferecer produto complementar ao que o cliente já tem; up-selling é oferecer versão superior do produto',
            'São sinônimos — ambos significam aumentar o ticket médio por cliente',
            'Cross-selling aplica-se apenas a PJ; up-selling apenas a PF'
          ],
          answer: 1,
          explanation: 'CROSS-selling = venda cruzada = produto DIFERENTE e COMPLEMENTAR. Ex: cliente tem conta corrente → oferecer cartão de crédito, seguro de vida. UP-selling = venda para categoria SUPERIOR. Ex: cliente tem conta Varejo → migrar para conta Estilo; cartão básico → cartão Platinum. Ambas aumentam o relacionamento do cliente com o banco, mas por mecanismos diferentes.'
        },
        {
          q: 'O NPS (Net Promoter Score) de uma pesquisa indicou: 60% de Promotores (nota 9-10), 25% de Neutros (7-8) e 15% de Detratores (0-6). Qual o NPS?',
          options: [
            '35%',
            '45%',
            '60%',
            '75%'
          ],
          answer: 1,
          explanation: 'NPS = % Promotores - % Detratores = 60% - 15% = 45. Os Neutros (25%) NÃO entram no cálculo. NPS varia de -100 (todos detratores) a +100 (todos promotores). Interpretação: NPS acima de 75 = zona de excelência; 50-75 = zona de qualidade; 0-49 = zona de aperfeiçoamento; negativo = zona crítica. O BB utiliza o NPS para medir a satisfação em diferentes canais e segmentos.'
        },
        {
          q: 'Qual a principal diferença entre o SAC e a OUVIDORIA de um banco?',
          options: [
            'O SAC atende apenas por telefone; a Ouvidoria atende apenas por escrito',
            'O SAC resolve problemas imediatos em primeiro nível; a Ouvidoria atua em segundo nível quando o SAC não resolveu, com prazo de 10 dias úteis',
            'O SAC é pago; a Ouvidoria é gratuita',
            'O SAC é obrigatório apenas para grandes bancos; a Ouvidoria é obrigatória para todos'
          ],
          answer: 1,
          explanation: 'SAC: primeiro nível de atendimento a reclamações. Deve funcionar 24h/7 dias, ser gratuito e não pode transferir o cliente para outro número. Resolve problemas imediatos. OUVIDORIA: segundo nível — atua quando o SAC não resolveu a queixa. Prazo de até 10 dias úteis para resposta (podendo ser estendido a 20 dias em casos específicos com justificativa). As ouvidorias registram reclamações no Sistema de Monitoramento do Cidadão (SMC) do BCB.'
        },
        {
          q: 'Um gerente condiciona a aprovação de um empréstimo pessoal à contratação de um seguro de vida. Essa prática é:',
          options: [
            'Permitida, desde que o seguro seja opcional e o cliente possa recusá-lo',
            'Recomendada, pois aumenta a cobertura do cliente e protege o banco',
            'Proibida — caracteriza venda casada, prática abusiva vedada pelo CDC e pelo BCB',
            'Permitida apenas para empréstimos acima de R$ 50.000'
          ],
          answer: 2,
          explanation: 'VENDA CASADA é prática expressamente proibida pelo CDC (Art. 39, I) e pelo BCB: condicionar a venda de um produto ou serviço à aquisição de outro produto ou serviço. Oferecer o seguro juntamente com o empréstimo é permitido; EXIGIR o seguro como condição para aprovação é ilegal. O cliente prejudicado pode reclamar ao SAC, Ouvidoria, Procon, BCB (ou Consumidor.gov.br) e buscar reparação incluindo devolução em dobro do cobrado indevidamente (CDC).'
        },
        {
          q: '(CESGRANRIO BB) O tempo máximo de espera em fila em agências bancárias nos municípios com mais de 500 mil habitantes, conforme legislação federal, é de:',
          options: [
            '30 minutos em dias normais e 45 minutos em vésperas de feriado',
            '20 minutos em dias normais e 30 minutos às sextas-feiras e vésperas de feriado',
            '15 minutos em qualquer dia da semana',
            '1 hora em qualquer situação, sem distinção'
          ],
          answer: 1,
          explanation: 'A Lei Federal nº 10.962/2004, regulamentada pelo Decreto 5.061/2004, estabelece: 20 minutos em dias normais e 30 minutos às vésperas de feriados e sextas-feiras, para municípios com mais de 500 mil habitantes. Municípios menores podem ter regulamentação estadual/municipal diferente. O descumprimento pode gerar multa ao banco.'
        },
        {
          q: 'O atendimento preferencial em agências bancárias deve ser oferecido prioritariamente a:',
          options: [
            'Clientes com investimentos acima de R$ 50.000 na instituição',
            'Idosos acima de 60 anos, gestantes, lactantes, pessoas com deficiência e obesos',
            'Apenas pessoas com deficiência física comprovada por laudo médico',
            'Funcionários do banco e seus dependentes diretos'
          ],
          answer: 1,
          explanation: 'A Lei nº 10.048/2000 e o Estatuto do Idoso (Lei 10.741/2003) garantem atendimento prioritário a: pessoas com deficiência, idosos (60+), gestantes, lactantes, pessoas com criança de colo e obesos. O banco não pode condicionar esse direito ao valor investido ou tipo de conta. O desrespeito a esse direito constitui infração e pode ser denunciado ao Procon e BCB.'
        },
        {
          q: '(Estilo CESGRANRIO) Sobre o SAC e a Ouvidoria bancária, é correto afirmar:',
          options: [
            'O SAC resolve apenas reclamações e a Ouvidoria apenas dúvidas técnicas',
            'O SAC é o canal de 1º atendimento com prazo de 5 dias úteis; a Ouvidoria atua quando o SAC não resolve, com prazo de 10 dias úteis',
            'Ambos têm prazo de 30 dias para resolver qualquer reclamação',
            'A Ouvidoria é obrigatória apenas para bancos com mais de 100 agências'
          ],
          answer: 1,
          explanation: 'Hierarquia de canais: SAC (1ª instância) → resolve em até 5 dias úteis; Ouvidoria (2ª instância) → atua quando o cliente não se satisfaz com o SAC, prazo de até 10 dias úteis prorrogáveis por mais 5 dias; Banco Central → última instância. A Ouvidoria é obrigatória para todas as instituições autorizadas a funcionar pelo BCB, independentemente do porte. (Resolução BCB 4.860/2020)'
        },
        {
          q: 'O que é NPS (Net Promoter Score) no contexto do atendimento bancário?',
          options: [
            'Um índice de rentabilidade dos produtos de investimento do banco',
            'Um indicador de lealdade do cliente baseado na probabilidade de recomendação da instituição',
            'A nota mínima para aprovação de crédito pessoal pelo banco',
            'O sistema de pontuação de funcionários pelo número de produtos vendidos'
          ],
          answer: 1,
          explanation: 'NPS = % Promotores (notas 9-10) − % Detratores (notas 0-6). Criado por Fred Reichheld, mede a probabilidade de um cliente recomendar o banco a um amigo ou familiar. Escala de 0 a 10: promotores (9-10), neutros (7-8) e detratores (0-6). É amplamente usado no BB e outros bancos para monitorar a satisfação e lealdade da carteira de clientes por agência e por gerente.'
        },
        {
          q: '(CESGRANRIO BB) A portabilidade de crédito permite ao cliente:',
          options: [
            'Transferir seu saldo em conta corrente para outro banco sem custo',
            'Migrar um empréstimo/financiamento de uma instituição para outra que ofereça taxa menor',
            'Resgatar investimentos de renda fixa antes do vencimento sem multa',
            'Solicitar revisão judicial da taxa de juros de um contrato em vigor'
          ],
          answer: 1,
          explanation: 'A portabilidade de crédito (Resolução CMN 4.292/2013) permite ao devedor transferir um contrato de crédito (empréstimo, financiamento) para outra instituição que ofereça condições mais favoráveis (taxa menor, prazo melhor). O prazo para a nova instituição concluir a portabilidade é de 1 dia útil após a confirmação. Não confundir com portabilidade salarial (migração de conta onde se recebe salário).'
        }
      ]
    },
    {
      id: 'ban-compliance',
      title: 'Compliance e Prevenção à Lavagem',
      xp: 25,
      lesson: {
        title: 'Compliance, PLD/FT e LGPD no Contexto Bancário',
        theory: `<p><strong>Compliance</strong> significa conformidade com leis, regulamentos e normas internas. No banco, todo funcionário é responsável pelo cumprimento das normas — não apenas a área de Compliance. A prevenção à lavagem de dinheiro (PLD) é uma das obrigações mais rigorosas.</p>

<h3>Lavagem de Dinheiro — Lei 9.613/98</h3>
<p>Lavagem de dinheiro = tornar lícito recurso proveniente de atividade criminosa. Três fases:</p>
<ol>
  <li><strong>Colocação:</strong> inserir o dinheiro sujo no sistema financeiro. Ex: depositar dinheiro em espécie em parcelas menores ("smurfing"), comprar fichas de cassino, misturar com faturamento de comércio.</li>
  <li><strong>Ocultação (estratificação):</strong> dificultar o rastreamento. Ex: transferências múltiplas entre contas, operações no exterior, uso de "laranjas" (pessoas interpostas).</li>
  <li><strong>Integração:</strong> reintroduzir o dinheiro "limpo" na economia. Ex: compra de imóveis, obras de arte, criação de empresas.</li>
</ol>

<h3>COAF e Comunicações Obrigatórias</h3>
<p><strong>COAF (Conselho de Controle de Atividades Financeiras)</strong> — unidade de inteligência financeira do Brasil. As instituições financeiras devem comunicar ao COAF operações suspeitas em até 24h, sem comunicar ao cliente (sigilo da comunicação).</p>
<p>Operações obrigatoriamente comunicadas: depósitos em espécie ≥ R$ 50.000; saques em espécie ≥ R$ 50.000; operações sem fundamento econômico aparente; valores incompatíveis com a renda declarada.</p>

<h3>KYC — Know Your Customer</h3>
<p>O banco deve conhecer seu cliente: identificar, qualificar e monitorar. Inclui: coleta de documentos, verificação de renda, atualização cadastral periódica, identificação de PEP (Pessoa Politicamente Exposta).</p>

<h3>LGPD — Lei Geral de Proteção de Dados (Lei 13.709/18)</h3>
<ul>
  <li><strong>Dados pessoais:</strong> qualquer informação que identifique uma pessoa (nome, CPF, endereço, e-mail)</li>
  <li><strong>Dados sensíveis:</strong> origem racial, convicção religiosa, saúde, biometria, orientação sexual — proteção reforçada</li>
  <li><strong>Titular:</strong> a pessoa a quem os dados se referem</li>
  <li><strong>Controlador:</strong> quem decide o que fazer com os dados (ex: o banco)</li>
  <li><strong>Operador:</strong> quem trata os dados em nome do controlador (ex: empresa terceirizada de TI)</li>
  <li><strong>ANPD:</strong> Autoridade Nacional de Proteção de Dados — fiscaliza a aplicação da LGPD</li>
  <li><strong>Direitos do titular:</strong> acesso, correção, exclusão, portabilidade, revogação de consentimento</li>
</ul>

<h3>Sigilo Bancário — Lei Complementar 105/2001</h3>
<p>As informações financeiras dos clientes são sigilosas. Podem ser compartilhadas com: BCB e CVM (no exercício de supervisão), autoridades judiciais (mediante ordem), Receita Federal (dados de movimentações acima de limites). <strong>Sem autorização judicial, não se divulga a terceiros.</strong></p>`,
        examples: [
          {
            title: 'Fases da lavagem de dinheiro — exemplo prático (smurfing)',
            code: `CASO DE ESTUDO: "Smurfing" ou Estruturação

CRIME ANTERIOR: Tráfico de drogas gerou R$ 500.000 em dinheiro
vivo. O criminoso precisa "limpar" esse dinheiro.

FASE 1 — COLOCAÇÃO (inserir no sistema financeiro):
Criminoso usa 10 "laranjas" para depositar R$ 9.500 por dia
cada um, durante 5 dias. Total: 10 × 9.500 × 5 = R$ 475.000.
Estratégia: evitar o limite de R$ 10.000 que gera comunicação
automática (nos EUA). No Brasil, o limite de comunicação
obrigatória é R$ 50.000 em espécie.

CRIME DE "SMURFING": estruturar transações em valores
menores justamente para evitar controles regulatórios
→ Crime per se, independentemente do crime anterior

FASE 2 — OCULTAÇÃO:
Os depósitos são transferidos para 5 contas em 3 estados
diferentes, depois para uma offshore nas Ilhas Cayman.

FASE 3 — INTEGRAÇÃO:
Dinheiro retorna ao Brasil como "investimento estrangeiro"
numa construtora. Lucros da construtora parecem legítimos.

SINAIS QUE O FUNCIONÁRIO DEVE REPORTAR:
- Múltiplos depósitos em espécie pelo mesmo cliente logo
  abaixo dos limites de comunicação
- Recusa em fornecer informações sobre a origem dos recursos
- Movimentações incompatíveis com a renda declarada`,
            explanation: 'O smurfing (estruturação) é ilegal mesmo que o dinheiro seja de origem lícita — a intenção de burlar os controles já configura crime. No Brasil, a Lei 9.613/98 pune tanto a lavagem em si quanto a tentativa de ocultação. O funcionário de banco que suspeitar deve comunicar internamente (ao Compliance/PLD) sem alertar o cliente — alertar o cliente pode configurar crime de "tipping off".'
          },
          {
            title: 'Operações que DEVEM ser reportadas ao COAF',
            code: `OPERAÇÕES DE COMUNICAÇÃO OBRIGATÓRIA (Circular BCB 3.978):

1. DEPÓSITOS/SAQUES EM ESPÉCIE:
   - Transações em dinheiro vivo ≥ R$ 50.000
   - Comunicação automática, mesmo sem suspeita
   - Prazo: até o último dia do mês seguinte

2. OPERAÇÕES SUSPEITAS (independente do valor):
   ✓ Cliente que recusa identificar a origem dos recursos
   ✓ Valores incompatíveis com renda/patrimônio declarados
   ✓ Conta com transações atípicas para o perfil do cliente
   ✓ Operações fracionadas para fugir dos limites
   ✓ Depósitos em espécie seguidos de saque imediato
   ✓ Transferências para paraísos fiscais sem justificativa

3. PESSOAS EXPOSTAS POLITICAMENTE (PEP):
   - Diretoria: qualquer operação acima de R$ 50.000
   - Monitoramento reforçado

IMPORTANTE: Comunicar ao COAF sem avisar o cliente
(princípio da confidencialidade da comunicação).
Avisar o cliente pode ser considerado cumplicidade.

PRAZO:
Operações suspeitas: até 24 horas após identificação.
Automáticas (espécie): último dia útil do mês seguinte.`,
            explanation: 'O funcionário de banco tem obrigação LEGAL de reportar operações suspeitas — é uma responsabilidade individual, não apenas da área de Compliance. A comunicação ao COAF não implica acusação do cliente, mas permite que as autoridades investiguem se há crime de lavagem. O princípio da confidencialidade é crucial: se o cliente souber que foi reportado, poderá destruir provas.'
          },
          {
            title: 'LGPD no banco — direitos do titular e bases legais',
            code: `DADOS QUE O BANCO COLETA:
Pessoais: nome, CPF, endereço, data de nascimento, e-mail
Financeiros: renda, saldo, histórico de transações, score
Sensíveis: biometria facial/digital (dados biométricos)
Comportamentais: uso do app, localização (com consentimento)

BASES LEGAIS PARA TRATAMENTO (o banco NÃO precisa de
consentimento para tudo — pode usar outras bases):

1. CONTRATO: tratamento necessário para executar o contrato
   "Precisamos do seu CPF para abrir a conta" ✓

2. OBRIGAÇÃO LEGAL: cumprimento de lei/regulação
   "A Receita Federal exige que reportemos transações" ✓

3. LEGÍTIMO INTERESSE: interesse legítimo do controlador
   "Usamos seus dados de uso para melhorar o app" ✓

4. CONSENTIMENTO: quando não há outra base legal
   "Você autoriza que enviemos ofertas por WhatsApp?" ✓

DIREITOS DO TITULAR (você pode exigir do banco):
- Acesso: "Quais dados vocês têm sobre mim?"
- Correção: "Meu endereço está errado, por favor corrijam"
- Exclusão: "Quero que apaguem meus dados" (limitações)
- Portabilidade: "Quero transferir meus dados para outro banco"
- Revogação de consentimento: para dados baseados em consent.

ANPD: pode aplicar multa de até 2% do faturamento (máx. R$50M)`,
            explanation: 'A LGPD não exige consentimento para TUDO — existem outras bases legais. No contexto bancário, a maioria das operações de tratamento de dados tem base no CONTRATO (necessário para prestar o serviço) ou em OBRIGAÇÃO LEGAL (exigências do BCB, Receita Federal). O consentimento é necessário principalmente para usos "extras" como marketing direto. Os direitos do titular devem ser atendidos em até 15 dias.'
          }
        ]
      },
      quiz: [
        {
          q: 'Na lavagem de dinheiro, a fase de "colocação" corresponde a:',
          options: [
            'Reinserir o dinheiro "lavado" na economia como recursos aparentemente lícitos',
            'Realizar múltiplas transações para dificultar o rastreamento dos recursos ilícitos',
            'Introduzir o dinheiro de origem criminosa no sistema financeiro',
            'Identificar e neutralizar os responsáveis pelo crime antecedente'
          ],
          answer: 2,
          explanation: 'COLOCAÇÃO é a primeira fase: o dinheiro de origem ilícita entra no sistema financeiro. Técnicas: depósitos em espécie, compra de fichas de cassino, mistura com receitas de negócios legítimos. OCULTAÇÃO é a segunda fase: transações para dificultar o rastreamento. INTEGRAÇÃO é a terceira: o dinheiro reaparece como lícito. A sequência Colocação → Ocultação → Integração deve ser memorizada.'
        },
        {
          q: 'Um cliente realiza 20 depósitos em espécie de R$ 2.500 cada em um único dia na mesma agência. Qual a conduta correta do funcionário do banco?',
          options: [
            'Aceitar normalmente — cada depósito está abaixo do limite de comunicação',
            'Recusar os depósitos, pois o cliente está tentando fraudar o sistema',
            'Registrar os depósitos e reportar internamente como operação suspeita (estruturação)',
            'Comunicar imediatamente a Polícia Federal sobre o crime'
          ],
          answer: 2,
          explanation: 'Múltiplos depósitos em espécie em valores menores para evitar os limites de controle constitui "estruturação" ou "smurfing" — prática ilegal mesmo que o dinheiro seja lícito. O funcionário deve: (1) aceitar os depósitos normalmente (não alertar o cliente); (2) registrar os dados da operação; (3) comunicar ao setor de PLD/Compliance do banco; (4) o banco, por sua vez, reporta ao COAF. Nunca comunicar diretamente à polícia — isso é papel do COAF/autoridades competentes.'
        },
        {
          q: 'Na LGPD, qual é a diferença entre CONTROLADOR e OPERADOR de dados?',
          options: [
            'Controlador trata dados de pessoas físicas; Operador trata dados de pessoas jurídicas',
            'Controlador decide o quê e como tratar os dados; Operador trata os dados em nome do Controlador',
            'Controlador é a ANPD; Operador é a empresa privada que processa os dados',
            'São sinônimos — ambos tratam dados com as mesmas responsabilidades'
          ],
          answer: 1,
          explanation: 'CONTROLADOR: decide as finalidades e os meios do tratamento de dados (ex: o Banco do Brasil decide quais dados coletar dos clientes e para quê). OPERADOR: trata os dados em nome e sob as instruções do controlador (ex: empresa de TI terceirizada que processa os dados do banco). O Titular é o dono dos dados. A ANPD fiscaliza. Tanto o controlador quanto o operador têm responsabilidades e podem ser sancionados em caso de violação.'
        },
        {
          q: 'O sigilo bancário (LC 105/2001) pode ser quebrado em qual situação?',
          options: [
            'Quando um cônjuge solicita informações sobre a conta do parceiro em processo de divórcio',
            'Quando o empregador solicita comprovação de salário do funcionário',
            'Por determinação judicial ou para atender a requisição do Banco Central no exercício de supervisão',
            'Quando o cliente autoriza verbalmente o compartilhamento com terceiros'
          ],
          answer: 2,
          explanation: 'O sigilo bancário protege as informações financeiras dos clientes e só pode ser quebrado em situações taxativamente previstas em lei: por ORDEM JUDICIAL; pelo BCB no exercício de supervisão do sistema financeiro; pela CVM em processos administrativos; pela Receita Federal para dados de movimentações acima dos limites legais. Cônjuge, empregador e terceiros em geral NÃO têm acesso sem autorização do titular ou ordem judicial. Autorização verbal não tem validade legal — deve ser formal e específica.'
        },
        {
          q: 'Qual das seguintes afirmativas sobre o KYC (Know Your Customer) está CORRETA?',
          options: [
            'KYC é uma prática opcional, adotada apenas pelos bancos que desejam oferecer serviços diferenciados',
            'KYC consiste em identificar, qualificar e monitorar clientes para prevenir lavagem de dinheiro e financiamento ao terrorismo',
            'KYC aplica-se apenas a clientes pessoa jurídica, não a pessoas físicas',
            'O processo de KYC dispensa a atualização cadastral periódica após o cadastro inicial'
          ],
          answer: 1,
          explanation: 'KYC (Conheça seu Cliente) é obrigação regulatória imposta pela Circular BCB 3.978 e legislação PLD/FT. Envolve: (1) IDENTIFICAÇÃO: coletar e verificar documentos do cliente; (2) QUALIFICAÇÃO: entender o perfil, origem de renda e objetivo das operações; (3) MONITORAMENTO: acompanhar se as transações são compatíveis com o perfil declarado. Aplica-se a PF e PJ. A atualização cadastral é periódica e obrigatória — perfis de maior risco devem ser atualizados com mais frequência.'
        },
        {
          q: '(CESGRANRIO BB) As fases da lavagem de dinheiro, na ordem cronológica correta, são:',
          options: [
            'Integração → Colocação → Ocultação',
            'Colocação → Ocultação → Integração',
            'Ocultação → Integração → Colocação',
            'Transferência → Estratificação → Conversão'
          ],
          answer: 1,
          explanation: 'As 3 fases clássicas: (1) COLOCAÇÃO: inserção do dinheiro ilícito no sistema financeiro (depósitos fracionados, compra de ativos); (2) OCULTAÇÃO (ou estratificação): operações complexas para dificultar o rastreamento (transferências internacionais, conversão em outros ativos); (3) INTEGRAÇÃO: o dinheiro "limpo" retorna à economia como aparentemente lícito. Cada fase tentada é crime de lavagem de dinheiro (Lei 9.613/1998).'
        },
        {
          q: 'O COAF — Conselho de Controle de Atividades Financeiras — tem como função principal:',
          options: [
            'Regular as taxas de juros do crédito consignado',
            'Produzir inteligência financeira e combater lavagem de dinheiro e financiamento ao terrorismo',
            'Supervisionar cooperativas de crédito e suas operações',
            'Autorizar o funcionamento de novas instituições financeiras no Brasil'
          ],
          answer: 1,
          explanation: 'O COAF (hoje vinculado ao BCB) é a Unidade de Inteligência Financeira (UIF) do Brasil. Recebe comunicações de operações suspeitas de diversos setores (bancos, joalherias, imobiliárias, etc.), analisa os dados e repassa informações ao Ministério Público e órgãos de investigação. Não é responsável por autorizar bancos (isso é o BCB) nem por regular juros (isso é o CMN). (Lei 9.613/1998 e LC 179/2021)'
        },
        {
          q: '(Estilo CESGRANRIO) Uma Pessoa Politicamente Exposta (PEP), conforme regulação brasileira, é aquela que:',
          options: [
            'Tem patrimônio declarado acima de R$ 5 milhões no Imposto de Renda',
            'Exerce ou exerceu nos últimos 5 anos cargo público relevante no Brasil ou exterior',
            'Possui conta em mais de 3 instituições financeiras simultaneamente',
            'É investigada por órgãos de controle governamental'
          ],
          answer: 1,
          explanation: 'PEP é quem exerce (ou exerceu nos últimos 5 anos) cargo ou função pública de relevância: Presidente da República, ministros, parlamentares, governadores, magistrados, diretores de estatais, etc. Cônjuges e parentes até 2º grau também são tratados como PEP. Para PEPs, as instituições financeiras devem aplicar DILIGÊNCIA AMPLIADA: identificação mais rigorosa, monitoramento intenso e aprovação de níveis superiores. (Resolução BCB 4.753 e Circular 3.978)'
        },
        {
          q: 'Pela LGPD (Lei nº 13.709/2018), as instituições financeiras têm obrigação de:',
          options: [
            'Compartilhar dados dos clientes com parceiros comerciais sem necessidade de consentimento',
            'Destruir todos os dados do cliente imediatamente após o encerramento da conta',
            'Garantir a segurança dos dados pessoais, informar sobre o uso e responder às solicitações dos titulares',
            'Isentar-se da lei por já serem reguladas pelo Banco Central'
          ],
          answer: 2,
          explanation: 'A LGPD se aplica às instituições financeiras como qualquer organização que trate dados pessoais. Obrigações: informar ao titular como os dados são usados (transparência), garantir segurança contra vazamentos, atender solicitações de acesso/correção/exclusão dos dados, obter consentimento quando necessário e indicar um DPO (Encarregado de Proteção de Dados). Infrações podem gerar multas de até 2% do faturamento ou R$ 50 milhões por infração.'
        },
        {
          q: '(CESGRANRIO BB) Quais produtos bancários NÃO têm cobertura do Fundo Garantidor de Créditos (FGC)?',
          options: [
            'CDB e LCI emitidos por bancos de médio porte',
            'Contas correntes com saldo até R$ 250.000',
            'Cotas de fundos de investimento e ações',
            'Letras de câmbio e letras hipotecárias'
          ],
          answer: 2,
          explanation: 'O FGC COBRE: conta corrente, conta poupança, CDB, LCI, LCA, letras de câmbio, letras hipotecárias, letras imobiliárias, RDB — até R$ 250.000 por CPF/CNPJ por conglomerado. O FGC NÃO COBRE: cotas de fundos de investimento (o risco é do mercado), ações, debêntures, títulos públicos, CRIs, CRAs. Fundos e ações são regulados pela CVM e o risco é do investidor.'
        }
      ]
    }
  ]
};
