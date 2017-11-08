const menu = {
    scrum_lists: [
      {
        name : "QA",
        idBoard : "59eff60e5920e126b94ee55d"
      },
      {
        name : "Testing",
        idBoard : "59eff60e5920e126b94ee55d"
      },
      {
        name : "Service",
        idBoard : "59eff60e5920e126b94ee55d"
      },
      {
        name : "Deployment",
        idBoard : "59eff60e5920e126b94ee55d"
      }
    ],
    QA: [
      {
        name : "White Box Testing",
      },
      {
        name : "Black Box Testing",
      }
    ],
    Testing: [
      {
        name : "Testing1",
      },
      {
        name : "Testing2",
      }
    ],
    Service: [
      {
        name : "Service1",
      },
      {
        name : "Service2",
      }
    ], 
    Deployment: [
      {
        name : "Deployment1",
      },
      {
        name : "Deployment2",
      }
    ],
    waterfall_lists: [
        {
          name : "Waterfall List 1",
          idBoard : "59eff60e5920e126b94ee55d"
        },
        {
          name : "Water fall list2",
          idBoard : "59eff60e5920e126b94ee55d"
        },
        {
          name : "Water fall list3",
          idBoard : "59eff60e5920e126b94ee55d"
        },
        {
          name : "Water list4",
          idBoard : "59eff60e5920e126b94ee55d"
        }
      ],
    options: [
      {
        id: 'strength',
        choices: [
          {
            id: 'single',
            name: 'Single',
          },
          {
            id: 'double',
            name: 'Double',
          },
          {
            id: 'triple',
            name: 'Triple',
          },
          {
            id: 'quad',
            name: 'Quad',
          },
        ],
      },
      {
        id: 'milk',
        choices: [
          {
            id: 'whole',
            name: 'Whole',
          },
          {
            id: 'lowfat',
            name: 'Low fat',
          },
          {
            id: 'almond',
            name: 'Almond',
          },
          {
            id: 'soy',
            name: 'Soy',
          },
        ],
      },
    ],
  
    listOfTypes() {
      return menu.items.map(i => ({ text: i.name, value: i.id }));
    },

    listOfScrumLists() {
        return menu.scrum_lists.map(i => ({ name: i.name, idBoard: i.idBoard }));
    },

    listOfWaterfallLists() {
        return menu.waterfall_lists.map(i => ({ name: i.name, idBoard: i.idBoard }));
    },

    listOfQACards() {
      return menu.QA.map(i => ({ name: i.name }));
    },

    listOfTestingCards() {
      return menu.Testing.map(i => ({ name: i.name }));
    },

    listOfServiceCards() {
      return menu.Service.map(i => ({ name: i.name }));
    },

    listOfDeploymentCards() {
      return menu.Deployment.map(i => ({ name: i.name }));
    },
  
    listOfChoicesForOption(optionId) {
      return menu.options.find(o => o.id === optionId).choices
        .map(c => ({ text: c.name, value: c.id }));
    },
  
    choiceNameForId(optionId, choiceId) {
      const option = menu.options.find(o => o.id === optionId);
      if (option) {
        return option.choices.find(c => c.id === choiceId).name;
      }
      return false;
    },
  };
  
  module.exports = menu;