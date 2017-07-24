//var SmallMap = require('SmallMap');

/**
 * @主要功能:  游戏主流程控制器
 * @type {Function}
 */
var MainGameManager = cc.Class({
    extends: cc.Component,

    properties: {
        creaturePrefab: [cc.Prefab],  //小兵预制节点
        creatures: [cc.Node],
        heros: [cc.Node],
        logicLayer: cc.Node,    //背景节点
        mapLayer: cc.Node,    //小地图
        delay:0,
    },

    onLoad: function () {

        //创建npc 小地图节点 事件
        this.node.on('creatureCreate',this.creatureCreate,this);
            
        this.node.on('dataget',function(event){      
            var i = 0,record = Number.POSITIVE_INFINITY,j = 0;
            var targetCreature = event.detail.target;
            var targetScript = targetCreature.getComponent('Creature');
            var script = null;
            var target = null,targetType = -1;
            var distance = 0;
            
            for(i = 0;i < this.creatures.length; i++){
            script = this.creatures[i].getComponent('Creature');
            if(script.death === 0){
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
            }
            for(i = 0;i < this.heros.length; i++){
            script = this.heros[i].getComponent('Player');
                if(script.death === 0){
            distance = Math.abs( this.heros[i].x - targetCreature.x);
                if(script.team !== targetScript.team && distance < record){
                    record = distance;
                    target = this.heros[i];
                    targetType = 0;
                }
                }
            }
            if(target !== null){
                if( record < target.width/2 + targetCreature.width/2){

                    /*if( targetType !== 0){
                    this.removeCreature(target);
                    }*/
                    targetScript.move = false;
                }else{
                    targetScript.move = true;
                }
            }

            script = event.detail.target.getComponent('Creature');
            script.focusTarget = target;
            script.focusType = targetType;
            script.targetX = target === null ? null : target.x;   //kenan 单独记录坐标x
            
            },this); 
            
    },



    /**
     * @主要功能:  创建npc节点    创建小地图节点
     *              建议以后改用资源池获取节点   资源池使用工厂创建节点，这里可以负责初始化节点属性
     * @author kenan
     * @Date 2017/7/23 0:25
     * @param event
     */
    creatureCreate: function(event){  //event为父类事件  实际这里是Event.EventCustom子类

        //kenan 实验证明  事件是同步的  计时器是异步的
        // this.scheduleOnce(function() {

            /** kenan 这里获取npc的资源方法可以改为，使用资源池获取npc节点*/
            var npc = cc.instantiate(this.creaturePrefab[0]);
            var npcScript = npc.getComponent("Creature");

            var mapScript = this.mapLayer.getComponent("SmallMap");

            npcScript.fnCreateCreature(event.detail);//初始化npc属性
            npcScript.fnGetManager(this);

            this.creatures.push(npc);

            mapScript.fnCreateSign(this.creatures[this.creatures.length - 1]);
            this.logicLayer.addChild(this.creatures[this.creatures.length - 1]);

            //kenan 停止事件冒泡   (停止继续向上传递此事件)
            event.stopPropagation();

            // console.log("creatureCreate结束");

        // });
    },


    /**
     * @主要功能: 释放小兵节点
     *          建议使用资源池回收节点
     * @param node
     */
    removeCreature: function(node){
        var i = 0;
        var script = node.getComponent('Creature');
        var mapScript = this.mapLayer.getComponent('SmallMap');
        mapScript.fnDeleteSign(node);
        for(i = 0;i < this.creatures.length; i++){
            if( this.creatures[i] === node){
                
                //this.creatures[i].removeFromParent();
                this.creatures.splice(i,1);
            }
        }

        //kenan 因为没有回收池  这里需要释放资源
//        node.destroy();

    }
    
});

