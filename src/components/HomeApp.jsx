import React, { useEffect, useState } from 'react'
import { MAPA } from '../utils/mapa'
import '../styles/Home.css'

export const HomeApp = () => {
    const [mapa, setmapa] = useState(MAPA);
    const [players, setplayers] = useState([{ i: 6, j: 0 }, { i: 0, j: 6 }]);
    const [turno, setTurno] = useState(0);
    const [direcciones, setdirecciones] = useState([
        { dj: 1, di: 0 },
        { dj: 0, di: 1 },
        { dj: -1, di: 0 },
        { dj: 0, di: -1 },
    ])
    const [cantidad, setCantidad] = useState(0)

    const moverPicachu = (cant, last, current) => {

        try {
            if (cant < cantidad) {
                let valido = false;
                let aux = current;
                let next = {};
                while (!valido) {
                    let direccion = direcciones[aux];
                    if (mapa[last.i + direccion.di] && mapa[last.i + direccion.di][last.j + direccion.dj] == 5) {
                        next = { j: last.j + direccion.dj, i: last.i + direccion.di };
                        valido = true;
                    } else {
                        aux = aux + 1 > 3 ? 0 : aux + 1;
                        if (direcciones[aux].di == -direcciones[current].di || direcciones[aux].dj == -direcciones[current].dj) {
                            aux = aux + 1 > 3 ? 0 : aux + 1;
                        }

                    }

                }
                const newplayers = players;
                newplayers[turno] = next;
                setplayers([...newplayers]);
                cant++;
                setTimeout(() => {
                    moverPicachu(cant, next, aux);
                }, 400);
            } else {
                setTurno(prev => (prev + 1 < players.length ? prev + 1 : 0));
            }

        } catch (error) {
            console.log(error);
        }
    }
    const getPlayer = (x, y) => {
        for (const player of players) {
            if (player.i == y && player.j == x) {
                return true;
            }
        }
        return false;
    }
    return (
        <div className='p-3'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className='panel'>
                    <input type="text" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                    <button className='ms-2' onClick={() => moverPicachu(0, players[turno], 0)}>Mover</button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>Turno:</span>
                    <span className='ms-2 fs-1'>{turno + 1}</span>
                </div>
            </div>
            <div className="map">
                {
                    mapa.map((y, idY) => (
                        <div className="fila" key={idY}>
                            {
                                y.map((x, idX) => (
                                    <div key={`${idY}${idX}`} className={`columna ${x == 1 ? 'rojo' : (x == 3 ? 'verde' : (x == 4 ? 'amarillo' : (x == 2 ? 'azul' : (x == 5 ? 'camino' : ''))))} ${getPlayer(idX, idY) ? 'player' : ''}`}>{ }</div>
                                ))
                            }
                        </div>
                    ))
                }

            </div>
        </div>
    )
}
