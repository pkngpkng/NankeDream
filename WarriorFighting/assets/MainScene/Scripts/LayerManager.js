cc.Class({
    extends: cc.Component,

    properties: {
        cardGroupButton:{
            default: null,
            type: cc.Button,
        },
        openCardButton:{
            default:null,
            type:cc.Button,
        },
        heroInfButton:{
            default:null,
            type:cc.Button,
        },
        choiceHeroBoard:{
            default: null,
            type: cc.Node,
        },
        choiceOpenBoard:{
            default: null,
            type: cc.Node,
        },
        choiceCardBoard:{
            default: null,
            type: cc.Node,
        },
    },

    // use this for initialization

    /*heroInfLayout: function () {
        this.choiceHeroBoard.zIndex = 2;
        this.choiceHeroBoard.zIndex = 1;
        //cc.director.loadScene("HeroInfScene.fire");
    },
    
    openCardLayout: function(){
        this.choiceOpenBoard.zIndex = 2;
        this.choiceOpenBoard.zIndex = 1;
        //cc.director.loadScene("OpenCardScene.fire");
    },
    
    cardGroupLayout: function(){
        this.choiceCardBoard.zIndex = 2;
        this.choiceCardBoard.zIndex = 1;
        //cc.director.loadScene("CardGroupScene.fire");
    },*/
    
    
    heroInfLayout: function () {
        this.layoutSwitch(this.choiceHeroBoard,this.heroInfButton);
        //cc.director.loadScene("HeroInfScene.fire");
    },
    
    openCardLayout: function(){
        this.layoutSwitch(this.choiceOpenBoard,this.openCardButton);
        //cc.director.loadScene("OpenCardScene.fire");
    },
    
    cardGroupLayout: function(){
        this.layoutSwitch(this.choiceCardBoard,this.cardGroupButton);
        //cc.director.loadScene("CardGroupScene.fire");
    },
    /*layoutSwitch: function(choiceBoard,choiceButton){
        choiceBoard.zIndex = 2;
        choiceBoard.zIndex = 1;
        choiceButton.pressedColor = new cc.Color.toCSS("#E9BF81");
    }*/
    layoutSwitch: function(choiceBoard,choiceButton){
        choiceBoard.zIndex = 2;
        choiceBoard.zIndex = 1;
    }


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
