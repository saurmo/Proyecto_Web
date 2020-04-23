<template>
<div class="body">
<b-container>
    <b-col >
<!-- Content here -->

<div class="container">
  <b-img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Escudo_Universidad_de_Medellin.svg/240px-Escudo_Universidad_de_Medellin.svg.png" fluid alt="Fluid image" width=80px></b-img>
    <div class="tittle">Administrador</div>
</div>

<br />


        <b-button block href="/roles" variant="danger" size="lg">Gestión de Roles</b-button>
          <b-button block href="/formUsers" variant="danger" size="lg">Gestión de Usuarios</b-button>

    <b-button block href="/modules" variant="danger" size="lg">Gestión de Modulos</b-button>
    <b-button block href="/permissions" variant="danger" size="lg">Gestión de Permisos</b-button>
<br />
 
</b-col>
</b-container>
</div>
</template>

<style>


.container{
    margin-top: 30px;
    background-color: white;
    display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	align-content: stretch;
}

.hi {
    color: white
}
.tittle{
    font-family: 'Oswald', sans-serif;
    margin: 20px;
    font-size: 30px;
    font-weight: bold;
    color: #e00025
}


body {
  background-image: url("https://udem.edu.co/images/VIDAUDEM/Campus/DSC01689.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 500px;
  margin: 20px
}
</style>




 