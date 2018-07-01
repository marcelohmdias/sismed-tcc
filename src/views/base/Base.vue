<template>
  <div>
    <v-navigation-drawer :mini-variant="mini" :clipped="true" v-model="drawer" app fixed>
      <v-flex>
        <v-avatar class="d-block mb-3 mt-3 mx-auto" :size="size" tile="">
          <img :src="logo" alt="Logo" />
        </v-avatar>
      </v-flex>
      <v-list dense>
        <template v-for="item in menuLinks">
          <v-list-group v-if="item.children" :key="item.name">
            <v-list-tile slot="activator">
              <v-list-tile-action>
                <v-icon class="mdi" :class="`mdi-${item.icon}`" />
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-t="item.title" />
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="child in item.children" :to="{ name: child.name }" :key="child.name">
              <v-list-tile-action>
                <v-icon class="mdi" :class="`mdi-${child.icon}`" />
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-t="child.title" />
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile :to="{ name: item.name }" :key="item.mame" v-else>
            <v-list-tile-action>
              <v-icon class="mdi" :class="`mdi-${item.icon}`" />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-t="item.title" />
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
      <v-flex>
        <v-btn block color="primary" @click.stop="miniMenu" dark flat>
          <v-icon class="mdi" :class="`mdi-chevron-${position}`" />
        </v-btn>
      </v-flex>
    </v-navigation-drawer>
    <v-toolbar color="primary" :clipped-left="true" dark app fixed>
      <v-toolbar-title class="ml-0 pl-0">
        <v-toolbar-side-icon @click.stop="showMenu" />
        <router-link
          class="hidden-sm-and-down title"
          :to="{ name: 'Home' }"
          v-t="'globals.app_name'"
        />
      </v-toolbar-title>
      <v-spacer />
      <v-menu offset-y>
        <v-btn slot="activator" dark icon>
          <v-icon>apps</v-icon>
        </v-btn>
        <v-list dense>
          <v-list-tile :to="{ name: 'Profile' }">
            <v-list-tile-action>
              <v-icon class="mdi mdi-account-circle" />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-t="'globals.menu.profile'" />
            </v-list-tile-content>
          </v-list-tile>
          <v-divider />
          <v-list-tile @click="signout">
            <v-list-tile-action>
              <v-icon class="mdi mdi-logout-variant" />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-t="'globals.button.signout'" />
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-flex xs12>
          <router-view />
        </v-flex>
      </v-container>
    </v-content>
    <v-footer color="primary" app dark>
      <span class="v-footer__text" v-t="'globals.full_name'" />
      <span class="v-footer__text">&copy; 2018</span>
    </v-footer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { removeUser } from '@/helpers/storage'

import menuLinks from './menuLinks'
import logo from '@/assets/logo.svg'

const actions = mapActions({
  getUserEntity: 'profile/GET_DATA_USER',
  signoutUser: 'auth/SIGNOUT_USER'
})

export default {
  name: 'AppBase',
  data: () => ({
    drawer: null,
    mini: false,
    position: 'left',
    size: 120,
    logo,
    menuLinks
  }),
  methods: {
    ...actions,
    showMenu () {
      this.drawer = !this.drawer
    },
    miniMenu () {
      this.mini = !this.mini
      this.size = this.mini ? 48 : 120
      this.position = this.mini ? 'right' : 'left'
    },
    async signout () {
      try {
        this.$Progress.start()
        await this.signoutUser()
        this.unsubscribe()
        removeUser()
        setTimeout(() => this.$router.push({ name: 'Auth' }), 500)
      } catch (err) {
        this.$Progress.fail()
      }
    }
  },
  mounted () {
    this.getUserEntity({ uid: this.$store.state.auth.user }).then((fn) => {
      this.unsubscribe = fn
    })
  }
}
</script>

<style lang="stylus" scoped>
.title
  color #fff
  font-family 'Audiowide', cursive !important
  letter-spacing 0.1em
  text-decoration none

.v-footer__text
  padding-left 1em
</style>
