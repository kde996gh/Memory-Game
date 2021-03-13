
let gameArea;
let gameAreaWidth;
let gameAreaHeight;

let card;
let cardsArray = [];
let cardNumber; // páros szám legyen

let basicCard;


cardsArray = [
        {
        //src: "./images/pl.png",
        srcBack: "./images/cards/arsenal.png",
        id: 1
    },    {
        srcBack: "./images/cards/astonvilla.png",
        id: 2
    },    {
        srcBack: "./images/cards/bha.png",
        id: 3
    },    {
        srcBack: "./images/cards/burnley.png",
        id: 4
    },    {
        srcBack: "./images/cards/chelsea.png",
        id: 5
    },    {
        srcBack: "./images/cards/cpalace.png",
        id: 6
    },    {
        srcBack: "./images/cards/everton.png",
        id: 7
    },    {
        srcBack: "./images/cards/fulham.png",
        id: 8
    },    {
        srcBack: "./images/cards/leeds.png",
        id: 9
    },    {
        srcBack: "./images/cards/leicester.png",
        id: 10
    },    {
        srcBack: "./images/cards/liverpool.png",
        id: 11
    },    {
        srcBack: "./images/cards/manc.png",
        id: 12
    },    {
        srcBack: "./images/cards/manu.png",
        id: 13
    },    {
        srcBack: "./images/cards/newcastle.png",
        id: 14
    },    {
        srcBack: "./images/cards/sheffield.png",
        id: 15
    },    {
        srcBack: "./images/cards/southhampton.png",
        id: 16
    },    {
        srcBack: "./images/cards/tottenham.png",
        id: 17
    },    {
        srcBack: "./images/cards/wba.png",
        id: 18
    },    {
        srcBack: "./images/cards/westham.png",
        id: 19
    },    {
        srcBack: "./images/cards/wolverhampton.png",
        id: 20
    },
];


let newArray = [];
const sourceCard = "./images/pl.png";

$(document).ready(function(){//jquery start
console.log(newArray)
gameArea = $("#gameArea");
gameAreaWidth = gameArea.width();
gameAreaHeight = gameArea.height();



//test
let test_img = $("<img />",{
    id: "imgId"+cardsArray[1].id,
    src: sourceCard,
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
//VEGE TEST

    $("#newGame").on("click", function(){
        if(newArray.length != 0){
            newArray = [];
            console.log("lefutott az if")
            $("#gameArea").empty();
            newArray = createMap()
        }else{
            console.log("lefutott az else")
             newArray = createMap()
        }
        console.log(newArray.length)

        for(let i=0; i<newArray.length; i++) {

            let test_img = $("<img />",{
                id: "imgId"+i,
                trueImageId: newArray[i].id,
                src: sourceCard,
                srcBack: newArray[i].srcBack
            })
            gameArea.append(test_img);

            $("#imgId"+i).on("click", function (){
                console.log($(this).attr("id"))
                if($(this).attr("src") === sourceCard){
                    $(this).attr("src", $(this).attr("srcBack") );
                }
                else{
                    $(this).attr("src", sourceCard );
                }
            });


        }
    })



// pálya legenerálás







}); //

// a memória játék 6 elemének kisorsolása 20 kártya közül
function createMap(){
    newArray = [];
    const cardsCopy = [...cardsArray]; // eredeti kártya tömb másolása
    for(let i=0; i<6; i++){
        let randomNumber = Math.floor(Math.random()*cardsCopy.length);
        newArray.push(cardsCopy[randomNumber]);
        newArray.push(cardsCopy[randomNumber]);

        cardsCopy.splice(randomNumber, 1); // a kiválasztott elem törlése a másolt tömbből hogy ne ismétlődhessen
        newArray[i].id=i;



    }
    newArray.sort( (a,b) => .5 - Math.random() );;
   // randomizeOrder(newArray);
    return  newArray;

}
//a createMapbol kirandomizált tömb sorrendjének összekeverése
// function randomizeOrder(array){
//
//     // for(let i=array.length-5; i>0; i--){
//     //     const j = Math.floor(Math.random() * (i));
//     //     const tmp = array[i];
//     //     array[i] = array[j];
//     //     array[j] = tmp;
//     // }
//     for(let i=0; i<array.length; i+=2){
//         array.sort( (a,b) => .5 - Math.random());
//     }
// }

console.log(createMap());






