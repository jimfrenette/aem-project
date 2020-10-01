(function ($, $document) {
 
    $document.on("dialog-ready", function() {

      var $renderYearSwitch = $('[name="./renderYear"]');

      /**
       * if renderYear switch control exists:
       */ 
      if ($renderYearSwitch.length) {

        var prepend,
            text,
            lastChar,
            firstChar,
            alphanumeric,
            $prependInput = $('[name="./prepend"]'),
            $textInput = $('[name="./text"]');

        /** 
         * disable the prepend text input when
         * the switch is off
         */
        if (!$renderYearSwitch.prop('checked')) {
            $prependInput.prop('disabled', true);
        }

        $renderYearSwitch.on('change', function() {
            if(this.checked) {
                $prependInput.prop('disabled', false); 
            } else {
                $prependInput.prop('disabled', true);
            }
        });

        /**
         * when the dialog form is saved
         */
        $('.cq-dialog-submit').on("click", function () {

            prepend = $prependInput.val();
            text = $textInput.val();

            // last character of prepend
            lastChar = prepend.slice(-1);

            // first character of text
            firstChar = text.charAt(0);
            
            // regex to look for alpha-numeric char
            alphanumeric = /^[0-9a-zA-Z]+$/;

            /**
             * check prepend input value on save
             * and add trailing space as needed.
             */
            if (lastChar.indexOf('-') === -1) {
               prepend = prepend + ' ';
               $prependInput.val(prepend);
            }

            /**
             * check text input value on save
             * and add leading space as needed.
             */
            if (firstChar.match(alphanumeric)) {
               text = ' ' + text;
               $textInput.val(text);
            }
            
        });

      }

    });
 
})($, $(document));