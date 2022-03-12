// voorwaarde button
const terms = document.querySelector('#term');
const btn = document.querySelector('.button-aanmelden');

terms.onclick = () => {
    if(terms.checked){
        btn.disabled = false;
} else{
    btn.disabled = treu;
    }
};