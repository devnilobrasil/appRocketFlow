import React from "react";
import PlayersRow from "./PlayersRow";

export default function TablePlayers({ match }) {
    const players = [
        { name: "danilo", data: match.danilo },
        { name: "junin", data: match.junin },
        { name: "nilo", data: match.nilo }
    ]

    return (
        <table className="text-secondary w-full">
            <thead className="py-4">
                <tr className="border-b-2">
                    <th className="py-4">Jogador</th>
                    <th>Pontos</th>
                    <th>Gols</th>
                    <th>Passes</th>
                    <th>Defesas</th>
                    <th>Chutes</th>
                    <th>MVP</th>
                </tr>
            </thead>
            <tbody className="text-center">
                {players.map(player =>
                    player.data && <PlayersRow key={player.name} name={player.name} player={player.data} />
                )}
            </tbody>
        </table>
    );
}


