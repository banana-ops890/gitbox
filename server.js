const http = require('http');
const fs = require('fs');
const path = require('path');

// Railway tells us what port to use via process.env.PORT
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
    // Default to index.html for the root path
    let filePath = req.url === '/' ? './index.html' : '.' + req.url;
    let extname = path.extname(filePath);
    let contentType = extname === '.js' ? 'text/javascript' : 'text/html';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(404);
            res.end('File not found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}).listen(PORT, () => {
    console.log(`GitBox platform running live on port ${PORT}`);
});
