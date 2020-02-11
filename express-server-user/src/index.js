const express = require('express');
const mongoose = require('mongoose');
const router = require('./routers/export-router');
const path = require('path');
require('dotenv').config({ path: './config/' + process.env.ENV + '.env' });
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8080;

// const corsOptions = { origin: `http://localhost:3000/` };
app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, '/public')));
app.use('/users', router.userRouter);
app.use('/pets', router.petRouter);
app.use('/upload', router.fileRouter);

async function start() {
	try {
		await mongoose.connect(process.env.MONGO_DB, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});

		app.listen(port, () => {
			console.log(`server on port ` + port);
		});
	} catch (error) {
		console.log(error);
	}
}

start();
