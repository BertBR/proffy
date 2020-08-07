import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars0.githubusercontent.com/u/29619309?s=460&u=cdbf9ec14a4bf2b440f47089b44820f847c311e2&v=4"
          alt="Marcos Vinícius" />
        <div>
          <strong>Marcos Vinícius</strong>
          <span>Informática</span>
        </div>
      </header>

      <p>
        Instrutor do laboratório de Informática
          <br /><br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tristique, leo vitae pretium tristique, felis libero sollicitudin urna, sit amet blandit magna urna non nisi.
        </p>

      <footer>
        <p>Preço/hora
          <strong>R$ 50,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="whatsapp" />
            Entrar em contato
          </button>
      </footer>
    </article>
  )
}

export default TeacherItem