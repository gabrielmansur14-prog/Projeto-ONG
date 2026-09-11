// Máscaras de CPF, telefone e CEP + validação do formulário de cadastro

// Aplica uma máscara genérica: recebe o valor cru (só dígitos) e vai
// inserindo os caracteres de formatação (ponto, traço, parênteses)
// nas posições certas, à medida que a pessoa digita.

function maskCPF(value) {
  return value
    .replace(/\D/g, "")           // remove tudo que não é dígito
    .slice(0, 11)                 // CPF tem 11 dígitos
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function maskTelefone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 10) {
    // formato (00) 0000-0000
    return digits
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d{1,4})$/, "$1-$2");
  }

  // formato (00) 00000-0000
  return digits
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
}

function maskCEP(value) {
  return value
    .replace(/\D/g, "")
    .slice(0, 8)
    .replace(/(\d{5})(\d{1,3})$/, "$1-$2");
}

// Liga cada input ao seu mascarador, escutando o evento "input"
// (dispara a cada tecla digitada, colada ou apagada)
function ligarMascara(id, maskFn) {
  const input = document.getElementById(id);
  if (!input) return;

  input.addEventListener("input", () => {
    input.value = maskFn(input.value);
  });
}

ligarMascara("cpf", maskCPF);
ligarMascara("telefone", maskTelefone);
ligarMascara("cep", maskCEP);

// Validação do formulário: usa a validação nativa do HTML5
// (required, pattern etc.) e só mostra as mensagens de erro
// customizadas quando o campo realmente está inválido.
const form = document.getElementById("form-cadastro");
const successMessage = document.getElementById("form-success");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    // marca visualmente os campos inválidos (dispara o CSS :invalid)
    form.classList.add("form-tentou-enviar");

    // foca o primeiro campo com problema, pra facilitar a correção
    const primeiroInvalido = form.querySelector(":invalid");
    if (primeiroInvalido) primeiroInvalido.focus();

    return;
  }

  // Sem back-end neste projeto: só simula o envio e mostra a confirmação
  successMessage.hidden = false;
  form.reset();
  form.classList.remove("form-tentou-enviar");
});
