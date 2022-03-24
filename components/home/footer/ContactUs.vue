<template>
    <v-tooltip top>
        <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" class="mx-6" @click="contactUsDialog = true"><v-icon left>mdi-email-outline</v-icon></v-btn>
        </template>
        <span>{{ $t('message.contactUs') }}</span>
        <v-dialog
            persistent
            max-width="500px"
            transition="dialog-top-transition"
            v-model="contactUsDialog"
        >
            <v-card>
                <v-card-title class="justify-center"><span class="text-h5"><v-icon left>mdi-email-edit</v-icon>{{ $t('message.writeUs') }}</span></v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Adresse e-mail" required filled outlined :rules="[emailRule]"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Objet" required filled outlined></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea filled label="Message" rows="8" row-height="20" required outlined></v-textarea>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>{{ $t('message.requiredField') }}</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="contactUsDialog = false">{{ $t('message.send') }}</v-btn>
                    <v-btn color="blue darken-1" text @click="contactUsDialog = false">{{ $t('message.cancel') }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-tooltip>

        
</template>

<script>
export default {
  name: 'ContactUs',
  data: () => ({
    contactUsDialog: false,
    emailRule: val => {
      var regexpEmail = /^[_a-z0-9-]+(.[a-z0-9-]+)@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;
      if(!regexpEmail.test(val)) return this.$t('message.invalidEmail')
      return true
    },
  }),
};
</script>