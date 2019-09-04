import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import axios from 'axios'

function TvSerieInfo({ match }) {
    const [data, setData] = useState({})
    const [form, setForm] = useState({})
    const [genres, setGenres] = useState([])
    const [success, setSuccess] = useState(false)
    const [editMode, setEditMode] = useState(false)
    useEffect(() => {
        axios
            .get(`http://localhost:3002/api/series/${match.params.id}`)
            .then(res => {
                setData(res.data)
                setForm(res.data)
            })

        axios
            .get('http://localhost:3002/api/genres')
            .then(res => setGenres(res.data.data))
    }, [match.params.id])

    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    const changeMode = () => setEditMode(!editMode)
    const onChange = field => e => setForm({ ...form, [field]: e.target.value })
    const setStatus = value => () => setForm({ ...form, status: value })
    const saveTvSerie = () => {
        axios
            .put(`http://localhost:3002/api/series/${match.params.id}`, form)
            .then(res => res.status === 200 && setSuccess(true))
    }
    if (success) return <Redirect to='/series' />
    return (
        <div>
            <header style={masterHeader}>
                <div className='h-100' style={{ background: 'rgba(0, 0, 0, 0.7)' }}>
                    <div className='h-100 container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img className='img-fluid img-thumbnail' src={data.poster} alt={`Poster da série ${data.name}`}></img>
                            </div>
                            <div className='col-9'>
                                <h2 className='text-light'>{data.name}</h2>
                                <div className='lead text-light'>
                                    {data.status === 'PARA_ASSISTIR' && <span className="badge badge-success">Para assistir</span>}
                                    {data.status === 'ASSISTINDO' && <span className="badge badge-warning">Assistindo</span>}
                                    {data.status === 'ASSISTIDO' && <span className="badge badge-danger">Assistido</span>}
                                    <p>{data.genre}</p>
                                    <button onClick={changeMode} className='btn btn-light py-0'>Editar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {editMode &&
                <div className='container mt-5'>
                    <h3>Editar Série</h3>
                    <div>
                        <div className='form-group'>
                            <label htmlFor='serieName'>Nome</label>
                            <input onChange={onChange('name')} value={form.name} type='text' className='form-control' id='serieName' placeholder='Digite o nome da série' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='serieComment'>Comentário</label>
                            <input onChange={onChange('comments')} type='text' className='form-control' id='serieComment' placeholder='Escreva um comentário sobre a série' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='serieGenre'>Gênero</label>
                            <select className='form-control' id='serieGenre' defaultValue={form.genre_id} onChange={onChange('genre_id')}>
                                {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
                            </select>
                        </div>
                        <div className='form-check form-check-inline'>
                            <input defaultChecked={form.status === 'PARA_ASSISTIR'} className='form-check-input' type='radio' name='serieStatus' id='paraAssistir' value='PARA_ASSISTIR' onChange={setStatus('PARA_ASSISTIR')} />
                            <label className='form-check-label' htmlFor='paraAssistir'>
                                Para assistir
                    </label>
                        </div>
                        <div className='form-check form-check-inline'>
                            <input defaultChecked={form.status === 'ASSISTINDO'} className='form-check-input' type='radio' name='serieStatus' id='assistindo' value='ASSISTINDO' onChange={setStatus('ASSISTINDO')} />
                            <label className='form-check-label' htmlFor='assistindo'>
                                Assistindo
                    </label>
                        </div>
                        <div className='form-check form-check-inline'>
                            <input defaultChecked={form.status === 'ASSISTIDO'} className='form-check-input' type='radio' name='serieStatus' id='assistido' value='ASSISTIDO' onChange={setStatus('ASSISTIDO')} />
                            <label className='form-check-label' htmlFor='assistido'>
                                Assistido
                    </label>
                        </div>
                        <br />
                        <br />
                        <button onClick={saveTvSerie} type='button' className='btn btn-primary mb-5'>Salvar</button>
                    </div>
                </div>
            }

        </div>
    )
}

export default TvSerieInfo
