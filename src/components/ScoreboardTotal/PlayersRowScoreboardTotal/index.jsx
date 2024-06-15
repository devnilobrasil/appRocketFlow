import React from "react";

const PlayersRowScoreboardTotal = ({ player, name }) => {
    // Verifica se player ou name são nulos ou indefinidos
    if (!player || !name) {
        return null; // Retorna null se player ou name não estiverem definidos
    }

    // Obtém a quantidade total de MVP (já acumulada)
    const mvpCount = player.mvp || 0; // Supondo que player.mvp contém a contagem total de MVPs

    return (
        <tr>
            <td className="py-2">{name}</td>
            <td>{player.pontos || 0}</td>
            <td>{player.gols || 0}</td>
            <td>{player.assists || 0}</td>
            <td>{player.defesas || 0}</td>
            <td>{player.chutes || 0}</td>
            <td>{mvpCount}</td>
        </tr>
    );
}

export default PlayersRowScoreboardTotal;
