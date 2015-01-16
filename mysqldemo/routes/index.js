
/*
 * GET home page.
 */

exports.main = function(req, res){
    console.log(req.session.user);

    if(!req.session.user){
        req.session.error='请先登录';
        res.redirect('/');
    }else{

        res.render('main', { title: 'index' });
    }

};

exports.login = function(req,res){
    res.render("login",{title:'login'});
};
exports.doLogin = function(req, res){
    var mysql = require('mysql');

    var conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '465864',
        database:'li',
        port: 3306
    });
    conn.connect();
    var user = req.body.username;
    var pwd = req.body.password;

    var selectSQL = "select * from t_user where name = '"+user+"' and password = '"+pwd+"'";
    conn.query(selectSQL,function (err, data) {
        if (err) console.log(err);

        console.log("SELECT ==> "+data);
        if(data==""||data==null){
           req.session.error='用户名或密码不正确';
            res.redirect('/');
        }else{
            req.session.user = data[0].name;
            welcome = data[0].nickname;
            //res.locals.welcomer=data[0].id;
            res.redirect('/main');
        }
    });
    conn.end();

};
exports.check = function(req,res){
   // var queryObj = {userName: req.params.userName};
    console.log(req.body.userName+"--------------------------");
}