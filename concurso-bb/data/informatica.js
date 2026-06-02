window.INFORMATICA_DATA = {
  id: 'informatica',
  name: 'Informática',
  icon: '💻',
  color: '#3b82f6',
  description: 'Internet, segurança e escritório',
  topics: [
    {
      id: 'seguranca',
      title: 'Segurança da Informação',
      xp: 35,
      theory: `<p><strong>Segurança da Informação</strong> é essencial no ambiente bancário. A prova do BB cobra intensamente esse tema.</p>
<h3>Princípios da Segurança da Informação (CIA)</h3>
<ul>
  <li><strong>Confidencialidade:</strong> apenas pessoas autorizadas acessam a informação</li>
  <li><strong>Integridade:</strong> a informação não é alterada indevidamente</li>
  <li><strong>Disponibilidade:</strong> a informação está acessível quando necessária</li>
</ul>
<p>Outros princípios: Autenticidade, Não-repúdio (Irretratabilidade)</p>
<h3>Ameaças Comuns</h3>
<ul>
  <li><strong>Phishing:</strong> e-mails/sites falsos para roubar credenciais</li>
  <li><strong>Malware:</strong> vírus, worm, trojan, ransomware, spyware, adware</li>
  <li><strong>Engenharia Social:</strong> manipulação psicológica do usuário</li>
  <li><strong>Man in the Middle:</strong> interceptação de comunicação</li>
  <li><strong>DoS/DDoS:</strong> ataque de negação de serviço</li>
</ul>
<h3>Mecanismos de Proteção</h3>
<ul>
  <li><strong>Firewall:</strong> filtra tráfego de rede</li>
  <li><strong>Antivírus:</strong> detecta e remove malware</li>
  <li><strong>Criptografia:</strong> cifra dados para proteger confidencialidade</li>
  <li><strong>VPN:</strong> canal seguro e criptografado</li>
  <li><strong>Autenticação de dois fatores (2FA):</strong> camada extra de segurança</li>
</ul>`,
      examples: [
        {
          header: 'Tipos de malware — resumo para a prova',
          code: `VÍRUS      → anexa-se a arquivos, precisa ser executado
WORM       → se propaga sozinho pela rede, sem precisar de host
TROJAN     → disfarçado de programa legítimo, abre backdoor
RANSOMWARE → criptografa arquivos e exige resgate (ransom)
SPYWARE    → monitora atividades do usuário secretamente
ADWARE     → exibe propagandas indesejadas
ROOTKIT    → oculta presença de malware no sistema
KEYLOGGER  → registra teclas digitadas (senhas, dados)
BOTNET     → rede de computadores zumbis controlados remotamente`,
          explanation: `<p>O <strong>ransomware</strong> é o tipo mais cobrado recentemente por ser muito relevante no setor bancário. Lembre: <strong>worm se propaga sozinho</strong> (sem execução pelo usuário) — essa é a principal diferença do vírus.</p>`
        }
      ],
      questions: [
        {
          q: 'Qual princípio da segurança da informação garante que apenas pessoas autorizadas acessem os dados?',
          options: ['Integridade', 'Disponibilidade', 'Confidencialidade', 'Autenticidade'],
          answer: 2,
          explanation: 'Confidencialidade garante que a informação só seja acessada por quem tem autorização. Faz parte do tripé CIA (Confidencialidade, Integridade, Disponibilidade).'
        },
        {
          q: 'Um malware que se propaga automaticamente pela rede sem necessitar de intervenção do usuário é chamado de:',
          options: ['Vírus', 'Worm', 'Trojan', 'Spyware'],
          answer: 1,
          explanation: 'Worm (verme) se propaga automaticamente pela rede, explorando vulnerabilidades. Diferente do vírus, não precisa ser executado pelo usuário e não se anexa a arquivos.'
        },
        {
          q: 'Phishing é uma técnica de ataque que consiste em:',
          options: ['Infectar computadores com vírus via USB', 'Sobrecarregar servidores com requisições', 'Enganar usuários com páginas/e-mails falsos para roubar credenciais', 'Interceptar comunicação entre dois pontos'],
          answer: 2,
          explanation: 'Phishing usa mensagens/sites fraudulentos que imitam organizações legítimas (bancos, por exemplo) para enganar usuários e obter senhas, dados bancários etc.'
        },
        {
          q: 'O ransomware se diferencia dos demais malwares principalmente por:',
          options: ['Monitorar as atividades do usuário silenciosamente', 'Criptografar arquivos da vítima e exigir resgate para liberação', 'Exibir propagandas indesejadas na tela', 'Registrar teclas digitadas pelo usuário'],
          answer: 1,
          explanation: 'Ransomware ("ransom" = resgate) sequestra dados criptografando arquivos e exige pagamento (geralmente em criptomoeda) para fornecer a chave de descriptografia.'
        },
        {
          q: 'A autenticação de dois fatores (2FA) melhora a segurança porque:',
          options: ['Usa senhas duas vezes mais longas', 'Exige dois elementos de verificação diferentes (ex: senha + código SMS)', 'Cria duas contas para o mesmo usuário', 'Duplica o número de firewalls na rede'],
          answer: 1,
          explanation: '2FA requer dois fatores de categorias diferentes: algo que você sabe (senha), algo que você tem (token/SMS/app), ou algo que você é (biometria). Dificulta acesso não autorizado mesmo com a senha comprometida.'
        }
      ]
    },
    {
      id: 'redes',
      title: 'Redes e Internet',
      xp: 30,
      theory: `<p>Conceitos de <strong>redes de computadores</strong> e <strong>internet</strong> são recorrentes nas provas de informática para concursos bancários.</p>
<h3>Classificação de Redes</h3>
<ul>
  <li><strong>LAN</strong> (Local Area Network): rede local, escritório</li>
  <li><strong>MAN</strong> (Metropolitan Area Network): rede metropolitana, cidade</li>
  <li><strong>WAN</strong> (Wide Area Network): rede ampla, países/continentes</li>
</ul>
<h3>Protocolos Importantes</h3>
<ul>
  <li><strong>HTTP/HTTPS:</strong> transferência de páginas web (HTTPS = seguro/criptografado)</li>
  <li><strong>FTP:</strong> transferência de arquivos</li>
  <li><strong>SMTP/POP3/IMAP:</strong> envio e recebimento de e-mails</li>
  <li><strong>TCP/IP:</strong> protocolo base da internet</li>
  <li><strong>DNS:</strong> traduz nomes de domínio em endereços IP</li>
  <li><strong>DHCP:</strong> atribui endereços IP automaticamente</li>
</ul>
<h3>IP e Endereçamento</h3>
<ul>
  <li><strong>IPv4:</strong> 32 bits, formato x.x.x.x (ex: 192.168.1.1)</li>
  <li><strong>IPv6:</strong> 128 bits, formato hexadecimal, mais endereços disponíveis</li>
  <li><strong>IP privado:</strong> uso interno (não roteável na internet)</li>
  <li><strong>IP público:</strong> identificação na internet</li>
</ul>`,
      examples: [
        {
          header: 'Protocolos de e-mail: SMTP, POP3 e IMAP',
          code: `SMTP  → Envio de e-mails (porta 25 ou 587)
        "Simple Mail Transfer Protocol"

POP3  → Recebe e BAIXA e-mails para o dispositivo (porta 110)
        Após download, e-mails são removidos do servidor
        Bom para: acesso de apenas 1 dispositivo

IMAP  → Recebe e SINCRONIZA e-mails no servidor (porta 143)
        E-mails ficam no servidor, acessíveis em vários dispositivos
        Bom para: múltiplos dispositivos (cel, PC, tablet)`,
          explanation: `<p><strong>IMAP vs POP3</strong> é muito cobrado. A diferença chave: IMAP mantém e-mails no servidor (sincronização), POP3 baixa e apaga do servidor.</p>`
        }
      ],
      questions: [
        {
          q: 'O protocolo HTTPS se diferencia do HTTP principalmente por:',
          options: ['Ser mais rápido na transferência de dados', 'Usar criptografia para proteger a comunicação', 'Funcionar apenas em redes privadas', 'Ser exclusivo para e-mails'],
          answer: 1,
          explanation: 'HTTPS (HTTP Secure) usa criptografia SSL/TLS para proteger a comunicação entre o navegador e o servidor, garantindo confidencialidade e integridade dos dados.'
        },
        {
          q: 'Qual protocolo é responsável por traduzir nomes de domínio (como www.bb.com.br) em endereços IP?',
          options: ['DHCP', 'FTP', 'DNS', 'SMTP'],
          answer: 2,
          explanation: 'DNS (Domain Name System) é o "catálogo telefônico" da internet — traduz nomes amigáveis (www.bb.com.br) nos endereços IP numéricos usados pelos computadores.'
        },
        {
          q: 'Sobre os protocolos de e-mail, o IMAP se diferencia do POP3 porque:',
          options: ['É mais antigo e simples', 'Mantém os e-mails no servidor, permitindo sincronização em múltiplos dispositivos', 'Baixa os e-mails e os remove do servidor', 'É usado apenas para envio de e-mails'],
          answer: 1,
          explanation: 'IMAP sincroniza e-mails mantendo-os no servidor, ideal para múltiplos dispositivos. POP3 baixa os e-mails para o dispositivo e geralmente os apaga do servidor.'
        },
        {
          q: 'Uma rede LAN (Local Area Network) é caracterizada por:',
          options: ['Abranger um país inteiro', 'Conectar computadores em uma área geográfica limitada, como um escritório', 'Ser sempre sem fio (Wi-Fi)', 'Depender de satélite para funcionar'],
          answer: 1,
          explanation: 'LAN é uma rede de área local, abrangendo uma área geográfica pequena como um escritório, andar ou prédio. É rápida, gerenciada localmente.'
        },
        {
          q: 'O endereço IPv6 foi criado principalmente para:',
          options: ['Substituir o protocolo TCP', 'Resolver o esgotamento de endereços IPv4 e fornecer mais endereços disponíveis', 'Aumentar a velocidade da internet', 'Substituir o protocolo HTTP'],
          answer: 1,
          explanation: 'IPv6 (128 bits) foi criado para resolver o esgotamento dos endereços IPv4 (32 bits). Fornece aproximadamente 340 undecilhões de endereços, contra 4 bilhões do IPv4.'
        }
      ]
    },
    {
      id: 'office',
      title: 'Pacote Office e Ferramentas',
      xp: 25,
      theory: `<p>O <strong>Pacote Microsoft Office</strong> e ferramentas equivalentes (LibreOffice, Google Workspace) são amplamente cobrados nos concursos bancários.</p>
<h3>Microsoft Word</h3>
<ul>
  <li>Atalhos principais: Ctrl+C (copiar), Ctrl+V (colar), Ctrl+X (recortar), Ctrl+Z (desfazer), Ctrl+Y (refazer)</li>
  <li>Ctrl+B (negrito), Ctrl+I (itálico), Ctrl+U (sublinhado)</li>
  <li>Ctrl+A (selecionar tudo), Ctrl+Home (início), Ctrl+End (fim)</li>
  <li>Formatação de parágrafo: alinhamento, espaçamento, recuo</li>
</ul>
<h3>Microsoft Excel</h3>
<ul>
  <li>Funções básicas: SOMA, MÉDIA, MÁXIMO, MÍNIMO, CONT.NÚM</li>
  <li>Funções condicionais: SE, CONT.SE, SOMASE</li>
  <li>Referência absoluta ($A$1) vs relativa (A1)</li>
  <li>Gráficos, formatação condicional, filtros</li>
</ul>
<h3>Microsoft PowerPoint</h3>
<ul>
  <li>Apresentações com slides, transições e animações</li>
  <li>Modo Apresentação: F5 (do início), Shift+F5 (slide atual)</li>
</ul>`,
      examples: [
        {
          header: 'Fórmulas Excel mais cobradas em concursos',
          code: `=SOMA(A1:A10)        → soma de A1 até A10
=MÉDIA(B1:B5)        → média aritmética
=MÁXIMO(C1:C20)      → maior valor
=MÍNIMO(C1:C20)      → menor valor
=CONT.NÚM(A1:A10)    → conta células com números
=CONT.SE(A1:A10;"BB")→ conta células com "BB"
=SE(A1>10;"Sim";"Não")→ condição: se A1>10, "Sim", senão "Não"
=SOMASE(A1:A10;">5") → soma valores maiores que 5
=PROCV(B1;A1:C10;2;0)→ busca vertical na tabela`,
          explanation: `<p>O <strong>=SE()</strong> é a função mais cobrada. Lembre a sintaxe: =SE(condição; valor_se_verdadeiro; valor_se_falso). A referência absoluta ($) é usada quando você não quer que a célula mude ao copiar a fórmula.</p>`
        }
      ],
      questions: [
        {
          q: 'No Excel, para somar os valores de A1 até A10, usa-se:',
          options: ['=TOTAL(A1:A10)', '=SOMA(A1:A10)', '=ADD(A1,A10)', '=SOMAR(A1-A10)'],
          answer: 1,
          explanation: '=SOMA(A1:A10) é a função correta para somar um intervalo de células. O operador ":" indica o intervalo do começo ao fim.'
        },
        {
          q: 'No Excel, a fórmula =SE(B2>1000;"Aprovado";"Reprovado") retorna "Aprovado" quando:',
          options: ['B2 é exatamente 1000', 'B2 é maior que 1000', 'B2 é menor que 1000', 'B2 contém o texto "Aprovado"'],
          answer: 1,
          explanation: 'A função =SE() avalia uma condição. Se B2 > 1000 for verdadeiro, retorna "Aprovado"; caso contrário, retorna "Reprovado".'
        },
        {
          q: 'No Word, o atalho de teclado para DESFAZER a última ação é:',
          options: ['Ctrl+D', 'Ctrl+Z', 'Ctrl+Y', 'Ctrl+U'],
          answer: 1,
          explanation: 'Ctrl+Z desfaz a última ação no Word (e na maioria dos programas). Ctrl+Y refaz (reaplica a ação desfeita).'
        },
        {
          q: 'No Excel, a diferença entre referência absoluta ($A$1) e relativa (A1) é:',
          options: ['A absoluta aceita texto, a relativa apenas números', 'A absoluta não muda ao copiar a fórmula, a relativa se ajusta automaticamente', 'Não há diferença prática', 'A relativa é mais precisa que a absoluta'],
          answer: 1,
          explanation: 'Referência absoluta ($A$1) mantém o endereço fixo ao copiar/mover a fórmula. Relativa (A1) ajusta automaticamente conforme a posição da fórmula.'
        },
        {
          q: 'No PowerPoint, para iniciar a apresentação a partir do slide atual, usa-se:',
          options: ['F5', 'Shift+F5', 'Ctrl+F5', 'Alt+F5'],
          answer: 1,
          explanation: 'Shift+F5 inicia a apresentação a partir do slide atual. F5 inicia do primeiro slide. Esses atalhos são frequentemente cobrados em provas.'
        }
      ]
    }
  ]
};
