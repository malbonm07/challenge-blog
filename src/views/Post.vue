<template>
    <div>
       <v-layout row wrap>
           <v-flex offset-xs1 xs10 v-if="post">
               <FormBlogCom :post="post">
               </FormBlogCom>
           </v-flex>
       </v-layout>
    </div>
</template>

<script>
import axios from 'axios';
import FormBlogCom from '@/components/FormBlogCom.vue';
export default {
    components: {
        FormBlogCom
    },
    data() {
        return {
            post: null
        }
    },
    mounted() {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${this.$route.params.postId.id}`)
        .then(response => {
            this.post = response.data
        })
    }
}
</script>

<style>

</style>
