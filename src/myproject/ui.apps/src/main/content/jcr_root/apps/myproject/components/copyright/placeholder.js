"use strict";

use( function() {

    var placeholder = false;

    var renderYear = properties.get("renderYear");
    var text = properties.get("text");

    if (renderYear == null || renderYear == 'false' && text == null) {
        placeholder = true;
    }

    return placeholder;
});