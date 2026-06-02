// Tópicos extras de Angular — mercado de trabalho
window.ANGULAR_EXTRA = [
  {
    id: 'ng-reactive-forms',
    title: 'Reactive Forms (mercado)',
    xp: 25,
    lesson: {
      title: 'Formulários Reativos — Padrão Enterprise',
      theory: `Reactive Forms são o padrão em projetos Angular profissionais. Oferecem <strong>controle total sobre validação, estado e performance</strong>.

Comparação:
• <strong>Template-driven</strong> — simples, bom para formulários pequenos
• <strong>Reactive Forms</strong> — robusto, testável, padrão em projetos reais

Conceitos:
• <code>FormBuilder</code> — cria formulários com menos boilerplate
• <code>FormGroup</code> — grupo de controles
• <code>FormControl</code> — controle individual
• <code>Validators</code> — validações embutidas e customizadas`,
      examples: [
        {
          title: 'Formulário de login com validação',
          code: `// login.component.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div>
        <input formControlName="email" placeholder="Email">
        <span *ngIf="form.get('email')?.invalid && form.get('email')?.touched">
          {{ getEmailError() }}
        </span>
      </div>
      <div>
        <input type="password" formControlName="senha" placeholder="Senha">
        <span *ngIf="form.get('senha')?.invalid && form.get('senha')?.touched">
          Mínimo 8 caracteres
        </span>
      </div>
      <button type="submit" [disabled]="form.invalid || carregando">
        {{ carregando ? 'Entrando...' : 'Entrar' }}
      </button>
    </form>
  \`
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  carregando = false;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(8)]]
  });

  getEmailError(): string {
    const ctrl = this.form.get('email');
    if (ctrl?.errors?.['required']) return 'Email obrigatório';
    if (ctrl?.errors?.['email'])    return 'Email inválido';
    return '';
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.carregando = true;
    const { email, senha } = this.form.value;
    console.log('Login:', email, senha);
  }
}`,
          explanation: 'inject() é a forma moderna (Angular 14+). [disabled]="form.invalid" bloqueia submit automático.'
        },
        {
          title: 'Validator customizado',
          code: `// validators/senha-forte.validator.ts
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function senhaForte(control: AbstractControl): ValidationErrors | null {
  const valor = control.value as string;
  if (!valor) return null;

  const erros: ValidationErrors = {};
  if (!/[A-Z]/.test(valor))  erros['semMaiuscula']  = true;
  if (!/[0-9]/.test(valor))  erros['semNumero']     = true;
  if (!/[!@#$]/.test(valor)) erros['semEspecial']   = true;

  return Object.keys(erros).length ? erros : null;
}

// Usando no FormGroup
form = this.fb.group({
  senha: ['', [
    Validators.required,
    Validators.minLength(8),
    senhaForte  // validator customizado
  ]],
  confirmarSenha: ['', Validators.required]
}, {
  validators: confirmarSenhasIguais  // validator de grupo
});

// Validator de grupo
function confirmarSenhasIguais(g: AbstractControl): ValidationErrors | null {
  const senha    = g.get('senha')?.value;
  const confirma = g.get('confirmarSenha')?.value;
  return senha === confirma ? null : { senhasDiferentes: true };
}`,
          explanation: 'Validators customizados retornam null (válido) ou objeto de erro. Validators de grupo validam campos relacionados.'
        },
        {
          title: 'FormArray — lista dinâmica de campos',
          code: `// Para formulários com campos repetidos (ex: adicionar habilidades)
import { FormArray, FormControl } from '@angular/forms';

@Component({...})
export class PerfilComponent {
  form = this.fb.group({
    nome: ['', Validators.required],
    habilidades: this.fb.array([
      this.fb.control('Python')  // item inicial
    ])
  });

  get habilidades(): FormArray {
    return this.form.get('habilidades') as FormArray;
  }

  adicionarHabilidade(): void {
    this.habilidades.push(this.fb.control('', Validators.required));
  }

  remover(index: number): void {
    this.habilidades.removeAt(index);
  }
}

/* Template:
<div formArrayName="habilidades">
  <div *ngFor="let h of habilidades.controls; let i = index">
    <input [formControlName]="i" placeholder="Habilidade">
    <button (click)="remover(i)">✕</button>
  </div>
</div>
<button (click)="adicionarHabilidade()">+ Adicionar</button>
*/`,
          explanation: 'FormArray é perfeito para listas dinâmicas: itens de pedido, endereços, habilidades em um perfil.'
        }
      ]
    },
    quiz: [
      {
        question: 'Qual é a vantagem dos Reactive Forms sobre Template-driven?',
        options: [
          'Funcionam sem importar módulo',
          'São mais fáceis para formulários simples',
          'São totalmente tipados, testáveis e o estado fica no componente TS',
          'Geram HTML automaticamente'
        ],
        answer: 2,
        explanation: 'Reactive Forms são testáveis unitariamente (sem DOM), fortemente tipados e o estado fica no TypeScript.'
      },
      {
        question: 'O que um Validator customizado deve retornar se o campo for válido?',
        options: ['true', '{}', 'null', '"valid"'],
        answer: 2,
        explanation: 'null = válido. Qualquer objeto retornado é tratado como erro (ex: { senhaFraca: true }).'
      },
      {
        question: 'Como acessar o valor de um campo no FormGroup?',
        options: [
          'form.email.value',
          'form.controls.email.value ou form.get("email")?.value',
          'form["email"]',
          'form.getValue("email")'
        ],
        answer: 1,
        explanation: 'form.get("email")?.value é o padrão. O optional chaining (?) é necessário pois pode ser null.'
      },
      {
        question: 'Qual estrutura usar para uma lista dinâmica de campos?',
        options: ['FormList', 'FormGroup aninhado', 'FormArray', 'FormDynamic'],
        answer: 2,
        explanation: 'FormArray gerencia arrays de controles. Use push() para adicionar e removeAt(i) para remover.'
      }
    ]
  },
  {
    id: 'ng-interceptor',
    title: 'Interceptors e Guards',
    xp: 25,
    lesson: {
      title: 'HTTP Interceptors e Route Guards',
      theory: `<strong>Interceptors</strong> interceptam todas as requisições HTTP — padrão de mercado para:
• Adicionar token JWT automaticamente
• Tratar erros globais (401, 500)
• Loading spinner global
• Log de requisições

<strong>Guards</strong> protegem rotas — padrão para:
• Verificar se está logado antes de acessar página
• Verificar permissões/roles`,
      examples: [
        {
          title: 'JWT Interceptor (mercado real)',
          code: `// auth.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  // Adiciona o token em TODAS as requisições automaticamente
  const token = auth.getToken();
  const reqAutenticado = token
    ? req.clone({ setHeaders: { Authorization: \`Bearer \${token}\` } })
    : req;

  return next(reqAutenticado).pipe(
    catchError((erro: HttpErrorResponse) => {
      if (erro.status === 401) {
        auth.logout();
        router.navigate(['/login']);
      }
      if (erro.status === 500) {
        console.error('Erro interno do servidor:', erro);
      }
      return throwError(() => erro);
    })
  );
};

// Registrar no app.config.ts (Angular 17+):
// provideHttpClient(withInterceptors([authInterceptor]))`,
          explanation: 'Functional interceptor (Angular 15+): req.clone() cria cópia imutável com o header adicionado.'
        },
        {
          title: 'Auth Guard funcional (Angular 14+)',
          code: `// guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (auth.estaLogado()) return true;

  // Salva URL para redirecionar após login
  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url }
  });
  return false;
};

// Guard de role/permissão
export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  if (auth.temRole('ADMIN')) return true;
  inject(Router).navigate(['/acesso-negado']);
  return false;
};

// Usando nas rotas:
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent,
    canActivate: [authGuard] },
  { path: 'admin',     component: AdminComponent,
    canActivate: [authGuard, adminGuard] },
];`,
          explanation: 'Guards funcionais (sem classe) são o padrão Angular moderno. Múltiplos guards em série: todos precisam retornar true.'
        },
        {
          title: 'Loading Interceptor global',
          code: `// loading.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(LoadingService);

  // Ignora certas URLs (ex: polling)
  if (req.headers.has('X-Skip-Loading')) {
    return next(req);
  }

  loading.show();
  return next(req).pipe(
    finalize(() => loading.hide())  // sempre executa (sucesso ou erro)
  );
};

// loading.service.ts
@Injectable({ providedIn: 'root' })
export class LoadingService {
  private _ativo = signal(false);
  readonly ativo = this._ativo.asReadonly();

  show() { this._ativo.set(true); }
  hide() { this._ativo.set(false); }
}

// No AppComponent:
// <div class="spinner" *ngIf="loading.ativo()">Carregando...</div>`,
          explanation: 'finalize() garante que o loading some mesmo se a requisição falhar. Signal (Angular 16+) para reatividade.'
        }
      ]
    },
    quiz: [
      {
        question: 'Por que usar interceptor para JWT em vez de adicionar o header em cada serviço?',
        options: [
          'Interceptors são mais rápidos',
          'Centraliza em um lugar: todas requisições recebem o token automaticamente',
          'Interceptors funcionam offline',
          'É obrigatório pelo Angular'
        ],
        answer: 1,
        explanation: 'DRY: sem duplicação. Se mudar o header de auth, muda em um único lugar — o interceptor.'
      },
      {
        question: 'Por que usar req.clone() no interceptor?',
        options: [
          'Para criar uma cópia da resposta',
          'HttpRequest é imutável — clone() cria nova instância com as modificações',
          'Para fazer cache da requisição',
          'Para cancelar a requisição original'
        ],
        answer: 1,
        explanation: 'HttpRequest é imutável por design. clone() aceita as propriedades a sobrescrever e retorna nova instância.'
      },
      {
        question: 'O que um Guard deve retornar para BLOQUEAR acesso a uma rota?',
        options: ['null', 'undefined', 'false ou um UrlTree (redirect)', 'throw Error()'],
        answer: 2,
        explanation: 'false bloqueia. router.createUrlTree() ou router.navigate() + return false é o padrão para redirecionar.'
      },
      {
        question: 'O que finalize() do RxJS garante no Loading Interceptor?',
        options: [
          'Que o loading só some em caso de sucesso',
          'Que o loading some sempre, independente de sucesso ou erro',
          'Que a requisição seja repetida',
          'Que o erro seja ignorado'
        ],
        answer: 1,
        explanation: 'finalize() é executado quando o Observable completa OU emite erro — equivale ao finally em try/catch.'
      }
    ]
  },
  {
    id: 'ng-rxjs',
    title: 'RxJS — Observables (mercado)',
    xp: 30,
    lesson: {
      title: 'RxJS na Prática',
      theory: `RxJS é o coração do Angular. Todo HTTP call, evento de form, rota — tudo é Observable. Dominar os operadores é <strong>diferencial em entrevistas sênior</strong>.

Operadores mais usados no mercado:
• <code>switchMap</code> — cancelar obs anterior (busca em tempo real)
• <code>debounceTime</code> — aguardar antes de emitir (evita muitas requisições)
• <code>combineLatest</code> — combinar múltiplos observables
• <code>forkJoin</code> — aguardar múltiplas chamadas HTTP
• <code>takeUntilDestroyed</code> — evitar memory leaks`,
      examples: [
        {
          title: 'Busca em tempo real com debounce (padrão real)',
          code: `// busca.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  of
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  template: \`
    <input [formControl]="busca" placeholder="Buscar dev...">
    <div *ngFor="let dev of resultados">{{ dev.nome }}</div>
  \`
})
export class BuscaComponent implements OnInit {
  private api = inject(ApiService);
  busca = new FormControl('');
  resultados: any[] = [];

  ngOnInit(): void {
    this.busca.valueChanges.pipe(
      debounceTime(400),          // espera 400ms após parar de digitar
      distinctUntilChanged(),     // ignora se o valor não mudou
      switchMap(termo =>           // cancela requisição anterior
        this.api.buscarDevs(termo || '').pipe(
          catchError(() => of([]))  // erro → lista vazia
        )
      ),
      takeUntilDestroyed()        // auto-unsubscribe ao destruir
    ).subscribe(devs => this.resultados = devs);
  }
}`,
          explanation: 'Esse padrão (debounce + switchMap) é padrão de ouro para busca. Evita spam de requisições e race conditions.'
        },
        {
          title: 'forkJoin — múltiplas chamadas em paralelo',
          code: `import { forkJoin, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({...})
export class DashboardComponent implements OnInit {
  private api = inject(ApiService);

  dados: any = {};

  ngOnInit(): void {
    // Busca 3 endpoints SIMULTANEAMENTE, aguarda todos
    forkJoin({
      usuarios:  this.api.getUsuarios(),
      perguntas: this.api.getPerguntas(),
      ranking:   this.api.getRanking()
    }).subscribe(({ usuarios, perguntas, ranking }) => {
      this.dados = { usuarios, perguntas, ranking };
      console.log(\`\${usuarios.length} users, \${perguntas.length} perguntas\`);
    });
  }

  // combineLatest: re-emite sempre que QUALQUER observable emite
  // Útil para filtros combinados
  filtroAtivo$ = combineLatest([
    this.filtroLinguagem$,
    this.filtroNivel$
  ]).pipe(
    map(([linguagem, nivel]) =>
      this.todasPerguntas.filter(p =>
        p.linguagem === linguagem && p.nivel === nivel
      )
    )
  );
}`,
          explanation: 'forkJoin aguarda TODOS completarem (como Promise.all). combineLatest re-emite a cada mudança — perfeito para filtros.'
        },
        {
          title: 'Signals + RxJS (Angular 16+)',
          code: `import { signal, computed, effect } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';

@Component({...})
export class QuizComponent {
  private api = inject(ApiService);

  // Signals para estado local (mais simples que Subject)
  pontos      = signal(0);
  questaoAtual = signal(0);
  linguagem   = signal<string>('python');

  // Computed = derivado automático
  nivel = computed(() => {
    if (this.pontos() >= 1000) return 'Sênior';
    if (this.pontos() >= 500)  return 'Pleno';
    return 'Júnior';
  });

  // Converte Observable para Signal
  perguntas = toSignal(
    toObservable(this.linguagem).pipe(
      switchMap(lang => this.api.getPerguntas(lang))
    ),
    { initialValue: [] }
  );

  // Effect: reage a mudanças de signal
  constructor() {
    effect(() => {
      console.log(\`Nível atualizado: \${this.nivel()}\`);
    });
  }

  responder(acerto: boolean): void {
    if (acerto) this.pontos.update(p => p + 10);
    this.questaoAtual.update(q => q + 1);
  }
}`,
          explanation: 'Signals (Angular 16+) são mais simples para estado local. toSignal/toObservable fazem a ponte com RxJS.'
        }
      ]
    },
    quiz: [
      {
        question: 'Por que usar switchMap em vez de mergeMap para busca em tempo real?',
        options: [
          'switchMap é mais rápido',
          'switchMap cancela a requisição anterior ao receber novo valor',
          'mergeMap não funciona com HTTP',
          'switchMap funciona offline'
        ],
        answer: 1,
        explanation: 'switchMap cancela o Observable anterior. mergeMap mantém todos abertos — causaria race conditions na busca.'
      },
      {
        question: 'O que debounceTime(400) faz em um campo de busca?',
        options: [
          'Limita a 400 requisições por segundo',
          'Aguarda 400ms após a última digitação antes de emitir',
          'Cache as últimas 400 respostas',
          'Timeout da requisição em 400ms'
        ],
        answer: 1,
        explanation: 'Sem debounce, cada letra dispara uma requisição. Com 400ms, só dispara quando o usuário parar de digitar.'
      },
      {
        question: 'Qual a diferença entre forkJoin e combineLatest?',
        options: [
          'São idênticos',
          'forkJoin aguarda todos completarem; combineLatest emite a cada mudança',
          'combineLatest aguarda todos; forkJoin emite a cada mudança',
          'forkJoin funciona só com Promises'
        ],
        answer: 1,
        explanation: 'forkJoin = Promise.all (aguarda todos). combineLatest = re-emite quando qualquer um mudar (filtros combinados).'
      },
      {
        question: 'O que takeUntilDestroyed() resolve?',
        options: [
          'Cancela requisições HTTP automaticamente',
          'Previne memory leaks fazendo unsubscribe automático quando o componente é destruído',
          'Limpa o cache do RxJS',
          'Para de emitir valores após 1000ms'
        ],
        answer: 1,
        explanation: 'Sem unsubscribe, subscriptions de componentes destruídos continuam rodando — memory leak. takeUntilDestroyed() resolve automaticamente.'
      }
    ]
  },
  {
    id: 'ng-standalone',
    title: 'Angular Moderno (v17+)',
    xp: 20,
    lesson: {
      title: 'Angular Standalone, Signals e @for',
      theory: `Angular 17+ trouxe mudanças que estão sendo adotadas em projetos novos:

• <strong>Standalone Components</strong> — sem NgModule, mais simples
• <strong>Signals</strong> — estado reativo sem Subject/BehaviorSubject
• <strong>@for / @if</strong> — nova sintaxe de template (mais rápida)
• <strong>inject()</strong> — injeção funcional (sem construtor)
• <strong>Lazy loading</strong> por padrão com roteamento moderno`,
      examples: [
        {
          title: 'Componente standalone (Angular 17+)',
          code: `// card.component.ts — sem módulo!
import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Topico {
  id: string;
  titulo: string;
  xp: number;
  concluido: boolean;
}

@Component({
  selector: 'app-topico-card',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <!-- Nova sintaxe @if / @for (Angular 17+) -->
    @if (topico().concluido) {
      <span class="badge">✅ Concluído</span>
    } @else {
      <span class="badge">🔒 Pendente</span>
    }

    <h3>{{ topico().titulo }}</h3>
    <p>+{{ topico().xp }} XP</p>

    <!-- signal computed -->
    <span [class]="classeXP()">{{ nivelXP() }}</span>

    <button (click)="iniciar.emit(topico().id)">Iniciar</button>
  \`
})
export class TopicoCardComponent {
  // input() signal — substitui @Input()
  topico = input.required<Topico>();

  // output() — substitui @Output() EventEmitter
  iniciar = output<string>();

  // Computed signals
  nivelXP = computed(() => this.topico().xp >= 20 ? 'Avançado' : 'Básico');
  classeXP = computed(() => this.topico().xp >= 20 ? 'badge-vermelho' : 'badge-verde');
}`,
          explanation: 'input() e output() são a nova API (Angular 17.1+). @if/@for são mais performáticos que *ngIf/*ngFor.'
        },
        {
          title: 'Lazy loading com roteamento moderno',
          code: `// app.routes.ts (sem AppModule!)
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'quiz',
    canActivate: [authGuard],
    // Lazy load de módulo inteiro de rotas
    loadChildren: () =>
      import('./quiz/quiz.routes').then(m => m.QUIZ_ROUTES)
  },
  {
    path: 'perfil',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./perfil/perfil.component').then(m => m.PerfilComponent)
  }
];

// main.ts — bootstrap sem AppModule
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { AppComponent } from './app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
});`,
          explanation: 'loadComponent() faz lazy loading por componente. Cada rota é carregada só quando acessada — bundle menor.'
        }
      ]
    },
    quiz: [
      {
        question: 'O que standalone: true em @Component elimina?',
        options: [
          'A necessidade de imports no componente',
          'A necessidade de declarar o componente em um NgModule',
          'A necessidade de usar TypeScript',
          'A necessidade de um selector'
        ],
        answer: 1,
        explanation: 'Componentes standalone se auto-gerenciam. Sem NgModule, o projeto fica mais simples e com melhor tree-shaking.'
      },
      {
        question: 'Qual a vantagem do @for sobre *ngFor?',
        options: [
          'Suporta mais tipos de dados',
          'É nativo do Angular e mais performático com track obrigatório',
          'Funciona sem importar CommonModule',
          'Suporta async pipe automaticamente'
        ],
        answer: 1,
        explanation: '@for exige track (equivale a trackBy) por padrão — força boa prática e melhora performance de re-renderização.'
      },
      {
        question: 'O que loadComponent() no roteamento resolve?',
        options: [
          'Pré-carrega todos os componentes',
          'Lazy loading: componente só é baixado quando a rota é acessada',
          'Carrega o componente em um Web Worker',
          'Cacheia o componente em service worker'
        ],
        answer: 1,
        explanation: 'Lazy loading reduz o bundle inicial. O componente é baixado apenas quando o usuário navega para aquela rota.'
      },
      {
        question: 'O que input.required<Tipo>() faz em um componente?',
        options: [
          'Cria um input HTML obrigatório',
          'Define uma propriedade de entrada obrigatória (substitui @Input() com verificação em tempo de compilação)',
          'Valida formulários reativos',
          'Cria um campo required no FormGroup'
        ],
        answer: 1,
        explanation: 'input.required() é signal-based e emite erro de compilação se o pai não passar o valor — mais seguro que @Input().'
      }
    ]
  }
];

if (window.ANGULAR_DATA) {
  window.ANGULAR_DATA.topics = window.ANGULAR_DATA.topics.concat(window.ANGULAR_EXTRA);
}
