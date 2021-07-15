<template>
  <div class="lesson">
    <div class="row">
      <div class="col-10"><h1>Les cours</h1></div>
 <div class="col-2">
        <router-link class="btn btn-success" to="/lessons/add">Ajouter un cours</router-link ></div>    </div>
        <div v-for="lesson in lessons"  :key="lesson.id">
          <LessonItem :lesson="lesson"/>
        </div>
        <div v-if="lessons.length == 0">
           Il n'y a aucun cours actuellement...
        </div>
  </div>
</template>
<style scoped>
  
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