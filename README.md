# m3-full-stack-project

#### Useful Links:
* https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
* https://mlab.com/
* https://codeburst.io/writing-a-crud-app-with-node-js-and-mongodb-e0827cbbdafb
* https://ciphertrick.com/2016/01/18/salt-hash-passwords-using-nodejs-crypto/
* https://stackoverflow.com/questions/42558090/how-to-create-html-table-based-on-json
* https://blog.risingstack.com/getting-node-js-testing-and-tdd-right-node-js-at-scale/
* https://medium.com/createdd-notes/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359

M3Node123???
mongodb+srv://admin:<password>@databasecluster-tgxhv.mongodb.net/test?retryWrites=true
  
  
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:<password>@databasecluster-tgxhv.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

