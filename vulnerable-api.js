const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'userdb'
});



// Rota de login com vulnerabilidade de injeção SQL
app.post('/api/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  // VULNERABILIDADE: Injeção SQL - concatenação direta de entrada do usuário na query
  const query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
  
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Erro no servidor' });
    }
    
    if (results.length > 0) {
      // Usuário autenticado
      return res.status(200).json({ 
        success: true, 
        message: 'Login bem-sucedido',
        user: results[0]
      });
    } else {
      // Falha na autenticação
      return res.status(401).json({ 
        success: false, 
        message: 'Credenciais inválidas' 
      });
    }
  });
});

// Rota para buscar usuário por ID com outra vulnerabilidade
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  
  // VULNERABILIDADE: Outra injeção SQL
  const query = "SELECT id, username, email FROM users WHERE id = " + userId;
  
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Erro no servidor' });
    }
    
    if (results.length > 0) {
      return res.status(200).json(results[0]);
    } else {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
  });
});

// VULNERABILIDADE: Execução de código insegura
app.post('/api/execute', (req, res) => {
  const userCommand = req.body.command;
  
  const { exec } = require('child_process');
  exec(userCommand, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ result: stdout });
  });
});

// VULNERABILIDADE: Atribuição de protótipo insegura
app.post('/api/config', (req, res) => {
  const defaultConfig = {};
  const userConfig = req.body.config;
  
  // Vulnerabilidade de poluição de protótipo
  Object.assign(defaultConfig, userConfig);
  
  return res.status(200).json({ 
    message: 'Configuração atualizada', 
    config: defaultConfig 
  });
});

// VULNERABILIDADE: Redirecionamento não validado
app.get('/redirect', (req, res) => {
  const url = req.query.url;
  
  // Redirecionamento não validado
  res.redirect(url);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});