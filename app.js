const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});

app.get('/', (req, res) => {
    res.render('index')
})