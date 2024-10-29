# This module will provide crypto capabilities to our application


'''
params:
    inputText: Text to be encrypted
    N: number of positions to shift characters in the inputText (>= 1)
    D: Direction of shift
'''
def encrypt(inputText: str, N: int, D: int) -> str:
    # Check for input errors
    if not isinstance(inputText, str):
        raise TypeError("inputText must be a string")
    if " " in inputText or "!" in inputText:
        raise ValueError("inputText can not contain space characters or !")
    
    if not isinstance(N, int):
        raise TypeError("N must be an int")
    if N < 1:
        raise ValueError("N must be greater than or equal to 1")
    
    if not isinstance(D, int):
        raise TypeError("D must be an int")
    if D != -1 and D != 1:
        raise ValueError("D must be equal to 1 or -1")
    
    # Start encryption algorithm

    # Reverse the input string
    reversed_input_text = inputText[::-1]

    # Determine shift value
    shifter = N * D # positive D will result in additive shifter, and vice versa

    # Set important variables for shifting ops
    min_printable_char = 34
    max_printable_char = 126
    num_printable_chars = max_printable_char - min_printable_char + 1

    # Initialize result string variable
    encryptedText = []

    # Conduct shift ops
    for char in reversed_input_text:
        # Shift character
        ascii_char = ord(char)
        ascii_char += shifter

        # Ensure that shifted character falls in range
        if ascii_char > max_printable_char:
            ascii_char = min_printable_char + (ascii_char - min_printable_char) % num_printable_chars
        elif ascii_char < min_printable_char:
            ascii_char = max_printable_char - (max_printable_char - ascii_char) % num_printable_chars
        
        encryptedText.append(chr(ascii_char))
    
    # Return encrypted string
    return "".join(encryptedText)

def decrypt(encryptedText: str, N: int, D: int)->str:
    # Check for input errors
    if not isinstance(encryptedText, str):
        raise TypeError("inputText must be a string")
    if " " in encryptedText or "!" in encryptedText:
        raise ValueError("inputText can not contain space characters or !")
    
    if not isinstance(N, int):
        raise TypeError("N must be an int")
    if N < 1:
        raise ValueError("N must be greater than or equal to 1")
    
    if not isinstance(D, int):
        raise TypeError("D must be an int")
    if D != -1 and D != 1:
        raise ValueError("D must be equal to 1 or -1")
    
    # Determine shift value
    shifter = N * D
    # Invert shifter to reverse algorithm
    shifter = shifter * -1

    # Conduct reversed shifting
    # Set important variables for shifting ops
    min_printable_char = 34
    max_printable_char = 126
    num_printable_chars = max_printable_char - min_printable_char + 1

    # Initialize result string variable
    inputText = []

    # Conduct shift ops
    for char in encryptedText:
        # Shift character
        ascii_char = ord(char)
        ascii_char += shifter

        # Ensure that shifted character falls in range
        if ascii_char > max_printable_char:
            ascii_char = min_printable_char + (ascii_char - min_printable_char) % num_printable_chars
        elif ascii_char < min_printable_char:
            ascii_char = max_printable_char - (max_printable_char - ascii_char) % num_printable_chars
        
        inputText.append(chr(ascii_char))

    # Stringify input text
    inputText = "".join(inputText)

    # Reverse inputText
    reversed_input_text = inputText[::-1]

    return reversed_input_text