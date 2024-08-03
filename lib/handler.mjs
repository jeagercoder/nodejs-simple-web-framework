




export function NotFoundHandler(req, res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('not found')
}


export function MethodNotAllowdHandler(req, res) {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('method not allowed')
}