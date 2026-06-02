// Spring Boot Full-stack — tópicos avançados de mercado
window.SPRING_FULLSTACK = [
  {
    id: 'sb-testing',
    title: 'Testes com JUnit e Mockito',
    xp: 30,
    lesson: {
      title: 'Testes em Spring Boot — Unitário, Slice e Integração',
      theory: `Testes são <strong>obrigatórios em toda vaga sênior Spring Boot</strong>. O Spring oferece diferentes níveis:

• <strong>@ExtendWith(MockitoExtension)</strong> — teste unitário puro (sem Spring)
• <strong>@WebMvcTest</strong> — testa só a camada Controller
• <strong>@DataJpaTest</strong> — testa só a camada Repository
• <strong>@SpringBootTest</strong> — sobe o contexto completo (lento)

Ferramentas:
• <code>Mockito</code> — mocking de dependências
• <code>MockMvc</code> — simula requisições HTTP
• <code>AssertJ</code> — assertions expressivas
• <code>H2</code> — banco em memória para testes`,
      examples: [
        {
          title: 'Teste unitário com Mockito (sem Spring)',
          code: `// QuizServiceTest.java
@ExtendWith(MockitoExtension.class)
class QuizServiceTest {

    @Mock
    PerguntaRepository repo;      // Mockito cria mock automático

    @InjectMocks
    QuizService service;           // injeta os mocks acima

    @Test
    void deveRetornarPerguntasPorLinguagem() {
        // Arrange (given)
        List<Pergunta> perguntas = List.of(
            new Pergunta(1L, "O que é Python?", "python", 10),
            new Pergunta(2L, "O que é list?",   "python", 10)
        );
        when(repo.findByLinguagem("python")).thenReturn(perguntas);

        // Act (when)
        List<Pergunta> resultado = service.findByLinguagem("python");

        // Assert (then)
        assertThat(resultado).hasSize(2);
        assertThat(resultado.get(0).getLinguagem()).isEqualTo("python");
        verify(repo).findByLinguagem("python");  // verificou que foi chamado
        verifyNoMoreInteractions(repo);           // sem chamadas extras
    }

    @Test
    void deveLancarExcecaoQuandoPerguntaNaoExiste() {
        when(repo.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.findById(99L))
            .isInstanceOf(ResourceNotFoundException.class)
            .hasMessageContaining("99");
    }

    @ParameterizedTest
    @ValueSource(ints = { 0, 10, 20, 30 })
    void deveCalcularXpCorretamente(int score) {
        int xp = service.calcularXP(score, 4);  // score de 4 perguntas
        assertThat(xp).isGreaterThanOrEqualTo(0);
        assertThat(xp).isLessThanOrEqualTo(40);
    }
}`,
          explanation: '@Mock cria mock automático. when().thenReturn() define comportamento. verify() confirma que o método foi chamado.'
        },
        {
          title: '@WebMvcTest — testar Controller',
          code: `// PerguntaControllerTest.java
@WebMvcTest(PerguntaController.class)  // sobe só a camada web
class PerguntaControllerTest {

    @Autowired
    MockMvc mockMvc;               // simula requisições HTTP

    @MockBean
    PerguntaService service;        // mock do service (não usa real)

    @Autowired
    ObjectMapper objectMapper;     // serializar/deserializar JSON

    @Test
    void deveRetornar200ComListaDePerguntas() throws Exception {
        List<Pergunta> mock = List.of(new Pergunta(1L, "O que é Spring?", "spring", 10));
        when(service.findAll()).thenReturn(mock);

        mockMvc.perform(get("/api/perguntas")
                .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(1)))
            .andExpect(jsonPath("$[0].enunciado").value("O que é Spring?"))
            .andDo(print());  // imprime request/response no console
    }

    @Test
    void deveRetornar400QuandoCorpoInvalido() throws Exception {
        PerguntaDTO dto = new PerguntaDTO("", null, "spring", 10); // enunciado vazio

        mockMvc.perform(post("/api/perguntas")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.campos.enunciado").exists());
    }

    @Test
    void deveRetornar404QuandoNaoEncontrado() throws Exception {
        when(service.findById(99L)).thenThrow(new ResourceNotFoundException("99"));
        mockMvc.perform(get("/api/perguntas/99"))
            .andExpect(status().isNotFound());
    }
}`,
          explanation: '@WebMvcTest não sobe JPA/banco — muito mais rápido. MockMvc simula HTTP sem servidor real. jsonPath() valida o JSON retornado.'
        },
        {
          title: '@DataJpaTest — testar Repository',
          code: `// PerguntaRepositoryTest.java
@DataJpaTest  // sobe só JPA + H2 em memória
class PerguntaRepositoryTest {

    @Autowired
    PerguntaRepository repo;

    @Autowired
    TestEntityManager em;  // utilitário para inserir dados de teste

    @BeforeEach
    void setUp() {
        em.persist(new Pergunta(null, "O que é @Component?", "spring", 10));
        em.persist(new Pergunta(null, "O que é @Service?",   "spring", 15));
        em.persist(new Pergunta(null, "O que é async?",      "python", 20));
        em.flush();
    }

    @Test
    void deveBuscarPorLinguagem() {
        List<Pergunta> spring = repo.findByLinguagem("spring");
        assertThat(spring).hasSize(2);
        assertThat(spring).allMatch(p -> p.getLinguagem().equals("spring"));
    }

    @Test
    void devePaginarResultados() {
        Page<Pergunta> pagina = repo.findAll(PageRequest.of(0, 2));
        assertThat(pagina.getContent()).hasSize(2);
        assertThat(pagina.getTotalElements()).isEqualTo(3);
    }

    @Test
    void deveContarPorLinguagem() {
        long total = repo.countByLinguagem("spring");
        assertThat(total).isEqualTo(2);
    }
}`,
          explanation: '@DataJpaTest usa H2 em memória — não toca o banco real. TestEntityManager insere dados de teste sem depender dos métodos do Repository.'
        }
      ]
    },
    quiz: [
      {
        question: 'Qual anotação para teste unitário puro sem Spring?',
        options: ['@SpringBootTest', '@WebMvcTest', '@ExtendWith(MockitoExtension.class)', '@DataJpaTest'],
        answer: 2,
        explanation: 'MockitoExtension não sobe contexto Spring — muito mais rápido. Ideal para testar Services e classes de lógica pura.'
      },
      {
        question: 'Qual a diferença entre @Mock e @MockBean?',
        options: [
          'São idênticos',
          '@Mock é Mockito puro; @MockBean registra o mock no contexto Spring (usado em @WebMvcTest/@SpringBootTest)',
          '@MockBean é mais rápido',
          '@Mock funciona com @SpringBootTest; @MockBean com Mockito puro'
        ],
        answer: 1,
        explanation: '@Mock: Mockito puro, sem Spring. @MockBean: registra no ApplicationContext Spring — necessário em @WebMvcTest/@SpringBootTest.'
      },
      {
        question: 'O que @WebMvcTest carrega?',
        options: [
          'O contexto Spring completo com JPA e banco',
          'Apenas a camada Web (Controllers, Filters, ExceptionHandlers) — sem JPA, sem banco',
          'Apenas os Repositories',
          'O contexto completo mas com banco em memória'
        ],
        answer: 1,
        explanation: '@WebMvcTest é um "slice test": sobe só o que é necessário para testar Controllers. Muito mais rápido que @SpringBootTest.'
      },
      {
        question: 'O que verify(repo).findByLinguagem("python") faz no Mockito?',
        options: [
          'Executa o método e verifica o resultado',
          'Confirma que o método foi chamado exatamente com esse argumento durante o teste',
          'Define o valor de retorno do método',
          'Verifica se o método existe na classe'
        ],
        answer: 1,
        explanation: 'verify() afirma que a interação aconteceu. Complementa assertThat(): além de verificar o resultado, confirma que o código colaborou com as dependências corretamente.'
      }
    ]
  },
  {
    id: 'sb-transactional',
    title: '@Transactional e Persistência',
    xp: 25,
    lesson: {
      title: '@Transactional — O Que Toda Entrevista Pergunta',
      theory: `<code>@Transactional</code> é um dos tópicos mais perguntados em entrevistas Spring Boot. Muitos devs usam sem entender.

Conceitos ACID:
• <strong>Atomicidade</strong> — tudo ou nada
• <strong>Consistência</strong> — estado válido antes e depois
• <strong>Isolamento</strong> — transações paralelas não se interferem
• <strong>Durabilidade</strong> — commit sobrevive a falhas

Problemas de performance JPA:
• <strong>N+1 Query</strong> — o problema mais comum
• <strong>LazyInitializationException</strong> — acesso fora da transação
• <strong>Detached entity</strong> — entidade fora do contexto`,
      examples: [
        {
          title: '@Transactional — propagação e rollback',
          code: `@Service
public class PedidoService {

    // Padrão: REQUIRED (usa transação existente ou cria nova)
    @Transactional
    public Pedido criar(CriarPedidoDTO dto) {
        Pedido pedido = pedidoRepo.save(new Pedido(dto));

        // Se lançar RuntimeException → rollback automático
        estoque.reduzir(dto.produtoId(), dto.quantidade()); // pode lançar StockException

        notificacao.enviar(pedido); // Se falhar → rollback em tudo
        return pedido;
    }

    // REQUIRES_NEW: sempre nova transação (suspende a atual)
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void registrarLog(String acao) {
        // Log é salvo mesmo se a transação pai fizer rollback
        logRepo.save(new Log(acao, LocalDateTime.now()));
    }

    // NOT_SUPPORTED: executa sem transação (para relatórios pesados)
    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public RelatorioDTO gerarRelatorio() {
        return relatorioRepo.gerarCompleto(); // sem lock no banco
    }

    // Rollback para checked exceptions (padrão só para unchecked)
    @Transactional(rollbackFor = Exception.class)
    public void operacaoCritica() throws Exception {
        // checked exceptions também farão rollback
    }

    // readOnly: otimiza para leitura (sem dirty checking)
    @Transactional(readOnly = true)
    public List<Pedido> listar() {
        return pedidoRepo.findAll(); // mais rápido que @Transactional padrão
    }
}`,
          explanation: 'readOnly=true desativa dirty checking do Hibernate — queries de leitura ficam mais rápidas. rollbackFor inclui checked exceptions no rollback automático.'
        },
        {
          title: 'Problema N+1 — o mais cobrado em entrevista',
          code: `// ❌ PROBLEMA N+1 — executa 1 + N queries!
@Entity
public class Pedido {
    @OneToMany(fetch = FetchType.LAZY)  // LAZY = padrão e correto
    private List<ItemPedido> itens;
}

// No service (ERRADO):
List<Pedido> pedidos = pedidoRepo.findAll(); // 1 query
for (Pedido p : pedidos) {
    System.out.println(p.getItens().size()); // N queries (1 por pedido)!
}
// Se houver 100 pedidos: 101 queries no banco!

// ══════════════════════════════════════
// ✅ SOLUÇÃO 1: JOIN FETCH no JPQL
@Query("SELECT DISTINCT p FROM Pedido p LEFT JOIN FETCH p.itens")
List<Pedido> findAllComItens();

// ✅ SOLUÇÃO 2: @EntityGraph
@EntityGraph(attributePaths = {"itens", "cliente"})
List<Pedido> findAll();

// ✅ SOLUÇÃO 3: @BatchSize (para coleções grandes)
@BatchSize(size = 20)
@OneToMany(fetch = FetchType.LAZY)
private List<ItemPedido> itens;
// Carrega em batches de 20 em vez de 1 por vez

// DETECTAR N+1 — no application.properties:
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
// Se ver a mesma query repetida N vezes → N+1!`,
          explanation: 'N+1 é o problema de performance JPA mais comum. JOIN FETCH é a solução mais direta. @EntityGraph é mais legível para múltiplas associações.'
        },
        {
          title: 'Otimistic Locking — concorrência sem deadlock',
          code: `// Problema: dois usuários editam o mesmo produto simultâneamente
// Sem lock: o último salva sobrescreve o primeiro (lost update)

// ✅ OPTIMISTIC LOCKING — sem bloqueio no banco
@Entity
public class Produto {
    @Id
    @GeneratedValue
    private Long id;

    private String nome;
    private int estoque;

    @Version        // Hibernate gerencia automaticamente
    private Long versao;  // incrementa a cada UPDATE
}

// Se duas transações tentarem salvar o mesmo produto:
// - Transação A lê versao=1, salva com versao=2 ✅
// - Transação B lê versao=1, tenta salvar com versao=2
//   → OptimisticLockException! (versão já mudou)

@Service
public class ProdutoService {

    @Transactional
    public Produto atualizarEstoque(Long id, int delta) {
        try {
            Produto p = repo.findById(id).orElseThrow();
            p.setEstoque(p.getEstoque() + delta);
            return repo.save(p);  // se versão mudou → exception
        } catch (OptimisticLockException e) {
            // Estratégia: retry automático ou notificar usuário
            throw new ConflictException("Produto foi modificado. Tente novamente.");
        }
    }
}

// Pessimistic Lock (para operações críticas):
@Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("SELECT p FROM Produto p WHERE p.id = :id")
Optional<Produto> findByIdComLock(@Param("id") Long id);`,
          explanation: '@Version: solução padrão para concorrência sem deadlock. Optimistic = otimista que conflito é raro. Pessimistic = bloqueia sempre (mais seguro, mais lento).'
        }
      ]
    },
    quiz: [
      {
        question: 'Por padrão, @Transactional faz rollback para quais exceções?',
        options: [
          'Todas as exceções (checked e unchecked)',
          'Apenas RuntimeException e Error (unchecked)',
          'Apenas checked exceptions',
          'Nenhuma — rollback é manual'
        ],
        answer: 1,
        explanation: 'Padrão Spring: rollback automático para RuntimeException e Error. Para checked exceptions, use rollbackFor = Exception.class.'
      },
      {
        question: 'O que é o problema N+1 no JPA?',
        options: [
          'Quando N usuários acessam o mesmo endpoint',
          '1 query busca N entidades + N queries adicionais para carregar associações lazy — ineficiente',
          'Quando um método @Transactional chama outro N vezes',
          'Um bug de versão do Hibernate'
        ],
        answer: 1,
        explanation: 'findAll() retorna 100 pedidos (1 query) + 100 queries para itens de cada pedido = 101 queries. JOIN FETCH resolve em 1 query.'
      },
      {
        question: 'O que @Transactional(readOnly = true) faz?',
        options: [
          'Impede escrita no banco com erro',
          'Desativa dirty checking do Hibernate, otimizando queries de leitura',
          'Cria uma transação read-committed',
          'Abre o banco em modo read-only (somente leitura)'
        ],
        answer: 1,
        explanation: 'Sem dirty checking, o Hibernate não precisa rastrear mudanças nas entidades — mais rápido para listagens. Não impede escrita, só otimiza.'
      },
      {
        question: 'Para que serve @Version em uma entidade JPA?',
        options: [
          'Para versionar a API REST',
          'Para habilitar Optimistic Locking — detecta conflitos de edição concorrente',
          'Para rastrear a versão do schema do banco',
          'Para criar histórico de alterações'
        ],
        answer: 1,
        explanation: '@Version incrementa a cada UPDATE. Se dois usuários editam a mesma entidade, o segundo recebe OptimisticLockException — evita sobrescritas silenciosas.'
      }
    ]
  },
  {
    id: 'sb-events-schedule',
    title: 'Eventos, Agendamento e Async',
    xp: 25,
    lesson: {
      title: 'Spring Events, @Scheduled e @Async',
      theory: `Padrões usados em todo sistema real:

• <strong>@Async</strong> — executa método em outra thread (não bloqueia)
• <strong>@Scheduled</strong> — tarefas agendadas (cron, fixedRate)
• <strong>ApplicationEvent</strong> — padrão Observer (desacoplamento)
• <strong>@EventListener</strong> — escuta eventos do Spring
• <strong>@TransactionalEventListener</strong> — aguarda commit`,
      examples: [
        {
          title: '@Async — execução assíncrona',
          code: `// ════ @Async — não bloqueia a thread HTTP ════

// 1. Habilitar no @Configuration ou @SpringBootApplication
@EnableAsync
@SpringBootApplication
public class App {}

// 2. Pool de threads customizado (OBRIGATÓRIO em produção)
@Configuration
@EnableAsync
public class AsyncConfig {
    @Bean(name = "taskExecutor")
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor exec = new ThreadPoolTaskExecutor();
        exec.setCorePoolSize(4);      // threads sempre ativas
        exec.setMaxPoolSize(16);      // máximo sob carga
        exec.setQueueCapacity(500);   // fila de espera
        exec.setThreadNamePrefix("async-");
        exec.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        exec.initialize();
        return exec;
    }
}

// 3. Service com método async
@Service
public class EmailService {

    @Async("taskExecutor")
    public CompletableFuture<Void> enviarBoasVindas(String email, String nome) {
        // Roda em outra thread — HTTP response já foi enviada!
        log.info("Enviando email para {} na thread {}", email, Thread.currentThread().getName());
        // simulação de envio demorado
        Thread.sleep(2000);
        return CompletableFuture.completedFuture(null);
    }

    // Com retorno
    @Async
    public CompletableFuture<String> gerarRelatorio(Long userId) {
        String relatorio = "...processamento pesado...";
        return CompletableFuture.completedFuture(relatorio);
    }
}

// No Controller: retorno imediato, email enviado em background
@PostMapping("/usuarios")
public ResponseEntity<String> criar(@RequestBody UsuarioDTO dto) {
    Usuario u = service.criar(dto);
    emailService.enviarBoasVindas(u.getEmail(), u.getNome()); // não bloqueia
    return ResponseEntity.status(201).body("Criado!");
}`,
          explanation: 'Sem pool customizado, @Async usa pool padrão do Spring (ilimitado) — pode criar threads demais. CallerRunsPolicy evita perda de tarefas sob carga extrema.'
        },
        {
          title: '@Scheduled — tarefas agendadas',
          code: `// ════ @Scheduled ════
@EnableScheduling  // no @SpringBootApplication ou @Configuration

@Component
public class TarefasAgendadas {

    // fixedRate: a cada 5 minutos (independente da duração)
    @Scheduled(fixedRate = 5 * 60 * 1000)
    public void sincronizarDados() {
        log.info("Sincronizando dados...");
    }

    // fixedDelay: 10min APÓS o término da execução anterior
    @Scheduled(fixedDelay = 600_000, initialDelay = 30_000)
    public void limparCache() {
        cacheService.evictExpired();
    }

    // CRON — expressão "s m h dom mes dow"
    // Segund  Minut  Hora  DiaMês  Mês  DiaSemana

    // Todos os dias às 08:00
    @Scheduled(cron = "0 0 8 * * *")
    public void enviarRelatorioMatinal() {
        relatorioService.enviarPorEmail();
    }

    // Segunda a sexta às 18:00
    @Scheduled(cron = "0 0 18 * * MON-FRI")
    public void fechamentoDiario() {
        financeiroService.fecharCaixa();
    }

    // Primeiro dia de cada mês às 00:01
    @Scheduled(cron = "0 1 0 1 * *")
    public void processamentoMensal() {
        faturamentoService.processarMensal();
    }
}

// DICA: Use cron expression validator online
// https://crontab.guru/ — traduz expressão para linguagem natural`,
          explanation: 'fixedRate pode causar sobreposição se a tarefa demorar mais que o intervalo. fixedDelay é mais seguro. Cron expression: 6 campos (com segundos).'
        },
        {
          title: 'ApplicationEvent — padrão Observer',
          code: `// ════ EVENTOS — desacoplamento entre domínios ════

// 1. Definir o evento
public record UsuarioCriadoEvent(Long userId, String email, String nome) {}

// 2. Publicar o evento no Service
@Service
@RequiredArgsConstructor
public class UsuarioService {
    private final UsuarioRepository repo;
    private final ApplicationEventPublisher events;  // injetado pelo Spring

    @Transactional
    public Usuario criar(CriarUsuarioDTO dto) {
        Usuario u = repo.save(new Usuario(dto));

        // Publica o evento — quem escuta não importa para o service
        events.publishEvent(new UsuarioCriadoEvent(u.getId(), u.getEmail(), u.getNome()));
        return u;
    }
}

// 3. Múltiplos listeners independentes
@Component
public class EmailListener {
    @TransactionalEventListener  // só executa APÓS o commit
    public void enviarBoasVindas(UsuarioCriadoEvent event) {
        emailService.enviar(event.email(), "Bem-vindo, " + event.nome());
    }
}

@Component
public class MetricasListener {
    @EventListener  // síncrono, executa dentro da transação
    public void registrarMetrica(UsuarioCriadoEvent event) {
        metricas.incrementar("usuarios.criados");
    }
}

@Component
public class OnboardingListener {
    @Async
    @TransactionalEventListener
    public void iniciarOnboarding(UsuarioCriadoEvent event) {
        onboarding.criarTarefasIniciais(event.userId()); // async + após commit
    }
}`,
          explanation: '@TransactionalEventListener garante que o evento só é processado após o commit. Se a transação fizer rollback, o evento não é disparado.'
        }
      ]
    },
    quiz: [
      {
        question: 'Por que configurar um ThreadPoolTaskExecutor personalizado para @Async?',
        options: [
          'Para @Async funcionar — sem ele não funciona',
          'Para limitar o número de threads e evitar que a aplicação crie threads ilimitadas sob carga',
          'Para nomear as threads',
          'Para suporte a CompletableFuture'
        ],
        answer: 1,
        explanation: 'O pool padrão do Spring pode criar threads sem limite. Em produção, pool sem limite = OutOfMemoryError sob carga. Sempre configure limites.'
      },
      {
        question: 'O que @TransactionalEventListener garante?',
        options: [
          'O evento roda em uma nova transação',
          'O listener só é executado se a transação que publicou o evento fizer COMMIT com sucesso',
          'O evento é processado de forma assíncrona',
          'O evento é persistido no banco antes de ser processado'
        ],
        answer: 1,
        explanation: 'Se a transação fizer rollback, @TransactionalEventListener não executa. Garante consistência: email só enviado se o usuário foi realmente salvo.'
      },
      {
        question: 'Qual a diferença entre fixedRate e fixedDelay?',
        options: [
          'São idênticos — apenas nomes diferentes',
          'fixedRate: intervalo desde o INÍCIO da execução anterior; fixedDelay: intervalo desde o FIM',
          'fixedDelay: intervalo desde o início; fixedRate: desde o fim',
          'fixedRate é em segundos; fixedDelay em milissegundos'
        ],
        answer: 1,
        explanation: 'fixedRate pode sobrepor execuções se a tarefa demorar mais que o intervalo. fixedDelay sempre aguarda o término antes de agendar a próxima.'
      },
      {
        question: 'O que a expressão cron "0 0 8 * * MON-FRI" significa?',
        options: [
          'Todo dia às 8h, de segunda a sexta',
          'Todo dia às 0h, somente segunda a sexta',
          'A cada 8 horas, de segunda a sexta',
          'Às 8h de segunda a sexta, 0 = hora inteira'
        ],
        answer: 0,
        explanation: '"0 0 8 * * MON-FRI" = segundo 0, minuto 0, hora 8, qualquer dia do mês, qualquer mês, segunda a sexta. Todo dia útil às 08:00:00.'
      }
    ]
  },
  {
    id: 'sb-flyway',
    title: 'Flyway — Migrations de Banco',
    xp: 20,
    lesson: {
      title: 'Flyway — Versionamento do Banco de Dados',
      theory: `Flyway controla a evolução do schema do banco de forma versionada. <strong>É o padrão em projetos Spring Boot de mercado</strong>.

Por que usar Flyway:
• Sem Flyway: cada desenvolvedor precisa rodar scripts manualmente
• Com Flyway: scripts são executados automaticamente na ordem correta
• Garantia de que dev/homologação/produção têm o mesmo schema
• Histórico de todas as mudanças no banco versionado junto ao código

Convenção de nomenclatura:
<code>V{versão}__{descrição}.sql</code>
Ex: <code>V1__criar_tabela_usuarios.sql</code>`,
      examples: [
        {
          title: 'Configuração e primeiros migrations',
          code: `<!-- pom.xml -->
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-core</artifactId>
</dependency>

# application.properties
spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migration
spring.flyway.baseline-on-migrate=true  # para banco já existente
spring.jpa.hibernate.ddl-auto=validate  # NÃO use create/update com Flyway!

# Estrutura de pastas:
# src/main/resources/
# └── db/
#     └── migration/
#         ├── V1__criar_schema_inicial.sql
#         ├── V2__adicionar_coluna_xp.sql
#         ├── V3__criar_tabela_conquistas.sql
#         └── R__view_ranking.sql   (R = Repeatable, sempre executa)

-- V1__criar_schema_inicial.sql
CREATE TABLE usuarios (
    id         BIGSERIAL PRIMARY KEY,
    nome       VARCHAR(100) NOT NULL,
    email      VARCHAR(255) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    criado_em  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE perguntas (
    id         BIGSERIAL PRIMARY KEY,
    enunciado  TEXT NOT NULL,
    resposta   TEXT NOT NULL,
    linguagem  VARCHAR(50) NOT NULL,
    xp         INT DEFAULT 10,
    criado_em  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_perguntas_linguagem ON perguntas(linguagem);`,
          explanation: 'Flyway executa migrations em ordem numérica. Após executado, o script NUNCA é alterado — crie um novo V{n} para qualquer mudança.'
        },
        {
          title: 'Migrations evolutivas — adicionando e alterando',
          code: `-- V2__adicionar_xp_usuario.sql
-- Adiciona coluna com valor padrão (não quebra produção)
ALTER TABLE usuarios ADD COLUMN xp INT DEFAULT 0 NOT NULL;
ALTER TABLE usuarios ADD COLUMN nivel VARCHAR(50) DEFAULT 'Iniciante';

-- V3__criar_tabela_historico.sql
CREATE TABLE historico_quiz (
    id          BIGSERIAL PRIMARY KEY,
    usuario_id  BIGINT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    pergunta_id BIGINT NOT NULL REFERENCES perguntas(id),
    acertou     BOOLEAN NOT NULL,
    xp_ganho    INT DEFAULT 0,
    feito_em    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_historico_usuario ON historico_quiz(usuario_id);
CREATE INDEX idx_historico_pergunta ON historico_quiz(pergunta_id);

-- V4__renomear_coluna.sql
-- Para renomear (NUNCA edite o V1!):
ALTER TABLE usuarios RENAME COLUMN senha_hash TO password_hash;

-- V5__criar_constraint.sql
-- Adicionar constraint sem remover dados:
UPDATE perguntas SET xp = 10 WHERE xp <= 0;  -- limpa primeiro
ALTER TABLE perguntas ADD CONSTRAINT chk_xp_positivo CHECK (xp > 0);

-- V6__popular_dados_iniciais.sql
-- Dados iniciais (seed):
INSERT INTO perguntas (enunciado, resposta, linguagem, xp) VALUES
    ('O que é Spring Boot?', 'Framework Java para APIs REST', 'spring', 10),
    ('O que é Angular?', 'Framework frontend do Google', 'angular', 10);`,
          explanation: 'Nunca altere um migration já executado — o Flyway detecta checksum diferente e falha. Sempre crie um novo V{n} para qualquer mudança.'
        }
      ]
    },
    quiz: [
      {
        question: 'Por que usar validate em spring.jpa.hibernate.ddl-auto com Flyway?',
        options: [
          'Para o Hibernate criar tabelas automaticamente',
          'Para o Hibernate verificar se o schema bate com as entidades, sem modificar o banco — Flyway cuida das mudanças',
          'Para desabilitar o banco em memória',
          'Para rodar Flyway automaticamente'
        ],
        answer: 1,
        explanation: 'Com Flyway, o Hibernate NÃO deve alterar o banco. validate só confirma consistência. create ou update conflita com Flyway e pode destruir dados.'
      },
      {
        question: 'O que acontece se você editar um arquivo de migration já executado?',
        options: [
          'O Flyway executa o script novamente',
          'O Flyway falha ao iniciar — detecta checksum diferente do que foi executado',
          'O Flyway ignora a mudança',
          'O Flyway cria um novo migration automático'
        ],
        answer: 1,
        explanation: 'Flyway salva checksum de cada migration. Se o arquivo mudar, a aplicação não sobe. Crie SEMPRE um novo V{n} para qualquer alteração.'
      },
      {
        question: 'Qual a diferença entre migrations V (versionados) e R (repeatable)?',
        options: [
          'V e R são idênticos — apenas convenção de nome',
          'V executa uma vez na versão certa; R executa sempre que seu conteúdo mudar (ideal para views, functions)',
          'R é mais rápido que V',
          'R executa em ordem reversa'
        ],
        answer: 1,
        explanation: 'R__ migrations (Repeatable) executam sempre que o checksum mudar — perfeito para views e stored procedures que você atualiza com frequência.'
      },
      {
        question: 'Como adicionar uma coluna NOT NULL a uma tabela com dados existentes?',
        options: [
          'ALTER TABLE t ADD COLUMN col NOT NULL; (direto)',
          'Adicionar com DEFAULT primeiro, popular os dados, depois adicionar a constraint NOT NULL',
          'Não é possível sem perder dados',
          'Usar spring.jpa.hibernate.ddl-auto=update'
        ],
        answer: 1,
        explanation: 'Adicionar NOT NULL sem DEFAULT em tabela com dados falha. Padrão seguro: ADD COLUMN col DEFAULT valor → UPDATE para popular → ADD CONSTRAINT NOT NULL.'
      }
    ]
  }
];

if (window.SPRING_DATA) {
  window.SPRING_DATA.topics = window.SPRING_DATA.topics.concat(window.SPRING_FULLSTACK);
}
