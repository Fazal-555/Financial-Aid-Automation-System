export function IsInputText(evt) {
  var ch = String.fromCharCode(evt.which);
  switch (evt.which) {
    case 8:
      break;
    case 46:
      break;
    case 37:
      break;
    case 39:
      break;
    default:
      if(evt.key==" ")
      {
        break;
      }
      if (!(/[A-Z]/.test(ch))) {
        evt.preventDefault();
      }
      break;
  }
}

export function IsInputTextNum(evt) {
  var ch = String.fromCharCode(evt.which);
  switch (evt.which) {
    case 8:
      break;
    case 46:
      break;
    case 37:
      break;
    case 39:
      break;
    default:
      if (!(/[A-Z]/.test(ch)) && !(((Number(evt.key) >= 0) && (Number(evt.key) <= 9)))) {
        evt.preventDefault();
      }
      else if(evt.key==" ")
      {
        evt.preventDefault();
      }
      break;
  }
}

export function IsInputNumber(evt) {
  switch (evt.which) {
    case 8:
      break;
    case 46:
      break;
    case 37:
      break;
    case 39:
      break;
    default:
      if (!(((Number(evt.key) >= 0) && (Number(evt.key) <= 9)))) {
        evt.preventDefault();
      }
      else if(evt.key==" ")
      {
        evt.preventDefault();
      }
      break;
  }
}


export function TriggerSubmit() {
  document.getElementById('submit').click();
}