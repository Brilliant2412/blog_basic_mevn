
<template>
  <div class="component row">
    <div v-for="(blog, i) in blogs" :key="i" >
      <!-- v-if="!blog.deleted" -->
      <div class="col-sm" >
        <div class="card" style="width: 18rem">
          <img v-bind:src="blog.img" class="card-img-top" alt="" />
          <div class="card-body">
            <h5 class="card-title">{{blog.title}}</h5>
            <p class="card-text">{{blog.content}}</p>
          </div>
          <div class="card-body">
            <!--<router-link :to="'/blogs/' + blog.id " >Detail Blog</router-link>-->
            <a :href="`/blogs/${blog.id}`">Show</a>
            <!--<router-link :to="{ name: 'blogs', params: { id: blog.id }}">Edit Blog1</router-link>
            <router-link :to="'/blogs/' + blog.id" class="car-link">Edit Blog</router-link> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    blogs:{
      type: Array,
      required: true
    }
  },
  methods: {
  },
};
</script>
  
<style scoped>
.component{
   margin: 20px;
}
</style>
