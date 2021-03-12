
let gameArea;
let gameAreaWidth;
let gameAreaHeight;

let card;
let cardsArray = [];
let cardNumber; // páros szám legyen

let basicCard;


cardsArray = [
          {
        src: "./images/cards/pl.png", //background
        id: 0
    },    {
        src: "./images/cards/pl.png",
        srcBack: "./images/cards/arsenal.png",
        id: 1
    },    {
        src: "./images/cards/astonvilla.png",
        id: 2
    },    {
        src: "./images/cards/bha.png",
        id: 3
    },    {
        src: "./images/cards/burnley.png",
        id: 4
    },    {
        src: "./images/cards/chelsea.png",
        id: 5
    },    {
        src: "./images/cards/cpalace.png",
        id: 6
    },    {
        src: "./images/cards/everton.png",
        id: 7
    },    {
        src: "./images/cards/fulham.png",
        id: 8
    },    {
        src: "./images/cards/leeds.png",
        id: 9
    },    {
        src: "./images/cards/leicester.png",
        id: 10
    },    {
        src: "./images/cards/liverpool.png",
        id: 11
    },    {
        src: "./images/cards/manc.png",
        id: 12
    },    {
        src: "./images/cards/manu.png",
        id: 13
    },    {
        src: "./images/cards/newcastle.png",
        id: 14
    },    {
        src: "./images/cards/sheffield.png",
        id: 15
    },    {
        src: "./images/cards/southhampton.png",
        id: 16
    },    {
        src: "./images/cards/tottenham.png",
        id: 17
    },    {
        src: "./images/cards/wba.png",
        id: 18
    },    {
        src: "./images/cards/westham.png",
        id: 19
    },    {
        src: "./images/cards/wolverhampton.png",
        id: 20
    },
];


let newArray = [];
const sourceCard = "./images/cards/pl.png";

$(document).ready(function(){//jquery start

gameArea = $("#gameArea");
gameAreaWidth = gameArea.width();
gameAreaHeight = gameArea.height();

let test_img = $("<img />",{
    id: "imgId"+cardsArray[1].id,
    src: cardsArray[1].src,
    srcBack: cardsArray[1].srcBack
})
gameArea.append(test_img);

    $("#imgId1").on("click", function (){
        console.log($(this).attr("id"))
        if($(this).attr("src") === sourceCard){
            $(this).attr("src", $(this).attr("srcBack") );
        }
        else{
            $(this).attr("src", sourceCard );
        }
    });


//new game
//     $("#newGame").on("click", function(){
//         if(newArray.length != 0){
//             newArray = [];
//             console.log("lefutott az if")
//             $("#gameArea").empty();
//             newArray = createMap()
//         }else{
//             console.log("lefutott az else")
//              newArray = createMap()
//         };
//         console.log("Megnyomtak")
//        // newArray = createMap();
//
//         for(let i=0; i<newArray.length; i++) {
//             let currentCard = $('<img />', {
//                 //     currentId: i,
//                 src: newArray[i].src,
//                 //     border: 1,
//                 //     margin: 20,
//                 //     padding: 20,
//                      width: 100,
//                     height: 100
//             });
//             gameArea.append(currentCard);
//
//             currentCard.on("click", function(){
//                 console.log("megnyomtak", $(this).attr("currentId"))
//             });
//         }
//     })



// pálya legenerálás
    function createMap(){
         newArray = [];
        const cardsCopy = [...cardsArray];
         for(let i=0; i<6; i++){
             let randomNumber = Math.floor(Math.random()*cardsCopy.length);
             newArray.push(cardsCopy[randomNumber]);
             cardsCopy.splice(randomNumber, 1);
             newArray[i].id=i;
         }
        console.log(newArray)

        return newArray;
    }





}); //










