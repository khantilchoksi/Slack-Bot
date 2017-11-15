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
        name : "Feature 1 Design Review",
      },
      {
        name : "Feature 1 Implementation",
      },
      {
        name : "Feature 1 Acceptance Testing",
      },
      {
        name : "Feature 1 Code Review",
      },
      {
        name : "Feature 1 Deployment",
      },
      {
        name : "Feature 2 Design Review",
      },
      {
        name : "Feature 2 Implementation",
      },
      {
        name : "Feature 2 Acceptance Testing",
      },
      {
        name : "Feature 2 Code Review",
      },
      {
        name : "Feature 2 Deployment",
      }
    ],
    To_Do: [
      {
        name : "Feature 1 Deployment",
      },
      {
        name : "Feature 2 Deployment",
      }
    ],
    In_Progress: [
      {
        name : "Feature 1 Code Review",
      },
      {
        name : "Feature 2 Code Review",
      }
    ],
    To_Verify: [
      {
        name : "Feature 1 Implementation",
      },
      {
        name : "Feature 2 Implementation",
      }
    ],
    Done: [
      {
        name : "Feature 1 Design Review",
      },
      {
        name : "Feature 2 Design Review",
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
        name : "Customer Specification",
      },
      {
        name : "Non Disclosure Agreement",
      }
    ],
    Design: [
      {
        name : "Wireframe1",
      },
      {
        name : "Prototype2",
      }
    ],
    Implementation: [
      {
        name : "API implementation",
      },
      {
        name : "OAuth authorization",
      }
    ],
    Verification: [
      {
        name : "Code Review",
      },
      {
        name : "Acceptance Testing",
      }
    ],
    Maintenance: [
      {
        name : "Customer Feedback",
      },
      {
        name : "Support Issue",
      }
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
