export default {
    data() {
    return {
    message: "CREACIÓN DE ROLES",
    inEdition: false,
    role: {
    id: "",
    name: "",
    description: "",
    acciones: true
    },
    list_roles: [
    {
    id: "001",
    name: "Profesor",
    description: "tyhkulirguouprgh",
    acciones: true
    }
    ],
    temporal: []
    };
    },
    methods: {
    createRole() {
    this.list_roles.push(this.role);
    this.role = {
    id: "",
    name: "",
    description: "",
    acciones: true
    };
    this.saveLocalStorage(),
    this.getLocalStorage()
    },
    deleteModule({ item }) {
    let position = this.list_roles.findIndex(
    role => role.id == item.id
    );
    this.list_roles.splice(position, 1);
    this.saveLocalStorage()
    },
    loadModule({ item }) {
    let rl = this.list_roles.find(
    role => role.id == item.id
    );
    this.inEdition = true;
    this.role = Object.assign({}, rl);
    this.saveLocalStorage()
    },
    saveLocalStorage(){
        localStorage.setItem("Roles", JSON.stringify(this.list_roles));
    },
    getLocalStorage(){
        if(localStorage.getItem("Modules")){
            this.temporal = JSON.parse(localStorage.getItem("Modules"));
            console.log("YA LLEGUEEEEE");
        }

        for (let i in this.temporal){
                let temp = this.temporal[i];
                this.list_roles.push(temp.name)
                console.log("Por aquí tambien");
                console.log(temp.name);
        }
        console.log("Hola", this.list_roles);

    },
    updateModule() {
    let position = this.list_roles.findIndex(
    role => role.id == this.role.id
    );
    this.list_roles.splice(position, 1, this.role);
    this.role = {
    id: "",
    name: "",
    description: "",
    acciones: true
    };
    this.saveLocalStorage()
    }
    }
    };