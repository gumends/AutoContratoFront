export class AppComponent {
  cpfValue: string = '';

  applyCpfMask(value: string): string {
    // Remove qualquer caractere que não seja número
    const cleaned = value.replace(/\D/g, '');

    // Aplica a máscara de CPF (###.###.###-##)
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
    } else if (cleaned.length <= 9) {
      return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
    } else {
      return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
    }
  }
}