/*global define */

/**
 * The main module that defines the public interface for principium,
 * a made-up library to demonstrate how to construct a source from components.
 */
define(function (require) {
    'use strict';

    var $ = require('jquery'),

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
        confirm = require('milkman/Public/confirm'),
        getQuote = require('milkman/Public/getQuote'),
        setInit = require('milkman/Public/setInit');

    return {
        version: '0.0.1, jQuery version is: ' + $.fn.jquery,

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
        confirm: confirm,
        setInit: setInit,
        getQuote: getQuote
    };
});
