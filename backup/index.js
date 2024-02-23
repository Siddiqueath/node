import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello')
})  

app.get('/movielist', (req, res) => {
    res.send({
        message: 'Assessment Fetched Successfully..!',
        data: 'hi'
      });
})

app.listen(3000, () => console.log('server running on port 3000'))