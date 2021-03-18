let cardsArray = [
  {
    src: "./images/cards/arsenal.png",
    id: 1,
  },
  {
    src: "./images/cards/astonvilla.png",
    id: 2,
  },
  {
    src: "./images/cards/bha.png",
    id: 3,
  },
  {
    src: "./images/cards/burnley.png",
    id: 4,
  },
  {
    src: "./images/cards/chelsea.png",
    id: 5,
  },
  {
    src: "./images/cards/cpalace.png",
    id: 6,
  },
  {
    src: "./images/cards/everton.png",
    id: 7,
  },
  {
    src: "./images/cards/fulham.png",
    id: 8,
  },
  {
    src: "./images/cards/leeds.png",
    id: 9,
  },
  {
    src: "./images/cards/leicester.png",
    id: 10,
  },
  {
    src: "./images/cards/liverpool.png",
    id: 11,
  },
  {
    src: "./images/cards/manc.png",
    id: 12,
  },
  {
    src: "./images/cards/manu.png",
    id: 13,
  },
  {
    src: "./images/cards/newcastle.png",
    id: 14,
  },
  {
    src: "./images/cards/sheffield.png",
    id: 15,
  },
  {
    src: "./images/cards/southhampton.png",
    id: 16,
  },
  {
    src: "./images/cards/tottenham.png",
    id: 17,
  },
  {
    src: "./images/cards/wba.png",
    id: 18,
  },
  {
    src: "./images/cards/westham.png",
    id: 19,
  },
  {
    src: "./images/cards/wolverhampton.png",
    id: 20,
  },
];

let frontCardImg = "./images/pl.png";
let matchedImg = "./images/succesBackground.png";
let lock = false;
let guessCards = [];
$(document).ready(function () {
  let container = $(".container");

  let startButton = $(".newGame");

   let currentGameCards = [];
  startButton.click(function () {
    currentGameCards = createMap(6);
    //console.log(currentGameCards);
    startButton.text("Restart");
    container.empty();
    lock = false;
    guessCards = [];
    showHide();
  });

  function showHide() {
   // if (justStarted) {
      for (let i = 0; i < currentGameCards.length; i++) {
        let divMemoryCard = $("<div></div>", {
          class: "card",
          disabled: true,
        });
        let imageFront = $("<img>", {
          class: "front",
          src: frontCardImg,
          hidden: true,
        });
        let imageBack = $("<img>", {
          class: "back",
          src: currentGameCards[i].src,
          clubid: currentGameCards[i].id,
          hidden: false,
        });
        let imageMatched = $("<img>", {
          class: "matched",
          src: matchedImg,
          hidden: true,
        });

        divMemoryCard.on("click", function () {
            //console.log($(this).children(".front").prop("hidden"))
            if(!lock && $(this).children(".front").prop("hidden") === false){
            $(this).children(".front").prop("hidden", true);
            $(this).children(".back").prop("hidden", false);
            guessCards.push($(this))
            }
           // console.log($(this).children(".front").prop("hidden"))
            //flipClick($(this));
            if(guessCards.length === 2){
                lock = true;
                setTimeout(function () {
                checkMatch();
                }, 500)
            } 
        });

        divMemoryCard.append(imageFront);
        divMemoryCard.append(imageBack);
        divMemoryCard.append(imageMatched);

        container.append(divMemoryCard);
      }
      setTimeout(()=>{
          hideCards();
      }, 1500)
   // }
  }// fgv vége

  function hideCards(){
      $(".card").each(function(){
          $(this).children(".front").prop("hidden", false);
          $(this).children(".back").prop("hidden", true);
          $(this).children(".matched").prop("hidden", true);
      })
  }


  function checkMatch(){
    let firstCard;
    let secondCard
      if( guessCards[0].children(".back").attr("clubid")){
          firstCard = guessCards[0].children(".back").attr("clubid");
      }
      if( guessCards[1].children(".back").attr("clubid")){
         secondCard = guessCards[1].children(".back").attr("clubid");
      }
      if(firstCard === secondCard){
        guessCards[0].children(".front").prop("hidden", true);
        guessCards[0].children(".back").prop("hidden", true);
        guessCards[0].children(".matched").prop("hidden", false);

        guessCards[1].children(".front").prop("hidden", true);
        guessCards[1].children(".back").prop("hidden", true);
        guessCards[1].children(".matched").prop("hidden", false);
        guessCards = [];
        lock = false;
      }else{
        guessCards[0].children(".front").prop("hidden", false);
        guessCards[0].children(".back").prop("hidden", true);
        guessCards[0].children(".matched").prop("hidden", true);

        guessCards[1].children(".front").prop("hidden", false);
        guessCards[1].children(".back").prop("hidden", true);
        guessCards[1].children(".matched").prop("hidden", true);
        guessCards = [];
        lock = false;
      }
    
    }


    function createMap(pairLength) {
        let currentGameCardsArray = [];
        const cardsCopy = [...cardsArray]; // eredeti kártya tömb másolása
        for (let i = 0; i < pairLength; i++) {
            let randomNumber = Math.floor(Math.random() * cardsCopy.length);
            currentGameCardsArray.push(cardsCopy[randomNumber]);
            currentGameCardsArray.push(cardsCopy[randomNumber]);
            cardsCopy.splice(randomNumber, 1); // a kiválasztott elem törlése a másolt tömbből hogy ne ismétlődhessen
           // currentGameCardsArray[i].id = i;
        }
        //sorrend randomizálása
        currentGameCardsArray.sort((a, b) => .5 - Math.random());
        ;
        return currentGameCardsArray;
    }



  // click metódus hozzáadása
  /*   $(".card").each(function(){
         $(this).on('click', function(){
                 flipClick($(this));
        })
    })

  function flipClick(e) {
      if(guessCards.length === 2)
    if (!lock) {
      e.children(".front").prop("hidden", true);
      e.children(".back").prop("hidden", false);
      lock = true;
      setTimeout(() => {
        lock = false;
      }, 2000);
    }
  }*/
}); //jquery vége
