INSERT INTO questoes (
    questao_id,
    questao,
    alternativa_a,
    alternativa_b,
    alternativa_c,
    alternativa_d,
    alternativa_e,
    alternativa_correta,
    disciplina_id,
    cargo_id,
    banca_id,
    ano_prova
)
SELECT
    CAST(SUBSTRING(questao_key FROM 'questao([0-9]+)') AS INTEGER) AS questao_id,
    questao_data->>'enunciado' AS questao,
    questao_data->>'alternativa_A' AS alternativa_a,
    questao_data->>'alternativa_B' AS alternativa_b,
    questao_data->>'alternativa_C' AS alternativa_c,
    questao_data->>'alternativa_D' AS alternativa_d,
    NULL AS alternativa_e,
    'A' AS alternativa_correta,
    5 AS disciplina_id,
    7 AS cargo_id,
    6 AS banca_id,
    2023 AS ano_prova
FROM (
    SELECT
        jsonb_object_keys(elem) AS questao_key,
        elem->jsonb_object_keys(elem) AS questao_data
    FROM jsonb_array_elements(
        '[
            {
                "questao1": {
                    "enunciado": "Em um banco de dados, um trigger é uma ação automática que ocorre em resposta a determinados eventos, como a inserção, atualização ou exclusão de dados em uma tabela. Suponha que você tenha uma tabela chamada \"Pedidos\" e deseja criar um trigger que atualiza automaticamente o campo \"Data_Modificacao\" sempre que um pedido for modificado. Qual seria a sintaxe correta para criar esse trigger em SQL?",
                    "alternativa_A": "CREATE TRIGGER atualizar_data_modificacao BEFORE UPDATE ON Pedidos FOR EACH ROW BEGIN SET NEW.Data_Modificacao = NOW(); END;",
                    "alternativa_B": "CREATE TRIGGER atualizar_data_modificacao AFTER UPDATE ON Pedidos FOR EACH ROW BEGIN UPDATE Pedidos SET Data_Modificacao = NOW() WHERE id = NEW.id; END;",
                    "alternativa_C": "CREATE TRIGGER atualizar_data_modificacao BEFORE UPDATE ON Pedidos FOR EACH ROW BEGIN UPDATE Pedidos SET Data_Modificacao = CURRENT_DATE WHERE id = NEW.id; END;",
                    "alternativa_D": "CREATE TRIGGER atualizar_data_modificacao AFTER UPDATE ON Pedidos FOR EACH ROW BEGIN SET NEW.Data_Modificacao = CURRENT_TIMESTAMP(); END;"
                }
            },
            {
                "questao2": {
                    "enunciado": "Deseja-se bloquear os acessos dos computadores de uma rede local aos sites com conteúdo que tenham a palavra \"jogo\". Para executar esta tarefa, tem que ser configurado no computador:",
                    "alternativa_A": "Porta USB",
                    "alternativa_B": "Firewall",
                    "alternativa_C": "Gateway",
                    "alternativa_D": "Proxy"
                }
            },
            {
                "questao3": {
                    "enunciado": "Considere uma tabela chamada \"PACIENTE\" em um banco de dados Oracle, onde o campo que armazena o nome do paciente é denominado \"NOME\". Para recuperar as últimas 5 letras do nome do paciente, qual seria a instrução SQL correta?",
                    "alternativa_A": "SELECT RIGHT(NOME, 5) AS ULT_LETRAS FROM PACIENTE;",
                    "alternativa_B": "SELECT NOME, LEFT(T.NOME, LENGTH(T.NOME) - 5), LENGTH(T.NOME) LEFT(NOME, -5) ULT_LETRAS FROM PACIENTE T;",
                    "alternativa_C": "SELECT NOME, SUBSTR(T.NOME, LENGTH(T.NOME) - 5, LENGTH(T.NOME)) SUBSTR(NOME, -5) ULT_LETRAS FROM PACIENTE T;",
                    "alternativa_D": "SELECT SUBSTR(NOME, -5) AS ULT_LETRAS FROM PACIENTE;"
                }
            },
            {
                "questao4": {
                    "enunciado": "Quanto à política de backup nas organizações, assinale a alternativa correta.",
                    "alternativa_A": "Todas as organizações devem fazer, diariamente, backup full às 23h e 59min, para evitar perdas diárias, independentemente do tipo da organização ou da volatilidade da informação.",
                    "alternativa_B": "A realização de backups não visa diminuir os riscos da continuidade, uma vez que o backup serve apenas para garantir a recuperação dos dados em caso de falha de disco.",
                    "alternativa_C": "Jamais se devem realizar testes nas mídias que armazenam os backups, pois esse procedimento pode danificá-las.",
                    "alternativa_D": "Uma boa estratégia é manter os backups em local físico distante da localidade de armazenamento dos dados originais."
                }
            },
            {
                "questao5": {
                    "enunciado": "Analise as afirmativas referentes à Lei Geral de Proteção de Dados Pessoais (LGPD):\nI- Anonimização é o tratamento por meio do qual um dado perde a possibilidade de associação, direta ou indireta, a um indivíduo, senão pelo uso de informação adicional mantida separadamente pelo controlador em ambiente controlado e seguro.\nII- Consentimento é a manifestação livre, informada e inequívoca pela qual o titular concorda com o tratamento de seus dados pessoais para uma finalidade determinada.\nIII- Bloqueio é a suspensão temporária de qualquer operação de tratamento, mediante guarda do dado pessoal ou do banco de dados.",
                    "alternativa_A": "I, II e III",
                    "alternativa_B": "I e III, apenas",
                    "alternativa_C": "I e II, apenas",
                    "alternativa_D": "II e III, apenas"
                }
            },
            {
                "questao6": {
                    "enunciado": "A combinação de teclas necessárias para habilitar a caixa de digitação por voz no Google Documentos (editor de texto do Google Workspace) é:",
                    "alternativa_A": "CTRL + SHIFT + D",
                    "alternativa_B": "CTRL + SHIFT + S",
                    "alternativa_C": "CTRL + SHIFT + F",
                    "alternativa_D": "CTRL + SHIFT + L"
                }
            },
            {
                "questao7": {
                    "enunciado": "Um usuário sofreu um ataque cibernético, todos os seus dados foram criptografados e a única mensagem que consegue visualizar, quando vai utilizar o sistema, é \"efetue o depósito em bitcoins para poder resgatar seus dados e não ter suas informações espalhadas pela web\". Um ataque desta forma é um ataque de:",
                    "alternativa_A": "Malware",
                    "alternativa_B": "Ransomware",
                    "alternativa_C": "Worm",
                    "alternativa_D": "Phishing"
                }
            },
            {
                "questao8": {
                    "enunciado": "Assinale a alternativa correta sobre virtualização, máquinas virtuais e suas tecnologias.",
                    "alternativa_A": "Na virtualização completa, o SO hospedeiro precisa ser modificado.",
                    "alternativa_B": "A virtualização total simplifica a migração e a portabilidade.",
                    "alternativa_C": "Na virtualização completa, o sistema considera todos os recursos totalmente virtualizados.",
                    "alternativa_D": "Só existe um tipo de virtualização, denominado virtualização completa ou total."
                }
            },
            {
                "questao9": {
                    "enunciado": "Um administrador deseja montar um arranjo RAID com 4 discos de 500GB. Analisando as configurações possíveis, concluiu que a capacidade disponível proporcionada por esse arranjo será de:",
                    "alternativa_A": "1 TB, usando RAID 5",
                    "alternativa_B": "1 TB, usando RAID 1",
                    "alternativa_C": "500GB, usando RAID 1",
                    "alternativa_D": "1,5 TB, usando RAID 0"
                }
            },
            {
                "questao10": {
                    "enunciado": "Na computação em nuvem, quando o gerenciamento do espaço em disco e do sistema operacional é de responsabilidade do provedor, o serviço utilizado é do tipo:",
                    "alternativa_A": "Software como Serviço (SaaS)",
                    "alternativa_B": "Plataforma como Serviço (PaaS)",
                    "alternativa_C": "Contêiner como Serviço (CaaS)",
                    "alternativa_D": "Infraestrutura como Serviço (IaaS)"
                }
            },
            {
                "questao11": {
                    "enunciado": "Assinale a opção que apresenta técnica que é amplamente utilizada para a otimização de consultas em bancos de dados.",
                    "alternativa_A": "criptografia de dados.",
                    "alternativa_B": "compactação de arquivos.",
                    "alternativa_C": "indexação de dados.",
                    "alternativa_D": "gerenciamento de usuários e permissões."
                }
            },
            {
                "questao12": {
                    "enunciado": "Na linguagem SQL, a função que é usada para verificar se o resultado de uma subconsulta correlacionada é vazio ou não, a qual retorna como resultado o valor booleano TRUE ou FALSE, é:",
                    "alternativa_A": "EXISTS",
                    "alternativa_B": "HAVING",
                    "alternativa_C": "LIKE",
                    "alternativa_D": "IN"
                }
            },
            {
                "questao13": {
                    "enunciado": "Todos os computadores na internet, incluindo smartphones, laptops e outros periféricos, comunicam-se utilizando números conhecidos como endereço IP. Existem inúmeros sites que acessamos diariamente e seria complexo fazer a navegação na internet utilizando esses números, mas os acessamos facilmente colocando um conjunto de caracteres como www.exemplo.com.br. Qual o nome do serviço que faz a resolução dos nomes digitados pelos usuários nas URL de sites?",
                    "alternativa_A": "DHCP",
                    "alternativa_B": "DNS",
                    "alternativa_C": "SSL",
                    "alternativa_D": "IPV4"
                }
            },
            {
                "questao14": {
                    "enunciado": "Qual dos seguintes elementos é responsável pelo controle granular do acesso e da manipulação dos dados armazenados em um sistema de banco de dados (SGBD) SQL Server, incluindo a definição de restrições de acesso a nível de campo e a possibilidade de restringir certas operações de leitura e gravação?",
                    "alternativa_A": "Gerenciamento de usuários, roles e permissões.",
                    "alternativa_B": "Gerenciamento de jobs e rotinas agendadas.",
                    "alternativa_C": "Implementação de índices e otimização de consultas.",
                    "alternativa_D": "Estruturas, objetos e componentes físicos e lógicos que fazem parte da base de dados."
                }
            },
            {
                "questao15": {
                    "enunciado": "Qual das seguintes opções representa corretamente o comando SQL usado no MySQL para criar uma nova tabela chamada \"Clientes\" com colunas para o nome, sobrenome, e-mail e idade?",
                    "alternativa_A": "ADD TABELA Clientes (nome NVARCHAR(50), sobrenome NVARCHAR(50), email NVARCHAR(100), idade INTEGER);",
                    "alternativa_B": "CRIAR TABELA Clientes (nome TEXT, sobrenome TEXT, email TEXT, idade INT);",
                    "alternativa_C": "INSERT INTO Clientes (nome VARCHAR(50), sobrenome VARCHAR(50), email VARCHAR(100), idade INT);",
                    "alternativa_D": "CREATE TABLE Clientes (nome VARCHAR(50), sobrenome VARCHAR(50), email VARCHAR(100), idade INT);"
                }
            },
            {
                "questao16": {
                    "enunciado": "A estrutura de sistemas de arquivos Linux é definida por um padrão denominado Filesystem Hierarchy Standard (FHS), a qual define também as estruturas de outros sistemas como BSD, por exemplo. O FHS evoluiu a partir de padrões históricos originados de versões antigas do Unix. Ele fornece aos desenvolvedores Linux e administradores de sistemas uma estrutura de diretórios padrão para os sistemas de arquivos, trazendo consistência entre sistemas e distribuições. Na estrutura de diretórios do sistema operacional Linux, o diretório \"/etc\", por padrão, contém:",
                    "alternativa_A": "os arquivos de configurações do sistema.",
                    "alternativa_B": "as diversas aplicações instaladas pelos usuários.",
                    "alternativa_C": "os drivers de acesso aos dispositivos.",
                    "alternativa_D": "os programas de gerenciamento do sistema."
                }
            },
            {
                "questao17": {
                    "enunciado": "O comando more do sistema operacional Linux pode ser utilizado para leitura de arquivos. Ao pressionarmos a tecla Space (Espaço) durante o uso do comando, é possível:",
                    "alternativa_A": "retroceder uma página.",
                    "alternativa_B": "avançar uma página.",
                    "alternativa_C": "finalizar a apresentação.",
                    "alternativa_D": "efetuar uma busca no arquivo."
                }
            },
            {
                "questao18": {
                    "enunciado": "No sistema operacional Linux, a exibição do conteúdo de um diretório pode ser realizada por meio do comando ls. Para que possam ser exibidos os arquivos ocultos, o comando deve ser utilizado com o parâmetro:",
                    "alternativa_A": "-l",
                    "alternativa_B": "-c",
                    "alternativa_C": "-a",
                    "alternativa_D": "-o"
                }
            },
            {
                "questao19": {
                    "enunciado": "Considere um disco rígido, particionado com o sistema de arquivos ext4, conectado em um computador com o sistema operacional Linux. Para que o sistema operacional monte as partições do novo disco rígido de forma automática, durante a inicialização, o comando de montagem e os devidos parâmetros utilizados para esse sistema de arquivos, deve ser adicionado no arquivo:",
                    "alternativa_A": "/boot/dev.",
                    "alternativa_B": "/etc/fstab.",
                    "alternativa_C": "/etc/unit.",
                    "alternativa_D": "/etc/mount."
                }
            },
            {
                "questao20": {
                    "enunciado": "São componentes presentes em uma Área de Trabalho típica do sistema operacional Windows Vista, em sua configuração padrão:",
                    "alternativa_A": "Barra de Tarefas e Barra Lateral.",
                    "alternativa_B": "Ícones e Janela de Programas.",
                    "alternativa_C": "Barra Lateral e Barra do Botão Desligar.",
                    "alternativa_D": "Botão do Menu Iniciar e Barra do Painel de Controle."
                }
            },
            {
                "questao21": {
                    "enunciado": "Na implementação física de uma rede de computadores, com cabeamento estruturado padrão TIA/EIA-568A, a topologia de rede recomendada é:",
                    "alternativa_A": "Híbrida",
                    "alternativa_B": "Anel",
                    "alternativa_C": "Estrela",
                    "alternativa_D": "Barramento"
                }
            },
            {
                "questao22": {
                    "enunciado": "Um cabeamento de redes de computadores do tipo par trançado UTP, padrão CAT-5, possui 4 pares de fios cujas cores são: laranja, verde, marrom e:",
                    "alternativa_A": "branco.",
                    "alternativa_B": "roxo.",
                    "alternativa_C": "azul.",
                    "alternativa_D": "amarelo."
                }
            },
            {
                "questao23": {
                    "enunciado": "A norma (IEEE 802.3) define que a identificação de um dispositivo está associada a um identificador único atribuído a uma interface de rede. Esse identificador denominado (MAC), possui um comprimento de:",
                    "alternativa_A": "8 bytes.",
                    "alternativa_B": "4 bytes.",
                    "alternativa_C": "6 bytes.",
                    "alternativa_D": "7 bytes."
                }
            },
            {
                "questao24": {
                    "enunciado": "O sistema de arquivos Ext4 permite que os arquivos tenham seu acesso restringido por meio do comando chmod. Para que todos os arquivos de uma pasta possam ser executados por qualquer usuário, pode-se utilizar o comando:",
                    "alternativa_A": "chmod g+x -R ./",
                    "alternativa_B": "chmod a+x-r ./",
                    "alternativa_C": "chmod u+x -r ./",
                    "alternativa_D": "chmod a+x-R ./"
                }
            },
            {
                "questao25": {
                    "enunciado": "Em 2012 Paul V. Mockapetris foi premiado pela Internet Hall of Fame por sua inovadora criação de 1948 em parceria com Jon Postel, de um sistema denominado DNS. Assinale a alternativa que contém um erro que pode ser ocasionado por um servidor DNS inoperante:",
                    "alternativa_A": "A impossibilidade de fazer conexões utilizando hostnames desconhecidos.",
                    "alternativa_B": "A conexão de Internet fica fora do ar.",
                    "alternativa_C": "A rede interna é desconfigurada.",
                    "alternativa_D": "O servidor web não atende às requisições externas."
                }
            },
            {
                "questao26": {
                    "enunciado": "Assinale a alternativa que apresenta os significados de DNS e DHCP, respectivamente.",
                    "alternativa_A": "Domain Name System e Dynamic Host Configuration Protocol.",
                    "alternativa_B": "Distinct Naming Space e Dynamic Hosting Capacities Protocol.",
                    "alternativa_C": "Domain Nomenclature System e Domain Host Capabilities Protocol.",
                    "alternativa_D": "Domain Name Space e Dynamic Host Configuration Protocol."
                }
            },
            {
                "questao27": {
                    "enunciado": "Um firewall é um sistema de segurança de rede de computadores que restringe o tráfego de entrada e de saída e decide permitir ou bloquear tráfegos específicos de acordo com um conjunto definido de regras. Selecione a alternativa que apresenta uma forma eficiente de gerenciar as regras de um firewall que possui milhares de regras de acesso.",
                    "alternativa_A": "Posicionar conforme a ordem temporal, com as regras mais recentes sempre no final da lista de regras.",
                    "alternativa_B": "Ordenar as regras conforme o tipo de protocolo, agrupando os tipos de protocolo posteriormente.",
                    "alternativa_C": "Ordenar as regras conforme o tipo de sub-rede, agregando por departamentos ou áreas.",
                    "alternativa_D": "Posicionar as regras de modo que a ordem seja das mais genéricas para as mais específicas."
                }
            },
            {
                "questao28": {
                    "enunciado": "Assinale a alternativa que não apresenta o mesmo objetivo a ser alcançado por uma política de regras de segurança.",
                    "alternativa_A": "Comunicação consistente dos aspectos de segurança adotados na empresa.",
                    "alternativa_B": "Definição da estratégia para abordar falhas de infra-estrutura, como cabos e servidores.",
                    "alternativa_C": "Documentação dos instrumentos/técnicas utilizadas para a segurança.",
                    "alternativa_D": "Homogeneização das regras nos sistemas corporativos."
                }
            },
            {
                "questao29": {
                    "enunciado": "Assinale a alternativa que contém uma forma válida de identificar a causa-raiz de uma vulnerabilidade na rede.",
                    "alternativa_A": "Realizar o upgrade dos equipamentos/ferramentas nos(as) quais a vulnerabilidade foi encontrada.",
                    "alternativa_B": "Fechar todas as portas de acesso para os servidores.",
                    "alternativa_C": "Isolar fisicamente os equipamentos envolvidos.",
                    "alternativa_D": "Analisar os fluxos de comunicação, logs e equipamentos envolvidos na vulnerabilidade."
                }
            },
            {
                "questao30": {
                    "enunciado": "A criptografia é o que nos permite manter a senha inserida por um usuário em um sistema protegido de livre acesso e leitura. Assinale a alternativa que apresenta um algoritmo de criptografia simétrico.",
                    "alternativa_A": "El Gamal",
                    "alternativa_B": "DSA",
                    "alternativa_C": "AES",
                    "alternativa_D": "Diffie-Hellman"
                }
            },
            {
                "questao31": {
                    "enunciado": "A infraestrutura de chaves públicas é um sistema de processos, tecnologias e políticas para você criptografar e assinar dados. O PKI (Public key Infrastructure) provê um sistema de gerenciamento, distribuição e autenticação de chaves públicas. O esquema de chaves públicas é também denominado:",
                    "alternativa_A": "assimétrico.",
                    "alternativa_B": "centralizado.",
                    "alternativa_C": "distribuído.",
                    "alternativa_D": "simétrico."
                }
            },
            {
                "questao32": {
                    "enunciado": "Muito utilizado em redes de computadores, sejam elas de pequeno ou grande porte. O Switch opera por meio da verificação do:",
                    "alternativa_A": "port TCP.",
                    "alternativa_B": "endereço MAC.",
                    "alternativa_C": "endereço IP.",
                    "alternativa_D": "roteamento para o IP destino."
                }
            },
            {
                "questao33": {
                    "enunciado": "Assinale a alternativa que apresenta a principal diferença entre os protocolos TCP e UDP.",
                    "alternativa_A": "O TCP pertence à camada de transporte, enquanto que o UDP pertence à camada física.",
                    "alternativa_B": "O TCP é o amplamente utilizado, enquanto o UDP não é mais utilizado.",
                    "alternativa_C": "O TCP é somente do modelo TCP/IP, enquanto que o UDP é somente do modelo OSI.",
                    "alternativa_D": "O TCP possui mecanismo de verificação de entrega de pacote, enquanto o UDP não possui."
                }
            },
            {
                "questao34": {
                    "enunciado": "Em um computador com o sistema operacional Linux, um subdiretório contém um arquivo chamado arq.sh. Neste subdiretório, o usuário dono do arquivo, que não possui privilégios de root, executou com sucesso o seguinte comando em um terminal: chmod ugo-rwx arq.sh. Em seguida, o comando a seguir foi executado: cat arq.sh. O resultado obtido foi:",
                    "alternativa_A": "a execução de arq.sh, uma vez que é um arquivo de shell script.",
                    "alternativa_B": "a exibição do conteúdo de arq.sh.",
                    "alternativa_C": "uma mensagem de erro informando que não há permissão.",
                    "alternativa_D": "a exibição do conteúdo de arq.sh concatenado com ele mesmo."
                }
            },
            {
                "questao35": {
                    "enunciado": "Em redes de computadores, switches e roteadores realizam funções diferenciadas, mas atualmente são incorporados em um único equipamento denominado switch L3. As funções do switch e do roteador são, correta e respectivamente, gerenciar:",
                    "alternativa_A": "as prioridades das conexões lógicas dos computadores da rede local, utilizando o endereço IP, e realizar o encaminhamento dos datagramas da rede local para rede ampla, utilizando o endereço Ethernet.",
                    "alternativa_B": "a transmissão de dados na rede local, utilizando o endereço Ethernet, e realizar o encaminhamento dos datagramas da rede local para a rede ampla, utilizando o endereço IP.",
                    "alternativa_C": "as conexões lógicas dos computadores da rede local, utilizando o endereço IP, e realizar o encaminhamento dos datagramas da rede local para a rede ampla, utilizando o número da Porta TCP.",
                    "alternativa_D": "o acesso dos computadores à rede local, utilizando o endereço IP, e realizar o encaminhamento dos datagramas da rede local para a rede ampla, utilizando o endereço IP."
                }
            },
            {
                "questao36": {
                    "enunciado": "Em uma rede local, os computadores com acesso à internet precisam de um recurso disponibilizado pelo roteador para poder acessar um servidor HTTP externo à rede local. Assinale a alternativa que corresponde a esse recurso.",
                    "alternativa_A": "possui um mecanismo de qualidade de serviço (QoS) configurado que prioriza a entrega de pacotes HTTP.",
                    "alternativa_B": "realiza a tradução do endereço de rede de origem por meio do Source NAT (SNAT).",
                    "alternativa_C": "realiza a tradução do endereço de rede de destino, por meio do Destination NAT (DNAT).",
                    "alternativa_D": "atribui endereços IPs da rede local aos clientes por meio do serviço de DHCP."
                }
            },
            {
                "questao37": {
                    "enunciado": "A internet é uma rede formada por várias outras redes, e todo computador ou dispositivo que se conecta à internet está conectado a um sistema autônomo. O conceito de redes autônomas é muito utilizado no contexto de roteamento. Em se tratando de redes de computadores, um sistema autônomo é:",
                    "alternativa_A": "um dispositivo de rede qualquer que se configura automaticamente em sua inicialização por meio da utilização de protocolos apropriados, consultando outros dispositivos.",
                    "alternativa_B": "um grupo de redes e roteadores controlados por uma única autoridade administrativa, com autonomia para escolher seus próprios mecanismos de gerenciamento de rotas dentro dos dispositivos controlados.",
                    "alternativa_C": "um dispositivo de rede qualquer que se configura automaticamente em sua inicialização de forma totalmente autônoma, sem depender da utilização de protocolos ou de consultas a outros dispositivos.",
                    "alternativa_D": "uma aplicação de software em um servidor que tem autonomia para rotear conexões de entrada para outros servidores, quando necessário."
                }
            },
            {
                "questao38": {
                    "enunciado": "O que significa o termo \"Communication\" na sigla PACS (Picture Archiving and Communication System)?",
                    "alternativa_A": "Controle.",
                    "alternativa_B": "Colaboração.",
                    "alternativa_C": "Computação.",
                    "alternativa_D": "Compartilhamento."
                }
            },
            {
                "questao39": {
                    "enunciado": "Em relação ao armazenamento de imagens médicas no sistema PACS, o que é o padrão DICOM?",
                    "alternativa_A": "Um método de autenticação de usuários no PACS.",
                    "alternativa_B": "Um formato de compressão de imagens.",
                    "alternativa_C": "Um protocolo de agendamento de exames.",
                    "alternativa_D": "Um conjunto de normas que unifica o formato de exames médicos de imagens."
                }
            },
            {
                "questao40": {
                    "enunciado": "O administrador de banco de dados Oracle precisa criar novos tipos de objetos usando a linguagem PL/SQL. Assinale a alternativa que apresenta corretamente parte da sintaxe do comando para a criação desses objetos.",
                    "alternativa_A": "CREATE [OR REPLACE] TABLE <type_table> AS OBJECT (...);",
                    "alternativa_B": "CREATE [OR REPLACE] <object_name> AS OBJECT (...);",
                    "alternativa_C": "CREATE [OR REPLACE] TYPE <type_name> AS OBJECT (...);",
                    "alternativa_D": "CREATE [OR REPLACE] <object_name> INTO OBJECT (...);"
                }
            }
        ]'::jsonb
    ) AS elem
) AS sub
ORDER BY questao_id;