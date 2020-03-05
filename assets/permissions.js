export default {
    data() {

    return {
    message: "GESTIÓN DE PERMISOS",
    inEdition: false,
    permission: {
    role: null,
    module: null,
    description: "",
    acciones: true
    },
    
    list_permissions: [
    {
    role: "001",
    module: "001",
    acciones: true
    }
    ],
    options_roles: [

    ],
    options_modules: [
        
    ],
    temporal: [
        
    ],
    selected: []
    };
    },
    
    mounted(){
        this.getLocalStorageInfo();
    },
    methods: {
    createPermission() {
    this.list_permissions.push(this.permission);
    this.permission = {
        role: null,
        module: null,
        description: "",
    acciones: true
    };
    this.saveLocalStorage()
    },
    deleteModule({ item }) {
    let position = this.list_permissions.findIndex(
        permission => permission.id == item.id
    );
    this.list_permissions.splice(position, 1);
    this.saveLocalStorage()
    },
    loadModule({ item }) {
    let rl = this.list_permissions.find(
        permission => permission.id == item.id
    );
    this.inEdition = true;
    this.permission = Object.assign({}, rl);
    this.saveLocalStorage()
    },
    saveLocalStorage(){
        localStorage.setItem("Permissions", JSON.stringify(this.list_permissions));
    },
    getLocalStorage(){
        if(localStorage.getItem("Permissions")){
            this.list_permissions = JSON.parse(localStorage.getItem("Permissions"));
        }
    },
    getLocalStorageInfo(){
        if(localStorage.getItem("Roles")){
            this.temporal = JSON.parse(localStorage.getItem("Roles"));
            for (let i in this.temporal){
                let temp = this.temporal[i];
                this.options_roles.push(temp.name)
        }
        }

        if(localStorage.getItem("Modules")){
            this.temporal = JSON.parse(localStorage.getItem("Modules"));
            for (let i in this.temporal){
                let temp2 = this.temporal[i];
                this.options_modules.push(temp2.name)
        }
        } 
        console.log("Hola", this.options_roles);
        console.log("Hola", this.options_modules);

    },
    updateModule() {
    let position = this.list_permissions.findIndex(
        permission => permission.id == this.permission.id
    );
    this.list_permissions.splice(position, 1, this.permission);
    this.permission = {
        role: null,
        module: null,
        description: "",
    acciones: true
    };
    this.saveLocalStorage()
    }
    }
    };