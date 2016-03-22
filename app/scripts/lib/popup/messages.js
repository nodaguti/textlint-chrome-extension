"use strict";

import messages from "../app/app-message";

export default {
  onError(callback) {
    messages.onError(callback);
  },

  getPopupSettings() {
    return messages.send(messages.GET_POPUP_SETTINGS);
  },

  setPopupSettings(settings) {
    return messages.send(messages.SET_POPUP_SETTINGS, { settings });
  }
}
