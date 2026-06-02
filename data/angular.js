window.ANGULAR_DATA = {
  id: 'angular',
  name: 'Angular',
  icon: '🔴',
  color: '#dd0031',
  gradient: 'linear-gradient(135deg, #dd0031, #c3002f)',
  topics: [
    {
      id: 'ng-intro',
      title: 'O que é Angular?',
      xp: 10,
      lesson: {
        title: 'Introdução ao Angular',
        theory: `Angular é um <strong>framework frontend</strong> desenvolvido pelo Google usando TypeScript. Ele organiza o app em componentes reutilizáveis.

Conceitos fundamentais:
• <strong>Component</strong> — bloco de UI com lógica e template
• <strong>Module</strong> — agrupa componentes relacionados
• <strong>Service</strong> — lógica de negócio compartilhável
• <strong>Directive</strong> — modifica comportamento de elementos HTML
• <strong>Pipe</strong> — transforma dados no template`,
        examples: [
          {
            title: 'Estrutura de um Componente',
            code: `// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',        // tag HTML usada no template
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titulo = 'DevQuest';
  pontos = 0;

  ganharPontos() {
    this.pontos += 10;
  }
}`,
            explanation: '@Component é um decorator que define metadados do componente. selector é a tag HTML que representa esse componente.'
          },
          {
            title: 'Template HTML do Componente',
            code: `<!-- app.component.html -->

<!-- Interpolação: {{ }} exibe valor da variável -->
<h1>{{ titulo }}</h1>

<!-- Property Binding: [] liga propriedade ao dado -->
<img [src]="logoUrl" [alt]="titulo">

<!-- Event Binding: () escuta eventos -->
<button (click)="ganharPontos()">
  Ganhar XP
</button>

<!-- Exibe os pontos atualizados -->
<p>Pontos: {{ pontos }}</p>`,
            explanation: '{{ }} = interpolação, [] = property binding, () = event binding.'
          },
          {
            title: 'Criando componente com CLI',
            code: `# Instalar Angular CLI globalmente
npm install -g @angular/cli

# Criar novo projeto
ng new meu-app

# Entrar na pasta
cd meu-app

# Criar um componente
ng generate component card-quiz
# ou forma curta:
ng g c card-quiz

# Iniciar servidor de desenvolvimento
ng serve

# App disponível em: http://localhost:4200`,
            explanation: 'O Angular CLI automatiza criação de componentes, serviços e muito mais.'
          }
        ]
      },
      quiz: [
        {
          question: 'Qual empresa criou e mantém o Angular?',
          options: ['Meta (Facebook)', 'Google', 'Microsoft', 'Netflix'],
          answer: 1,
          explanation: 'Angular é mantido pelo Google desde 2016 (reescrita do AngularJS).'
        },
        {
          question: 'Qual linguagem o Angular usa por padrão?',
          options: ['JavaScript', 'CoffeeScript', 'TypeScript', 'Dart'],
          answer: 2,
          explanation: 'Angular usa TypeScript, que é JavaScript com tipagem estática.'
        },
        {
          question: 'O que faz o selector em @Component?',
          options: [
            'Seleciona elementos CSS',
            'Define a tag HTML que representa o componente',
            'Seleciona o módulo pai',
            'Define a rota do componente'
          ],
          answer: 1,
          explanation: 'selector: "app-card" permite usar <app-card> no HTML para inserir o componente.'
        },
        {
          question: 'Como criar um componente pelo CLI do Angular?',
          options: [
            'ng create component nome',
            'ng generate component nome',
            'angular new component nome',
            'npm create component nome'
          ],
          answer: 1,
          explanation: 'ng generate component nome (ou ng g c nome) cria todos os arquivos do componente.'
        }
      ]
    },
    {
      id: 'ng-directives',
      title: 'Directives e Data Binding',
      xp: 15,
      lesson: {
        title: 'Directives e Binding',
        theory: `Directives modificam o DOM. Angular tem directives estruturais e de atributo.

<strong>Directives estruturais</strong> (mudam a estrutura do DOM):
• <code>*ngIf</code> — condicional
• <code>*ngFor</code> — loop
• <code>*ngSwitch</code> — múltiplas condições

<strong>Two-way binding</strong>:
• <code>[(ngModel)]</code> — sincroniza input com variável (precisa do FormsModule)`,
        examples: [
          {
            title: '*ngIf — condicional',
            code: `<!-- Só exibe se logado for true -->
<div *ngIf="logado">
  <h2>Bem-vindo, {{ usuario.nome }}!</h2>
</div>

<!-- Com else -->
<div *ngIf="logado; else blocoLogin">
  <p>Você está logado!</p>
</div>

<ng-template #blocoLogin>
  <p>Por favor, faça login.</p>
</ng-template>`,
            explanation: '*ngIf adiciona/remove o elemento do DOM conforme a condição.'
          },
          {
            title: '*ngFor — loop',
            code: `<!-- component.ts -->
linguagens = [
  { nome: 'Python', nivel: 'Fácil' },
  { nome: 'Java',   nivel: 'Médio' },
  { nome: 'Angular',nivel: 'Médio' }
];

<!-- component.html -->
<ul>
  <li *ngFor="let lang of linguagens; let i = index">
    {{ i + 1 }}. {{ lang.nome }} — {{ lang.nivel }}
  </li>
</ul>`,
            explanation: '*ngFor itera sobre arrays. index dá o número da posição.'
          },
          {
            title: '[(ngModel)] — two-way binding',
            code: `// No módulo: importar FormsModule
// app.module.ts
import { FormsModule } from '@angular/forms';
@NgModule({ imports: [FormsModule] })

// component.ts
busca = '';

// component.html
<input [(ngModel)]="busca" placeholder="Buscar...">
<p>Você digitou: {{ busca }}</p>

<!-- [()] = "banana em uma caixa" = two-way binding
     [ngModel] recebe o valor
     (ngModelChange) atualiza a variável -->`,
            explanation: '[(ngModel)] sincroniza o valor do input com a variável em tempo real.'
          }
        ]
      },
      quiz: [
        {
          question: 'O que *ngIf faz no Angular?',
          options: [
            'Estiliza condicionalmente um elemento',
            'Adiciona ou remove um elemento do DOM conforme condição',
            'Itera sobre uma lista',
            'Cria uma nova directive'
          ],
          answer: 1,
          explanation: '*ngIf remove o elemento do DOM quando false (diferente de hidden que só esconde).'
        },
        {
          question: 'Qual directive usa para repetir elementos de uma lista?',
          options: ['*ngRepeat', '*ngLoop', '*ngFor', '*ngEach'],
          answer: 2,
          explanation: '*ngFor="let item of lista" itera e renderiza um elemento para cada item.'
        },
        {
          question: 'O que [(ngModel)] representa?',
          options: [
            'Apenas leitura (one-way)',
            'Apenas escrita (one-way)',
            'Leitura e escrita ao mesmo tempo (two-way)',
            'Binding de eventos'
          ],
          answer: 2,
          explanation: '[(ngModel)] é two-way binding: a variável atualiza o input e vice-versa.'
        },
        {
          question: 'Qual módulo deve ser importado para usar ngModel?',
          options: ['NgModel', 'ReactiveFormsModule', 'FormsModule', 'CommonModule'],
          answer: 2,
          explanation: 'FormsModule deve ser importado no módulo do Angular para usar [(ngModel)].'
        }
      ]
    },
    {
      id: 'ng-services',
      title: 'Services e Injeção',
      xp: 20,
      lesson: {
        title: 'Services e Injeção de Dependência',
        theory: `<strong>Services</strong> centralizam lógica de negócio (chamadas HTTP, estado, cálculos) fora dos componentes.

A <strong>Injeção de Dependência (DI)</strong> é o mecanismo do Angular para fornecer instâncias de serviços automaticamente.

Vantagens:
• Código reutilizável entre componentes
• Facilita testes (mock services)
• Separação de responsabilidades`,
        examples: [
          {
            title: 'Criando um Service',
            code: `// ng g s pontuacao
// pontuacao.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // disponível em toda a app
})
export class PontuacaoService {
  private pontos = 0;

  ganharXP(quantidade: number): void {
    this.pontos += quantidade;
  }

  getPontos(): number {
    return this.pontos;
  }

  getNivel(): string {
    if (this.pontos >= 1000) return 'Sênior';
    if (this.pontos >= 500)  return 'Pleno';
    if (this.pontos >= 100)  return 'Júnior';
    return 'Iniciante';
  }
}`,
            explanation: '@Injectable({ providedIn: "root" }) registra o serviço globalmente.'
          },
          {
            title: 'Usando o Service no Componente',
            code: `// quiz.component.ts
import { Component } from '@angular/core';
import { PontuacaoService } from '../pontuacao.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html'
})
export class QuizComponent {
  // Angular injeta automaticamente pelo construtor
  constructor(private pontuacao: PontuacaoService) {}

  responderCerto(): void {
    this.pontuacao.ganharXP(10);
  }

  get nivel(): string {
    return this.pontuacao.getNivel();
  }
}`,
            explanation: 'Declare no construtor: constructor(private servico: MeuService). Angular injeta sozinho.'
          },
          {
            title: 'HTTP com HttpClient',
            code: `// app.module.ts: import HttpClientModule

// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private url = 'https://api.exemplo.com';

  constructor(private http: HttpClient) {}

  getPerguntas(): Observable<any[]> {
    return this.http.get<any[]>(\`\${this.url}/perguntas\`);
  }
}

// No componente:
perguntas: any[] = [];
constructor(private api: ApiService) {}

ngOnInit(): void {
  this.api.getPerguntas().subscribe(data => {
    this.perguntas = data;
  });
}`,
            explanation: 'HttpClient retorna Observable. Subscribe para receber os dados.'
          }
        ]
      },
      quiz: [
        {
          question: 'Qual decorator torna uma classe um Service injetável no Angular?',
          options: ['@Service', '@Injectable', '@Inject', '@Provider'],
          answer: 1,
          explanation: '@Injectable() marca a classe como injetável via DI do Angular.'
        },
        {
          question: 'O que providedIn: "root" significa?',
          options: [
            'O serviço só funciona no componente raiz',
            'O serviço é singleton disponível em toda a app',
            'O serviço precisa ser importado manualmente',
            'O serviço é destruído após cada uso'
          ],
          answer: 1,
          explanation: 'providedIn: "root" cria uma única instância (singleton) compartilhada por toda a app.'
        },
        {
          question: 'Como injetar um Service em um componente Angular?',
          options: [
            'this.service = new MeuService()',
            'inject(MeuService)',
            'Declarar no construtor: constructor(private s: MeuService)',
            'Importar com @Import(MeuService)'
          ],
          answer: 2,
          explanation: 'Angular DI: declare no construtor e ele injeta a instância automaticamente.'
        },
        {
          question: 'O que HttpClient.get() retorna?',
          options: ['Promise', 'Observable', 'Array', 'Subject'],
          answer: 1,
          explanation: 'HttpClient retorna Observable do RxJS. Use .subscribe() para receber os dados.'
        }
      ]
    },
    {
      id: 'ng-routing',
      title: 'Rotas (Router)',
      xp: 15,
      lesson: {
        title: 'Roteamento no Angular',
        theory: `O Angular Router permite navegar entre páginas sem recarregar o browser (SPA).

Conceitos:
• <strong>Routes</strong> — array de path → component
• <strong>RouterLink</strong> — link de navegação
• <strong>router-outlet</strong> — onde o componente é renderizado
• <strong>ActivatedRoute</strong> — acessa parâmetros da URL`,
        examples: [
          {
            title: 'Configurando rotas',
            code: `// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  { path: '',         component: HomeComponent },
  { path: 'quiz/:id', component: QuizComponent },
  { path: 'perfil',   component: PerfilComponent },
  { path: '**',       redirectTo: '' }  // rota coringa
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}`,
            explanation: 'Cada rota mapeia um path para um componente. :id é parâmetro dinâmico.'
          },
          {
            title: 'Navegação no template',
            code: `<!-- app.component.html -->

<!-- RouterLink para navegar -->
<nav>
  <a routerLink="/">Início</a>
  <a routerLink="/perfil">Perfil</a>
  <a [routerLink]="['/quiz', topico.id]">Iniciar Quiz</a>
</nav>

<!-- Aqui o componente da rota é renderizado -->
<router-outlet></router-outlet>`,
            explanation: 'routerLink substitui href para navegação SPA. router-outlet é o container das páginas.'
          },
          {
            title: 'Acessar parâmetros de rota',
            code: `// quiz.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({ selector: 'app-quiz', ... })
export class QuizComponent implements OnInit {
  topicoId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Pega o parâmetro :id da URL
    this.topicoId = this.route.snapshot.paramMap.get('id') || '';
    console.log('Tópico:', this.topicoId);
    // URL /quiz/py-functions → topicoId = 'py-functions'
  }
}`,
            explanation: 'ActivatedRoute.snapshot.paramMap.get("nome") lê parâmetros da URL atual.'
          }
        ]
      },
      quiz: [
        {
          question: 'O que é router-outlet no Angular?',
          options: [
            'Um componente de menu de navegação',
            'O local no template onde o componente da rota atual é exibido',
            'Um guard de rota',
            'Uma diretiva para links externos'
          ],
          answer: 1,
          explanation: 'router-outlet é o placeholder: quando a rota muda, o componente é renderizado lá.'
        },
        {
          question: 'Como criar um link de navegação SPA no Angular?',
          options: [
            '<a href="/perfil">',
            '<a navigate="/perfil">',
            '<a routerLink="/perfil">',
            '<a ng-link="/perfil">'
          ],
          answer: 2,
          explanation: 'routerLink previne o reload da página, navegando internamente pelo Router.'
        },
        {
          question: 'Como definir parâmetro dinâmico em uma rota?',
          options: [
            '{ path: "quiz/{id}" }',
            '{ path: "quiz/$id" }',
            '{ path: "quiz/:id" }',
            '{ path: "quiz/[id]" }'
          ],
          answer: 2,
          explanation: 'Use : antes do nome: "quiz/:id". Acesse com paramMap.get("id").'
        },
        {
          question: 'Qual path captura qualquer rota não encontrada?',
          options: ['path: "*"', 'path: "**"', 'path: "notfound"', 'path: "default"'],
          answer: 1,
          explanation: 'path: "**" é a rota coringa. Sempre deixe por último na lista de rotas.'
        }
      ]
    }
  ]
};
