var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var bodyParser = require("body-parser");

var index = require("./routes/index");
var users = require("./routes/users");
var main = require("./routes/main");
var ftpAccess = require("./routes/ftpAccess");
var fileAccess = require("./routes/fileAccess");
var login = require("./routes/login");
var sessionpage = require("./routes/session");
var roler = require("./routes/roler");
var rule = require("./routes/rule");
var shareBonde = require('./routes/shareBonde');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(path.join(__dirname, "public")));

// 设置 session 的可选参数
app.use(
    session({
        secret: "recommand 128 bytes random string", // 建议使用 128 个字符的随机字符串
        cookie: { maxAge: 8 * 60 * 60 * 1000 }
    })
);

//设置session校验，对所有的请求都进行session验证，没有登录的都返回登录界面
app.use(function(req, res, next) {
    if (req.session.loginUser) {
        next();
    } else {
        if (
            req.path == "/login" ||
            req.path == "/users/getAvailableUsersNames" ||
            req.path == "/users/valitPassword"
        ) {
            next();
        } else {
            res.redirect("/login");
        }
    }
});

app.use("/", index);
app.use("/users", users);
app.use("/login", login);
app.use("/main", main);
app.use("/ftpAccess", ftpAccess);
app.use("/fileAccess", fileAccess);
app.use("/session", sessionpage);
app.use("/roler", roler);
app.use("/rule", rule);
app.use("/index", index);
app.use("/shareBonde", shareBonde);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;