/* Copyright (C) 2016  IRIDE Monad <iride.monad@gmail.com>
 * License: GNU GPLv3 http://www.gnu.org/licenses/gpl-3.0.html */
"use strict";

import React from "react";
import MessageBox from "../common/message-box";

const ReadyMessage = React.createClass({
  render() {
    return (
      <MessageBox text="ready" mark="rocket" />
    );
  }
});

export default ReadyMessage;
