<template>
  <div>
     <form @submit.prevent="onSave">
            <h2>Ajouter un cours</h2>
            <div role="alert" class="alert alert-success" v-if="isAdded">
                {{message}}
            </div>
             <div role="alert" class="alert alert-danger" v-if="isError">
                {{message}}
            </div>
            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label for="name">Nom du cours</label>
                        <input type="text" id="name" v-model="lesson.name" class="form-control form-control-lg" required/>
                    </div>
                </div>
            </div>
            <br />
            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label for="teacher">Professeur</label><br />
                        <select class="form-select" v-model="lesson.teacher_id" required>
                          <option v-for="teacher in teachers" v-bind:key="teacher.id" v-bind:value="teacher.id">
                            {{ teacher.name }}
                          </option>
                        </select>
                    </div>
                </div>
            </div>
            <br />
             <button class="btn btn-light btn-lg mr-2"><router-link class="nav-link" to="/lessons">Annuler</router-link></button>
             <button type="submit" class="btn btn-primary btn-lg ">Ajouter</button>
        </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'LessonAdd',
  data(){
     return {
       isAdded:false,
       isError:false,
       lesson:{
         name:'',
         teacher_id:''
       },
       teachers:[]
     }  
  },
  mounted(){
    this.getTeachers();
  },
  methods: {
    getTeachers(){
       axios.get(`http://localhost:8000/api/teachers`,{}).then((res) => {
        this.teachers = res.data;
      });
    },
    onSave(){
      axios.post(`http://localhost:8000/api/lessons`, this.lesson).then(res=>{
          if(res.status == 201){
             this.message = res.data.message;
             this.isAdded=true;
             this.isError=false;
          }
      }).catch(err=>{
          this.message = err.response.data.message;
          this.isAdded=false;
          this.isError=true;
      });
    },
  }
}
</script>
