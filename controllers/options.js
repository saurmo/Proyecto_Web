
const ServicePG = require("../services/postgres");


let validateOption = option => {
  if (!option) {
    throw {
      ok: false,
      mensaje: "La información del permiso es obligatoria."
    };
  }

  if (!option.name) {
    throw { ok: false, mensaje: "El nombre es obligatorio." };
  }

};

let saveOption = async option => {
  let _service = new ServicePG();
  let sql = `INSERT INTO public.options(
              name, description, role, module, actions)
              VALUES (
                  '${option.name}',
                  '${option.description}',
                  '${option.role}',
                  '${option.module}',
                  TRUE);`;
  let answer = await _service.runSql(sql);
  return answer;
};

let consultOptions = async () => {
  let _service = new ServicePG();
  let sql = `SELECT * FROM options`;
  let answer = await _service.runSql(sql);
  return answer;
};

let consultOption = async (id) => {
  let _service = new ServicePG();
  let sql = `SELECT * FROM options WHERE id = '${id}'`;
  let answer = await _service.runSql(sql);
  return answer;
};

let deleteOption = id => {
    let _service = new ServicePG();
    let sql = `DELETE FROM options WHERE id='${id}'`;
    let answer = await _service.runSql(sql);
    return answer;
};

let editOption = async (option, id) => {
    let _service = new ServicePG();
    let sql = `UPDATE options set name = '${option.name}',
                 description = ${option.description},
                 role = ${option.role},
                 module = ${option.module},
                 actions = TRUE WHERE id='${id}'`;
    let answer = await _service.runSql(sql);
    return answer;
};
module.exports = { validateOption,
                    saveOption,
                    consultOptions,
                    consultOption,
                    deleteOption,
                    editOption };
