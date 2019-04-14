const baseAbsPath = __dirname + '/';
const express = require('express');
const Promise = require('bluebird');
const constants = require('../../common/constants');

  const PageRouter = express.Router({
    mergeParams: true
  });
  PageRouter.get("/test", spaRender));

	exports.PageRouter = PageRouter

  spaRender(req, res) {
    const xBundleUri = '/bin/player.zh_ch.bundle.js';
    const paramDict = {
      xBundleUri: constants.ROUTE_PATHS.BASE + xBundleUri,
    };
    res.render('index', paramDict);
  }
