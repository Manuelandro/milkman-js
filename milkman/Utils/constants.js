define({
    API_URL_SERVER: 'https://api.parse.com/1/functions',//'/api', //'http://localhost/milkman/api',

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
    AVAILABILITY: 'availability',

    //local variables
    parseKeys: {},
    defaultRange: '',
    requiredFields: {},

    range: [],
    data: {},
    intervals: [],
    discounts: [],

    merchant_details: '',

    PENDING: false,

    STATUS : {
        SUCCESS: {
            '_200': 'OK: Success.',
            '_201': 'No results.'
        },
        WARNING: {
            '_301': 'We are not able to calculate lat-lng for some of the addresses.',
            '_302': 'Some addresses are not acceptable, they are missing required fields.'
        },
        FAILURE: {
            '_400': 'Bad Request: The request cannot be accepted. The accompanying error ' +
            'message explains why.',
            '_401': 'Unauthorized: Authentication credentials are missing or incorrect. ' +
            'The accompanying error message explains why.',
            '_429': 'Too many requests: Rate limit exceeded. ' +
            'Wait before retrying and reduce the rate of requests.',
            '_500': 'Something bad and unexpected happened.'
        },
        ERROR_MESSAGE: {
            '_402': 'No results.',
            '_403': 'Invalid price.',
            '_404': 'Invalid range.',
            '_405': 'Invalid hour.',
            '_406': 'Range form is incorrect. Please check it.',
            '_407': 'Bad Request: The request is malformed. Please check the specifics.',
            '_408': 'You need to set publishable key and merchant URI before.',
            '_409': "Some required fields in Parcel's Cart are missing.",
            '_415': "PickUp is missing.",
            '_410': "Some required fields are missing.",
            '_411': 'You need to set required fields before.',
            '_412': 'Value, FirstAvailableDay and AuxCost are required fields.',
            '_413': 'Confirm method needs ranges and price fields.',
            '_414': 'You need to set required fields before.'
        }
    }
});
