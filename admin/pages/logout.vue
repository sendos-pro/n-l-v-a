<template>
    <button type="button" v-on:click="logout()" class="button is-primary is-fullwidth">Logout</button>
</template>

<script>
export default {
    methods: {
        async logout () {
          this.$axios.setHeader('Authorization', null)
          await this.$auth.logout()
        }
    }
}
</script>