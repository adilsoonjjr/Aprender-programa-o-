window.LEGISLACAO_DATA = {
  id: 'legislacao',
  name: 'Legislação e Compliance',
  icon: '⚖️',
  color: '#8b5cf6',
  description: 'Regulação bancária, LGPD e compliance',
  topics: [
    {
      id: 'lgpd',
      title: 'LGPD — Lei Geral de Proteção de Dados',
      xp: 40,
      theory: `<p>A <strong>LGPD (Lei 13.709/2018)</strong> regula o tratamento de dados pessoais no Brasil. É fundamental para o setor bancário, que lida com grandes volumes de dados sensíveis.</p>
<h3>Princípios da LGPD</h3>
<ul>
  <li><strong>Finalidade:</strong> dados coletados para propósitos legítimos e específicos</li>
  <li><strong>Adequação:</strong> compatibilidade com a finalidade informada</li>
  <li><strong>Necessidade:</strong> coletar apenas o mínimo necessário</li>
  <li><strong>Livre acesso:</strong> titulares podem consultar seus dados</li>
  <li><strong>Qualidade dos dados:</strong> dados precisos e atualizados</li>
  <li><strong>Transparência:</strong> informações claras sobre o tratamento</li>
  <li><strong>Segurança:</strong> proteção contra acessos não autorizados</li>
  <li><strong>Prevenção:</strong> adoção de medidas preventivas</li>
  <li><strong>Não discriminação:</strong> dados não podem ser usados para discriminar</li>
  <li><strong>Responsabilização:</strong> demonstrar conformidade com a lei</li>
</ul>
<h3>Agentes de Tratamento</h3>
<ul>
  <li><strong>Controlador:</strong> decide o que fazer com os dados</li>
  <li><strong>Operador:</strong> processa dados em nome do controlador</li>
  <li><strong>Encarregado (DPO):</strong> responsável pela proteção de dados na organização</li>
</ul>
<h3>ANPD</h3>
<p>Autoridade Nacional de Proteção de Dados — fiscaliza e aplica a LGPD.</p>`,
      examples: [
        {
          header: 'Direitos dos titulares de dados (LGPD)',
          code: `Art. 18 — O titular tem direito a:
  I.   Confirmação da existência do tratamento
  II.  Acesso aos dados
  III. Correção de dados incompletos ou desatualizados
  IV.  Anonimização, bloqueio ou eliminação de dados
         desnecessários ou em desconformidade
  V.   Portabilidade dos dados para outro fornecedor
  VI.  Eliminação de dados pessoais
  VII. Informação sobre compartilhamento
  VIII.Informação sobre consentimento e consequências
  IX.  Revogação do consentimento
  X.   Revisão de decisões automatizadas`,
          explanation: `<p>Os direitos dos titulares são o coração da LGPD. O banco deve ter processos para atender solicitações de acesso, correção e eliminação de dados em prazo razoável.</p>`
        }
      ],
      questions: [
        {
          q: 'A LGPD (Lei Geral de Proteção de Dados) entrou em vigor no Brasil em:',
          options: ['2016', '2018', '2020', '2022'],
          answer: 2,
          explanation: 'A LGPD foi sancionada em agosto de 2018 (Lei 13.709/2018), mas entrou em vigor em setembro de 2020, com as sanções administrativas aplicáveis a partir de agosto de 2021.'
        },
        {
          q: 'Segundo a LGPD, o "Controlador" é:',
          options: ['O funcionário responsável pela TI do banco', 'A pessoa ou organização que decide as finalidades e meios do tratamento de dados', 'A ANPD — órgão fiscalizador', 'Quem apenas processa dados em nome de outro'],
          answer: 1,
          explanation: 'O Controlador decide o "o quê" e o "como" do tratamento de dados pessoais. O Operador apenas processa dados conforme as instruções do Controlador.'
        },
        {
          q: 'O princípio da "necessidade" na LGPD significa:',
          options: ['Que dados devem ser coletados quando necessário', 'Que a coleta deve ser limitada ao mínimo necessário para a finalidade', 'Que o tratamento de dados é sempre necessário', 'Que a empresa precisa de dados para funcionar'],
          answer: 1,
          explanation: 'O princípio da necessidade (ou minimização de dados) estabelece que apenas os dados estritamente necessários para a finalidade declarada devem ser coletados.'
        },
        {
          q: 'A ANPD é:',
          options: ['A Associação Nacional de Bancos Digitais', 'A Autoridade Nacional de Proteção de Dados, responsável por fiscalizar a LGPD', 'O órgão que define as taxas bancárias', 'A associação dos notários e registradores'],
          answer: 1,
          explanation: 'A ANPD (Autoridade Nacional de Proteção de Dados) é o órgão responsável por zelar pela proteção de dados pessoais no Brasil, editar normas e fiscalizar o cumprimento da LGPD.'
        },
        {
          q: 'Um titular de dados pessoais tem o direito de solicitar ao banco:',
          options: ['Apenas a exclusão dos seus dados', 'Apenas a correção de dados incorretos', 'Acesso, correção, portabilidade e eliminação dos seus dados, entre outros direitos', 'Somente informações sobre como seus dados são compartilhados'],
          answer: 2,
          explanation: 'A LGPD (art. 18) garante ao titular um conjunto amplo de direitos: confirmação, acesso, correção, anonimização, portabilidade, eliminação, informações sobre compartilhamento e revogação do consentimento.'
        }
      ]
    },
    {
      id: 'resolucoes_bacen',
      title: 'Regulação do Bacen e Resolucões',
      xp: 35,
      theory: `<p>O <strong>Banco Central</strong> emite normas regulamentadoras que as instituições financeiras devem seguir. Conhecer as principais é essencial para o BB.</p>
<h3>Resolução CMN 4.949/2021 — Relacionamento com Clientes</h3>
<ul>
  <li>Regula o atendimento presencial e eletrônico</li>
  <li>Prevê canais de atendimento obrigatórios</li>
  <li>Estabelece prazo de resolução de demandas</li>
</ul>
<h3>Resolução BCB 96/2021 — Pix</h3>
<ul>
  <li>Regulamenta o Pix — sistema de pagamento instantâneo</li>
  <li>Pix opera 24/7, incluindo fins de semana e feriados</li>
  <li>Chaves Pix: CPF/CNPJ, e-mail, telefone, chave aleatória</li>
  <li>Limites definidos pelo Bacen e pelas IFs</li>
</ul>
<h3>Prevenção à Lavagem de Dinheiro (PLD)</h3>
<ul>
  <li><strong>Lei 9.613/1998:</strong> define lavagem de dinheiro como crime</li>
  <li><strong>Circular Bacen 3.978/2020:</strong> PLD/FT — política, procedimentos e controles</li>
  <li>KYC (Know Your Customer): conheça seu cliente</li>
  <li>Comunicação ao Coaf de operações suspeitas</li>
</ul>`,
      examples: [
        {
          header: 'Fases da lavagem de dinheiro',
          code: `1. COLOCAÇÃO (Placement)
   Inserir o dinheiro ilícito no sistema financeiro
   Ex: depósitos fragmentados (smurfing), apostas

2. OCULTAÇÃO (Layering)
   Dificultar o rastreamento da origem do dinheiro
   Ex: transferências internacionais, compra de ativos

3. INTEGRAÇÃO (Integration)
   Reintroduzir o dinheiro "limpo" na economia
   Ex: compra de imóveis, investimentos legítimos

O bancário deve estar atento em TODAS as fases!`,
          explanation: `<p>O conhecimento das 3 fases da lavagem de dinheiro é muito cobrado. A fase mais crítica para o sistema bancário é a <strong>colocação</strong> — onde o dinheiro entra no sistema.</p>`
        }
      ],
      questions: [
        {
          q: 'As três fases da lavagem de dinheiro, em ordem, são:',
          options: ['Integração, colocação e ocultação', 'Colocação, ocultação e integração', 'Ocultação, integração e colocação', 'Colocação, integração e ocultação'],
          answer: 1,
          explanation: 'As 3 fases da lavagem são: 1) Colocação (inserir o dinheiro no sistema), 2) Ocultação (dificultar o rastreamento), 3) Integração (reintroduzir o dinheiro aparentemente limpo na economia).'
        },
        {
          q: 'O Pix, sistema de pagamento instantâneo do Bacen, opera:',
          options: ['Apenas em dias úteis, horário comercial', '24 horas por dia, 7 dias por semana, incluindo feriados', 'Apenas de segunda a sexta, das 8h às 20h', 'Apenas em transações acima de R$ 100'],
          answer: 1,
          explanation: 'O Pix opera ininterruptamente — 24 horas por dia, 7 dias por semana, 365 dias por ano, incluindo fins de semana e feriados. Essa é uma de suas principais vantagens.'
        },
        {
          q: 'O princípio KYC (Know Your Customer) no contexto bancário significa:',
          options: ['O banco deve conhecer suas próprias políticas internas', 'A obrigação de conhecer e verificar a identidade dos clientes para prevenir lavagem de dinheiro', 'O cliente tem direito de conhecer as tarifas bancárias', 'Processo de avaliação de riscos de investimento'],
          answer: 1,
          explanation: 'KYC é um conjunto de procedimentos para identificar e verificar clientes, entender suas atividades e monitorar transações, fundamental para a prevenção à lavagem de dinheiro (PLD).'
        },
        {
          q: 'Qual lei tipifica a lavagem de dinheiro como crime no Brasil?',
          options: ['Lei 8.069/1990 (ECA)', 'Lei 9.613/1998', 'Lei 13.709/2018 (LGPD)', 'Lei 12.846/2013 (Lei Anticorrupção)'],
          answer: 1,
          explanation: 'A Lei 9.613/1998 (atualizada pela Lei 12.683/2012) define os crimes de lavagem de dinheiro e determina a obrigação das instituições financeiras em cooperar com o combate a esse crime.'
        },
        {
          q: 'As chaves Pix podem ser:',
          options: ['Apenas CPF ou CNPJ', 'Apenas e-mail ou número de telefone', 'CPF/CNPJ, e-mail, número de telefone ou chave aleatória (EVP)', 'Qualquer combinação de números e letras escolhida pelo usuário'],
          answer: 2,
          explanation: 'As chaves Pix são: CPF (para PF), CNPJ (para PJ), endereço de e-mail, número de telefone celular (+55DDNNNNNNNNN) e EVP (chave aleatória — sequência gerada automaticamente).'
        }
      ]
    },
    {
      id: 'etica',
      title: 'Ética no Serviço Público e Privado',
      xp: 25,
      theory: `<p>A <strong>ética profissional</strong> norteia a conduta dos servidores e funcionários, especialmente em instituições financeiras como o Banco do Brasil.</p>
<h3>Princípios da Administração Pública</h3>
<p>Art. 37 da Constituição Federal — <strong>LIMPE</strong>:</p>
<ul>
  <li><strong>L</strong>egalidade: só pode fazer o que a lei permite</li>
  <li><strong>I</strong>mpessoalidade: sem favoritismos ou perseguições</li>
  <li><strong>M</strong>oralidade: conduta ética e honesta</li>
  <li><strong>P</strong>ublicidade: transparência dos atos administrativos</li>
  <li><strong>E</strong>ficiência: melhor resultado com menor custo</li>
</ul>
<h3>Código de Ética do BB</h3>
<ul>
  <li>Respeito aos clientes, parceiros e comunidade</li>
  <li>Compromisso com a sustentabilidade</li>
  <li>Transparência nas relações</li>
  <li>Combate à corrupção e ao suborno</li>
  <li>Confidencialidade das informações</li>
</ul>
<h3>Conflito de Interesses</h3>
<p>Situação em que o interesse pessoal do funcionário pode influenciar suas decisões profissionais. Deve ser declarado e gerenciado.</p>`,
      examples: [
        {
          header: 'Princípios LIMPE — exemplos práticos',
          code: `LEGALIDADE:
  ✓ Seguir apenas as normas regulamentadoras do Bacen
  ✗ Criar "facilidades" não previstas nas normas

IMPESSOALIDADE:
  ✓ Atender todos os clientes com o mesmo padrão
  ✗ Oferecer condições melhores a amigos e parentes

MORALIDADE:
  ✓ Recusar presentes de fornecedores
  ✗ Vazar informações sigilosas de clientes

PUBLICIDADE:
  ✓ Divulgar tarifas e condições dos produtos
  ✗ Omitir informações relevantes ao cliente

EFICIÊNCIA:
  ✓ Resolver o problema do cliente na primeira ligação
  ✗ Burocracia desnecessária que atrasa o atendimento`,
          explanation: `<p>O acrônimo <strong>LIMPE</strong> é a forma mais eficaz de memorizar os princípios do art. 37 da CF. Aparece com frequência nas questões de ética em concursos.</p>`
        }
      ],
      questions: [
        {
          q: 'O acrônimo LIMPE refere-se aos princípios da Administração Pública previstos no art. 37 da CF. A letra "I" representa:',
          options: ['Integridade', 'Impessoalidade', 'Isonomia', 'Imparcialidade'],
          answer: 1,
          explanation: 'LIMPE: Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência. A Impessoalidade exige que o agente público trate todos igualmente, sem favoritismos ou discriminações.'
        },
        {
          q: 'O princípio da Legalidade na Administração Pública significa que:',
          options: ['O administrador pode fazer tudo que a lei não proíbe', 'O administrador só pode fazer o que a lei expressamente autoriza', 'As leis são criadas pela administração pública', 'O administrador deve cumprir apenas as leis que considerar justas'],
          answer: 1,
          explanation: 'Na Administração Pública, a legalidade é estrita: o agente público só pode agir com base em lei que autorize sua conduta. Diferente do particular, que pode fazer tudo que a lei não proíbe.'
        },
        {
          q: 'Um conflito de interesses ocorre quando:',
          options: ['Dois clientes disputam o mesmo produto', 'O interesse pessoal do funcionário pode influenciar indevidamente suas decisões profissionais', 'Há divergência entre dois departamentos do banco', 'O funcionário discorda de uma política interna'],
          answer: 1,
          explanation: 'Conflito de interesses é a situação em que o interesse privado do funcionário pode interferir com sua atuação profissional. Deve ser declarado ao superior e gerenciado adequadamente.'
        },
        {
          q: 'Sobre o sigilo de informações bancárias, é correto afirmar:',
          options: ['Funcionários podem compartilhar dados de clientes com colegas de trabalho livremente', 'O dever de confidencialidade persiste mesmo após o término do vínculo empregatício', 'Apenas a alta gestão tem obrigação de manter o sigilo', 'O sigilo não se aplica a informações de pessoas jurídicas'],
          answer: 1,
          explanation: 'O dever de confidencialidade é permanente — o funcionário mantém a obrigação de guardar sigilo sobre informações dos clientes mesmo após deixar o banco.'
        },
        {
          q: 'O princípio da Eficiência (inserido na CF pela EC 19/1998) exige da Administração Pública:',
          options: ['Apenas reduzir custos a qualquer custo', 'Desempenho com qualidade, presteza e rendimento funcional, buscando o melhor resultado com os recursos disponíveis', 'Demitir servidores com baixo desempenho', 'Terceirizar todos os serviços públicos'],
          answer: 1,
          explanation: 'O princípio da eficiência impõe ao agente público o dever de agir com presteza, perfeição e rendimento funcional. Busca a melhor relação custo-benefício na prestação dos serviços públicos.'
        }
      ]
    }
  ]
};
