<template>
    <v-container v-if="isLastestNewsList">
        <v-row><v-col></v-col></v-row>
        <v-row><v-col></v-col></v-row>
        <h1 class="title">{{ $t("message.latestNews") }}</h1>
        <v-card
            color="orange lighten-1"
            dark
          >

            <v-list-item-group
              color="primary"
            >
              <v-list-item
                v-for="(item, i) in latestNewsList"
                :key="i"
              >
                <v-list-item-icon>
                  <v-icon>mdi-magnify</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>            
          </v-card>
    </v-container>
</template>

<script>
import axios from "axios";
import * as config from "../../config";


export default {
  name: "LatestNews",
  components: {
  }, 
  data: () => ({
      latestNewsList: [],
      isLastestNewsList: false
  }),
  mounted(){
      const that = this;
      axios
        .get(`${config.API_BASE_URL}/entries/news/fake/latest`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          that.latestNewsList = res.data.content ;
          if(that.latestNewsList.length != 0)
            that.isLastestNewsList = true
        })
        .catch((err) => {
          console.log(err);
        });
  }
};
</script>

