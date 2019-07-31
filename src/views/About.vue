<template>
  <div>
    <v-layout row wrap>
      <v-flex offset-xs1 xs10>
        <v-text-field
          label="Titulo"
          single-line
          solo
        ></v-text-field>
      </v-flex>
      <v-flex offset-xs1 xs10>
        <v-textarea
          solo
          name="input-7-4"
          label="Comentario"
          ></v-textarea>
      </v-flex>
      <v-flex offset-xs1 xs10>
        <div class="text-left">
          <v-btn>Enviar</v-btn>
          <!-- <v-btn>Editar</v-btn> -->
          <v-btn>Cancelar</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>
