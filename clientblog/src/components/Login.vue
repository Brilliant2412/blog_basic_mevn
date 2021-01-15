<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
                <form class="text-center border border-primary p-5" style="margin-top:70px;height:auto;padding-top:100px !important;" @submit.prevent="loginUser">
                    <input type="text" id = "email" class="form-control mb-5" placeholder="Email" v-model="email"/>
                    <input type="password" id="password" class="form-control mb-5" placeholder="Password" v-model="password"/>
                    <p>Dont have account?<router-link to="/register">Click here</router-link></p>
                    <center>
                        <button class= "btn btn-primary btn-block w-75 my-4" type="submit">Sign in</button>
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
            // login:{
            //     email: '',
            //     password: ''
            // },
            email: '',
            password: ''
        }
    },
    methods: {
        async loginUser(){
          try{            
            let userlogin = {
                email: this.email,
                password: this.password
            };
            this.$store.commit('auth_request');
            // let response = await this.$http.post('/user/login',this.login);
            let response = await this.$http.post('/user/login',userlogin);
            let token = response.data.token;
            let user = response.data.user;
            localStorage.setItem("jwt",token);
            localStorage.setItem("user",JSON.stringify(user));
            this.$store.commit('auth_success', {token, user});
            if(token){
              this.$swal("Success","Login successfully", "success");
            //   this.$store.dispatch('login',{email,password});
              this.$router.push('/');
            }
          }catch(err){
            this.$swal("Error","Something went wrong", "error");
            this.$store.commit('auth_error');
            console.log(err.response);
          }
        }
    }
}
</script>

<style scoped>

</style>
