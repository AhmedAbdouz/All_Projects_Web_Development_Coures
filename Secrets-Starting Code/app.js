//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const md5 = require("md5");
const bcrypt = require("bcrypt");
const saltrounds = 10;
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const findOrCreate = require("mongoose-findorcreate");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
    secret: "thisisalongstingsecretformyprojectdon'thackit",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


// mongoose.connect("mongodb+srv://ahmedz:123@cluster0.q1lkb.mongodb.net/PostsDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect("mongodb://localhost:27017/usersDB", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);
const userSchema = new mongoose.Schema({ email: String, password: String, googleId: String, secret: String });
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// userSchema.plugin(encrypt, { secret: process.env.SECRETS, encryptedFields: ["password"] });

const User = mongoose.model("User", userSchema);
passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/secret",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function(err, user) {
            return cb(err, user);
        });
    }
));


passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "https://localhost:3000/auth/facebook/secrets"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ facebookId: profile.id }, function(err, user) {
            return cb(err, user);
        });
    }
));


app.get("/", function(req, res) {
    res.render("home");
});

app.get("/login", function(req, res) {
    res.render("login");
});

app.get("/register", function(req, res) {
    res.render("register");
});

app.get("/secrets", function(req, res) {
    User.find({ "secret": { $ne: null } }, function(err, foundusers) {
        if (err)
            console.log(err);
        else
            res.render("secrets", { userswithsecrets: foundusers });
    })
});

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});
app.get("/submit", function(req, res) {
    if (req.isAuthenticated) {
        res.render("submit")
    } else {
        res.redirect("/login");
    }
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/auth/google/secret',
    passport.authenticate('google', {
        successRedirect: '/secrets',
        failureRedirect: '/login'
    })
);

app.get('/auth/facebook',
    passport.authenticate('facebook'));

app.get('/auth/facebook/secrets',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/secrets');
    }
);

app.post("/register", function(req, res) {
    User.register({ username: req.body.username }, req.body.password, function(err, user) {
        if (err)
            console.log(err);
        else
            passport.authenticate("local")(req, res, function() {
                res.redirect("secrets")
            });
    });
    // bcrypt.hash(req.body.password, saltrounds, function(err, hash) {
    //     console.log(hash);
    //     const newuser = new User({ email: req.body.username, password: hash });
    //     newuser.save(function(err) {
    //         res.render('secrets');
    //         console.log("successfully registered !!");
    //     });
    // });

});

app.post("/login", function(req, res) {
    const user = new User({ username: req.body.username, password: req.body.password });
    req.login(user, function(err) {
        if (err)
            console.log(err);
        else
            passport.authenticate("local")(req, res, function() {
                res.redirect("secrets")
            });
    });
    // User.findOne({ email: req.body.username }, function(err, foundUser) {
    //     if (err)
    //         console.log(err);
    //     else if (foundUser) {
    //         bcrypt.compare(req.body.password, foundUser.password, function(err, result) {
    //             if (result)
    //                 res.render("secrets");
    //             else
    //                 console.log("not a registered user");
    //         });
    //     }
    // });
});

app.post("/submit", function(req, res) {
    User.findById(req.user.id, function(err, founduser) {
        if (err)
            console.log(err);
        else {
            founduser.secret = req.body.secret;
            founduser.save();
            res.redirect("/secrets");
        }
    })
})

app.listen(4000, function() {
    console.log("server is tired from running");
});