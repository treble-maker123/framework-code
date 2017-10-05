/**
 * An example demonstrating the use of promise in Javascript. Promise
 * is introduced in ECMAScript 6 (ES6).
 * 
 * To run this example, use Node v6.x
 * 
 * "node callback_hell.js"
 */

var db = require("./database");

var status = [];
db.fetch_characters_promise(true)
    .then(function(data) {
        var characters = []; // created this to demonstrate promise chaining
        data.forEach(function(character) {
            characters.push(character);
        })
        return Promise.resolve(characters);
    })
    .then(function(characters) {
        characters.forEach(function(character) {
            db.is_alive_promise(character.id, true)
                .then(function(res) {
                    console.log(`Number ${res.id} seems to be fine.`);
                    status.push({character: character.name, alive: res.isAlive});
                    if (status.length == characters.length) {
                        console.log("Everyone seems to be fine!");
                    }
                })
                .catch(function(error) {
                    console.log(error.message);
                });
        });
    })
    .catch(function(error) {
        console.log(error.message);
    });

console.log("Finished going through the script");