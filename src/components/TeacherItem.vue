<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-10"><b>{{teacher.name}}</b></div>
            <div class="col-1 align-self-end"><router-link :to="{ name: 'TeacherEdit', params: { id: teacher.id }}"><button class="btn btn-warning">Editer</button></router-link></div>
            <div class="col-1"><button type="button" class="btn btn-danger" @click="deleteTeacher">Supprimer</button></div>
          </div>
        </div>
        <div class="card-body" v-if="lessons.length>0">
          <blockquote class="blockquote mb-0">
            <i>{{lessons.length > 1 ? "Les":"Le"}} cours {{lessons.length > 1 ? "donnés":"donné"}} par {{teacher.name}} : </i>
          </blockquote>
            <div v-for="lesson in lessons"  :key="lesson.id">
                <div class="list-group-item list-group-item-action">{{lesson.name}}</div>
            </div>
        </div>
        <div class="card-body" v-else>Ne donne aucun cours</div>

      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: 'TeacherItem',
  props: {
    teacher : {
      type: Object,
      required:true
    }
  },
  data(){
    return {
      lessons:[],
    }
  },
  mounted() {
    this.getLessonsByTeacher();
  },
  methods:{
    deleteTeacher(){
      if(confirm(`Voulez-vous vraiment supprimer ce professeur ?\nEn supprimant ce professeur, vous risquez de perdre tous les cours liés à celui-ci !`)){
          this.$emit("deleteTeacher",this.teacher.id);
      }
    },
    getLessonsByTeacher(){
       axios.get(`http://localhost:8000/api/lessons/teacher/${this.teacher.id}`,{}).then((res) => {
        this.lessons = res.data;
      });
    }
  }
}
</script>
