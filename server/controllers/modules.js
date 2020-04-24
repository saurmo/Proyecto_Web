
const ServicePG = require("../services/postgres");


let validateModule = module => {
  if (!module) {
    throw {
      ok: false,
      mensaje: "La información del módulo es obligatoria."
    };
  }

  if (!module.name) {
    throw { ok: false, mensaje: "El nombre es obligatorio." };
  }

};

let saveModule = async module => {
  let _service = new ServicePG();
  let sql = `INSERT INTO public.modules(
              name, description, actions)
              VALUES (
                  $1,
                  $2,
                  TRUE);`;
  
  let values = [
    module.name,
    module.description
  ]
  let answer = await _service.runSql(sql, values);
  return answer;
};

let consultModules = async () => {
  let _service = new ServicePG();
  let sql = `SELECT * FROM modules`;
  let answer = await _service.runSql(sql);
  return answer;
};

let consultModule = async (id) => {
  let _service = new ServicePG();
  let sql = `SELECT * FROM modules WHERE id = '${id}'`;
  let answer = await _service.runSql(sql);
  return answer;
};

let deleteModule = id => {
    let _service = new ServicePG();
    let sql = `DELETE FROM modules WHERE id = $1`;

    let values = [id]
    let answer = _service.runSql(sql, values);
    return answer;
};

let editModule = async (module, id) => {
    let _service = new ServicePG();
    let sql = `UPDATE modules set name = $1,
                 description = $2,
                 actions = TRUE WHERE id=$3`;

    let values = [
      module.name,
      module.description,
      id
    ]
    let answer = await _service.runSql(sql, values);
    return answer;
};
module.exports = { validateModule,
                    saveModule,
                    consultModules,
                    consultModule,
                    deleteModule,
                    editModule };
