/* Copyright (C) 2016  IRIDE Monad <iride.monad@gmail.com>
 * License: GNU GPLv3 http://www.gnu.org/licenses/gpl-3.0.html */
"use strict";

import _ from "lodash";

function promised(callback) {
  return new Promise((resolve, reject) => {
    callback.call(null, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError.message);
      } else {
        resolve(response);
      }
    });
  });
}

module.exports = {

  withActiveTab(fn) {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      (tabs) => { _.each(tabs, fn) }
    );
  },

  withTab(tabId, fn) {
    chrome.tabs.get(tabId, fn);
  },

  syncGet(keys) {
    return promised((cb) => chrome.storage.sync.get(keys, cb));
  },

  syncGetValue(key) {
    return promised((cb) => {
      chrome.storage.sync.get(key, (items) => cb(items.hasOwnProperty(key) ? items[key] : undefined));
    });
  },

  syncSet(items) {
    return promised((cb) => chrome.storage.sync.set(items, cb));
  },

  syncSetValue(key, value) {
    return promised((cb) => chrome.storage.sync.set({ [key]: value }, cb));
  },

  syncRemove(keys) {
    return promised((cb) => chrome.storage.sync.remove(keys, cb));
  },

  localGet(keys) {
    return promised((cb) => chrome.storage.local.get(keys, cb));
  },

  localGetValue(key) {
    return promised((cb) => {
      chrome.storage.local.get(key, (items) => cb(items.hasOwnProperty(key) ? items[key] : undefined));
    });
  },

  localSet(items) {
    return promised((cb) => chrome.storage.local.set(items, cb));
  },

  localSetValue(key, value) {
    return promised((cb) => chrome.storage.local.set({ [key]: value }, cb));
  },

  localRemove(keys) {
    return promised((cb) => chrome.storage.local.remove(keys, cb));
  },

  openOptionsPage() {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      const optionsUrl = chrome.extension.getURL("pages/options.html");
      chrome.tabs.query({ url: optionsUrl }, (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.update(tabs[0].id, { active: true });
        } else {
          chrome.tabs.create({ url: optionsUrl });
        }
      });
    }
  },

  translate(key, fallback) {
    key = _.camelCase(key);
    const translated = chrome.i18n.getMessage(key);
    if (DEBUG && !translated) {
      console.log(`Missing translation: "${key}" (with fallback "${fallback}")`)
    }
    return translated || fallback;
  },

}
