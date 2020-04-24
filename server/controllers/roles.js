
const ServicePG = require("../services/postgres");


let validateRole = role => {
  if (!role) {
    throw {
      ok: false,
      mensaje: "La información del rol es obligatoria."
    };
  }

  if (!role.name) {
    throw { ok: false, mensaje: "El nombre es obligatorio." };
  }

};

let saveRole = async role => {
  let _service = new ServicePG();
  let sql = `INSERT INTO public.roles(
              name, description, actions)
              VALUES (
                  $1,
                  $2,
                  TRUE);`;

  let values = [
    role.name,
    role.description
  ]
  let answer = await _service.runSql(sql, values);
  return answer;
};

let consultRoles = async () => {
  let _service = new ServicePG();
  let sql = `SELECT * FROM roles`;
  let answer = await _service.runSql(sql);
  return answer;
};

let consultRole = async (id) => {
  let _service = new ServicePG();
  let sql = `SELECT * FROM roles WHERE id = '${id}'`;
  let answer = await _service.runSql(sql);
  return answer;
};

let deleteRole = id => {
    let _service = new ServicePG();
    let sql = `DELETE FROM roles WHERE id= $1`;
    let values = [
      id
    ]
    let answer = _service.runSql(sql, values);
    return answer;
};

let editRole = async (role, id) => {
    let _service = new ServicePG();
    let sql = `UPDATE roles set name = $1,
                 description = $2,
                 actions = TRUE WHERE id = $3`;

    let values = [
      role.name,
      role.description,
      id
    ]
    let answer = await _service.runSql(sql, values);
    return answer;
};
module.exports = { validateRole,
                    saveRole,
                    consultRoles,
                    consultRole,
                    deleteRole,
                    editRole };
