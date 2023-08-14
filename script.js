// element
let texts = document.getElementById('texts')
let cloneTexts = document.getElementById('cloneTexts')
let inputText = document.getElementById('textinput')

// custom
let custom = false
let customText = ""
let customArray = []

const rawArrayWord = ["makan", "minum", "rumah", "kucing", "pohon", "buku", "mobil", "sepeda", "laut", "gunung", "hujan", "angin", "bintang", "bulan", "matahari", "malam", "siang", "pagi", "kota", "desa", "jalan", "baju", "celana", "sepatu", "topi", "tas", "uang", "senyum", "tawa", "air", "api", "bumi", "langit", "awan", "bintang", "bahasa", "musik", "seni", "warna", "buah", "sayur", "ikan", "daging", "telur", "taman", "kursi", "meja", "lantai", "dinding", "atap", "sekolah", "universitas", "kantor", "restoran", "hotel", "pesawat", "kapal", "kereta", "bis", "museum", "pantai", "gunung", "hutan", "danau", "sungai", "jembatan", "gurun", "pasar", "tokoh", "artis", "penyanyi", "pemain", "sutradara", "penulis", "sejarawan", "ilmuwan", "dokter", "perawat", "insinyur", "pengacara", "guru", "siswa", "mahasiswa", "pengusaha", "petani", "nelayan", "polisi", "tentara", "pegawai", "pekerja", "pelukis", "fotografer", "desainer", "programmer", "penari", "olahragawan", "pelatih", "menteri", "presiden", "negara", "provinsi", "kabupaten", "kota", "desa", "pulau", "benua", "lautan", "samudra", "perbatasan", "benua", "perang", "damai", "negosiasi", "ekonomi", "politik", "budaya", "agama", "teknologi", "pendidikan", "lingkungan", "sosial", "kesehatan", "olahraga", "seni", "hiburan", "hukum", "media", "transportasi", "pariwisata", "wawancara", "berita", "acara", "film", "musik", "pertunjukkan", "teater", "pameran", "festival", "pemilihan", "demo"];

let arrayWord = []
let arrayTypedWord = []
let text = ""
let index = 0

let typing = false

let timer = 59
let intervalTimer = () => { }
let timeoutTimer = () => { }

closeForm()
reload()
function get_random(arr) {
    return arr[Math.floor((Math.random() * arr.length))];
}

function reload() {
    // reset variable
    typing = false
    arrayTypedWord = []
    index = 0;
    text = ""
    texts.innerHTML = '';
    cloneTexts.innerHTML = '';
    inputText.value = "";

    // reset height
    height = 0
    topPosition = 0
    texts.style.top = `0px`;

    // generate new text
    if (custom) {
        generateCustom()
    } else {
        generateText()
    }

    // put grey color 
    document.getElementById(index).style.background = 'grey';

    // trigger heigh
    triggerHeightChange()


    // reset event
    inputText.removeEventListener('keydown', keyInputHandle)
    inputText.addEventListener('keydown', keyInputHandle)

    // reset timer
    timer = 59
    clearInterval(intervalTimer)
    clearTimeout(timeoutTimer)
    document.getElementById('timer').innerHTML = `01:00`

    inputText.focus()
}



// custom text
function changeCustomText() {
    document.getElementById('customForm').style.display = 'none';
    customText = document.getElementById('customText').value
    arrayWord = customText.split(" ")
    custom = true

    reload()
}

function generateCustom() {
    let index = 0
    arrayWord.map((word) => {
        let span = document.createElement('span')
        span.id = index
        span.innerHTML = word
        texts.append(span)
        index++
    })
}
function closeForm() {
    document.getElementById('customForm').style.display = 'none';
}
function showForm() {
    document.getElementById('customForm').style.display = 'flex';
}


// generate random text
function generateText() {
    arrayWord = []
    let index = 0
    for (let x = 0; x < 300; x++) {
        let word = get_random(rawArrayWord)
        arrayWord.push(word)
        let span = document.createElement('span')
        span.id = index
        span.innerHTML = word
        texts.append(span)
        index++
    }
}



function triggerHeightChange() {
    // create child to trigger height change
    let spandTrigger = document.createElement('span')
    spandTrigger.innerHTML = arrayWord[index + 1]
    spandTrigger.id = "spandTrigger"
    cloneTexts.append(spandTrigger)

    // remove child
    setTimeout(() => {
        cloneTexts.removeChild(spandTrigger)
    }, 50);

}

