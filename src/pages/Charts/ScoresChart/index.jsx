import React from "react";
import {
    BarChart,
    Bar,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    LabelList,
} from "recharts";

const ScoresChart = ({ playerData }) => {
    // Estrutura os dados para o gráfico
    const chartData = Object.keys(playerData).map((player, index) => ({
        name: player,
        gols: playerData[player].gols, // Acessa a soma dos gols do jogador na temporada
    }));

    // Componente personalizado para definir o estilo do texto das labels
    const CustomizedLabel = ({ x, y, width, value }) => (
        <text x={x + width / 2} y={y - 10} fill="#fff" textAnchor="middle">
            {value}
        </text>
    );

    // Estilo personalizado para o tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-vitoria text-white p-2 rounded-md">
                    <p className="label">{`${label} : ${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="flex flex-col w-full items-center justify-center gap-8">
            <h1 className="text-3xl text-white font-bold">GOLS</h1>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                    <XAxis dataKey="name" tick={{ fill: "#fff" }} axisLine={{ stroke: "#fff" }} />
                    <YAxis tick={{ fill: "#fff" }} axisLine={{ stroke: "#fff" }} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "#343a40" }} />
                    <Bar dataKey="gols" fill="#ffc300">
                        <LabelList dataKey="gols" position="top" content={<CustomizedLabel />} />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ScoresChart;
