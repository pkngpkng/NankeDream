cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        gravite: 0,
        moveSpeed: 0,
        jumpSpeed: 0,
    },

    // use this for initialization
    onLoad: function () {
        this.speed = cc.v2(0,0);
        this.isGoLeft = false;//判断是否向左走
        this.isGoRight = false;//判断是否向右走
        this.isStand = false;//站立状态
        this.isStandPlatform = false;//是否站在台上

        this.climbSpeed  = cc.v2(0,0);
        this.isClimbingUp = false;//判断是否为向上攀爬状态
        this.isClimbingDown = false;//判断是否为向下攀爬状态
        this.isClimbing = false;//是否正在攀爬
        this.touchedLadder = null;

        //开启碰撞
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: this.onKeyPressed.bind(this),
            onKeyReleased: this.onKeyReleased.bind(this),
        }, this.node);
    },
    onKeyPressed: function (keyCode, event) {
        switch(keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                this.isGoLeft = true;
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                this.isGoRight = true;
                break;
            case cc.KEY.w:
            case cc.KEY.up:
                if ((this.isStand || this.isStandPlatform) && this.touchedLadder === null) {
                    this.speed.y = this.jumpSpeed;
                } else if (this.touchedLadder !== null) {
                    this.isClimbing = true;
                    this.isClimbingUp = true;
                    this.node.x = this.touchedLadder.x;
                    this.speed.y = 0;
                    this.isStandPlatform = false;
                }
                break;
            case cc.KEY.s:
            case cc.KEY.down:
                if (this.touchedLadder !== null) {
                    this.isClimbing = true;
                    this.isClimbingDown = true;
                    this.node.x = this.touchedLadder.x;
                    this.speed.y = 0;
                    this.isStandPlatform = false;
                }
                break;
        }
    },

    onKeyReleased: function (keyCode, event) {
        switch(keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                this.isGoLeft = false;
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                this.isGoRight = false;
                break;
            case cc.KEY.w:
            case cc.KEY.up:
                this.isClimbingUp = false;
                if (this.touchedLadder !== null) {
                    this.isStandPlatform = false;
                }
                break;
            case cc.KEY.s:
            case cc.KEY.down:
                this.isClimbingDown = false;
                if (this.touchedLadder !== null) {
                    this.isStandPlatform = false;
                }
                break;
        }
    },

    onCollisionEnter: function (other, self) {
        //地面接触判断
        if (other.node.group === "Ground") {
            console.log("touch the ground");
            this.isStand = true;
            this.speed.y = 0;
            self.node.y = other.node.y + other.node.height / 2 + self.node.height / 2;
        }

        //爬梯接触判断
        if (other.node.group === "Ladder") {
            console.log("touch the ladder");
            this.touchedLadder = other.node;
        }

        //平台接触判断
        if (other.node.group === "Platform") {
            if ((self.node.y > other.node.y) && (Math.abs(self.node.x - other.node.x) < other.node.width / 2) ) {
                this.isStandPlatform = true;
                this.speed.y = 0;
            }
            console.log("touch the Platform");
        }
    },

    onCollisionExit: function (other, self) {
        if (other.node.group === "Ground") {
            this.isStand = false;
        }

        if (other.node.group === "Ladder") {
            this.touchedLadder = null;
            this.isClimbing = false;
        }

        if (other.node.group === "Platform") {
            this.isStandPlatform = false;
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        //处理X轴的速度
        if (this.isGoLeft === this.isGoRight) {//左右键同时按或不按，则不动
            this.speed.x = 0;
        } else if (this.isGoLeft === true) {
            this.speed.x = -this.moveSpeed;//向左
        } else if (this.isGoRight === true) {
            this.speed.x = this.moveSpeed;//向右
        }
        //处理Y轴的攀爬速度
        if (this.isClimbingUp === this.isClimbingDown) {//左右键同时按或不按，则不动
            this.climbSpeed.y = 0;
        } else if (this.isClimbingUp === true) {
            this.climbSpeed.y = this.moveSpeed;//向上
        } else if (this.isClimbingDown === true && !this.isStand) {
            this.climbSpeed.y = -this.moveSpeed;//向下
        } else {
            this.climbSpeed.y = 0;
        }

        //处理重力加速度
        if (!this.isStand && !this.isClimbing && !this.isStandPlatform) {
            this.speed.y -= this.gravite * dt;//加速度对时间积分
        }

        //速度对时间的积分变为位移
        this.node.x += (this.speed.x + this.climbSpeed.x) * dt;
        this.node.y += (this.speed.y + this.climbSpeed.y) * dt;
    },
});
