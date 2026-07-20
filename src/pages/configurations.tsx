import React from 'react';

export default function Configurations() {
  return (
    <div className="configurations-container">
      <h1>Configurações</h1>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      <style jsx>{`
        .configurations-container {
          padding: 20px;
          max-width: 600px;
          margin: 0 auto;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .login-button {
          padding: 10px 20px;
          align-self: flex-start;
        }
        @media (max-width: 768px) {
          .login-button {
            align-self: stretch;
            width: 100%;
            margin-top: 10px;
          }
        }
      `}</style>
    </div>
  );
}