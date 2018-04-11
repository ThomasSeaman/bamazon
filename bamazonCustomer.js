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
      cleanArr.push(response[i].product_name)
    }

    inquirer.prompt({
      name: 'cleaning_products',
      type: 'list',
      message: 'What cleaning product would you like to buy?',
      choices: cleanArr
    })

      .then(function (answer) {
        var cleaningProductsAnswer = answer.cleaning_products
        var answerCleaningArr = []
        var answerCleaningQuery = 'SELECT * FROM products WHERE ?';
        connection.query(answerCleaningQuery, { product_name: answer.cleaning_products }, function (err, res) {
          answerCleaningArr.push('Price: $' + res[0].price + ' - How many would you like to buy?')

          inquirer.prompt({
            name: "quantity",
            type: "input",
            message: answerCleaningArr.toString(),
            default: "1-100",
            validate: function (value) {
              if (isNaN(value) === false && value > 0 && value < 100) {
                return true;
              }
              return false;
            }
          })

            .then(function (answer) {
              var cleaningQuantityQuery = 'UPDATE products SET stock_quantity = stock_quantity - ' + answer.quantity + ' WHERE ?';
              connection.query(cleaningQuantityQuery, { product_name: cleaningProductsAnswer }, function (err, res) {
                console.log("Thank you for you purchase!")
              })
            })
        })
      })
  })
}

function vitaminsSearch() {
  var vitaminArr = []
  var vitaminQuery = 'SELECT * FROM products WHERE ?';
  connection.query(vitaminQuery, { department_name: 'Vitamins' }, function (error, response) {
    for (var i = 0; i < response.length; i++) {
      vitaminArr.push(response[i].product_name)
    }

    inquirer.prompt({
      name: 'vitamin_products',
      type: 'list',
      message: 'What vitamin product would you like to buy?',
      choices: vitaminArr
    })

      .then(function (answer) {
        var vitaminProductsAnswer = answer.vitamin_products
        var answerVitaminArr = []
        var answerVitaminQuery = 'SELECT * FROM products WHERE ?';
        connection.query(answerVitaminQuery, { product_name: answer.vitamin_products }, function (err, res) {
          answerVitaminArr.push('Price: $' + res[0].price + ' - How many would you like to buy?')

          inquirer.prompt({
            name: "vitaminQuantity",
            type: "input",
            message: answerVitaminArr.toString(),
            default: "1-100",
            validate: function (value) {
              if (isNaN(value) === false && value > 0 && value < 100) {
                return true;
              }
              return false;
            }
          })

            .then(function (answer) {
              var vitaminQuantityQuery = 'UPDATE products SET stock_quantity = stock_quantity - ' + answer.vitaminQuantity + ' WHERE ?';
              connection.query(vitaminQuantityQuery, { product_name: vitaminProductsAnswer }, function (err, res) {
                console.log("Thank you for you purchase!")
              })
            })
        })
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
      name: 'electronic_products',
      type: 'list',
      message: 'What electronic product would you like to buy?',
      choices: electronicsArr
    })

      .then(function (answer) {
        var electronicsProductsAnswer = answer.electronic_products
        var answerElectronicsArr = []
        var answerElectronicsQuery = 'SELECT * FROM products WHERE ?';
        connection.query(answerElectronicsQuery, { product_name: answer.electronic_products }, function (err, res) {
          answerElectronicsArr.push('Price: $' + res[0].price + ' - How many would you like to buy?')

          inquirer.prompt({
            name: "electronicsQuantity",
            type: "input",
            message: answerElectronicsArr.toString(),
            default: "1-100",
            validate: function (value) {
              if (isNaN(value) === false && value > 0 && value < 100) {
                return true;
              }
              return false;
            }
          })

            .then(function (answer) {
              var electronicsQuantityQuery = 'UPDATE products SET stock_quantity = stock_quantity - ' + answer.electronicsQuantity + ' WHERE ?';
              connection.query(electronicsQuantityQuery, { product_name: electronicsProductsAnswer }, function (err, res) {
                console.log("Thank you for you purchase!")
              })
            })
        })
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
      name: 'appliance_products',
      type: 'list',
      message: 'What appliance product would you like to buy?',
      choices: appliancesArr
    })

      .then(function (answer) {
        var appliancesProductsAnswer = answer.appliance_products
        var answerAppliancesArr = []
        var answerAppliancesQuery = 'SELECT * FROM products WHERE ?';
        connection.query(answerAppliancesQuery, { product_name: answer.appliance_products }, function (err, res) {
          answerAppliancesArr.push('Price: $' + res[0].price + ' - How many would you like to buy?')

          inquirer.prompt({
            name: "applianceQuantity",
            type: "input",
            message: answerAppliancesArr.toString(),
            default: "1-100",
            validate: function (value) {
              if (isNaN(value) === false && value > 0 && value < 100) {
                return true;
              }
              return false;
            }
          })

            .then(function (answer) {
              var appliancesQuantityQuery = 'UPDATE products SET stock_quantity = stock_quantity - ' + answer.applianceQuantity + ' WHERE ?';
              connection.query(appliancesQuantityQuery, { product_name: appliancesProductsAnswer }, function (err, res) {
                console.log("Thank you for you purchase!")
              })
            })
        })
      })
  })
}

runSearch();
