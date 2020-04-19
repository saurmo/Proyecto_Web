
const ServicePG = require("../services/postgres");


let validateUser = user => {
  if (!user) {
    throw {
      ok: false,
      mensaje: "La información de la persona es obligatoria."
    };
  }

  if (!user.id) {
    throw { ok: false, mensaje: "La cédula es obligatoria." };
  }
  if (!user.name) {
    throw { ok: false, mensaje: "El nombre es obligatorio." };
  }
  if (!user.lastname) {
    throw { ok: false, mensaje: "El apellido es obligatorio." };
  }
};

let saveUser = async user => {
  let _service = new ServicePG();
  let sql = `INSERT INTO public.users(
              id, name, lastname, age, email, city, ocupation, role, actions)
              VALUES (
                  '${user.id}',
                  '${user.name}',
                  '${user.lastname}',
                  '${user.age}',
                  '${user.email}',
                  '${user.city}',
                  '${user.ocupation}',
                   ${user.role},
                  TRUE);`;
  let answer = await _service.runSql(sql);
  return answer;
};

let consultUsers = async () => {
  let _service = new ServicePG();
  let sql = `SELECT * FROM users`;
  let answer = await _service.runSql(sql);
  return answer;
};

let consultUser = async (id) => {
  let _service = new ServicePG();
  let sql = `SELECT * FROM users WHERE id = '${id}'`;
  let answer = await _service.runSql(sql);
  return answer;
};

let deleteUser = id => {
    let _service = new ServicePG();
    let sql = `DELETE FROM users WHERE id='${id}'`;
    let answer = _service.runSql(sql);
    return answer;
};

let editUser = async (user, id) => {
    let _service = new ServicePG();
    let sql = `UPDATE users set name = '${user.name}',
                 lastname = '${user.lastname}',
                 age = ${user.age},
                 email = '${user.email}',
                 city = '${user.city}',
                 ocupation = '${user.ocupation}',
                 role = ${user.role},
                 actions = TRUE WHERE id='${id}'`;
    let answer = await _service.runSql(sql);
    return answer;
};
module.exports = { validateUser,
                    saveUser,
                    consultUsers,
                    consultUser,
                    deleteUser,
                    editUser };
