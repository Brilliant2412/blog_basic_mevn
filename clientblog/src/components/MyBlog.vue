<template>
  <div class="mt-4 container">
    <div class="col">
      <h2 class="center-text">My Blog</h2>
      <div class="row paddd">
        <router-link to="/" class="btn btn-primary btn-lg pad1d"
          >Home</router-link
        >
        <router-link to="/trash/blogs" class="btn btn-primary btn-lg pad1d"
          >Recycle Bin</router-link
        >
      </div>
      <div></div>
    </div>

    <table class="table mt-4">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Tác giả</th>
          <th scope="col">Tiêu đề</th>
          <th scope="col">Nội dung</th>
          <th scope="col" colspan="2">Thời gian tạo</th>
        </tr>
      </thead>
      <tbody v-if="isExist">
        <tr>
          <td colspan="5" class="text-center">
            You not post any article.
            <router-link to="/createBlog" class="btn btn-primary"
              >Create Blog</router-link
            >
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="(blog, i) in BlogsOfUser" :key="i">
           <!-- v-if="!blog.deleted" -->
          <th scope="row">{{ i }}</th>
          <td>{{ username }}</td>
          <td>{{ blog.title }}</td>
          <td>{{ blog.content }}</td>
          <td>{{ blog.createdAt }}</td>
          <td
            width="75"
            class="center aligned d-flex flex-row bd-highlight mb-3"
          >
            <a
              :href="`/blogs/edit/${blog.id}`"
              class="btn btn-primary p-2 bd-highlight"
              >Edit</a
            >
            <button
              type="button"
              class="btn btn-danger pull-right p-2 bd-highlight"
              data-toggle="modal"
              data-target=".bd-example-modal-sm"
              @click="deleteBlogFront(blog, blog.id)"
            >
              Delete
            </button>
            <!-- <a href="#" class="btn btn-link p-2 bd-highlight" data-toggle="modal" :data-id="blog.id"  data-target="#delete-blog-modal" >Delete</a> -->
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="modal fade bd-example-modal-sm"
      id="myModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title" id="exampleModalLabel">Delete Blog ?</h1>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Are you sure you to delete this blog?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteBlogBackSoft(blogdelete, blogiddelete)"
            >
              Delete
            </button>
            <!-- </router-link> -->
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancle
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      BlogsOfUser: [],
      isExist: false,
      blogdelete: {},
      blogiddelete: "",
      username: ""
    };
  },
  async mounted() {
    let token = localStorage.getItem("jwt");
    if (token) {
      const response = await this.$http.get("/api/blog", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      this.BlogsOfUser = response.data.blogs;
      if (this.BlogsOfUser.length === 0) {
        this.isExist = true;
      } else {
        this.isExist = false;
      }
    }
  },
  methods: {
    deleteBlogFront(blog, id) {
      $("#myModal").modal("show");
      this.blogdelete = blog;
      this.blogiddelete = id;
    },
     getUserDetails(){
            var user = JSON.parse(localStorage.getItem("user"));
            this.username = user.username;
        },
    async deleteBlogBackSoft(blog, id) {
      let token = localStorage.getItem("jwt");
      var linked = "/api/blog/"+ this.blogiddelete;
      if (token) {
        const response = await this.$http.delete(linked, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        var index = this.BlogsOfUser.indexOf(this.blogdelete);
        this.BlogsOfUser.slice(index,1);
        this.$swal("Success", "Delete successfully", "success");
        window.location.reload();
      }else{
        this.$swal("Error", "Something went wrong", "error");
      }
    },
  },
  created() {
        this.getUserDetails();
  },
};
</script>
<style scoped>
.pad1d {
  margin: 10px 10px;
}

.paddd {
  margin-left: 40%;
}

.center-text {
  text-align: center;
}
</style>





