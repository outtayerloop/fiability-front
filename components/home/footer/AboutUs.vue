<template>
    <v-tooltip top>
    <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" class="mx-6" @click="aboutUsDialog = true"><v-icon  left>mdi-account-group</v-icon></v-btn>
    </template>
    <span>{{ $t("message.whoWeAre") }}</span>
        <v-dialog
            max-width="510px"
            transition="dialog-top-transition"
            v-model="aboutUsDialog"
        >
            <v-card>
                <v-card-title class="justify-center"><span class="text-h5">{{ $t("message.aboutUs") }}</span></v-card-title>
                <v-card-text>
                <v-container>
                   {{ $t("message.aboutUsContent1") }}<br>
                </v-container>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="aboutUsDialog = false">{{ $t("message.close") }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-tooltip>

        
</template>

<script>
export default {
  name: 'AboutUs',
  data: () => ({
    aboutUsDialog: false
  }),
};
</script>