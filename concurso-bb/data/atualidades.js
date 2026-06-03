window.ATUALIDADES_DATA = {
  id: 'atualidades',
  name: 'Atualidades do Mercado',
  icon: '📰',
  color: '#059669',
  gradient: 'linear-gradient(135deg, #059669, #047857)',
  topics: [
    {
      id: 'atu-economia',
      title: 'Economia e Indicadores',
      xp: 20,
      lesson: {
        title: 'Indicadores Econômicos Fundamentais para o BB',
        theory: `<p>Conhecer os <strong>indicadores econômicos</strong> é essencial para o profissional bancário — eles orientam as decisões de crédito, investimento e precificação de produtos financeiros.</p>

<h3>Principais Indicadores</h3>
<ul>
  <li><strong>IPCA (Índice de Preços ao Consumidor Amplo):</strong> inflação oficial do Brasil, medida pelo IBGE. O Sistema de Metas de Inflação do BCB usa o IPCA como referência. Meta estabelecida pelo CMN.</li>
  <li><strong>SELIC (Sistema Especial de Liquidação e de Custódia):</strong> taxa básica de juros da economia brasileira. Definida pelo Copom a cada 45 dias. Influencia todas as taxas de juros do mercado.</li>
  <li><strong>CDI (Certificado de Depósito Interbancário):</strong> taxa das operações de curtíssimo prazo entre bancos. Historicamente muito próxima à SELIC (SELIC - ~0,10 p.p.). Referência para rentabilidade de produtos de renda fixa.</li>
  <li><strong>PIB (Produto Interno Bruto):</strong> soma de todos os bens e serviços finais produzidos no país num período. Medido pelo IBGE. Principal indicador do tamanho e crescimento da economia.</li>
  <li><strong>Câmbio:</strong> taxa de conversão entre moedas. Valorização do real = menos reais por dólar. Desvalorização = mais reais por dólar. Impacta inflação (importados) e exportações.</li>
</ul>

<h3>Política Monetária — Copom</h3>
<p>O <strong>Copom (Comitê de Política Monetária)</strong> é o colegiado do BCB que define a meta da taxa SELIC. Reúne-se a cada 45 dias (8 vezes por ano). Decisão de política monetária: quando a inflação supera a meta, o Copom ELEVA a SELIC; quando está abaixo da meta e a economia desacelera, REDUZ.</p>

<h3>Política Monetária: Expansionista vs Contracionista</h3>
<ul>
  <li><strong>Expansionista (dovish):</strong> reduz a SELIC, facilita crédito, estimula consumo e investimento. Risco: inflação.</li>
  <li><strong>Contracionista (hawkish):</strong> eleva a SELIC, encarece o crédito, reduz consumo. Objetivo: conter a inflação.</li>
</ul>

<h3>Relação entre Inflação e Taxa de Juros</h3>
<p>Quando a inflação sobe: BCB eleva SELIC → crédito fica mais caro → famílias e empresas tomam menos crédito → demanda por bens e serviços cai → pressão sobre os preços diminui. É o mecanismo de transmissão da política monetária.</p>`,
        examples: [
          {
            title: 'IPCA vs SELIC — mecanismo de transmissão da política monetária',
            code: `CENÁRIO: IPCA acima da meta do CMN

META DE INFLAÇÃO (exemplo): 3,0% a.a. (±1,5% de banda)
IPCA ATUAL: 5,5% a.a. (acima do teto de 4,5%)

DECISÃO DO COPOM: elevar a SELIC
(ex: de 10,50% para 11,25% a.a.)

MECANISMO DE TRANSMISSÃO:
SELIC SOBE
  ↓
Taxas bancárias sobem (financiamento, cartão, cheque especial)
  ↓
Crédito fica mais caro → famílias e empresas pegam menos
  ↓
Consumo e investimento caem
  ↓
Produção se ajusta à demanda menor
  ↓
Pressão sobre preços diminui
  ↓
IPCA recua em direção à meta

TEMPO DE DEFASAGEM:
A política monetária leva 6 a 18 meses para ter efeito
completo sobre a inflação — por isso o Copom precisa
"antecipar" a decisão, não apenas reagir ao IPCA atual.

EFEITO COLATERAL:
SELIC alta → crescimento do PIB desacelera
(trade-off inflação vs crescimento)

POLÍTICA EXPANSIONISTA (oposta):
IPCA baixo + economia fraca → Copom REDUZ SELIC
→ crédito mais barato → consumo sobe → PIB cresce`,
            explanation: 'O mecanismo de transmissão da política monetária é um conceito fundamental. Memorize a cadeia: inflação alta → Copom eleva SELIC → crédito encarece → consumo cai → inflação recua. O Copom age de forma preventiva (forward-looking) — olha para a inflação esperada nos próximos 12-18 meses, não apenas a atual. Isso explica por que o Copom pode subir juros mesmo com inflação temporariamente baixa.'
          },
          {
            title: 'CDI na prática — o que significa "100% do CDI"',
            code: `CONTEXTO: Um CDB "rende 100% do CDI"

CDI (taxa referência): historicamente ~ SELIC - 0,10 p.p.
Se SELIC = 10,75% a.a. → CDI ≈ 10,65% a.a.

"100% do CDI" significa: o investimento rende exatamente
o CDI — ou seja, ~10,65% ao ano antes do IR.

COMPARAÇÕES COMUNS:
CDB a 110% do CDI → rende 110% × 10,65% = 11,72% a.a.
CDB a 90% do CDI  → rende 90% × 10,65% = 9,59% a.a.
Poupança (SELIC > 8,5%): 70% da SELIC + TR
                        = 70% × 10,75% = 7,53% a.a. + TR

REGRA PRÁTICA:
LCI/LCA a 90% do CDI (isentas de IR):
Equivale a CDB de: 90% × 10,65% = 9,59% BRUTO
Se você ficasse 2 anos no CDB: IR = 15%
CDB líquido = 9,59% × (1-0,15) = 8,15% a.a.
LCI líquido = 9,59% (isenta!)
→ LCI de 90% do CDI é MELHOR que CDB de 90% do CDI!

Para ser INDIFERENTE (ponto de equilíbrio):
CDB bruto × (1 - IR%) = LCI bruta
CDB × 0,85 = LCI → CDB precisaria render LCI / 0,85
Se LCI = 90% CDI → CDB equivalente = 90/0,85 = 105,9% CDI`,
            explanation: 'Entender o que "% do CDI" significa na prática é fundamental para orientar clientes. O CDI é a referência para renda fixa — saber calcular o rendimento líquido (após IR) de um CDB e comparar com produtos isentos (LCI/LCA) é habilidade esperada do escritário do BB. O ponto de equilíbrio entre CDB e LCI depende do prazo (que define a alíquota de IR): para prazos maiores (alíquota 15%), a LCI precisa render menos que o CDB para ser equivalente.'
          },
          {
            title: 'PIB — composição, cálculo e crescimento brasileiro',
            code: `FÓRMULA DO PIB (pela ótica da despesa):
PIB = C + I + G + (X - M)
C = Consumo das famílias (maior componente, ~65%)
I = Investimento (formação bruta de capital fixo)
G = Gastos do governo
X = Exportações
M = Importações
(X-M) = Saldo da Balança Comercial

EXEMPLO:
C = R$5 tri | I = R$1,2 tri | G = R$2 tri
X = R$1,8 tri | M = R$1,5 tri
PIB = 5 + 1,2 + 2 + (1,8-1,5) = R$ 9,5 trilhões

PIB NOMINAL vs PIB REAL:
PIB NOMINAL: a preços correntes (inclui inflação)
PIB REAL: descontada a inflação (crescimento "de verdade")
Deflator do PIB: PIB nominal / PIB real × 100

CRESCIMENTO DO PIB BRASILEIRO:
2020: -3,9% (pandemia COVID)
2021: +4,6% (recuperação pós-pandemia)
2022: +2,9%
2023: +2,9%
(dados aproximados para estudo — verifique os atuais)

SETORES DO PIB:
Serviços: ~74% (dominante — inclui setor financeiro)
Indústria: ~22%
Agropecuária: ~7%

PIB PER CAPITA: PIB ÷ população → renda média por habitante
Não mede desigualdade (para isso: Gini, IDH)`,
            explanation: 'O PIB é o principal indicador do tamanho e desempenho da economia. Para o BB, o mais importante é entender: (1) a distinção PIB nominal vs real (nominal inclui inflação, real não); (2) que serviços são o maior setor (75%), onde o sistema financeiro se encaixa; (3) que consumo das famílias (C) é o maior componente. Questões de concurso frequentemente testam a fórmula PIB = C + I + G + (X-M) e a diferença nominal/real.'
          }
        ]
      },
      quiz: [
        {
          q: 'Qual órgão define a meta da taxa SELIC no Brasil e com qual periodicidade se reúne?',
          options: [
            'O CMN, reunindo-se mensalmente',
            'O Copom (Comitê de Política Monetária do BCB), reunindo-se a cada 45 dias',
            'O Banco Central, por decisão autônoma do presidente do BCB semanalmente',
            'O Ministério da Fazenda, em reuniões trimestrais'
          ],
          answer: 1,
          explanation: 'O COPOM (Comitê de Política Monetária) é o colegiado do BCB responsável por definir a META da taxa SELIC. Reúne-se a cada 45 dias (8 reuniões por ano). O CMN define a META DE INFLAÇÃO (não a SELIC). O presidente do BCB tem mandato fixo e independência operacional (BCB autônomo desde 2021). As decisões do Copom são por maioria de votos dos seus membros (presidente + 8 diretores).'
        },
        {
          q: 'Quando o Banco Central adota uma política monetária CONTRACIONISTA, o que espera como resultado?',
          options: [
            'Aumento do PIB e do emprego no curto prazo',
            'Redução da taxa de câmbio e barateamento das importações',
            'Redução da inflação, ao custo de desacelerar o crescimento econômico',
            'Aumento dos investimentos privados em razão do crédito mais barato'
          ],
          answer: 2,
          explanation: 'Política contracionista = elevar a SELIC. Efeito: crédito fica mais caro → consumo e investimento caem → demanda recua → inflação desacelera. O trade-off inevítável: combater inflação desacelera o PIB e pode aumentar o desemprego no curto prazo. Política expansionista (reduzir SELIC) estimula o crescimento, mas pode elevar a inflação. O Copom busca o equilíbrio para manter o IPCA dentro da meta de inflação.'
        },
        {
          q: 'Um CDB rende "110% do CDI". Se o CDI está em 10,50% a.a., qual é o rendimento bruto anual desse CDB?',
          options: [
            '10,50% a.a.',
            '11,55% a.a.',
            '10,605% a.a.',
            '11,50% a.a.'
          ],
          answer: 1,
          explanation: '110% do CDI = 110% × 10,50% = 1,10 × 10,50 = 11,55% a.a. bruto. Esse é o rendimento antes do Imposto de Renda. Para calcular o líquido, basta aplicar a tabela regressiva de IR conforme o prazo de investimento. Exemplo: para prazo de 2 anos (IR 15%): 11,55% × (1-0,15) = 9,82% a.a. líquido. O rendimento de 100% do CDI seria 10,50%. De 90% do CDI seria 9,45%.'
        },
        {
          q: 'Na fórmula do PIB pela ótica da despesa (C + I + G + X - M), o que representa o "M"?',
          options: [
            'Moeda em circulação na economia',
            'Importações — que são subtraídas pois representam consumo de produtos estrangeiros',
            'Margem de lucro das empresas domésticas',
            'Movimentação financeira do setor bancário'
          ],
          answer: 1,
          explanation: 'Na fórmula PIB = C + I + G + (X - M): C = Consumo das famílias, I = Investimentos privados, G = Gastos do governo, X = Exportações (produção nacional vendida ao exterior = atividade doméstica), M = Importações (produtos estrangeiros consumidos internamente = não é produção nacional). As importações são SUBTRAÍDAS porque C, I e G incluem tanto produtos domésticos quanto importados — subtrair M "isola" apenas a produção nacional.'
        },
        {
          q: 'Qual a diferença entre o PIB NOMINAL e o PIB REAL?',
          options: [
            'O PIB nominal mede apenas a indústria; o PIB real inclui todos os setores',
            'O PIB nominal é calculado a preços correntes; o PIB real é deflacionado (desconta a inflação)',
            'O PIB real é maior que o nominal quando há deflação',
            'O PIB nominal é publicado pelo IBGE; o PIB real é calculado pelo BCB'
          ],
          answer: 1,
          explanation: 'PIB NOMINAL: calculado com os preços do período atual — mistura crescimento real com inflação. PIB REAL: descontada a inflação (usando o deflator do PIB), mede o crescimento "de verdade" da produção. Exemplo: PIB nominal cresceu 8% mas inflação foi 5% → crescimento real foi ~3%. Para avaliar se a economia cresceu ou não, usa-se o PIB real. Ambos são calculados pelo IBGE (não pelo BCB).'
        }
      ]
    },
    {
      id: 'atu-fintechs',
      title: 'Fintechs e Open Finance',
      xp: 20,
      lesson: {
        title: 'Open Finance, Fintechs e Pix — A Nova Era Bancária',
        theory: `<p>O setor financeiro brasileiro passou por uma transformação profunda com o advento das <strong>fintechs</strong>, do <strong>Pix</strong> e do <strong>Open Finance</strong> — todos temas cobrados no concurso do BB.</p>

<h3>Open Finance (antes chamado Open Banking)</h3>
<p>Sistema que permite que clientes compartilhem seus dados financeiros com diferentes instituições, mediante consentimento. Regulado e implementado pelo BCB a partir de 2021.</p>
<p><strong>Objetivo:</strong> aumentar a concorrência, reduzir assimetria de informação, permitir que clientes obtenham melhores condições financeiras.</p>
<p><strong>Fases do Open Finance no Brasil:</strong></p>
<ol>
  <li><strong>Fase 1:</strong> bancos publicaram dados sobre produtos e serviços (sem dados de clientes)</li>
  <li><strong>Fase 2:</strong> clientes puderam compartilhar dados cadastrais e de contas</li>
  <li><strong>Fase 3:</strong> compartilhamento de dados de crédito; início de pagamentos via Open Finance</li>
  <li><strong>Fase 4:</strong> expansão para seguros, câmbio, investimentos e previdência</li>
</ol>

<h3>Fintechs — Startups Financeiras</h3>
<p>Fintechs usam tecnologia para oferecer serviços financeiros de forma mais barata, ágil e centrada no usuário, sem as estruturas de custo dos bancos tradicionais.</p>
<ul>
  <li><strong>Bancos digitais:</strong> Nubank, Banco Inter, C6 Bank — sem agências físicas, conta corrente gratuita</li>
  <li><strong>Fintechs de crédito:</strong> SCD (Sociedade de Crédito Direto) e SEP (Sociedade de Empréstimo entre Pessoas / P2P) — reguladas pelo BCB (Resolução 4.656/2018)</li>
  <li><strong>Fintechs de pagamento:</strong> PicPay, MercadoPago</li>
  <li><strong>Fintechs de investimento:</strong> XP Investimentos, Rico, Clear</li>
</ul>

<h3>Pix — Sistema de Pagamento Instantâneo</h3>
<p>Criado pelo BCB e lançado em novembro de 2020. Funciona 24h/7 dias, inclusive finais de semana e feriados. Transferência em até 10 segundos.</p>
<ul>
  <li><strong>Chaves Pix:</strong> CPF/CNPJ, e-mail, telefone celular ou chave aleatória</li>
  <li><strong>Pix Copia e Cola:</strong> código gerado pelo recebedor</li>
  <li><strong>Pix via QR Code:</strong> estático (valor definido por quem paga) ou dinâmico (valor pré-definido)</li>
  <li><strong>Pix Agendado, Pix Saque, Pix Troco</strong></li>
  <li><strong>Gratuito para PF</strong> — bancos não podem cobrar de pessoas físicas</li>
</ul>`,
        examples: [
          {
            title: 'Open Finance na prática — como beneficia o cliente',
            code: `SITUAÇÃO ANTES DO OPEN FINANCE:
Cliente João tem conta no BB há 10 anos.
Banco X oferece empréstimo pessoal mais barato.
Problema: Banco X não conhece o histórico de João
→ Oferece taxa elevada por não conhecer o perfil
João fica no BB mesmo pagando mais.

COM OPEN FINANCE:
1. João acessa o app do Banco X
2. Banco X pergunta: "Posso consultar seu histórico no BB?"
3. João CONSENTE (processo seguro via API padronizada)
4. Banco X recebe: histórico de pagamentos, renda, saldo médio
5. Banco X analisa o perfil real de João
6. Banco X oferece taxa personalizada e competitiva
7. João obtém crédito mais barato → "portabilidade de dados"

BENEFÍCIOS DO OPEN FINANCE:
✓ Concorrência → taxas menores para clientes
✓ Personalização → produtos adequados ao perfil real
✓ Inclusão financeira → clientes sem histórico podem
  compartilhar dados de outros bancos
✓ Inovação → fintechs criam novos serviços com os dados

CONSENTIMENTO — PRINCÍPIO FUNDAMENTAL:
- Cliente SEMPRE decide se compartilha ou não
- Pode revogar o consentimento a qualquer momento
- Prazo máximo de consentimento: 12 meses
- O dado é do CLIENTE, não do banco que o detém`,
            explanation: 'Open Finance representa uma mudança de paradigma: os dados bancários pertencem ao CLIENTE, não ao banco. O cliente pode "levar" seu histórico para outra instituição, quebrando o "lock-in" que mantinha clientes em bancos mesmo pagando taxas mais altas. O BCB implementou isso via APIs padronizadas e obrigatórias para as instituições financeiras participantes. A segurança é garantida pelo padrão OAuth 2.0 + certificados digitais.'
          },
          {
            title: 'Pix vs TED vs DOC — comparativo completo',
            code: `COMPARATIVO DE TRANSFERÊNCIAS BANCÁRIAS:

                PIX          TED          DOC
Valor máximo   Ilimitado    Ilimitado    R$ 4.999,99
Horário        24h/7 dias   Horário bancário  Até 17h
               (inclusive    (dias úteis)    (creditado
               feriados)                     D+1)
Prazo          Até 10 seg   Mesmo dia         D+1
Custo PF       GRATUITO     Geralmente pago  Pago
Custo PJ       Pode cobrar  Pago             Pago
               (regulado)

POR QUE O PIX DOMINOU:
✓ Gratuito para PF
✓ 24h × 7 dias × 365 dias (inclusive Natal e Ano Novo)
✓ Instantâneo (< 10 segundos)
✓ Fácil (chave = CPF/telefone/e-mail)
✓ QR Code para lojas e comércios

ADOÇÃO NO BRASIL (dados aproximados):
+150 milhões de usuários cadastrados
+3 bilhões de transações/mês
Substituiu praticamente os DOCs (praticamente extintos)
e reduziu muito o uso de TEDs para PF`,
            explanation: 'O Pix transformou completamente os hábitos de pagamento dos brasileiros. Em poucos anos superou em volume todos os meios de pagamento eletrônico. Para o concurso do BB: gratuidade para PF é obrigatória por regulação do BCB (bancos que cobrem Pix de PF infringem a regulação), funciona 24/7/365, e é regulado exclusivamente pelo BCB (não pelo CMN). DOC praticamente não existe mais desde que o Pix foi lançado.'
          },
          {
            title: 'Fintechs disruptivas — modelo de negócio sem agências',
            code: `NUBANK — CASO DE ESTUDO:

MODELO DE NEGÓCIO DIGITAL:
- Sem agências físicas → sem custo de imóveis, luz, segurança
- Sem papelada → processos 100% digitais, menos burocracia
- Atendimento por chat/e-mail → mais barato que call center presencial
- Decisões por algoritmos → menos pessoal para análise de crédito

VANTAGENS DE CUSTO:
Banco tradicional: índice de eficiência ~45-55%
Nubank (fase inicial): índice de eficiência ~30-35%
→ "faz mais com menos" estruturalmente

COMO CRESCEU:
2013: fundado com cartão sem anuidade (proposta de valor clara)
2014-2017: lista de espera por convite → criar desejo (marketing viral)
2020: 25 milhões de clientes
2024: +100 milhões de clientes (maior banco digital do mundo)
→ IPO na NYSE em 2021 (avaliação de ~$41 bilhões)

DESAFIOS DA FINTECH:
- Regulação crescente (BCB exige mais capital mínimo)
- Rentabilidade em escala (crédito é o maior desafio)
- Ataques cibernéticos (alvos de alto valor)
- Concorrência dos próprios bancos tradicionais que se digitalizam

OPEN FINANCE + FINTECHS:
O Open Finance é o "combustível" das fintechs — acesso
ao histórico financeiro dos clientes dos grandes bancos.`,
            explanation: 'O modelo das fintechs se baseia em três pilares: tecnologia (custos menores), experiência do usuário (NPS muito alto) e dados (análise precisa de risco). A ausência de agências físicas reduz enormemente o custo fixo. O desafio das fintechs maduras é rentabilidade: captar clientes é relativamente fácil; oferecer crédito com risco controlado é muito mais difícil. Os grandes bancos responderam acelerando sua própria digitalização.'
          }
        ]
      },
      quiz: [
        {
          q: 'O Open Finance (Open Banking) permite que clientes compartilhem dados financeiros com outras instituições. Qual é o princípio fundamental desse sistema?',
          options: [
            'Os dados financeiros pertencem ao banco que os gerou — a instituição pode compartilhar com parceiros sem consulta ao cliente',
            'Os dados pertencem ao CLIENTE, que pode compartilhá-los com quem quiser mediante consentimento, e revogar a autorização quando desejar',
            'O BCB centraliza todos os dados e os distribui automaticamente às fintechs registradas',
            'O compartilhamento é obrigatório para todos os clientes e não pode ser recusado'
          ],
          answer: 1,
          explanation: 'O princípio central do Open Finance é a TITULARIDADE DOS DADOS: os dados pertencem ao cliente, não ao banco. O cliente decide com quem compartilhar, quando e por quanto tempo (máximo 12 meses). Pode revogar o consentimento a qualquer momento. Isso quebra o "lock-in" dos bancos tradicionais e estimula a concorrência. O compartilhamento é sempre opt-in (o cliente precisa consentir ativamente) — nunca automático ou obrigatório.'
        },
        {
          q: 'Qual é a principal vantagem do Pix em relação ao TED para clientes pessoa física?',
          options: [
            'O Pix permite transferências de valores maiores que o TED',
            'O Pix é GRATUITO para PF, funciona 24h/7 dias e as transferências ocorrem em segundos',
            'O Pix tem seguro contra fraudes enquanto o TED não tem',
            'O Pix é regulado pelo CMN, garantindo mais segurança jurídica'
          ],
          answer: 1,
          explanation: 'As vantagens do Pix sobre o TED são: (1) GRATUIDADE para PF (obrigatório por regulação do BCB); (2) DISPONIBILIDADE 24/7/365, inclusive fins de semana e feriados; (3) VELOCIDADE: até 10 segundos (TED pode levar horas e só funciona em dias úteis em horário bancário); (4) FACILIDADE: usando chave (CPF, telefone, e-mail). O Pix é regulado pelo BCB, não pelo CMN. Não há limite de valor para PF (exceto Pix noturno com limite de segurança).'
        },
        {
          q: 'O Nubank e outros bancos digitais se destacam por um modelo de negócio com menor custo operacional. Qual é a principal razão estrutural para isso?',
          options: [
            'Utilização de funcionários com salários menores que os dos bancos tradicionais',
            'Ausência de agências físicas, reduzindo custos com imóveis, equipamentos e pessoal presencial',
            'Isenção de fiscalização pelo Banco Central por serem fintechs, não bancos',
            'Acesso a crédito subsidiado pelo BNDES exclusivo para fintechs'
          ],
          answer: 1,
          explanation: 'O modelo 100% digital elimina os principais custos fixos dos bancos tradicionais: aluguéis, reformas e manutenção de agências, equipamentos físicos, pessoal de atendimento presencial, segurança física, etc. Isso se traduz em menor índice de eficiência operacional — podem oferecer produtos mais baratos (cartão sem anuidade, conta sem tarifa) e ainda ter margem. Os bancos digitais são totalmente regulados pelo BCB (não são isentos).'
        },
        {
          q: 'Qual das seguintes afirmativas sobre o Pix está CORRETA?',
          options: [
            'O Pix só funciona em dias úteis, mas em horário estendido (6h às 22h)',
            'O Pix é gratuito apenas para transferências de até R$ 500',
            'O Pix funciona 24 horas por dia, 7 dias por semana, inclusive feriados',
            'O Pix é gerenciado pelo CMN, com regras definidas pelo Copom'
          ],
          answer: 2,
          explanation: 'O Pix funciona 24 horas por dia, 7 dias por semana, 365 dias por ano — incluindo fins de semana, feriados nacionais, Natal e Ano Novo. Esta disponibilidade foi uma das principais razões para a adoção massiva. O Pix é gratuito para PF sem limite de valor (exceto o limite noturno de segurança, configurado pelo próprio cliente). É gerenciado e regulado exclusivamente pelo BCB, não pelo CMN nem pelo Copom.'
        },
        {
          q: 'O Open Finance está sendo implementado em fases no Brasil. Qual das seguintes descrições corresponde ao OBJETIVO PRINCIPAL do sistema?',
          options: [
            'Criar um banco digital público para competir com as fintechs privadas',
            'Centralizar todos os dados financeiros dos brasileiros em um único banco de dados do governo',
            'Permitir que clientes compartilhem seus dados financeiros entre instituições para obter melhores condições e estimular a concorrência',
            'Unificar os sistemas de pagamento dos bancos em uma única plataforma gerenciada pelo BCB'
          ],
          answer: 2,
          explanation: 'Open Finance tem como objetivos centrais: (1) dar ao cliente controle sobre seus próprios dados financeiros; (2) estimular a CONCORRÊNCIA entre as instituições financeiras; (3) permitir inovação de fintechs e novos entrantes; (4) possibilitar a criação de produtos mais adequados ao perfil individual do cliente. Não centraliza dados no governo — cada banco mantém seus dados, mas deve disponibilizá-los via API quando o cliente consentir. O Pix é a camada de pagamentos; o Open Finance é a camada de dados e serviços.'
        }
      ]
    },
    {
      id: 'atu-tendencias',
      title: 'Tendências Tecnológicas no Setor Bancário',
      xp: 20,
      lesson: {
        title: 'Tecnologia, IA, Blockchain e ESG no Setor Bancário',
        theory: `<p>O setor bancário está na vanguarda da adoção tecnológica. O BB cobra especificamente tendências como <strong>Inteligência Artificial, DREX, blockchain e ESG</strong> — que moldam o futuro do mercado financeiro.</p>

<h3>Inteligência Artificial (IA) no Banco</h3>
<ul>
  <li><strong>Score de crédito com machine learning:</strong> modelos que analisam centenas de variáveis (histórico, comportamento digital, padrão de gastos) para estimar risco de crédito com mais precisão que modelos tradicionais.</li>
  <li><strong>Detecção de fraude em tempo real:</strong> algoritmos identificam padrões suspeitos em milissegundos (transação incomum, localização diferente, horário atípico) e bloqueiam preventivamente.</li>
  <li><strong>Chatbots e assistentes virtuais:</strong> atendimento automatizado 24h.</li>
  <li><strong>Automação de processos (RPA):</strong> bots que realizam tarefas repetitivas sem intervenção humana.</li>
  <li><strong>Análise preditiva:</strong> identificar clientes com propensão a churnar, aceitar produto, ou com risco de inadimplência iminente.</li>
</ul>

<h3>Big Data e Analytics</h3>
<p>Bancos lidam com volumes enormes de dados. <strong>Big Data</strong> é o conjunto de tecnologias para processar esses dados. <strong>Analytics</strong> é a análise para gerar insights de negócio.</p>

<h3>Blockchain e Criptoativos</h3>
<ul>
  <li><strong>Blockchain:</strong> banco de dados distribuído e imutável — registros encadeados em "blocos", validados por consenso da rede.</li>
  <li><strong>Bitcoin:</strong> criptomoeda descentralizada, criada em 2009. Sem emissor central. Oferta limitada a 21 milhões de BTC.</li>
  <li><strong>DREX (Real Digital):</strong> moeda digital do Banco Central do Brasil (CBDC). Emitido e controlado pelo BCB. Usa blockchain PERMISSIONADA. Casos de uso: contratos inteligentes (smart contracts), pagamentos programáveis, tokenização de ativos.</li>
</ul>

<h3>ESG no Setor Bancário</h3>
<ul>
  <li><strong>E — Environmental (Ambiental):</strong> gestão do impacto ambiental das operações e carteira de crédito. Financiamento de energias renováveis.</li>
  <li><strong>S — Social:</strong> inclusão financeira, microcrédito, diversidade no quadro de funcionários.</li>
  <li><strong>G — Governance (Governança):</strong> transparência, combate à corrupção, compliance robusto.</li>
</ul>`,
        examples: [
          {
            title: 'IA no banco — score de crédito e detecção de fraude',
            code: `SCORE DE CRÉDITO TRADICIONAL vs IA/MACHINE LEARNING:

SCORE TRADICIONAL (Serasa/SPC):
Variáveis: histórico de pagamentos, dívidas em aberto.
~10-20 variáveis analisadas
Resultado: pontuação 0-1000 (decisão binária: aprova/nega)

SCORE COM MACHINE LEARNING (IA):
Variáveis: CENTENAS de dados
- Histórico de pagamentos
- Padrão de gastos no cartão
- Comportamento no app (horários, funcionalidades)
- Open Finance: dados de outros bancos (com consentimento)
→ Resultado: probabilidade de inadimplência personalizada

VANTAGENS:
- Mais preciso: reduz inadimplência ao aprovar crédito certo
- Mais inclusivo: pode aprovar quem não tem histórico formal

DETECÇÃO DE FRAUDE EM TEMPO REAL:
Você faz compra em SP às 10h com seu cartão.
Às 10:15, outra compra em Lisboa com o mesmo cartão.
→ IA detecta ANOMALIA em milissegundos
→ Bloqueia automaticamente + notifica pelo app
→ Você confirma se foi você (não foi!) → cartão bloqueado`,
            explanation: 'A IA no banco tem dois papéis principais: RECEITA (score mais preciso permite mais crédito com menos risco) e PROTEÇÃO (detecção de fraude em tempo real protege clientes e o banco). O ponto diferenciador do ML vs modelos tradicionais é a quantidade de variáveis e a capacidade de identificar padrões não óbvios para humanos.'
          },
          {
            title: 'DREX — Real Digital e sua diferença das criptomoedas',
            code: `BITCOIN (criptomoeda privada):
- Emitido por NINGUÉM (protocolo matemático)
- Blockchain PÚBLICA (qualquer um pode participar)
- Descentralizado (sem banco central)
- Oferta limitada: 21 milhões de BTC no total
- Volatilidade extrema (pode cair 50% em semanas)

DREX (Real Digital — CBDC Brasileiro):
- Emitido pelo BANCO CENTRAL DO BRASIL (BCB)
- Blockchain PERMISSIONADA (participantes aprovados pelo BCB)
- Centralizado pelo BCB
- Lastro: equivale a R$ 1,00 (sem volatilidade)
- Casos de uso principais:
  ✓ CONTRATOS INTELIGENTES: automação de pagamentos
    Ex: liberar crédito imobiliário automaticamente quando
    o cartório registrar a escritura do imóvel
  ✓ TOKENIZAÇÃO DE ATIVOS: transformar imóveis, ações
    em tokens negociáveis na blockchain
  ✓ PAGAMENTOS PROGRAMÁVEIS: pagamento automático
    quando condições contratuais forem cumpridas

DIFERENÇA FUNDAMENTAL:
Bitcoin = tecnologia descentralizada sem emissor central
DREX = tecnologia blockchain COM emissor central (BCB)`,
            explanation: 'O DREX é a versão digital do Real — não é uma criptomoeda no sentido popular. A diferença central: Bitcoin é descentralizado e sem lastro (valor determinado pelo mercado); DREX é centralizado pelo BCB e equivale ao Real (sem volatilidade). A tecnologia blockchain é usada pelo DREX para eficiência, programabilidade e rastreabilidade — não para descentralização.'
          },
          {
            title: 'ESG no setor bancário — critérios, riscos e oportunidades',
            code: `ESG AMBIENTAL (E) — PARA O BANCO:

RISCO FÍSICO: uma fazenda financiada pelo BB sofre seca severa
→ Produtor não paga o empréstimo → inadimplência
→ Mudanças climáticas = risco de crédito para o banco!

RISCO DE TRANSIÇÃO: empresa de petróleo perde valor com
transição energética → ações em carteira do banco desvalorizam

OPORTUNIDADES:
✓ Financiamento de energia solar e eólica (crescimento)
✓ Títulos verdes (green bonds)
✓ Crédito para agronegócio sustentável (LCA verde)

ESG SOCIAL (S):
✓ Microcrédito produtivo
✓ Correspondências bancárias em regiões remotas
✓ Inclusão financeira de desbancarizados
✓ Metas de diversidade no quadro de funcionários

ESG GOVERNANÇA (G):
✓ Controles internos e compliance robusto
✓ Transparência com acionistas e reguladores
✓ Política anticorrupção
✓ Diversidade no conselho de administração

Bancos com melhor ESG: acesso a capital mais barato`,
            explanation: 'ESG no setor bancário não é apenas "responsabilidade social" — tem impacto direto no risco da carteira de crédito e no custo de captação. Riscos climáticos se traduzem em risco de crédito (devedores afetados por eventos extremos). O BB é cobrado nesse tema pois é banco público com forte papel no desenvolvimento sustentável (Pronaf, Pronamp, crédito rural).'
          }
        ]
      },
      quiz: [
        {
          q: 'Como a Inteligência Artificial melhora a detecção de fraudes bancárias em comparação com sistemas tradicionais baseados em regras fixas?',
          options: [
            'A IA bloqueia todas as transações acima de um valor fixo para revisão manual',
            'A IA identifica padrões anômalos em tempo real comparando a transação atual com o comportamento histórico do cliente',
            'A IA exige que o cliente responda um questionário de segurança a cada transação',
            'A IA usa reconhecimento de voz para validar cada transação realizada'
          ],
          answer: 1,
          explanation: 'Sistemas de detecção de fraude por IA aprendem o padrão de comportamento INDIVIDUAL de cada cliente. Quando uma transação desvia do padrão, o algoritmo calcula a probabilidade de fraude em milissegundos. Sistemas tradicionais usam REGRAS FIXAS (ex: "bloquear transações acima de X") — muitas falhas (falsos positivos e falsos negativos). A IA é muito mais precisa por considerar o contexto individual.'
        },
        {
          q: 'Qual é a principal diferença entre o DREX (Real Digital) e o Bitcoin?',
          options: [
            'O DREX é baseado em blockchain; o Bitcoin não usa tecnologia blockchain',
            'O DREX é emitido e controlado pelo Banco Central do Brasil; o Bitcoin não tem emissor central e é descentralizado',
            'O Bitcoin é legal no Brasil; o DREX não foi aprovado pelos órgãos reguladores',
            'O DREX tem oferta ilimitada; o Bitcoin tem oferta limitada a 21 milhões de unidades'
          ],
          answer: 1,
          explanation: 'A diferença fundamental: DREX é uma CBDC (moeda digital de banco central) — emitida, controlada e com lastro no Real pelo BCB. Tem valor estável (1 DREX = R$1,00). Bitcoin é descentralizado, sem emissor central, com oferta limitada e valor determinado pelo mercado (altamente volátil). Ambos usam tecnologia blockchain, mas de tipos diferentes: DREX usa blockchain permissionada; Bitcoin usa blockchain pública.'
        },
        {
          q: 'No contexto do ESG bancário, o que representa o critério "E" (Environmental/Ambiental) para um banco como o BB?',
          options: [
            'Apenas a redução do consumo de energia elétrica nas agências físicas',
            'A gestão dos riscos climáticos na carteira de crédito e o financiamento da transição para uma economia de baixo carbono',
            'O cumprimento da legislação ambiental vigente, sem qualquer ação proativa',
            'A contratação de fornecedores que possuam certificação ISO 14001'
          ],
          answer: 1,
          explanation: 'O "E" do ESG para um banco vai muito além de reduzir o consumo de energia na sede. Envolve: (1) RISCO CLIMÁTICO: avaliar o impacto de eventos climáticos na capacidade de pagamento dos devedores; (2) RISCO DE TRANSIÇÃO: exposição a setores afetados pela transição energética; (3) OPORTUNIDADES: financiar energias renováveis, emitir green bonds. É uma questão de gestão de risco, não apenas de imagem.'
        },
        {
          q: 'O que são "contratos inteligentes" (smart contracts) no contexto do DREX e blockchain bancária?',
          options: [
            'Contratos digitalizados que substituem documentos físicos em PDF',
            'Programas autoexecutáveis que realizam automaticamente uma transação quando condições pré-definidas são cumpridas',
            'Contratos revisados por inteligência artificial para identificar cláusulas abusivas',
            'Contratos com assinatura digital que têm validade jurídica equivalente ao papel'
          ],
          answer: 1,
          explanation: 'Smart contracts são programas que residem na blockchain e se executam automaticamente quando condições pré-definidas são atingidas — sem intermediários humanos. Exemplo prático com DREX: "Liberar R$300.000 de financiamento imobiliário AUTOMATICAMENTE quando o cartório registrar a escritura no sistema." Outro exemplo: seguro agrícola que paga automaticamente quando sensores detectam seca acima de um limite.'
        },
        {
          q: 'No contexto do Big Data bancário, qual a diferença entre os conceitos de Big Data e Analytics?',
          options: [
            'São sinônimos — ambos se referem à análise de grandes volumes de dados',
            'Big Data refere-se às tecnologias de armazenamento e processamento de grandes volumes; Analytics é a análise desses dados para gerar insights',
            'Big Data é exclusivo para dados de clientes; Analytics é para dados operacionais internos',
            'Big Data é aplicado apenas em bancos públicos; Analytics apenas em bancos privados'
          ],
          answer: 1,
          explanation: 'Big Data é o conjunto de tecnologias (Hadoop, Spark, data lakes) que permitem ARMAZENAR e PROCESSAR volumes massivos de dados. Analytics é a ANÁLISE desses dados para extrair INSIGHTS de negócio: quais clientes têm maior propensão a aceitar previdência? Quais agências têm risco operacional elevado? Big Data é a infraestrutura; Analytics é o uso estratégico. Juntos, habilitam decisões mais inteligentes.'
        }
      ]
    }
  ]
};
