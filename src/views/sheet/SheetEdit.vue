<template>
  <div>
     <form @submit.prevent="onUpdate">
            <h2>Editer une fiche</h2>
            <div role="alert" class="alert alert-success" v-if="isUpdate">
                {{message}}
            </div>
             <div role="alert" class="alert alert-danger" v-if="isError">
                {{message}}
            </div>
            <div class="row">
                <div class="col-6">
                   <div class="form-group">
                        <label for="teacher">Cours</label><br />
                        <select class="form-select" v-model="sheet.lesson_id" required @change="onChangeLesson()">
                          <option v-for="lesson in lessons" v-bind:key="lesson.id" v-bind:value="lesson.id">
                            {{ lesson.name }}
                          </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="teacher">Professeur</label>
                        <input type="text" id="teacher" disabled class="form-control form-control-lg" v-model="teacher.name"/>
                    </div>
                    <div class="form-group">
                        <label for="local_number">Local</label>
                        <input type="text" id="local_number" v-model="sheet.local_number" class="form-control form-control-lg" required/>
                    </div>
                    <div class="form-group">
                      <label for="description">Description</label>
                      <textarea class="form-control" required v-model="sheet.description" id="description" rows="4"></textarea>
                    </div>
                </div>
            </div>
            <br />
             <button class="btn btn-light btn-lg mr-2"><router-link class="nav-link" to="/sheets">Annuler</router-link></button>
             <button type="submit" class="btn btn-primary btn-lg ">Editer</button>
        </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'SheetEdit',
  data(){
     return {
       isUpdate:false,
       isError:false,
       message:'',
       lessons:[],
       teacher:'',
       sheet:{}
     }  
  },
  mounted(){
    this.getLessons();
    const id = this.$route.params.id;
    axios.get(`http://localhost:8000/api/sheets/${id}`).then(res=>{
        this.sheet = res.data;
        axios.get(`http://localhost:8000/api/teachers/${this.sheet.teacher_id}`,{}).then((res) => {
          this.teacher = res.data;
        });
    }).catch(err=>{})
  },
  methods: {
    getLessons(){
       axios.get(`http://localhost:8000/api/lessons`,{}).then((res) => {
        this.lessons = res.data;
      });
    },
    onChangeLesson(){
        const {teacher_id} = this.lessons.find(lesson => lesson.id == this.sheet.lesson_id);
        this.sheet.teacher_id = teacher_id;
        axios.get(`http://localhost:8000/api/teachers/${teacher_id}`,{}).then((res) => {
          this.teacher = res.data;
        });
    },
    onUpdate(){
      axios.put(`http://localhost:8000/api/sheets/${this.sheet.id}`, this.sheet).then(res=>{
          if(res.status == 201){
             this.message = res.data.message;
             this.isUpdate=true;
             this.isError=false;
          }
      }).catch(err=>{
          this.message = err.response.data.message;
          this.isUpdate=false;
          this.isError=true;
      })
    },
  }
}
</script>
