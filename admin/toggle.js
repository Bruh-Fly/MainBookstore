

const sideMenu = document.querySelector('aside');
const menuBtn =document.querySelector('menu_bar');
const closeBtn = document.querySelector('#close_btn');

const themeToggle =document.querySelector('.theme_toggle')

menuBtn.addEventListener('click',()=>{
  sideMenu.style.display = "block"
})

closeBtn.addEventListener('click',()=>{
  sideMenu.style.display = "none"
})

themeToggle.addEventListener('click', ()=>{
  
  document.body.classList.toggle('dark-theme-variables')
  themeToggle.querySelector('span:nth-child(1)').classList.toggle('active')
    themeToggle.querySelector('span:nth-child(2)').classList.toggle('active')
})