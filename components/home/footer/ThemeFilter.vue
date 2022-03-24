<template>
    <v-tooltip top>
        <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" class="mx-6" @click="themeFilter = true"><v-icon left>mdi-account-cog</v-icon></v-btn>
        </template>
        <v-dialog
            persistent
            max-width="300px"
            transition="dialog-bottom-transition"
            v-model="themeFilter"
        >
            <v-card >
                <v-card-title class="justify-center"><span class="text-h5">{{ $t('message.preferenceTitle') }}</span></v-card-title>
                <v-divider class="md-2"></v-divider>

                <v-card-text class="ma-2 pa-2"
                >
                <v-checkbox 
                  v-for="(topicsTrends,i) in topicsTrends" :key="i"
                  v-model="selectedTopics"
                  :label="topicsTrends"
                  :value="topicsTrends"
                >
                </v-checkbox>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" @click="setFilterCookie()">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-tooltip>

        
</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'ThemeFilter',
  data: () => ({
    themeFilter: true,
    //topics: ['Science', 'Politique', 'Sport', 'Santé'],
    selectedTopics: [],
  }),
  mounted(){
  },
  computed:{
    ...mapState({
          topicsTrends: 'topicsTrends',
          trendsLoaded: 'trendsLoaded',
          //topicsFilter: state => state.topicsFilter.split(','),
    }),

  },
  methods:{
    setFilterCookie(){
        this.$cookies.set("topics", this.selectedTopics);
        this.$store.commit("setTopicsFilter", this.selectedTopics);
        this.themeFilter = false;
    }
}
};
</script>