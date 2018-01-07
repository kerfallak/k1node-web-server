const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getFullYear', ()=>{
  return new Date().getFullYear();
});

app.use((req, res, next)=>{
    var time = new Date().toString();

    var log = `${time}: ${req.method} ${req.url} \n`;
    fs.appendFile('server.log', log, (err)=>{
        if(err){
            console.log('unable to write to log file');
        }
    });

    next();
});


hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

app.get('/', (req, res)=>{
    res.render('home.hbs', {
        title: 'Dynamic Home page',
        content: 'this is a dynamic home page'
    });

});

app.get('/about', (req, res)=>{
 res.render('about.hbs', {
     title: 'Dynamic About page',
     content: 'this is a dynamic about page'
 });
});

app.get('/bad', (req, res)=>{
    res.send({
        errorMessage: 'Bad Request',
        StatusCode: 404
    });
})

app.listen(port, ()=>{
    console.log(`listening to port ${port}`);
});