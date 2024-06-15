import React, { useEffect, useState } from 'react';

export default function SeasonDropdown({ selectedSeason, setSelectedSeason }) {
    const [selectedSeasonLocal, setSelectedSeasonLocal] = useState("");

    useEffect(() => {
        setSelectedSeasonLocal(selectedSeason);
    }, [selectedSeason]);

    const handleSeasons = (event) => {
        const season = event.target.value;
        setSelectedSeasonLocal(season);
        setSelectedSeason(season);
    }

    return (
        <div className='flex gap-5 items-center'>
            <label htmlFor="season-select">Escolha a temporada:</label>
            <select
                className='bg-primary border-2 rounded-lg p-2'
                id="season-select"
                onChange={handleSeasons}
                value={selectedSeasonLocal}
                required
            >
                <option value="" disabled hidden>Selecione uma temporada</option>
                {[12, 13, 14, 15].map(season => (
                    <option key={season} value={season}>Temporada {season}</option>
                ))}
            </select>
        </div>
    );
}
