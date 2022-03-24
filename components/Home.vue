<template>
  <div>
    <Bar/>
       <v-main>
         <v-row>
           <v-col cols="8">
              <Trends/>
           </v-col>
           <v-col cols="4">
              <LatestNews/>
              <Charter/>
           </v-col>
         </v-row>
          
          <Footer/>
       </v-main>

  </div>
</template>

<script>
import * as constants from "../constants";
import Bar from "./home/Bar.vue";
import Footer from "./home/Footer.vue";
import Trends from "./home/Trends.vue";
import Charter from "./home/UserCharter.vue";
import LatestNews from "./home/LatestNews.vue";

export default {
  name: constants.HOME_NAME,
  components: {
    Bar,
    Footer,
    Trends,
    Charter,
    LatestNews
  }
};
</script>
