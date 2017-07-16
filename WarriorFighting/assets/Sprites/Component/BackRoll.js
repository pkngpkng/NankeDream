cc.Class({
    extends: cc.Component,

    properties: {
        hero: cc.Node,
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
    update: function(){
        if(this.hero.x >= 512 && this.hero.x <= 1024*3 - 512)    
        {
            this.node.x = -this.hero.x;      
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
