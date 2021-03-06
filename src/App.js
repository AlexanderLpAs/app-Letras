import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import axios from 'axios'
import Cancion from './components/Cancion';
import Info from './components/Info';

const App = () => {

  const [busquedaLetra, setBusquedaLetra] = useState({})
  const [letra, setLetra] = useState('')
  const [info, setInfo] = useState({})

  useEffect(() => {

    if (Object.keys(busquedaLetra).length === 0) return

    const consultarAPI = async () => {

      const {artista, cancion} = busquedaLetra

      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`
      const url2 = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`

      const [ letra, info ] = await Promise.all([
        axios(url),
        axios(url2)
      ])

      setLetra(letra.data.lyrics)
      setInfo(info.data.artists[0]);

    }
    
    consultarAPI()

  }, [busquedaLetra])

  return (
    <div>
      <Formulario
        setBusquedaLetra={setBusquedaLetra}
      />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info
              info={info}
            />
          </div>
          <div className="col-md-6">
            <Cancion
              letra={letra}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
