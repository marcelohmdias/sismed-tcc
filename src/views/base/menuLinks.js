export default [
  {
    icon: 'home',
    name: 'Home',
    title: 'globals.menu.home'
  },
  {
    icon: 'calendar-clock',
    name: 'Schedule',
    title: 'globals.menu.schedule'
  },
  {
    icon: 'account-card-details',
    name: 'Patients',
    title: 'globals.menu.patients',
    children: [
      {
        icon: 'magnify',
        name: 'ResearchPatients',
        title: 'globals.menu.research'
      },
      {
        icon: 'account-plus',
        name: 'RegisterPatients',
        title: 'globals.menu.register'
      }
    ]
  },
  {
    icon: 'clipboard-pulse',
    name: 'Record',
    title: 'globals.menu.record',
    children: [
      {
        icon: 'magnify',
        name: 'ResearchRecords',
        title: 'globals.menu.research'
      },
      {
        icon: 'clipboard-account',
        name: 'RegisterRecords',
        title: 'globals.menu.register'
      },
      {
        icon: 'heart-pulse',
        name: 'Exams',
        title: 'globals.menu.exams'
      }
    ]
  },
  {
    icon: 'account-group',
    name: 'Users',
    title: 'globals.menu.users',
    children: [
      {
        icon: 'magnify',
        name: 'ResearchUsers',
        title: 'globals.menu.research'
      },
      {
        icon: 'account-settings-variant',
        name: 'RegisterUsers',
        title: 'globals.menu.register'
      }
    ]
  },
  {
    icon: 'medical-bag',
    name: 'Medical',
    title: 'globals.menu.medical',
    children: [
      {
        icon: 'magnify',
        name: 'MedicalResearch',
        title: 'globals.menu.research'
      },
      {
        icon: 'clipboard-account',
        name: 'RegisterMedicals',
        title: 'globals.menu.register'
      }
    ]
  },
  {
    icon: 'tune',
    name: 'Management',
    title: 'globals.menu.management',
    children: [
      {
        icon: 'clipboard-text',
        name: 'Reports',
        title: 'globals.menu.reports'
      }
    ]
  }
]
