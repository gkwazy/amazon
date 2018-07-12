var mysql = require("mysql");
var inquirer = require("inquirer");
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
        connection.query("Select * from products", function (err, results) {
            for (i = 0; i < results.lenght; i++) {
                if (results[i] === itemWanted && results[i].stock_quantitly > 0) {
                    var newStock = results[i].stock_quantitly - 1;
                    connection.query("update products set ? where ?", [
                        {
                            stock_quantitly: newStock
                        },
                        {
                            item_id: results[i].item_id
                        }
                    ],
                        function (error) {
                            if (error) throw error;
                            console.log("You have purchased your item, we will " +
                                "deliver it in your dreams");
                            start();
                        }
                    )
                } else {
                    console.log("we sold out of that item, aka your too slow.")
                    start();
                }
            }
        });

    });
};

var itemList = function () {
    connection.query("Select * From products", function (err, results) {
        console.log("Here are the items we have for sell:")
        for (i = 0; i < results.lenght; i++) {
            console.log(results[i] + "\n");

        }
    });

}