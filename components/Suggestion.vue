<template>
    <!--<div v-if="areSources">-->
    <div v-if="areSources">
        <v-container>
            <v-row>
                <v-col>
                </v-col>
                <v-col>
                    <v-card color="orange lighten-1">
                        <v-card-title>Suggestions d'articles fiables<v-icon size="40px" right>mdi-head-lightbulb</v-icon></v-card-title>
                        <v-card-subtitle 
                            v-for="(item, i) in sourceSuggestionList"
                            :key="i"
                        >
                            {{ item.article }} 
                            <h5>{{ item.website }}</h5>
                            <v-divider></v-divider>     
                        </v-card-subtitle>
                    </v-card>
                </v-col>
                <v-col>
                </v-col>
            </v-row>  
        </v-container>   
    </div>
</template>

<script>
import axios from "axios";
import * as config from "../config";


export default {
  name: "Suggestion",
  components: {
  }, 
  data: () => ({
      sourceSuggestionList: ['Source1', 'Source 2'],
      areSources: true
  }),
  mounted(){
      const that = this;
      axios
        .get(`${config.API_BASE_URL}/entries/news/real/suggestion?theme=`+"mock_topic", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          that.sourceSuggestionList = res.data.content ;
          
          if(that.sourceSuggestionList.length != 0)
            that.areSources = true
          else
            that.areSources = false
        })
        .catch((err) => {
          console.log(err);
        });
  }
};
</script>