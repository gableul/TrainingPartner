import { useEffect, useState } from "react";
import { Muscu } from "../../../../Interfaces/Muscu";
import { Escalade } from "../../../../Interfaces/Escalade";
import { Course } from "../../../../Interfaces/Course";

interface Donneeback{
    idGraph : number;
    typeGraph : string;
    nomSport : string;
    titre : string;
    donneeGraph : (Muscu | Escalade | Course)[];
};

 

type Seance = {
    nom: string;
    duree : string;
    date: string;
    exercices: Course[];
};

const TableCourse = () => {
    //state gerzant la page affiche
    const [currentPage, setCurrentPage] = useState(1);
    const [dataFromBack, setDataFromBack] = useState<Donneeback[]>()

    useEffect(() => {
        const user = localStorage.getItem('user')
        const fetchDonnee = async () => {
            try{
                const reponse = await fetch(`http://localhost:3001/seance/seances`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({pseudo : user})
                });
                var donnee = await reponse.json();
                if(donnee){
                    setDataFromBack(donnee);
                }
            }
            catch(error){
                console.error(error);
            }
        }
        fetchDonnee();
    },[]);

    
    const [seances, setSeances] = useState<Seance[]>([//state contenat un tableau de senace chaque seance doit contenir un tableau des exercices qui lui sont liés
        {
        nom: "Session 1",
        duree :"01:30",
        date:"20 mai",
        exercices: [
            {
            distance: 30,
            vitesse: 3,
            nom:"DC",
            bpm : 80,
            chrono: "00:30"
            },
            {
            nom: "Squat",
            distance: 3,
            vitesse: 8,
            bpm: 100,
            chrono:"00:00"
            },
        ],
        },
        {
        nom: "Session 2",
        duree :"01:30",
        date:"20 mai",
        exercices: [
            {
            distance: 30,
            vitesse: 3,
            nom:"DC",
            bpm : 80,
            chrono: "00:30"
            },
            {
            nom: "Squat",
            distance: 3,
            vitesse: 8,
            bpm: 100,
            chrono:"00:00"
            },
        ],
        },
    ]);

    const [selectedSession, setSelectedSession] = useState<Seance | null>(null);
    const [selectedExercise, setSelectedExercise] = useState<Course | null>(null);

    const handleSessionClick = (seance: Seance) => {
        if (seance==selectedSession){
            setSelectedSession(null);
        }else{
            setSelectedSession(seance);
        };
        setSelectedExercise(null);
    };

    const handleExerciseClick = (exercice: Course) => {
        if (exercice== selectedExercise){
            setSelectedExercise(null);
        }else{
        setSelectedExercise(exercice);
        }
    };
    let i=0;
    return (
        <div className="TabSeance">
        <h2 className="tabSeanceVisu">Séances</h2>
        <table className="tableSeanceVisu">
            <thead className="theadSeanceVisu">
            <tr>
                <th scope="col" id="NumSeance"></th>
                <th scope="col">Nom</th>
                <th scope="col">Duree</th>
            </tr>
            </thead>
            <tbody>
            {seances.map((seance) => (
                <tr key={seance.nom} onClick={() => handleSessionClick(seance)}>
                     <td>{++i}</td>
                    <td>{seance.nom}</td>
                    <td>{seance.duree}</td>
                </tr>
            ))}
            </tbody>
        </table>

        {selectedSession && (
            <div>
            <h2 className="ListeExVisu">{selectedSession.nom}</h2>
            <table className="tableListEx">
                <thead>
                <tr>
                    <th scope="col">Nom</th>
                    <th scope="col"> Aperçu</th>
                </tr>
                </thead>
                <tbody>
                {selectedSession.exercices.map((exercice) => (
                    <tr
                    key={exercice.nom}
                    onClick={() => handleExerciseClick(exercice)}
                    >
                    <td>{exercice.nom}</td>
                    <td>{exercice.distance}km     {exercice.chrono}min</td>
                    </tr>
                ))}
                    <td></td>
                </tbody>
            </table>
            </div>
        )}

        {selectedExercise && (
            <div>
            <h2 className="detailsExVisu">Détails de {selectedExercise.nom}</h2>
            <table className="tableDetailsEx">
                <thead>
                    <tr>
                        <th scope="col">Distance</th>
                        <th scope="col">Vitesse</th>
                        <th scope="col">Rythe Cardiaque</th>
                        <th scope="col">Chrono</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{selectedExercise.distance} km</td>

                    <td>{selectedExercise.vitesse} km/h</td>

                    <td>{selectedExercise.bpm} bpm</td>

                    <td>{selectedExercise.chrono} min</td>
                </tr>
                </tbody>
            </table>
            </div>
        )}
        </div>
    );
};

export default TableCourse;