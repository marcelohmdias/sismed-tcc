import { AclRule } from 'vue-acl'
import { beforeEnter } from './event'

const loadView = (path) => () => {
  return import(/* webpackChunkName: "view-[request]" */ `@/views/${path}.vue`)
}

const isPublic = new AclRule('attendant').or('doctor').or('manager').generate()

const home = {
  beforeEnter,
  component: loadView('home/Home'),
  meta: {
    rule: isPublic,
    requiresAuth: true
  },
  name: 'Home',
  path: '/inicio'
}

const profile = {
  beforeEnter,
  component: loadView('profile/Profile'),
  meta: {
    rule: isPublic,
    requiresAuth: true
  },
  path: '/perfil',
  name: 'Profile'
}

const schedule = {
  beforeEnter,
  component: loadView('schedule/Schedule'),
  path: '/agenda',
  name: 'Schedule',
  meta: {
    rule: isPublic,
    requiresAuth: true
  }
}

const patients = {
  path: '/pacientes',
  name: 'Patients',
  component: loadView('patient/Patients'),
  meta: {
    rule: isPublic,
    requiresAuth: true
  },
  children: [
    {
      beforeEnter,
      path: '/pacientes/pesquisa',
      name: 'ResearchPatients',
      component: loadView('patient/ResearchPatients'),
      meta: {
        rule: isPublic,
        requiresAuth: true
      },
      props: {
        breadcrumbs: [
          {
            text: 'page.patient.title.root',
            icon: 'account-card-details'
          },
          {
            text: 'globals.title.research'
          }
        ]
      }
    },
    {
      beforeEnter,
      path: '/pacientes/novo',
      name: 'RegisterPatients',
      component: loadView('patient/RegisterPatients'),
      meta: {
        rule: isPublic,
        requiresAuth: true
      },
      props: {
        breadcrumbs: [
          {
            text: 'page.patient.title.root',
            icon: 'account-card-details'
          },
          {
            text: 'globals.title.register'
          }
        ]
      }
    },
    {
      beforeEnter,
      path: '/pacientes/edicao/:id',
      name: 'EditPatients',
      component: loadView('patient/RegisterPatients'),
      meta: {
        rule: isPublic,
        requiresAuth: true
      },
      props: {
        breadcrumbs: [
          {
            text: 'page.patient.title.root',
            icon: 'account-group'
          },
          {
            text: 'globals.title.edit'
          }
        ]
      }
    }
  ]
}

const records = {
  path: '/prontuarios',
  name: 'Records',
  component: loadView('record/Records'),
  meta: {
    rule: isPublic,
    requiresAuth: true
  },
  children: [
    {
      beforeEnter,
      path: '/prontuarios/pesquisa',
      name: 'ResearchRecords',
      component: loadView('record/ResearchRecords'),
      meta: {
        rule: isPublic,
        requiresAuth: true
      },
      props: {
        breadcrumbs: [
          {
            text: 'page.record.title.root',
            icon: 'clipboard-pulse'
          },
          {
            text: 'globals.title.research'
          }
        ]
      }
    },
    {
      beforeEnter,
      path: '/prontuarios/edicao/:id',
      name: 'RegisterRecords',
      component: loadView('record/RegisterRecords'),
      meta: {
        rule: isPublic,
        requiresAuth: true
      },
      props: {
        breadcrumbs: [
          {
            text: 'page.record.title.root',
            icon: 'clipboard-pulse'
          },
          {
            text: 'globals.title.edit'
          }
        ]
      }
    },
    {
      beforeEnter,
      path: '/prontuarios/exames',
      name: 'Exams',
      component: loadView('record/Exams'),
      meta: {
        rule: isPublic,
        requiresAuth: true
      },
      props: {
        breadcrumbs: [
          {
            text: 'page.record.title.root',
            icon: 'clipboard-pulse'
          },
          {
            text: 'page.exam.title.root'
          }
        ]
      }
    }
  ]
}

