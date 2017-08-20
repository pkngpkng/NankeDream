//月光虫 1费生物 1攻-7血（id 0000生物）
//无效果。

cc.Class({
    extends: cc.Component,

    properties: {
        //攻击力
        attack: 0,
        //攻击力标签
        attackLabel: cc.Label,
        //生命值
        health: 0,
        //生命值标签
        healthLabel: cc.Label,
        //速度
        velocity: 0,
        //速度
        velocityLabel: cc.Label,
        
        roll: cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        
        self.mainScript = self.node.getComponent('Card');
        self.roll = self.mainScript.roll;
        
        self.attackLabel.string = self.attack;
        self.healthLabel.string = self.health;
        self.velocityLabel.string = self.velocity;
    },
    
    setHealthTo: function(health){
        var self = this;        
        self.health = health;
        self.healthLabel.string = self.health;        
    },
    setHealthBy: function(dHealth){
        var self = this;        
        self.health += dHealth;
        self.healthLabel.string = self.health;        
    },    
    setAttackTo: function(attack){
        var self = this;        
        self.attack += attack;
        self.attackLabel.string = self.attack;        
    },        
    setAttackBy: function(dAttack){
        var self = this;        
        self.attackLabel.string = self.attack += dAttack;
    },    
    
    getUseState: function(){
        return true;
    },
    
    useCard: function(){
        var eventsend = new cc.Event.EventCustom('creatureCreate',true);  
        var position = this.node.x + this.node.parent.x - this.roll.x;
        
            eventsend.setUserData({X:position,Y:-95,attack:this.attack,health:this.health,team:-1}); 
        this.node.dispatchEvent(eventsend); 
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});