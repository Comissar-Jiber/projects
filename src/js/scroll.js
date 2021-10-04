const pin = document.querySelector('.pin');
const line = document.querySelector('.line');
const table = document.querySelector('.wrapper-table-scroll table');
const div = document.querySelector('.wrapper-table-scroll');
let startcoord = line.getClientRects()[0].x;

//Ответсвенный за работу пина
const onPinDown = (evt) => {
    pin.removeEventListener('mousedown', onPinDown);



    const onBodyMove = (evt) => {
        //Смещение на основе начальной точки линии и движения глобальной координаты мыши
        let shift = evt.clientX - startcoord - (pin.clientWidth/2);

        //Ограничители на пин
        if (shift < 0) {
            shift = 0;
        } else if (shift > (line.clientWidth-pin.clientWidth)) {
            shift = line.clientWidth-pin.clientWidth;
        }
        pin.style.left = shift +  'px';

        //Узнаем скрытую ширину
        let ShiftHidden = table.clientWidth - div.clientWidth;

        //Добываем процент делением смещения на ширину линии с вычетом пина
        let persent = (Math.floor((shift / (line.clientWidth-pin.clientWidth))*100)/100);

        //Умножаем процент на скрытую ширину для создания соотношения
        table.style.marginLeft = - persent * ShiftHidden + 'px';


        //Своеобразная выключалки слушателей
        const onBodyUp = () => {
            document.body.removeEventListener('mousemove', onBodyMove);
            document.body.removeEventListener('mouseup', onBodyUp);

            pin.addEventListener('mousedown', onPinDown)

        }
        document.body.addEventListener('mouseleave', onBodyUp);
        document.body.addEventListener('mouseup', onBodyUp);
    }
    document.body.addEventListener('mousemove', onBodyMove);
}


//Ответственный за появление пина
const hiddenPin = () => {
   if (div.clientWidth === table.clientWidth) {
       line.style.display = 'none';
   } else {
       line.style.display = 'block';
   }
}

window.addEventListener('resize', hiddenPin);
window.addEventListener('load', hiddenPin);
pin.addEventListener('mousedown', onPinDown);