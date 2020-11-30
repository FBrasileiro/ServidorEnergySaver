const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DB_REMOTO

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useFindAndModify:true,
    useUnifiedTopology: true 
}).then(console.log("DB connected"));

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Running on port ${process.env.PORT}`);
});