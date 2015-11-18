define({
    SESSION_TOKEN: '123456',
    REDIRECT_URI: 'http://localhost:3003',

    /**
     * CHECK SET-INIT
     */
    SET_A1: {
        publishableKey: 'test-public-key',
        redirectUri: 'http://localhost:3003',
        trackingCode: 'prova123'
    },
    SET_A2: {
        publishableKey: 'test-public-key',
        redirectUri: '',
        trackingCode: ''
    },
    SET_A3: {
        publishableKey: '',
        redirectUri: 'http://localhost:3003',
        trackingCode: ''
    },
    SET_A4: {
        publishableKey: '',
        redirectUri: '',
        trackingCode: 'prova123'
    },
    SET_A5: {
        publishableKey: 'test-public-key',
        redirectUri: 'http://localhost:3003',
        trackingCode: 'prova123',
        cart: [
            {
                firstAvailableDay: '2015-10-18T12:00',
                value: 100,
                auxCost: 5.5,
                weight: 12.47,
                pickUp: {
                    id: 'ciaoaoaoaoaoao'
                }
            }
        ]
    },
    SET_A6: {
        publishableKey: 'test-public-key',
        redirectUri: 'http://localhost:3003',
        trackingCode: 'prova123',
        cart: [
            {
                firstAvailableDay: '2015-10-18T12:00',
                value: 100,
                auxCost: 5.5,
                weight: 12.47,
                pickUp: {
                    address: '22 Oak Ln, Rumson, NJ 07760, Stati Uniti',
                    lat: 40.372186,
                    lng: -74.01118099999997
                }
            }
        ]
    },
    SET_A7: {
        publishableKey: 'test-public-key',
        redirectUri: 'http://localhost:3003',
        trackingCode: 'prova123',
        cart: [
            {
                firstAvailableDay: '2015-10-18T12:00',
                value: 100,
                auxCost: 5.5,
                weight: 12.47,
                pickUp: {
                    address: '22 Oak Ln, Rumson, NJ 07760, Stati Uniti'
                }
            }
        ]
    },
    SET_A8: {
        publishableKey: 'test-public-key',
        redirectUri: 'http://localhost:3003',
        trackingCode: 'prova123',
        cart: [
            {
                firstAvailableDay: '2015-10-18T12:00',
                value: 100,
                auxCost: 5.5,
                weight: 12.47,
                pickUp: {
                    lat: 40.372186,
                    lng: -74.01118099999997
                }
            }
        ]
    },
    SET_A9: {
        publishableKey: 'test-public-key',
        redirectUri: 'http://localhost:3003',
        trackingCode: 'prova123',
        cart: [
            {
                firstAvailableDay: '2015-10-18T12:00',
                value: 100,
                auxCost: 5.5,
                weight: 12.47,
                pickUp: {
                    type: 'standard',
                    length: 1,
                    height: 1,
                    depth: 1,
                    volume: 300
                }
            }
        ]
    },
    SET_A10: {
        publishableKey: 'test-public-key',
        redirectUri: 'http://localhost:3003',
        trackingCode: 'prova123',
        cart: [
            {
                firstAvailableDay: '2015-10-18T12:00',
                value: 100,
                auxCost: 5.5,
                weight: 12.47,
                pickUp: {
                    id: 'ciaoaoaoaoaoao'
                }
            },
            {
                firstAvailableDay: '2015-10-18T12:00',
                value: 100,
                auxCost: 5.5,
                weight: 12.47,
                pickUp: {
                    address: '22 Oak Ln, Rumson, NJ 07760, Stati Uniti',
                    lat: 40.372186,
                    lng: -74.01118099999997
                }
            },
            {
                firstAvailableDay: '2015-10-18T12:00',
                value: 100,
                auxCost: 5.5,
                weight: 12.47,
                pickUp: {
                    address: '22 Oak Ln, Rumson, NJ 07760, Stati Uniti'
                }
            },
            {
                firstAvailableDay: '2015-10-18T12:00',
                value: 100,
                auxCost: 5.5,
                weight: 12.47,
                pickUp: {
                    lat: 40.372186,
                    lng: -74.01118099999997
                }
            }
        ]
    },
    SET_A11: {
        publishableKey: 'test-public-key',
        redirectUri: 'http://localhost:3003',
        cart: [
            {
                firstAvailableDay: '2015-10-18T12:00',
                value: 100,
                auxCost: 5.5,
                weight: 12.47,
                pickUp: {
                    address: '22 Oak Ln, Rumson, NJ 07760, Stati Uniti',
                    lat: 40.372186,
                    lng: -74.01118099999997
                }
            },
            {
                firstAvailableDay: '2015-10-18T12:00',
                value: 100,
                auxCost: 5.5,
                weight: 12.47,
                pickUp: {
                    id: 'ciaoaoaoaoaoao'
                }
            },
            {
                firstAvailableDay: '2015-10-18T12:00',
                value: 100,
                auxCost: 5.5,
                weight: 12.47,
                pickUp: {
                    lat: 40.372186,
                    lng: -74.01118099999997
                }
            },
            {
                firstAvailableDay: '2015-10-18T12:00',
                value: 100,
                auxCost: 5.5,
                weight: 12.47,
                pickUp: {
                    address: '22 Oak Ln, Rumson, NJ 07760, Stati Uniti'
                }
            },
            {
                firstAvailableDay: '2015-10-18T12:00',
                value: 100,
                auxCost: 5.5,
                weight: 12.47,
                pickUp: {}
            },
            {
                firstAvailableDay: '2015-10-18T12:00',
                value: 100,
                auxCost: 5.5,
                weight: 12.47,
                pickUp: {
                    id: '',
                    address: '',
                    lat: null,
                    lng: ''
                }
            }
        ]

    },
    SET_A12: {
        publishableKey: 'test-public-key',
        redirectUri: 'http://localhost:3003',
        cart: [
            {
                value: 100
            }
        ]

    },
    SET_A13: {
        publishableKey: 'test-public-key',
        redirectUri: 'http://localhost:3003',
        cart: [
            {
                firstAvailableDay: '2015-10-18'
            }
        ]
    },
    SET_A14: {
        publishableKey: 'test-public-key',
        redirectUri: 'http://localhost:3003',
        cart: [
            {
                auxCost: 5.5
            }
        ]
    },
    SET_A15: {
        publishableKey: 'test-public-key',
        redirectUri: 'http://localhost:3003',
        cart: [
            {
                weight: 5.5
            }
        ]
    },
    SET_A16: {
        publishableKey: 'test-public-key',
        redirectUri: 'http://localhost:3003',
        cart: [
            {
                type: 'standard',
                length: 1,
                height: 1,
                depth: 1,
                volume: 300
            }
        ]
    },

    /**
     * CHECK SET-ADDRESS
     */
    SET_B1: [
        {
            address: '22 Oak Ln, Rumson, NJ 07760, Stati Uniti',
            lat: 40.372186,
            lng: -74.01118099999997,
            heading: 36.94424778789316,
            pitch: -6.11509517212225,
            deliverInstructions: 'Beware the dog'
        }
    ],
    SET_B2: [
        {
            address: '22 Oak Ln, Rumson, NJ 07760, Stati Uniti'
        }
    ],
    SET_B3: [
        {
            address: 'blablablablablabla'
        }
    ],
    SET_B4: [
        {
            lat: 40.372186,
            lng: -74.01118099999997
        }
    ],
    SET_B5: [
        {
            deliverInstructions: 'Beware the dog'
        }
    ],
    SET_B6: [
        { address: '22 Oak Ln, Rumson, NJ 07760, Stati Uniti' },
        {
            address: '22 Oak Ln, Rumson, NJ 07760, Stati Uniti',
            lat: 40.372186,
            lng: -74.01118099999997,
            heading: 36.94424778789316,
            pitch: -6.11509517212225,
            deliverInstructions: 'Beware the dog'
        },
        { address: '22 Oak Ln, Rumson, NJ 07760, Stati Uniti' }
    ],
    SET_B7: [
        {
            address: '22 Oak Ln, Rumson, NJ 07760, Stati Uniti',
            lat: 40.372186,
            lng: -74.01118099999997,
            heading: 36.94424778789316,
            pitch: -6.11509517212225,
            deliverInstructions: 'Beware the dog'
        },
        {
            address: 'blablablablablabla'
        },
        {
            lat: 40.372186,
            lng: -74.01118099999997
        }
    ],
    SET_B8: [
        {
            lat: '',
            lng: 'ciao ciao'
        }
    ],
    SET_B9: [
        {
            address: ''
        }
    ],


    /**
     * GET-QUOTE
     */
    SET_C1: {
        ranges:[]
    },
    SET_C2: {
        ranges:[
            '2015-12-14T09:10/2015-12-14T09:40'
        ]
    },
    SET_C3: {
        ranges:[
            '2015-12-14T09:01/2015-12-14T09:45'
        ]
    },
    SET_C4: {
        ranges:[
            '2015-12-14T09:01/2015-12-14T09:35'
        ]
    },
    SET_C5: {
        ranges:[
            '2015-12-14T08:01/2015-12-14T08:55'
        ]
    },
    SET_C6: {
        ranges:[
            '2015-12-14T08:01/2015-12-14T12:55'
        ]
    },
    SET_C7: {
        ranges:[
            '2015-12-14T08:01/2015-12-16T12:55'
        ]
    },
    SET_C8: {
        ranges:[
            '2015-12-14T08:01/2015-12-14T12:55',
            '2015-12-15',
            '2015-12-16T09:01/2015-12-16T09:35',
            '2015-12-21'
        ]
    },
    SET_C9: {
        ranges:[
            '2015-12-14T08:01/2015-12-14T12:55',
            '2015-12-15',
            '2015-12-21'
        ]
    },
    SET_C10: {
        ranges:[
            '2015-12-14'
        ],
        hours: [ '09:30/10:00', '13:03/14:51' ]
    },
    SET_C11: {
        ranges:[
            '2015-12-14'
        ],
        hours: [ '13:55/14:01' ]
    },
    SET_C12: {
        ranges:[
            '2015-12-14'
        ],
        hours: [ '1:1/18:10', '13.55/16.9' ]
    },
    SET_C12_bis: {
        ranges:[
            '2015-12-14'
        ],
        hours: [ '1:1/18:10', '13.55-16.9' ]
    },
    SET_C13: {
        ranges:[
            '2015-12-14T08:01/2015-12-14T12:55'
        ],
        hours: [ '13:50/15:01' ]
    },
    SET_C14: {
        ranges:[
            '2015-12-14/2015-12-20'
        ],
        weekdays: [ 1, 3, 5, 6 ]
    },
    SET_C15: {
        ranges:[
            '2015-12-14'
        ],
        weekdays: [ 7 ]
    },
    SET_C16: {
        ranges:[
            '2015-12-14/2015-12-20'
        ],
        weekdays: [ 0, 12 ]
    },
    SET_C17: {
        ranges:[
            '2015-12-14/2015-12-20'
        ],
        hours: [ '09:30/10:00', '13:03/14:51' ],
        weekdays: [ 1, 3, 5, 6 ]
    },
    SET_C18: {
        ranges:[
            '2015-12-14/2015-12-20'
        ],
        hours: [ '13:50/15:01' ],
        weekdays: [ 7 ]
    },
    SET_C19: {
        ranges:[
            '2015-12-14'
        ],
        hours: [ '09:30/10:00', '13:03/14:51' ],
        weekdays: [ 1, 3, 5, 6 ]
    },

    /**
     * FIND-QUOTE
     */

    SET_D1: {
        ranges:[]
    },
    SET_D2: {
        ranges:[
            '2015-12-14T09:01/2015-12-14T13:35'
        ]
    },
    SET_D3: {
        ranges:[
            '2015-12-14T09:01/2015-12-14T09:35'
        ]
    },
    SET_D4: {
        ranges:[
            '2015-12-14', '2015-12-15'
        ],
        quoteNumber: 2,
        quotePerDate: 1,
        overlap: false
    },
    SET_D5: {
        ranges:[
            '2015-12-14T09:01/2015-12-14T09:55'
        ],
        quoteNumber: 16,
        quotePerDate: 16,
        overlap: false
    },
    SET_D6: {
        ranges:[
            '2015-12-14', '2015-12-15'
        ],
        quoteNumber: 2,
        quotePerDate: 1,
        overlap: true,
        minDuration: 2,
        maxDuration: 4
    },
    SET_D7: {
        ranges:[
            '2015-12-14'
        ],
        quoteNumber: 2,
        quotePerDate: 1,
        overlap: true,
        minDuration: 4,
        maxDuration: 2
    },
    SET_D8: {
        ranges:['2015-11-27'],
        hours: [ '09:30/10:00', '13:03/14:51', '13:03/13:31' ]
    },
    SET_D9: {
        weekdays: [ 1, 2, 3, 4, 5 ]
    },
    SET_D10: {
        hours: [ '09:30/10:00', '13:03/14:51' ],
        weekdays: [ 1, 2, 3, 4, 5 ]
    },
    SET_D11: {
        ranges:[
            '2015-12-14'
        ],
        quoteNumber: 2,
        quotePerDate: 1,
        overlap: true,
        minDuration: 3,
        maxDuration: 4,
        hours: [ '09:30/10:00' ]
    },
    SET_D12: {
        ranges:[
            '2015-12-14', '2015-12-15'
        ],
        quoteNumber: 2,
        quotePerDate: 1,
        overlap: true,
        minDuration: 2,
        maxDuration: 4,
        weekdays: [ 1, 2, 3, 4, 5 ]
    },
    SET_D13: {
        ranges:[
            '2015-12-14', '2015-12-15'
        ],
        quoteNumber: 2,
        quotePerDate: 1,
        overlap: true,
        minDuration: 3,
        maxDuration: 4,
        hours: [ '09:30/10:00', '13:03/14:51' ],
        weekdays: [ 1, 2, 3, 4, 5 ]
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