import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root',
  database: 'biblioteca'
});

connection.connect((error) => {
  if (error) {
    console.error('Erroao se conectar ao banco de dados', err);
    return;
  }
  console.log('Conectado ao banco de dados com suceso');
});

export default connection;