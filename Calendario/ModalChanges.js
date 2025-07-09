const btnSendFormCalendar = document.getElementById('btnSubmitModalCalSet')

const inputHora = document.getElementById('inpTextTime');
let estaBorrando = false;

inputHora.addEventListener('mousedown', (e) => {
  const pos = inputHora.selectionStart;
  // Si solo das click, bloqueamos el movimiento del cursor
  // Pero si es una selección (shift + click o click y arrastrar), lo permitimos
  if (!e.shiftKey && !e.ctrlKey && !e.metaKey) {
    e.preventDefault();
    inputHora.focus();
    inputHora.setSelectionRange(pos, pos); // Mantiene el cursor donde estaba
  }
});

inputHora.addEventListener('keydown', (e) => {

   if (inputHora.value.length > 0) {
    inputHora2.removeAttribute('disabled');
  }else{
    inputHora2.setAttribute('disabled', '');
  }

  const teclasBloqueadas = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
  if (teclasBloqueadas.includes(e.key)) {
    e.preventDefault(); // Bloquea el movimiento del cursor
  }
  if (e.key === 'Backspace' || e.key === 'Delete') {
    estaBorrando = true;
    const pos = inputHora.selectionStart; 
    if (e.key === 'Backspace' && pos > 0 && inputHora.value[pos - 1] === ':') {
      e.preventDefault();

      inputHora.value = inputHora.value.slice(0, pos - 2) + inputHora.value.slice(pos);

      inputHora.setSelectionRange(pos - 2, pos - 2);
    }
    else if (e.key === 'Delete' && inputHora.value[pos] === ':') {
      e.preventDefault();
      inputHora.value = inputHora.value.slice(0, pos) + inputHora.value.slice(pos + 2);
      inputHora.setSelectionRange(pos, pos);
    }

  } else {
    estaBorrando = false;
  }
});

inputHora.addEventListener('input', () => {
  if (inputHora.value.length > 0) {
    inputHora2.removeAttribute('disabled');
  }else{
    inputHora2.setAttribute('disabled', '');
  }
  
  if (inputHora.value.length === 1) {
    inputHora.value = inputHora.value.replace(/[^0-2:]/g, '');
  }
  if (inputHora.value.length === 2) {
    inputHora.value = inputHora.value.replace(/[^0-3:]/g, '');
  }
  if (inputHora.value.length === 4) {
    inputHora.value = inputHora.value.replace(/[^0-5:]/g, '');
  }
  if (inputHora.value.length === 5) {
    inputHora.value = inputHora.value.replace(/[^0-9:]/g, '');
  }
  if (inputHora.value.length === 2 && !inputHora.value.includes(':') && !estaBorrando) {
    inputHora.value += ':';
  }
  if (inputHora.value.length > 5) {
    inputHora.value = inputHora.value.slice(0, 5);
  }

});

// --------------


const inputHora2 = document.getElementById('inpTextTimeTo');
let deletting2 = false;

inputHora2.addEventListener('mousedown', (e) => {
  const pos = inputHora2.selectionStart;
  // Si solo das click, bloqueamos el movimiento del cursor
  // Pero si es una selección (shift + click o click y arrastrar), lo permitimos
  if (!e.shiftKey && !e.ctrlKey && !e.metaKey) {
    e.preventDefault();
    inputHora2.focus();
    inputHora2.setSelectionRange(pos, pos); // Mantiene el cursor donde estaba
  }
});

inputHora2.addEventListener('keydown', (e) => {

  const teclasBloqueadas = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
  if (teclasBloqueadas.includes(e.key)) {
    e.preventDefault(); // Bloquea el movimiento del cursor
  }
  if (e.key === 'Backspace' || e.key === 'Delete') {
    deletting2 = true;
    const pos = inputHora2.selectionStart; 
    if (e.key === 'Backspace' && pos > 0 && inputHora2.value[pos - 1] === ':') {
      e.preventDefault();

      inputHora2.value = inputHora2.value.slice(0, pos - 2) + inputHora2.value.slice(pos);

      inputHora2.setSelectionRange(pos - 2, pos - 2);
    }
    else if (e.key === 'Delete' && inputHora2.value[pos] === ':') {
      e.preventDefault();
      inputHora2.value = inputHora2.value.slice(0, pos) + inputHora2.value.slice(pos + 2);
      inputHora2.setSelectionRange(pos, pos);
    }

  } else {
    deletting2 = false;
  }
});

inputHora2.addEventListener('input', () => {
  const pos = inputHora2.selectionStart; 
  
  if (inputHora2.value.length === 1) {
    inputHora2.value = inputHora2.value.replace(/[^0-2:]/g, '');
  }
  if (inputHora2.value.length === 2) {
    inputHora2.value = inputHora2.value.replace(/[^0-3:]/g, '');
  }
  if (inputHora2.value.length === 4) {
    inputHora2.value = inputHora2.value.replace(/[^0-5:]/g, '');
  }
  if (inputHora2.value.length === 5) {
    inputHora2.value = inputHora2.value.replace(/[^0-9:]/g, '');
  }
  if (inputHora2.value.length === 2 && !inputHora2.value.includes(':') && !deletting2) {
    inputHora2.value += ':';
  }
  if (inputHora2.value.length > 5) {
    inputHora2.value = inputHora2.value.slice(0, 5);
  }
  if (inputHora2.value.length === 5) {
    if (inputHora2.value == '00:00') {
      inputHora2.value = '23:59';
    }
    if (timeToMinutes(inputHora.value) > timeToMinutes(inputHora2.value)) {
      btnSendFormCalendar.setAttribute('disabled', '');
    }else{
      if (btnSendFormCalendar.hasAttribute('disabled')) {
        btnSendFormCalendar.removeAttribute('disabled');
      }
    }
  }
  if (inputHora2.value.length === 0) {
    if (btnSendFormCalendar.hasAttribute('disabled')) {
        btnSendFormCalendar.removeAttribute('disabled');
      }
  }
});


function timeToMinutes(tiempo) {
  const [horas, minutos] = tiempo.split(':').map(Number);
  return horas * 60 + minutos;
}