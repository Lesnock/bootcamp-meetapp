
const messages = {
    // Users
    'validation-fails': 'Validation fails',
    'email-used': 'Email is already used',
    'username-used': 'Username is already used',

    // Auth
    'wrong-credentials': 'Credentials does not match',
    'invalid-token': 'The token is invalid',

    // Upload
    'invalid-mime': 'Invalid file type',

    // Meetup
    'invalid-date': 'Invalid date',
    'meetup-not-found': 'Meetup not found',
    'meetup-past': 'Meetup date has already past',
    'already-subscribed': 'You are already subscribed to this meetup',
    'subscribe-is-organizer': "You can't subscribed to your own meetup",
    'date-busy': 'You already have a meetup in this date/hour',

    'not-authorized': "You don't have permission to do this action",
}

export default function message (name) {
    return messages[name]
}
