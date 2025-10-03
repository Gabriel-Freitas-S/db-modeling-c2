# Diagrama MER - Controle Acadêmico Simplificado

```mermaid
erDiagram
    Alunos {
        TEXT matricula PK
        TEXT nome
        TEXT data_nascimento
        TEXT telefone
    }
    Professores {
        TEXT matricula PK
        TEXT nome
        TEXT formacao
        TEXT telefone
    }
    Disciplinas {
        TEXT codigo PK
        TEXT nome
        INTEGER carga_horaria
    }
    ProfessorDisciplina {
        TEXT professor_matricula PK, FK
        TEXT disciplina_codigo PK, FK
    }
    Matriculas {
        TEXT aluno_matricula PK, FK
        TEXT disciplina_codigo PK, FK
    }

    Professores }o--o{ Disciplinas : "leciona"
    Alunos }o--o{ Disciplinas : "se matricula em"

    ProfessorDisciplina }o--|| Professores : "associa"
    ProfessorDisciplina }o--|| Disciplinas : "associa"
    Matriculas }o--|| Alunos : "associa"
    Matriculas }o--|| Disciplinas : "associa"
```

## Entidades

- **Alunos**: Armazena informações dos estudantes (matrícula, nome, data de nascimento, telefone)
- **Professores**: Contém dados dos docentes incluindo formação acadêmica
- **Disciplinas**: Cadastro das disciplinas oferecidas com carga horária
- **ProfessorDisciplina**: Tabela de junção que resolve o relacionamento N:M entre professores e disciplinas
- **Matriculas**: Tabela de junção que resolve o relacionamento N:M entre alunos e disciplinas

## Relacionamentos

- Um **Professor** pode lecionar várias **Disciplinas**, e uma **Disciplina** pode ser lecionada por vários **Professores** (relacionamento N:M)
- Um **Aluno** pode se matricular em várias **Disciplinas**, e uma **Disciplina** pode ter vários **Alunos** matriculados (relacionamento N:M)
- As tabelas de junção **ProfessorDisciplina** e **Matriculas** implementam esses relacionamentos muitos-para-muitos
- Este modelo permite flexibilidade no planejamento acadêmico, onde professores podem compartilhar turmas e alunos podem cursar múltiplas disciplinas