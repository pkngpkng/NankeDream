//此组件挂载于SceneManager。用于储存各种数据，以及组件，便于取用与管理


cc.Class({
    extends: cc.Component,

    properties: {
        
        coin: 0,
        //玩家的金币数量
        soul: 0,
        //玩家的灵魂(类似粉尘)数量
        
        bags: 0,
        //玩家可以打开的卡牌包数量
        
        miniCreaturePrefab: [cc.Prefab],
        //生物卡片预览用的预制
        miniMagicPrefab: [cc.Prefab],
        //魔法卡片预览用的预制
        
        myCards: [cc.Integer],
        
    
        
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
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
