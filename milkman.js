/*global define */

/**
 * The main module that defines the public interface for principium,
 * a made-up library to demonstrate how to construct a source from components.
 */
define(function (require) {
    'use strict';

    var JQ = require('jquery'),

        //commit = require('milkman/commit'),

        defaults = require('milkman/Utils/defaults'),
        constants =require('milkman/Utils/constants'),

        //checkInterval = require('milkman/Private/checkInterval'),
        //checkMissingDates = require('milkman/Private/checkMissingDates'),
        //priceEngine = require('milkman/Private/priceEngine'),
        //checkProposal = require('milkman/Private/checkProposal'),
        //recoverData = require('milkman/Private/recoverData'),
        //rangeNormalization = require('milkman/Private/rangeNormalization'),

        createEntity = require('milkman/Entities/createEntity'),
        deleteEntity = require('milkman/Entities/deleteEntity'),
        setEntity = require('milkman/Entities/setEntity'),
        getEntities = require('milkman/Entities/getEntities'),

    //--------------------------------------------
        createOrder = require('milkman/Parse/createOrder'),
        getETA = require('milkman/Parse/getETA'),
        getTrackingPageURL = require('milkman/Parse/getTrackingPageURL'),
        getWayBill = require('milkman/Parse/getWayBill'),
        setParcel = require('milkman/Parse/setParcel'),


    //--------------------------------------------

        setInit = require('milkman/Public/setInit'),
        setAddress = require('milkman/Public/setAddress'),
        getAvailability = require('milkman/Public/getAvailability'),

        getMultiplePrices = require('milkman/Public/getMultiplePrices');

        //confirm = require('milkman/Public/confirm');


    return {
        version: '0.0.1, jQuery version is: ' + JQ.fn.jquery,
        //checkInterval: checkInterval,
        //checkMissingDates: checkMissingDates,

        //commit: commit,
        //priceEngine: priceEngine,
        //checkProposal: checkProposal,
        //recoverData: recoverData,
        //rangeNormalization: rangeNormalization,

        defaults: defaults,
        constants: constants,

        createEntity: createEntity,
        deleteEntity: deleteEntity,
        setEntity: setEntity,
        getEntities: getEntities,

        //--------------------------------------------
        setInit: setInit,
        setAddress: setAddress,
        getAvailability: getAvailability,
        getMultiplePrices: getMultiplePrices,

        //--------------------------------------------
        createOrder: createOrder,
        getETA: getETA,
        getTrackingPageURL: getTrackingPageURL,
        getWayBill: getWayBill,
        setParcel: setParcel
    };
});
