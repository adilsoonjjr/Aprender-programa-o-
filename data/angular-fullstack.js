// Angular Full-stack — tópicos avançados de mercado
window.ANGULAR_FULLSTACK = [
  {
    id: 'ng-testing',
    title: 'Testes com Jasmine e Jest',
    xp: 30,
    lesson: {
      title: 'Testes em Angular — Unitário e Integração',
      theory: `Testes são <strong>cobrados em toda vaga sênior</strong> e cada vez mais em pleno. Angular vem com Jasmine + Karma por padrão, mas muitas empresas migram para Jest.

Tipos de teste:
• <strong>Unitário</strong> — testa uma função/classe isolada (Jasmine/Jest)
• <strong>Componente</strong> — testa o componente com DOM (TestBed)
• <strong>Integração</strong> — testa fluxo completo
• <strong>E2E</strong> — Cypress ou Playwright

Conceitos fundamentais:
• <code>TestBed</code> — configura módulo de teste
• <code>fixture.detectChanges()</code> — dispara change detection
• <code>spyOn / jest.fn()</code> — mock de métodos
• <code>HttpClientTestingModule</code> — mock de HTTP`,
      examples: [
        {
          title: 'Testando um Service com dependências',
          code: `// pontuacao.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PontuacaoService } from './pontuacao.service';

describe('PontuacaoService', () => {
  let service: PontuacaoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PontuacaoService]
    });
    service = TestBed.inject(PontuacaoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify()); // garante que não sobrou request pendente

  it('deve retornar ranking via GET', () => {
    const mockRanking = [{ nome: 'Adil', xp: 900 }, { nome: 'Ana', xp: 750 }];

    service.getRanking().subscribe(ranking => {
      expect(ranking.length).toBe(2);
      expect(ranking[0].nome).toBe('Adil');
    });

    // Simula resposta HTTP
    const req = httpMock.expectOne('/api/ranking');
    expect(req.request.method).toBe('GET');
    req.flush(mockRanking);  // resolve a requisição com dados mock
  });

  it('deve tratar erro 500', () => {
    service.getRanking().subscribe({
      error: err => expect(err.status).toBe(500)
    });
    httpMock.expectOne('/api/ranking').flush('Erro', { status: 500, statusText: 'Server Error' });
  });
});`,
          explanation: 'HttpTestingController intercepta requisições reais. flush() simula a resposta. verify() garante que toda requisição esperada foi feita.'
        },
        {
          title: 'Testando Componente com TestBed',
          code: `// quiz.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { QuizComponent } from './quiz.component';
import { PontuacaoService } from '../pontuacao.service';

describe('QuizComponent', () => {
  let fixture: ComponentFixture<QuizComponent>;
  let component: QuizComponent;
  let serviceSpy: jasmine.SpyObj<PontuacaoService>;

  beforeEach(async () => {
    // Cria spy (mock) do serviço
    const spy = jasmine.createSpyObj('PontuacaoService', ['ganharXP', 'getNivel']);
    spy.getNivel.and.returnValue('Júnior');

    await TestBed.configureTestingModule({
      imports: [QuizComponent],       // standalone
      providers: [
        { provide: PontuacaoService, useValue: spy }  // injeta o mock
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    serviceSpy = TestBed.inject(PontuacaoService) as jasmine.SpyObj<PontuacaoService>;
    fixture.detectChanges();  // dispara ngOnInit
  });

  it('deve exibir o nível do usuário', () => {
    const nível = fixture.debugElement.query(By.css('.nivel-badge'));
    expect(nível.nativeElement.textContent).toContain('Júnior');
  });

  it('deve chamar ganharXP ao responder corretamente', () => {
    component.responderCerto();
    expect(serviceSpy.ganharXP).toHaveBeenCalledWith(10);
    expect(serviceSpy.ganharXP).toHaveBeenCalledTimes(1);
  });

  it('deve incrementar score no template', () => {
    component.score = 0;
    component.responderCerto();
    fixture.detectChanges();
    const scoreEl = fixture.debugElement.query(By.css('[data-testid="score"]'));
    expect(scoreEl.nativeElement.textContent).toBe('1');
  });
});`,
          explanation: 'SpyObj cria mock completo de um serviço. By.css() encontra elementos no DOM. detectChanges() sincroniza template com o estado.'
        },
        {
          title: 'Testando Observables e async',
          code: `// Com fakeAsync + tick (controle de tempo)
import { fakeAsync, tick } from '@angular/core/testing';

it('deve buscar dados após debounce de 400ms', fakeAsync(() => {
  const spy = spyOn(service, 'buscar').and.returnValue(of([{ id: 1 }]));

  component.campo.setValue('angular');
  tick(399);                    // avança 399ms
  expect(spy).not.toHaveBeenCalled(); // ainda não disparou

  tick(1);                      // avança mais 1ms (total: 400ms)
  expect(spy).toHaveBeenCalledWith('angular'); // agora sim
}));

// Com async/await (para Promises e Observables que completam)
it('deve carregar perguntas na inicialização', async () => {
  const perguntas = [{ id: 1, enunciado: 'O que é Angular?' }];
  spyOn(service, 'getPerguntas').and.returnValue(of(perguntas));

  component.ngOnInit();
  await fixture.whenStable();   // aguarda Observables completarem
  fixture.detectChanges();

  expect(component.perguntas.length).toBe(1);
});

// Testando pipe async no template
it('deve exibir loading enquanto carrega', () => {
  component.carregando = true;
  fixture.detectChanges();
  expect(fixture.debugElement.query(By.css('.spinner'))).toBeTruthy();

  component.carregando = false;
  fixture.detectChanges();
  expect(fixture.debugElement.query(By.css('.spinner'))).toBeNull();
});`,
          explanation: 'fakeAsync + tick() controla o tempo virtual — essencial para testar debounce, timeout e delays. whenStable() aguarda todas as tarefas assíncronas.'
        }
      ]
    },
    quiz: [
      {
        question: 'O que TestBed.inject() faz?',
        options: [
          'Injeta código CSS no componente',
          'Obtém uma instância de serviço do container de DI do TestBed',
          'Cria um novo componente para teste',
          'Importa um módulo externo'
        ],
        answer: 1,
        explanation: 'TestBed.inject(Service) retorna a instância do serviço registrada no TestBed — real ou mock, dependendo do provider configurado.'
      },
      {
        question: 'Por que usar HttpClientTestingModule nos testes?',
        options: [
          'Para fazer requisições HTTP reais mais rápidas',
          'Para interceptar e controlar requisições HTTP sem fazer chamadas reais',
          'Para testar o serviço sem importar HttpClient',
          'Para habilitar CORS nos testes'
        ],
        answer: 1,
        explanation: 'HttpClientTestingModule substitui HttpClient por uma versão mockável. httpMock.expectOne() verifica se a requisição foi feita.'
      },
      {
        question: 'O que fakeAsync e tick() permitem testar?',
        options: [
          'Requisições HTTP assíncronas',
          'Código que depende de tempo (setTimeout, debounce) de forma síncrona',
          'Componentes com OnPush',
          'Observables infinitos'
        ],
        answer: 1,
        explanation: 'fakeAsync cria zona de tempo virtual. tick(400) avança 400ms instantaneamente — sem esperar tempo real no teste.'
      },
      {
        question: 'Como mockar um serviço com retorno específico no Jasmine?',
        options: [
          'service.metodo = () => valor',
          'spyOn(service, "metodo").and.returnValue(of(valor))',
          'mock(service).returns(valor)',
          'TestBed.mock(service, valor)'
        ],
        answer: 1,
        explanation: 'spyOn cria um spy no método existente. .and.returnValue() define o que retorna. Jasmine registra chamadas para verificar depois.'
      }
    ]
  },
  {
    id: 'ng-state',
    title: 'Gerenciamento de Estado (NgRx / Signals)',
    xp: 35,
    lesson: {
      title: 'Estado Global com NgRx e Signals Store',
      theory: `Em aplicações grandes, compartilhar estado entre componentes com Services pode ficar complexo. <strong>NgRx</strong> é o padrão de mercado para estado global.

Arquitetura NgRx (Redux pattern):
• <strong>Store</strong> — estado global imutável
• <strong>Action</strong> — intenção de mudar estado
• <strong>Reducer</strong> — função pura que aplica a mudança
• <strong>Selector</strong> — lê fatia do estado
• <strong>Effect</strong> — efeitos colaterais (HTTP, localStorage)

Alternativa moderna: <strong>Signals Store</strong> (@ngrx/signals) — mais simples, sem boilerplate.`,
      examples: [
        {
          title: 'NgRx completo — Actions, Reducer, Selectors, Effects',
          code: `// store/quiz.actions.ts
import { createAction, props } from '@ngrx/store';
import { Pergunta } from '../models/pergunta';

export const carregarPerguntas = createAction('[Quiz] Carregar Perguntas',
  props<{ linguagem: string }>()
);
export const carregarPerguntasSucesso = createAction('[Quiz] Sucesso',
  props<{ perguntas: Pergunta[] }>()
);
export const carregarPerguntasErro = createAction('[Quiz] Erro',
  props<{ erro: string }>()
);
export const responderQuestao = createAction('[Quiz] Responder',
  props<{ correto: boolean }>()
);

// store/quiz.reducer.ts
import { createReducer, on } from '@ngrx/store';

export interface QuizState {
  perguntas: Pergunta[];
  score: number;
  carregando: boolean;
  erro: string | null;
}
const inicial: QuizState = { perguntas: [], score: 0, carregando: false, erro: null };

export const quizReducer = createReducer(
  inicial,
  on(carregarPerguntas, state => ({ ...state, carregando: true, erro: null })),
  on(carregarPerguntasSucesso, (state, { perguntas }) =>
    ({ ...state, perguntas, carregando: false })
  ),
  on(carregarPerguntasErro, (state, { erro }) =>
    ({ ...state, erro, carregando: false })
  ),
  on(responderQuestao, (state, { correto }) =>
    ({ ...state, score: correto ? state.score + 10 : state.score })
  )
);`,
          explanation: 'createAction + createReducer são a API funcional do NgRx. Reducer é função pura: mesmo input → mesmo output, sem efeitos colaterais.'
        },
        {
          title: 'NgRx Selectors e Effects',
          code: `// store/quiz.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuizState } from './quiz.reducer';

const selectQuiz = createFeatureSelector<QuizState>('quiz');

export const selectPerguntas  = createSelector(selectQuiz, s => s.perguntas);
export const selectScore       = createSelector(selectQuiz, s => s.score);
export const selectCarregando  = createSelector(selectQuiz, s => s.carregando);
export const selectPerguntasFiltradas = createSelector(
  selectPerguntas,
  (perguntas) => perguntas.filter(p => p.xp > 10)
);

// store/quiz.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { QuizApiService } from '../services/quiz-api.service';

@Injectable()
export class QuizEffects {
  private actions$ = inject(Actions);
  private api = inject(QuizApiService);

  carregarPerguntas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(carregarPerguntas),
      switchMap(({ linguagem }) =>
        this.api.getPerguntas(linguagem).pipe(
          map(perguntas => carregarPerguntasSucesso({ perguntas })),
          catchError(e => of(carregarPerguntasErro({ erro: e.message })))
        )
      )
    )
  );
}

// No componente:
// this.store.dispatch(carregarPerguntas({ linguagem: 'python' }));
// this.perguntas$ = this.store.select(selectPerguntas);`,
          explanation: 'Effects isolam efeitos colaterais (HTTP) do reducer. Actions disparam Effects. Effects disparam novas Actions com o resultado.'
        },
        {
          title: 'Signals Store — NgRx moderno (sem boilerplate)',
          code: `// store/quiz.store.ts — @ngrx/signals (NgRx 17+)
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap, tap, pipe } from 'rxjs';
import { QuizApiService } from '../services/quiz-api.service';

interface QuizState {
  perguntas: Pergunta[];
  score: number;
  carregando: boolean;
  linguagem: string;
}

export const QuizStore = signalStore(
  { providedIn: 'root' },
  withState<QuizState>({
    perguntas: [], score: 0, carregando: false, linguagem: 'python'
  }),
  withComputed(({ score }) => ({
    nivel: computed(() => {
      const xp = score();
      if (xp >= 1000) return 'Sênior';
      if (xp >= 500)  return 'Pleno';
      return 'Júnior';
    })
  })),
  withMethods((store, api = inject(QuizApiService)) => ({
    responder(correto: boolean) {
      patchState(store, s => ({ score: correto ? s.score + 10 : s.score }));
    },
    carregar: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { carregando: true })),
        switchMap(lang => api.getPerguntas(lang)),
        tap(perguntas => patchState(store, { perguntas, carregando: false }))
      )
    )
  }))
);

// No componente (standalone):
// private store = inject(QuizStore);
// perguntas = this.store.perguntas;  // Signal<Pergunta[]>
// nivel = this.store.nivel;          // Signal<string>`,
          explanation: 'Signals Store é muito mais simples que NgRx clássico — sem actions/reducers/selectors separados. Ideal para projetos novos.'
        }
      ]
    },
    quiz: [
      {
        question: 'No NgRx, qual elemento é responsável por efeitos colaterais como chamadas HTTP?',
        options: ['Reducer', 'Selector', 'Effect', 'Action'],
        answer: 2,
        explanation: 'Effects isolam side effects. Reducer é puro (sem HTTP, sem localStorage). Effects escutam Actions e disparam novas Actions com o resultado.'
      },
      {
        question: 'Por que o Reducer deve ser uma função pura?',
        options: [
          'Para ser mais rápido',
          'Para garantir previsibilidade: mesmo input sempre gera mesmo output, facilitando debug e testes',
          'Porque o TypeScript exige',
          'Para suportar SSR (Server-Side Rendering)'
        ],
        answer: 1,
        explanation: 'Função pura: sem efeitos colaterais, sem mutação de estado. Isso permite time-travel debugging e testes unitários triviais.'
      },
      {
        question: 'O que createSelector com memoização garante?',
        options: [
          'O selector só é executado no servidor',
          'O selector só recalcula quando suas dependências mudam — evita re-renders desnecessários',
          'O selector faz cache permanente em localStorage',
          'O selector funciona offline'
        ],
        answer: 1,
        explanation: 'Seletores são memoizados: se o input não mudou, retorna o resultado cacheado. Crucial para performance em listas grandes.'
      },
      {
        question: 'Qual a principal vantagem do Signals Store sobre NgRx clássico?',
        options: [
          'É mais rápido em produção',
          'Muito menos boilerplate — sem arquivos separados para actions/reducer/selectors/effects',
          'Funciona sem o pacote @ngrx/store',
          'Suporta múltiplos stores ao mesmo tempo'
        ],
        answer: 1,
        explanation: 'NgRx clássico: 4 arquivos por feature. Signals Store: 1 arquivo. Para equipes, menos código = menos bugs e manutenção mais fácil.'
      }
    ]
  },
  {
    id: 'ng-performance',
    title: 'Performance e OnPush',
    xp: 25,
    lesson: {
      title: 'Otimização de Performance Angular',
      theory: `Performance é diferencial em entrevistas sênior. O Angular tem mecanismos poderosos que <strong>a maioria dos devs não usa corretamente</strong>.

Problemas comuns de performance:
• Change detection rodando desnecessariamente
• Listas sem trackBy re-renderizando tudo
• Imports de módulos inteiros (tree-shaking ineficiente)
• Imagens sem lazy loading
• Bundle muito grande (falta de lazy loading de rotas)

Soluções:
• <code>ChangeDetectionStrategy.OnPush</code>
• <code>trackBy</code> no @for
• Lazy loading de rotas e imagens
• <code>@defer</code> para componentes não críticos`,
      examples: [
        {
          title: 'ChangeDetectionStrategy.OnPush',
          code: `// ❌ Sem OnPush: re-renderiza a cada evento qualquer
@Component({
  selector: 'app-card',
  template: '<div>{{ item.nome }}</div>'
})
export class CardComponentSemOtimizacao {
  @Input() item: any;
}

// ✅ Com OnPush: só re-renderiza quando:
// 1. @Input() muda referência
// 2. Signal/Observable emite novo valor
// 3. Evento DOM no componente
// 4. Chamada manual: cdr.markForCheck()
@Component({
  selector: 'app-card',
  template: '<div>{{ item.nome }}</div>',
  changeDetection: ChangeDetectionStrategy.OnPush  // 👈 diferença
})
export class CardComponent {
  @Input() item!: { nome: string; xp: number };
  private cdr = inject(ChangeDetectorRef);

  // Se precisar forçar update (ex: após setTimeout):
  atualizarManual() {
    this.cdr.markForCheck(); // agenda detecção no próximo ciclo
  }
}

// REGRA: passar NOVOS objetos para acionar OnPush
// ❌ item.nome = 'novo';           // mesma referência — OnPush ignora
// ✅ item = { ...item, nome: 'novo' }  // nova referência — OnPush detecta`,
          explanation: 'OnPush: Angular só verifica o componente em condições específicas. Em listas com 1000 itens, a diferença de performance é enorme.'
        },
        {
          title: '@defer — carregamento lazy de componentes',
          code: `<!-- @defer: carrega o componente só quando necessário -->

<!-- 1. Quando a view entrar na viewport (scroll) -->
@defer (on viewport) {
  <app-grafico-pesado />
} @placeholder {
  <div class="skeleton">Carregando gráfico...</div>
} @loading (minimum 300ms) {
  <app-spinner />
} @error {
  <p>Erro ao carregar o gráfico</p>
}

<!-- 2. Quando o usuário interagir (idle) -->
@defer (on idle) {
  <app-chat-widget />
}

<!-- 3. Quando uma condição for verdadeira -->
@defer (when usuarioLogado()) {
  <app-dashboard-premium />
}

<!-- 4. Ao passar o mouse em um trigger -->
<button #btn>Ver detalhes</button>
@defer (on hover(btn)) {
  <app-detalhes-modal />
}

<!-- Resultado: bundle inicial menor
     app-grafico-pesado só é baixado quando
     o usuário rolar até ele na página -->`,
          explanation: '@defer (Angular 17+) divide o bundle automaticamente. on viewport é o mais usado — componentes abaixo do fold só carregam quando visíveis.'
        },
        {
          title: 'trackBy e Pure Pipes para listas',
          code: `// ❌ Sem trackBy: @for recria todos os itens ao mudar a lista
@for (pergunta of perguntas; track pergunta) { <!-- track obrigatório -->
  <app-card [item]="pergunta" />
}

// ✅ Com track por ID: só recria os itens que mudaram
@for (pergunta of perguntas; track pergunta.id) {
  <app-card [item]="pergunta" />
}

// ════════════════════════════════════════
// PURE PIPE — evita recalcular no template
// ════════════════════════════════════════
// ❌ Chamar função no template = executa em TODA change detection
<span>{{ formatarNivel(xp) }}</span>  // péssimo!

// ✅ Pure Pipe: só recalcula quando o input muda
@Pipe({ name: 'nivel', standalone: true, pure: true })
export class NivelPipe implements PipeTransform {
  transform(xp: number): string {
    if (xp >= 1000) return '🏆 Sênior';
    if (xp >= 500)  return '⭐ Pleno';
    if (xp >= 100)  return '📚 Júnior';
    return '🌱 Iniciante';
  }
}

// No template:
<span>{{ xp | nivel }}</span>

// Async Pipe — gerencia subscribe/unsubscribe automaticamente
<div *ngFor="let item of items$ | async">{{ item.nome }}</div>`,
          explanation: 'Pure Pipes são memoizadas — só recalculam quando o input muda. Async Pipe faz unsubscribe automático — evita memory leaks.'
        }
      ]
    },
    quiz: [
      {
        question: 'Quando OnPush detecta mudanças?',
        options: [
          'A cada evento do browser, igual ao Default',
          'Quando Input muda referência, Signal emite, evento DOM ocorre no componente, ou markForCheck() é chamado',
          'Apenas quando @Input() é declarado',
          'A cada 100ms por polling'
        ],
        answer: 1,
        explanation: 'OnPush reduz drasticamente as verificações. Passando objetos imutáveis (spread) garante que OnPush detecte as mudanças corretamente.'
      },
      {
        question: 'O que @defer (on viewport) faz?',
        options: [
          'Adia a renderização por um tempo fixo',
          'Carrega o componente e seu bundle JS só quando ele entrar na área visível da tela',
          'Adia o componente para depois do ngOnInit',
          'Carrega o componente em um Web Worker'
        ],
        answer: 1,
        explanation: '@defer divide o bundle automaticamente. on viewport = lazy loading baseado em scroll. Reduz bundle inicial significativamente.'
      },
      {
        question: 'Por que chamar função no template Angular é problemático?',
        options: [
          'Não é problemático — é a forma recomendada',
          'Porque TypeScript não compila funções no template',
          'A função é executada a cada ciclo de change detection — pode ser centenas de vezes por segundo',
          'Porque funções no template não têm acesso ao this'
        ],
        answer: 2,
        explanation: 'Use Pipes (puros e memoizados) ou computed signals em vez de chamar funções no template. Funções no template são um anti-pattern clássico.'
      },
      {
        question: 'Por que usar Async Pipe em vez de .subscribe() no componente?',
        options: [
          'Async Pipe é mais rápido',
          'Async Pipe faz unsubscribe automático quando o componente é destruído — evita memory leaks',
          'Async Pipe funciona com Promises mas não com Observables',
          'Para usar com SSR'
        ],
        answer: 1,
        explanation: 'subscribe() sem unsubscribe = memory leak. Async Pipe gerencia o ciclo de vida automaticamente — prática obrigatória.'
      }
    ]
  },
  {
    id: 'ng-patterns',
    title: 'Padrões de Componentes',
    xp: 25,
    lesson: {
      title: 'Padrões Avançados de Componentes',
      theory: `Padrões de componente são cobrados em entrevistas e usados diariamente em projetos enterprise.

Padrões essenciais:
• <strong>Smart vs Dumb</strong> — separar lógica de apresentação
• <strong>@ViewChild/@ContentChild</strong> — acessar DOM e projeções
• <strong>ng-template + ngTemplateOutlet</strong> — templates reutilizáveis
• <strong>Content Projection</strong> — ng-content
• <strong>ControlValueAccessor</strong> — componente customizado em formulários`,
      examples: [
        {
          title: 'Smart vs Dumb Components',
          code: `// ════ DUMB COMPONENT (Presentational) ════
// Recebe dados via @Input, emite eventos via @Output
// Não conhece nenhum serviço — fácil de testar

@Component({
  selector: 'app-pergunta-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <div class="card">
      <h3>{{ pergunta.enunciado }}</h3>
      <button *ngFor="let op of pergunta.opcoes; track op; let i = index"
              (click)="resposta.emit(i)">
        {{ op }}
      </button>
    </div>
  \`
})
export class PerguntaCardComponent {
  pergunta = input.required<Pergunta>();
  resposta = output<number>();  // só emite, não faz nada
}

// ════ SMART COMPONENT (Container) ════
// Conhece serviços, orquestra a lógica
@Component({
  selector: 'app-quiz-page',
  standalone: true,
  template: \`
    @if (carregando()) {
      <app-spinner />
    } @else {
      <app-pergunta-card
        [pergunta]="perguntaAtual()"
        (resposta)="verificarResposta($event)" />
    }
  \`
})
export class QuizPageComponent {
  private quizService = inject(QuizService);

  perguntas  = toSignal(this.quizService.getPerguntas(), { initialValue: [] });
  idx        = signal(0);
  carregando = signal(true);

  perguntaAtual = computed(() => this.perguntas()[this.idx()]);

  verificarResposta(opcao: number): void {
    const correto = this.quizService.verificar(this.perguntaAtual(), opcao);
    if (correto) this.quizService.ganharXP(10);
    this.idx.update(i => i + 1);
  }
}`,
          explanation: 'Dumb components são 100% reutilizáveis e testáveis sem mock. Smart components orquestram o fluxo — geralmente um por rota.'
        },
        {
          title: '@ViewChild e ng-template',
          code: `@Component({
  standalone: true,
  template: \`
    <!-- ng-template: template reutilizável (não renderiza por padrão) -->
    <ng-template #modalTemplate let-titulo="titulo" let-dados="dados">
      <div class="modal">
        <h2>{{ titulo }}</h2>
        <pre>{{ dados | json }}</pre>
        <button (click)="fecharModal()">Fechar</button>
      </div>
    </ng-template>

    <!-- Renderiza o template com contexto -->
    <div class="container">
      <ng-container *ngTemplateOutlet="modalTemplate; context: { titulo: 'Resultado', dados: resultado }">
      </ng-container>
    </div>

    <!-- Acesso ao elemento nativo -->
    <input #campoBusca placeholder="Buscar...">
    <button (click)="focar()">Focar campo</button>
  \`
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('modalTemplate') template!: TemplateRef<any>;
  @ViewChild('campoBusca') inputRef!: ElementRef<HTMLInputElement>;

  resultado = { score: 100, nivel: 'Sênior' };

  ngAfterViewInit(): void {
    // Disponível após renderização do template
    console.log('Input nativo:', this.inputRef.nativeElement);
  }

  focar(): void {
    this.inputRef.nativeElement.focus();  // acesso direto ao DOM
  }
}`,
          explanation: '@ViewChild acessa elemento do próprio template. ng-template define markup reutilizável. ngTemplateOutlet renderiza o template com contexto.'
        },
        {
          title: 'ControlValueAccessor — campo customizado em formulários',
          code: `// Componente que funciona como input nativo em Reactive Forms
// Usado para: rating stars, date picker, color picker customizado

@Component({
  selector: 'app-rating',
  standalone: true,
  template: \`
    @for (star of stars; track star; let i = index) {
      <span (click)="setValor(i + 1)" [class.ativo]="valor >= i + 1">⭐</span>
    }
  \`,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RatingComponent),
    multi: true
  }]
})
export class RatingComponent implements ControlValueAccessor {
  stars = [1, 2, 3, 4, 5];
  valor = 0;

  private onChange = (v: number) => {};
  private onTouched = () => {};

  // Chamado pelo FormControl para ESCREVER no componente
  writeValue(val: number): void {
    this.valor = val ?? 0;
  }

  // Registra callback chamada quando USUARIO muda o valor
  registerOnChange(fn: (v: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setValor(v: number): void {
    this.valor = v;
    this.onChange(v);  // notifica o FormControl
    this.onTouched();
  }
}

// Uso: <app-rating formControlName="satisfacao"> — funciona igual a <input>!`,
          explanation: 'ControlValueAccessor integra componentes customizados ao Reactive Forms. writeValue recebe valor do form; onChange notifica o form sobre mudanças.'
        }
      ]
    },
    quiz: [
      {
        question: 'O que é um "Dumb Component" (Presentational Component)?',
        options: [
          'Um componente sem TypeScript',
          'Componente que só recebe dados via @Input e emite eventos via @Output, sem conhecer serviços',
          'Componente sem template',
          'Componente legado sem standalone'
        ],
        answer: 1,
        explanation: 'Dumb components são reutilizáveis e fáceis de testar — não dependem de serviços injetados, só de inputs/outputs.'
      },
      {
        question: 'Quando @ViewChild está disponível?',
        options: [
          'No construtor do componente',
          'No ngOnInit',
          'No ngAfterViewInit — após o template ser renderizado',
          'Imediatamente ao declarar a propriedade'
        ],
        answer: 2,
        explanation: '@ViewChild referencia elementos do template. O template só existe após ngAfterViewInit — acessar antes retorna undefined.'
      },
      {
        question: 'Para que serve ControlValueAccessor?',
        options: [
          'Para validar formulários reativos',
          'Para criar um componente customizado que funciona como campo nativo em Reactive Forms (formControlName)',
          'Para acessar o valor de um FormControl no template',
          'Para observar mudanças em todos os campos do formulário'
        ],
        answer: 1,
        explanation: 'CVA permite que <app-rating formControlName="nota"> funcione igual a <input formControlName="nota"> — integração total com ReactiveForms.'
      },
      {
        question: 'O que ng-template faz no Angular?',
        options: [
          'Cria um template HTML externo em arquivo separado',
          'Define um bloco de markup que não é renderizado por padrão, usado com ngTemplateOutlet',
          'Substitui o templateUrl do componente',
          'Cria slots para Web Components'
        ],
        answer: 1,
        explanation: 'ng-template define markup reutilizável que não é inserido no DOM automaticamente. ngTemplateOutlet renderiza onde e quando você quiser.'
      }
    ]
  }
];

if (window.ANGULAR_DATA) {
  window.ANGULAR_DATA.topics = window.ANGULAR_DATA.topics.concat(window.ANGULAR_FULLSTACK);
}
