import axios from "axios";

export default {
  data() {
    return {
      message: "CREACIÓN DE MÓDULOS",
      inEdition: false,
      showTable: false,
      validation: "",
      modules: {
        id: "",
        name: "",
        description: "",
        acciones: true,
      },
      list_modules: [],
    };
  },
  created() {
    this.showModules();
  },
  computed: {
    validationName() {
      return this.validationCondition(this.modules.name.length > 0);
    },
  },
  methods: {
    validationCondition(bool) {
        if (bool == false) {
          this.validation = false;
          return false;
        } else {
          this.validation = true;
          return true;
        }
      },
      showModules() {
        axios
          .get("http://127.0.0.1:8000/api/v1/modules/")
          .then((response) => {
            this.list_modules = response.data.info;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    createModule() {
        if (this.validation == true) {
            axios
              .post("http://127.0.0.1:8000/api/v1/new-module/", this.modules)
              .then((response) => {
                this.list_modules.push(response.data.info);
                this.modules = {
                    id: "",
                    name: "",
                    description: "",
                    actions: true,
                  };
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            alert("LLene todos los campos correctamente");
          }
    },
    deleteModule({ item }) {
        axios
        .delete(`http://127.0.0.1:8000/api/v1/modules/${item.id}`)
        .then((response) => {
          let position = this.list_modules.findIndex(
            (modules) => modules.id == item.id
          );
          this.list_modules.splice(position, 1);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadModule({ item }) {
        axios
        .get(`http://127.0.0.1:8000/api/v1/modules/${item.id}`)
        .then((response) => {
          var array = response.data.info;

          this.inEdition = true;
          this.modules.id = array[0].id;
          this.modules.name = array[0].name;
          this.modules.description = array[0].description;
          this.modules.actions = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateModule() {
        if (this.validation == true) {
            axios
              .put(`http://127.0.0.1:8000/api/v1/modules/${this.modules.id}`, this.user)
              .then((response) => {
                let position = this.list_modules.findIndex(
                  (modules) => modules.id == this.modules.id
                );
                this.list_modules.splice(position, 1, this.modules);
                this.inEdition = false;
                this.modules = {
                    id: "",
                    name: "",
                    description: "",
                    actions: true,
                  };
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            alert("LLene todos los campos correctamente");
          }
    },
  },
};
