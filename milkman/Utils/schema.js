define({
    setInitOrder: {
        redirectUri: {required: true, type: "string"},
        publishableKey: {required: true, type: "string"},
        postalCode: {type: "string"},
        city: {required: true, type: "string"},
        trackingCode: {required: true, type: "string"},
        cart: {required: true, type: "object"}
    },

    setInitCart: {
        subsidyCost: {required: true, type: "number"},
        standardCost: {required: true, type: "number"},
        parcels: {required: true, type: "array"}
    },

    setInitParcel: {
        weight: {type: "number"},
        firstAvailableDay: {required: true, type: "string"},
        value: {type: "number"},
        pickUp: {required: true, type: "object"},
        length: {type: "number"},
        depth: {type: "number"},
        volume: {type: "number"},
        height: {type: "number"}
    },

    setInitPickUp: {
        hubId: {type: "number"},
        address: {required: true, type: "string"},
        lat: {type: "number"},
        lng: {type: "number"},
        note: {type: "string"}
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

    }
});