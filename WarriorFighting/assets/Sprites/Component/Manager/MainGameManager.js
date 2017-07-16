cc.Class({
    extends: cc.Component,

    properties: {
        creaturePrefab: [cc.Prefab],
        creatures: [cc.Node],
        heros: [cc.Node],
        logicLayer: cc.Node,
        mapLayer: cc.Node,
        delay:0,
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
        
        this.node.on('creaturecreate',function(event){      
            var creature = cc.instantiate(this.creaturePrefab[0]);
            var script = creature.getComponent("Creature");
            var mapScript = this.mapLayer.getComponent("SmallMap");
            
            creature.x = event.detail.X;
            creature.y = event.detail.Y;
            script.attack = event.detail.attack;
            script.life = event.detail.life;
            script.team = event.detail.team;
            script.fnTeamRenew();
        
            this.creatures.push(creature);
            mapScript.fnCreateSign(creature);
            this.logicLayer.addChild(creature);
            
            /*mapScript.fnCreateSign(this.creatures[this.creatures.length - 1]);
            this.logicLayer.addChild(this.creatures[this.creatures.length - 1]);*/
            
            },this);
            
        this.node.on('dataget',function(event){      
            var i = 0,record = 100000,j = 0;
            var targetCreature = event.detail.target;
            var targetScript = targetCreature.getComponent('Creature');
            var script = null;
            var target = null;
            var distance = 0;
            
            for(i = 0;i < this.creatures.length; i++){
            script = this.creatures[i].getComponent('Creature');
            distance = Math.abs( this.creatures[i].x - targetCreature.x);
                if( this.creatures[i] === targetCreature){
                    j = i;
                }else{
                    if(script.team !== targetScript.team  && distance < record){
                        record = distance;
                        target = this.creatures[i];
                    }
                }
            }
            for(i = 0;i < this.heros.length; i++){
            script = this.heros[i].getComponent('Player');
            distance = Math.abs( this.heros[i].x - targetCreature.x);
                if(script.team !== targetScript.team && distance < record){
                    record = distance;
                    target = this.heros[i];
                }
            }
            if( record < 16){
                target = null;
            }

            script = event.detail.target.getComponent('Creature');
            script.focus = target;
            
            },this);        
            
    },
    // called every frame, uncomment this function to activate update callback
    /*update: function (dt) {
        this.delay ++;
        if(this.delay > 10){
            this.delay = 0;
            this.givePositionToCreature();
        }
    },*/
    /*givePositionToCreature: function(target){
        var eventsend = new cc.Event.EventCustom('datagive',true);  
        eventsend.setUserData({focus:target}); 
        this.node.dispatchEvent(eventsend);
    }*/
    
});
