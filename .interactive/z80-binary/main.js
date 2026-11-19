(() => {
  let value = 0xB6, mask = 0x0F, carry = 0, zero = 0, bit = 3;
  const byId = id => document.getElementById(id);
  let previous = null;
  function snapshot() {
    return { value, mask, carry, zero, bit,
      output: ['instruction', 'result', 'flag-result', 'explanation'].map(id => byId(id).textContent) };
  }
  function remember() { previous = snapshot(); }
  function clearResult(message) {
    byId('instruction').textContent = message;
    ['result', 'flag-result', 'explanation'].forEach(id => { byId(id).textContent = ''; });
  }
  function edit(action) { remember(); action(); clearResult('Qiymat o‘zgartirildi. Amalni tanlang.'); render(); }
  const format = n => `${n.toString(2).padStart(8, '0')} = ${n.toString(16).toUpperCase().padStart(2, '0')}h = ${n} (signed: ${n > 127 ? n - 256 : n})`;
  function button(parent, label, action) {
    const el = document.createElement('ui-button');
    el.textContent = label;
    el.setAttribute('size', 'sm');
    el.addEventListener('click', action);
    byId(parent).appendChild(el);
    return el;
  }
  const valueButtons = [], maskButtons = [], bitButtons = [];
  for (let i = 7; i >= 0; i--) {
    valueButtons[i] = button('value-bits', '', () => edit(() => { value ^= 1 << i; }));
    maskButtons[i] = button('mask-bits', '', () => edit(() => { mask ^= 1 << i; }));
    bitButtons[i] = button('bit-index', String(i), () => edit(() => { bit = i; }));
  }
  function render() {
    for (let i = 0; i < 8; i++) {
      for (const [buttons, n, name] of [[valueButtons, value, 'Registr'], [maskButtons, mask, 'Niqob']]) {
        const on = Boolean(n & (1 << i));
        buttons[i].textContent = `${i}: ${on ? 1 : 0}`;
        buttons[i].variant = on ? 'primary' : 'secondary';
        buttons[i].setAttribute('aria-label', `${name}, ${i}-bit: ${on ? 1 : 0}; almashtirish`);
        buttons[i].setAttribute('aria-pressed', String(on));
      }
      bitButtons[i].setAttribute('label', `${i}-bitni tanlash`);
      bitButtons[i].variant = bit === i ? 'primary' : 'secondary';
      bitButtons[i].setAttribute('aria-pressed', String(bit === i));
    }
    byId('value').textContent = format(value);
    byId('mask').textContent = format(mask);
    byId('carry').textContent = `C = ${carry}`;
    byId('zero').textContent = `Z = ${zero}`;
    for (const [id, state] of [['carry', carry], ['zero', zero]]) {
      byId(id).variant = state ? 'primary' : 'secondary';
      byId(id).setAttribute('aria-pressed', String(Boolean(state)));
    }
    byId('undo').disabled = previous === null;
  }
  function apply(op) {
    remember();
    const old = value, c = carry, z = zero;
    const left = old >>> 7, right = old & 1;
    switch (op) {
      case 'AND': value &= mask; carry = 0; break;
      case 'OR': value |= mask; carry = 0; break;
      case 'XOR': value ^= mask; carry = 0; break;
      case 'XOR A': value = 0; carry = 0; break;
      case 'BIT': zero = (old & (1 << bit)) ? 0 : 1; break;
      case 'SET': value |= 1 << bit; break;
      case 'RES': value &= ~(1 << bit); break;
      case 'CPL': value = ~old; break;
      case 'NEG': value = -old; carry = old === 0 ? 0 : 1; break;
      case 'SLA': value = old << 1; carry = left; break;
      case 'SRL': value = old >>> 1; carry = right; break;
      case 'SRA': value = (old >>> 1) | (old & 128); carry = right; break;
      case 'RLC': case 'RLCA': value = (old << 1) | left; carry = left; break;
      case 'RRC': case 'RRCA': value = (old >>> 1) | (right << 7); carry = right; break;
      case 'RL': case 'RLA': value = (old << 1) | c; carry = left; break;
      case 'RR': case 'RRA': value = (old >>> 1) | (c << 7); carry = right; break;
    }
    value &= 255;
    if (!['BIT', 'SET', 'RES', 'CPL', 'RLCA', 'RRCA', 'RLA', 'RRA'].includes(op)) zero = value === 0 ? 1 : 0;
    const hex = n => `${n.toString(16).toUpperCase().padStart(2, '0')}h`;
    const instruction = ['AND', 'OR', 'XOR'].includes(op) ? `${op} ${hex(mask)}`
      : ['BIT', 'SET', 'RES'].includes(op) ? `${op} ${bit},A`
      : ['SLA', 'SRL', 'SRA', 'RLC', 'RRC', 'RL', 'RR'].includes(op) ? `${op} A` : op;
    byId('instruction').textContent = instruction;
    byId('result').textContent = `${format(old)} → ${format(value)}`;
    byId('flag-result').textContent = `C: ${c} → ${carry} · Z: ${z} → ${zero}`;
    const details = {
      AND: 'Niqobdagi 1 bitlar saqlanadi; 0 bitlar tozalanadi.',
      OR: 'Niqobdagi 1 bitlar yoqiladi.', XOR: 'Niqobdagi 1 bitlar teskarilanadi.',
      'XOR A': 'A o‘zi bilan XOR qilindi: A=0, C=0, Z=1.',
      BIT: `${bit}-bit = ${(old >>> bit) & 1}. A va C saqlanadi; Z bitning teskarisi.`,
      SET: `${bit}-bit yoqildi. Flaglar saqlandi.`, RES: `${bit}-bit o‘chirildi. Flaglar saqlandi.`,
      CPL: 'A ning barcha bitlari teskarilandi. C va Z saqlandi.',
      NEG: 'A = (0 − A) mod 256. Eski A nol bo‘lmasa C=1.',
      SLA: `Chapga surildi; o‘ngdan 0 kirdi. Eski 7-bit (${left}) C ga o‘tdi.`,
      SRL: `O‘ngga surildi; chapdan 0 kirdi. Eski 0-bit (${right}) C ga o‘tdi.`,
      SRA: `O‘ngga surildi; ishora biti saqlandi. Eski 0-bit (${right}) C ga o‘tdi.`,
      RLC: 'Eski 7-bit 0-bitga va C ga o‘tdi.', RRC: 'Eski 0-bit 7-bitga va C ga o‘tdi.',
      RL: `Eski C (${c}) 0-bitga, eski 7-bit C ga o‘tdi.`,
      RR: `Eski C (${c}) 7-bitga, eski 0-bit C ga o‘tdi.`
    };
    const base = { RLCA: 'RLC', RRCA: 'RRC', RLA: 'RL', RRA: 'RR' }[op];
    byId('explanation').textContent = base ? `${details[base]} Z saqlandi.` : details[op];
    render();
  }
  const groups = {
    logic: ['AND', 'OR', 'XOR', 'XOR A', 'CPL', 'NEG'],
    single: ['BIT', 'SET', 'RES'], shift: ['SLA', 'SRL', 'SRA'],
    rotate: ['RLC', 'RRC', 'RL', 'RR'], accumulator: ['RLCA', 'RRCA', 'RLA', 'RRA']
  };
  Object.entries(groups).forEach(([id, ops]) => ops.forEach(op => button(id, op, () => apply(op))));
  const examples = [
    ['AND · pastki 4 bit', 0xB6, 0x0F, 'AND'],
    ['OR · 2-bitni yoqish', 0x20, 0x04, 'OR'],
    ['XOR · 2-bitni almashtirish', 0x24, 0x04, 'XOR'],
    ['SRA · −8 → −4', 0xF8, 0x0F, 'SRA'],
    ['RLC · 81h → 03h', 0x81, 0x0F, 'RLC']
  ];
  examples.forEach(([label, v, m, op]) => button('examples', label, () => {
    const before = snapshot();
    value = v; mask = m; carry = 0; zero = 0; bit = 3;
    apply(op); previous = before; render();
  }));
  byId('carry').addEventListener('click', () => edit(() => { carry ^= 1; }));
  byId('zero').addEventListener('click', () => edit(() => { zero ^= 1; }));
  byId('undo').addEventListener('click', () => {
    if (!previous) return;
    ({ value, mask, carry, zero, bit } = previous);
    ['instruction', 'result', 'flag-result', 'explanation'].forEach((id, i) => {
      byId(id).textContent = previous.output[i];
    });
    previous = null; render();
  });
  byId('reset').addEventListener('click', () => {
    remember(); value = 0xB6; mask = 0x0F; carry = 0; zero = 0; bit = 3;
    clearResult('Amalni tanlang.'); render();
  });
  render();
})();
