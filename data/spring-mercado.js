// Tópicos extras de Spring Boot — mercado de trabalho
window.SPRING_EXTRA = [
  {
    id: 'sb-validation',
    title: 'Validação com Bean Validation',
    xp: 20,
    lesson: {
      title: 'Bean Validation — Padrão de Mercado',
      theory: `Bean Validation (Jakarta Validation) é o padrão para validar dados de entrada em APIs Spring Boot.

Anotações mais usadas:
• <code>@NotNull</code> / <code>@NotBlank</code> — campo obrigatório
• <code>@Size(min, max)</code> — tamanho de string/coleção
• <code>@Min</code> / <code>@Max</code> — limites numéricos
• <code>@Email</code> — formato de email
• <code>@Pattern</code> — expressão regular
• <code>@Valid</code> — ativa validação em cascata`,
      examples: [
        {
          title: 'DTO com validações completas',
          code: `// dto/CriarUsuarioDTO.java
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CriarUsuarioDTO {

    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 2, max = 100, message = "Nome deve ter entre 2 e 100 caracteres")
    private String nome;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    private String email;

    @NotBlank(message = "Senha é obrigatória")
    @Size(min = 8, message = "Senha deve ter no mínimo 8 caracteres")
    @Pattern(
        regexp = "^(?=.*[A-Z])(?=.*[0-9]).+$",
        message = "Senha deve conter ao menos 1 maiúscula e 1 número"
    )
    private String senha;

    @Min(value = 0, message = "XP não pode ser negativo")
    @Max(value = 99999, message = "XP máximo é 99999")
    private int xp = 0;

    @NotNull(message = "Linguagem preferida é obrigatória")
    private String linguagem;
}`,
          explanation: 'DTOs separam a entrada da entidade do banco. Nunca exponha a @Entity diretamente na API.'
        },
        {
          title: 'Controller com @Valid e handler de erros',
          code: `@RestController
@RequestMapping("/api/usuarios")
@Validated
public class UsuarioController {

    private final UsuarioService service;

    @PostMapping
    public ResponseEntity<UsuarioDTO> criar(
            @Valid @RequestBody CriarUsuarioDTO dto) {
        // @Valid dispara as validações do DTO
        // Se inválido, lança MethodArgumentNotValidException
        return ResponseEntity.status(201).body(service.criar(dto));
    }

    // Validação em path variable
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> buscar(
            @PathVariable @Positive(message = "ID deve ser positivo") Long id) {
        return ResponseEntity.ok(service.buscar(id));
    }
}

// GlobalExceptionHandler.java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(
            MethodArgumentNotValidException ex) {

        Map<String, String> erros = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(err ->
            erros.put(err.getField(), err.getDefaultMessage())
        );

        return ResponseEntity.badRequest().body(Map.of(
            "status",  400,
            "erro",    "Dados inválidos",
            "campos",  erros
        ));
    }
}
// Resposta: { "status": 400, "campos": { "email": "Email inválido" } }`,
          explanation: '@Valid no parâmetro ativa as validações. GlobalExceptionHandler retorna JSON legível ao invés de stack trace.'
        },
        {
          title: 'Validator customizado',
          code: `// annotation/CPFValido.java
@Documented
@Constraint(validatedBy = CPFValidator.class)
@Target({ FIELD })
@Retention(RUNTIME)
public @interface CPFValido {
    String message() default "CPF inválido";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

// CPFValidator.java
public class CPFValidator
        implements ConstraintValidator<CPFValido, String> {

    @Override
    public boolean isValid(String cpf, ConstraintValidatorContext ctx) {
        if (cpf == null || cpf.isBlank()) return true; // deixa @NotBlank cuidar
        String digits = cpf.replaceAll("[^0-9]", "");
        return digits.length() == 11 && calcularDigitos(digits);
    }

    private boolean calcularDigitos(String cpf) {
        // Algoritmo de validação de CPF
        int[] nums = cpf.chars().map(c -> c - '0').toArray();
        int d1 = calcDigito(nums, 10);
        int d2 = calcDigito(nums, 11);
        return nums[9] == d1 && nums[10] == d2;
    }

    private int calcDigito(int[] nums, int peso) {
        int soma = 0;
        for (int i = 0; i < peso - 1; i++) soma += nums[i] * (peso - i);
        int resto = (soma * 10) % 11;
        return resto == 10 ? 0 : resto;
    }
}

// Usando no DTO:
@CPFValido
private String cpf;`,
          explanation: 'Validators customizados são reutilizáveis em qualquer DTO. Padrão real para validar CPF, CNPJ, CEP etc.'
        }
      ]
    },
    quiz: [
      {
        question: 'Qual a diferença entre @NotNull e @NotBlank?',
        options: [
          'São idênticos',
          '@NotNull verifica null; @NotBlank verifica null E string vazia/espaços',
          '@NotBlank só funciona em números',
          '@NotNull funciona em String; @NotBlank em primitivos'
        ],
        answer: 1,
        explanation: '@NotNull rejeita null. @NotBlank rejeita null, "" e "   " (só espaços). Use @NotBlank em campos de texto.'
      },
      {
        question: 'O que acontece se um campo @Valid falhar sem GlobalExceptionHandler?',
        options: [
          'O Spring retorna null',
          'A aplicação para',
          'O Spring retorna 400 com stack trace HTML — não adequado para API REST',
          'O Spring ignora o erro'
        ],
        answer: 2,
        explanation: 'Sem handler, o Spring retorna HTML com stack trace. Com @RestControllerAdvice, retornamos JSON padronizado.'
      },
      {
        question: 'Por que usar DTOs em vez de expor a @Entity diretamente?',
        options: [
          'DTOs são mais rápidos',
          'Para desacoplar API da estrutura do banco, controlar campos expostos e evitar vulnerabilidades',
          'Porque @Entity não funciona com @RequestBody',
          'DTOs são obrigatórios pelo Spring'
        ],
        answer: 1,
        explanation: 'Expor @Entity pode vazar campos sensíveis, criar loops de serialização e acoplar API ao banco de dados.'
      },
      {
        question: 'Qual anotação no Controller ativa as validações do DTO?',
        options: ['@Validate', '@Validated', '@Valid no parâmetro', '@EnableValidation'],
        answer: 2,
        explanation: '@Valid antes do parâmetro @RequestBody dispara as validações do Bean Validation no DTO recebido.'
      }
    ]
  },
  {
    id: 'sb-pagination',
    title: 'Paginação e Filtros',
    xp: 20,
    lesson: {
      title: 'Paginação, Ordenação e Filtros',
      theory: `Toda API de mercado retorna dados paginados. Retornar listas completas trava o sistema.

Spring Data fornece:
• <code>Pageable</code> — encapsula página, tamanho e ordenação
• <code>Page&lt;T&gt;</code> — resultado paginado com metadados
• <code>Specification</code> — filtros dinâmicos sem JPQL manual
• <code>@PageableDefault</code> — valores padrão`,
      examples: [
        {
          title: 'API com paginação (padrão REST)',
          code: `// Controller
@GetMapping
public ResponseEntity<Page<PerguntaDTO>> listar(
        @PageableDefault(size = 20, sort = "id", direction = DESC) Pageable pageable,
        @RequestParam(required = false) String linguagem) {

    Page<Pergunta> pagina = linguagem != null
        ? repo.findByLinguagem(linguagem, pageable)
        : repo.findAll(pageable);

    Page<PerguntaDTO> resultado = pagina.map(PerguntaDTO::fromEntity);
    return ResponseEntity.ok(resultado);
}

// Repository
public interface PerguntaRepository extends JpaRepository<Pergunta, Long> {
    Page<Pergunta> findByLinguagem(String linguagem, Pageable pageable);
}

/* Requisição:
   GET /api/perguntas?page=0&size=10&sort=xp,desc&linguagem=python

   Resposta:
   {
     "content": [...],
     "totalElements": 47,
     "totalPages": 5,
     "size": 10,
     "number": 0,
     "first": true,
     "last": false
   }
*/`,
          explanation: 'Page<T> já vem com metadados (total, pages, first/last). O front-end usa esses dados para montar a paginação.'
        },
        {
          title: 'Filtros dinâmicos com Specification',
          code: `// Filtro sem Specification: IF/ELSE no repositório — ruim
// Com Specification: composição flexível

// PerguntaSpec.java
public class PerguntaSpec {

    public static Specification<Pergunta> porLinguagem(String lang) {
        return (root, query, cb) ->
            lang == null ? null : cb.equal(root.get("linguagem"), lang);
    }

    public static Specification<Pergunta> xpMinimo(Integer xp) {
        return (root, query, cb) ->
            xp == null ? null : cb.greaterThanOrEqualTo(root.get("xp"), xp);
    }

    public static Specification<Pergunta> buscaPorTexto(String texto) {
        return (root, query, cb) ->
            texto == null ? null :
            cb.like(cb.lower(root.get("enunciado")), "%" + texto.toLowerCase() + "%");
    }
}

// Usando no Service
public Page<Pergunta> buscarComFiltros(
        String linguagem, Integer xpMin, String texto, Pageable pageable) {

    Specification<Pergunta> spec = Specification
        .where(PerguntaSpec.porLinguagem(linguagem))
        .and(PerguntaSpec.xpMinimo(xpMin))
        .and(PerguntaSpec.buscaPorTexto(texto));

    return repo.findAll(spec, pageable);
}
// Repository: extends JpaSpecificationExecutor<Pergunta>`,
          explanation: 'Specification compõe filtros opcionais. null retornado = sem filtro. Evita N métodos findBy* no repositório.'
        },
        {
          title: 'Projeções — retornar só o que precisa',
          code: `// Interface Projection — só os campos necessários (melhor performance)
public interface PerguntaResumo {
    Long getId();
    String getEnunciado();
    String getLinguagem();
    int getXp();
    // Não inclui resposta — evita vazar no endpoint de listagem
}

// Repository com projeção
public interface PerguntaRepository extends JpaRepository<Pergunta, Long> {
    // Retorna só os campos da interface
    Page<PerguntaResumo> findAllProjectedBy(Pageable pageable);

    // Com filtro
    List<PerguntaResumo> findByLinguagem(String lang);
}

// Uso direto — sem precisar de DTO manual
@GetMapping
public Page<PerguntaResumo> listar(Pageable pageable) {
    return repo.findAllProjectedBy(pageable);
}

// SQL gerado:
// SELECT id, enunciado, linguagem, xp FROM perguntas
// (NÃO busca a resposta no banco — menos dados trafegados)`,
          explanation: 'Projeções evitam SELECT * e não expõem campos sensíveis. O JPA gera SQL otimizado automaticamente.'
        }
      ]
    },
    quiz: [
      {
        question: 'O que Page<T> retorna além da lista de dados?',
        options: [
          'Apenas os dados sem metadados',
          'Metadados: totalElements, totalPages, número da página, isFirst, isLast',
          'Apenas o total de elementos',
          'O SQL executado'
        ],
        answer: 1,
        explanation: 'Page inclui content (dados) + metadados de paginação. O front usa totalPages para renderizar a paginação.'
      },
      {
        question: 'Como o cliente especifica a página na URL com Spring Data?',
        options: [
          '?pagina=1&itens=10',
          '?page=0&size=10&sort=campo,desc',
          '?offset=0&limit=10',
          '?p=1&n=10'
        ],
        answer: 1,
        explanation: 'Spring usa ?page=0 (base 0), &size=N, &sort=campo,asc|desc. Spring cria o Pageable automaticamente.'
      },
      {
        question: 'Qual a vantagem de usar Specification sobre múltiplos findByX?',
        options: [
          'Specification é mais rápido no banco',
          'Specification permite compor filtros opcionais dinamicamente sem criar N métodos',
          'findBy não suporta paginação',
          'Specification funciona sem JPA'
        ],
        answer: 1,
        explanation: 'Com 5 filtros opcionais, findBy criaria 2^5=32 combinações. Specification compõe com .and()/.or().'
      },
      {
        question: 'Por que usar Interface Projection em vez de retornar @Entity?',
        options: [
          '@Entity não pode ser serializada para JSON',
          'Retorna só os campos necessários, evita SELECT * e não expõe dados sensíveis',
          'Projeções são obrigatórias para paginação',
          'Projeções funcionam sem banco de dados'
        ],
        answer: 1,
        explanation: 'SELECT id, nome FROM tabela é mais rápido que SELECT *. Projeções também evitam expor campos como senha acidentalmente.'
      }
    ]
  },
  {
    id: 'sb-docker',
    title: 'Docker + Deploy',
    xp: 25,
    lesson: {
      title: 'Docker e Deploy em Produção',
      theory: `Docker é obrigatório no mercado. Praticamente toda vaga backend pede conhecimento em Docker.

Conceitos:
• <strong>Dockerfile</strong> — receita para criar a imagem do app
• <strong>docker-compose</strong> — orquestra app + banco juntos
• <strong>Multi-stage build</strong> — imagem menor em produção
• <strong>Health check</strong> — monitoramento automático`,
      examples: [
        {
          title: 'Dockerfile multi-stage (padrão produção)',
          code: `# Dockerfile

# ── Estágio 1: Build ──────────────────────────────────
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Copia só o pom.xml primeiro (cache de dependências)
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
RUN ./mvnw dependency:go-offline -q

# Copia o código e faz o build
COPY src ./src
RUN ./mvnw package -DskipTests -q

# ── Estágio 2: Runtime (imagem final menor) ───────────
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Cria usuário não-root (segurança)
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

COPY --from=build /app/target/*.jar app.jar

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://localhost:8080/actuator/health || exit 1

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

# Build: docker build -t devquest-api .
# Run:   docker run -p 8080:8080 devquest-api`,
          explanation: 'Multi-stage: estágio 1 tem JDK (400MB), estágio 2 tem só JRE (90MB). Imagem final é 4x menor.'
        },
        {
          title: 'docker-compose.yml — app + banco + redis',
          code: `# docker-compose.yml
version: '3.9'

services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/devquest
      SPRING_DATASOURCE_USERNAME: devquest
      SPRING_DATASOURCE_PASSWORD: \${DB_PASSWORD}  # do .env
      SPRING_REDIS_HOST: redis
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
    restart: unless-stopped

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: devquest
      POSTGRES_USER: devquest
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - pg_data:/var/lib/postgresql/data  # dados persistentes
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U devquest"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  pg_data:
  redis_data:

# Comandos:
# docker compose up -d         # sobe tudo em background
# docker compose logs -f app   # ver logs da api
# docker compose down          # para tudo`,
          explanation: 'depends_on com condition: service_healthy garante que o app só sobe após o banco estar pronto.'
        },
        {
          title: 'application.properties por ambiente',
          code: `# application.properties (base — todos os ambientes)
spring.application.name=devquest-api
server.port=8080

# application-dev.properties (local)
spring.datasource.url=jdbc:h2:mem:devquest
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
logging.level.root=DEBUG

# application-prod.properties (produção)
spring.datasource.url=\${DB_URL}
spring.datasource.username=\${DB_USER}
spring.datasource.password=\${DB_PASS}
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
logging.level.root=WARN
server.error.include-stacktrace=never

# Ativar perfil:
# Variável de ambiente: SPRING_PROFILES_ACTIVE=prod
# Ou: java -jar app.jar --spring.profiles.active=prod
# No docker-compose: environment: SPRING_PROFILES_ACTIVE: prod

# NUNCA commite senhas! Use variáveis de ambiente.`,
          explanation: 'Spring Profiles separam configuração por ambiente. Em produção, NUNCA use credenciais hardcoded — use variáveis de ambiente.'
        }
      ]
    },
    quiz: [
      {
        question: 'Por que usar multi-stage build no Dockerfile?',
        options: [
          'Para compilar mais rápido',
          'Para ter a imagem final menor: estágio de build usa JDK, imagem final usa só JRE',
          'Porque o Spring Boot exige dois estágios',
          'Para rodar testes automaticamente'
        ],
        answer: 1,
        explanation: 'JDK ~400MB vs JRE ~90MB. A imagem final de produção não precisa do compilador — só do runtime.'
      },
      {
        question: 'O que volumes faz no docker-compose para o PostgreSQL?',
        options: [
          'Monta o código fonte no container',
          'Persiste os dados do banco fora do container — dados sobrevivem ao restart',
          'Cria backups automáticos',
          'Sincroniza com S3'
        ],
        answer: 1,
        explanation: 'Sem volume, dados do banco são perdidos ao remover o container. Volumes persistem os dados no host.'
      },
      {
        question: 'Como ativar o perfil "prod" do Spring Boot?',
        options: [
          'Renomear o arquivo para application.prod.properties',
          'Variável de ambiente SPRING_PROFILES_ACTIVE=prod ou --spring.profiles.active=prod',
          'Adicionar @Profile("prod") no main',
          'Editar o pom.xml'
        ],
        answer: 1,
        explanation: 'SPRING_PROFILES_ACTIVE=prod é o padrão em containers e CI/CD. Nunca hardcode o perfil no código.'
      },
      {
        question: 'Por que NÃO commitar senhas no application.properties?',
        options: [
          'O Spring não lê senhas de properties',
          'Segurança: qualquer pessoa com acesso ao repositório teria as credenciais de produção',
          'As senhas não funcionam em properties',
          'Não há motivo — é prática aceitável'
        ],
        answer: 1,
        explanation: 'Credenciais em repositórios são vazamentos de segurança. Use variáveis de ambiente + secrets manager (Vault, AWS Secrets).'
      }
    ]
  },
  {
    id: 'sb-cache-redis',
    title: 'Cache com Redis',
    xp: 25,
    lesson: {
      title: 'Cache com Spring Cache + Redis',
      theory: `Cache reduz chamadas ao banco e melhora performance. Redis é o cache mais usado no mercado.

Spring Cache abstrai o cache com anotações simples:
• <code>@Cacheable</code> — retorna do cache se existir
• <code>@CacheEvict</code> — invalida o cache
• <code>@CachePut</code> — atualiza o cache
• <code>@EnableCaching</code> — ativa o sistema de cache`,
      examples: [
        {
          title: 'Configuração e uso básico',
          code: `// pom.xml — adicionar:
// spring-boot-starter-data-redis
// spring-boot-starter-cache

// application.properties
spring.data.redis.host=localhost
spring.data.redis.port=6379
spring.cache.type=redis
spring.cache.redis.time-to-live=3600000  # 1 hora em ms

// CacheConfig.java
@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public RedisCacheConfiguration cacheConfig() {
        return RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofHours(1))
            .disableCachingNullValues()
            .serializeValuesWith(
                RedisSerializationContext.SerializationPair
                    .fromSerializer(new GenericJackson2JsonRedisSerializer())
            );
    }
}

// PerguntaService.java
@Service
public class PerguntaService {

    @Cacheable(value = "perguntas", key = "#linguagem")
    public List<Pergunta> findByLinguagem(String linguagem) {
        // Executado só na 1ª chamada — demais vêm do Redis
        return repo.findByLinguagem(linguagem);
    }

    @CacheEvict(value = "perguntas", key = "#pergunta.linguagem")
    public Pergunta save(Pergunta pergunta) {
        // Invalida cache da linguagem ao salvar nova pergunta
        return repo.save(pergunta);
    }

    @CacheEvict(value = "perguntas", allEntries = true)
    public void limparTodoCache() {}
}`,
          explanation: '@Cacheable intercepta a chamada: se a chave existe no Redis, retorna o cache sem bater no banco.'
        },
        {
          title: 'Rate limiting com Redis (padrão de segurança)',
          code: `import org.springframework.data.redis.core.StringRedisTemplate;
import java.time.Duration;

@Service
public class RateLimitService {

    private final StringRedisTemplate redis;

    public RateLimitService(StringRedisTemplate redis) {
        this.redis = redis;
    }

    // Máximo 5 tentativas de login por IP a cada 15 minutos
    public boolean permiteRequisicao(String ip) {
        String chave = "rate_limit:" + ip;
        Long tentativas = redis.opsForValue().increment(chave);

        if (tentativas == 1) {
            // Primeira tentativa: define TTL de 15 minutos
            redis.expire(chave, Duration.ofMinutes(15));
        }

        return tentativas <= 5;
    }

    // Usando no Controller de login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO dto,
                                    HttpServletRequest req) {
        String ip = req.getRemoteAddr();
        if (!rateLimitService.permiteRequisicao(ip)) {
            return ResponseEntity.status(429)
                .body(Map.of("erro", "Muitas tentativas. Tente em 15 minutos."));
        }
        return ResponseEntity.ok(authService.login(dto));
    }`,
          explanation: 'Redis com TTL é perfeito para rate limiting. increment() é atômico — seguro em ambientes com múltiplas instâncias.'
        }
      ]
    },
    quiz: [
      {
        question: 'O que @Cacheable(value="itens", key="#id") faz?',
        options: [
          'Sempre executa o método e salva no cache',
          'Na 1ª chamada executa e salva; nas seguintes retorna do cache sem executar o método',
          'Invalida o cache do item',
          'Cria uma tabela Redis automaticamente'
        ],
        answer: 1,
        explanation: '@Cacheable verifica o cache antes. Se a chave existir, retorna sem executar o método — zero queries no banco.'
      },
      {
        question: 'Quando usar @CacheEvict?',
        options: [
          'Para buscar dados do cache',
          'Para limpar entradas do cache quando os dados mudam (update/delete)',
          'Para pré-carregar o cache',
          'Para configurar o TTL'
        ],
        answer: 1,
        explanation: 'Após salvar/deletar, o cache fica desatualizado. @CacheEvict remove a entrada — próxima chamada vai ao banco e re-popula.'
      },
      {
        question: 'Por que Redis é melhor que cache em memória para produção?',
        options: [
          'Redis é mais simples de configurar',
          'Cache em memória é compartilhado entre instâncias automaticamente',
          'Redis é externo: compartilhado entre múltiplas instâncias do app (horizontal scaling)',
          'Redis não expira as entradas'
        ],
        answer: 2,
        explanation: 'Com 3 instâncias do app, cache em memória ficaria dessincronizado. Redis centraliza o cache para todas as instâncias.'
      },
      {
        question: 'O que TTL (Time-To-Live) define no Redis?',
        options: [
          'O tempo máximo de uma requisição HTTP',
          'Quanto tempo a entrada fica no cache antes de ser removida automaticamente',
          'O tempo de conexão com o banco',
          'O tempo de startup do Spring'
        ],
        answer: 1,
        explanation: 'TTL garante que dados do cache sejam renovados periodicamente. Essencial para dados que mudam com o tempo.'
      }
    ]
  }
];

if (window.SPRING_DATA) {
  window.SPRING_DATA.topics = window.SPRING_DATA.topics.concat(window.SPRING_EXTRA);
}
