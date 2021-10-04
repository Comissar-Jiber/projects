const buttons = document.querySelectorAll('.toggleButton');
const tbodys = document.querySelectorAll('.topTen__line');
const imges = document.querySelectorAll('.imgTopTen');
const stars = document.querySelectorAll('.cellOfInfo svg');
let arrOfbuttons = [];

const activeStar = function () {
    if (this.classList.contains('activeStar')) {
        this.classList.remove('activeStar');
    } else {
        this.classList.add('activeStar');
    }

}



for (let star of stars) {
    star.addEventListener('click', activeStar);
}

console.log(tbodys[0])

const searchChange = () => {
    for(let i=0;i<arrOfbuttons.length;i++) {
        if(arrOfbuttons[i].classList.contains('toggle')) {
            tbodys[i].classList.remove('hidden');
            imges[i].classList.remove('hidden');
        } else {
            tbodys[i].classList.add('hidden');
            imges[i].classList.add('hidden');
        }

    }

}

const toggle = function () {
   if (this.classList.contains('toggle')) {
       this.classList.remove('toggle');
   } else {
       this.classList.add('toggle');
   }
   searchChange();
}
for(let button of buttons) {
    button.addEventListener('click', toggle);
    arrOfbuttons.push(button);
}
