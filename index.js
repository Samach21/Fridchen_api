const mongoose = require("mongoose");
const createServer = require('./server');

const server = createServer();
const mongoUrl = process.env.MONGO_URL2 || 'mongodb://localhost:27017/fridchen';

const port = process.env.PORT || 3001;

mongoose
  .connect(mongoUrl)
  .then(()=>{
    console.log('Connected to MongoDB');
  })
  .catch((err)=>{
    console.log(err)
  }
);

server.listen(port, () => {
  console.log(`Fridchen api listening at http://localhost:${port}`)
});