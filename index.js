const express = require('express');
const os = require('os')
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');
const config = require('./config/system-life');
const NodeHog = require('nodehog');


app.use(config.middlewares.healthMid);
app.use('/', config.routers);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());

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

const child_process = require('child_process');

app.post('/validate-email', (req, res) => {
    // Get 'email' from request body, or use empty string if not provided
    let email = req.body && req.body.email ? req.body.email : '';
    // Regular expression for email validation (can be vulnerable to ReDoS if too complex)
    let re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    // Test the regex against user input
    let result = re.test(email);
    // Respond with the result and server hostname
    res.json({ valid: result, hostname: os.hostname() });
});

app.get('/ping', function (req, res) {
    // Get the IPv4 address from query string (?ip=8.8.8.8)
    let ip = req.query.ip;
    // Execute the ping command using child_process.exec
    child_process.exec(`ping -c 2 ${ip}`, function (error, stdout, stderr) {
        if (error) {
            // If there is an error, respond with status 500 and error message
            res.status(500).json({ error: stderr });
        } else {
            // Otherwise, respond with the ping output
            res.json({ output: stdout });
        }
    });
});

app.get('/fahrenheit/:value/celsius', (req, res) => {

    let value = req.params.value;
    let celsius = (value - 32) * 5 / 9;
    res.json({ "celsius": celsius, "hostname": os.hostname() });
});

app.get('/swagger.yaml', (req, res) => {
    res.download(__dirname + '/docs/swagger.yaml');
});

app.get('/openapi.yaml', (req, res) => {
    res.download(__dirname + '/docs/openapi.yaml');
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

app.get('/isoflegalage/:year', (req, res) => {

    let year = req.params.year;
    const currentYear = new Date().getFullYear(); // Get the current year from Date object
    let isOfLegalAge = false
    if ((currentYear - year) >= 18)
        isOfLegalAge = true

    res.json({ "isOfLegalAge": isOfLegalAge, "hostname": os.hostname() });

})

app.get('*', (req, res) => {
    res.redirect('/docs');
});

app.put('/stress/:resource/time/:time/interval/:interval/cycles/:cycles', (req, res) => {

    const resource = req.params.resoruce;
    const time = req.params.time * 1000;
    const interval = req.params.interval * 1000;
    const cycles = req.params.cycles;
    new NodeHog(resource, time, interval, cycles).start();
    res.json({ "status": "Mission Accomplished", "hostname": os.hostname() });
});

app.listen(8080, () => {
    console.log("Server:", os.hostname(), " serving at port 8080");
});
