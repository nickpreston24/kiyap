export function uniqueBy(array, key = "") {
    let lookup = {};
    return array.filter(obj => !lookup[obj[key]] && lookup[obj[key]] === true);
}

export function distinctBy(array, expression) {
    return [
        ...new Map(array.map(x => [expression(x), x])).values()
    ]
}
