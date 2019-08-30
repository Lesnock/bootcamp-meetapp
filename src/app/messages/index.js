
const messages = {
    // Users
    'validation-fails': 'Validation fails',
    'email-used': 'Email is already used',
    'username-used': 'Username is already used',
    'wrong-credentials': 'Credentials does not match',
}

export default function message (name) {
    return messages[name]
}
