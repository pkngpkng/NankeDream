cc.Class({
    extends: cc.Component,

    properties: {
        signs: [cc.Node],
        signPrefab: [cc.Prefab],
        //小地图标识0：蓝色 属于小于0的阵营
        //小地图标识1：红色 属于大于0的阵营
        data: cc.Node,
        script: null,
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
        this.script = this.data.getComponent('MainGameManager');
    },
    
    /*signRenew: function(){
        var total = this.signs.length;
        var total2 = this.script.creatures.length;
        if(total < total2){
            this.fnCreateSign(this.script.creatures[total2 - 1]);
        }
    }, */
    
    fnCreateSign: function(node){
        //借用一个node来创建一个小兵标记，将Node绑定在预制资源中
        var script = node.getComponent('Creature');
        var newsign;
        if(script.team > 0){
            newsign = cc.instantiate(this.signPrefab[1]);
        }else{
            newsign = cc.instantiate(this.signPrefab[0]);
        }
        var prefab = newsign.getComponent('SignScript');
        
        
        prefab.fnGiveNode(node);
        this.signs.push(newsign);
        this.node.addChild(this.signs[this.signs.length - 1]);
    },
    
    fnDelateSign: function(node){
        var i,script;
        for(i = 0;i < this.signs.length; i++){
            script = this.signs[i].getComponent('SignScript');
            if(script.creature === node){
                this.node.removeChild(this.signs[i],true);
                this.signs[i].active = false;
                this.signs.splice(i,1);
                script.removeSign();
                break;
            }
        }
    },

    // called every frame, uncomment this function to activate update callback
    /*update: function (dt) {
        this.signRenew();
    },*/
});
