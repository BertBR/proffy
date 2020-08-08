import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
import api from '../../services/api';

export interface Teacher {
  teacherId: {
    id: string;
    name: string;
    avatar: string;
    bio: string;
    whatsapp: string
  }
  cost: number;
  subject: string;
}

interface TeacherItemProps {
  teacher: Teacher,
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  function createNewConnection(){
    api.post('connections', {
      teacherId: teacher.teacherId
    });
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.teacherId.avatar} alt={teacher.teacherId.name} />
        <div>
          <strong>{teacher.teacherId.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.teacherId.bio}</p>

      <footer>
        <p>Preço/hora
          <strong>R$ {teacher.cost}</strong>
        </p>
        <a target="_blank"
        rel="noopener noreferrer"
        onClick={createNewConnection} 
        href={`https://wa.me/${teacher.teacherId.whatsapp}?text="Olá, ${teacher.teacherId.name}. Gostaria de ter aulas de ${teacher.subject}!`}>
          <img src={whatsappIcon} alt="whatsapp" />
            Entrar em contato
          </a>
      </footer>
    </article>
  )
}

export default TeacherItem