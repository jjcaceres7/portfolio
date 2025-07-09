var flagSelectDateDay = false;
const daysWeek = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
const arrDias = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
const arrMonth = ['Enero','Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
var thDays;
var SedeSelected = null;
var ActividadSelected = null;
var Remember = [];
// localStorage.setItem('remember', '');
if (localStorage.getItem('remember')) {
    Remember = JSON.parse(localStorage.getItem('remember'));
}

// window.onload = function(){
//     runCalendar();
// }


runCalendar();

function runCalendar(){
    var Divcalendario = document.getElementById('calendar');
        Divcalendario.innerHTML = '';
        Divcalendario.appendChild(Calendar());
        CreateFunctionsCalendarDetail();
        changeTitleTM(GetYM());
    addInfoToDataDay();
}

function addInfoToDataDay(){
    Remember.forEach(rem => {
        if (document.getElementById('dataDay/'+rem[0])) {
            let infoDay = document.getElementById('dataDay/'+rem[0]);
            infoDay.innerText += '●';
        }
    });
}

function Calendar(){ //  quiza deba recibir evento para crear calendario por tiempo
    let wrapCalendar = document.createElement('div');
    wrapCalendar.innerHTML = "";

    // crear calendario 
    let divCalendar = document.createElement('div'); // div para calendario completo
    divCalendar.setAttribute('id', 'divCalendar');
    divCalendar.setAttribute('class', 'div-calendar');
    let divHeadCalendar = document.createElement('div'); // div para header calendario
    divHeadCalendar.setAttribute('id', 'divHeadCalendar');
    divHeadCalendar.setAttribute('class', 'div-Head-calendar');
    
    
    let theadCal = document.createElement('thead');
    theadCal.setAttribute('id', 'headCalendar');
    theadCal.setAttribute('class', 'head-calendar');

    let trHead = document.createElement('tr');
    trHead.setAttribute('class', 'tr-head');
    daysWeek.forEach(h=>{
        let th = document.createElement('th');
        th.setAttribute('class', 'thCalendar');
        th.innerText = h;
        trHead.appendChild(th);
    });
    theadCal.appendChild(trHead);
    thDays = theadCal; // mejora


    divCalendar.appendChild(divHeadCalendar);
    // console.log(recursiveChangeYMPost(GetYM()));
    divCalendar.appendChild(CreateDivDays(recursiveChangeYMPost(GetYM())));

    let divSistemCalendar = document.createElement('div');
    divSistemCalendar.setAttribute('class', 'div-sistem-gerenal');
    let divGeralCalendar = document.createElement('div');
    divGeralCalendar.setAttribute('class', 'div-calendar-gerenal');
    
    divGeralCalendar.appendChild(CreateFuntionCalendarChange()); // agrega el head de control para el calendario
    divGeralCalendar.appendChild(divCalendar);
    
    divSistemCalendar.appendChild(divGeralCalendar);
    let divDateVisual = document.createElement('div');
    divDateVisual.setAttribute ('class', 'div-date-visual');
    divDateVisual.setAttribute('id', 'divDateVisual');
    let divDetailXdays = document.createElement('div');
    divDetailXdays.setAttribute('class', 'div-detail-calendar');
    divDetailXdays.setAttribute('id', 'divDetailCalendarFunction');
    divSistemCalendar.appendChild(divDetailXdays);

    let divDetailOrder = document.createElement('div');
    divDetailOrder.setAttribute('class', 'div-detail-order-calendar');
    divDetailOrder.setAttribute('id', 'divDetailOrderCalendar');

    wrapCalendar.appendChild(divDateVisual);
    wrapCalendar.appendChild(divSistemCalendar);
    wrapCalendar.appendChild(divDetailOrder);

    if (document.getElementById('divDays')) {
        let divD = document.getElementById('divDays');
        if(divD.hasAttribute('attrcal')){
            let dateActualy = divD.getAttribute('attrCal');
            let dateSpl = dateActualy.split('/');
            let arrym = [];
            arrym[0] = parseInt(dateSpl[1]);
            arrym[1] = parseInt(dateSpl[2]);

            changeTitleTM(arrym);
        }
    }
    
    return wrapCalendar;
}

function CreateDivDays(arrYearMonth){
    
    // 6 alto 7 ancho
    arrYearMonth = recursiveChangeYMPost(arrYearMonth);
    let year = arrYearMonth[0];
    let month = arrYearMonth[1];
    
    // console.log(month);
    let arrDiasCupos = null;

    let divDays = document.createElement('div'); // div para dias calendario
    divDays.setAttribute('id', 'divDays');
    divDays.setAttribute('class', 'div-days');

    var attrCal = document.createAttribute('attrCal');
    attrCal.value = 'attrCal/'+year+'/'+month;
    divDays.setAttributeNode(attrCal);
    
    let tableCalendarBody = document.createElement('table');
    tableCalendarBody.setAttribute('id', 'tableCalendarBody');
    tableCalendarBody.setAttribute('class', 'table-calendar-Body');
    let tBodyDays = document.createElement('tbody');
    tBodyDays.setAttribute('id', 'tBodyDays');
    tBodyDays.setAttribute('class', 'table-body-days');

    var dayOnWeek = new Date(year,month-1,1).getDay();
    
    dayOnWeek--;

    let dateToday = new Date();
    dateToday.setHours(0, 0, 0, 0);

    for (let i = 0; i < 42; i++) {
        let dateToNow;
        let valDay = i-dayOnWeek;
        let today = new Date(year,month-1,valDay);
        let monthNumber = today.getMonth()+1;
        if (today.getDate() < 10) {
            if (monthNumber < 10) {
                dateToNow = today.getFullYear()+"-0"+monthNumber+"-0"+today.getDate();    
            }else{
                dateToNow = today.getFullYear()+"-"+monthNumber+"-0"+today.getDate();
            }
        }else{
            if (monthNumber < 10) {
                dateToNow = today.getFullYear()+"-0"+monthNumber+"-"+today.getDate();
            }else{
                dateToNow = today.getFullYear()+"-"+monthNumber+"-"+today.getDate();
            }
        }
        // console.log(dayOnWeek);
        let day = document.createElement('div');
        day.setAttribute('id', 'day/'+dateToNow);
        day.addEventListener('click', CreateFunctionsCalendarDetail);
        let tdDay = document.createElement('td');

        let dateToday = new Date();
        let mes = dateToday.getMonth() +1;
        let txtDateToday = "";
        if (dateToday.getDate() < 10) {
            if (mes < 10) {
                txtDateToday = dateToday.getFullYear()+"-0"+mes+"-0"+dateToday.getDate();   }
            else{
                txtDateToday = dateToday.getFullYear()+"-"+mes+"-0"+dateToday.getDate();    }
        }else{
            if (mes < 10) {
                txtDateToday = dateToday.getFullYear()+"-0"+mes+"-"+dateToday.getDate();    }
            else{
                txtDateToday = dateToday.getFullYear()+"-"+mes+"-"+dateToday.getDate();     }
        }
        if (monthNumber==month){
            if(dateToNow==txtDateToday){
                day.setAttribute('class', 'today'); }
            else{
                day.setAttribute('class', 'day');   }
                //day.setAttribute('id', 'day/'+dateToNow);
        }else{
            day.setAttribute('class', 'other-day');
            //day.setAttribute('id', 'day/'+dateToNow);
        }
        

        //  Codigo para asignar dias disponibles para un turno o similar
        let currentDay = new Date(today);
        currentDay.setHours(0, 0, 0, 0);

        let timeDiff = currentDay.getTime() - dateToday.getTime();
        let daysDiff = timeDiff / (1000 * 60 * 60 * 24);

        if (daysDiff >= 0) { // de hoy en adelante 
            day.classList.add('daySedeSelected');
        }

        // si quiero limitar por dias especificos     
        // if (daysDiff >= 0 && daysDiff <= 30 && today.getDay() !== 0) {
        //     day.classList.add('daySedeSelected');
        // }


        let dato = document.createElement('div');
        dato.setAttribute('class', 'num-day');
        dato.style.pointerEvents = 'none';
        dato.innerText = today.getDate();

        let data = document.createElement('div');
        data.setAttribute('id', 'dataDay/'+dateToNow);
        data.setAttribute('class', 'data-day');
        data.style.pointerEvents = 'none';

        
        day.appendChild(dato);
        day.appendChild(data);
        tdDay.appendChild(day);
        if((i==0)||(i==7)||(i==14)||(i==21)||(i==28)||(i==35)){
            var trDays = document.createElement('tr');
            trDays.setAttribute('id', 'trDays');
            trDays.setAttribute('class', 'tr-days');
            trDays.appendChild(tdDay);
        }else{
            trDays.appendChild(tdDay);
            if((i==6)||(i==13)||(i==20)||(i==27)||(i==34)||(i==41)){
                tBodyDays.appendChild(trDays);
            }
        }

    }

    tableCalendarBody.appendChild(thDays);
    tableCalendarBody.appendChild(tBodyDays);
    divDays.appendChild(tableCalendarBody);
    return divDays;
}

function GetYM(){ // mes actual
    //            Y  - M
    let date = new Date();
    let arrYM = [];
    arrYM[0] = date.getFullYear();
    arrYM[1] = date.getMonth()+1;
    // console.log(arrYM);
    // arrYM = [2023,11];
    return arrYM;
}


function CreateFunctionsCalendarDetail(e){ // funcion visualizacion lateral detalle
    let idEvent;
    let info = document.createElement('div');
        info.setAttribute('class', 'div-detail-calendar-info');
    let divCalDetail = document.getElementById('divDetailCalendarFunction');
    divCalDetail.innerHTML = '';

    let btnNewOrderForCalendar = document.createElement('button');
        btnNewOrderForCalendar.setAttribute('class', 'btn-new-order-with-day');
        btnNewOrderForCalendar.setAttribute('id', 'btnNewOrderCalendarWithDay');
        
    if (e) {
        document.querySelectorAll('.clicked').forEach(activoEl => {
            if (activoEl !== e.target) {
              activoEl.classList.remove('clicked');
            }
        });        
        e.target.classList.toggle('clicked');

        idEvent = e.target.id.split('/')[1];


    }
    else{
        btnNewOrderForCalendar.innerText = 'Seleccioná un día';
    }
        
    if (idEvent) {
        
        let fechId = new Date(idEvent);
        let d = idEvent.split('-');
        let diaSemana = daysWeek[fechId.getDay()+1];
        if (diaSemana == undefined) {
            diaSemana = 'Domingo';
        }
        btnNewOrderForCalendar.innerText ='Crear recordatorio para: '+diaSemana+' '+d[2]+' de '+arrMonth[parseInt(d[1], 10) - 1]+', '+d[0]; //semana + dia para boton
        btnNewOrderForCalendar.setAttribute('data-bs-toggle', 'modal');
        btnNewOrderForCalendar.setAttribute('data-bs-target', '#modalCalendar');
        btnNewOrderForCalendar.setAttribute('dateSet', idEvent);
        btnNewOrderForCalendar.addEventListener('click', btnCreateEvent => {
            dataDate = btnCreateEvent.target.getAttribute('dateSet');
            document.getElementById('modalCalendarSetEvent').innerText = btnCreateEvent.target.textContent.split(':')[1];
            document.getElementById('dataDateH').value = dataDate; // yyyy-mm-dd
           
        });


        // aca se muestran los eventos creados
        // console.log(JSON.parse(localStorage.getItem('remember')));
        var flagEntrada = true;
        var infoEvent = 'aun no hay eventos o recordatorios';
        for (let i = 0; i < Remember.length; i++) {
            if (Remember[i][0] == idEvent) {
                if (flagEntrada == true) {
                    infoEvent = '';
                    flagEntrada = false;
                }
                // console.log(Remember);
                if (Remember[i][2] && Remember[i][3]) {
                    infoEvent +=  Remember[i][1] + '  | de ' + Remember[i][2] + ' a ' + Remember[i][3] + '<br>';
                }else{
                    if (Remember[i][2]) {
                        infoEvent +=  Remember[i][1] + '  | a las ' + Remember[i][2] + '<br>';
                    }else{
                        infoEvent +=  Remember[i][1] +'<br>';
                    }
                }
                
                
            }
        }
        info.innerHTML = infoEvent;



    }
    

    divCalDetail.appendChild(btnNewOrderForCalendar);
    divCalDetail.appendChild(info);
}


// enviar datos del modal Form
document.getElementById('formModalCalendarSet').addEventListener('submit', function(e){
    e.preventDefault();


    let EventDate = document.getElementById('eventDate').value;
        EventDate = EventDate.charAt(0).toUpperCase() + EventDate.slice(1).toLowerCase();
    let Time = document.getElementById('dataDateH').value;
    let Date = document.getElementById('inpTextTime').value;
    let DateTo = document.getElementById('inpTextTimeTo').value;
    
    var Respuesta = null;
    if (Date) { // verifica formato de hora 
        if (DateTo) {
            if(!validateTime(Date) || !validateTime(DateTo)){
                Respuesta = confirm('y si en vez de querer romper mi calendario, me envias un mail y hablamos?');
            }
        }
        else{
            if(!validateTime(Date)){
                Respuesta = confirm('y si en vez de querer romper mi calendario, me envias un mail y hablamos?');
            }
        }
        
    }else{
        if(DateTo){
            Respuesta = confirm('y si en vez de querer romper mi calendario, me envias un mail y hablamos?');
        }
    }
    
    if (Respuesta === null) {
        if (EventDate && Time) {
            Remember.push([Time,EventDate, Date, DateTo]);
            localStorage.setItem('remember', JSON.stringify(Remember));
        }
    }

    
    // console.log(JSON.parse(localStorage.getItem('remember')));
    
    runCalendar();

    // document.getElementById('btnSubmitModalCalSet').setAttribute('disabled','');
    // cerrar modal
    const modalCalendar = document.getElementById('modalCalendar');
    const modalInstance = bootstrap.Modal.getInstance(modalCalendar);
    if (!modalInstance) {
    modalInstance = new bootstrap.Modal(modalCalendar);
    }
    modalInstance.hide();
});

function validateTime(time){
    const regex = /^([0-9]{2}):([0-5][0-9])$/; 
    const match = time.match(regex);
    
    if (!match) return false;

    const hora = parseInt(match[1], 10);
    const minutos = parseInt(match[2], 10);

    // Validamos que la hora esté dentro del rango deseado (por ejemplo, 0 a 23)
    return hora >= 0 && hora <= 23;
}





modalCalendar.addEventListener('hide.bs.modal', function () {
    document.getElementById('dataDateH').value = '';
    document.getElementById('eventDate').value = '';
    document.getElementById('inpTextTime').value = '';
    document.getElementById('inpTextTimeTo').value = '';
  const focused = document.activeElement;
  if (modalCalendar.contains(focused)) {
    focused.blur();
  }
});

function CreateFuntionCalendarChange(){
    let divFunctionCalendar = document.createElement('div');
        divFunctionCalendar.setAttribute('class', 'div-function-calendar');
        divFunctionCalendar.setAttribute('id', 'divFunctionCalendar');
    let divGralFunctions = document.createElement('div');

        

    let divPrevMonth = document.createElement('div');
    divPrevMonth.setAttribute('class', 'month-control');
    divPrevMonth.innerHTML = `
<svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path d="M4 12H20M4 12L8 8M4 12L8 16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;;
    divPrevMonth.addEventListener('click', ()=>{
        let divD = document.getElementById('divDays');
        if(divD.hasAttribute('attrcal')){
            let dateActualy = divD.getAttribute('attrCal');
            let dateSpl = dateActualy.split('/');
            let year = parseInt(dateSpl[1]);
            let month = parseInt(dateSpl[2])-1;
            // console.log(dateSpl);
            changeMonth(year, month);
        }
    });

    let divMonthToday = document.createElement('div');
    divMonthToday.setAttribute('class', 'month-control');
    divMonthToday.innerText = 'Hoy';
    divMonthToday.addEventListener('click', ()=>{
        
        let arrYM = GetYM();
        let year = arrYM[0];
        let month = arrYM[1];
        changeMonth(year, month);
    });

    let divPostMonth = document.createElement('div');
    divPostMonth.setAttribute('class', 'month-control');
    divPostMonth.innerHTML = `
<svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path d="M4 12H20M20 12L16 8M20 12L16 16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
    divPostMonth.addEventListener('click', ()=>{
        let divDa = document.getElementById('divDays');
        if(divDa.hasAttribute('attrcal')){
            let dateActualy = divDa.getAttribute('attrCal');
            let dateSpl = dateActualy.split('/');
            let year = parseInt(dateSpl[1]);
            let month = parseInt(dateSpl[2])+1;
            // console.log(year, month);
            changeMonth(year, month);
        }
    });

    divFunctionCalendar.appendChild(divPrevMonth);
    divFunctionCalendar.appendChild(divMonthToday);
    divFunctionCalendar.appendChild(divPostMonth);
    

    
    divGralFunctions.appendChild(divFunctionCalendar);
    return divGralFunctions;
}

function changeTitleTM(arrYM){
    let dVisual = document.getElementById('divDateVisual');
    // console.log(dateSpl);
    // changeMonth(year, month);
    // console.log(arrYM);
    arrYM = recursiveChangeYMPost(arrYM);
    dVisual.innerHTML = arrYM[0]+'&nbsp'+arrMonth[arrYM[1]-1];
    
}

function recursiveChangeYMPost(arrYM){ // prepara la visualizacion de texto x mes
    
    if (arrYM[1] >= 13){
        arrYM[0] = arrYM[0] + 1;
        arrYM[1] = arrYM[1] - 12;
        arrYM = recursiveChangeYMPost(arrYM);
    }
    if (arrYM[1] <= 0){
        arrYM[0] = arrYM[0] - 1;
        arrYM[1] = arrYM[1] + 12;
        arrYM = recursiveChangeYMPost(arrYM);
    }
    return arrYM;
}

function changeMonth(year, month){
    let arrYM = [];
    arrYM[0] = year;
    arrYM[1] = month;
    let divCalendar = document.getElementById('divCalendar');
    let divDays = document.getElementById('divDays');
    divCalendar.removeChild(divDays);
    divCalendar.appendChild(CreateDivDays(arrYM));
    CreateFunctionsCalendarDetail();
    changeTitleTM(arrYM);
    addInfoToDataDay();
    // SelectedDaysActualOrder(); agrega color a los dias relacionados a seleccion (rehacer)
}



// modal script

document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('modalCalendar');
  const dialog = modal.querySelector('.modal-dialog');
  const header = modal.querySelector('.modal-header');

  let isDragging = false;
  let offset = { x: 0, y: 0 };

  header.addEventListener('mousedown', function (e) {
    isDragging = true;
    dialog.classList.add('draggable-modal');

    offset.x = e.clientX - dialog.getBoundingClientRect().left;
    offset.y = e.clientY - dialog.getBoundingClientRect().top;
  });

  document.addEventListener('mousemove', function (e) {
    if (isDragging) {
      dialog.style.left = `${e.clientX - offset.x}px`;
      dialog.style.top = `${e.clientY - offset.y}px`;
    }
  });

  document.addEventListener('mouseup', function () {
    isDragging = false;
  });

  // Restablecer posición (opcional, si querés que se reinicie al cerrar el modal)
  /*
  modal.addEventListener('hidden.bs.modal', function () {
    dialog.style.left = '';
    dialog.style.top = '';
    dialog.classList.remove('draggable-modal');
  });
  */
});


