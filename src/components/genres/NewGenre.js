import React, {useState} from 'react'
import { Link, Redirect } from 'react-router-dom'

import axios from 'axios';

function NewGenre() {
    // HOOKS
    const [data, setData] = useState('')
    const [success, setSuccess] = useState(false)

    // FUNCTIONS
    const setGenre = e => setData(e.target.value)
    const saveGenre = () => {
        axios
            .post('http://localhost:3002/api/genres', { name: data })
            .then(res => res.status === 200 && setSuccess(true))
    }

    // JSX
    if (success) return <Redirect to='/generos' />
    return (
        <div className='container pt-5'>
            <div className='text-center mb-5'>
                <h2>Novo gênero</h2>
                <Link to='/generos'>Voltar</Link>
            </div>
            <div>
                <div className="form-group">
                    <label htmlFor="newGenre">Nome do gênero</label>
                    <input onChange={setGenre} type="text" className="form-control" id="newGenre" placeholder="Digite o nome do gênero" autoFocus />
                </div>
                <button onClick={saveGenre} className='btn btn-info'>Salvar</button>
            </div>
        </div>
    )
}

export default NewGenre