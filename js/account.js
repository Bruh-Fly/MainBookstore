//Độ mạnh mật khẩu

document.getElementById('twondpasswordbox').addEventListener('input', function() {
    const twondpasswordbox = this.value;
    const message = document.getElementById('domanhmatkhau');

    if (twondpasswordbox.length === 0){
        message.textContent = ''
        message.style.display = 'none'
        return;
    }

    if (twondpasswordbox.length < 6){
        message.textContent = 'Mật khẩu tối thiểu 6 kí tự';
        message.style.color = 'red';
        message.style.display = 'block'
        return;
    }

    const onceletter = /[a-zA-Z]/.test(twondpasswordbox);
    const includenumber = /[0-9]/.test(twondpasswordbox);
    const includespecial = /[^a-zA-z0-9]/.test(twondpasswordbox);

    if (onceletter && !includenumber && !includespecial){
        message.textcontent = 'Mật khẩu yếu'
        message.style.color = 'red'
    }

    if (onceletter && includenumber && !includespecial){
        message.textContent = 'Mật khẩu trung bình'
        message.style.color = 'yellow'
    }

    if (onceletter && includenumber && includespecial){
        message.textContent = 'Mật khẩu mạnh'
        message.style.color = 'green'
    }
    message.style.display = 'block'

})

//Nhớ tài khoản 
document.getElementById('buttonlogin').addEventListener('click', function(){
    const email = document.querySelector('input[name="emaillogin"]').value;
    const password = document.querySelector('input[name=passwordlogin').value;
    const remember = document.getElementById('rememberMe').checked;

    if(remember){
        localStorage.setItem('emailSaved', email);
        localStorage.setItem('passwordSaved', password)
    }
});

document.addEventListener('DOMContentLoaded', function(){
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword')

    if(savedEmail && savedPassword){
        document.querySelector('input[name="emaillogin"]').value = savedEmail;
        document.querySelector('input[name="passwordlogin"]').value = savedPassword;
        document.getElementById('rememberMe').checked = true;
    }
})