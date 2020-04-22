const ServicePG = require("../services/postgres");
const jwt = require('jsonwebtoken');

const SECRET_KEY = '746f4325c687b8823db156b7c9e98dd665a1e3777f501997345b19d9bd99e118754928e78011b5b1bfd66482a17f87bab58bd0d4311f8a9141359a42ddfea07f'

let validateData = (user) => {
  if (!user) {
    throw {
      ok: false,
      mensaje: "La información es obligatoria.",
    };
  }

  if (!user.id) {
    throw { ok: false, mensaje: "La cédula es obligatoria." };
  }
  if (!user.password) {
    throw { ok: false, mensaje: "La clave es obligatoria." };
  }

}

//Consultar usuario con documento y clave
let consultUser = async (user) => {
    let _service = new ServicePG();
    let sql = `SELECT * FROM users WHERE id = '${user.id}' AND password = '${user.password}'`;
    let answer = await _service.runSql(sql);
    return answer;
  };

  let generateToken = (user) =>{
    delete user.password;
    let token = jwt.sign(user, SECRET_KEY, {expiresIn: "2h"});
    return token;
  }

  let validateToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
  }

module.exports = { validateData, consultUser, generateToken, validateToken };
