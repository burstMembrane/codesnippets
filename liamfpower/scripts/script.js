var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');


canvas.width = canvas.height = 1000;

function noise(ctx) {

    var w = ctx.canvas.width,
        h = ctx.canvas.height,
        idata = ctx.createImageData(w, h),
        buffer32 = new Uint32Array(idata.data.buffer),
        len = buffer32.length,
        i = 0;

    for(; i < len;i++)
        if (Math.random() < 0.9) buffer32[i] = 0xff000000;

    ctx.putImageData(idata, 0, 0);

}

var toggle = true;


function resize() {
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
}
resize();
window.onresize = resize;

(function loop() {

    toggle = !toggle;
    if (toggle) {
        requestAnimationFrame(loop);
        return;
    }

    noise(ctx);

    requestAnimationFrame(loop);

})();
