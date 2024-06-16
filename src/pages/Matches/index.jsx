import { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import TablePlayers from "../../components/TablePlayers";
import Scoreboard from "../../components/Scoreboard";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Matches() {
    const [dates, setDates] = useState([]); // Estado para armazenar as datas dos jogos cadastrados
    const [selectedDate, setSelectedDate] = useState(""); // Estado para armazenar a data selecionada
    const [selectedSeason, setSelectedSeason] = useState(""); // Estado para armazenar a temporada selecionada
    const [matches, setMatches] = useState([]); // Estado para armazenar as informações dos jogos correspondentes à data selecionada e temporada

    const seasons = [12, 13, 14, 15]; // Temporadas disponíveis

    // Função para carregar as datas dos jogos cadastrados no banco de dados
    const loadDates = async () => {
        if (!selectedSeason) return; // Se não houver temporada selecionada, retorna

        const datesRef = collection(db, `Temporada ${selectedSeason}`);
        const datesQuery = query(datesRef, where("selectedDate", "!=", null)); // Não é necessário adicionar a condição da temporada, pois já estamos consultando na coleção correta
        const datesSnapshot = await getDocs(datesQuery);
        const datesData = datesSnapshot.docs.map(doc => doc.data().selectedDate); // Extrai os valores de selectedDate
        // Filtra as datas únicas
        const uniqueDates = Array.from(new Set(datesData));
        setDates(uniqueDates);
    };

    // Função para carregar os jogos correspondentes à data selecionada
    const loadMatches = async () => {
        if (selectedDate && selectedSeason) {
            const matchesRef = collection(db, `Temporada ${selectedSeason}`);
            const matchesQuery = query(matchesRef, where("selectedDate", "==", selectedDate));
            const matchesSnapshot = await getDocs(matchesQuery);
            const matchesData = matchesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            // Ordenar os dados pelo número da partida extraído do ID
            matchesData.sort((a, b) => {
                const numA = parseInt(a.id.split('_').pop());
                const numB = parseInt(b.id.split('_').pop());
                return numA - numB;
            });
            setMatches(matchesData);
        }
    };

    useEffect(() => {
        loadDates(); // Carrega as datas dos jogos quando o componente é montado
    }, [selectedSeason]); // Atualiza as datas quando a temporada selecionada é alterada

    useEffect(() => {
        loadMatches(); // Carrega os jogos correspondentes à data selecionada
    }, [selectedDate, selectedSeason]); // Atualiza os jogos quando a data selecionada ou a temporada selecionada é alterada

    return (
        <div className="bg-primary w-full h-screen px-10 flex flex-col items-center justify-start gap-14 py-20">
            {/* Dropdown para selecionar a temporada */}
            <select className="bg-secondary text-center font-bold p-2 rounded-lg" value={selectedSeason} onChange={(e) => setSelectedSeason(e.target.value)}>
                <option value="">Selecione uma temporada</option>
                {seasons.map(season => (
                    <option key={season} value={season}>Temporada {season}</option>
                ))}
            </select>

            {/* Dropdown para selecionar a data */}
            <select className="bg-secondary text-center font-bold p-2 rounded-lg" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                <option value="">Selecione uma data</option>
                {dates.map(date => (
                    <option key={date} value={date}>{date}</option>
                ))}
            </select>

            <div className="w-full grid grid-cols-2 px-6 h-full overflow-y-scroll py-5 place-items-center gap-10">
                {matches.map((match, index) => {
                    const isRocketFlowWinning = match.rocketFlow > match.visitante;
                    const partidaNumber = match.id.split('_').pop();
                    return (
                        <div key={index} className="border-2 w-full border-secondary flex">
                            <div className="w-full">
                                <div className="relative border-2 border-secondary">
                                    <h2 className="bg-secondary font-jaro text-center">Partida {partidaNumber}</h2>
                                </div>
                                <div className="flex">
                                    <TablePlayers match={match} />
                                    <div
                                        className={`flex flex-col items-center justify-evenly w-1/4 ${isRocketFlowWinning ? 'bg-vitoria' : 'bg-derrota'}`}
                                    >
                                        <Scoreboard teamName="RocketFlow" score={match.rocketFlow} />
                                        <div className="flex flex-col px-5 text-white font-bold w-full h-full items-center justify-center gap-1 border-t-2">
                                            <Scoreboard teamName="Visitante" score={match.visitante} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div >
    );
}
