<template>
  <div>
     <form @submit.prevent="onUpdate">
            <h2>Editer un professeur</h2>
            <div role="alert" class="alert alert-success" v-if="isUpdated">
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
             <button type="submit" class="btn btn-primary btn-lg ">Editer</button>
        </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'TeacherEdit',
  data(){
     return {
       isUpdated:false,
       isError:false,
       message:'',
       teacher: Object
     }  
  },
  mounted(){
      const id = this.$route.params.id;
      axios.get(`http://localhost:8000/api/teachers/${id}`).then(res=>{
         this.teacher = res.data;
      }).catch(err=>{})
  },
  methods: {
    onUpdate(){
      axios.put(`http://localhost:8000/api/teachers/${this.teacher.id}`, this.teacher).then(res=>{
          if(res.status == 201){
             this.message = res.data.message;
             this.isUpdated=true;
             this.isError=false;
          }
      }).catch(err=>{
          this.message = err.response.data.message;
          this.isUpdated=false;
          this.isError=true;
      })
    },
  }
}
</script>
