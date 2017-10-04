/**
 * To run this example, use Node v6.x
 * 
 * "node callback_hell.js"
 */

/**
 * simulates random time the backend takes to respond.
 * 
 * @params {number} min The minimum number of seconds to wait.
 * @params {nunmber} max The maximum number of seconds to wait.
 * 
 * @returns {number} A number between min and max;
 */
function get_random_wait(min, max) {
    return Math.floor(Math.random() * (max-min) + min);
}

/**
 * A function that simulates a database call in JavaScript to retrieve characters
 * 
 * @params {boolean} successful Whether the database call is successfully or not
 * @params {function} success Callback for a successful database call.
 * @params {function} reject Callback for a failed database call.
 */
function fetch_characters(successful, callback) {
    console.log(`Making a call to database to fetch characters...`);
    setTimeout(function() {
        if (successful) {
            console.log("Responding to fetch_characters with data.\n");
            callback(undefined, [
                    { id: 1, name: "Bart Simpson", age: 10, 
                        school: "Springfield Elementary School" },
                    { id: 2, name: "Lisa Simpson", age: 8, 
                        school: "Springfield Elementary School"}]);
        } else {
            callback({ message: "The request for characters has failed... For \
                some reason." });
        }
    }, get_random_wait(1000, 5000));
    console.log("Finished running fetch_characters method.\n");
}

/**
 * A function that simulates a different database call in Javascript that 
 * queries whether a character is alive.
 * 
 * @params {number} id The id of the character
 * @params {function} success Callback for a successfull database call.
 * @params {function} reject Callback for a failed database call.
 */
function is_alive(id, successful, callback) {
    console.log(`Making a call to database with id ${id}`);
    setTimeout(function() {
        if (successful) {
            console.log(`Number ${id} seems to be alive.`);
            callback(undefined, {id: id, isAlive: true});
        } else {
            callback({ message: `The request for is_alive has failed... For \ 
                some reason.` });
        }
    }, get_random_wait(1000, 5000));
    console.log("Finished running is_alive method.\n");
}


////////////////////////////////////////////////////////////////////////////////
// Below is an example of a callback hell
////////////////////////////////////////////////////////////////////////////////

var status = [];
fetch_characters(true, function(err, data){
    if(err) {
        console.log(err.message);
    } else {
        data.forEach(function(character) {
            is_alive(character.id, true, function(err, res) {
                if(err) {
                   console.log(err.message);
                } else {
                    status.push({character: character.name, alive: res.isAlive});
                    if (status.length == data.length) {
                        console.log("Everyone seems to be fine!");
                    }
                }
           });
        });
    }
});

/*
    What this code may look like if written synchronously (blocking calls).
    
    var characters = fetch_characters(true);
    var status = characters.map(function(character) {
        return {character: character.name, alive: is_alive(character.id, true);
    });
    console.log("Everyone seems to be fine!");
*/