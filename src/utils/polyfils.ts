export = {
    objectAssign: function (target, source) {
        'use strict';
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert first argument to object');
        }

        var to = Object(target);
        for (var i = 0; i < source.length; i++) {
            var nextSource = source[i];
            if (nextSource === undefined || nextSource === null) {
                continue;
            }

            var keysArray = Object.keys(Object(nextSource));
            for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                var nextKey = keysArray[nextIndex];
                var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                if (desc !== undefined && desc.enumerable) {
                    to[nextKey] = nextSource[nextKey];
                }
            }
        }
        return to;
    }
};
