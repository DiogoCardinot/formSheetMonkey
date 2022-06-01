const button = document.querySelector(".submit-button");
const successSend = document.querySelector(".succesSubmitText");

//função que adiciona ao botão a imagem de load
const addLoad = () => {
  button.innerHTML = '<img src="./loading.png" class="loadingImage">';
};

//função que retira do botão a imagem de load e volta o texto de enviar
const removeLoad = () => {
  button.innerHTML = "Enviar";
  successSend.innerHTML = "Dados enviados com sucesso!";
  resetInputs();
};

const handleSubmit = (event) => {
  event.preventDefault();
  addLoad();

  const name = document.querySelector("#nome").value;
  const email = document.querySelector("#email").value;
  const tel = document.querySelector("#telefone").value;
  const subject = document.querySelector("#subject").value;
  const message = document.querySelector("#mensagem").value;
  const date = document.querySelector("#data").value;

  fetch("https://api.sheetmonkey.io/form/jt8VXUsmw6jqTzFUuD9jVf", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: name,
      email: email,
      telefone: tel,
      assuntoDaMensagem: subject,
      mensagem: message,
      data: date,
    }),
  }).then(() => removeLoad()); //o then serve para indicar quando a função fetch terminar de executar
};

const resetInputs = () => {
  const name = document.querySelector("#nome");
  const email = document.querySelector("#email");
  const tel = document.querySelector("#telefone");
  const subject = document.querySelector("#subject");
  const message = document.querySelector("#mensagem");
  const date = document.querySelector("#data");

  name.value = "";
  email.value = "";
  tel.value = "";
  subject.value = "";
  message.value = "";
  date.value = "";
};
document.querySelector("form").addEventListener("submit", handleSubmit);

//MUDA O INPUT DIFERENCIADO
const handleFocus = ({ target }) => {
  //o target pega o elemento que disparou determinado evento
  const span = target.previousElementSibling; //o target é o input que disparou o evento, o previousElementSibling se refere ao irmão anterior desse input, ou seja, o span

  //se o que disparou o evento for um text-area adiciona a classe a ele
  if (target.className == "text-area") {
    console.log("É text-area");
    span.classList.add("span-active-textarea");
  }
  //se o que disparou o evento for um input, adiciona a classe àquele input que disparou
  else if (target.className == "input") {
    console.log("É input");
    span.classList.add("span-active");
  }
};

const handleFocusOut = ({ target }) => {
  //o target pega o elemento que disparou determinado evento
  const span = target.previousElementSibling; //o target é o input que disparou o evento, o previousElementSibling se refere ao irmão anterior desse input, ou seja, o span
  //se for text area remove a classe de text area
  if (target.value == "" && target.className == "text-area") {
    span.classList.remove("span-active-textarea");
    //se for input remove a classe do input clicado
  } else if (target.value == "" && target.className == "input") {
    span.classList.remove("span-active");
  }
};

const inputs = document.querySelectorAll(".input");
const textarea = document.querySelector(".text-area");

inputs.forEach((input) => {
  //percorre o array com todos os inputs e, para cada input, faz o addEventListener
  input.addEventListener("focus", handleFocus);
  textarea.addEventListener("focus", handleFocus);
});

inputs.forEach((input) => {
  //percorre o array com todos os inputs e, para cada input, faz o addEventListener
  input.addEventListener("focusout", handleFocusOut);
  textarea.addEventListener("focusout", handleFocusOut);
});
