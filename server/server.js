var http = require('http')

var server = http.createServer()

server.on('request', (req, res) => {
    if(req.url === '/'){
        res.status=400
        res.end('hello')
    }
    if(req.url === '/302') {
        res.writeHeader( 302, {'Location': "https://google.com"})
        res.end()
    }
})



server.listen(3000)
console.log('serve listining at port 3000')