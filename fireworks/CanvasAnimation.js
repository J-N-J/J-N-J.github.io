function copyElementToCtx(e, ctx) {
    ctx.width = e.width
    ctx.height = e.height
}

function newContext(forE) {
    let e = document.createElement("canvas")
    e.width = forE.width
    e.height = forE.height
    let ctx = e.getContext("2d")
    ctx.clear = function () {
        clearCtx(ctx)
    }
    copyElementToCtx(e, ctx)
    return {e: e, ctx: ctx}
}

function clearCtx(ctx) {
    ctx.clearRect(0, 0, ctx.width, ctx.height)
}

class CanvasAnimation {
    constructor(id, drawScene) {
        let canvas = document.getElementById(id)
        this.seen = {
            e: canvas,
            ctx: canvas.getContext("2d")
        }
        copyElementToCtx(canvas, this.seen.ctx)
        this.blind = newContext(canvas)
        this._stop = false
        this.drawScene = drawScene
    }

    clear() {
        // clear both, useful for when stopped, OK?
        clearCtx(this.blind.ctx)
        clearCtx(this.seen.ctx)
    }

    step() {
        clearCtx(this.seen.ctx)
        this.seen.ctx.drawImage(this.blind.e, 0, 0)

        if (! this._stop) {
            requestAnimationFrame(()=> this.step()) // XX?
            this.drawScene(this.blind.ctx)
        }
    }

    stop() {
        this._stop = true
    }

    start() {
        this._stop = false
        this.step()
    }
}
