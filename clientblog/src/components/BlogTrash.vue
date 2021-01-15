<template>
  <div class="mt-4 container">
  <div class="row paddd">
      <h3>Blog đã xóa</h3>
      <!-- <router-link to="/stored/blogs" class="btn btn-primary btn-lg pad1d"
          >My Blog</router-link
        > -->
  </div>
  <div class="row paddd">
    <router-link to="/stored/blogs" class="btn btn-primary btn-lg pad1d"
          >My Blog</router-link
        >
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
            Thùng rác trống
             <!-- <router-link to="/stored/blogs" class="btn btn-primary btn-lg pad1d">My Blog</router-link> -->
          </td>
        </tr>
      </tbody>
    <tbody v-else>
        <tr v-for="(blog, i) in BlogsOfUserDelete" :key="i">
          <!-- v-if="blog.deleted" -->
          <th scope="row" >{{ i }}</th>
          <td>{{ username }}</td>
          <td>{{ blog.title }}</td>
          <td>{{ blog.content }}</td>
          <td>{{ blog.createdAt }}</td>
          <td
            width="75"
            class="center aligned d-flex flex-row bd-highlight mb-3"
          >
            <button
              type="button"
              class="btn btn-dark pull-right p-2 bd-highlight"
              @click="Restore(blog, blog.id)"
            >
              Restore
            </button>
            <button
              type="button"
              class="btn btn-danger pull-right p-2 bd-highlight"
              data-toggle="modal"
              data-target=".bd-example-modal-sm"
              @click="ForceDestroy(blog, blog.id)"
            >
              Delete
            </button>
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
              @click="deleteBlogBackHard(blogdelete, blogiddelete)"
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
      BlogsOfUserDelete: [],
      isExist: false,
      blogdelete:{},
      blogiddelete: '',
      username: ""
    };
  },
  async mounted() {
    let token = localStorage.getItem("jwt");
    if (token) {
      const response = await this.$http.get("/api/blog/deleted", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      this.BlogsOfUserDelete = response.data.blogs;
      if (this.BlogsOfUserDelete.length === 0) {
        this.isExist = true;
      } else {
        this.isExist = false;
      }
    }
  },
  methods: {
    getUserDetails() {
      var user = JSON.parse(localStorage.getItem("user"));
      this.username = user.username;
    },
    async Restore(blog, id) {
          let token = localStorage.getItem("jwt");
          var linked = "/api/blog/"+ id+"/restore";
          if (token) {
            const response = await this.$http.patch(linked,blog, {
              headers: {
                Authorization: "Bearer " + token,
              },
            });
            console.log(response.data);
            var index = this.BlogsOfUserDelete.indexOf(blog);
            this.BlogsOfUserDelete.slice(index,1);
            this.$swal("Success", "Restore successfully", "success");
            window.location.reload();
          }else{
            this.$swal("Error", "Something went wrong", "error");
          }
        },
    ForceDestroy(blog,id){
      this.blogdelete = blog;
      this.blogiddelete = id;
    },
    async deleteBlogBackHard(blog, id) {
          let token = localStorage.getItem("jwt");
          var linked = "/api/blog/"+ this.blogiddelete+"/force";
          if (token) {
            const response = await this.$http.delete(linked, {
              headers: {
                Authorization: "Bearer " + token,
              },
            });
            var index = this.BlogsOfUserDelete.indexOf(this.blogdelete);
            this.BlogsOfUserDelete.slice(index,1);
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
  margin-left: 45%;
}

.center-text {
  text-align: center;
}
</style>
