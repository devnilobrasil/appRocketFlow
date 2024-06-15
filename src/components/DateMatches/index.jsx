import React, { useEffect, useState } from 'react';

export default function DateMatches({ selectedDate, setSelectedDate }) {
    const [selectedDateLocal, setSelectedDateLocal] = useState("");

    useEffect(() => {
        setSelectedDateLocal(selectedDate);
    }, [selectedDate]);

    const handleDateChange = (event) => {
        const date = event.target.value;
        setSelectedDateLocal(date);
        setSelectedDate(date);
    };

    return (
        <div className="flex gap-5 items-center">
            <label>Selecione a Data da Partida:</label>
            <input
                className="bg-primary cursor-pointer outline-none border-2 border-secondary rounded-lg p-2 text-center"
                type="date"
                name="dateMatch"
                id="dateMatch"
                onChange={handleDateChange}
                value={selectedDateLocal}
                required
            />
        </div>
    );
}
