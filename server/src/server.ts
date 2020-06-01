import express from 'express';

const app = express();

app.get('/users', (request, response) => {
  return response.json({
    message: 'hello world',
  });
});

app.listen(3333, () => {
  console.log('server on !!!');
});
