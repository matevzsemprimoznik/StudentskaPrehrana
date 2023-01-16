export enum Errors {
    PASSWORDS_DONT_MATCH = 'Passwords do not match',
    SHORT_PASSWORD = 'Password is to short',
    EMAIL_REQUIRED = 'Email is Required',
    INVALID_EMAIL = 'Invalid email',
    FIRST_NAME_REQUIRED = 'First Name is Required',
    LAST_NAME_REQUIRED = 'Last Name is Required',
    FIRST_NAME_SHORT = 'First Name is too short',
    LAST_NAME_SHORT = 'Last Name is too short',
    PASSWORD_REQUIRED = 'Password is Required',
    EMAIL_TAKE = 'Email is already taken',
    WRONG_CREDENTIALS = 'Wrong credentials',
}

export enum FirebaseErrors {
    SHORT_PASSWORD = 'Firebase: Password should be at least 6 characters (auth/weak-password).',
    EMAIL_TAKE = 'Firebase: Error (auth/email-already-in-use).',
    INVALID_MAIL = 'Firebase: Error (auth/invalid-email).',
    WRONG_PASSWORD = 'Firebase: Error (auth/wrong-password).',
    WRONG_EMAIL = 'Firebase: Error (auth/invalid-email).',
    USER_NOT_FOUND = 'Firebase: Error (auth/user-not-found).',
    INVALID_ACTION = 'Firebase: Error (auth/invalid-action-code).',
}