window.BANCARIO_DATA = {
  id: 'bancario',
  name: 'Conhecimentos Bancários',
  icon: '🏦',
  color: '#f59e0b',
  description: 'SFN, produtos e serviços do BB',
  topics: [
    {
      id: 'sfn',
      title: 'Sistema Financeiro Nacional (SFN)',
      xp: 40,
      theory: `<p>O <strong>Sistema Financeiro Nacional (SFN)</strong> é o conjunto de instituições e instrumentos financeiros que possibilitam a transferência de recursos entre poupadores e tomadores de recursos no Brasil.</p>
<h3>Estrutura do SFN</h3>
<p><strong>Órgãos Normativos</strong> (regulam e definem políticas):</p>
<ul>
  <li><strong>CMN</strong> — Conselho Monetário Nacional: órgão máximo, define diretrizes da política monetária e cambial</li>
  <li><strong>CNSP</strong> — Conselho Nacional de Seguros Privados</li>
  <li><strong>CNPC</strong> — Conselho Nacional de Previdência Complementar</li>
</ul>
<p><strong>Entidades Supervisoras</strong> (fiscalizam):</p>
<ul>
  <li><strong>Banco Central do Brasil (BCB/Bacen):</strong> executa a política monetária, controla a inflação, autoriza e fiscaliza IFs</li>
  <li><strong>CVM</strong> — Comissão de Valores Mobiliários: mercado de capitais</li>
  <li><strong>Susep</strong> — seguros, previdência aberta, capitalização</li>
  <li><strong>Previc</strong> — fundos de pensão (previdência fechada)</li>
</ul>
<p><strong>Operadores</strong> (atuam no mercado): bancos, corretoras, seguradoras etc.</p>`,
      examples: [
        {
          header: 'Hierarquia do SFN — Resumo Visual',
          code: `ÓRGÃOS NORMATIVOS (definem políticas)
  ├── CMN  → regula bancos e câmbio
  ├── CNSP → regula seguros
  └── CNPC → regula previdência fechada

ENTIDADES SUPERVISORAS (fiscalizam)
  ├── Banco Central → executa CMN
  ├── CVM           → mercado de capitais
  ├── Susep         → seguros/previdência aberta
  └── Previc        → previdência fechada (EFPC)

OPERADORES (atuam no mercado)
  ├── Bancos comerciais, múltiplos, de investimento
  ├── Corretoras e distribuidoras
  ├── Seguradoras
  └── Entidades de previdência`,
          explanation: `<p>O <strong>CMN</strong> é o órgão mais importante para a prova — é o órgão máximo normativo. O <strong>Banco Central</strong> é executor das políticas definidas pelo CMN e supervisor das instituições financeiras.</p>`
        }
      ],
      questions: [
        {
          q: 'O órgão máximo normativo do Sistema Financeiro Nacional é:',
          options: ['Banco Central do Brasil', 'Conselho Monetário Nacional (CMN)', 'Comissão de Valores Mobiliários (CVM)', 'Ministério da Fazenda'],
          answer: 1,
          explanation: 'O CMN (Conselho Monetário Nacional) é o órgão normativo máximo do SFN. Define as diretrizes da política monetária, creditícia e cambial do Brasil.'
        },
        {
          q: 'Qual entidade é responsável pela supervisão do mercado de capitais no Brasil?',
          options: ['Banco Central do Brasil', 'Susep', 'CVM — Comissão de Valores Mobiliários', 'CMN'],
          answer: 2,
          explanation: 'A CVM (Comissão de Valores Mobiliários) supervisiona o mercado de capitais, bolsa de valores e emissão de ações e debêntures.'
        },
        {
          q: 'O Banco Central do Brasil (Bacen) tem como uma de suas principais funções:',
          options: ['Definir as diretrizes da política econômica', 'Executar a política monetária e fiscalizar as instituições financeiras', 'Regular o mercado de seguros privados', 'Gerir os fundos de pensão'],
          answer: 1,
          explanation: 'O Bacen executa a política monetária definida pelo CMN, controla a inflação, emite moeda, e autoriza e fiscaliza as instituições financeiras.'
        },
        {
          q: 'A Susep é responsável pela supervisão de:',
          options: ['Bancos comerciais e múltiplos', 'Seguros privados, previdência aberta e capitalização', 'Fundos de pensão fechados', 'Bolsa de valores e mercado de capitais'],
          answer: 1,
          explanation: 'A Susep (Superintendência de Seguros Privados) supervisiona seguros privados, previdência complementar aberta (como PGBL e VGBL) e títulos de capitalização.'
        },
        {
          q: 'Os bancos comerciais e múltiplos são classificados no SFN como:',
          options: ['Órgãos normativos', 'Entidades supervisoras', 'Operadores do sistema', 'Órgãos reguladores'],
          answer: 2,
          explanation: 'Os bancos (comerciais, múltiplos, de investimento), corretoras e distribuidoras são operadores do SFN — atuam no mercado financeiro, mas são supervisionados pelo Bacen.'
        }
      ]
    },
    {
      id: 'produtos_bb',
      title: 'Produtos e Serviços do BB',
      xp: 35,
      theory: `<p>O Banco do Brasil oferece ampla gama de produtos e serviços financeiros. Conhecê-los é fundamental para a prova e para o exercício da função.</p>
<h3>Produtos de Captação (Passivos)</h3>
<ul>
  <li><strong>Conta Corrente:</strong> depósitos à vista, movimentação por cheque, TED, Pix</li>
  <li><strong>Poupança:</strong> rendimento mensal (TR + 0,5% a.m. ou 70% da Selic), garantia FGC</li>
  <li><strong>CDB</strong> (Certificado de Depósito Bancário): renda fixa, IRPF regressivo</li>
  <li><strong>LCI/LCA:</strong> Letras de Crédito Imobiliário/Agronegócio — isentas de IR para PF</li>
</ul>
<h3>Produtos de Crédito (Ativos)</h3>
<ul>
  <li><strong>Crédito Pessoal:</strong> empréstimo sem destinação específica</li>
  <li><strong>CDC</strong> (Crédito Direto ao Consumidor): para aquisição de bens</li>
  <li><strong>Consignado:</strong> desconto em folha, taxas menores</li>
  <li><strong>Crédito Rural:</strong> Pronaf, Pronamp — BB é líder neste segmento</li>
  <li><strong>Financiamento Habitacional:</strong> MCMV, crédito imobiliário</li>
</ul>
<h3>Serviços</h3>
<ul>
  <li>Pix, TED, DOC, boleto bancário</li>
  <li>BB Investimentos, BB Seguros, BB Previdência</li>
  <li>Ourocard (cartões), BB Digital (app)</li>
</ul>`,
      examples: [
        {
          header: 'Comparação: Poupança x CDB x LCI',
          code: `PRODUTO    | RENTAB.       | IR  | GARANTIA FGC
Poupança   | TR+0,5%/mês   | Não | Sim (R$250k)
CDB        | % CDI (livre) | Sim | Sim (R$250k)
LCI/LCA    | % CDI/TR      | Não | Sim (R$250k)

CDB — Tabela IRPF Regressivo:
  Até 180 dias:    22,5%
  181 a 360 dias:  20,0%
  361 a 720 dias:  17,5%
  Acima 720 dias:  15,0%`,
          explanation: `<p><strong>LCI e LCA</strong> são isentas de IR para pessoa física, tornando-as atrativas. O <strong>FGC</strong> garante até R$ 250.000 por CPF por instituição e até R$ 1.000.000 no total em 4 anos.</p>`
        }
      ],
      questions: [
        {
          q: 'O Fundo Garantidor de Créditos (FGC) garante depósitos de até:',
          options: ['R$ 100.000 por CPF por instituição', 'R$ 250.000 por CPF por instituição', 'R$ 500.000 por CPF por instituição', 'R$ 1.000.000 por CPF por instituição'],
          answer: 1,
          explanation: 'O FGC garante até R$ 250.000 por CPF por conglomerado financeiro. Existe também um teto global de R$ 1.000.000 por CPF no período de 4 anos consecutivos.'
        },
        {
          q: 'Qual produto de investimento é isento de Imposto de Renda para pessoas físicas?',
          options: ['CDB', 'Poupança e CDB', 'LCI e LCA', 'Todos são isentos de IR'],
          answer: 2,
          explanation: 'LCI (Letra de Crédito Imobiliário) e LCA (Letra de Crédito do Agronegócio) são isentas de IR para pessoas físicas. CDB tem IRPF regressivo; poupança também é isenta.'
        },
        {
          q: 'O crédito consignado se diferencia dos demais por:',
          options: ['Ser destinado exclusivamente a servidores públicos', 'Ter desconto das prestações em folha de pagamento, permitindo taxas mais baixas', 'Não ter limite de valor', 'Ser isento de juros'],
          answer: 1,
          explanation: 'No crédito consignado, as parcelas são descontadas diretamente da folha de pagamento ou benefício, reduzindo o risco de inadimplência e possibilitando taxas de juros menores.'
        },
        {
          q: 'Sobre a Poupança, é correto afirmar:',
          options: ['Rende juros diários sobre o saldo', 'Tem rentabilidade variável conforme o CDI', 'Rende mensalmente na data de aniversário do depósito', 'É tributada pelo Imposto de Renda'],
          answer: 2,
          explanation: 'A poupança tem rendimento mensal, creditado na data de aniversário do depósito (dia em que foi feito). Não é tributada pelo IR para pessoas físicas.'
        },
        {
          q: 'O BB é líder nacional em qual segmento de crédito?',
          options: ['Crédito imobiliário para alto padrão', 'Crédito rural e agronegócio', 'Financiamento de veículos de luxo', 'Crédito pessoal para estrangeiros'],
          answer: 1,
          explanation: 'O Banco do Brasil é historicamente líder no crédito rural e agronegócio, operando programas como Pronaf (agricultura familiar) e Pronamp (médios produtores).'
        }
      ]
    },
    {
      id: 'atendimento',
      title: 'Atendimento e Ética Bancária',
      xp: 25,
      theory: `<p>O atendimento bancário de qualidade é um diferencial competitivo e uma exigência regulatória. Envolve aspectos técnicos, éticos e comportamentais.</p>
<h3>Sigilo Bancário</h3>
<p>A Lei Complementar 105/2001 regula o sigilo bancário. As instituições financeiras devem manter sigilo das operações dos clientes, podendo quebrá-lo apenas:</p>
<ul>
  <li>Por ordem judicial</li>
  <li>Requisição do Ministério Público (em casos específicos)</li>
  <li>Requisição da Receita Federal (intercâmbio de informações)</li>
  <li>Comissões Parlamentares de Inquérito (CPI)</li>
</ul>
<h3>Código de Defesa do Consumidor (CDC)</h3>
<p>Aplica-se plenamente às relações bancárias. Direitos básicos do consumidor:</p>
<ul>
  <li>Informação clara e adequada sobre produtos e serviços</li>
  <li>Proteção contra práticas abusivas</li>
  <li>Prevenção e reparação de danos</li>
</ul>
<h3>Prevenção à Lavagem de Dinheiro</h3>
<p>Lei 9.613/1998 (atualizada pela Lei 12.683/2012). O bancário deve reportar operações suspeitas ao Coaf (Conselho de Controle de Atividades Financeiras).</p>`,
      examples: [
        {
          header: 'Situações de sigilo bancário',
          code: `PODE quebrar o sigilo:
  ✓ Juiz (ordem judicial fundamentada)
  ✓ Receita Federal (compartilhamento de dados)
  ✓ CPI (Comissão Parlamentar de Inquérito)
  ✓ Ministério Público (casos previstos em lei)

NÃO PODE quebrar o sigilo:
  ✗ Cônjuge do titular (sem ordem judicial)
  ✗ Empregador do correntista
  ✗ Advogado sem procuração específica
  ✗ Policial sem mandado judicial`,
          explanation: `<p>O sigilo bancário é um direito fundamental, protegido também pela Constituição Federal. Sua quebra exige autorização legal expressa.</p>`
        }
      ],
      questions: [
        {
          q: 'O sigilo bancário pode ser quebrado mediante:',
          options: ['Solicitação verbal de qualquer autoridade policial', 'Ordem judicial fundamentada', 'Pedido do cônjuge do titular da conta', 'Requisição do empregador do correntista'],
          answer: 1,
          explanation: 'O sigilo bancário é protegido pela LC 105/2001 e só pode ser quebrado por determinação judicial, requisição da Receita Federal, CPI ou MP nos casos legalmente previstos.'
        },
        {
          q: 'Um cliente solicita informações sobre a conta bancária de seu marido em seu nome. O bancário deve:',
          options: ['Fornecer as informações, pois é cônjuge', 'Recusar, pois o sigilo bancário impede o acesso de terceiros sem autorização', 'Fornecer apenas o saldo', 'Consultar o gerente para decidir'],
          answer: 1,
          explanation: 'O sigilo bancário protege as informações do titular da conta. O cônjuge não tem direito automático de acesso sem procuração ou autorização judicial.'
        },
        {
          q: 'A Lei de Lavagem de Dinheiro exige que os bancários reportem operações suspeitas ao:',
          options: ['Banco Central do Brasil diretamente', 'Coaf — Conselho de Controle de Atividades Financeiras', 'Polícia Federal', 'Ministério da Fazenda'],
          answer: 1,
          explanation: 'O Coaf (atual UIF - Unidade de Inteligência Financeira do Brasil) é o órgão responsável por receber e processar relatórios de operações suspeitas relacionadas à lavagem de dinheiro.'
        },
        {
          q: 'O Código de Defesa do Consumidor (CDC) se aplica às relações bancárias?',
          options: ['Não, bancos têm legislação própria que exclui o CDC', 'Sim, aplica-se plenamente às relações entre bancos e clientes', 'Apenas parcialmente, em operações de crédito', 'Somente para clientes pessoas físicas'],
          answer: 1,
          explanation: 'O STJ consolidou o entendimento (Súmula 297) de que o CDC se aplica plenamente às instituições financeiras em suas relações com clientes.'
        },
        {
          q: 'Em relação ao atendimento ao cliente, o princípio da "transparência" significa:',
          options: ['Mostrar toda a documentação interna do banco', 'Fornecer informações claras, completas e compreensíveis sobre produtos e serviços', 'Divulgar dados sigilosos quando solicitado', 'Explicar apenas quando o cliente perguntar'],
          answer: 1,
          explanation: 'Transparência exige que o banco forneça informações claras, precisas e de fácil compreensão sobre todos os produtos e serviços, inclusive custos, riscos e condições.'
        }
      ]
    }
  ]
};
