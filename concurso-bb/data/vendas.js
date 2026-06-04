window.VENDAS_DATA = {
  id: 'vendas',
  name: 'Vendas e Negociação',
  icon: '🤝',
  color: '#059669',
  gradient: 'linear-gradient(135deg, #059669, #047857)',
  topics: [
    {
      id: 'ven-tecnicas',
      title: 'Técnicas de Vendas',
      xp: 25,
      lesson: {
        title: 'Técnicas de Vendas em Agências Bancárias',
        theory: `<p>No Banco do Brasil, o escriturário é um <strong>consultor financeiro</strong>, não apenas um atendente. Vender com ética, identificar necessidades reais e oferecer o produto adequado são competências fundamentais cobradas no concurso.</p>

<h3>Ciclo de Vendas Bancárias</h3>
<ol>
  <li><strong>Prospecção:</strong> identificar clientes com perfil para determinado produto (análise de carteira, base de dados)</li>
  <li><strong>Abordagem:</strong> primeiro contato — gerar rapport, criar conexão, demonstrar interesse genuíno pelo cliente</li>
  <li><strong>Levantamento de necessidades:</strong> fazer perguntas abertas para entender o que o cliente realmente precisa</li>
  <li><strong>Apresentação da solução:</strong> mostrar como o produto resolve o problema do cliente (benefícios > características)</li>
  <li><strong>Tratamento de objeções:</strong> ouvir, validar e responder às resistências do cliente com empatia e informação</li>
  <li><strong>Fechamento:</strong> conduzir o cliente à decisão de forma natural, sem pressão</li>
  <li><strong>Pós-venda:</strong> acompanhar a satisfação, fortalecer o relacionamento e gerar novas oportunidades</li>
</ol>

<h3>Tipos de Perguntas em Vendas</h3>
<ul>
  <li><strong>Abertas:</strong> geram informação — "Como o senhor costuma poupar?" / "O que é mais importante para você em um investimento?"</li>
  <li><strong>Fechadas:</strong> confirmam dados — "O senhor tem conta poupança?" / "Prefere débito automático?"</li>
  <li><strong>SPIN Selling:</strong> Situação → Problema → Implicação → Necessidade de solução — metodologia para vendas complexas</li>
</ul>

<h3>Conceito de Suitability (Adequação)</h3>
<p>Obrigação regulatória de oferecer produtos adequados ao <strong>perfil do investidor</strong>:</p>
<ul>
  <li><strong>Conservador:</strong> prioriza segurança — produtos: poupança, CDB, Tesouro Direto</li>
  <li><strong>Moderado:</strong> aceita algum risco — fundos balanceados, LCI, LCA</li>
  <li><strong>Arrojado/Agressivo:</strong> tolera alta volatilidade — ações, fundos de renda variável</li>
</ul>
<p>Oferecer produto inadequado ao perfil do cliente é uma infração regulatória — viola o Código de Ética do BB.</p>

<h3>Venda Consultiva vs Venda por Pressão</h3>
<ul>
  <li><strong>Venda consultiva (correta):</strong> o vendedor age como especialista, entende a necessidade, recomenda a melhor solução mesmo que seja mais simples</li>
  <li><strong>Venda por pressão (inadequada):</strong> foco em meta, produto empurrado sem adequação — gera reclamações, churn e violações do CDC</li>
  <li><strong>Venda casada (ilegal):</strong> condicionar a concessão de um produto à contratação de outro — expressamente proibida pelo CDC e BCB</li>
</ul>`,
        examples: [
          {
            title: 'SPIN Selling — cliente sem investimentos',
            code: `SITUAÇÃO: cliente salarista, 35 anos, sem reserva de emergência

S — Situação (entender o contexto):
"Senhor Carlos, além da conta corrente, o senhor
 utiliza algum produto de investimento conosco?"
→ "Não, só a conta mesmo."

P — Problema (revelar dificuldade):
"E se surgir uma emergência, como uma despesa
 médica inesperada, como o senhor costuma lidar?"
→ "Geralmente peço empréstimo ou uso o cartão..."

I — Implicação (mostrar consequências):
"Juros do cartão chegam a 15% ao mês. Uma emergência
 de R$ 3.000 pode virar R$ 5.400 em 6 meses..."
→ "É verdade, já aconteceu isso comigo."

N — Necessidade de solução (o cliente pede):
"Existe algum produto que me ajude a guardar
 dinheiro de forma fácil e acessível?"
→ ABRE CAMINHO para oferecer a poupança ou CDB

SOLUÇÃO APRESENTADA: CDB com liquidez diária
- Rende mais que poupança
- Disponível a qualquer momento
- Garantido pelo FGC até R$ 250.000`,
            explanation: 'O SPIN Selling é uma metodologia de venda consultiva: você conduz o cliente a perceber sozinho a necessidade, ao invés de "empurrar" o produto. Nas provas, o BB valoriza a venda que resolve o problema real do cliente, não a que bate metas a qualquer custo. Suitability: CDB com liquidez diária é adequado para um perfil conservador que precisa de reserva de emergência.'
          },
          {
            title: 'Tratamento de objeção — "não preciso disso"',
            code: `OBJEÇÃO COMUM: "Não preciso de seguro de vida."

TÉCNICA: Ouvir → Validar → Perguntar → Informar

1. OUVIR (sem interromper):
   Deixe o cliente terminar.

2. VALIDAR (empatia):
   "Entendo, senhor João. Muitas pessoas pensam assim,
   especialmente quando estão em boa saúde."

3. PERGUNTAR (abrir reflexão):
   "Posso perguntar — o senhor tem dependentes?
   Filhos ou cônjuge que dependam da sua renda?"

4. INFORMAR (dados concretos):
   "Um seguro de vida por R$ 30/mês garante
   R$ 100.000 aos seus dependentes. É menos que
   uma jantar fora por semana."

5. NÃO FORÇAR:
   Se o cliente recusar, registrar o contato e
   retornar em outro momento. Nunca pressionar.

OBJEÇÃO SOBRE PREÇO: "Está caro."
→ Técnica: "Comparado a quê?" — revela o critério
   real do cliente e permite reposicionar o valor.`,
            explanation: 'Em provas do BB, o tratamento correto de objeção sempre envolve empatia antes de argumentação. O candidato que "pressiona" o cliente para fechar é o que erra a questão. A venda ética mantém o relacionamento de longo prazo — um cliente satisfeito gera indicações e permanece na carteira por anos.'
          },
          {
            title: 'Suitability — adequação de produto ao perfil',
            code: `SITUAÇÃO: Três clientes chegam à agência.

CLIENTE A — Dona Maria, 68 anos, aposentada.
Objetivo: guardar herança de R$ 50.000 com segurança.
Perfil: CONSERVADOR
✅ Correto: CDB do BB, Tesouro Selic, Poupança
❌ Errado: Fundos de ações, criptomoedas

CLIENTE B — Pedro, 35 anos, renda R$ 8.000/mês.
Objetivo: poupar para aposentadoria em 20 anos.
Perfil: MODERADO
✅ Correto: Previdência PGBL/VGBL, fundos multimercado
❌ Errado: só poupança (perde para inflação no longo prazo)

CLIENTE C — Lucas, 28 anos, quer diversificar.
Diz: "Aceito perder no curto prazo para ganhar no longo."
Perfil: ARROJADO
✅ Correto: Fundos de ações, carteira diversificada BB
❌ Errado: convencer a ficar só na poupança

REGRA DE OURO DO SUITABILITY:
O produto certo = produto adequado ao PERFIL,
ao OBJETIVO e ao HORIZONTE de tempo do cliente.`,
            explanation: 'Suitability é um dever legal do assessor financeiro (regulamentado pela CVM e BCB). Nas provas do BB, questões sobre suitability sempre testam se o candidato oferece o produto adequado ao perfil — não o mais rentável para a carteira, nem o de maior comissão. Vender produto inadequado viola o Código de Ética e pode gerar processo administrativo e indenização ao cliente.'
          }
        ],
        quiz: [
          {
            question: 'Qual etapa do ciclo de vendas consiste em identificar as necessidades reais do cliente por meio de perguntas abertas?',
            options: ['Prospecção', 'Abordagem', 'Levantamento de necessidades', 'Fechamento'],
            correct: 2,
            explanation: 'O levantamento de necessidades é a etapa em que o vendedor usa perguntas abertas ("Como...?", "O que...?", "Por quê...?") para compreender o que o cliente realmente precisa antes de apresentar qualquer produto.'
          },
          {
            question: 'Um cliente conservador de 60 anos quer aplicar R$ 80.000 para complementar a aposentadoria. Qual produto é mais adequado ao seu perfil?',
            options: ['Fundo de ações de alta volatilidade', 'CDB com liquidez diária garantido pelo FGC', 'Debêntures de empresa sem garantia', 'Opções na Bolsa de Valores'],
            correct: 1,
            explanation: 'O suitability exige adequação ao perfil. Um cliente conservador prioriza segurança e previsibilidade. O CDB com liquidez diária é garantido pelo FGC (até R$ 250.000), oferece rentabilidade acima da poupança e possui baixo risco — adequado ao perfil conservador.'
          },
          {
            question: 'A prática de condicionar a aprovação de um financiamento à contratação obrigatória de um seguro é chamada de:',
            options: ['Venda cruzada (cross-selling)', 'Venda casada', 'Up-selling', 'Suitability'],
            correct: 1,
            explanation: 'Venda casada é a prática de condicionar a venda de um produto à aquisição de outro, sendo expressamente proibida pelo Código de Defesa do Consumidor (art. 39, I) e pelo BCB. É diferente do cross-selling, que é a oferta de produtos complementares sem obrigatoriedade.'
          },
          {
            question: 'No método SPIN Selling, a etapa "I" (Implicação) tem o objetivo de:',
            options: ['Identificar o contexto atual do cliente', 'Mostrar as consequências negativas do problema não resolvido', 'Confirmar a necessidade de uma solução', 'Apresentar as características do produto'],
            correct: 1,
            explanation: 'A etapa de Implicação no SPIN Selling aprofunda o impacto do problema: mostra ao cliente o que acontece se ele não resolver a situação (juros acumulados, perda de oportunidade, insegurança financeira). Isso cria urgência emocional e racional para a solução.'
          },
          {
            question: 'Qual é a principal diferença entre a venda consultiva e a venda por pressão no contexto bancário?',
            options: [
              'A venda consultiva é mais rápida e eficiente que a venda por pressão',
              'A venda por pressão é permitida quando o gerente determina metas',
              'A venda consultiva foca na necessidade do cliente; a venda por pressão foca em metas sem adequação',
              'A venda consultiva só se aplica a clientes de alta renda'
            ],
            correct: 2,
            explanation: 'A venda consultiva coloca o interesse do cliente em primeiro lugar: o vendedor age como especialista que diagnostica e resolve problemas. A venda por pressão ignora o perfil e a necessidade do cliente para bater metas — prática inadequada que viola o Código de Ética do BB, o CDC e as normas do BCB.'
          }
        ]
      }
    },

    {
      id: 'ven-negociacao',
      title: 'Técnicas de Negociação',
      xp: 25,
      lesson: {
        title: 'Negociação — Estratégias e Princípios',
        theory: `<p>A <strong>negociação</strong> é o processo de comunicação em que duas ou mais partes buscam um acordo mutuamente satisfatório. No contexto bancário, é usada em concessão de crédito, renegociação de dívidas, definição de taxas e oferta de produtos.</p>

<h3>Estilos de Negociação</h3>
<ul>
  <li><strong>Competitivo (distributivo — "ganha-perde"):</strong> uma parte maximiza seus ganhos à custa da outra. Adequado para negociações únicas sem relacionamento futuro.</li>
  <li><strong>Colaborativo (integrativo — "ganha-ganha"):</strong> ambas as partes buscam ampliar o valor disponível antes de dividi-lo. Ideal para relacionamentos de longo prazo — o modelo do BB.</li>
  <li><strong>Acomodativo:</strong> uma parte cede em excesso para preservar o relacionamento. Risco: ser explorado.</li>
  <li><strong>Evitativo:</strong> foge do conflito, posterga a negociação. Raramente resolve o problema.</li>
</ul>

<h3>Conceitos Fundamentais</h3>
<ul>
  <li><strong>BATNA / MAANA:</strong> "Best Alternative To a Negotiated Agreement" — melhor alternativa disponível caso a negociação falhe. Quem tem melhor BATNA tem mais poder de negociação.</li>
  <li><strong>ZOPA (Zona de Possível Acordo):</strong> intervalo entre o mínimo aceitável de cada parte. Se existe sobreposição, o acordo é possível.</li>
  <li><strong>Âncora:</strong> primeira proposta apresentada — influencia psicologicamente toda a negociação subsequente. Quem ancora primeiro define o centro de gravidade.</li>
  <li><strong>Concessões:</strong> devem ser feitas gradualmente e em ritmo decrescente — concessões rápidas e iguais sinalizam que há mais espaço para ceder.</li>
</ul>

<h3>Negociação Harvard — 4 Princípios</h3>
<ol>
  <li><strong>Separar pessoas do problema:</strong> atacar o problema, não a pessoa. Manter relacionamento produtivo.</li>
  <li><strong>Focar em interesses, não em posições:</strong> descobrir o que cada parte realmente quer (interesse) além do que diz querer (posição).</li>
  <li><strong>Criar opções de ganho mútuo:</strong> gerar alternativas criativas antes de decidir.</li>
  <li><strong>Usar critérios objetivos:</strong> basear o acordo em dados, precedentes e padrões independentes — não em vontade ou pressão.</li>
</ol>

<h3>Renegociação de Dívidas no BB</h3>
<p>Situação comum na agência: clientes inadimplentes. O escriturário deve:</p>
<ul>
  <li>Ouvir o cliente sem julgamento (empatia)</li>
  <li>Entender a causa da inadimplência (desemprego, emergência, má gestão)</li>
  <li>Apresentar opções reais: parcelamento, carência, portabilidade</li>
  <li>Buscar o acordo que permita o cliente honrar o compromisso</li>
</ul>`,
        examples: [
          {
            title: 'BATNA e ZOPA — renegociação de dívida',
            code: `SITUAÇÃO: Cliente deve R$ 12.000 ao BB.
Está inadimplente há 3 meses.

BATNA DO BANCO:
- Acionar cobrança judicial (demorado, caro)
- Vender a dívida para empresa de cobrança por
  30-40% do valor (perda garantida)
→ BATNA fraco = banco tem interesse em negociar

BATNA DO CLIENTE:
- Continuar inadimplente (nome sujo, restrições)
- Declarar insolvência (processo judicial)
→ BATNA também fraco = cliente tem interesse em negociar

ZOPA (Zona de Possível Acordo):
Banco aceita receber: mínimo R$ 8.000 (66% do total)
Cliente consegue pagar: máximo R$ 10.000 parcelados

ZOPA = R$ 8.000 a R$ 10.000 → ACORDO POSSÍVEL!

PROPOSTA DE ACORDO:
"Senhor Paulo, entendo sua situação. O Banco pode
oferecer: entrada de R$ 2.000 + 8 parcelas de R$ 950.
Total: R$ 9.600 — desconto de 20% nos juros acumulados."

→ Ambas as partes ganham: banco recupera ativo,
  cliente resolve a situação e limpa o nome.`,
            explanation: 'Conhecer o BATNA de ambas as partes é o primeiro passo de qualquer negociação. Quanto pior o BATNA de uma parte, mais ela precisa do acordo — e menos poder de barganha tem. Em provas, questões sobre negociação frequentemente testam se o candidato entende que o objetivo é o "ganha-ganha" — não espremer o cliente nem ceder completamente.'
          },
          {
            title: 'Posição vs Interesse — negociação de taxa',
            code: `SITUAÇÃO: Cliente quer empréstimo pessoal.

POSIÇÃO DO CLIENTE (o que ele diz querer):
"Só aceito a taxa de 1,5% ao mês."

POSIÇÃO DO BANCO (política padrão):
"A taxa mínima para esse perfil é 2,1% ao mês."

APARENTEMENTE: sem acordo possível.

INVESTIGANDO OS INTERESSES (o que cada um realmente quer):
→ Cliente: quer parcela que caiba no orçamento.
  Diz taxa de 1,5%, mas o real interesse é
  "parcela de até R$ 450/mês"

→ Banco: quer minimizar inadimplência e ter
  retorno adequado ao risco do cliente.

OPÇÃO CRIATIVA (Harvard — criar opções):
"Com taxa de 2,1% em 36 meses: parcela = R$ 512.
 Com taxa de 2,1% em 48 meses: parcela = R$ 412."

→ Aumentando o prazo, a parcela fica em R$ 412 —
  abaixo do limite do cliente, sem mudar a taxa.

RESULTADO: Ganha-ganha.
Cliente consegue a parcela desejada.
Banco mantém a taxa de risco adequada.`,
            explanation: 'Separar posição de interesse é o princípio mais poderoso da Negociação Harvard. A "posição" é o que a pessoa diz querer; o "interesse" é a razão por trás disso. Quando você descobre o interesse real, surgem soluções criativas que a posição inicial impedia de ver. Em concursos, questões sobre negociação testam exatamente essa distinção.'
          },
          {
            title: 'Âncora e concessões — técnica de abertura',
            code: `PRINCÍPIO DA ÂNCORA:
A primeira proposta lançada influencia toda a negociação.

EXEMPLO — Negociação de taxa de cartão empresarial:

MAU EXEMPLO (sem âncora):
Gerente: "Qual taxa o senhor acha razoável?"
→ Cliente âncora em 0,8% ao mês
→ Gerente negocia a partir do patamar do cliente

BOM EXEMPLO (gerente ancora primeiro):
Gerente: "Para o perfil da empresa, a taxa padrão
é 3,2% ao mês. Posso verificar condições especiais
para clientes com histórico como o de vocês..."
→ Âncora em 3,2% → negociação parte desse ponto

CONCESSÕES — regra das concessões decrescentes:

Negociação de desconto em tarifa mensal:
1ª concessão: R$ 50 de desconto (grande — boa vontade)
2ª concessão: R$ 30 de desconto (menor)
3ª concessão: R$ 15 de desconto (menor ainda)
4ª concessão: R$ 5 de desconto (mínima)

→ Sinaliza que o limite está próximo.
→ Concessões iguais (R$50, R$50, R$50) indicam
  que há mais espaço — o cliente pede mais.`,
            explanation: 'A âncora define o "centro de gravidade" da negociação. Estudos mostram que a proposta inicial influencia o resultado final mesmo quando as partes sabem que é arbitrária. As concessões decrescentes são uma técnica clássica para sinalizar que o limite está se aproximando sem precisar dizer "não posso mais". Ambos os conceitos são cobrados em provas de comportamento organizacional e técnicas de negociação.'
          }
        ],
        quiz: [
          {
            question: 'O conceito de BATNA em negociação representa:',
            options: [
              'A melhor proposta inicial que deve ser apresentada',
              'A zona onde o acordo é possível para ambas as partes',
              'A melhor alternativa disponível caso o acordo não seja fechado',
              'A técnica de fazer concessões graduais'
            ],
            correct: 2,
            explanation: 'BATNA (Best Alternative To a Negotiated Agreement) é o que cada parte fará se a negociação falhar. Conhecer seu próprio BATNA evita aceitar acordos piores do que a alternativa disponível. Conhecer o BATNA do outro lado revela o poder de barganha de cada parte.'
          },
          {
            question: 'Na Negociação Harvard, "focar em interesses e não em posições" significa:',
            options: [
              'Ignorar o que o cliente diz e oferecer o produto padrão',
              'Descobrir a razão real por trás do que cada parte declara querer',
              'Manter a posição do banco sem ceder em hipótese alguma',
              'Usar critérios objetivos para definir o valor do produto'
            ],
            correct: 1,
            explanation: 'A posição é o que a parte declara querer ("quero taxa de 1,5%"). O interesse é a razão por trás disso ("quero uma parcela que caiba no meu orçamento"). Focar nos interesses abre espaço para soluções criativas que a posição rígida bloqueia — como ajustar o prazo em vez da taxa.'
          },
          {
            question: 'A ZOPA (Zona de Possível Acordo) em uma negociação existe quando:',
            options: [
              'Ambas as partes têm BATNAs fortes',
              'O valor mínimo aceitável de uma parte é menor ou igual ao máximo aceitável da outra',
              'Uma parte âncora primeiro com valor alto',
              'A negociação é do tipo competitivo (ganha-perde)'
            ],
            correct: 1,
            explanation: 'A ZOPA existe quando há sobreposição entre o mínimo que uma parte aceita e o máximo que a outra pode oferecer. Por exemplo: vendedor aceita no mínimo R$ 8.000 e comprador pode pagar até R$ 10.000 — a ZOPA é R$ 8.000 a R$ 10.000. Se não há sobreposição, não há acordo possível sem que uma parte mude seus limites.'
          },
          {
            question: 'No estilo de negociação colaborativo (integrativo), o objetivo principal é:',
            options: [
              'Maximizar o ganho próprio à custa da outra parte',
              'Evitar o conflito postergando a decisão',
              'Ceder em todos os pontos para preservar o relacionamento',
              'Ampliar o valor disponível e chegar a um acordo que beneficie ambas as partes'
            ],
            correct: 3,
            explanation: 'A negociação colaborativa (ganha-ganha) busca expandir o "bolo" antes de dividi-lo. Em vez de disputar um valor fixo, as partes criam opções que aumentam o valor total do acordo — resultado: ambas saem melhor do que em uma negociação puramente competitiva. É o modelo preconizado pelo BB para relacionamentos de longo prazo com clientes.'
          },
          {
            question: 'A técnica de "âncora" em negociação consiste em:',
            options: [
              'Aguardar a outra parte fazer a primeira proposta',
              'Apresentar a primeira proposta para influenciar o ponto de referência da negociação',
              'Fazer concessões iguais em todas as rodadas',
              'Separar as pessoas do problema negociado'
            ],
            correct: 1,
            explanation: 'A âncora é a primeira proposta lançada na negociação. Estudos de psicologia mostram que ela influencia desproporcionalmente o resultado final, pois define o "ponto de referência" mental. Quem âncora primeiro tende a ter vantagem — por isso negociadores experientes preparam sua âncora antes de abrir qualquer conversa.'
          }
        ]
      }
    },

    {
      id: 'ven-relacionamento',
      title: 'Relacionamento com o Cliente',
      xp: 20,
      lesson: {
        title: 'Gestão de Relacionamento e Fidelização de Clientes',
        theory: `<p>O <strong>relacionamento com o cliente</strong> é o ativo mais valioso de uma agência bancária. Clientes satisfeitos geram mais receita, custam menos para reter do que adquirir novos e tornam-se promotores da marca.</p>

<h3>CRM — Customer Relationship Management</h3>
<p>Sistema de gestão de relacionamento com clientes. No BB, o CRM centraliza:</p>
<ul>
  <li>Histórico de interações e produtos contratados</li>
  <li>Perfil financeiro e comportamental do cliente</li>
  <li>Oportunidades de oferta identificadas por IA</li>
  <li>Registro de reclamações e atendimentos</li>
</ul>
<p>O CRM permite <strong>personalização em escala</strong>: tratar cada cliente de forma única mesmo com carteiras de centenas de clientes.</p>

<h3>Jornada do Cliente (Customer Journey)</h3>
<ol>
  <li><strong>Atração:</strong> cliente conhece o BB (publicidade, indicação, agência próxima)</li>
  <li><strong>Aquisição:</strong> abertura de conta, primeiro produto</li>
  <li><strong>Ativação:</strong> cliente começa a usar ativamente os serviços</li>
  <li><strong>Retenção:</strong> ações para evitar o churn (cancelamento)</li>
  <li><strong>Expansão:</strong> cross-selling e up-selling — oferta de produtos adicionais adequados</li>
  <li><strong>Advocacia:</strong> cliente satisfeito indica o BB a amigos e familiares</li>
</ol>

<h3>Indicadores de Satisfação</h3>
<ul>
  <li><strong>NPS (Net Promoter Score):</strong> "De 0 a 10, quanto você indicaria o BB a um amigo?"
    <ul>
      <li>9-10: Promotores — clientes leais que indicam</li>
      <li>7-8: Neutros — satisfeitos mas vulneráveis à concorrência</li>
      <li>0-6: Detratores — insatisfeitos que podem prejudicar a reputação</li>
    </ul>
    NPS = % Promotores − % Detratores
  </li>
  <li><strong>CSAT (Customer Satisfaction Score):</strong> satisfação com uma interação específica</li>
  <li><strong>CES (Customer Effort Score):</strong> facilidade de resolver um problema — quanto menor o esforço, melhor</li>
</ul>

<h3>Cross-selling e Up-selling</h3>
<ul>
  <li><strong>Cross-selling (venda cruzada):</strong> oferecer produto complementar — cliente com conta corrente → oferecer cartão de crédito</li>
  <li><strong>Up-selling:</strong> oferecer versão superior do produto atual — cliente com conta básica → migrar para conta premium com mais benefícios</li>
  <li><strong>IMPORTANTE:</strong> ambas as práticas são éticas quando feitas com base no perfil e interesse do cliente — tornam-se inadequadas quando forçadas ou sem análise de suitability</li>
</ul>

<h3>Gestão de Reclamações</h3>
<p>Resolução eficiente de reclamações é oportunidade de fidelização:</p>
<ul>
  <li><strong>SAC (Serviço de Atendimento ao Cliente):</strong> 1º nível — resolve demandas básicas em até 5 dias úteis</li>
  <li><strong>Ouvidoria:</strong> 2º nível — demandas não resolvidas pelo SAC, prazo de 10 dias úteis</li>
  <li><strong>Banco Central:</strong> última instância para reclamações não resolvidas pelo banco</li>
</ul>`,
        examples: [
          {
            title: 'NPS na prática — como interpretar e agir',
            code: `PESQUISA NPS — Agência BB Centro

Respostas coletadas (100 clientes):
Nota 9-10 (Promotores): 55 clientes = 55%
Nota 7-8  (Neutros):    30 clientes = 30%
Nota 0-6  (Detratores): 15 clientes = 15%

NPS = % Promotores − % Detratores
NPS = 55% − 15% = 40

CLASSIFICAÇÃO:
< 0:  Crítico (mais detratores que promotores)
0-49: Razoável
50-74: Bom
≥ 75: Excelente

NPS 40 = Razoável — precisa melhorar.

AÇÃO CORRETA DA AGÊNCIA:
1. Contatar os 15 detratores para entender a causa
2. Identificar padrões nas reclamações (atendimento?
   tempo de espera? produto inadequado?)
3. Criar plano de melhoria focado nas causas raiz
4. Acompanhar evolução do NPS mês a mês

NPS não é apenas número — é termômetro de saúde
do relacionamento com a carteira de clientes.`,
            explanation: 'O NPS foi criado por Fred Reichheld (Bain & Company) e é o indicador de lealdade de clientes mais utilizado no mundo. No BB, o NPS é monitorado por agência, gerente e produto. Um NPS baixo indica risco de churn (perda de clientes) e impacto na receita futura. A ação sobre detratores é urgente — um cliente insatisfeito conta para em média 10 pessoas sobre a experiência negativa.'
          },
          {
            title: 'Cross-selling ético vs inadequado',
            code: `CROSS-SELLING ÉTICO:

Cliente: João, 30 anos, recém contratou financiamento
de veículo R$ 45.000, tem família com 2 filhos.

ANÁLISE DO PERFIL (CRM):
- Tem financiamento de alto valor
- Tem família dependente da sua renda
- Não possui seguro de vida ou prestamista

OFERTA ADEQUADA:
"João, parabéns pelo novo carro! Percebi que você
 não tem seguro prestamista no financiamento.
 Por R$ 38/mês, garante a quitação do financiamento
 em caso de invalidez ou falecimento.
 Quer que eu mostre como funciona?"

✅ Motivo: produto resolve uma necessidade real,
   adequado ao perfil, sem obrigatoriedade.

---

CROSS-SELLING INADEQUADO:

"João, para liberar seu financiamento, precisa
 contratar o seguro de vida e o cartão premium."

❌ Motivo: condicionar o produto (venda casada),
   proibida pelo CDC art. 39, I.
   Pode gerar multa ao banco e ao funcionário.`,
            explanation: 'A linha entre cross-selling ético e venda casada é a obrigatoriedade. Oferecer é sempre permitido; condicionar é sempre proibido. O BB incentiva o cross-selling como estratégia de valor — um cliente com múltiplos produtos tem menor propensão ao churn e maior lifetime value. Em provas, questões sobre esse tema testam se o candidato sabe distinguir a prática correta da inadequada.'
          },
          {
            title: 'Gestão de reclamação — transformando detrator em promotor',
            code: `SITUAÇÃO: Cliente liga furioso sobre cobrança indevida.

ETAPA 1 — ACOLHER (não interromper, não defender):
"Entendo sua frustração, senhor Marcos.
 Pode me contar o que aconteceu?"

ETAPA 2 — VALIDAR (reconhecer o problema):
"Tem razão — uma cobrança indevida é um problema
 sério. Agradeço por nos comunicar."

ETAPA 3 — AGIR (resolver de imediato se possível):
"Vou verificar agora mesmo no sistema...
 Confirmei a cobrança indevida de R$ 45,00.
 Estou estornando agora — crédito em 1 hora."

ETAPA 4 — COMPENSAR (recuperar a confiança):
"Além do estorno, vou isentar a sua tarifa
 de manutenção deste mês como pedido de desculpas."

ETAPA 5 — PREVENIR (evitar recorrência):
"Registrei o ocorrido para análise do sistema.
 Deixo meu contato direto para qualquer
 necessidade futura."

RESULTADO: Cliente que chegou furioso (nota 2 no NPS)
tem grande chance de virar promotor (nota 9-10)
quando a resolução é rápida, empática e eficiente.

Pesquisa: 70% dos clientes com reclamação resolvida
bem voltam a comprar e indicam mais do que
clientes que nunca reclamaram.`,
            explanation: 'A "recuperação de serviço" é um dos momentos mais poderosos para fidelização. Um cliente que reclama e tem o problema resolvido rapidamente tende a ser mais leal do que um cliente que nunca teve problemas. Isso ocorre porque a resolução eficiente demonstra comprometimento e competência — valores que constroem confiança duradoura. Nas provas, o modelo correto sempre inclui empatia → ação → compensação → prevenção.'
          }
        ],
        quiz: [
          {
            question: 'O NPS (Net Promoter Score) é calculado como:',
            options: [
              'Média de todas as notas dadas pelos clientes',
              'Porcentagem de clientes satisfeitos menos insatisfeitos',
              'Porcentagem de Promotores (notas 9-10) menos porcentagem de Detratores (notas 0-6)',
              'Total de clientes que recomendaram o banco dividido pelo total de clientes'
            ],
            correct: 2,
            explanation: 'NPS = % Promotores (notas 9-10) − % Detratores (notas 0-6). Os neutros (notas 7-8) não entram no cálculo. O resultado varia de -100 a +100. Valores acima de 50 são considerados bons; acima de 75, excelentes. É o indicador de lealdade e recomendação mais utilizado no setor bancário.'
          },
          {
            question: 'Qual prática representa cross-selling ÉTICO em uma agência bancária?',
            options: [
              'Condicionar a aprovação do crédito à contratação de um seguro',
              'Oferecer seguro de vida a um cliente com financiamento imobiliário e dependentes, sem torná-lo obrigatório',
              'Migrar o cliente para uma conta com maior tarifa sem informar sobre as cobranças adicionais',
              'Oferecer o mesmo produto a todos os clientes independentemente do perfil'
            ],
            correct: 1,
            explanation: 'Cross-selling ético identifica uma necessidade real do cliente (seguro para financiamento com dependentes), oferece o produto adequado ao perfil e deixa a decisão a cargo do cliente sem qualquer obrigatoriedade. A chave é: identificar necessidade → oferecer solução → respeitar a decisão.'
          },
          {
            question: 'No contexto da jornada do cliente, o churn representa:',
            options: [
              'A primeira compra realizada pelo cliente no banco',
              'O indicador de satisfação medido após cada atendimento',
              'O cancelamento ou abandono dos produtos e serviços pelo cliente',
              'A recomendação do banco pelo cliente a terceiros'
            ],
            correct: 2,
            explanation: 'Churn (do inglês "taxa de rotatividade") é a perda de clientes — quando eles cancelam produtos, encerram contas ou migram para a concorrência. Reduzir o churn é mais barato do que adquirir novos clientes (estima-se que conquistar um novo cliente custa 5 a 7 vezes mais do que reter um atual), por isso a gestão de relacionamento é estratégica.'
          },
          {
            question: 'Qual é a ordem correta dos canais de resolução de reclamações bancárias no Brasil?',
            options: [
              'Banco Central → Ouvidoria → SAC',
              'Ouvidoria → SAC → Banco Central',
              'SAC → Ouvidoria → Banco Central',
              'SAC → Banco Central → Ouvidoria'
            ],
            correct: 2,
            explanation: 'A ordem hierárquica é: 1º SAC (Serviço de Atendimento ao Cliente) — resolve em até 5 dias úteis; 2º Ouvidoria — para demandas não resolvidas pelo SAC, prazo de 10 dias úteis; 3º Banco Central — última instância, quando o banco não resolve internamente. Essa hierarquia está prevista na Resolução BCB 4.860/2020.'
          },
          {
            question: 'O CRM (Customer Relationship Management) em uma agência bancária tem como principal função:',
            options: [
              'Automatizar a aprovação de crédito sem análise humana',
              'Centralizar informações dos clientes para personalizar o atendimento e identificar oportunidades',
              'Substituir o atendimento humano por chatbots nas agências',
              'Calcular automaticamente o NPS de cada cliente'
            ],
            correct: 1,
            explanation: 'O CRM centraliza o histórico de interações, produtos contratados, perfil financeiro e comportamental do cliente. Isso permite ao gerente ou escriturário personalizar o atendimento ("Bom dia, João — vi que seu CDB vence semana que vem, quer conversar sobre as opções?"), identificar oportunidades de cross-selling e agir proativamente antes de problemas de churn.'
          }
        ]
      }
    }
  ]
};
