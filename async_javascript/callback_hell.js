/**
 * An example demonstrating callback hell in Javascript.
 * 
 * To run this example, use Node v6.x
 * 
 * "node callback_hell.js"
 */

var db = require("./database");

/*
    What this code may look like if written synchronously (blocking calls).
    
    var characters = fetch_characters(true);
    var status = characters.map(function(character) {
        return {character: character.name, alive: is_alive(character.id, true);
    });
    console.log("Everyone seems to be fine!");
*/

////////////////////////////////////////////////////////////////////////////////
// Below is an example of a callback hell
////////////////////////////////////////////////////////////////////////////////

var status = [];

db.fetch_characters(true, function(err, data){
    if(err) {
        console.log(err.message);
    } else {
        data.forEach(function(character) {
            db.is_alive(character.id, true, function(err, res) {
                if(err) {
                   console.log(err.message);
                } else {
                    console.log(`Number ${res.id} seems to be fine`);
                    status.push({character: character.name, alive: res.isAlive});
                    if (status.length == data.length) {
                        console.log("Everyone seems to be fine!");
                    }
                }
           });
        });
    }
});