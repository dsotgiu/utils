/*converts a json from the selection to a csv file*/



const recursiveGenerator = (obj, fatherKey = '', level = 1) => {

    const reduce = (accumulator, currentValue) => {
        const row = `${currentValue};${fatherKey};${level}`;
        if (!!obj[currentValue] && typeof obj[currentValue] === 'object') {
            if (Array.isArray(obj[currentValue]) && obj[currentValue][0]) {
                accumulator.push(
                    typeof obj[currentValue][0] === 'object' ?
                        { [row]: recursiveGenerator(obj[currentValue][0], currentValue, level + 1) } : row);
            } else {
                accumulator.push({ [row]: recursiveGenerator(obj[currentValue], currentValue, level + 1) });
            }
        } else {
            accumulator.push(row);
        }
        return accumulator;
    }
    
    return Object.keys(obj).reduce(reduce, []).sort(sort).flatMap(flatMap).join(";\n");

}

const flatMap = (obj) => {
        if (!obj) {
            return [];
        }
        if (typeof obj === 'string') {
            return [obj];
        }
        if (Array.isArray(obj)) {
            return obj;
        }
        return [Object.keys(obj)[0], ...flatMap(obj[Object.keys(obj)[0]])];
}


const sort = (a, b) => {
    if (typeof a === 'object' && typeof b === 'object') {
        return Object.keys(a)[0] < Object.keys(b)[0] ? -1 : 1
    }
    if (typeof a === 'object') {
        return 1;
    }
    if (typeof b === 'object') {
        return -1;
    }
    return a < b ? -1 : 1;
}

const generateCSVFromJSON = (JSONName = '') => {
    const csv = recursiveGenerator(JSON.parse(window.getSelection().toString()) ?? {}, JSONName);
    console.log(csv);
    window.open('data:text/csv;charset=utf-8,' + encodeURI(csv));
}

generateCSVFromJSON();
