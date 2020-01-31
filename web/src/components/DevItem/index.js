import React from 'react';

import './style.css';

function DevItem({ dev } = {}) {
  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
      <strong>{dev.name}</strong>
  <span>{dev.techs.join(', ')}</span>
        </div>
      </header>
      {dev.bio && (<p>dev.bio</p>)}
      <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
    </li>
  )
}

export default DevItem;
