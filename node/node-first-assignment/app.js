const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    const users = ['José', 'Amancio', 'Teodoro'];
    if (url === '/') {
        res.write('<html><head>');
        res.write('<title>Hello there</title></head>');
        res.write('<body>');
        res.write('<form action="/create-user" method="POST">');
        res.write('<input type="text" name="username" />');
        res.write('<button type="submit">Save</button>');
        res.write('</form></body>');
        res.write('</html>')
        return res.end();
    };
    if (url === '/users') {
        res.write('<html><head>');
        res.write('<title>Hello there</title></head>');
        res.write('<body><h1>Users</h1><ul>');
        users.forEach((user) => {
            res.write(`<li>${user}</li>`);
        });
        res.write('</ul></body></html>')
        return res.end();
    };
    if (url === '/create-user' && method === 'POST') {
        const dataContent = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            dataContent.push(chunk);
        });
        return req.on('end', () => {
            const parsedData = Buffer.concat(dataContent).toString();
            console.log(parsedData);
            const username = parsedData.split('=')[1];
            console.log(username);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });

    };

});

server.listen(3000);