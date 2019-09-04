import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

import axios from 'axios'

function TvSeries() {
    const [data, setData] = useState([])
    useEffect(() => {
        axios
            .get('http://localhost:3002/api/series')
            .then(res => setData(res.data.data))
    }, [])

    const deleteTvSerie = (id) => {
        axios
            .delete(`http://localhost:3002/api/series/${id}`)
            .then(res => {
                if (res.status === 200) {
                    const filtered = data.filter(item => item.id !== id)
                    setData(filtered)
                }
            })
    }
    return (
        <div className='container-fluid pt-5'>
            <div className='text-center mb-5'>
                <h2>Séries de Tv</h2>
                <Link to='/series/nova'>Nova série</Link>
            </div>
            <table className='table table-dark table-hover'>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Status</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>
                                    {item.status === 'PARA_ASSISTIR' && <span className="badge badge-success">Para assistir</span>}
                                    {item.status === 'ASSISTINDO' && <span className="badge badge-warning">Assistindo</span>}
                                    {item.status === 'ASSISTIDO' && <span className="badge badge-danger">Assistido</span>}
                                </td>
                                <td>
                                    <Link className='btn btn-info py-0 mr-2' to={`/series/info/${item.id}`} title='Info'>&#9432;</Link>
                                    <button onClick={() => deleteTvSerie(item.id)} className='btn btn-danger py-0' title='Excluir'>&#10005;</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TvSeries