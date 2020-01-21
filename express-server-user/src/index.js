const express = require('express');
const mongoose = require('mongoose');
const router = require('./routers/export-router');
require('dotenv').config({ path: './config/dev.env' });

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
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
