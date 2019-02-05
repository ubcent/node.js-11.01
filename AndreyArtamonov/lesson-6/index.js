const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const consolidate = require('consolidate');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use('/assets', express.static('./static'));

app.use(cookieSession({
    name: 'session',
    keys: ['secret key'],
}));
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: false}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/homework-6', {
    useNewUrlParser: true,
});

passport.use('signin', new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({username}).lean();

    if (!user) {
        return done(null, false);
    }

    if (User.createHash(password) === user.password) {
        delete user.password;
        return done(null, user);
    }

    return done(null, false);
}))

passport.use('signup', new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({username}).lean();

    if (user) {
        return done(null, false);
    } else {
        const newUser = new User({
            username,
            password: User.createHash(password),
        })

        newUser.save((err) => {
            return done(null, newUser);
        });
    }
}))

passport.serializeUser((user, done) => {
    return done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id).lean();

    return done(null, user);
})

app.get('/', (req, res) => {
    if (req.user) {
        return res.redirect('/profile/');
    }

    return res.render('form', {
        title: 'Sign in to My app',
        button: 'Sign in',
        goToSignUpPage: true,
    })
})

const authHandlerLogin = passport.authenticate('signin', {
    successRedirect: '/profile/',
    failureRedirect: '/',
})

app.post('/', authHandlerLogin);

app.get('/join/', (req, res) => {
    return res.render('form', {
        title: 'Join my app',
        button: 'Create an account',    
    })
})

const authHandlerSingUp = passport.authenticate('signup', {
    successRedirect: '/profile/',
    failureRedirect: '/join/',
})

app.post('/join/', authHandlerSingUp);

const mustBeAuthenticated = (req, res, next) => {
    if (req.user) {
        return next();
    }

    return res.redirect('/');
}

app.all('/profile/', mustBeAuthenticated);
app.all('/profile/*', mustBeAuthenticated);

app.get('/profile/', (req, res) => {
    const {
        created,
        updated,
        ...fields
    } = req.user;

    return res.render('profile', {
        ...fields,
        created: created.toDateString(),
        updated: updated.toDateString(),
    })
})

app.get('/profile/change/', (req, res) => {
    const {
        created,
        updated,
        ...fields
    } = req.user;

    return res.render('profile-change', {
        ...fields,
        created: created.toDateString(),
        updated: updated.toDateString(),
    })
})

app.post('/profile/change/', (req, res) => {
    const updatedFields = {
        updated: Date.now()
    };
    const _id = req.body._id;

    for (let key in req.body) {
        if (key === '_id') continue;
        if (req.body[key]) {
            updatedFields[key] = req.body[key];
        };
    }

    User.updateOne({_id}, updatedFields, (err, res) => {
        if (err) throw err;
    })
    
    return res.redirect('/profile/');
})

app.get('/logout/', function(req, res){
    req.logout();
    return res.redirect('/');
})

app.listen(8888);