# Sistema de Gestão de Biblioteca

Este é um sistema web de gestão de biblioteca desenvolvido com Flask, seguindo o padrão MVC (Model-View-Controller).

## Estrutura do Projeto

```
ATLAS-ModelagemSistemas/
├── src/                    # Código fonte principal
│   ├── static/            # Arquivos estáticos
│   │   ├── css/          # Arquivos de estilo CSS
│   │   ├── js/           # Scripts JavaScript
│   │   └── images/       # Imagens do sistema
│   ├── templates/         # Templates HTML (Jinja2)
│   ├── models/           # Modelos de dados (classes ORM)
│   ├── controllers/      # Controladores (rotas Flask)
│   └── services/         # Lógica de negócio
└── tests/                # Testes unitários e de integração
```

## Descrição dos Diretórios

### Código Fonte (`src/`)

- **static/**: Contém todos os arquivos estáticos do projeto
  - `css/`: Arquivos de estilo CSS
  - `js/`: Scripts JavaScript para interatividade no cliente
  - `images/`: Imagens e recursos visuais

- **templates/**: Templates HTML usando Jinja2
  - Contém as views do sistema
  - Usa o sistema de templates Jinja2 do Flask

- **models/**: Classes de modelo
  - Define as entidades do sistema
  - Implementa as classes ORM para interação com o banco de dados

- **controllers/**: Controladores do sistema
  - Gerencia as rotas da aplicação
  - Processa requisições HTTP
  - Conecta os models com as views

- **services/**: Camada de serviços
  - Implementa a lógica de negócio
  - Separa regras de negócio dos controllers

### Testes (`tests/`)

- Contém todos os testes automatizados
- Inclui testes unitários e de integração
- Segue as boas práticas de teste do Python

## Tecnologias Utilizadas

- **Backend**: Flask (Python)
- **Templates**: Jinja2
- **Frontend**: HTML, CSS, JavaScript
- **Banco de Dados**: Json

## Requisitos do Sistema

- Python 3.8+
- Flask
- Outras dependências serão listadas no arquivo requirements.txt

## Como Executar (A ser implementado)

1. Clone o repositório
2. Crie um ambiente virtual
3. Instale as dependências
4. Configure as variáveis de ambiente
5. Execute o servidor Flask

```bash
# Instruções serão adicionadas conforme o desenvolvimento
```