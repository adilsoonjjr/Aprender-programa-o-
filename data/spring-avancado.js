// Spring Avançado — Microservices, Kafka, Observabilidade e WebFlux
window.SPRING_AVANCADO = [
  {
    id: 'sb-microservices',
    title: 'Microservices com Spring Cloud',
    xp: 30,
    lesson: {
      title: 'Microservices com Spring Cloud — Discovery, Gateway e Resilience',
      theory: `<strong>Spring Cloud</strong> fornece um conjunto de ferramentas para construir sistemas de microservices robustos sobre Spring Boot.

<strong>Componentes essenciais do ecossistema:</strong>
• <strong>Eureka (Service Discovery)</strong> — registro central onde cada microservice se registra e descobre outros pelo nome, não por IP fixo
• <strong>Spring Cloud Gateway</strong> — API Gateway moderno e reativo que roteia requests, aplica filtros, rate limiting e autenticação
• <strong>OpenFeign</strong> — cliente HTTP declarativo: define interface Java com anotações, Spring gera a implementação
• <strong>Spring Cloud LoadBalancer</strong> — balanceamento de carga client-side integrado ao Eureka
• <strong>Resilience4j</strong> — biblioteca de tolerância a falhas: Circuit Breaker, Retry, Rate Limiter, Bulkhead, TimeLimiter

<strong>Padrão Circuit Breaker:</strong>
• <strong>Closed</strong> — tudo normal, requests passam
• <strong>Open</strong> — muitas falhas detectadas, requests bloqueados por X segundos (fallback é chamado)
• <strong>Half-Open</strong> — após timeout, testa alguns requests para ver se o serviço voltou

<strong>Arquitetura típica:</strong>
<code>Client → API Gateway → [Service Discovery] → Microservices</code>

Cada microservice é um projeto Spring Boot independente com seu próprio banco de dados, pipeline de CI/CD e equipe.`,
      examples: [
        {
          title: 'Eureka Service Discovery — registrar e descobrir serviços',
          code: `// =========================================================
// 1. Eureka Server — registry central
// =========================================================
// pom.xml do eureka-server
/*
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
*/

// EurekaServerApplication.java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer  // ativa o servidor de registro
public class EurekaServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }
}

// application.yml do eureka-server
/*
server:
  port: 8761

spring:
  application:
    name: eureka-server

eureka:
  instance:
    hostname: localhost
  client:
    # O servidor não precisa se registrar em si mesmo
    register-with-eureka: false
    fetch-registry: false
    service-url:
      defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/
  server:
    wait-time-in-ms-when-sync-empty: 0  # dev: sem espera inicial
*/

// =========================================================
// 2. Microservice registrado no Eureka
// =========================================================
// pom.xml do produto-service
/*
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
*/

// ProdutoServiceApplication.java
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient  // registra no Eureka ao subir
public class ProdutoServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProdutoServiceApplication.class, args);
    }
}

// application.yml do produto-service
/*
server:
  port: 8081

spring:
  application:
    name: produto-service  # nome usado pelos outros serviços para encontrá-lo

eureka:
  instance:
    prefer-ip-address: true          # registra com IP (melhor para containers)
    lease-renewal-interval-in-seconds: 10   # heartbeat a cada 10s
    lease-expiration-duration-in-seconds: 30
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
    registry-fetch-interval-seconds: 5  # atualiza lista de serviços a cada 5s
*/

// =========================================================
// 3. Descoberta de serviço programática
// =========================================================
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;

@RestController
@RequestMapping("/admin")
public class DiscoveryController {

    @Autowired
    private DiscoveryClient discoveryClient;

    @GetMapping("/services")
    public List<String> getServicos() {
        return discoveryClient.getServices();
        // Retorna: ["produto-service", "pedido-service", "pagamento-service"]
    }

    @GetMapping("/services/{nome}/instances")
    public List<ServiceInstance> getInstancias(@PathVariable String nome) {
        return discoveryClient.getInstances(nome);
        // Retorna todas as instâncias do serviço (IP, porta, metadados)
    }
}`,
          explanation: '@EnableEurekaServer cria o registro central. @EnableDiscoveryClient faz o microservice se registrar ao subir, enviando heartbeats periódicos. Outros serviços consultam o Eureka pelo nome (produto-service) e obtêm o IP/porta atual — sem configuração hard-coded. Isso é fundamental em containers (Kubernetes) onde IPs mudam a cada deploy.'
        },
        {
          title: 'Spring Cloud Gateway + OpenFeign — API Gateway e cliente HTTP',
          code: `// =========================================================
// 1. Spring Cloud Gateway — roteamento e filtros
// =========================================================
// application.yml do api-gateway (porta 8080)
/*
server:
  port: 8080

spring:
  application:
    name: api-gateway
  cloud:
    gateway:
      routes:
        # Rota para produto-service (com load balancing via Eureka)
        - id: produto-route
          uri: lb://produto-service        # lb:// = load balanced via Eureka
          predicates:
            - Path=/api/produtos/**        # redireciona este path
          filters:
            - StripPrefix=1               # remove /api do path antes de encaminhar
            - AddRequestHeader=X-Gateway-Source, api-gateway
            - name: CircuitBreaker        # circuit breaker por rota
              args:
                name: produtoCircuitBreaker
                fallbackUri: forward:/fallback/produtos

        # Rota para pedido-service com autenticação JWT
        - id: pedido-route
          uri: lb://pedido-service
          predicates:
            - Path=/api/pedidos/**
            - Header=Authorization, Bearer .*   # só aceita com JWT
          filters:
            - StripPrefix=1
            - name: RequestRateLimiter    # rate limiting
              args:
                redis-rate-limiter.replenishRate: 10    # 10 req/s
                redis-rate-limiter.burstCapacity: 20

      default-filters:
        - DedupeResponseHeader=Access-Control-Allow-Origin
*/

// GatewayApplication.java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }
}

// FallbackController.java — resposta quando serviço está fora
@RestController
@RequestMapping("/fallback")
public class FallbackController {

    @GetMapping("/produtos")
    public ResponseEntity<Map<String, String>> produtosFallback() {
        return ResponseEntity.status(503).body(Map.of(
            "status", "indisponível",
            "mensagem", "Serviço de produtos temporariamente indisponível. Tente em breve.",
            "timestamp", Instant.now().toString()
        ));
    }
}

// =========================================================
// 2. OpenFeign — cliente HTTP declarativo
// =========================================================
// pom.xml do pedido-service
/*
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
*/

// PedidoServiceApplication.java
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients  // habilita processamento das interfaces @FeignClient
public class PedidoServiceApplication { ... }

// ProdutoClient.java — interface que gera o cliente HTTP automaticamente
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

// name: nome do serviço no Eureka. Feign + LoadBalancer resolvem automaticamente
@FeignClient(
    name = "produto-service",
    fallbackFactory = ProdutoClientFallbackFactory.class
)
public interface ProdutoClient {

    @GetMapping("/produtos/{id}")
    ProdutoDTO getProduto(@PathVariable Long id);

    @GetMapping("/produtos")
    List<ProdutoDTO> listarProdutos(@RequestParam(required = false) String categoria);

    @PutMapping("/produtos/{id}/estoque")
    void atualizarEstoque(@PathVariable Long id, @RequestBody EstoqueDTO estoque);
}

// ProdutoClientFallbackFactory.java — fallback com acesso à exceção
import feign.hystrix.FallbackFactory;
import org.springframework.stereotype.Component;

@Component
public class ProdutoClientFallbackFactory implements FallbackFactory<ProdutoClient> {

    private static final Logger log = LoggerFactory.getLogger(ProdutoClientFallbackFactory.class);

    @Override
    public ProdutoClient create(Throwable cause) {
        log.error("Feign call to produto-service failed: {}", cause.getMessage());

        return new ProdutoClient() {
            @Override
            public ProdutoDTO getProduto(Long id) {
                // Retorna um produto "placeholder" em caso de falha
                return ProdutoDTO.builder()
                    .id(id)
                    .nome("Produto indisponível")
                    .preco(BigDecimal.ZERO)
                    .disponivel(false)
                    .build();
            }

            @Override
            public List<ProdutoDTO> listarProdutos(String categoria) {
                return Collections.emptyList(); // lista vazia como fallback
            }

            @Override
            public void atualizarEstoque(Long id, EstoqueDTO estoque) {
                // Log e ignora — será reprocessado via retry/saga
                log.warn("Falha ao atualizar estoque do produto {}", id);
            }
        };
    }
}

// Uso no Service — como se fosse um bean local
@Service
@RequiredArgsConstructor
public class PedidoService {
    private final ProdutoClient produtoClient; // injetado pelo Spring

    public PedidoDTO criarPedido(CriarPedidoRequest request) {
        // Chama produto-service via HTTP transparentemente
        ProdutoDTO produto = produtoClient.getProduto(request.getProdutoId());
        if (!produto.isDisponivel()) {
            throw new ProdutoIndisponivelException(request.getProdutoId());
        }
        // ... lógica de criação do pedido
    }
}`,
          explanation: 'O Spring Cloud Gateway centraliza cross-cutting concerns (autenticação, rate limiting, logging) sem poluir os microservices. lb:// instrui o Gateway a usar o Eureka + LoadBalancer para descobrir o IP real do serviço. OpenFeign é poderoso pela simplicidade: você define uma interface Java e o Spring gera todo o código HTTP, serialização JSON e load balancing. FallbackFactory tem acesso à exceção original para logging adequado.'
        },
        {
          title: 'Circuit Breaker com Resilience4j — tolerância a falhas',
          code: `// =========================================================
// Resilience4j — Circuit Breaker, Retry e TimeLimiter
// =========================================================
// pom.xml
/*
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-circuitbreaker-resilience4j</artifactId>
</dependency>
*/

// application.yml — configuração dos circuit breakers
/*
resilience4j:
  circuitbreaker:
    instances:
      produtoService:
        # Janela de 10 chamadas para calcular taxa de falha
        slidingWindowSize: 10
        slidingWindowType: COUNT_BASED      # ou TIME_BASED (janela de tempo)
        # Abre o circuit se >= 50% das chamadas falharem
        failureRateThreshold: 50
        # Quantidade mínima de chamadas antes de avaliar
        minimumNumberOfCalls: 5
        # Tempo aberto antes de tentar Half-Open
        waitDurationInOpenState: 30s
        # Número de chamadas de teste no estado Half-Open
        permittedNumberOfCallsInHalfOpenState: 3
        # Exceções que devem ser ignoradas (não contam como falha)
        ignoreExceptions:
          - com.empresa.exceptions.NegocioException
        # Registra eventos no Actuator
        registerHealthIndicator: true

  retry:
    instances:
      produtoService:
        maxAttempts: 3                    # 3 tentativas no total
        waitDuration: 500ms               # espera 500ms entre tentativas
        enableExponentialBackoff: true
        exponentialBackoffMultiplier: 2   # 500ms, 1000ms, 2000ms
        retryExceptions:
          - java.net.ConnectException
          - java.util.concurrent.TimeoutException

  timelimiter:
    instances:
      produtoService:
        timeoutDuration: 3s              # timeout de 3 segundos
        cancelRunningFuture: true
*/

// =========================================================
// Uso com anotações no Service
// =========================================================
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import io.github.resilience4j.timelimiter.annotation.TimeLimiter;

@Service
@RequiredArgsConstructor
@Slf4j
public class PedidoService {

    private final ProdutoClient produtoClient;
    private final PedidoRepository pedidoRepository;

    // Circuit Breaker + Retry combinados
    @CircuitBreaker(name = "produtoService", fallbackMethod = "getProdutoFallback")
    @Retry(name = "produtoService")
    public ProdutoDTO buscarProduto(Long id) {
        return produtoClient.getProduto(id);
        // Se falhar 5 de 10 vezes → circuit abre por 30s
        // Cada falha individual → retry com backoff exponencial
    }

    // Fallback com a mesma assinatura + Throwable ao final
    private ProdutoDTO getProdutoFallback(Long id, Throwable ex) {
        log.warn("Circuit Breaker ativado para produto {}. Causa: {}", id, ex.getMessage());
        // Retorna dado do cache, default ou lança exceção de negócio
        return ProdutoDTO.builder()
            .id(id)
            .nome("Produto temporariamente indisponível")
            .preco(BigDecimal.ZERO)
            .disponivel(false)
            .build();
    }

    // TimeLimiter — timeout para operações que podem demorar muito
    @CircuitBreaker(name = "produtoService", fallbackMethod = "processarPedidoFallback")
    @TimeLimiter(name = "produtoService")
    public CompletableFuture<PedidoDTO> processarPedido(CriarPedidoRequest request) {
        return CompletableFuture.supplyAsync(() -> {
            // Operação que pode demorar (ex: pagamento externo)
            ProdutoDTO produto = produtoClient.getProduto(request.getProdutoId());
            return criarPedidoInterno(produto, request);
        });
    }

    private CompletableFuture<PedidoDTO> processarPedidoFallback(
            CriarPedidoRequest request, Throwable ex) {
        log.error("Timeout/Falha ao processar pedido: {}", ex.getMessage());
        return CompletableFuture.failedFuture(
            new ServicoIndisponivelException("Processamento de pedidos indisponível")
        );
    }

    // =========================================================
    // Programático — para lógica mais complexa
    // =========================================================
    private final CircuitBreakerRegistry circuitBreakerRegistry;

    public void verificarCircuito() {
        CircuitBreaker cb = circuitBreakerRegistry.circuitBreaker("produtoService");
        CircuitBreaker.State estado = cb.getState();

        log.info("Circuit Breaker estado: {}", estado);
        // CLOSED, OPEN, HALF_OPEN, DISABLED, METRICS_ONLY

        // Métricas em tempo real
        CircuitBreaker.Metrics metrics = cb.getMetrics();
        log.info("Taxa de falha: {}%", metrics.getFailureRate());
        log.info("Chamadas bem-sucedidas: {}", metrics.getNumberOfSuccessfulCalls());
        log.info("Chamadas com falha: {}", metrics.getNumberOfFailedCalls());
    }
}`,
          explanation: 'O padrão Circuit Breaker protege a cascata de falhas: se produto-service está lento, sem circuit breaker o pedido-service acumularia threads bloqueadas até travar. Com circuit breaker aberto, os requests falham imediatamente com o fallback, aliviando a pressão. A combinação @CircuitBreaker + @Retry é poderosa: Retry tenta novamente erros transitórios, Circuit Breaker abre se a taxa de falha persistir. TimeLimiter previne threads presas em operações lentas.'
        }
      ],
      quiz: [
        {
          q: 'Qual é a função do Eureka no ecossistema Spring Cloud?',
          options: [
            'Gerenciar o banco de dados compartilhado entre microservices',
            'Atuar como registro central onde microservices se cadastram e descobrem uns aos outros pelo nome',
            'Balancear a carga entre instâncias do mesmo microservice no servidor',
            'Monitorar logs de todos os microservices em um único lugar'
          ],
          answer: 1,
          explanation: 'Eureka é um Service Registry: cada microservice se registra ao subir com seu nome e IP/porta. Quando um serviço precisa chamar outro, consulta o Eureka pelo nome (ex: "produto-service") e obtém o endereço atual. Isso é fundamental em ambientes dinâmicos como Kubernetes onde pods recebem IPs diferentes a cada deploy.'
        },
        {
          q: 'O que o prefixo lb:// na URI de uma rota do Spring Cloud Gateway significa?',
          options: [
            'Que a rota usa HTTP em vez de HTTPS (Load Balancer = LB)',
            'Que o Gateway deve resolver o nome do serviço via Service Discovery e balancear a carga entre instâncias disponíveis',
            'Que a rota exige autenticação com Bearer token',
            'Que o Gateway usa uma rota Local e Blocking (lb) em vez de reativa'
          ],
          answer: 1,
          explanation: 'lb:// instrui o Gateway a usar o Spring Cloud LoadBalancer (client-side load balancing) integrado ao Eureka. Em vez de um IP fixo, o Gateway consulta o Eureka pelo nome do serviço, obtém a lista de instâncias disponíveis e distribui as requisições entre elas usando round-robin por padrão. Sem lb://, você usaria uma URL estática e perderia service discovery e load balancing.'
        },
        {
          q: 'Quando o Circuit Breaker entra no estado OPEN, o que acontece com as chamadas subsequentes?',
          options: [
            'Ficam em fila esperando o serviço se recuperar',
            'São redirecionadas para outra instância do mesmo serviço automaticamente',
            'Falham imediatamente sem tentar chamar o serviço, e o método de fallback é executado',
            'São retentadas com backoff exponencial até o serviço responder'
          ],
          answer: 2,
          explanation: 'No estado OPEN, o Circuit Breaker não tenta a chamada — ela falha imediatamente (fail-fast). Isso é intencional: evita acumular threads esperando por um serviço que sabidamente está falhando (cascata de falhas). O fallback é chamado imediatamente, retornando dados do cache ou uma resposta degradada. Após waitDurationInOpenState (ex: 30s), vai para HALF_OPEN para testar se o serviço se recuperou.'
        },
        {
          q: 'Qual é a vantagem do OpenFeign sobre o RestTemplate para chamar outros microservices?',
          options: [
            'OpenFeign é mais rápido porque usa WebSockets em vez de HTTP',
            'OpenFeign é declarativo: você define uma interface Java com anotações e o Spring gera a implementação com HTTP, serialização e load balancing automaticamente',
            'OpenFeign funciona com qualquer framework, RestTemplate é exclusivo do Spring',
            'OpenFeign suporta chamadas assíncronas, RestTemplate é sempre síncrono'
          ],
          answer: 1,
          explanation: 'Com RestTemplate você escreve código imperativo: URL, headers, tipos de retorno, tratamento de erros. Com OpenFeign, você declara uma interface Java com as mesmas anotações usadas no @RestController (@GetMapping, @PathVariable, etc.) e o Spring gera todo o código de cliente HTTP, incluindo integração com Eureka (load balancing) e Resilience4j (circuit breaker). Reduz drasticamente o boilerplate.'
        },
        {
          q: 'Para que serve o @TimeLimiter do Resilience4j?',
          options: [
            'Para limitar o número de vezes que um método pode ser chamado por minuto',
            'Para definir um timeout máximo para operações, evitando que threads fiquem bloqueadas indefinidamente aguardando resposta',
            'Para agendar a execução de métodos em intervalos de tempo definidos',
            'Para limitar o tempo de vida de beans no contexto do Spring'
          ],
          answer: 1,
          explanation: '@TimeLimiter define um timeout máximo para operações assíncronas (CompletableFuture). Se a operação não completar dentro do timeoutDuration configurado, lança uma TimeoutException e chama o fallback. Isso é crucial para prevenir thread pool starvation: sem timeout, chamadas lentas para serviços externos acumulam threads bloqueadas até esgotar o pool inteiro do servidor.'
        }
      ]
    }
  },

  {
    id: 'sb-kafka',
    title: 'Apache Kafka com Spring',
    xp: 25,
    lesson: {
      title: 'Apache Kafka com Spring — Event-Driven Microservices',
      theory: `<strong>Apache Kafka</strong> é uma plataforma de streaming de eventos distribuída. No contexto de microservices, permite comunicação assíncrona e desacoplada.

<strong>Conceitos fundamentais:</strong>
• <strong>Topic</strong> — canal de mensagens (ex: "pedidos-criados", "pagamentos-processados")
• <strong>Partition</strong> — divisão de um topic para paralelismo. Mensagens com mesma key vão para mesma partition
• <strong>Producer</strong> — envia mensagens para topics
• <strong>Consumer</strong> — lê mensagens de topics
• <strong>Consumer Group</strong> — grupo de consumers que divide as partições entre si (scale horizontal)
• <strong>Offset</strong> — posição de uma mensagem na partição. Consumer guarda o offset lido
• <strong>Broker</strong> — servidor Kafka que armazena as mensagens
• <strong>Retention</strong> — quanto tempo as mensagens ficam armazenadas (padrão: 7 dias)

<strong>Quando usar Kafka:</strong>
• Comunicação assíncrona entre microservices (sem acoplamento temporal)
• Event Sourcing — registrar toda mudança de estado como evento
• CQRS — separar escritas de leituras
• Real-time analytics — processar streams de dados
• Log de auditoria imutável

<strong>Spring Kafka:</strong>
• <code>KafkaTemplate</code> — envia mensagens de forma programática
• <code>@KafkaListener</code> — consume mensagens de forma declarativa
• <code>@EnableKafka</code> — habilita processamento das anotações
• Suporte a transações, retry automático e Dead Letter Topics (DLT)`,
      examples: [
        {
          title: 'Producer — enviar eventos com KafkaTemplate',
          code: `// =========================================================
// pom.xml
// =========================================================
/*
<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka</artifactId>
</dependency>
*/

// =========================================================
// application.yml — configuração do Producer
// =========================================================
/*
spring:
  kafka:
    bootstrap-servers: localhost:9092   # endereço do Kafka broker

    producer:
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.springframework.kafka.support.serializer.JsonSerializer
      # Garante exatamente uma entrega (idempotência)
      acks: all                         # aguarda confirmação de todas as réplicas
      retries: 3
      properties:
        enable.idempotence: true
        max.in.flight.requests.per.connection: 1  # garante ordem + idempotência
        spring.json.add.type.headers: false       # não inclui tipo Java no header
*/

// =========================================================
// KafkaProducerConfig.java — configuração programática
// =========================================================
import org.apache.kafka.clients.producer.ProducerConfig;
import org.springframework.kafka.core.*;

@Configuration
public class KafkaProducerConfig {

    @Value("${spring.kafka.bootstrap-servers}")
    private String bootstrapServers;

    @Bean
    public ProducerFactory<String, Object> producerFactory() {
        Map<String, Object> config = new HashMap<>();
        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        config.put(ProducerConfig.ACKS_CONFIG, "all");
        config.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true);
        config.put(ProducerConfig.RETRIES_CONFIG, 3);
        return new DefaultKafkaProducerFactory<>(config);
    }

    @Bean
    public KafkaTemplate<String, Object> kafkaTemplate() {
        return new KafkaTemplate<>(producerFactory());
    }

    @Bean
    public NewTopic topicPedidosCriados() {
        // Cria o topic automaticamente com 3 partições e replication factor 1
        return TopicBuilder.name("pedidos-criados")
            .partitions(3)
            .replicas(1)
            .build();
    }
}

// =========================================================
// PedidoEventProducer.java — serviço que envia eventos
// =========================================================
@Service
@RequiredArgsConstructor
@Slf4j
public class PedidoEventProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publicarPedidoCriado(Pedido pedido) {
        PedidoCriadoEvent evento = PedidoCriadoEvent.builder()
            .pedidoId(pedido.getId())
            .clienteId(pedido.getClienteId())
            .total(pedido.getTotal())
            .itens(pedido.getItens())
            .criadoEm(Instant.now())
            .build();

        // KEY = clienteId garante que pedidos do mesmo cliente vão para a mesma partição
        // → garante processamento ordenado por cliente
        ProducerRecord<String, Object> record = new ProducerRecord<>(
            "pedidos-criados",
            pedido.getClienteId().toString(), // key
            evento                            // value
        );

        // Envio com callback de sucesso/erro
        kafkaTemplate.send(record)
            .whenComplete((result, ex) -> {
                if (ex == null) {
                    log.info("Evento pedido {} enviado para partition {} offset {}",
                        pedido.getId(),
                        result.getRecordMetadata().partition(),
                        result.getRecordMetadata().offset());
                } else {
                    log.error("Falha ao enviar evento para pedido {}: {}",
                        pedido.getId(), ex.getMessage());
                    // Em produção: salvar em tabela "outbox" para retry
                }
            });
    }

    // Envio síncrono — use apenas quando precisa garantir entrega antes de continuar
    public RecordMetadata enviarSincrono(String topic, String key, Object payload)
            throws ExecutionException, InterruptedException {
        return kafkaTemplate.send(topic, key, payload).get(); // bloqueia até confirmação
    }
}`,
          explanation: 'A KEY da mensagem Kafka é crucial: mensagens com a mesma key sempre vão para a mesma partição, garantindo ordem de processamento para aquele contexto (ex: todas as operações de um cliente). acks=all + enable.idempotence=true garante que a mensagem não é perdida mesmo se o broker líder cair. O padrão Outbox (salvar evento na mesma transaction do banco antes de enviar) previne inconsistências se o Kafka estiver indisponível no momento do send.'
        },
        {
          title: 'Consumer — @KafkaListener e Consumer Groups',
          code: `// =========================================================
// application.yml — configuração do Consumer
// =========================================================
/*
spring:
  kafka:
    consumer:
      group-id: pagamento-service          # nome do consumer group
      auto-offset-reset: earliest          # lê desde o início se grupo novo
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.springframework.kafka.support.serializer.JsonDeserializer
      enable-auto-commit: false            # commit manual — mais controle
      properties:
        spring.json.trusted.packages: "com.empresa.eventos"
        spring.json.value.default.type: com.empresa.eventos.PedidoCriadoEvent
        max.poll.records: 50               # processa 50 mensagens por poll

    listener:
      ack-mode: MANUAL_IMMEDIATE           # commit manual após processar
      concurrency: 3                       # 3 threads consumindo em paralelo
*/

// =========================================================
// KafkaConsumerConfig.java
// =========================================================
@Configuration
@EnableKafka  // ativa o processamento de @KafkaListener
public class KafkaConsumerConfig {

    @Bean
    public ConsumerFactory<String, PedidoCriadoEvent> consumerFactory() {
        Map<String, Object> config = new HashMap<>();
        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        config.put(ConsumerConfig.GROUP_ID_CONFIG, "pagamento-service");
        config.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, false);
        config.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");

        JsonDeserializer<PedidoCriadoEvent> deserializer =
            new JsonDeserializer<>(PedidoCriadoEvent.class, false);

        return new DefaultKafkaConsumerFactory<>(
            config,
            new StringDeserializer(),
            deserializer
        );
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, PedidoCriadoEvent> kafkaListenerContainerFactory() {
        var factory = new ConcurrentKafkaListenerContainerFactory<String, PedidoCriadoEvent>();
        factory.setConsumerFactory(consumerFactory());
        factory.setConcurrency(3);  // 3 consumers em paralelo
        factory.getContainerProperties().setAckMode(ContainerProperties.AckMode.MANUAL_IMMEDIATE);
        return factory;
    }
}

// =========================================================
// PagamentoConsumer.java — ouve eventos de pedidos
// =========================================================
@Component
@RequiredArgsConstructor
@Slf4j
public class PagamentoConsumer {

    private final PagamentoService pagamentoService;

    // Consumer básico com Acknowledgment manual
    @KafkaListener(
        topics = "pedidos-criados",
        groupId = "pagamento-service",
        containerFactory = "kafkaListenerContainerFactory"
    )
    public void processarPedido(
            ConsumerRecord<String, PedidoCriadoEvent> record,
            Acknowledgment ack) {

        log.info("Processando pedido {} da partition {} offset {}",
            record.value().getPedidoId(),
            record.partition(),
            record.offset());

        try {
            pagamentoService.processarPagamento(record.value());
            ack.acknowledge(); // Faz commit do offset APENAS após sucesso
            log.info("Pedido {} processado com sucesso", record.value().getPedidoId());
        } catch (Exception e) {
            log.error("Erro ao processar pedido {}: {}",
                record.value().getPedidoId(), e.getMessage());
            // NÃO chama ack.acknowledge() → mensagem será reprocessada
            throw e; // deixa o Spring reenviar para DLT após esgotar retries
        }
    }

    // @RetryableTopic — retry automático com backoff e Dead Letter Topic
    @RetryableTopic(
        attempts = "4",                    // 1 original + 3 retries
        backoff = @Backoff(delay = 1000, multiplier = 2.0, maxDelay = 10000),
        // Retries em topics separados: pedidos-criados-retry-1, -retry-2, -retry-3
        dltStrategy = DltStrategy.FAIL_ON_ERROR,  // DLT recebe mensagens não processadas
        autoCreateTopics = "true"
    )
    @KafkaListener(topics = "pedidos-estoque", groupId = "estoque-service")
    public void atualizarEstoque(PedidoCriadoEvent evento) {
        // Spring Kafka cria automaticamente topics de retry:
        // pedidos-estoque-retry-0 (delay 1s)
        // pedidos-estoque-retry-1 (delay 2s)
        // pedidos-estoque-retry-2 (delay 4s)
        // pedidos-estoque-dlt (Dead Letter Topic — falhou em todos os retries)
        pagamentoService.reservarEstoque(evento);
    }

    // Consumer do Dead Letter Topic — mensagens que falharam em todos retries
    @KafkaListener(topics = "pedidos-estoque-dlt", groupId = "estoque-dlt-handler")
    public void handleDlt(ConsumerRecord<String, PedidoCriadoEvent> record) {
        log.error("Mensagem foi para DLT após todos os retries. Pedido: {}",
            record.value().getPedidoId());
        // Alerta no Slack, cria ticket no Jira, salva para reprocessamento manual
    }
}`,
          explanation: 'enable-auto-commit: false com ACK manual é o padrão para produção: a mensagem só é confirmada como processada se o código executou com sucesso. Sem isso, se a aplicação cair no meio do processamento, o offset já foi commitado e a mensagem é perdida. @RetryableTopic é uma abstração poderosa: cria automaticamente topics separados para cada tentativa de retry, evitando que uma mensagem problemática bloqueie as demais. O DLT é o "lixo inteligente" — guarda mensagens que falharam em todos os retries para análise e reprocessamento manual.'
        },
        {
          title: 'Transações Kafka + Spring — exactly-once semantics',
          code: `// =========================================================
// Exactly-Once: mensagem processada EXATAMENTE uma vez
// =========================================================
// application.yml — configuração de transações
/*
spring:
  kafka:
    producer:
      transaction-id-prefix: pagamento-tx-  # prefixo único por instância
      acks: all
      properties:
        enable.idempotence: true              # produtor idempotente (obrigatório)
        max.in.flight.requests.per.connection: 1

    consumer:
      isolation-level: read_committed         # só lê mensagens de tx commitadas
      enable-auto-commit: false

    listener:
      ack-mode: RECORD                        # compatível com transações
*/

// =========================================================
// KafkaTransactionConfig.java
// =========================================================
@Configuration
public class KafkaTransactionConfig {

    @Bean
    public KafkaTransactionManager<String, Object> kafkaTransactionManager(
            ProducerFactory<String, Object> producerFactory) {
        return new KafkaTransactionManager<>(producerFactory);
    }

    // Configura ProducerFactory para transações
    @Bean
    public ProducerFactory<String, Object> transactionalProducerFactory() {
        Map<String, Object> config = new HashMap<>();
        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        config.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true);
        config.put(ProducerConfig.ACKS_CONFIG, "all");

        DefaultKafkaProducerFactory<String, Object> factory =
            new DefaultKafkaProducerFactory<>(config);

        // Prefixo único por instância da aplicação (para múltiplas instâncias)
        factory.setTransactionIdPrefix("pagamento-tx-");
        return factory;
    }
}

// =========================================================
// PagamentoTransacionalService.java
// =========================================================
@Service
@RequiredArgsConstructor
@Slf4j
public class PagamentoTransacionalService {

    private final PagamentoRepository pagamentoRepository;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    // @Transactional engloba banco de dados E Kafka atomicamente
    // Se o banco falhar → Kafka também faz rollback (mensagem não enviada)
    // Se o Kafka falhar → banco também faz rollback (pagamento não salvo)
    @Transactional  // Spring detecta o KafkaTransactionManager e inclui na transação
    public void processarPagamentoComTransacao(PedidoCriadoEvent pedido) {

        // 1. Salva no banco — dentro da transação JPA + Kafka
        Pagamento pagamento = Pagamento.builder()
            .pedidoId(pedido.getPedidoId())
            .valor(pedido.getTotal())
            .status(StatusPagamento.PROCESSANDO)
            .build();

        pagamentoRepository.save(pagamento);

        // 2. Processa pagamento externo
        ResultadoPagamento resultado = processarNoGateway(pedido);

        // 3. Atualiza status no banco
        pagamento.setStatus(resultado.isAprovado()
            ? StatusPagamento.APROVADO
            : StatusPagamento.RECUSADO);
        pagamentoRepository.save(pagamento);

        // 4. Publica evento no Kafka — SOMENTE quando tudo der certo
        PagamentoProcessadoEvent evento = PagamentoProcessadoEvent.builder()
            .pedidoId(pedido.getPedidoId())
            .aprovado(resultado.isAprovado())
            .codigoAutorizacao(resultado.getCodigo())
            .build();

        kafkaTemplate.send("pagamentos-processados", pedido.getPedidoId().toString(), evento);
        // Se esta linha lançar exceção → rollback de TUDO (banco + Kafka)

        log.info("Pagamento do pedido {} processado: {}",
            pedido.getPedidoId(),
            resultado.isAprovado() ? "APROVADO" : "RECUSADO");
    }

    // Padrão Consume-Transform-Produce (atomicamente)
    @Transactional
    @KafkaListener(topics = "pedidos-criados", groupId = "pagamento-transacional")
    public void consumirEPublicar(PedidoCriadoEvent pedido) {
        // O consumer offset + o produce formam uma única transação Kafka
        // → se o produce falhar, o offset não é commitado
        // → a mensagem será reprocessada → exactly-once garantido
        processarPagamentoComTransacao(pedido);
    }

    private ResultadoPagamento processarNoGateway(PedidoCriadoEvent pedido) {
        // Integração com gateway de pagamento (Stripe, PagSeguro, etc.)
        return ResultadoPagamento.builder().aprovado(true).codigo("AUTH-123").build();
    }
}`,
          explanation: 'Exactly-once em Kafka requer três elementos: produtor idempotente (enable.idempotence=true) evita mensagens duplicadas em retries, transactional.id agrupa múltiplos sends em uma transação atômica, e isolation-level=read_committed no consumer garante que só leia mensagens de transações confirmadas. A combinação de @Transactional do Spring com KafkaTransactionManager cria uma "super transação" que engloba banco de dados + Kafka atomicamente — ou tudo vai, ou nada vai.'
        }
      ],
      quiz: [
        {
          q: 'O que é um Consumer Group no Apache Kafka?',
          options: [
            'Um conjunto de topics relacionados gerenciados juntos',
            'Um grupo de consumers que divide as partições de um topic entre si, permitindo escala horizontal no processamento',
            'Um grupo de producers que enviam mensagens para o mesmo topic',
            'Um namespace para isolar mensagens entre diferentes ambientes (dev, staging, prod)'
          ],
          answer: 1,
          explanation: 'Um Consumer Group é identificado por um group-id. Cada partição de um topic é assignada a exatamente um consumer do grupo — se há 3 partições e 3 consumers no grupo, cada um recebe 1 partição. Para escalar, aumenta-se o número de consumers no grupo (até o limite de partições). Dois grupos diferentes lendo o mesmo topic recebem TODAS as mensagens independentemente — ideal para fan-out (pagamento-service e estoque-service ambos consomem pedidos-criados).'
        },
        {
          q: 'Por que enable-auto-commit: false com Acknowledgment manual é recomendado em produção?',
          options: [
            'Auto-commit é mais lento e degrada a performance em alta carga',
            'Para garantir que o offset só seja commitado após processamento bem-sucedido, evitando perda de mensagens se a aplicação cair no meio do processo',
            'Auto-commit não funciona com Spring Boot — é um bug conhecido',
            'Porque Kafka exige commit manual para topics com mais de 10 partições'
          ],
          answer: 1,
          explanation: 'Com auto-commit, o offset é commitado periodicamente independente do resultado do processamento. Se a aplicação processar 10% de uma mensagem e cair, o offset pode já ter sido avançado — a mensagem é perdida. Com commit manual (ack.acknowledge()), você garante "at-least-once delivery": só confirma recebimento após sucesso completo. Se falhar antes do acknowledge, a mensagem será reentregue ao reiniciar o consumer.'
        },
        {
          q: 'O que acontece com uma mensagem que falha em todos os retries do @RetryableTopic?',
          options: [
            'É descartada permanentemente pelo Kafka',
            'É reenviada indefinidamente até ser processada com sucesso',
            'É movida para o Dead Letter Topic (DLT) para análise e reprocessamento manual',
            'Bloqueia o consumer até que um operador resolva manualmente'
          ],
          answer: 2,
          explanation: 'O Dead Letter Topic (DLT) é o destino final de mensagens que não puderam ser processadas após todas as tentativas. O nome típico é "topico-original-dlt". Um consumer separado ouve o DLT e pode: alertar a equipe, salvar para análise, criar ticket no sistema de incidentes, ou reprocessar quando o problema for corrigido. É muito superior a descartar a mensagem ou bloquear o consumer principal.'
        },
        {
          q: 'Por que a KEY de uma mensagem Kafka importa para garantia de ordem?',
          options: [
            'A key criptografa a mensagem para segurança',
            'Mensagens com a mesma key sempre vão para a mesma partição, garantindo que sejam processadas em ordem dentro daquele contexto',
            'A key define a prioridade da mensagem (key maior = processado primeiro)',
            'A key é usada apenas para identificação no log de auditoria'
          ],
          answer: 1,
          explanation: 'Kafka garante ordem apenas DENTRO de uma partição. Ao usar clienteId como key, todos os eventos daquele cliente vão para a mesma partição, garantindo que sejam processados em ordem (criação → pagamento → envio). Sem key definida, mensagens do mesmo cliente poderiam ir para partições diferentes e ser processadas fora de ordem por consumers diferentes. Esta é a razão fundamental para escolher a key cuidadosamente.'
        },
        {
          q: 'O que significa o isolation-level: read_committed no consumer Kafka?',
          options: [
            'O consumer só lê mensagens enviadas por produtores autenticados',
            'O consumer ignora mensagens duplicadas automaticamente',
            'O consumer só lê mensagens que fazem parte de transações já confirmadas (commit), ignorando mensagens de transações ainda abertas ou abortadas',
            'O consumer lê apenas mensagens marcadas como críticas pelo producer'
          ],
          answer: 2,
          explanation: 'Com isolation-level=read_uncommitted (padrão), o consumer pode ler mensagens de transações que ainda não foram commitadas ou que serão abortadas — lendo dados inconsistentes. Com read_committed, o consumer aguarda o commit da transação antes de entregar as mensagens. Isso é essencial para exactly-once: garante que uma mensagem cujo producer fez rollback não seja processada pelo consumer.'
        }
      ]
    }
  },

  {
    id: 'sb-monitoring',
    title: 'Observabilidade — Actuator e Prometheus',
    xp: 20,
    lesson: {
      title: 'Observabilidade com Spring Boot — Actuator, Prometheus e Tracing',
      theory: `<strong>Observabilidade</strong> é a capacidade de entender o estado interno de um sistema a partir de suas saídas externas.

<strong>Os 3 pilares da Observabilidade:</strong>
• <strong>Logs</strong> — o que aconteceu? (texto estruturado de eventos)
• <strong>Metrics</strong> — quanto? com que frequência? (números ao longo do tempo)
• <strong>Traces</strong> — onde foi o tempo? (fluxo de uma requisição entre serviços)

<strong>Stack de Observabilidade Spring:</strong>
• <strong>Spring Boot Actuator</strong> — expõe endpoints /actuator/health, /actuator/metrics, /actuator/env
• <strong>Micrometer</strong> — facade de métricas (como SLF4J para logs), suporta Prometheus, Datadog, CloudWatch
• <strong>Prometheus</strong> — coleta métricas do /actuator/prometheus em intervalos (scrape)
• <strong>Grafana</strong> — dashboards visuais sobre dados do Prometheus
• <strong>Zipkin/Jaeger</strong> — distributed tracing (tempo gasto em cada serviço)
• <strong>Micrometer Tracing</strong> — integração Spring para tracing (substituiu Sleuth)

<strong>Métricas automáticas do Spring Boot:</strong>
• <code>http.server.requests</code> — latência e contagem de endpoints
• <code>jvm.memory.used</code> — uso de memória da JVM
• <code>hikaricp.connections.active</code> — conexões ativas no pool do banco
• <code>kafka.consumer.fetch-latency-avg</code> — latência de consumo Kafka

<strong>SLAs e SLOs — por que métricas importam:</strong>
• Alertar antes que o usuário perceba a degradação
• Evidenciar problemas de performance para priorização
• Dimensionar infraestrutura baseado em dados reais`,
      examples: [
        {
          title: 'Spring Boot Actuator — health, info e métricas',
          code: `// =========================================================
// pom.xml
// =========================================================
/*
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
*/

// =========================================================
// application.yml — configuração do Actuator
// =========================================================
/*
management:
  endpoints:
    web:
      exposure:
        # Expõe os endpoints listados via HTTP
        include: health, info, metrics, prometheus, env, loggers, threaddump
        # Em produção, restringir: include: health, info, metrics, prometheus
      base-path: /actuator            # path base (padrão)

  endpoint:
    health:
      show-details: always            # mostra detalhes de cada health check
      show-components: always
    info:
      enabled: true

  info:
    env:
      enabled: true                   # expõe propriedades "info.*" no /actuator/info
    git:
      enabled: true                   # inclui info do commit git (requer plugin)
    build:
      enabled: true

info:
  app:
    name: "@project.name@"
    version: "@project.version@"
    description: "API de Pedidos"
  team: "Squad Checkout"
  ambiente: "${ENVIRONMENT:desenvolvimento}"
*/

// =========================================================
// Custom HealthIndicator — status de dependências externas
// =========================================================
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;

@Component("kafkaBroker")  // aparece como "kafkaBroker" no /actuator/health
public class KafkaBrokerHealthIndicator implements HealthIndicator {

    private final AdminClient kafkaAdminClient;

    public KafkaBrokerHealthIndicator(KafkaAdmin kafkaAdmin) {
        this.kafkaAdminClient = AdminClient.create(kafkaAdmin.getConfigurationProperties());
    }

    @Override
    public Health health() {
        try {
            // Testa conexão com o Kafka listando os topics
            Set<String> topics = kafkaAdminClient
                .listTopics()
                .names()
                .get(3, TimeUnit.SECONDS);

            return Health.up()
                .withDetail("topicsCount", topics.size())
                .withDetail("broker", "localhost:9092")
                .build();

        } catch (Exception e) {
            return Health.down()
                .withDetail("error", e.getMessage())
                .withDetail("broker", "localhost:9092")
                .build();
        }
    }
}

// =========================================================
// Custom InfoContributor — informações adicionais no /info
// =========================================================
import org.springframework.boot.actuate.info.Info;
import org.springframework.boot.actuate.info.InfoContributor;

@Component
public class PedidoStatsInfoContributor implements InfoContributor {

    private final PedidoRepository pedidoRepository;

    public PedidoStatsInfoContributor(PedidoRepository repo) {
        this.pedidoRepository = repo;
    }

    @Override
    public void contribute(Info.Builder builder) {
        builder.withDetail("pedidos", Map.of(
            "total", pedidoRepository.count(),
            "hoje", pedidoRepository.countByDataCriacaoAfter(LocalDate.now().atStartOfDay()),
            "ultimaAtualizacao", Instant.now()
        ));
    }
}

/*
GET /actuator/health retorna:
{
  "status": "UP",
  "components": {
    "db": { "status": "UP", "details": { "database": "PostgreSQL" } },
    "kafkaBroker": { "status": "UP", "details": { "topicsCount": 5 } },
    "diskSpace": { "status": "UP", "details": { "free": 15032385536 } }
  }
}
*/`,
          explanation: 'O /actuator/health é o endpoint mais importante em produção: Kubernetes usa ele como liveness/readiness probe para decidir se reinicia o pod ou direciona tráfego. Custom HealthIndicators permitem incluir estado de dependências externas (Kafka, Redis, APIs externas). show-details: always deve ser protegido em produção (informações sensíveis) — use show-details: when-authorized com Spring Security.'
        },
        {
          title: 'Micrometer + Prometheus — métricas customizadas',
          code: `// =========================================================
// pom.xml — adicionar Prometheus como registry
// =========================================================
/*
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>
*/

// =========================================================
// Métricas customizadas com MeterRegistry
// =========================================================
import io.micrometer.core.instrument.*;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class PedidoMetricsService {

    private final Counter pedidosCriadosCounter;
    private final Counter pedidosErroCounter;
    private final Timer tempoProcessamento;
    private final AtomicInteger pedidosEmProcessamento;

    public PedidoMetricsService(MeterRegistry registry) {
        // Counter — incrementa, nunca reseta (total de pedidos criados)
        this.pedidosCriadosCounter = Counter.builder("pedidos.criados.total")
            .description("Total de pedidos criados com sucesso")
            .tag("servico", "pedido-service")         // labels para filtrar no Prometheus
            .register(registry);

        this.pedidosErroCounter = Counter.builder("pedidos.erros.total")
            .description("Total de erros ao criar pedidos")
            .register(registry);

        // Timer — mede duração e contagem (p50, p95, p99)
        this.tempoProcessamento = Timer.builder("pedidos.processamento.duracao")
            .description("Tempo de processamento de um pedido")
            .publishPercentiles(0.5, 0.95, 0.99)    // percentis a publicar
            .publishPercentileHistogram(true)         // para histograma no Grafana
            .sla(Duration.ofMillis(200), Duration.ofMillis(500))
            .register(registry);

        // Gauge — valor atual que pode subir/descer
        this.pedidosEmProcessamento = new AtomicInteger(0);
        Gauge.builder("pedidos.em.processamento", this.pedidosEmProcessamento, AtomicInteger::get)
            .description("Pedidos sendo processados agora (Gauge)")
            .register(registry);
    }

    public PedidoDTO criarPedido(CriarPedidoRequest request) {
        pedidosEmProcessamento.incrementAndGet();

        return tempoProcessamento.record(() -> {
            // O Timer mede automaticamente o tempo desta lambda
            try {
                PedidoDTO pedido = processarPedidoInterno(request);
                pedidosCriadosCounter.increment();
                pedidosCriadosCounter.increment(1, "status", "sucesso"); // com tag dinâmica
                return pedido;
            } catch (Exception e) {
                pedidosErroCounter.increment();
                pedidosErroCounter.increment(1, "tipo", e.getClass().getSimpleName());
                throw e;
            } finally {
                pedidosEmProcessamento.decrementAndGet();
            }
        });
    }

    private PedidoDTO processarPedidoInterno(CriarPedidoRequest req) {
        // lógica de negócio
        return new PedidoDTO();
    }
}

// =========================================================
// prometheus.yml — configuração de scrape
// =========================================================
/*
global:
  scrape_interval: 15s       # coleta métricas a cada 15s

scrape_configs:
  - job_name: 'spring-pedido-service'
    metrics_path: '/actuator/prometheus'
    static_configs:
      - targets: ['pedido-service:8081']
        labels:
          ambiente: 'producao'
          squad: 'checkout'

  - job_name: 'spring-pagamento-service'
    metrics_path: '/actuator/prometheus'
    static_configs:
      - targets: ['pagamento-service:8082']

# Alertas no Prometheus
alerting:
  alertmanagers:
    - static_configs:
        - targets: ['alertmanager:9093']

rule_files:
  - 'alerts.yml'
*/

// alerts.yml — regras de alerta
/*
groups:
  - name: pedido-service-alerts
    rules:
      - alert: AltaTaxaDeErro
        expr: rate(pedidos_erros_total[5m]) / rate(pedidos_criados_total[5m]) > 0.05
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Taxa de erro > 5% nos últimos 5 minutos"
          runbook: "https://wiki.empresa.com/runbook/pedidos"
*/`,
          explanation: 'Micrometer é a abstração: você escreve registry.counter("nome") e o Prometheus, Datadog ou Cloudwatch recebe automaticamente sem mudar o código. Counter é para eventos cumulativos (total de pedidos). Timer mede latência e gera automaticamente p50/p95/p99. Gauge é para estado atual (pedidos em fila). Tags/labels são poderosas: permitem filtrar métricas por ambiente, squad, status no Grafana sem criar métricas separadas.'
        },
        {
          title: 'Structured Logging com MDC e Correlation ID',
          code: `// =========================================================
// pom.xml — logback com JSON para ELK/Loki
// =========================================================
/*
<dependency>
    <groupId>net.logstash.logback</groupId>
    <artifactId>logstash-logback-encoder</artifactId>
    <version>7.4</version>
</dependency>
*/

// logback-spring.xml — saída JSON para ambientes de produção
/*
<configuration>
  <springProfile name="prod,staging">
    <appender name="JSON_STDOUT" class="ch.qos.logback.core.ConsoleAppender">
      <encoder class="net.logstash.logback.encoder.LogstashEncoder">
        <includeMdcKeyName>correlationId</includeMdcKeyName>
        <includeMdcKeyName>userId</includeMdcKeyName>
        <includeMdcKeyName>pedidoId</includeMdcKeyName>
        <includeMdcKeyName>traceId</includeMdcKeyName>
        <includeMdcKeyName>spanId</includeMdcKeyName>
      </encoder>
    </appender>
    <root level="INFO">
      <appender-ref ref="JSON_STDOUT" />
    </root>
  </springProfile>

  <springProfile name="dev">
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
      <encoder>
        <pattern>%d{HH:mm:ss} [%thread] %-5level [%X{correlationId}] %logger{36} - %msg%n</pattern>
      </encoder>
    </appender>
    <root level="DEBUG">
      <appender-ref ref="CONSOLE" />
    </root>
  </springProfile>
</configuration>
*/

// =========================================================
// CorrelationIdFilter.java — propaga ID entre serviços
// =========================================================
import org.slf4j.MDC;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.util.UUID;

@Component
@Order(1)  // executa antes de outros filtros
public class CorrelationIdFilter implements Filter {

    public static final String CORRELATION_ID_HEADER = "X-Correlation-Id";
    public static final String CORRELATION_ID_MDC_KEY = "correlationId";

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // Recebe do header (propagado pelo API Gateway) ou cria novo
        String correlationId = httpRequest.getHeader(CORRELATION_ID_HEADER);
        if (correlationId == null || correlationId.isBlank()) {
            correlationId = UUID.randomUUID().toString();
        }

        // Adiciona ao MDC — disponível em TODOS os logs desta thread
        MDC.put(CORRELATION_ID_MDC_KEY, correlationId);
        MDC.put("endpoint", httpRequest.getRequestURI());
        MDC.put("method", httpRequest.getMethod());

        // Propaga no response para o cliente rastrear
        httpResponse.setHeader(CORRELATION_ID_HEADER, correlationId);

        try {
            chain.doFilter(request, response);
        } finally {
            MDC.clear(); // SEMPRE limpar ao final para evitar vazamento entre threads
        }
    }
}

// =========================================================
// Uso nos Services — log estruturado automaticamente
// =========================================================
@Service
@Slf4j
public class PedidoService {

    public PedidoDTO criarPedido(CriarPedidoRequest request) {
        // correlationId já está no MDC — aparece automaticamente nos logs
        log.info("Iniciando criação de pedido para cliente {}", request.getClienteId());
        // JSON gerado: { "correlationId": "abc-123", "message": "Iniciando...", "clienteId": 42 }

        MDC.put("pedidoId", null); // será preenchido após salvar

        try {
            Pedido pedido = pedidoRepository.save(new Pedido(request));
            MDC.put("pedidoId", pedido.getId().toString());

            log.info("Pedido criado com sucesso. Total: R$ {}", pedido.getTotal());
            // JSON: { "correlationId": "abc-123", "pedidoId": "456", "message": "Pedido criado..." }

            return PedidoDTO.from(pedido);
        } catch (Exception e) {
            log.error("Falha ao criar pedido", e);
            // Stack trace completo + correlationId no mesmo log JSON
            throw e;
        }
    }
}

// =========================================================
// FeignInterceptor — propaga correlationId entre microservices
// =========================================================
@Component
public class CorrelationIdFeignInterceptor implements RequestInterceptor {

    @Override
    public void apply(RequestTemplate template) {
        // Pega o correlationId do MDC e adiciona no header da chamada HTTP
        String correlationId = MDC.get(CorrelationIdFilter.CORRELATION_ID_MDC_KEY);
        if (correlationId != null) {
            template.header(CorrelationIdFilter.CORRELATION_ID_HEADER, correlationId);
        }
        // Agora pedido-service → produto-service compartilham o mesmo correlationId
        // Você pode rastrear toda a jornada no Kibana/Loki com um único ID
    }
}`,
          explanation: 'MDC (Mapped Diagnostic Context) é um mapa thread-local do SLF4J: valores inseridos com MDC.put() aparecem automaticamente em todos os logs daquela thread sem precisar passá-los como parâmetros. O Correlation ID é o fio condutor: com ele, você filtra no Kibana/Loki todos os logs de uma única requisição através de múltiplos microservices. logstash-logback-encoder gera JSON estruturado, facilitando consultas no Elasticsearch. FeignInterceptor propaga o ID automaticamente para serviços downstream.'
        }
      ],
      quiz: [
        {
          q: 'Quais são os 3 pilares da Observabilidade em sistemas distribuídos?',
          options: [
            'Backup, Redundância e Failover',
            'Logs (o que aconteceu), Metrics (quanto/frequência) e Traces (fluxo distribuído)',
            'CPU, Memória e Disco',
            'Testes Unitários, Integração e E2E'
          ],
          answer: 1,
          explanation: 'Logs respondem "o que aconteceu?" com detalhes de eventos específicos. Metrics respondem "quanto?" e "com que frequência?" com séries temporais numéricas (ex: 250ms de latência p95). Traces respondem "onde foi o tempo?" mostrando a jornada de uma requisição através de múltiplos serviços com duração de cada hop. Juntos, permitem diagnosticar qualquer tipo de problema em produção.'
        },
        {
          q: 'Para que serve o /actuator/health endpoint do Spring Boot Actuator?',
          options: [
            'Para exibir o código fonte do microservice em texto plano',
            'Como liveness/readiness probe para Kubernetes e para monitorar status de dependências críticas',
            'Para fazer deploy de novas versões sem downtime',
            'Para acessar o console H2 do banco de dados em memória'
          ],
          answer: 1,
          explanation: 'Kubernetes usa /actuator/health como liveness probe (se DOWN por muito tempo, reinicia o pod) e readiness probe (se DOWN, remove o pod do load balancer). Custom HealthIndicators permitem incluir Kafka, Redis, banco de dados externo no status. Se qualquer componente estiver DOWN, o endpoint retorna HTTP 503, e o Kubernetes para de direcionar tráfego para aquela instância.'
        },
        {
          q: 'Qual é a diferença entre Counter, Timer e Gauge no Micrometer?',
          options: [
            'Counter é para texto, Timer para números, Gauge para booleans',
            'Counter sempre cresce (total de eventos), Timer mede duração/latência, Gauge é um valor atual que pode subir/descer',
            'Todos são equivalentes — a diferença é apenas de nomenclatura para documentação',
            'Counter é para Java, Timer para Kotlin, Gauge para Groovy'
          ],
          answer: 1,
          explanation: 'Counter é monotonicamente crescente: total de requisições, total de erros, total de pedidos criados. Timer mede duração e contagem simultaneamente, publicando automaticamente p50/p95/p99. Gauge é um "medidor de combustível": valor atual que sobe e desce — pedidos em fila, conexões ativas, uso de memória. Usar o tipo errado distorce dashboards: usar Counter para medir "conexões ativas" faria o gráfico só crescer.'
        },
        {
          q: 'O que é MDC (Mapped Diagnostic Context) e por que é usado com Correlation ID?',
          options: [
            'Um sistema de cache distribuído para logs entre microservices',
            'Um mapa thread-local do SLF4J onde valores adicionados aparecem automaticamente em todos os logs daquela thread',
            'Um framework de logging alternativo ao Logback para alta performance',
            'O sistema de métricas do Spring Boot Actuator para diagnósticos'
          ],
          answer: 1,
          explanation: 'MDC é thread-local: você faz MDC.put("correlationId", "abc-123") uma vez no início da requisição (no Filter), e todos os logs daquela thread (em qualquer Service, Repository, etc.) incluem automaticamente o correlationId — sem precisar passar como parâmetro. Isso é fundamental para rastrear uma requisição em logs distribuídos: filtrando pelo correlationId no Kibana, você vê todos os logs de todos os microservices para aquela operação.'
        },
        {
          q: 'Como o Prometheus coleta métricas de uma aplicação Spring Boot?',
          options: [
            'Spring Boot envia métricas para o Prometheus via push a cada 15 segundos',
            'Prometheus faz scrape (pull) do endpoint /actuator/prometheus em intervalos configurados no prometheus.yml',
            'As métricas são enviadas via Kafka para um topic especial que o Prometheus consome',
            'Spring Boot escreve métricas em arquivos de log que o Prometheus lê do sistema de arquivos'
          ],
          answer: 1,
          explanation: 'Prometheus usa o modelo pull/scrape: ele chama periodicamente o endpoint /actuator/prometheus da aplicação (configurado em prometheus.yml com scrape_interval) e armazena as métricas em seu banco de dados de séries temporais. O Spring Boot, via micrometer-registry-prometheus, expõe o endpoint no formato texto do Prometheus com todas as métricas coletadas pelo MeterRegistry. Grafana então consulta o Prometheus com PromQL para construir dashboards.'
        }
      ]
    }
  },

  {
    id: 'sb-webflux',
    title: 'Spring WebFlux — Programação Reativa',
    xp: 30,
    lesson: {
      title: 'Spring WebFlux — Programação Reativa com Project Reactor',
      theory: `<strong>Spring WebFlux</strong> é a alternativa reativa ao Spring MVC, baseada no <strong>Project Reactor</strong>.

<strong>Conceitos fundamentais:</strong>
• <strong>Mono&lt;T&gt;</strong> — stream com 0 ou 1 elemento (como Optional assíncrono)
• <strong>Flux&lt;T&gt;</strong> — stream com 0 a N elementos (como List assíncrona)
• <strong>Backpressure</strong> — consumer controla velocidade de produção
• <strong>Non-blocking I/O</strong> — thread não fica bloqueada aguardando I/O

<strong>Spring MVC vs WebFlux:</strong>
• <strong>MVC</strong>: thread-per-request. 200 req simultâneas = 200 threads bloqueadas
• <strong>WebFlux</strong>: event loop + poucos threads. 10.000 req simultâneas = ~8 threads (um por core)

<strong>Quando usar WebFlux:</strong>
• Alta concorrência com latência de I/O (APIs externas, banco, Kafka)
• Streaming de dados em tempo real (SSE, WebSocket)
• Microservices que agregam múltiplas APIs (paralelismo reativo)
• NÃO use se: operações CPU-intensivas, código legado bloqueante, equipe sem experiência reativa

<strong>Ecossistema reativo:</strong>
• <strong>R2DBC</strong> — driver reativo para bancos relacionais (PostgreSQL, MySQL)
• <strong>Spring Data R2DBC</strong> — repositórios reativos
• <strong>WebClient</strong> — cliente HTTP reativo (substitui RestTemplate)
• <strong>Lettuce</strong> — cliente reativo para Redis
• <strong>ReactiveMongoRepository</strong> — MongoDB reativo nativo`,
      examples: [
        {
          title: 'Mono e Flux — operadores essenciais',
          code: `// =========================================================
// Mono — 0 ou 1 elemento
// =========================================================
import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;
import java.time.Duration;
import java.util.List;

public class ReactorExemplos {

    // Criação de Mono
    Mono<String> m1 = Mono.just("Hello");           // 1 elemento
    Mono<String> m2 = Mono.empty();                 // 0 elementos
    Mono<String> m3 = Mono.error(new RuntimeException("Erro")); // erro
    Mono<String> m4 = Mono.fromCallable(() -> calcularAlgo()); // de código síncrono

    // Criação de Flux
    Flux<Integer> f1 = Flux.just(1, 2, 3, 4, 5);
    Flux<String> f2 = Flux.fromIterable(List.of("a", "b", "c"));
    Flux<Long> f3 = Flux.interval(Duration.ofSeconds(1)); // emite 0,1,2,... a cada segundo
    Flux<Integer> f4 = Flux.range(1, 100);           // 1 até 100

    // =========================================================
    // Operadores de transformação
    // =========================================================
    public void operadores() {
        // map — transforma cada elemento (síncrono)
        Flux<String> nomes = Flux.just("ana", "joao", "maria")
            .map(String::toUpperCase);  // ANA, JOAO, MARIA

        // flatMap — transforma em outro Publisher (assíncrono, paralelo)
        Flux<String> dadosUsuarios = Flux.just(1L, 2L, 3L)
            .flatMap(id -> buscarUsuarioPorId(id))  // 3 chamadas em paralelo
            .map(u -> u.getNome());

        // concatMap — como flatMap mas em sequência (preserva ordem)
        Flux<String> ordenado = Flux.just(1L, 2L, 3L)
            .concatMap(id -> buscarUsuarioPorId(id)) // 1 por vez, em ordem
            .map(u -> u.getNome());

        // filter — filtra elementos
        Flux<Integer> pares = Flux.range(1, 10)
            .filter(n -> n % 2 == 0);  // 2, 4, 6, 8, 10

        // switchIfEmpty — fallback se o stream for vazio
        Mono<Usuario> usuarioOuDefault = buscarPorId(99L)
            .switchIfEmpty(Mono.just(new Usuario("Convidado")));

        // onErrorReturn — valor padrão em caso de erro
        Mono<Integer> comFallback = Mono.error(new RuntimeException())
            .onErrorReturn(-1);  // retorna -1 ao invés de propagar o erro

        // onErrorResume — stream alternativo em caso de erro
        Mono<String> comCache = buscarDoBanco(1L)
            .onErrorResume(e -> buscarDoCache(1L));

        // zip — combina múltiplos Publishers (todos devem emitir)
        Mono<String> resultado = Mono.zip(
            buscarNome(1L),     // "João"
            buscarEmail(1L),    // "joao@email.com"
            buscarPerfil(1L)    // "admin"
        ).map(tuple ->
            "Nome: " + tuple.getT1() +
            ", Email: " + tuple.getT2() +
            ", Perfil: " + tuple.getT3()
        );

        // Flux.merge vs Flux.concat
        Flux<String> merged = Flux.merge(
            Flux.just("A", "B").delayElements(Duration.ofMillis(100)),
            Flux.just("1", "2")
            // Intercalado: 1, A, 2, B (por ordem de chegada — paralelo)
        );

        Flux<String> concatenado = Flux.concat(
            Flux.just("A", "B"),
            Flux.just("1", "2")
            // Sequencial: A, B, 1, 2 (aguarda o primeiro completar)
        );

        // collectList — converte Flux em Mono<List>
        Mono<List<Integer>> lista = Flux.range(1, 5).collectList();

        // take/skip — paginação reativa
        Flux<Integer> pagina = Flux.range(1, 100)
            .skip(20)   // pula os primeiros 20
            .take(10);  // pega os próximos 10 (itens 21-30)
    }

    private String calcularAlgo() { return "resultado"; }
    private Mono<Usuario> buscarUsuarioPorId(Long id) { return Mono.empty(); }
    private Mono<Usuario> buscarPorId(Long id) { return Mono.empty(); }
    private Mono<String> buscarNome(Long id) { return Mono.just("João"); }
    private Mono<String> buscarEmail(Long id) { return Mono.just("joao@email.com"); }
    private Mono<String> buscarPerfil(Long id) { return Mono.just("admin"); }
    private Mono<String> buscarDoBanco(Long id) { return Mono.empty(); }
    private Mono<String> buscarDoCache(Long id) { return Mono.just("cache"); }
}`,
          explanation: 'A diferença entre map e flatMap é fundamental: map transforma o valor (String → String), flatMap transforma em outro Publisher e "achatam" o resultado (String → Mono<String> → String). flatMap executa em paralelo, concatMap preserva a ordem. switchIfEmpty e onErrorReturn/onErrorResume são os principais mecanismos de tratamento defensivo — sempre defina o que acontece quando o stream está vazio ou em erro.'
        },
        {
          title: '@RestController reativo — endpoints não-bloqueantes',
          code: `// =========================================================
// pom.xml — WebFlux + R2DBC
// =========================================================
/*
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webflux</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-r2dbc</artifactId>
</dependency>
<dependency>
    <groupId>io.asyncer</groupId>
    <artifactId>r2dbc-mysql</artifactId>  <!-- ou r2dbc-postgresql -->
</dependency>
*/

// application.yml — R2DBC (NÃO use spring.datasource aqui!)
/*
spring:
  r2dbc:
    url: r2dbc:postgresql://localhost:5432/devquest
    username: postgres
    password: senha
*/

// =========================================================
// Produto.java — entidade R2DBC
// =========================================================
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("produtos")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Produto {
    @Id
    private Long id;
    private String nome;
    private BigDecimal preco;
    private String categoria;
    private Boolean ativo;
}

// =========================================================
// ProdutoRepository.java — repository reativo
// =========================================================
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ProdutoRepository extends ReactiveCrudRepository<Produto, Long> {
    Flux<Produto> findByCategoria(String categoria);
    Flux<Produto> findByAtivoTrue();
    Mono<Produto> findByNome(String nome);
    // Todos os métodos retornam Mono/Flux — nunca bloqueiam
}

// =========================================================
// ProdutoController.java — controller reativo
// =========================================================
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import org.springframework.http.*;
import org.springframework.http.codec.ServerSentEvent;
import java.time.Duration;

@RestController
@RequestMapping("/api/produtos")
@RequiredArgsConstructor
public class ProdutoController {

    private final ProdutoRepository repository;

    // GET — retorna Mono (0 ou 1 produto)
    @GetMapping("/{id}")
    public Mono<ResponseEntity<Produto>> getProduto(@PathVariable Long id) {
        return repository.findById(id)
            .map(produto -> ResponseEntity.ok(produto))
            .defaultIfEmpty(ResponseEntity.notFound().build());
        // Não bloqueia nenhuma thread — event loop trata quando o DB responder
    }

    // GET — retorna Flux (lista de produtos)
    @GetMapping
    public Flux<Produto> listarProdutos(
            @RequestParam(required = false) String categoria) {
        return categoria != null
            ? repository.findByCategoria(categoria)
            : repository.findByAtivoTrue();
        // O Flux é "streamado" ao cliente — Spring escreve JSON à medida que chega
    }

    // POST — cria produto
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Produto> criarProduto(@RequestBody Produto produto) {
        return repository.save(produto);
    }

    // PUT — atualiza produto
    @PutMapping("/{id}")
    public Mono<ResponseEntity<Produto>> atualizarProduto(
            @PathVariable Long id, @RequestBody Produto novo) {
        return repository.findById(id)
            .flatMap(existente -> {
                existente.setNome(novo.getNome());
                existente.setPreco(novo.getPreco());
                return repository.save(existente);
            })
            .map(ResponseEntity::ok)
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    // DELETE
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deletarProduto(@PathVariable Long id) {
        return repository.findById(id)
            .flatMap(p -> repository.delete(p).thenReturn(ResponseEntity.<Void>noContent().build()))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    // =========================================================
    // Server-Sent Events — streaming em tempo real
    // =========================================================
    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<Produto>> streamProdutos() {
        return repository.findAll()
            .delayElements(Duration.ofMillis(100))  // simula stream em tempo real
            .map(produto -> ServerSentEvent.<Produto>builder()
                .id(produto.getId().toString())
                .event("produto-disponivel")
                .data(produto)
                .build());
        // Cliente recebe cada produto conforme chega (não espera a lista toda)
    }
}`,
          explanation: 'Em WebFlux, NUNCA retorne List<T> ou entidades JPA síncronas — sempre Mono<T> ou Flux<T>. O @RestController reativo parece similar ao MVC, mas internamente usa o event loop do Netty: uma única thread trata milhares de conexões via callbacks. Server-Sent Events com Flux são perfeitos para dashboards em tempo real ou progress bars de operações longas. defaultIfEmpty() é o equivalente reativo do Optional.orElse().'
        },
        {
          title: 'WebClient — cliente HTTP reativo com retry e timeout',
          code: `// =========================================================
// WebClient — substitui RestTemplate em WebFlux
// =========================================================
import org.springframework.web.reactive.function.client.WebClient;
import reactor.util.retry.Retry;
import java.time.Duration;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient produtoWebClient() {
        return WebClient.builder()
            .baseUrl("http://produto-service")
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
            .codecs(config -> config
                .defaultCodecs()
                .maxInMemorySize(1024 * 1024)  // buffer máximo de 1MB
            )
            .build();
    }
}

// =========================================================
// ProdutoWebClientService.java — uso completo do WebClient
// =========================================================
@Service
@RequiredArgsConstructor
@Slf4j
public class ProdutoWebClientService {

    private final WebClient produtoWebClient;

    // GET simples com bodyToMono
    public Mono<ProdutoDTO> buscarProduto(Long id) {
        return produtoWebClient.get()
            .uri("/produtos/{id}", id)
            .retrieve()                         // inicia o processamento da resposta
            .onStatus(HttpStatusCode::is4xxClientError, response ->
                response.bodyToMono(String.class)
                    .flatMap(body -> Mono.error(
                        new ProdutoNotFoundException("Produto " + id + " não encontrado: " + body)
                    ))
            )
            .onStatus(HttpStatusCode::is5xxServerError, response ->
                Mono.error(new ServicoIndisponivelException("produto-service indisponível"))
            )
            .bodyToMono(ProdutoDTO.class)       // deserializa o body para ProdutoDTO
            .retryWhen(                         // retry automático em caso de erro de rede
                Retry.backoff(3, Duration.ofMillis(500))  // 3 tentativas: 500ms, 1s, 2s
                    .filter(ex -> !(ex instanceof ProdutoNotFoundException)) // não retenta 404
                    .onRetryExhaustedThrow((spec, signal) ->
                        new ServicoIndisponivelException("Falha após 3 tentativas"))
            )
            .timeout(Duration.ofSeconds(5))     // timeout total de 5 segundos
            .doOnError(e -> log.error("Erro ao buscar produto {}: {}", id, e.getMessage()));
    }

    // POST com body
    public Mono<ProdutoDTO> criarProduto(CriarProdutoRequest request) {
        return produtoWebClient.post()
            .uri("/produtos")
            .bodyValue(request)
            .retrieve()
            .bodyToMono(ProdutoDTO.class);
    }

    // GET com exchangeToMono — acesso completo à resposta (status, headers, body)
    public Mono<ResponseEntity<ProdutoDTO>> buscarComHeaders(Long id) {
        return produtoWebClient.get()
            .uri("/produtos/{id}", id)
            .exchangeToMono(response -> {
                String eTag = response.headers().asHttpHeaders().getETag();
                log.debug("ETag recebido: {}", eTag);

                if (response.statusCode().is2xxSuccessful()) {
                    return response.bodyToMono(ProdutoDTO.class)
                        .map(body -> ResponseEntity.ok()
                            .eTag(eTag)
                            .body(body));
                } else if (response.statusCode().equals(HttpStatus.NOT_FOUND)) {
                    return Mono.just(ResponseEntity.<ProdutoDTO>notFound().build());
                } else {
                    return response.createException().flatMap(Mono::error);
                }
            });
    }

    // =========================================================
    // Agregação reativa — 3 chamadas em paralelo
    // =========================================================
    public Mono<ProdutoDetalheDTO> buscarDetalheCompleto(Long id) {
        // Executa 3 chamadas SIMULTANEAMENTE, combina quando todas completam
        return Mono.zip(
            buscarProduto(id),
            buscarEstoque(id),
            buscarAvaliacoes(id)
        ).map(tuple -> ProdutoDetalheDTO.builder()
            .produto(tuple.getT1())
            .estoque(tuple.getT2())
            .avaliacoes(tuple.getT3())
            .build()
        );
        // Tempo total ≈ max(t_produto, t_estoque, t_avaliacoes)
        // Não é t_produto + t_estoque + t_avaliacoes (sequencial)
    }

    private Mono<EstoqueDTO> buscarEstoque(Long id) {
        return produtoWebClient.get().uri("/estoque/{id}", id)
            .retrieve().bodyToMono(EstoqueDTO.class);
    }

    private Mono<List<AvaliacaoDTO>> buscarAvaliacoes(Long id) {
        return produtoWebClient.get().uri("/avaliacoes?produtoId={id}", id)
            .retrieve().bodyToFlux(AvaliacaoDTO.class).collectList();
    }
}`,
          explanation: 'WebClient é a evolução do RestTemplate: completamente não-bloqueante e integrado ao ecossistema reativo. .onStatus() permite tratar erros HTTP de forma elegante transformando em exceções de domínio. retryWhen(Retry.backoff()) é muito mais poderoso que try-catch com loops — define backoff exponencial e condições de retry declarativamente. Mono.zip() para agregação paralela é um padrão fundamental em WebFlux: reduz latência total ao executar chamadas independentes simultaneamente.'
        }
      ],
      quiz: [
        {
          q: 'Qual é a diferença entre Mono<T> e Flux<T> no Project Reactor?',
          options: [
            'Mono é síncrono, Flux é assíncrono',
            'Mono representa um stream com 0 ou 1 elemento; Flux representa um stream com 0 a N elementos',
            'Mono é para tipos primitivos, Flux é para objetos complexos',
            'Mono é mais rápido que Flux para qualquer quantidade de dados'
          ],
          answer: 1,
          explanation: 'Mono<T> é equivalente a um Optional assíncrono — retorna no máximo um elemento ou um erro. Use para: buscar por ID, criar um registro, fazer uma única chamada HTTP. Flux<T> é equivalente a uma List/Stream assíncrona — emite 0 a N elementos ao longo do tempo. Use para: listar registros, streaming de dados, Server-Sent Events. Ambos são lazy — nada executa até alguém subscrever.'
        },
        {
          q: 'Qual é a principal vantagem do Spring WebFlux em relação ao Spring MVC para APIs com alto número de conexões simultâneas?',
          options: [
            'WebFlux usa HTTP/2 automaticamente, MVC usa apenas HTTP/1.1',
            'WebFlux usa event loop com poucas threads para alta concorrência; MVC bloqueia uma thread por requisição, limitando a quantidade de conexões simultâneas',
            'WebFlux faz cache automático de todas as respostas, MVC não tem cache',
            'WebFlux comprime os dados automaticamente, reduzindo o tamanho das respostas'
          ],
          answer: 1,
          explanation: 'Spring MVC usa o modelo thread-per-request do Servlet: 500 req simultâneas = 500 threads bloqueadas esperando I/O (banco, API externa). Com 10.000 threads, a JVM usa vários GBs de memória e tempo de CPU em context switching. WebFlux usa Netty com event loop: 8 threads (um por core) gerenciam 10.000 conexões via callbacks não-bloqueantes. Nenhuma thread fica "esperando" — registra o callback e é liberada para processar outro request.'
        },
        {
          q: 'Por que R2DBC é necessário quando se usa Spring WebFlux com banco de dados relacional?',
          options: [
            'R2DBC é mais rápido que JDBC em qualquer cenário',
            'JDBC é bloqueante: ao aguardar o banco, a thread fica parada. R2DBC é reativo/não-bloqueante, mantendo o event loop funcional',
            'R2DBC suporta SQL enquanto JDBC só suporta bancos NoSQL',
            'R2DBC é necessário apenas com bancos MySQL; PostgreSQL funciona com JDBC no WebFlux'
          ],
          answer: 1,
          explanation: 'JDBC chama o banco e bloqueia a thread até receber resposta. Em WebFlux, isso seria catastrófico: o event loop ficaria bloqueado e não poderia processar outras requisições. R2DBC é reativo por design: retorna Mono/Flux e libera a thread imediatamente, notificando quando o banco responder via callback. Usar JPA/JDBC com WebFlux anula completamente os benefícios de performance do WebFlux.'
        },
        {
          q: 'Como WebClient lida com erros HTTP 4xx e 5xx em relação ao RestTemplate?',
          options: [
            'WebClient lança exceção automaticamente para qualquer status != 200',
            'WebClient expõe .onStatus() para mapear códigos HTTP em exceções reativas específicas de domínio, com controle granular',
            'WebClient não trata erros HTTP — o desenvolvedor deve verificar o status code manualmente',
            'RestTemplate tem melhor tratamento de erros que WebClient — WebClient é apenas para streaming'
          ],
          answer: 1,
          explanation: '.onStatus() é mais elegante que o ErrorHandler do RestTemplate: você define condições (HttpStatusCode::is4xxClientError) e retorna um Mono<Throwable> com sua exceção de domínio (ProdutoNotFoundException, ServicoIndisponivelException). Isso mantém o código de negócio limpo e os erros HTTP traduzidos em abstrações relevantes. .retrieve() lança WebClientResponseException por padrão para 4xx/5xx se .onStatus() não for definido.'
        },
        {
          q: 'Para que serve Mono.zip() em uma API WebFlux que agrega dados de múltiplos serviços?',
          options: [
            'Para compactar a resposta JSON antes de enviar ao cliente',
            'Para combinar múltiplos Publishers em paralelo, completando quando todos emitirem, reduzindo a latência total para o máximo individual em vez da soma',
            'Para unir múltiplos streams de Kafka em um único Flux',
            'Para fazer deploy de múltiplos microservices simultaneamente'
          ],
          answer: 1,
          explanation: 'Mono.zip(a$, b$, c$) executa os 3 Monos em paralelo. Se cada um demora 200ms, o tempo total é ~200ms (o maior). Sem zip, chamadas sequenciais demorariam 600ms. É o equivalente reativo do CompletableFuture.allOf(). Use quando as chamadas são independentes entre si: buscarProduto, buscarEstoque e buscarAvaliacoes não dependem uma da outra, então não há motivo para esperar uma terminar para começar a outra.'
        }
      ]
    }
  }
];

if (window.SPRING_DATA) {
  window.SPRING_DATA.topics = window.SPRING_DATA.topics.concat(window.SPRING_AVANCADO);
}
