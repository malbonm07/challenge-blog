<template>
    <div>
        <v-layout row wrap>
        <v-flex offset-xs1 xs10>
            <v-text-field
            label="Titulo"
            single-line
            solo
            v-model="post.title"
            readonly
            auto-grow
            ref="postTitle"
            background-color="grey lighten-2"
            :id="`postTitle${post.id}`"
            ></v-text-field>
        </v-flex>
        <v-flex offset-xs1 xs10>
            <v-textarea
            solo
            label="Comentario"
            readonly
            auto-grow
            background-color="grey lighten-2"
            :id="`postBody${post.id}`"
            v-model="post.body"
            ref="postBody"
            ></v-textarea>
        </v-flex>
        <v-flex offset-xs1 xs10 v-if="!postEditable">
            <v-btn @click="editPost">Editar</v-btn>
            <v-btn @click="eliminarPost(index)">Eliminar</v-btn>
        </v-flex>
        <v-flex offset-xs1 xs10 v-else>
            <div class="text-left">
            <v-btn @click="savePost">Guardar</v-btn>
            <v-btn @click="cancelPost(post)">Cancelar</v-btn>
            </div>
        </v-flex>
        </v-layout>
    </div>
</template>

<script>
import axios from 'axios';
import { setTimeout } from 'timers';
export default {
    props: {
        post: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            postEditable: false,
            newPost: false,
        }
    },
    mounted() {
        this.$on('newPost', boolean => {
            this.postEditable = boolean
        })
    },
    methods: {
        editPost() {
            if(!this.postEditable) {
                this.postEditable = true;
            }
        },
        cancelPost(initialPost) {
            
            if(this.$refs.postBody.initialValue === null) {
                this.$refs.postBody.initialValue = initialPost.body
            }
            if(this.$refs.postTitle.initialValue === null)
                this.$refs.postTitle.initialValue = initialPost.title

            if(this.postEditable) {
                    this.$store.commit('RETURN_POST', {
                        post: {
                            body: this.$refs.postBody.initialValue,
                            id: initialPost.id,
                            title: this.$refs.postTitle.initialValue,
                            userId: initialPost.userId
                        },
                        index: this.index
                    })
                    this.$refs.postTitle.initialValue = null
                    this.$refs.postBody.initialValue = null
                    this.postEditable = false;
            }
        },
        savePost() {
            let savePost = {
                    "userId": this.post.userId,
                    "title": this.post.title,
                    "body": this.post.body
            }
            if(this.postEditable) {
                    this.$store.state.posts[this.index] = savePost;
                    this.$refs.postTitle.initialValue = null
                    this.$refs.postBody.initialValue = null
                    this.postEditable = false;

                    this.$store.dispatch('MODAL', {
                        show: true,
                        msg: 'Mensaje guardado!'
                    })
                }
        },
        eliminarPost(index) {
            this.$store.dispatch('DELETE_POST', index)
            this.$store.dispatch('MODAL', {
                show: true,
                msg: 'Mensaje eliminado'
            })
        }
    },
    watch: {
        postEditable() {
            if(this.postEditable) {
                document.getElementById(`postTitle${this.post.id}`).removeAttribute('readonly')
                document.getElementById(`postBody${this.post.id}`).removeAttribute('readonly')
            }
            if(!this.postEditable) {
                document.getElementById(`postTitle${this.post.id}`).setAttribute('readonly', true)
                document.getElementById(`postBody${this.post.id}`).setAttribute('readonly', true)
            }
        }
    },
    beforeDestroy() {
        if(this.postEditable) {
            this.postEditable = false;
        }
    }
}
</script>

<style>

</style>
