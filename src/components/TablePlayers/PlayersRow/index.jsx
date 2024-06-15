import React from "react";

export default function PlayersRow({player, name}) {
    return (
        <tr>
            <td className="py-2">{name}</td>
            <td>{player.pontos}</td>
            <td>{player.gols}</td>
            <td>{player.assists}</td>
            <td>{player.defesas}</td>
            <td>{player.chutes}</td>
            <td>{player.mvp ? "Sim" : "Não"}</td>
        </tr>
    );
}
