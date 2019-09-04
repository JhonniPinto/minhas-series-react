import React, {useState, useEffect} from 'react'
import { Link, Redirect } from 'react-router-dom'

import axios from 'axios'

function UpdateGenre({match}) {
    const [data, setData] = useState({})
    const [success, setSuccess] = useState(false)
    useEffect(() => {
        axios
            .get(`http://localhost:3002/api/genres/${match.params.id}`)
            .then(res => setData(res.data.name))
    }, [match.params.id])
    
    const setGenre = e => setData(e.target.value)
    const saveGenre = () => {
        axios
            .put(`http://localhost:3002/api/genres/${match.params.id}`, {name: data})
            .then(res => res.status === 200 && setSuccess(true))
    }
    if (success) return <Redirect to='/generos' />
    return (
        <div className='container pt-5'>
            <div className='text-center mb-5'>
                <h2>Editar gênero</h2>
                <Link to='/generos'>Voltar</Link>
            </div>
            <div>
                <div className="form-group">
                    <label htmlFor="updateGenre">Nome do gênero</label>
                    <input value={data} onChange={setGenre} type="text" className="form-control" id="updateGenre" placeholder="Digite o nome do gênero" autoFocus />
                </div>
                <button onClick={saveGenre} className='btn btn-info'>Salvar</button>
            </div>
        </div>
    )
}

export default UpdateGenre