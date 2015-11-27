# Introduction
--------------------

# Why Milkman?

Milkman Deliveries is a last mile logistics company aimed at improving the conversion rate of Online Shops of any scale through an enhanced range of parcel delivery options. 

Shoppers are introduced to an array of value-add services that include: next day, same day, time windows and self-service custom appointments. The price of any option implements the perfect balance between most demanding and cost-sensitive Shoppers by weighting Service Level and Cost-Effectiveness to any need.

Milkman Deliveries offers a shopping experience of unprecedented quality, from online cart to doorstep, focusing on the Shopper’s needs. Punctuality is guaranteed by increasingly accurate expected time of arrival (ETA) notifications, published on our Milkman Deliveries API® or sent via diverse mobile and online solutions. Drivers, on arrival, have plenty of time to deal with any kind of help or question asked by the Shopper. The same Shoppers, if unable to be home on delivery time, are entitled to change their mind about the arrangements after checkout. That’s because Milkman gives them the same flexibility in the post-purchase experience.

The times are gone when Retailers told Shoppers when they had to be home to receive parcels. Now it’s Shoppers who tell Milkman when to ring the doorbell.

# About

The first thing you need is a delivery-arrangement widget. If you don't have one already you can use one of ours or ask us to develop your own. Alternatively we can provide you a plugin for your e-commerce site.

The widget's goal is to give the user the chance to choose a favourite range of time in which to receive the parcel at home. Milkman sends back to the widget the best price for every option, in real time.

You must interact with our system to obtain a price. To do so you have to plug the widget into Milkman.js, a library that simplifies communication with Milkman. As an alternative it is possible to directly interrogate Milkman's API through REST calls. 

Once the user has successfully closed his purchase you have to communicate it to us. From that point onwards we'll take care of the delivery process. The only additional information we need is the address of the hub where the parcel is located.

# Core sets and use cases

Milkman offers three different sets, whereas each set is dedicated to a specific set of use cases.

## Milkman.js library

Allows final users to communicate with milkman in a very friendly way.
Enables features such as:

1. Authentication with merchant credentials
2. Setting consignee, cart and address details
3. Get quotations for different intervals of time
4. Confirm the choosen quote

## Orders API

(legato agli ordini, da fare)

