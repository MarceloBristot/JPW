# JPW

Projeto intermediário para a matéria de Java Para Web (JPW) 2020/01

Proposta: Registro de alterações em projetos

Instalação de dependências 
	
	> npm install

Iniciar execução 
	
	> npm start


## Recursos

 #### - Usuários
    
JSON:

    {
		"nome": "NOME",
		"sigla": "SIGLA",
		"login": "EMAIL",
		"senha": "SENHA"
    }
    
- Autenticar: '/usuarios/entrar' (método POST)
	- Login
	- Senha

- Criar: '/usuarios' (método POST)
- Listagem: '/usuarios' (método GET)
	- ':/_id' : Listagem específica por ID
	- 'filter' : filtragem por nome
	- 'limit : qtd. limite de registros retornados
- Editar: '/usuarios' (método PUT)
- Deletar: '/usuarios' (método DELETE)

 #### - Clientes
    
JSON:

    {
		"nome": "NOME",
		"cidade": "CIDADE",
		"uf": "UF",
		"pais": "PAIS"
    }
    
- Criar: '/clientes' (método POST)
- Listagem: '/clientes' (método GET)
	- ':/_id' : Listagem específica por ID
	- 'filter' : filtragem por cidade
	- 'limit' : qtd. limite de registros retornados
- Editar: '/clientes' (método PUT)
- Deletar: '/clientes' (método DELETE)

 #### - Produto
    
JSON:

    {
		"nome": "NOME",
		"versao": "VERSAO"
    }
    
- Criar: '/produtos' (método POST)
- Listagem: '/produtos' (método GET)
	- ':/_id' : Listagem específica por ID
	- 'filter' : filtragem por versao
	- 'limit' : qtd. limite de registros retornados
- Editar: '/produtos' (método PUT)
- Deletar: '/produtos' (método DELETE)

 #### - Projetos
    
JSON:

    {
		"nome": "NOME",
		"cliente":{
			"_id": "IDCLIENTE"
		},
		"produto":{
			"_id": "IDPRODUTO"
		}
    }
    
- Criar: '/projetos' (método POST)
- Listagem: '/projetos' (método GET)
	- ':/_id' : Listagem específica por ID
	- 'filter' : filtragem por Clientes (declarar 'idCliente' na consulta)
	- 'limit' : qtd. limite de registros retornados
- Editar: '/projetos' (método PUT)
- Deletar: '/projetos' (método DELETE)

 #### - Alterações
    
JSON:

    {
		"cliente":{
			"_id": "IDCLIENTE"
		},
		"produto":{
			"_id": "IDPRODUTO"
		}
		"projeto":{
			"_id": "IDPROJETO"
		},
		"COMENTARIOS": [{
			"conteudo": "CONTEUDO"
		}]
    }
    
- Criar: '/alteracoes' (método POST)
- Listagem: '/alteracoes' (método GET)
	- ':/_id' : Listagem específica por ID
	- 'filter' : filtragem por Usuários (declarar 'idUsuario' na consulta)
	- 'limit' : qtd. limite de registros retornados
- Editar: '/alteracoes' (método PUT)
- Deletar: '/alteracoes' (método DELETE)
