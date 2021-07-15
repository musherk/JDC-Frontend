<template>
  <div>
     <form @submit.prevent="onSave">
            <h2>Ajouter une fiche</h2>
            <div role="alert" class="alert alert-success" v-if="isAdded">
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
             <button type="submit" class="btn btn-primary btn-lg ">Ajouter</button>
        </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'SheetAdd',
  data(){
     return {
       isAdded:false,
       isError:false,
       message:'',
       lessons:[],
       teacher:'',
       sheet:{
         local_number:'',
         description:'',
         teacher_id:'',
         lesson_id:''
       }
     }  
  },
  mounted(){
    this.getLessons();
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
    onSave(){
      axios.post(`http://localhost:8000/api/sheets`, this.sheet).then(res=>{
          if(res.status == 201){
             this.message = res.data.message;
             this.isAdded=true;
             this.isError=false;
          }
      }).catch(err=>{
          this.message = err.response.data.message;
          this.isAdded=false;
          this.isError=true;
      })
    },
  }
}
</script>
