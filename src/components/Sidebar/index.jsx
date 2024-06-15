import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {

    const location = useLocation();
    const path = '/appRocketFlow'
    const urlCondition = location.pathname !== path
    console.log(urlCondition);

    return (
        <div className="bg-secondary w-56 flex flex-col items-center py-10 font-jaro">
            <div className="w-full text-center">
                <Link className="text-3xl" to={`${path}`}>RocketFlow</Link>
            </div>
            <div className="h-full w-full flex flex-col justify-start pt-20 gap-10">
                <div className='flex flex-col items-center justify-center gap-5'>
                    <Link className='p-4 border-b-2 border-t-2 hover:bg-primary hover:text-secondary border-primary w-full text-center text-primary transition duration-300' to={`${path}/registerMatch`}>Registrar Partidas</Link>
                </div>
                <div className='flex flex-col items-center justify-center gap-5'>
                    <Link className='p-4 border-b-2 border-t-2 hover:bg-primary hover:text-secondary border-primary w-full text-center text-primary transition duration-300' to={`${path}/matches`}>Ver Partidas</Link>
                </div>
                <div className='flex flex-col items-center justify-center gap-5'>
                    <Link className='p-4 border-b-2 border-t-2 hover:bg-primary hover:text-secondary border-primary w-full text-center text-primary transition duration-300' to={`${path}/charts`}>Gráficos</Link>
                </div>
                {/* <div className='flex flex-col items-center justify-center gap-5'>
                    <Link className='p-4 border-b-2 border-t-2 hover:bg-primary hover:text-secondary border-primary w-full text-center text-primary transition duration-300' to="/titles">Títulos</Link>
                </div> */}
            </div>
            <div className="w-full">
                {urlCondition ? (
                    <div className='flex flex-col items-center justify-center gap-5'>
                        <Link className='p-4 border-b-2 border-t-2 hover:bg-primary hover:text-secondary border-primary w-full text-center text-primary transition duration-300' to={`${path}`}>Voltar</Link>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
}