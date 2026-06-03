window.LEGISLACAO_DATA = {
  id: 'legislacao',
  name: 'Legislação e Normas',
  icon: '⚖️',
  color: '#dc2626',
  gradient: 'linear-gradient(135deg, #dc2626, #b91c1c)',
  topics: [
    {
      id: 'leg-etica',
      title: 'Ética no Serviço Público',
      xp: 20,
      lesson: {
        title: 'Ética no Serviço Público e Código de Ética do BB',
        theory: `<p>A <strong>ética profissional</strong> é cobrada em todos os concursos bancários. O BB, como empresa pública, deve observar princípios constitucionais e o Código de Ética específico da instituição.</p>

<h3>Decreto 1.171/94 — Código de Ética Profissional do Servidor Público Civil</h3>
<p>Apesar de o BB ser uma sociedade de economia mista (não servidor público stricto sensu), o Código de Ética de 1994 é referência para questões sobre ética no setor público e é cobrado em concursos do BB.</p>
<ul>
  <li>Dever de honestidade: ser verdadeiro no trato com o público e com a instituição</li>
  <li>Dever de imparcialidade: tratar todos os cidadãos/clientes sem distinção</li>
  <li>Dever de lealdade: agir dentro dos limites de competência e de acordo com a lei</li>
  <li>Decoro: manter postura digna no exercício das funções</li>
</ul>

<h3>Princípios da Administração Pública — LIMPE (Art. 37 CF/88)</h3>
<ul>
  <li><strong>Legalidade:</strong> a Administração Pública só pode fazer o que a lei autoriza (diferente do particular, que pode fazer tudo que a lei não proíbe)</li>
  <li><strong>Impessoalidade:</strong> agir sem favoritismos ou perseguições pessoais. Os atos são da Administração, não do agente público individualmente.</li>
  <li><strong>Moralidade:</strong> agir com boa-fé, honestidade e ética, mesmo quando não há fiscalização.</li>
  <li><strong>Publicidade:</strong> transparência — os atos públicos devem ser divulgados, salvo os sigilosos por lei.</li>
  <li><strong>Eficiência:</strong> fazer mais com menos, com qualidade e tempestividade. Acrescentado pela EC 19/1998.</li>
</ul>

<h3>Vedações Éticas — O que um Funcionário do BB NÃO pode fazer</h3>
<ul>
  <li>Usar o cargo ou informações privilegiadas para benefício próprio ou de terceiros</li>
  <li>Receber presentes, doações ou vantagens que possam comprometer a imparcialidade (limite: R$ 100 por presente)</li>
  <li>Revelar informações sigilosas sobre clientes ou operações (sigilo bancário)</li>
  <li>Ter conflito de interesse não declarado (ex: aprovar crédito para empresa em que tem participação)</li>
  <li>Assédio moral ou sexual</li>
  <li>Omitir operações suspeitas de lavagem de dinheiro</li>
</ul>

<h3>Código de Ética do Banco do Brasil</h3>
<p>O BB possui seu próprio Código de Ética, que estabelece: compromisso com a legalidade; respeito à diversidade; proteção aos dados dos clientes; responsabilidade socioambiental; combate à corrupção; proibição de práticas antiéticas em negociações. Funcionários devem aderir formalmente e são treinados periodicamente.</p>`,
        examples: [
          {
            title: 'LIMPE aplicado ao cotidiano do BB',
            code: `LEGALIDADE:
O gerente não pode conceder desconto na tarifa bancária
"porque quer ajudar o cliente" — só pode fazer o que a
política do BB e a regulação do BCB permitem.
✓ Certo: "O desconto está previsto em nossa política para
         clientes com esse perfil de relacionamento."
✗ Errado: "Vou criar uma exceção só para você porque
          você é um bom cliente."

IMPESSOALIDADE:
Gerente não pode priorizar o atendimento de amigos
ou parentes na fila de crédito — todos com mesmo
perfil devem ter tratamento idêntico.
✗ Errado: "Vou analisar o pedido de crédito do Pedro
          primeiro porque somos amigos."

MORALIDADE:
Funcionário encontra R$500 esquecidos na mesa de atendimento.
✓ Certo: entrega ao setor responsável e registra ocorrência.
✗ Errado: fica com o dinheiro — "ninguém vai saber".
A moralidade exige agir bem MESMO sem fiscalização.

PUBLICIDADE:
O BB publica relatórios anuais de sustentabilidade, balanços
financeiros e informações sobre produtos — transparência
como obrigação institucional.

EFICIÊNCIA:
Meta: resolver reclamações no primeiro contato (FCR — First
Call Resolution). Processos digitais eliminam papel e
reduzem tempo de atendimento. Eficiência = qualidade + velocidade.`,
            explanation: 'O acrônimo LIMPE deve ser memorizado: Legalidade, Impessoalidade, Moralidade, Publicidade, Eficiência. Em questões de concurso, descreve-se uma situação e pergunta qual princípio foi violado. Legalidade: agiu sem autorização legal. Impessoalidade: favoreceu alguém. Moralidade: agiu de má-fé. Publicidade: ocultou informação. Eficiência: desperdiçou recursos ou foi lento sem justificativa.'
          },
          {
            title: 'Conflito de interesses — situações práticas e como proceder',
            code: `SITUAÇÃO 1 — Ações de empresa cliente:
Um analista de crédito do BB possui ações de uma empresa
que está solicitando empréstimo de R$ 2 milhões.

PROBLEMA: conflito de interesse — decisão pode ser
influenciada por interesse financeiro pessoal.

CONDUTA CORRETA:
1. Declarar o impedimento ao gestor imediatamente
2. Se abstain de participar da análise
3. O caso é transferido para outro analista sem interesse
Registro formal obrigatório no sistema de conformidade

SITUAÇÃO 2 — Funcionário recebe presente de cliente:
Cliente agradecido quer presentear o gerente com
uma cesta de natal avaliada em R$ 450.

REGRA: limite de R$ 100 por presente (Portaria CGU)
Acima disso: caracteriza vantagem indevida

CONDUTA CORRETA:
1. Agradecer com gentileza mas recusar o presente
2. Registrar a oferta no sistema de conformidade
3. Se não puder recusar (entregue por terceiro), registrar
   e entregar ao setor responsável do banco

SITUAÇÃO 3 — Informação privilegiada:
Gerente sabe que o BB vai fechar uma agência no bairro X.
Antes do anúncio, avisa amigos que têm imóveis locados.

PROBLEMA: uso de informação privilegiada (insider)
→ Infração ética e possivelmente crime
CONDUTA CORRETA: manter sigilo absoluto sobre
informações estratégicas não públicas`,
            explanation: 'Conflito de interesse ocorre quando o interesse pessoal do funcionário pode influenciar suas decisões profissionais. A solução é sempre: DECLARAR e AFASTAR-SE. O sistema de conformidade do BB (Conformidade e Controle Interno) é o canal para registrar essas situações. A omissão de um conflito é infração tão grave quanto o conflito em si. Para questões sobre "o que fazer", lembre: sempre declarar e transferir o caso.'
          },
          {
            title: 'Recebimento de presentes e benefícios — regras detalhadas',
            code: `BASE LEGAL: Portaria CGU nº 1.631/2021

REGRA GERAL:
Presentes de valor até R$ 100,00: podem ser aceitos
Presentes acima de R$ 100,00: devem ser recusados ou
entregues ao patrimônio do órgão/empresa

EXCEÇÕES (sempre proibido, independente do valor):
✗ Presente de fornecedores que estão em processo
  de licitação ou contrato ativo com o banco
✗ Presente condicionado a alguma contrapartida
  ("receba isso e aprove meu crédito")
✗ Presente em dinheiro ou equivalente (cartão-presente,
  cheque, transferência Pix)
✗ Hospitalidade excessiva (viagens pagas, ingressos VIP
  para eventos, estadias em hotel)

EXEMPLOS PRÁTICOS:
✓ OK: cliente traz 1 kg de doce caseiro de natal ≈ R$ 30
✓ OK: caneta de brinde com logo da empresa (baixo valor)
✗ Proibido: caixa de vinho importado R$ 300 de fornecedor
✗ Proibido: ingresso para jogo de futebol de R$ 800

PROCEDIMENTO SE RECEBER INDEVIDAMENTE:
1. Não usar/consumir o presente
2. Comunicar ao superior imediato
3. Registrar no sistema de conformidade
4. Providenciar devolução ou doação (se perecível)

O OBJETIVO: garantir imparcialidade e evitar que
decisões profissionais sejam influenciadas por
vantagens pessoais`,
            explanation: 'O limite de R$100 é uma referência importante para provas. Mas atenção: mesmo abaixo de R$100, há situações sempre proibidas (dinheiro, cartão-presente, presente de parte interessada em contrato). A lógica é: presentes simbólicos de gratidão são culturalmente normais; presentes que possam criar obrigação ou influenciar decisões são antiéticos. Em dúvida, não aceite — e registre sempre.'
          }
        ]
      },
      quiz: [
        {
          q: 'Qual princípio da Administração Pública é observado quando um gerente do BB trata todos os clientes com o mesmo critério, sem favorecer parentes ou amigos?',
          options: [
            'Legalidade — pois age de acordo com a lei',
            'Impessoalidade — pois não age com favoritismo pessoal',
            'Eficiência — pois atende a todos rapidamente',
            'Publicidade — pois seu atendimento é transparente'
          ],
          answer: 1,
          explanation: 'IMPESSOALIDADE: o agente público deve tratar todos de forma igualitária, sem considerações pessoais (amizade, parentesco, interesse). Os atos são praticados em nome da instituição (não do agente individualmente). Legalidade seria: agir dentro do que a lei autoriza. Eficiência: fazer bem feito e no tempo certo. Publicidade: transparência nos atos. Favoritismo viola a impessoalidade — é um dos erros mais comuns e mais cobrados em questões.'
        },
        {
          q: 'Um funcionário do BB descobre que uma empresa de um parente está solicitando empréstimo e será ele o responsável pela análise. Qual deve ser sua conduta?',
          options: [
            'Analisar normalmente, pois o parentesco não afeta sua capacidade técnica',
            'Negar o crédito preventivamente para evitar suspeitas de favorecimento',
            'Declarar o impedimento ao gestor e se afastar da análise do caso',
            'Aprovar o crédito se a empresa atender aos critérios técnicos objetivos'
          ],
          answer: 2,
          explanation: 'Conflito de interesse exige sempre: DECLARAR e AFASTAR-SE. Não cabe ao próprio funcionário julgar se seu interesse pessoal afeta ou não sua imparcialidade — a aparência de conflito já é suficiente para o impedimento. Negar o crédito preventivamente seria errado (poderia prejudicar empresa com perfil legítimo). Aprovar também seria errado (sem a segregação adequada). A conduta correta é a transparência e a transferência do caso.'
        },
        {
          q: 'O princípio da MORALIDADE na Administração Pública significa que o agente deve:',
          options: [
            'Seguir apenas as regras escritas no regulamento interno, sem ir além delas',
            'Agir com honestidade, boa-fé e ética mesmo quando não há fiscalização ou possibilidade de punição',
            'Priorizar a eficiência nos processos, mesmo que isso implique atalhos nos procedimentos',
            'Publicar todas as suas decisões para revisão dos superiores hierárquicos'
          ],
          answer: 1,
          explanation: 'MORALIDADE: a conduta ética não se esgota na legalidade formal. É possível algo ser "legal" mas imoral — e isso viola o princípio da moralidade. O funcionário público deve agir com boa-fé e honestidade MESMO SEM FISCALIZAÇÃO. Exemplo clássico: encontrar dinheiro esquecido e ficar com ele pode ser legalmente ambíguo, mas é moralmente errado. A moralidade é um padrão mais elevado que a mera conformidade legal.'
        },
        {
          q: 'Um cliente presenteia o gerente com uma garrafa de vinho importado avaliada em R$ 280 como agradecimento pelo bom atendimento. O que o gerente deve fazer?',
          options: [
            'Aceitar o presente, pois é uma expressão de gratidão e não cria qualquer obrigação',
            'Aceitar apenas se o cliente assinar termo declarando que não espera contrapartida',
            'Recusar gentilmente, pois o valor supera o limite de R$ 100, e registrar a situação no sistema de conformidade',
            'Aceitar o presente e dividi-lo com a equipe para evitar benefício individual'
          ],
          answer: 2,
          explanation: 'Pelo limite regulatório (Portaria CGU), presentes acima de R$100 devem ser recusados para preservar a imparcialidade. A conduta correta é: (1) recusar com educação, explicando a política; (2) registrar a oferta no sistema de conformidade. Aceitar dividido com a equipe não está correto — o problema não é o benefício individual, mas a relação de influência potencial que o presente cria. Fazer o registro mesmo recusando é importante para transparência e rastreabilidade.'
        },
        {
          q: 'O princípio da LEGALIDADE na Administração Pública difere do princípio de legalidade que rege o particular. Qual é essa diferença?',
          options: [
            'Para a Administração Pública e para o particular, legalidade significa a mesma coisa: cumprir a lei',
            'O particular pode fazer tudo que a lei não proíbe; a Administração Pública só pode fazer o que a lei expressamente autoriza',
            'A Administração Pública pode agir sem lei desde que haja interesse público; o particular não pode',
            'O princípio de legalidade aplica-se apenas ao Poder Executivo, não às empresas de economia mista como o BB'
          ],
          answer: 1,
          explanation: 'Distinção fundamental: PARTICULAR: pode fazer TUDO que a lei não proíbe (autonomia da vontade). ADMINISTRAÇÃO PÚBLICA: pode fazer APENAS o que a lei expressamente PERMITE ou AUTORIZA. Essa diferença protege os cidadãos de abusos do poder público — sem autorização legal, o ato administrativo é nulo. O BB, como sociedade de economia mista, está sujeito a esse princípio em suas funções de serviço público. Para suas atividades comerciais, observa também o direito privado.'
        }
      ]
    },
    {
      id: 'leg-cdc',
      title: 'CDC e Direitos do Consumidor Bancário',
      xp: 20,
      lesson: {
        title: 'CDC Aplicado ao Setor Bancário',
        theory: `<p>O <strong>Código de Defesa do Consumidor (Lei 8.078/90)</strong> aplica-se plenamente às instituições financeiras, conforme a Súmula 297 do STJ. Todo funcionário do BB deve conhecer os direitos básicos dos clientes.</p>

<h3>Súmula 297 do STJ</h3>
<p>"O Código de Defesa do Consumidor é aplicável às instituições financeiras." (Aprovada em 2004 pelo Superior Tribunal de Justiça, pondo fim à discussão sobre o tema.)</p>

<h3>Direitos Básicos do Consumidor Bancário</h3>
<ul>
  <li><strong>Informação adequada e clara:</strong> o banco deve informar de forma clara e precisa os produtos e serviços, incluindo taxas, encargos, riscos e prazos.</li>
  <li><strong>Proteção contra práticas abusivas:</strong> venda casada, cobranças indevidas, cláusulas abusivas em contratos são proibidas.</li>
  <li><strong>Inversão do ônus da prova:</strong> em ação judicial, o banco deve provar que não cometeu o erro, não o consumidor que prove o contrário.</li>
  <li><strong>Cobrança indevida:</strong> se cobrado indevidamente, o consumidor tem direito à devolução em DOBRO do valor pago, acrescido de correção monetária (Art. 42, parágrafo único).</li>
</ul>

<h3>Práticas Abusivas Bancárias Proibidas pelo CDC</h3>
<ul>
  <li><strong>Venda casada:</strong> condicionar a venda de produto A à compra obrigatória de produto B</li>
  <li><strong>Tarifas não informadas:</strong> cobrar tarifas que não foram informadas previamente no contrato</li>
  <li><strong>Cláusulas abusivas:</strong> cláusulas que gerem desvantagem exagerada para o consumidor</li>
  <li><strong>Cobrança de dívida prescrita:</strong> pressionar para pagamento de dívida com prazo prescrito</li>
</ul>

<h3>Resolução BCB 4.949/21 — Atendimento ao Cliente</h3>
<ul>
  <li><strong>SAC:</strong> serviço de atendimento ao consumidor disponível 24h/7 dias, gratuito, sem transferência para outro número</li>
  <li><strong>Ouvidoria:</strong> instância de segundo nível. Reclamações não resolvidas no SAC. Prazo de resposta: 10 dias úteis (prorrogável a 20 dias com justificativa)</li>
  <li>Os bancos devem comunicar ao cliente sobre a possibilidade de recorrer à Ouvidoria e ao BCB</li>
</ul>

<h3>Portabilidade de Crédito</h3>
<p>O consumidor pode transferir dívida para instituição que ofereça taxa menor. O banco credor deve fornecer o saldo devedor em até <strong>1 dia útil</strong>. A portabilidade não pode ser negada injustificadamente.</p>`,
        examples: [
          {
            title: 'Práticas abusivas bancárias — o que é e o que não é permitido',
            code: `VENDA CASADA — PROIBIDA:
✗ "Para aprovar seu empréstimo, preciso que você contrate
   o seguro prestamista com a gente."
(condicionar crédito à compra de seguro = venda casada)

OFERTA DE PRODUTO COMPLEMENTAR — PERMITIDA:
✓ "Aprovamos seu empréstimo! E já que estamos conversando,
   gostaria de apresentar nosso seguro prestamista — ele
   quita a dívida se você ficar desempregado. Quer conhecer?"
(oferecer o seguro como opção, sem condicionar o crédito)

TARIFA NÃO INFORMADA — ABUSIVA:
✗ Banco cobra R$ 30/mês de "tarifa de manutenção" que
   não estava no contrato de abertura de conta.
O cliente pode pedir devolução em DOBRO (CDC Art. 42)
+ reclamar ao SAC, Ouvidoria, BCB e Procon

CLÁUSULA ABUSIVA EM CONTRATO DE ADESÃO:
Contratos bancários são contratos de ADESÃO:
o cliente não negocia as cláusulas, apenas aceita.
O CDC protege nesse caso: cláusulas que limitam
direitos legais do consumidor são nulas de pleno direito,
mesmo que assinadas!

INFORMAÇÃO INADEQUADA:
"Taxa a partir de 1,99% ao mês" (sem mostrar o CET —
Custo Efetivo Total) viola a Resolução BCB sobre
transparência de taxas de operações de crédito.
O CET deve ser informado antes da assinatura do contrato.`,
            explanation: 'A distinção venda casada vs oferta complementar é sutil mas crucial. A chave: na venda casada, o produto X SÓ é vendido SE o cliente comprar Y. Na oferta legítima, Y é oferecido como opção independente. A jurisprudência do STJ é clara: oferecer e condicionar são atos completamente diferentes. O CDC protege especialmente em contratos de adesão (como contratos bancários) pois o consumidor não tem poder de negociar as cláusulas.'
          },
          {
            title: 'SAC vs Ouvidoria — fluxo e diferenças',
            code: `FLUXO DE RECLAMAÇÃO:
Cliente insatisfeito →

PASSO 1: SAC (0800 ou canal digital)
- Disponível: 24h × 7 dias × 365 dias
- Gratuito (0800 ou app/chat)
- Sem transferência para outro número
- Objetivo: RESOLUÇÃO IMEDIATA do problema
- Prazo: deve tentar resolver na mesma ligação/chat
- Se não resolver: orientar a abrir protocolo formal

PASSO 2: OUVIDORIA (se SAC não resolveu)
- Instância de SEGUNDO NÍVEL
- Analisa reclamações não resolvidas pelo SAC
- Prazo de resposta: 10 dias úteis
  (pode ser estendido a 20 dias em casos complexos,
   com justificativa ao cliente)
- Registra na plataforma do BCB (Sistema de Monitoramento)
- Canal: telefone exclusivo ou área no site/app

PASSO 3: BCB (Banco Central) / Procon / Consumidor.gov.br
- Se Ouvidoria não resolver ou resolver inadequadamente
- BCB: pode aplicar penalidades ao banco por má conduta
- Procon: mediação e multas
- Consumidor.gov.br: plataforma do governo federal

PASSO 4: Judicial
- Ação no Juizado Especial (JEC) para valores menores
- Ação ordinária para valores maiores
- Proibição de cláusula de arbitragem compulsória em CDC

DIFERENÇA FUNDAMENTAL SAC vs OUVIDORIA:
SAC = resolver o problema do momento
Ouvidoria = segunda instância, foco em investigação
             e correção sistêmica do banco`,
            explanation: 'SAC e Ouvidoria têm papéis complementares. O SAC resolve problemas operacionais no momento (cobrança errada, bloqueio de cartão, senha, extrato). A Ouvidoria investiga reclamações mais complexas e não resolvidas, com poder de provocar mudanças institucionais. Em concursos, o prazo de 10 dias úteis da Ouvidoria é frequentemente cobrado. O BCB utiliza os dados das Ouvidorias para supervisionar a qualidade do atendimento dos bancos.'
          },
          {
            title: 'Portabilidade de crédito — como funciona e os direitos',
            code: `CENÁRIO:
Cliente João tem empréstimo pessoal no Banco A:
- Saldo devedor: R$ 15.000
- Taxa: 3,5% ao mês (= ~51% a.a.)
- 24 parcelas restantes de R$ 850

Banco B oferece: taxa de 2,8% ao mês (= ~39% a.a.)
→ João quer fazer a portabilidade

DIREITOS DO CLIENTE — PORTABILIDADE DE CRÉDITO:
1. João solicita a portabilidade ao Banco B
2. Banco B solicita ao Banco A o saldo devedor
3. Banco A DEVE fornecer o saldo em até 1 DIA ÚTIL
   (obrigação regulatória — não pode recusar ou atrasar)
4. Banco B faz a proposta com a taxa menor
5. Se João aceitar, Banco B quita a dívida com Banco A
6. João passa a dever ao Banco B com taxa menor

CONDIÇÕES:
- Prazo e valor devem ser iguais ou melhores para o cliente
- A taxa DEVE ser menor (objetivo da portabilidade)
- O banco NÃO pode cobrar tarifa do cliente para portar
- O banco PODE cobrar do banco que quer "roubar" o cliente
  (TED para quitação antecipada)

ECONOMIA POTENCIAL DE JOÃO:
Taxa antiga: 3,5% ao mês
Taxa nova: 2,8% ao mês
Em 24 meses: economia significativa nos juros totais

PORTABILIDADE DE SALÁRIO:
Diferente da portabilidade de crédito — cliente pode
direcionar seu salário para qualquer banco que preferir,
mesmo que receba pelo banco do empregador.`,
            explanation: 'Portabilidade de crédito é um direito do consumidor bancário que estimula a concorrência. O prazo de 1 dia útil para o banco credor fornecer o saldo devedor é regulatório e não pode ser estendido. A lógica é simples: sem acesso ao saldo, o cliente não pode portar — e o banco devedor poderia usar isso para segurar o cliente. O BCB monitora o cumprimento dessa obrigação.'
          }
        ]
      },
      quiz: [
        {
          q: 'A Súmula 297 do STJ, em relação ao CDC e às instituições financeiras, estabelece que:',
          options: [
            'O CDC NÃO se aplica às instituições financeiras, pois estas são reguladas pelo BCB',
            'O CDC se aplica às instituições financeiras integralmente',
            'O CDC se aplica apenas para crédito ao consumidor, não para investimentos',
            'O CDC se aplica apenas para bancos privados, não para bancos públicos como o BB'
          ],
          answer: 1,
          explanation: 'A Súmula 297 STJ (2004) pacificou a questão: "O Código de Defesa do Consumidor é aplicável às instituições financeiras." Isso significa que TODOS os direitos do CDC (informação, proibição de práticas abusivas, inversão do ônus da prova, restituição em dobro de cobrança indevida) valem para clientes de bancos. Não importa se é banco público ou privado, nacional ou estrangeiro — o CDC se aplica a todos na relação de consumo.'
        },
        {
          q: 'Um cliente foi cobrado R$ 200 de tarifa bancária que não constava em seu contrato. Pelo CDC, qual o direito desse cliente?',
          options: [
            'Reclamar e receber de volta os R$ 200 corrigidos monetariamente',
            'Receber de volta apenas R$ 100 — metade do valor cobrado indevidamente',
            'Receber de volta R$ 400 (devolução em DOBRO) mais correção monetária e juros',
            'Não tem direito a reembolso, pois a tarifa foi cobrada pelo banco dentro de sua autonomia'
          ],
          answer: 2,
          explanation: 'Art. 42, parágrafo único do CDC: "O consumidor cobrado em quantia indevida tem direito à repetição do indébito, por valor igual ao DOBRO do que pagou em excesso, acrescido de correção monetária e juros legais." Portanto: R$ 200 de cobrança indevida → direito à devolução de R$ 400 (dobro) + correção + juros. Exceção: se houve engano justificável, pode ser apenas a devolução simples — mas o banco teria que provar o engano.'
        },
        {
          q: 'Qual a principal diferença entre o SAC e a OUVIDORIA de uma instituição financeira?',
          options: [
            'O SAC é gratuito; a Ouvidoria cobra uma taxa administrativa',
            'O SAC atende reclamações imediatas em primeiro nível; a Ouvidoria é o segundo nível, para casos não resolvidos pelo SAC, com prazo de 10 dias úteis',
            'O SAC funciona 8h/dia em dias úteis; a Ouvidoria funciona 24h',
            'O SAC tem prazo de 10 dias úteis para resposta; a Ouvidoria responde na hora'
          ],
          answer: 1,
          explanation: 'SAC: primeiro nível, atendimento imediato, 24h/7 dias, gratuito, sem transferência. Objetivo: RESOLVER o problema na hora. OUVIDORIA: segundo nível, instância de apelação quando o SAC não resolveu. PRAZO: 10 dias úteis (pode ser estendido a 20 com justificativa). Ambos são gratuitos. A Ouvidoria tem papel institucional mais amplo: pode identificar falhas sistêmicas e recomendar mudanças de processo ao banco. Os dados das ouvidorias são monitorados pelo BCB.'
        },
        {
          q: 'Um banco nega o fornecimento do saldo devedor de um empréstimo quando o cliente solicita portabilidade de crédito para outro banco. Essa conduta é:',
          options: [
            'Permitida — o banco pode recusar portabilidade de créditos com taxas subsidiadas',
            'Permitida — o banco tem 5 dias úteis para analisar e decidir sobre a portabilidade',
            'Proibida — o banco DEVE fornecer o saldo devedor em até 1 dia útil, sem poder negar',
            'Permitida — a portabilidade é um serviço opcional que o banco pode ou não oferecer'
          ],
          answer: 2,
          explanation: 'A portabilidade de crédito é um DIREITO do consumidor, regulamentado pelo BCB. O banco credor DEVE fornecer o saldo devedor atualizado em até 1 DIA ÚTIL após a solicitação, sem poder negar ou cobrar por isso. Negar ou atrasar é infração regulatória punível pelo BCB. A portabilidade estimula a concorrência entre bancos por clientes, que podem migrar para onde obtém taxas menores sem custo adicional.'
        },
        {
          q: 'Um banco afirma em publicidade: "Empréstimo a partir de 1,5% ao mês" mas não informa o Custo Efetivo Total (CET). Isso viola qual norma?',
          options: [
            'Apenas o Código de Ética interno do banco — não há infração externa',
            'O Código de Defesa do Consumidor — que exige informação clara e adequada sobre produtos e serviços',
            'Apenas a Resolução do BCB sobre transparência de operações de crédito',
            'As opções B e C simultaneamente — CDC e a regulação do BCB são ambas violadas'
          ],
          answer: 3,
          explanation: 'A publicidade enganosa ou omissiva de condições de crédito viola SIMULTANEAMENTE: (1) o CDC (Art. 37 — publicidade enganosa por omissão é proibida; Art. 31 — informação clara e precisa é obrigatória); e (2) as Resoluções do BCB que exigem a divulgação do CET (Custo Efetivo Total) antes da contratação de crédito. O CET inclui além dos juros: IOF, tarifas, seguros, e todos os encargos obrigatórios — é o custo REAL do crédito. Informar apenas a taxa nominal (1,5%) sem o CET é considerado publicidade enganosa por omissão.'
        }
      ]
    },
    {
      id: 'leg-bacen',
      title: 'Normas do Banco Central',
      xp: 25,
      lesson: {
        title: 'Principais Resoluções e Circulares do BCB',
        theory: `<p>As normas do <strong>Banco Central do Brasil</strong> são cobradas diretamente nas provas do BB. Conheça as mais relevantes para o cargo de escriturário.</p>

<h3>Resolução BCB 4.656/2018 — Fintechs de Crédito</h3>
<p>Criou dois novos tipos de instituição financeira:</p>
<ul>
  <li><strong>SCD (Sociedade de Crédito Direto):</strong> empresa que concede crédito com capital próprio, via plataforma eletrônica. NÃO pode captar depósitos do público. Capital mínimo: R$ 1 milhão.</li>
  <li><strong>SEP (Sociedade de Empréstimo entre Pessoas — Peer-to-Peer):</strong> empresa que intermedia operações de crédito entre pessoas (P2P lending). Conecta quem quer emprestar com quem quer tomar crédito. Capital mínimo: R$ 1 milhão.</li>
  <li>Ambas precisam de autorização do BCB para funcionar.</li>
</ul>

<h3>Resolução BCB 4.949/2021 — Atendimento ao Cliente</h3>
<p>Regulamenta os canais de atendimento das instituições financeiras: SAC (disponível 24h/7 dias, gratuito), Ouvidoria (prazo de 10 dias úteis), ouvidoria como segundo nível, comunicação com reguladores.</p>

<h3>Resolução BCB 4.893/2021 — Política de Segurança Cibernética</h3>
<p>Obriga as instituições financeiras a manter:</p>
<ul>
  <li>Política de segurança cibernética documentada e aprovada pela diretoria</li>
  <li>Plano de resposta a incidentes cibernéticos</li>
  <li>Programa de testes e avaliação de vulnerabilidades</li>
  <li>Relatório anual sobre gestão de segurança cibernética ao conselho de administração</li>
  <li>Comunicação ao BCB em caso de incidente relevante</li>
</ul>

<h3>Circular BCB 3.978/2020 — PLD/FT (Prevenção à Lavagem de Dinheiro)</h3>
<p>Regula os procedimentos de KYC, monitoramento de operações suspeitas, comunicação ao COAF e as diligências em relação a pessoas politicamente expostas (PEP).</p>

<h3>FGC — Fundo Garantidor de Créditos</h3>
<p>Entidade privada sem fins lucrativos mantida pelas instituições financeiras. Protege depositantes e investidores em caso de falência ou intervenção de um banco.</p>
<ul>
  <li><strong>Garantia ordinária:</strong> R$ 250.000 por CPF/CNPJ por instituição financeira</li>
  <li><strong>Teto total:</strong> R$ 1.000.000 por CPF/CNPJ em todas as instituições (acumulado em 4 anos)</li>
  <li><strong>Produtos cobertos:</strong> conta corrente, poupança, CDB, LCI, LCA, LC, RDB, depósitos a prazo</li>
  <li><strong>Produtos NÃO cobertos:</strong> fundos de investimento, CRI, CRA, ações, debêntures, letras financeiras acima de R$ 250 mil</li>
</ul>`,
        examples: [
          {
            title: 'FGC na prática — limites e estratégias de proteção',
            code: `CASO 1 — Acima do limite em uma única instituição:
Investidor tem R$ 300.000 em CDB no Banco X.
Banco X vai à falência.

FGC paga: R$ 250.000 (limite por CPF por instituição)
Prejuízo: R$ 50.000 (valor acima do limite, perdido)

ESTRATÉGIA: não concentrar mais de R$ 250.000 por
instituição em produtos cobertos pelo FGC.

CASO 2 — Diversificado em dois bancos:
Investidor tem R$ 200.000 no Banco A
             + R$ 200.000 no Banco B
Ambos vão à falência.

FGC paga: R$ 200.000 (banco A) + R$ 200.000 (banco B)
          = R$ 400.000 (ambos dentro do limite por instituição!)
Mas: teto total é R$ 1.000.000 em 4 anos.
R$ 400.000 < R$ 1.000.000 → ambos garantidos ✓

CASO 3 — Fundos de investimento:
R$ 200.000 em fundo de renda fixa no Banco C.
Banco C vai à falência.

FGC paga: R$ 0 — FUNDOS DE INVESTIMENTO NÃO SÃO
COBERTOS pelo FGC!
(Mas os ativos do fundo pertencem aos cotistas,
separados do patrimônio do banco — proteção estrutural)

PRODUTOS COBERTOS PELO FGC:
✓ Conta corrente ✓ Poupança ✓ CDB ✓ LCI ✓ LCA
✓ LC (Letra de Câmbio) ✓ RDB ✓ Depósito a prazo

NÃO COBERTOS:
✗ Fundos de Investimento ✗ CRI ✗ CRA ✗ Ações
✗ Debêntures ✗ Letras Financeiras acima do limite`,
            explanation: 'O FGC é um tema recorrente em concursos do BB. Os números são cruciais: R$250.000 por CPF por instituição, e R$1.000.000 de teto total. Estratégia de diversificação: distribuir em múltiplos bancos, respeitando o limite de R$250.000 em cada. Fundos de investimento não são cobertos pelo FGC — mas têm proteção estrutural separada (patrimônio segregado do banco). CRI e CRA também não têm FGC (por serem emitidos por securitizadoras, não por bancos).'
          },
          {
            title: 'Política de segurança cibernética (Resolução 4.893) — obrigações dos bancos',
            code: `INCIDENTE REAL: Vazamento de dados bancários

OBRIGAÇÕES DO BANCO (Resolução BCB 4.893/2021):

1. POLÍTICA DE SEGURANÇA CIBERNÉTICA:
   - Documento aprovado pela DIRETORIA do banco
   - Define objetivos, controles, responsabilidades
   - Revisada periodicamente

2. PLANO DE RESPOSTA A INCIDENTES:
   - Procedimentos definidos ANTES do incidente
   - Quem notifica o BCB? Em qual prazo?
   - Como isolar o sistema afetado?
   - Como comunicar clientes afetados?
   - Como preservar evidências?

3. PROGRAMA DE TESTES:
   - Testes de penetração (pentest) periódicos
   - Avaliação de vulnerabilidades
   - Simulações de ataques

4. RELATÓRIO ANUAL ao Conselho de Administração:
   - Resultados dos testes
   - Incidentes ocorridos
   - Melhorias implementadas
   - Planos para o próximo período

5. COMUNICAÇÃO AO BCB:
   - Incidentes relevantes devem ser notificados
   - Prazo de notificação (conforme a severidade)

EXEMPLOS DE INCIDENTES RELEVANTES:
- Vazamento de dados de clientes (violação de confidencialidade)
- Sistema de internet banking fora do ar por ataque DDoS
- Fraude em larga escala via engenharia social
- Ransomware em sistemas críticos`,
            explanation: 'A Resolução 4.893 é a resposta do BCB ao crescimento dos ataques cibernéticos ao sistema financeiro. Ela exige que os bancos sejam PROATIVOS (não apenas reagir a ataques, mas testar seus sistemas antes). O relatório anual ao conselho de administração garante que a alta liderança esteja ciente dos riscos cibernéticos. Para o concurso, os elementos cobrados são: política aprovada pela diretoria, plano de resposta a incidentes, testes periódicos e relatório anual ao conselho.'
          },
          {
            title: 'SCD vs SEP — as fintechs de crédito reguladas pelo BCB',
            code: `RESOLUÇÃO BCB 4.656/2018:
Criou dois novos tipos de instituição de crédito

SCD — SOCIEDADE DE CRÉDITO DIRETO:
Modelo: a fintech empresta SEU PRÓPRIO CAPITAL
Origem dos recursos: capital próprio + captações via
                     emissão de instrumentos autorizados
Exemplos de operações: crédito pessoal digital,
                       antecipação de recebíveis
Captação de depósitos do público? NÃO
Quem supervisiona? BCB
Capital mínimo: R$ 1 milhão

SEP — SOCIEDADE DE EMPRÉSTIMO ENTRE PESSOAS:
Modelo: PLATAFORMA que conecta quem quer emprestar
        (investidor) com quem quer tomar crédito (tomador)
= "Marketplace" de crédito (peer-to-peer lending)
A SEP não empresta dinheiro próprio — é INTERMEDIÁRIA
Exemplos: plataformas de crédito P2P
Risco fica com os investidores (não com a SEP)
Captação de depósitos do público? NÃO
Quem supervisiona? BCB
Capital mínimo: R$ 1 milhão

DIFERENÇA FUNDAMENTAL:
SCD: usa capital próprio para emprestar → risco é da SCD
SEP: conecta terceiros → risco é dos investidores da plataforma

AMBAS:
✓ Precisam de autorização do BCB para operar
✓ Somente por meio eletrônico (plataforma digital)
✓ Podem ceder créditos para bancos e fundos
✓ NÃO podem ter agências físicas (modelo digital)`,
            explanation: 'SCD e SEP são os tipos de fintech de crédito mais cobrados em concursos do BB. A distinção principal: SCD usa dinheiro próprio (risco é da fintech); SEP intermedia terceiros (risco é dos investidores). Ambas só podem operar via plataforma digital e precisam de autorização do BCB. O capital mínimo de R$1 milhão foi estabelecido para garantir alguma solidez financeira dessas novas instituições, mas é muito menor que o exigido de um banco múltiplo.'
          }
        ]
      },
      quiz: [
        {
          q: 'O FGC (Fundo Garantidor de Créditos) garante R$ 250.000 por CPF por instituição. Um investidor tem R$ 300.000 em CDB em um único banco que vai à falência. Quanto o FGC paga?',
          options: [
            'R$ 300.000 — o valor total investido',
            'R$ 250.000 — o limite máximo garantido por instituição',
            'Nada — CDB não é coberto pelo FGC',
            'R$ 150.000 — metade do valor acima do limite'
          ],
          answer: 1,
          explanation: 'O FGC garante até R$250.000 por CPF por instituição. O investidor com R$300.000 em um único banco recebe R$250.000 do FGC e perde R$50.000 (valor acima do limite). CDB É coberto pelo FGC. A solução para proteger o excedente é distribuir em múltiplos bancos, mantendo até R$250.000 em cada. Existe também o teto total de R$1 milhão por CPF em 4 anos — mas aqui o limite por instituição já é a restrição ativa.'
        },
        {
          q: 'Qual produto de investimento NÃO é coberto pelo FGC?',
          options: [
            'CDB (Certificado de Depósito Bancário)',
            'LCI (Letra de Crédito Imobiliário)',
            'Fundo de Investimento de Renda Fixa',
            'Conta Poupança'
          ],
          answer: 2,
          explanation: 'Fundos de investimento NÃO são cobertos pelo FGC. Isso porque o patrimônio dos fundos é separado do patrimônio do banco administrador — em caso de falência do banco, os ativos do fundo pertencem aos cotistas (proteção estrutural). Produtos cobertos pelo FGC: contas correntes, poupança, CDB, LCI, LCA, LC, RDB e depósitos a prazo. Não cobertos: fundos de investimento, CRI, CRA, ações, debêntures.'
        },
        {
          q: 'O que diferencia a SCD (Sociedade de Crédito Direto) da SEP (Sociedade de Empréstimo entre Pessoas)?',
          options: [
            'A SCD pode captar depósitos do público; a SEP não pode',
            'A SCD empresta capital próprio; a SEP conecta tomadores com investidores (plataforma P2P)',
            'A SCD é regulada pelo BCB; a SEP é regulada pela CVM',
            'A SCD pode ter agências físicas; a SEP opera apenas digitalmente'
          ],
          answer: 1,
          explanation: 'SCD = usa CAPITAL PRÓPRIO para conceder crédito diretamente. O risco de crédito fica com a SCD. SEP = PLATAFORMA que conecta quem quer emprestar (investidores PF ou PJ) com quem precisa de crédito (tomadores). O risco fica com os investidores, não com a SEP. AMBAS: reguladas pelo BCB, operam apenas via plataforma digital, não captam depósitos do público, capital mínimo de R$1 milhão, precisam de autorização do BCB.'
        },
        {
          q: 'A Resolução BCB 4.893/2021 exige que as instituições financeiras mantenham uma política de segurança cibernética. Qual é o nível mínimo de aprovação exigido para essa política?',
          options: [
            'Gerência de TI — o responsável técnico deve aprovar',
            'Área de Compliance e Controles Internos',
            'Diretoria da instituição financeira',
            'Banco Central, que deve validar cada política'
          ],
          answer: 2,
          explanation: 'A Resolução 4.893 exige que a política de segurança cibernética seja aprovada pela DIRETORIA da instituição — não apenas pela área técnica. Isso garante que o tema chegue ao mais alto nível de gestão e que haja comprometimento institucional (não apenas técnico) com a segurança. O relatório anual sobre a gestão de segurança também deve ser apresentado ao conselho de administração. O BCB não aprova cada política individualmente — supervisiona o cumprimento da norma.'
        },
        {
          q: 'Um cliente tem R$ 200.000 no Banco A e R$ 150.000 no Banco B. Ambos os bancos decretam falência na mesma semana. Qual o total que o FGC pagará ao cliente?',
          options: [
            'R$ 250.000 — apenas o limite por CPF por instituição, aplicado ao maior saldo',
            'R$ 350.000 — R$ 200.000 do Banco A + R$ 150.000 do Banco B, ambos dentro do limite',
            'R$ 250.000 — limite total independentemente do número de bancos',
            'R$ 500.000 — o FGC paga o dobro em casos de falência simultânea'
          ],
          answer: 1,
          explanation: 'O FGC garante R$250.000 por CPF POR INSTITUIÇÃO. Como o cliente tem R$200.000 no Banco A (abaixo do limite) e R$150.000 no Banco B (abaixo do limite), AMBOS estão protegidos integralmente. Total garantido: R$200.000 + R$150.000 = R$350.000. O teto de R$1.000.000 por CPF (em 4 anos) também não é atingido. A estratégia de diversificação entre bancos é eficaz — cada banco tem seu próprio "balde" de R$250.000.'
        }
      ]
    }
  ]
};
