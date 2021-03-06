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
        this.init();
    },
    
    init: function(){
        var self = this;
        self.manaConsumeLabel.string = self.manaConsume;
        self.numLabel.string = 'X' + self.num;
        self.cNameLabel.string = self.cName;
        this.initMouseEvent();        
    },
    
    adjustCount: function(num){
        this.num = num;
        this.numLabel.string = 'X' + num;
    },
    
    initMouseEvent:function(){
        var newInfoBoard = null;
        this.node.on(cc.Node.EventType.MOUSE_ENTER,showInfo, this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE,cleanInfo, this);
        this.node.on(cc.Node.EventType.MOUSE_UP,addCardtoDeck, this);        
        function showInfo(){
            var eventsend = new cc.Event.EventCustom('whenMouseEnterTheMiniCard',true);
            eventsend.setUserData({id:(this.cardID),typeId:this.cardType,count:this.num}); 
            this.node.dispatchEvent(eventsend);
            cc.log('MouseEnterTheMiniCard');
        }
        function cleanInfo(){
            var eventsend = new cc.Event.EventCustom('whenMouseLeaveTheMiniCard',true);
            this.node.dispatchEvent(eventsend);
            cc.log('MouseLeaveTheMiniCard');
        }
        function addCardtoDeck(){
            var eventsend = new cc.Event.EventCustom('whenMouseUpTheMiniCard',true);
            eventsend.setUserData({
                id:this.cardID,
                typeId:this.cardType,
                cName:this.cName,
                manaConsume:this.manaConsume,
                num:this.num
            }); 
            cc.log('MouseUpTheMiniCard');            
            this.node.dispatchEvent(eventsend);
        }        
    },
    
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});