cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        // 使用中节点
        cardUsing: cc.Node,
        // 手牌节点
        cardHand: cc.Node
    },

    // use this for initialization
    onLoad: function () {
        // 当前使用卡牌
        this.cardObject = null;

        // 卡牌选择与退出的监听
        this.node.on("cardSelect", this.cardSelectEvent, this);
        this.node.on("cardExit", this.cardExitEvent, this);
        //
        // this.node.on(cc.Node.EventType.MOUSE_DOWN,this.downMouseEvent,this);
        // this.node.on(cc.Node.EventType.MOUSE_UP,this.upMouseEvent,this);
    },

    cardSelectEvent: function (event) {
        console.log("select a card");
        this.cardObject = event.detail.card;
        this.cardObject.parent = this.cardUsing;
        // this.cardObject.x = event.detail.posX;
        // this.cardObject.y = event.detail.posY;
        event.stopPropagation();
    },
    cardExitEvent: function (event) {
        console.log("exit a card");
        this.cardObject.parent = this.cardHand;
        this.cardObject = null;
        event.stopPropagation();
    },

    downMouseEvent: function (event) {
        //开始监听鼠标移动事件
        if (this.cardObject) {
            console.log("mouse down");
            this.cardObject.on(cc.Node.EventType.MOUSE_MOVE,this.moveMouseEvent,this);
        }
    },

    upMouseEvent: function (event) {
        //关闭监听鼠标移动事件
        if (this.cardObject) {
            console.log("mouse up");
            this.cardObject.off(cc.Node.EventType.MOUSE_MOVE,this.moveMouseEvent,this);
        }
    },

    moveMouseEvent: function (event) {
        //鼠标移动监听
        if (this.cardObject) {
            console.log("mouse move");
            this.cardObject.x += event.getDeltaX();
            this.cardObject.y += event.getDeltaY();
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
