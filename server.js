import server from './index.js';
import { connectToMongoDB } from './DataBase/mongoDB.js';
server.listen(process.env.PORT, ()=>{
    console.log(`server is listening at ${process.env.PORT}`);
    connectToMongoDB();
});