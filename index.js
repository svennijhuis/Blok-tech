const express = require('express');
const app = express();
const port = 3000;
//Loads the handlebars module
const handlebars = require('express-handlebars');
//Sets our app to use the handlebars engine
app.set('view engine', 'hbs');
//Sets handlebars configurations (we will go through them later on)
app.engine(
	'hbs',
	handlebars.engine({
		layoutsDir: `${__dirname}/views/layouts`,
		extname: 'hbs',
		defaultLayout: 'index',
	})
);

require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@schoolproject.fn6hb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
let userCollection;
// connect database
client.connect(err => {
	// fill user collection
	userCollection = client.db('userInfo').collection('users');
	console.log('connection made');
});

// css-img
app.use(express.static('static'));
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true }));

app.post('/createUser', (req, res) => {
	console.log(req.body);
	const name = req.body.name;
	const surname = req.body.surname;
	const mail = req.body.mail;
	const streetnameAndNumber = req.body.streetnameAndNumber

	userCollection.insertOne({ name: name, surname: surname, mail: mail, streetnameAndNumber: streetnameAndNumber });
});

// home
app.get('/',  (req, res) => {
	res.render('main');
});
// about
app.get('/about', async (req, res) => {
	const users = await userCollection.find().toArray();
	console.log(users);
	res.render('about', { users: users });
});

app.get('*', (req, res) => {
	res.render('errors');
});

app.listen(port, () => console.log(`App listening to port ${port}`));



