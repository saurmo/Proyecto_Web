const ServicePG = require("../services/postgres");

let validateUser = (user) => {
  if (!user) {
    throw {
      ok: false,
      mensaje: "La información de la persona es obligatoria.",
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

let saveUser = async (user) => {
  let _service = new ServicePG();
  let sql = `INSERT INTO public.users(
              id, name, lastname, age, email, city, ocupation, role, actions, password)
              VALUES (
                  $1,
                  $2,
                  $3,
                  $4,
                  $5,
                  $6,
                  $7,
                  $8,
                  TRUE,
                  md5($9)
                  );`;
                
  let values = [
    user.id,
    user.name,
    user.lastname,
    user.age,
    user.email,
    user.city,
    user.ocupation,
    user.role,
    user.password,
  ];

  let answer = await _service.runSql(sql, values);
  return answer;
};

let viewUser = async () => {
  let _service = new ServicePG();
  let sql = `SELECT users.id, users.name, users.lastname, users.age, users.email, users.city, users.ocupation, roles.name as "rol", users.actions FROM users INNER JOIN roles on users.role = roles.id;`;
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

let deleteUser = (id) => {
  let _service = new ServicePG();
  let sql = `DELETE FROM users WHERE id = $1`;
  let values = [id]
  let answer = _service.runSql(sql, values);
  return answer;
};

let editUser = async (user, id) => {
  let _service = new ServicePG();
  let sql = `UPDATE users set name = $1,
                 lastname = $2,
                 age = $3,
                 email = $4,
                 city = $5,
                 ocupation = $6,
                 role = $7,
                 actions = TRUE,
                 password = $8,
                 WHERE id= $9`;

  let values = [
    user.name,
    user.lastname,
    user.age,
    user.email,
    user.city,
    user.ocupation,
    user.role,
    user.password,
    id
  ]
  let answer = await _service.runSql(sql, values);
  return answer;
};
module.exports = {
  validateUser,
  saveUser,
  consultUsers,
  consultUser,
  deleteUser,
  editUser,
  viewUser
};
