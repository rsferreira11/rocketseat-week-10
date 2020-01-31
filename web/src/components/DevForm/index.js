import React, { useEffect, useState } from 'react';

function DevForm({ onSubmit }) {
  const [ githubUsername, setGithubUsername ] = useState('');
  const [ techs, setTechs ] = useState('');

  const [ latitude, setLatitude ] = useState('');
  const [ longitude, setLongitude ] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      github_username: githubUsername,
      techs,
      latitude,
      longitude,
    });

    setGithubUsername('');
    setTechs('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuário do Github</label>
        <input name="github_username" id="username_github" value={githubUsername} required onChange={e => setGithubUsername(e.target.value)} />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input name="techs" id="techs" value={techs} required onChange={e => setTechs(e.target.value)} />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="lititude">Latitude</label>
          <input name="latitude" id="latitude" value={latitude} type="number" required onChange={e => setLatitude(e.target.value)} />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input name="longitude" id="longitude" value={longitude} type="number" required onChange={e => setLongitude(e.target.value)} />
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  )
}

export default DevForm;
