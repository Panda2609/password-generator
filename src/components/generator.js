import React, { useState } from 'react';
import '../styles/generator.css';

function Generator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let chars = '';
    if (useUpper) chars += upper;
    if (useLower) chars += lower;
    if (useNumbers) chars += numbers;
    if (useSymbols) chars += symbols;
    if (!chars) return setPassword('');
    let pass = '';
    let lastChar = '';

    for (let i = 0; i < length; i++) {
      let nextChar;
      let tries = 0;
      do {
        nextChar = chars.charAt(Math.floor(Math.random() * chars.length));
        tries++;
      } while (nextChar === lastChar && tries < 10);
      pass += nextChar;
      lastChar = nextChar;
    }
    setPassword(pass);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="generator-container">
      <div className="generator-title">
        <h1>Generador de contraseñas</h1>
      </div>
      <div className="password-display">
        <input
          type="text"
          value={password}
          readOnlys
          className="password-input"
          placeholder="Tu contraseña aparecerá aquí"
        />
        <button className="copy-btn" onClick={handleCopy} disabled={!password}>
          {copied ? '¡Copiado!' : 'Copiar'}
        </button>
      </div>
      <div className="controls">
        <label>
          Longitud: <span>{length}</span>
          <input
            type="range"
            min="12"
            max="32"
            value={length}
            onChange={e => setLength(Number(e.target.value))}
          />
        </label>
        <label>
          <input
            type="checkbox"
            checked={useUpper}
            onChange={e => setUseUpper(e.target.checked)}
          />
          Mayúsculas
        </label>
        <label>
          <input
            type="checkbox"
            checked={useLower}
            onChange={e => setUseLower(e.target.checked)}
          />
          Minúsculas
        </label>
        <label>
          <input
            type="checkbox"
            checked={useNumbers}
            onChange={e => setUseNumbers(e.target.checked)}
          />
          Números
        </label>
        <label>
          <input
            type="checkbox"
            checked={useSymbols}
            onChange={e => setUseSymbols(e.target.checked)}
          />
          Símbolos
        </label>
      </div>
      <button className="generate-btn" onClick={generatePassword}>
        Generar contraseña
      </button>
    </div>
  );
}

export default Generator;