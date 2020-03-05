<template>
<div class="body">
<b-container>
    <b-col >
<!-- Content here -->

<div class="container">
  <b-img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Escudo_Universidad_de_Medellin.svg/240px-Escudo_Universidad_de_Medellin.svg.png" fluid alt="Fluid image" width=80px></b-img>
    <div class="tittle">{{message}}</div>
</div>


<b-form action="javascript:void(0)" @submit="getLocalStorageInfo()">

<b-form-group label="Rol">
<b-form-select v-model="permission.role" :options="options_roles"></b-form-select>
</b-form-group>


    <b-form-group label="Modulos">

    <b-form-checkbox-group
      v-model="permission.module"
      :options="options_modules"
      class="mb-3"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled"
    ></b-form-checkbox-group>
      <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </b-form-group>

    

<b-form-group label="Descripción" label-for="description">
<b-form-textarea
class="form-control"
v-model="permission.description"
placeholder="Ingrese una descripción"
id="description"
/>
</b-form-group>

<b-button type="submit" block variant="danger" v-if="!inEdition">Actualizar permiso</b-button>
<b-button @click="createPermission()" block variant="danger" v-else>Crear permiso</b-button>
</b-form>
    <hi>h</hi>

</b-col>
</b-container>
</div>
</template>
<script src="../assets/permissions.js"/>

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



