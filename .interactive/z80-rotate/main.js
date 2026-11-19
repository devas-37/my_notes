(() => {
  let value = 0x96;
  let carry = 0;
  const byId = id => document.getElementById(id);
  const binary = n => n.toString(2).padStart(8, '0');
  const buttons = [];
  const hint = 'Buyruqni bosing: oldingi va yangi holat shu yerda ko‘rinadi.';
  function render() {
    buttons.forEach((button, index) => {
      const bit = (value >> (7 - index)) & 1;
      button.textContent = String(bit);
      button.setAttribute('label', 'b' + (7 - index) + ' = ' + bit + ', almashtirish');
      button.setAttribute('aria-pressed', String(Boolean(bit)));
    });
    byId('carry').textContent = 'CY = ' + carry;
    byId('carry').setAttribute('aria-pressed', String(Boolean(carry)));
    byId('value').textContent = 'Registr: ' + binary(value) + '₂ = ' + value + ' = ' + value.toString(16).toUpperCase().padStart(2, '0') + 'h';
  }
  for (let bit = 7; bit >= 0; bit--) {
    const button = document.createElement('ui-button');
    button.setAttribute('size', 'sm');
    button.addEventListener('click', () => {
      value ^= 1 << bit;
      byId('result').textContent = hint;
      render();
    });
    buttons.push(button);
    byId('bits').appendChild(button);
  }
  byId('carry').addEventListener('click', () => {
    carry ^= 1;
    byId('result').textContent = hint;
    render();
  });
  byId('reset').addEventListener('click', () => {
    value = 0x96;
    carry = 0;
    byId('result').textContent = hint;
    render();
  });
  for (const op of ['rlc', 'rrc', 'rl', 'rr']) {
    byId(op).addEventListener('click', () => {
      const before = value;
      const oldCarry = carry;
      const left = op === 'rlc' || op === 'rl';
      carry = left ? (before >> 7) & 1 : before & 1;
      const incoming = op === 'rlc' || op === 'rrc' ? carry : oldCarry;
      value = left ? ((before << 1) & 255) | incoming : (before >> 1) | (incoming << 7);
      byId('result').textContent = op.toUpperCase() + ': ' + binary(before) + ' (CY=' + oldCarry + ') → ' + binary(value) + ' (CY=' + carry + '). Eski b' + (left ? '7' : '0') + '=' + carry + ' → CY; ' + (op === 'rlc' || op === 'rrc' ? 'shu chet biti' : 'eski CY=' + oldCarry) + ' → b' + (left ? '0' : '7') + '.';
      render();
    });
  }
  render();
})();
