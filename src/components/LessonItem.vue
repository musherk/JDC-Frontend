<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-10"><b>{{lesson.name}}</b></div>
            <div class="col-1 align-self-end"><button type="button" class="btn btn-warning">Editer</button></div>
            <div class="col-1"><button type="button" class="btn btn-danger">Supprimer</button></div>
          </div>
          
        </div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p><i>{{teacher.name}}</i> est le professeur {{isFirstLetterVowel ? "d'": "de "}}<b>{{lesson.name}}</b></p></blockquote>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'LessonItem',
  props: {
    lesson : {
      type: Object,
      required:true
    }
  },
  data(){
    return {
      teacher: Object,
      vowels: ['a', 'e', 'i', 'o', 'u', 'y'],
      isFirstLetterVowel:false
    }
  },
  mounted() {
    this.isFirstLetterVowel=this.vowels.includes(this.lesson.name.toLowerCase()[0]);
    this.getTeacher();
  },
  methods:{
    getTeacher(){
       axios.get(`http://localhost:8000/api/teachers/${this.lesson.teacher_id}`,{}).then((res) => {
        this.teacher = res.data;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.center-v {
  margin-top: auto;
  margin-bottom: auto;
}
</style>
