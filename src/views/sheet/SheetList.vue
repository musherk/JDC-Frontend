<template>
  <div class="sheet">
    <div class="row">
      <div class="col-10"><h1>Les fiches</h1></div>
      <div class="col-2">
        <router-link class="btn btn-success" to="/sheets/add">Ajouter une fiche</router-link ></div>
    </div>
    <div v-for="sheet in sheets"  :key="sheet.id">
      <SheetItem :sheet="sheet"/>
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
      sheets : []
    }
  },
  mounted(){
    this.getSheets();
  },
  methods:{
    getSheets(){
       axios.get(`http://localhost:8000/api/sheets`,{}).then((res) => {
        this.sheets = res.data;  
      });
    }
  }
}
</script>