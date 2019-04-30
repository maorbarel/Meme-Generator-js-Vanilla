'use strict'

var gOpen = false;

function init() {
    createImgs()
    renderImgs()
    mappingKeywords()
    renderKeyOptions()
}

function renderImgs() {
    var elImgs = document.querySelector('.imgs')
    gImgs.map(function (img) {
        elImgs.innerHTML += `<a class="img-a" href="#"><img href="#canvas" class="img" onclick="onPickImg(this)" id="${img.id}" src="${img.url}"></a>`
    })
}

function onPickImg(elImg) {
    toggleByImg()
    initCanvas(elImg)
    resetTxts()
}

function onInput(elTxt) {
    setInput(elTxt)
    var currImg = getCurrImg()
    initCanvas(currImg)
    render()
}

function render() {
    var txts = getTxts()
    var currTxt = getCurrTxt()

    if (!txts.length && currTxt.txt !== '') {
        gCtx.font = `italic ${currTxt.size}px ${currTxt.font}`;
        gCtx.fillStyle = currTxt.color
        gCtx.strokeStyle = "black";
        gCtx.lineWidth = 2.5;
        gCtx.fillText(currTxt.txt, currTxt.x, currTxt.y);
        gCtx.strokeText(currTxt.txt, currTxt.x, currTxt.y);
    } else if (txts.length && currTxt.txt === '') {
        txts.map(txt => {
            gCtx.font = `italic ${currTxt.size}px ${currTxt.font}`;
            gCtx.fillStyle = txt.color
            gCtx.strokeStyle = "black";
            gCtx.lineWidth = 2.5;
            gCtx.fillText(txt.txt, txt.x, txt.y);
            gCtx.strokeText(txt.txt, txt.x, txt.y);
        })
    } else {
        txts.map(txt => {
            gCtx.font = `${txt.size}px ${txt.font}`;
            gCtx.fillStyle = txt.color
            gCtx.strokeStyle = "black";
            gCtx.lineWidth = 2.5;
            gCtx.fillText(txt.txt, txt.x, txt.y);
            gCtx.strokeText(txt.txt, txt.x, txt.y);
        })
        gCtx.font = `italic ${currTxt.size}px ${currTxt.font}`;
        gCtx.fillStyle = currTxt.color
        gCtx.strokeStyle = "black";
        gCtx.lineWidth = 2.5;
        gCtx.fillText(currTxt.txt, currTxt.x, currTxt.y);
        gCtx.strokeText(currTxt.txt, currTxt.x, currTxt.y);
    }
}

function onAddTxt() {
    addTxt()
    resetPlaceHolder()
}

function onDeleteTxt(elTxt) {
    deleteTxt(elTxt)
    var currImg = getCurrImg()
    initCanvas(currImg)
    render()
    resetPlaceHolder()
}

function editTxt(currTxt) {
    document.querySelector('#addTxt').value = currTxt.txt;
}
function resetPlaceHolder() {
    document.querySelector('#addTxt').value = ``
}

