import { beforeEnter } from './event'

const loadView = (path) => () => {
  return import(/* webpackChunkName: "view-[request]" */ `@/views/${path}.vue`)
}

const home = {
  beforeEnter,
  component: loadView('home/Home'),
  meta: {
    requiresAuth: true
  },
  name: 'Home',
  path: '/inicio'
}

const profile = {
  beforeEnter,
  component: loadView('profile/Profile'),
  meta: {
    requiresAuth: true
  },
  path: '/perfil',
  name: 'Profile'
}

const schedule = {
  beforeEnter,
  component: loadView('schedule/Schedule'),
  path: '/agenda',
  name: 'Schedule'
}

const patients = {
  path: '/pacientes',
  name: 'Patients',
  component: loadView('patient/Patients'),
  children: [
    {
      beforeEnter,
      path: '/pacientes/pesquisa',
      name: 'ResearchPatients',
      component: loadView('patient/ResearchPatients'),
      meta: {
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
  children: [
    {
      beforeEnter,
      path: '/prontuarios/pesquisa',
      name: 'ResearchRecords',
      component: loadView('record/ResearchRecords')
    },
    {
      beforeEnter,
      path: '/prontuarios/novo',
      name: 'RegisterRecords',
      component: loadView('record/RegisterRecords')
    },
    {
      beforeEnter,
      path: '/prontuarios/exames',
      name: 'Exams',
      component: loadView('record/Exams')
    }
  ]
}

const users = {
  path: '/usuarios',
  name: 'Users',
  component: loadView('user/Users'),
  redirect: '/usuarios/pesquisa',
  children: [
    {
      beforeEnter,
      path: '/usuarios/pesquisa',
      name: 'ResearchUsers',
      component: loadView('user/research/ResearchUsers'),
      meta: {
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
  children: [
    {
      beforeEnter,
      path: '/medicos/pesquisa',
      name: 'MedicalResearch',
      component: loadView('medical/MedicalResearch'),
      meta: {
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

export default [
  {
    component: loadView('auth/Auth'),
    name: 'Auth',
    path: '/login'
  },
  {
    component: loadView('auth/ChangePassword'),
    name: 'ResetPassword',
    path: '/troca-senha'
  },
  {
    component: loadView('base/Base'),
    children: [
      home,
      profile,
      schedule,
      patients,
      records,
      users,
      medical
    ],
    name: 'Base',
    path: '/',
    redirect: '/inicio'
  },
  {
    path: '*',
    redirect: '/inicio'
  }
]
