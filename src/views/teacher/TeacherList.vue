<template>
  <div class="teacher">
    <div class="row">
      <div class="col-10"><h1>Les professeurs</h1></div>
      <div class="col-2"><button type="button" class="btn btn-success">Ajouter un professeur</button></div>
    </div>
    <div v-for="teacher in teachers"  :key="teacher.id">
      <TeacherItem :teacher="teacher"/>
    </div>
  </div>
</template>
<style scoped>
  .teacher{
    margin-top: 2%;
  }
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
    getTeachers(){
       axios.get(`http://localhost:8000/api/teachers`,{}).then((res) => {
        this.teachers = res.data;  
      });
    }
  }
}
</script>