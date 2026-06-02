window.SQL_DATA = {
  id: 'sql',
  name: 'SQL',
  icon: '🗄️',
  color: '#336791',
  gradient: 'linear-gradient(135deg, #336791, #0064a5)',
  topics: [
    {
      id: 'sql-select',
      title: 'SELECT — Consultas Básicas',
      xp: 10,
      lesson: {
        title: 'Fundamentos do SELECT',
        theory: `SQL é a linguagem mais exigida em vagas de analista de dados, desenvolvedor backend e cientista de dados. <strong>Toda entrevista técnica tem SQL.</strong>

Ordem de execução (diferente da escrita!):
1. <strong>FROM</strong> — qual tabela
2. <strong>WHERE</strong> — filtrar linhas
3. <strong>GROUP BY</strong> — agrupar
4. <strong>HAVING</strong> — filtrar grupos
5. <strong>SELECT</strong> — quais colunas
6. <strong>ORDER BY</strong> — ordenar
7. <strong>LIMIT</strong> — quantas linhas

Bancos mais usados no mercado:
• PostgreSQL (open source, mais completo)
• MySQL/MariaDB (web, muito popular)
• SQL Server (Microsoft, empresas grandes)
• SQLite (mobile, testes locais)
• BigQuery/Redshift/Snowflake (cloud analytics)`,
        examples: [
          {
            title: 'SELECT completo — todas as cláusulas',
            code: `-- Estrutura completa de um SELECT
SELECT
    c.nome,
    c.cidade,
    COUNT(p.id)          AS total_pedidos,
    SUM(p.valor)         AS receita_total,
    AVG(p.valor)         AS ticket_medio,
    MAX(p.data_pedido)   AS ultimo_pedido
FROM clientes c                         -- FROM + alias
INNER JOIN pedidos p ON c.id = p.cliente_id -- JOIN
WHERE
    c.ativo = TRUE                      -- filtro linha
    AND p.data_pedido >= '2024-01-01'   -- filtro data
    AND c.cidade IN ('São Paulo', 'RJ') -- filtro lista
GROUP BY
    c.nome, c.cidade                    -- agrupa
HAVING
    SUM(p.valor) > 1000                 -- filtro sobre agregados
ORDER BY
    receita_total DESC                  -- ordena
LIMIT 10;                               -- primeiros 10

-- Funções de agregação:
-- COUNT(*) → conta linhas (inclui NULL)
-- COUNT(col) → conta não-nulos
-- SUM(col) → soma
-- AVG(col) → média
-- MIN / MAX → mínimo / máximo`,
            explanation: 'HAVING filtra após GROUP BY (como WHERE para grupos). Aliases (AS) tornam o resultado mais legível.'
          },
          {
            title: 'Filtros avançados — WHERE completo',
            code: `-- ═══ OPERADORES DE FILTRO ═══

-- Comparação
SELECT * FROM produtos WHERE preco > 100;
SELECT * FROM produtos WHERE preco BETWEEN 50 AND 200;

-- Texto
SELECT * FROM clientes WHERE nome LIKE 'Ana%';    -- começa com Ana
SELECT * FROM clientes WHERE nome LIKE '%Silva%'; -- contém Silva
SELECT * FROM clientes WHERE email ILIKE '%@gmail%'; -- case-insensitive (PG)

-- Lista
SELECT * FROM pedidos WHERE status IN ('pendente', 'processando');
SELECT * FROM pedidos WHERE status NOT IN ('cancelado', 'devolvido');

-- NULL (NUNCA use = NULL)
SELECT * FROM clientes WHERE telefone IS NULL;
SELECT * FROM clientes WHERE telefone IS NOT NULL;

-- Data
SELECT * FROM pedidos
WHERE data_pedido >= CURRENT_DATE - INTERVAL '30 days'; -- PostgreSQL
-- MySQL: WHERE data_pedido >= DATE_SUB(NOW(), INTERVAL 30 DAY)
-- SQL Server: WHERE data_pedido >= DATEADD(day, -30, GETDATE())

-- Múltiplas condições (precedência: NOT > AND > OR)
SELECT * FROM produtos
WHERE
    (categoria = 'Eletrônicos' OR categoria = 'Informática')
    AND preco < 2000
    AND estoque > 0;`,
            explanation: 'LIKE usa % para qualquer sequência e _ para um caractere. IS NULL/IS NOT NULL — nunca use = NULL (sempre retorna false).'
          },
          {
            title: 'Subqueries e CTEs — consultas avançadas',
            code: `-- ═══ SUBQUERY (consulta dentro de consulta) ═══

-- Clientes que fizeram pedido acima da média
SELECT nome, cidade
FROM clientes
WHERE id IN (
    SELECT DISTINCT cliente_id
    FROM pedidos
    WHERE valor > (SELECT AVG(valor) FROM pedidos)
);

-- ═══ CTE (Common Table Expression) ═══
-- Mais legível que subquery, pode referenciar N vezes
WITH
    vendas_mensais AS (
        SELECT
            DATE_TRUNC('month', data_pedido) AS mes,
            SUM(valor) AS total
        FROM pedidos
        WHERE data_pedido >= '2024-01-01'
        GROUP BY 1
    ),
    media_mensal AS (
        SELECT AVG(total) AS media FROM vendas_mensais
    )
SELECT
    vm.mes,
    vm.total,
    mm.media,
    ROUND((vm.total - mm.media) / mm.media * 100, 2) AS variacao_pct
FROM vendas_mensais vm
CROSS JOIN media_mensal mm
ORDER BY vm.mes;

-- ═══ WINDOW FUNCTION ═══ (entrevistas sênior!)
SELECT
    nome,
    departamento,
    salario,
    AVG(salario) OVER (PARTITION BY departamento) AS media_depto,
    RANK() OVER (PARTITION BY departamento ORDER BY salario DESC) AS rank_depto
FROM funcionarios;`,
            explanation: 'CTEs (WITH) tornam queries complexas legíveis. Window Functions (OVER PARTITION BY) calculam agregados sem colapsar linhas — diferencial em entrevistas.'
          }
        ]
      },
      quiz: [
        {
          question: 'Qual a ordem CORRETA de execução do SQL?',
          options: [
            'SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY',
            'FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY',
            'FROM → SELECT → WHERE → GROUP BY → ORDER BY',
            'WHERE → FROM → SELECT → GROUP BY → HAVING'
          ],
          answer: 1,
          explanation: 'FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. Por isso não pode usar alias do SELECT no WHERE.'
        },
        {
          question: 'Qual a diferença entre WHERE e HAVING?',
          options: [
            'São sinônimos — mesma função',
            'WHERE filtra linhas antes do GROUP BY; HAVING filtra grupos depois do GROUP BY',
            'HAVING é mais rápido que WHERE',
            'WHERE funciona só com texto; HAVING com números'
          ],
          answer: 1,
          explanation: 'WHERE não pode usar funções de agregação (SUM, COUNT). HAVING sim — filtra os resultados do GROUP BY.'
        },
        {
          question: 'Por que usar IS NULL em vez de = NULL?',
          options: [
            'É apenas uma convenção de estilo',
            'NULL = NULL retorna UNKNOWN (não TRUE) em SQL — IS NULL é o único jeito correto',
            'Para compatibilidade com versões antigas',
            '= NULL funciona no MySQL mas não no PostgreSQL'
          ],
          answer: 1,
          explanation: 'NULL representa "desconhecido". NULL = NULL é UNKNOWN, não TRUE. IS NULL / IS NOT NULL são as formas corretas.'
        },
        {
          question: 'Qual a vantagem de CTE (WITH) sobre subquery?',
          options: [
            'CTEs são sempre mais rápidas',
            'CTEs podem ser referenciadas múltiplas vezes e tornam a query mais legível',
            'CTEs funcionam só no PostgreSQL',
            'CTEs permitem modificar dados (UPDATE/INSERT)'
          ],
          answer: 1,
          explanation: 'CTEs nomeiam partes da query — mais legível e reutilizável. CTEs recursivas também permitem hierarquias (árvore de categorias).'
        }
      ]
    },
    {
      id: 'sql-joins',
      title: 'JOINs — Relacionar Tabelas',
      xp: 20,
      lesson: {
        title: 'JOINs — O Coração do SQL',
        theory: `JOINs são a operação mais importante do SQL. <strong>Toda entrevista técnica tem questão de JOIN.</strong>

Tipos de JOIN:
• <strong>INNER JOIN</strong> — só correspondências
• <strong>LEFT JOIN</strong> — todos da esquerda + correspondências
• <strong>RIGHT JOIN</strong> — todos da direita + correspondências
• <strong>FULL OUTER JOIN</strong> — todos de ambos
• <strong>CROSS JOIN</strong> — produto cartesiano
• <strong>SELF JOIN</strong> — tabela com ela mesma`,
        examples: [
          {
            title: 'Tipos de JOIN visualizados',
            code: `-- Tabela: clientes (10 registros)
-- Tabela: pedidos (15 registros, alguns clientes sem pedido)

-- ══════════════════════════════════════════
-- INNER JOIN — só quem tem pedido (interseção)
-- ══════════════════════════════════════════
SELECT c.nome, p.valor, p.data_pedido
FROM clientes c
INNER JOIN pedidos p ON c.id = p.cliente_id;
-- Resultado: só clientes COM pedidos

-- ══════════════════════════════════════════
-- LEFT JOIN — todos os clientes (com ou sem pedido)
-- ══════════════════════════════════════════
SELECT
    c.nome,
    COUNT(p.id)  AS total_pedidos,
    COALESCE(SUM(p.valor), 0) AS receita   -- COALESCE: NULL → 0
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id
GROUP BY c.id, c.nome
ORDER BY total_pedidos DESC;

-- ══════════════════════════════════════════
-- LEFT JOIN com filtro de NULL — clientes SEM pedido
-- ══════════════════════════════════════════
SELECT c.nome, c.email
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id
WHERE p.id IS NULL;   -- NULL no lado direito = sem match

-- ══════════════════════════════════════════
-- FULL OUTER JOIN — todos de ambos
-- ══════════════════════════════════════════
SELECT
    c.nome   AS cliente,
    p.valor  AS pedido
FROM clientes c
FULL OUTER JOIN pedidos p ON c.id = p.cliente_id;
-- Inclui clientes sem pedido E pedidos sem cliente (dados sujos)`,
            explanation: 'LEFT JOIN com WHERE right.id IS NULL = clientes sem pedido. Padrão para encontrar registros órfãos.'
          },
          {
            title: 'JOINs múltiplos e SELF JOIN',
            code: `-- JOIN com 3+ tabelas (padrão em sistemas reais)
SELECT
    p.id           AS pedido_id,
    c.nome         AS cliente,
    pr.nome        AS produto,
    ip.quantidade,
    ip.preco_unit,
    ip.quantidade * ip.preco_unit AS subtotal,
    v.nome         AS vendedor,
    r.nome         AS regiao
FROM pedidos p
INNER JOIN clientes c  ON p.cliente_id  = c.id
INNER JOIN vendedores v ON p.vendedor_id = v.id
INNER JOIN regioes r   ON v.regiao_id   = r.id
INNER JOIN itens_pedido ip ON p.id     = ip.pedido_id
INNER JOIN produtos pr ON ip.produto_id = pr.id
WHERE p.data_pedido BETWEEN '2024-01-01' AND '2024-12-31'
ORDER BY subtotal DESC;

-- SELF JOIN — funcionário com seu gerente
SELECT
    f.nome       AS funcionario,
    g.nome       AS gerente,
    f.salario
FROM funcionarios f
LEFT JOIN funcionarios g ON f.gerente_id = g.id  -- mesma tabela!
ORDER BY f.nome;

-- Hierarquia completa com CTE recursiva
WITH RECURSIVE hierarquia AS (
    SELECT id, nome, gerente_id, 0 AS nivel
    FROM funcionarios WHERE gerente_id IS NULL  -- CEO (raiz)
    UNION ALL
    SELECT f.id, f.nome, f.gerente_id, h.nivel + 1
    FROM funcionarios f
    JOIN hierarquia h ON f.gerente_id = h.id
)
SELECT nivel, REPEAT('  ', nivel) || nome AS arvore
FROM hierarquia ORDER BY nivel, nome;`,
            explanation: 'SELF JOIN: tabela se relaciona com ela mesma. CTE recursiva percorre hierarquias (org chart, categorias de produtos).'
          }
        ]
      },
      quiz: [
        {
          question: 'Qual JOIN retorna TODOS os registros da tabela esquerda, mesmo sem correspondência?',
          options: ['INNER JOIN', 'RIGHT JOIN', 'LEFT JOIN', 'FULL JOIN'],
          answer: 2,
          explanation: 'LEFT JOIN retorna todos da tabela à esquerda. Onde não há correspondência na direita, as colunas ficam NULL.'
        },
        {
          question: 'Como encontrar clientes que NUNCA fizeram pedido usando JOIN?',
          options: [
            'INNER JOIN onde pedidos.valor = 0',
            'LEFT JOIN pedidos + WHERE pedidos.id IS NULL',
            'NOT IN (SELECT cliente_id FROM pedidos)',
            'As opções B e C estão corretas'
          ],
          answer: 3,
          explanation: 'Ambas funcionam. LEFT JOIN + IS NULL costuma ser mais eficiente. NOT EXISTS também é uma opção válida.'
        },
        {
          question: 'Para que serve COALESCE(coluna, 0)?',
          options: [
            'Conta valores nulos',
            'Substitui NULL pelo valor alternativo (0 neste caso)',
            'Verifica se a coluna existe',
            'Converte texto para número'
          ],
          answer: 1,
          explanation: 'COALESCE retorna o primeiro valor não-nulo. COALESCE(SUM(valor), 0) retorna 0 quando o SUM é NULL (sem linhas).'
        },
        {
          question: 'O que é um SELF JOIN?',
          options: [
            'JOIN de uma tabela consigo mesma',
            'JOIN sem condição ON',
            'JOIN que usa o mesmo índice',
            'JOIN entre tabelas de bancos diferentes'
          ],
          answer: 0,
          explanation: 'SELF JOIN: mesma tabela com dois aliases diferentes. Usado para hierarquias (funcionário-gerente) e comparações de linhas.'
        }
      ]
    },
    {
      id: 'sql-window',
      title: 'Window Functions (Analíticas)',
      xp: 30,
      lesson: {
        title: 'Window Functions — Diferencial em Entrevistas',
        theory: `Window Functions são o recurso SQL mais avançado cobrado em entrevistas para analista sênior e cientista de dados.

Diferença crucial:
• <strong>GROUP BY + agregação</strong> — colapsa as linhas em grupos
• <strong>Window Function (OVER)</strong> — calcula agregado <em>mantendo todas as linhas</em>

Funções principais:
• <code>ROW_NUMBER()</code> — número sequencial único
• <code>RANK()</code> / <code>DENSE_RANK()</code> — ranking com empates
• <code>LAG() / LEAD()</code> — valor da linha anterior/seguinte
• <code>SUM() OVER</code> / <code>AVG() OVER</code> — acumulado / média móvel`,
        examples: [
          {
            title: 'Ranking e numeração de linhas',
            code: `-- ═══ ROW_NUMBER, RANK, DENSE_RANK ═══
SELECT
    nome,
    departamento,
    salario,
    ROW_NUMBER() OVER (
        PARTITION BY departamento   -- reinicia por departamento
        ORDER BY salario DESC       -- ordenação
    ) AS posicao_unica,             -- sempre 1, 2, 3... (nunca repete)

    RANK() OVER (
        PARTITION BY departamento
        ORDER BY salario DESC
    ) AS rank_com_gap,              -- empate: 1, 2, 2, 4 (pula o 3)

    DENSE_RANK() OVER (
        PARTITION BY departamento
        ORDER BY salario DESC
    ) AS rank_sem_gap               -- empate: 1, 2, 2, 3 (não pula)
FROM funcionarios;

-- CASO REAL: Top 3 produtos por categoria
WITH ranking AS (
    SELECT
        produto,
        categoria,
        SUM(valor) AS receita,
        DENSE_RANK() OVER (
            PARTITION BY categoria
            ORDER BY SUM(valor) DESC
        ) AS rank
    FROM vendas
    GROUP BY produto, categoria
)
SELECT * FROM ranking WHERE rank <= 3;`,
            explanation: 'ROW_NUMBER nunca empata. RANK pula posições após empate. DENSE_RANK não pula. PARTITION BY define o escopo do ranking.'
          },
          {
            title: 'LAG/LEAD — comparar com período anterior',
            code: `-- ═══ LAG e LEAD — linha anterior/seguinte ═══

-- Receita mensal com variação vs mês anterior
SELECT
    mes,
    receita,
    LAG(receita, 1) OVER (ORDER BY mes) AS receita_mes_anterior,

    ROUND(
        (receita - LAG(receita) OVER (ORDER BY mes))
        / LAG(receita) OVER (ORDER BY mes) * 100, 2
    ) AS crescimento_pct

FROM (
    SELECT
        DATE_TRUNC('month', data_pedido) AS mes,
        SUM(valor) AS receita
    FROM pedidos
    GROUP BY 1
) vendas_mensais
ORDER BY mes;

-- LEAD: ver o próximo período
SELECT
    mes,
    receita,
    LEAD(receita, 1, 0) OVER (ORDER BY mes) AS receita_proximo_mes
FROM vendas_mensais;

-- ═══ Acumulado (Running Total) ═══
SELECT
    data,
    valor,
    SUM(valor) OVER (ORDER BY data) AS acumulado_total,

    -- Acumulado por vendedor
    SUM(valor) OVER (
        PARTITION BY vendedor_id
        ORDER BY data
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS acumulado_por_vendedor
FROM vendas;`,
            explanation: 'LAG(col, N) pega o valor N linhas atrás. ROWS BETWEEN define a janela: UNBOUNDED PRECEDING = do início, CURRENT ROW = até aqui.'
          },
          {
            title: 'Média móvel e percentil',
            code: `-- ═══ MÉDIA MÓVEL (7 dias) ═══
SELECT
    data,
    receita_diaria,
    ROUND(AVG(receita_diaria) OVER (
        ORDER BY data
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW  -- últimos 7 dias
    ), 2) AS media_movel_7d,

    ROUND(AVG(receita_diaria) OVER (
        ORDER BY data
        ROWS BETWEEN 29 PRECEDING AND CURRENT ROW  -- 30 dias
    ), 2) AS media_movel_30d
FROM receitas_diarias;

-- ═══ PERCENTIL e NTILE ═══
SELECT
    cliente_id,
    total_gasto,
    -- Dividir em 4 grupos (quartis)
    NTILE(4) OVER (ORDER BY total_gasto DESC) AS quartil,

    -- Percentil exato (0.0 a 1.0)
    PERCENT_RANK() OVER (ORDER BY total_gasto) AS percentil
FROM (
    SELECT cliente_id, SUM(valor) AS total_gasto
    FROM pedidos GROUP BY 1
) gastos;
-- quartil=1 = top 25%, quartil=4 = bottom 25%

-- ═══ FIRST_VALUE / LAST_VALUE ═══
SELECT
    produto, mes, receita,
    FIRST_VALUE(receita) OVER (
        PARTITION BY produto ORDER BY mes
    ) AS receita_primeiro_mes,
    MAX(receita) OVER (PARTITION BY produto) AS melhor_mes
FROM receitas_produto;`,
            explanation: 'ROWS BETWEEN define a janela deslizante. NTILE(4) segmenta em quartis. FIRST_VALUE pega o 1º valor da partição — útil para crescimento vs baseline.'
          }
        ]
      },
      quiz: [
        {
          question: 'Qual a diferença entre GROUP BY e Window Functions?',
          options: [
            'Window Functions são mais lentas',
            'GROUP BY colapsa linhas em grupos; OVER mantém todas as linhas com valor calculado',
            'GROUP BY é padrão SQL; Window Functions só no PostgreSQL',
            'São equivalentes com resultados diferentes'
          ],
          answer: 1,
          explanation: 'GROUP BY: 100 linhas → 10 grupos → 10 linhas. OVER: 100 linhas → 100 linhas + coluna calculada.'
        },
        {
          question: 'O que LAG(receita, 1) retorna para a primeira linha?',
          options: [
            'Zero (0)',
            'NULL — não há linha anterior',
            'A última linha da partição',
            'Um erro de SQL'
          ],
          answer: 1,
          explanation: 'A primeira linha não tem linha anterior, então LAG retorna NULL. Use LAG(col, 1, 0) para retornar 0 em vez de NULL.'
        },
        {
          question: 'O que ROWS BETWEEN 6 PRECEDING AND CURRENT ROW define?',
          options: [
            'Exclui as 6 linhas anteriores',
            'Uma janela das 6 linhas anteriores até a linha atual (7 linhas totais)',
            'As próximas 6 linhas',
            'O intervalo de 6 dias anteriores em datas'
          ],
          answer: 1,
          explanation: '6 PRECEDING + CURRENT ROW = janela de 7 linhas. Usado para média móvel de 7 dias: AVG() OVER (...ROWS BETWEEN 6 PRECEDING AND CURRENT ROW).'
        },
        {
          question: 'O que NTILE(4) faz?',
          options: [
            'Calcula o 4º percentil',
            'Divide as linhas em 4 grupos de tamanho igual (quartis)',
            'Retorna o 4º elemento da partição',
            'Agrupa em até 4 grupos distintos'
          ],
          answer: 1,
          explanation: 'NTILE(n) divide em n buckets iguais. NTILE(4) cria quartis. NTILE(100) cria percentis. Ótimo para segmentação de clientes (RFM).'
        }
      ]
    },
    {
      id: 'sql-performance',
      title: 'Performance e Boas Práticas',
      xp: 25,
      lesson: {
        title: 'SQL de Alta Performance',
        theory: `Escrever SQL correto é o básico. Escrever SQL <strong>eficiente</strong> é o que separa analistas sêniores.

Causas comuns de lentidão:
• <code>SELECT *</code> — busca todas as colunas desnecessariamente
• Funções em colunas do WHERE — impede uso de índice
• JOINs sem índice nas colunas de ligação
• Subqueries dentro de loops
• Falta de índice nas colunas mais filtradas

Ferramentas:
• <code>EXPLAIN ANALYZE</code> — plano de execução (PostgreSQL)
• <code>EXPLAIN</code> — MySQL/SQL Server`,
        examples: [
          {
            title: 'Índices — o recurso mais importante',
            code: `-- ═══ ÍNDICES ═══

-- SEM índice: full table scan (lê tudo)
-- COM índice: leitura direta (muito mais rápido)

-- Criar índice em coluna frequentemente filtrada
CREATE INDEX idx_pedidos_data
    ON pedidos (data_pedido);

-- Índice composto — para filtros combinados
CREATE INDEX idx_pedidos_cliente_data
    ON pedidos (cliente_id, data_pedido);

-- Índice parcial — só parte da tabela (mais leve)
CREATE INDEX idx_pedidos_pendentes
    ON pedidos (data_pedido)
    WHERE status = 'pendente';

-- ✅ Usa o índice
SELECT * FROM pedidos WHERE data_pedido = '2024-01-15';
SELECT * FROM pedidos WHERE cliente_id = 5 AND data_pedido > '2024-01-01';

-- ❌ NÃO usa o índice (função aplicada na coluna)
SELECT * FROM pedidos WHERE DATE(data_pedido) = '2024-01-15';
SELECT * FROM pedidos WHERE UPPER(status) = 'PENDENTE';
SELECT * FROM pedidos WHERE data_pedido + 1 > CURRENT_DATE;

-- ✅ Versão corrigida (sem função na coluna indexada)
SELECT * FROM pedidos
WHERE data_pedido >= '2024-01-15' AND data_pedido < '2024-01-16';

-- Ver índices existentes (PostgreSQL)
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'pedidos';`,
            explanation: 'Nunca aplique funções na coluna indexada do WHERE — invalida o índice. Reescreva a condição para manter a coluna "limpa".'
          },
          {
            title: 'EXPLAIN ANALYZE — entender o plano',
            code: `-- EXPLAIN mostra como o banco executará a query
-- ANALYZE executa e mostra tempos reais (PostgreSQL)

EXPLAIN ANALYZE
SELECT c.nome, SUM(p.valor) AS total
FROM clientes c
INNER JOIN pedidos p ON c.id = p.cliente_id
WHERE p.data_pedido >= '2024-01-01'
GROUP BY c.id, c.nome
ORDER BY total DESC
LIMIT 10;

/* Saída (simplificada):
   Limit (cost=450.0 rows=10) (actual time=25.3 ms)
     Sort (cost=445.0 rows=100) (actual time=25.2 ms)
       HashAggregate (actual time=24.1 ms)
         Hash Join (actual time=5.1 ms)
           → Seq Scan on pedidos (cost=0.0)   ← RUIM: full scan!
           → Index Scan on clientes (cost=0.0) ← BOM: usa índice
   Planning time: 2.1 ms
   Execution time: 25.5 ms
*/

-- "Seq Scan" = lendo tudo (problema em tabelas grandes)
-- "Index Scan" = usando índice (eficiente)
-- "Hash Join" = OK para tabelas médias
-- "Nested Loop" = cuidado — pode ser lento com tabelas grandes

-- SOLUÇÃO: criar índice na coluna usada no WHERE
CREATE INDEX idx_pedidos_data ON pedidos(data_pedido);
-- Depois: Seq Scan vira Index Scan → query 10x mais rápida`,
            explanation: 'EXPLAIN ANALYZE é a ferramenta mais importante para otimizar SQL. Procure por Seq Scan em tabelas grandes.'
          },
          {
            title: 'Boas práticas e padrões de mercado',
            code: `-- ═══ BOAS PRÁTICAS SQL DE MERCADO ═══

-- ✅ 1. SELECT específico, nunca SELECT *
SELECT id, nome, email FROM clientes;  -- não SELECT *

-- ✅ 2. Use aliases descritivos
SELECT
    c.nome         AS nome_cliente,
    SUM(p.valor)   AS receita_total,
    COUNT(p.id)    AS qtd_pedidos
FROM clientes c
JOIN pedidos p ON c.id = p.cliente_id
GROUP BY c.id, c.nome;

-- ✅ 3. CTEs para queries complexas (legibilidade)
WITH clientes_ativos AS (
    SELECT id, nome FROM clientes WHERE ativo = TRUE
),
top_compradores AS (
    SELECT cliente_id, SUM(valor) AS total
    FROM pedidos WHERE data_pedido >= '2024-01-01'
    GROUP BY cliente_id
    HAVING SUM(valor) > 5000
)
SELECT ca.nome, tc.total
FROM clientes_ativos ca
JOIN top_compradores tc ON ca.id = tc.cliente_id;

-- ✅ 4. LIMIT para exploração (nunca rode sem LIMIT em prod)
SELECT * FROM logs ORDER BY criado_em DESC LIMIT 100;

-- ✅ 5. Transações para múltiplas operações
BEGIN;
    UPDATE estoque SET qtd = qtd - 5 WHERE produto_id = 1;
    INSERT INTO movimentacoes (produto_id, tipo, qtd) VALUES (1, 'saida', 5);
COMMIT;  -- ou ROLLBACK se algo falhar

-- ✅ 6. Comentários em queries complexas
-- Clientes com mais de 3 pedidos no último trimestre
-- excluindo plano gratuito (segmento = 'free')`,
            explanation: 'Transações garantem consistência: ou tudo acontece, ou nada (ACID). Sem transação, atualizar estoque e registrar movimento podem ficar inconsistentes.'
          }
        ]
      },
      quiz: [
        {
          question: 'Por que aplicar função em coluna indexada no WHERE é problemático?',
          options: [
            'Causa erro de sintaxe',
            'Invalida o índice — o banco faz Seq Scan na tabela inteira',
            'Retorna resultados incorretos',
            'Funciona apenas com índices compostos'
          ],
          answer: 1,
          explanation: 'WHERE DATE(data) = x: o banco precisa chamar DATE() em cada linha — não pode usar o índice. Reescreva como BETWEEN/>=/<.'
        },
        {
          question: 'O que "Seq Scan" no EXPLAIN indica?',
          options: [
            'A query usou um índice de sequência',
            'O banco leu a tabela inteira linha por linha — pode ser lento em tabelas grandes',
            'A query está corretamente otimizada',
            'Uma operação de ordenação'
          ],
          answer: 1,
          explanation: 'Seq Scan em tabela grande = alerta vermelho. Criar índice na coluna do WHERE transforma em Index Scan.'
        },
        {
          question: 'Para que serve uma transação (BEGIN/COMMIT)?',
          options: [
            'Para executar múltiplas queries mais rápido',
            'Para garantir que múltiplas operações sejam atômicas — ou tudo ocorre ou nada',
            'Para criar um lock exclusivo na tabela',
            'Para fazer backup automático'
          ],
          answer: 1,
          explanation: 'Atomicidade (ACID): debitar conta A e creditar conta B deve ser atômico. Se a 2ª operação falhar, a 1ª deve ser revertida (ROLLBACK).'
        },
        {
          question: 'Qual índice faz mais sentido para a query: WHERE cliente_id = 5 AND data >= "2024"?',
          options: [
            'Índice simples em cliente_id',
            'Índice simples em data',
            'Índice composto em (cliente_id, data)',
            'Nenhum índice — a query já é rápida'
          ],
          answer: 2,
          explanation: 'Índice composto (cliente_id, data) cobre ambos os filtros. A ordem importa: coluna de igualdade primeiro, depois range.'
        }
      ]
    },
    {
      id: 'sql-job',
      title: 'SQL para Entrevistas de Emprego',
      xp: 35,
      lesson: {
        title: 'Problemas Reais de Entrevista SQL',
        theory: `Essas são as categorias de perguntas SQL mais cobradas em entrevistas para <strong>analista de dados, engenheiro de dados e desenvolvedor backend</strong>.

Categorias de perguntas:
• <strong>Duplicatas</strong> — encontrar e remover
• <strong>N-ésimo maior valor</strong> — ranking
• <strong>Sessões/Gaps</strong> — análise de eventos consecutivos
• <strong>Cohort</strong> — análise de retenção
• <strong>Pivot dinâmico</strong> — transformar linhas em colunas

Dica de entrevista: sempre <strong>pense em voz alta</strong>, use CTE para organizar seu raciocínio e mencione indexação.`,
        examples: [
          {
            title: 'Perguntas clássicas resolvidas',
            code: `-- ═══ 1. SEGUNDO MAIOR SALÁRIO ═══
-- (pergunta mais comum de entrevista!)

-- Solução com DENSE_RANK (mais robusta)
SELECT salario
FROM (
    SELECT salario,
           DENSE_RANK() OVER (ORDER BY salario DESC) AS rank
    FROM funcionarios
) ranked
WHERE rank = 2;

-- Solução com subquery
SELECT MAX(salario)
FROM funcionarios
WHERE salario < (SELECT MAX(salario) FROM funcionarios);

-- ═══ 2. DUPLICATAS — encontrar e remover ═══

-- Encontrar emails duplicados
SELECT email, COUNT(*) AS ocorrencias
FROM clientes
GROUP BY email
HAVING COUNT(*) > 1;

-- Manter apenas 1 registro de cada duplicata (menor ID)
DELETE FROM clientes
WHERE id NOT IN (
    SELECT MIN(id)
    FROM clientes
    GROUP BY email
);

-- ═══ 3. CLIENTES QUE COMPRARAM EM TODOS OS MESES ═══
SELECT cliente_id
FROM pedidos
WHERE EXTRACT(YEAR FROM data_pedido) = 2024
GROUP BY cliente_id
HAVING COUNT(DISTINCT EXTRACT(MONTH FROM data_pedido)) = 12;`,
            explanation: 'DENSE_RANK é mais robusta que subquery para n-ésimo elemento. DELETE com NOT IN(SELECT MIN...) preserva um registro por grupo.'
          },
          {
            title: 'Análise de cohort e retenção',
            code: `-- ═══ ANÁLISE DE COHORT — retenção de usuários ═══
-- "Dos usuários que se cadastraram em Jan/2024,
--  quantos compraram nos meses seguintes?"

WITH primeiro_pedido AS (
    -- Mês em que cada cliente fez seu 1º pedido
    SELECT
        cliente_id,
        DATE_TRUNC('month', MIN(data_pedido)) AS cohort_mes
    FROM pedidos
    GROUP BY cliente_id
),
atividade AS (
    -- Todos os meses em que cada cliente comprou
    SELECT DISTINCT
        cliente_id,
        DATE_TRUNC('month', data_pedido) AS mes_ativo
    FROM pedidos
),
retencao AS (
    SELECT
        pp.cohort_mes,
        -- Quantos meses depois do cohort
        EXTRACT(MONTH FROM AGE(a.mes_ativo, pp.cohort_mes)) AS meses_depois,
        COUNT(DISTINCT a.cliente_id) AS clientes_ativos
    FROM primeiro_pedido pp
    JOIN atividade a ON pp.cliente_id = a.cliente_id
    WHERE a.mes_ativo >= pp.cohort_mes
    GROUP BY 1, 2
)
SELECT
    TO_CHAR(cohort_mes, 'Mon/YY') AS cohort,
    meses_depois,
    clientes_ativos,
    ROUND(100.0 * clientes_ativos / FIRST_VALUE(clientes_ativos)
        OVER (PARTITION BY cohort_mes ORDER BY meses_depois), 1
    ) AS retencao_pct
FROM retencao
ORDER BY cohort_mes, meses_depois;`,
            explanation: 'Cohort analysis mede retenção: dos clientes do mês 0, quantos ainda compraram no mês 1, 2, 3? Essencial para SaaS e e-commerce.'
          },
          {
            title: 'Pivot dinâmico e casos avançados',
            code: `-- ═══ PIVOT — linhas em colunas ═══
-- Receita por linguagem e trimestre em colunas

-- PostgreSQL / ANSI SQL (sem PIVOT nativo)
SELECT
    produto,
    SUM(CASE WHEN trimestre = 'Q1' THEN valor END) AS Q1,
    SUM(CASE WHEN trimestre = 'Q2' THEN valor END) AS Q2,
    SUM(CASE WHEN trimestre = 'Q3' THEN valor END) AS Q3,
    SUM(CASE WHEN trimestre = 'Q4' THEN valor END) AS Q4,
    SUM(valor) AS total_ano
FROM (
    SELECT
        produto,
        valor,
        'Q' || EXTRACT(QUARTER FROM data_pedido) AS trimestre
    FROM vendas
    WHERE EXTRACT(YEAR FROM data_pedido) = 2024
) base
GROUP BY produto
ORDER BY total_ano DESC;

-- ═══ RUNNING BALANCE — saldo atual de conta ═══
SELECT
    data,
    tipo,
    valor,
    SUM(
        CASE tipo WHEN 'entrada' THEN valor ELSE -valor END
    ) OVER (ORDER BY data ROWS UNBOUNDED PRECEDING) AS saldo_atual
FROM movimentacoes
WHERE conta_id = 42
ORDER BY data;

-- ═══ IDENTIFICAR SEQUÊNCIAS CONSECUTIVAS ═══
-- Dias consecutivos com pedidos
SELECT
    MIN(data_pedido) AS inicio,
    MAX(data_pedido) AS fim,
    COUNT(*) AS dias_consecutivos
FROM (
    SELECT
        data_pedido,
        data_pedido - INTERVAL '1 day' * ROW_NUMBER()
            OVER (ORDER BY data_pedido) AS grupo
    FROM (SELECT DISTINCT data_pedido FROM pedidos) d
) grupos
GROUP BY grupo
ORDER BY dias_consecutivos DESC;`,
            explanation: 'PIVOT com CASE WHEN é a forma universal (todos os bancos). Saldo corrente com SUM OVER é clássico em sistemas financeiros.'
          }
        ]
      },
      quiz: [
        {
          question: 'Como encontrar o 2º maior salário de forma robusta?',
          options: [
            'SELECT MAX(salario) - 1',
            'DENSE_RANK() OVER (ORDER BY salario DESC) = 2',
            'ORDER BY salario DESC LIMIT 1 OFFSET 1',
            'As opções B e C funcionam, mas DENSE_RANK é mais robusta'
          ],
          answer: 3,
          explanation: 'LIMIT 1 OFFSET 1 funciona mas retorna linha, não apenas salário. DENSE_RANK lida melhor com empates. Ambas são válidas em entrevista.'
        },
        {
          question: 'Como fazer PIVOT (linhas em colunas) em SQL padrão?',
          options: [
            'Usar a cláusula PIVOT',
            'SUM(CASE WHEN coluna = "valor" THEN metrica END) para cada coluna desejada',
            'Usar TRANSPOSE()',
            'GROUP BY com ROLLUP'
          ],
          answer: 1,
          explanation: 'SUM(CASE WHEN ...) é o pivot universal — funciona em todos os bancos. SQL Server e BigQuery têm PIVOT nativo, mas CASE WHEN é portátil.'
        },
        {
          question: 'O que análise de cohort mede?',
          options: [
            'Performance de queries no banco de dados',
            'Retenção: de um grupo de usuários que iniciou no mesmo período, quantos permanecem ativos ao longo do tempo',
            'Contagem de usuários por categoria',
            'Crescimento absoluto de usuários por mês'
          ],
          answer: 1,
          explanation: 'Cohort = grupo que compartilha evento inicial (cadastro, 1ª compra). Acompanhar esse grupo revela retenção real, não crescimento que mascara churn.'
        },
        {
          question: 'Em entrevista de SQL, qual a melhor abordagem para query complexa?',
          options: [
            'Escrever tudo de uma vez',
            'Usar subqueries aninhadas profundas',
            'Usar CTEs para decompor o problema em partes legíveis e pensar em voz alta',
            'Memorizar a resposta pronta'
          ],
          answer: 2,
          explanation: 'Entrevistadores avaliam raciocínio, não memorização. CTEs mostram organização de pensamento. Pensar em voz alta demonstra processo.'
        }
      ]
    }
  ]
};
