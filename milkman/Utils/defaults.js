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
        {
            address: '22 Oak Ln, Rumson, NJ 07760, Stati Uniti',
            lat: 40.372186,
            lng: -74.01118099999997,
            heading: 36.94424778789316,
            pitch: -6.11509517212225,
            deliverInstructions: 'Beware the dog'
        },
        {
            address: '22 Oak Ln, Rumson, NJ 07760, Stati Uniti'
        },
        {
            address: '22 Oak Ln, Rumson, NJ 07760, Stati Uniti',
            lat: 40.372186,
            lng: -74.01118099999997,
            heading: 36.94424778789316,
            pitch: -6.11509517212225,
            deliverInstructions: 'Beware the dog'
        },
        {
            address: '22 Oak Ln, Rumson, NJ 07760, Stati Uniti'
        },
        {
            address: '22 Oak Ln, Rumson, NJ 07760, Stati Uniti'
        },
        {
            address: '22 Oak Ln, Rumson, NJ 07760, Stati Uniti',
            lat: 40.372186,
            lng: -74.01118099999997,
            heading: 36.94424778789316,
            pitch: -6.11509517212225,
            deliverInstructions: 'Beware the dog'
        },
        {
            address: '22 Oak Ln, Rumson, NJ 07760, Stati Uniti'
        },
        {
            address: '22 Oak Ln, Rumson, NJ 07760, Stati Uniti'
        },
        {
            address: '22 Oak Ln, Rumson, NJ 07760, Stati Uniti'
        },

        {
            lat: 40.372186,
            lng: -74.01118099999997
        },
        {
            address: '22 Oak Ln, Rumson, NJ 07760, Stati Uniti'
        },
        {
            address: '22 Oak Ln, Rumson, NJ 07760, Stati Uniti'
        },
        {
            address: '22 Oak Ln, Rumson, NJ 07760, Stati Uniti'
        }

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