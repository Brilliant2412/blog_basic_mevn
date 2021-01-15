<template>
  <div class="component">
    <div class="col-sm row"></div>
    <div>
      <div class="jumbotron">
        <img
          v-bind:src="blogDetail.img"
          class="p-2 justify-content-center"
          alt="load Image"
        />
        <h1 class="display-4 ml4">{{ blogDetail.title }}</h1>
        <hr class="my-4" />
        <p class="lead ml4" style="white-space: pre">
          {{ blogDetail.content }}
        </p>
        <!-- <p></p> -->
        <span class="ml4">author : {{ blogDetail.author }}</span>
        <!-- </div>


        <div class="d-flex flex-column bd-highlight mb-3 justify-content-center width_100">
          <img
            v-bind:src="blogDetail.img"
            class="p-2 justify-content-center"
            alt="load Image"
          />
          <div class="p-2 justify-content-center center-text">{{ blogDetail.title }}</div>
          <div class="p-2 justify-content-center center-text">{{ blogDetail.content }}</div>
          <div class="p-2 justify-content-center center-text">{{ blogDetail.author }}</div>
      </div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      blogDetail: {
        title: "",
        content: "",
        img: "",
        author: "",
      },
      username: ""
    };
  },
  methods: {
    getUserDetails() {
      var user = JSON.parse(localStorage.getItem("user"));
      this.username = user.username;
    },
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
      this.blogDetail = response.data.blog;
      this.blogDetail.author = this.username;
      console.log(this.blogDetail);
    }
  },
  created() {
    this.getUserDetails();
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

.center-text {
  text-align: center;
}

.ml4 {
  margin-left: 40%;
}
</style>