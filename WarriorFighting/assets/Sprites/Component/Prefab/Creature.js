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
        
        attackTimer: 0,
    },
    onload: function(){
        var i;
        this.ATKActionFlag = 0;
        this.attackTimer = 0;
        for(i = 0;i < 3;i ++){
            this.healthNode[i].active = false;
        }
    },
    
    // use this for initialization
    update: function (dt) { 
        var self = this;
        self.delay ++;
        self.healthLabel.string = self.health.toFixed(0);
        self.attackLabel.string = self.attack.toFixed(0);
        
        if(self.focusTarget !== null && !self.ATKActionFlag && self.move === true){
            if(self.focusTarget.x < self.node.x){
                self.node.x--;
            }else if(self.focusTarget.x > self.node.x){
                self.node.x++;
            }
        }
        if(self.delay > 20){
            self.delay = 0;
            var eventsend = new cc.Event.EventCustom('dataget',true);  
            eventsend.setUserData({target:self.node}); 
            self.node.dispatchEvent(eventsend);
            //this.changhealth(-1);
        }
            /*var script = null;
    
            if(self.focusTarget !== null){
                
                if(this.focusType === 0){
                script = this.focusTarget.getComponent('Player');
                }else{
                script = this.focusTarget.getComponent('Creature');
                }   
                
                if(script.death === 1){
                var event = new cc.Event.EventCustom('dataget',true);  
                event.setUserData({target:self.node}); 
                self.node.dispatchEvent(event);
                }
            }      */  
            if (self.attackTimer > 0) {
		          self.attackTimer -= dt;
		    }
		    
            if(!self.ATKActionFlag && self.focusTarget !== null){
                this.ATKActionFlag = 1;


		    //判定方法为   目标节点和自己的距离小于等于攻击距离
		      //  if( (this.node.width/2 + this.focusTarget.width/2) >= Math.abs(Math.abs(this.node.x - this.focusTarget.x))){
			     //   this.attackAction();
		      //  }
		      if( (self.node.width/2 + self.focusTarget.width/2) >= 
		      Math.abs(Math.abs(self.node.x - self.focusTarget.x))){		      
		      if (self.attackTimer <= 0) {
			        self.attackAction();
			        self.attackTimer = self.attackSpace;
		      }
		      }
		      
		      this.ATKActionFlag = 0;

	        }
	        
        if( self.death === 1){
		    self.release();            
        }
    },
    
    attackAction:function(){
        
	    
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
		    //死亡
		    this.death = 1;
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
