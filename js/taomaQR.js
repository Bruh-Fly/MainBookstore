function taomaQR() {
    const bank = document.querySelector('input[name="bank]:checked').value;
    const amout = document.getElementById('amout').value;

    if(!amout || amout <=0 ){
        alert('Vui lòng nhập số tiền hợp lệ.')
        return;
    }
}