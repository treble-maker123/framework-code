def encrypt(message, key):
    '''
    This method will encrypt a string with the Caesar Cipher algorithm, by 
    shifting the ASCII values of all letter characters by the key value.
    
    Parameters:
    -----------
    message: string
        A string containing the message that will be encrypted.
    key: integer
        An integer representing the distance to shift all of the letters
                    contained in the string
        
    Returns
    -------
    ciphertext
        The result after applying key to the message.
    '''
    assert isinstance(message, str), "The message must be a string!"
    assert isinstance(key, int), "The key must be an integer"
    
    return ''.join([__shift_char(char, key) for char in message])
    
def decrypt(ciphertext, key):
    '''
    This method will decrypt an encrypted string using the Caesar Cipher 
    algorithm.
    
    Parameters:
    -----------
    ciphertext: string
        The ciphertext that will be decrypted.
    key: integer
    
    Returns
    -------
    plaintext
        The plaintext decrypted with the given key.
    '''
    assert isinstance(ciphertext, str), "The ciphertext must be a string!"
    assert isinstance(key, int), "The key must be an integer"

    return ''.join([__shift_char(char, -key) for char in ciphertext])

def __shift_char(char, distance):
    '''
    This method takes in a character and examines if the character is a letter 
    or not. If the character is a character, shift the character by the distance 
    value. Otherwise do not modify the character.
    '''
    # range is (inclusive, exclusive)
    lower_case = range(97, 123) # 97 - 122
    upper_case = range(65, 91) # 65 - 90
    numeric = ord(char)
    
    if numeric in lower_case:
        # need condition to take care of negative distance
        numeric += distance%26 if distance >= 0 else -((-distance)%26)
        numeric = __limit_shift(numeric, list(lower_case)[0], list(lower_case).pop())
        
        return chr(numeric)
    elif numeric in upper_case:
        numeric += distance%26 if distance >= 0 else -((-distance)%26)
        numeric = __limit_shift(numeric, list(upper_case)[0], list(upper_case).pop())
        
        return chr(numeric)
        
    return char

def __limit_shift(numeric, start, end):
    '''
    Limit the shift so that 'z' shifted one space to the right is 'a' instead of 
    the next ASCII character, and 'a' shifted left one space is 'z' instead of 
    the character before.
    '''
    if numeric > end:
        # start = 97; end = 122; numeric = 123
        # numeric-end=1
        # 1-1+start
        numeric = numeric-end-1+start # e.g. 123 should be 97
    elif numeric < start:
        numeric = numeric-start+1+end # e.g. 97 should be 122

    return numeric
    
# test cases
plaintext = "a! b?c"
ciphertext = "b! c?d"
key = 1

test_cases = [
    ["a! b?c", "b! c?d", 1], # test symbols are left out
    ["Hello world!", "Hello world!", 0], # make sure 0 is right
    ["Hello world!", "Hello world!", 26], # make sure 26 goes around
    ["Hello world!", "Hello world!", -26], # make sure -26 goes around
    ["Hello world!", "Mjqqt btwqi!", 5], # make sure a regular number works
    ["Hello world!", "Fcjjm umpjb!", -2], # make sure a negative works
    ["Hello world!", "Ifmmp xpsme!", 27], # make sure 27 is same as 1
    ["Hello world!", "Gdkkn vnqkc!", -27] # make sure -27 is same as -1
]

from pdb import set_trace

for case in test_cases:
    plaintext = case[0]; ciphertext = case[1]; key = case[2]
    
    try:
        assert encrypt(plaintext, key) == ciphertext, \
            "Failed to encrypt correctly with key {0}. Expecting {1} but got {2}" \
                .format(key, ciphertext, encrypt(plaintext, key))
    except:
        print("Failed to encrypt correctly with key {0}. Expecting {1} but got {2}" \
                .format(key, ciphertext, encrypt(plaintext, key)))
        set_trace()
        
    try:
        assert decrypt(ciphertext, key) == plaintext, \
            "Failed to decrypt correctly with key {0}. Expecting {1} but got {2}" \
                .format(key, plaintext, decrypt(ciphertext, key))
    except:
        print("Failed to decrypt correctly with key {0}. Expecting {1} but got {2}" \
                .format(key, plaintext, decrypt(ciphertext, key)))
        set_trace()

print("Passed all checks!")