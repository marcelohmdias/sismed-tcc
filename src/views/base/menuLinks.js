export default [
  {
    icon: 'calendar-clock',
    name: 'Schedule',
    rule: 'public',
    title: 'globals.menu.schedule'
  },
  {
    icon: 'account-card-details',
    name: 'Patients',
    rule: 'public',
    title: 'globals.menu.patients',
    children: [
      {
        icon: 'magnify',
        name: 'ResearchPatients',
        rule: 'public',
        title: 'globals.menu.research'
      },
      {
        icon: 'account-plus',
        name: 'RegisterPatients',
        rule: 'public',
        title: 'globals.menu.register'
      }
    ]
  },
  {
    icon: 'clipboard-pulse',
    name: 'Record',
    rule: 'public',
    title: 'globals.menu.record',
    children: [
      {
        icon: 'magnify',
        name: 'ResearchRecords',
        rule: 'public',
        title: 'globals.menu.research'
      },
      {
        icon: 'heart-pulse',
        name: 'Exams',
        rule: 'public',
        title: 'globals.menu.exams'
      }
    ]
  },
  {
    icon: 'account-group',
    name: 'Users',
    rule: 'public',
    title: 'globals.menu.users',
    children: [
      {
        icon: 'magnify',
        name: 'ResearchUsers',
        rule: 'public',
        title: 'globals.menu.research'
      },
      {
        icon: 'account-settings-variant',
        name: 'RegisterUsers',
        rule: 'public',
        title: 'globals.menu.register'
      }
    ]
  },
  {
    icon: 'medical-bag',
    name: 'Medical',
    rule: 'manager',
    title: 'globals.menu.medical',
    children: [
      {
        icon: 'magnify',
        name: 'MedicalResearch',
        rule: 'manager',
        title: 'globals.menu.research'
      },
      {
        icon: 'clipboard-account',
        name: 'RegisterMedicals',
        rule: 'manager',
        title: 'globals.menu.register'
      }
    ]
  }
]
