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

        <b-form action="javascript:void(0)" @submit="createUser()">
          <b-form-group
            @submit.stop.prevent
            label="Identificación"
            label-for="id"
          >
            <b-form-input
              class="form-control"
              type="number"
              v-model="user.id"
              placeholder="Ingrese su identificación"
              id="id"
            />

            <b-form-invalid-feedback :state="validationId"
              >Campo obligatorio</b-form-invalid-feedback
            >
            <b-form-invalid-feedback :state="validationExists" v-show="show"
              >Ya existe un usuario con este documento</b-form-invalid-feedback
            >
          </b-form-group>

          <b-form-group label="Nombre" label-for="name">
            <b-form-input
              class="form-control"
              v-model="user.name"
              placeholder="Ingrese su nombre"
              id="name"
            />
            <b-form-invalid-feedback :state="validationName"
              >Campo obligatorio</b-form-invalid-feedback
            >
          </b-form-group>

          <b-form-group
            @submit.stop.prevent
            label="Apellido"
            label-for="lastname"
          >
            <b-form-input
              class="form-control"
              v-model="user.lastname"
              placeholder="Ingrese su apellido"
              id="lastname"
            />
            <b-form-invalid-feedback :state="validationLastname"
              >Campo obligatorio</b-form-invalid-feedback
            >
          </b-form-group>

          <b-form-group @submit.stop.prevent label="Edad" label-for="age">
            <b-form-input
              class="form-control"
              type="number"
              v-model="user.age"
              placeholder="Ingrese su edad"
              id="age"
            />
            <b-form-invalid-feedback :state="validationAge"
              >Ingrese un valor válido</b-form-invalid-feedback
            >
            
          </b-form-group>

          <b-form-group @submit.stop.prevent label="Correo" label-for="email">
            <b-form-input
              class="form-control"
              type="email"
              v-model="user.email"
              id="mail"
              placeholder="Ingrese su correo"
            />
             <b-form-invalid-feedback :state="validationEmail"
              >Campo obligatorio</b-form-invalid-feedback
            >
          </b-form-group>

          <b-form-group label="Ciudad de residencia" label-for="city">
            <b-form-input
              class="form-control"
              v-model="user.city"
              placeholder="Ingrese su ciudad de residencia"
              id="city"
            />
          </b-form-group>

          <b-form-group label="Ocupación">
            <b-form-select
              v-model="user.ocupation"
              :options="options_ocupations"
            ></b-form-select>
          </b-form-group>

          <b-form-group label="Rol">
            <b-form-select
              v-model="user.role"
              :options="list_roles"
            ></b-form-select>
          </b-form-group>

          <b-button type="submit" block variant="danger" v-if="!inEdition"
            >Crear usuario</b-button
          >
          <b-button @click="updateUser()" block variant="danger" v-else
            >Actualizar usuario</b-button
          >
        </b-form>
        <br />

        <b-button
          type="submit"
          block
          variant="danger"
          @click="showTable = !showTable"
          >Lista de Usuarios</b-button
        >
        <br />

        <b-table striped hover :items="list_users" v-show="showTable">
          <template v-slot:cell(actions)="row">
            <b-button
              size="sm"
              @click="loadUser(row)"
              class="mr-2"
              variant="danger"
              >Modificar</b-button
            >
            <b-button size="sm" @click="deleteUser(row)" class="mr-2"
              >Eliminar</b-button
            >
          </template>
        </b-table>

        <br />
      </b-col>
    </b-container>
  </div>
</template>

<script src="../assets/formUsers.js" />

<style>
b-button {
  background-color: rgb(179, 4, 4);
}

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

body {
  background-image: url("https://udem.edu.co/images/VIDAUDEM/Campus/DSC01689.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 500px;
  margin: 20px;
}

.hi {
  color: white;
}
</style>
