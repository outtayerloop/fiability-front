<template>
    <div>
    <v-row justify="center">
        <v-col></v-col>
        
        <v-col cols="12">
            <v-expansion-panels inset focusable hover >
                <v-expansion-panel>
                    <v-expansion-panel-header color="#546E7A"><span><v-icon right>mdi-book</v-icon>{{ $t('message.userCharter')}}</span></v-expansion-panel-header>
                    <v-expansion-panel-content color="#B0BEC5">
                    <br>
                    Cher internaute, <br><br>
                    Nous aimerions vous faire savoir comment votre site FIAbility gère les données :-)<br>
                    Aucune donnée personnelle n'est demandée ou conservée au sein de notre application.<br>
                    La seule donnée que nous pouvons être suceptible de garder est la proposition de source sur base de volontariat, qui sert à agrandir le capital de votre site et pourra être mis au profit de tous et toutes.<br><br>
                    <div class="signature">Votre équipe FIAbility.</div>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-col>
        <v-col ></v-col>
  </v-row>
    </div>
</template>


<style>
.signature{
    text-align: end;
}
</style>