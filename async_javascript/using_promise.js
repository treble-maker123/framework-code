/**
 * An example demonstrating the use of promise in Javascript. Promise
 * is introduced in ECMAScript 6 (ES6).
 * 
 * To run this example, use Node v6.x
 * 
 * "node callback_hell.js"
 */

function get_random_wait(min, max) {
    return Math.floor(Math.random() * (max-min) + min);
}