const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require('bcryptjs');

router.get("/admin/users", (req, res) =>{
	//res.send("Listagem de usuarios");
	User.findAll().then(users => {
		res.render("admin/users/index",{users: users});
	});
});

router.get("/admin/users/create",(req, res) => {
	res.render("admin/user/create");
});

router.post("/users/create", (req, res) => {
	var email = req.body.email;
	var password = req.body.password;


	User.findOne({where:{email: email}}).then(user => {
		if(user == undefined){
				var salt = bcrypt.genSaltSync(10);
				var hask = bcrypt.hashSync(password, salt);

				User.create({
					email: email,
					password: hash
				}).then(() =>{
					res.redirect("/");
				}).cath((err) => {
					res.redirect("/");
				});

		}else{
			res.redirect("/admin/users/create");
			res.send("email invalido");
		}
	});

	//res.json({email, hash});
});

router.post("/users/delete", (req, res) => {
    var email = req.body.email;
    if(email != undefined){
        if(!isNaN(id)){
            User.destroy({
                where: {
                    email: email
                }
            }).then(() => {
                res.redirect("/admin/users");
            });
        }else{// NÃO FOR UM NÚMERO
            res.redirect("/admin/users");
        }
    }else{ // NULL
        res.redirect("/admin/users");
    }
});

router.get("/login", (req, res) => {
	res.render("admin/users/login");
});

//autenticação
router.post("authenticate", (req, res) => {
	var =req.body.email;
	var = req.body.password;

	User.findOne({ where:{email: email}}).then(user => {
		if(user != undefined){
			//validar senha
			var correct = bcrypt.compareSync(password, user.password);

			if(correct){
				req.session.user = {
					id: user.id,
					email: user.email
				}
			}else{
				res.redirect("/login");
			}
		}else{
			res.redirect("/login");
		}
	});
});

//desconectar
router.get("/logout", (req, res) => {
	req.session.user = undefined
	res.redirect("/");
})

module.exports = router;