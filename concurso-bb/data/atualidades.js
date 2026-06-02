window.ATUALIDADES_DATA = {
  id: 'atualidades',
  name: 'Atualidades',
  icon: '🌎',
  color: '#ec4899',
  description: 'Economia, mercado e conjuntura',
  topics: [
    {
      id: 'economia_brasil',
      title: 'Economia Brasileira',
      xp: 30,
      theory: `<p><strong>Economia Brasileira</strong> aborda os principais indicadores e políticas econômicas que o candidato ao BB deve conhecer para compreender o ambiente em que o banco opera.</p>
<h3>Política Monetária</h3>
<ul>
  <li><strong>Taxa Selic:</strong> taxa básica de juros da economia, definida pelo Copom (Comitê de Política Monetária do Banco Central)</li>
  <li><strong>Inflação:</strong> medida principalmente pelo IPCA (IBGE) e pelo IGP-M (FGV)</li>
  <li><strong>Metas de Inflação:</strong> sistema adotado em 1999, o CMN define a meta, o Bacen busca atingi-la via Selic</li>
</ul>
<h3>Política Fiscal</h3>
<ul>
  <li><strong>Resultado Primário:</strong> receitas menos despesas (exceto juros)</li>
  <li><strong>Resultado Nominal:</strong> inclui pagamento de juros da dívida</li>
  <li><strong>Dívida Pública:</strong> soma dos déficits acumulados pelo governo</li>
</ul>
<h3>Indicadores Importantes</h3>
<ul>
  <li><strong>PIB</strong> (Produto Interno Bruto): soma de bens e serviços produzidos</li>
  <li><strong>Câmbio:</strong> cotação do real frente a moedas estrangeiras</li>
  <li><strong>CDI:</strong> Certificado de Depósito Interbancário — base para investimentos</li>
</ul>`,
      examples: [
        {
          header: 'Relação entre Selic, inflação e crédito',
          code: `CICLO DE ALTA DA SELIC:
  Inflação sobe → Copom eleva Selic
  → crédito fica mais caro → consumo cai
  → inflação tende a ceder

CICLO DE BAIXA DA SELIC:
  Inflação cede → Copom reduz Selic
  → crédito mais barato → consumo aumenta
  → economia aquece

PARA O BANCO DO BRASIL:
  Selic alta → spread bancário sobe
             → rendimento de títulos públicos sobe
  Selic baixa → pressão para reduzir taxas de crédito`,
          explanation: `<p>O Copom se reúne a cada 45 dias para definir a Selic. O BB, como instituição financeira, é diretamente impactado pelas decisões de política monetária.</p>`
        }
      ],
      questions: [
        {
          q: 'O COPOM é responsável por:',
          options: ['Definir as metas de inflação para o ano seguinte', 'Fixar a taxa básica de juros (Selic) da economia brasileira', 'Emitir papel-moeda em circulação', 'Aprovar o orçamento federal'],
          answer: 1,
          explanation: 'O Copom (Comitê de Política Monetária) do Banco Central se reúne a cada 45 dias para definir a taxa Selic, principal instrumento de política monetária do Brasil.'
        },
        {
          q: 'O IPCA é:',
          options: ['A taxa básica de juros da economia', 'O índice de inflação oficial do Brasil, medido pelo IBGE', 'O índice que mede o crescimento do PIB', 'A taxa de câmbio do real frente ao dólar'],
          answer: 1,
          explanation: 'O IPCA (Índice Nacional de Preços ao Consumidor Amplo) é o índice oficial de inflação do Brasil, calculado pelo IBGE. É o índice usado pelo sistema de metas de inflação.'
        },
        {
          q: 'Quando a taxa Selic sobe, o efeito esperado sobre a inflação é:',
          options: ['Inflação aumenta, pois o dinheiro perde valor', 'Inflação tende a cair, pois o crédito fica mais caro e o consumo arrefece', 'A Selic não afeta a inflação', 'Inflação aumenta apenas no setor industrial'],
          answer: 1,
          explanation: 'A Selic mais alta encarece o crédito, reduz o consumo e os investimentos, diminuindo a pressão sobre os preços. É o principal mecanismo de controle da inflação pelo Bacen.'
        },
        {
          q: 'O CDI (Certificado de Depósito Interbancário) é importante porque:',
          options: ['É a moeda oficial do Brasil', 'Serve de referência para a rentabilidade de grande parte dos investimentos financeiros', 'É um título emitido pelo governo federal', 'É o mesmo que a taxa Selic'],
          answer: 1,
          explanation: 'O CDI é a taxa praticada entre bancos em empréstimos de curtíssimo prazo. É muito próxima da Selic e serve como benchmark (referência) para CDBs, fundos e outros investimentos.'
        },
        {
          q: 'O PIB (Produto Interno Bruto) mede:',
          options: ['Apenas as exportações brasileiras', 'A soma de todos os bens e serviços produzidos no país em determinado período', 'A dívida total do governo brasileiro', 'O lucro das empresas nacionais'],
          answer: 1,
          explanation: 'O PIB mede o valor total de todos os bens e serviços finais produzidos em um país em determinado período (geralmente um ano ou trimestre). É o principal indicador do tamanho da economia.'
        }
      ]
    },
    {
      id: 'mercado_financeiro',
      title: 'Mercado Financeiro e Capitais',
      xp: 35,
      theory: `<p>O <strong>mercado financeiro</strong> conecta quem tem dinheiro sobrando (poupadores) com quem precisa de recursos (tomadores). É o ambiente em que o BB atua.</p>
<h3>Mercado de Capitais</h3>
<ul>
  <li><strong>Ações:</strong> participação no capital de uma empresa (renda variável)</li>
  <li><strong>Debêntures:</strong> títulos de dívida emitidos por empresas</li>
  <li><strong>Bolsa de Valores (B3):</strong> ambiente de negociação de ativos</li>
  <li><strong>IPO</strong> (Initial Public Offering): abertura de capital na bolsa</li>
</ul>
<h3>Mercado Monetário</h3>
<ul>
  <li>Operações de curtíssimo prazo (overnight, CDI)</li>
  <li>Títulos públicos (Tesouro Nacional)</li>
  <li>Open market: Bacen regula a liquidez comprando/vendendo títulos</li>
</ul>
<h3>Mercado Cambial</h3>
<ul>
  <li>Compra e venda de moedas estrangeiras</li>
  <li>Câmbio flutuante: determinado pela oferta e demanda</li>
  <li>Intervenção do Bacen: quando há volatilidade excessiva</li>
</ul>`,
      examples: [
        {
          header: 'Renda Fixa vs Renda Variável',
          code: `RENDA FIXA                    RENDA VARIÁVEL
Retorno previsível             Retorno incerto
Menor risco (geral)           Maior risco (geral)
Ex: CDB, LCI, Tesouro        Ex: Ações, FIIs, BDRs

TIPOS DE RENDA FIXA:
  Prefixada: taxa definida no início (ex: 12% a.a.)
  Pós-fixada: atrelada a índice (ex: 100% CDI)
  Híbrida: parte fixa + índice (ex: IPCA + 5% a.a.)`,
          explanation: `<p>No mercado bancário, a maior parte dos produtos de investimento é de renda fixa. O BB Investimentos distribui tanto produtos de RF quanto de RV.</p>`
        }
      ],
      questions: [
        {
          q: 'Ações negociadas na bolsa de valores são classificadas como:',
          options: ['Renda fixa prefixada', 'Renda fixa pós-fixada', 'Renda variável', 'Renda fixa híbrida'],
          answer: 2,
          explanation: 'Ações são instrumentos de renda variável — seu retorno não é predefinido, dependendo do desempenho da empresa e das condições do mercado. Podem valorizar ou desvalorizar.'
        },
        {
          q: 'A B3 é:',
          options: ['O Banco Central do Brasil', 'A bolsa de valores brasileira, onde são negociadas ações e outros ativos', 'Um tipo de título público federal', 'A sigla para o Banco do Brasil na bolsa'],
          answer: 1,
          explanation: 'A B3 (Brasil, Bolsa, Balcão) é a bolsa de valores brasileira, resultado da fusão entre BM&FBovespa e Cetip. Nela são negociadas ações, fundos, derivativos e outros ativos.'
        },
        {
          q: 'Um título de renda fixa "prefixado" significa que:',
          options: ['O rendimento está atrelado ao IPCA', 'A taxa de retorno é definida no momento da aplicação', 'O rendimento acompanha o CDI', 'O retorno depende do desempenho do emissor'],
          answer: 1,
          explanation: 'Prefixado: a taxa é definida no início da aplicação (ex: 12% ao ano). O investidor sabe exatamente quanto receberá ao final. Oposto: pós-fixado (atrelado a CDI, Selic, IPCA).'
        },
        {
          q: 'O open market é um instrumento pelo qual o Banco Central:',
          options: ['Abre novas agências bancárias no mercado', 'Compra e vende títulos públicos para regular a liquidez do sistema', 'Define o câmbio oficial do real', 'Autoriza a abertura de novos bancos'],
          answer: 1,
          explanation: 'O open market (operações de mercado aberto) é o principal instrumento de política monetária operacional. O Bacen compra/vende títulos para controlar a liquidez e manter a Selic na meta.'
        },
        {
          q: 'Um IPO (Initial Public Offering) representa:',
          options: ['Fechamento de capital de uma empresa', 'A primeira venda de ações de uma empresa ao público na bolsa de valores', 'Um tipo de título de renda fixa', 'Uma operação de câmbio interbancário'],
          answer: 1,
          explanation: 'IPO é a abertura de capital — quando uma empresa vende suas ações pela primeira vez ao público via bolsa de valores, captando recursos para investimentos ou proporcionando saída a acionistas.'
        }
      ]
    }
  ]
};
