/* Copyright (C) 2016  IRIDE Monad <iride.monad@gmail.com>
 * License: GNU GPLv3 http://www.gnu.org/licenses/gpl-3.0.html */
"use strict";

import cutil from "../util/chrome-util";

const POPUP_SETTINGS = "popupSettings";
const OPTIONS = "options";

export default {
  getPopupSettings() {
    return cutil.syncGetValue(POPUP_SETTINGS);
  },
  setPopupSettings(settings) {
    return cutil.syncSetValue(POPUP_SETTINGS, settings);
  },
  getOptions() {
    return cutil.syncGetValue(OPTIONS);
  },
  setOptions(options) {
    return cutil.syncSetValue(OPTIONS, options);
  },

  observePopupSettingsUpdate(callback) {
    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (changes[POPUP_SETTINGS]) {
        callback(changes[POPUP_SETTINGS]);
      }
    });
  },
  observeOptionsUpdate(callback) {
    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (changes[OPTIONS]) {
        callback(changes[OPTIONS]);
      }
    });
  },
};
