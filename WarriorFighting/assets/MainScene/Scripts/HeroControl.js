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
        this.jumping = true;//判断是否为条约状态
        this.isGoLeft = false;//判断是否向左走
        this.isGoRight = false;//判断是否向右走

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
                if (!this.jumping) {
                    this.jumping = true;
                    this.speed.y = this.jumpSpeed;
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
        }
    },

    onCollisionEnter: function (other, self) {
        if (other.node.group === "Wall") {
            console.log("touch the wall");
            this.jumping = false;
            this.speed.y = 0;
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

        //处理重力加速度
        if (this.jumping) {
            this.speed.y -= this.gravite * dt;//加速度对时间积分
        }

        //速度对时间的积分变为位移
        this.node.x += this.speed.x * dt;
        this.node.y += this.speed.y * dt;
    },
});
