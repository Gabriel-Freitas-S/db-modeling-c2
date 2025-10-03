import sqlite3
import os

# Lista dos bancos a criar (nome, arquivo SQL, arquivo DB)
bancos = [
    ('Biblioteca', 'sql/1_biblioteca.sql', 'data/1_biblioteca.sqlite3'),
    ('Acadêmico', 'sql/2_academico.sql', 'data/2_academico.sqlite3'),
    ('Clínica', 'sql/3_clinica.sql', 'data/3_clinica.sqlite3'),
    ('E-commerce', 'sql/4_ecommerce.sql', 'data/4_ecommerce.sqlite3'),
    ('Rede Social', 'sql/5_rede_social.sql', 'data/5_rede_social.sqlite3'),
    ('RH', 'sql/6_rh.sql', 'data/6_rh.sqlite3'),
    ('Locadora', 'sql/7_locadora.sql', 'data/7_locadora.sqlite3'),
    ('Vendas', 'sql/8_vendas.sql', 'data/8_vendas.sqlite3'),
    ('Universidade', 'sql/9_universidade.sql', 'data/9_universidade.sqlite3'),
    ('Hospitalar', 'sql/10_hospitalar.sql', 'data/10_hospitalar.sqlite3'),
]

def criar_banco(nome, sql_file, db_file):
    """
    Cria um banco de dados SQLite a partir de um arquivo SQL.
    
    Args:
        nome: Nome descritivo do banco
        sql_file: Caminho do arquivo SQL com o DDL
        db_file: Caminho do arquivo de banco de dados a ser criado
    
    Returns:
        True se sucesso, False se erro
    """
    try:
        # Verificar se o arquivo SQL existe
        if not os.path.exists(sql_file):
            print(f"❌ Erro: Arquivo SQL não encontrado: {sql_file}")
            return False
        
        # Ler o conteúdo do arquivo SQL
        with open(sql_file, 'r', encoding='utf-8') as f:
            sql_script = f.read()
        
        # Remover o banco existente se houver
        if os.path.exists(db_file):
            os.remove(db_file)
            print(f"   → Banco existente removido: {db_file}")
        
        # Criar conexão com o banco de dados
        conn = sqlite3.connect(db_file)
        cursor = conn.cursor()
        
        # Executar o script SQL
        cursor.executescript(sql_script)
        
        # Commit e fechar conexão
        conn.commit()
        conn.close()
        
        print(f"✅ Banco '{nome}' criado com sucesso: {db_file}")
        return True
        
    except sqlite3.Error as e:
        print(f"❌ Erro SQL ao criar banco '{nome}': {e}")
        return False
    except Exception as e:
        print(f"❌ Erro ao criar banco '{nome}': {e}")
        return False

def main():
    """Função principal que cria todos os bancos de dados."""
    print("=" * 60)
    print("CRIAÇÃO DOS BANCOS DE DADOS SQLite")
    print("=" * 60)
    print()
    
    # Criar diretório data/ se não existir
    if not os.path.exists('data'):
        os.makedirs('data')
        print("📁 Diretório 'data/' criado")
        print()
    
    # Contadores
    sucesso = 0
    erro = 0
    
    # Criar cada banco
    for i, (nome, sql_file, db_file) in enumerate(bancos, 1):
        print(f"[{i}/{len(bancos)}] Criando banco: {nome}")
        if criar_banco(nome, sql_file, db_file):
            sucesso += 1
        else:
            erro += 1
        print()
    
    # Resumo final
    print("=" * 60)
    print("RESUMO")
    print("=" * 60)
    print(f"✅ Bancos criados com sucesso: {sucesso}")
    print(f"❌ Erros: {erro}")
    print(f"📊 Total: {len(bancos)}")
    print()
    
    if erro == 0:
        print("🎉 Todos os bancos foram criados com sucesso!")
    else:
        print("⚠️  Alguns bancos não foram criados. Verifique os erros acima.")

if __name__ == "__main__":
    main()