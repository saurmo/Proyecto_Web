
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
                  '${role.name}',
                  '${role.description}',
                  TRUE);`;
  let answer = await _service.runSql(sql);
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
    let sql = `DELETE FROM roles WHERE id='${id}'`;
    let answer = await _service.runSql(sql);
    return answer;
};

let editRole = async (role, id) => {
    let _service = new ServicePG();
    let sql = `UPDATE roles set name = '${role.name}',
                 description = ${role.description},
                 actions = TRUE WHERE id='${id}'`;
    let answer = await _service.runSql(sql);
    return answer;
};
module.exports = { validateRole,
                    saveRole,
                    consultRoles,
                    consultRole,
                    deleteRole,
                    editRole };
