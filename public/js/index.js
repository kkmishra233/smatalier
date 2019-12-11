const token = "d2b28f39-2c86-4b97-b5b4-37f97ab43da8";
const $formContact = document.querySelector("#contact");

const sendForm = event => {
  event.preventDefault();
  const message = {
    firstname: document.querySelector("#fname").value,
    lastname: document.querySelector("#lname").value,
    cellphone: document.querySelector("#cell").value,
    subject: document.querySelector("#subject").value,
    emailid: document.querySelector("#email").value
  };
  smtpJS(message);
};
const smtpJS = message => {
  try {
    Email.send(
      "kkbit233@gmail.com",
      "kkbit233@gmail.com",
      `${message.firstname} - ${message.lastname} - ${message.cellphone} - ${message.emailid}`,
      message.subject,
      { token }
    );
  } catch (e) {
    alert("Erro");
  } 
};
if($formContact){
	$formContact.addEventListener("submit", sendForm);
}

