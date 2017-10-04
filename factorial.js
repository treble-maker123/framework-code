/**
 * Takes in a numeric value that's greater than 0, and compute its factorial
 * in a loop. 
 * 
 * A factorial of n is n*(n-1)*(n-2)...*2*1
 * 
 * @param {number} input The number to apply factorial on.
 * 
 * @returns {number} The result of the factorial function.
 */
function factorial(input) {
    // check that the input is a number
    if(!(parseInt(input) == input)) {
        return console.log("The input is not a number");
    }
    
    // check that the input is greater than 0
    if(!input > 0) {
        return console.log("The input is not greater than 0.");
    }
    
    
    var result;
    // assign input to result, then decrement by 1
    for(result = input--; input > 0; input--) {
        result *= input; // equivalent to result = result * input
    }
    
    return result;
}

module.exports.factorial = factorial;