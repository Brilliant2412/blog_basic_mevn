<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
                <form class="text-center border border-primary p-5" style="margin-top:70px;height:auto;padding-top:100px !important;" @submit.prevent="registerUser">
                    <input type="text" id = "name" class="form-control mb-5" placeholder="Username" v-model="username" required />
                    <input type="email" id = "email" class="form-control mb-5" placeholder="Email" v-model="email" required />
                    <input type="password" id="password" class="form-control mb-5" placeholder="Password" v-model="password" required />
                    <p>Already have an account?<router-link to="/login">Click here</router-link></p>
                    <center>
                        <button class= "btn btn-primary btn-block w-75 my-4" type="submit">Register</button>
                    </center>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return {
            // register:{
            //     username: '',
            //     email: '',
            //     password: ''
            // }
                username: '',
                email: '',
                password: ''
        }
    },
    methods: {
        async registerUser(){
          try{ 
            let  Userregister = {
                 username: this.username,
                 email: this.email,
                 password: this.password
             };
            this.$store.commit('auth_request');
            let response = await this.$http.post('/user/register',Userregister);
            let token = response.data.token;
            if (token){
              localStorage.setItem("jwt",token);
              // this.$store.dispatch('register', Userregister);
              this.$router.push('/login');
              this.$swal("Success","Registration Was successful", "success");
            }else{
              this.$swal("Error","Something went wrong", "error");
            }
          }catch(err){
            let error = err.response;
            this.$store.commit('auth_error', err);
            if (error.status == 409){
              this.$swal("Error",error.data.message, "error");
            }else{
              this.$swal("Error",error.data.err.err, "error");
            }
          }
        }
    }
}
</script>

<style scoped>

</style>