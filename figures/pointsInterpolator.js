function interpolateFlat(x1, y1, x2, y2, x) {
    return y1 + (y2 - y1) * (x - x1) / (x2 - x1)
}
function interpolate(p1, p2, x) {
    return interpolateFlat(p1[0], p1[1], p2[0], p2[1], x)
}
function pointsInterpolator(ps) {
    // ps = [[0, y0] .. [255, yn]]
    return function (x) {
        // X = 0 .. 255
        let prevp = false
        for (let i = 0; i < 256; i++) {
            const p = ps[i]
            const a = p[0]
            if (x == a) {
                return p[1]
            }
            if (x < a) {
                return interpolate(prevp, p, x)
            }
            prevp= p
        }
        "error: x is past range, BUG"
    }
}
let t1= pointsInterpolator([[0,1], [255,0]])
let t2= pointsInterpolator([[0,0.5], [100,0], [255,1]])
