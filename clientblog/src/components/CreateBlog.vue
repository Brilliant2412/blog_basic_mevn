<template>
    <div class="container">
        <div class="row">
            <div class="mt-4">
                <h3>Add Blog</h3>
                <form method="POST" enctype="multipart/form-data" @submit.prevent="addBlog">
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input type="text" class="form-control" id="title" v-model="blog.title">
                    </div>
                    <div class="form-group">
                        <label for="content">Content</label>
                        <textarea name="content" id="content" class="form-control" v-model="blog.content"></textarea>
                    </div>
                    <div class="form-group">
                        <h5>Select an image</h5>
                        <div v-if="!blog.image">
                            <input type="file" id = "file" ref="file" @change="onFileChange">
                        </div>
                        <div v-else>
                             <img :src="blog.image">
                            <button @click="removeImage">Remove Image</button>
                        </div>
                    </div>
                    <button  type="submit" class="btn btn-primary">Add Blog</button>
                </form>
            </div>           
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            blog:{
                title: '',
                content: '',
                image: null,
                author: ''
            },
            user: {
                username: "",
            },
        }
    },
    methods:{
        onFileChange(event){
            var files = event.target.files || event.dataTransfer.files;
            if(!files.length){
                return;
            }
            this.createImage(files[0]);
        },
        createImage(file){
            var image = new Image();
            var reader = new FileReader();
            reader.onload = (e)=>{
                this.blog.image = e.target.result;
            }
            reader.readAsDataURL(file);
        },
        removeImage(e){
            this.blog.image = '';
        },
         getUserDetails(){
            this.user = JSON.parse(localStorage.getItem('user'));
        },
        async addBlog(){
          try{
            this.blog.author = this.user.username;
            let token = localStorage.getItem("jwt");
            let response = await this.$http.post('/api/blog/create',this.blog,{
                headers : {
                    Authorization: 'Bearer ' + token
                }
            });
            if(token){
              this.$swal("Success","Add successfully", "success");
              this.$router.push('/stored/blogs');
            }
          }catch(err){
            this.$swal("Error","Something went wrong", "error");
          }
        }
    },
    created() {
        this.getUserDetails();
  },
}
</script>

<style scoped>
    img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}

</style>    

