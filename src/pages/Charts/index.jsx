import React, { useState, useEffect } from 'react';
import ScoresChart from './ScoresChart';
import SavesChart from './SavesChart';
import KicksChart from './KicksChart';
import AssistsChart from './AssistsChart';
import PointsChart from './PointsChart';
import MVPCharts from './MVPCharts';
import ScoreboardTotal from '../../components/ScoreboardTotal';
// Importe os outros componentes de gráfico conforme necessário

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";

const Charts = () => {
    const [selectedSeason, setSelectedSeason] = useState("");
    const seasons = [12, 13, 14, 15];
    const [playerData, setPlayerData] = useState({});

    useEffect(() => {
        if (!selectedSeason) return;

        const loadPlayerData = async () => {
            try {
                const players = ["danilo", "junin", "nilo"];
                const allPlayersData = {};

                const playerRef = collection(db, `Temporada ${selectedSeason}`);
                const playerSnapshot = await getDocs(playerRef);

                playerSnapshot.forEach(doc => {
                    const playerDocument = doc.data();
                    players.forEach(player => {
                        if (playerDocument.hasOwnProperty(player)) {
                            if (!allPlayersData[player]) {
                                allPlayersData[player] = {
                                    gols: 0,
                                    defesas: 0,
                                    assists: 0,
                                    chutes: 0,
                                    pontos: 0,
                                    mvp: 0
                                };
                            }

                            allPlayersData[player].pontos += parseInt(playerDocument[player].pontos) || 0;
                            allPlayersData[player].gols += parseInt(playerDocument[player].gols) || 0;
                            allPlayersData[player].assists += parseInt(playerDocument[player].assists) || 0;
                            allPlayersData[player].defesas += parseInt(playerDocument[player].defesas) || 0;
                            allPlayersData[player].chutes += parseInt(playerDocument[player].chutes) || 0;
                            allPlayersData[player].mvp += playerDocument[player].mvp ? 1 : 0; // Incrementa 1 se for true
                        }
                    });
                });

                // Passa os dados para o estado
                setPlayerData(allPlayersData);
            } catch (error) {
                console.error('Erro ao carregar dados dos jogadores:', error);
            }
        };

        loadPlayerData();
    }, [selectedSeason]);

    

    return (
        <div className="bg-primary w-full h-auto px-10 flex flex-col items-center justify-start gap-14 py-20">
            <div>
                <select className="bg-secondary text-center font-bold p-2 rounded-lg" value={selectedSeason} onChange={(e) => setSelectedSeason(e.target.value)}>
                    <option value="">Selecione uma temporada</option>
                    {seasons.map((season) => (
                        <option key={season} value={season}>
                            Temporada {season}
                        </option>
                    ))}
                </select>
            </div>
            <div className='border-2 border-secondary'>
                <ScoreboardTotal playerData={playerData} />
            </div>
            <div className="grid grid-cols-2 items-center justify-center w-3/4 h-full gap-8">
                <ScoresChart playerData={playerData} />
                <SavesChart playerData={playerData} />
                <AssistsChart playerData={playerData} />
                <KicksChart playerData={playerData} />
            </div>
            <div className='w-full h-full flex items-center justify-center'>
                <PointsChart playerData={playerData} />
                <MVPCharts playerData={playerData} />
            </div>
        </div>
    );
}

export default Charts;
