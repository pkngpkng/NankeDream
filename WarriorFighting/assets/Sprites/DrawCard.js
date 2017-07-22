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
        //指定卡片生成的X坐标    
        positionX: 0,
        //指定卡片生成的类型  
        cardTypeFlag: 0,
        returnPostion: 0,
    },
    
    // use this for initialization
    onLoad: function () {
        this.returnPostion = 0;
        this.cardTypeFlag = cc.randomMinus1To1();
        this.delayTime();
    },

    showNewCard: function(){
        if(this.cardTypeFlag < 0){
            if(this.positionX < 8){
                // 使用给定的模板在场景中生成一个新节点
                var newMagicCard = cc.instantiate(this.magicCardPrefab);
                newMagicCard.x = 120*(this.positionX);
                newMagicCard.y = 0;
                this.node.addChild(newMagicCard);
                this.cardShape(newMagicCard);
                this.cardUse(newMagicCard);
            }
        }else{
            if(this.positionX < 8){
                var newBiologyCard = cc.instantiate(this.biologyCardPrefab);
                newBiologyCard.x = 120*(this.positionX);
                newBiologyCard.y = 0;
                this.node.addChild(newBiologyCard);
                this.cardShape(newBiologyCard);
                this.cardUse(newBiologyCard);
            }
        }
        this.positionX++;
        this.cardTypeFlag = cc.randomMinus1To1();
    },
    
    delayTime: function(){
            this.schedule(this.showNewCard,1);
    },
    
    cardShape: function(cardObject){
        cardObject.on(cc.Node.EventType.MOUSE_ENTER,function () {
            /*cardObject.x += 20;
            cardObject.y += 30;*/
             // 让目标动作速度加快一倍，相当于原本2秒的动作在1秒内完成
                cardObject.runAction(cc.speed(cc.scaleBy(1.2,1.2), 10));
        }, this);
        cardObject.on(cc.Node.EventType.MOUSE_LEAVE,function(){
            /*cardObject.x -=20;
            cardObject.y -=30;*/
            cardObject.stopAllActions();
            cardObject.runAction(cc.speed(cc.scaleTo(1,1),10));
        },this);
    },
    
    cardUse: function(cardObject){
            cardObject.on(cc.Node.EventType.MOUSE_DOWN, function () {
                cardObject.opacity = 90;
                /*cardObject.on(cc.Node.EventType.MOUSE_MOVE,function(event){
                    cardObject.x += event.getDeltaX();
                    cardObject.y += event.getDeltaY();
                },this);*/
                cardObject.on(cc.Node.EventType.MOUSE_MOVE,cardMove,this);
            }, this);
            cardObject.on(cc.Node.EventType.MOUSE_UP,function(){
                cardObject.opacity = 1000;
                //cardObject.off(cc.Node.EventType.MOUSE_MOVE,this);
                cardObject.off(cc.Node.EventType.MOUSE_MOVE,cardMove,this);
                cardObject.x = 120*this.returnPostion;
                cardObject.y = 0;
                if(this.returnPostion < 8){
                    this.returnPostion++;
                }else{
                    this.returnPostion = 0;
                }
            },this);
            function cardMove(event) {
                    cardObject.x += event.getDeltaX();
                    cardObject.y += event.getDeltaY();
            }
    },
    



    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
