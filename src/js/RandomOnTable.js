const tds = document.querySelectorAll('.wrapper-table-scroll table .checked td');
const ARRCLASS = ['OnePlus', 'OneMinus','OneNew','ResultDay', 'none'];

const randomAdd =(elem)=>{
    let randomArr = Math.floor(Math.random()*ARRCLASS.length);
    if (elem.classList.contains(ARRCLASS[randomArr])) {
        elem.classList.remove(ARRCLASS[randomArr]);
    } else  if (elem.classList.contains(ARRCLASS[1]) || elem.classList.contains(ARRCLASS[3])){
        elem.classList.remove(ARRCLASS[3]);
    } else {
        elem.classList.add(ARRCLASS[randomArr]);
    }
}

for (let td of tds) {
    let randomize = Math.floor(Math.random()*tds.length);
    randomAdd(tds[randomize]);
}