<template>
  <div class="lesson">
    <div class="row">
      <div class="col-10"><h1>Les cours</h1><i v-if="lessons.length != 0">Il y a {{lessons.length}} cours</i></div>
 <div class="col-2">
        <router-link class="btn btn-success" to="/lessons/add">Ajouter un cours</router-link ></div>    </div>
        <div v-for="lesson in lessons"  :key="lesson.id">
          <LessonItem :lesson="lesson" @deleteLesson="deleteLesson($event)"/>
        </div>
        <div v-if="lessons.length == 0">
           Il n'y a aucun cours actuellement...
        </div>
  </div>
</template>

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
    deleteLesson(id){
      axios.delete(`http://localhost:8000/api/lessons/${id}`,{}).then((res) => {
        if(res.status===200){
          this.getLessons();
        }
      });
    },
    getLessons(){
       axios.get(`http://localhost:8000/api/lessons`,{}).then((res) => {
        this.lessons = res.data;  
      });
    }
  }
}
</script>