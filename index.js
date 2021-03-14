let gameArea;
let gameAreaWidth;
let gameAreaHeight;

// a kártyákat eltároló tömb
let cardsArray = [
    {
        srcBack: "./images/cards/arsenal.png",
        id: 1,
    }, {
        srcBack: "./images/cards/astonvilla.png",
        id: 2
    }, {
        srcBack: "./images/cards/bha.png",
        id: 3
    }, {
        srcBack: "./images/cards/burnley.png",
        id: 4
    }, {
        srcBack: "./images/cards/chelsea.png",
        id: 5
    }, {
        srcBack: "./images/cards/cpalace.png",
        id: 6
    }, {
        srcBack: "./images/cards/everton.png",
        id: 7
    }, {
        srcBack: "./images/cards/fulham.png",
        id: 8
    }, {
        srcBack: "./images/cards/leeds.png",
        id: 9
    }, {
        srcBack: "./images/cards/leicester.png",
        id: 10
    }, {
        srcBack: "./images/cards/liverpool.png",
        id: 11
    }, {
        srcBack: "./images/cards/manc.png",
        id: 12
    }, {
        srcBack: "./images/cards/manu.png",
        id: 13
    }, {
        srcBack: "./images/cards/newcastle.png",
        id: 14
    }, {
        srcBack: "./images/cards/sheffield.png",
        id: 15
    }, {
        srcBack: "./images/cards/southhampton.png",
        id: 16
    }, {
        srcBack: "./images/cards/tottenham.png",
        id: 17
    }, {
        srcBack: "./images/cards/wba.png",
        id: 18
    }, {
        srcBack: "./images/cards/westham.png",
        id: 19
    }, {
        srcBack: "./images/cards/wolverhampton.png",
        id: 20
    },
];

// a kártyalapokból kirandomizált tömb, azokkal az elemekkel amik az aktuális körben lesznek
let newArray = [];

// alapméretezet hátlap a kártyáknak
const sourceCard = "./images/pl.png";
const succesBackGround = "./images/succesBackground.png";
//tippelt lapok
let guessCards = [];

//pontok
let points = 0;
$(document).ready(function () {//jquery start
// Játéktér Div a htmlben
    gameArea = $("#gameArea");

    gameAreaWidth = gameArea.width();
    gameAreaHeight = gameArea.height();


    $("#newGame").on("click", function () {
        $("#points").text("0")
        points = 0;
        if (newArray.length != 0) { //játéktér ürítésére szolgáló if
            newArray = [];
            console.log("lefutott az if")
            $("#gameArea").empty();
            newArray = createMap()
        } else {
            console.log("lefutott az else")
            newArray = createMap()
        }
        //képelemek létrehozása
        for (let i = 0; i < newArray.length; i++) {
            let btn = $('<button> </button>')
            btn.attr("id", "imageId" + i)
            let test_img = $("<img />", {
                trueImageId: newArray[i].id,
                src: sourceCard,
                srcBack: newArray[i].srcBack
            })
            btn.append(test_img);

            btn.on("click","img", function () {
                if ($(this).attr("src") === sourceCard) {
                    $(this).attr("src", $(this).attr("srcBack"));
                    guessCards.push($(this))
                    if (guessCards.length == 2) {
                        $('#gameArea').find('*').attr('disabled', true);
                        setTimeout(function () {
                            matchCheck();
                        }, 500);
                    }
                }
            });
            gameArea.append(btn);
        }
    })


//jquery vége
    function matchCheck() {
        if ($(guessCards[0]).attr("trueImageId") === $(guessCards[1]).attr("trueImageId")) {
            $(guessCards[0]).attr("src", succesBackGround);
            $(guessCards[1]).attr("src", succesBackGround);
            guessCards = [];
            points += 4;
            $('#points').text("Pontok" + points)
        } else {
            $(guessCards[0]).attr("src", sourceCard);
            $(guessCards[1]).attr("src", sourceCard);
            guessCards = [];
        }
        $('#gameArea').find('*').attr('disabled', false);
    }
});

// a memória játék 6 elemének kisorsolása 20 kártya közül [6 párra]
function createMap() {
    newArray = [];
    const cardsCopy = [...cardsArray]; // eredeti kártya tömb másolása
    for (let i = 0; i < 6; i++) {
        let randomNumber = Math.floor(Math.random() * cardsCopy.length);
        newArray.push(cardsCopy[randomNumber]);
        newArray.push(cardsCopy[randomNumber]);
        cardsCopy.splice(randomNumber, 1); // a kiválasztott elem törlése a másolt tömbből hogy ne ismétlődhessen
        newArray[i].id = i;
    }
    //sorrend randomizálása
    newArray.sort((a, b) => .5 - Math.random());
    ;
    return newArray;
}










