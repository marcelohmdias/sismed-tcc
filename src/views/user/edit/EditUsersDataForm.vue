<template>
  <v-form>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 md8 lg6>
          <v-text-field
            name="full_name"
            :label="$t('page.profile.form.full_name')"
            type="text"
          />
        </v-flex>
        <v-flex xs12 sm6 md4 lg3>
          <app-date-picker>
            <v-text-field
              name="date_birth"
              :label="$t('page.profile.form.date_birth')"
              type="text"
              readonly
            />
          </app-date-picker>
        </v-flex>
        <v-flex xs12 sm6 md4 lg3>
          <app-select
            :items="sexItems"
            name="sex"
            :label="'page.profile.form.sex'"
            clearable
          />
        </v-flex>
        <v-flex xs12 sm6 md4 lg3>
          <v-text-field
            name="cpf"
            :label="$t('page.profile.form.cpf')"
            type="tel"
            mask="###.###.###-##"
          />
        </v-flex>
        <v-flex xs12 sm6 md4 lg3>
          <app-select
            :items="statusItem"
            name="status"
            :label="'page.profile.form.status'"
          />
        </v-flex>
        <v-flex xs12 sm6 md4 lg3>
          <app-select
            :items="permissionItem"
            name="permission_type"
            :label="'page.profile.form.permission_type'"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import FieldRules from '@/mixins/FieldRules'

export default {
  name: 'EditUserDataForm',
  mixins: [ FieldRules ],
  data () {
    return {
      sexItems: [
        { text: 'enums.sex.female', value: 1 },
        { text: 'enums.sex.male', value: 2 }
      ],
      statusItem: [
        { text: 'enums.status.inactive', value: 0 },
        { text: 'enums.status.active', value: 1 }
      ],
      permissionItem: [
        { text: 'enums.permission.attendant', value: 1 },
        { text: 'enums.permission.doctor', value: 2 },
        { text: 'enums.permission.manager', value: 3 }
      ]
    }
  }
}
</script>
