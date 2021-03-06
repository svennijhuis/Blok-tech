const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
// .env
require('dotenv').config();

// voegt de image toe aan de map uploads
const multer = require('multer');
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'static/uploads');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '.jpg');
	},
});
const upload = multer({
	storage,
});

//Loads the handlebars module
const handlebars = require('express-handlebars');
//Sets our app to use the handlebars engine
app.set('views', './views')
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
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
app.use(express.static(__dirname + '/static'));

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// form aanmelden
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
app.post("/deleteUser", async (req, res) => {

	await client.connect()

	client.db('userInfo').collection('users').deleteOne({ name: req.body.button });
  
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


