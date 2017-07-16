cc.Class({
    extends: cc.Component,

    properties: {
        // 主角跳跃高度
        jumpHeight: 0,
        // 主角跳跃持续时间
        jumpDuration: 0,
        // 最大移动速度
        maxMoveSpeed: 0,
        // 射出子弹
        launchButton: cc.Prefab,
        //蓝条
  //      manaBar: cc.ProgressBar,
        //蓝量
  //      manaLabel: cc.Label,
        //单位
        body: cc.Node,
        //蓝恢复速度
        manaRecoverSpeedK: 0,
        //最大蓝量
        maxMana: 0,
        //耗蓝
        manaUse: 0,
        //队伍
        team: 0,
    },
    // use this for initialization
    onLoad: function () {
        // 初始化跳跃动作
        this.jumpAction = this.setJumpAction();
        //this.node.runAction(this.jumpAction);

        // 加速度方向开关
        this.accLeft = false;
        this.accRight = false;
        // 主角当前水平方向速度
        this.xSpeed = 0;
        this.isCanJump = true;
        //初始蓝
        this.mana = 0;

        // 初始化键盘输入监听
        this.setInputControl();
        this._pool = new cc.NodePool('PoolHandler');
    },
    
    update: function (dt) {
        if (this.accLeft){
            this.xSpeed = -this.maxMoveSpeed;
            this.body.scaleX = -1;
        //   this.body.rotation = -30;
        }
        
        if (this.accRight){
            this.xSpeed = this.maxMoveSpeed;
            this.body.scaleX = 1;
        //    this.body.rotation = 30;
        }
        
        if (!this.accLeft && !this.accRight){
            this.xSpeed = 0;
        //    this.body.rotation = 0;
        }
        
        // 根据当前速度更新主角的位置
        this.node.x += this.xSpeed * dt;
        /*if (this.node.x < -470){
            this.node.x = -470;
        }
        if (this.node.x > 470){
            this.node.x = 470;
        }*/
        
        if (this.mana < this.maxMana){
            this.mana += this.manaRecoverSpeedK * Math.sqrt(1 - this.mana / this.maxMana) * dt;
        } else {
            this.mana = this.maxMana;
        }
        //this.manaBar.progress = this.mana / this.maxMana;
        //this.manaLabel.string = this.mana.toFixed(0) + "/" + this.maxMana.toFixed(0);
    },
    
    setJumpAction: function(){
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    },
    
    onceJumpAciton: function() {
        var self = this;
        var jumpUp = cc.moveBy(self.jumpDuration, cc.p(0, self.jumpHeight)).easing(cc.easeCubicActionOut());
        var jumpDown = cc.moveBy(self.jumpDuration, cc.p(0, -self.jumpHeight)).easing(cc.easeCubicActionIn());
        
        self.node.runAction(cc.sequence(jumpUp, jumpDown,
        cc.callFunc(function(){self.isCanJump = true;})));
        
    },
    
    setInputControl: function () {
        var self = this;
        // 添加键盘事件监听
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            // 有按键按下时，判断是否是我们指定的方向控制键，并设置向对应方向加速
            onKeyPressed: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.a:
                    case cc.KEY.left:
                        self.accLeft = true;
                        self.accRight = false;
                        break;
                    case cc.KEY.d:
                    case cc.KEY.right:
                        self.accLeft = false;
                        self.accRight = true;
                        break;
                    case cc.KEY.w:
                    case cc.KEY.up:
                        if (self.isCanJump){
                            self.isCanJump = false;
                            self.onceJumpAciton();
                        }
                        break;
                    case cc.KEY.j:
                    case cc.KEY.z:
                        if (self.mana >= self.manaUse){
                            self.mana -= self.manaUse;
                            self.generateNode();
                        }
                        break;
                }
            },
            // 松开按键时，停止向该方向的加速
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.a:
                    case cc.KEY.left:
                        self.accLeft = false;
                        break;
                    case cc.KEY.d:
                    case cc.KEY.right:
                        self.accRight = false;
                        break;
                }
            }
        }, self.node);
    },
    
    generateNode: function () {
        var monster = this._pool.get();
        if (!monster) {
            monster = cc.instantiate(this.launchButton);
        
            // Add pool handler component which will control the touch event
            monster.addComponent('PoolHandler');
        }
        monster.x = this.node.x;
        monster.y = this.node.y;
        
        var dx = monster.getComponent('Fire').flyDistance * this.body.scaleX;
        var dy = 0;
        
        console.log(dx, dy);
        
        monster.runAction(cc.sequence(
            cc.moveBy(monster.getComponent('Fire').flyDistance / monster.getComponent('Fire').flySpeed, dx, dy),
            cc.callFunc(this.removeNode, this, monster)
        ));
        
        this.node.parent.addChild(monster);
    },
    
    removeNode: function (sender, monster) {
        this._pool.put(monster);
    }

    // called every frame, uncomment this function to activate update callback

});
