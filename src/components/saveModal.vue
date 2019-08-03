<template>
  <v-layout justify-center>
    <v-dialog
      :value="showModal"
      max-width="300"
    >
      <v-card>
        <v-card-title class="headline centrado">
            {{msgModal}}
        </v-card-title>
        <v-card-actions>
            <v-btn color="success" @click="closeModal" style="margin-left: auto; margin-right: auto;">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        closeModal() {
            this.$store.dispatch('MODAL', {
                modal: {
                    show: false,
                    msg: ''
                }
            })
        }
    },
    computed: {
        showModal() {
            return this.$store.state.modal.show
        },
        msgModal() {
            return this.$store.state.modal.msg
        }
    },
    beforeDestroy() {
        this.$store.state.modal = {
            show: false,
            msg: ''
        }
    }
}
</script>

<style lang="scss">
.centrado {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
