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
        
        //张数
        num: 0,
        //张数标签
        numLabel: cc.Label,
        
        //卡片名称
        cName: cc.String,
        //卡片名称的标签
        cNameLabel: cc.Label,
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        self.manaConsumeLabel.string = self.manaConsume;
        
        self.numLabel.string = 'X' + self.num;
        self.cNameLabel.string = self.cName;
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});