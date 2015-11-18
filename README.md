---
title: "Getting Started"
excerpt: "This is a JavaScript library with AMD modules that will work either with browser globals or with an AMD loader."
---
The library also depends on other two libraries, jQuery and Google Maps. To use Milkman.js you will provides JQuery and GoogleMaps as dependencies in this way:

      <script src="path/to/jquery.js"></script>
      <script src="https://maps.googleapis.com/maps/api/js?libraries=places&sensor=false"></script>

Visit Milkman Github page on  [https://github.com/milkman-deliveries/milkman-js](https://github.com/milkman-deliveries/milkman-js) and get from *dist/ *repository milkman.js file.

Below it is described how to include Milkman.js library in your project.
[block:api-header]
{
  "type": "basic",
  "title": "Browser"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "<script src=\"milkman.js\"></script>\n\n<script>\n    Milkman.setInit( param );\n</script>",
      "language": "html",
      "name": null
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Require.js"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "require.config({\n    paths: {\n        \"milkman\": \"path/to/milkman\",\n    }\n});\ndefine([\"milkman\"], function (Milkman) {\n    Milkman.setInit( param );\n});",
      "language": "r"
    }
  ]
}
[/block]
Now you can go straight to the *setInit* method in order to configure a session.

# Milkman

A simple way to integrate milkman intelligence in javascript.

## Milkman.js Implementation

...

## How to build the library

    node tools/r.js -o tools/build.js

## Running

You must install all dependencies.

First include in your project:

    directory dist/milkman.js
    
Simply call milkman. with one of the supported input types.

    ex: milkman.createRecord('entity', 'details');

## Credit

These widgets was created by [Francesca Barbazeni].  This README document was written by Francesca Barbazeni.

## HOW TO EXPORT

dist/*
lib/jquery
tests/*
