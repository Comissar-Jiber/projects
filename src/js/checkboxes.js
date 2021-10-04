const checkbox = document.querySelectorAll('table input');
const trs = document.querySelectorAll('.checked');

//Масив ищет выделенные инпуты и сочетает их с противоположной таблицей
const checkTRS = () => {
    for (let i=0; i<checkbox.length;i++){
        if (checkbox[i].checked === true) {
            trs[i].classList.add('hovered');
        } else {
            trs[i].classList.remove('hovered');
        }
    }
}

//Чекаем и выделяем строку с инпутом, при каждом событий пускаем массив на поиски
const checkAndHover = function () {
    if (this.checked ===true) {
        this.parentElement.parentElement.classList.add('hovered');
    } else {
        this.parentElement.parentElement.classList.remove('hovered');
    }
    checkTRS();
}

//Раздаем слушателей на каждый инпут
for (let i=0; i<checkbox.length; i ++) {
    checkbox[i].addEventListener('click', checkAndHover);
}

