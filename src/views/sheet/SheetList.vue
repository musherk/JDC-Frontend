<template>
  <div class="sheet">
    <div class="row">
      <div class="col-6"><h1>Les fiches</h1><i v-if="sheets.length != 0">Il y a {{sheets.length}} fiche(s)</i></div>
      <div class="col-2">
         <div class="form-group">
              <select class="form-select" @change="onLessonChange($event)" v-model="lessonSelected" required>
                  <option v-bind:value="-1" selected>Afficher toutes les fiches</option>
                  <option v-for="lesson in lessons" v-bind:key="lesson.id" v-bind:value="lesson.id">
                      {{ lesson.name }}
                  </option>
              </select>
      </div>
      </div>
      <div class="col-2">
        <router-link class="btn btn-success" to="/sheets/add">Ajouter une fiche</router-link ></div>
    </div>
    <div v-for="sheet in sheets"  :key="sheet.id">
      <SheetItem :sheet="sheet" @deleteSheet="deleteSheet($event)"/>
    </div>
    <div v-if="sheets.length == 0">
        Il n'y a aucune fiche actuellement...
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SheetItem from '@/components/SheetItem.vue'

export default {
  name: 'SheetList',
  components: {
    SheetItem
  },
  data(){
    return {
      sheets : [],
      sheetsOriginal : [],
      lessonSelected:-1,
      lessons: []
    }
  },
  mounted(){
    this.getSheets();
    this.getLessons();
  },
  methods:{
    deleteSheet(id){
      axios.delete(`http://localhost:8000/api/sheets/${id}`,{}).then((res) => {
        if(res.status===200){
          this.getSheets();
        }
      });
    },
    getLessons(){
       axios.get(`http://localhost:8000/api/lessons`,{}).then((res) => {
        this.lessons = res.data;  
      });
    },
    getSheets(){
       axios.get(`http://localhost:8000/api/sheets`,{}).then((res) => {
        this.sheets = this.sheetsOriginal = res.data;  
      });
    },
    onLessonChange(event){
      const lesson_id = event.target.value;
      if(lesson_id == -1){
        this.sheets = this.sheetsOriginal;
      }else{
        this.sheets = this.sheetsOriginal.filter(sheet => sheet.lesson_id == lesson_id);
      }
    }
  }
}
</script>