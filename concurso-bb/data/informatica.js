window.INFORMATICA_DATA = {
  id: 'informatica',
  name: 'Informática',
  icon: '💻',
  color: '#7c3aed',
  gradient: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
  topics: [
    {
      id: 'inf-escritorio',
      title: 'Pacote Office e Produtividade',
      xp: 20,
      lesson: {
        title: 'Microsoft Office — Word, Excel e PowerPoint',
        theory: `<p>O <strong>Pacote Microsoft Office</strong> é cobrado sistematicamente nas provas do BB, com foco em Excel para análise de dados e Word para produção de documentos formais.</p>

<h3>Microsoft Excel — Fórmulas mais cobradas</h3>
<ul>
  <li><strong>=SOMA(A1:A10)</strong> — soma o intervalo A1 até A10</li>
  <li><strong>=MÉDIA(A1:A10)</strong> — média aritmética do intervalo</li>
  <li><strong>=MÁXIMO(A1:A10)</strong> / <strong>=MÍNIMO(A1:A10)</strong> — maior/menor valor</li>
  <li><strong>=SE(teste_lógico; se_verdadeiro; se_falso)</strong> — condicional. Ex: =SE(B2>1000;"Aprovado";"Reprovado")</li>
  <li><strong>=CONT.SE(intervalo; critério)</strong> — conta células que atendem à condição</li>
  <li><strong>=SOMASE(intervalo; critério; intervalo_soma)</strong> — soma condicional</li>
  <li><strong>=PROCV(valor; tabela; col; [exato])</strong> — busca valor em tabela. 0 = correspondência exata.</li>
  <li><strong>=XLOOKUP()</strong> — versão moderna do PROCV, mais flexível</li>
</ul>

<h3>Excel — Recursos importantes</h3>
<ul>
  <li><strong>Tabela Dinâmica:</strong> resume e analisa grandes volumes de dados. Inserir → Tabela Dinâmica. Arrastar campos para Linhas, Colunas, Valores e Filtros.</li>
  <li><strong>Formatação Condicional:</strong> aplica formatação baseada no valor. Ex: células acima de 1.000 ficam verdes. Página Inicial → Formatação Condicional.</li>
  <li><strong>Referência absoluta ($):</strong> $A$1 não muda ao copiar. A1 muda. $A1 (coluna fixa). A$1 (linha fixa).</li>
  <li><strong>Gráficos:</strong> selecionar dados → Inserir → Gráfico. Tipos: barras (comparação), linhas (tendência), pizza/setores (proporção).</li>
</ul>

<h3>Microsoft Word — Recursos cobrados</h3>
<ul>
  <li><strong>Estilos:</strong> formatação padronizada (Título 1, Título 2, Normal) — base para sumário automático</li>
  <li><strong>Mala Direta:</strong> enviar documento personalizado para lista de destinatários. Correspondências → Iniciar Mala Direta.</li>
  <li><strong>Controle de Alterações:</strong> Revisão → Controlar Alterações — mostra inserções (sublinhado) e exclusões (tachado)</li>
  <li><strong>Sumário Automático:</strong> funciona a partir dos Estilos aplicados ao documento. Referências → Sumário.</li>
</ul>

<h3>Atalhos de Teclado Essenciais</h3>
<pre>
Ctrl+C / Ctrl+V / Ctrl+X  → Copiar / Colar / Recortar
Ctrl+Z / Ctrl+Y           → Desfazer / Refazer
Ctrl+S                    → Salvar
Ctrl+P                    → Imprimir
Ctrl+F                    → Localizar
Ctrl+A                    → Selecionar tudo
Ctrl+B / Ctrl+I / Ctrl+U  → Negrito / Itálico / Sublinhado
Alt+Tab                   → Alternar entre janelas abertas
Ctrl+Home / Ctrl+End      → Início / Fim do documento
F2 (Excel)                → Editar célula selecionada
F4 (Excel)                → Repetir última ação / fixar referência
</pre>`,
        examples: [
          {
            title: 'Fórmulas Excel mais cobradas no BB — com sintaxe completa',
            code: `FÓRMULA SE:
=SE(B2>1000;"Aprovado";"Reprovado")
→ Se o valor em B2 for maior que 1000, mostra "Aprovado",
  caso contrário mostra "Reprovado"

SE ANINHADO (múltiplas condições):
=SE(B2>=9;"Excelente";SE(B2>=7;"Bom";SE(B2>=5;"Regular";"Insuficiente")))

PROCV (busca vertical):
=PROCV(A2;$D$2:$F$100;3;0)
→ Busca o valor de A2 na PRIMEIRA coluna da tabela D2:F100
  Retorna o valor da 3ª coluna da mesma linha
  0 = correspondência exata (use sempre em concursos)

CONT.SE:
=CONT.SE(A:A;">1000")
→ Conta quantas células na coluna A têm valor maior que 1000

=CONT.SE(B:B;"João")
→ Conta quantas células em B contêm exatamente "João"

SOMASE:
=SOMASE(A:A;"Norte";B:B)
→ Soma os valores em B quando a célula correspondente em A
  for igual a "Norte"

XLOOKUP (moderno, substitui PROCV):
=XLOOKUP(A2;D2:D100;F2:F100)
→ Busca A2 na coluna D, retorna valor correspondente em F
→ Mais simples e busca em qualquer direção`,
            explanation: 'O PROCV é o mais cobrado: memorize os 4 argumentos: (1) o que buscar, (2) onde buscar (tabela), (3) qual coluna retornar, (4) tipo de correspondência (0=exato, 1=aproximado). Sempre use 0 (correspondência exata) em provas, salvo indicação contrária. O SE aninhado é cobrado com 3 condições — acima disso, no Excel moderno usa-se SE.S(). Referência absoluta ($) é testada: =PROCV(A2;$D$2:$F$100;3;0) — o $ garante que a tabela não muda ao copiar a fórmula.'
          },
          {
            title: 'Tabela Dinâmica — para que serve e como criar',
            code: `SITUAÇÃO: Planilha com 5.000 linhas de transações bancárias:
Coluna A: Data | Coluna B: Agência | Coluna C: Produto
Coluna D: Valor | Coluna E: Funcionário

OBJETIVO: Resumir total de vendas por Agência e Produto

SEM TABELA DINÂMICA: seria necessário criar fórmulas
complexas de SOMASE para cada combinação.

COM TABELA DINÂMICA:
1. Clique em qualquer célula dentro dos dados
2. Inserir → Tabela Dinâmica → OK (nova planilha)
3. Painel de Campos:
   - Arraste "Agência" para LINHAS
   - Arraste "Produto" para COLUNAS
   - Arraste "Valor" para VALORES (soma automática)
   - Arraste "Data" para FILTROS (filtrar por período)

RESULTADO AUTOMÁTICO:
         | CDB  | LCA  | Previdência | Total
Agência Norte | 45.000 | 12.000 | 33.000 | 90.000
Agência Sul  | 67.000 | 25.000 | 41.000 | 133.000
Total        | 112.000 | 37.000 | 74.000 | 223.000

ATUALIZAR após alterar os dados originais:
Clique na tabela dinâmica → Analisar → Atualizar

SEGMENTAÇÃO DE DADOS: filtros visuais e interativos
para tabelas dinâmicas — muito utilizado em dashboards`,
            explanation: 'A tabela dinâmica é uma das ferramentas mais poderosas do Excel para análise de dados. Permite cruzar informações de grandes planilhas em segundos. Em concursos, questões pedem: (1) para que serve? (resumir/cruzar dados), (2) como criar (Inserir → Tabela Dinâmica), (3) qual campo vai em qual área (linhas=categorias, colunas=subcategorias, valores=o que somar/contar, filtros=para filtrar). Não precisa escrever fórmulas.'
          },
          {
            title: 'Word — mala direta para envio personalizado a clientes',
            code: `CENÁRIO:
O BB precisa enviar carta personalizada para 500 clientes
informando sobre novo produto de investimento.

LISTA DE DESTINATÁRIOS (planilha Excel ou tabela Word):
Nome       | Agência     | Investimento | Gerente
Maria Silva| Norte       | R$ 45.000   | João
Carlos Sá  | Sul         | R$ 12.000   | Ana
...

PROCESSO DE MALA DIRETA (Word):
1. Aba "Correspondências" → "Iniciar Mala Direta"
   → Escolher tipo: "Cartas"

2. "Selecionar Destinatários" → "Usar lista existente"
   → Selecionar a planilha Excel dos clientes

3. Escrever a carta com CAMPOS DE MESCLAGEM:
   "Prezado(a) «Nome»,
   Sua agência «Agência» tem uma proposta especial
   para seu investimento atual de «Investimento».
   Seu gerente «Gerente» entrará em contato."

4. "Visualizar Resultados": cada carta terá os dados
   reais no lugar dos campos «Nome», «Agência», etc.

5. "Concluir e Mesclar" → "Imprimir documentos"
   ou "Editar documentos individuais" (Word cria
   um documento com uma carta por página)

RESULTADO: 500 cartas personalizadas geradas automaticamente`,
            explanation: 'Mala direta elimina o trabalho manual de personalizar cada carta. Os campos de mesclagem (entre «guillemets») são substituídos pelos dados da lista. Em concursos, questões pedem: o que é mala direta (envio personalizado em massa), como inserir campos («»), e onde encontrar no Word (aba Correspondências). Pode usar Excel, Access ou banco de dados como fonte de destinatários.'
          }
        ]
      },
      quiz: [
        {
          q: 'No Excel, a fórmula =SE(A1>100;"Alto";"Baixo") retorna "Alto" quando:',
          options: [
            'A1 contém o texto "100"',
            'A1 contém um valor numérico MAIOR que 100',
            'A1 contém um valor numérico MAIOR OU IGUAL a 100',
            'A1 está vazia (célula em branco)'
          ],
          answer: 1,
          explanation: 'A fórmula =SE(A1>100;"Alto";"Baixo") usa o operador ">" (estritamente maior que). Retorna "Alto" apenas quando A1 for número maior que 100 (101, 150, 1000...). Para A1=100, retorna "Baixo" (100 não é maior que 100). Para A1=texto, pode retornar erro ou resultado inesperado. Para "maior ou igual" usaríamos ">=" (=SE(A1>=100;"Alto";"Baixo")).'
        },
        {
          q: 'Qual é a função do 4º argumento da fórmula =PROCV(A2;$D$2:$F$100;3;0)?',
          options: [
            'Indica o número da linha onde começar a busca',
            'Define o número de colunas a retornar no resultado',
            'Especifica o tipo de correspondência: 0 = exata, 1 = aproximada',
            'Define se a busca é feita da esquerda para a direita ou da direita para a esquerda'
          ],
          answer: 2,
          explanation: 'Os 4 argumentos do PROCV: (1) o VALOR a buscar; (2) a TABELA onde buscar (primeira coluna deve conter o valor buscado); (3) o NÚMERO DA COLUNA a retornar (1=primeira, 2=segunda...); (4) TIPO DE CORRESPONDÊNCIA: 0 ou FALSO = correspondência exata (use sempre em concursos), 1 ou VERDADEIRO = correspondência aproximada (requer dados ordenados). O "0" garante que só retorna resultado quando o valor é encontrado exatamente.'
        },
        {
          q: 'Para que serve a TABELA DINÂMICA no Microsoft Excel?',
          options: [
            'Para criar tabelas com bordas e formatação automática nos dados digitados',
            'Para resumir, cruzar e analisar grandes volumes de dados de forma interativa, sem fórmulas complexas',
            'Para inserir tabelas de imagens e gráficos no documento Excel',
            'Para criar fórmulas dinâmicas que se atualizam automaticamente com o banco de dados externo'
          ],
          answer: 1,
          explanation: 'Tabela Dinâmica (Pivot Table) permite resumir e cruzar informações de grandes planilhas interativamente: arraste "Agência" para Linhas, "Produto" para Colunas, "Valor" para Valores — e obtém automaticamente o total de vendas por agência por produto, sem escrever uma única fórmula. É a ferramenta de análise de dados mais poderosa do Excel para usuários não programadores.'
        },
        {
          q: 'No Microsoft Word, o recurso de MALA DIRETA é usado para:',
          options: [
            'Enviar documentos por e-mail diretamente pelo Word',
            'Criar e enviar documentos personalizados para uma lista de destinatários, substituindo campos automaticamente',
            'Mesclar dois documentos Word diferentes em um único arquivo',
            'Controlar as alterações feitas por diferentes revisores no mesmo documento'
          ],
          answer: 1,
          explanation: 'Mala direta combina um documento-modelo com uma lista de dados para gerar múltiplas versões personalizadas. Campos como «Nome», «Agência» e «Saldo» são substituídos pelos dados reais de cada registro. Usada para cartas, envelopes, etiquetas e e-mails personalizados. O recurso "Controlar Alterações" (errado na opção D) é para revisão colaborativa de documentos — diferente da mala direta.'
        },
        {
          q: 'Qual atalho de teclado no Microsoft Excel permite fixar/alternar referências absolutas e relativas numa fórmula?',
          options: [
            'Ctrl+F4',
            'F4 (ao editar a fórmula)',
            'Alt+$',
            'Ctrl+$ '
          ],
          answer: 1,
          explanation: 'F4 alterna entre os tipos de referência ao editar uma fórmula: A1 (relativa) → $A$1 (absoluta) → A$1 (linha fixa) → $A1 (coluna fixa) → A1 (volta ao relativo). É o atalho mais importante para quem usa fórmulas com tabelas. Exemplo: ao criar =PROCV(A2;D2:F100;3;0) e querer fixar a tabela, clique em D2:F100 e pressione F4 → vira $D$2:$F$100.'
        }
      ]
    },
    {
      id: 'inf-internet',
      title: 'Internet e Redes',
      xp: 20,
      lesson: {
        title: 'Internet, Protocolos e Computação em Nuvem',
        theory: `<p><strong>Redes de computadores e internet</strong> são cobrados no BB com foco em protocolos, tipos de rede, serviços web e computação em nuvem — temas diretamente relacionados ao ambiente bancário digital.</p>

<h3>Protocolos de Rede — os mais cobrados</h3>
<ul>
  <li><strong>HTTP (porta 80):</strong> transferência de páginas web. Sem criptografia.</li>
  <li><strong>HTTPS (porta 443):</strong> HTTP com criptografia TLS/SSL. Essencial para transações bancárias.</li>
  <li><strong>FTP (porta 21):</strong> transferência de arquivos entre computadores.</li>
  <li><strong>SMTP (porta 25):</strong> envio de e-mails (Simple Mail Transfer Protocol).</li>
  <li><strong>POP3 (porta 110):</strong> recebimento de e-mails — baixa mensagens para o dispositivo e (geralmente) as apaga do servidor.</li>
  <li><strong>IMAP (porta 143):</strong> acesso a e-mails no servidor — mantém as mensagens no servidor, permite acesso por múltiplos dispositivos.</li>
  <li><strong>DNS:</strong> converte nomes de domínio em endereços IP (bb.com.br → 189.40.x.x).</li>
  <li><strong>DHCP:</strong> atribui automaticamente endereços IP aos dispositivos da rede.</li>
</ul>

<h3>Tipos de Rede</h3>
<ul>
  <li><strong>LAN (Local Area Network):</strong> rede local — dentro de um edifício ou campus. Alta velocidade.</li>
  <li><strong>MAN (Metropolitan Area Network):</strong> rede metropolitana — cobre uma cidade. Ex: rede das agências BB em uma capital.</li>
  <li><strong>WAN (Wide Area Network):</strong> rede de longa distância — interliga cidades ou países. A internet é a maior WAN.</li>
</ul>

<h3>Topologias de Rede</h3>
<ul>
  <li><strong>Estrela:</strong> todos os dispositivos conectados a um switch/hub central. Mais comum em LANs corporativas. Falha em um ponto não afeta os outros.</li>
  <li><strong>Barramento (Bus):</strong> todos compartilham um único cabo. Colisões frequentes. Praticamente obsoleta.</li>
  <li><strong>Anel:</strong> dispositivos em círculo. Dados passam por todos. Falha em um ponto interrompe o anel (exceto anel duplo).</li>
</ul>

<h3>Computação em Nuvem — Modelos de Serviço</h3>
<ul>
  <li><strong>IaaS (Infrastructure as a Service):</strong> fornece infraestrutura (servidores, armazenamento, redes). Você gerencia o SO e aplicações. Ex: AWS EC2, Azure VMs.</li>
  <li><strong>PaaS (Platform as a Service):</strong> fornece plataforma de desenvolvimento. Você gerencia apenas a aplicação. Ex: Heroku, Google App Engine.</li>
  <li><strong>SaaS (Software as a Service):</strong> software pronto via browser. Você só usa. Ex: Gmail, Salesforce, Microsoft 365 online.</li>
</ul>

<h3>VPN, Firewall e Proxy</h3>
<ul>
  <li><strong>VPN (Virtual Private Network):</strong> cria túnel criptografado para acesso remoto seguro à rede corporativa</li>
  <li><strong>Firewall:</strong> filtra o tráfego de rede, bloqueando acessos não autorizados</li>
  <li><strong>Proxy:</strong> intermediário entre o usuário e a internet — pode filtrar conteúdo e guardar cache</li>
</ul>`,
        examples: [
          {
            title: 'HTTP vs HTTPS — por que importa no internet banking',
            code: `HTTP (HyperText Transfer Protocol):
- Porta 80
- Dados transmitidos em TEXTO CLARO (sem criptografia)
- Qualquer um na mesma rede pode interceptar os dados
- NÃO usar para login, senhas ou transações financeiras

HTTPS (HTTP Secure):
- Porta 443
- HTTP + TLS (Transport Layer Security) / SSL (antigo)
- Dados transmitidos CRIPTOGRAFADOS entre cliente e servidor
- O navegador exibe o CADEADO no endereço
- Verificável: certificate = quem é o servidor real

COMO FUNCIONA O HTTPS:
1. Navegador acessa bb.com.br
2. Servidor envia seu CERTIFICADO DIGITAL (contém chave pública)
3. Navegador verifica se o certificado é de uma CA confiável
4. Negociação de chave de sessão (criptografia assimétrica)
5. Comunicação com criptografia simétrica (mais rápida)

IMPORTÂNCIA PARA O BANCO:
- Transações bancárias online SEMPRE em HTTPS
- "http://bb.com.br" (sem S) é sinal de fraude (phishing)
- CERTIFICADO EV (Extended Validation): barra verde com
  nome da empresa — nível máximo de verificação

COOKIE vs CACHE:
Cookie: pequeno arquivo armazenado pelo site no navegador
(lembrar login, preferências, carrinho)
Cache: cópia local de páginas para carregamento mais rápido`,
            explanation: 'HTTPS é obrigatório para qualquer operação bancária online. O certificado digital garante: (1) que o site é realmente do BB, não um impostor; (2) que os dados são criptografados em trânsito. Questões de concurso frequentemente testam: diferença HTTP vs HTTPS, o que o cadeado indica, e que HTTPS usa TLS (não apenas SSL, que é versão antiga). O "S" significa Secure, não simples.'
          },
          {
            title: 'Computação em nuvem — IaaS, PaaS, SaaS com exemplos reais',
            code: `ANALOGIA DA PIZZA:
Fazer pizza em casa = On-Premise (tudo seu)
Pedir pizza semipasta = IaaS (base pronta, você monta)
Pedir pizza para assar = PaaS (plataforma pronta, você cria)
Pedir pizza pronta = SaaS (só usa, tudo feito)

IaaS — INFRASTRUCTURE as a Service:
Você recebe: servidores virtuais, armazenamento, rede
Você gerencia: SO, middleware, runtime, aplicação, dados
Exemplos: AWS EC2, Azure VM, Google Compute Engine
Uso no BB: hospedar servidores de aplicação em cloud

PaaS — PLATFORM as a Service:
Você recebe: ambiente de desenvolvimento completo
Você gerencia: apenas o código da aplicação e os dados
Exemplos: Heroku, Google App Engine, Azure App Service
Uso no BB: desenvolver e hospedar novos serviços/apps

SaaS — SOFTWARE as a Service:
Você recebe: software pronto, acessível pelo navegador
Você gerencia: apenas seus dados/configurações básicas
Exemplos: Gmail, Microsoft 365 (Teams, Word Online),
          Salesforce (CRM), Google Workspace
Uso no BB: e-mail corporativo, colaboração, CRM

RESPONSABILIDADE COMPARTILHADA:
IaaS: você cuida de mais coisas (mais controle, mais trabalho)
SaaS: provedor cuida de quase tudo (menos controle, menos trabalho)`,
            explanation: 'A distinção IaaS/PaaS/SaaS é clássica em concursos. A lógica é simples: quanto mais "as a Service", menos você gerencia. IaaS = você só não gerencia o hardware físico. PaaS = você só gerencia a aplicação e os dados. SaaS = você só usa. No contexto bancário: sistemas antigos (legados) costumam ficar em IaaS; novos serviços digitais em PaaS; ferramentas de escritório em SaaS.'
          },
          {
            title: 'DNS — como seu navegador encontra o banco',
            code: `PROBLEMA: você digita "bb.com.br" — o computador precisa
saber qual é o endereço IP do servidor do BB.

PASSO A PASSO DA RESOLUÇÃO DNS:

1. SEU COMPUTADOR verifica o cache local
   "Já sei o IP de bb.com.br? Não, não está em cache."

2. CONSULTA AO DNS RECURSIVO (fornecido pelo seu provedor):
   "Qual o IP de bb.com.br?"

3. DNS recursivo consulta o ROOT NAMESERVER (raiz):
   "Quem cuida do domínio .br?"
   Resposta: "Os servidores .br estão em X.X.X.X"

4. Consulta o TLD NAMESERVER (.br):
   "Quem cuida do bb.com.br?"
   Resposta: "Os nameservers do BB estão em Y.Y.Y.Y"

5. Consulta o AUTHORITATIVE NAMESERVER do BB:
   "Qual o IP de bb.com.br?"
   Resposta: "189.40.92.2" (exemplo)

6. DNS recursivo retorna o IP para seu computador
   (e armazena em cache para as próximas consultas)

7. SEU NAVEGADOR conecta ao IP 189.40.92.2 via HTTPS

REGISTRO DNS TIPOS:
A: mapeia domínio → IPv4
AAAA: mapeia domínio → IPv6
CNAME: apelido (alias) de outro domínio
MX: servidores de e-mail do domínio`,
            explanation: 'O DNS é como a "lista telefônica da internet": converte nomes legíveis (bb.com.br) em endereços IP numéricos (189.40.x.x). Sem DNS, você teria que digitar IPs diretamente. A hierarquia tem três níveis: root (raiz), TLD (.com, .br, .org) e authoritative (o servidor do próprio domínio). O cache DNS acelera consultas subsequentes. Ataques de DNS Spoofing substituem o IP legítimo por um malicioso — aí o HTTPS/certificado digital protege.'
          }
        ]
      },
      quiz: [
        {
          q: 'Qual protocolo garante a segurança das transações bancárias pela internet, criptografando os dados em trânsito?',
          options: [
            'HTTP na porta 80',
            'FTP na porta 21',
            'HTTPS na porta 443',
            'SMTP na porta 25'
          ],
          answer: 2,
          explanation: 'HTTPS (HTTP Secure) usa criptografia TLS/SSL para proteger os dados em trânsito entre o navegador e o servidor. A porta padrão é 443. O cadeado no navegador indica conexão HTTPS. HTTP (porta 80) transmite dados sem criptografia. FTP (porta 21) é para transferência de arquivos. SMTP (porta 25) é para envio de e-mails. Para operações bancárias online, apenas HTTPS é adequado.'
        },
        {
          q: 'Qual a diferença entre POP3 e IMAP no acesso a e-mails?',
          options: [
            'POP3 é mais seguro que IMAP pois usa criptografia obrigatória',
            'POP3 baixa as mensagens para o dispositivo e as remove do servidor; IMAP mantém as mensagens no servidor e sincroniza múltiplos dispositivos',
            'IMAP é usado para enviar e-mails; POP3 é usado para receber',
            'POP3 funciona na porta 443; IMAP funciona na porta 80'
          ],
          answer: 1,
          explanation: 'POP3 (porta 110): baixa as mensagens para o dispositivo local e geralmente as remove do servidor. Funciona bem para um único dispositivo. IMAP (porta 143): mantém as mensagens no servidor e sincroniza entre todos os dispositivos (celular, PC, tablet). Se você ler no celular, aparece como lido no PC. Para uso corporativo com múltiplos dispositivos, IMAP é mais adequado. SMTP (porta 25) é o protocolo de ENVIO de e-mails — diferente dos dois.'
        },
        {
          q: 'Um gerente do BB acessa o sistema interno do banco de casa usando uma conexão que cria um túnel criptografado pela internet pública. Que tecnologia é essa?',
          options: [
            'Proxy reverso',
            'VPN (Virtual Private Network)',
            'Firewall de aplicação',
            'DNS seguro (DNSSEC)'
          ],
          answer: 1,
          explanation: 'VPN (Rede Privada Virtual) cria um túnel criptografado entre o dispositivo do usuário e a rede corporativa, passando pela internet pública. Para o sistema interno do banco, parece que o gerente está fisicamente na rede da empresa. Proxy: intermediário para acesso à internet, focado em cache e filtragem (não cria túnel para rede interna). Firewall: bloqueia acessos não autorizados. DNSSEC: segurança no serviço DNS.'
        },
        {
          q: 'O Banco do Brasil contrata a AWS para hospedar servidores virtuais onde instala e gerencia o próprio sistema operacional e aplicações bancárias. Qual modelo de nuvem é esse?',
          options: [
            'SaaS (Software as a Service)',
            'PaaS (Platform as a Service)',
            'IaaS (Infrastructure as a Service)',
            'DaaS (Desktop as a Service)'
          ],
          answer: 2,
          explanation: 'IaaS: o provedor (AWS) fornece a infraestrutura física (servidores, rede, armazenamento); o cliente (BB) gerencia o sistema operacional, middleware e aplicações. É o modelo de maior controle e maior responsabilidade para o cliente. PaaS: o provedor gerencia também o SO e o ambiente de execução, deixando apenas a aplicação para o cliente. SaaS: tudo gerenciado pelo provedor, cliente só usa.'
        },
        {
          q: 'Qual a função do protocolo DNS em uma rede de computadores?',
          options: [
            'Atribuir automaticamente endereços IP aos dispositivos conectados à rede',
            'Filtrar pacotes de dados entre redes diferentes para segurança',
            'Converter nomes de domínio legíveis (como bb.com.br) em endereços IP numéricos',
            'Criptografar os dados transmitidos entre cliente e servidor web'
          ],
          answer: 2,
          explanation: 'DNS (Domain Name System) é o "sistema de nomes" da internet — converte nomes amigáveis (bb.com.br) em endereços IP numéricos (189.40.x.x) que os computadores usam para se comunicar. Sem DNS, precisaríamos memorizar IPs. O DHCP atribui IPs automaticamente (errado na opção A). Firewall filtra pacotes (errado na opção B). TLS/SSL criptografa os dados (errado na opção D).'
        }
      ]
    },
    {
      id: 'inf-seguranca',
      title: 'Segurança da Informação',
      xp: 25,
      lesson: {
        title: 'Segurança da Informação — Princípios e Ameaças',
        theory: `<p><strong>Segurança da informação</strong> é um dos tópicos mais cobrados em provas do BB, dada a relevância das transações digitais e a necessidade de proteger dados financeiros dos clientes.</p>

<h3>Princípios da Segurança da Informação</h3>
<ul>
  <li><strong>Confidencialidade:</strong> apenas pessoas autorizadas acessam a informação. Ex: apenas o correntista acessa seu extrato.</li>
  <li><strong>Integridade:</strong> informação não é alterada de forma não autorizada. Ex: o valor de uma transferência não pode ser alterado em trânsito.</li>
  <li><strong>Disponibilidade:</strong> sistema disponível quando necessário. Ex: internet banking disponível 24h/7 dias.</li>
  <li><strong>Autenticidade:</strong> garantia de que a informação é de quem diz ser. Ex: certificado digital comprova identidade do site do banco.</li>
  <li><strong>Não-repúdio (irretratabilidade):</strong> o emissor não pode negar ter enviado a informação. Ex: assinatura digital comprova quem assinou.</li>
</ul>

<h3>Principais Ameaças — Malwares</h3>
<ul>
  <li><strong>Vírus:</strong> precisa de um arquivo hospedeiro para se propagar. Infecta e modifica arquivos.</li>
  <li><strong>Worm:</strong> se autopropaga pela rede sem precisar de arquivo hospedeiro. Consome largura de banda.</li>
  <li><strong>Trojan (cavalo de Troia):</strong> parece legítimo, mas executa ações maliciosas. Abre "porta dos fundos".</li>
  <li><strong>Ransomware:</strong> criptografa os dados da vítima e exige resgate (ransom) em criptomoeda para devolver o acesso.</li>
  <li><strong>Spyware:</strong> monitora as atividades do usuário (senhas, teclas digitadas) e envia ao atacante.</li>
  <li><strong>Adware:</strong> exibe propagandas indesejadas.</li>
  <li><strong>Rootkit:</strong> se oculta no sistema operacional para controle total e furtivo.</li>
</ul>

<h3>Ataques sem Malware</h3>
<ul>
  <li><strong>Phishing:</strong> e-mails/SMS falsos que imitam bancos/empresas para roubar credenciais.</li>
  <li><strong>Engenharia social:</strong> manipulação psicológica para obter informações confidenciais.</li>
  <li><strong>Man-in-the-Middle (MitM):</strong> atacante intercepta a comunicação entre duas partes.</li>
  <li><strong>DDoS:</strong> múltiplos computadores atacam um servidor simultaneamente para derrubar o serviço (nega disponibilidade).</li>
</ul>

<h3>Criptografia</h3>
<ul>
  <li><strong>Simétrica:</strong> mesma chave para cifrar e decifrar. Mais rápida. Ex: AES, DES, 3DES. Problema: como compartilhar a chave com segurança?</li>
  <li><strong>Assimétrica:</strong> par de chaves (pública + privada). Chave pública cifra, privada decifra. Ex: RSA. Mais lenta. Resolve o problema de troca de chaves.</li>
  <li><strong>Hash:</strong> função unidirecional — gera impressão digital única de um arquivo. Ex: SHA-256, MD5. Usado para verificar integridade.</li>
</ul>

<h3>Certificado Digital e Assinatura Digital</h3>
<ul>
  <li><strong>Certificado digital:</strong> documento eletrônico emitido por AC (Autoridade Certificadora) — comprova a identidade digital. Contém a chave pública do titular.</li>
  <li><strong>Assinatura digital:</strong> usa a chave PRIVADA do signatário para criar uma assinatura única. Garante autenticidade e não-repúdio.</li>
</ul>

<h3>Regra de Backup 3-2-1</h3>
<p>3 cópias dos dados | em 2 mídias diferentes | com 1 cópia offsite (fora do local principal).</p>`,
        examples: [
          {
            title: 'Phishing bancário — como identificar e o que o BB NUNCA faz',
            code: `E-MAIL FALSO DE PHISHING — SINAIS DE ALERTA:

De: seguranca@banco-bb-secure.com  ← domínio falso!
                                       (não é @bb.com.br)
Assunto: URGENTE: Sua conta será bloqueada em 24h!
                                    ← linguagem de urgência

"Prezado cliente,
Detectamos acessos suspeitos na sua conta. Para evitar
o bloqueio, clique aqui e confirme seus dados:
[http://bb-verificacao.site/login]"  ← URL falsa!

SINAIS DE PHISHING BANCÁRIO:
✗ Domínio diferente do oficial (@bb.com.br)
✗ Linguagem de urgência ("bloqueio imediato", "24 horas")
✗ URL que não pertence ao banco (passe o mouse antes de clicar)
✗ Pedido de senha, token ou dados do cartão por e-mail/SMS
✗ Erros de ortografia e gramática
✗ Ameaças ou prêmios inesperados

O QUE O BB JAMÁIS SOLICITA por e-mail, SMS ou telefone:
❌ Senha da conta ou do cartão
❌ Token ou código de segurança
❌ Número completo do cartão + CVV
❌ Que você instale qualquer aplicativo "de segurança"
❌ Que você confirme dados pessoais por link de e-mail

SE RECEBER: NÃO CLIQUE → delete o e-mail → reporte ao BB`,
            explanation: 'Phishing é a principal porta de entrada para fraudes bancárias digitais. O atacante explora a urgência e o medo. A proteção é simples: o banco NUNCA pede senha por e-mail ou telefone. Antes de clicar em qualquer link, verifique o domínio real da URL (não apenas o texto do link — passe o mouse). Em caso de dúvida, acesse o site do banco digitando o endereço diretamente no navegador, nunca por link de e-mail.'
          },
          {
            title: 'Criptografia simétrica vs assimétrica — como o HTTPS combina as duas',
            code: `CRIPTOGRAFIA SIMÉTRICA:
Mesma chave para cifrar e decifrar
Exemplo AES-256: muito rápida, usada para grandes volumes
Problema: como enviar a chave ao parceiro com segurança?
→ Se interceptarem a chave, podem decifrar tudo

CRIPTOGRAFIA ASSIMÉTRICA (par de chaves):
Chave PÚBLICA: pode ser divulgada para todos
Chave PRIVADA: mantida em segredo absoluto pelo dono

Funcionamento:
- Cifra com a chave PÚBLICA do destinatário
- Apenas a chave PRIVADA correspondente decifra
- Soluciona o problema de troca de chaves!

Exemplo RSA-2048: mais lento, usado para pequenos dados

ASSINATURA DIGITAL (fluxo invertido):
- Assina com a chave PRIVADA do remetente
- Qualquer um verifica com a chave PÚBLICA do remetente
- Garante: quem assinou tem a chave privada → é autêntico

COMO O HTTPS USA OS DOIS:
1. Servidor envia certificado com chave PÚBLICA (assimétrica)
2. Cliente usa chave pública para trocar uma chave de sessão
3. A partir daí, comunicação usa criptografia SIMÉTRICA (AES)
   → Combina segurança da assimétrica com velocidade da simétrica
   → "Handshake" TLS completo!`,
            explanation: 'O HTTPS combina os dois tipos de criptografia de forma inteligente: usa a criptografia assimétrica (RSA) apenas para o "handshake" inicial (trocar a chave de sessão de forma segura), depois muda para simétrica (AES) para o restante da comunicação — pois a simétrica é muito mais rápida. Questão clássica: "qual é mais rápida?" → simétrica. "Qual resolve o problema de troca de chaves?" → assimétrica.'
          },
          {
            title: 'Ransomware — como funciona e como se proteger',
            code: `ATAQUE RANSOMWARE — PASSO A PASSO:

1. INFECÇÃO: vítima abre anexo de e-mail malicioso,
   acessa site comprometido ou clica em link falso.
   Ransomware entra no sistema.

2. EXECUÇÃO: malware inicia criptografia silenciosa
   de todos os arquivos (.docx, .pdf, .xlsx, fotos...)
   usando criptografia forte (AES-256 + RSA-2048)

3. EXTORSÃO: tela de bloqueio aparece:
   "Seus arquivos foram criptografados.
    Pague R$ 50.000 em Bitcoin até 72h para obter a chave.
    Após o prazo, a chave será destruída."

4. DECISÃO: pagar NÃO garante recuperação.
   FBI e ANSI orientam: NÃO PAGUE.

PROTEÇÃO — REGRA DE BACKUP 3-2-1:
3 CÓPIAS dos dados (original + 2 backups)
2 MÍDIAS DIFERENTES (HD externo + nuvem, por ex.)
1 CÓPIA OFFSITE (fora do escritório/casa)

Se um ransomware criptografar seus dados:
→ Você restaura do backup offsite (que não estava conectado)
→ Formatando o sistema infectado
→ Sem pagar resgate

OUTRAS PROTEÇÕES:
✓ Antivírus atualizado com proteção comportamental
✓ Sistema operacional e aplicativos sempre atualizados
✓ Backups automáticos e testados periodicamente
✓ Regra do mínimo privilégio (não usar conta de admin no dia a dia)
✓ Segmentação de rede (isolamento de sistemas críticos)`,
            explanation: 'Ransomware é a ameaça mais crítica para empresas atualmente — bancos são alvos frequentes. A proteção mais eficaz é o BACKUP 3-2-1: com backup offsite (desconectado), mesmo que o ransomware criptografe tudo, você restaura sem pagar. A regra de backup deve ser cobrada especificamente: 3 cópias, 2 mídias diferentes, 1 fora do local principal. Questões de concurso testam os números: 3, 2 e 1.'
          }
        ]
      },
      quiz: [
        {
          q: 'Quais são os três princípios fundamentais da segurança da informação (tríade CIA)?',
          options: [
            'Controle, Identificação e Autenticação',
            'Confidencialidade, Integridade e Disponibilidade',
            'Criptografia, Integridade e Autenticidade',
            'Conformidade, Identificação e Autorização'
          ],
          answer: 1,
          explanation: 'A tríade CIA ( do inglês) é a base da segurança da informação: CONFIDENCIALIDADE (só quem tem permissão acessa), INTEGRIDADE (dados não alterados sem autorização), DISPONIBILIDADE (sistema acessível quando necessário). Outros princípios complementares: Autenticidade (é quem diz ser) e Não-repúdio (não pode negar ter enviado). Nas provas do BB, os três da tríade são os mais cobrados.'
        },
        {
          q: 'Qual a diferença entre um VÍRUS e um WORM?',
          options: [
            'Vírus afeta apenas Windows; Worm afeta apenas sistemas Linux',
            'Vírus precisa de um arquivo hospedeiro para se propagar; Worm se autopropaga pela rede sem hospedeiro',
            'Vírus criptografa dados; Worm apenas os exibe na tela',
            'São sinônimos — ambos se referem ao mesmo tipo de malware'
          ],
          answer: 1,
          explanation: 'VÍRUS: precisa se "anexar" a um arquivo legítimo (exe, doc) para se propagar — quando o arquivo infectado é aberto/executado, o vírus também executa. WORM: se autopropaga pela rede explorando vulnerabilidades, sem precisar de interação do usuário ou arquivo hospedeiro. Worms tendem a se espalhar muito mais rapidamente e consumir largura de banda. RANSOMWARE criptografa dados (diferentes dos dois). Eles não são sinônimos.'
        },
        {
          q: 'Um funcionário recebe um e-mail do "suporte do BB" pedindo que ele clique em um link para "confirmar sua senha". Qual ameaça isso representa?',
          options: [
            'Ransomware — o link vai criptografar os arquivos do funcionário',
            'Phishing — tentativa de roubo de credenciais por meio de e-mail falso',
            'DDoS — o e-mail vai sobrecarregar o servidor do banco',
            'Rootkit — o link vai instalar software oculto no sistema'
          ],
          answer: 1,
          explanation: 'PHISHING: e-mail falso que imita entidade confiável (banco, empresa) para enganar o usuário a fornecer credenciais ou clicar em link malicioso. O BB NUNCA solicita senha por e-mail. Ransomware criptografa arquivos. DDoS é ataque de negação de serviço com múltiplos computadores. Rootkit é malware que se oculta no SO. O phishing tipicamente usa urgência, ameaça de bloqueio e links com URLs similares à original.'
        },
        {
          q: 'Na criptografia ASSIMÉTRICA, como é feita a ASSINATURA DIGITAL de um documento?',
          options: [
            'O documento é cifrado com a chave PÚBLICA do signatário',
            'O documento é cifrado com a chave PRIVADA do signatário',
            'O documento é cifrado com a chave PÚBLICA do destinatário',
            'O documento recebe um hash gerado por chave simétrica'
          ],
          answer: 1,
          explanation: 'Assinatura digital: o signatário usa sua chave PRIVADA (que só ele possui) para criar a assinatura. Qualquer pessoa pode verificar com a chave PÚBLICA do signatário. Se a verificação passa, prova que o dono da chave privada assinou. Cifrar com chave pública é o processo inverso: serve para confidencialidade (só o dono da chave privada decifra). Assinatura digital garante: autenticidade (é quem diz ser) e não-repúdio (não pode negar ter assinado).'
        },
        {
          q: 'A regra de backup 3-2-1 recomenda manter 3 cópias dos dados. O que significa o "1" nessa regra?',
          options: [
            '1 backup deve ser feito por dia',
            '1 cópia deve estar armazenada OFFSITE (em local diferente do principal)',
            '1 das mídias deve ser obrigatoriamente um HD externo',
            '1 backup deve ser testado mensalmente'
          ],
          answer: 1,
          explanation: 'Regra 3-2-1: 3 CÓPIAS dos dados (original + 2 backups); em 2 MÍDIAS DIFERENTES (ex: HD externo + nuvem); com 1 cópia OFFSITE (em localização física diferente — outro prédio, cidade, ou nuvem). O "1 offsite" é o mais importante: protege contra desastres físicos (incêndio, enchente, ransomware que infecta a rede local). Se a cópia offsite estiver desconectada (air-gapped), não pode ser infectada por ransomware que varreu a rede principal.'
        }
      ]
    }
  ]
};
