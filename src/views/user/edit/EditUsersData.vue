<template>
  <v-card flat>
    <app-edit-users-data-form />
    <v-card-actions>
      <v-btn
        type="submit"
        form="EditUserForm"
        color="secondary"
      >
        <app-icon name="content-save" request />
        <span v-t="'globals.button.save'" />
      </v-btn>
      <v-btn color="secondary" :to="{ name: 'ResearchUsers' }" >
        <app-icon name="subdirectory-arrow-left" />
        <span v-t="'globals.button.come_back'" />
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import AppEditUsersDataForm from './EditUsersDataForm'

export default {
  name: 'EditUserData',
  components: { AppEditUsersDataForm }
}
</script>
