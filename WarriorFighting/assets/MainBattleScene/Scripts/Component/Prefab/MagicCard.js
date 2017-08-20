cc.Class({
    extends: cc.Component,

    properties: {
        // 这个是枚举，相当的好用啊，以后都用这个好了
        magicType: {
            type: cc.Enum({
                NoTarget: 0,
                AreaTarget: 1,
                DirectionTarget: 2,
            }),
            default: 0
        },


    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        self.magicTypeEnum = cc.Enum({
            NoTarget: 0,
            AreaTarget: 1,
            DirectionTarget: 2,
        });
        // 这个添加监听为测试用
        self.startListen();
    },

    /**
     *
     * @param event
     * @constructor
     */
    NoTargetMagicStartListen: function (event) {
        if (event.getButton() === cc.Event.EventMouse.BUTTON_LEFT)
        {
            console.log("NoTargetMagicStartListen" + event.getLocationX().toFixed(0));
        }
    },
    /**
     *
     * @param event
     * @constructor
     */
    AreaTargetMagicStartListen: function (event) {
        console.log("AreaTargetMagicStartListen");
    },
    /**
     *
     * @param event
     * @constructor
     */
    DirectionTargetMagicStartListen: function (event) {
        console.log("DirectionTargetMagicStartListen");
    },
    /**
     *
     * @param event
     * @constructor
     */
    NoTargetMagicMoveListen: function (event) {
        // console.log("NoTargetMagicStartListen " + event.getLocationX().toFixed(0) + "," + event.getLocationY().toFixed(0));
    },
    /**
     *
     * @param event
     * @constructor
     */
    AreaTargetMagicMoveListen: function (event) {
        console.log("AreaTargetMagicMoveListen");
    },
    /**
     *
     * @param event
     * @constructor
     */
    DirectionTargetMagicMoveListen: function (event) {
        console.log("DirectionTargetMagicMoveListen");
    },
    /**
     *
     * @param event
     * @constructor
     */
    NoTargetMagicEndListen: function (event) {
        console.log("NoTargetMagicEndListen");
    },
    /**
     *
     * @param event
     * @constructor
     */
    AreaTargetMagicEndListen: function (event) {
        console.log("AreaTargetMagicEndListen");
    },
    /**
     *
     * @param event
     * @constructor
     */
    DirectionTargetMagicEndListen: function (event) {
        console.log("DirectionTargetMagicEndListen");
    },


    // 开启监听的位置，不过嘛，后面还得改，这里先搭个模子，至少保证功能正常
    startListen: function () {
        var self = this;
        console.log("add listen");
        switch (self.magicType) {
            case 0:
                self.node.on(cc.Node.EventType.MOUSE_DOWN, self.NoTargetMagicStartListen, self);
                self.node.on(cc.Node.EventType.MOUSE_MOVE, self.NoTargetMagicMoveListen, self);
                self.node.on(cc.Node.EventType.MOUSE_UP, self.NoTargetMagicEndListen, self);
                break;
            case 1:
                self.node.on(cc.Node.EventType.MOUSE_DOWN, self.AreaTargetMagicStartListen, self);
                self.node.on(cc.Node.EventType.MOUSE_MOVE, self.AreaTargetMagicMoveListen, self);
                self.node.on(cc.Node.EventType.MOUSE_UP, self.AreaTargetMagicEndListen, self);
                break;
            case 2:
                self.node.on(cc.Node.EventType.MOUSE_DOWN, self.DirectionTargetMagicStartListen, self);
                self.node.on(cc.Node.EventType.MOUSE_MOVE, self.DirectionTargetMagicMoveListen, self);
                self.node.on(cc.Node.EventType.MOUSE_UP, self.DirectionTargetMagicEndListen, self);
                break;
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});