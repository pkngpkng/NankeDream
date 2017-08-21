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
        //手牌的2个位置
        cardHand: cc.Node,
        cardUsing: cc.Node,

        roll: cc.Node,
        //用于读取英雄的节点
        hero: cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        // this.cardHand = require("CardHand");
        // this.cardUsing = require("CardUsing");

        switch (self.cardType) {
            case 0:
                self.typeComponent = self.node.getComponent("MagicCard");
                if (self.typeComponent) {
                    console.log("This is a MagicCard!");
                }
                break;
            case 1:
                self.typeComponent = self.node.getComponent("CreepCard");
                if (self.typeComponent) {
                    console.log("This is a CreepCard!");
                }
                break;
            default:
                break;
        }

        var cardObject = this.node;
        cardObject.on(cc.Node.EventType.MOUSE_ENTER, this.enterMouseEvent, this);
        cardObject.on(cc.Node.EventType.MOUSE_LEAVE, this.leaveMouseEvent, this);

        self.manaConsumeLabel.string = self.manaConsume;
        self.cNameLabel.String = self.cName;
    },

    //获得使用情况 false 无法使用；true可以使用
    getUseState: function(){
        var self = this;
        var script = null;
        if(self.cardType === 0){
            script = self.node.getComponent('M' + self.cardID);
        }else{
            script = self.node.getComponent('C' + self.cardID);
        }
        var state = script.getUseState();
        return state;
    },
    useCard: function(){
        var self = this;
        var script = null;
        if(self.cardType === 0){
            script = self.node.getComponent('M' + self.cardID);
        }else{
            script = self.node.getComponent('C' + self.cardID);
        }
        script.useCard();
    },

    enterMouseEvent: function (event) {
        var cardObject = this.node;
        cardObject.runAction(cc.speed(cc.scaleBy(1.2,1.2), 7));


        cardObject.on(cc.Node.EventType.TOUCH_START,this.downMouseEvent,this);
        cardObject.on(cc.Node.EventType.TOUCH_END,this.upMouseEvent,this);
    },

    leaveMouseEvent: function (event) {
        var cardObject = this.node;
        cardObject.stopAllActions();
        cardObject.runAction(cc.speed(cc.scaleTo(1,1),7));

    },

    downMouseEvent: function (event) {
        //开始监听鼠标移动事件
        var cardObject = this.node;

        var sender = new cc.Event.EventCustom('cardSelect',true);
        sender.setUserData({card: this.node, posX: event.getLocationX(), posY: event.getLocationY()});
        this.node.dispatchEvent(sender);

        // 开启移动监听
        cardObject.on(cc.Node.EventType.TOUCH_MOVE,this.moveMouseEvent,this);
    },

    upMouseEvent: function (event) {
        //关闭监听鼠标移动事件
        var cardObject = this.node;

        var sender = new cc.Event.EventCustom('cardExit',true);
        sender.setUserData({card: this.node});
        this.node.dispatchEvent(sender);

        // 关闭一系列监听
        cardObject.off(cc.Node.EventType.TOUCH_MOVE,this.moveMouseEvent,this);
        cardObject.off(cc.Node.EventType.TOUCH_START,this.downMouseEvent,this);
        cardObject.off(cc.Node.EventType.TOUCH_END,this.upMouseEvent,this);
    },

    moveMouseEvent: function (event) {
        //鼠标移动监听
        var cardObject = this.node;
        cardObject.x += event.getDeltaX();
        cardObject.y += event.getDeltaY();
    },

    checkCondition: function () {
        var condition = true;



        return condition;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});