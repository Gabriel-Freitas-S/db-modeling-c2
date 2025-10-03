# Diagrama MER - Locadora de Veículos

```mermaid
erDiagram
    Clientes {
        TEXT cnh PK
        TEXT nome
        TEXT telefone
        TEXT endereco
    }
    Veiculos {
        TEXT placa PK
        TEXT modelo
        TEXT marca
        INTEGER ano
        TEXT cor
        TEXT status
    }
    Reservas {
        INTEGER reserva_id PK
        TEXT cliente_cnh FK
        TEXT veiculo_placa FK
        TEXT data_inicio_prevista
        TEXT data_fim_prevista
    }
    Locacoes {
        INTEGER locacao_id PK
        INTEGER reserva_id FK
        TEXT cliente_cnh FK
        TEXT veiculo_placa FK
        TEXT data_retirada
        TEXT data_devolucao
        REAL valor_total
    }
    Manutencoes {
        INTEGER manutencao_id PK
        TEXT veiculo_placa FK
        TEXT data_manutencao
        TEXT tipo
        REAL custo
    }

    Clientes ||--|{ Reservas : "faz"
    Veiculos ||--|{ Reservas : "é reservado em"
    Clientes ||--|{ Locacoes : "realiza"
    Veiculos ||--|{ Locacoes : "é locado em"
    Reservas |o--|| Locacoes : "concretiza-se em"
    Veiculos ||--|{ Manutencoes : "passa por"
```

## Entidades

- **Clientes**: Cadastro dos locatários com CNH, nome e informações de contato
- **Veiculos**: Frota de veículos com dados de identificação e status operacional
- **Reservas**: Agendamento de futuras locações com datas previstas
- **Locacoes**: Registro de locações efetivadas com quilometragem e valores
- **Manutencoes**: Histórico de manutenções realizadas nos veículos

## Relacionamentos

- Um **Cliente** pode fazer múltiplas **Reservas** e **Locacoes** (relacionamento 1:N)
- Um **Veiculo** pode estar em múltiplas **Reservas**, **Locacoes** e **Manutencoes** ao longo do tempo (relacionamento 1:N)
- Uma **Reserva** pode se concretizar em no máximo uma **Locacao** (relacionamento 1:1 opcional)
- O campo `status` em **Veiculos** gerencia o ciclo de vida: 'Disponível', 'Locado', 'Em Manutenção'
- Este modelo complexo permite:
  - Gerenciar reservas futuras
  - Rastrear histórico completo de locações por veículo e cliente
  - Manter registro de manutenções preventivas e corretivas
  - Controlar disponibilidade da frota em tempo real