<template>
<div class="body">
<b-container>
    <b-col >
<!-- Content here -->

<div class="container">
  <b-img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Escudo_Universidad_de_Medellin.svg/240px-Escudo_Universidad_de_Medellin.svg.png" fluid alt="Fluid image" width=80px></b-img>
    <div class="tittle">{{message}}</div>
</div>


{{modules.name}}
<br />

<b-form action="javascript:void(0)" @submit="createModule()">
<b-form-group label="Identificación" label-for="id">
<b-form-input
class="form-control"
type="number"
v-model="modules.id"
placeholder="Ingrese un id"
id="id"
/>
</b-form-group>
<b-form-group label="Nombre" label-for="name">
<b-form-input
class="form-control"
v-model="modules.name"
placeholder="Ingrese un nombre"
id="name"
/>
</b-form-group>

<b-form-group label="Descripción" label-for="description">
<b-form-textarea
class="form-control"
v-model="modules.description"
placeholder="Ingrese una descripción"
id="description"
/>
</b-form-group>

<b-button type="submit" block variant="danger" v-if="!inEdition">Actualizar estudiante</b-button>
<b-button @click="updateUser()" block variant="danger" v-else>Actualizar estudiante</b-button>
</b-form>

<b-table striped hover :items="list_modules">
<template v-slot:cell(acciones)="row">
<b-button size="sm" @click="loadModule(row)" class="mr-2">Modificar</b-button>
<b-button size="sm" @click="deleteModule(row)" class="mr-2">Eliminar</b-button>
</template>
</b-table>
    <hi>h</hi>

</b-col>
</b-container>
</div>
</template>

<script src="../assets/modules.js"/>



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

.tittle{
    font-family: 'Oswald', sans-serif;
    margin: 20px;
    font-size: 30px;
    font-weight: bold;
    color: #e00025
}

hi {
    color: white
}

body {
  background-image: url("https://udem.edu.co/images/VIDAUDEM/Campus/DSC01689.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 500px;
  margin: 20px
}
</style>

