import app from './app.js';
import config from './config.js';
import connectDB from './services/database/dbConfig.js';


connectDB();
const { port } = config;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
