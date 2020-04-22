const express = require("express");
const router = express.Router();
const _controller = require('../controllers/authentication');

//MIDDLEWARE
router.use((req,res, next)=>{
    try {
        let url = req.url;
        if(url === '/login'){
            next();
        }else{
            let token = req.headers.token;
            let verify = _controller.validateToken(token);
            next();

        }

    } catch (error) {
        res.status(401).send({ok: false, info: error, message: 'No autenticado'});
    }
});

router.post("/login", (req, res) => {
    try {
        let body = req.body;
        _controller.validateData(body)
        _controller.consultUser(body).then(answerDB => {
            let user = answerDB.rowCount > 0 ? answerDB.rows[0] : undefined
            if(user){
                let token = _controller.generateToken(user);
                res.status(200).send({ ok: true, info: token, message: "Persona autenticada" });
            }else{
                res.status(400).send({ok: false, info:{}, message: 'Documento y/o clave incorrecta.'});
            }
          })
          .catch(error => {
            res.status(500).send(error);
        });
    } catch (error) {
        res.status(400).send(error);
    }

    
    
  });
  


module.exports = router;
