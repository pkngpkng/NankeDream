cc.Class({
    extends: cc.Component,

    properties: {
        
        cardBoard: cc.Node,
        mainScence:cc.Node,
        
        deckNum:cc.Label,
    },

    // use this for initialization
    onLoad: function () {
        this.delay = 0;
        this.cardList = this.cardBoard.getComponent('CardList');
        this.mainScript = this.mainScence.getComponent('MainSceneManager');
        this.initListenEvent();
    },
    
    initListenEvent: function(){
        
    this.node.on("mouseDownTheShowCard",removeCard,this);
        
        function removeCard(event){
        var i = 0;
        
            event.detail.object.addNumBy(-1);
            if(event.detail.object.cardType === 1){
                this.mainScript.myCDeck[event.detail.object.cardId]--;  
                this.cardList.deckNum--;
                if(this.mainScript.myCDeck[event.detail.object.cardId] === 0){
                    for(i=0;i<this.cardList.deck.length;i++){
                        if(this.cardList.deck[i] === event.detail.object.node){
                            this.cardList.deck.splice(i,1);
                            event.detail.object.node.removeFromParent();
                        }
                    }
                }
            }else{
                this.mainScript.myMDeck[event.detail.object.cardId]--;  
                this.cardList.deckNum--;
                if(this.mainScript.myMDeck[event.detail.object.cardId] === 0){
                    for(i=0;i<this.cardList.deck.length;i++){
                        if(this.cardList.deck[i] === event.detail.object.node){
                            this.cardList.deck.splice(i,1);
                            event.detail.object.node.removeFromParent();    
                        }
                    }                    
                }
            }
        }
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.delay ++;
        if(this.delay >= 6){
            this.delay = 0;
            this.deckNum.string = this.cardList.deckNum + '/' + this.mainScript.maxDeckNum;
        }
    },
});
