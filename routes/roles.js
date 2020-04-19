const express = require("express");
const router = express.Router();

const { validateRole,
    saveRole,
    consultRoles,
    consultRole,
    deleteRole,
    editRole } = require("../controllers/roles");

/**
 * Obtener todos los roles
 */
router.get("/roles", (req, res) => {
    consultRoles()
    .then(answerDB => {
      let records = answerDB.rows;
      res.send({ ok: true, info: records, mensaje: "Roles consultados" });
    
    })
    .catch(error => {
      res.send(error);
    });
    
});

/**
 * Obtener un solo rol
 */
router.get("/roles/:id", (req, res) => {
  let info_role = req.params.id;
  consultRole(info_role)
  .then(answerDB => {
    let records = answerDB.rows;
    res.send({ ok: true, info: records, mensaje: "Rol consultado" });
  
  })
  .catch(error => {
    res.send(error);
  });
  
});

/**
 * Guardar un rol
 */
router.post("/new-role", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let info_role = req.body;

    // Valida la información, si hay un error se envia al catch
    validateRole(info_role);

    // Guardar el rol en base de datos
    saveRole(info_role)
      .then(answerDB => {
        res.send({ ok: true, mensaje: "Rol guardado", info: info_role });
      })
      .catch(error => {
        res.send(error);
      });

    // Responder
  } catch (error) {
    res.send(error);
  }
  
});

/**
 * Eliminar un rol
 */
router.delete("/roles/:id", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let info_role = req.params.id;
  
      // Elimina el rol en base de datos
      deleteRole(info_role)
        .then(answerDB => {
          res.send({ ok: true, mensaje: "Modulo eliminado", info: info_role });
        })
        .catch(error => {
          res.send(error);
        });
  
      // Responder
    } catch (error) {
      res.send(error);
    }
    
  });

  /**
 * Actualizar un rol
 */
router.put("/roles/:id", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let id = req.params.id;
      let info_role = req.body;
  
      // Actualiza el rol en base de datos
      editRole(info_role, id)
        .then(answerDB => {
          res.send({ ok: true, mensaje: "Rol editado", info: info_role });
        })
        .catch(error => {
          res.send(error);
        });
  
      // Responder
    } catch (error) {
      res.send(error);
    }
    
  });

module.exports = router;

