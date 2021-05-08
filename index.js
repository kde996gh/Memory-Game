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
let pairCounter; // párszámláló a játék végéhez
let pointCounter; // pontszámláló
let time;

let startWhistle = new Audio("./sounds/startwhistle.wav");
let pairFound = new Audio("./sounds/correctanswer.mp3");
let pairNotFound = new Audio("./sounds/incorrectanswer.wav");
let winSound = new Audio("./sounds/winsound2.wav");

let playerName;

let rankListSecTimer;
let rankListTimer;

$(document).ready(function () {
    let container = $(".container");
    let countDown = $("#countdown");
    let startButton = $("#newGame");
    let ranklist = $(".ranklist");
    let informations = $(".informations");
    let pairSize;

    let currentGameCards = [];
    startButton.click(function () {
        if ($("#userName").val() === "") {
            alert("Add meg a neved!");
        } else {
            rankListSecTimer = 0;
            clearInterval(time);
            time = "";

            informations.css({display: "flex"});
            playerName = $("#userName").val();
            container.removeAttr("hidden");
            container.css({border: "2px solid red"});
            pairSize = $("#pairSize").val();
            winSound.pause();
            winSound.currentTime = 0;

            pairCounter = 0;
            pointCounter = 0;
            currentGameCards = createMap(pairSize); //pálya létrehozása a random generált tömbbel
            startButton.text("Restart"); // első inditás utána átírja a tartalmat, ha újra akarjuk kezdeni
            container.empty(); //játéktér ürítése
            lock = false; //a lapzárást alapból falsera állítja
            guessCards = []; //a választott lapok tömbje
            startWhistle.play();
            showHide(pairSize);
            ranklist.css("display", "flex");
            fill_toplist();

        }
    });

    function showHide(param) {
        for (let i = 0; i < currentGameCards.length; i++) {
            // a random tömb méret alapján készíti
            let imageMain = $("<div></div>", {
                //előbb egy main div, aminek lesz a click metódusa a lényeg
                class: "card",
            });
            let imageFront = $("<img>", {
                // div ami a kép elejét tartalmazza
                class: "front",
                src: frontCardImg,
                hidden: true,
            });
            let imageBack = $("<img>", {
                //div ami a kép hátulját tartalmazza
                class: "back",
                src: currentGameCards[i].src,
                clubid: currentGameCards[i].id,
                hidden: false,
            });
            let imageMatched = $("<img>", {
                //div ami a kitalálás után töltődik be
                class: "matched",
                src: matchedImg,
                hidden: true,
            });

            if (pairSize == 6 || pairSize == 8)
                $(".container").css({"grid-template-columns": "auto auto auto auto"});
            else if (pairSize == 10)
                $(".container").css({
                    "grid-template-columns": "auto auto auto auto auto ",
                });
            else if (pairSize == 12 || pairSize == 15 || pairSize == 18)
                $(".container").css({
                    "grid-template-columns": "auto auto auto auto auto auto ",
                });
            else if (pairSize == 20)
                $(".container").css({
                    "grid-template-columns": "auto auto auto auto auto auto auto auto",
                });

            imageMain.append(imageFront); // megfelelő divek hierarchiájának felépítése
            imageMain.append(imageBack);
            imageMain.append(imageMatched);

            container.append(imageMain);

            imageMain.on("click", function () {
                // a képekre való kattintás beállítása
                if (
                    !lock &&
                    $(this).children(".front").prop("hidden") === false && // feltétel, ha nincs lezárva és nincs felfedve a lap
                    $(this).children(".back").prop("hidden") === true
                ) {
                    $(this).children(".front").prop("hidden", true); // akkor felfedi és berakja a tippelt tömbbe
                    $(this).children(".back").prop("hidden", false);
                    guessCards.push($(this));
                }
                if (guessCards.length === 2) {
                    //ha tippek száma eléri a kettőt, akkor párt ellenőrzi
                    lock = true; //lezárja a felfordítás lehetőségét
                    setTimeout(function () {
                        checkMatch();
                    }, 300);
                }
            });
        }

        // lapok megmutatása, majd időzítéssel elrejtve
        if (parseInt(param) === 6) {
            setTimeout(() => {
                clearInterval(time);// kell ide is a clear előbb, az egymás után sokszori ujrainditás kivédésére
                timer(0); // metódus, ami majd megjeleníti a pályát és az elemek attribútumait állítja be
                hideCards();
            }, 3000);
        } else if (parseInt(param) === 8) {
            setTimeout(() => {
                clearInterval(time);// kell ide is a clear előbb, az egymás után sokszori ujrainditás kivédésére
                timer(0);
                hideCards();
            }, 4000);
        } else if (parseInt(param) === 10) {
            setTimeout(() => {
                clearInterval(time);// kell ide is a clear előbb, az egymás után sokszori ujrainditás kivédésére
                timer(0);
                hideCards();
            }, 6000);
        } else if (parseInt(param) === 12) {
            setTimeout(() => {
                clearInterval(time);// kell ide is a clear előbb, az egymás után sokszori ujrainditás kivédésére
                timer(0);
                hideCards();
            }, 7000);
        } else if (parseInt(param) === 15) {
            setTimeout(() => {
                clearInterval(time);// kell ide is a clear előbb, az egymás után sokszori ujrainditás kivédésére
                timer(0);
                hideCards();
            }, 8000);
        } else if (parseInt(param) === 18) {
            setTimeout(() => {
                clearInterval(time);// kell ide is a clear előbb, az egymás után sokszori ujrainditás kivédésére
                timer(0);
                hideCards();
            }, 9000);
        } else if (parseInt(param) === 20) {
            setTimeout(() => {
                clearInterval(time);// kell ide is a clear előbb, az egymás után sokszori ujrainditás kivédésére
                timer(0);
                hideCards();
            }, 10000);
        }

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
                pairFound.play();
                guessCards[0].children(".front").prop("hidden", true);
                guessCards[0].children(".back").prop("hidden", true);
                guessCards[0].children(".matched").prop("hidden", false);

                guessCards[1].children(".front").prop("hidden", true);
                guessCards[1].children(".back").prop("hidden", true);
                guessCards[1].children(".matched").prop("hidden", false);

                pairCounter += 2;
                //pointCounter += 5;
            } else {
                // nem megfelelő párok módosítása a pályán, visszaállítás
                pairNotFound.play();
                guessCards[0].children(".front").prop("hidden", false);
                guessCards[0].children(".back").prop("hidden", true);
                guessCards[0].children(".matched").prop("hidden", true);

                guessCards[1].children(".front").prop("hidden", false);
                guessCards[1].children(".back").prop("hidden", true);
                guessCards[1].children(".matched").prop("hidden", true);
            }
            guessCards = [];
        }
        if (pairCounter === currentGameCards.length) {
            setTimeout(() => {
                win();
            }, 300);
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
        }
        //sorrend randomizálása
        currentGameCardsArray.sort((a, b) => 0.5 - Math.random());
        return currentGameCardsArray;
    }

    function win() {
        rankListTimer = countDown.text();
        winSound.play();
        container.empty();
        let gratAlert = $("<h1> </h1>").text("Gratulálunk " + playerName + "!");
        let pointAlert = $("<h2> </h2>").text("Idő: " + rankListTimer);

        container.append(gratAlert);
        container.append(pointAlert);
        // local storage eltoráls végett kell json format, a ranklist mindig az aktuális pályaméretre vonatkozik
        let ranklistinfo = {
            name: playerName,
            time: rankListSecTimer
        };
        localStorage.setItem(JSON.stringify(ranklistinfo), pairSize);
        //console.log(localStorage)
        fill_toplist();

        clearInterval(time);
        $(".container").css({"grid-template-columns": "auto"});
    }

    function fill_toplist() {
        ranklist.empty();
        //localstroage bejárás
        let data = [];
        for (let i = 0; i < localStorage.length; i++) {
            data[i] = [JSON.parse(localStorage.key(i)), parseInt(localStorage.getItem(localStorage.key(i)))];
        }
        //rendezés csökkenőbe
        data.sort(function (a, b) {
            return a[0].time - b[0].time
        });
        // a 10 legtobb pontot elert jatekost jelezzuk ki a listan
        let h1 = "<h1> Toplista </h1>"
        let ol = $("<ol> </ol>");

        //html ranklist feltöltése
        for (let i of data.keys()) {
            if (i < 10) {
                let playerInfo = (data[i][0])
                let pairType = (data[i][1]);
                if (pairType == pairSize)
                    ol.append("<li>" + playerInfo.name + ' - ' + secondsToMinuteConvert(playerInfo.time) + "</li>");
            }
        }
        ranklist.append(h1);
        ranklist.append(ol);
    }

    //másodperc átalakítása perccé, ranklistához kell
    function secondsToMinuteConvert(secondsParameter) {
        let param = parseInt(secondsParameter);
        let minute = "00";
        let seconds = secondsParameter;
        if (param >= 60) {
            minute = Math.floor(param / 60);
            seconds = param - (60 * minute);
        }
        return minute + ":" + (parseInt(seconds) < 9 ? "0"+seconds : seconds);
    }

    function timer(timeInSeconds) {
        let sec = timeInSeconds;
        let minutes = 0;

        time = setInterval(function () {
            sec++;
            rankListSecTimer++;
            if (sec == 60) {
                minutes += 1;
                sec = 0;
            }
            countDown.text(
                minutes < 10
                    ? "0" + minutes + ":" + (sec < 10 ? "0" + sec : sec)
                    : minutes + ":" + (sec < 10 ? "0" + sec : sec)
            );
        }, 1000);
    }
}); //jquery vége
