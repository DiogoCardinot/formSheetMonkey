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