function onMakeMail() {
    var mailSubject = document.querySelector('.mailSubject').value;
    var mailTxt = document.querySelector('.mailTxt').value;
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=hillel.eli396@gmail.com,maorrbarel@gmail.com&su=${mailSubject}&b
ody=${mailTxt}`);
}
function downloadCanvas(elLink) {
    elLink.href = gCanvas.toDataURL();
    elLink.download = 'my-img.jpg';
}

function onGetFont(elFont) {
    setFont(elFont)
    var currImg = getCurrImg()
    initCanvas(currImg)
    render()
}
function onGetColor(elColor) {
    setColor(elColor)
    var currImg = getCurrImg()
    initCanvas(currImg)
    render()
}

function onLeft() {
    setTxtLeft()
    var currImg = getCurrImg()
    initCanvas(currImg)
    render()
}
function onCenter() {
    setTxtCenter()
    var currImg = getCurrImg()
    initCanvas(currImg)
    render()
}
function onRight() {
    setTxtRight()
    var currImg = getCurrImg()
    initCanvas(currImg)
    render()
}

function onUp() {
    setTxtUp()
    var currImg = getCurrImg()
    initCanvas(currImg)
    render()
}
function onDown() {
    setTxtDown()
    var currImg = getCurrImg()
    initCanvas(currImg)
    render()
}
function onLargeTxt() {
    setLargeTxt()
    var currImg = getCurrImg()
    initCanvas(currImg)
    render()
}

function onSmallTxt() {
    setSmallTxt()
    var currImg = getCurrImg()
    initCanvas(currImg)
    render()
}

function onCloseEdit() {
    var elEditor = document.querySelector('#editor')
    elEditor.classList.add('d-hide')
    var elWelcome = document.querySelector('.wellcome')
    elWelcome.classList.remove('d-hide')
    elWelcome.classList.add('flex-well')
}
function toggleByImg() {
    var elEditor = document.querySelector('#editor')
    var ifContain = elEditor.classList.contains('d-hide')
    var elWelcome = document.querySelector('.wellcome')

    elWelcome.classList.add('d-hide')
    elWelcome.classList.remove('flex-well')

    if (ifContain) {
        elEditor.classList.remove('d-hide')
        var elWelcome = document.querySelector('.wellcome')
        elWelcome.classList.add('d-hide')
    } else return;
}

function toggleMenu() {
    document.body.classList.toggle('open');
    var elButtonMenu = document.querySelector('.mobile-menu-button');
    gOpen = !gOpen;
    if (gOpen) elButtonMenu.innerHTML = `<i class="fas fa-times"></i>`;
    else elButtonMenu.innerHTML = `<i class="fas fa-bars"></i>`;
}
function onSearch(elKey) {
    searchByKey(elKey + '')
    renderSearch()
}
function renderSearch() {
    var filterdImgs = getFillterdImg()
    var elImgs = document.querySelector('.imgs')
    elImgs.innerHTML = ''
    filterdImgs.map(img => {
        elImgs.innerHTML += `<a class="img-a" href="#"><img href="#canvas" class="img" onclick="onPickImg(this)" id="${img.id}" src="${img.url}"></a>`
    })
}

function canvasClicked(ev) {
    var txts = getTxts()
    var currTxt = getCurrTxt()
    if (!txts.length && !currTxt.txt) return
    var w2;
    var w = gCtx.measureText(currTxt.txt).width;
    if (txts.length) { w2 = gCtx.measureText(txts[0].txt).width; }
    if (ev.offsetX > currTxt.x && ev.offsetX < currTxt.x + w &&
        ev.offsetY > (currTxt.y - currTxt.size) && ev.offsetY < currTxt.y) {
        if (!currTxt.isMark) {
            setIsMarkON()
            markTxt(currTxt)
            editTxt(currTxt)
        }
        return;
    } else if (ev.offsetX > txts[0].x && ev.offsetX < txts[0].x + w2 &&
        ev.offsetY > (txts[0].y - txts[0].size) && ev.offsetY < txts[0].y) {
        swapping()
        var nowcurrTxt = getCurrTxt()
        var currImg = getCurrImg()
        initCanvas(currImg)
        render()
        editTxt(nowcurrTxt)
        markTxt(nowcurrTxt)
        setIsMarkON()
        return;
    } else {
        setIsMarkOFF()
        var currImg = getCurrImg()
        initCanvas(currImg)
        render()
    }
}
function isMark(currTxt) {
    if (currTxt.isMark) markTxt(currTxt)
}
function renderKeyOptions() {
    var sortedKeys = getSortedKeys()
    var elSelection = document.querySelector('#key-words');
    sortedKeys.map(key => {
        elSelection.innerHTML += `<option value="${key[0]}">`
    })
}