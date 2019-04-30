'use strict'

var gNextId = 0;
var gCanvas, gCtx;
var gTxts, gFillterImg, gImgs, gSortable, gCurrImg = []
var gLastTxt;

var gCurrTxt = {
    txt: '',
    color: `#fff`,
    font: `Impact`,
    size: 50,
    x: 50,
    y: 70,
    w: '',
    isMark: false,
}

function createImgs() {
    gImgs = [
        createImg('car', 'car', 'road'),
        createImg('slap', 'celeb', 'batman', 'cartoons', 'celeb', 'slap'),
        createImg('trump', 'usa', 'politics', `celeb`, 'trump'),
        createImg('eyes', 'not sure', 'eyes'),
        createImg('stark', 'winter', 'tv shows', `celeb`, 'stark'),
        createImg('wolf', 'cheers', 'movies', 'wolf', `celeb`),
        createImg('cry', 'woman', 'sad', 'cry'),
        createImg('advice_dog', 'dogs', 'animals'),
        createImg('disaster_girl', 'kids', 'fire'),
        createImg('double_facepalm', 'office', 'coding'),
        createImg('dwight_schrute', 'office', 'tv shows', 'celeb'),
        createImg('grandma_finds_the_internet', 'old people', 'internet'),
        createImg('koala_cant_believe', 'animals', 'lazy'),
        createImg('success_kid', 'kids'),
        createImg('third_world_success', 'kids', 'dance'),
        createImg('wonka', 'tv showss', 'wonka'),
        createImg('yes_this_is_dog', 'animals', 'dogs', 'phone'),
        createImg('yo_dawg', 'funny', 'celeb'),
    ]
}

function createImg(name, ...args) {
    return {
        id: gNextId++,
        url: `imgs/${name}.jpg`,
        keywords: args
    }
}

function initCanvas(elImg) {
    var elCont = document.querySelector('#canvas-conteiner')
    gCanvas = document.querySelector('#canvas-body');
    gCtx = gCanvas.getContext('2d')

    gCanvas.width = elCont.clientWidth
    var prop = elImg.naturalWidth / elImg.naturalHeight;
    gCanvas.height = gCanvas.width / prop;
    gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight,
        0, 0, gCanvas.width, gCanvas.height);
    gCurrImg = elImg
}

function addTxt() {
    if (!gTxts.length) {
        gTxts.push(gCurrTxt)
    }
    addLine()
}

function addLine() {
    gCurrTxt = {
        txt: '',
        color: `#fff`,
        font: `Impact`,
        size: 50,
        x: 50,
        y: 350,
        w: getTxtWidth()
    }
    if (gTxts.length) {
        var CanvasSize = gCanvas.height
        var ySize = CanvasSize / 8
        var calc = CanvasSize - ySize
        gCurrTxt.y = calc
    } else if (!gTxts.length) {
        caclYsize()
    }
    calcXsize()
    calcTxtSize()
}

function deleteTxt(elTxt) {
    if (gCurrTxt.txt && !gTxts.length) gCurrTxt.txt = ``
    else if (gCurrTxt.txt && gTxts.length) gCurrTxt.txt = ``
    else if (!gCurrTxt.txt && gTxts.length) {
        gCurrTxt.txt = ``
        gTxts = []
        resetTxts()
    }
}

const calcTxtSize = () => gCurrTxt.size = gCanvas.width / 8;
const calcXsize = () => gCurrTxt.x = gCanvas.width / 8;
const caclYsize = () => gCurrTxt.y = gCanvas.height / 5.6;

function swapping() {
    gLastTxt = gCurrTxt
    gCurrTxt = gTxts[0]
    gTxts[0] = gLastTxt
}

function resetTxts() {
    gTxts = []
    gCurrTxt = {
        txt: '',
        color: `#fff`,
        font: `Impact`,
        size: 50,
        x: 50,
        y: 70,
        w: getTxtWidth()
    }
    caclYsize()
    calcXsize()
    calcTxtSize()
}

function searchByKey(elKey) {
    var regex = RegExp(elKey);
    gFillterImg = gImgs.filter(img => {
        for (let i = 0; i < img.keywords.length; i++) {
            var word = img.keywords[i]
            if (regex.test(word)) return true
        }
    })
}

function mappingKeywords() {
    var objMap = {};
    gImgs.map(img => {
        for (let i = 0; i < img.keywords.length; i++) {
            var word = img.keywords[i]
            if (objMap[word]) objMap[word]++
            else objMap[word] = 1
        }
    })
    gSortable = [];
    for (let key in objMap) {
        if (objMap[key] > 1) gSortable.push([key, objMap[key]]);
    }
    gSortable.sort((a, b) => b[1] - a[1])
}

const markTxt = (currTxt) => {
    var width = gCtx.measureText(currTxt.txt).width;
    gCtx.fillStyle = `rgba(66, 134, 244, 0.4)`
    gCtx.fillRect(currTxt.x - 5, currTxt.y + 5, width + 20, -50);
    gCtx.stroke();
}

// Setters
const setFont = (elFont) => gCurrTxt.font = elFont;
const setColor = (elColor) => gCurrTxt.color = elColor;
const setIsMarkON = () => gCurrTxt.isMark = true;
const setIsMarkOFF = () => gCurrTxt.isMark = true;
const setLargeTxt = () => gCurrTxt.size += 10;
const setSmallTxt = () => gCurrTxt.size -= 10;
const setTxtUp = () => gCurrTxt.y -= 10;
const setTxtDown = () => gCurrTxt.y += 10;
const setTxtLeft = () => calcXsize()
const setTxtCenter = () => gCurrTxt.x = gCanvas.width / 4;
const setCurrTxt = () => gCurrTxt = gTxts[0]
const setInput = (elTxt) => gCurrTxt.txt = elTxt;
const setTxtRight = () => {
    let txtSize = gCanvas.width / 8
    let w = gCtx.measureText(gCurrTxt.txt).width;
    gCurrTxt.x = gCanvas.width - w - txtSize;
}

// Getters
const getFillterdImg = () => gFillterImg;
const getSortedKeys = () => gSortable;
const getTxtWidth = () => gCtx.measureText(gCurrTxt.txt).width;
const getTxts = () => gTxts;
const getCurrTxt = () => gCurrTxt;
const getCurrImg = () => gCurrImg;
