/**
 * @主要功能:   攻击行为
 * @author kenan
 * @Date 2017/7/23 2:41
 * @type {Function}
 */
var attackBehavior = cc.Class({
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

        //目标被销毁  或者为null  不执行
        if(Node == null || !Node.isValid){
            return ;
        }

        var script = null,attackScript = null;
        
    	if(nodeType === 0){
    	    script = Node.getComponent('Player');
    	}else{
    	    script = Node.getComponent('Creature');
    	}
    	attackScript = attcNode.getComponent('Creature');
        
    	//1伤害计算
      	// var hitValue = hitTransform(attackScript.attack, attcNode.atkType, node.defValue);     //atk攻击力   攻击类型   node该类型防御值

        //2伤害反馈给node   kenan  如果被攻击对象已死亡 清空攻击对象的目标
    	var deadFlag = script.changeHealth(- attackScript.attack);
    	if(deadFlag != null && deadFlag == 1){
            script.releaseTarget();
        }

    },
    

});
