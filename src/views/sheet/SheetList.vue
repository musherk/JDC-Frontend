<template>
  <div class="sheet">
    <div class="row">
      <div class="col-10"><h1>Les fiches</h1></div>
      <div class="col-2"><button type="button" class="btn btn-success">Ajouter une fiche</button></div>
    </div>
    <div v-for="sheet in sheets"  :key="sheet.id">
      <SheetItem :sheet="sheet"/>
    </div>
  </div>
</template>
<style scoped>
  .sheet{
    margin-top: 2%;
  }
</style>

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