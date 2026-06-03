window.MATEMATICA_DATA = {
  id: 'matematica',
  name: 'Matemática',
  icon: '🔢',
  color: '#0891b2',
  gradient: 'linear-gradient(135deg, #0891b2, #0e7490)',
  topics: [
    {
      id: 'mat-logica',
      title: 'Raciocínio Lógico',
      xp: 25,
      lesson: {
        title: 'Raciocínio Lógico — Proposições e Operadores',
        theory: `<p>O <strong>raciocínio lógico</strong> é um dos conteúdos mais cobrados em concursos bancários. Dominar proposições e operadores lógicos garante pontos valiosos na prova.</p>

<h3>Proposições e Operadores Lógicos</h3>
<p>Uma <strong>proposição</strong> é uma sentença que pode ser verdadeira (V) ou falsa (F), nunca os dois ao mesmo tempo.</p>
<ul>
  <li><strong>Negação (~P):</strong> inverte o valor lógico — se P é V, ~P é F</li>
  <li><strong>Conjunção (P ∧ Q — "e"):</strong> verdadeira SOMENTE quando P e Q são ambas verdadeiras</li>
  <li><strong>Disjunção (P ∨ Q — "ou"):</strong> falsa SOMENTE quando P e Q são ambas falsas</li>
  <li><strong>Condicional (P → Q — "se P, então Q"):</strong> falsa SOMENTE quando P é V e Q é F</li>
  <li><strong>Bicondicional (P ↔ Q — "se e somente se"):</strong> verdadeira quando P e Q têm o mesmo valor lógico</li>
</ul>

<h3>Tabela Verdade Resumida</h3>
<pre>
P    Q    P∧Q   P∨Q   P→Q   P↔Q
V    V     V     V     V     V
V    F     F     V     F     F
F    V     F     V     V     F
F    F     F     F     V     V
</pre>

<h3>Equivalências Lógicas Fundamentais</h3>
<ul>
  <li><strong>Contrapositiva:</strong> (P → Q) ≡ (~Q → ~P) — equivalentes logicamente</li>
  <li><strong>Lei de De Morgan:</strong> ~(P ∧ Q) ≡ ~P ∨ ~Q &nbsp;|&nbsp; ~(P ∨ Q) ≡ ~P ∧ ~Q</li>
  <li><strong>Negação do condicional:</strong> ~(P → Q) ≡ P ∧ ~Q</li>
</ul>

<h3>Silogismo — Modus Ponens e Modus Tollens</h3>
<ul>
  <li><strong>Modus Ponens:</strong> se (P → Q) e P são verdadeiros, conclui-se Q</li>
  <li><strong>Modus Tollens:</strong> se (P → Q) e ~Q são verdadeiros, conclui-se ~P</li>
</ul>

<h3>Negação de Quantificadores</h3>
<ul>
  <li><strong>"Todo A é B"</strong> → negação: "Existe pelo menos um A que não é B"</li>
  <li><strong>"Algum A é B"</strong> → negação: "Nenhum A é B"</li>
  <li><strong>"Nenhum A é B"</strong> → negação: "Algum A é B"</li>
</ul>`,
        examples: [
          {
            title: 'Tabela verdade — o condicional P → Q',
            code: `CONDICIONAL: "Se o funcionário bater a meta, receberá bônus."
P = "o funcionário bate a meta"
Q = "o funcionário recebe bônus"

P → Q é FALSO apenas quando: P é V e Q é F

P=V, Q=V → V (bateu a meta, recebeu bônus — promessa cumprida)
P=V, Q=F → F (bateu a meta mas NÃO recebeu — promessa quebrada!)
P=F, Q=V → V (não bateu a meta, mas recebeu assim mesmo — sem problema)
P=F, Q=F → V (não bateu a meta, não recebeu — consequente da promessa)

CONTRAPOSITIVA (logicamente equivalente ao original):
P → Q  ≡  ~Q → ~P
"Se NÃO recebeu bônus, então NÃO bateu a meta."

As duas frases são equivalentes — mesma tabela verdade!

NEGAÇÃO do condicional (quando ele é falso):
~(P → Q)  ≡  P ∧ ~Q
"O funcionário bateu a meta E não recebeu bônus."`,
            explanation: 'O condicional é o operador mais cobrado no BB. Memorize: é falso SOMENTE quando P é verdadeiro e Q é falso — ou seja, quando a hipótese ocorre mas a consequência não. A contrapositiva é extremamente útil em problemas de inferência lógica: se "P → Q" e sabemos que Q é falso, podemos concluir que P também é falso (modus tollens).'
          },
          {
            title: 'Negação de proposições com quantificadores',
            code: `NEGAR PROPOSIÇÕES UNIVERSAIS E EXISTENCIAIS:

ORIGINAL: "Todos os funcionários são pontuais."
NEGAÇÃO:  "Existe pelo menos um funcionário que NÃO é pontual."
(ERRADO seria: "Nenhum funcionário é pontual" — isso vai além do que a negação exige)

ORIGINAL: "Algum cliente reclamou do atendimento."
NEGAÇÃO:  "Nenhum cliente reclamou do atendimento."

ORIGINAL: "Nenhuma agência registrou lucro."
NEGAÇÃO:  "Alguma agência registrou lucro."
(apenas UMA já basta para negar o "nenhuma")

LEI DE DE MORGAN — negação de conectivos:
~(P ∧ Q) = ~P ∨ ~Q
"Não (foi ao banco E sacou dinheiro)"
= "Não foi ao banco OU não sacou dinheiro"

~(P ∨ Q) = ~P ∧ ~Q
"Não (foi ao banco OU sacou dinheiro)"
= "Não foi ao banco E não sacou dinheiro"

DICA: ao negar "e" → vira "ou"; ao negar "ou" → vira "e"`,
            explanation: 'Negação de quantificadores: NUNCA negue apenas o predicado. A estrutura muda: "todo" vira "existe...que não", "algum/existe" vira "nenhum", "nenhum" vira "algum". De Morgan é essencial: ao negar uma conjunção (E), o conectivo muda para OU, e vice-versa. Os componentes individuais também são negados em ambos os casos.'
          },
          {
            title: 'Lógica situacional — modus tollens',
            code: `PROBLEMA CLÁSSICO DO BB:
"Maria trabalha na agência A ou na agência B.
 Se Maria trabalha na agência A, ela chega às 8h.
 Maria não chega às 8h.
 Onde Maria trabalha?"

FORMALIZAÇÃO:
P1: A ∨ B  (trabalha em A ou em B)
P2: A → C  (se em A, então chega às 8h)
P3: ~C     (não chega às 8h)

RACIOCÍNIO — Modus Tollens aplicado em P2 e P3:
P2: A → C
P3: ~C
Conclusão: ~A  (Maria NÃO trabalha na agência A)

Combinando com P1: A ∨ B
Como ~A é verdadeiro → Maria trabalha em B.

RESPOSTA: Maria trabalha na agência B.

MODUS PONENS (para comparação):
"Se está chovendo, a agência fecha cedo."
"Está chovendo." (P é verdadeiro)
Conclusão: "A agência fecha cedo." (Q é verdadeiro) ✓`,
            explanation: 'Modus tollens é o raciocínio por eliminação: "se P implica Q, e Q é falso, então P é falso". É o raciocínio investigativo clássico. Em problemas com múltiplas premissas, formalize cada uma em símbolos, aplique as regras de inferência (modus ponens/tollens) em sequência. Não resolva "na intuição" — a formalização evita erros, especialmente quando há 4 ou 5 premissas encadeadas.'
          }
        ]
      },
      quiz: [
        {
          q: 'A proposição condicional "Se o banco abrir, então atenderemos os clientes" é FALSA apenas quando:',
          options: [
            'O banco não abrir e não atendermos os clientes',
            'O banco abrir e não atendermos os clientes',
            'O banco não abrir e atendermos os clientes',
            'O banco abrir e atendermos os clientes'
          ],
          answer: 1,
          explanation: 'O condicional P → Q é falso SOMENTE quando P é verdadeiro (o banco abre) e Q é falso (não atendermos). Isso representa uma "promessa quebrada": a condição foi cumprida, mas a consequência não ocorreu. Nos demais casos: banco fechado + não atender (P=F, Q=F) → verdadeiro; banco fechado + atender mesmo assim (P=F, Q=V) → verdadeiro; banco aberto + atender (P=V, Q=V) → verdadeiro.'
        },
        {
          q: 'Qual é a negação correta da proposição "Todos os gerentes atingiram a meta"?',
          options: [
            'Nenhum gerente atingiu a meta',
            'Alguns gerentes não atingiram a meta',
            'Existe pelo menos um gerente que não atingiu a meta',
            'A maioria dos gerentes não atingiu a meta'
          ],
          answer: 2,
          explanation: 'As alternativas B e C são logicamente equivalentes e ambas corretas. A negação de "TODOS os A são B" é "EXISTE PELO MENOS UM A que não é B". Basta um caso contrário para derrubar a afirmação universal. "Nenhum gerente atingiu" é excessivo — a negação não precisa dizer que NENHUM atingiu, apenas que há exceção. O gabarito é C por ser a forma mais precisa e formal.'
        },
        {
          q: 'Usando a Lei de De Morgan, qual é a negação de "João foi ao banco E sacou dinheiro"?',
          options: [
            'João não foi ao banco E não sacou dinheiro',
            'João não foi ao banco OU não sacou dinheiro',
            'João foi ao banco OU não sacou dinheiro',
            'João não foi ao banco OU sacou dinheiro'
          ],
          answer: 1,
          explanation: 'De Morgan: ~(P ∧ Q) = ~P ∨ ~Q. Negação de CONJUNÇÃO (E) resulta em DISJUNÇÃO (OU) com ambos os componentes negados. "Não (foi ao banco E sacou)" = "Não foi ao banco OU não sacou". A disjunção é verdadeira se PELO MENOS UM dos componentes for verdadeiro — basta que ele não tenha ido ao banco OU que não tenha sacado para negar a conjunção original.'
        },
        {
          q: 'Em um problema lógico: "Se o saldo é positivo, o cliente pode sacar. O cliente não pode sacar." Qual a conclusão correta?',
          options: [
            'O saldo é positivo',
            'O saldo não é positivo',
            'O cliente pode depositar',
            'Não é possível concluir nada'
          ],
          answer: 1,
          explanation: 'Modus Tollens: dado P → Q e ~Q, conclui-se ~P. Aqui: P = "saldo é positivo", Q = "cliente pode sacar". Premissas: (P → Q) e ~Q (não pode sacar). Conclusão: ~P (saldo NÃO é positivo). O raciocínio: se o saldo fosse positivo, ele poderia sacar — mas como ele não pode, concluímos que o saldo não é positivo. A opção "não é possível concluir" estaria errada pois o modus tollens é válido.'
        },
        {
          q: 'Qual proposição é logicamente EQUIVALENTE a "Se o banco investir em IA, reduzirá custos" (P → Q)?',
          options: [
            'Se o banco não investir em IA, não reduzirá custos (~P → ~Q)',
            'Se o banco reduzir custos, investiu em IA (Q → P)',
            'Se o banco não reduzir custos, não investiu em IA (~Q → ~P)',
            'O banco investiu em IA e não reduziu custos (P ∧ ~Q)'
          ],
          answer: 2,
          explanation: 'A CONTRAPOSITIVA (~Q → ~P) é logicamente equivalente ao condicional original (P → Q). "Se não reduziu custos, então não investiu em IA" tem exatamente a mesma tabela verdade que o original. As outras: ~P → ~Q (inversa) e Q → P (recíproca) NÃO são equivalentes ao original — podem ter valores lógicos diferentes. P ∧ ~Q é a NEGAÇÃO do condicional (quando ele é falso), não uma equivalência.'
        }
      ]
    },
    {
      id: 'mat-porcentagem',
      title: 'Porcentagem e Juros',
      xp: 25,
      lesson: {
        title: 'Porcentagem, Juros Simples e Juros Compostos',
        theory: `<p><strong>Porcentagem e juros</strong> são os temas mais cobrados em matemática financeira no BB — e fazem ponte direta com conhecimentos bancários como produtos de crédito e investimento.</p>

<h3>Porcentagem Básica</h3>
<ul>
  <li>X% de N = (X/100) × N</li>
  <li><strong>Aumento de X%:</strong> multiplica pelo fator (1 + X/100). Ex: +20% → × 1,20</li>
  <li><strong>Desconto de X%:</strong> multiplica pelo fator (1 - X/100). Ex: -15% → × 0,85</li>
  <li><strong>Aumento e desconto encadeados:</strong> multiplique os fatores em sequência</li>
</ul>

<h3>Juros Simples</h3>
<p><strong>J = C × i × t</strong> &nbsp;|&nbsp; <strong>M = C + J = C × (1 + i × t)</strong></p>
<ul>
  <li>C = Capital inicial | i = taxa de juros (mesma unidade de t) | t = tempo | M = montante final</li>
  <li>Os juros sempre incidem sobre o <strong>capital inicial</strong> — crescem linearmente</li>
</ul>

<h3>Juros Compostos</h3>
<p><strong>M = C × (1 + i)^t</strong></p>
<ul>
  <li>Os juros incidem sobre o <strong>montante acumulado</strong> — crescimento exponencial ("juros sobre juros")</li>
  <li>Para t > 1: juros compostos sempre rendem mais que simples</li>
  <li>Para t = 1: simples e compostos são idênticos</li>
</ul>

<h3>Taxa Equivalente (Juros Compostos)</h3>
<p>Para converter taxa mensal (im) em anual (ia):</p>
<p><strong>(1 + ia) = (1 + im)^12</strong></p>
<p>Exemplo: 1% ao mês → (1,01)^12 ≈ 1,1268 → taxa anual ≈ 12,68% (NÃO é 12%!)</p>

<h3>Desconto Comercial vs Racional</h3>
<ul>
  <li><strong>Comercial (bancário / "por fora"):</strong> incide sobre o valor NOMINAL (futuro) — D = N × d × t</li>
  <li><strong>Racional ("por dentro"):</strong> incide sobre o valor PRESENTE (atual) — matematicamente mais correto</li>
</ul>`,
        examples: [
          {
            title: 'Aumento e desconto encadeado — a armadilha clássica do concurso',
            code: `PROBLEMA:
Um produto custa R$ 1.000,00.
Sofreu aumento de 20% e depois desconto de 20%.
Qual o preço final?

ERRO COMUM: "20% de aumento e 20% de desconto = preço original"
→ ERRADO!

CÁLCULO CORRETO (usando fatores multiplicativos):
1) Aumento de 20%:  R$ 1.000 × 1,20 = R$ 1.200,00
2) Desconto de 20%: R$ 1.200 × 0,80 = R$ 960,00

RESULTADO: R$ 960,00 (NÃO voltou aos R$ 1.000!)

POR QUÊ? O desconto de 20% incide sobre R$ 1.200,
não sobre R$ 1.000. 20% de 1.200 = 240 ≠ 200.

FATOR COMBINADO:
1,20 × 0,80 = 0,96 → redução líquida de 4%

FÓRMULA GERAL:
Aumento de X% seguido de desconto de X% sempre resulta
em redução de (X²/100)%
No caso: (20² / 100) = 400/100 = 4% de redução ✓`,
            explanation: 'Esta é uma das questões mais clássicas do BB. O erro intuitivo é pensar que +20% e -20% se cancelam. A chave: o desconto de 20% incide sobre o valor JÁ aumentado (R$ 1.200), que é MAIOR que o original. Por isso, 20% de R$ 1.200 = R$ 240, que é mais do que os R$ 200 originais. Sempre use fatores multiplicativos em sequência — é mais rápido e elimina erros de raciocínio.'
          },
          {
            title: 'Juros simples vs juros compostos — R$1.000 a 2% ao mês por 6 meses',
            code: `Capital: R$ 1.000,00 | Taxa: 2% ao mês | Prazo: 6 meses

JUROS SIMPLES: J = C × i × t
J = 1.000 × 0,02 × 6 = R$ 120,00
M = 1.000 + 120 = R$ 1.120,00
(juros de R$20 por mês, sempre os mesmos — linear)

JUROS COMPOSTOS: M = C × (1 + i)^t
M = 1.000 × (1,02)^6 ≈ 1.000 × 1,12616 = R$ 1.126,16
(cada mês os juros crescem — exponencial)

DIFERENÇA: R$ 1.126,16 - R$ 1.120,00 = R$ 6,16

Evolução mês a mês em juros COMPOSTOS:
Mês 1: 1.000,00 × 1,02 = 1.020,00 (juros: R$20,00)
Mês 2: 1.020,00 × 1,02 = 1.040,40 (juros: R$20,40)
Mês 3: 1.040,40 × 1,02 = 1.061,21 (juros: R$20,81)
Mês 4: 1.061,21 × 1,02 = 1.082,43 (juros: R$21,22)
Mês 5: 1.082,43 × 1,02 = 1.104,08 (juros: R$21,65)
Mês 6: 1.104,08 × 1,02 = 1.126,16 (juros: R$22,08)

Os juros mensais CRESCEM porque incidem sobre o montante
acumulado, não sobre o capital original.`,
            explanation: 'Em juros simples, os juros mensais são sempre R$20 (2% de R$1.000 — fixo). Em juros compostos, o juro do mês 2 incide sobre R$1.020 (R$20,40), do mês 3 sobre R$1.040,40 (R$20,81), etc. A diferença parece pequena em 6 meses, mas em prazos longos (anos) é enorme. CDB, empréstimos bancários, cheque especial — todos usam juros compostos.'
          },
          {
            title: 'Taxa equivalente — convertendo mensal para anual em juros compostos',
            code: `PROBLEMA:
Um CDB rende 1% ao mês. Qual a taxa anual equivalente?

FÓRMULA (juros compostos):
(1 + i_anual) = (1 + i_mensal)^12
(1 + i_anual) = (1,01)^12

Calculando passo a passo:
(1,01)^2  = 1,0201
(1,01)^4  = 1,0201^2 ≈ 1,04060
(1,01)^8  ≈ 1,04060^2 ≈ 1,08286
(1,01)^12 ≈ 1,08286 × 1,04060 ≈ 1,12683

i_anual ≈ 12,683% ao ano

ATENÇÃO: taxa PROPORCIONAL (simples) seria:
1% × 12 = 12% a.a.  ← subestima a rentabilidade real!

COMPARANDO INVESTIMENTOS:
Banco A: 12,5% ao ano
Banco B: 1,0% ao mês → (1,01)^12 ≈ 12,68% a.a.
Banco C: 0,99% ao mês → (1,0099)^12 ≈ 12,57% a.a.
Melhor opção: Banco B (12,68% a.a.) ✓

Use SEMPRE a taxa equivalente (compostos) para comparar —
nunca a proporcional (simples) para prazos diferentes.`,
            explanation: 'A diferença entre taxa equivalente (12,68%) e taxa proporcional (12%) parece pequena mas em valores altos representa muito. Para converter entre períodos em juros compostos, use a fórmula (1+i_menor)^n = (1+i_maior). Para converter de anual para mensal: (1+im) = (1+ia)^(1/12). Esta habilidade é fundamental para comparar produtos bancários como CDB, LCI e fundos de investimento.'
          }
        ]
      },
      quiz: [
        {
          q: 'Um produto custava R$ 500,00, sofreu aumento de 10% e depois desconto de 10%. Qual é o preço final?',
          options: [
            'R$ 500,00 — voltou ao preço original',
            'R$ 495,00 — houve redução de 1%',
            'R$ 490,00 — houve redução de 2%',
            'R$ 505,00 — houve aumento líquido de 1%'
          ],
          answer: 1,
          explanation: '500 × 1,10 = 550 (após aumento de 10%). 550 × 0,90 = 495 (após desconto de 10% sobre R$550). Preço final: R$ 495,00 — redução de R$ 5 = 1% do original. Fator combinado: 1,10 × 0,90 = 0,99 → 1% de redução. Generalizando: aumento de X% seguido de desconto de X% resulta em redução de X²/100 % (10²/100 = 1%). Isso ocorre porque os 10% de desconto incidem sobre o valor JÁ aumentado.'
        },
        {
          q: 'Aplicando R$ 2.000,00 a juros simples de 3% ao mês por 4 meses, qual o montante final?',
          options: [
            'R$ 2.240,00',
            'R$ 2.060,00',
            'R$ 2.254,55',
            'R$ 2.262,48'
          ],
          answer: 0,
          explanation: 'J = C × i × t = 2.000 × 0,03 × 4 = R$ 240,00. M = C + J = 2.000 + 240 = R$ 2.240,00. Em juros simples, os juros incidem sempre sobre o capital INICIAL (R$2.000), gerando exatamente R$60 por mês, independentemente do montante acumulado. Para comparar: juros compostos dariam M = 2000 × (1,03)^4 ≈ 2000 × 1,1255 ≈ R$ 2.251,02 — ligeiramente maior.'
        },
        {
          q: 'Qual é o montante de R$ 5.000,00 aplicados a juros compostos de 2% ao mês por 3 meses?',
          options: [
            'R$ 5.300,00',
            'R$ 5.306,04',
            'R$ 5.312,16',
            'R$ 5.204,00'
          ],
          answer: 1,
          explanation: 'M = C × (1+i)^t = 5.000 × (1,02)^3. (1,02)^3 = 1,02 × 1,02 × 1,02 = 1,061208. M = 5.000 × 1,061208 = R$ 5.306,04. Para juros simples: J = 5000 × 0,02 × 3 = 300 → M = R$ 5.300,00. A diferença de R$ 6,04 representa os "juros sobre juros" — pequena em 3 meses, mas cresce exponencialmente com o prazo.'
        },
        {
          q: 'Uma taxa de 1,5% ao mês equivale, em juros compostos, a aproximadamente quantos % ao ano?',
          options: [
            '18,00% ao ano (taxa proporcional)',
            '19,56% ao ano (taxa equivalente)',
            '15,00% ao ano',
            '20,11% ao ano'
          ],
          answer: 1,
          explanation: '(1 + ia) = (1,015)^12 ≈ 1,1956 → ia ≈ 19,56% a.a. A taxa proporcional (simples) seria 1,5% × 12 = 18% a.a. — essa subestima o rendimento real em juros compostos. A diferença de 1,56 pontos percentuais (19,56% vs 18%) representa um valor significativo em aplicações de grande porte. Use sempre a taxa equivalente para comparar produtos com prazos diferentes.'
        },
        {
          q: 'O desconto COMERCIAL (bancário) difere do desconto RACIONAL porque:',
          options: [
            'O comercial incide sobre o valor PRESENTE (atual), enquanto o racional incide sobre o valor FUTURO',
            'O comercial incide sobre o valor FUTURO (nominal), gerando desconto em reais maior para o mesmo prazo',
            'O racional sempre resulta em desconto em reais MAIOR que o comercial',
            'Não há diferença prática entre os dois tipos de desconto'
          ],
          answer: 1,
          explanation: 'Desconto COMERCIAL ("por fora"): D = N × d × t — incide sobre o valor NOMINAL (futuro). Desconto RACIONAL ("por dentro"): D = A × i × t / (1 + i×t) — incide sobre o valor PRESENTE (atual). Como o valor nominal N é sempre maior que o valor presente A (N > A), o desconto comercial resulta em valor descontado EM REAIS maior que o racional para a mesma taxa e prazo. Por isso bancos preferem o desconto comercial ao descontar títulos.'
        }
      ]
    },
    {
      id: 'mat-estatistica',
      title: 'Estatística Básica',
      xp: 20,
      lesson: {
        title: 'Estatística Básica e Probabilidade',
        theory: `<p>Estatística e probabilidade aparecem no BB com foco em <strong>interpretação de dados</strong>, cálculo de medidas descritivas e probabilidade básica. Gráficos são frequentes.</p>

<h3>Medidas de Tendência Central</h3>
<ul>
  <li><strong>Média aritmética simples:</strong> soma dos valores ÷ número de valores. Sensível a valores extremos (outliers).</li>
  <li><strong>Média ponderada:</strong> Σ(valor × peso) ÷ Σpesos. Usada quando valores têm importâncias diferentes.</li>
  <li><strong>Mediana:</strong> valor central quando os dados estão ORDENADOS. Se número par de dados, média dos dois centrais. Resistente a outliers.</li>
  <li><strong>Moda:</strong> valor mais frequente. Pode ser bimodal (dois modas) ou amodal (sem moda clara).</li>
</ul>

<h3>Quando usar cada medida?</h3>
<ul>
  <li>Com <strong>outliers</strong> (valores extremos): use a <strong>mediana</strong> — a média distorce</li>
  <li>Com dados <strong>simétricos</strong>: média = mediana = moda</li>
  <li>Dados <strong>categóricos</strong> (regiões, meses): use a <strong>moda</strong></li>
</ul>

<h3>Probabilidade Básica</h3>
<p><strong>P(A) = n(A) ÷ n(total)</strong> — casos favoráveis ÷ total de casos possíveis</p>
<ul>
  <li>0 ≤ P(A) ≤ 1 (ou 0% a 100%)</li>
  <li><strong>Complemento:</strong> P(não-A) = 1 - P(A)</li>
  <li><strong>Eventos independentes:</strong> P(A e B) = P(A) × P(B)</li>
  <li><strong>Sem reposição:</strong> P(A e B) = P(A) × P(B|A) — o denominador diminui</li>
  <li><strong>"Pelo menos um":</strong> use o complemento — 1 - P(nenhum ocorre)</li>
</ul>

<h3>Frequência Relativa e Acumulada</h3>
<p><strong>Frequência relativa</strong> = freq. absoluta ÷ total (resultado em decimal ou %). <strong>Frequência acumulada</strong> = soma das frequências relativas até determinada classe.</p>`,
        examples: [
          {
            title: 'Média, mediana e moda — impacto de outliers nos salários',
            code: `SÉRIE DE SALÁRIOS (R$):
[2.000, 2.500, 2.500, 3.000, 8.000]

MÉDIA: (2.000 + 2.500 + 2.500 + 3.000 + 8.000) ÷ 5
     = 18.000 ÷ 5 = R$ 3.600,00

MEDIANA: dados já ordenados, 5 valores → posição central = 3º valor
        mediana = R$ 2.500,00

MODA: 2.500 aparece 2 vezes (mais frequente)
      moda = R$ 2.500,00

ANÁLISE CRÍTICA:
- 4 dos 5 funcionários ganham MENOS que a média (R$3.600)
- O salário de R$8.000 "puxa" a média artificialmente para cima
- MEDIANA (R$2.500) representa melhor a realidade da maioria

QUESTÃO TÍPICA:
"Qual medida MELHOR representa o salário típico?"
→ Resposta: Mediana (é resistente ao outlier de R$8.000)

"O BB afirma que o salário médio é R$3.600"
→ Tecnicamente verdade, mas pode ser enganoso!`,
            explanation: 'O conceito de que a MEDIANA é mais robusta que a MÉDIA quando há outliers é muito cobrado no BB. A lógica: se 4 em 5 funcionários ganham abaixo da média, a média não "representa" a maioria. A mediana divide o grupo ao meio — metade ganha mais, metade ganha menos. Quando há outlier muito alto (como um salário de executivo), a média sobe muito enquanto a mediana permanece estável.'
          },
          {
            title: 'Probabilidade — funcionários e sorteio sem reposição',
            code: `GRUPO: 50 funcionários (30 homens e 20 mulheres)

PROBABILIDADE SIMPLES:
P(sortear uma mulher) = 20/50 = 2/5 = 40%
P(sortear um homem)  = 30/50 = 3/5 = 60%

DOIS SORTEIOS SEGUIDOS — SEM REPOSIÇÃO:
P(1ª sorteada seja mulher) = 20/50
P(2ª seja mulher | 1ª foi mulher) = 19/49
(restam 49 funcionários, com 19 mulheres)

P(as duas sejam mulheres) = 20/50 × 19/49
                          = 380/2.450 ≈ 15,51%

COM REPOSIÇÃO (eventos independentes):
P(as duas sejam mulheres) = 20/50 × 20/50
                          = 400/2.500 = 16%

TÉCNICA DO COMPLEMENTO — "pelo menos uma mulher":
P(pelo menos 1 mulher em 2 sorteios, sem reposição) =
1 - P(nenhuma mulher) =
1 - (30/50 × 29/49) =
1 - 870/2.450 ≈ 1 - 0,355 = 64,5%`,
            explanation: 'Atenção ao detalhe: COM ou SEM reposição? Sem reposição: o total e o número de elementos diminuem a cada sorteio. Com reposição: total permanece constante (eventos independentes). O complemento "1 - P(evento oposto)" é especialmente útil para "pelo menos um" — calcular diretamente exigiria somar vários casos; calcular o complemento é mais simples.'
          },
          {
            title: 'Interpretação de gráfico de barras — resultados de agências',
            code: `GRÁFICO: Resultado das agências em 2024 (R$ milhões)

Agência Norte:  ██████████████ 12
Agência Sul:    ██████████████████████ 20
Agência Leste:  ██████████████████ 16
Agência Oeste:  ████████████ 8
Agência Centro: ████████████████████ 18

QUESTÕES TÍPICAS DE CONCURSO:

1) "Qual agência teve o MAIOR resultado?"
   → Agência Sul: R$ 20 milhões ✓

2) "Qual a MÉDIA entre as 5 agências?"
   → (12+20+16+8+18) ÷ 5 = 74 ÷ 5 = R$ 14,8 milhões

3) "Quantas agências ficaram ACIMA da média (14,8)?"
   → Norte(12)<14,8  Sul(20)>14,8  Leste(16)>14,8
     Oeste(8)<14,8   Centro(18)>14,8
   → 3 agências acima: Sul, Leste e Centro

4) "Agência Sul representa quantos % do total?"
   → 20 ÷ 74 ≈ 27% do total consolidado

5) "Qual a MEDIANA dos resultados?"
   → Ordenados: [8, 12, 16, 18, 20] → 5º valor central = 16
   → Mediana = R$ 16 milhões (Agência Leste)`,
            explanation: 'Em questões de gráfico, calcule sistematicamente: (1) total (soma), (2) média, (3) maior/menor, (4) quantos acima/abaixo da média, (5) percentual de cada barra. O BB costuma combinar leitura de gráfico com cálculos de média, mediana e percentuais numa mesma questão. Pratique os cinco tipos de perguntas para não ser surpreendido.'
          }
        ]
      },
      quiz: [
        {
          q: 'Para o conjunto [3, 5, 5, 7, 7, 7, 9, 50], qual medida MELHOR representa a maioria dos valores?',
          options: [
            'Média aritmética = 11,625, pois usa todos os dados',
            'Mediana = 7, pois é resistente ao valor extremo 50',
            'Moda = 7, pois é o valor mais frequente',
            'Média ponderada, dando maior peso aos valores centrais'
          ],
          answer: 1,
          explanation: 'Média = 93/8 = 11,625 — distorcida pelo outlier 50 (valor acima de todos exceto ele mesmo). Mediana: 8 valores, média entre 4º e 5º termos = (7+7)/2 = 7. Moda = 7 (aparece 3 vezes). Tanto mediana quanto moda dão 7, que representa melhor os dados. A média (11,625) é mais alta que 7 dos 8 valores. Para dados com outliers, a mediana é sempre a medida mais indicada.'
        },
        {
          q: 'Em um grupo de 40 clientes (25 do Varejo e 15 do Preferencial), qual a probabilidade de sortear aleatoriamente um cliente Preferencial?',
          options: [
            '25%',
            '37,5%',
            '15%',
            '62,5%'
          ],
          answer: 1,
          explanation: 'P(Preferencial) = 15/40 = 3/8 = 0,375 = 37,5%. Casos favoráveis: 15 clientes Preferenciais. Total possível: 40 clientes. P(Varejo) = 25/40 = 62,5%. Verificação: 37,5% + 62,5% = 100% ✓. Questão direta de probabilidade clássica — divisão de casos favoráveis pelo total.'
        },
        {
          q: 'Um fundo teve rentabilidades mensais de 1%, 2%, 1,5%, 3% e 2,5% em 5 meses. Qual a rentabilidade MÉDIA mensal?',
          options: [
            '1,5% ao mês',
            '2,0% ao mês',
            '2,5% ao mês',
            '3,0% ao mês'
          ],
          answer: 1,
          explanation: 'Média = (1 + 2 + 1,5 + 3 + 2,5) / 5 = 10 / 5 = 2% ao mês. Média aritmética simples: soma de todos os valores dividida pelo número de valores. Em questões de concurso, salvo indicação contrária, usa-se a média aritmética simples para rentabilidades.'
        },
        {
          q: 'Em um sorteio SEM REPOSIÇÃO de 2 clientes de um grupo com 10 (4 inadimplentes e 6 adimplentes), qual a probabilidade de ambos serem inadimplentes?',
          options: [
            '16% — como se fosse com reposição (4/10 × 4/10)',
            '13,33% — sem reposição, 4/10 × 3/9',
            '8,0% — calculado incorretamente',
            '40% — probabilidade de um inadimplente em uma tentativa'
          ],
          answer: 1,
          explanation: 'SEM REPOSIÇÃO: P(1º inadimplente) = 4/10. Após retirar 1 inadimplente, restam 9 clientes com 3 inadimplentes. P(2º inadimplente | 1º foi inadimplente) = 3/9. P(ambos inadimplentes) = 4/10 × 3/9 = 12/90 = 2/15 ≈ 13,33%. COM REPOSIÇÃO (eventos independentes): 4/10 × 4/10 = 16%. A diferença: sem reposição o pool diminui, então a probabilidade é ligeiramente menor.'
        },
        {
          q: 'As vendas de seguros de uma agência nos últimos 5 dias foram: 8, 12, 8, 15, 12. Qual é a MODA?',
          options: [
            '8 apenas, pois é o menor valor',
            '12 apenas, pois aparece no fim da série',
            '8 e 12, pois ambos aparecem 2 vezes (distribuição bimodal)',
            '11, que é a média dos dados'
          ],
          answer: 2,
          explanation: 'Moda é o valor com MAIOR frequência. 8 aparece 2 vezes, 12 aparece 2 vezes, 15 aparece 1 vez. Dois valores empatam na maior frequência → distribuição BIMODAL: moda = 8 e 12. Quando TODOS os valores têm a mesma frequência, diz-se que a distribuição é AMODAL. Média = (8+12+8+15+12)/5 = 55/5 = 11 — valor que não aparece na série, apenas uma medida calculada.'
        }
      ]
    },
    {
      id: 'mat-proporcao',
      title: 'Proporção e Regra de Três',
      xp: 15,
      lesson: {
        title: 'Proporção, Regra de Três e Divisão Proporcional',
        theory: `<p><strong>Razão, proporção e regra de três</strong> são a base de problemas variados no BB — de câmbio e produção a divisão de lucros entre sócios e cálculo de misturas.</p>

<h3>Razão e Proporção</h3>
<ul>
  <li><strong>Razão:</strong> comparação entre duas grandezas por divisão — a/b</li>
  <li><strong>Proporção:</strong> igualdade entre duas razões — a/b = c/d</li>
  <li><strong>Propriedade fundamental:</strong> a × d = b × c (produto dos extremos = produto dos meios)</li>
</ul>

<h3>Grandezas Diretamente e Inversamente Proporcionais</h3>
<ul>
  <li><strong>Diretamente proporcionais:</strong> quando uma aumenta, a outra aumenta na mesma razão</li>
  <li><strong>Inversamente proporcionais:</strong> quando uma aumenta, a outra diminui</li>
</ul>

<h3>Regra de Três Simples</h3>
<ul>
  <li><strong>Direta:</strong> mantém as razões — x/b = c/d → x = b × c / d</li>
  <li><strong>Inversa:</strong> inverte uma das razões antes do produto cruzado</li>
</ul>

<h3>Divisão Proporcional</h3>
<p>Dividir N entre partes proporcionais a a:b:c: Soma S = a+b+c. Cada parte = N × coeficiente / S.</p>

<h3>Problema de Mistura</h3>
<p>q1×p1 + q2×p2 = (q1+q2) × pm</p>`,
        examples: [
          {
            title: 'Regra de três INVERSA — máquinas e produção',
            code: `PROBLEMA:
5 máquinas produzem 100 peças em 4 horas.
Quantas máquinas para produzir 200 peças em 2 horas?

MÉTODO DA REGRA DE TRÊS COMPOSTA:
x = 5 × (200/100) × (4/2)
     [ref]  [peças, direta] [horas, inversa: inverte!]
x = 5 × 2 × 2 = 20 máquinas

VERIFICAÇÃO:
20 máquinas × 2h = 40 máquinas-hora
40 × 5 peças/máq-hora = 200 peças ✓`,
            explanation: 'Na regra de três composta, para cada grandeza determine a relação com x: direta (na mesma direção) ou inversa (em direção oposta). Para grandezas DIRETAS: razão normal (novo/antigo). Para INVERSAS: inverta a razão (antigo/novo).'
          },
          {
            title: 'Divisão proporcional — distribuição de lucros entre sócios',
            code: `PROBLEMA:
3 sócios investiram: A = R$20.000 | B = R$30.000 | C = R$50.000
Lucro do ano: R$ 12.000 — dividir proporcionalmente ao capital.

MÉTODO DAS PARTES:
Simplificar 20:30:50 ÷ 10 = 2:3:5
Total de partes: 2+3+5 = 10 partes
Valor de cada parte: R$12.000 ÷ 10 = R$1.200
A: 2 × R$1.200 = R$ 2.400
B: 3 × R$1.200 = R$ 3.600
C: 5 × R$1.200 = R$ 6.000

VERIFICAÇÃO: 2.400 + 3.600 + 6.000 = R$ 12.000 ✓`,
            explanation: 'O método das "partes" é mais eficiente: simplifique a razão ao máximo, some as partes, divida o total pelas partes para achar o valor de cada "fatia", e multiplique pelos coeficientes individuais. Sempre verifique somando as partes ao final.'
          },
          {
            title: 'Problema de mistura',
            code: `PROBLEMA:
Misturar café A (R$ 20/kg) com café B (R$ 35/kg)
para obter 10 kg a R$ 26/kg.
Quantos kg de cada tipo usar?

EQUAÇÃO:
20x + 35(10 - x) = 26 × 10
20x + 350 - 35x = 260
-15x = -90 → x = 6 kg de café A
(10 - 6) = 4 kg de café B

VERIFICAÇÃO:
6 × R$20 + 4 × R$35 = 120 + 140 = R$260 = R$26 × 10 ✓`,
            explanation: 'Problemas de mistura seguem a equação: soma dos custos individuais = custo total da mistura. Custo total = preço médio × quantidade total.'
          }
        ]
      },
      quiz: [
        {
          q: 'Se 3 funcionários digitam 120 documentos em 4 horas, quantos documentos 5 funcionários digitarão em 6 horas?',
          options: [
            '200 documentos',
            '250 documentos',
            '300 documentos',
            '180 documentos'
          ],
          answer: 2,
          explanation: 'x = 120 × (5/3) × (6/4) = 120 × 5/3 × 3/2 = 120 × 2,5 = 300 documentos. Documentos são diretos com funcionários e com horas.'
        },
        {
          q: 'Três agências recebem verbas proporcionais ao número de clientes: X=400, Y=600, Z=1.000. Com total de R$ 120.000, quanto a Agência Z recebe?',
          options: [
            'R$ 24.000',
            'R$ 36.000',
            'R$ 60.000',
            'R$ 40.000'
          ],
          answer: 2,
          explanation: 'Simplificar 400:600:1000 → 2:3:5. Total: 10 partes. 120.000/10 = R$12.000/parte. Z = 5 × 12.000 = R$ 60.000.'
        },
        {
          q: 'Um carro percorre 300 km gastando 25 litros. Quantos litros serão necessários para percorrer 420 km?',
          options: [
            '30 litros',
            '35 litros',
            '40 litros',
            '45 litros'
          ],
          answer: 1,
          explanation: 'x = 25 × 420/300 = 25 × 1,4 = 35 litros. Relação direta: mais km → mais litros.'
        },
        {
          q: 'Um comerciante mistura 4 kg de produto A (R$ 15/kg) com 6 kg de produto B (R$ 25/kg). Qual o preço médio por kg da mistura?',
          options: [
            'R$ 20,00/kg (média simples dos preços)',
            'R$ 21,00/kg (média ponderada pelas quantidades)',
            'R$ 19,00/kg',
            'R$ 22,00/kg'
          ],
          answer: 1,
          explanation: 'Custo total: (4×15) + (6×25) = 60 + 150 = R$210. Quantidade total: 10 kg. Preço médio: 210/10 = R$21/kg. Não é R$20 (média simples).'
        },
        {
          q: 'Na proporção a/b = c/d, qual é a propriedade fundamental?',
          options: [
            'a + d = b + c',
            'a × d = b × c (produto dos extremos = produto dos meios)',
            'a - b = c - d',
            'a/c = d/b'
          ],
          answer: 1,
          explanation: 'A propriedade fundamental da proporção: produto dos extremos = produto dos meios. a×d = b×c. Permite isolar a incógnita em qualquer regra de três.'
        }
      ]
    }
  ]
};
