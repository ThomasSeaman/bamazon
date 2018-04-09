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


// connection.connect(function (e) {
//   // this will stop the execution of the code if an error is thrown
//   if (e) throw e
//   // console.log('Connected!')
//   connection.query('SELECT * FROM products', function (error, response) {
//     if (error) throw error
//     console.log(response)
//   })
// })

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
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
  var cleaningQuery = 'SELECT * FROM products WHERE department_name = "Cleaning Products"';
  
  inquirer.prompt({
    name: 'department_name',
    type: 'list',
    message: 'What cleaning product would you like to buy?',
    choices: [
      connection.query(cleaningQuery,{ department_name: 'Cleaning Products'}, function(error, response){
        for (var i = 1; i < response.length; i++) {
          console.log(response[i].product_name)
        }
      })
    ]
  })
}

function vitaminsSearch() {
      console.log('hello')
    }

function electronicsSearch() {
      console.log('hello')
    }

function appliancesSearch() {
      console.log('hello')
    }

  // inquirer
  //   .prompt({
  //     name: "cleaningProducts",
  //     type: "input",
  //     message: "What cleaning product would you like to purchase?"
  //   })
  //   .then(function(answer) {
  //     var query = "SELECT product_name FROM products";
  //     connection.query(query, { products: products.product_name }, function(err, res) {
  //       for (var i = 0; i < res.length; i++) {
  //         console.log("Position: " + res[i].product_name);
  //       }
  //       cleaningProductsSearch();
  //     });
  //   });






//   inquirer.prompt({
//     name: "Department",
//     type: "list",
//     message: "What department would you like to shop?",
//     choices: ["Cleaning Products", "Vitamins", "Electronics", "Appliances"]
//   })



//   connection.end()
// });