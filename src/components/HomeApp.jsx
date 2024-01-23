import React, { useState } from 'react'
import { MAPA } from '../utils/mapa'
import '../styles/Home.css'
export const HomeApp = () => {
    const [mapa, setmapa] = useState(MAPA);
    const [player, setplayer] = useState([0, 6]);
    const [direcciones, setDirecciones] = useState([[1, 0], [0, 1], [-1, 0], [0, -1]]);
    const [actual, setActual] = useState(0);
    const [cantidad, setCantidad] = useState('');
    const [sentido, setSentido] = useState(1); 
    const moverPicachu = () => {
        let paso = actual;
        for (let i = 0; i < cantidad; i++) {
            let encontro = false;
            while (!encontro) {
                let x = direcciones[paso][0];
                let y = direcciones[paso][1];
                if (mapa[player[0] + x] && mapa[player[0] + x][player[1] + y] == 5) {
                    setplayer(prev => ([prev[0] + x, prev[1] + y]));
                    encontro = true;
                } else {
                    paso = paso + 1 > 3 ? 0 : paso + 1;
                    if ((-direcciones[actual][0] == direcciones[paso][0]) || (-direcciones[actual][1] == direcciones[paso][1])) {
                        paso = paso + 1 > 3 ? 0 : paso + 1;
                    }
                }
            }
        }
        setActual(paso);
    }

    return (
        <div className='p-3'>
            <div className='panel'>
                <input type="text" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                <button className='ms-2' onClick={() => moverPicachu()}>Mover</button>
            </div>
            <div className="map">
                {
                    mapa.map((y, idY) => (
                        <div className="fila" key={idY}>
                            {
                                y.map((x, idX) => (
                                    <div key={`${idY}${idX}`} className={`columna ${x == 1 ? 'rojo' : (x == 3 ? 'verde' : (x == 4 ? 'amarillo' : (x == 2 ? 'azul' : (x == 5 ? 'camino' : ''))))} ${(idY == player[1] && idX == player[0]) ? 'player' : ''}`}>{ }</div>
                                ))
                            }
                        </div>
                    ))
                }

            </div>
        </div>
    )
}
