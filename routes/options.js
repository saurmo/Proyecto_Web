const express = require("express");
const router = express.Router();

const { validateOption,
    saveOption,
    consultOptions,
    consultOption,
    deleteOption,
    editOption } = require("../controllers/options");

/**
 * Obtener todos las opciones
 */
router.get("/options", (req, res) => {
    consultOptions()
    .then(answerDB => {
      let records = answerDB.rows;
      res.send({ ok: true, info: records, mensaje: "Opciones consultadas" });
    
    })
    .catch(error => {
      res.send(error);
    });
    
});

/**
 * Obtener una sola opción
 */
router.get("/options/:id", (req, res) => {
  let info_option = req.params.id;
  consultOption(info_option)
  .then(answerDB => {
    let records = answerDB.rows;
    res.send({ ok: true, info: records, mensaje: "Opción consultada" });
  
  })
  .catch(error => {
    res.send(error);
  });
  
});

/**
 * Guardar una opción
 */
router.post("/new-option", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let info_option = req.body;

    // Valida la información, si hay un error se envia al catch
    validateOption(info_option);

    // Guardar el modulo en base de datos
    saveOption(info_option)
      .then(answerDB => {
        res.send({ ok: true, mensaje: "Opción guardada", info: info_option });
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
 * Eliminar una opción
 */
router.delete("/options/:id", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let info_option = req.params.id;
  
      // Elimina la opción en base de datos
      deleteOption(info_option)
        .then(answerDB => {
          res.send({ ok: true, mensaje: "Opción eliminada", info: info_option });
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
 * Actualizar una opción
 */
router.put("/options/:id", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let id = req.params.id;
      let info_option = req.body;
  
      // Actualiza la opción en base de datos
      editOption(info_option, id)
        .then(answerDB => {
          res.send({ ok: true, mensaje: "Opción editada", info: info_option });
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

