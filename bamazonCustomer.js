var mysql = requier("mysql");
var inquirer = requier("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "products"
});

connection.connect(function (err) {
    console.log("Connected")
    start();
});

var start = function () {
    itemList();
    inquirer.prompt({
        name: "itemWanted",
        type: "input",
        message: " What item would you like to buy? (enter Item ID number):\n"
    }).then(function (response) {

    });
};

var itemList = function () {

}