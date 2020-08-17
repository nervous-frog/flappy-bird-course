var bird = {
    skysteps: 2,
    birdtop: 235,
    skyPositon: 0,
    currentcolor: 'blue',
    initData: function () {

        this.el = document.getElementById('game');
        this.oBird = this.el.getElementsByClassName('bird')[0];
        this.ostart = this.el.getElementsByClassName('start')[0];
    },
    animate: function () {
        var count = 0;
        var that = this;
        setInterval(function () {
            that.skymove();
            if (++count % 10 === 0) {
                that.birdjump(count);
                that.startchange();
            }
        }, 30);
    },
    skymove: function () {
        this.skyPositon -= this.skysteps;
        this.el.style.backgroundPositionX = this.skyPositon + 'px';
    },
    birdjump: function (count) {
        this.birdtop = this.birdtop === 220 ? 270 : 220;
        this.oBird.style.top = this.birdtop + 'px';
        this.oBird.style.backgroundPositionX = count % 3 * -30 + 'px';
    },
    startchange: function () {
        var precolor = this.currentcolor;
        this.currentcolor = this.currentcolor === 'blue' ? 'white' : 'blue';
        this.ostart.classList.remove('start-' + precolor);   
        this.ostart.classList.add('start-' + this.currentcolor);         
    }
}
bird.initData();
bird.animate();
// console.log(bird.this);  5