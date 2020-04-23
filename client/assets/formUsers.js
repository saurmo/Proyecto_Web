import axios from "axios";

export default {
  data() {
    return {
      message: "ADMINISTRACIÓN DE USUARIOS",
      inEdition: false,
      showTable: false,
      show: false,
      validation: "",
      user: {
        id: "",
        name: "",
        lastname: "",
        age: 0,
        email: "",
        city: "",
        ocupation: null,
        role: 0,
        actions: true,
      },
      list_users: [{}],
      options_ocupations: [
        { value: null, text: "Seleccione una ocupacion", disabled: true },
        { value: "Estudiante", text: "Estudiante" },
        { value: "Ingeniero", text: "Ingeniero" },
        { value: "otro", text: "otro" },
      ],
      list_roles: [{ value: null, text: "Seleccione un rol", disabled: true }],
    };
  },
  created() {
    this.showRoles();
    this.showUsers();
  },
  computed: {
    validationId() {
      return this.validationCondition(this.user.id.length > 0);
    },

    validationName() {
      return this.validationCondition(this.user.name.length > 0);
    },

    validationLastname() {
      return this.validationCondition(this.user.name.length > 0);
    },

    validationAge() {
      return this.validationCondition(this.user.age >= 0);
    },

    validationEmail() {
      return this.validationCondition(this.user.email.length > 0);
    },

    validationExists() {
      var status = true;
      for (let i in this.list_users) {
        var tem = this.list_users[i];
        if (this.user.id != "") {
          this.show = true;
          if (tem.id == this.user.id) {
            this.validation = false;
            status = false;
          }
        }
      }
      return status;
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
    showUsers() {
      axios
        .get("http://127.0.0.1:8000/api/v1/view-users")
        .then((response) => {
          this.list_users = response.data.info;
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

    createUser() {
      if (this.validation == true) {
        axios
          .post("http://127.0.0.1:8000/api/v1/new-user/", this.user)
          .then((response) => {
            this.list_users.push(response.data.info);
            axios.post("http://127.0.0.1:8000/api/v1/send-mail/", this.user);
            this.user = {
              id: "",
              name: "",
              lastname: "",
              age: 0,
              email: "",
              city: "",
              ocupation: null,
              role: 0,
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
    deleteUser({ item }) {
      axios
        .delete(`http://127.0.0.1:8000/api/v1/users/${item.id}`)
        .then((response) => {
          let position = this.list_users.findIndex(
            (user) => user.id == item.id
          );
          this.list_users.splice(position, 1);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    loadUser({ item }) {
      axios
        .get(`http://127.0.0.1:8000/api/v1/users/${item.id}`)
        .then((response) => {
          var array = response.data.info;

          this.inEdition = true;
          this.user.id = array[0].id;
          this.user.name = array[0].name;
          this.user.lastname = array[0].lastname;
          this.user.age = array[0].age;
          this.user.email = array[0].email;
          this.user.city = array[0].city;
          this.user.role = array[0].role;
          this.user.ocupation = array[0].ocupation;
          this.user.actions = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateUser() {
      if (this.validation == true) {
        axios
          .put(`http://127.0.0.1:8000/api/v1/users/${this.user.id}`, this.user)
          .then((response) => {
            console.log(response);
            let position = this.list_users.findIndex(
              (user) => user.id == this.user.id
            );
            this.list_users.splice(position, 1, this.user);
            this.inEdition = false;
            this.user = {
              id: "",
              name: "",
              lastname: "",
              age: 0,
              email: "",
              city: "",
              ocupation: null,
              role: 0,
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
