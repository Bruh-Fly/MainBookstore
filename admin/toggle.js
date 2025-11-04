function toggleMenu(){
    const menu = document.getElementById("menu");
    menu.classList.toggle("menu-hidden");
}   

document.getElementById("dark").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const isDark = document.body.classList.contains("dark-mode");
  document.getElementById("dark").innerText = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});
