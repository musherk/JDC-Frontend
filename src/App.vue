<template>
 
 <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <router-link class="navbar-brand" to="/">Journal de Classe</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
            <router-link class="nav-link pr-3" to="/sheets">Journal</router-link>
        </li>
        <li class="nav-item">
         <router-link class="nav-link pr-3" to="/teachers">Professeurs</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link pr-3" to="/lessons">Cours</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
<div class="container position">
  <router-view/>
</div>
<footer>
  © Musheh Kazarjan | 2021
</footer>
</template>

<style lang="scss">
.active{
    color: white;
    font-weight: bold;
  }

  .position{
    margin-top: 2%;
    margin-bottom: 2%;
  }

  footer{
    margin-bottom: 1%;
    margin-right: 1%;

    text-align: right;
  }

</style>


<script>
  export default {
    name: "App",
    watch: {
          $route: {
              immediate: true,
              handler(to) {
                  document.title = to.meta.title || "Accueil";
              }
          }
    },
  }
</script>
