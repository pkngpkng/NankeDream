cc.Class({
    extends: cc.Component,

    properties: {
        focus:cc.Node,
        //锁定的目标
        life:0,
        //生命值
        lifeLabel:cc.Label,
        //生命值标签
        lifeNode:[cc.Node],
        //生命值的节点
        attack:0,
        //攻击力
        attackLabel:cc.Label,
        //攻击力标签
        velocity:0,
        //速度
        team:0,
        //所属的队伍
        delay:0,
    },
    onload: function(){
        var i;
        for(i = 0;i < 3;i ++){
            this.lifeNode[i].active = false;
        }
    },
    
    // use this for initialization
    update: function () { 
        this.delay ++;
        this.lifeLabel.string = this.life.toFixed(0);
        this.attackLabel.string = this.attack.toFixed(0);
        if(this.focus !== null){
            if(this.focus.x < this.node.x){
                this.node.x--;
            }else if(this.focus.x > this.node.x){
                this.node.x++;
            }
        }
        if(this.delay > 20){
            this.delay = 0;
            var eventsend = new cc.Event.EventCustom('dataget',true);  
            eventsend.setUserData({target:this.node}); 
            this.node.dispatchEvent(eventsend);
        }
    },
    
    fnTeamRenew: function(){
        if(this.team > 0){
            this.lifeNode[0].active = 0;
            this.lifeNode[1].active = 0;
            this.lifeNode[2].active = 1;
        }else if(this.team < 0){
            this.lifeNode[0].active = 1;
            this.lifeNode[1].active = 0;
            this.lifeNode[2].active = 0;
        }else{
            this.lifeNode[0].active = 0;
            this.lifeNode[1].active = 1;
            this.lifeNode[2].active = 0;            
        }
    }

});
