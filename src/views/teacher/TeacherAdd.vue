<template>
  <div>
     <form @submit.prevent="onSave">
            <h2>Ajouter un professeur</h2>
            <div role="alert" class="alert alert-success" v-if="isAdded">
                {{message}}
            </div>
             <div role="alert" class="alert alert-danger" v-if="isError">
                {{message}}
            </div>
            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label for="name">Nom du professeur</label>
                        <input type="text" id="name" v-model="teacher.name" class="form-control form-control-lg" required/>
                    </div>
                </div>
            </div>
            <br />
             <button class="btn btn-light btn-lg mr-2"><router-link class="nav-link" to="/teachers">Annuler</router-link></button>
             <button type="submit" class="btn btn-primary btn-lg ">Ajouter</button>
        </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'TeacherAdd',
  data(){
     return {
       isAdded:false,
       isError:false,
       message:'',
       teacher:{
         name:''
       }
     }  
  },
  methods: {
    onSave(){
      axios.post(`http://localhost:8000/api/teachers`, this.teacher).then(res=>{
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
