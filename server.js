const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection')
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser')
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
app.use(cors())
connectDb();
app.use(express.json());
app.use(cookieParser());
app.use('/api/project', require('./routes/projectRoutes'));
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler);

app.listen(port, () => {console.log(`listening at ${port}`)});
