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
        message: "\n What item would you like to buy? (enter Item ID number):\n"
    }).then(function (response) {

        connection.query("Select * from products", function (err, results) {
            var itemfound = false;
            for (i = 0; i < results.length; i++) {
                if (results[i].item_id == response.itemWanted) {
                    itemfound = true;
                    if (results[i].stock_quantity > 0) {
                        var newStock = results[i].stock_quantity - 1;
                        connection.query("update products set ? where ?", [
                            {
                                stock_quantity: newStock
                            },
                            {
                                item_id: results[i].item_id
                            }
                        ],
                            function (error) {
                                if (error) throw error;
                                console.log("You have purchased your item, we will " +
                                    "deliver it in your dreams");

                            }
                        )
                    } else {
                        console.log("Sorry we are out of the item, I will work on restocking it.")
                    }
                }
            }
            if (itemfound === false) {
                console.log("Sorry we could not find a item with that id. ")
            }
            itemList();
        });


    });
};

function itemList() {
    connection.query("SELECT * FROM products", function (err, results) {
        console.log("Here are the items we have for sell:")
        for (i = 0; i < results.length; i++) {
            console.log(` ${results[i].product_name}-id: ${results[i].item_id}   `);
        }
        start();
    });

}
