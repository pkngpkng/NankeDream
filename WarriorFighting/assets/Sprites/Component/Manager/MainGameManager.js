//var SmallMap = require('SmallMap');

var MainGameManager = cc.Class({
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
            
            script.fnCreateCreature(event.detail);
            script.fnGetManager(this);
            /*creature.x = event.detail.X;
            creature.y = event.detail.Y;
            script.attack = event.detail.attack;
            script.health = event.detail.health;
            script.team = event.detail.team;
            script.GameManager = this;
            script.fnTeamRenew();*/
            
        
            this.creatures.push(creature);
            //mapScript.fnCreateSign(creature);
            //this.logicLayer.addChild(creature);
            
            mapScript.fnCreateSign(this.creatures[this.creatures.length - 1]);
            this.logicLayer.addChild(this.creatures[this.creatures.length - 1]);
            
            },this);
            
        this.node.on('dataget',function(event){      
            var i = 0,record = Number.POSITIVE_INFINITY,j = 0;
            var targetCreature = event.detail.target;
            var targetScript = targetCreature.getComponent('Creature');
            var script = null;
            var target = null,targetType = -1;
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
                        targetType = 1;
                    }
                }
            }
            for(i = 0;i < this.heros.length; i++){
            script = this.heros[i].getComponent('Player');
            distance = Math.abs( this.heros[i].x - targetCreature.x);
                if(script.team !== targetScript.team && distance < record){
                    record = distance;
                    target = this.heros[i];
                    targetType = 0;
                }
            }
            if( record < 2){
                
                /*if( targetType !== 0){
                this.removeCreature(target);
                }*/
                target = null;
            }

            script = event.detail.target.getComponent('Creature');
            script.focusTarget = target;
            script.focusType = targetType;
            
            },this); 
            
            
        /*this.node.on('creaturerelease',function(event){      
            var i = 0;
            var targetCreature = event.detail.target;
            var targetScript = targetCreature.getComponent('Creature');
            var script = null;
            
            var mapScript = this.mapLayer.getComponent('SmallMap');
            
            mapScript.fnDelateSign(targetCreature);    
            cc.log('小地图搞好了一个');
            for(i = 0;i < this.creatures.length; i++){
                if( this.creatures[i] === targetCreature){
                this.creatures.splice(i,1);
                this.logicLayer.removeChild(this.creatures[i]);
                //.removeFromParent(true);
                //this.creatures[i].active = false;
                }
            }
            
            
            targetScript.removeCreature();

            
            },this);  */    
            
    },
    // called every frame, uncomment this function to activate update callback
    /*update: function (dt) {
        this.delay ++;
        if(this.delay > 10){
            this.delay = 0;
            this.givePositionToCreature();
        }
    },*/
    removeCreature: function(node){
        var i = 0;
        var script = node.getComponent('Creature');
        var mapScript = this.mapLayer.getComponent('SmallMap');
        
        mapScript.fnDelateSign(node);
        for(i = 0;i < this.creatures.length; i++){
            if( this.creatures[i] === node){
                
                this.creatures[i].removeFromParent();
                this.creatures.splice(i,1);
            }
        }
    }
    
});

/*cfg.load();

module.exports = cfg;*/
