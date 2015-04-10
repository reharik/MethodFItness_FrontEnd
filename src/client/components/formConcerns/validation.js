var _ = require("lodash");
var validators = require('./validatorEnum.js');

var errorMessages = {
    "required":"field is Required",
    "minlength":"field should be a certain min",
    "maxlength":"field should be a certain max",
    "rangelength":"field should be with in a range",
    "email":"field should be valid email",
    "url":"field should be valid url",
    "date":"field should be a valid date",
    "number":"field should be a number",
    "digits":"field should be didgets",
    "creditcard":"field should be a valid creditcard",
    "equalTo":"field should be equal to"
};

var validationRules = (function(){
    return {
        required: function(value, param) {
            if(param == "select" || param == "multiselect") {
                // could be an array for select-multiple or a string, both are fine this way
                return value && value.length > 0;
            }
            if(param.indexOf("text")>=0){
                return _.trim(value).length > 0;
            }
            return val;
        },
        minlength: function(value, param) {
            return value.length >= param;
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/maxlength
        maxlength: function(value, param) {
            return value.length <= param;
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/rangelength
        rangelength: function(value, param1, param2) {
            var length = value.length;
            return ( length >= param1 && length <= param2 );
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/email
        email: function(value) {
            // contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
            return  /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/url
        url: function(value) {
            // contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
            return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/date
        date: function(value) {
            return !/Invalid|NaN/.test(new Date(value));
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/number
        number: function(value) {
            return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/digits
        digits: function(value) {
            return /^\d+$/.test(value);
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/creditcard
        // based on http://en.wikipedia.org/wiki/Luhn
        creditcard: function(value) {
            // accept only spaces, digits and dashes
            if (/[^0-9 -]+/.test(value))
                return false;
            var nCheck = 0,
                nDigit = 0,
                bEven = false;

            var _value = value.replace(/\D/g, "");

            for (var n = _value.length - 1; n >= 0; n--) {
                var cDigit = _value.charAt(n);
                var nDigit = parseInt(cDigit, 10);
                if (bEven) {
                    if ((nDigit *= 2) > 9)
                        nDigit -= 9;
                }
                nCheck += nDigit;
                bEven = !bEven;
            }

            return (nCheck % 10) == 0;
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/equalTo
        equalTo: function(value, param) {
            return value === param;
        }
    };
}());

var validationRunner = (function(){
    return function validate(rules, value, param1, param2 ){
        var _valid = {valid: true};
        if(!rules || !Array.isArray(rules) || rules.length == 0 || ((!value || value==="") && !_.any(rules, function(item) { return item === validators.REQUIRED }))){
            return _valid;
        }
        var errors = _.map(rules, function (rule) {
            return validationRules[rule](value, param1, param2)
                ? {valid: true}
                : {valid: false, message: errorMessages[rule]};
        })
            .filter(function (item) {
                return item.valid === false
            });
        return errors[0] ? errors[0] : _valid;
    };
}());

module.exports = validationRunner;

