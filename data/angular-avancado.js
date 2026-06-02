// Angular Avançado — RxJS, SSR, Micro-frontends e Performance
window.ANGULAR_AVANCADO = [
  {
    id: 'ng-rxjs-avancado',
    title: 'RxJS Avançado',
    xp: 30,
    lesson: {
      title: 'RxJS Avançado — Operadores que todo Sênior precisa dominar',
      theory: `RxJS é o coração do Angular. Dominar os operadores avançados separa devs <strong>pleno de sênior</strong>.

<strong>Os "Big 4" — Higher-Order Mapping Operators:</strong>
• <strong>switchMap</strong> — cancela a requisição anterior ao receber novo valor. Ideal para autocomplete e buscas
• <strong>mergeMap</strong> (= flatMap) — executa tudo em paralelo, sem cancelar. Ideal para múltiplos uploads simultâneos
• <strong>concatMap</strong> — enfileira, executa um por vez em ordem. Ideal para operações que devem manter ordem
• <strong>exhaustMap</strong> — ignora novos valores enquanto o atual está processando. Ideal para evitar double-submit

<strong>Operadores de combinação:</strong>
• <strong>combineLatest</strong> — combina N streams, emite quando qualquer um emite (precisa de valor inicial de todos)
• <strong>withLatestFrom</strong> — combina com outro stream mas só emite quando o stream fonte emite
• <strong>forkJoin</strong> — espera todos completarem (como Promise.all), emite um único array
• <strong>zip</strong> — combina por índice, emite quando todos emitem

<strong>Operadores de estado:</strong>
• <strong>scan</strong> — como reduce, mas emite a cada passo (acumulador reativo)
• <strong>reduce</strong> — como scan, mas só emite ao completar o stream

<strong>Subjects:</strong>
• <strong>Subject</strong> — multicast, não tem valor inicial, não replay
• <strong>BehaviorSubject</strong> — armazena o último valor, emite imediatamente para novos subscribers
• <strong>ReplaySubject(n)</strong> — replay dos últimos n valores para novos subscribers
• <strong>AsyncSubject</strong> — emite apenas o último valor quando o stream completa`,
      examples: [
        {
          title: 'switchMap vs concatMap vs exhaustMap — quando usar cada um',
          code: `// =========================================================
// CASO 1: switchMap — Autocomplete (cancela req anterior)
// =========================================================
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  switchMap, debounceTime, distinctUntilChanged,
  mergeMap, concatMap, exhaustMap, filter
} from 'rxjs/operators';
import { Subject, from, EMPTY } from 'rxjs';

@Component({ selector: 'app-search', template: '' })
export class SearchComponent implements OnInit {
  searchCtrl = new FormControl('');
  results$ = this.searchCtrl.valueChanges.pipe(
    debounceTime(300),            // aguarda 300ms sem digitar
    distinctUntilChanged(),       // ignora se valor não mudou
    filter(term => term.length >= 2),
    switchMap(term =>             // CANCELA req anterior automaticamente
      this.http.get<any[]>(\`/api/search?q=\${term}\`)
    )
    // Se o usuário digita "ang" depois "angu" rapidamente:
    // → a req de "ang" é cancelada, só "angu" é processada
  );

  constructor(private http: HttpClient) {}
  ngOnInit() { this.results$.subscribe(); }
}

// =========================================================
// CASO 2: concatMap — Fila de uploads (mantém ordem)
// =========================================================
@Component({ selector: 'app-upload', template: '' })
export class UploadComponent {
  private uploadQueue$ = new Subject<File>();

  // Fila: processa um arquivo por vez, em ordem
  upload$ = this.uploadQueue$.pipe(
    concatMap(file => {
      const formData = new FormData();
      formData.append('file', file);
      return this.http.post('/api/upload', formData);
      // arquivo 2 só começa DEPOIS que arquivo 1 terminar
    })
  );

  constructor(private http: HttpClient) {
    this.upload$.subscribe({
      next: res => console.log('Upload concluído:', res),
      error: err => console.error('Erro no upload:', err)
    });
  }

  addToQueue(file: File) {
    this.uploadQueue$.next(file);
  }
}

// =========================================================
// CASO 3: exhaustMap — Evitar double-submit em formulários
// =========================================================
@Component({ selector: 'app-form', template: '' })
export class FormComponent {
  private submitBtn$ = new Subject<void>();

  // Ignora cliques enquanto a requisição estiver em andamento
  submit$ = this.submitBtn$.pipe(
    exhaustMap(() =>
      this.http.post('/api/pedido', { produto: 'curso', valor: 99.90 })
      // Se usuário clicar 3 vezes rapidamente:
      // → apenas o 1º clique dispara a req, os outros 2 são ignorados
    )
  );

  constructor(private http: HttpClient) {
    this.submit$.subscribe(res => console.log('Pedido criado:', res));
  }

  onSubmit() {
    this.submitBtn$.next();
  }
}

// =========================================================
// CASO 4: mergeMap — Downloads paralelos (sem ordem)
// =========================================================
const arquivos = ['relatorio.pdf', 'dados.csv', 'imagem.png'];

from(arquivos).pipe(
  mergeMap(arquivo =>
    // Todos os 3 downloads rodam em PARALELO
    fetch(\`/api/files/\${arquivo}\`).then(r => r.blob())
  )
).subscribe(blob => console.log('Arquivo recebido:', blob.size));`,
          explanation: 'A regra prática: switchMap para buscas (cancela), concatMap para filas com ordem, exhaustMap para ações únicas (login, checkout), mergeMap para paralelo sem importar ordem.'
        },
        {
          title: 'combineLatest, withLatestFrom e scan — estado reativo sem NgRx',
          code: `// =========================================================
// Dashboard reativo com filtros combinados
// =========================================================
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import {
  switchMap, withLatestFrom, scan,
  map, startWith, takeUntil
} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface Produto { id: number; nome: string; preco: number; categoria: string; }
interface CartItem { produto: Produto; quantidade: number; }
interface CartState { itens: CartItem[]; total: number; }

@Component({
  selector: 'app-dashboard',
  template: ''
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Streams de filtro
  categoriaCtrl = new FormControl('todos');
  pageCtrl = new BehaviorSubject<number>(1);
  private addToCart$ = new Subject<Produto>();

  // Usuário atual — sem precisar subscrever explicitamente
  private currentUser$ = new BehaviorSubject({ id: 1, nome: 'Adil', role: 'admin' });

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // -------------------------------------------------------
    // combineLatest: recalcula quando QUALQUER filtro muda
    // -------------------------------------------------------
    const filtros$ = combineLatest([
      this.categoriaCtrl.valueChanges.pipe(startWith('todos')),
      this.pageCtrl.asObservable()
    ]);

    const produtos$ = filtros$.pipe(
      switchMap(([categoria, page]) =>
        this.http.get<Produto[]>(\`/api/produtos?categoria=\${categoria}&page=\${page}\`)
      ),
      takeUntil(this.destroy$)
    );

    // -------------------------------------------------------
    // withLatestFrom: acessa valor atual sem novo emit
    // -------------------------------------------------------
    const produtosFiltrados$ = produtos$.pipe(
      withLatestFrom(this.currentUser$),
      map(([produtos, user]) => {
        // Tem acesso ao usuário atual sem disparar nova chamada
        console.log(\`Buscando produtos para: \${user.nome}\`);
        return user.role === 'admin'
          ? produtos  // admin vê tudo
          : produtos.filter(p => p.preco < 1000);
      })
    );

    produtosFiltrados$.subscribe(p => console.log('Produtos:', p));

    // -------------------------------------------------------
    // scan: acumula estado do carrinho de forma reativa
    // -------------------------------------------------------
    const estadoInicial: CartState = { itens: [], total: 0 };

    const cart$ = this.addToCart$.pipe(
      scan((state: CartState, produto: Produto): CartState => {
        const itemExistente = state.itens.find(i => i.produto.id === produto.id);

        const novosItens = itemExistente
          ? state.itens.map(i =>
              i.produto.id === produto.id
                ? { ...i, quantidade: i.quantidade + 1 }
                : i
            )
          : [...state.itens, { produto, quantidade: 1 }];

        const novoTotal = novosItens.reduce(
          (acc, item) => acc + item.produto.preco * item.quantidade, 0
        );

        return { itens: novosItens, total: novoTotal };
        // scan emite o estado ACUMULADO a cada produto adicionado
      }, estadoInicial),
      takeUntil(this.destroy$)
    );

    cart$.subscribe(state => {
      console.log(\`Carrinho: \${state.itens.length} itens, Total: R$ \${state.total.toFixed(2)}\`);
    });
  }

  adicionarAoCarrinho(produto: Produto) {
    this.addToCart$.next(produto);
  }

  mudarPagina(page: number) {
    this.pageCtrl.next(page);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}`,
          explanation: 'combineLatest é ideal para combinar múltiplos filtros (recalcula quando qualquer um muda). withLatestFrom acessa um stream auxiliar sem criar nova subscriçao reativa. scan é o "Redux reducer" do RxJS — acumula estado ao longo do tempo.'
        },
        {
          title: 'Custom operators e pipeable operators',
          code: `// =========================================================
// Criando operadores customizados reutilizáveis
// =========================================================
import { Observable, OperatorFunction, throwError, timer, EMPTY } from 'rxjs';
import {
  retryWhen, delayWhen, take, mergeMap, filter,
  tap, catchError
} from 'rxjs/operators';

// -------------------------------------------------------
// Operador 1: retryWithBackoff — retry com espera exponencial
// -------------------------------------------------------
export function retryWithBackoff<T>(
  maxRetries: number = 3,
  initialDelay: number = 1000,
  backoffFactor: number = 2
): OperatorFunction<T, T> {
  return (source: Observable<T>): Observable<T> =>
    source.pipe(
      retryWhen(errors =>
        errors.pipe(
          mergeMap((error, attempt) => {
            if (attempt >= maxRetries) {
              return throwError(() => error); // desiste após maxRetries
            }
            const delay = initialDelay * Math.pow(backoffFactor, attempt);
            console.warn(\`Tentativa \${attempt + 1}/\${maxRetries}. Aguardando \${delay}ms...\`);
            return timer(delay); // aguarda delay exponencial
          }),
          take(maxRetries)
        )
      )
    );
}

// -------------------------------------------------------
// Operador 2: filterNullish — remove null e undefined
// -------------------------------------------------------
export function filterNullish<T>(): OperatorFunction<T | null | undefined, T> {
  return (source: Observable<T | null | undefined>): Observable<T> =>
    source.pipe(
      filter((value): value is T => value !== null && value !== undefined)
    );
}

// -------------------------------------------------------
// Operador 3: debug — loga eventos para desenvolvimento
// -------------------------------------------------------
export function debug<T>(label: string): OperatorFunction<T, T> {
  return (source: Observable<T>): Observable<T> =>
    source.pipe(
      tap({
        next: value => console.log(\`[DEBUG:\${label}] next:\`, value),
        error: err => console.error(\`[DEBUG:\${label}] error:\`, err),
        complete: () => console.log(\`[DEBUG:\${label}] complete\`)
      })
    );
}

// -------------------------------------------------------
// Uso real compondo os operadores customizados
// -------------------------------------------------------
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  constructor(private http: HttpClient) {}

  getProduto(id: number | null) {
    return of(id).pipe(
      filterNullish(),                    // só continua se id não é null
      debug('ID recebido'),               // loga o id
      switchMap(id =>
        this.http.get<Produto>(\`/api/produtos/\${id}\`).pipe(
          retryWithBackoff(3, 500),       // retry: 500ms, 1000ms, 2000ms
          debug('Resposta da API'),       // loga a resposta
          catchError(err => {
            console.error('Falha após todas as tentativas:', err);
            return EMPTY;               // completa silenciosamente
          })
        )
      )
    );
  }
}

// -------------------------------------------------------
// Composição de operadores em pipelines reutilizáveis
// -------------------------------------------------------
import { pipe } from 'rxjs';

// Cria um pipeline reutilizável combinando vários operadores
export const apiPipeline = <T>(label: string) => pipe(
  debug<T>(\`\${label}:request\`),
  retryWithBackoff<T>(2, 1000),
  catchError((err: Error) => {
    console.error(\`[\${label}] API Error:\`, err.message);
    return EMPTY;
  }),
  debug<T>(\`\${label}:success\`)
);

// Uso:
// this.http.get('/api/dados').pipe(apiPipeline('DashboardService'))`,
          explanation: 'Custom operators são funções que recebem e retornam Observable. OperatorFunction<T, R> define a tipagem. Compor operators com pipe() cria pipelines reutilizáveis entre serviços. O debug operator é especialmente útil para diagnosticar streams complexas em desenvolvimento.'
        }
      ],
      quiz: [
        {
          q: 'Qual operador cancelaria automaticamente uma requisição HTTP anterior ao receber um novo valor? (ex: autocomplete)',
          options: [
            'mergeMap — executa todos em paralelo sem cancelar',
            'switchMap — cancela o observable anterior ao chegar novo valor',
            'concatMap — enfileira os observables em ordem',
            'exhaustMap — ignora novos valores enquanto processa o atual'
          ],
          answer: 1,
          explanation: 'switchMap é o ideal para autocomplete: quando o usuário digita uma nova letra, ele cancela (unsubscribe) a requisição anterior e inicia uma nova, evitando respostas fora de ordem.'
        },
        {
          q: 'Em qual situação o exhaustMap é a escolha correta?',
          options: [
            'Busca com autocomplete onde queries antigas devem ser canceladas',
            'Upload de múltiplos arquivos onde a ordem importa',
            'Botão de "Finalizar Compra" para evitar que o usuário submeta o formulário duas vezes',
            'Download paralelo de vários arquivos simultaneamente'
          ],
          answer: 2,
          explanation: 'exhaustMap ignora todos os novos valores enquanto o observable atual ainda está ativo. Perfeito para ações que não devem ser duplicadas: submit de formulário, login, checkout. Enquanto a requisição estiver pendente, cliques adicionais são simplesmente ignorados.'
        },
        {
          q: 'Qual é a diferença entre combineLatest e withLatestFrom?',
          options: [
            'combineLatest é síncrono, withLatestFrom é assíncrono',
            'combineLatest emite quando qualquer stream emite; withLatestFrom só emite quando o stream fonte emite',
            'withLatestFrom combina múltiplos streams; combineLatest apenas dois',
            'Não há diferença prática, são intercambiáveis'
          ],
          answer: 1,
          explanation: 'combineLatest(a$, b$) emite um novo valor quando QUALQUER dos streams emite (ideal para filtros combinados). withLatestFrom(b$) só emite quando o stream principal emite, usando o valor mais recente de b$ sem criar nova reatividade (ideal para acessar dados de contexto como usuário logado).'
        },
        {
          q: 'Qual a diferença entre scan e reduce no RxJS?',
          options: [
            'scan é para números, reduce é para objetos',
            'reduce cancela emissões anteriores, scan mantém todas',
            'scan emite o valor acumulado a cada item; reduce só emite quando o stream completa',
            'Não há diferença, ambos emitem em tempo real'
          ],
          answer: 2,
          explanation: 'scan emite o acumulador a cada novo item (como um state em Redux, ideal para carrinho de compras, contadores em tempo real). reduce só emite o resultado final quando o Observable completa — portanto não funciona com streams infinitas como eventos de usuário.'
        },
        {
          q: 'Qual Subject devo usar para armazenar e expor o estado do usuário logado, garantindo que novos subscribers recebam o valor atual imediatamente?',
          options: [
            'Subject — simples, mas não armazena o último valor',
            'BehaviorSubject — armazena o último valor e o emite imediatamente para novos subscribers',
            'ReplaySubject(5) — replaya os últimos 5 valores',
            'AsyncSubject — emite apenas ao completar'
          ],
          answer: 1,
          explanation: 'BehaviorSubject requer um valor inicial e sempre armazena o último valor emitido. Quando um novo componente subscreve (ex: um guard de rota), recebe imediatamente o estado atual do usuário. É o padrão mais usado para gerenciamento de estado simples em Angular sem NgRx.'
        }
      ]
    }
  },

  {
    id: 'ng-ssr',
    title: 'SSR e Angular Universal',
    xp: 25,
    lesson: {
      title: 'Server-Side Rendering com Angular Universal',
      theory: `<strong>SSR (Server-Side Rendering)</strong> renderiza o HTML no servidor antes de enviar ao browser. Angular 17+ tem SSR built-in com hydration aprimorada.

<strong>Por que usar SSR?</strong>
• <strong>SEO</strong> — bots do Google indexam o HTML completo, não uma página em branco
• <strong>First Contentful Paint (FCP)</strong> — usuário vê conteúdo mais rápido
• <strong>Social sharing</strong> — og:title e og:image funcionam corretamente

<strong>SSG vs SSR:</strong>
• <strong>SSR</strong> — renderizado a cada request no servidor (dados sempre atuais)
• <strong>SSG</strong> — pré-renderizado em build time (mais rápido, mas dados estáticos)

<strong>Desafios do SSR — APIs do Browser não existem no servidor:</strong>
• <code>window</code> não existe (ReferenceError: window is not defined)
• <code>localStorage</code> não existe
• <code>document</code> não existe
• <code>navigator</code> não existe

<strong>Soluções:</strong>
• <code>PLATFORM_ID + isPlatformBrowser()</code> — verifica o ambiente
• <code>afterNextRender()</code> — executa código somente no browser (Angular 16+)
• Injection tokens para abstrair APIs do browser
• <code>provideClientHydration()</code> — reidratação do DOM sem destruir e recriar`,
      examples: [
        {
          title: 'SSR com Angular 17+ — setup e configuração completa',
          code: `// =========================================================
// 1. Criar projeto Angular com SSR habilitado
// =========================================================
// ng new meu-app --ssr
// Ou adicionar SSR a projeto existente:
// ng add @angular/ssr

// =========================================================
// 2. app.config.ts — configuração do cliente
// =========================================================
// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),  // withFetch() é necessário para SSR
    provideClientHydration()         // reidratação incremental do DOM
    // NÃO destrói e recria o DOM — aproveita o HTML do servidor
  ]
};

// =========================================================
// 3. app.config.server.ts — configuração do servidor
// =========================================================
// src/app/app.config.server.ts
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

// =========================================================
// 4. server.ts — Express server para SSR
// =========================================================
// server.ts (na raiz do projeto)
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');
  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Serve arquivos estáticos
  server.get('*.*', express.static(browserDistFolder, { maxAge: '1y' }));

  // Todas as rotas são renderizadas pelo Angular
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;
    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: \`\${protocol}://\${headers.host}\${originalUrl}\`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }]
      })
      .then(html => res.send(html))
      .catch(err => next(err));
  });

  return server;
}

// =========================================================
// 5. Verificar plataforma no componente
// =========================================================
// src/app/home/home.component.ts
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  template: '<h1>Olá</h1>'
})
export class HomeComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Código seguro apenas no browser
      console.log('Largura da tela:', window.innerWidth);
      localStorage.setItem('visitou', 'true');
    }

    if (isPlatformServer(this.platformId)) {
      // Código apenas no servidor (ex: buscar dados pré-renderizados)
      console.log('Renderizando no servidor');
    }
  }
}`,
          explanation: 'Angular 17+ integra SSR nativamente. provideClientHydration() é crucial: sem ele, o Angular destruiria e recriaria o DOM após o bootstrap, causando flicker. withFetch() substitui o XMLHttpRequest por fetch, que funciona tanto no Node.js quanto no browser.'
        },
        {
          title: 'Evitar erros SSR — isPlatformBrowser e serviços SSR-safe',
          code: `// =========================================================
// Erros comuns no SSR e como corrigir
// =========================================================

// ❌ ERRO: ReferenceError: localStorage is not defined
@Component({ selector: 'app-bad', template: '' })
export class BadComponent implements OnInit {
  ngOnInit() {
    const token = localStorage.getItem('token'); // QUEBRA no servidor!
  }
}

// =========================================================
// ✅ SOLUÇÃO 1: LocalStorageService SSR-safe com PLATFORM_ID
// =========================================================
// src/app/services/storage.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getItem(key: string): string | null {
    if (!this.isBrowser) return null; // no servidor, retorna null
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    if (!this.isBrowser) return; // no servidor, não faz nada
    localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    if (!this.isBrowser) return;
    localStorage.removeItem(key);
  }
}

// =========================================================
// ✅ SOLUÇÃO 2: afterNextRender — código só no browser
// =========================================================
// Angular 16+ — substitui workarounds com setTimeout
import { Component, afterNextRender, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chart',
  standalone: true,
  template: '<canvas #chartCanvas></canvas>'
})
export class ChartComponent {
  @ViewChild('chartCanvas') chartRef!: ElementRef<HTMLCanvasElement>;

  constructor() {
    // afterNextRender: executado apenas no browser, após a renderização
    afterNextRender(() => {
      // Seguro usar APIs do browser aqui
      const canvas = this.chartRef.nativeElement;
      const ctx = canvas.getContext('2d');
      // Inicializar Chart.js, D3, etc. com segurança
      this.initChart(ctx!);
    });
    // Equivalente ao antigo: setTimeout(() => ..., 0)
    // Mas com garantia do Angular, sem hack
  }

  private initChart(ctx: CanvasRenderingContext2D) {
    // Inicializa biblioteca de gráficos apenas no browser
    console.log('Chart inicializado com segurança');
  }
}

// =========================================================
// ✅ SOLUÇÃO 3: Injection Token para window SSR-safe
// =========================================================
// src/app/tokens/window.token.ts
import { InjectionToken, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const WINDOW = new InjectionToken<Window | null>('WINDOW', {
  providedIn: 'root',
  factory: () => {
    const platformId = inject(PLATFORM_ID);
    return isPlatformBrowser(platformId) ? window : null;
  }
});

// Uso no componente:
@Component({ selector: 'app-exemplo', standalone: true, template: '' })
export class ExemploComponent {
  constructor(@Inject(WINDOW) private win: Window | null) {
    if (this.win) {
      console.log('URL:', this.win.location.href);
      console.log('UserAgent:', this.win.navigator.userAgent);
    }
  }
}`,
          explanation: 'A regra de ouro do SSR: nunca acesse window, document ou localStorage diretamente. Sempre encapsule em um service que verifica isPlatformBrowser(). afterNextRender() é a forma moderna (Angular 16+) de executar código client-only sem setTimeout hacks. O Injection Token para window é um padrão elegante para injetar APIs do browser de forma testável.'
        },
        {
          title: 'Meta tags dinâmicas para SEO com Angular Universal',
          code: `// =========================================================
// SEO dinâmico — Meta, Title e JSON-LD
// =========================================================
import {
  Component, OnInit, OnDestroy, Inject
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  slug: string;
}

// =========================================================
// SEO Service — centraliza lógica de meta tags
// =========================================================
// src/app/services/seo.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private document: Document
  ) {}

  updateProductSeo(produto: Produto, baseUrl: string = 'https://meusite.com.br') {
    const url = \`\${baseUrl}/produtos/\${produto.slug}\`;

    // Título da aba e do Google
    this.title.setTitle(\`\${produto.nome} — R$ \${produto.preco.toFixed(2)} | MeuShop\`);

    // Meta tags padrão
    this.meta.updateTag({ name: 'description', content: produto.descricao.slice(0, 160) });

    // Open Graph — Facebook, WhatsApp, LinkedIn
    this.meta.updateTag({ property: 'og:title', content: produto.nome });
    this.meta.updateTag({ property: 'og:description', content: produto.descricao });
    this.meta.updateTag({ property: 'og:image', content: produto.imagem });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: 'product' });
    this.meta.updateTag({ property: 'og:site_name', content: 'MeuShop' });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: produto.nome });
    this.meta.updateTag({ name: 'twitter:image', content: produto.imagem });

    // Canonical URL — evita conteúdo duplicado
    this.setCanonical(url);

    // JSON-LD — dados estruturados para o Google
    this.injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: produto.nome,
      description: produto.descricao,
      image: produto.imagem,
      offers: {
        '@type': 'Offer',
        price: produto.preco,
        priceCurrency: 'BRL',
        availability: 'https://schema.org/InStock',
        url: url
      }
    });
  }

  private setCanonical(url: string) {
    let link = this.document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private injectJsonLd(schema: object) {
    // Remove script anterior se existir
    const existing = this.document.querySelector('#json-ld-produto');
    if (existing) existing.remove();

    const script = this.document.createElement('script');
    script.id = 'json-ld-produto';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }
}

// =========================================================
// Componente de produto usando o SeoService
// =========================================================
@Component({
  selector: 'app-produto-detalhe',
  standalone: true,
  template: '<div *ngIf="produto">{{ produto.nome }}</div>'
})
export class ProdutoDetalheComponent implements OnInit, OnDestroy {
  produto?: Produto;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private seo: SeoService
  ) {}

  ngOnInit() {
    this.route.params.pipe(
      switchMap(({ slug }) =>
        this.http.get<Produto>(\`/api/produtos/\${slug}\`)
      ),
      takeUntil(this.destroy$)
    ).subscribe(produto => {
      this.produto = produto;
      // Atualiza todas as meta tags dinamicamente
      this.seo.updateProductSeo(produto);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}`,
          explanation: 'O Meta service do Angular atualiza/cria/remove tags <meta> programaticamente. No SSR, essas tags são incluídas no HTML enviado ao servidor antes que bots as leiam. JSON-LD (dados estruturados) é injetado no <head> e permite ao Google exibir rich results (preço, avaliações) diretamente no resultado de busca. Sempre defina canonical URL para evitar penalidades de conteúdo duplicado.'
        }
      ],
      quiz: [
        {
          q: 'Qual é a principal diferença entre SSR (Server-Side Rendering) e CSR (Client-Side Rendering)?',
          options: [
            'SSR usa React, CSR usa Angular',
            'No SSR o HTML é gerado no servidor a cada request; no CSR o JavaScript gera o HTML no browser do usuário',
            'SSR é mais rápido para todas as métricas em todos os cenários',
            'CSR não suporta roteamento SPA'
          ],
          answer: 1,
          explanation: 'No CSR (padrão Angular), o servidor envia um HTML quase vazio e o JavaScript gera todo o conteúdo no browser. No SSR, o servidor renderiza o HTML completo antes de enviar, permitindo que bots de SEO e o usuário vejam o conteúdo imediatamente, sem esperar o JavaScript carregar.'
        },
        {
          q: 'Para que serve o provideClientHydration() no Angular 17+?',
          options: [
            'Configura o HttpClient para fazer requisições no servidor',
            'Habilita a reidratação incremental do DOM gerado pelo servidor, sem destruir e recriar os elementos',
            'Ativa o modo de desenvolvimento com hot reload',
            'Injeta dados do servidor diretamente no LocalStorage'
          ],
          answer: 1,
          explanation: 'Sem provideClientHydration(), o Angular destruiria todo o DOM gerado pelo servidor e recriaria do zero após o bootstrap (causando flicker/piscar). Com ele, o Angular "reidrata" o DOM existente, apenas adicionando event listeners, preservando o HTML inicial e melhorando o LCP (Largest Contentful Paint).'
        },
        {
          q: 'Por que localStorage.getItem("token") lança ReferenceError em uma aplicação SSR?',
          options: [
            'localStorage é assíncrono no Node.js',
            'O código Angular SSR roda no Node.js, onde window e localStorage não existem',
            'Angular bloqueia o uso de localStorage por segurança',
            'localStorage só funciona com HTTPS'
          ],
          answer: 1,
          explanation: 'No SSR, o Angular roda dentro do Node.js para gerar o HTML. O Node.js não tem as APIs do browser (window, document, localStorage, navigator). Por isso, qualquer acesso direto a essas APIs causa erros no servidor. A solução é verificar o ambiente com PLATFORM_ID + isPlatformBrowser() antes de acessá-las.'
        },
        {
          q: 'Como PLATFORM_ID é usado para escrever código compatível com SSR?',
          options: [
            'PLATFORM_ID define o número de threads do servidor SSR',
            'É injetado no construtor e usado com isPlatformBrowser() para executar código somente no browser',
            'PLATFORM_ID configura o protocolo HTTP do servidor Express',
            'Define qual versão do Angular está sendo usada na plataforma'
          ],
          answer: 1,
          explanation: 'PLATFORM_ID é um token de injeção do Angular que identifica a plataforma atual. Ao injetar com @Inject(PLATFORM_ID) e usar isPlatformBrowser(platformId), você pode condicionar código que usa APIs do browser (localStorage, window.resize, canvas) para rodar apenas quando estiver no contexto do browser.'
        },
        {
          q: 'Quando devo usar afterNextRender() em vez de ngOnInit() para acessar APIs do browser?',
          options: [
            'Sempre — afterNextRender substitui completamente o ngOnInit',
            'Quando preciso acessar o DOM ou APIs do browser (canvas, ResizeObserver), pois afterNextRender só executa no browser após a renderização',
            'afterNextRender é para dados assíncronos; ngOnInit para dados síncronos',
            'Apenas em componentes standalone, não em componentes de módulo'
          ],
          answer: 1,
          explanation: 'afterNextRender() (Angular 16+) garante que o código seja executado apenas no browser e apenas após a renderização do DOM estar completa. É a solução moderna para inicializar bibliotecas como Chart.js, D3, ResizeObserver — coisas que precisam do DOM real. Não funciona no servidor, por isso é SSR-safe por design.'
        }
      ]
    }
  },

  {
    id: 'ng-micro-frontends',
    title: 'Micro-frontends com Module Federation',
    xp: 30,
    lesson: {
      title: 'Micro-frontends com Module Federation (Webpack 5)',
      theory: `<strong>Module Federation</strong> (Webpack 5) permite que múltiplas aplicações Angular compartilhem código e componentes em runtime, sem rebuild.

<strong>Conceitos fundamentais:</strong>
• <strong>Shell (Host)</strong> — aplicação principal que carrega os micro-frontends
• <strong>Remote</strong> — aplicação que expõe módulos para ser consumida pelo Shell
• <strong>Exposes</strong> — define o que o Remote torna público
• <strong>Remotes</strong> — define quais Remotes o Shell conhece
• <strong>Shared</strong> — libs compartilhadas (Angular, RxJS) carregadas apenas uma vez

<strong>Por que usar?</strong>
• Times diferentes trabalham em partes do app independentemente
• Deploy independente — atualizar checkout não afeta o carrinho
• Stack heterogênea — Shell Angular + Remote React (possível)
• Escala de múltiplos times sem conflitos de merge

<strong>Fluxo de execução:</strong>
1. Usuário acessa o Shell
2. Shell carrega seu JavaScript normalmente
3. Ao navegar para /checkout, Shell chega no lazy route do checkout
4. Module Federation carrega o JS do Remote Checkout em runtime
5. Angular instancia o componente do Remote como se fosse local

<strong>Ferramentas:</strong>
• <code>@angular-architects/module-federation</code> — plugin para Angular
• <code>loadRemoteModule()</code> — carrega Remote em lazy routes
• <code>@angular-architects/native-federation</code> — alternativa com ESM nativo`,
      examples: [
        {
          title: 'Configuração do Shell e dos Remotes',
          code: `// =========================================================
// Instalar o plugin de Module Federation
// =========================================================
// ng add @angular-architects/module-federation --project shell --port 4200 --type host
// ng add @angular-architects/module-federation --project mfe-checkout --port 4201 --type remote

// =========================================================
// webpack.config.js do SHELL (Host) — porta 4200
// =========================================================
// projects/shell/webpack.config.js
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  remotes: {
    // nome-local: "nome-global@URL/remoteEntry.js"
    "mfeCheckout": "mfeCheckout@http://localhost:4201/remoteEntry.js",
    "mfePerfil":   "mfePerfil@http://localhost:4202/remoteEntry.js",
    // Em produção, usar variáveis de ambiente:
    // "mfeCheckout": \`mfeCheckout@\${process.env.CHECKOUT_URL}/remoteEntry.js\`
  },
  shared: {
    ...shareAll({
      singleton: true,      // apenas UMA instância compartilhada
      strictVersion: true,  // versões incompatíveis causam erro (mais seguro)
      requiredVersion: 'auto' // usa a versão do package.json
    })
  }
});

// =========================================================
// webpack.config.js do REMOTE Checkout — porta 4201
// =========================================================
// projects/mfe-checkout/webpack.config.js
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'mfeCheckout', // deve coincidir com o nome no Shell

  exposes: {
    // './Checkout' é o alias público que o Shell importa
    './Checkout': './projects/mfe-checkout/src/app/checkout/checkout.module.ts',
    // Também pode expor componentes standalone:
    './PagamentoComponent': './projects/mfe-checkout/src/app/pagamento/pagamento.component.ts'
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    })
  }
});

// =========================================================
// bootstrap.ts do Remote — necessário para Module Federation
// =========================================================
// projects/mfe-checkout/src/bootstrap.ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// projects/mfe-checkout/src/main.ts
// IMPORTANTE: importar bootstrap de forma dinâmica (quebra de ciclo)
import('./bootstrap').catch(err => console.error(err));`,
          explanation: 'A separação entre main.ts e bootstrap.ts é obrigatória no Module Federation. O import() dinâmico garante que o Webpack inicialize o sistema de compartilhamento de módulos antes de executar o código da aplicação. remoteEntry.js é o manifesto gerado pelo Webpack com o mapa de módulos expostos pelo Remote.'
        },
        {
          title: 'Lazy loading de Micro-frontend no Router',
          code: `// =========================================================
// Shell Router — carrega Remotes de forma lazy
// =========================================================
// projects/shell/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'checkout',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './Checkout'  // deve corresponder ao "exposes" do Remote
      })
      .then(m => m.CheckoutModule)
      .catch(() => import('./fallback/checkout-fallback.module')
        .then(m => m.CheckoutFallbackModule)  // fallback se Remote indisponível
      )
  },
  {
    path: 'perfil',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './PerfilComponent'
      })
      .then(m => m.PerfilComponent)
  }
];

// =========================================================
// Carregamento dinâmico com URL do ambiente
// =========================================================
// projects/shell/src/app/app.routes.ts (versão produção-ready)
import { environment } from '../environments/environment';

function getCheckoutUrl(): string {
  // URL vem de variável de ambiente ou de uma API de service discovery
  return environment.remotes?.checkout ?? 'http://localhost:4201/remoteEntry.js';
}

export const prodRoutes: Routes = [
  {
    path: 'checkout',
    loadChildren: async () => {
      const m = await loadRemoteModule({
        type: 'module',
        remoteEntry: getCheckoutUrl(),
        exposedModule: './Checkout'
      });
      return m.CheckoutModule;
    }
  }
];

// =========================================================
// Componente de Fallback para Remote indisponível
// =========================================================
// projects/shell/src/app/fallback/checkout-fallback.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout-fallback',
  standalone: true,
  imports: [RouterLink],
  template: \`
    <div class="fallback-container">
      <h2>Checkout temporariamente indisponível</h2>
      <p>Estamos trabalhando para resolver. Tente novamente em alguns minutos.</p>
      <a routerLink="/">Voltar ao início</a>
    </div>
  \`
})
export class CheckoutFallbackComponent {}`,
          explanation: 'loadRemoteModule() é o coração do Module Federation no Angular. Ele baixa o remoteEntry.js em runtime, resolve as dependências compartilhadas e instancia o módulo/componente do Remote. O .catch() é essencial em produção: se o serviço de checkout estiver fora do ar, o usuário vê o fallback em vez de uma tela branca de erro.'
        },
        {
          title: 'Compartilhar biblioteca entre micro-frontends — shared libs',
          code: `// =========================================================
// shared config — evitar múltiplas instâncias do Angular
// =========================================================
// Configuração shared CORRETA — singleton por versão
const sharedConfig = {
  "@angular/core": {
    singleton: true,
    strictVersion: true,  // erro se versões incompatíveis
    requiredVersion: 'auto'
  },
  "@angular/common": {
    singleton: true,
    strictVersion: true,
    requiredVersion: 'auto'
  },
  "@angular/router": {
    singleton: true,
    strictVersion: true,
    requiredVersion: 'auto'
  },
  "rxjs": {
    singleton: true,
    strictVersion: false,   // RxJS é mais tolerante
    requiredVersion: '^7.0.0'
  },
  // Biblioteca de design compartilhada
  "@empresa/design-system": {
    singleton: true,
    strictVersion: true,
    requiredVersion: 'auto'
  }
};

// =========================================================
// Compartilhar estado entre MFEs via Custom Events
// =========================================================
// Padrão simples: sem dependência entre os MFEs
// projects/shell/src/app/services/mfe-event-bus.service.ts
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface MfeEvent<T = unknown> {
  type: string;
  payload: T;
  source: string; // qual MFE disparou
}

@Injectable({ providedIn: 'root' })
export class MfeEventBusService {
  private eventBus = new Subject<MfeEvent>();

  // MFE dispara evento
  emit<T>(type: string, payload: T, source: string = 'shell') {
    this.eventBus.next({ type, payload, source });
    // Também dispara como CustomEvent no window para MFEs em iframes
    window.dispatchEvent(
      new CustomEvent(\`mfe:\${type}\`, { detail: { payload, source } })
    );
  }

  // Outro MFE escuta
  on<T>(type: string): Observable<T> {
    return this.eventBus.pipe(
      filter(event => event.type === type),
      map(event => event.payload as T)
    );
  }
}

// =========================================================
// Uso no MFE Checkout — emite quando pedido é criado
// =========================================================
// mfe-checkout: ao finalizar compra
import { Component } from '@angular/core';

@Component({ selector: 'app-checkout', standalone: true, template: '' })
export class CheckoutComponent {
  constructor(private eventBus: MfeEventBusService) {}

  finalizarPedido(pedido: any) {
    this.eventBus.emit('pedido:criado', {
      id: pedido.id,
      total: pedido.total
    }, 'mfe-checkout');
  }
}

// =========================================================
// Shell escuta o evento e atualiza o menu
// =========================================================
// shell: componente de header
@Component({ selector: 'app-header', standalone: true, template: '' })
export class HeaderComponent implements OnInit {
  pedidosCriados = 0;

  constructor(private eventBus: MfeEventBusService) {}

  ngOnInit() {
    this.eventBus.on<{ id: string; total: number }>('pedido:criado')
      .subscribe(pedido => {
        this.pedidosCriados++;
        console.log(\`Pedido \${pedido.id} criado: R$ \${pedido.total}\`);
      });
  }
}`,
          explanation: 'singleton: true é fundamental para @angular/core e @angular/router — múltiplas instâncias do Angular causam erros graves de injeção de dependência. O EventBus via Subject é uma forma leve de comunicação entre MFEs sem acoplamento direto. Para estados mais complexos, considere uma biblioteca compartilhada com BehaviorSubject ou até NgRx standalone que o Shell expõe como shared lib.'
        }
      ],
      quiz: [
        {
          q: 'O que é Module Federation no contexto de micro-frontends com Angular?',
          options: [
            'Um padrão de nomenclatura de módulos Angular para grandes projetos',
            'Um recurso do Webpack 5 que permite múltiplas aplicações compartilharem código em runtime sem rebuild',
            'Uma biblioteca Angular para dividir o app.module.ts em partes menores',
            'O sistema de lazy loading nativo do Angular Router'
          ],
          answer: 1,
          explanation: 'Module Federation é uma feature do Webpack 5 que permite que aplicações JavaScript compartilhem módulos em tempo de execução. Em vez de compilar tudo junto, cada micro-frontend (MFE) é uma aplicação Angular independente que expõe partes de si mesmo. O Shell carrega esses módulos dinamicamente via remoteEntry.js, sem precisar recompilar.'
        },
        {
          q: 'No contexto do Module Federation, qual é a diferença entre Shell e Remote?',
          options: [
            'Shell é o backend, Remote é o frontend',
            'Shell é a aplicação hospedeira que carrega Remotes; Remotes são apps independentes que expõem módulos/componentes',
            'Shell é um componente Angular, Remote é um NgModule',
            'Shell carrega assets estáticos; Remote carrega lógica de negócio'
          ],
          answer: 1,
          explanation: 'O Shell (também chamado Host) é a aplicação "contêiner" que orquestra os micro-frontends. Ele define quais Remotes conhece e quando carregá-los via Router. Os Remotes são aplicações Angular completas e deployáveis independentemente, que definem o que expõem (exposes). Quando o usuário navega para /checkout, o Shell baixa e monta o Remote de Checkout em runtime.'
        },
        {
          q: 'Por que é importante configurar singleton: true para @angular/core no shared config?',
          options: [
            'Para reduzir o tempo de build em desenvolvimento',
            'Porque múltiplas instâncias do Angular causam erros de injeção de dependência e comportamento imprevisível',
            'Singleton: true é apenas uma otimização de performance, não afeta o funcionamento',
            'Para garantir que o Angular seja atualizado automaticamente via CDN'
          ],
          answer: 1,
          explanation: 'O Angular depende de um único sistema de injeção de dependência e de um único contexto de change detection. Se Shell e Remote carregassem versões separadas do @angular/core, teríamos dois Angular rodando na mesma página — os serviços injetados no Shell não seriam os mesmos que no Remote, causando erros crypticos. singleton: true garante que apenas uma instância do @angular/core existe em toda a aplicação.'
        },
        {
          q: 'Qual é o principal benefício operacional de usar micro-frontends com Module Federation em grandes empresas?',
          options: [
            'Reduz o tamanho do bundle final em 90%',
            'Permite que times diferentes façam deploy de suas partes da aplicação de forma independente',
            'Elimina a necessidade de testes automatizados',
            'Substitui o Angular Router por um sistema de roteamento mais performático'
          ],
          answer: 1,
          explanation: 'O principal benefício é a autonomia dos times: o time de Checkout pode lançar uma nova versão do fluxo de pagamento sem precisar sincronizar com o time de Catálogo. Cada Remote tem seu próprio pipeline de CI/CD, repositório e ciclo de release. Isso escala o desenvolvimento para dezenas de times trabalhando em paralelo com mínima coordenação.'
        },
        {
          q: 'O que loadRemoteModule() faz no Angular Router?',
          options: [
            'Importa módulos locais de forma lazy (igual ao loadChildren padrão)',
            'Baixa e instancia dinamicamente um módulo/componente de uma aplicação Angular remota em runtime',
            'Configura o Service Worker para cache dos micro-frontends',
            'Conecta o Angular ao backend via WebSocket para carregamento em tempo real'
          ],
          answer: 1,
          explanation: 'loadRemoteModule() é fornecido pelo @angular-architects/module-federation. Ao ser chamado, ele: (1) baixa o remoteEntry.js da URL especificada, (2) resolve e compartilha as dependências declaradas como shared, (3) localiza o módulo exposto pelo nome configurado em exposedModule, e (4) retorna o módulo para o Angular Router fazer o lazy loading normalmente. Sem ele, você teria que usar import() dinâmico manual com Webpack magic strings.'
        }
      ]
    }
  },

  {
    id: 'ng-performance-avancado',
    title: 'Performance Avançada',
    xp: 25,
    lesson: {
      title: 'Performance Avançada — Bundle, Zone-less e Defer',
      theory: `Performance Angular vai muito além do OnPush. Técnicas sênior envolvem análise de bundle, reatividade sem Zone.js e carregamento progressivo.

<strong>Bundle Analysis:</strong>
• <strong>webpack-bundle-analyzer</strong> — visualização do tamanho de cada dependência
• <strong>source-map-explorer</strong> — alternativa mais leve
• <code>ng build --stats-json</code> — gera stats.json para análise

<strong>Preloading Strategies:</strong>
• <strong>Sem preload (padrão)</strong> — lazy modules carregados sob demanda
• <strong>PreloadAllModules</strong> — carrega todos após o bootstrap
• <strong>QuicklinkStrategy</strong> — pré-carrega apenas links visíveis no viewport

<strong>Zone.js e Change Detection:</strong>
• Zone.js monitora assincronicidade e dispara change detection automaticamente
• <strong>OnPush</strong> — component só atualiza quando Input muda ou async pipe emite
• <strong>Zoneless (Angular 18+)</strong> — sem Zone.js, change detection manual via Signals
• <strong>Signals</strong> — primitivo reativo que notifica o Angular somente quando necessário

<strong>Angular 17+ — Defer Blocks:</strong>
• <code>@defer</code> — lazy load de componentes no template sem router
• <code>@placeholder</code> — exibido antes do carregamento
• <code>@loading</code> — exibido durante o carregamento
• <code>@error</code> — exibido em caso de falha
• Triggers: <code>on viewport</code>, <code>on idle</code>, <code>on interaction</code>, <code>on timer(2s)</code>

<strong>Virtual Scrolling (CDK):</strong>
• Renderiza apenas os itens visíveis na tela
• Essencial para listas com mais de 1000 itens
• <code>cdk-virtual-scroll-viewport</code> com <code>*cdkVirtualFor</code>`,
      examples: [
        {
          title: 'Analisar e reduzir bundle — webpack-bundle-analyzer',
          code: `# =========================================================
# 1. Instalar webpack-bundle-analyzer
# =========================================================
npm install --save-dev webpack-bundle-analyzer

# 2. Gerar stats.json
ng build --stats-json
# Gera: dist/meu-app/stats.json

# 3. Analisar visualmente
npx webpack-bundle-analyzer dist/meu-app/stats.json
# Abre http://localhost:8888 com mapa visual interativo

# =========================================================
# Interpretar resultados e agir
# =========================================================
# Problemas comuns encontrados no analyzer:
# - moment.js (300kb gzip) → substituir por date-fns (tree-shakeable)
# - lodash completo (70kb) → importar só a função: import debounce from 'lodash/debounce'
# - @angular/material inteiro → lazy load somente módulos usados

// =========================================================
// app.routes.ts — Estratégias de preloading
// =========================================================
import { Routes } from '@angular/router';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
// QuicklinkStrategy: npm install ngx-quicklink
import { QuicklinkStrategy, QuicklinkModule } from 'ngx-quicklink';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component')
      .then(m => m.DashboardComponent),
    // data: { preload: true } — para custom strategies
  },
  {
    path: 'relatorios',
    loadChildren: () => import('./relatorios/relatorios.routes')
      .then(m => m.relatoriosRoutes)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes')
      .then(m => m.adminRoutes),
    canMatch: [() => inject(AuthService).isAdmin()] // só carrega se admin
  }
];

// app.config.ts — Escolhendo a estratégia
import { ApplicationConfig, inject } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    // Opção A: PreloadAllModules — baixa tudo em background após bootstrap
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // Opção B: QuicklinkStrategy — baixa apenas rotas com links no viewport
    // provideRouter(routes, withPreloading(QuicklinkStrategy)),

    // Opção C: CustomPreloadingStrategy
    // provideRouter(routes, withPreloading(CustomPreloadingStrategy)),
  ]
};

// =========================================================
// Custom Preloading Strategy — controle granular
// =========================================================
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Pré-carrega apenas rotas marcadas com data.preload: true
    if (route.data?.['preload']) {
      // Aguarda 2 segundos para não competir com o bundle inicial
      return timer(2000).pipe(switchMap(() => load()));
    }
    return of(null); // não pré-carrega
  }
}`,
          explanation: 'webpack-bundle-analyzer revela "bombers" ocultos no seu bundle. O momento moment.js (300KB!) é o clássico — date-fns é 80% menor e tree-shakeable. QuicklinkStrategy é a estratégia mais inteligente: usa IntersectionObserver para pré-carregar apenas as rotas que o usuário provavelmente vai acessar (aquelas com links visíveis na tela). Custom strategy dá controle total com data.preload.'
        },
        {
          title: 'Zone.js-less e ChangeDetection.OnPush com Signals',
          code: `// =========================================================
// Angular 18+ — Modo Zoneless experimental
// =========================================================
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import {
  provideExperimentalZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Remove Zone.js — change detection manual via Signals/markForCheck
    provideExperimentalZonelessChangeDetection()
    // IMPORTANTE: angular.json deve remover "zone.js" do polyfills
  ]
};

// angular.json — remover zone.js dos polyfills
// "polyfills": ["zone.js"]  →  "polyfills": []

// =========================================================
// Componente com Signals — reatividade granular sem Zone
// =========================================================
import {
  Component, signal, computed, effect,
  ChangeDetectionStrategy, input, output
} from '@angular/core';

interface Produto { id: number; nome: string; preco: number; estoque: number; }

@Component({
  selector: 'app-carrinho',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush, // sempre usar com Signals
  template: \`
    <h2>Carrinho ({{ totalItens() }} itens)</h2>

    @for (item of itens(); track item.produto.id) {
      <div class="item">
        <span>{{ item.produto.nome }}</span>
        <button (click)="remover(item.produto.id)">-</button>
        <span>{{ item.quantidade }}</span>
        <button (click)="adicionar(item.produto)">+</button>
        <strong>R$ {{ (item.produto.preco * item.quantidade).toFixed(2) }}</strong>
      </div>
    }

    <div class="total">
      Total: <strong>R$ {{ totalValor() }}</strong>
    </div>
  \`
})
export class CarrinhoComponent {
  // signal() — estado reativo primitivo
  itens = signal<Array<{ produto: Produto; quantidade: number }>>([]);

  // computed() — derivado automaticamente, recalculado só quando itens muda
  totalItens = computed(() =>
    this.itens().reduce((acc, item) => acc + item.quantidade, 0)
  );

  totalValor = computed(() =>
    this.itens()
      .reduce((acc, item) => acc + item.produto.preco * item.quantidade, 0)
      .toFixed(2)
  );

  constructor() {
    // effect() — side effect reativo (como useEffect do React)
    effect(() => {
      // Executa automaticamente quando totalValor muda
      const total = this.totalValor();
      console.log('Total atualizado:', total);
      localStorage.setItem('cartTotal', total);
      // NÃO precisa de takeUntilDestroyed — limpo automaticamente
    });
  }

  adicionar(produto: Produto) {
    this.itens.update(itens => {
      const existente = itens.find(i => i.produto.id === produto.id);
      if (existente) {
        return itens.map(i =>
          i.produto.id === produto.id
            ? { ...i, quantidade: i.quantidade + 1 }
            : i
        );
      }
      return [...itens, { produto, quantidade: 1 }];
    });
    // Angular detecta a mudança AUTOMATICAMENTE — sem Zone, sem markForCheck
  }

  remover(id: number) {
    this.itens.update(itens => itens.filter(i => i.produto.id !== id));
  }
}

// =========================================================
// input() e output() com Signals — Angular 17.1+
// =========================================================
@Component({
  selector: 'app-produto-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <div (click)="selecionado.emit(produto())">
      {{ produto().nome }} — R$ {{ produto().preco }}
    </div>
  \`
})
export class ProdutoCardComponent {
  produto = input.required<Produto>(); // signal-based Input
  selecionado = output<Produto>();      // signal-based Output
}`,
          explanation: 'Signals eliminam a necessidade do Zone.js monitorar todas as operações assíncronas. Com Signals, o Angular sabe EXATAMENTE o que mudou e atualiza apenas os componentes afetados. computed() é lazy e memoizado (não recalcula se o sinal não mudou). effect() limpa automaticamente quando o componente é destruído. O resultado: menos trabalho de change detection, melhor performance em apps complexos.'
        },
        {
          title: '@defer e Virtual Scrolling — carregar só o necessário',
          code: `// =========================================================
// @defer — carregamento lazy de componentes no template
// =========================================================
// Angular 17+ — substitui Intersection Observer manual

// produto-lista.component.html
\`
<h1>Catálogo de Produtos</h1>

<!-- Componente pesado carregado imediatamente -->
<app-produto-destaque [produto]="produtoDestaque" />

<!-- @defer: componente pesado só carrega quando entra no viewport -->
@defer (on viewport) {
  <app-mapa-lojas />
  @placeholder {
    <!-- Exibido ANTES de começar a carregar -->
    <div class="placeholder-mapa">
      <div class="skeleton" style="height: 300px"></div>
    </div>
  }
  @loading (minimum 500ms) {
    <!-- Exibido DURANTE o carregamento (mínimo 500ms para evitar flash) -->
    <div class="loading-spinner">Carregando mapa...</div>
  }
  @error {
    <!-- Exibido se o carregamento falhar -->
    <div class="erro">Mapa indisponível. Veja o endereço abaixo.</div>
  }
}

<!-- @defer com trigger de idle — carrega quando browser estiver ocioso -->
@defer (on idle) {
  <app-recomendacoes />
}

<!-- @defer com trigger de interaction — carrega ao passar o mouse -->
@defer (on interaction) {
  <app-reviews-carousel />
  @placeholder {
    <button class="ver-reviews">Ver avaliações (carregamento sob demanda)</button>
  }
}

<!-- @defer com trigger de timer — carrega após 3 segundos -->
@defer (on timer(3s)) {
  <app-chat-widget />
}

<!-- @defer com condição customizada (prefetch manual) -->
@defer (when mostrarDetalhes) {
  <app-produto-detalhes [id]="produtoId" />
}
\`

// =========================================================
// CDK Virtual Scroll — 10.000 itens sem travar
// =========================================================
// npm install @angular/cdk

// lista-produtos.component.ts
import { Component, OnInit } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';

interface Item { id: number; nome: string; preco: number; categoria: string; }

@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [ScrollingModule, CommonModule],
  template: \`
    <!-- itemSize: altura FIXA de cada item em pixels (OBRIGATÓRIO) -->
    <cdk-virtual-scroll-viewport itemSize="72" class="lista-container">

      <!-- *cdkVirtualFor substitui *ngFor para virtual scrolling -->
      <div
        *cdkVirtualFor="let item of items; trackBy: trackById"
        class="item-row"
      >
        <span class="item-nome">{{ item.nome }}</span>
        <span class="item-preco">R$ {{ item.preco.toFixed(2) }}</span>
        <span class="item-categoria">{{ item.categoria }}</span>
      </div>

    </cdk-virtual-scroll-viewport>
  \`,
  styles: [\`
    .lista-container {
      height: 600px;  /* altura fixa é OBRIGATÓRIA */
      border: 1px solid #ddd;
    }
    .item-row {
      height: 72px;   /* deve coincidir com itemSize */
      display: flex;
      align-items: center;
      padding: 0 16px;
      border-bottom: 1px solid #eee;
    }
  \`]
})
export class ListaProdutosComponent implements OnInit {
  items: Item[] = [];

  ngOnInit() {
    // Simula 10.000 itens — sem Virtual Scroll, travaria o browser
    this.items = Array.from({ length: 10_000 }, (_, i) => ({
      id: i + 1,
      nome: \`Produto \${i + 1}\`,
      preco: Math.random() * 500 + 10,
      categoria: ['Eletrônicos', 'Roupas', 'Livros'][i % 3]
    }));
  }

  // trackBy ESSENCIAL: evita recriar DOM ao filtrar/ordenar
  trackById(_index: number, item: Item): number {
    return item.id;
  }
}`,
          explanation: '@defer é o "lazy loading para o template" — sem precisar de router. Os triggers (viewport, idle, interaction, timer) controlam quando o componente é baixado e renderizado. CDK Virtual Scroll é fundamental para listas longas: sem ele, 10.000 itens no DOM causam jank e scroll lento. Com Virtual Scroll, apenas ~10 itens existem no DOM simultaneamente. trackBy com id estável é obrigatório para performance máxima.'
        }
      ],
      quiz: [
        {
          q: 'Para que serve o webpack-bundle-analyzer no desenvolvimento Angular?',
          options: [
            'Para debugar erros de compilação TypeScript no bundle',
            'Para visualizar interativamente o tamanho de cada dependência no bundle final, identificando o que está aumentando o app',
            'Para minificar e compactar o bundle automaticamente em produção',
            'Para analisar a performance de rede durante o carregamento do app'
          ],
          answer: 1,
          explanation: 'webpack-bundle-analyzer gera um mapa visual interativo do bundle onde cada retângulo representa um arquivo/biblioteca com tamanho proporcional. É assim que você descobre que moment.js ocupa 300KB, que lodash está sendo importado inteiro, ou que algum componente importou uma biblioteca enorme desnecessariamente. O workflow é: ng build --stats-json → npx webpack-bundle-analyzer dist/*/stats.json.'
        },
        {
          q: 'Qual é a diferença entre PreloadAllModules e não ter preloading (lazy loading puro)?',
          options: [
            'PreloadAllModules carrega todos os módulos antes do bootstrap principal',
            'Lazy loading puro carrega módulos sob demanda (ao navegar); PreloadAllModules carrega todos em background após o bootstrap inicial',
            'Não há diferença de performance — PreloadAllModules é apenas um alias para o comportamento padrão',
            'PreloadAllModules carrega apenas módulos com menos de 50KB'
          ],
          answer: 1,
          explanation: 'Com lazy loading puro, o usuário espera o download do módulo ao navegar pela primeira vez para aquela rota. PreloadAllModules melhora isso: após o bundle inicial estar carregado e o app renderizado, ele baixa todos os módulos lazy em background, silenciosamente. Quando o usuário navega, o módulo já está no cache. A troca: mais download inicial de dados (mas não bloqueia renderização).'
        },
        {
          q: 'Por que usar ChangeDetectionStrategy.OnPush junto com Signals melhora a performance?',
          options: [
            'OnPush desativa completamente o change detection, tornando o componente estático',
            'OnPush + Signals faz o Angular atualizar o componente apenas quando um Signal que ele consome muda, eliminando verificações desnecessárias',
            'Signals só funcionam com OnPush — sem ele, os sinais não são reativos',
            'OnPush reduz o tamanho do bundle final eliminando código do Zone.js'
          ],
          answer: 1,
          explanation: 'Com a estratégia Default, o Angular verifica todos os componentes da árvore a cada evento (clique, timer, HTTP). Com OnPush, o componente só é verificado se um Input mudou por referência ou um Observable/Signal notificou. Signals levam isso ao extremo: o Angular sabe exatamente qual signal mudou e atualiza cirurgicamente apenas o trecho do template que o usa, sem verificar o restante.'
        },
        {
          q: 'Quais são os triggers disponíveis para o bloco @defer no Angular 17+?',
          options: [
            'on click, on focus, on blur, on change',
            'on viewport, on idle, on interaction, on timer(Xs), on hover, when <condition>',
            'on route, on scroll, on load, on DOMContentLoaded',
            '@defer só suporta carregamento incondicional, sem triggers customizados'
          ],
          answer: 1,
          explanation: '@defer é extremamente flexível: "on viewport" carrega quando o placeholder entra na tela (IntersectionObserver automático), "on idle" carrega quando o browser está ocioso (requestIdleCallback), "on interaction" ao primeiro clique/toque no placeholder, "on timer(2s)" após um delay, "when condition" quando uma expressão TypeScript se torna verdadeira. Múltiplos triggers podem ser combinados.'
        },
        {
          q: 'Por que o CDK Virtual Scroll é necessário para listas com milhares de itens?',
          options: [
            'Porque *ngFor tem um limite de 100 itens por lista',
            'Porque renderizar milhares de elementos no DOM degrada a performance — Virtual Scroll renderiza apenas os itens visíveis na tela',
            'Virtual Scroll é necessário apenas para listas com itens de altura variável',
            'Para habilitar animações suaves de scroll no Angular'
          ],
          answer: 1,
          explanation: 'Cada elemento no DOM tem custo: memória, layout calculation, paint. Com 10.000 <div>s, o browser precisa calcular layout para todos eles, mesmo que apenas 8-10 sejam visíveis. CDK Virtual Scroll mantém apenas os itens visíveis (mais alguns de buffer) no DOM. Ao rolar, recicla os elementos fora do viewport para novos itens. O resultado: scroll fluido mesmo com 1 milhão de itens.'
        }
      ]
    }
  }
];

if (window.ANGULAR_DATA) {
  window.ANGULAR_DATA.topics = window.ANGULAR_DATA.topics.concat(window.ANGULAR_AVANCADO);
}
