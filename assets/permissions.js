import axios from "axios";

export default {
  data() {
    return {
      message: "GESTIÓN DE PERMISOS",
      inEdition: false,
      showTable: false,
      validation: "",
      permission: {
        id: "",
        name: "",
        description: "",
        role: null,
        modules: null,
        acciones: true,
      },

      list_permissions: [],
      list_roles: [],
      list_modules: [],
    };
  },
  created() {
    this.showPermissions();
    this.showRoles();
    this.showModules();
  },
  computed: {
    validationName() {
      return this.validationCondition(this.permission.name.length > 0);
    },
    validationRole() {
      return this.validationCondition(this.permission.role.length > 0);
    },
    validationModule() {
      return this.validationCondition(this.permission.modules.length > 0);
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
      showPermissions() {
        axios
          .get("http://127.0.0.1:8000/api/v1/view-options/")
          .then((response) => {
            this.list_permissions = response.data.info;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      showRoles() {
        axios
          .get("http://127.0.0.1:8000/api/v1/roles/")
          .then((response) => {
            let array = response.data.info;
            for (let i in array) {
              let temp = { value: "", text: "" };
              temp.value = array[i].id;
              temp.text = array[i].name;
              this.list_roles.push(temp);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
      showModules() {
        axios
          .get("http://127.0.0.1:8000/api/v1/modules/")
          .then((response) => {
            let array = response.data.info;
            for (let i in array) {
              let temp = { value: "", text: "" };
              temp.value = array[i].id;
              temp.text = array[i].name;
              this.list_modules.push(temp);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
    createPermission() {
        if (this.validation == true) {
          console.log(this.permission)
            axios
              .post("http://127.0.0.1:8000/api/v1/new-option/", this.permission)
              .then((response) => {
                console.log(response);
                this.list_permissions.push(response.data.info);
                this.permission = {
                    id: "",
                    name: "",
                    description: "",
                    role: null,
                    modules: null,
                    acciones: true,
                  };
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            alert("LLene todos los campos correctamente");
          }
    },
    deletePermission({ item }) {
        axios
        .delete(`http://127.0.0.1:8000/api/v1/options/${item.id}`)
        .then((response) => {
          let position = this.list_permissions.findIndex(
            (permission) => permission.id == item.id
          );
          this.list_permissions.splice(position, 1);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadPermission({ item }) {
        axios
        .get(`http://127.0.0.1:8000/api/v1/options/${item.id}`)
        .then((response) => {
          var array = response.data.info;

          this.inEdition = true;
          this.permission.id = array[0].id;
          this.permission.name = array[0].name;
          this.permission.description = array[0].description;
          this.permission.role = array[0].role;
          this.permission.modules = array[0].modules;
          this.permission.actions = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updatePermission () {
        if (this.validation == true) {
            axios
              .put(`http://127.0.0.1:8000/api/v1/options/${this.role.id}`, this.user)
              .then((response) => {
                let position = this.list_permissions.findIndex(
                  (permission) => permission.id == this.permission.id
                );
                this.list_permissions.splice(position, 1, this.permission);
                this.inEdition = false;
                this.permission = {
                    id: "",
                    name: "",
                    description: "",
                    role: null,
                    modules: null,
                    acciones: true,
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
