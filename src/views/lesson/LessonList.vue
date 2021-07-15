<template>
  <div class="lesson">
    <div class="row">
      <div class="col-10"><h1>Les cours</h1></div>
      <div class="col-2"><button type="button" class="btn btn-success">Ajouter un cours</button></div>
    </div>
    <div v-for="lesson in lessons"  :key="lesson.id">
      <LessonItem :lesson="lesson"/>
    </div>
  </div>
</template>
<style scoped>
  .lesson{
    margin-top: 2%;
  }
</style>

<script>
import axios from "axios";
import LessonItem from '@/components/LessonItem.vue'

export default {
  name: 'LessonList',
  components: {
    LessonItem
  },
  data(){
    return {
      lessons : []
    }
  },
  mounted(){
    this.getLessons();
  },
  methods:{
    getLessons(){
       axios.get(`http://localhost:8000/api/lessons`,{}).then((res) => {
        this.lessons = res.data;  
      });
    }
  }
}
</script>