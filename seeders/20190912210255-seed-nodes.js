'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Nodes', [{
      title: 'First node',
      list_id: 1,
      parent_id: null,
      order: 1,
      notes: null,
      created_at: new Date()
    }, {
      title: 'Second node',
      list_id: 1,
      parent_id: null,
      order: 2,
      notes: 'with notes',
      created_at: new Date()
    }, {
      title: 'Child node',
      list_id: 1,
      parent_id: 2,
      order: 1,
      notes: null,
      created_at: new Date()
    }, {
      title: 'Second child node',
      list_id: 1,
      parent_id: 2,
      order: 2,
      notes: null,
      created_at: new Date()
    },{
      title: 'Third node',
      list_id: 1,
      parent_id: null,
      order: 3,
      notes: 'with notes',
      created_at: new Date()
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Nodes', null, {});
  }
};
