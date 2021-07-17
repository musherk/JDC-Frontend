<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-10"><b>{{lesson.name}} - {{teacher.name}} - {{sheet.local_number}}</b></div>
            <div class="col-1 align-self-end"><router-link :to="{ name: 'SheetEdit', params: { id: sheet.id }}"><button class="btn btn-warning">Editer</button></router-link></div>
            <div class="col-1"><button type="button" class="btn btn-danger" @click="deleteSheet">Supprimer</button></div>
          </div>
          
        </div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>{{sheet.description}}</p></blockquote>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'SheetItem',
  props: {
    sheet : {
      type: Object,
      required:true
    }
  },
  data(){
    return {
       teacher:Object,
       lesson:Object
    }
  },
  mounted() {
    this.getTeacher();
    this.getLesson();
  },
  methods:{
    deleteSheet(){
      if(confirm(`Voulez-vous vraiment supprimer cette fiche ?`)){
          this.$emit("deleteSheet",this.sheet.id);
      }
    },
    getTeacher(){
       axios.get(`http://localhost:8000/api/teachers/${this.sheet.teacher_id}`,{}).then((res) => {
        this.teacher = res.data;
      });
    },
    getLesson(){
       axios.get(`http://localhost:8000/api/lessons/${this.sheet.lesson_id}`,{}).then((res) => {
        this.lesson = res.data;
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
