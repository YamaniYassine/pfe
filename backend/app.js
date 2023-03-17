const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = process.env.PORT;
const dbURI = process.env.DATABASE;

// import routes
const userRouter = require('./routes/user');

// DB connection
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const status = mongoose.connection;
status.on('error', console.error.bind(console, 'error'));
status.once('open', () => { 
  console.log('mongoDB connected!');
});

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// route middleware
app.use('/user', userRouter);

// // ERROR HANDLING
// app.use((err, req, res, next) => {
//   if (err instanceof ValidationError) {
//     res.status(400).json({ error: err.message });
//   } else {
//     console.error(err.stack);
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// });


app.get('/', (req, res) => {
  res.send('Nodeserver working');
});

app.listen(port, () => {
  console.log('app working on port:', port);
});

module.exports = app;