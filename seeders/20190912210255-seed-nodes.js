'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Nodes', [{
      title: 'First node',
      list_id: 1,
      parent_id: null,
      notes: null,
      created_at: new Date().toDateString()
    },{
      title: 'Second node',
      list_id: 1,
      parent_id: null,
      notes: 'with notes',
      created_at: new Date().toDateString()
    }, {
      title: 'Child node',
      list_id: 1,
      parent_id: 2,
      notes: null,
      created_at: new Date().toDateString()
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Nodes', null, {});
  }
};
