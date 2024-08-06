let express = require('express');
let app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb://localhost:27017";
const uri = "mongodb+srv://sugandanicholas:IgcSizEJ2BDjx0W7@cluster0.46e1abc.mongodb.net/"
let port = process.env.port || 3040;
let collection;

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('Comment');
        console.log(collection);
    } catch(ex) {
        console.error(ex);
    }
}

app.get('/', function (req,res) {
    res.render('index.html');
});

app.get('/api/comments', async (req,res) => {
    getAllComments((err,result)=>{
        if (!err) {
            res.json({statusCode:200, data:result, message:'Get All Comments Successful'});
        }
    });
});

app.post('/api/comment', (req,res)=>{
    let comment = req.body;
    postComment(comment, (err, result) => {
        if (!err) {
            res.json({statusCode:201, data:result, message:'success'});
        }
    });
});

function postComment(comment,callback) {
    collection.insertOne(comment,callback);
}

function getAllComments(callback){
    collection.find({}).toArray(callback);
}

app.listen(port, ()=>{
    console.log('express server started');
    runDBConnection();
});