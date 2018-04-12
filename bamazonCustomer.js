var mysql = require('mysql');
var inquirer = require('inquirer');

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
              if (isNaN(value) === false && value > 0 && value < 101) {
                return true;
              }
              return false;
            }
          })

            .then(function (answer) {
              var cleaningQuantityCheck = answer.quantity
              var currentCleaningQuantityQuery = 'SELECT stock_quantity FROM products WHERE ?';
              var currentCleaningQuantityArray = []
              connection.query(currentCleaningQuantityQuery, { product_name: cleaningProductsAnswer }, function (erro, resp) {
                if(resp[0].stock_quantity < cleaningQuantityCheck){
                  console.log('Insufficient quantity!')
                  connection.end()
                }else{
                  var cleaningQuantityQuery = 'UPDATE products SET stock_quantity = stock_quantity - ' + answer.quantity + ' WHERE ?';
                  connection.query(cleaningQuantityQuery, { product_name: cleaningProductsAnswer }, function (err, res) {
                    console.log("Thank you for you purchase!")
                    connection.end()
                  })
                }
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
            name: "quantity",
            type: "input",
            message: answerVitaminArr.toString(),
            default: "1-100",
            validate: function (value) {
              if (isNaN(value) === false && value > 0 && value < 101) {
                return true;
              }
              return false;
            }
          })

            .then(function (answer) {
              var vitaminQuantityCheck = answer.quantity
              var currentVitaminQuantityQuery = 'SELECT stock_quantity FROM products WHERE ?';
              var currentVitaminQuantityArray = []
              connection.query(currentVitaminQuantityQuery, { product_name: vitaminProductsAnswer }, function (erro, resp) {
                // currentCleaningQuantityArray.push(resp)
                if(resp[0].stock_quantity < vitaminQuantityCheck){
                  console.log('Insufficient quantity!')
                  connection.end()
                }else{
                  var vitaminQuantityQuery = 'UPDATE products SET stock_quantity = stock_quantity - ' + answer.quantity + ' WHERE ?';
                  connection.query(vitaminQuantityQuery, { product_name: vitaminProductsAnswer }, function (err, res) {
                    console.log("Thank you for you purchase!")
                    connection.end()
                  })
                }
              })
            })
        })
      })
  })
}


function electronicsSearch() {
  var electronicArr = []
  var electronicQuery = 'SELECT * FROM products WHERE ?';
  connection.query(electronicQuery, { department_name: 'Electronics' }, function (error, response) {
    for (var i = 0; i < response.length; i++) {
      electronicArr.push(response[i].product_name)
    }

    inquirer.prompt({
      name: 'electronic_products',
      type: 'list',
      message: 'What electronic product would you like to buy?',
      choices: electronicArr
    })

      .then(function (answer) {
        var electronicProductsAnswer = answer.electronic_products
        var answerElectronicArr = []
        var answerElectronicQuery = 'SELECT * FROM products WHERE ?';
        connection.query(answerElectronicQuery, { product_name: answer.electronic_products }, function (err, res) {
          answerElectronicArr.push('Price: $' + res[0].price + ' - How many would you like to buy?')

          inquirer.prompt({
            name: "quantity",
            type: "input",
            message: answerElectronicArr.toString(),
            default: "1-100",
            validate: function (value) {
              if (isNaN(value) === false && value > 0 && value < 101) {
                return true;
              }
              return false;
            }
          })

            .then(function (answer) {
              var electronicQuantityCheck = answer.quantity
              var currentElectronicQuantityQuery = 'SELECT stock_quantity FROM products WHERE ?';
              var currentElectronicQuantityArray = []
              connection.query(currentElectronicQuantityQuery, { product_name: electronicProductsAnswer }, function (erro, resp) {
                // currentCleaningQuantityArray.push(resp)
                if(resp[0].stock_quantity < electronicQuantityCheck){
                  console.log('Insufficient quantity!')
                  connection.end()
                }else{
                  var electronicQuantityQuery = 'UPDATE products SET stock_quantity = stock_quantity - ' + answer.quantity + ' WHERE ?';
                  connection.query(electronicQuantityQuery, { product_name: electronicProductsAnswer }, function (err, res) {
                    console.log("Thank you for you purchase!")
                    connection.end()
                  })
                }
              })
            })
        })
      })
  })
}

function appliancesSearch() {
  var applianceArr = []
  var applianceQuery = 'SELECT * FROM products WHERE ?';
  connection.query(applianceQuery, { department_name: 'Appliances' }, function (error, response) {
    for (var i = 0; i < response.length; i++) {
      applianceArr.push(response[i].product_name)
    }

    inquirer.prompt({
      name: 'appliance_products',
      type: 'list',
      message: 'What appliance product would you like to buy?',
      choices: applianceArr
    })

      .then(function (answer) {
        var applianceProductsAnswer = answer.appliance_products
        var answerApplianceArr = []
        var answerApplianceQuery = 'SELECT * FROM products WHERE ?';
        connection.query(answerApplianceQuery, { product_name: answer.appliance_products }, function (err, res) {
          answerApplianceArr.push('Price: $' + res[0].price + ' - How many would you like to buy?')

          inquirer.prompt({
            name: "quantity",
            type: "input",
            message: answerApplianceArr.toString(),
            default: "1-100",
            validate: function (value) {
              if (isNaN(value) === false && value > 0 && value < 101) {
                return true;
              }
              return false;
            }
          })

            .then(function (answer) {
              var applianceQuantityCheck = answer.quantity
              var currentApplianceQuantityQuery = 'SELECT stock_quantity FROM products WHERE ?';
              var currentApplianceQuantityArray = []
              connection.query(currentApplianceQuantityQuery, { product_name: applianceProductsAnswer }, function (erro, resp) {
                // currentCleaningQuantityArray.push(resp)
                if(resp[0].stock_quantity < applianceQuantityCheck){
                  console.log('Insufficient quantity!')
                  connection.end()
                }else{
                  var applianceQuantityQuery = 'UPDATE products SET stock_quantity = stock_quantity - ' + answer.quantity + ' WHERE ?';
                  connection.query(applianceQuantityQuery, { product_name: applianceProductsAnswer }, function (err, res) {
                    console.log("Thank you for you purchase!")
                    connection.end()
                  })
                }
              })
            })
        })
      })
  })
}

runSearch();
