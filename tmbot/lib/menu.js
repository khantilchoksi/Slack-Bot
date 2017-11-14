const menu = {
    scrum_lists: [
      {
        name : "Story",
        idBoard : "59eff60e5920e126b94ee55d"
      },
      {
        name : "To_Do",
        idBoard : "59eff60e5920e126b94ee55d"
      },
      {
        name : "In_Progress",
        idBoard : "59eff60e5920e126b94ee55d"
      },
      {
        name : "To_Verify",
        idBoard : "59eff60e5920e126b94ee55d"
      },
      {
        name : "Done",
        idBoard : "59eff60e5920e126b94ee55d"
      }
    ],
    Story: [
      {
        name : "White Box Testing",
      },
      {
        name : "Black Box Testing",
      }
    ],
    To_Do: [
      {
        name : "Testing1",
      },
      {
        name : "Testing2",
      }
    ],
    In_Progress: [
      {
        name : "Service1",
      },
      {
        name : "Service2",
      }
    ], 
    To_Verify: [
      {
        name : "Deployment1",
      },
      {
        name : "Deployment2",
      }
    ],
    Done: [
      {
        name : "Deployment1",
      },
      {
        name : "Deployment2",
      }
    ],
    waterfall_lists: [
        {
          name : "Requirements",
          idBoard : "59eff60e5920e126b94ee55d"
        },
        {
          name : "Design",
          idBoard : "59eff60e5920e126b94ee55d"
        },
        {
          name : "Implementation",
          idBoard : "59eff60e5920e126b94ee55d"
        },
        {
          name : "Verification",
          idBoard : "59eff60e5920e126b94ee55d"
        },
        {
          name : "Maintenance",
          idBoard : "59eff60e5920e126b94ee55d"
        }
      ],
    Requirements: [
      {
        name : "White Box Testing",
      },
      {
        name : "Black Box Testing",
      }
    ],
    Design: [
      {
        name : "Testing1",
      },
      {
        name : "Testing2",
      }
    ],
    Implementation: [
      {
        name : "Service1",
      },
      {
        name : "Service2",
      }
    ], 
    Verification: [
      {
        name : "Deployment1",
      },
      {
        name : "Deployment2",
      }
    ],
    Maintenance: [
      {
        name : "Deployment1",
      },
      {
        name : "Deployment2",
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

    listOfStoryCards() {
      return menu.Story.map(i => ({ name: i.name }));
    },

    listOfToDoCards() {
      return menu.To_Do.map(i => ({ name: i.name }));
    },

    listOfInProgressCards() {
      return menu.In_Progress.map(i => ({ name: i.name }));
    },

    listOfToVerifyCards() {
      return menu.To_Verify.map(i => ({ name: i.name }));
    },
    listOfDoneCards() {
      return menu.Done.map(i => ({ name: i.name }));
    },
    listOfRequirementsCards() {
      return menu.Requirements.map(i => ({ name: i.name }));
    },

    listOfDesignCards() {
      return menu.Design.map(i => ({ name: i.name }));
    },

    listOfImplementationCards() {
      return menu.Implementation.map(i => ({ name: i.name }));
    },

    listOfVerificationCards() {
      return menu.Verification.map(i => ({ name: i.name }));
    },
    listOfMaintenanceCards() {
      return menu.Maintenance.map(i => ({ name: i.name }));
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