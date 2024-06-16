import DateMatches from "../../components/DateMatches";
import SeasonDropdown from "../../components/SeasonDropdown";
import { db } from "../../utils/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useState } from "react";
import rocketImage from '../../assets/images/rocketleague.webp'

export default function RegisterMatches() {
    const [formData, setFormData] = useState({
        danilo: { pontos: "", gols: "", assists: "", defesas: "", chutes: "", mvp: false },
        junin: { pontos: "", gols: "", assists: "", defesas: "", chutes: "", mvp: false },
        nilo: { pontos: "", gols: "", assists: "", defesas: "", chutes: "", mvp: false },
        rocketFlow: "",
        visitante: "",
        selectedDate: "",
        season: "",
        result: "",
    });


    const resetFormData = () => {
        setFormData( prevState =>({
            ...prevState,
            danilo: { pontos: "", gols: "", assists: "", defesas: "", chutes: "", mvp: false },
            junin: { pontos: "", gols: "", assists: "", defesas: "", chutes: "", mvp: false },
            nilo: { pontos: "", gols: "", assists: "", defesas: "", chutes: "", mvp: false },
            rocketFlow: "",
            visitante: "",
            result: "",
        }));
    };

    const handleRegister = async () => {
        try {
            // Verifica se a temporada está selecionada
            if (!formData.season) {
                alert("Selecione uma temporada.");
                return;
            } else if (!formData.selectedDate) {
                alert("Selecione uma data.");
                return;
            }

            if (formData.rocketFlow > formData.visitante) {
                formData.result = "vitoria"
            } else {
                formData.result = "derrota"
            }
            
            // Referência para a coleção da temporada selecionada
            const collectionRef = collection(db, `Temporada ${formData.season}`);

            // Query para encontrar todas as partidas na mesma temporada e data
            const q = query(collectionRef, where('selectedDate', '==', formData.selectedDate));
            const querySnapshot = await getDocs(q);

            // Número da partida baseado no número de documentos encontrados
            const numeroPartida = querySnapshot.size + 1;

            // Extrair dia e mês da data selecionada
            const selectedDate = new Date(formData.selectedDate);
            const dia = String(selectedDate.getDate()).padStart(2, '0');
            const mes = String(selectedDate.getMonth() + 1).padStart(2, '0'); // getMonth() retorna 0 para janeiro

            // Construir o ID no formato desejado
            const docId = `temp_${formData.season}_${dia}${mes}_${numeroPartida}`;

            // Adicionar o documento com o ID customizado
            await addDoc(collectionRef, { ...formData, id: docId });

            alert("Partida registrada com sucesso.");
            resetFormData();
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const limitarCaracteres = (event, limite) => {
        const input = event.target;
        let value = input.value;

        // Remove qualquer caractere não numérico
        const numericValue = value.replace(/[^0-9]/g, '');

        // Limitar ao número máximo de caracteres
        const limitedValue = numericValue.slice(0, limite);

        // Atualizar o valor do input para refletir o valor limitado
        input.value = limitedValue;
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const keys = name.split('.');

        setFormData(prevState => {
            if (keys.length === 2) {
                return {
                    ...prevState,
                    [keys[0]]: {
                        ...prevState[keys[0]],
                        [keys[1]]: type === "checkbox" ? checked : value
                    }
                };
            } else {
                return {
                    ...prevState,
                    [name]: type === "checkbox" ? checked : value
                };
            }
        });
    };



    return (
        <div className="bg-primary text-secondary font-jaro w-full h-screen flex flex-col justify-center items-center gap-10">
            <div className="flex w-full items-center justify-center gap-10">
                <SeasonDropdown
                    selectedSeason={formData.season}
                    setSelectedSeason={(season) => setFormData(prevState => ({ ...prevState, season }))}
                />
                <DateMatches
                    selectedDate={formData.selectedDate}
                    setSelectedDate={(date) => setFormData(prevState => ({ ...prevState, selectedDate: date }))}
                />
            </div>
            <div className="max-w-screen-xl flex flex-col gap-8 ">
                <div className="grid grid-cols-1 place-items-center gap-8">
                    {/* Danilo */}
                    <div className="flex items-center justify-center h-full gap-4">
                        <div className="flex border-2 w-32 overflow-hidden items-center justify-center rounded-lg h-full">
                            <img className="object-cover  h-full" src={rocketImage} alt="" />
                        </div>
                        <table className="border-2 rounded-lg border-secondary w-full flex flex-col">
                            <tbody>
                                <tr className="flex border-b-2 border-secondary justify-center text-center w-full py-2 text-2xl">Danilo</tr>
                                <tr className="text-center  bg-secondary text-primary">
                                    <td className="w-40">Pontos</td>
                                    <td className="w-40">Gols</td>
                                    <td className="w-40">Passes</td>
                                    <td className="w-40">Defesas</td>
                                    <td className="w-40">Chutes</td>
                                    <td className="w-40">MVP</td>
                                </tr>
                                <tr className="h-full">
                                    <td>
                                        <input
                                            className="outline-none bg-primary border-r-2 p-2 text-center"
                                            type="number"
                                            name="danilo.pontos"
                                            id="pontosDanilo"
                                            onInput={(event) => limitarCaracteres(event, 4)}
                                            onChange={handleInputChange}
                                            value={formData.danilo.pontos}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="outline-none bg-primary border-r-2 p-2 text-center"
                                            type="text"
                                            name="danilo.gols"
                                            id="golsDanilo"
                                            onInput={(event) => limitarCaracteres(event, 2)}
                                            onChange={handleInputChange}
                                            value={formData.danilo.gols}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="outline-none bg-primary border-r-2 p-2 text-center"
                                            type="text"
                                            name="danilo.assists"
                                            id="assistsDanilo"
                                            onInput={(event) => limitarCaracteres(event, 2)}
                                            onChange={handleInputChange}
                                            value={formData.danilo.assists}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="outline-none bg-primary border-r-2 p-2 text-center"
                                            type="text"
                                            name="danilo.defesas"
                                            id="defesasDanilo"
                                            onInput={(event) => limitarCaracteres(event, 2)}
                                            onChange={handleInputChange}
                                            value={formData.danilo.defesas}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="outline-none bg-primary border-r-2 p-2 text-center"
                                            type="text"
                                            name="danilo.chutes"
                                            id="chutesDanilo"
                                            onInput={(event) => limitarCaracteres(event, 2)}
                                            onChange={handleInputChange}
                                            value={formData.danilo.chutes}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="w-full flex items-center !bg-secondary outline-none justify-center checked:bg-secondary cursor-pointer"
                                            type="checkbox"
                                            name="danilo.mvp"
                                            id="mvpDanilo"
                                            onChange={handleInputChange}
                                            checked={formData.danilo.mvp}
                                            required
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* Junin */}
                    <div className="flex items-center justify-center h-full gap-4">
                        <div className="flex border-2 w-32 overflow-hidden items-center justify-center rounded-lg h-full">
                            <img className="object-cover  h-full" src={rocketImage} alt="" />
                        </div>
                        <table className="border-2 rounded-lg border-secondary w-full flex flex-col">
                            <tbody>
                                <tr className="flex border-b-2 border-secondary justify-center text-center w-full py-2 text-2xl">Junin</tr>
                                <tr className="text-center  bg-secondary text-primary">
                                    <td className="w-40">Pontos</td>
                                    <td className="w-40">Gols</td>
                                    <td className="w-40">Passes</td>
                                    <td className="w-40">Defesas</td>
                                    <td className="w-40">Chutes</td>
                                    <td className="w-40">MVP</td>
                                </tr>
                                <tr className="h-full">
                                    <td>
                                        <input
                                            className="outline-none bg-primary border-r-2 p-2 text-center"
                                            type="number"
                                            name="junin.pontos"
                                            id="juninPontos"
                                            onInput={(event) => limitarCaracteres(event, 4)}
                                            onChange={handleInputChange}
                                            value={formData.junin.pontos}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="outline-none bg-primary border-r-2 p-2 text-center"
                                            type="text"
                                            name="junin.gols"
                                            id="juninGols"
                                            onInput={(event) => limitarCaracteres(event, 2)}
                                            onChange={handleInputChange}
                                            value={formData.junin.gols}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="outline-none bg-primary border-r-2 p-2 text-center"
                                            type="text"
                                            name="junin.assists"
                                            id="juninAssists"
                                            onInput={(event) => limitarCaracteres(event, 2)}
                                            onChange={handleInputChange}
                                            value={formData.junin.assists}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="outline-none bg-primary border-r-2 p-2 text-center"
                                            type="text"
                                            name="junin.defesas"
                                            id="juninDefesas"
                                            onInput={(event) => limitarCaracteres(event, 2)}
                                            onChange={handleInputChange}
                                            value={formData.junin.defesas}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="outline-none bg-primary border-r-2 p-2 text-center"
                                            type="text"
                                            name="junin.chutes"
                                            id="juninChutes"
                                            onInput={(event) => limitarCaracteres(event, 2)}
                                            onChange={handleInputChange}
                                            value={formData.junin.chutes}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="w-full flex items-center !bg-secondary outline-none justify-center checked:bg-secondary cursor-pointer"
                                            type="checkbox"
                                            name="junin.mvp"
                                            id="juninMvp"
                                            onChange={handleInputChange}
                                            checked={formData.junin.mvp}
                                            required
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* Nilo */}
                    <div className="flex items-center justify-center h-full gap-4">
                        <div className="flex border-2 w-32 overflow-hidden items-center justify-center rounded-lg h-full">
                            <img className="object-cover  h-full" src={rocketImage} alt="" />
                        </div>
                        <table className="border-2 rounded-lg border-secondary w-full flex flex-col">
                            <tbody>
                                <tr className="flex border-b-2 border-secondary justify-center text-center w-full py-2 text-2xl">Nilo</tr>
                                <tr className="text-center  bg-secondary text-primary">
                                    <td className="w-40">Pontos</td>
                                    <td className="w-40">Gols</td>
                                    <td className="w-40">Passes</td>
                                    <td className="w-40">Defesas</td>
                                    <td className="w-40">Chutes</td>
                                    <td className="w-40">MVP</td>
                                </tr>
                                <tr className="h-full">
                                    <td>
                                        <input
                                            className="outline-none bg-primary border-r-2 p-2 text-center"
                                            type="number"
                                            name="nilo.pontos"
                                            id="niloPontos"
                                            onInput={(event) => limitarCaracteres(event, 4)}
                                            onChange={handleInputChange}
                                            value={formData.nilo.pontos}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="outline-none bg-primary border-r-2 p-2 text-center"
                                            type="text"
                                            name="nilo.gols"
                                            id="niloGols"
                                            onInput={(event) => limitarCaracteres(event, 2)}
                                            onChange={handleInputChange}
                                            value={formData.nilo.gols}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="outline-none bg-primary border-r-2 p-2 text-center"
                                            type="text"
                                            name="nilo.assists"
                                            id="niloAssists"
                                            onInput={(event) => limitarCaracteres(event, 2)}
                                            onChange={handleInputChange}
                                            value={formData.nilo.assists}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="outline-none bg-primary border-r-2 p-2 text-center"
                                            type="text"
                                            name="nilo.defesas"
                                            id="niloDefesas"
                                            onInput={(event) => limitarCaracteres(event, 2)}
                                            onChange={handleInputChange}
                                            value={formData.nilo.defesas}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="outline-none bg-primary border-r-2 p-2 text-center"
                                            type="text"
                                            name="nilo.chutes"
                                            id="niloChutes"
                                            onInput={(event) => limitarCaracteres(event, 2)}
                                            onChange={handleInputChange}
                                            value={formData.nilo.chutes}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="w-full flex items-center !bg-secondary outline-none justify-center checked:bg-secondary cursor-pointer"
                                            type="checkbox"
                                            name="nilo.mvp"
                                            id="niloMvp"
                                            onChange={handleInputChange}
                                            checked={formData.nilo.mvp}
                                            required
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* Resultado */}
                    <div className="flex flex-col overflow-hidden items-center gap-5 rounded-lg border-2 w-1/2 self-center">
                        <h1 className="bg-secondary w-full text-primary text-3xl text-center">Resultado</h1>
                        <div className="flex gap-8 pb-5">
                            <div className="flex flex-col items-center gap-3 justify-center">
                                <label className="text-xl" name="RocketFlow">RocketFlow</label>
                                <input
                                    className="p-2 w-24 max-w-48 text-center bg-secondary text-primary text-5xl outline-none border-2 border-secondary rounded-md"
                                    type="number"
                                    name="rocketFlow"
                                    id="rocketFlow"
                                    onInput={(event) => limitarCaracteres(event, 2)}
                                    onChange={handleInputChange}
                                    value={formData.rocketFlow}
                                    required
                                />
                            </div>
                            <div className="flex flex-col items-center gap-3 justify-center">
                                <label className="text-xl" name="visitante">Visitante</label>
                                <input
                                    className="p-2 w-24 max-w-48 text-center bg-secondary text-primary text-5xl outline-none border-2 border-secondary rounded-md"
                                    type="number"
                                    name="visitante"
                                    id="visitante"
                                    onInput={(event) => limitarCaracteres(event, 2)}
                                    onChange={handleInputChange}
                                    value={formData.visitante}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-10">
                <button className="bg-secondary py-4 px-10 text-primary rounded-lg" onClick={resetFormData}>Limpar</button>
                <button className="bg-secondary py-4 px-10 text-primary rounded-lg" onClick={handleRegister}>Registrar</button>
            </div>
        </div>
    );


}
