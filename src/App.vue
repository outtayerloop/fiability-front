<template>
  <v-app id="inspire">
    <router-view />
  </v-app>
</template>

<script>
import * as constants from "./constants";


export default {
  name: constants.APP_NAME,
};

</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>

