const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();

// below is the express static middleware
app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
