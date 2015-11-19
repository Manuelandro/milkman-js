# Getting Started
-----
This is a JavaScript library with AMD modules that will work either with browser globals or with an AMD loader.

The library also depends on other two libraries, jQuery and Google Maps. To use Milkman.js you will provides JQuery and 
GoogleMaps as dependencies in this way:

The library also depends on other two libraries, jQuery and Google Maps. To use Milkman.js you will provides JQuery and GoogleMaps as dependencies in this way:

      <script src="path/to/jquery.js"></script>
      <script src="https://maps.googleapis.com/maps/api/js?libraries=places&sensor=false"></script>

Visit Milkman Github page on  [https://github.com/milkman-deliveries/milkman-js](https://github.com/milkman-deliveries/milkman-js) and get from *dist/ *repository milkman.js file.

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
