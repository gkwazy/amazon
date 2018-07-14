var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    console.log("Connected")
    itemList();
});

function start() {

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
                            itemList();
                        }
                    )
                } else {
                    console.log("we sold out of that item, aka your too slow.")
                    itemList();
                }
            }
        });

    });
};

function itemList() {
    connection.query("SELECT * FROM products", function (err, results) {
        console.log("Here are the items we have for sell:")
        for (i = 0; i < results.length; i++) {
            console.log(results[i].product_name + "\n");
            console.log(`id: ${results[i].item_id} | name: ${results[i].product_name}  `);

        }
        start();
    });

}
// console.log(somefunc)
// function somefunc(params) {

// }
// console.log(somefunc)