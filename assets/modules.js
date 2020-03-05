export default {
    data() {
    return {
    message: "CREACIÓN DE MÓDULOS",
    inEdition: false,
    modules: {
    id: "",
    name: "",
    description: "",
    acciones: true
    },
    list_modules: [
    {
    id: "001",
    name: "Convenios",
    description: "tyhkulirguouprgh",
    acciones: true
    }
    ]
    };
    },
    methods: {
    createModule() {
    this.list_modules.push(this.modules);
    this.modules = {
    id: "",
    name: "",
    description: "",
    acciones: true
    };
    this.saveLocalStorage(),
    this.getLocalStorageInfo()
    },
    saveLocalStorage(){
        localStorage.setItem("Modules", JSON.stringify(this.list_modules));
    },
    getLocalStorage(){
        if(localStorage.getItem("Modules")){
            this.list_modules = JSON.parse(localStorage.getItem("Modules"));
        }
        console.log("hola", list_modules)
    },
    deleteModule({ item }) {
    let position = this.list_modules.findIndex(
    modules => modules.id == item.id
    );
    this.list_modules.splice(position, 1);
    this.saveLocalStorage()
    },
    loadModule({ item }) {
    let md = this.list_modules.find(
    modules => modules.id == item.id
    );
    this.inEdition = true;
    this.modules = Object.assign({}, md);
    this.saveLocalStorage()
    },
    updateModule() {
    let position = this.list_modules.findIndex(
    modules => modules.id == this.modules.id
    );
    this.list_modules.splice(position, 1, this.module);
    this.modules = {
    id: "",
    name: "",
    description: "",
    acciones: true
    };
    this.saveLocalStorage()
    }
    }
    };