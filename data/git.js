window.GIT_DATA = {
  id: 'git',
  name: 'Git & DevOps',
  icon: '🌿',
  color: '#f05032',
  gradient: 'linear-gradient(135deg, #f05032, #c13f24)',
  topics: [
    {
      id: 'git-basics',
      title: 'Git — Fundamentos Essenciais',
      xp: 15,
      lesson: {
        title: 'Git — O que todo dev precisa saber',
        theory: `Git é <strong>obrigatório para qualquer vaga de desenvolvimento</strong>. É o sistema de controle de versão mais usado no mundo.

Conceitos fundamentais:
• <strong>Working directory</strong> — seus arquivos locais
• <strong>Staging area (index)</strong> — o que vai no próximo commit
• <strong>Commit</strong> — snapshot do projeto
• <strong>Branch</strong> — linha de desenvolvimento independente
• <strong>Remote</strong> — repositório no servidor (GitHub, GitLab)

Os 4 estados de um arquivo:
<code>Untracked → Staged → Committed → Modified</code>`,
        examples: [
          {
            title: 'Comandos do dia a dia',
            code: `# ═══ CONFIGURAÇÃO INICIAL ═══
git config --global user.name "Seu Nome"
git config --global user.email "email@exemplo.com"
git config --global core.editor "code --wait"  # VS Code

# ═══ FLUXO BÁSICO ═══
git init                      # inicializa repositório
git clone https://url.git     # clona repositório remoto

git status                    # mostra estado dos arquivos
git diff                      # o que mudou (não staged)
git diff --staged             # o que vai entrar no commit

git add arquivo.js            # adiciona arquivo específico
git add src/                  # adiciona pasta inteira
git add .                     # adiciona tudo (cuidado!)
git add -p                    # adiciona interativamente (por hunk)

git commit -m "feat: adicionar quiz de Python"
git commit --amend            # modifica o ÚLTIMO commit (não publicado!)

git push origin main          # envia para o remoto
git push -u origin feature    # push + configura upstream
git pull origin main          # baixa + merge
git fetch origin              # baixa sem fazer merge

# ═══ DESFAZER MUDANÇAS ═══
git restore arquivo.js        # desfaz mudança local (antes do add)
git restore --staged arquivo  # remove do staging (mantém mudança)
git revert abc123             # cria novo commit desfazendo o abc123 (SEGURO)
git reset --soft HEAD~1       # desfaz último commit, mantém staging
git reset --hard HEAD~1       # ⚠️ desfaz commit E mudanças (DESTRUTIVO)`,
            explanation: 'git revert é seguro para commits publicados — cria novo commit oposto. git reset --hard é destrutivo — use só em commits não publicados.'
          },
          {
            title: 'Branches — fluxo de trabalho',
            code: `# ═══ BRANCHES ═══
git branch                    # lista branches locais
git branch -a                 # lista todas (incluindo remotas)

git checkout -b feature/quiz  # cria e muda para nova branch
# ou (forma moderna):
git switch -c feature/quiz

git switch main               # volta para main
git merge feature/quiz        # merge da feature na branch atual

# Merge com mensagem (sem fast-forward)
git merge --no-ff feature/quiz -m "feat: adicionar quiz de Python"

# Deletar branch após merge
git branch -d feature/quiz    # local (só se já foi mergeada)
git push origin --delete feature/quiz  # remota

# ═══ VERIFICAR HISTÓRICO ═══
git log --oneline --graph --all  # grafo visual de branches
git log --oneline -10            # últimos 10 commits
git show abc123                  # detalhes de um commit
git blame arquivo.js             # quem mudou cada linha
git log --follow -p arquivo.js   # histórico completo de um arquivo

# ═══ STASH — guardar trabalho incompleto ═══
git stash                     # guarda mudanças em rascunho
git stash save "WIP: quiz modal"  # com descrição
git stash list                # lista stashes
git stash pop                 # aplica o último e remove
git stash apply stash@{1}     # aplica específico sem remover`,
            explanation: 'git stash é salva-vidas: guarda trabalho incompleto para trocar de branch sem commitar código quebrado.'
          },
          {
            title: 'Conventional Commits — padrão de mercado',
            code: `# Conventional Commits — padrão adotado por empresas sérias
# Formato: <tipo>(<escopo>): <descrição>

# TIPOS:
feat:     nova funcionalidade
fix:      correção de bug
docs:     documentação
style:    formatação (sem mudança de lógica)
refactor: refatoração (sem feat nem fix)
perf:     melhoria de performance
test:     adicionar/corrigir testes
build:    mudanças no build/deps
ci:       mudanças em CI/CD
chore:    manutenção (sem código de prod)
revert:   reverter commit anterior

# EXEMPLOS REAIS:
git commit -m "feat(quiz): adicionar timer por questão"
git commit -m "fix(auth): corrigir refresh token expirado"
git commit -m "refactor(service): extrair lógica de XP para PontuacaoService"
git commit -m "test(quiz): adicionar testes unitários do QuizService"
git commit -m "perf(lista): adicionar trackBy nas listas de perguntas"

# BREAKING CHANGE (mudança que quebra API):
git commit -m "feat(api)!: alterar formato de resposta do ranking

BREAKING CHANGE: campo 'pontos' renomeado para 'xp'"

# Por que usar?
# ✅ CHANGELOG gerado automaticamente
# ✅ Semantic versioning automático
# ✅ Histórico legível para o time
# ✅ Integração com ferramentas (commitlint, semantic-release)`,
            explanation: 'Conventional Commits é cobrado em entrevistas de empresas mais estruturadas. Ferramentas como commitlint validam automaticamente.'
          }
        ]
      },
      quiz: [
        {
          question: 'Qual a diferença entre git fetch e git pull?',
          options: [
            'São idênticos',
            'fetch baixa as mudanças mas não aplica; pull baixa E faz merge automaticamente',
            'pull baixa mas não aplica; fetch baixa e faz merge',
            'fetch só funciona com SSH; pull com HTTPS'
          ],
          answer: 1,
          explanation: 'fetch: baixa mudanças do remoto para inspecionar. pull = fetch + merge. Preferir fetch + merge manual dá mais controle.'
        },
        {
          question: 'Quando usar git revert em vez de git reset?',
          options: [
            'revert é mais rápido',
            'revert para commits JÁ publicados no remoto — cria novo commit sem reescrever histórico',
            'reset para commits publicados; revert para commits locais',
            'revert só funciona em branches protegidas'
          ],
          answer: 1,
          explanation: 'git reset reescreve histórico — perigoso em commits publicados pois afeta outros devs. revert preserva histórico criando commit inverso.'
        },
        {
          question: 'O que git add -p faz?',
          options: [
            'Adiciona arquivos por padrão (pattern)',
            'Adiciona interativamente por "hunk" (trecho de código), permitindo commitar apenas parte das mudanças',
            'Adiciona arquivos em modo paralelo',
            'Adiciona sem confirmação (--force)'
          ],
          answer: 1,
          explanation: 'add -p divide as mudanças em hunks para você escolher quais vão no commit. Permite commits atômicos mesmo com múltiplas mudanças no mesmo arquivo.'
        },
        {
          question: 'O que significa o tipo "feat!" em Conventional Commits?',
          options: [
            'Feature urgente',
            'Feature favorita',
            'Breaking Change — a API muda de forma incompatível',
            'Feature em fase de teste'
          ],
          answer: 2,
          explanation: 'O "!" após o tipo indica BREAKING CHANGE. Deve ser documentado em detalhes no corpo do commit para ferramentas como semantic-release incrementarem a versão major.'
        }
      ]
    },
    {
      id: 'git-rebase',
      title: 'Rebase, Merge e Resolução de Conflitos',
      xp: 25,
      lesson: {
        title: 'Rebase vs Merge — e como resolver conflitos',
        theory: `A diferença entre rebase e merge é uma das questões mais comuns em entrevistas sobre Git.

<strong>Merge</strong>:
• Preserva histórico exato com commit de merge
• Seguro para branches compartilhadas
• Histórico pode ficar "sujo" com muitos merge commits

<strong>Rebase</strong>:
• Reescreve commits sobre a branch alvo
• Histórico linear e limpo
• <strong>NUNCA fazer rebase de branch publicada/compartilhada</strong>`,
        examples: [
          {
            title: 'Merge vs Rebase na prática',
            code: `# ═══════════════════════════════════
#  CENÁRIO: feature branch com main atualizado
# ═══════════════════════════════════

# HISTÓRICO ANTES:
# main:    A - B - C
# feature:     B - D - E

# ════ MERGE ════
git switch main
git merge feature

# RESULTADO (histórico não-linear):
# main: A - B - C - M   (M = merge commit)
#                ↙
#           D - E

# ════ REBASE ════ (prefira para feature branches pessoais)
git switch feature
git rebase main    # reaplica D e E sobre C

# RESULTADO (histórico linear):
# main:    A - B - C
# feature: A - B - C - D' - E'  (D' e E' = commits reescritos)

# Depois do rebase, fast-forward merge no main:
git switch main
git merge feature  # fast-forward: sem merge commit

# RESULTADO FINAL:
# main: A - B - C - D' - E'  (histórico linear!)

# ════ REBASE INTERATIVO — limpar commits antes do PR ════
git rebase -i HEAD~3  # edita os últimos 3 commits
# Opções:
# pick   → mantém o commit
# squash → une com o commit anterior (limpa commits de WIP)
# reword → muda a mensagem
# drop   → remove o commit`,
            explanation: 'Regra de ouro: rebase só em branches que só você usa. Rebase interativo (squash) antes de abrir PR — mantém histórico limpo.'
          },
          {
            title: 'Resolução de conflitos passo a passo',
            code: `# ═══ CONFLITO — acontece quando as mesmas linhas foram editadas ═══

git merge feature/login
# Auto-merging src/auth.service.ts
# CONFLICT (content): Merge conflict in src/auth.service.ts
# Automatic merge failed; fix conflicts and then commit the result.

# ARQUIVO COM CONFLITO:
# <<<<<<< HEAD (sua versão — branch atual)
# const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });
# =======
# const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '24h' });
# >>>>>>> feature/login (versão que vem do merge)

# RESOLVER: escolher, combinar ou reescrever
# Resultado final (combinação lógica):
const token = jwt.sign(
  { id: user.id, email: user.email },
  SECRET,
  { expiresIn: '24h' }    // manteve prazo maior + email
);

# APÓS RESOLVER:
git add src/auth.service.ts  # marca como resolvido
git merge --continue         # continua o merge
# OU: git commit (para merge) / git rebase --continue (para rebase)

# FERRAMENTAS VISUAIS:
git mergetool               # abre ferramenta configurada
# VS Code: abre com botões "Accept Current / Incoming / Both"

# ABORTAR se complicar demais:
git merge --abort
git rebase --abort`,
            explanation: '<<<< HEAD = sua versão. ==== = separador. >>>> branch = versão do merge. Decida o que manter, remova os marcadores e faça add + commit.'
          },
          {
            title: 'GitFlow e estratégias de branching',
            code: `# ════ GITFLOW — padrão enterprise ════
#
# main (produção)
#   └── develop (integração)
#         ├── feature/xyz     (nova funcionalidade)
#         ├── release/1.2.0   (preparação de release)
#         └── hotfix/bug-123  (correção urgente em prod)

# Feature nova:
git switch develop
git switch -c feature/adicionar-quiz-angular
# ... desenvolve ...
git switch develop
git merge --no-ff feature/adicionar-quiz-angular
git branch -d feature/adicionar-quiz-angular

# Release:
git switch -c release/1.2.0 develop
# ... ajustes finais, versionamento ...
git switch main && git merge --no-ff release/1.2.0 && git tag v1.2.0
git switch develop && git merge --no-ff release/1.2.0
git branch -d release/1.2.0

# ════ TRUNK-BASED — padrão de startups/DevOps avançado ════
# Uma só branch (main/trunk)
# Features protegidas por feature flags
# Deploy contínuo: todo commit na main → produção

# Vantagem: sem conflitos de long-lived branches
# Requisito: CI/CD sólido + feature flags

# ════ GITHUB FLOW — mais simples ════
# main (sempre deployable)
#   └── feature/xyz → PR → review → merge → deploy`,
            explanation: 'GitFlow: mais controle, mais burocracia. Trunk-based: mais ágil, exige maturidade de CI/CD. GitHub Flow: equilíbrio ideal para maioria das equipes.'
          }
        ]
      },
      quiz: [
        {
          question: 'Por que NUNCA fazer rebase em branch compartilhada/publicada?',
          options: [
            'Rebase é mais lento que merge',
            'Rebase reescreve o histórico — outros devs com a branch local terão conflitos impossíveis de resolver',
            'O GitHub não suporta rebase',
            'Rebase não funciona em branches remotas'
          ],
          answer: 1,
          explanation: 'Rebase cria novos commits (D\'E\' em vez de DE). Quem tem os commits originais DE terá divergência irreconciliável com os novos D\'E\'.'
        },
        {
          question: 'O que git rebase -i HEAD~3 permite fazer?',
          options: [
            'Sincronizar com os 3 remotos configurados',
            'Editar, reordenar, unir (squash) ou remover os últimos 3 commits interativamente',
            'Reverter os últimos 3 commits',
            'Criar 3 branches a partir dos últimos commits'
          ],
          answer: 1,
          explanation: 'Rebase interativo é usado antes de PR: squash para limpar commits de WIP, reword para melhorar mensagens. Não use em commits publicados.'
        },
        {
          question: 'O que significa <<<<<<< HEAD no arquivo com conflito?',
          options: [
            'O início do arquivo',
            'A versão do commit mais recente do remoto',
            'A versão da branch ATUAL (onde você está) antes do separador =======',
            'Um erro de sintaxe do Git'
          ],
          answer: 2,
          explanation: '<<<HEAD...===: sua versão. ===...>>>branch: versão que chegou. Você decide o que fica, remove os marcadores e resolve o conflito.'
        },
        {
          question: 'Qual estratégia de branching usa feature flags e deploy contínuo?',
          options: [
            'GitFlow',
            'GitHub Flow',
            'Trunk-based Development',
            'Feature Branch Workflow'
          ],
          answer: 2,
          explanation: 'Trunk-based: todo commit vai direto para main e está pronto para produção. Features incompletas ficam desabilitadas por feature flags.'
        }
      ]
    },
    {
      id: 'git-cicd',
      title: 'CI/CD com GitHub Actions',
      xp: 25,
      lesson: {
        title: 'CI/CD — Integração e Entrega Contínua',
        theory: `CI/CD é fundamental no mercado. Todo projeto sério tem pipeline automatizado.

<strong>CI (Continuous Integration)</strong>:
• Executar testes a cada push
• Análise de código (linting, SonarQube)
• Build e verificação

<strong>CD (Continuous Delivery/Deployment)</strong>:
• Deploy automático em staging
• Deploy em produção (com aprovação ou automático)

<strong>GitHub Actions</strong> é o padrão mais usado — gratuito para repos públicos.`,
        examples: [
          {
            title: 'GitHub Actions — pipeline Angular',
            code: `# .github/workflows/angular-ci.yml
name: Angular CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  # ════ JOB 1: Lint e Testes ════
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Instalar dependências
        run: npm ci  # ci é mais rápido e determinístico que npm install

      - name: Lint
        run: npm run lint

      - name: Testes unitários
        run: npm run test -- --no-watch --code-coverage

      - name: Publicar relatório de cobertura
        uses: codecov/codecov-action@v4
        with:
          file: coverage/lcov.info

  # ════ JOB 2: Build de produção ════
  build:
    needs: test  # só roda se test passar
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run build -- --configuration=production

      - name: Deploy no GitHub Pages
        if: github.ref == 'refs/heads/main'  # só na main
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist/app/browser`,
            explanation: 'needs: test faz o job build esperar test passar. if: github.ref filtra por branch. secrets.GITHUB_TOKEN é automático no GitHub Actions.'
          },
          {
            title: 'GitHub Actions — pipeline Spring Boot',
            code: `# .github/workflows/spring-ci.yml
name: Spring Boot CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:          # banco de dados para testes de integração
        image: postgres:16
        env:
          POSTGRES_DB: devquest_test
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4

      - name: Setup Java 21
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
          cache: maven

      - name: Executar testes
        run: ./mvnw verify
        env:
          SPRING_DATASOURCE_URL: jdbc:postgresql://localhost:5432/devquest_test
          SPRING_DATASOURCE_USERNAME: test
          SPRING_DATASOURCE_PASSWORD: test

      - name: Build Docker image
        if: github.ref == 'refs/heads/main'
        run: |
          docker build -t devquest-api:${{ github.sha }} .
          echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u "${{ secrets.DOCKER_USERNAME }}" --password-stdin
          docker push devquest-api:${{ github.sha }}`,
            explanation: 'services: inicia containers Docker durante o job (PostgreSQL para testes de integração). Cache do Maven acelera builds subsequentes.'
          }
        ]
      },
      quiz: [
        {
          question: 'O que significa "CI" em CI/CD?',
          options: [
            'Container Integration',
            'Continuous Integration — integrar e testar código automaticamente a cada push',
            'Code Inspection',
            'Cloud Infrastructure'
          ],
          answer: 1,
          explanation: 'CI garante que o código integrado não quebra o sistema. Cada PR passa por testes automáticos antes de ser mergeado.'
        },
        {
          question: 'O que "needs: test" faz em um workflow GitHub Actions?',
          options: [
            'O job vai precisar executar os testes',
            'O job só executa se o job "test" completar com sucesso',
            'O job compartilha o ambiente com "test"',
            'O job ignora falhas em "test"'
          ],
          answer: 1,
          explanation: 'needs cria dependência entre jobs. O build não roda se os testes falharem — garante que só código testado seja buildado/deployado.'
        },
        {
          question: 'Por que usar npm ci em vez de npm install no CI?',
          options: [
            'npm ci é mais novo',
            'npm ci instala exatamente o package-lock.json sem modificá-lo — determinístico e mais rápido',
            'npm install não funciona no Ubuntu',
            'npm ci usa menos memória'
          ],
          answer: 1,
          explanation: 'npm ci: instalação limpa e determinística usando package-lock.json. npm install pode atualizar dependências — comportamento imprevisível em CI.'
        },
        {
          question: 'O que if: github.ref == "refs/heads/main" faz em um step?',
          options: [
            'Executa o step em todas as branches menos a main',
            'Executa o step APENAS quando o evento for na branch main',
            'Verifica se o commit foi feito por um maintainer',
            'Executa o step em todos os pull requests'
          ],
          answer: 1,
          explanation: 'Condicional de branch: deploy para produção só quando merge na main. PRs executam testes mas não fazem deploy.'
        }
      ]
    }
  ]
};
