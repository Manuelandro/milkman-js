define({
    API_URL_SERVER: 'http://localhost/milkman/api',

    //to save in local storage
    SESSION_TOKEN: 'session_token',
    REDIRECT_URI: 'redirect_uri',
    INTERVAL_OF_INTEREST: 'interval_of_interest',
    PUBLISHABLE_KEY: 'publishable_key',

    //local variables
    range: [],
    data: {},
    deals: [],

    merchant_details: '',

    ERROR: {
        OK_200 : 'OK: Success.',
        NO_RESULTS_402 : 'No results.',
        BAD_REQUEST_400 : 'Bad Request: The request cannot be accepted. The accompanying error message explains why.',
        UNAUTHORIZED_401 : 'Unauthorized: Authentication credentials are missing or incorrect.'
    },

    SUCCESS: {
        OK_200 : 'OK: Success.'
    }
});