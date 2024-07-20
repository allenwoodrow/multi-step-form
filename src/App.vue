<template>
  <div id="app">
    <GlobalLoader>
      <CircleSpinner />
    </GlobalLoader>
    <NavbarComponent />
    <router-view />
  </div>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue'
import GlobalLoader from 'vue-global-loader/GlobalLoader.vue'
import CircleSpinner from 'vue-global-loader/CircleSpinner.vue'


export default {
  components: {
    NavbarComponent,
    GlobalLoader,
    CircleSpinner,
  }
}
</script>

<style>
body {
  color: #343a40;
}
</style>
