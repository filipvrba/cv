function showWarning(message) {
  if( window.confirm(message)) {

    const form_elem = document.getElementById("usrform-del") 
    form_elem.submit();
  }
}