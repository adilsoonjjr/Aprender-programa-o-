window.CONCEITOS_DATA = {
  id: 'conceitos',
  name: 'Conceitos Dev',
  icon: '🧠',
  color: '#8b5cf6',
  gradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
  topics: [
    {
      id: 'con-http',
      title: 'HTTP, REST e APIs',
      xp: 20,
      lesson: {
        title: 'HTTP — Como a Web Funciona',
        theory: `Todo desenvolvedor web precisa entender HTTP profundamente. <strong>É a base de toda comunicação frontend-backend.</strong>

HTTP é um protocolo stateless de requisição-resposta.

Componentes de uma requisição:
• <strong>Método</strong> — GET, POST, PUT, PATCH, DELETE…
• <strong>URL</strong> — endereço do recurso
• <strong>Headers</strong> — metadados (Content-Type, Authorization…)
• <strong>Body</strong> — dados (JSON, form-data…)

Componentes de uma resposta:
• <strong>Status Code</strong> — resultado (200, 201, 400, 401, 404, 500…)
• <strong>Headers</strong> — metadados da resposta
• <strong>Body</strong> — dados retornados`,
        examples: [
          {
            title: 'Status Codes — o que cada um significa',
            code: `# ════ STATUS CODES — decorar os principais ════

# ── 2xx SUCESSO ──────────────────────────────────
200 OK           → GET bem-sucedido, atualização bem-sucedida
201 Created      → POST criou recurso (+ Location header)
204 No Content   → DELETE / PUT sem body de resposta

# ── 3xx REDIRECIONAMENTO ─────────────────────────
301 Moved Permanently  → URL mudou para sempre (SEO)
302 Found              → Redirect temporário
304 Not Modified       → Cache válido (ETag/If-None-Match)

# ── 4xx ERRO DO CLIENTE ──────────────────────────
400 Bad Request        → Dados inválidos / malformados
401 Unauthorized       → Não autenticado (sem/token inválido)
403 Forbidden          → Autenticado mas sem permissão
404 Not Found          → Recurso não existe
405 Method Not Allowed → GET em endpoint que só aceita POST
409 Conflict           → Conflito (email já existe, versão)
422 Unprocessable      → Validação de negócio falhou
429 Too Many Requests  → Rate limit atingido

# ── 5xx ERRO DO SERVIDOR ─────────────────────────
500 Internal Server Error → Exceção não tratada
502 Bad Gateway           → Proxy não conseguiu conectar ao backend
503 Service Unavailable   → Servidor sobrecarregado/em manutenção
504 Gateway Timeout       → Proxy: backend demorou demais

# DIFERENÇA IMPORTANTE:
# 401 = "Quem é você?" (sem autenticação)
# 403 = "Sei quem você é, mas não pode!" (sem autorização)`,
            explanation: '401 vs 403 é pegadinha clássica de entrevista. 422 é mais específico que 400 — use para validações de negócio após sintaxe correta.'
          },
          {
            title: 'Headers HTTP essenciais',
            code: `# ════ HEADERS MAIS IMPORTANTES ════

# ── REQUISIÇÃO ──────────────────────────────────
Content-Type: application/json         # formato do body enviado
Accept: application/json               # formato aceito na resposta
Authorization: Bearer eyJhbGc...       # token JWT
Authorization: Basic dXNlcjpwYXNz     # basic auth (base64)
X-Request-ID: uuid-aqui                # rastreio de requisição
If-None-Match: "abc123"                # cache condicional (ETag)

# ── RESPOSTA ─────────────────────────────────────
Content-Type: application/json
Location: /api/usuarios/42             # onde está o recurso criado (201)
ETag: "abc123"                         # versão do recurso (cache)
Cache-Control: max-age=3600            # cachear por 1 hora
Cache-Control: no-cache, no-store      # nunca cachear
X-RateLimit-Remaining: 95             # requisições restantes

# ── CORS (Cross-Origin Resource Sharing) ─────────
# Browser bloqueia requisições de origens diferentes por segurança
# O servidor precisa liberar explicitamente

# Spring Boot:
@CrossOrigin(origins = "https://meusite.com")  # na controller
# OU global:
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer cors() {
        return registry -> registry.addMapping("/api/**")
            .allowedOrigins("https://meusite.com", "http://localhost:4200")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}

# Resposta do servidor com CORS:
# Access-Control-Allow-Origin: https://meusite.com
# Access-Control-Allow-Methods: GET, POST, PUT, DELETE
# Access-Control-Allow-Headers: Authorization, Content-Type`,
            explanation: 'CORS é configurado no servidor. O browser faz um preflight OPTIONS para verificar permissão antes da requisição real.'
          },
          {
            title: 'REST — Boas práticas de design de API',
            code: `# ════ REST API DESIGN — MELHORES PRÁTICAS ════

# URLs usam SUBSTANTIVOS, não verbos
# ❌  GET /getUsuarios   POST /criarPedido   DELETE /deletarItem/5
# ✅  GET /usuarios      POST /pedidos       DELETE /itens/5

# Hierarquia de recursos
GET    /usuarios                    # lista todos
POST   /usuarios                    # cria novo
GET    /usuarios/42                 # busca por ID
PUT    /usuarios/42                 # substitui completo
PATCH  /usuarios/42                 # atualiza parcial
DELETE /usuarios/42                 # remove

# Sub-recursos (relacionamentos)
GET    /usuarios/42/pedidos         # pedidos do usuário 42
POST   /usuarios/42/pedidos         # cria pedido para o usuário 42
GET    /usuarios/42/pedidos/7       # pedido específico do usuário

# Query params para filtros (não na URL!)
# ✅ GET /perguntas?linguagem=python&xp=10&page=0&size=20&sort=id,desc
# ❌ GET /perguntas/python/10  (mistura filtro com ID)

# Versionamento de API
GET /api/v1/usuarios   # via path (mais comum)
GET /api/v2/usuarios   # nova versão, sem quebrar clientes antigos
# OU: Accept: application/vnd.empresa.v2+json  (via header)

# Resposta padronizada
{
  "data": { "id": 42, "nome": "Adil" },  # sucesso
  "meta": { "total": 100, "page": 0 },    # paginação
  "links": {                               # HATEOAS (opcional)
    "self":  "/api/v1/usuarios/42",
    "pedidos": "/api/v1/usuarios/42/pedidos"
  }
}

# Erro padronizado
{
  "status": 400,
  "code": "VALIDATION_ERROR",
  "mensagem": "Dados inválidos",
  "campos": { "email": "Email inválido" },
  "traceId": "uuid-para-rastrear-no-log"
}`,
            explanation: 'URLs de substantivos + verbos HTTP = REST semântico. Versionamento via path é mais visível. traceId no erro facilita debugging em produção.'
          }
        ]
      },
      quiz: [
        {
          question: 'Qual a diferença entre 401 e 403?',
          options: [
            'São equivalentes — ambos indicam acesso negado',
            '401: não autenticado (quem é você?); 403: autenticado mas sem permissão',
            '401: erro de cliente; 403: erro de servidor',
            '401 é para REST; 403 é para GraphQL'
          ],
          answer: 1,
          explanation: '401 = sem token ou token inválido (não sei quem você é). 403 = sei quem você é, mas você não tem permissão para este recurso.'
        },
        {
          question: 'O que é CORS e onde é configurado?',
          options: [
            'Protocolo de compressão — configurado no cliente',
            'Política de segurança do browser que restringe requisições entre origens — configurado no servidor',
            'Sistema de cache HTTP — configurado no proxy',
            'Protocolo de autenticação — configurado no banco'
          ],
          answer: 1,
          explanation: 'Browser bloqueia por padrão. O servidor declara quais origens, métodos e headers são permitidos. O browser confia na resposta do servidor.'
        },
        {
          question: 'Por que usar PUT para substituição completa e PATCH para atualização parcial?',
          options: [
            'São idênticos — convenção sem diferença técnica',
            'Semântica REST: PUT envia o recurso COMPLETO substituindo tudo; PATCH envia apenas os CAMPOS alterados',
            'PUT é mais seguro por ser idempotente',
            'PATCH é mais novo que PUT'
          ],
          answer: 1,
          explanation: 'PUT: enviar tudo (campos não enviados podem ser zerados). PATCH: enviar só o que mudou. Ambos devem ser idempotentes: mesma chamada = mesmo resultado.'
        },
        {
          question: 'O que o header Location na resposta 201 indica?',
          options: [
            'A localização geográfica do servidor',
            'A URL do recurso recém-criado, permitindo ao cliente acessá-lo diretamente',
            'O endereço IP do cliente',
            'O próximo endpoint a ser chamado'
          ],
          answer: 1,
          explanation: 'Resposta 201 deve incluir Location: /api/recursos/42. O cliente sabe onde está o novo recurso sem precisar de outra requisição.'
        }
      ]
    },
    {
      id: 'con-auth',
      title: 'Autenticação: JWT, OAuth2 e Sessions',
      xp: 25,
      lesson: {
        title: 'Autenticação e Autorização na Prática',
        theory: `Autenticação (quem é você?) vs Autorização (o que pode fazer?) são conceitos distintos.

Estratégias mais usadas:
• <strong>Session/Cookie</strong> — estado no servidor, cookie no browser
• <strong>JWT</strong> — stateless, token no cliente
• <strong>OAuth2</strong> — delegação de autorização (Login com Google)
• <strong>API Key</strong> — para integrações servidor-servidor

Refresh Tokens:
O access token expira rápido (15min). O refresh token (7 dias) troca por novo access token sem re-login.`,
        examples: [
          {
            title: 'Fluxo JWT completo — Access + Refresh Token',
            code: `# FLUXO COMPLETO JWT:

# 1. Login
POST /api/auth/login
Body: { "email": "dev@exemplo.com", "senha": "senha123" }

Response 200:
{
  "accessToken":  "eyJ... (expira em 15 min)",
  "refreshToken": "eyJ... (expira em 7 dias, armazenado httpOnly cookie)",
  "tipo": "Bearer"
}

# 2. Usar o access token nas requisições
GET /api/usuarios/42
Headers:
  Authorization: Bearer eyJ...accessToken...

# 3. Quando o access token expira (401)
POST /api/auth/refresh
Headers: Cookie: refreshToken=eyJ...
# OU Body: { "refreshToken": "eyJ..." }

Response 200:
{ "accessToken": "eyJ...novo_access_token..." }

# 4. Logout — invalidar o refresh token
POST /api/auth/logout
# Servidor remove o refresh token do banco/redis

# ONDE ARMAZENAR TOKENS?
# localStorage:  ❌ vulnerável a XSS
# sessionStorage: ❌ vulnerável a XSS
# httpOnly Cookie: ✅ JS não consegue ler — seguro contra XSS
#   → Mas precisa de proteção CSRF

# MELHOR PRÁTICA:
# accessToken:  memória JavaScript (variável) — curta duração
# refreshToken: httpOnly Cookie — não acessível por JS`,
            explanation: 'Access token curto (15min) + refresh token em httpOnly cookie é o padrão de segurança. Nunca guarde tokens em localStorage.'
          },
          {
            title: 'OAuth2 — Login Social (Google, GitHub)',
            code: `# ════ OAUTH2 — AUTHORIZATION CODE FLOW ════
# (fluxo mais seguro para apps web)

# PASSO 1: Redirecionar para o provider
GET https://accounts.google.com/o/oauth2/auth?
  response_type=code
  &client_id=SEU_CLIENT_ID
  &redirect_uri=https://seuapp.com/callback
  &scope=openid email profile
  &state=csrf_token_aleatorio  # previne CSRF

# PASSO 2: Usuário autoriza → Google redireciona de volta
GET https://seuapp.com/callback?
  code=AUTHORIZATION_CODE
  &state=csrf_token_aleatorio

# PASSO 3: Backend troca code por token (servidor-servidor)
POST https://oauth2.googleapis.com/token
Body:
  code=AUTHORIZATION_CODE
  client_id=SEU_CLIENT_ID
  client_secret=SEU_SECRET  # NUNCA no frontend!
  redirect_uri=...
  grant_type=authorization_code

Response:
{
  "access_token": "ya29...",
  "id_token": "eyJ...",   # JWT com dados do usuário
  "expires_in": 3599
}

# PASSO 4: Buscar dados do usuário
GET https://www.googleapis.com/oauth2/v3/userinfo
Headers: Authorization: Bearer ya29...

Response: { "email": "user@gmail.com", "name": "...", "picture": "..." }

# Spring Boot: spring-boot-starter-oauth2-client
# Angular: @auth0/angular-jwt ou angular-oauth2-oidc`,
            explanation: 'Authorization Code Flow: code é usado UMA vez no servidor — nunca exposto no browser. client_secret fica só no backend.'
          },
          {
            title: 'Implementação Spring Security + JWT',
            code: `// SecurityConfig.java — configuração completa
@Configuration
@EnableWebSecurity
@EnableMethodSecurity  // habilita @PreAuthorize
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())  // desabilitado para API REST (stateless)
            .sessionManagement(s -> s.sessionCreationPolicy(STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/perguntas").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);  // strength 12 = ~250ms por hash
    }
}

// Usando @PreAuthorize — controle fino por método
@GetMapping("/admin/relatorio")
@PreAuthorize("hasRole('ADMIN') and #userId == authentication.principal.id")
public RelatorioDTO relatorio(@PathVariable Long userId) { ... }

// Acessar usuário logado em qualquer lugar
@GetMapping("/meu-perfil")
public PerfilDTO meuPerfil(Authentication auth) {
    UserDetails user = (UserDetails) auth.getPrincipal();
    return service.findByEmail(user.getUsername());
}`,
            explanation: 'STATELESS + JWT: o servidor não armazena sessão. @PreAuthorize é mais granular que requestMatchers — verifica permissões no nível do método.'
          }
        ]
      },
      quiz: [
        {
          question: 'Por que armazenar refreshToken em httpOnly Cookie em vez de localStorage?',
          options: [
            'httpOnly Cookie é mais rápido',
            'localStorage tem limite de 5MB; Cookie não',
            'httpOnly Cookie não é acessível por JavaScript — protege contra ataques XSS',
            'É obrigatório pelo padrão JWT'
          ],
          answer: 2,
          explanation: 'XSS pode roubar qualquer coisa em localStorage/sessionStorage. httpOnly Cookie é enviado automaticamente pelo browser mas JS não consegue ler.'
        },
        {
          question: 'No OAuth2, por que o client_secret nunca deve ir para o frontend?',
          options: [
            'O frontend não suporta strings longas',
            'client_secret é a senha do seu app — exposto no frontend, qualquer pessoa pode fazer requisições como seu app',
            'Por limitação técnica do OAuth2',
            'Apenas para apps mobile'
          ],
          answer: 1,
          explanation: 'O Authorization Code Flow troca o code por token no servidor (backend-to-backend). client_secret fica seguro no servidor, fora do alcance do browser.'
        },
        {
          question: 'O que BCryptPasswordEncoder(12) garante?',
          options: [
            'Senha com 12 caracteres mínimos',
            'Hash da senha com custo 12 — ~250ms para gerar, tornando brute force impraticável',
            'Criptografia AES-12',
            'Hash MD5 com 12 iterações'
          ],
          answer: 1,
          explanation: 'BCrypt é adaptativo: strength alto = mais lento = mais seguro. 12 é o equilíbrio padrão. NUNCA armazene senha em texto plano ou MD5/SHA1.'
        },
        {
          question: 'Por que desabilitar CSRF em APIs REST stateless com JWT?',
          options: [
            'CSRF não existe em APIs REST',
            'APIs stateless com JWT no header não usam cookies de sessão — CSRF não se aplica',
            'CSRF é uma vulnerabilidade obsoleta',
            'Spring Security não suporta CSRF com JWT'
          ],
          answer: 1,
          explanation: 'CSRF explora cookies automáticos. Com JWT no Authorization header (não cookie), o browser não envia automaticamente — ataque CSRF impossível.'
        }
      ]
    },
    {
      id: 'con-patterns',
      title: 'Design Patterns (GoF)',
      xp: 30,
      lesson: {
        title: 'Padrões de Design mais Usados no Mercado',
        theory: `Design Patterns são soluções recorrentes para problemas comuns. Os mais cobrados em entrevistas:

<strong>Criacionais</strong> — como criar objetos:
• <strong>Builder</strong> — construção passo a passo
• <strong>Factory Method</strong> — delegar criação

<strong>Estruturais</strong> — como combinar objetos:
• <strong>Adapter</strong> — traduz interfaces incompatíveis
• <strong>Decorator</strong> — adiciona comportamento dinamicamente

<strong>Comportamentais</strong> — como objetos colaboram:
• <strong>Strategy</strong> — algoritmos intercambiáveis
• <strong>Observer</strong> — notificação de eventos
• <strong>Chain of Responsibility</strong> — cadeia de handlers`,
        examples: [
          {
            title: 'Builder Pattern — Java e TypeScript',
            code: `// ════ BUILDER — construção complexa passo a passo ════

// JAVA (Lombok @Builder)
@Builder
@Data
public class Pergunta {
    private Long id;
    private String enunciado;
    private String resposta;
    private String linguagem;
    private int xp;
    private Dificuldade dificuldade;
}

// Uso:
Pergunta p = Pergunta.builder()
    .enunciado("O que é Spring Boot?")
    .resposta("Framework Java para APIs REST")
    .linguagem("spring")
    .xp(15)
    .dificuldade(Dificuldade.MEDIO)
    .build();

// TypeScript (manual — sem Lombok)
class QuizBuilder {
    private config: Partial<QuizConfig> = {};

    comLinguagem(lang: string): this {
        this.config.linguagem = lang;
        return this;  // method chaining
    }
    comTempo(segundos: number): this {
        this.config.tempoPorQuestao = segundos;
        return this;
    }
    comDificuldade(d: 'facil' | 'medio' | 'dificil'): this {
        this.config.dificuldade = d;
        return this;
    }
    build(): QuizConfig {
        if (!this.config.linguagem) throw new Error('Linguagem obrigatória');
        return this.config as QuizConfig;
    }
}

const quiz = new QuizBuilder()
    .comLinguagem('angular')
    .comTempo(30)
    .comDificuldade('medio')
    .build();`,
            explanation: 'Builder evita construtores com 10+ parâmetros (telescoping constructor). @Builder do Lombok gera automaticamente em Java.'
          },
          {
            title: 'Strategy Pattern — algoritmos intercambiáveis',
            code: `// ════ STRATEGY — troca de algoritmo em runtime ════
// Usado em: sistemas de pagamento, notificação, exportação

// Interface (contrato)
public interface NotificacaoStrategy {
    void enviar(String destinatario, String mensagem);
}

// Implementações concretas
@Component("emailStrategy")
public class EmailStrategy implements NotificacaoStrategy {
    public void enviar(String dest, String msg) {
        log.info("Email → {}: {}", dest, msg);
        // integração com SendGrid/SES
    }
}

@Component("smsStrategy")
public class SMSStrategy implements NotificacaoStrategy {
    public void enviar(String dest, String msg) {
        log.info("SMS → {}: {}", dest, msg);
        // integração com Twilio
    }
}

@Component("pushStrategy")
public class PushStrategy implements NotificacaoStrategy {
    public void enviar(String dest, String msg) {
        log.info("Push → {}: {}", dest, msg);
        // integração com Firebase FCM
    }
}

// Context: usa a estratégia sem conhecer a implementação
@Service
public class NotificacaoService {
    private final Map<String, NotificacaoStrategy> strategies;

    // Spring injeta todas as implementações automaticamente!
    public NotificacaoService(Map<String, NotificacaoStrategy> strategies) {
        this.strategies = strategies;
    }

    public void notificar(String tipo, String dest, String msg) {
        NotificacaoStrategy strategy = strategies.get(tipo + "Strategy");
        if (strategy == null) throw new IllegalArgumentException("Tipo inválido: " + tipo);
        strategy.enviar(dest, msg);
    }
}

// Uso:
notificacaoService.notificar("email", "dev@ex.com", "Novo quiz!");
notificacaoService.notificar("sms",  "+5511999",   "Quiz disponível");`,
            explanation: 'Spring injeta Map<String, Interface> automaticamente — cada bean pelo nome. Adicionar novo canal = apenas nova classe, sem mudar o Service.'
          },
          {
            title: 'Observer, Adapter e Chain of Responsibility',
            code: `// ════ OBSERVER — já vimos como ApplicationEvent ════
// Angular: Subject/Observable do RxJS
// Spring: ApplicationEventPublisher

// ════ ADAPTER ════
// Integrar sistema legado com nova interface

interface PagamentoGateway {
    PagamentoResult processar(PagamentoRequest req);
}

// API legada do Banco X (interface incompatível)
class BancoXAPI {
    public String cobrar(String cartao, double valor, int parcelas) { ... }
}

// Adapter: traduz a interface nova para a antiga
@Component
public class BancoXAdapter implements PagamentoGateway {
    private final BancoXAPI bancoX;

    public PagamentoResult processar(PagamentoRequest req) {
        // Traduz PagamentoRequest → parâmetros do BancoX
        String resultado = bancoX.cobrar(
            req.getNumeroCartao(),
            req.getValor(),
            req.getParcelas()
        );
        // Traduz resposta do BancoX → PagamentoResult
        return new PagamentoResult(resultado.equals("OK"), resultado);
    }
}

// ════ CHAIN OF RESPONSIBILITY ════
// Filtros HTTP, validações em cadeia, pipelines

// Spring já usa esse padrão em Filters/Interceptors:
// Request → Filter1 → Filter2 → Controller → Response

// Implementação manual:
public abstract class ValidacaoHandler {
    private ValidacaoHandler proximo;

    public ValidacaoHandler setProximo(ValidacaoHandler h) {
        this.proximo = h; return h;
    }

    public final boolean validar(PedidoDTO p) {
        if (!processar(p)) return false;  // falhou neste handler
        return proximo == null || proximo.validar(p);  // passa para o próximo
    }

    protected abstract boolean processar(PedidoDTO p);
}

// Cadeia: estoque → pagamento → fraude → aprovação
ValidacaoHandler cadeia = new ValidacaoEstoque();
cadeia.setProximo(new ValidacaoPagamento())
     .setProximo(new ValidacaoFraude())
     .setProximo(new AprovacaoFinal());`,
            explanation: 'Adapter: traduz interfaces sem mudar código legado. Chain of Responsibility: cada handler faz uma coisa — fácil de adicionar/remover passos.'
          }
        ]
      },
      quiz: [
        {
          question: 'Qual problema o Builder Pattern resolve?',
          options: [
            'Criação de instâncias únicas (singleton)',
            'Construtores com muitos parâmetros opcionais, tornando a criação legível e flexível',
            'Criação de objetos sem conhecer a classe concreta',
            'Herança múltipla em Java'
          ],
          answer: 1,
          explanation: 'new Usuario("Adil", null, null, null, null, "SP", true) vs Usuario.builder().nome("Adil").uf("SP").ativo(true).build() — legibilidade incomparável.'
        },
        {
          question: 'O que é o Strategy Pattern?',
          options: [
            'Define a estratégia de testes do projeto',
            'Encapsula algoritmos intercambiáveis em classes separadas, permitindo trocar em runtime',
            'Define a estratégia de deploy',
            'Padrão para criar objetos complexos'
          ],
          answer: 1,
          explanation: 'Strategy: interface define o contrato, implementações são os algoritmos. Contexto usa a interface — não sabe qual algoritmo está executando.'
        },
        {
          question: 'Quando usar o Adapter Pattern?',
          options: [
            'Para adaptar o design visual de componentes',
            'Para integrar interfaces incompatíveis — especialmente ao usar biblioteca de terceiros com interface diferente',
            'Para adaptar queries SQL',
            'Para converter JSON para XML'
          ],
          answer: 1,
          explanation: 'Adapter é o "tradutor": permite que classes com interfaces incompatíveis colaborem sem modificar nenhuma delas. Essencial em integrações com sistemas legados.'
        },
        {
          question: 'O Chain of Responsibility é usado implicitamente em qual recurso do Spring?',
          options: [
            '@Transactional',
            'Filters e Interceptors — cada um processa a requisição e passa para o próximo',
            'JPA Repositories',
            '@Scheduled'
          ],
          answer: 1,
          explanation: 'Spring Security Filter Chain é o exemplo mais claro: autenticação → autorização → logging → rate limit — cada Filter é um handler na cadeia.'
        }
      ]
    },
    {
      id: 'con-solid',
      title: 'SOLID e Clean Code',
      xp: 30,
      lesson: {
        title: 'SOLID — Os 5 Princípios de Design',
        theory: `SOLID é o conjunto de princípios mais cobrado em entrevistas de nível pleno/sênior.

• <strong>S</strong> — Single Responsibility Principle
• <strong>O</strong> — Open/Closed Principle
• <strong>L</strong> — Liskov Substitution Principle
• <strong>I</strong> — Interface Segregation Principle
• <strong>D</strong> — Dependency Inversion Principle

Junto com SOLID, Clean Code (Robert C. Martin) define como escrever código legível, manutenível e profissional.`,
        examples: [
          {
            title: 'S, O e L — com código real',
            code: `// ════ S — Single Responsibility ════
// ❌ Viola SRP: classe faz tudo
public class UserManager {
    public User buscar(Long id) { ... }
    public void salvar(User u) { ... }
    public void enviarEmail(User u) { ... }   // ← responsabilidade diferente
    public String gerarRelatorio(User u) { ... } // ← mais uma
}

// ✅ Respeita SRP: cada classe tem uma razão para mudar
public class UserService   { User buscar(Long id); void salvar(User u); }
public class EmailService  { void enviarBoasVindas(User u); }
public class UserReport    { String gerar(User u); }

// ════ O — Open/Closed ════
// ❌ Viola OCP: adicionar desconto = modificar código existente
public double calcularDesconto(Pedido p) {
    if (p.getTipo().equals("VIP"))      return p.getValor() * 0.20;
    if (p.getTipo().equals("PROMO"))    return p.getValor() * 0.10;
    // Toda vez que aparecer novo tipo → modificar aqui
    return 0;
}

// ✅ Respeita OCP: adicionar tipo = nova classe, sem modificar
public interface DescontoStrategy {
    double calcular(Pedido p);
    boolean aplica(Pedido p);
}

@Component public class DescontoVIP implements DescontoStrategy {
    public double calcular(Pedido p) { return p.getValor() * 0.20; }
    public boolean aplica(Pedido p)  { return "VIP".equals(p.getTipo()); }
}
// Para novo tipo: só criar nova classe DescontoPromo implements DescontoStrategy

// ════ L — Liskov Substitution ════
// Subclasses devem poder substituir a classe pai sem quebrar o sistema
// ❌ Viola LSP:
class Pato { void voar() { /* voa */ } }
class PatoDeBorracha extends Pato {
    void voar() { throw new UnsupportedOperationException(); } // ← quebra contrato!
}
// ✅ Solução: segregar a interface
interface Nadador { void nadar(); }
interface Voador  { void voar(); }
class Pato extends Animal implements Nadador, Voador { ... }
class PatoDeBorracha extends Animal implements Nadador { ... } // não implementa Voador`,
            explanation: 'LSP: se você substituir qualquer uso de Pato por PatoDeBorracha, o programa não pode quebrar. Exceções não-esperadas violam LSP.'
          },
          {
            title: 'I e D — Interface Segregation e Dependency Inversion',
            code: `// ════ I — Interface Segregation ════
// ❌ Interface gorda — força implementação de métodos irrelevantes
public interface Trabalhador {
    void trabalhar();
    void comer();   // Robôs não comem!
    void dormir();  // Robôs não dormem!
}

// ✅ Interfaces específicas
public interface Trabalhavel { void trabalhar(); }
public interface Alimentavel { void comer(); }
public interface Dormivel    { void dormir(); }

class Humano implements Trabalhavel, Alimentavel, Dormivel { ... }
class Robo   implements Trabalhavel { ... }  // só o que faz sentido

// ════ D — Dependency Inversion ════
// "Dependa de abstrações, não de implementações"

// ❌ Viola DIP: QuizService depende de MySQL diretamente
public class QuizService {
    private MySQLRepository repo = new MySQLRepository(); // implementação concreta!

    public List<Pergunta> listar() {
        return repo.findAll(); // acoplado ao MySQL
    }
}

// ✅ Respeita DIP: depende da abstração (interface)
public class QuizService {
    private final PerguntaRepository repo; // interface!

    public QuizService(PerguntaRepository repo) { // injeção!
        this.repo = repo;
    }

    public List<Pergunta> listar() {
        return repo.findAll(); // não sabe se é MySQL, Postgres, H2 ou mock
    }
}

// Benefício: nos testes, injeta mock
// Em produção, injeta implementação real
// Spring faz isso automaticamente com @Autowired/@Inject`,
            explanation: 'DIP é a base da Injeção de Dependência do Spring. Programar para interfaces permite substituição, testes e evolução sem reescrever código.'
          },
          {
            title: 'Clean Code — regras práticas',
            code: `// ════ CLEAN CODE — REGRAS QUE O MERCADO EXIGE ════

// 1. NOMES QUE SE EXPLICAM
// ❌  int d;   List<int[]> theList;   boolean flag;
// ✅  int diasRestantes;  List<Celula> tabuleiro;  boolean estaLogado;

// 2. FUNÇÕES PEQUENAS E COM UMA SÓ RESPONSABILIDADE
// ❌  processarTudoEGerarRelatorioEEnviarEmail()
// ✅  Uma função = uma coisa

// 3. EVITE COMENTÁRIOS ÓBVIOS
// ❌  i++; // incrementa i
// ✅  // HACK: API do banco retorna status invertido (bug #1234)

// 4. NÃO USE NÚMEROS MÁGICOS
// ❌  if (score > 75) { ... }
// ✅  static final int NOTA_MINIMA_APROVACAO = 75;

// 5. EARLY RETURN — menos aninhamento
// ❌
public ResultDTO processar(PedidoDTO dto) {
    if (dto != null) {
        if (dto.isValido()) {
            if (estoque.temDisponivel(dto)) {
                // lógica principal aqui — 3 níveis de indentação
            }
        }
    }
    return null;
}
// ✅
public ResultDTO processar(PedidoDTO dto) {
    if (dto == null)           return ResultDTO.erro("Nulo");
    if (!dto.isValido())       return ResultDTO.erro("Inválido");
    if (!estoque.tem(dto))     return ResultDTO.erro("Sem estoque");

    // lógica principal no nível 1 — muito mais legível
    return processarLogicaPrincipal(dto);
}

// 6. EVITE BOOLEAN TRAP
// ❌  criarUsuario("Adil", true, false, true) // o que são esses booleans?
// ✅  criarUsuario(new UsuarioConfig().ativo(true).admin(false).verificado(true))`,
            explanation: 'Early return elimina aninhamento profundo. Boolean trap: parâmetros booleanos sem contexto são ilegíveis — use objetos de configuração ou named constants.'
          }
        ]
      },
      quiz: [
        {
          question: 'O que o Open/Closed Principle diz?',
          options: [
            'O código deve estar aberto para todos no time',
            'Classes devem ser abertas para extensão mas fechadas para modificação',
            'Métodos públicos devem ter código aberto (open source)',
            'O sistema deve abrir e fechar conexões de banco'
          ],
          answer: 1,
          explanation: 'OCP: para adicionar funcionalidade, crie nova classe/método (extensão) sem modificar código existente (fechado para modificação). Strategy Pattern implementa OCP.'
        },
        {
          question: 'O que viola o Liskov Substitution Principle?',
          options: [
            'Herança de mais de uma classe',
            'Uma subclasse que lança exceção ou retorna resultado inválido onde a superclasse funcionaria',
            'Sobrescrever métodos da superclasse',
            'Usar interfaces ao invés de classes abstratas'
          ],
          answer: 1,
          explanation: 'LSP: uma subclasse deve poder SEMPRE substituir a superclasse sem quebrar o sistema. Se substituir quebra, a hierarquia está errada.'
        },
        {
          question: 'Por que o Dependency Inversion Principle é a base do Spring IoC?',
          options: [
            'Spring usa DIP para gerar código automaticamente',
            'DIP: dependa de abstrações (interfaces). Spring injeta as implementações concretas — você programa para a interface, o container resolve qual implementação usar',
            'DIP é o princípio mais rápido',
            'Spring exige DIP por limitações técnicas do Java'
          ],
          answer: 1,
          explanation: 'DIP permite que o Spring injete mock nos testes e implementação real em produção — sem mudar nenhuma linha do Service. Isso é IoC (Inversion of Control).'
        },
        {
          question: 'O que é "Boolean Trap" em Clean Code?',
          options: [
            'Um bug causado por operadores booleanos',
            'Passar booleanos como parâmetros sem contexto — torna chamadas ilegíveis (true, false, false)',
            'Comparar boolean com == true',
            'Usar variáveis boolean negadas (if !isNot...)'
          ],
          answer: 1,
          explanation: 'criarUsuario("Ana", true, false) — o que são esses booleans? Use constantes nomeadas, enums ou objetos de configuração para deixar o código autoexplicativo.'
        }
      ]
    },
    {
      id: 'con-security',
      title: 'Segurança — OWASP Top 10',
      xp: 25,
      lesson: {
        title: 'Segurança para Desenvolvedores',
        theory: `Todo dev precisa conhecer as vulnerabilidades mais comuns. O <strong>OWASP Top 10</strong> é a lista padrão de segurança usada pela indústria.

As mais importantes para devs full-stack:
• <strong>SQL Injection</strong> — nunca concatenar SQL
• <strong>XSS</strong> — Cross-Site Scripting
• <strong>IDOR</strong> — acesso a recursos de outros usuários
• <strong>SSRF</strong> — server-side request forgery
• <strong>Broken Access Control</strong> — mais comum do OWASP 2023`,
        examples: [
          {
            title: 'SQL Injection — prevenção obrigatória',
            code: `// ════ SQL INJECTION — NUNCA concatenar SQL ════

// ❌ VULNERÁVEL — ataque possível
String sql = "SELECT * FROM usuarios WHERE email = '" + email + "'";
// Se email = "' OR '1'='1" → retorna TODOS os usuários
// Se email = "'; DROP TABLE usuarios; --" → deleta a tabela!

// ✅ Prepared Statements — parâmetros separados do SQL
// JDBC puro:
PreparedStatement stmt = conn.prepareStatement(
    "SELECT * FROM usuarios WHERE email = ?"
);
stmt.setString(1, email);  // SQL e dados separados!

// JPA/Spring Data — automático, sempre seguro:
@Query("SELECT u FROM Usuario u WHERE u.email = :email")
Optional<Usuario> findByEmail(@Param("email") String email);
// OU simplesmente:
Optional<Usuario> findByEmail(String email);  // Spring gera SQL seguro

// ❌ NUNCA FAÇA ISSO com @Query:
@Query("SELECT u FROM Usuario u WHERE u.email = '" + email + "'")
// NativeQuery com concatenação também é vulnerável:
@Query(value = "SELECT * FROM usuarios WHERE email = '" + email + "'", nativeQuery = true)

// VALIDAÇÃO ADICIONAL — mesmo com Prepared Statements:
// Valide formato com @Email, @Pattern antes de chegar no SQL
// Limite tamanho dos campos: @Size(max = 255)`,
            explanation: 'Prepared Statements: o banco trata o parâmetro como dado, nunca como SQL. Spring Data JPA usa isso automaticamente — basta evitar concatenação em @Query.'
          },
          {
            title: 'XSS e outras vulnerabilidades comuns',
            code: `// ════ XSS — Cross-Site Scripting ════
// Atacante injeta JavaScript malicioso que roda no browser da vítima

// ❌ VULNERÁVEL — exibir input do usuário sem sanitizar
element.innerHTML = comentario; // se comentario = "<script>roubarCookies()</script>"

// ✅ Angular — safe by default
<p>{{ comentario }}</p>  // Angular escapa HTML automaticamente!
// {{ }} nunca interpreta HTML — converte < em &lt; etc.

// ❌ PERIGOSO mesmo em Angular:
<div [innerHTML]="comentario"></div>  // XSS possível!
// Se precisar usar innerHTML, sanitize primeiro:
this.sanitizer.bypassSecurityTrustHtml(comentario) // só em caso extremo

// CSP — Content Security Policy (defesa em profundidade)
// Header na resposta HTTP:
Content-Security-Policy: default-src 'self'; script-src 'self'

// ════ IDOR — Insecure Direct Object Reference ════
// Usuário 1 acessa /api/pedidos/42 que pertence ao Usuário 2

// ❌ VULNERÁVEL:
@GetMapping("/pedidos/{id}")
public Pedido buscar(@PathVariable Long id) {
    return pedidoRepo.findById(id).orElseThrow(); // sem verificar dono!
}

// ✅ Sempre verificar ownership:
@GetMapping("/pedidos/{id}")
public Pedido buscar(@PathVariable Long id, Authentication auth) {
    Pedido pedido = pedidoRepo.findById(id).orElseThrow();
    if (!pedido.getCliente().getEmail().equals(auth.getName())) {
        throw new ResponseStatusException(HttpStatus.FORBIDDEN);
    }
    return pedido;
}

// OU mais elegante com @Query:
Optional<Pedido> findByIdAndClienteEmail(Long id, String email);`,
            explanation: 'IDOR é a vulnerabilidade #1 em APIs. Sempre verificar que o recurso pertence ao usuário autenticado. Angular escapa HTML por padrão — não use innerHTML sem sanitizar.'
          }
        ]
      },
      quiz: [
        {
          question: 'Como prevenir SQL Injection em Spring Data JPA?',
          options: [
            'Usando @Sanitize nas queries',
            'Validando os dados com if/else antes de executar',
            'Usando Prepared Statements — automaticamente aplicado em métodos findBy e @Query com :param',
            'Escapando aspas simples manualmente'
          ],
          answer: 2,
          explanation: 'Spring Data gera Prepared Statements automaticamente. O único risco é concatenar string em @Query — sempre use :param em vez de + string.'
        },
        {
          question: 'Por que {{ comentario }} no Angular é seguro mas [innerHTML]="comentario" não é?',
          options: [
            'São igualmente seguros',
            '{{ }} escapa HTML automaticamente; [innerHTML] injeta HTML real — permite XSS',
            '[innerHTML] não funciona no Angular',
            '{{ }} só funciona com strings simples'
          ],
          answer: 1,
          explanation: '{{ }} = text interpolation — Angular escapa para texto puro. [innerHTML] = HTML real — se o valor contiver <script>, executa. Evite [innerHTML] com dados do usuário.'
        },
        {
          question: 'O que é IDOR (Insecure Direct Object Reference)?',
          options: [
            'Referência a variável não inicializada',
            'Acessar recursos de outros usuários manipulando IDs na URL sem verificação de autorização',
            'Importar módulos não seguros',
            'Usar reflection em Java'
          ],
          answer: 1,
          explanation: 'GET /pedidos/42 por um usuário que não é dono do pedido 42. A verificação deve ser no servidor — nunca confie que o frontend vai esconder o campo.'
        },
        {
          question: 'Para que serve o header Content-Security-Policy?',
          options: [
            'Autenticar o servidor para o cliente',
            'Definir quais origens podem carregar scripts e recursos — defesa em profundidade contra XSS',
            'Criptografar o body da resposta',
            'Configurar CORS'
          ],
          answer: 1,
          explanation: 'CSP instrui o browser a bloquear scripts de origens não autorizadas. Mesmo se XSS injetar um script, CSP impede que execute. Linha de defesa adicional.'
        }
      ]
    }
  ]
};
