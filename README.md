This is a JavaScript library with AMD modules that will work either with browser globals or with an AMD loader.

The library also depends on other two libraries, jQuery and Google Maps. 
To use Milkman.js you will provides JQuery and GoogleMaps as dependencies in this way:

      <script src="path/to/jquery.js"></script>
      <script src="https://maps.googleapis.com/maps/api/js?libraries=places&sensor=false"></script>

Visit Milkman Github page on  [https://github.com/milkman-deliveries/milkman-js](https://github.com/milkman-deliveries/milkman-js) and get from *dist/* repository *milkman.js* file.

Below it is described how to include Milkman.js library in your project.

# Browser

      <script src="milkman.js"></script>

      <script>
          Milkman.setInit( param );
      </script>

# Require.js

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

# Definition

      Milkman.setInit( parameters, function( results ) { \n  ... //code here ... \n});

# Parameters

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

# Definition

      Milkman.setAddress( parameters, function( results ){ ... //code here ... });


# Parameters

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

# Result Format    

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

# Definition

      Milkman.setConsignee( parameters, function( results ){ ... //code here ... });

# Parameters

      {
            "telephone": String,
                "email": String
      }

# Result Format

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

# Definition

      Milkman.getQuote( parameters, function( results ){ ... //code here ... }); 

# Parameters
      {
            range: Array,
        weeekdays: Array,
            hours: Array
      }
    
## Range parameter 
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
    
## Weekdays parameter 
It specifies the available days of the week. They are represented by numbers, from 1 to 7;
One is Monday, two is Tuesday and so on for all the weekdays. 
To exclude one day or more from the selected range of time you can simply not include the corresponding number in the array.

So, for example, if you want to evaluate the price for a period of time in which are excluded all saturdays and sundays, you have to define in this way weekdays parameter. 

       weekdays: [1, 2, 3, 4 ,5] 

## Hours parameter 
It defines the business hours of the day. 
You can insert more than one value in the format "**hh:mm/hh:mm**". 

An example of acceptable hours range:

       hours: [ "09:10/12:20", "13:00/14:30", "17:50/18:40" ]
    
**Note**: Milkman.js works in ten-minutes intervals. If you set a more detailed range of hours, Milkman.js approaches the nearest neighborhood.

As an example, if you set

       hours: "12:43/13:18"

Milkman.js returns

       hours: "12:50/13:10"

# Result Format


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

# Definition

      Milkman.findQuote( parameters, function( results ){ ... //code here ... });

# Parameters

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

# Result Format

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

# Definition

      Milkman.confirm( parameters, function( results ){ ... //code here ... });

# Parameters

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

# Result Format

      {
         "success": true,
         "text": “OK, success.”
      }
    
      {
         "success": false,
         "text": "error text"
      }




## How to build the library

    node tools/r.js -o tools/build.js

## Running

You must install all dependencies.

First include in your project:

    directory dist/milkman.js
    
Simply call milkman. with one of the supported input types.

    ex: milkman.createRecord('entity', 'details');

## Credit

This library was created by [Francesca Barbazeni].  This README document was written by Francesca Barbazeni.

## HOW TO EXPORT

dist/*
lib/jquery
tests/*
