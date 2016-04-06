define({
    setInitOrder: {
        redirectUri: {required: true, type: "string"},
        publishableKey: {required: true, type: "string"},
        postalCode: {type: "string"},
        city: {required: true, type: "string"},
        externalTrackingCode: {required: true, type: "string"},
        subsidyCost: {required: true, type: "number"},
        standardCost: {required: true, type: "number"},
        firstAvailability: {required: true, type: "string"},
        pickUp: {required: true, type: "object"},
        consignee: {required: true, type: "object"}
    },

    setInitPickUp: {
        hubId: {type: "number"},
        address: {required: true, type: "string"},
        lat: {type: "number"},
        lng: {type: "number"},
        note: {type: "string"}
    },

    checkConsignee: {
        firstName: {required: true, type: "string"},
        lastName: {required: true, type: "string"},
        email: {required: true, type: "string"},
        telephone: {type: "string"}
    },

    order: {
        createBy: {type: "string"},
        merchantId: {type: "string"},
        externalTrackingCode: {type: "string"},
        hub: {type: "string"},
        name: {type: "string"},
        surname: {type: "string"},
        businessName: {type: "string"},
        address: {type: "string"},
        deliveryInstructions: {type: "string"},
        postalCode: {type: "string"},
        territory: {type: "string"},
        lat: {type: "number"},
        lng: {type: "number"},
        phone: {type: "string"},
        email: {type: "string"},
        packageNumber: {type: "number"},
        totalWeight: {type: "number"},
        totalLinearDimension: {type: "number"},
        availabilityDate: {type: "string"},
        availabilityTime: {type: "string"},
        distributionCenterAddress: {type: "string"},
        distributionCenterPostalCode: {type: "string"},
        distributionCenterTerritory: {type: "string"},
        distributionCenterLat: {type: "number"},
        distributionCenterLng: {type: "number"},
        cartValue: {type: "number"},
        paymentMethod: {type: "string"}
    },


    /** parse */
    getTrackingPage: {
        externalTrackingCode: {required: true, type: "string"},
        merchant: {required: true, type: "string"}
    },
    getEta: {
        externalTrackingCode: {required: true, type: "string"},
        merchant: {required: true, type: "string"}
    },
    getWayBill: {
        externalTrackingCode: {required: true, type: "string"},
        merchant: {required: true, type: "string"}
    },
    setParcel: {
        externalTrackingCode: {required: true, type: "string"},
        merchant: {required: true, type: "string"},
        parcels: {required: true, type: "array"}
    },
    parcels: {
        weight: {required: true, type: "number"},
        value: {type: "number"},
        length: {type: "number"},
        depth: {type: "number"},
        volume: {type: "number"},
        height: {type: "number"}
    }
});