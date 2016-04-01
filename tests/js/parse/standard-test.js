if (typeof require === 'function' && require.config) {
    require.config({
        baseUrl: '../lib',
        paths: {
            //Path relative to baseUrl
            'milkman': '../../milkman'
        }
    });

    //Override if in "dist" mode
    if (location.href.indexOf('-dist') !== -1) {
        //Set location of milkman to the dist location
        require.config({
            paths: {
                'milkman': '../../dist/milkman'
            }
        });
    }
}

(function (root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD.
        define(['../../dist/milkman', 'jquery'], factory);

    } else {
        // Browser globals
        factory(root.milkman, root.$);
    }
}(this, function (milkman, jquery) {
    'use strict';

    //var data = {
    //    createBy: 'standard',
    //    externalTrackingCode: '100093683',
    //    privateKey: 'test-private-key',
    //    paymentMethod: 'cc',
    //    city: 'Milano',
    //    subsidyCost: 0,
    //    standardCost: 0,
    //    firstAvailability: '2016-04-01T16:00',
    //    pickUp:{address: 'ciao ciao'},
    //    address:[{address: 'ciao ciao'}]
    //};
    //
    //$.ajax({
    //      url : 'https://test.api.milkman.it/v1/createOrder',
    //    type: 'POST',
    //    data : JSON.stringify(data),
    //    dataType: "json",
    //    timeout: 8000,
    //    success: function(data, textStatus, jqXHR)
    //    {
    //        test('TEST createOrder', function() {  equal('success', 'success') });
    //    },
    //    error: function(data)//jqXHR, textStatus, errorThrown)
    //    {
    //        var error = JSON.parse(data.responseText);
    //        console.log('error: '+error.error);
    //        test('TEST createOrder', function() {  equal('success', 'error') });
    //    }
    //});
    //
    ///** paymentMethod*/
    //var data1 = {
    //    createBy: 'standard',
    //    externalTrackingCode: '100093683',
    //    privateKey: 'test-private-key',
    //    paymentMethod: 'dccdc',
    //    city: 'Milano',
    //    subsidyCost: 0,
    //    standardCost: 0,
    //    firstAvailability: '2016-04-01T16:00',
    //    pickUp:{address: 'ciao ciao'},
    //    address:[{address: 'ciao ciao'}]
    //};
    //
    //$.ajax({
    //    url : 'https://test.api.milkman.it/v1/createOrder',
    //    type: 'POST',
    //    data : JSON.stringify(data1),
    //    dataType: "json",
    //    timeout: 8000,
    //    success: function(data, textStatus, jqXHR)
    //    {
    //        test('TEST paymentMethod data1', function() {  equal(false, data.success, JSON.stringify(data)) });
    //    },
    //    error: function(data)//jqXHR, textStatus, errorThrown)
    //    {
    //        var error = JSON.parse(data.responseText);
    //        test('TEST paymentMethod data1', function() {  equal('error', 'error', JSON.stringify(error.error)) });
    //    }
    //});
    //
    ///** paymentMethod*/
    //var data2 = {
    //    createBy: 'standard',
    //    externalTrackingCode: '100093683',
    //    privateKey: 'test-private-key',
    //    paymentMethod: '',
    //    city: 'Milano',
    //    subsidyCost: 0,
    //    standardCost: 0,
    //    firstAvailability: '2016-04-01T16:00',
    //    pickUp:{address: 'ciao ciao'},
    //    address:[{address: 'ciao ciao'}]
    //};
    //
    //$.ajax({
    //    url : 'https://test.api.milkman.it/v1/createOrder',
    //    type: 'POST',
    //    data : JSON.stringify(data2),
    //    dataType: "json",
    //    timeout: 8000,
    //    success: function(data, textStatus, jqXHR)
    //    {
    //        test('TEST paymentMethod data2', function() {  equal(false, data.success, JSON.stringify(data)) });
    //    },
    //    error: function(data)//jqXHR, textStatus, errorThrown)
    //    {
    //        var error = JSON.parse(data.responseText);
    //        test('TEST paymentMethod data2', function() {  equal('error', 'error', JSON.stringify(error.error)) });
    //    }
    //});
    //
    ///** paymentMethod*/
    //var data3 = {
    //    createBy: 'standard',
    //    externalTrackingCode: '100093683',
    //    privateKey: 'test-private-key',
    //    paymentMethod: 123,
    //    city: 'Milano',
    //    subsidyCost: 0,
    //    standardCost: 0,
    //    firstAvailability: '2016-04-01T16:00',
    //    pickUp:{address: 'ciao ciao'},
    //    address:[{address: 'ciao ciao'}]
    //};
    //$.ajax({
    //    url : 'https://test.api.milkman.it/v1/createOrder',
    //    type: 'POST',
    //    data : JSON.stringify(data3),
    //    dataType: "json",
    //    timeout: 8000,
    //    success: function(data, textStatus, jqXHR)
    //    {
    //        test('TEST paymentMethod data3', function() {  equal(false, data.success, JSON.stringify(data)) });
    //    },
    //    error: function(data)//jqXHR, textStatus, errorThrown)
    //    {
    //        var error = JSON.parse(data.responseText);
    //        test('TEST paymentMethod data3', function() {  equal('error', 'error', JSON.stringify(error.error)) });
    //    }
    //});
    //
    ///** city*/
    //var data4 = {
    //    createBy: 'standard',
    //    externalTrackingCode: '100093683',
    //    privateKey: 'test-private-key',
    //    paymentMethod: 'cc',
    //    city: 'Verona',
    //    subsidyCost: 0,
    //    standardCost: 0,
    //    firstAvailability: '2016-04-01T16:00',
    //    pickUp:{address: 'ciao ciao'},
    //    address:[{address: 'ciao ciao'}]
    //};
    //$.ajax({
    //    url : 'https://test.api.milkman.it/v1/createOrder',
    //    type: 'POST',
    //    data : JSON.stringify(data4),
    //    dataType: "json",
    //    timeout: 8000,
    //    success: function(data, textStatus, jqXHR)
    //    {
    //        test('TEST city data4', function() {  equal(false, data.success, JSON.stringify(data)) });
    //    },
    //    error: function(data)//jqXHR, textStatus, errorThrown)
    //    {
    //        var error = JSON.parse(data.responseText);
    //        test('TEST city data4', function() {  equal('error', 'error', JSON.stringify(error.error)) });
    //    }
    //});
    //
    ///** city*/
    //var data5 = {
    //    createBy: 'standard',
    //    externalTrackingCode: '100093683',
    //    privateKey: 'test-private-key',
    //    paymentMethod: 'cc',
    //    city: 'Milan',
    //    subsidyCost: 0,
    //    standardCost: 0,
    //    firstAvailability: '2016-04-01T16:00',
    //    pickUp:{address: 'ciao ciao'},
    //    address:[{address: 'ciao ciao'}]
    //};
    //$.ajax({
    //    url : 'https://test.api.milkman.it/v1/createOrder',
    //    type: 'POST',
    //    data : JSON.stringify(data5),
    //    dataType: "json",
    //    timeout: 8000,
    //    success: function(data, textStatus, jqXHR)
    //    {
    //        test('TEST city data5', function() {  equal(false, data.success, JSON.stringify(data)) });
    //    },
    //    error: function(data)//jqXHR, textStatus, errorThrown)
    //    {
    //        var error = JSON.parse(data.responseText);
    //        test('TEST city data5', function() {  equal('error', 'error', JSON.stringify(error.error)) });
    //    }
    //});
    //
    ///** city*/
    //var data6 = {
    //    createBy: 'standard',
    //    externalTrackingCode: '100093683',
    //    privateKey: 'test-private-key',
    //    paymentMethod: 'cc',
    //    city: ['Milano'],
    //    subsidyCost: 0,
    //    standardCost: 0,
    //    firstAvailability: '2016-04-01T16:00',
    //    pickUp:{address: 'ciao ciao'},
    //    address:[{address: 'ciao ciao'}]
    //};
    //$.ajax({
    //    url : 'https://test.api.milkman.it/v1/createOrder',
    //    type: 'POST',
    //    data : JSON.stringify(data6),
    //    dataType: "json",
    //    timeout: 8000,
    //    success: function(data, textStatus, jqXHR)
    //    {
    //        test('TEST city data6', function() {  equal(false, data.success, JSON.stringify(data)) });
    //    },
    //    error: function(data)//jqXHR, textStatus, errorThrown)
    //    {
    //        var error = JSON.parse(data.responseText);
    //        test('TEST city data6', function() {  equal('error', 'error', JSON.stringify(error.error)) });
    //    }
    //});
    //
    ///** subsidyCost*/
    //var data7 = {
    //    createBy: 'standard',
    //    externalTrackingCode: '100093683',
    //    privateKey: 'test-private-key',
    //    paymentMethod: 'cc',
    //    city: 'Milano',
    //    subsidyCost: '0,23',
    //    standardCost: 0,
    //    firstAvailability: '2016-04-01T16:00',
    //    pickUp:{address: 'ciao ciao'},
    //    address:[{address: 'ciao ciao'}]
    //};
    //$.ajax({
    //    url : 'https://test.api.milkman.it/v1/createOrder',
    //    type: 'POST',
    //    data : JSON.stringify(data7),
    //    dataType: "json",
    //    timeout: 8000,
    //    success: function(data, textStatus, jqXHR)
    //    {
    //        test('TEST subsidyCost data7', function() {  equal(false, data.success, JSON.stringify(data)) });
    //    },
    //    error: function(data)//jqXHR, textStatus, errorThrown)
    //    {
    //        var error = JSON.parse(data.responseText);
    //        test('TEST subsidyCost data7', function() {  equal('error', 'error', JSON.stringify(error.error)) });
    //    }
    //});
    //
    ///** standardCost*/
    //var data8 = {
    //    createBy: 'standard',
    //    externalTrackingCode: '100093683',
    //    privateKey: 'test-private-key',
    //    paymentMethod: 'cc',
    //    city: 'Milano',
    //    subsidyCost: 0,
    //    firstAvailability: '2016-04-01T16:00',
    //    pickUp:{address: 'ciao ciao'},
    //    address:[{address: 'ciao ciao'}]
    //};
    //$.ajax({
    //    url : 'https://test.api.milkman.it/v1/createOrder',
    //    type: 'POST',
    //    data : JSON.stringify(data8),
    //    dataType: "json",
    //    timeout: 8000,
    //    success: function(data, textStatus, jqXHR)
    //    {
    //        test('TEST standardCost data8', function() {  equal(false, data.success, JSON.stringify(data)) });
    //    },
    //    error: function(data)//jqXHR, textStatus, errorThrown)
    //    {
    //        var error = JSON.parse(data.responseText);
    //        test('TEST standardCost data8', function() {  equal('error', 'error', JSON.stringify(error.error)) });
    //    }
    //});
    ///** firstAvailability*/
    //var data9 = {
    //    createBy: 'standard',
    //    externalTrackingCode: '100093683',
    //    privateKey: 'test-private-key',
    //    paymentMethod: 'cc',
    //    city: 'Milano',
    //    subsidyCost: 0,
    //    standardCost: 0,
    //    firstAvailability: '2016/04/01',
    //    pickUp:{address: 'ciao ciao'},
    //    address:[{address: 'ciao ciao'}]
    //};
    //$.ajax({
    //    url : 'https://test.api.milkman.it/v1/createOrder',
    //    type: 'POST',
    //    data : JSON.stringify(data9),
    //    dataType: "json",
    //    timeout: 8000,
    //    success: function(data, textStatus, jqXHR)
    //    {
    //        test('TEST firstAvailability data9', function() {  equal(false, data.success, JSON.stringify(data)) });
    //    },
    //    error: function(data)//jqXHR, textStatus, errorThrown)
    //    {
    //        var error = JSON.parse(data.responseText);
    //        test('TEST firstAvailability data9', function() {  equal('error', 'error', JSON.stringify(error.error)) });
    //    }
    //});
    ///** firstAvailability*/
    //var data10 = {
    //    createBy: 'standard',
    //    externalTrackingCode: '100093683',
    //    privateKey: 'test-private-key',
    //    paymentMethod: 'cc',
    //    city: 'Milano',
    //    subsidyCost: 0,
    //    standardCost: 0,
    //    firstAvailability: '2016/04/01 12:30:00',
    //    pickUp:{address: 'ciao ciao'},
    //    address:[{address: 'ciao ciao'}]
    //};
    //$.ajax({
    //    url : 'https://test.api.milkman.it/v1/createOrder',
    //    type: 'POST',
    //    data : JSON.stringify(data9),
    //    dataType: "json",
    //    timeout: 8000,
    //    success: function(data, textStatus, jqXHR)
    //    {
    //        test('TEST firstAvailability data10', function() {  equal(false, data.success, JSON.stringify(data)) });
    //    },
    //    error: function(data)//jqXHR, textStatus, errorThrown)
    //    {
    //        var error = JSON.parse(data.responseText);
    //        test('TEST firstAvailability data10', function() {  equal('error', 'error', JSON.stringify(error.error)) });
    //    }
    //});
    //
    ///** firstAvailability*/
    //var data11 = {
    //    createBy: 'standard',
    //    externalTrackingCode: '100093683',
    //    privateKey: 'test-private-key',
    //    paymentMethod: 'cc',
    //    city: 'Milano',
    //    subsidyCost: 0,
    //    standardCost: 0,
    //    firstAvailability: '2016-04-01T16:00:00',
    //    pickUp:{address: 'ciao ciao'},
    //    address:[{address: 'ciao ciao'}]
    //};
    //$.ajax({
    //    url : 'https://test.api.milkman.it/v1/createOrder',
    //    type: 'POST',
    //    data : JSON.stringify(data11),
    //    dataType: "json",
    //    timeout: 8000,
    //    success: function(data, textStatus, jqXHR)
    //    {
    //        test('TEST firstAvailability data11', function() {  equal(false, data.success, JSON.stringify(data)) });
    //    },
    //    error: function(data)//jqXHR, textStatus, errorThrown)
    //    {
    //        var error = JSON.parse(data.responseText);
    //        test('TEST firstAvailability data11', function() {  equal('error', 'error', JSON.stringify(error.error)) });
    //    }
    //});

    /** pickUp*/
    var data12 = {
        createBy: 'standard',
        externalTrackingCode: '100093683',
        privateKey: 'test-private-key',
        paymentMethod: 'cc',
        city: 'Milano',
        subsidyCost: 0,
        standardCost: 0,
        firstAvailability: '2016-04-01T16:00',
        pickUp:{address: ''},
        address:[{address: 'ciao ciao'}]
    };
    $.ajax({
        url : 'https://test.api.milkman.it/v1/createOrder',
        type: 'POST',
        data : JSON.stringify(data12),
        dataType: "json",
        timeout: 8000,
        success: function(data, textStatus, jqXHR)
        {
            test('TEST pickUp data12', function() {  equal(false, data.success, JSON.stringify(data)) });
        },
        error: function(data)//jqXHR, textStatus, errorThrown)
        {
            var error = JSON.parse(data.responseText);
            test('TEST range data12', function() {  equal('error', 'error', JSON.stringify(error.error)) });
        }
    });

    ///** pickUp*/
    //var data13 = {
    //    createBy: 'standard',
    //    externalTrackingCode: '100093683',
    //    privateKey: 'test-private-key',
    //    paymentMethod: 'cc',
    //    city: 'Milano',
    //    subsidyCost: 0,
    //    standardCost: 0,
    //    firstAvailability: '2016-04-01T16:00',
    //    pickUp:{},
    //    address:[{address: 'ciao ciao'}]
    //};
    //$.ajax({
    //    url : 'https://test.api.milkman.it/v1/createOrder',
    //    type: 'POST',
    //    data : JSON.stringify(data13),
    //    dataType: "json",
    //    timeout: 8000,
    //    success: function(data, textStatus, jqXHR)
    //    {
    //        test('TEST pickUp data13', function() {  equal(false, data.success, JSON.stringify(data)) });
    //    },
    //    error: function(data)//jqXHR, textStatus, errorThrown)
    //    {
    //        var error = JSON.parse(data.responseText);
    //        test('TEST additionalCost data13', function() {  equal('error', 'error', JSON.stringify(error.error)) });
    //    }
    //});
    //
    ///** address*/
    //var data14 = {
    //    createBy: 'standard',
    //    externalTrackingCode: '100093683',
    //    privateKey: 'test-private-key',
    //    paymentMethod: 'cc',
    //    city: 'Milano',
    //    subsidyCost: 0,
    //    standardCost: 0,
    //    firstAvailability: '2016-04-01T16:00',
    //    pickUp:{address: 'dcdc cdc'},
    //    address:[{address: ''}]
    //};
    //$.ajax({
    //    url : 'https://test.api.milkman.it/v1/createOrder',
    //    type: 'POST',
    //    data : JSON.stringify(data14),
    //    dataType: "json",
    //    timeout: 8000,
    //    success: function(data, textStatus, jqXHR)
    //    {
    //        test('TEST address data14', function() {  equal(false, data.success, JSON.stringify(data)) });
    //    },
    //    error: function(data)//jqXHR, textStatus, errorThrown)
    //    {
    //        var error = JSON.parse(data.responseText);
    //        test('TEST address data14', function() {  equal('error', 'error', JSON.stringify(error.error)) });
    //    }
    //});
    //
    //
    ///** address*/
    //var data15 = {
    //    createBy: 'standard',
    //    externalTrackingCode: '100093683',
    //    privateKey: 'test-private-key',
    //    paymentMethod: 'cc',
    //    city: 'Milano',
    //    subsidyCost: 0,
    //    standardCost: 0,
    //    firstAvailability: '2016-04-01T16:00',
    //    pickUp:{address: 'dcdc cdc'},
    //    address:{address: 'dcdc'}
    //};
    //$.ajax({
    //    url : 'https://test.api.milkman.it/v1/createOrder',
    //    type: 'POST',
    //    data : JSON.stringify(data15),
    //    dataType: "json",
    //    timeout: 8000,
    //    success: function(data, textStatus, jqXHR)
    //    {
    //        test('TEST address data15', function() {  equal(false, data.success, JSON.stringify(data)) });
    //    },
    //    error: function(data)//jqXHR, textStatus, errorThrown)
    //    {
    //        var error = JSON.parse(data.responseText);
    //        test('TEST address data15', function() {  equal('error', 'error', JSON.stringify(error.error)) });
    //    }
    //});
    //
    ///** address*/
    //var data16 = {
    //    createBy: 'standard',
    //    externalTrackingCode: '100093683',
    //    privateKey: 'test-private-key',
    //    paymentMethod: 'cc',
    //    city: 'Milano',
    //    subsidyCost: 0,
    //    standardCost: 0,
    //    firstAvailability: '2016-04-01T16:00',
    //    pickUp:{address: 'dcdc cdc'},
    //    address:[{}]
    //};
    //$.ajax({
    //    url : 'https://test.api.milkman.it/v1/createOrder',
    //    type: 'POST',
    //    data : JSON.stringify(data16),
    //    dataType: "json",
    //    timeout: 8000,
    //    success: function(data, textStatus, jqXHR)
    //    {
    //        test('TEST address data16', function() {  equal(false, data.success, JSON.stringify(data)) });
    //    },
    //    error: function(data)//jqXHR, textStatus, errorThrown)
    //    {
    //        var error = JSON.parse(data.responseText);
    //        test('TEST address data16', function() {  equal('error', 'error', JSON.stringify(error.error)) });
    //    }
    //});
}));