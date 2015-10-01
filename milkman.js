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
        priceEngine = require('milkman/Private/priceEngine'),
        checkProposal = require('milkman/Private/checkProposal'),
        recoverData = require('milkman/Private/recoverData'),

        createEntity = require('milkman/Entities/createEntity'),
        deleteEntity = require('milkman/Entities/deleteEntity'),
        setEntity = require('milkman/Entities/setEntity'),
        getEntities = require('milkman/Entities/getEntities'),

    //--------------------------------------------
        authenticate = require('milkman/Public/authenticate'),
        confirm = require('milkman/Public/confirm'),
        newDeal = require('milkman/Public/newDeal');

    return {
        version: '0.0.1, jQuery version is: ' + $.fn.jquery,

        checkInterval: checkInterval,

        commit: commit,

        defaults: defaults,
        constants: constants,
        priceEngine: priceEngine,
        checkProposal: checkProposal,
        recoverData: recoverData,

        createEntity: createEntity,
        deleteEntity: deleteEntity,
        setEntity: setEntity,
        getEntities: getEntities,

        //--------------------------------------------
        authenticate: authenticate,
        confirm: confirm,
        newDeal: newDeal
    };
});