## Helper APIs
(legato all'ERP,da fare)

# Overview
###### the milkman lifecycle

In this section we want to offer a clear vision of milkman's whole process. 
The easiest way to use milkman is through Milkman.js library. That's the integration we adopted for the following overview.
In case you're not interested in using the recommended complementary library, you can bypass it and directly call the Milkman API. If you choose the latter option follow the link to the API Rest guide. 

## Players

In this overview we present four players:
1. The Merchant's Server: it has to confirm the final section of the life cycle
2. Milkman API: it's the key of the process, executes the price engine. We refer to it for every request. Merchants can refer directly to it or go thorugh the Milkman.js library (as explained above)
3. Milkman.js library: It's a middleware that stands between the final user and Milkman's server. It lets the user reduce the call's complexity
4. Final User: he starts the call and is the client side of the whole process. He's free to directly interrogate the Milkman API or pass through Milkman.js' library. 

## Prerequisites

The merchant is identified by two keys: secret and publishable.
The publishable key is meant solely to identify the merchant within Milkman, It is not secret. 
In other words, it can safely be published in places like your JavaScript code, or in an Android or iPhone app. The publishable key has the only power of enabling Milkman to create a session.

The secret key should never be published, and must be kept confidential on your own servers. These key allows the merchant's server to communicate with the Milkman API.

Moreover the final user has to specify the merchant's URL in order to allow Milkman.js library to communicate with the merchant's server.


## Lifecycle

First the final user has to set the initial required value to authenticate his credentials with Milkman. In order to do this he calls setInit method on Milkman.js' Library and sends the required fields, including the publishableKey and the redirectUri.     

At this point the Milkman.js library scans the form and verifies that they are written correctly and that all required fields are present. 

Hopefully Milkman.js library sends the data to Milkman API that will open a new session for the current merchant.  


![alt tag](https://www.filepicker.io/api/file/zLiDKVh7R1m84W5g4kyI)


The second step is to set the required consignee address. Without it it's impossible to proceed with milkman interactions. So, the final user calls setAddress method to Milkman.js library; the library checks the address lat/lng and requests the integration of these informations in the current session to Milkman API. Obviously this request can be done directly from the final user to Milkman API without the support of Milkman.js library.


![alt tag](https://www.filepicker.io/api/file/nfRH4h4RQhuGy34MF4Ei)


When every required field is setted i'is possible to interrogate milkman for a quotation. This is the case in which Milkman.js' library shows its usefulness compared to direct calls sent to the Milkman API. Users can request a quotation through getQuote and findQuote's methods in a very comfortable way. Then it's Milkman.js library that normalizes and tokenizes the provided ranges of time in intervals small enough to be integrated in the price engine function. After this process the method will return the required range together with the associated price.

If the logic for the price engine is not already inside the Milkman.js library, it will request to the Milkman API the neccessary informations to proceed with the quotation.


![alt tag](https://www.filepicker.io/api/file/JErQIb0qSOiqfFjHSYgi)


This process can be done more and more times, when the user has found a suitable solution for  both his time and his pockets he will send, though confirm method, the selected range of time with the correlated price.

Milkman.js library checks the price and, if everything is ok, then sends the request to the Milkman API. 


![alt tag](https://www.filepicker.io/api/file/C8zb0WQER4yeYCfXp4wd)



Milkman API checks one more time the price and hopefully gives the green light to the commitment.

Milkman.js library advices the merchant's server about the new order and sends the details about the session and the accepted price.
The merchant's server has to confirm the positive request to the Milkman.js' library.


![alt tag](https://www.filepicker.io/api/file/SzdhYWlASVeOASuGsxGq)


The last step requires a request by the merchant's server. It has to pass to the Milkman API the session identifier with the secret key in order to communicate to Milkman the accurancy of the previous confirmation. At this point the lifecycle of Milkman experience is closed.


![alt tag](https://www.filepicker.io/api/file/ruXFoLRjRxebOockEop6)


# Milkman.js 
---------------------

# Basic concepts

Milkman.js library exposes its data via javascript method. This document is the official reference for that functionality.

## Methods

Methods to retrieve data from the milkman.js library show "get" or "find" suffix. 
Methods that submit or change data show "set" suffix. Method that close the session and confirm the selected order show "confirm" suffix. 
Methods that require specific fields will return an error if you do not make your request with the correct one.

## The API is a RESTful resource

Milkman.js library depends on Milkman API functionality. Milkman API attempts to conform to the design principles of Representational State Transfer (REST). [More details on REST can be found here.](http://en.wikipedia.org/wiki/Representational_state_transfer)

## The format used for structured data exchange is JSON

Milkman.js library supports the JSON (JavaScript Object Notation) format. 
[Details on how JSON works can be found here](http://json.org/) [and here.](http://en.wikipedia.org/wiki/JSON) Libraries that convert to and from the JSON format are readily available for popular and less popular programming languages. [A full index, sorted by language, can be found at the bottom of this page.](http://json.org/)

## Parameters have certain expectations

Some methods take optional or requisite parameters. Please keep in mind that all query-string parameter values should be converted to UTF-8 and URL encoded.
There are two special parameters, "publishableKey" and "privateKey", used for authentication and commit, see the sections below for more details.

## Authentication

Authentication is performed using a publishableKey provided by Milkman. The publishableKey is a string, more specifically it’s a UUID in its canonical form, and must be included in the "setInit" method.

## Commit

Commit is confirmed by merchant's server using the privateKey provided by Milkman. The secret key should never be published, and must be kept confidential on your own servers. 

## Address limits

"setAddress" method has a maximum size of 10 items. Attempting to queue more than this number of addresses will return an error.

# HTTP Response Codes and Errors

## Status Codes

Milkman.js library returns three different status for every request:
1. success: The request was successfully completed.
2. warning: The request was completed but something cannot be accepted.
3. failure: The request cannot be accepted.

## Error Messages

When Milkman.js library returns error messages, it does so in JSON format. For example, an error might look like this:

  {
  status: "failure",
  text: "Unauthorized: Authentication credentials are missing or incorrect. The accompanying error message explains why."
  error_message:"Some required fields are missing."
  }

## Warning status

In case of warning's status you can find this type of error message:
1. "We are not able to calculate lat-lng for some addresses." 
2.  "Some addresses are not acceptable, they missing required fields."

## Error status

Error codes define the type of an error. The following error may be returned:
1. 402 : 'No results.'
2. 400: 'Bad Request: The request cannot be accepted. The accompanying error message explains why.'
3. 401:  'Unauthorized: Authentication credentials are missing or incorrect. The accompanying error message explains why.'    

## Error message

In the body of returned error messages you can find the scope of an error. The following error message may be returned:
1. 'Price is not valid.'
2. 'Range is not valid.'
3. 'Hour is not valid.'
4. 'Range is not in a correct form. Please check it.'
5. 'You need to set publichable key and merchant URI before.'
6. 'Some required fields in Parcel's Cart are missing.'
7. 'Some required fields are missing.'
8. 'You need to set required fields before.'
9. 'Value, FirstAvailableDay and AuxCost are required fields.'

# Get started

This is a JavaScript library with AMD modules that will work either with browser globals or with an AMD loader.

The library also depends on other two libraries, jQuery and Google Maps. 
To use Milkman.js you will provides JQuery and GoogleMaps as dependencies in this way:

      <script src="path/to/jquery.js"></script>
      <script src="https://maps.googleapis.com/maps/api/js?libraries=places&sensor=false"></script>

Visit Milkman Github page on  [https://github.com/milkman-deliveries/milkman-js](https://github.com/milkman-deliveries/milkman-js) and get from *dist/* repository *milkman.js* file.

Below it is described how to include Milkman.js library in your project.

## Browser

      <script src="milkman.js"></script>

      <script>
          Milkman.setInit( param );
      </script>

## Require.js

      require.config({
          paths: {
              "milkman": "path/to/milkman",
          }
      });

      define(["milkman"], function (Milkman) {
          Milkman.setInit( param );
      });

Now you can go straight to the *setInit* method in order to configure a session.

# Set Init

As a first step you will provide required parameters to suite your needs and Milkman.js

To begin the comunication with Milkman you will supply required informations about the Merchant. With *setInit* method you are enabled to set other features that belongs to the cart.

## Definition

      Milkman.setInit( parameters, function( results ) { \n  ... //code here ... \n});

## Parameters

Below are listed all the permitted parameters.
Required fields are highlighted with (*), so you need to provide these values:  
  *  **publishableKey** , a key provided by the merchant that identifies him in a united way.
  *  **redirectUri**, the Merchant server's URL. Without it transitions between Milkman.js and Merchant server are not possible. 
  *   **trackingCode**, the Merchant cart identifier code. 

**Note**: in the Cart's PickUp field you need to provide either id or address and lat and lng.

      publishableKey(*): String,
         redirectUri(*): String,
        trackingCode(*): String,
                   cart:
                [
                    {
                       value(*): Number,
                     auxCost(*): Number,    
                      weight(*): Number,
           firstAvailableDay(*): Number,
                         pickUp: 
                         {
                               id(*): Number,
                          address(*): String,
                              lat(*): Number,
                              lng(*): Number,
                                note: String
                         }
                         length: Number,
                          depth: Number,
                         volume: Number,
                         height: Number,
                           type: String,
                      addedCost: Number,          
                    }
                ]
                
# Set Address                
To directly set Address specifications.

When you have defined the session through the *setInit* method, you are enabled to set other features that belongs to the consignee and complete the setting configuration step.

## Definition

      Milkman.setAddress( parameters, function( results ){ ... //code here ... });


## Parameters

You need to provide either address or lat and lng or both. When you hand on the only address field, Milkman.js will process it and store the returning lat/lng. 
However the recommended way is to send both address and lat and lng in order to have guaranteed values.

      {
                 address(*): String,
                     lat(*): Number,
                     lng(*): Number,
                    heading: Number,
                      pitch: Number,
        deliverInstructions: String
      }

## Result Format    

      {
        "success": true,
        "text": "OK, success"
      }
    
      {
        "success": false,
        "text": "Please define init configuration before address details."
      }

      {
        "success": false,
        "text": "The address requires to be acceptable “address” field or both “lat” and “lng” fields."
      }

# Set Consignee

To directly set *Consignee* specification.

As before if you have defined a session by the *setInit* method, you can set or change Consignee configuration.

## Definition

      Milkman.setConsignee( parameters, function( results ){ ... //code here ... });

## Parameters

      {
            "telephone": String,
                "email": String
      }

## Result Format

      {
        "success": true,
        "text": "OK, success"
      }
      {
        "success": false,
        "text": "Please define init configuration before consignee details."
      }
      
# Get Quote      
Given a range of time it returns a price.

When the initialization stage is completed, you can proceed to query Milkman.js for quotations.
 
The *getQuote* method permits you to define a range of time with restraint roles on valuable days and hours. It returns the best price for the whole range of time.

 All the parameters are optional so you are able to call this method with a default configuration that is provided by your merchant.

## Definition

      Milkman.getQuote( parameters, function( results ){ ... //code here ... }); 

## Parameters
      {
            range: Array,
        weeekdays: Array,
            hours: Array
      }
    
### Range parameter 
It represents one or more time windows that can be passed in different formats:

Format                        | Details
----------------------------- | -----------------------
date                          |       in "**yyyy-mm-dd**" format
first-date / last-date        |       to define a range of time. first-date and last-date are different.
date-time / date-time         |       in "**yyyy-mm-ddThh:mm**" format. Both with the same date but with different time.

In this way you can easly assemble a custom range of time. 
As an example:

        range: [ 
           "2015-12-04", 
           "2015-12-09/2015-12-13", 
           "2015-12-16T11:30/2015-12-16T15:00" 
       ]

Milkman then takes this range of time and normalizes it, using the defaults to fill the blanks.
So if we consider these defaults:

       business hours: 09:00AM to 18:00PM 
       business weekdays: Monday, Tuesday and Wednesday  

The result for the previous example is something like that:

       range: [ 
          "2015-12-04T09:00/2015-12-04T18:00", 
          "2015-12-09T09:00/2015-12-09T18:00", 
          "2015-12-10T09:00/2015-12-10T18:00", 
          "2015-12-11T09:00/2015-12-11T18:00", 
          "2015-12-16T11:30/2015-12-16T15:00" 
       ]
    
### Weekdays parameter 
It specifies the available days of the week. They are represented by numbers, from 1 to 7;
One is Monday, two is Tuesday and so on for all the weekdays. 
To exclude one day or more from the selected range of time you can simply not include the corresponding number in the array.

So, for example, if you want to evaluate the price for a period of time in which are excluded all saturdays and sundays, you have to define in this way weekdays parameter. 

       weekdays: [1, 2, 3, 4 ,5] 

### Hours parameter 
It defines the business hours of the day. 
You can insert more than one value in the format "**hh:mm/hh:mm**". 

An example of acceptable hours range:

       hours: [ "09:10/12:20", "13:00/14:30", "17:50/18:40" ]
    
**Note**: Milkman.js works in ten-minutes intervals. If you set a more detailed range of hours, Milkman.js approaches the nearest neighborhood.

As an example, if you set

       hours: "12:43/13:18"

Milkman.js returns

       hours: "12:50/13:10"

## Result Format


      { 
	        "success": true, 
			"text": “OK, success.”, 
			"ranges": [....],  
			"price": ...  
	  }

	  { 
	  	  "success": false,  
		  "text": “Range is not in a correct form.Please check it.”
	  }
	  
# Find Quote
Given a range of time it returns the best time windows with price.

In some cases it is useful to receive, given a time range, a set of time windows with the correlated price. This is what the *findQuote* method is designed to do. 

It accepts a richer and more complex set of parameters compared to *getQuote*.
Indeed, you are enabled to define the number of resulting time-windows, their dimensions, distribution in the range of time and so on.

Now let's take a look on it in detail.

## Definition

      Milkman.findQuote( parameters, function( results ){ ... //code here ... });

## Parameters

Below are listed the *findQuote* method parameters; they are all optionals. 

As for getQuote, if you call this method without parameters it gets the default values from the merchant in order to return a valid response.

      {
               range: array,
            weekdays: array,
               hours: array,
         quoteNumber: number,
        quotePerDate: number,
             overlap: boolean,
         minDuration: number,
         maxDuration: number
      }

* **QuoteNumber** defines the number of your results.
* **QuotePerDate** defines the maximum number of time-windows in the same day. 
* **Overlap** permits time-windows to be overlapped on simultaneous hours.
* **MinDuration** defines the minimum dimension for a time-window. 

Units of time have ten-minute intervals and they are represented by integers. 

So, as an example, if you want to represent six units of time, an hour, you have to use the integer "6".

      minDuration: 3        //it corresponds to an half
      minDuration: 6        //it corresponds to 1 hour
      minDuration: 9        //it corresponds to 1 hour and half
     
* **MaxDuration** defines the maximum dimension for a time-window. It is codified in the same way of *MinDuration*.

## Result Format

      {
        "success": true,
        "text": “OK, success.”,
        "quotes": 
        {
          “range”: yyyy-mm-ddThh:mm/yyyy-mm-ddThh:mm ,
          “price”: 9,99  
        }
      }

      {
         "success": false,
         "text": “Range is not in a correct form.Please check it.”
      }

# Confirm

Confirm the best quotation.

When you have found a suitable solution for both your time and your pockets, you can proceed with the confirm quotation stage.

## Definition

      Milkman.confirm( parameters, function( results ){ ... //code here ... });

## Parameters

The *confirm* method required two features: 
  * the range of time that you have chosen.
  * the correlated price for the time range. 


       {
          range(*): array,
          price(*): number
       }

Milkman checks the values and then starts a connection with the merchant server.

# Commit
In order to verify the confirmation, Milkman.js sends to the merchant server the selected price with a session identifier. 
 
      {
        session_id(*): string,
        price(*): number
      }

The merchant server has to respond with a *Success status* to close the transition in a successful way. 
On the other hand it has to return a *Failure status* with an error message that will be sent to the client if something goes wrong.  

## Result Format

      {
         "success": true,
         "text": “OK, success.”
      }
    
      {
         "success": false,
         "text": "error text"
      }
