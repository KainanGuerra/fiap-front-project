interface FormData {
  titulo: string;
  conteudo: string;
}

interface FormErrors {
  titulo?: string;
  conteudo?: string;
}

export function validarFormulario(data: FormData): FormErrors {
  const erros: FormErrors = {};

  if (data.titulo.trim().length < 3) {
    erros.titulo = "O título deve ter pelo menos 3 caracteres.";
  }

  if (data.conteudo.trim().length < 10) {
    erros.conteudo = "O conteúdo deve ter pelo menos 10 caracteres.";
  }

  return erros;
}
