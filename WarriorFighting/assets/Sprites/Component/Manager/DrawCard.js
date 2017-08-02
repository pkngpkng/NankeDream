cc.Class({
    extends: cc.Component,
    
    properties: {
        magicCardPrefab: {
            default: null,
            type: cc.Prefab
        },
        biologyCardPrefab: {
            default:null,
            type: cc.Prefab
        },
        cardGroup: {
            default: [],
            type: cc.Node,
        },
        //英雄的节点
        heroNode: cc.Node,
        
        //指定卡片生成的X坐标    
        positionX: 0,
        //指定卡片生成的类型  
        cardTypeFlag: 0,
        //handCardMaxNum: 0,
        drawCardFlag: 0,
    },
    
    // use this for initialization
    onLoad: function () {
        this.returnPostion = 0;
        this.cardTypeFlag = cc.randomMinus1To1();
        this.heroComponent = this.heroNode.getComponent('Player');
        
        //先发7张牌再说
        for(i = 0 ;i < 5 ; i++){
            this.showNewCard();
        }
        //4秒补充一张牌
        this.delayTime(4);
    },

    showNewCard: function(){
        if(this.positionX < 8){
            this.creatCardType();
        }
    },
    
    creatNewCard: function(cardObject){
            var newCard = cc.instantiate(cardObject);
            newCard.x = 120*(this.positionX);
            newCard.y = 0;
            newCard.tag = this.positionX;
            this.cardGroup.push(newCard);
            
            this.positionX++;
            this.cardTypeFlag = cc.randomMinus1To1();
            this.node.addChild(newCard);
            
            this.cardShape(newCard);
            this.cardUse(newCard);
    },
    
    creatCardType: function(){
        if(this.cardTypeFlag < 0){
            this.creatNewCard(this.magicCardPrefab);
        }else{
            this.creatNewCard(this.biologyCardPrefab);
        }
    },
    
    delayTime: function(time){
            this.schedule(this.showNewCard,time);
    },
    
    cardShape: function(cardObject){
        cardObject.on(cc.Node.EventType.MOUSE_ENTER,function () {
                cardObject.runAction(cc.speed(cc.scaleBy(1.2,1.2), 7));
        }, this);
        cardObject.on(cc.Node.EventType.MOUSE_LEAVE,function(){
            cardObject.stopAllActions();
            cardObject.runAction(cc.speed(cc.scaleTo(1,1),7));
        },this);
    },
    
    cardUse: function(cardObject){
            cardObject.on(cc.Node.EventType.MOUSE_DOWN, function () {
                cardObject.opacity = 90;
                cardObject.on(cc.Node.EventType.MOUSE_MOVE,cardMove,this);
            }, this);
            cardObject.on(cc.Node.EventType.MOUSE_UP,function(){
                cardObject.opacity = 1000;
                cardObject.off(cc.Node.EventType.MOUSE_MOVE,cardMove,this);
       
                if(cardObject.y >= 100){
                    var script = cardObject.getComponent('Card');
                    if(this.heroComponent.mana >= script.manaConsume){
                        this.heroComponent.mana -= script.manaConsume;
                        this.cardGroup.splice(this.cardGroup.indexOf(cardObject),1);
                        this.fnRenewCard();
                        this.positionX--;
                        cardObject.removeFromParent();                           
                    }else{
                        cardObject.x = 120*this.cardGroup.indexOf(cardObject);
                        cardObject.y = 0;
                    }
                 
                }else{
                        cardObject.x = 120*this.cardGroup.indexOf(cardObject);
                        cardObject.y = 0;
                    }
            },this);
            function cardMove(event) {
                    cardObject.x += event.getDeltaX();
                    cardObject.y += event.getDeltaY();
                    if(cardObject.y >= 100){
                    cardObject.opacity = 1000;
                }
            }
    },

//刷新卡牌的位置  
    fnRenewCard:function(){
        var i = 0;
        for(i = 0;i < this.cardGroup.length ; i++){
            this.cardGroup[i].x = 120*i;
        }
    },



    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
