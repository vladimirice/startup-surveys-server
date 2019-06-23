const express = require('express');

const app = express();

// @ts-ignore
app.get('/', (req, res) => {
  res.send({
    success: 'almost done and live update',
  });
});

app.listen(process.env.PORT);

export {};
