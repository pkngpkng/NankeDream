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
        //卡片名称
        cName: cc.String,
        //卡片名称的标签
        cNameLabel: cc.Label,
        /*//描述
        describe: cc.String,*/
        //描述的标签
        describeLabel: cc.Label,
        
        roll: cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        self.manaConsumeLabel.string = self.manaConsume;
        self.cNameLabel.String = self.cName;
    },
    
    useCard: function(){
        var self = this;
        cc.log("稍等1");
        var script = null;
        if(self.cardType === 0){
            script = self.node.getComponent('M' + self.cardID);
        }else{
            script = self.node.getComponent('C' + self.cardID);
        }
        cc.log("稍等2");
        script.useCard();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});