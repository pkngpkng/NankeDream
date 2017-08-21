cc.Class({
    extends: cc.Component,

    properties: {
        selectMenuKind:{
            default: null,
            type: cc.Label,
        },
        selectMenuList:{
            default: null,
            type: cc.Node,
        },
        selectMenuButton:{
            default: null,
            type: cc.Button,
        },
        occupationList:{
            default: [],
            type: cc.Node,
        },
        occupationListName:{
            default: [],
            type: cc.Label,
        },
    },

    // use this for initialization
    onLoad: function () {
        this.selectMenuList.opacity = 0;
    },
    showSelectMenuList: function(){
        this.selectMenuList.opacity = 255;
        this.selectMenuListOperation(this.occupationList);
        this.hideSelectMenuList(this.selectMenuList);
        this.pickSelectMenuItem(this.occupationList);
    },
    selectMenuListOperation: function(selectMenu){
        selectMenu[0].on(cc.Node.EventType.MOUSE_ENTER,listAction1, this);
        selectMenu[1].on(cc.Node.EventType.MOUSE_ENTER,listAction2, this);
        selectMenu[2].on(cc.Node.EventType.MOUSE_ENTER,listAction3, this);
        selectMenu[3].on(cc.Node.EventType.MOUSE_ENTER,listAction4, this);
        function listAction1() {
            selectMenu[0].runAction(cc.speed(cc.tintTo(2,255,132,0),200));
        }
        function listAction2() {
            selectMenu[1].runAction(cc.speed(cc.tintTo(2,255,132,0),200));
        }
        function listAction3() {
            selectMenu[2].runAction(cc.speed(cc.tintTo(2,255,132,0),200));
        }
        function listAction4() {
            selectMenu[3].runAction(cc.speed(cc.tintTo(2,255,132,0),200));
        }
        
        selectMenu[0].on(cc.Node.EventType.MOUSE_LEAVE,stopAction1, this);
        selectMenu[1].on(cc.Node.EventType.MOUSE_LEAVE,stopAction2, this);
        selectMenu[2].on(cc.Node.EventType.MOUSE_LEAVE,stopAction3, this);
        selectMenu[3].on(cc.Node.EventType.MOUSE_LEAVE,stopAction4, this);
        function stopAction1() {
            selectMenu[0].stopAllActions();
            selectMenu[0].runAction(cc.speed(cc.tintTo(2,255,255,255),200));
        }
        function stopAction2() {
            selectMenu[1].stopAllActions();
            selectMenu[1].runAction(cc.speed(cc.tintTo(2,255,255,255),200));
        }
        function stopAction3() {
            selectMenu[2].stopAllActions();
            selectMenu[2].runAction(cc.speed(cc.tintTo(2,255,255,255),200));
        }
        function stopAction4() {
            selectMenu[3].stopAllActions();
            selectMenu[3].runAction(cc.speed(cc.tintTo(2,255,255,255),200));
        }
    },
    pickSelectMenuItem: function(selectMenuItem){
        selectMenuItem[0].on(cc.Node.EventType.MOUSE_DOWN,pickAction1, this);
        selectMenuItem[1].on(cc.Node.EventType.MOUSE_DOWN,pickAction2, this);
        selectMenuItem[2].on(cc.Node.EventType.MOUSE_DOWN,pickAction3, this);
        selectMenuItem[3].on(cc.Node.EventType.MOUSE_DOWN,pickAction4, this);
        function pickAction1() {
            selectMenuItem[0].on(cc.Node.EventType.MOUSE_UP,stopAction, this);
            this.selectMenuKind.string = "科学";
        }
        function pickAction2() {
            selectMenuItem[1].on(cc.Node.EventType.MOUSE_UP,stopAction, this);
            this.selectMenuKind.string = "幻想";
        }
        function pickAction3() {
            selectMenuItem[2].on(cc.Node.EventType.MOUSE_UP,stopAction, this);
            this.selectMenuKind.string = "混沌";
        }
        function pickAction4() {
            selectMenuItem[3].on(cc.Node.EventType.MOUSE_UP,stopAction, this);
            this.selectMenuKind.string = "中立";
        }
        function stopAction() {
            this.selectMenuList.opacity = 0;
        }
    },
    hideSelectMenuList: function(selectBoard){
        selectBoard.on(cc.Node.EventType.MOUSE_LEAVE,hideSelectBoard, this);
        function hideSelectBoard(){
            selectBoard.opacity = 0;
        }
    },
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
