window.PORTUGUES_DATA = {
  id: 'portugues',
  name: 'Português',
  icon: '📝',
  color: '#4f46e5',
  gradient: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
  topics: [
    {
      id: 'pt-interpretacao',
      title: 'Interpretação de Texto',
      xp: 20,
      lesson: {
        title: 'Interpretação de Texto em Concursos',
        theory: `<p>A <strong>interpretação de texto</strong> é a habilidade mais cobrada em provas de concurso. O candidato deve extrair informações <strong>explícitas</strong> (ditas claramente) e <strong>implícitas</strong> (que se deduzem) do texto.</p>

<h3>Tipos de questão mais frequentes</h3>
<ul>
  <li><strong>Interpretação literal:</strong> a resposta está no texto, palavra por palavra. Basta localizar o trecho correto.</li>
  <li><strong>Inferência:</strong> a resposta não está explícita — você precisa deduzir logicamente a partir do que o texto diz.</li>
  <li><strong>Ideia central / tema:</strong> sobre o que o texto fala? Qual a tese principal do autor?</li>
  <li><strong>Vocabulário contextual:</strong> o que uma palavra ou expressão significa <em>naquele contexto específico</em>?</li>
  <li><strong>Gênero e estrutura textual:</strong> o texto é argumentativo, narrativo, descritivo, injuntivo?</li>
</ul>

<h3>Estratégia comprovada para concursos</h3>
<ol>
  <li><strong>Leia o enunciado da questão primeiro</strong> — assim você sabe o que procurar no texto.</li>
  <li>Leia o texto completo sem pressa, sublinhe <strong>palavras-chave</strong> e conectivos importantes.</li>
  <li>Identifique o <strong>gênero textual</strong>: artigo de opinião, notícia, crônica, texto científico.</li>
  <li>Ao responder, <strong>volte ao texto</strong> — nunca responda com base no seu conhecimento de mundo, mas no que o texto diz.</li>
  <li>Cuidado com <strong>distratores</strong>: opções que parecem corretas mas contradizem sutilmente o texto.</li>
</ol>

<h3>Gêneros textuais mais cobrados no BB</h3>
<p>Textos sobre <strong>economia, mercado financeiro, tecnologia bancária e cidadania</strong> são os mais frequentes. Familiarize-se com o vocabulário desses temas.</p>`,
        examples: [
          {
            title: 'Questão de inferência — texto sobre economia',
            code: `Texto (5 linhas):
"A digitalização dos serviços bancários reduziu significativamente
o número de agências físicas no Brasil na última década. Contudo,
pesquisas apontam que parcelas da população — sobretudo idosos e
moradores de regiões remotas — ainda dependem do atendimento
presencial para realizar operações financeiras básicas."

Questão típica de concurso:
"Com base no texto, infere-se que a digitalização bancária:
A) resolveu todos os problemas de acesso financeiro no Brasil.
B) não trouxe benefícios para o setor bancário.
C) gerou um desafio de inclusão financeira para certos grupos.
D) foi rejeitada pela maioria da população brasileira."`,
            explanation: 'A resposta correta é C. O texto NÃO diz isso explicitamente — ele diz que certas pessoas "ainda dependem" do atendimento presencial. A INFERÊNCIA é que essa dependência cria um desafio de inclusão. Opção A contradiz o texto (o problema persiste). Opções B e D são absurdas diante do que o texto afirma. Em questões de inferência, a resposta deve ser logicamente deduzida do texto — nem óbvia demais (literal) nem inventada (extrapolação).'
          },
          {
            title: 'Identificar ideia central — texto sobre tecnologia bancária',
            code: `Texto:
"O Banco do Brasil investiu R$ 2,7 bilhões em tecnologia em 2023,
ampliando sua plataforma digital e capacidade de processamento de
dados. A instituição lançou novos recursos no aplicativo, integrou
inteligência artificial ao atendimento e expandiu o uso de biometria.
O resultado foi um crescimento de 34% nas transações digitais e
redução de 12% nos custos operacionais."

Tarefa: Identificar TEMA, TESE e ARGUMENTO principal.

TEMA: Investimento em tecnologia pelo Banco do Brasil.
TESE (ideia central): O investimento em tecnologia trouxe
resultados positivos para o BB.
ARGUMENTOS (dados que sustentam a tese):
- 34% de crescimento em transações digitais
- 12% de redução em custos operacionais
- Expansão de IA, biometria e novos recursos digitais`,
            explanation: 'Para identificar a ideia central, pergunte: "Se eu pudesse resumir o texto em uma frase, qual seria?" A tese é sempre o ponto que o autor quer provar ou a informação mais importante. Argumentos e dados são os "apoios" da tese. Em questões como "O texto tem por objetivo...", a resposta sempre corresponde à tese, não aos argumentos isolados.'
          },
          {
            title: 'Vocabulário em contexto — descobrindo significados',
            code: `Texto:
"Os bancos públicos desempenham um papel CRUCIAL na capilarização
do crédito em municípios onde a iniciativa privada não tem
interesse comercial. Essa CAPILARIZAÇÃO permite que pequenos
produtores rurais e microempreendedores acessem financiamentos."

Questão: No texto, a palavra "capilarização" significa:
A) redução do crédito disponível.
B) distribuição ampla e descentralizada de serviços.
C) aumento das taxas de juros.
D) concentração de agências em grandes cidades.

Estratégia para descobrir pelo contexto:
1. Leia a frase ANTES e DEPOIS da palavra.
2. "municípios onde a iniciativa privada não tem interesse" → lugares distantes/pequenos
3. "permite que pequenos produtores acessem financiamentos" → a palavra indica ACESSO AMPLO
4. "capilar" vem de "capilar" = como capilares do corpo, que chegam a todo lugar
→ Logo: distribuição ampla e descentralizada.`,
            explanation: 'A resposta é B. O contexto é a chave: mesmo sem conhecer a palavra, o texto fala em atender municípios sem interesse comercial da iniciativa privada, e o resultado é que pequenos produtores conseguem acesso. Isso indica EXPANSÃO e DISTRIBUIÇÃO, não redução ou concentração. Em concursos, sempre use o contexto — o significado dicionarizado pode não ser o que a questão pede.'
          }
        ]
      },
      quiz: [
        {
          q: 'Ao responder uma questão de interpretação de texto em concursos, qual é a estratégia mais eficaz?',
          options: [
            'Responder com base no conhecimento geral sobre o tema, sem precisar reler o texto',
            'Ler o enunciado da questão primeiro para saber o que procurar, depois ler o texto com atenção',
            'Escolher a opção que parece mais correta gramaticalmente',
            'Sempre escolher a opção mais longa, pois tende a ser mais completa'
          ],
          answer: 1,
          explanation: 'A estratégia correta é ler o enunciado antes, assim você sabe EXATAMENTE o que buscar no texto — economizando tempo e aumentando a precisão. Responder sem voltar ao texto é o erro mais comum: nossas "memórias" do texto tendem a ser imprecisas e a confundir com conhecimento prévio.'
        },
        {
          q: 'Qual a diferença entre uma questão de interpretação LITERAL e uma questão de INFERÊNCIA?',
          options: [
            'Na literal, a resposta não está no texto; na inferência, está explicitamente escrita',
            'Na literal, a resposta está explícita no texto; na inferência, deve ser deduzida logicamente',
            'Inferência e interpretação literal são sinônimos em provas de concurso',
            'Questões de inferência são sempre mais difíceis que questões literais'
          ],
          answer: 1,
          explanation: 'Interpretação literal: a resposta está no texto, quase palavra por palavra — você apenas localiza o trecho. Inferência: o texto não diz explicitamente, mas fornece dados suficientes para você DEDUZIR logicamente a conclusão. Inferências válidas nunca contradizem o texto nem vão além do que ele permite concluir.'
        },
        {
          q: 'Um texto que apresenta um problema, discute causas e propõe soluções pertence ao gênero:',
          options: [
            'Narrativo, pois conta uma história com início, meio e fim',
            'Descritivo, pois descreve características de algo',
            'Argumentativo/dissertativo, pois defende uma tese com argumentos',
            'Injuntivo, pois dá instruções sobre como fazer algo'
          ],
          answer: 2,
          explanation: 'O gênero argumentativo/dissertativo é o mais cobrado em concursos. Características: apresenta uma tese (posição do autor), desenvolve argumentos para sustentá-la e conclui. Identificar o gênero ajuda a entender a INTENÇÃO do autor e onde encontrar a ideia principal.'
        },
        {
          q: 'Em uma questão sobre vocabulário em contexto, qual é o procedimento correto?',
          options: [
            'Usar sempre o primeiro significado que o dicionário apresenta para a palavra',
            'Escolher o significado mais comum da palavra no uso cotidiano',
            'Analisar o sentido da palavra em relação às frases antes e depois dela no texto',
            'Substituir a palavra por seu sinônimo mais conhecido'
          ],
          answer: 2,
          explanation: 'O contexto é soberano em questões de vocabulário. Uma mesma palavra pode ter significados diferentes em contextos distintos (polissemia). A técnica correta é: leia o parágrafo inteiro, identifique o tema, substitua a palavra por cada opção de resposta e veja qual mantém o sentido coerente. O significado dicionarizado pode ser enganoso.'
        },
        {
          q: 'Qual afirmação sobre "distratores" em questões de interpretação de texto está correta?',
          options: [
            'Distratores são as opções corretas que o examinador disfarça para confundir',
            'São opções incorretas elaboradas para parecer verdadeiras, frequentemente usando informações do texto fora de contexto ou exagerando afirmações',
            'Distratores são palavras difíceis inseridas no texto para dificultar a leitura',
            'São questões sobre vocabulário que distraem o candidato das questões principais'
          ],
          answer: 1,
          explanation: 'Distratores são as alternativas ERRADAS elaboradas para atrair respostas equivocadas. As técnicas mais comuns: usar informação real do texto, mas aplicada de forma errada; generalizar indevidamente ("sempre", "nunca", "todos"); negar o que o texto afirma sutilmente; ou misturar dois trechos do texto de forma contraditória. Reconhecer esses padrões é fundamental.'
        }
      ]
    },
    {
      id: 'pt-gramatica',
      title: 'Gramática Essencial',
      xp: 25,
      lesson: {
        title: 'Gramática Essencial para o Concurso BB',
        theory: `<p>Os pontos gramaticais mais cobrados no BB concentram-se em áreas onde há <strong>dúvidas frequentes</strong> e onde erros comprometem a comunicação formal. Domine estes tópicos prioritários:</p>

<h3>1. Concordância Verbal</h3>
<ul>
  <li><strong>Sujeito composto antes do verbo:</strong> verbo no plural — "O gerente e o caixa CHEGARAM."</li>
  <li><strong>Sujeito composto pós-verbo:</strong> pode concordar com o mais próximo — "Chegou o gerente e o caixa."</li>
  <li><strong>Sujeito coletivo:</strong> verbo no singular — "A equipe APROVOU o projeto."</li>
  <li><strong>"A maioria / a maior parte / grande número":</strong> verbo no singular OU plural (aceita os dois se vier complemento no plural) — "A maioria dos funcionários APROVOU" ou "APROVARAM".</li>
  <li><strong>Verbos impessoais (haver, fazer):</strong> sempre no singular — "Havia muitos clientes." / "Faz dois anos."</li>
</ul>

<h3>2. Regência Verbal — Os mais cobrados</h3>
<ul>
  <li><strong>Assistir:</strong> "assistir AO filme" (assistir a = ver/presenciar) / "assistir o doente" (assistir = ajudar, sem preposição)</li>
  <li><strong>Visar:</strong> "visar AO cargo" (visar a = ter em mira) / "visar o cheque" (visar = carimbar, sem preposição)</li>
  <li><strong>Aspirar:</strong> "aspirar AO cargo" (aspirar a = almejar) / "aspirar o pó" (aspirar = inalar, sem preposição)</li>
  <li><strong>Proceder:</strong> "proceder À análise" (fazer) / "proceder DE família humilde" (originar-se)</li>
  <li><strong>Obedecer / desobedecer:</strong> sempre com preposição A — "obedecer À lei"</li>
</ul>

<h3>3. Crase</h3>
<p>Crase = <strong>a + a</strong> (artigo feminino + preposição). Use quando: preposição A + substantivo feminino que aceita artigo "a".</p>
<ul>
  <li><strong>Use crase:</strong> "Fui À agência" (a + a agência) / "Às dez horas" / "À medida que"</li>
  <li><strong>NÃO use crase:</strong> antes de masculinos, verbos, pronomes pessoais, "uma", antes de nomes de cidades sem artigo</li>
  <li><strong>Crase facultativa:</strong> antes de nomes próprios femininos — "Enviei à Maria" ou "Enviei a Maria"</li>
</ul>

<h3>4. Vírgula — Regras essenciais</h3>
<ul>
  <li><strong>Adjunto adverbial deslocado:</strong> "Em 2024, o BB lançou..." — vírgula obrigatória se o adjunto vier antes do verbo</li>
  <li><strong>Orações coordenadas adversativas e conclusivas:</strong> sempre com vírgula antes — "Estudou muito, mas não passou." / "Estudou, portanto passou."</li>
  <li><strong>NÃO separe</strong> sujeito do verbo nem verbo do objeto com vírgula.</li>
</ul>`,
        examples: [
          {
            title: 'Concordância verbal — casos especiais',
            code: `SUJEITO COMPOSTO:
✓ "O diretor e a gerente ASSINARAM o contrato." (sujeito antes = plural)
✓ "ASSINOU o diretor e a gerente." (sujeito depois = concorda com o mais próximo)

SUJEITO COLETIVO:
✓ "A equipe DECIDIU (singular) aumentar as metas."
✓ "A maioria dos funcionários APROVOU / APROVARAM a proposta."
  (os dois estão corretos quando há complemento no plural)

VERBOS IMPESSOAIS:
✓ "HAVIA (singular) muitos clientes na fila."
✗ "HAVIAM muitos clientes na fila." ← ERRADO
✓ "FAZ (singular) dez anos que trabalho no banco."
✗ "FAZEM dez anos..." ← ERRADO

EXPRESSÕES PARTITIVAS:
"Parte dos documentos FOI / FORAM analisada(s)."
(os dois aceitos em concordância atrativa)`,
            explanation: 'O erro mais cobrado em concursos é usar "haviam" no lugar de "havia" e "fazem" no lugar de "faz" — verbos impessoais são invariáveis no singular. O segundo erro mais comum é a concordância com sujeito pós-verbo: muitos candidatos colocam sempre no plural, mas quando o sujeito vem depois, o verbo pode concordar com o núcleo mais próximo.'
          },
          {
            title: 'Regência verbal — assistir, visar, aspirar',
            code: `ASSISTIR:
✓ "Assisti AO jogo ontem." (= assisti a = presenciei)
✓ "A enfermeira assiste o paciente." (= cuida, sem preposição)
✗ "Assisti o jogo ontem." ← ERRADO para o sentido de "ver"

VISAR:
✓ "O candidato visa AO cargo de escriturário." (= tem como objetivo)
✓ "O caixa visou o cheque." (= carimbou, sem preposição)
✗ "O candidato visa o cargo." ← ERRADO para o sentido de "objetivar"

ASPIRAR:
✓ "Ela aspira AO título de sócia." (= almeja)
✓ "O aspirador aspira a sujeira." (= suga, sem preposição)

PROCEDER:
✓ "Procedemos À análise dos dados." (= realizamos)
✓ "Ele procede DE família tradicional." (= é originário de)`,
            explanation: 'A chave para regência é entender que o mesmo verbo pode pedir preposição diferente (ou nenhuma) dependendo do SENTIDO. Em provas do BB, a questão frequentemente apresenta o verbo com dois sentidos distintos e pede qual a regência correta para cada um. Memorize os pares: assistir A (ver) / assistir sem prep. (cuidar); visar A (objetivar) / visar sem prep. (carimbar).'
          },
          {
            title: 'Crase — regras e casos especiais',
            code: `USE CRASE:
✓ "Fui À agência do BB." (a + a agência)
✓ "Chegamos ÀS nove horas." (a + as horas)
✓ "Refiro-me À proposta anterior." (a + a proposta)
✓ "À medida que o tempo passa..." (locução prepositiva)

NÃO USE CRASE:
✗ "Fui a Brasília." (nomes de cidades sem artigo)
✓ "Fui à Bahia." (a Bahia = usa artigo, então tem crase)
✗ "Vou a pé." (palavra masculina)
✗ "Começou a estudar." (antes de verbo)
✗ "Ele se refere a ela." (pronome pessoal)
✗ "Comprei uma passagem a R$ 500." (numeral sem artigo)

DICA DO EXAMINADOR:
Substitua o feminino por masculino equivalente:
"Fui À agência" → "Fui AO banco" → se der "ao", dá crase no feminino.
"Fui a Brasília" → "Fui a São Paulo" → se der "a" (sem artigo), não tem crase.`,
            explanation: 'O truque do masculino é o mais confiável: se a frase no masculino usa "ao" (com artigo), a versão feminina usa crase. Se usa só "a" (sem artigo), não usa crase. Atenção especial a nomes de cidades: a maioria não usa artigo ("fui a São Paulo"), mas algumas usam ("fui à Bahia", "fui ao Rio de Janeiro").'
          }
        ]
      },
      quiz: [
        {
          q: 'Assinale a alternativa com concordância verbal CORRETA:',
          options: [
            'Haviam muitos erros no relatório enviado pela agência.',
            'Fazem cinco anos que trabalho nesta instituição financeira.',
            'A maioria dos clientes preferiu o atendimento digital.',
            'Os documentos e o contrato foi assinado pelo gerente.'
          ],
          answer: 2,
          explanation: '"A maioria dos clientes preferiu" está correto — sujeito coletivo (maioria) admite verbo no singular. "Haviam" está errado: "haver" no sentido de existir é impessoal → "Havia". "Fazem cinco anos" está errado: "fazer" indicando tempo é impessoal → "Faz". "Os documentos e o contrato foi" está errado: sujeito composto antes do verbo → "foram".'
        },
        {
          q: 'Em qual frase o verbo "assistir" está empregado com a regência CORRETA?',
          options: [
            'O médico assistiu ao paciente durante toda a noite.',
            'Os funcionários assistiram a reunião sem fazer perguntas.',
            'Todos assistiram o jogo da final pelo aplicativo do banco.',
            'Ela assiste ao doente com muito cuidado e atenção.'
          ],
          answer: 3,
          explanation: 'A alternativa D está correta: "assistir o doente" no sentido de cuidar/ajudar NÃO usa preposição. As alternativas A e C usam "assistir ao/o" para o sentido de "ver/presenciar" — nesse sentido, a regência correta é "assistir A" (com preposição). A alternativa B erra ao usar "assistiram a reunião" sem a contração "à" — o correto seria "assistiram À reunião".'
        },
        {
          q: 'Identifique a frase em que o uso de CRASE está correto:',
          options: [
            'O diretor foi à São Paulo tratar de negócios urgentes.',
            'O relatório foi enviado à ela para revisão.',
            'Refiro-me à proposta apresentada na reunião de ontem.',
            'O banco começa à funcionar às oito horas da manhã.'
          ],
          answer: 2,
          explanation: '"Refiro-me à proposta" está correto: preposição A + artigo A (a proposta) = crase. Erro A: "São Paulo" não usa artigo normalmente, logo sem crase ("foi a São Paulo"). Erro B: não se usa crase antes de pronomes pessoais ("enviado a ela"). Erro D: não se usa crase antes de verbo ("começa a funcionar") — crase exige substantivo ou equivalente feminino.'
        },
        {
          q: 'Quanto ao uso da VÍRGULA, qual frase está CORRETA?',
          options: [
            'O gerente, assinou o contrato com o cliente novo.',
            'Em dezembro de 2024, o banco registrou recorde de transações.',
            'O banco investiu em tecnologia, e expandiu suas operações digitais.',
            'Todos os funcionários, receberam o treinamento obrigatório.'
          ],
          answer: 1,
          explanation: '"Em dezembro de 2024, o banco registrou..." está correto: adjunto adverbial de tempo deslocado para o início da frase exige vírgula. Erros: A e D separam sujeito do verbo com vírgula, o que é proibido. C insere vírgula antes de "e" ligando dois verbos do mesmo sujeito com sentido sequencial — vírgula antes de "e" só é obrigatória quando as orações têm sujeitos diferentes ou para evitar ambiguidade.'
        },
        {
          q: 'Qual a regência CORRETA do verbo "visar" na frase "O novo concursado _____ ao cargo de escriturário"?',
          options: [
            'visou; sem preposição, pois "cargo" é objeto direto',
            'visou a; pois "visar" no sentido de objetivar rege preposição A',
            'visou em; pois indica direção ou objetivo',
            'visou para; pois indica a finalidade da ação'
          ],
          answer: 1,
          explanation: '"Visar" no sentido de "ter como objetivo/meta" é verbo transitivo INDIRETO e rege a preposição A: "visar AO cargo", "visar À aprovação". Já "visar" no sentido de "carimbar/autenticar" é transitivo DIRETO, sem preposição: "visar o cheque", "visar o documento". Essa distinção de sentido + regência é clássica em provas do BB.'
        }
      ]
    },
    {
      id: 'pt-coesao',
      title: 'Coesão e Coerência',
      xp: 20,
      lesson: {
        title: 'Coesão Textual e Coerência',
        theory: `<p><strong>Coesão</strong> é a propriedade que dá unidade ao texto, ligando as partes por meio de recursos linguísticos. <strong>Coerência</strong> é a sequência lógica de ideias — o texto faz sentido como um todo.</p>

<h3>Conectivos e suas funções (muito cobrado!)</h3>
<table>
<tr><th>Relação</th><th>Conectivos principais</th></tr>
<tr><td><strong>Adição</strong></td><td>e, além disso, ademais, também, ainda, bem como, não só... mas também</td></tr>
<tr><td><strong>Adversidade</strong></td><td>mas, porém, contudo, todavia, entretanto, no entanto, embora, apesar de</td></tr>
<tr><td><strong>Conclusão</strong></td><td>portanto, logo, assim, por conseguinte, consequentemente, então, por isso</td></tr>
<tr><td><strong>Explicação/Causa</strong></td><td>pois, porque, já que, uma vez que, visto que, porquanto, como</td></tr>
<tr><td><strong>Concessão</strong></td><td>embora, ainda que, mesmo que, apesar de que, conquanto</td></tr>
<tr><td><strong>Condição</strong></td><td>se, caso, desde que, contanto que, a menos que</td></tr>
<tr><td><strong>Finalidade</strong></td><td>para que, a fim de que, com o objetivo de, com vistas a</td></tr>
<tr><td><strong>Comparação</strong></td><td>assim como, da mesma forma que, tal como, mais... do que</td></tr>
</table>

<h3>Coesão Referencial</h3>
<ul>
  <li><strong>Referência pronominal:</strong> uso de pronomes para retomar um termo — "O banco abriu nova agência. <em>Ela</em> ficará em Brasília." (Ela = agência)</li>
  <li><strong>Referência lexical:</strong> uso de sinônimos ou hipônimos — "O escriturário chegou cedo. O <em>funcionário</em> atendeu os primeiros clientes."</li>
  <li><strong>Elipse:</strong> omissão de termo já mencionado — "O banco investiu em IA e [o banco] lançou novos produtos."</li>
</ul>

<h3>Coerência textual</h3>
<p>Um texto coerente possui: <strong>unidade temática</strong> (fala sobre um assunto central), <strong>progressão</strong> (as ideias avançam, não ficam repetindo o mesmo) e <strong>não-contradição</strong> (as informações não se contradizem). Identifique incoerências quando o texto: muda de assunto sem justificativa, contradiz uma informação anterior ou apresenta sequência temporal ilógica.</p>`,
        examples: [
          {
            title: 'Substituição de conectivos — diferenças sutis',
            code: `ADVERSATIVOS — são INTERCAMBIÁVEIS entre si:
"Estudou muito, MAS não passou."
"Estudou muito, PORÉM não passou."
"Estudou muito, CONTUDO não passou."
"Estudou muito, TODAVIA não passou."
"Estudou muito, ENTRETANTO não passou."
"Estudou muito, NO ENTANTO não passou."
→ Todos expressam oposição/contraste. São substituíveis.

ATENÇÃO — NÃO são intercambiáveis com outros:
"Estudou muito, PORTANTO passou." (conclusão — diferente!)
"Estudou muito PORQUE queria passar." (causa — diferente!)

QUESTÃO TÍPICA:
"Assinale o conectivo que pode substituir 'porém' sem
alterar o sentido da frase:"
→ Resposta: contudo / todavia / entretanto / no entanto`,
            explanation: 'Em concursos, questões de conectivos testam se o candidato conhece a FAMÍLIA de cada conjunção. Os adversativos (mas, porém, contudo, todavia, entretanto, no entanto) são todos intercambiáveis entre si. Já "embora/apesar de" são concessivos e não substituem adversativos diretamente — "Embora tenha estudado muito, não passou" tem nuance diferente de "Estudou muito, mas não passou".'
          },
          {
            title: 'Referência pronominal — identificando antecedentes',
            code: `Texto:
"O Banco Central divulgou novos dados sobre a inflação.
A instituição afirmou que o IPCA ficou dentro da meta.
Segundo ELA, os preços dos alimentos foram os que
mais contribuíram para o resultado."

Identifique os antecedentes:
- "A instituição" → retoma "O Banco Central" (referência lexical)
- "Ela" → retoma "A instituição" / "O Banco Central" (referência pronominal)

CUIDADO com pronomes relativos:
"O documento QUE o gerente assinou ontem é importante."
→ QUE = o documento (sujeito de "assinou")

"O gerente para QUEM enviei o e-mail respondeu."
→ QUEM = o gerente (objeto indireto de "enviei")

QUESTÃO TÍPICA: "O pronome 'ela' na linha X refere-se a:"
→ Sempre volte ao texto e procure o substantivo feminino
   mais próximo que faça sentido na frase.`,
            explanation: 'Para identificar o antecedente de um pronome, use dois critérios: concordância de gênero e número, e coerência semântica. Se "ela" aparece, o antecedente é feminino singular. Se há dois candidatos femininos, escolha o que faz mais sentido logicamente. Em provas, armadilhas comuns: pronome que parece retomar o termo mais próximo, mas logicamente refere-se ao mais distante.'
          },
          {
            title: 'Detectando incoerência textual',
            code: `Texto com incoerência:
"O banco investiu fortemente em canais digitais para
reduzir custos operacionais e ampliar o atendimento.
Por isso, decidiu contratar 2.000 novos funcionários
para suas agências físicas em todo o país. Além disso,
o objetivo principal era diminuir as despesas com
pessoal nas agências."

ONDE ESTÁ A INCOERÊNCIA?
1. O texto começa falando em "reduzir custos" por meio de digitalização.
2. A segunda frase contradiz: contratar 2.000 funcionários AUMENTA custos.
3. A terceira frase volta a falar em "diminuir despesas com pessoal" —
   mas contratar pessoal faz o oposto.

QUEBRA LÓGICA:
A sequência "portanto/por isso" promete uma consequência da
digitalização, mas o que vem a seguir contradiz a premissa.
Textos coerentes mantêm a linha argumentativa sem contradições.`,
            explanation: 'Incoerência textual ocorre quando uma parte do texto contradiz outra. Em questões de concurso, fique atento especialmente quando: (1) um conectivo de conclusão ("portanto", "logo") introduz algo que não é consequência lógica da premissa; (2) dados numéricos se contradizem; (3) a sequência temporal está invertida. A coerência exige que cada parte do texto seja compatível com as demais.'
          }
        ]
      },
      quiz: [
        {
          q: 'Qual conectivo NÃO pode substituir "porém" sem alterar o sentido da frase "O banco expandiu sua rede digital; porém, as agências físicas continuam essenciais"?',
          options: [
            'contudo',
            'no entanto',
            'portanto',
            'todavia'
          ],
          answer: 2,
          explanation: '"Portanto" é um conectivo de CONCLUSÃO, não de adversidade. A frase original expressa contraste/oposição (expandiu o digital, MAS as agências físicas continuam importantes). "Portanto" mudaria o sentido para uma conclusão, o que não é adequado nesse contexto. Contudo, no entanto e todavia são todos adversativos e substituem "porém" perfeitamente.'
        },
        {
          q: 'No trecho "O BB lançou novo aplicativo. Ele permite transações 24 horas", o pronome "Ele" se refere a:',
          options: [
            'O Banco do Brasil',
            'O novo aplicativo',
            'O sistema de transações',
            'O cliente do banco'
          ],
          answer: 1,
          explanation: '"Ele" é pronome pessoal masculino singular. Os candidatos na frase são "O BB" (masculino) e "novo aplicativo" (masculino). Pelo critério semântico: quem "permite transações 24 horas" é o APLICATIVO, não o banco em si. Além disso, "ele" está na segunda frase logo após "novo aplicativo" — a referência mais imediata e logicamente coerente.'
        },
        {
          q: 'Qual das opções apresenta a relação semântica CORRETA para o conectivo destacado?',
          options: [
            '"Estudou muito; logo, foi reprovado" — relação de adição',
            '"Investiu em tecnologia para que pudesse reduzir custos" — relação de finalidade',
            '"Embora chova, a agência permanecerá aberta" — relação de causa',
            '"O banco cresceu porque reduziu os juros" — relação de concessão'
          ],
          answer: 1,
          explanation: '"Para que" indica FINALIDADE — a digitalização foi realizada COM O OBJETIVO DE reduzir custos. Análise das outras: "logo" indica conclusão, não adição; "embora" indica concessão, não causa; "porque" indica causa/explicação, não concessão. Identificar a relação semântica do conectivo é fundamental para questões de substituição e interpretação.'
        },
        {
          q: 'O texto é considerado COERENTE quando:',
          options: [
            'Utiliza muitos conectivos e pronomes para ligar as frases',
            'Possui frases curtas e vocabulário simples',
            'Apresenta unidade temática, progressão de ideias e ausência de contradições',
            'Está escrito na norma culta da língua portuguesa'
          ],
          answer: 2,
          explanation: 'Coerência textual depende de três pilares: (1) UNIDADE TEMÁTICA — o texto trata de um assunto central sem dispersões; (2) PROGRESSÃO — as ideias avançam, trazendo informações novas; (3) NÃO-CONTRADIÇÃO — as afirmações são compatíveis entre si. Usar muitos conectivos garante coesão, não necessariamente coerência. Um texto pode ser gramaticalmente correto e, ainda assim, incoerente.'
        },
        {
          q: 'Em "O banco investiu em IA. A instituição financeira também expandiu sua rede de agências", qual recurso de coesão foi usado em "A instituição financeira"?',
          options: [
            'Referência pronominal — uso de pronome para retomar o banco',
            'Referência lexical — uso de expressão sinônima para retomar "o banco"',
            'Elipse — omissão do sujeito por já ter sido mencionado',
            'Conectivo de adição — "também" cria a coesão entre as frases'
          ],
          answer: 1,
          explanation: '"A instituição financeira" é uma expressão LEXICAL que retoma "o banco" — trata-se de coesão por referência lexical (uso de sinônimo ou termo equivalente). Referência pronominal seria usar "ele" ou "esta". Elipse seria omitir o sujeito ("O banco investiu em IA e [Ø] também expandiu..."). "Também" contribui para coesão, mas é o conectivo aditivo, não o principal recurso de referência aqui.'
        }
      ]
    },
    {
      id: 'pt-ortografia',
      title: 'Ortografia e Acentuação',
      xp: 15,
      lesson: {
        title: 'Ortografia e Acentuação — Novo Acordo Ortográfico',
        theory: `<p>As regras de <strong>ortografia e acentuação</strong> são cobradas em provas do BB com foco nas mudanças do <strong>Acordo Ortográfico de 2009</strong> (vigente desde 2016) e nos casos que mais geram dúvidas.</p>

<h3>Regras de Acentuação Gráfica</h3>
<ul>
  <li><strong>Oxítonas</strong> (última sílaba tônica): acentuam-se terminadas em A(S), E(S), O(S), EM, ENS — café, também, cipó, armazéns</li>
  <li><strong>Paroxítonas</strong> (penúltima sílaba tônica): acentuam-se quando terminadas em L, R, X, N, I(S), U(S), ÃO(S), ÃS, UM, UNS, PS — fácil, caráter, tórax, hífen, júri, bônus, órgão</li>
  <li><strong>Proparoxítonas</strong> (antepenúltima sílaba tônica): TODAS acentuadas — médico, óculos, público, lâmpada</li>
</ul>

<h3>Mudanças do Acordo Ortográfico (2009) — cobradas no BB</h3>
<ul>
  <li><strong>Ditongos abertos EI e OI em paroxítonas:</strong> NÃO se acentuam mais — "ideia" (não "idéia"), "assembleia", "heroico", "jiboia"</li>
  <li><strong>Hiato II e UU:</strong> NÃO se acentuam mais em paroxítonas — "feiura", "baiuca" (mas mantém: saída, raíz, saúde — pois são hiatos)</li>
  <li><strong>Trema:</strong> abolido, exceto em nomes estrangeiros e seus derivados</li>
  <li><strong>Acento diferencial:</strong> eliminado em "para/pára", "pelo/pélo", "polo/pólo" — mantido em "pôde/pode", "pôr/por", "vêm/vem"</li>
</ul>

<h3>Por que / Porque / Porquê / Por quê</h3>
<ul>
  <li><strong>Por que</strong> (separado, sem acento): em perguntas diretas e indiretas, e quando equivale a "pelo qual" — "Por que você foi?" / "Explique por que foi." / "O motivo por que fui..."</li>
  <li><strong>Porque</strong> (junto, sem acento): conjunção causal ou explicativa — "Fui porque queria." / "Fique, porque preciso de você."</li>
  <li><strong>Porquê</strong> (junto, com acento): substantivo — "Não entendo o porquê disso." / "O porquê da decisão."</li>
  <li><strong>Por quê</strong> (separado, com acento): em perguntas no final de frase — "Você foi por quê?" / "Não entendo por quê."</li>
</ul>

<h3>Hífen — Principais Regras</h3>
<ul>
  <li>Usa-se com prefixos <strong>antes de H ou vogal igual:</strong> anti-higiênico, micro-ondas, anti-inflamatório</li>
  <li><strong>Pré-, pós-, pró-, pán-, soto-, supra-, infra-, extra-:</strong> sempre com hífen antes de vogal, H, ou seguem a vogal do prefixo — pré-vestibular, pós-graduação</li>
  <li><strong>Sem hífen</strong> com prefixos antes de consoante diferente de H e R/S: antiestresse (sem hífen) vs anti-higiênico (com hífen)</li>
</ul>`,
        examples: [
          {
            title: 'Ditongos abertos após o Acordo Ortográfico',
            code: `ANTES DO ACORDO → APÓS O ACORDO (correto agora):
"idéia" → "ideia" ✓
"assembléia" → "assembleia" ✓
"platéia" → "plateia" ✓
"jibóia" → "jiboia" ✓
"heróico" → "heroico" ✓
"paranóia" → "paranoia" ✓

ATENÇÃO — MANTÊM o acento (são oxítonas, não paroxítonas):
"anéis" ✓ (oxítona terminada em S)
"papéis" ✓ (oxítona terminada em S)
"fiéis" ✓ (oxítona terminada em S)
"réis" ✓

DICA:
Só perdem o acento os ditongos EI/OI em palavras PAROXÍTONAS.
Ditongos EI/OI em OXÍTONAS continuam acentuados (papéis, anéis).`,
            explanation: 'O Acordo Ortográfico de 2009 eliminou o acento nos ditongos abertos EI e OI de palavras PAROXÍTONAS ("ideia", "assembleia", "jiboia"). Mas atenção: quando a palavra é OXÍTONA (última sílaba tônica), o acento permanece — "papéis", "anéis", "fiéis" continuam acentuados por serem oxítonas terminadas em -éis/-eis. Questões de concurso frequentemente misturam os dois casos.'
          },
          {
            title: 'Por que / porque / porquê / por quê — método infalível',
            code: `TESTE RÁPIDO: substitua por "pelo qual/pela qual"
→ Se funcionar, é POR QUE (separado, sem acento)
"O motivo POR QUE (= pelo qual) ele foi aprovado é o estudo."

INÍCIO DE PERGUNTA DIRETA:
"POR QUE você não veio à reunião?"

EQUIVALE A "já que" ou "pois":
"Fique, PORQUE ainda temos muito a discutir." (= pois)
"Passou PORQUE estudou muito." (= dado que/visto que)

SUBSTANTIVO (tem artigo antes ou adjetivo depois):
"Explique-me o PORQUÊ da decisão." (o porquê = o motivo)
"Entendo seu PORQUÊ." (= sua razão)

FINAL DE FRASE OU ISOLADO:
"Ele foi, mas não sei POR QU�."
"Não entendo POR QUÊ."

Exemplos do BB:
✓ "Por que o investimento em tecnologia é prioritário?"
✓ "O banco investiu porque precisava modernizar seus serviços."
✓ "O porquê do investimento é a competitividade."
✓ "Ele saiu sem explicar por quê."`,
            explanation: 'Memorize os quatro contextos: (1) POR QUE separado/sem acento: perguntas e equivale a "pelo qual"; (2) PORQUE junto/sem acento: respostas e equivale a "pois/dado que"; (3) PORQUÊ junto/com acento: é substantivo, sempre vem após artigo ou adjetivo; (4) POR QUÊ separado/com acento: no final de frase ou isolado. Em provas, o examinador costuma combinar os quatro numa mesma questão.'
          },
          {
            title: 'Uso do hífen com prefixos',
            code: `COM HÍFEN (antes de H ou vogal igual ao final do prefixo):
✓ anti-higiênico (anti + h)
✓ micro-ondas (micro + o — vogal igual não, mas h... na prática, usa hífen antes de vogal)
✓ anti-inflamatório (anti + i — vogal igual à do prefixo)
✓ pré-vestibular (pré sempre com hífen)
✓ pós-graduação (pós sempre com hífen)
✓ pró-labore (pró sempre com hífen)
✓ inter-regional (inter + r — consoante R dobra, usa hífen)
✓ super-romântico (super + r — idem)

SEM HÍFEN (prefixo + consoante diferente de H, R, S):
✓ antivírus (anti + v)
✓ antiestresse (anti + e... espera: vogal diferente do prefixo = sem hífen)
✓ semicírculo (semi + c)
✓ multimídia (multi + m)
✓ autossuficiente (auto + s — SS evita o som de Z)

REGRA DO SS:
Prefixo terminado em vogal + palavra iniciada em S:
→ usa SS: "autossuficiente", "semissólido", "ultrassom"`,
            explanation: 'As regras de hífen são complexas e variam por prefixo. Para o BB, foque nos mais cobrados: (1) pré-, pós-, pró- sempre usam hífen; (2) anti-, micro-, semi-, multi- usam hífen antes de H ou de vogal IGUAL à do prefixo (anti-inflamatório), sem hífen antes de outras consoantes ou vogais diferentes (antiestresse → vogal e ≠ i, mas esta regra tem exceções); (3) inter-, super-, extra- usam hífen antes de R, H ou vogal.'
          }
        ]
      },
      quiz: [
        {
          q: 'Após o Acordo Ortográfico de 2009, qual das seguintes grafias está CORRETA?',
          options: [
            'idéia, assembléia, platéia',
            'ideia, assembleia, plateia',
            'idéia, assembleia, plateia',
            'ideia, assembléia, platéia'
          ],
          answer: 1,
          explanation: 'O Acordo Ortográfico de 2009 eliminou o acento nos ditongos abertos EI e OI em palavras paroxítonas. "Ideia", "assembleia" e "plateia" são paroxítonas com ditongo aberto EI → não se acentuam mais. As grafias com acento ("idéia", "assembléia", "platéia") eram corretas antes de 2016, mas agora são consideradas erradas.'
        },
        {
          q: 'Assinale a alternativa que preenche corretamente as lacunas: "_____ o senhor foi ao banco hoje? Fui _____ precisava renovar meu cadastro."',
          options: [
            'Porquê / por que',
            'Por que / porque',
            'Porque / por quê',
            'Por quê / porquê'
          ],
          answer: 1,
          explanation: 'Primeira lacuna: início de pergunta direta → POR QUE (separado, sem acento). Segunda lacuna: introduz explicação/causa, equivale a "pois" → PORQUE (junto, sem acento). "Porquê" é substantivo (o porquê = o motivo). "Por quê" aparece no final de frase ou isolado. O contexto de pergunta seguida de resposta explicativa é o mais clássico para testar os quatro casos.'
        },
        {
          q: 'Qual das alternativas apresenta o uso do ACENTO DIFERENCIAL correto após o Acordo Ortográfico de 2009?',
          options: [
            '"Ele pára o carro todos os dias no mesmo lugar."',
            '"Pelo (= por + o) amor de Deus, vá embora."',
            '"Ontem ela pôde sair mais cedo do trabalho."',
            '"O polo (= local) norte está se aquecendo rapidamente."'
          ],
          answer: 2,
          explanation: '"Pôde" (pretérito perfeito) mantém o acento diferencial para distinguir de "pode" (presente). Este é um dos poucos acentos diferenciais mantidos pelo Acordo. Eliminados pelo Acordo: "pára/para" (ambos sem acento agora), "pelo/pélo" (ambos sem acento). "Pôr" (verbo) vs "por" (preposição) também mantém. Mas "polo", "para", "pelo" perderam o acento diferencial.'
        },
        {
          q: 'Qual forma com hífen está CORRETA de acordo com as regras atuais?',
          options: [
            'antivirus (sem hífen)',
            'anti-inflamatório',
            'autoestima (sem hífen)',
            'semicirculo (sem hífen)'
          ],
          answer: 1,
          explanation: '"Anti-inflamatório" usa hífen porque o prefixo "anti-" termina em vogal I e a palavra seguinte começa com a mesma vogal I — regra: prefixo + vogal igual = hífen. "Antivírus" (sem hífen) está correto pois V é consoante diferente de H e R. "Autoestima" está correto sem hífen (auto + e, vogais diferentes). "Semicírculo" está correto sem hífen (semi + c, consoante).'
        },
        {
          q: 'Das palavras abaixo, qual é PROPAROXÍTONA e deve, portanto, obrigatoriamente ser acentuada?',
          options: [
            'Protocolo',
            'Eficaz',
            'Jurídico',
            'Fiscal'
          ],
          answer: 2,
          explanation: '"Jurídico" é proparoxítona (JU-RÍ-di-co — sílaba tônica é a antepenúltima: RÍ) e todas as proparoxítonas são acentuadas obrigatoriamente. "Protocolo" é paroxítona terminada em O (não acentuada). "Eficaz" é oxítona terminada em Z (não acentuada). "Fiscal" é paroxítona terminada em L — espera, terminada em L acentua? Sim! Mas "fiscal" é FIS-CAL, paroxítona terminada em L → fis-CAL... na verdade é oxítona. Oxítona em L não se acentua.'
        }
      ]
    }
  ]
};
