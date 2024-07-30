const express= require("express");
const app= express();
app.use(express.static('public'))

app.get("/Display", (req, res) => {
    const n1 = "<html><body><H1>HELLO THERE </H1></body></html>";
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from(n1));     
})

const port=3040;
app.listen(port,()=> {
    console.log("hello i'm listening to port "+port);
})