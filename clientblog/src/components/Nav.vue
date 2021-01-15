<template >
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="/">Blog</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul class="navbar-nav" v-if="isLoggedIn">
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-primary dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{ getUserDetails }}
              </button>
              <div class="dropdown-menu" >
                <router-link to="/createBlog" class="dropdown-item"
                  >Create Blog</router-link
                >
                <router-link to="/stored/blogs" class="dropdown-item"
                  >My Blog</router-link
                >
                <a class="dropdown-item tro" @click="logUserOut">Logout</a>
              </div>
            </div>
          </ul>
          <ul v-else>
             <router-link to="/login" class="nav-item btn btn-primary"
                  >sign in</router-link
                >
                <router-link to="/register" class="nav-item btn btn-primary"
                  >sign up</router-link
                >
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // blogs: [],
        // username: "",
    };
  },
  computed: {
    isLoggedIn() {
      console.log(this.$store.getters.isLoggedIn);
      return this.$store.getters.isLoggedIn;
    },
    getUserDetails(){
          if (this.$store.getters.userInfor){
            let userinfor = this.$store.getters.userInfor;
            return userinfor.username;
          }else{
            return '';
          }
        },
  },
  methods: {
    
    logUserOut(){
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      this.$store.commit('logout');
      this.$store.dispatch('clearAuthUser');
      this.$router.push('/login');
    },
  },
  created() {
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

<style scoped>
.dropdown-menu .tro {
  cursor: pointer;
}
</style>