<template>
    <div>
        <v-breadcrumbs :items="items">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>
        Page d'aide en attente de finitions 
    </div>
</template>

<script>
export default {
    name: 'Help',
    data: () => ({
      items: [
        {
          text: 'Accueil',
          disabled: false,
          href: 'home',
        },
        {
          text: 'Aide',
          disabled: true,
          href: 'help',
        }
      ],
    }),
}
</script>