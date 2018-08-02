export default {
  enums: {
    address: {
      CORRESPONDENCE: 'Correspondência',
      JOB: 'Trabalho',
      RESIDENCE: 'Residência'
    },
    contact: {
      fixed: 'Fixo',
      mobile: 'Celular'
    },
    permission: {
      attendant: 'Atendente',
      doctor: 'Médico',
      manager: 'Gestor'
    },
    sex: {
      female: 'Feminino',
      male: 'Masculino'
    },
    state: {
      AC: 'Acre',
      AL: 'Alagoas',
      AM: 'Amazonas',
      AP: 'Amapá',
      BA: 'Bahia',
      CE: 'Ceará',
      DF: 'Distrito Federal',
      ES: 'Espírito Santo',
      GO: 'Goiás',
      MA: 'Maranhão',
      MG: 'Minas Gerais',
      MS: 'Mato Grosso do Sul',
      MT: 'Mato Grosso',
      PA: 'Pará',
      PB: 'Paraíba',
      PE: 'Pernambuco',
      PI: 'Piauí',
      PR: 'Paraná',
      RJ: 'Rio de Janeiro',
      RN: 'Rio Grande do Norte',
      RO: 'Rondônia',
      RR: 'Roraima',
      RS: 'Rio Grande do Sul',
      SC: 'Santa Catarina',
      SE: 'Sergipe',
      SP: 'São Paulo',
      TO: 'Tocantins'
    },
    status: {
      active: 'Ativo',
      inactive: 'Inativo'
    }
  },
  globals: {
    app_name: 'SISMed App',
    full_name: 'SISMed: Sistema de Gestão Médica',
    short_name: 'SISMed',
    title: {
      attention: 'Atenção',
      edit: 'Edição',
      register: 'Cadastro',
      research: 'Consulta',
      search: 'Pesquisa'
    },
    button: {
      cancel: 'Cancelar',
      clean: 'Limpar',
      close: 'Fechar',
      come_back: 'Voltar',
      confirm: 'Confirmar',
      edit: 'Editar',
      new: 'Novo',
      remove: 'Remover',
      save: 'Salvar',
      search: 'Pesquisar',
      send: 'Enviar',
      signin: 'Acessar',
      signout: 'Sair',
      trade_password: 'Trocar Senha'
    },
    menu: {
      exams: 'Exames',
      home: 'Início',
      medical: 'Médicos',
      new_appointment: 'Novo',
      patients: 'Pacientes',
      permissions: 'Permissões',
      profile: 'Perfíl',
      record: 'Prontuário',
      research: 'Pesquisa',
      register: 'Cadastro',
      schedule: 'Agenda',
      users: 'Usuários'
    },
    table: {
      lines_per_page: 'Linhas por página',
      no_items_found: 'Nenhum item localizado',
      remove: 'Deseja remover o registro?'
    }
  },
  page: {
    login: {
      footer: 'Copyright &copy;',
      form_title: 'Digite seu e-mail e senha...',
      form_title_password: 'Digite a nova senha...',
      recover: 'Esqueci minha senha',
      recover_title: 'Digite seu e-mail...',
      form: {
        email: 'E-mail',
        password: 'Senha'
      }
    },
    medical: {
      form: {
        date: 'Data de Registro',
        registry: 'Registro',
        speciality: 'Especialidade'
      },
      title: {
        root: 'Médicos',
        specialities: 'Lista de Especialidades',
        speciality: 'Cadastro de Especialidades'
      },
      table: {
        date: 'Data de Registro',
        registry: 'Registro',
        speciality: 'Especialidade'
      }
    },
    patient: {
      form: {
        health_plan: 'Plano de Saúde',
        note: 'Observações',
        number_plan: 'Número do Plano'
      },
      title: {
        root: 'Pacientes'
      },
      table: {
        date_birth: 'Data de Nascimento',
        sex: 'Sexo'
      }
    },
    profile: {
      title: 'Perfil',
      address_title: 'Cadastro de Endereço',
      contact_title: 'Cadastro de Contato',
      password_title: 'Digite a nova senha...',
      form: {
        city: 'Cidade',
        complement: 'Complemento',
        contact_person: 'Pessoa para Contato',
        cpf: 'CPF',
        date_birth: 'Data de Nascimento',
        email: 'E-mail',
        full_name: 'Nome Completo',
        neighborhood: 'Bairro',
        new_password: 'Nova senha',
        number: 'Nº',
        number_phone: 'Número',
        old_password: 'Senha antiga',
        permission_type: 'Permissão',
        public_place: 'Logradouro',
        repeat_password: 'Repita a Senha',
        sex: 'Sexo',
        state: 'Estado',
        status: 'Situação',
        type: 'Tipo',
        zip_cod: 'CEP'
      },
      tab: {
        addresses: 'Endereços',
        contacts: 'Contatos',
        datas: 'Dados'
      },
      table: {
        address: {
          actions: 'Ações',
          zip_cod: 'CEP',
          public_place: 'Logradouro',
          complement: 'Complemento',
          number: 'Número',
          neighborhood: 'Bairro',
          city: 'Cidade',
          state: 'Estado',
          type: 'Tipo',
          status: 'Situração'
        },
        contact: {
          actions: 'Ações',
          number: 'Número',
          contact: 'Pessoa para Contato',
          type: 'Tipo',
          status: 'Situação'
        }
      }
    },
    schedule: {
      appointment_title: 'Cadastro de Agendamentos de Consulta',
      form: {
        date: 'Data',
        doctor: 'Médico',
        patient: 'Paciente'
      }
    },
    user: {
      form: {
        password: 'Senha'
      },
      table: {
        full_name: 'Nome Completo',
        email: 'E-mail',
        cpf: 'CPF',
        permission_type: 'Permissão',
        status: 'Situação'
      },
      title: {
        list_medical: 'Lista de Médicos',
        list_user: 'Lista de Usuários',
        permission: 'Permissões',
        root: 'Usuários'
      }
    }
  },
  message: {
    no_data: 'Nenhum registro localizado...',
    title: {
      default: {
        error: 'Erro...'
      },
      auth: 'Acesso ao Sistema',
      profile: 'Alteração de Perfil',
      password: 'Alteração de Senha',
      address: {
        new: 'Cadastro de Endereço',
        edit: 'Edição de Endereço',
        delete: 'Remoção de Endereço'
      },
      contact: {
        new: 'Cadastro de Contato',
        edit: 'Edição de Contato',
        delete: 'Remoção de Contato'
      },
      recovery: 'Recuperação de Senha',
      reset_password: 'Troca de Senha',
      search: 'Consulta de Registros',
      signin: 'Bem Vindo ao SISMed',
      signout: 'SISMed App',
      user: 'Tela de Usuário',
      user_delete: 'Deleção de Usuário'
    },
    success: {
      email_changed: 'Um e-mail para troca de senha foi enviado para o usuário.',
      generic: 'Operação realizada com sucesso.',
      signin: 'Login realizado com sucesso.',
      signout: 'Logout realizado com sucesso.'
    },
    error: {
      generic: 'Erro ao tentar acessar o sistema. Tente novamente.',
      internal_error: 'Ocorreu um erro ao processar a requisição.',
      inactive_register: 'Cadastro de usuário inatívo. Entre em contato com o administrador do sistema.',
      invalid_email: 'Atenção: Encontramos um erro com o e-mail digitado. Digite um novo o e-mail e tente novamente.',
      user_disabled: 'Atenção; Esta conta esta desativada. Contate um administrador e tente mais tarde.',
      user_not_found: 'Atenção: O e-mail digitado não corresponde a um usuário do sistema.',
      wrong_password: 'Atenção: Encontramos um erro com a senha digitada. Digite uma nova senha e tente novamente.'
    }
  },
  error: {
    login: {
      email_field: 'Digite um e-mail válido.',
      password_field: 'A senha deve conter no mínimo 6 caracteres.'
    },
    required: {
      city: 'O campo "Cidade" é obrigatório.',
      cpf: 'O campo "CPF" é obrigatório.',
      date_birth: 'O campo "Data de Nascimento" é obrigatório.',
      default: 'Este campo é obrigatório.',
      full_name: 'O campo "Nome Completo" é obrigatório.',
      neighborhood: 'O campo "Bairro" é obrigatório.',
      number: 'O campo "Número" é obrigatório.',
      number_phone: 'O campo "Número" é obrigatório.',
      public_place: 'O campo "Logradouro" é obrigatório.',
      sex: 'O campo "Sexo" é obrigatório.',
      state: 'O campo "Estado" é obrigatório.',
      status: 'O campo "Situação" é obrigatório.',
      type: 'O campo "Tipo" é obrigatório.'
    },
    profile: {
      password: 'O campo "Nova senha" é obrigatório e deve conter no mínimo 6 (seis) caracteres.',
      repeat_password: 'O valor digitado deve ser identico ao campo "Nova senha".'
    },
    user: {
      password: 'O campo "Senha" é obrigatório e deve conter no mínimo 6 (seis) caracteres.'
    }
  }
}
