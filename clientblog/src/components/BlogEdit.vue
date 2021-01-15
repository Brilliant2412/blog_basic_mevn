<template>
  <div class="container">
    <div class="row">
      <div class="mt-4">
        <h3>Edit Blog</h3>
        <form
          method="POST"
          enctype="multipart/form-data"
          @submit.prevent="saveBlog"
        >
          <div class="form-group">
            <label for="title">Title</label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="blogIsEdit.title"
            />
          </div>
          <div class="form-group">
            <label for="content">Content</label>
            <textarea
              name="content"
              id="content"
              class="form-control"
              v-model="blogIsEdit.content"
            ></textarea>
          </div>
          <div class="form-group">
            <h5>Change an image</h5>
            <div v-if="blogIsEdit.img">
              <img v-bind:src="blogIsEdit.img" alt="No image" />
              <input type="file" id="file" ref="file" @change="onFileChange" />
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Save Blog</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogIsEdit: {
        title: "",
        author: "",
        content: "",
        img: "",
      },
    };
  },
  async mounted() {
    let token = localStorage.getItem("jwt");
    if (token) {
      var linked = "/api/blog/" + this.$route.params.id;
      const response = await this.$http.get(linked, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      this.blogIsEdit = response.data.blog;
    }
  },
  methods: {
    onFileChange(event) {
      var files = event.target.files || event.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      reader.onload = (e) => {
        this.blogIsEdit.img = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    async saveBlog() {
      try {
        let token = localStorage.getItem("jwt");
        if (token) {
          var linked = "/api/blog/" + this.$route.params.id;
          // let response = await this.$http.post(linked,this.blogIsEdit,{
          //       headers : {
          //           Authorization: 'Bearer ' + token
          //       }
          //   });
          let response = await this.$http.put(linked,this.blogIsEdit,{
                headers : {
                    Authorization: 'Bearer ' + token
                }
            });
          this.$swal("Success", "Save successfully", "success");
          this.$router.push("/stored/blogs");
        }
      } catch (err) {
        this.$swal("Error", "Something went wrong", "error");
      }
    },
  },
};
</script>

<style scoped>
.card {
  width: 100%;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
  padding: 30px;
  margin: 20px auto;
  text-align: center;
}
.pad1d {
  margin: 10px 10px;
}

.width_100 {
  width: 100%;
}

img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
</style>