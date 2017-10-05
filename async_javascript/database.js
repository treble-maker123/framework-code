var config = {
    db_wait_min: 1000,
    db_wait_max: 3000
}

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

module.exports = {
    /**
     * A function that simulates a database call in JavaScript to retrieve characters.
     * 
     * Accepts callback.
     * 
     * @params {boolean} successful Whether the database call is successful or not.
     *                                  Makes you feel like a god, doesn't it.
     * @params {function} callback Callback for a when the database call finishes.
     */
    fetch_characters: function(successful, callback) {
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
                callback({ message: "The request for characters has failed... For some reason." });
            }
        }, get_random_wait(config.db_wait_min, config.db_wait_max));
        console.log("Finished running fetch_characters method.\n");
    },
    /**
     * A function that simulates a different database call in Javascript that 
     * queries whether a character is alive. 
     * 
     * Accepts callback.
     * 
     * @params {number} id The id of the character
     * @params {boolean} successful Whether the database call is successful or not.
     * @params {function} callback Callback for a when the database call finishes.
     */
    is_alive: function(id, successful, callback) {
        console.log(`Making a call to database with id ${id}`);
        setTimeout(function() {
            if (successful) {
                callback(undefined, {id: id, isAlive: true});
            } else {
                callback({ message: `The request for is_alive has failed... For some reason.` });
            }
        }, get_random_wait(config.db_wait_min, config.db_wait_max));
        console.log("Finished running is_alive method.\n");
    },
    /**
     * A function that simulates a database call in Javascript to retrieve characters.
     * 
     * Uses Promise.
     * 
     * @params {boolean} successful Whether the database call is successful or not.
     * @returns {Promise} 
     */
    fetch_characters_promise: function(successful) {
        return new Promise(function(resolve, reject) {
            console.log(`Making a call to database to fetch characters...`);
            setTimeout(function() {
                if(successful) {
                    console.log("Responding to fetch_characters with data.\n");
                    resolve([
                        { id: 1, name: "Bart Simpson", age: 10, 
                            school: "Springfield Elementary School" },
                        { id: 2, name: "Lisa Simpson", age: 8, 
                            school: "Springfield Elementary School"}]);
                } else {
                    reject({ message: "The request for characters has failed... For some reason." });
                }
            }, get_random_wait(config.db_wait_min, config.db_wait_max));
        });
    },
    /**
     * A function that simulates a different database call in Javascript that 
     * queries whether a character is alive. 
     * 
     * Uses Promise.
     * 
     * @params {number} id The id of the character.
     * @params {boolean} successful Whether the database call is successful or not.
     * @returns {Promise}
     */
    is_alive_promise: function(id, successful) {
        console.log(`Making a call to database with id ${id}`);
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                if (successful) {
                    resolve({id: id, isAlive: true});
                } else {
                    reject({ message: `The request for is_alive has failed... For some reason.` });
                }
            }, get_random_wait(config.db_wait_min, config.db_wait_max)); 
        });
    }
}