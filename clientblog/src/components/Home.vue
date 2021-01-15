<template >
  <div>
    <section>
      <div class="container mt-5">
        <div class="row">
          <home-blog-list :blogs = "blogs"></home-blog-list>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BlogList from './BlogList.vue'
export default {
  components:{
    homeBlogList : BlogList,
  },
  data(){
    return {
      blogs: [],
      // user: {
      //   username: '',
      //   email : ''
      // },
      
    }
  }
  ,
  async mounted() {
    let token = localStorage.getItem("jwt");
    if (token) {
      const response = await this.$http.get("/api/blog", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      this.blogs = response.data.blogs;
    }
  },
  
}
</script>

<style scoped>
  .dropdown-menu .tro{
    cursor: pointer;
  }
</style>