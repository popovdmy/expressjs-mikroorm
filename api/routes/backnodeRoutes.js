module.exports = function(app) {
  var backnodeList = require('../controllers/backnodeController');

  // backnodeList Routes
  app.route('/tasks')
    .get(backnodeList.list_all_tasks)
    .post(backnodeList.create_a_task);


  app.route('/tasks/:taskId')
    .get(backnodeList.read_a_task)
    .put(backnodeList.update_a_task)
    .delete(backnodeList.delete_a_task);
};

"use strict";
myFunction();

function myFunction() {
x = 3.14;       // This will not cause an error.
}