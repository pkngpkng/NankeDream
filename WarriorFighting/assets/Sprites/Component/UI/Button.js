cc.Class({
    extends: cc.Component,

    properties: {
        button: cc.Button,
        enemy: cc.Node,
        team: 0,
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
    onLoad: function(){
        this.button.node.on('click',this.onButtonTouchEvent,this);
    },

    // use this for initialization
    onButtonTouchEvent: function (event,customEventData) {
        var eventsend = new cc.Event.EventCustom('creaturecreate',true);  
            eventsend.setUserData({X:(3072*Math.random()),Y:-95,attack:2,health:10,team:this.team}); 
        //cc.eventManager.dispatchEvent(event);  
        this.node.dispatchEvent(eventsend);
    },
    

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
