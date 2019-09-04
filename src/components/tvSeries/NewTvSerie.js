import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'

import axios from 'axios'

function NewTvSerie() {
    const [data, setData] = useState('')
    const [success, setSuccess] = useState(false)

    const setTvSerie = e => setData(e.target.value)

    const saveTvSerie = () => {
        axios
            .post('http://localhost:3002/api/series', {name: data})
            .then(res => res.status === 200 && setSuccess(true))
    }
    if (success) return <Redirect to='/series' />
    return (
        <div className='container pt-5'>
            <div className='text-center mb-5'>
                <h2>Nova Série</h2>
                <Link to='/series'>Voltar</Link>
            </div>
            <div>
                <div className="form-group">
                    <label htmlFor="newTvSerie">Nome da série</label>
                    <input onChange={setTvSerie} type="text" className="form-control" id="newTvSerie" placeholder="Digite o nome da série" autoFocus />
                </div>
                <button onClick={saveTvSerie} className='btn btn-info'>Salvar</button>
            </div>
        </div>
    )
}

export default NewTvSerie