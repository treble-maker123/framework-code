/**
 * An example demonstrating the use of async/await in Javascript, which is introduced 
 * with ECMAScript 8 (ES8)
 * 
 * To run this example, use Node v7.x
 * 
 * "node callback_hell.js"
 */

var db = require("./database");

// must use Immediately-Invoked Function Expression (IIFE) to demonstrate this
(async function() {
    var status = [];
    var data = await db.fetch_characters_promise(true);
    data.forEach(async function(character) {
        var res = await db.is_alive_promise(character.id, true);
        console.log(`Number ${res.id} seems to be fine.`);
        status.push({character: character.name, alive: res.isAlive});
        if(status.length == data.length) {
            console.log("Everyone seems to be fine!");
        }
    });
})();