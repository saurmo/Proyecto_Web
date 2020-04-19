# PROYECTO DE AULA
___
# Descripción:
El administrador podrá crear, eliminar y editar distintos modulos y diferentes tipos de usuarios, otorgando así los permisos acceso. Este tendrá un menú privado donde podrá realizar las acciones anteriormente mencionadas.

Cuando se requiere una cuenta con permisos de acceso en específico(tipos de usuario), el administrador deberá crear un usuario inicial con las características requeridas el cual deberá ser actualizado con las información restante por la persona la que se le fue otorgado.

# Información desarrolladores
## Carlos Valencia
- Creación de formularios

## Bryan Torres
 - Validaciones

##  Alejandra Bedoya
- Diseño con Boostrap-Vue
- Programación en JavaScript
- Creación de la API

# Información requerida

## Usuarios

```json
{
    "id": "",
    "name": "",
    "lastname": "",
    "age": "",
    "email": "",
    "city": "",
    "ocupation": "",
    "role": "FOREING KEY"
}
```

## Módulos

```json
{
  "id": "autoincremento",
  "name": "",
  "description": "",
}
```

## Roles

```json
{
  "id": "autoincremento",
  "name": "",
  "description": "",
}
```

## Opciones o Permisos

```json
{
  "id": "autoincremento",
  "name": "",
  "description": "",
  "role": "FOREING KEY",
  "module": "FOREING KEY"
}
```

# Crud

## Datos a ingresar para el registro

- Correo electronico
- Cedula
- Contraseña
- Tipo de Usuario


## Datos a ingresar para el login

- Cedula
- Contraseña


## Permitir acceso a modulos

- Rol de usuarios
- Modulos


## Editar perfil de personal
- Nombre
- Apellido
-Correo electrónico
- Celular
- Ciudad de residencia
- Dirección
- Foto de perfil
- Ocupación


## Crear tipos de usuario

-Nombre de rol
-Acceso a modulos

## Crear modulos nuevos

-Nombre del modulo
-Descripción del módulo

___

# Script

Crear la base de datos

```sql
CREATE DATABASE proyecto_aula
```

Crear una tabla de módulos

```sql
-- Secuencia para autoincremento
CREATE SEQUENCE IF NOT EXISTS modules_id_seq;

CREATE TABLE "public"."modules" (
    "id" int4 NOT NULL DEFAULT nextval('modules_id_seq'::regclass),
    "name" varchar NOT NULL,
    "description" text,
    "actions" bool DEFAULT true,
    PRIMARY KEY ("id")
);

-- Registro por defecto (NO OMITIR)
INSERT INTO "public"."modules" ("id", "name", "description", "actions") VALUES
('0', 'undefined', NULL, 't');
```

Crear una tabla para roles

```sql
-- Secuencia para autoincremento
CREATE SEQUENCE IF NOT EXISTS roles_id_seq;

CREATE TABLE "public"."roles" (
    "id" int4 NOT NULL DEFAULT nextval('roles_id_seq'::regclass),
    "name" varchar NOT NULL,
    "description" text,
    "actions" bool DEFAULT true,
    PRIMARY KEY ("id")
);

-- Registro por defecto (NO OMITIR)
INSERT INTO "public"."roles" ("id", "name", "description", "actions") VALUES
('0', 'undefined', NULL, NULL);
```

Crear una tabla de usuarios

```sql
CREATE TABLE "public"."users" (
    "id" varchar NOT NULL,
    "name" varchar NOT NULL,
    "lastname" varchar NOT NULL,
    "age" numeric,
    "email" varchar,
    "city" varchar,
    "ocupation" varchar,
    "role" int4,
    "actions" bool DEFAULT true,
    CONSTRAINT "users_role_fkey" FOREIGN KEY ("role") REFERENCES "public"."roles"("id"),
    PRIMARY KEY ("id")
);
```
Crear una tabla de opciones (permisos)

```sql
-- Secuencia para autoincremento
CREATE SEQUENCE IF NOT EXISTS options_id_seq;

CREATE TABLE "public"."options" (
    "id" int4 NOT NULL DEFAULT nextval('options_id_seq'::regclass),
    "name" varchar NOT NULL,
    "description" text,
    "role" int4 NOT NULL,
    "module" int4 NOT NULL,
    "actions" bool DEFAULT true,
    CONSTRAINT "options_role_fkey" FOREIGN KEY ("role") REFERENCES "public"."roles"("id"),
    CONSTRAINT "options_module_fkey" FOREIGN KEY ("module") REFERENCES "public"."modules"("id"),
    PRIMARY KEY ("id")
);

-- Registro por defecto (NO OMITIR)
INSERT INTO "public"."options" ("id", "name", "description", "role", "module", "actions") VALUES
('0', 'default', NULL, '0', '0', 't');
```

