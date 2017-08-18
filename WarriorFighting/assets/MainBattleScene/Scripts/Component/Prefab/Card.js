cc.Class({
    extends: cc.Component,

    properties: {
        //魔法消耗
        manaConsume: 0,
        //魔法消耗标签
        manaConsumeLabel: cc.Label, 
        
        //卡片类型
        cardType: {
            type: cc.Enum({
               MagicCard: 0,
               CreepCard: 1,
            }),
            default: 0,
        },     //0法术牌；1生物牌
        //卡片ID
        cardID: 0,
        //卡片名称
        cName: cc.String,
        //卡片名称的标签
        cNameLabel: cc.Label,
        /*//描述
        describe: cc.String,*/
        //描述的标签
        describeLabel: cc.Label,
        
        roll: cc.Node,
        //用于读取英雄的节点
        hero: cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        self.manaConsumeLabel.string = self.manaConsume;
        self.cNameLabel.String = self.cName;
        
        self.script = null;
        if(self.cardType === 0){
            self.script = self.node.getComponent('M' + self.cardID);
        }else{
            self.script = self.node.getComponent('C' + self.cardID);
        }
    },
    
    //获得使用情况 false 无法使用；true可以使用
    getUseState: function(){
        var self = this;
        var state = self.script.getUseState();
        return state;
    },
    
    useCard: function(){
        var self = this;
        self.script.useCard();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});