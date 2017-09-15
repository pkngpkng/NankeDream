cc.Class({
    extends: cc.Component,

    properties: {
        /*moonLightWorm:{
            default: null,
            type: cc.Prefab,
        },
        undeadBirdDirt:{
            default: null,
            type:cc.Prefab,
        },*/
        cardGroup:{
            default: [],
            type: cc.Prefab,
        },
        
        lastPage:{
            default: null,
            type: cc.Button,
        },
        
        nextPage:{
            default: null,
            type: cc.Button,
        },
        
        cardBoard:{
            default:null,
            type: cc.Node,
        },
        
        infoBoard:{
            default:null,
            type: cc.Node,
        },
        
        deck:{
            default:[],
            type: cc.Node,
        },
        layout:{
            default:null,
            type: cc.Layout,
        },
        
        mainScence:cc.Node,
        deckNum:0,
        positionX: -1,
        positionY: 1,
        cardIndex: 0,
    },

    // use this for initialization
    onLoad: function () {
        var assWeCan = false;
        this.mainScript = this.mainScence.getComponent('MainSceneManager');
        for(var i=0;i<this.mainScript.myCCards.length;i++){
            if(this.mainScript.myMCards[i] !== 0){
                this.showCardGroup(i,this.mainScript.myMCards[i],0);
            }
        }
        for(var j=0;j<this.mainScript.myMCards.length;j++){
            if(this.mainScript.myCCards[j] !== 0){
                this.showCardGroup(j,this.mainScript.myCCards[j],1);
            }
        }
        this.initListenEvent();
        // this.insertCardElement(this.moonLightWorm);
        // this.insertCardElement(this.undeadBirdDirt);
        // while(this.cardIndex < 2){
        //     this.showCardGroup(this.cardGroup[this.cardIndex]);
        //     this.cardIndex++;
        // }
    },

    
    insertCardElement: function(cardType) {
        this.cardGroup.push(cardType);
    },
    
    showCardGroup: function(indication,num,cardTypeId) {
        var newCard = null;
        if(cardTypeId === 1){
            newCard = cc.instantiate(this.mainScript.miniCreaturePrefab[indication]);
            //this.cardBehavior(newCard,this.moonInfoBoard);
        }else{
            newCard = cc.instantiate(this.mainScript.miniMagicPrefab[indication]);
            //this.cardBehavior(newCard,this.undeadInfoBoard);
        }
        var script = newCard.getComponent('MiniCard');
        script.num = num;
        script.label = 'x'+num;
        
        /*if(script.manaConsume !== 0){
            return false;
        }*/
        
        if(this.positionX > 1){
            this.positionY--;
            this.positionX = -1;
        }
        newCard.x = 120*(this.positionX);
        this.positionX++;
        newCard.y = 150*(this.positionY);
        this.insertCardElement(newCard);
        this.node.addChild(newCard);
        
        return true;
    },
    
    cleanCardBoard: function(){
        for(var i=0;i<this.cardGroup.length;i++){
            this.cardGroup[i].active = false;//removeFromParent();    
        }
    },
    
    initListenEvent: function(){
        
    this.node.on("whenMouseEnterTheMiniCard",mouseEnterMiniCard,this);
    this.node.on("whenMouseLeaveTheMiniCard",mouseLeaveMiniCard,this);
    this.node.on("whenMouseUpTheMiniCard",mouseUpMiniCard,this);
        
       function mouseEnterMiniCard(event){
            if(event.detail.typeId === 1){
                this.infoBoard = cc.instantiate(this.mainScript.showCPrefab[event.detail.id]);
            }else{
                this.infoBoard = cc.instantiate(this.mainScript.showMPrefab[event.detail.id]);
            }
            this.infoBoard.x = 300;
            this.infoBoard.y = 200;
            this.node.addChild(this.infoBoard);
        }
       function mouseLeaveMiniCard(event){
            if(this.infoBoard !== null){
                this.infoBoard.removeFromParent();    
            }
        }    
       function mouseUpMiniCard(event){
            //用预制创建一个预览用的小方块的节点
            var view = cc.instantiate(this.mainScript.deckBuildPrefab);
            var script = view.getComponent('ViewCard');
            var deckScript = null;
            var i = 0;
            script.addViewCard(event.detail);
            if(this.mainScript.maxDeckNum > this.deckNum){
            if(event.detail.typeId === 1){
                if(this.mainScript.myCDeck[event.detail.id] < event.detail.num){
                    if(this.mainScript.myCDeck[event.detail.id] !== 0 ){
                        for(i = 0 ;i < this.deck.length; i++){
                            deckScript = this.deck[i].getComponent('ViewCard');
                            if(deckScript.cardType === 1 && deckScript.cardId === event.detail.id){
                                deckScript.addNumBy(1);
                            }
                        }
                    }else{
                        view.x = 0;
                        this.deck.push(view);
                        
                        this.deck = this.sortDeck(); 
                        this.sortLayout();
                    }
                    this.mainScript.myCDeck[event.detail.id]++;
                    this.deckNum++;
                    }
                }else{
                    if(this.mainScript.myMDeck[event.detail.id] < event.detail.num){
                        if(this.mainScript.myMDeck[event.detail.id] !== 0 ){
                            for(i = 0 ;i < this.deck.length; i++){
                                deckScript = this.deck[i].getComponent('ViewCard');
                                if(deckScript.cardType === 0 && deckScript.cardId === event.detail.id){
                                    deckScript.addNumBy(1);
                                }                            
                            }                        
                        }else{
                            view.x = 0;
                            this.deck.push(view);
                            
                            this.deck = this.sortDeck(); 
                            this.sortLayout();
                        }
                        this.mainScript.myMDeck[event.detail.id]++;
                        this.deckNum++;
                    }
                }
            }  
        }
    },
    
    sortDeck: function(){
    var i = 0,j = 0;
    var out = [];
    var script = null;
        for(j = 0 ;j <= 10; j++){
            for(i = 0 ;i < this.deck.length; i++){
                script = this.deck[i].getComponent('ViewCard');
                if(script.manaConsume === j){
                    out.push(this.deck[i]);
                }                       
            }
        }
        
    return out;
    },
    sortLayout: function(){
    var i = 0;
    this.layout.node.removeAllChildren(false);
                            
        for(i = 0 ;i < this.deck.length; i++){
            this.layout.node.addChild(this.deck[i]);                      
        }
    },
    
    toLastPage: function(){
        if(this.cardIndex !== 0){
            this.cleanCardBoard();
            this.cardIndex -= 9;
            var i = this.cardIndex;
            if(this.cardIndex >= 0){
                if(this.cardIndex + 8 <= this.cardGroup.length){
                    for(i;i<this.cardIndex + 8;i++){
                        this.cardGroup[i].active = true;
                    }
                }else{
                    for(i;i<this.cardGroup.length;i++){
                        this.cardGroup[i].active = true;
                    }
                }
            }
        }
    },
    
    toNextPage: function(){
        this.cleanCardBoard();
        this.cardIndex += 9;
        var i = this.cardIndex;
        if(this.cardIndex <= this.cardGroup.length && this.cardGroup.length-this.cardIndex <= 9){
            for(i;i<this.cardGroup.length;i++){
                this.cardGroup[i].active = true;
            }
        }
    },
    
    /*cardBehavior: function(cardObject,infoType){
        
        var newInfoBoard = null;
        cardObject.on(cc.Node.EventType.MOUSE_ENTER,showInfo, this);
        cardObject.on(cc.Node.EventType.MOUSE_LEAVE,cleanInfo, this);
        function showInfo(){
            newInfoBoard = cc.instantiate(infoType);
            newInfoBoard.x = 300;
            newInfoBoard.y = 200;
            this.node.addChild(newInfoBoard);
        }
        function cleanInfo(){
            newInfoBoard.removeFromParent();
        }
    }*/
    
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
