import React from "react";

export default function Scoreboard({teamName, score}) {
    return (
        <div className="flex flex-col px-5 text-white font-bold w-full h-full items-center justify-center gap-1">
            <span className="text-sm">{teamName}</span>
            <span className="text-3xl">{score}</span>
        </div>
    );
}


// {match.rocketFlow > match.visitante ? (
//     <div className="flex flex-col bg-vitoria items-center justify-evenly">
//         <div className="flex flex-col px-5 text-white font-bold w-full h-full items-center justify-center gap-1 ">
//             <span className="text-sm">RocketFlow</span>
//             <span className="text-3xl">{match.rocketFlow}</span>
//         </div>
//         <div className="flex flex-col px-5 text-white font-bold w-full h-full items-center justify-center gap-1 border-t-2">
//             <span className="text-sm">Visitante</span>
//             <span className="text-3xl">{match.visitante}</span>
//         </div>
//     </div>
// ) : (
//     <div className="flex flex-col bg-derrota items-center justify-evenly">
//         <div className="flex flex-col px-5 text-white font-bold w-full h-full items-center justify-center gap-1 ">
//             <span className="text-sm">RocketFlow</span>
//             <span className="text-3xl">{match.rocketFlow}</span>
//         </div>
//         <div className="flex flex-col px-5 text-white font-bold w-full h-full items-center justify-center gap-1 border-t-2">
//             <span className="text-sm">Visitante</span>
//             <span className="text-3xl">{match.visitante}</span>
//         </div>
//     </div>