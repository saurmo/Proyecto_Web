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

        <b-form action="javascript:void(0)" @submit="createPermission()">
          <b-form-group @submit.stop.prevent label="Nombre" label-for="name">
            <b-form-input
              class="form-control"
              v-model="permission.name"
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
              v-model="permission.description"
              placeholder="Ingrese una descripción"
              id="description"
            />
          </b-form-group>

 <b-form-group label="Rol">
            <b-form-select
              v-model="permission.role"
              :options="list_roles"
            ></b-form-select>
          </b-form-group>

           <b-form-group label="Módulo">
            <b-form-select
              v-model="permission.modules"
              :options="list_modules"
            ></b-form-select>
          </b-form-group>


          <b-button type="submit" block variant="danger" v-if="!inEdition"
            >Crear Opción</b-button
          >
          <b-button @click="updatePermission()" block variant="danger" v-else
            >Actualizar Opción</b-button
          >
        </b-form>
        <br />
        <b-button
          type="submit"
          block
          variant="danger"
          @click="showTable = !showTable"
          >Lista de Permisos</b-button
        >
        <br />

           <b-table striped hover :items="list_permissions" v-show="showTable">
          <template v-slot:cell(actions)="row">
            <b-button
              size="sm"
              @click="loadPermission(row)"
              class="mr-2"
              variant="danger"
              >Modificar</b-button
            >
            <b-button size="sm" @click="deletePermission(row)" class="mr-2"
              >Eliminar</b-button
            >
          </template>
        </b-table>

        <br />
      </b-col>
    </b-container>
  </div>
</template>
<script src="../assets/permissions.js" />

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
