define([ 'rsvp', 'validate' ], function( RSVP, validate ) {
    'use strict';

    /**
     * if all parcels's cart have all the required fields it returns the cart,
     * otherwise it returns null
     *
     *  @PARAM: Array
     */

    return function paramsValidator( attributes, constraints, success, failure ) {
        validate.Promise = RSVP.Promise;

        var isDataSring = validate.isString(attributes);

        if( isDataSring ){
            attributes = JSON.parse(attributes);
        }
        var attKeys = Object.keys(attributes);

        var notValid = attKeys.filter(function(key){
            if (constraints[key]){
                var res2 = constraints[key].required ? validate.isEmpty(attributes[key]) : false;
                //console.log('key: '+JSON.stringify(key));
                switch (constraints[key].type) {
                    case "array":
                        var res1 = !validate.isArray(attributes[key]);
                        //console.log('isNot: '+res1 +' isEmpty: '+ res2);
                        return res1 || res2;
                        break;
                    case "string":
                        var res1 = !validate.isString(attributes[key]);
                        //console.log('isNotString: '+res1 +' isEmpty: '+ res2);
                        return res1 || res2;
                        break;
                    case "number":
                        var res1 = !validate.isNumber(attributes[key]);
                        //console.log('isNotNumber: '+res1 +' isEmpty: '+ res2);
                        return res1 || res2;
                        break;
                    case "boolean":
                        //return validate.isArray(attributes[key]);
                        break;
                    case "date":
                        var res1 = !validate.isDate(attributes[key]);
                        //console.log('isNotDate: '+res1 +' isEmpty: '+ res2);
                        return res1 || res2;
                        break;
                    case "object":
                        var res1 = !validate.isObject(attributes[key]);
                        //console.log('isNotObject: '+res1 +' isEmpty: '+ res2);
                        return res1 || res2;
                        break;
                }
            }
        });

        //console.log('notValid: '+JSON.stringify(notValid));

        if( notValid.length === 0 ){
            success({valid: true});
        } else {
            failure({valid: false, messageError: 'the following attributes are not valid: '+ notValid.toString()});
        }

    }
});