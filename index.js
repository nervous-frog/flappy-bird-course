var bird = {
    skysteps: 2,
    birdtop: 235,
    startFlag: true,
    skyPositon: 0,
    currentcolor: 'blue',
    birdstepY: 0,
    mintop: 0,
    maxtop: 570,
    pillarLength: 7,
    pillarArr: [],
    init: function () {
        this.initData();
        this.animate();
        this.onstart();

    },
    initData: function () {

        this.el = document.getElementById('game');
        this.oBird = this.el.getElementsByClassName('bird')[0];
        this.oStart = this.el.getElementsByClassName('start')[0];
        this.oScore = this.el.getElementsByClassName('score')[0];
        this.oMask = this.el.getElementsByClassName('mask')[0];
    },
    animate: function () {
        var count = 0;
        var that = this;
        this.timer = setInterval(function () {
            that.skymove();
            if (++count % 10 === 0) {
                if (that.startFlag) {
                    that.birdjump();
                    that.startchange();
                }
                that.birdfly(count);
            }
            if (!that.startFlag) {
                that.dropDown();
                that.handleClick();
                that.pillarMove();
            }
        }, 30);
    },
    skymove: function () {
        this.skyPositon -= this.skysteps;
        this.el.style.backgroundPositionX = this.skyPositon + 'px';
    },
    birdjump: function () {
        this.birdtop = this.birdtop === 220 ? 270 : 220;
        this.oBird.style.top = this.birdtop + 'px';
    },
    birdfly: function (count) {
        this.oBird.style.backgroundPositionX = count % 3 * -30 + 'px';
    },
    startchange: function () {
        var precolor = this.currentcolor;
        this.currentcolor = this.currentcolor === 'blue' ? 'white' : 'blue';
        this.oStart.classList.remove('start-' + precolor);
        this.oStart.classList.add('start-' + this.currentcolor);
    },
    onstart: function (e) {
        var that = this;
        this.oStart.onclick = function (e) {
            that.startFlag = false;
            that.oScore.style.display = 'block';
            that.oStart.style.display = 'none';
            that.oBird.style.left = '80px';
            that.oBird.style.transition = 'none';
            that.skysteps = 5;
            e.cancelBubble = true;
            for (var i = 0; i < that.pillarLength; i++) {
                that.createPillar(i);
            }
        }
    },
    dropDown: function () {
        this.birdtop += ++this.birdstepY;
        this.oBird.style.top = this.birdtop + 'px';
        this.judgeCrash();
    },
    pillarMove: function () {
        for (var i = 0; i < this.pillarLength; i++) {
            var oUpPillar = this.pillarArr[i].upp;
            var oDownPillar = this.pillarArr[i].dop;
            var x = oUpPillar.offsetLeft - this.skysteps;
            console.log(x);
            oUpPillar.style.left = x + 'px';
            oDownPillar.style.left = x + 'px';
        }
    },
    handleClick: function () {
        var that = this;
        this.el.onclick = function () {
            that.birdstepY = -10;
        }
    },
    endGame: function () {
        this.oMask.style.display = 'block';
        this.oScore.style.display = 'block';
        clearInterval(this.timer);
    },
    judgeCrash: function () {
        this.pillarCrash();
        this.borderCrash();
    },
    pillarCrash() {

    },
    borderCrash: function () {
        var that = this;
        if (this.birdtop >= this.maxtop || this.birdtop <= 0) {
            that.endGame();
        }
    },


    createPillar: function (i) {
        var upHeight = Math.floor(Math.random() * 175) + 50;
        var downHeight = 450 - upHeight;
        var oUpPillar = createEle('div', ['pillar', 'up'], {
            height: upHeight + 'px',
            left: 300 * (i + 1) + 'px',
        });
        var oDownPillar = createEle('div', ['pillar', 'down'], {
            height: downHeight + 'px',
            left: 300 * (i + 1) + 'px',
        });
        this.el.appendChild(oUpPillar);
        this.el.appendChild(oDownPillar);
        this.pillarArr.push({
            upp: oUpPillar,
            dop: oDownPillar,
        });
        // var odiv = document.createElement('div');
        // var num = Math.floor(Math.random() * 175);
        // odiv.classList.add('pillar');
        // odiv.classList.add('up');
        // odiv.style.height = num + 50 + 'px';
        // this.el.appendChild(odiv);
        // var odiv1 = document.createElement('div');
        // odiv1.classList.add('pillar');
        // odiv1.classList.add('down');
        // this.el.appendChild(odiv1);
        // odiv1.style.height = 400 - num + 'px';
        // odiv1.style.left = odiv.style.left = 300*(i+1) + this.skyPositon + 'px';
    }
}
bird.init();

// console.log(bird.this);  5