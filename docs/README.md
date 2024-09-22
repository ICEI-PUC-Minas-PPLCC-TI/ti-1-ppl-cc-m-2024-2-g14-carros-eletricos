# Introdução

Informações básicas do projeto.

* **Projeto:** [Falta de incentivo à carros elétricos]
* **Repositório GitHub:** [Link](Miro.pdf)
* **Membros da equipe:**

  * [Henrique Gonçalves Pimenta Velloso](https://github.com/osohenri)
  * [João Vitor de Alvarenga Alvares](https://github.com/joaovitoralvarenga)
  * [Lucca Sander Frisso](https://github.com/Lsanderf)
  * [Luciano Gomes Eudes](https://github.com/llucianoeudes)
  * [Ernando Gabriel Antunes de Oliveira](https://github.com/ErnandoGA)

A documentação do projeto é estruturada da seguinte forma:

1. Introdução
2. Contexto
3. Product Discovery
4. Product Design
5. Metodologia
6. Solução
7. Referências Bibliográficas

✅ [Documentação de Design Thinking (MIRO)](files/processo-dt.pdf)

# Contexto

A falta de incentivo à carros elétricos, principalmente quando se trata da infraestrutura de carregamento, ainda é uma barreira gigantesca para o crescimento desse mercado no Brasil. Assim, o projeto visa desenvolver um site que facilite o rastreamento de pontos de carregamento, fornecendo informações em tempo real sobre a localização, disponibilidade, tipo de conector e tarifas, além de educar o público sobre os benefícios dos veículos elétricos. A plataforma é direcionada, sobretudo, à proprietários e potenciais compradores de carros elétricos.

## Problema

* O suporte de infraestrutura para veículos elétricos, especialmente no Brasil, é baixa;

* Proprietários e potenciais compradores de veículos elétricos sentem dificuldade ao localizar pontos de carregamento baratos, bons e próximos;

* A infraestrutura inadequada agrava o problema;

* A demanda por serviços de carregamento de veículos elétricos aumenta em cidades maiores.


## Objetivos

* O objetivo geral deste projeto é desenvolver um software que solucione o problema da falta de infraestrutura e informação para proprietários e potenciais compradores de carros elétricos:

  * Facilitar o acesso a pontos de carregamento;

  * Facilitar o acesso a informações sobre incentivos;

* Entre os objetivos específicos, destacam-se:

  * Criar uma plataforma capaz de rastrear, em tempo real, a localização e a disponibilidade de estações de carregamento;

  * Planejamento de rotas com estações de recarga;

  * Oferecer dados detalhados como tipo de conector e custo;

  * Simulador de viabilidade econômica;

  * Tabela de preços.


## Justificativa

A escolha deste assunto é motivada pela falta de infraestrutura adequada para veículos elétricos, dificultando a adoção desses veículos. O objetivo é desenvolver uma aplicação que facilitaria o acesso às estações de carregamento e forneceria informações sobre subsídios e incentivos para ajudar os clientes e fazer do uso de carros elétricos uma decisão mais aberta e fácil. Destinada a consumidores, a solução será embasada em questionários e resultados estatísticos para entender o que é essencial para o público.

## Público-Alvo

* Proprietários de carros elétricos: Usuários que já possuem veículos elétricos e buscam facilitar seu uso diário;

* Potenciais compradores: Pessoas interessadas em adquirir veículos elétricos, mas que estão em fase de pesquisa sobre a viabilidade prática e os benefícios financeiros.

# Product Discovery

## Etapa de Entendimento

![Matriz CSD](MatrizCSD.png)

![Mapa de Stakeholders](Stakeholders.png)

![Entrevistas qualitativas](Entrevistas.png)

![Highlights de pesquisa](Highlights.png)


## Etapa de Definição

### Personas

#### Persona 1

![Persona 1](Persona1.png)

#### Persona 2

![Persona 2](Persona2.png)

#### Persona 3

![Persona 3](Persona3.png)

# Product Design

## Histórias de Usuários

Com base na análise das personas foram identificadas as seguintes histórias de usuários:

| EU COMO...                                      | QUERO/PRECISO ...                                                | PARA ...                                       |
| ----------------------------------------------- |  --------------------------------------------------------------- | ---------------------------------------------- |
| Proprietário de carro elétrico                  | Saber onde existem pontos de recarga                             | Fazer viagens longas com mais segurança        |
| Potencial comprador de carro elétrico           | Ter noção de custos e opções de compra de um carro               | Calcular o custo-benefício                     |
| Potencial comprador de carro elétrico           | Entender as vantagens de adotar um carro elétrico                | Sentir que estou fazendo um bom negócio        |
| Proprietário de carro elétrico com dificuldades | Otimizar minha rotina                                            | Minimizar as necessidades de carregamento      |
| Potencial comprador de carro elétrico           | Motivação para considerar a troca do carro atual por um elétrico | Contribuir para um futuro mais sustentável     |
| Potencial comprador de carro elétrico           | Ver a quantidade de pontos de recarga na minha região            | Avaliar se minhas necessidades serão atendidas |

## Proposta de Valor

##### Proposta para Persona 1

![Proposta para Persona 1](Proposta1.png)

##### Proposta para Persona 2

![Proposta para Persona 2](Proposta2.png)

##### Proposta para Persona 3

![Proposta para Persona 3](Proposta3.png)

## Requisitos

### Requisitos Funcionais

| ID     | Descrição do Requisito                                                | Prioridade |
| ------ | --------------------------------------------------------------------- | ---------- |
| RF-001 | Mapeamento dos pontos de recarga                                      | ALTA       |
| RF-002 | Planejamento de rotas com estações de recarga                         | ALTA       |
| RF-003 | Notícias relacionadas a carros elétricos                              | MÉDIA      |
| RF-004 | Notificações personalizadas                                           | MÉDIA      |
| RF-005 | Simulador de viabilidade econômica                                    | ALTA       |
| RF-006 | Tabela de preços dos carros                                           | ALTA       |
| RF-007 | Integração com navegação GPS                                          | ALTA       |
| RF-008 | Comparador de postos                                                  | MÉDIA      |
| RF-009 | Monitoramento de disponibilidade em tempo real                        | ALTA       |
| RF-010 | Avaliações e rankings de postos de recarga                            | MÉDIA      |

### Requisitos não Funcionais

| ID      | Descrição do Requisito                                               | Prioridade |
| ------- | -------------------------------------------------------------------- | ---------- |
| RNF-001 | API do Google Maps                                                   | ALTA       |
| RNF-002 | Site publicado no GitHub                                             | MÉDIA      |
| RNF-003 | Tempo de carregamento reduzido                                       | ALTA       |

## Projeto de Interface

### Wireframes

Estes são os protótipos de telas do sistema.

**✳️✳️✳️ COLOQUE AQUI OS PROTÓTIPOS DE TELAS COM TÍTULO E DESCRIÇÃO ✳️✳️✳️**

##### TELA XPTO ⚠️ EXEMPLO ⚠️

Descrição para a tela XPTO

![Exemplo de wireframe](images/exemplo-wireframe.png)

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Wireframes são protótipos das telas da aplicação usados em design de interface para sugerir a estrutura de um site web e seu relacionamentos entre suas páginas. Um wireframe web é uma ilustração semelhante ao layout de elementos fundamentais na interface.
>
> **Orientações**:
>
> - [Ferramentas de Wireframes](https://rockcontent.com/blog/wireframes/)
> - [Figma](https://www.figma.com/)
> - [Adobe XD](https://www.adobe.com/br/products/xd.html#scroll)
> - [MarvelApp](https://marvelapp.com/developers/documentation/tutorials/)

### User Flow

**✳️✳️✳️ COLOQUE AQUI O DIAGRAMA DE FLUXO DE TELAS ✳️✳️✳️**

![Exemplo de fluxo de telas](images/exemplo-userflow.png)

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Fluxo de usuário (User Flow) é uma técnica que permite ao desenvolvedor mapear todo fluxo de telas do site ou app. Essa técnica funciona para alinhar os caminhos e as possíveis ações que o usuário pode fazer junto com os membros de sua equipe.
>
> **Orientações**:
>
> - [User Flow: O Quê É e Como Fazer?](https://medium.com/7bits/fluxo-de-usu%C3%A1rio-user-flow-o-que-%C3%A9-como-fazer-79d965872534)
> - [User Flow vs Site Maps](http://designr.com.br/sitemap-e-user-flow-quais-as-diferencas-e-quando-usar-cada-um/)
> - [Top 25 User Flow Tools &amp; Templates for Smooth](https://www.mockplus.com/blog/post/user-flow-tools)

### Protótipo Interativo

**✳️✳️✳️ COLOQUE AQUI UM IFRAME COM SEU PROTÓTIPO INTERATIVO ✳️✳️✳️**

✅ [Protótipo Interativo (MarvelApp)](https://marvelapp.com/prototype/4hd6091?emb=1&iosapp=false&frameless=false)  ⚠️ EXEMPLO ⚠️

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Um protótipo interativo apresenta o projeto de interfaces e permite ao usuário navegar pelas funcionalidades como se estivesse lidando com o software pronto. Utilize as mesmas ferramentas de construção de wireframes para montagem do seu protótipo interativo. Inclua o link para o protótipo interativo do projeto.

# Metodologia

## Ferramentas

| Ambiente                    | Plataforma          | Link de acesso                                                                       |
| --------------------------- | ------------------- | ------------------------------------------------------------------------------------ |
| Editor de código            | Visual Studio Code  | https://code.visualstudio.com                                                        |
| Repositório de código       | GitHub              | https://github.com/ICEI-PUC-Minas-PPLCC-TI/ti-1-ppl-cc-m-2024-2-g14-carros-eletricos |
| Comunicação em equipe       | Discord             | https://discord.com                                                                  |
| Diagramação e prototipagem  | Figma               | https://www.figma.com                                                                |
| Processo de Design Thinking | Miro                | https://miro.com                                                                     |
| Hospedagem do site          | GitHub Pages        | https://pages.github.com                                                             |
| API de mapas                | Google Maps API     | https://developers.google.com/maps                                                   |

## Gerenciamento do Projeto

Divisão de papéis no grupo e apresentação da estrutura da ferramenta de controle de tarefas (Kanban).

![Exemplo de Kanban](images/exemplo-kanban.png)

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Nesta parte do documento, você deve apresentar  o processo de trabalho baseado nas metodologias ágeis, a divisão de papéis e tarefas, as ferramentas empregadas e como foi realizada a gestão de configuração do projeto via GitHub.
>
> Coloque detalhes sobre o processo de Design Thinking e a implementação do Framework Scrum seguido pelo grupo. O grupo poderá fazer uso de ferramentas on-line para acompanhar o andamento do projeto, a execução das tarefas e o status de desenvolvimento da solução.
>
> **Orientações**:
>
> - [Sobre Projects - GitHub Docs](https://docs.github.com/pt/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects)
> - [Gestão de projetos com GitHub | balta.io](https://balta.io/blog/gestao-de-projetos-com-github)
> - [(460) GitHub Projects - YouTube](https://www.youtube.com/playlist?list=PLiO7XHcmTsldZR93nkTFmmWbCEVF_8F5H)
> - [11 Passos Essenciais para Implantar Scrum no seu Projeto](https://mindmaster.com.br/scrum-11-passos/)
> - [Scrum em 9 minutos](https://www.youtube.com/watch?v=XfvQWnRgxG0)

## Referências

As referências utilizadas no trabalho foram:

* Documentação de ferramentas

  * [Google Maps API](https://developers.google.com/maps)

  * [GitHub Docs](https://pages.github.com)

* Ferramentas e plataformas
  
  * [Figma](https://www.figma.com)  