# Diagrama MER - Sistema de Matrícula em Universidade

```mermaid
erDiagram
    Alunos {
        TEXT matricula PK
        TEXT nome
    }
    Cursos {
        TEXT codigo PK
        TEXT nome
        INTEGER duracao
    }
    Disciplinas {
        TEXT codigo PK
        TEXT nome
        INTEGER carga_horaria
    }
    Matriculas {
        TEXT aluno_matricula PK, FK
        TEXT disciplina_codigo PK, FK
        REAL nota
        TEXT semestre
    }
    CursoDisciplina {
        TEXT curso_codigo PK, FK
        TEXT disciplina_codigo PK, FK
    }
    Prerequisitos {
        TEXT disciplina_codigo PK, FK
        TEXT prerequisito_codigo PK, FK
    }

    Alunos }o--o{ Disciplinas : "se matricula em"
    Cursos }o--o{ Disciplinas : "é composto por"
    Disciplinas }o--o{ Disciplinas : "tem como pré-requisito"

    Matriculas }o--|| Alunos : "de"
    Matriculas }o--|| Disciplinas : "em"
    CursoDisciplina }o--|| Cursos : "de"
    CursoDisciplina }o--|| Disciplinas : "em"
    Prerequisitos }o--|| Disciplinas : "requer"
    Prerequisitos }o--|| Disciplinas : "é requerido por"
```

## Entidades

- **Alunos**: Cadastro dos estudantes da universidade
- **Cursos**: Programas acadêmicos oferecidos pela universidade com duração em semestres
- **Disciplinas**: Componentes curriculares com carga horária definida
- **Matriculas**: Tabela de junção que registra alunos matriculados em disciplinas com notas e semestre
- **CursoDisciplina**: Tabela de junção que define o currículo de cada curso
- **Prerequisitos**: Tabela de junção para auto-relacionamento de disciplinas (dependências curriculares)

## Relacionamentos

- Um **Aluno** pode se matricular em várias **Disciplinas**, e uma **Disciplina** pode ter vários **Alunos** (relacionamento N:M via Matriculas)
- Um **Curso** é composto por várias **Disciplinas**, e uma **Disciplina** pode fazer parte de vários **Cursos** (relacionamento N:M via CursoDisciplina)
- Uma **Disciplina** pode ter várias outras como pré-requisito, e pode ser pré-requisito de várias outras (auto-relacionamento N:M via Prerequisitos)
- Recursos avançados:
  - **Auto-relacionamento**: A tabela Prerequisitos relaciona Disciplinas com elas mesmas, permitindo definir dependências curriculares
  - `disciplina_codigo` → disciplina que POSSUI o pré-requisito
  - `prerequisito_codigo` → disciplina que É o pré-requisito
  - A tabela **Matriculas** inclui `semestre` para diferenciar múltiplas tentativas da mesma disciplina
- Este modelo complexo suporta gestão acadêmica completa incluindo validação de pré-requisitos e histórico escolar detalhado