
define( function() {
        'use strict';

        return function makeDefaultRange( from_day, from_time, to_day, to_time ) {
            return from_day + 'T' + from_time + '/' + to_day + 'T' + to_time;

        };

    }
);