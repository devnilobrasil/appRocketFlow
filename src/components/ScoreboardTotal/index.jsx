import React from "react";
import PlayersRowScoreboardTotal from "./PlayersRowScoreboardTotal";

export default function ScoreboardTotal({ playerData }) {
    // Lista de jogadores que queremos mostrar na tabela
    const players = [
        { name: "danilo", label: "Danilo" },
        { name: "junin", label: "Junin" },
        { name: "nilo", label: "Nilo" }
    ];

    return (
        <table className="text-secondary w-full">
            <thead className="py-4">
                <tr className="border-b-2 bg-secondary text-primary">
                    <th className="p-6">Jogador</th>
                    <th className="p-6">Pontos</th>
                    <th className="p-6">Gols</th>
                    <th className="p-6">Passes</th>
                    <th className="p-6">Defesas</th>
                    <th className="p-6">Chutes</th>
                    <th className="p-6">MVP</th>
                </tr>
            </thead>
            <tbody className="text-center">
                {players.map(player => (
                    <PlayersRowScoreboardTotal
                        key={player.name}
                        name={player.label}
                        player={playerData[player.name]}
                    />
                ))}
            </tbody>
        </table>
    );
}


