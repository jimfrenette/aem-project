/**
 * For use when there isn't a Sling Model, e.g.,
 * com.myproject.core.models.CopyrightModel
 */
"use strict";

use( function() {

    ​var data = {};

    var Calendar = Packages.java.util.Calendar;
    
    data.currentYear = Calendar.getInstance().get(Calendar.YEAR);
​
    return data;
});