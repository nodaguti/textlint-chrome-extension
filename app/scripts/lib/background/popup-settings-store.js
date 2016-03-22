/* Copyright (C) 2016  IRIDE Monad <iride.monad@gmail.com>
 * License: GNU GPLv3 http://www.gnu.org/licenses/gpl-3.0.html */
"use strict";

import AppStorage from "../app/app-storage";
import { DEFAULT_SETTINGS } from "../popup/popup-settings";

export default class PopupSettingsStore {
  constructor() {
    this._settings = DEFAULT_SETTINGS;

    AppStorage.getPopupSettings().then((settings) => {
      this._settings = settings;
    });

    // Keeps up-to-date
    AppStorage.observePopupSettingsUpdate(({ newValue }) => {
      this._settings = newValue;
    });
  }

  getSettings() {
    return this._settings;
  }

  setSettings(settings) {
    this._settings = settings;
    AppStorage.setPopupSettings(settings);
  }
}
