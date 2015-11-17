define({
    API_URL_SERVER: 'http://localhost/milkman/api',

    //to save in local storage
    REDIRECT_URI: 'redirect_uri',
    PUBLISHABLE_KEY: 'publishable_key',
    SESSION_TOKEN: 'session_token',
    PROPOSAL_ID: 'proposal_id',
    HUB: 'hub',
    MERCHANT: 'merchant',

    INTERVAL_OF_INTEREST: 'interval_of_interest',
    FIRST_AV_DAYS: 'first_available_day',
    FIRST_AV_TIME: 'first_available_time',
    DEFAULT_RANGE: 'default_range',

    ADDRESSES: 'addresses',

    //local variables
    defaultRange: '',
    requiredFields: {},

    range: [],
    data: {},
    intervals: [],
    discounts: [],

    merchant_details: '',

    STATUS: {
        SUCCESS: {
            OK_200 : 'OK: Success.'
        },
        WARNING: {
            ADDRESS_ZERO_RESULTS: 'We are not able to calculate lat-lng for some addresses.',
            ADDRESS_INCORRECT: 'Some addresses are not acceptable, they missing required fields.'
        },
        FAILURE: {
            NO_RESULTS_402 : 'No results.',
            BAD_REQUEST_400 : 'Bad Request: The request cannot be accepted. The accompanying error ' +
            'message explains why.',
            UNAUTHORIZED_401 : 'Unauthorized: Authentication credentials are missing or incorrect. ' +
            'The accompanying error message explains why.',
            RANGE_NOT_VALID: 'Range is not valid.',
            HOUR_NOT_VALID: 'Hour is not valid.',
            RANGE_NOT_CORRECT: 'Range is not in a correct form. Please check it.'
        }
    },
    ERROR_MESSAGE: {
        NO_PUBKEY_URI: 'You need to set publichable key and merchant URI before.',
        MISSING_IN_PARCEL: "Some required fields in Parcel's Cart are missing.",
        MISSING: "Some required fields are missing.",
        NEED_REQUIRED: 'You need to set required fields before.',
        REQUIRED_AUXCOST_FIRSTDAY: 'Value, FirstAvailableDay and AuxCost are required fields.'
    },

    ERROR: {
        OK_200 : 'OK: Success.',
        NO_RESULTS_402 : 'No results.',
        BAD_REQUEST_400 : 'Bad Request: The request cannot be accepted. The accompanying error message explains why.',
        UNAUTHORIZED_401 : 'Unauthorized: Authentication credentials are missing or incorrect. The accompanying error message explains why.'
    },

    SUCCESS: {
        OK_200 : 'OK: Success.'
    }
});