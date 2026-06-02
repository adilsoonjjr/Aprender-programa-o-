window.SPRING_DATA = {
  id: 'spring',
  name: 'Spring Boot',
  icon: '🍃',
  color: '#6db33f',
  gradient: 'linear-gradient(135deg, #6db33f, #34302d)',
  topics: [
    {
      id: 'sb-intro',
      title: 'O que é Spring Boot?',
      xp: 10,
      lesson: {
        title: 'Introdução ao Spring Boot',
        theory: `Spring Boot é um framework Java que simplifica a criação de aplicações backend (APIs REST, microsserviços).

Principais vantagens:
• <strong>Auto-configuração</strong> — configuração mínima
• <strong>Servidor embutido</strong> — Tomcat incluso, sem deploy manual
• <strong>Spring Initializr</strong> — gerador de projetos online
• <strong>Starters</strong> — dependências pré-configuradas

Stack mais comum:
• Spring Boot + Spring Data JPA + PostgreSQL/MySQL
• Spring Security para autenticação
• Spring Web para APIs REST`,
        examples: [
          {
            title: 'Estrutura básica de projeto',
            code: `// Arquivo principal da aplicação
@SpringBootApplication
public class DevQuestApplication {
    public static void main(String[] args) {
        SpringApplication.run(DevQuestApplication.class, args);
    }
}

// Estrutura de pastas:
// src/main/java/com/devquest/
// ├── DevQuestApplication.java
// ├── controller/
// │   └── QuizController.java
// ├── service/
// │   └── QuizService.java
// ├── repository/
// │   └── QuizRepository.java
// └── model/
//     └── Pergunta.java`,
            explanation: '@SpringBootApplication ativa auto-configuração, component scan e configuração automática.'
          },
          {
            title: 'Primeiro Controller REST',
            code: `// controller/HelloController.java
import org.springframework.web.bind.annotation.*;

@RestController          // Retorna JSON automaticamente
@RequestMapping("/api")  // Prefixo das rotas
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Olá, Dev!";
    }

    @GetMapping("/status")
    public Map<String, Object> status() {
        return Map.of(
            "app", "DevQuest API",
            "versao", "1.0",
            "status", "online"
        );
    }
}
// GET http://localhost:8080/api/hello → "Olá, Dev!"
// GET http://localhost:8080/api/status → JSON`,
            explanation: '@RestController = @Controller + @ResponseBody. Converte retorno para JSON.'
          },
          {
            title: 'pom.xml — dependências essenciais',
            code: `<!-- pom.xml (Maven) -->
<dependencies>
  <!-- API REST -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>

  <!-- JPA + Hibernate (banco de dados) -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
  </dependency>

  <!-- Banco em memória para testes -->
  <dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
  </dependency>

  <!-- Reduz boilerplate: getters/setters -->
  <dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
  </dependency>
</dependencies>`,
            explanation: 'Starters agrupam dependências relacionadas. spring-boot-starter-web inclui Tomcat + Jackson.'
          }
        ]
      },
      quiz: [
        {
          question: 'O que @SpringBootApplication faz?',
          options: [
            'Apenas define a classe como executável',
            'Ativa auto-configuração, component scan e configuração de contexto',
            'Conecta ao banco de dados automaticamente',
            'Cria um servlet HTTP'
          ],
          answer: 1,
          explanation: '@SpringBootApplication combina @EnableAutoConfiguration + @ComponentScan + @Configuration.'
        },
        {
          question: 'Qual anotação cria um controlador REST que retorna JSON?',
          options: ['@Controller', '@ApiController', '@RestController', '@JsonController'],
          answer: 2,
          explanation: '@RestController = @Controller + @ResponseBody. Converte objetos Java para JSON automaticamente.'
        },
        {
          question: 'Por que Spring Boot tem um servidor embutido?',
          options: [
            'Porque é obrigatório por lei',
            'Para não precisar instalar e configurar Tomcat separadamente',
            'Porque é mais lento',
            'Só funciona na nuvem'
          ],
          answer: 1,
          explanation: 'O Tomcat embutido permite executar java -jar app.jar sem servidor externo.'
        },
        {
          question: 'Qual ferramenta online gera projetos Spring Boot?',
          options: ['Spring CLI', 'Spring Forge', 'Spring Initializr (start.spring.io)', 'IntelliJ Spring Wizard'],
          answer: 2,
          explanation: 'start.spring.io permite escolher dependências e gera o projeto configurado.'
        }
      ]
    },
    {
      id: 'sb-rest',
      title: 'APIs REST com Spring',
      xp: 20,
      lesson: {
        title: 'Criando APIs REST',
        theory: `REST usa verbos HTTP para operações CRUD:
• <strong>GET</strong> — buscar dados
• <strong>POST</strong> — criar
• <strong>PUT/PATCH</strong> — atualizar
• <strong>DELETE</strong> — remover

Anotações Spring:
• <code>@GetMapping</code> — responde GET
• <code>@PostMapping</code> — responde POST
• <code>@PathVariable</code> — parâmetro na URL
• <code>@RequestBody</code> — corpo da requisição (JSON)
• <code>ResponseEntity</code> — controla status HTTP`,
        examples: [
          {
            title: 'CRUD completo',
            code: `@RestController
@RequestMapping("/api/perguntas")
public class PerguntaController {

    private final PerguntaService service;

    public PerguntaController(PerguntaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Pergunta> listar() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pergunta> buscar(@PathVariable Long id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Pergunta> criar(@RequestBody Pergunta p) {
        Pergunta salva = service.save(p);
        return ResponseEntity.status(201).body(salva);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}`,
            explanation: 'Cada método HTTP mapeado com anotação específica. ResponseEntity controla status code.'
          },
          {
            title: 'Model com Lombok',
            code: `import lombok.*;
import jakarta.persistence.*;

@Entity                  // Tabela no banco
@Table(name = "perguntas")
@Data                    // getters + setters + equals + hashCode
@NoArgsConstructor       // construtor sem argumentos
@AllArgsConstructor      // construtor com todos os campos
public class Pergunta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String enunciado;

    @Column(nullable = false)
    private String resposta;

    private String linguagem;  // "python", "angular", "spring"

    private int xp = 10;
}`,
            explanation: '@Entity mapeia para tabela SQL. @Data do Lombok evita escrever getters/setters.'
          },
          {
            title: 'Tratamento de erros',
            code: `@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleNotFound(
            ResourceNotFoundException ex) {
        return ResponseEntity.status(404)
            .body(Map.of(
                "erro", "Não encontrado",
                "mensagem", ex.getMessage()
            ));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGeneral(Exception ex) {
        return ResponseEntity.status(500)
            .body(Map.of("erro", "Erro interno"));
    }
}`,
            explanation: '@RestControllerAdvice captura exceções de todos os controllers e retorna JSON padronizado.'
          }
        ]
      },
      quiz: [
        {
          question: 'Qual anotação mapeia uma rota GET /api/itens/{id}?',
          options: [
            '@GetMapping("/api/itens/{id}")',
            '@RequestMapping(method=GET)',
            '@GetMapping("/{id}") com @RequestMapping("/api/itens") na classe',
            'Ambas A e C estão corretas'
          ],
          answer: 3,
          explanation: 'Ambas funcionam. Geralmente usa @RequestMapping na classe + @GetMapping("/{id}") no método.'
        },
        {
          question: 'O que @RequestBody faz?',
          options: [
            'Retorna o corpo da resposta',
            'Converte o JSON da requisição para objeto Java',
            'Valida os dados da requisição',
            'Define o content-type da resposta'
          ],
          answer: 1,
          explanation: '@RequestBody desserializa o JSON do body da requisição para o tipo Java especificado.'
        },
        {
          question: 'Qual status HTTP correto para recurso criado com sucesso?',
          options: ['200 OK', '201 Created', '204 No Content', '202 Accepted'],
          answer: 1,
          explanation: '201 Created é o status correto para POST bem-sucedido. 200 é para GET/PUT.'
        },
        {
          question: 'O que @Entity indica em uma classe Java?',
          options: [
            'A classe é um Controller',
            'A classe é um Service',
            'A classe é mapeada para uma tabela no banco de dados',
            'A classe usa injeção de dependência'
          ],
          answer: 2,
          explanation: '@Entity marca a classe como uma entidade JPA, mapeada para tabela no banco.'
        }
      ]
    },
    {
      id: 'sb-jpa',
      title: 'JPA e Banco de Dados',
      xp: 20,
      lesson: {
        title: 'Spring Data JPA',
        theory: `Spring Data JPA simplifica acesso ao banco. Você define a interface do Repository e o Spring implementa automaticamente.

Conceitos:
• <strong>Repository</strong> — interface para operações no banco
• <strong>JpaRepository</strong> — fornece CRUD pronto
• <strong>Query Methods</strong> — métodos gerados pelo nome
• <strong>@Query</strong> — JPQL customizado
• <strong>application.properties</strong> — configuração do banco`,
        examples: [
          {
            title: 'Repository com JpaRepository',
            code: `// repository/PerguntaRepository.java
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PerguntaRepository
        extends JpaRepository<Pergunta, Long> {

    // Spring gera o SQL automaticamente pelo nome do método!
    List<Pergunta> findByLinguagem(String linguagem);

    List<Pergunta> findByLinguagemAndXpGreaterThan(
        String linguagem, int xp);

    long countByLinguagem(String linguagem);

    // Query customizada com JPQL
    @Query("SELECT p FROM Pergunta p WHERE p.xp = :xp ORDER BY p.id")
    List<Pergunta> buscarPorXP(@Param("xp") int xp);
}`,
            explanation: 'JpaRepository já tem findAll, findById, save, delete. Métodos extras são gerados pelo nome.'
          },
          {
            title: 'Service com Repository',
            code: `@Service
public class PerguntaService {

    private final PerguntaRepository repo;

    public PerguntaService(PerguntaRepository repo) {
        this.repo = repo;
    }

    public List<Pergunta> findAll() {
        return repo.findAll();
    }

    public Optional<Pergunta> findById(Long id) {
        return repo.findById(id);
    }

    public Pergunta save(Pergunta p) {
        return repo.save(p);    // INSERT ou UPDATE
    }

    public void deleteById(Long id) {
        repo.deleteById(id);
    }

    public List<Pergunta> findByLinguagem(String lang) {
        return repo.findByLinguagem(lang);
    }
}`,
            explanation: 'Service usa Repository para acessar o banco. Controller usa Service. Separação de responsabilidades.'
          },
          {
            title: 'application.properties',
            code: `# src/main/resources/application.properties

# Banco H2 em memória (desenvolvimento)
spring.datasource.url=jdbc:h2:mem:devquest
spring.datasource.driver-class-name=org.h2.Driver
spring.h2.console.enabled=true

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true

# Para PostgreSQL (produção):
# spring.datasource.url=jdbc:postgresql://localhost:5432/devquest
# spring.datasource.username=postgres
# spring.datasource.password=senha
# spring.jpa.hibernate.ddl-auto=validate`,
            explanation: 'application.properties configura o banco. H2 para dev, PostgreSQL/MySQL para produção.'
          }
        ]
      },
      quiz: [
        {
          question: 'O que JpaRepository fornece por padrão?',
          options: [
            'Apenas findById',
            'Operações CRUD completas (findAll, save, delete, etc)',
            'Apenas queries customizadas',
            'Apenas conexão com banco'
          ],
          answer: 1,
          explanation: 'JpaRepository<T, ID> fornece findAll, findById, save, delete, count e mais.'
        },
        {
          question: 'O que findByLinguagemAndXp(String lang, int xp) faz?',
          options: [
            'Erro: nome inválido',
            'Busca registros onde linguagem = lang E xp = xp',
            'Busca por linguagem OU xp',
            'Retorna um Optional'
          ],
          answer: 1,
          explanation: 'Spring Data gera SQL pela convenção de nomes: findBy + campo + And + campo.'
        },
        {
          question: 'Qual ddl-auto é seguro para produção?',
          options: ['create', 'create-drop', 'update', 'validate'],
          answer: 3,
          explanation: 'validate verifica o schema sem alterá-lo. create/update podem apagar dados em produção!'
        },
        {
          question: 'O que @Service indica no Spring?',
          options: [
            'A classe expõe endpoints REST',
            'A classe é um componente de lógica de negócio gerenciado pelo Spring',
            'A classe se conecta ao banco de dados',
            'A classe é configuração do Spring'
          ],
          answer: 1,
          explanation: '@Service é um @Component especializado para a camada de lógica de negócio.'
        }
      ]
    },
    {
      id: 'sb-security',
      title: 'Spring Security (JWT)',
      xp: 25,
      lesson: {
        title: 'Autenticação com JWT',
        theory: `JWT (JSON Web Token) é o padrão para autenticação em APIs REST.

Fluxo:
1. Usuário envia login + senha
2. API valida e retorna um <strong>token JWT</strong>
3. Cliente envia token no header de cada requisição
4. API valida o token e libera o acesso

Estrutura do JWT:
• <strong>Header</strong> — algoritmo usado
• <strong>Payload</strong> — dados do usuário (claims)
• <strong>Signature</strong> — verificação de autenticidade`,
        examples: [
          {
            title: 'Token JWT — estrutura',
            code: `// Um JWT tem 3 partes separadas por ponto:
// xxxxx.yyyyy.zzzzz

// HEADER (base64):
{
  "alg": "HS256",
  "typ": "JWT"
}

// PAYLOAD (base64 — NÃO é criptografado!):
{
  "sub": "123",           // subject (id do usuário)
  "nome": "Adil",
  "roles": ["USER"],
  "iat": 1700000000,     // issued at
  "exp": 1700086400      // expira em (Unix timestamp)
}

// SIGNATURE:
// HMACSHA256(base64(header) + "." + base64(payload), SECRET_KEY)

// Para usar na requisição:
// Authorization: Bearer eyJhbGc...`,
            explanation: 'JWT é base64, não criptografado no payload. Nunca guarde senha no token!'
          },
          {
            title: 'Gerando token com jjwt',
            code: `// JwtService.java
import io.jsonwebtoken.*;
import java.time.*;

@Service
public class JwtService {

    @Value("\${jwt.secret}")
    private String secret;

    private static final long EXPIRACAO = 86400000L; // 24h

    public String gerarToken(String email) {
        return Jwts.builder()
            .setSubject(email)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + EXPIRACAO))
            .signWith(SignatureAlgorithm.HS256, secret)
            .compact();
    }

    public String getEmail(String token) {
        return Jwts.parser()
            .setSigningKey(secret)
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }

    public boolean isValido(String token) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}`,
            explanation: 'jjwt é a biblioteca mais usada para JWT em Java. Configure jwt.secret no application.properties.'
          }
        ]
      },
      quiz: [
        {
          question: 'O que significa JWT?',
          options: ['Java Web Token', 'JSON Web Token', 'JavaScript Web Transfer', 'JSON Web Transfer'],
          answer: 1,
          explanation: 'JWT = JSON Web Token. É um padrão aberto (RFC 7519) para transmissão segura de informações.'
        },
        {
          question: 'O payload do JWT é:',
          options: [
            'Criptografado e seguro para dados sensíveis',
            'Apenas base64 — qualquer um pode decodificar',
            'Comprimido com gzip',
            'Assinado e criptografado por padrão'
          ],
          answer: 1,
          explanation: 'O payload é apenas base64, facilmente decodificável. Nunca coloque senha ou dados sensíveis!'
        },
        {
          question: 'Como enviar o JWT nas requisições?',
          options: [
            'No body da requisição como JSON',
            'Como cookie de sessão',
            'No header: Authorization: Bearer <token>',
            'Como parâmetro de URL: ?token=...'
          ],
          answer: 2,
          explanation: 'O padrão é header Authorization: Bearer <token>. O Spring Security lê esse header.'
        },
        {
          question: 'O que exp no payload do JWT representa?',
          options: [
            'Experience Points (pontos)',
            'Data de expiração do token',
            'Exportação do token',
            'Extensão do token'
          ],
          answer: 1,
          explanation: 'exp = expiration time. Após essa data/hora (Unix timestamp), o token é inválido.'
        }
      ]
    }
  ]
};
