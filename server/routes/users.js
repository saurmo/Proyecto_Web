const express = require("express");
const router = express.Router();

const { validateUser,
  saveUser,
  consultUsers,
  consultUser,
  deleteUser,
  editUser,
  viewUser } = require("../controllers/users");

/**
 * Obtener todos los usuarios
 */
router.get("/users", (req, res) => {
  consultUsers()
    .then(answerDB => {
      let records = answerDB.rows;
      res.send({ ok: true, info: records, mensaje: "Usuarios consultados" });
    
    })
    .catch(error => {
      res.send(error);
    });
    
});

/**
 * Obtener inner join de usuarios y roles
 */
router.get("/view-users", (req, res) => {
  viewUser()
    .then(answerDB => {
      let records = answerDB.rows;
      res.send({ ok: true, info: records, mensaje: "Inner join realizado" });
    
    })
    .catch(error => {
      res.send(error);
    });
    
});

/**
 * Obtener un solo usuario
 */
router.get("/users/:id", (req, res) => {
  let info_user = req.params.id;
  consultUser(info_user)
  .then(answerDB => {
    let records = answerDB.rows;
    res.send({ ok: true, info: records, mensaje: "Usuario consultado" });
  
  })
  .catch(error => {
    res.send(error);
  });
  
});

/**
 * Guardar un usuario
 */
router.post("/new-user", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let info_user = req.body;

    // Valida la información, si hay un error se envia al catch
    validateUser(info_user);


    // Guardar la persona en base de datos
    saveUser(info_user)
      .then(answerDB => {
        res.send({ ok: true, mensaje: "Usuario guardado", info: info_user });
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
 * Eliminar un usuario
 */
router.delete("/users/:id", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let info_user = req.params.id;
  
      // Elimina el usuario en base de datos
      deleteUser(info_user)
        .then(answerDB => {
          res.send({ ok: true, mensaje: "Usuario eliminado", info: info_user });
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
 * Actualizar un usuario
 */
router.put("/users/:id", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let id = req.params.id;
      let info_user = req.body;
  
      // Actualiza el usuario en base de datos
      editUser(info_user, id)
        .then(answerDB => {
          res.send({ ok: true, mensaje: "Usuario editado", info: info_user });
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

