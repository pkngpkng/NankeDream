cc.Class({
    extends: cc.Component,

    properties: {
        //主游戏管理器组件
        GameManager:cc.Component,
        //攻击行为组件
        AttackBehavior:cc.Component,
        
            //锁定的目标
            focusTarget:cc.Node,
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
        //所属的队伍
        team:0,
        //延时用
        delay:0,
        
        //攻击进行立Flag
        ATKActionFlag: 0,
    },
    onload: function(){
        var i;
        this.ATKActionFlag = 0;
//        this.AttackBehavior = this.node.getComponent('AttackBehavior');
        for(i = 0;i < 3;i ++){
            this.healthNode[i].active = false;
        }
    },
    
    // use this for initialization
    update: function () { 
        this.delay ++;
        this.healthLabel.string = this.health.toFixed(0);
        this.attackLabel.string = this.attack.toFixed(0);
        if(this.focusTarget !== null){
            if(this.focusTarget.x < this.node.x){
                this.node.x--;
            }else if(this.focusTarget.x > this.node.x){
                this.node.x++;
            }
        }
        if(this.delay > 20){
            this.delay = 0;
            var eventsend = new cc.Event.EventCustom('dataget',true);  
            eventsend.setUserData({target:this.node}); 
            this.node.dispatchEvent(eventsend);
            //this.changhealth(-1);
        }
        
        if(!this.ATKActionFlag && this.focusTarget !== null){
            var script = null;
            /*if(this.focusType === 0){
                script = this.focusTarget.getComponent('Player');
            }else{
                script = this.focusTarget.getComponent('Creature');
            }*/
		//判定方法为   目标节点和自己的距离小于等于攻击距离
		    if( (this.node.width/2 + this.focusTarget.width/2) >= Math.abs(Math.abs(this.node.x - this.focusTarget.x))){
			    this.attackAction();
		    }
	    }
    },
    
    attackAction:function(){
        
	    this.ATKActionFlag = 1;
	//如果有攻击动画效果   和子弹  就这里执行和创建吧

	//单体或者范围攻击    调用伤害发生器        
	    if(this.attackArea === 0){
		    this.AttackBehavior.attack(this.node, this.focusTarget, this.focusType);
	    }else{
		    this.AttackBehavior.areaAttack(this.node);
	    }
	   this.ATKActionFlag = 0;
    },
    
    
    changeHealth: function(value){
	    if(this.health + value > 0){
		    this.health = this.health + value;
	    }else{
		    //完全注销
		    this.release();
	    }
    },
    
    release:function(){
        this.GameManager.removeCreature(this.node);
        this.node.active = false;
        this.node.removeFromParent();
    },
    fnCreateCreature:function(data){
        this.node.x = data.X;
        this.node.y = data.Y;
        this.attack = data.attack;
        this.health = data.health;
        this.team = data.team;
        
        this.fnTeamRenew();
    },
    fnGetManager:function(Manager){
        this.GameManager = Manager;
    },
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
