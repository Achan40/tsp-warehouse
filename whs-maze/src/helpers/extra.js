// helper function to find the position of the selected point in the points array
function findPos(arr, loc) {
    if (!arr || !loc){
        return -1;
    }
    const _ = require('lodash');
    for (let i=0; i<arr.length; i++) {
        if (_.isEqual(arr[i],loc)) {
            return i;
        }
    }
    return -1
}

export {findPos};