// input validation
const AllowedSymbol = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', ';', ':', '"', '\'', ',', '.', '<', '>', '/', '?', '|', '\\'];
const FunctionBTN = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', "F8", "F9", "F10", 'F11', 'F12']
function keyInputHandle(event) {
    if (!typing) {
        typing = true
        start()
    }
    if (event.code === "Space") {

        if (inputText.value === "" || inputText.value === " ") {
            event.preventDefault()
            return
        };

        // append typed word to clonetext div
        let span = document.createElement('span')
        span.innerText = arrayWord[index]
        cloneTexts.append(span)

        // trigger heightchange
        triggerHeightChange()

        // push typed word to array 
        arrayTypedWord.push(text)
        text = ""

        // change text background color 
        document.getElementById(index).style.background = 'transparent';
        if (arrayTypedWord[index] === arrayWord[index]) {
            document.getElementById(index).style.color = 'green';
        } else {
            document.getElementById(index).style.color = 'red';
        }

        inputText.value = "";
        index++
        document.getElementById(index).style.background = 'grey';
        return

    } else if (event.code === "Backspace") {
        text = text.slice(0, text.length - 1)
    } else {
        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 65 && event.keyCode <= 90) || AllowedSymbol.includes(event.key)) {
            console.log(event.keyCode)
            text += event.key
            console.log(text)
        } else {
            if (event.key === "F5") {
                document.getElementById('refreshBTN').click()
            }
            event.preventDefault()
        }
    }

    if (arrayWord[index].startsWith(text)) {
        document.getElementById(index).style.background = 'grey';
    } else {
        document.getElementById(index).style.background = 'red';
    }
}


// auto resize cloneTexts
let checkTextWidthChange = new ResizeObserver((element) => {
    document.getElementById('cloneTexts').style.width = `${element[0].contentRect.width}px`;
});
checkTextWidthChange.observe(texts)

// auto up text
let firstHeight = cloneTexts.clientHeight + 1;
var height = 0;
var topPosition = 0;
let checkCloneTextsHeightChange = new ResizeObserver((element) => {
    let currentHeight = element[0].contentRect.height
    if (height < currentHeight && currentHeight > firstHeight) {
        height = currentHeight
        topPosition += 45;
        texts.style.top = `-${topPosition}px`;
    }
    // console.log(currentHeight)

});
checkCloneTextsHeightChange.observe(cloneTexts)


// start
function start() {
    timeoutTimer = setTimeout(() => {
        clearInterval(intervalTimer)
        endTyping()
    }, 61000);
    intervalTimer = setInterval(() => {
        document.getElementById('timer').innerHTML = `00:${timer < 10 ? "0" + timer : timer}`
        timer--;
    }, 1000);
}

// calculation
function calcuResult() {
    let WPM = 0;
    let correctWord = 0
    let wrongWord = 0

    let charAllCount = 0
    let charCorrectCount = 0
    let charWrongCount = 0

    let acc = charCorrectCount / charAllCount * 100
    for (let index = 0; index < arrayTypedWord.length; index++) {
        charAllCount += (arrayWord[index].length + 1)
        if (arrayTypedWord[index] === arrayWord[index]) {
            WPM += (arrayTypedWord[index].length + 1)
            charCorrectCount += (arrayTypedWord[index].length + 1)
            correctWord++
        } else {
            wrongWord++
            charWrongCount += (arrayTypedWord[index].length + 1)
        }
    }

    // console.log(WPM)
    WPM /= 5
    acc = charCorrectCount / charAllCount * 100
    document.getElementById('WPM').innerHTML = `${Math.floor(WPM)} WPM`
    document.getElementById('charCorrect').innerHTML = `${charCorrectCount}`
    document.getElementById('charWrong').innerHTML = `${charWrongCount}`

    document.getElementById('acc').innerHTML = `${acc.toFixed(2)}%`
    document.getElementById('cWord').innerHTML = `${correctWord}`
    document.getElementById('wWord').innerHTML = `${wrongWord}`
}



// end typing
function endTyping() {
    inputText.removeEventListener('keydown', keyInputHandle)
    calcuResult()
}

