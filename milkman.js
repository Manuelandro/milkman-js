/*global define */

/**
 * The main module that defines the public interface for principium,
 * a made-up library to demonstrate how to construct a source from components.
 */
define(function (require) {
    'use strict';

    var JQ = require('jquery'),

        commit = require('milkman/commit'),

        defaults = require('milkman/Utils/defaults'),
        constants =require('milkman/Utils/constants'),

        checkInterval = require('milkman/Private/checkInterval'),
        checkMissingDates = require('milkman/Private/checkMissingDates'),
        priceEngine = require('milkman/Private/priceEngine'),
        checkProposal = require('milkman/Private/checkProposal'),
        recoverData = require('milkman/Private/recoverData'),
        rangeNormalization = require('milkman/Private/rangeNormalization'),

        createEntity = require('milkman/Entities/createEntity'),
        deleteEntity = require('milkman/Entities/deleteEntity'),
        setEntity = require('milkman/Entities/setEntity'),
        getEntities = require('milkman/Entities/getEntities'),

    //--------------------------------------------
        setInit = require('milkman/Public/setInit'),
        setAddress = require('milkman/Public/setAddress'),
        getAvailability = require('milkman/Public/getAvailability'),

        getPrice = require('milkman/Public/getPrice'),
        //getQuote = require('milkman/Public/getQuote'),
        //findQuote = require('milkman/Public/findQuote'),

        confirm = require('milkman/Public/confirm');


    return {
        version: '0.0.1, jQuery version is: ' + JQ.fn.jquery,

        checkInterval: checkInterval,
        checkMissingDates: checkMissingDates,

        commit: commit,

        defaults: defaults,
        constants: constants,
        priceEngine: priceEngine,
        checkProposal: checkProposal,
        recoverData: recoverData,
        rangeNormalization: rangeNormalization,

        createEntity: createEntity,
        deleteEntity: deleteEntity,
        setEntity: setEntity,
        getEntities: getEntities,

        //--------------------------------------------
        setInit: setInit,
        setAddress: setAddress,
        getAvailability: getAvailability,

        getPrice: getPrice,
        //getQuote: getQuote,
        //findQuote: findQuote,

        confirm: confirm
    };
});
