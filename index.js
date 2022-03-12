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
// 	res.redirect('/algemeen')
// });

// // home
// app.get('/',  (req, res) => {
// 	res.render('main');
// });
// // algemeen
// app.get('/algemeen', async (req, res) => {
// 	const users = await userCollection.find().toArray();
// 	console.log(users);
// 	res.render('algemeen', { users, image: req.file });
// });

// app.get('*', (req, res) => {
// 	res.render('errors');
// });

// app.listen(port, () => console.log(`App listening to port ${port}`));

const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.port;
// .env
require('dotenv').config();

// voegt de image toe aan de map uploads
const multer = require('multer');
// const upload = multer({ dest: 'static/uploads/' })
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'static/uploads');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '.png');
	},
});
const upload = multer({
	storage,
});

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

// static info
// app.use(express.static('static'));
app.use(express.static(__dirname + '/static'));

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// form
app.post('/createUser', upload.single('image'), async (req, res, next) => {
	const { name, surname, mail, streetnameAndNumber, city, Postal, HourlyRate, monday, tuesday, wednesday, thursday, friday, saturday, sunday, WieBenIk } = req.body;
	await userCollection.insertOne({
		name: name,
		surname: surname,
		mail: mail,
		streetnameAndNumber: streetnameAndNumber,
		city: city,
		Postal: Postal,
		HourlyRate: HourlyRate,
		monday: monday,
		tuesday: tuesday,
		wednesday: wednesday,
		thursday: thursday,
		friday: friday,
		saturday: saturday,
		sunday: sunday,
		WieBenIk: WieBenIk,
		image: `uploads/${req.file.filename}`,
	});
	res.redirect('/algemeen');
});

// delete gebruiker
app.post('/deleteUser', (req, res) => {
	// userCollection.findOne({id: req.body._id}, (err, item) => {
	// 	const path = `static/${item.image}`
	// 	console.log(item);
	// 	fs.unlink(path, (err) =>{
	// 		console.log(err);
	// 	})
	// } );
	userCollection.deleteOne({ id: req.body._id });
	res.redirect('/algemeen');
});

// aanmeld pagina
app.get('/', (req, res) => {
	res.render('main');
});
// algemeen - algemene pagina
app.get('/algemeen', async (req, res) => {
	const users = await userCollection.find().toArray();
	// console.log(users);
	res.render('algemeen', { users });
});

// error pagina
app.get('*', (req, res) => {
	res.render('errors');
});

app.listen(port, () => console.log(`App listening to port ${port}`));
