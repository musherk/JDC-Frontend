<template>
  <div>
     <form @submit.prevent="onUpdate">
            <h2>Editer un cours</h2>
            <div role="alert" class="alert alert-success" v-if="isUpdated">
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
             <button type="submit" class="btn btn-primary btn-lg ">Editer</button>
        </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'LessonAdd',
  data(){
     return {
       isUpdated:false,
       isError:false,
       lesson:{},
       teachers:[]
     }  
  },
  mounted(){
    this.getTeachers();
    const id = this.$route.params.id;
    axios.get(`http://localhost:8000/api/lessons/${id}`).then(res=>{
        this.lesson = res.data;
    }).catch(err=>{})
  },
  methods: {
    getTeachers(){
       axios.get(`http://localhost:8000/api/teachers`,{}).then((res) => {
        this.teachers = res.data;
      });
    },
    onUpdate(){
      axios.put(`http://localhost:8000/api/lessons/${this.lesson.id}`, this.lesson).then(res=>{
          if(res.status == 201){
             this.message = res.data.message;
             this.isUpdated=true;
             this.isError=false;
          }
      }).catch(err=>{
          this.message = err.response.data.message;
          this.isUpdated=false;
          this.isError=true;
      });
    },
  }
}
</script>
