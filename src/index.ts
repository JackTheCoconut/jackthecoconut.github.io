const greeting = document.getElementById("greeting");
const button = document.getElementById("btn");

if (greeting && button) {
    button.addEventListener("click", () => {
        greeting.textContent = "Hello, GitHub Pages with TypeScript!";
    });
}