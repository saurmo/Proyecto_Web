<template>
  <div class="body">
    <b-container>
      <b-col>
        <!-- Content here -->

        <div class="container">
          <b-img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Escudo_Universidad_de_Medellin.svg/240px-Escudo_Universidad_de_Medellin.svg.png"
            fluid
            alt="Fluid image"
            width="80px"
          ></b-img>
          <div class="tittle">{{ message }}</div>
        </div>

        <br />

        <b-form action="javascript:void(0)" @submit="createModule()">
          <b-form-group @submit.stop.prevent label="Nombre" label-for="name">
            <b-form-input
              class="form-control"
              v-model="modules.name"
              placeholder="Ingrese un nombre"
              id="name"
            />
            <b-form-invalid-feedback :state="validationName"
              >Campo obligatorio</b-form-invalid-feedback
            >
          </b-form-group>

          <b-form-group label="Descripción" label-for="description">
            <b-form-textarea
              class="form-control"
              v-model="modules.description"
              placeholder="Ingrese una descripción"
              id="description"
            />
          </b-form-group>

          <b-button type="submit" block variant="danger" v-if="!inEdition"
            >Crear Módulo</b-button
          >
          <b-button @click="updateModule()" block variant="danger" v-else
            >Actualizar Módulo</b-button
          >
        </b-form>
        <br />

        <b-button
          type="submit"
          block
          variant="danger"
          @click="showTable = !showTable"
          >Lista de Módulos</b-button
        >
        <br />

        <b-table striped hover :items="list_modules"  v-show="showTable">
          <template v-slot:cell(actions)="row">
            <b-button size="sm" @click="loadModule(row)" class="mr-2"
              >Modificar</b-button
            >
            <b-button
              size="sm"
              @click="deleteModule(row)"
              class="mr-2"
              variant="danger"
              >Eliminar</b-button
            >
          </template>
        </b-table>
      </b-col>
    </b-container>
  </div>
</template>

<script src="../assets/modules.js" />

<style>
.container {
  margin-top: 30px;
  background-color: white;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: stretch;
}

.tittle {
  font-family: "Oswald", sans-serif;
  margin: 20px;
  font-size: 30px;
  font-weight: bold;
  color: #e00025;
}

hi {
  color: white;
}

body {
  background-image: url("https://udem.edu.co/images/VIDAUDEM/Campus/DSC01689.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 500px;
  margin: 20px;
}
</style>
