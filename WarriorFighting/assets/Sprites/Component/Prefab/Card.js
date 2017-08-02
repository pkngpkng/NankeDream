cc.Class({
    extends: cc.Component,

    properties: {
        //魔法消耗
        manaConsume: 0,
        //魔法消耗标签
        manaConsumeLabel: cc.Label, 
        
        //卡片类型
        cardType: 0,     //0法术牌；1生物牌 
        //卡片ID
        cardID: 0,
        
        //攻击力
        attack: 0,
        //攻击力标签
        attackLabel: cc.Label,
        //生命值
        health: 0,
        //生命值标签
        healthLabel: cc.Label,
        
        /*//描述
        describe: cc.String,*/
        //描述的标签
        describeLabel: cc.Label,
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        self.manaConsumeLabel.string = self.manaConsume;
        
        if(self.cardType === 1){
            self.attackLabel.string = self.attack;
            self.healthLabel.string = self.health;
        }
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
    
    useCard: function(){
        var eventsend = new cc.Event.EventCustom('creaturecreate',true);  
            eventsend.setUserData({X:this.node.x,Y:-95,attack:this.attack,health:this.health,team:-1}); 
        this.node.dispatchEvent(eventsend);        
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});