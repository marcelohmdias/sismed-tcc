
import Vue from 'vue'
import { AclInstaller, AclCreate, AclRule } from 'vue-acl'
import router from './index'

Vue.use(AclInstaller)

const { permission } = JSON.parse(window.sessionStorage.getItem('CURRENT_USER')) || {}

export default new AclCreate({
  initial: permission || 'disconnected',
  notfound: '/agenda',
  router,
  globalRules: {
    attendant: new AclRule('attendant').generate(),
    disconnected: new AclRule('disconnected').generate(),
    doctor: new AclRule('doctor').generate(),
    manager: new AclRule('manager').generate(),
    user: new AclRule('attendant').or('doctor').generate(),
    public: new AclRule('attendant').or('doctor').or('manager').generate()
  }
})
