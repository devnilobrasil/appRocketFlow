import React, { useState, useEffect } from 'react';
import ScoresChart from './ScoresChart';
import SavesChart from './SavesChart';
import KicksChart from './KicksChart';
import AssistsChart from './AssistsChart';
import PointsChart from './PointsChart';
import MVPCharts from './MVPCharts';
import ScoreboardTotal from '../../components/ScoreboardTotal';
import { GoleiroImg, ArtilheiroImg, AssistenteImg, MVPImg } from '../../components/ImagesApp';
// Importe os outros componentes de gráfico conforme necessário

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";


const determineTopPlayers = (allPlayersData, stat) => {
    let maxStat = -1;
    let topPlayers = [];
    Object.keys(allPlayersData).forEach(player => {
        if (allPlayersData[player][stat] > maxStat) {
            maxStat = allPlayersData[player][stat];
            topPlayers = [player];
        } else if (allPlayersData[player][stat] === maxStat) {
            topPlayers.push(player);
        }
    });
    return topPlayers;
};

const Charts = () => {
    const [selectedSeason, setSelectedSeason] = useState("");
    const seasons = [12, 13, 14, 15];
    const [playerData, setPlayerData] = useState({});
    const [topScorers, setTopScorers] = useState([]);
    const [topMVPs, setTopMVPs] = useState([]);
    const [topAssistants, setTopAssistants] = useState([]);
    const [topDefenders, setTopDefenders] = useState([]);

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

                // Determine top players for each stat
                const topScorers = determineTopPlayers(allPlayersData, 'gols');
                const topMVPs = determineTopPlayers(allPlayersData, 'mvp');
                const topAssistants = determineTopPlayers(allPlayersData, 'assists');
                const topDefenders = determineTopPlayers(allPlayersData, 'defesas');

                // Update states
                setPlayerData(allPlayersData);
                setTopScorers(topScorers);
                setTopMVPs(topMVPs);
                setTopAssistants(topAssistants);
                setTopDefenders(topDefenders);
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
            <div className='grid grid-cols-4 w-2/3 place-items-center gap-8'>
                <div className='flex py-4 rounded-2xl bg-greyDark border-2 w-full items-center justify-center text-center gap-5'>
                    <div className='w-12'><ArtilheiroImg /></div>
                    <p className='text-secondary font-bold text-xl'>{topScorers.join(', ').toUpperCase()}</p>
                </div>
                <div className='flex py-4 rounded-2xl bg-greyDark border-2 w-full items-center justify-center text-center gap-5'>
                    <div className='w-12'><GoleiroImg /></div>
                    <p className='text-secondary font-bold text-xl'>{topDefenders.join(', ').toUpperCase()}</p>
                </div>
                <div className='flex py-4 rounded-2xl bg-greyDark border-2 w-full items-center justify-center text-center gap-5'>
                    <div className='w-12'><AssistenteImg /></div>
                    <p className='text-secondary font-bold text-xl'>{topAssistants.join(', ').toUpperCase()}</p>
                </div>
                <div className='flex py-4 rounded-2xl bg-greyDark border-2 w-full items-center justify-center text-center gap-5'>
                    <div className='w-12'><MVPImg /></div>
                    <p className='text-secondary font-bold text-xl'>{topMVPs.join(', ').toUpperCase()}</p>
                </div>
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
