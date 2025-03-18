const { MongoClient } = require('mongodb');

// String de conexão obtida de .env
const uri = process.env.MONGO_URI || 'mongodb+srv://luissimonazure:FiTEEAFId1fx16Qh@relatorioexameclusteraz.c2xgf.mongodb.net/templatebuilderia?retryWrites=true&w=majority';
const dbName = 'templatebuilderia';

async function testConnection() {
  console.log('Testando conexão com MongoDB...');
  console.log(`URI: ${uri.substring(0, 20)}...${uri.substring(uri.length - 20)}`);
  
  let client;
  try {
    client = new MongoClient(uri);
    await client.connect();
    console.log('✓ Conexão bem-sucedida!');
    
    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();
    
    console.log('Coleções disponíveis:');
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });
    
    const users = await db.collection('users').countDocuments();
    console.log(`Total de usuários: ${users}`);
    
    return true;
  } catch (err) {
    console.error('✗ Erro na conexão:', err);
    return false;
  } finally {
    if (client) {
      await client.close();
      console.log('Conexão fechada.');
    }
  }
}

testConnection()
  .then(success => {
    console.log(success ? 'Teste completado com sucesso!' : 'Teste falhou!');
    process.exit(success ? 0 : 1);
  })
  .catch(err => {
    console.error('Erro no teste:', err);
    process.exit(1);
  }); 