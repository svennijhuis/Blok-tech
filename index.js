// const express = require('express');
// const app = express();
// const port = 3000;
// require('dotenv').config()

// //Loads the handlebars module
// const handlebars = require('express-handlebars');
// //Sets our app to use the handlebars engine
// app.set('view engine', 'hbs');
// //Sets handlebars configurations (we will go through them later on)
// app.engine(
// 	'hbs',
// 	handlebars.engine({
// 		layoutsDir: `${__dirname}/views/layouts`,
// 		extname: 'hbs',
// 		defaultLayout: 'index',
// 	})
// );

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@schoolproject.fn6hb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// let userCollection;
// // connect database
// client.connect(err => {
// 	// fill user collection
// 	userCollection = client.db('userInfo').collection('users');
// 	console.log('connection made');
// });

// // css-img
// app.use(express.static('static'));
// app.use(express.json()); //Used to parse JSON bodies
// app.use(express.urlencoded({ extended: true }));

// app.post('/createUser', (req, res) => {
// 	console.log(req.body);
// 	const { name, surname, mail, streetnameAndNumber, image } = req.body;
// 	userCollection.insertOne({ name: name, surname: surname, mail: mail, streetnameAndNumber: streetnameAndNumber, image:image });
// 	res.redirect('/about')
// });

// // home
// app.get('/',  (req, res) => {
// 	res.render('main');
// });
// // about
// app.get('/about', async (req, res) => {
// 	const users = await userCollection.find().toArray();
// 	console.log(users);
// 	res.render('about', { users, image: req.file });
// });

// app.get('*', (req, res) => {
// 	res.render('errors');
// });

// app.listen(port, () => console.log(`App listening to port ${port}`));



const express = require('express');
const app = express();
const port = 3000;
// .env
require('dotenv').config()
// image
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })



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

// connect
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


// form
app.post('/createUser', upload.single('image'), (req, res, next) => {
	console.log(req.body);
	const { name, surname, mail, streetnameAndNumber } = req.body;
	userCollection.insertOne({ name: name, surname: surname, mail: mail, streetnameAndNumber: streetnameAndNumber });
	res.redirect('/about')
});

app.post('/deleteUser', (req, res) => {
	console.log(req.body);
	const { name, surname, mail, streetnameAndNumber } = req.body;
	userCollection.deleteOne({ name: name, surname: surname, mail: mail, streetnameAndNumber: streetnameAndNumber });
	res.redirect('/about')
});


app.post('/createUser', upload.single('image'), function (req, res, next) {
	req.file
  })

// home
app.get('/',  (req, res) => {
	res.render('main');
});
// about
app.get('/about', async (req, res) => {
	const users = await userCollection.find().toArray();
	console.log(users);
	res.render('about', { users, image: req.file });
});
// error
app.get('*', (req, res) => {
	res.render('errors');
});




app.listen(port, () => console.log(`App listening to port ${port}`));