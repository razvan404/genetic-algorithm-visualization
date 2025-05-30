export function path2edgesList(path) {
    const edgeList = [];
    var fromId = path[0];
    for (var i = 1; i < path.length; i++) {
        var toId = path[i];
        edgeList.push([fromId, toId]);
        fromId = toId;
    }
    return edgeList;
}

export function mean(x) {
    if (x.length == 0) return 0;
    var s = 0;
    for (var e of x) s += e;
    return s / x.length;
}

export function range(start, stop, step = 1) {
    if (step === 0) throw new Error('Step cannot be 0');
    const length = Math.max(Math.ceil((stop - start) / step), 0);
    const result = new Array(length);
    for (let i = 0; i < length; i++) {
        result[i] = start + i * step;
    }
    return result;
}

export function max(x) {
    return Math.max(...x);
}

export function min(x) {
    return Math.min(...x);
}
