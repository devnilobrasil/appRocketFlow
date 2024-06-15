import React from "react";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell, Legend } from "recharts";

const PointsChart = ({ playerData }) => {
    const chartData = Object.keys(playerData).map(player => ({
        name: player,
        pontos: playerData[player].pontos // Acessa os pontos do jogador na temporada
    }));

    const COLORS = ["#ffc300", "#0466c8", "#38b000"]; // Cores para as fatias do gráfico

    return (
        <div className="flex flex-col w-full items-center justify-center gap-8">
            <h1 className="text-3xl text-white font-bold">PONTOS</h1>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="pontos"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        label
                    >
                        {
                            chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))
                        }
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default PointsChart;
