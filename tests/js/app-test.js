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

    //window.localStorage.removeItem('addresses');
    //window.localStorage.removeItem('default_range');
    //window.localStorage.removeItem('hub');
    //window.localStorage.removeItem('merchant');
    //window.localStorage.removeItem('proposal_id');
    //window.localStorage.removeItem('publishable_key');
    //window.localStorage.removeItem('redirect_uri');
    //window.localStorage.removeItem('session_token');

    ///** AUTHENTICATE --------------------- */
    //var SET_A1 = {
    //    userId: 'svBCpr959v',
    //    city: 'Milano',
    //    cart: {
    //        parcels: ['GxFXVf3iCF', '4IgWGDAZLH']
    //    }
    //};
    //
    //return $.ajax({
    //    url : 'https://api.parse.com/1/functions/setInit',
    //    headers: {
    //        "X-Parse-Application-Id": "JLosOIYAbKXW3FBvEZRvQIzI9EZ2ZyNqcJ8w5jit",
    //        "X-Parse-Javascript-Key": "bGXMI4pBIdRFmnrNw1Y1njCSSTIYahPqJ3NlhUhk"
    //    },
    //    type: 'POST',
    //    data : JSON.stringify(SET_A1),
    //    dataType: "json",
    //    timeout: 8000,
    //    success: function(data, textStatus, jqXHR)
    //    {
    //        console.log(data.result);
    //    },
    //    error: function(data)//jqXHR, textStatus, errorThrown)
    //    {
    //        var error = JSON.parse(data.responseText);
    //
    //        console.log({
    //            success: false,
    //            error: error.error
    //        });
    //    }
    //});

    ///** SET ADDRESS --------------------- */
    //
    //var SET_B1 = {
    //    userId: 'svBCpr959v',
    //    sessionId: 'TwO3u8lH47',
    //    proposalId: 'Pi0fbzy2YI',
    //    address: [ 'jop6egtNl4' ]
    //};
    //
    //return $.ajax({
    //    url : 'https://api.parse.com/1/functions/setDetails',
    //    headers: {
    //        "X-Parse-Application-Id": "JLosOIYAbKXW3FBvEZRvQIzI9EZ2ZyNqcJ8w5jit",
    //        "X-Parse-Javascript-Key": "bGXMI4pBIdRFmnrNw1Y1njCSSTIYahPqJ3NlhUhk"
    //    },
    //    type: 'POST',
    //    data : JSON.stringify(SET_B1),
    //    dataType: "json",
    //    timeout: 8000,
    //    success: function(data, textStatus, jqXHR)
    //    {
    //        console.log(data.result);
    //    },
    //    error: function(data)//jqXHR, textStatus, errorThrown)
    //    {
    //        var error = JSON.parse(data.responseText);
    //
    //        console.log({
    //            success: false,
    //            error: error.error
    //        });
    //    }
    //});

    ///** GET AVAILABILITY --------------------- */
    //
    //var SET_C1 = {
    //    userId: 'svBCpr959v',
    //    sessionId: 'TwO3u8lH47',
    //    firstDay: '2016-02-19',
    //    numberOfDays: 6
    //};
    //
    //return $.ajax({
    //    url : 'https://api.parse.com/1/functions/getAvailability',
    //    headers: {
    //        "X-Parse-Application-Id": "JLosOIYAbKXW3FBvEZRvQIzI9EZ2ZyNqcJ8w5jit",
    //        "X-Parse-Javascript-Key": "bGXMI4pBIdRFmnrNw1Y1njCSSTIYahPqJ3NlhUhk"
    //    },
    //    type: 'POST',
    //    data : JSON.stringify(SET_C1),
    //    dataType: "json",
    //    timeout: 8000,
    //    success: function(data, textStatus, jqXHR)
    //    {
    //        console.log(data.result);
    //    },
    //    error: function(data)//jqXHR, textStatus, errorThrown)
    //    {
    //        var error = JSON.parse(data.responseText);
    //
    //        console.log({
    //            success: false,
    //            error: error.error
    //        });
    //    }
    //});

    ///** QUOTATION --------------------- */
    //var SET_D1 = {
    //    sessionId: 'TwO3u8lH47',
    //    userId: 'svBCpr959v',
    //    proposalId: 'Pi0fbzy2YI',
    //    quotationType: 'getQuote',
    //    ranges: ["2016-02-22T15:00/2016-02-22T17:00"]
    //};
    //
    //return $.ajax({
    //    url : 'https://api.parse.com/1/functions/quotation',
    //    headers: {
    //        "X-Parse-Application-Id": "JLosOIYAbKXW3FBvEZRvQIzI9EZ2ZyNqcJ8w5jit",
    //        "X-Parse-Javascript-Key": "bGXMI4pBIdRFmnrNw1Y1njCSSTIYahPqJ3NlhUhk"
    //    },
    //    type: 'POST',
    //    data : JSON.stringify(SET_D1),
    //    dataType: "json",
    //    timeout: 8000,
    //    success: function(data, textStatus, jqXHR)
    //    {
    //        console.log(data.result);
    //    },
    //    error: function(data)//jqXHR, textStatus, errorThrown)
    //    {
    //        var error = JSON.parse(data.responseText);
    //
    //        console.log({
    //            success: false,
    //            error: error.error
    //        });
    //    }
    //});

    ///** CREATE ORDER */
    var SET_E1 = {
        sessionId: 'TwO3u8lH47',
        userId: 'HF3cPEWxC4',
        createBy: 'app',
        paymentMethod: 'cc',
        ranges: ["2016-02-22T15:00/2016-02-22T17:00"],
        additionalCost: 3.90
    };

    return $.ajax({
        url : 'https://api.parse.com/1/functions/createOrder',
        headers: {
            "X-Parse-Application-Id": "JLosOIYAbKXW3FBvEZRvQIzI9EZ2ZyNqcJ8w5jit",
            "X-Parse-Javascript-Key": "bGXMI4pBIdRFmnrNw1Y1njCSSTIYahPqJ3NlhUhk"
        },
        type: 'POST',
        data : JSON.stringify(SET_E1),
        dataType: "json",
        timeout: 8000,
        success: function(data, textStatus, jqXHR)
        {
            console.log(data.result);
        },
        error: function(data)//jqXHR, textStatus, errorThrown)
        {
            var error = JSON.parse(data.responseText);

            console.log({
                success: false,
                error: error.error
            });
        }
    });

}));