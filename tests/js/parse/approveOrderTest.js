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
}(this, function (milkman, $) {
    'use strict';

    console.log('qui"');

    var data = {};

    data['privateKey'] = 'test-private-key';
    data['sessionId'] = 'aV5yOltAMT';
    data['externalTrackingCode'] = 'prova001';

    $.ajax({
        url : 'https://api.parse.com/1/functions/approveOrder',
        headers: {
            "X-Parse-Application-Id": "JLosOIYAbKXW3FBvEZRvQIzI9EZ2ZyNqcJ8w5jit",
            "X-Parse-Javascript-Key": "bGXMI4pBIdRFmnrNw1Y1njCSSTIYahPqJ3NlhUhk"
        },
        type: 'POST',
        data : JSON.stringify(data),
        dataType: "json",
        timeout: 8000,
        success: function(data, textStatus, jqXHR)
        {
            test('TEST createOrder', function() {  equal('success', 'success') });
            console.log('success: '+data.result);
        },
        error: function(data)//jqXHR, textStatus, errorThrown)
        {
            test('TEST createOrder', function() {  equal('error', 'error') });
            var error = JSON.parse(data.responseText);
            console.log('error: '+error.error);
        }
    });
}));