import * as express from 'express';
const app = express();
const port = 8080;

app.get('/', (req: any,res: any)=>{
    res.send("hello");
})

app.listen(port, ()=>{
    console.log('server is listening to ', port);
})