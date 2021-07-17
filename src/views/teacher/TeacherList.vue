<template>
  <div class="teacher">
    <div class="row">
      <div class="col-10">
          <h1>Les professeurs</h1>
          <i v-if="teachers.length != 0">Il y a {{teachers.length}} professeur(s)</i>
        </div>
      <div class="col-2">
        <router-link class="btn btn-success" to="/teachers/add">Ajouter un professeur</router-link ></div>
    </div>
    <div v-for="teacher in teachers"  :key="teacher.id">
      <TeacherItem :teacher="teacher" @deleteTeacher="deleteTeacher($event)"/>
    </div>
    <div v-if="teachers.length == 0">
        Il n'y a aucun professeur actuellement...
    </div>
  </div>
</template>
<style scoped>
 
</style>

<script>
import axios from "axios";
import TeacherItem from '@/components/TeacherItem.vue'

export default {
  name: 'LessonList',
  components: {
    TeacherItem
  },
  data(){
    return {
      teachers : []
    }
  },
  mounted(){
    this.getTeachers();
  },
  methods:{
    deleteTeacher(id){
      axios.delete(`http://localhost:8000/api/teachers/${id}`,{}).then((res) => {
        if(res.status===200){
          this.getTeachers();
        }
      });
    },
    getTeachers(){
       axios.get(`http://localhost:8000/api/teachers`,{}).then((res) => {
        this.teachers = res.data;  
      });
    }
  }
}
</script>