const users = {
  path: '/usuarios',
  name: 'Users',
  component: loadView('user/Users'),
  redirect: '/usuarios/pesquisa',
  meta: {
    rule: new AclRule('manager').generate(),
    requiresAuth: true
  },
  children: [
    {
      beforeEnter,
      path: '/usuarios/pesquisa',
      name: 'ResearchUsers',
      component: loadView('user/research/ResearchUsers'),
      meta: {
        rule: new AclRule('manager').generate(),
        requiresAuth: true
      },
      props: {
        breadcrumbs: [
          {
            text: 'page.user.title.root',
            icon: 'account-group'
          },
          {
            text: 'globals.title.research'
          }
        ]
      }
    },
    {
      beforeEnter,
      path: '/usuarios/novo',
      name: 'RegisterUsers',
      component: loadView('user/create/RegisterUsers'),
      meta: {
        rule: new AclRule('manager').generate(),
        requiresAuth: true
      },
      props: {
        breadcrumbs: [
          {
            text: 'page.user.title.root',
            icon: 'account-group'
          },
          {
            text: 'globals.title.register'
          }
        ]
      }
    },
    {
      beforeEnter,
      path: '/usuarios/edicao/:id',
      name: 'EditUsers',
      component: loadView('user/edit/EditUsers'),
      meta: {
        rule: new AclRule('manager').generate(),
        requiresAuth: true
      },
      props: {
        breadcrumbs: [
          {
            text: 'page.user.title.root',
            icon: 'account-group'
          },
          {
            text: 'globals.title.edit'
          }
        ]
      }
    }
  ]
}

const medical = {
  path: '/medicos',
  name: 'Medical',
  component: loadView('medical/Medical'),
  redirect: '/medicos/pesquisa',
  meta: {
    rule: new AclRule('manager').generate(),
    requiresAuth: true
  },
  children: [
    {
      beforeEnter,
      path: '/medicos/pesquisa',
      name: 'MedicalResearch',
      component: loadView('medical/MedicalResearch'),
      meta: {
        rule: new AclRule('manager').generate(),
        requiresAuth: true
      },
      props: {
        breadcrumbs: [
          {
            text: 'page.medical.title.root',
            icon: 'medical-bag'
          },
          {
            text: 'globals.title.research'
          }
        ]
      }
    },
    {
      beforeEnter,
      path: '/medicos/novo',
      name: 'RegisterMedicals',
      component: loadView('medical/RegisterMedicals'),
      meta: {
        rule: new AclRule('manager').generate(),
        requiresAuth: true
      },
      props: {
        breadcrumbs: [
          {
            text: 'page.medical.title.root',
            icon: 'medical-bag'
          },
          {
            text: 'globals.title.register'
          }
        ]
      }
    },
    {
      beforeEnter,
      path: '/medicos/edicao/:id',
      name: 'EditMedicals',
      component: loadView('medical/RegisterMedicals'),
      meta: {
        rule: new AclRule('manager').generate(),
        requiresAuth: true
      },
      props: {
        breadcrumbs: [
          {
            text: 'page.medical.title.root',
            icon: 'medical-bag'
          },
          {
            text: 'globals.title.edit'
          }
        ]
      }
    }
  ]
}

const children = [
  home,
  profile,
  schedule,
  patients,
  records,
  users,
  medical
]

export default [
  {
    component: loadView('auth/Auth'),
    name: 'Auth',
    path: '/login',
    meta: {
      rule: new AclRule('disconnected').generate()
    }
  },
  {
    component: loadView('auth/ChangePassword'),
    name: 'ResetPassword',
    path: '/troca-senha',
    meta: {
      rule: new AclRule('disconnected').generate()
    }
  },
  {
    children,
    component: loadView('base/Base'),
    name: 'Base',
    path: '/',
    redirect: '/inicio',
    meta: {
      rule: isPublic,
      requiresAuth: true
    }
  },
  {
    path: '*',
    redirect: '/inicio'
  }
]
