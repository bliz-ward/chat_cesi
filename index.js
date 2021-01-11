import express from 'express';
import http from 'http';

const app = express();
const httpSrv = http.Server(app);

const hello = (req, res) => {
    const name = req.param("name", null);
    console.log("je suis dans hello ");
    console.log("salut " + name)
    res.end(`Salut ${name}`);
}

app.post('/ping', function (req, res) {
    console.log("je suis dans ping")
    res.end("pong");
});
app.get('/hello', hello);

const messagesArray = [];

const postMessages = (req, res) => {
    console.log('l\'utilisateur souhaite poster un message')
    const messageVar = req.param('message');
    const usernameVar = req.param('username');
    const ts = new Date().getTime();

    if (!messageVar) { // if messageVar = undefined, null ou empty
    res.status(400).end("message est vide");
    return;
    }


    if (usernameVar == null || usernameVar == undefined || usernameVar =="") {
    res.status(400).end("username est vide");
    return;
    }
        const myMessage = {
        message: messageVar,
        username: usernameVar,
        ts: ts
    }

    messagesArray.push(myMessage);
    res.status(201);
    res.send("message créé");
}

function getMessages (req, res) {
    console.log('get messages')
    res.json(messagesArray);
}

const usersArray = [];

const postUsers = (req, res) => {
    console.log('nom et mot de passe de l\'utilisateur')
    const password = req.param('password');
    const userSignIn = req.param('username');

    if (!userSignIn) {
        res.status(400).end("username est vide");
        return;
        }
    
    
    if (password == null || password == undefined || password =="") {
    res.status(400).end("password est vide");
    return;
    }

    const myUser = {
        user: userSignIn,
        password: password,
    }

    usersArray.push(myUser);
    res.status(201);
    res.send("user créé");
}

function getUsers (req, res) {
    console.log('get user')
    res.json(usersArray);
}

// façon alternative de rédiger cette fonction. 
// La commande function permet d'avoir un scope global 
//quand la rédaction abrégée n'est déclarée qu'au moment où le code s'exécute.

// const getMessages = (req, res) => {
//     console.log('get messsages')
//     res.json(messages);
// }

//Messages
app.post('/messages', postMessages);
app.get('/messages', getMessages);

app.post('/users', postUsers);
app.get('/users', getUsers);

httpSrv.listen(8080, function () {
    console.log('listening on *:8080')
});
