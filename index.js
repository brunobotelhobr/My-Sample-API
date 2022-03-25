const express = require('express');
const os = require('os')
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const bodyParser = require('body-parser');
const swaggerDocument = YAML.load('./docs/swagger.yaml');
const config = require('./config/system-life.js');
const NodeHog = require('nodehog');

app.use(config.middlewares.healthMid);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use('/', config.routers);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 

app.get('/echo/:msg', (req, res) => {
    let msg = req.params.msg;
    res.json({ "txt-input": msg, "hostname": os.hostname() });
});

app.get('/secret/:msg', (req, res) => {
    let password = 'cochilocachimbocai';
    let msg = req.params.msg;
    if (msg == password) {
        res.statusCode = 200;
        return res.send('');
    } else {
        res.statusCode = 400;
        return res.send('');
    }  
    
    res.json({ "txt-input": msg, "hostname": os.hostname() });
});

app.get('/fahrenheit/:value/celsius', (req, res) => {

    let value = req.params.value;
    let celsius = (value - 32) * 5 / 9;
    res.json({ "celsius": celsius, "hostname": os.hostname() });
});

app.get('/swagger.yaml', (req, res) => {
    res.download(__dirname +'/docs/swagger.yaml');
});

app.get('/openapi.yaml', (req, res) => {
    res.download(__dirname +'/docs/openapi.yaml');
});

app.get('/celsius/:value/fahrenheit', (req, res) => {

    let value = req.params.value;
    let fahrenheit = (value * 9 / 5) + 32;
    res.json({ "fahrenheit": fahrenheit, "hostname": os.hostname() });
});

app.get('/temperature/fahrenheitparacelsius/:value', (req, res) => {

    let value = req.params.value;
    let celsius = (value - 32) * 5 / 9;
    res.json({ "celsius": celsius, "hostname": os.hostname() });
});

app.get('/temperature/celsiusparafahrenheit/:value', (req, res) => {

    let value = req.params.value;
    let fahrenheit = (value * 9 / 5) + 32;
    res.json({ "fahrenheit": fahrenheit, "hostname": os.hostname() });
});

app.get('/whoami', (req, res) => {
    let token = req.header('Authorization')
    if (token == "Bearer 5Kz4PPgAus2Pij1SsQl7dbUfufP8i_KN2So1MQyI5TCh9u1BdDrpmpyccxM6JAp5YWPgESJj6mjInr5lsGAOcIJyH_paBb9f3o5KO2KyLdzFrYWd7fMWfCNeQeGBakUcNTU0JnzUl8QxZBTbfIYG4QOPWaPlSJo5rEN5lB1o") {
        console.log("Authorization Successful | user: admin | whoami");
        res.statusCode = 200;
        res.json({ "msg": "We know you, wellcome admin", "hostname": os.hostname() });
    } else {
        res.statusCode = 401;
        res.json({ "msg": "Not Authorized", "hostname": os.hostname() });
    }  
    
});

app.get('/give-me-the-secret', (req, res) => {
    let token = req.header('Authorization')
    if (token == "Bearer 5Kz4PPgAus2Pij1SsQl7dbUfufP8i_KN2So1MQyI5TCh9u1BdDrpmpyccxM6JAp5YWPgESJj6mjInr5lsGAOcIJyH_paBb9f3o5KO2KyLdzFrYWd7fMWfCNeQeGBakUcNTU0JnzUl8QxZBTbfIYG4QOPWaPlSJo5rEN5lB1o") {
        console.log("Authorization Successful | user: admin | give-me-the-secret");
        res.statusCode = 200;
        res.json({ "secret": "cochilocachimbocai", "hostname": os.hostname() });
    } else {
        res.statusCode = 401;
        res.json({ "msg": "Not Authorized", "hostname": os.hostname() });
    }  
    
});

app.get('/priv-echo/:msg', (req, res) => {
    let msg = req.params.msg;
    let token = req.header('Authorization')
    if (token == "Bearer 5Kz4PPgAus2Pij1SsQl7dbUfufP8i_KN2So1MQyI5TCh9u1BdDrpmpyccxM6JAp5YWPgESJj6mjInr5lsGAOcIJyH_paBb9f3o5KO2KyLdzFrYWd7fMWfCNeQeGBakUcNTU0JnzUl8QxZBTbfIYG4QOPWaPlSJo5rEN5lB1o") {
        console.log("Authorization Successful | user: admin");
        res.statusCode = 200;
        res.json({ "txt-input": msg, "hostname": os.hostname() });
    } else {
        console.log("Authorization Unsuccessful");
        res.statusCode = 401;
        res.json({ "msg": "Not Authorized", "hostname": os.hostname() });
    }  
    
});

app.get('*', (req, res) => {
    res.redirect('/docs');
});

app.put('/stress/:resource/time/:time/interval/:interval/cycles/:cycles', (req, res) => {

    const resource = req.params.resoruce;
    const time = req.params.time * 1000;
    const interval = req.params.interval * 1000;
    const cycles = req.params.cycles;
    new NodeHog(resource, time, interval, cycles).start();
    res.json({"status": "Mission Accomplished" , "hostname": os.hostname() });
});

app.post('/login', (req, res) => {
    let user = req.body.user;
    let pass = req.body.pass;
    if (pass == "password" && user == "admin") {
        console.log("Login Successful | user: ", user, " pass: ", pass);
        res.statusCode = 200;
        res.json({ "msg": "Success", "hostname": os.hostname(),  "token_type": "bearer", "expires_in": 5183999 ,"access_token" : "5Kz4PPgAus2Pij1SsQl7dbUfufP8i_KN2So1MQyI5TCh9u1BdDrpmpyccxM6JAp5YWPgESJj6mjInr5lsGAOcIJyH_paBb9f3o5KO2KyLdzFrYWd7fMWfCNeQeGBakUcNTU0JnzUl8QxZBTbfIYG4QOPWaPlSJo5rEN5lB1o" });
    } else {
        res.statusCode = 401;
        res.json({ "msg": "Login Fail", "hostname": os.hostname() });
        
    }  
    
});

app.listen(8080, () => {
    console.log("Server:", os.hostname(), " serving at port 8080");
});
