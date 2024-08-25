const express = require('express')

const app = express();
const port = 3001;

app.get('/api/user', () => {
    return 'user'
})

app.listen(port, () => {
    console.log(`Listen: http://localhost:${port}`);
});
