var mysql = require('mysql');
var inquirer = require('inquirer');

// mySQL connection
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'bamazon',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

connection.connect(function (err) {
  if (err) throw err;
});

function runSearch() {
  inquirer.prompt({
    name: 'department_name',
    type: 'list',
    message: 'What department would you like to shop?',
    choices: [
      'Cleaning Products',
      'Vitamins',
      'Electronics',
      'Appliances'
    ]
  })
  .then(function (answer) {
    switch (answer.department_name) {
      case 'Cleaning Products':
      cleaningProductsSearch();
      break;
      
      case 'Vitamins':
      vitaminsSearch();
      break;
      
      case 'Electronics':
      electronicsSearch();
      break;
      
      case 'Appliances':
      appliancesSearch();
      break;
    }
  });
  
}
function cleaningProductsSearch() {
  var cleanArr = []
  var cleaningQuery = 'SELECT * FROM products WHERE ?';
  connection.query(cleaningQuery, { department_name: 'Cleaning Products' }, function (error, response) {
    for (var i = 0; i < response.length; i++) {
      cleanArr.push('Name: ' + response[i].product_name + ' Price: $' + response[i].price)
    }
    
    inquirer.prompt({
        name: 'department_name',
        type: 'list',
        message: 'What cleaning product would you like to buy?',
        choices: cleanArr
      })
    
    .then(function(answer){
      console.log(answer)
    }) 

    })
  }
// go through and display pricing to those options
// give the user a confirmation of the product they chose
// check store for quantity, if no then tell them
// if yes, remove count of product from SQL database using ALTER
// show purchase total to customer
  

// function(){
  // cleanArr.forEach(function(item){
    // return item.product_name + item.price


function vitaminsSearch() {
  var vitaminsArr = []
  var vitaminsQuery = 'SELECT * FROM products WHERE ?';
  connection.query(vitaminsQuery, { department_name: 'Vitamins' }, function (error, response) {
    for (var i = 0; i < response.length; i++) {
      vitaminsArr.push(response[i].product_name)
    }

    inquirer.prompt({
        name: 'department_name',
        type: 'list',
        message: 'What vitamin product would you like to buy?',
        choices: vitaminsArr
        })
      })
}


function electronicsSearch() {
  var electronicsArr = []
  var electronicsQuery = 'SELECT * FROM products WHERE ?';
  connection.query(electronicsQuery, { department_name: 'Electronics' }, function (error, response) {
    for (var i = 0; i < response.length; i++) {
      electronicsArr.push(response[i].product_name)
    }

    inquirer.prompt({
        name: 'department_name',
        type: 'list',
        message: 'What electronics product would you like to buy?',
        choices: electronicsArr
        })
      })
}

function appliancesSearch() {
  var appliancesArr = []
  var appliancesQuery = 'SELECT * FROM products WHERE ?';
  connection.query(appliancesQuery, { department_name: 'Appliances' }, function (error, response) {
    for (var i = 0; i < response.length; i++) {
      appliancesArr.push(response[i].product_name)
    }

    inquirer.prompt({
        name: 'department_name',
        type: 'list',
        message: 'What electronics product would you like to buy?',
        choices: appliancesArr
        })
      })
}

runSearch();
