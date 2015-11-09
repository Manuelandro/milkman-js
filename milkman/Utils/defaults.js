define({
    SESSION_TOKEN: '123456',
    REDIRECT_URI: 'http://localhost:3003',

    /**
     * CHECK SET-INIT
     */
    SETTINGS_1: {
        publishableKey: 'test-public-key',
        redirectUri: 'http://localhost:3003'
    },
    ERR1_SETTINGS: {
        publishableKey: '',
        redirectUri: 'http://localhost:3003'
    },
    ERR2_SETTINGS: {
        publishableKey: 'test-public-key',
        redirectUri: ''
    },
    SETTINGS_3: {
        publishableKey: 'test-public-key',
        redirectUri: 'http://localhost:3003',
        address:
        {
            address: '22 Oak Ln, Rumson, NJ 07760, Stati Uniti',
            lat: null,
            lng: null,
            heading: null,
            pitch: null,
            deliverInstructions: 'Beware the dog'
        }
    },
    SETTINGS_2: {
        publishableKey: 'test-public-key',
        redirectUri: 'http://localhost:3003',
        address:
        {
            address: '',
            lat: 40.372186,
            lng: -74.01118099999997,
            heading: 36.94424778789316,
            pitch: -6.11509517212225,
            deliverInstructions: 'Beware the dog'
        }
    },


    SETTINGS_4: {
        publishableKey: 'test-public-key',
        redirectUri: 'http://localhost:3003',
        carts:
        {
            firstAvailableDay: '2015-10-18',
            value: 100,
            auxCost: 5.5,
            type: 'standard',
            weight: 1,
            length: 1,
            height: 1,
            depth: 1,
            volume: 300
        }

    },


    /**
     * CHECK SET-ADDRESS
     */
    CHECK_SETT_ADDRESS_1: {
        address: '22 Oak Ln, Rumson, NJ 07760, Stati Uniti',
        lat: 40.372186,
        lng: -74.01118099999997,
        heading: 36.94424778789316,
        pitch: -6.11509517212225,
        deliverInstructions: 'Beware the dog'
    },
    CHECK_SETT_ADDRESS_2: {
            address: '22 Oak Ln, Rumson, NJ 07760, Stati Uniti',
            deliverInstructions: 'Beware the dog'
    },
    CHECK_SETT_ADDRESS_3: {
            address: 'blablablablablabla',
            deliverInstructions: 'Beware the dog'
    },
    CHECK_SETT_ADDRESS_4: {
            lat: 40.372186,
            lng: -74.01118099999997,
            deliverInstructions: 'Beware the dog'
    },
    CHECK_SETT_ADDRESS_ERR1: {
            address: '',
            deliverInstructions: 'Beware the dog'
    },
    CHECK_SETT_ADDRESS_ERR2: {
            lat: '',
            lng: '',
            heading: 36.94424778789316,
            pitch: -6.11509517212225,
            deliverInstructions: 'Beware the dog'
    },
    CHECK_SETT_ADDRESS_ERR3: {
            heading: 36.94424778789316,
            pitch: -6.11509517212225,
            deliverInstructions: 'Beware the dog'
    },



    QUOTES: {
        intervals: [
            { interval: '2015-09-01T09:00:00Z/2015-09-01T09:30:00Z', price: '1,99', weight: '0,25', currency: 'euro' },
            { interval: '2015-09-01T09:30:00Z/2015-09-01T10:00:00Z', price: '1,99', weight: '0,85', currency: 'euro' },
            { interval: '2015-09-01T10:00:00Z/2015-09-01T10:30:00Z', price: '1,99', weight: '0,15', currency: 'euro' },
            { interval: '2015-09-01T10:30:00Z/2015-09-01T11:00:00Z', price: '1,99', weight: '0,85', currency: 'euro' },
            { interval: '2015-09-01T11:00:00Z/2015-09-01T11:30:00Z', price: '1,99', weight: '0,25', currency: 'euro' }
        ],
        discounts: [
            { range: '0/1', discount: '0', type: 'percent'},
            { range: '1/2', discount: '2', type: 'percent'},
            { range: '2/4', discount: '10', type: 'percent'},
            { range: '4/8', discount: '20', type: 'percent'},
            { range: '8/', discount: '100', type: 'percent'}
        ]
    },
    DEPOT_1: { name: 'magazzino 1', location: '111111'},
    DEPOT_2: { name: 'magazzino 2', location: '211111'},
    DEPOT_3: { name: 'magazzino 3', location: '311111'}
});