const express = require('express');
const app = express();
const port = 3000;
//Loads the handlebars module
const handlebars = require('express-handlebars');
//Sets our app to use the handlebars engine
app.set('view engine', 'hbs');
//Sets handlebars configurations (we will go through them later on)
app.engine('hbs', handlebars.engine({
layoutsDir: `${__dirname}/views/layouts`,
extname: 'hbs',
defaultLayout: 'index'
}));

// css-img
app.use(express.static('static'))

// home
app.get('/', (req, res) => {
res.render('main');
});
// about
app.get('/about', (req, res) => {
  res.render('about');
  });


app.get('*', (req, res) => {
  res.render('errors');
});

app.listen(port, () => console.log(`App listening to port ${port}`));



