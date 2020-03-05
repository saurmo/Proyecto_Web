export default {
    data() {

    return {
    message: "ADMINISTRACIÓN DE USUARIOS",
    inEdition: false,
    user: {
    id: "",
    name: "",
    lastname: "",
    age: 0,
    mail: "",
    city: "",
    ocupation: null,
    acciones: true
    },
    list_users: [
    {
    id: "001",
    name: "Santiago",
    lastname: "Urrego",
    age: 100,
    mail: "xx@yy.com",
    city: "Medellín",
    ocupation: "001",
    acciones: true
    }
    ],
    options_ocupations: [
    { value: null, text: "Seleccione una ocupacion", disabled: true },
    { value: "001", text: "Estudiante" },
    { value: "002", text: "Ingeniero" },
    { value: "003", text: "otro" }
    ]
    };
    },
    computed: {
        validationId() {
          return this.user.id.length > 0 
        },

        validationAge() {
            return this.user.age < 0 
          },

          validationMail() {
            return this.user.mail < 1
          }
      },
    methods: {
    createUser() {
    this.list_users.push(this.user);
    this.user = {
    id: "",
    name: "",
    lastname: "",
    age: 0,
    mail: "",
    city: "",
    ocupation: null,
    acciones: true
    };
    this.saveLocalStorage();
  
    },
    deleteUser({ item }) {
    let position = this.list_users.findIndex(
    user => user.id == item.id
    );
    this.list_users.splice(position, 1);
    this.saveLocalStorage();
    },
    loadUser({ item }) {
    let usr = this.list_users.find(
    user => user.id == item.id
    );
    this.inEdition = true;
    this.user = Object.assign({}, usr);
    this.saveLocalStorage();
    },
    saveLocalStorage(){
        localStorage.setItem("Users", JSON.stringify(this.list_users));
    },
    getLocalStorage(){
        if(localStorage.getItem("Users")){
            this.list_users = JSON.parse(localStorage.getItem("Users"));
        }
    },
    updateUser() {
    let position = this.list_users.findIndex(
    user => user.id == this.user.id
    );
    this.list_users.splice(position, 1, this.user);
    this.user = {
    id: "",
    name: "",
    lastname: "",
    age: 0,
    mail: "",
    city: "",
    ocupation: null,
    acciones: true
    };
    this.saveLocalStorage();
    }
    }
    };