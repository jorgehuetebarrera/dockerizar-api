import React, { useState } from 'react';

// Función para generar el árbol de decisiones
const generarArbolDeDecisiones = () => {
  return {
    1: {
      texto: "En la bulliciosa metrópolis de Arcadia, una serie de asesinatos ha sumido a la ciudad en el miedo y la desconfianza. Todo comenzó con la muerte de la prominent socialité, Isabella Montenegro, cuyo cuerpo fue encontrado en su lujoso penthouse con marcas de estrangulamiento.",
      opciones: [
        { texto: "Comenzar la investigación como detective Rafael Cruz.", destino: 2 },
        { texto: "Ignorar la situación y seguir con la rutina diaria.", destino: 3 },
      ],
    },
    2: {
      texto: "El detective Rafael Cruz se encuentra frente al desafío más oscuro de su carrera. Con cada nueva luna, un nuevo cuerpo aparece, cada uno más brutalmente asesinado que el anterior. La única pista que conecta a las víctimas es su participación en un antiguo club secreto llamado 'Las Sombras', un lugar donde los ricos y poderosos se entregan a sus deseos más oscuros.",
      opciones: [
        { texto: "Seguir adelante con la investigación a pesar de los peligros.", destino: 4 },
        { texto: "Dejar la investigación para evitar riesgos personales.", destino: 5 },
      ],
    },
    3: {
      texto: "Al ignorar la situación, Rafael Cruz continúa con su rutina diaria. Sin embargo, la sombra del miedo y la desconfianza se cierne sobre la ciudad mientras los asesinatos continúan. Pronto, se da cuenta de que no puede ignorar el problema por mucho más tiempo.",
      opciones: [
        { texto: "Decidir comenzar la investigación como detective Rafael Cruz.", destino: 2 },
      ],
    },
    4: {
      texto: "Con la presión aumentando y la ciudad al borde del caos, Cruz se sumerge en las profundidades de la noche, siguiendo pistas retorcidas y enfrentándose a peligros inimaginables. Descubre un mundo de intrigas, traiciones y pasiones prohibidas mientras persigue a un asesino que parece estar un paso adelante en todo momento.",
      opciones: [
        { texto: "Continuar con la investigación a pesar de los riesgos.", destino: 6 },
        { texto: "Poner fin a la investigación para proteger su propia seguridad.", destino: 7 },
      ],
    },
    5: {
      texto: "Al optar por alejarse de la investigación, Rafael Cruz elige poner su seguridad por encima de la búsqueda de la verdad. Sin embargo, el peso de la culpa y la responsabilidad lo persigue mientras los asesinatos continúan y la ciudad se sumerge más profundamente en la oscuridad.",
      opciones: [
        { texto: "Volver a la investigación y enfrentar los peligros.", destino: 4 },
      ],
    },
    6: {
      texto: "Decides continuar con valentía la investigación a pesar de los riesgos. Con cada nuevo descubrimiento, te acercas más a la verdad, pero también aumenta el peligro.",
      opciones: [
        { texto: "Seguir adelante con determinación.", destino: 8 },
        { texto: "Poner fin a la investigación para proteger tu propia seguridad.", destino: 7 },
      ],
    },
    7: {
      texto: "Al poner fin a la investigación, decides priorizar tu propia seguridad sobre la búsqueda de la verdad. Sin embargo, la sombra del miedo y la culpa te persigue mientras los asesinatos continúan y la ciudad se sumerge más profundamente en la oscuridad.",
      opciones: [
        { texto: "Volver a la investigación y enfrentar los peligros.", destino: 8 },
      ],
    },
    8: {
      texto: "A medida que profundizas en la investigación, descubres una red de corrupción que se extiende hasta los niveles más altos del poder en Arcadia. Desde políticos corruptos hasta magnates sin escrúpulos, todos parecen tener algo que ocultar y están dispuestos a matar para proteger sus secretos.",
      opciones: [
        { texto: "Continuar desentrañando la red de corrupción.", destino: 9 },
        { texto: "Alejarte de la investigación para protegerte.", destino: 10 },
      ],
    },
    9: {
      texto: "Decides continuar desentrañando la red de corrupción, a pesar de los riesgos. Cada nuevo descubrimiento te acerca más a la verdad, pero también te coloca en el punto de mira de aquellos que harán todo lo posible por proteger sus intereses.",
      opciones: [
        { texto: "Seguir adelante con determinación.", destino: 11 },
        { texto: "Poner fin a la investigación para proteger tu propia seguridad.", destino: 12 },
      ],
    },
    10: {
      texto: "Al alejarte de la investigación, decides priorizar tu seguridad personal. Sin embargo, el peso de la culpa y la responsabilidad te persigue mientras los crímenes continúan y la ciudad se sumerge más profundamente en la oscuridad.",
      opciones: [
        { texto: "Volver a la investigación y enfrentar los peligros.", destino: 11 },
      ],
    },
    11: {
      texto: "Decides seguir adelante con determinación, a pesar de los riesgos. Cada paso te acerca más a la verdad, pero también te coloca en la línea de fuego de aquellos que harán cualquier cosa para proteger sus secretos.",
      opciones: [
        { texto: "Continuar la investigación con valentía.", destino: 13 },
        { texto: "Poner fin a la investigación para proteger tu propia seguridad.", destino: 12 },
      ],
    },
    12: {
      texto: "Al poner fin a la investigación, decides priorizar tu seguridad personal sobre la búsqueda de la verdad. Sin embargo, el peso de la culpa y la responsabilidad te persigue mientras los crímenes continúan y la ciudad se sumerge más profundamente en la oscuridad.",
      opciones: [
        { texto: "Volver a la investigación y enfrentar los peligros.", destino: 13 },
      ],
    },
    13: {
      texto: "Con cada nuevo descubrimiento, te acercas más a la verdad detrás de los asesinatos en Arcadia. Sin embargo, también te das cuenta de que estás en peligro inminente, y cada paso que das te lleva más cerca del enfrentamiento final con el asesino.",
      opciones: [
        { texto: "Continuar la investigación con determinación.", destino: 14 },
        { texto: "Alejarte de la investigación para protegerte.", destino: 15 },
      ],
    },
    14: {
      texto: "Decides seguir adelante con valentía, decidido a descubrir la verdad y detener al asesino antes de que sea demasiado tarde. Cada pista te lleva más cerca del enfrentamiento final, donde la justicia y la verdad finalmente prevalecerán.",
      opciones: [
        { texto: "Prepararse para el enfrentamiento final.", destino: 16 },
      ],
    },
    15: {
      texto: "Al alejarte de la investigación, decides priorizar tu seguridad personal. Sin embargo, el peso de la culpa y la responsabilidad te persigue mientras los crímenes continúan y la ciudad se sumerge más profundamente en la oscuridad.",
      opciones: [
        { texto: "Volver a la investigación y enfrentar los peligros.", destino: 14 },
      ],
    },
    16: {
      texto: "Te preparas mental y físicamente para el enfrentamiento final con el asesino. Sabes que esta será tu última oportunidad para detenerlo y llevar justicia a las víctimas.",
      opciones: [
        { texto: "Enfrentar al asesino y poner fin a su reinado de terror.", destino: 17 },
      ],
    },
    17: {
      texto: "En un enfrentamiento lleno de giros inesperados y revelaciones impactantes, te enfrentas al asesino en un escenario digno de una pesadilla. En medio de la oscuridad y el caos, descubres la verdad detrás de los asesinatos, una verdad que cambiará Arcadia para siempre.",
      opciones: [
        { texto: "Lograr poner fin al reinado de terror del asesino.", destino: 18 },
      ],
    },
    18: {
      texto: "Con el asesino finalmente derrotado y la verdad revelada, sientes un sentido de alivio y justicia cumplida. Sin embargo, sabes que tu trabajo está lejos de terminar.",
      opciones: [
        { texto: "Comprometerse a seguir luchando por un futuro mejor para Arcadia.", destino: 19 },
      ],
    },
    19: {
      texto: "Decides comprometerte a seguir luchando por un futuro mejor para Arcadia, donde la luz pueda finalmente superar a las sombras. Con la ayuda de tus aliados y el apoyo del pueblo, sabes que juntos pueden construir un mundo más justo y seguro para todos.",
      opciones: [
        { texto: "Alejarte hacia el horizonte, listo para enfrentar los desafíos futuros.", destino: 20 },
      ],
    },
    20: {
      texto: "Mientras el sol se pone sobre la ciudad de Arcadia, te alejas hacia el horizonte con determinación, listo para enfrentar los desafíos que el futuro pueda traer. Porque en un mundo lleno de oscuridad, siempre habrá alguien dispuesto a luchar por la luz.",
      opciones: [
        
      ],
    },
  };
};

function ArbolDecisiones() {
  const [nodoActual, setNodoActual] = useState(1); // Estado para almacenar el nodo actual del árbol

  // Función para manejar la selección del usuario
  const handleDecision = (destino) => {
    // Actualizar el nodo actual con el destino de la decisión
    setNodoActual(destino);
  };

  // Obtener el nodo actual del árbol de decisiones
  const nodo = generarArbolDeDecisiones()[nodoActual];

  return (
    <div className="ArbolDecisiones">
      {/* Renderizado del texto del nodo actual */}
      <p>{nodo.texto}</p>
      {/* Renderizado de las opciones de decisión como botones */}
      {nodo.opciones.map((opcion, index) => (
        <button key={index} onClick={() => handleDecision(opcion.destino)}>{opcion.texto}</button>
      ))}
    </div>
  );
}

export default ArbolDecisiones;