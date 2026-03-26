const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;

const server = http.createServer((req, res) => {

    // rotas do site
    const routes = {
        '/': 'index.html',
        '/pagina1': 'pagina1.html',
        '/pagina2': 'pagina2.html',
        '/pagina3': 'pagina3.html',
        '/pagina4': 'pagina4.html',
        '/pagina5': 'pagina5.html'
    };

    let fileName = routes[req.url];

    if (!fileName) {
        fileName = 'index.html';
    }

    const filePath = path.join(__dirname, 'public', fileName);
    fs.readFile(filePath, (err, data) => {

        if (err) {
            const indexPath = path.join(__dirname, 'public', 'index.html');

            fs.readFile(indexPath, (err2, data2) => {
                if (err2) {
  
                    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end('<h1>Erro crítico no servidor</h1>');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end(data2);
                }
            });

        } else {

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});