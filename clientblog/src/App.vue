<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link><span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span> -->
      <navbar></navbar>
    </div>
    <router-view />
  </div>
</template>

<script>
import nav from "./components/Nav";
export default {
  name: "App",
  components: {
    navbar: nav,
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },
  // methods: {
  //   logout: function () {
  //     this.$store.dispatch('logout')
  //     this.$store.commit('logout')
  //     localStorage.removeItem("jwt")
  //     .then(() => {
  //       this.$router.push('/login')
  //     })
  //   }
  // },
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout);
        }
        throw err;
      });
    });
  },
};
</script>

<style>
</style>
