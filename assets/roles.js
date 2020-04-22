import axios from "axios";

export default {
  data() {
    return {
      message: "CREACIÓN DE ROLES",
      inEdition: false,
      showTable: false,
      validation: "",
      role: {
        id: "",
        name: "",
        description: "",
        actions: true,
      },
      list_roles: [],
    };
  },
  created() {
    this.showRoles();
  },
  computed: {
    validationName() {
      return this.validationCondition(this.role.name.length > 0);
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
      showRoles() {
        axios
          .get("http://127.0.0.1:8000/api/v1/roles/")
          .then((response) => {
            this.list_roles = response.data.info;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    createRole() {
        if (this.validation == true) {
            axios
              .post("http://127.0.0.1:8000/api/v1/new-role/", this.role)
              .then((response) => {
                this.list_roles.push(response.data.info);
                this.role = {
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
    deleteRole({ item }) {
        axios
        .delete(`http://127.0.0.1:8000/api/v1/roles/${item.id}`)
        .then((response) => {
          let position = this.list_roles.findIndex(
            (role) => role.id == item.id
          );
          this.list_roles.splice(position, 1);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadRole({ item }) {
        axios
        .get(`http://127.0.0.1:8000/api/v1/roles/${item.id}`)
        .then((response) => {
          var array = response.data.info;

          this.inEdition = true;
          this.role.id = array[0].id;
          this.role.name = array[0].name;
          this.role.description = array[0].description;
          this.role.actions = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateRole() {
        if (this.validation == true) {
            axios
              .put(`http://127.0.0.1:8000/api/v1/roles/${this.role.id}`, this.user)
              .then((response) => {
                let position = this.list_roles.findIndex(
                  (role) => role.id == this.role.id
                );
                this.list_roles.splice(position, 1, this.role);
                this.inEdition = false;
                this.role = {
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
