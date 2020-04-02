const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const user = require('./model/users');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const cookieParser= require('cookie-parser');
//user for session coookie and auth
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);

app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.static('./assets'));

app.use(expressLayouts);    //Calling layouts before routes so that layouts can be applied to every page.
app.set('layout extractStyles',true);   //to position the styles of pages and layouts at place automatically
app.set('layout extractScripts',true);  //to position the scripts-styles of pages and layouts at place automatically


app.set('view engine','ejs');
app.set('views','./views');

//session cookie maintaining
app.use(session({
    name: 'Codeial',
    //TODO--> need to change secret before deployment
    secret: 'anything',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: new MongoStore(  
        {   
            mongooseConnection: db,
            autoRemove: 'disabled'

        },
        function(err){
            console.log(err || 'connect-mongo setup run successful!!');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//MVC arch followed, any requests(GET/POST) redirects to routes folder to index.js in it
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error running the server on port ${port}`);
    }
    console.log(`Server running good on port No. ${port}`);
})
