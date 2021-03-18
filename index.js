//lapokat tartalmazó tömb
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
//előlapi lap
let frontCardImg = "./images/pl.png";
//fehér lap, a kitalált lapok eltűntetésére
let matchedImg = "./images/succesBackground.png";
//lapok zárása, akkor szükséges amikor már van 2 felfordított lap, hogy ne lehessen még többet felfedni
let lock = false;
//a választatott lapok tömbje, itt tárolom el majd ellenőrzöm ha a mérete 2
let guessCards = [];


$(document).ready(function () {
  let container = $(".container");

  let startButton = $(".newGame");

  let currentGameCards = [];
  startButton.click(function () {
    currentGameCards = createMap(6); //pálya létrehozása a random generált tömbbel
    //console.log(currentGameCards);
    startButton.text("Restart");     // első inditás utána átírja a tartalmat, ha újra akarjuk kezdeni
    container.empty();              //játéktér ürítése
    lock = false;                   //a lapzárást alapból falsera állítja
    guessCards = [];                //a választott lapok tömbje
    showHide();                     // metódus, ami majd megjeleníti a pályát és az elemek attribútumait állítja be
  });

  function showHide() {
    // if (justStarted) {
    for (let i = 0; i < currentGameCards.length; i++) { // a random tömb méret alapján készíti
      let imageMain = $("<div></div>", {                //előbb egy main div, aminek lesz a click metódusa a lényeg
        class: "card"       
      });
      let imageFront = $("<img>", {                     // div ami a kép elejét tartalmazza
        class: "front",
        src: frontCardImg,
        hidden: true,
      });
      let imageBack = $("<img>", {                         //div ami a kép hátulját tartalmazza
        class: "back",
        src: currentGameCards[i].src,
        clubid: currentGameCards[i].id,
        hidden: false,
      });
      let imageMatched = $("<img>", {                       //div ami a kitalálás után töltődik be
        class: "matched",
        src: matchedImg,
        hidden: true,
      });

      imageMain.append(imageFront);                 // megfelelő divek hierarchiájának felépítése
      imageMain.append(imageBack);
      imageMain.append(imageMatched);

      container.append(imageMain);

      imageMain.on("click", function () {                   // a képekre való kattintás beállítása
        if (
          !lock &&
          $(this).children(".front").prop("hidden") === false &&       // feltétel, ha nincs lezárva és nincs felfedve a lap
          $(this).children(".back").prop("hidden") === true            
        ) {
          $(this).children(".front").prop("hidden", true);          // akkor felfedi és berakja a tippelt tömbbe
          $(this).children(".back").prop("hidden", false);
          guessCards.push($(this));
        }
        if (guessCards.length === 2) {                              //ha tippek száma eléri a kettőt, akkor párt ellenőrzi
          lock = true;                                              //lezárja a felfordítás lehetőségét
          setTimeout(function () {
            checkMatch();
          }, 300);
        }
      });
    }
    // lapok megmutatása, majd időzítéssel elrejtve
    setTimeout(() => {
      hideCards();
    }, 1000);
  } // showHide()

  function hideCards() {
    $(".card").each(function () {
      $(this).children(".front").prop("hidden", false);
      $(this).children(".back").prop("hidden", true);
      $(this).children(".matched").prop("hidden", true);
    });
  }

  function checkMatch() {
    let firstCard;
    let secondCard;
    //csak egy sima check hogy létezik-e, azért mert különben tele errorozi a console logot
    if (guessCards[0] && guessCards[1]) {
      firstCard = guessCards[0].children(".back").attr("clubid");
      secondCard = guessCards[1].children(".back").attr("clubid");
      // talált párok módosítása a pályán
      if (firstCard === secondCard) {
        guessCards[0].children(".front").prop("hidden", true);
        guessCards[0].children(".back").prop("hidden", true);
        guessCards[0].children(".matched").prop("hidden", false);

        guessCards[1].children(".front").prop("hidden", true);
        guessCards[1].children(".back").prop("hidden", true);
        guessCards[1].children(".matched").prop("hidden", false);
      } else {
        // nem megfelelő párok módosítása a pályán, visszaállítás
        guessCards[0].children(".front").prop("hidden", false);
        guessCards[0].children(".back").prop("hidden", true);
        guessCards[0].children(".matched").prop("hidden", true);

        guessCards[1].children(".front").prop("hidden", false);
        guessCards[1].children(".back").prop("hidden", true);
        guessCards[1].children(".matched").prop("hidden", true);
      }
      guessCards = [];
    }
    //időzíteni kell a feloldálst mivel ha nincs akkor a checkmatch után dupla kattintással feloldható 1 lap önmagában
    setTimeout(() => {
      lock = false;
    }, 300);
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
    currentGameCardsArray.sort((a, b) => 0.5 - Math.random());
    return currentGameCardsArray;
  }

}); //jquery vége
