cc.Class({
    extends: cc.Component,

    properties: {
        atk:0, //物理
		matk:1  //魔法		
    },

    /** 攻击行为 1v1 单体
     * @param attcNode  攻击节点
     * @param node  被攻击节点
     * @param nodeType  被攻击节点类型
     */
    attack: function (attcNode, Node, nodeType){  
        
        var script = null,attackScript = null;
        
    	if(nodeType === 0){
    	    script = Node.getComponent('Player');
    	}else{
    	    script = Node.getComponent('Creature');
    	}
    	attackScript = attcNode.getComponent('Creature');
        
    	//1伤害计算
//    	var hitValue = hitTransform(attackScript.attack, attcNode.atkType, node.defValue);
    	//atk攻击力   攻击类型   node该类型防御值
    	//cc.log(attackScript.attack);
    	//cc.log(script.attack);
    	//2伤害反馈给node
    	script.changeHealth(- attackScript.attack);
    },
    
  /*  heatlhBack: function(component, value){
    	//调用node的生命调节接口
    	component
    },    */
    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
