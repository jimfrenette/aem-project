"use strict";

use( function() {

    ​var data = {};

    var Calendar = Packages.java.util.Calendar;
    
    data.currentYear = Calendar.getInstance().get(Calendar.YEAR);
​
    return data;
});