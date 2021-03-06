/**
 * JQuery Class
 * version 2.0.9
 */
$.Class = function(definition) {
    var registerNameSpace = function(ns, ptr) {
        var current = ns.shift();
        typeof ptr[current] === 'undefined' ? ptr[current] = {} : null;
        return ns.length > 0 ? registerNameSpace(ns, ptr[current]) : ptr;
    }, Class = function() {
        var initialize = function(def, self, args) {
            pointer = registerNameSpace(def.namespace.split('.'), window);
            $.extend(true, pointer[def.namespace.split('.').pop()], self);
            for (var key in def) (/^init/.test(key) && typeof def[key] === 'function') ? def[key].apply(self, args) : null;
            $.extend(true, pointer[def.namespace.split('.').pop()], self);
            window.loadedClass ? window.loadedClass.push('required.' + def.namespace) : window.loadedClass = ['required.' + def.namespace];
            $(document).trigger('required.' + def.namespace);
        };
        definition.getType = function() { return 'Class'};
        if (typeof definition.required === 'object') {
            var self = this, events = [];
            for(var x in definition.required) {
                events.push('required.' + definition.required[x]);
            }
            $(document).on(events.join(' '), {def: definition, args: arguments}, function(e) {
                if ($.grep(events, function(x) {return $.inArray(x, window.loadedClass)}).length === events.length) {
                    initialize(e.data.def, self, e.data.args);
                }
            });
        } else {
            initialize(definition, this, arguments);
        }
    };
    Class.prototype = definition;
    Class.prototype.constructor = Class;
    if (definition.consts && typeof definition.consts === 'object') {
        $.each(definition.consts, function (constant, value) {
            Class.prototype[constant] = $.proxy(function (cons) { return cons; }, this, value);
        });
    }
    new Class();
};