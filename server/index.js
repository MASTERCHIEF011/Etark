import http from 'http'
import app from './app.js'

const server = http.createServer(app);

const PORT = process.env.PORT || 5000

// server listening 
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});