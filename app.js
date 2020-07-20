const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const helmet = require("helmet");
const morgan = require('morgan')
const { Url } = require('./models/url');
const config = require('./config');
const urlApi = require('./api/routes/url')

require('dotenv').config()
const app = express();
mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())


app.use((req, res, next) => {
   if(req.subdomains === 'www') {
     res.redirect(301, `https://${req.headers.host}${req.url}`);
   }
   next();
});

app.use('/api', urlApi);

app.get('/', (req, res) => {
    return res.status(200).render('home.ejs')
})

app.get('/:id', async (req, res, next) => {
    try{
        let { id: hash } = req.params;
        url = await Url.findOne({ hash: hash })
        if(!url){
            error = new Error("url not found... :/");
            error.status = 404;
            throw error;
        }
        console.log(url.url)
        return res.redirect(301, url.url);
    }catch(error){
        console.log(error)
        next(error);
    }
})

app.use('/api', function (error, req, res, next) {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        message: error.message,
    });
});

app.use(function (error, req, res, next) {
    const statusCode = error.status || 500;
    return res.status(statusCode).render('error.ejs',{
        errorMessage: error.message,
        errorCode: statusCode
    });
});


module.exports = app;