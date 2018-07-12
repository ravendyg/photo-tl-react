/// <reference path="./../../typings/tsd.d.ts" />

/**
 * Utils
 */
class UtilsClass implements IUtils {
    constructor() {

    }

    public transformDate (num: number): string {
        return ''+num;
    }

    public formatDate(timestamp: number): string {
        let tmp = new Date(timestamp);
        return `${this.indentDate(tmp.getDate())}-${this.indentDate(tmp.getMonth())
                }-${tmp.getFullYear()} ${this.indentDate(tmp.getHours())
                }:${this.indentDate(tmp.getMinutes())}`;
    }

    private indentDate (num: number): string {
        if (num < 10) return `0${num}`;
        else return `${num}`;
    }

    /*** creates new array from arr
     * order == 1 ascending, == -1 descending
     */
    public sortNumericArray (arr: number [], order: number): number [] {
        if (Math.abs(order) !== 1) { order = 1};
        return arr.sort( (elem1, elem2) => {
                if (elem1 < elem2) return -order;
                if (elem1 > elem2) return order;
                return 0;
            });
    }

    /*** merges several arrays into one and removes duplicated elements
     * @param arrs - arrays to be merged
     * @param compare - comparator function
     * example call mergeUnic([arr1, arr2], (el1, el2) => {
     *      if (el1.id > el2.id) return 1;
     *      if (el1.id < el2.id) return -1;
     *      return 0;
     * })
    */
    public mergeUnic (arrs: any [], compare: (el1: any, el2: any) => number): any [] {
        var concatenated: any [] = [];
        for (var i=arrs.length-1; i>=0; i--) {
            concatenated = concatenated.concat(arrs[i]);
        }
        concatenated = concatenated.sort(compare);
        concatenated = concatenated.filter(
            (el, index, arr) => index === 0 || compare(arr[index-1], el) !== 0
        );
        return concatenated;
    }

    /*** writes properties of objects from sources array on target object
     * to create new object from sources use target = {}
     */
    public objectAssign (target, sources) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert first argument to object');
        }

        var to = Object(target);
        for (var i = 0; i < sources.length; i++) {
            var nextSource = sources[i];
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
}

export const Utils = new UtilsClass();
