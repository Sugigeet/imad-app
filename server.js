var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
 'article-one' : {
    title : 'Article One | Suganya Koteeswaran',
    heading : 'Article One',
    date : '20 Feb 2018',
    content :
    `
                <p>
                    This is my content for article one
                </p>
                <p>
                    This is my content for article one
                </p>
                <p>
                    This is my content for article one
                </p>`
    
},

 'article-two' : {
    title : 'Article Two | Suganya Koteeswaran',
    heading : 'Article Two',
    date : '20 Feb 2018',
    content :
    `
                <p>
                    This is my content for article two
                </p>
                <p>
                    This is my content for article two
                </p>
                <p>
                    This is my content for article two
                </p>`
    
},

 'article-three' : {
    title : 'Article Three | Suganya Koteeswaran',
    heading : 'Article Three',
    date : '20 Feb 2018',
    content :
    `
                <p>
                    This is my content for article three
                </p>
                <p>
                    This is my content for article three
                </p>
                <p>
                    This is my content for article three
                </p>`
    
}

};

function createTemplate(data)
{
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    var htmltemplate = 
        `
        <html>
        <head>
            <title>
               ${title}
            </title>
            <link href="/ui/style.css" rel="stylesheet" />
            <meta name = "viewport" content = "width=device-width, initial-scale=1.0">
        </head>
        <body>
            <div class = "container">
                <div>
                    <a href="/">Home</a>
                    <hr/>
                </div>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date}
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>`;
    
    return htmltemplate;
    
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
  res.send(counter.toString());
});

app.get('/:articleName',function(req, res){
// articleName == article-one
//articles[articleName] == {} Content object for article one
var articleName = req.params.articleName;
res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
