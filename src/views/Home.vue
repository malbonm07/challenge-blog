<template>
  <div>
    <v-layout row wrap>
      <v-flex offset-xs1 xs10 mt-2 mb-5>
        <h1 class="display-1 text-capitalize mb-2">bienvenido a mi blog de prueba</h1>
        <h6><span class="font-weight-medium text-grey1">Herramienta:</span> Axios</h6>
      </v-flex> 
      <v-flex offset-xs1 xs10>
         <v-btn color="success" @click="createPost">Nuevo Post</v-btn> 
      </v-flex>
      <v-flex offset-xs1 xs10 class="mt-5" v-if="newPost">
        <v-flex offset-xs1 xs10>
            <v-text-field
            label="Titulo"
            single-line
            solo
            v-model="currentPost.title"
            background-color="light-blue accent-3"
            ></v-text-field>
        </v-flex>
        <v-flex offset-xs1 xs10>
            <v-textarea
            solo
            label="Comentario"
            v-model="currentPost.body"
            background-color="light-blue accent-3"
            ></v-textarea>
        </v-flex>
        <v-flex offset-xs1 xs10>
          <v-btn color="success" @click="enviarNuevoPost">Enviar</v-btn>
        </v-flex>
      </v-flex>
      <v-flex offset-xs1 xs10 offset-md2 md8>
        <v-simple-table>
          <thead>
            <tr>
              <th class="text-left">Posts</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(post, index) in posts" :key="index">
              <td class="pt-5 pb-5">
               <FormBlogCom :post="post" :index="index">
               </FormBlogCom>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-flex>
    </v-layout>
    <saveModal></saveModal>
  </div>
</template>

<script>
import axios from 'axios';
import FormBlogCom from '@/components/FormBlogCom.vue';
import saveModal from '@/components/saveModal.vue';
import {mapGetters} from 'vuex';

  export default {
    components: {
      FormBlogCom,
      saveModal
    },
    data () {
      return {
        updateData: false,
        currentPost: {
          userId: 1,
          title: '',
          body: ''
        },
        newPost: false,
      }
    },
    methods: {
      closModal() {
        this.modal.val = false
      },
      seePost(post) {
        this.$router.push({
          name: 'post',
          params: {
            postId: post
          }
        })
      },
      createPost() {
        if(!this.newPost) {
          this.newPost = true;
          this.currentPost.title = '',
          this.currentPost.body = ''
        }
      },
      enviarNuevoPost() {
        let envio = new Promise((res, rej) => {
            this.$store.dispatch('NEW_POST', this.currentPost);
            this.newPost = false
            this.$store.dispatch('MODAL', {
                show: true,
                msg: 'Mensaje enviado!'
            })
        })

      }
    },
    created() {
      this.$store.commit('GET_POSTS');
    },
    computed: {
      posts() {
        return this.$store.state.posts
      }
    }
  }
</script>
