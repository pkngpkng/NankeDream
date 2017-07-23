/**
 * @主要功能:   怪物史莱克
 * @type {Function}
 */
var monsterShrek = cc.Class({
    extends: cc.Component,

    properties: {
        //主游戏管理器组件
        GameManager:cc.Component,
        //攻击行为组件
        AttackBehavior:cc.Component,
        //锁定的目标
        focusTarget:cc.Node,
        //目标的坐标
        targetX: null,

        //目标的类型0英雄;1生物;-1无
        focusType:0,
        //生命值
        health:0,
        //生命值标签
        healthLabel:cc.Label,
        //生命值的节点
        healthNode:[cc.Node],
        //生物宽度
        width:0,
        //攻击力
        attack:0,
        //攻击力标签
        attackLabel:cc.Label,
        //攻击范围
        attackArea:0,
        //速度
        velocity:0,
        //可移动标记
        move: true,
        //所属的队伍
        team:0,
        //延时用
        delay:0,
        //是否死亡
        death:0,
        //攻击进行立Flag
        ATKActionFlag: 0,
        //攻击间隔
        attackSpace: 0,
        //攻击计时器 作废
        // attackTimer: 0,
    },


    onLoad: function(){
        var i;
        this.ATKActionFlag = 0;  //攻击行为标记 1攻击进行中
        this.attackTimer = 0;   //攻击计时器
        /*for(i = 0;i < 3;i ++){
            this.healthNode[i].active = false;
        }*/


        this.initAction();
    },


    /**
     * @主要功能:   初始化行为方法
     * @author kenan
     * @Date 2017/7/23 3:39
     */
    initAction: function(){
        //开启攻击轮询侦测      0.5执行一次   直到销毁     监听ATKActionFlag
        this.schedule(function(){
            // cc.log("攻击轮询")
            if(this.ATKActionFlag){
                this.attackAction();
            }
        }, 0.5, cc.macro.REPEAT_FOREVER);



        //开启敌对目标轮询侦测      0.5执行一次   直到销毁       不监听
        this.schedule(function(){
            // cc.log("获取敌对目标轮询")
            var eventsend = new cc.Event.EventCustom('dataget',true);
            eventsend.setUserData({target:this.node});
            this.node.dispatchEvent(eventsend);
        }, 0.5, cc.macro.REPEAT_FOREVER);
    },


    update: function (dt) {
        var self = this;
        self.delay ++;
        self.healthLabel.string = self.health.toFixed(0);
        self.attackLabel.string = self.attack.toFixed(0);


        //自身移动判定  存在目标+非攻击+可以移动标记
        if(self.focusTarget !== null && !self.ATKActionFlag && self.move === true){

            //kenan 由于现在行为并不同步  所以会有在执行过程中 目标节点已经被注销的情况  所以这里用上次更新的坐标处理
            if(this.targetX < self.node.x){
                self.node.x--;
            }else if(this.targetX > self.node.x){
                self.node.x++;
            }
        }


        //侦测敌人延迟  20帧
        // if(self.delay > 20){
        //     self.delay = 0;
        //     var eventsend = new cc.Event.EventCustom('dataget',true);
        //     eventsend.setUserData({target:self.node});
        //     self.node.dispatchEvent(eventsend);
        // }


        //kenan   攻击间隔计数器   这里不应该用帧数做计时器
        // if (self.attackTimer > 0) {
        //       self.attackTimer -= dt;
        // }


        //攻击行为判定
        if(!self.ATKActionFlag && self.focusTarget !== null){
            //判定方法为   目标节点和自己的距离小于等于攻击距离
            if( (self.node.width/2 + self.focusTarget.width/2) >= Math.abs(Math.abs(self.node.x - self.focusTarget.x))){
                // if (self.attackTimer <= 0) {
                //     self.attackAction();
                //     self.attackTimer = self.attackSpace;
                // }

                this.ATKActionFlag = 1; //上锁
            }

        }
	        
        if( self.death === 1){
		    self.release();            
        }
    },


    /**
     * @主要功能:  攻击行为
     * @author kenan
     * @Date 2017/7/23 1:39
     */
    attackAction: function(){
        //如果有攻击动画效果   和子弹  就这里执行和创建吧   攻速可以用动画时长+延迟处理

        //单体或者范围攻击    调用伤害发生器
	    if(this.attackArea === 0){
		    this.AttackBehavior.attack(this.node, this.focusTarget, this.focusType);
	    }else{
		    this.AttackBehavior.areaAttack(this.node);
	    }
	    this.ATKActionFlag = 0;  //解锁
    },


    /**
     * @主要功能:   生命变更函数
     * @author kenan
     * @Date 2017/7/23 1:41
     * @param value
     * @returns {number}   阵亡标记 0活着  1死了
     */
    changeHealth: function(value){
	    if(this.health + value > 0){
		    this.health = this.health + value;
	    }else{
		    //死亡
		    this.death = 1;
	    }
	    return this.death; //返回自己是否已经阵亡
    },


    /**
     * @主要功能:   释放敌人目标
     * @author kenan
     * @Date 2017/7/23 2:46
     */
    releaseTarget: function(){
        this.focusTarget = null;
        this.targetX = null;
    },



    //释放资源
    release:function(){
        this.GameManager.removeCreature(this.node);
        this.node.removeFromParent();
    },


    /**
     * @主要功能:    初始化基本参数   为啥不叫init呢？
     * @param data
     */
    fnCreateCreature:function(data){
        this.node.x = data.X;
        this.node.y = data.Y;
        this.attack = data.attack;
        this.health = data.health;
        this.team = data.team;
        
        this.fnTeamRenew();
        cc.log(this.team);
    },


    /**
     * @主要功能:   初始化注入管理类
     * @param Manager
     */
    fnGetManager:function(Manager){
        this.GameManager = Manager;
    },


    /**
     * @主要功能:   初始化阵营显示内容
     */
    fnTeamRenew: function(){
        if(this.team > 0){
            this.healthNode[0].active = 0;
            this.healthNode[1].active = 0;
            this.healthNode[2].active = 1;
        }else if(this.team < 0){
            this.healthNode[0].active = 1;
            this.healthNode[1].active = 0;
            this.healthNode[2].active = 0;
        }else{
            this.healthNode[0].active = 0;
            this.healthNode[1].active = 1;
            this.healthNode[2].active = 0;            
        }
    }

});
