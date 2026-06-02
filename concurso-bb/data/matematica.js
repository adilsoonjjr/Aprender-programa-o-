window.MATEMATICA_DATA = {
  id: 'matematica',
  name: 'Matemática',
  icon: '🔢',
  color: '#10b981',
  description: 'Raciocínio lógico, porcentagem e juros',
  topics: [
    {
      id: 'porcentagem',
      title: 'Porcentagem',
      xp: 30,
      theory: `<p><strong>Porcentagem</strong> (%) representa uma fração de 100. É amplamente usada no sistema financeiro e nas provas do BB.</p>
<h3>Fórmulas Fundamentais</h3>
<ul>
  <li><strong>Valor da porcentagem:</strong> V = (P% × Total) / 100</li>
  <li><strong>Taxa percentual:</strong> P% = (Parte / Total) × 100</li>
  <li><strong>Total a partir da parte:</strong> Total = (Parte × 100) / P%</li>
</ul>
<h3>Aumentos e Descontos</h3>
<ul>
  <li><strong>Aumento de x%:</strong> multiplica por (1 + x/100)<br><em>Ex: aumento de 20% → multiplica por 1,20</em></li>
  <li><strong>Desconto de x%:</strong> multiplica por (1 − x/100)<br><em>Ex: desconto de 15% → multiplica por 0,85</em></li>
</ul>
<h3>Aumentos e Descontos Sucessivos</h3>
<p>Para calcular o efeito combinado: multiplique os fatores.</p>
<p><em>Aumento de 10% e depois 10%: 1,10 × 1,10 = 1,21 → aumento total de 21% (não 20%!)</em></p>`,
      examples: [
        {
          header: 'Resolução de problemas de porcentagem',
          code: `Problema: O salário de um funcionário do BB é R$ 4.000.
Ele recebeu aumento de 15%. Qual o novo salário?

Fator de aumento: 1 + 15/100 = 1,15
Novo salário: R$ 4.000 × 1,15 = R$ 4.600

---

Problema: Um produto custava R$ 500 e sofreu
desconto de 20%. Quanto custa agora?

Fator de desconto: 1 - 20/100 = 0,80
Novo preço: R$ 500 × 0,80 = R$ 400

---

Aumentos sucessivos de 10% e 20%:
Fator: 1,10 × 1,20 = 1,32 → aumento total de 32%`,
          explanation: `<p>Use sempre o <strong>fator multiplicador</strong> para calcular aumento/desconto. Isso agiliza o cálculo e evita erros, especialmente em aumentos/descontos sucessivos.</p>`
        }
      ],
      questions: [
        {
          q: 'Um gerente do BB ganha R$ 5.000 e terá aumento de 12%. Qual será seu novo salário?',
          options: ['R$ 5.060', 'R$ 5.600', 'R$ 5.120', 'R$ 5.500'],
          answer: 1,
          explanation: 'Fator de aumento: 1 + 12/100 = 1,12. Novo salário: R$ 5.000 × 1,12 = R$ 5.600.'
        },
        {
          q: 'Um produto foi reduzido de R$ 800 para R$ 680. Qual foi o percentual de desconto?',
          options: ['12%', '13%', '15%', '17%'],
          answer: 2,
          explanation: 'Desconto = R$ 800 − R$ 680 = R$ 120. Percentual = (120/800) × 100 = 15%.'
        },
        {
          q: 'Um preço sofreu aumento de 10% e depois desconto de 10%. O preço final em relação ao original é:',
          options: ['Igual ao original', '1% menor que o original', '2% maior que o original', '1% maior que o original'],
          answer: 1,
          explanation: 'Fatores: 1,10 × 0,90 = 0,99. O preço final é 99% do original, ou seja, 1% menor. Aumentos e descontos iguais não se cancelam!'
        },
        {
          q: 'Se 30% de um valor é R$ 120, qual é o valor total?',
          options: ['R$ 360', 'R$ 400', 'R$ 420', 'R$ 500'],
          answer: 1,
          explanation: 'Total = (Parte × 100) / P% = (120 × 100) / 30 = 12.000 / 30 = R$ 400.'
        },
        {
          q: 'Uma agência bateu 75% da sua meta de R$ 80.000. Quanto foi arrecadado?',
          options: ['R$ 54.000', 'R$ 56.000', 'R$ 60.000', 'R$ 64.000'],
          answer: 2,
          explanation: 'Valor = (75 × 80.000) / 100 = 6.000.000 / 100 = R$ 60.000.'
        }
      ]
    },
    {
      id: 'juros',
      title: 'Juros Simples e Compostos',
      xp: 40,
      theory: `<p><strong>Juros</strong> são a remuneração pelo uso do capital. No sistema financeiro, dominam a prova do BB.</p>
<h3>Juros Simples</h3>
<p>Os juros incidem apenas sobre o capital inicial.</p>
<ul>
  <li><strong>J = C × i × t</strong></li>
  <li><strong>M = C + J = C × (1 + i × t)</strong></li>
</ul>
<p>Onde: J = juros, C = capital, i = taxa (em decimal), t = tempo, M = montante</p>
<h3>Juros Compostos</h3>
<p>Os juros incidem sobre o montante acumulado (juros sobre juros).</p>
<ul>
  <li><strong>M = C × (1 + i)ᵗ</strong></li>
  <li><strong>J = M − C</strong></li>
</ul>
<h3>Comparação</h3>
<p>Para o mesmo capital, taxa e tempo, juros compostos sempre geram montante maior que juros simples (exceto em t=1, onde são iguais).</p>`,
      examples: [
        {
          header: 'Cálculo de juros simples e compostos',
          code: `JUROS SIMPLES:
Capital: R$ 2.000 | Taxa: 3% a.m. | Tempo: 4 meses

J = 2.000 × 0,03 × 4 = R$ 240
M = 2.000 + 240 = R$ 2.240

---

JUROS COMPOSTOS:
Capital: R$ 2.000 | Taxa: 3% a.m. | Tempo: 4 meses

M = 2.000 × (1,03)⁴
(1,03)⁴ = 1,1255...
M = 2.000 × 1,1255 ≈ R$ 2.251,02

Diferença: R$ 2.251,02 - R$ 2.240 = R$ 11,02 a mais`,
          explanation: `<p>Nos <strong>juros compostos</strong>, a diferença cresce exponencialmente com o tempo. Por isso são usados em investimentos e financiamentos de longo prazo.</p>`
        }
      ],
      questions: [
        {
          q: 'Aplicando R$ 3.000 a juros simples de 2% ao mês por 6 meses, qual o montante?',
          options: ['R$ 3.360', 'R$ 3.420', 'R$ 3.500', 'R$ 3.600'],
          answer: 0,
          explanation: 'J = 3.000 × 0,02 × 6 = R$ 360. M = 3.000 + 360 = R$ 3.360.'
        },
        {
          q: 'Qual a diferença básica entre juros simples e compostos?',
          options: ['Os juros simples são ilegais no Brasil', 'Nos juros compostos, os juros incidem sobre o montante acumulado (juros sobre juros)', 'Os juros simples são sempre maiores', 'Não há diferença para períodos curtos'],
          answer: 1,
          explanation: 'Nos juros compostos (regime exponencial), a cada período os juros são calculados sobre o montante total, incluindo juros anteriores. Nos simples, sempre sobre o capital inicial.'
        },
        {
          q: 'A fórmula do montante em juros compostos é:',
          options: ['M = C + J × t', 'M = C × (1 + i × t)', 'M = C × (1 + i)ᵗ', 'M = C / (1 + i)ᵗ'],
          answer: 2,
          explanation: 'M = C × (1 + i)ᵗ é a fórmula dos juros compostos, onde C é o capital, i é a taxa decimal e t é o número de períodos.'
        },
        {
          q: 'R$ 1.000 aplicados a 10% a.a. em juros simples por 2 anos rendem:',
          options: ['R$ 100', 'R$ 200', 'R$ 210', 'R$ 220'],
          answer: 1,
          explanation: 'J = C × i × t = 1.000 × 0,10 × 2 = R$ 200. (Nos compostos seria: 1.000 × 1,10² - 1.000 = R$ 210)'
        },
        {
          q: 'Qual a taxa mensal correspondente a 12% ao ano em juros simples?',
          options: ['1% ao mês', '1,2% ao mês', '0,8% ao mês', '2% ao mês'],
          answer: 0,
          explanation: 'Em juros simples, a taxa é proporcional: 12% a.a. ÷ 12 meses = 1% a.m. (Em juros compostos, a relação seria diferente: taxa equivalente).'
        }
      ]
    },
    {
      id: 'logica',
      title: 'Raciocínio Lógico',
      xp: 35,
      theory: `<p>O <strong>raciocínio lógico</strong> avalia a capacidade de dedução, análise de sequências e resolução de problemas estruturados. É matéria essencial no concurso BB.</p>
<h3>Proposições Lógicas</h3>
<ul>
  <li><strong>Negação (~p):</strong> inverte o valor lógico</li>
  <li><strong>Conjunção (p ∧ q):</strong> "p E q" — verdadeira só quando ambas são verdadeiras</li>
  <li><strong>Disjunção (p ∨ q):</strong> "p OU q" — falsa só quando ambas são falsas</li>
  <li><strong>Condicional (p → q):</strong> "se p então q" — falsa apenas quando p é V e q é F</li>
  <li><strong>Bicondicional (p ↔ q):</strong> "p se e somente se q" — verdadeira quando têm mesmo valor</li>
</ul>
<h3>Equivalências Importantes</h3>
<ul>
  <li>Negação da condicional: ~(p → q) ≡ p ∧ ~q</li>
  <li>Contrapositiva: (p → q) ≡ (~q → ~p)</li>
  <li>De Morgan: ~(p ∧ q) ≡ ~p ∨ ~q | ~(p ∨ q) ≡ ~p ∧ ~q</li>
</ul>`,
      examples: [
        {
          header: 'Tabela verdade da condicional',
          code: `p → q: "Se estudo, então passo no concurso"

p (estudo) | q (passo) | p → q
    V      |     V     |   V    ← estudei e passei ✓
    V      |     F     |   F    ← estudei mas não passei ✗
    F      |     V     |   V    ← não estudei mas passei ✓
    F      |     F     |   V    ← não estudei e não passei ✓

A condicional só é FALSA quando a hipótese (p)
é verdadeira e a conclusão (q) é falsa.`,
          explanation: `<p>A condicional é o conectivo mais cobrado. Lembre: só é falsa quando "se" é verdadeiro e "então" é falso — como uma promessa quebrada.</p>`
        }
      ],
      questions: [
        {
          q: 'A proposição "p → q" (se p então q) é FALSA apenas quando:',
          options: ['p é falso e q é verdadeiro', 'p é verdadeiro e q é verdadeiro', 'p é verdadeiro e q é falso', 'p é falso e q é falso'],
          answer: 2,
          explanation: 'A condicional p → q é falsa somente quando a hipótese (p) é verdadeira e a conclusão (q) é falsa. Nos demais casos, é verdadeira.'
        },
        {
          q: 'A negação de "Todos os candidatos passaram" é:',
          options: ['Nenhum candidato passou', 'Alguns candidatos não passaram', 'A maioria dos candidatos não passou', 'Poucos candidatos passaram'],
          answer: 1,
          explanation: 'A negação de "todos são P" é "existe pelo menos um que não é P", ou seja, "algum candidato não passou / pelo menos um não passou".'
        },
        {
          q: 'Pela Lei de De Morgan, ~(p ∧ q) é equivalente a:',
          options: ['~p ∧ ~q', '~p ∨ ~q', 'p ∨ q', 'p ∧ q'],
          answer: 1,
          explanation: 'Lei de De Morgan: a negação da conjunção é a disjunção das negações: ~(p ∧ q) ≡ ~p ∨ ~q. Analogamente: ~(p ∨ q) ≡ ~p ∧ ~q.'
        },
        {
          q: 'A contrapositiva de "Se chove, então uso guarda-chuva" é:',
          options: ['Se não chove, então não uso guarda-chuva', 'Se uso guarda-chuva, então chove', 'Se não uso guarda-chuva, então não chove', 'Se não chove, então uso guarda-chuva'],
          answer: 2,
          explanation: 'A contrapositiva de (p → q) é (~q → ~p): invertem-se e negam-se hipótese e conclusão. "Se não uso guarda-chuva, então não chove."'
        },
        {
          q: 'A disjunção "p ∨ q" é FALSA somente quando:',
          options: ['p é verdadeiro e q é falso', 'p é falso e q é verdadeiro', 'ambos p e q são falsos', 'ambos p e q são verdadeiros'],
          answer: 2,
          explanation: 'A disjunção (OU) é verdadeira quando pelo menos um dos termos é verdadeiro. Só é falsa quando ambos são falsos.'
        }
      ]
    }
  ]
};
