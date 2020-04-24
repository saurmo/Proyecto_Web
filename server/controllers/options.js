const ServicePG = require("../services/postgres");

let validateOption = (option) => {
  if (!option) {
    throw {
      ok: false,
      mensaje: "La información del permiso es obligatoria.",
    };
  }

  if (!option.name) {
    throw { ok: false, mensaje: "El nombre es obligatorio." };
  }
};

let saveOption = async (option) => {
  let _service = new ServicePG();
  let sql = `INSERT INTO public.options(
              name, description, role, module, actions)
              VALUES (
                  $1,
                  $2,
                  $3,
                  $4,
                  TRUE);`;

  let values = [option.name, option.description, option.role, option.modules];
  let answer = await _service.runSql(sql, values);
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

let deleteOption = (id) => {
  let _service = new ServicePG();
  let sql = `DELETE FROM options WHERE id=$1`;
  let values = [id];
  let answer = _service.runSql(sql, values);
  return answer;
};

let viewOption = async () => {
  let _service = new ServicePG();
  let sql = `SELECT options.id, options.name, options.description, roles.name as "rol", modules."name" as "module", options.actions FROM "options" INNER JOIN roles on options.role = roles.id INNER JOIN modules on options.module = modules.id`;
  let answer = await _service.runSql(sql);
  return answer;
};

let editOption = async (option, id) => {
  let _service = new ServicePG();
  let sql = `UPDATE options set name = $1,
                 description = $2,
                 role = $3,
                 module = $4,
                 actions = TRUE WHERE id = $5`;

  let values = [
    option.name,
    option.description,
    option.role,
    option.modules,
    id,
  ];
  let answer = await _service.runSql(sql, values);
  return answer;
};
module.exports = {
  validateOption,
  saveOption,
  consultOptions,
  consultOption,
  deleteOption,
  editOption,
  viewOption,
};
