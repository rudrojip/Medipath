const regex = {
    Mail: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, //E-mail with special characters
    password: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~])[a-zA-Z0-9!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]{8,25}$/, // Password with minimum 8 char with one uppercase, one lowercase and one special character
    Alphabets:/^[a-zA-Z\ ]+$/, //Allow only alphabets & space
    userName:/^[a-zA-Z0-9'.\-_!#^~\ ]+$/, //Allow only alphabets, Numbers, Space and ' 
};
const global = {
    Name: 30,                              // limiting lenth of character by 30
    password: 25,                          // limiting length of character by 25
}

export {regex, global}