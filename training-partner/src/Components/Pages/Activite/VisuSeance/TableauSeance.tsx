import { useState } from "react";
import { Seance } from "../../../../Interfaces/Seance";

interface IAttribute {
    name: string;
    value: number;
    }

    const seance: Seance[] = [
    {
        nom: 'Session 1',
        duree : 60,
        date: new Date('2022-05-01T10:30:00'),

    },
    {
        nom: 'Session 2',
        duree : 90,
        date: new Date('2022-05-03T14:00:00'),
      
    },

    ];

    const PAGE_SIZE = 10;   

    const TableauSeance: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePrevPage = () => {
        setCurrentPage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => prev + 1);
    };

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const sessionsToDisplay = seance.slice(startIndex, endIndex);

    const handleSeanceClick = () => {
        console.log("test");
    };


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Nom de la séance</th>
                        <th>Durée</th>
                        <th>Date</th>
                        <th>Action</th>
                     </tr>
                </thead>
                <tbody>
                    {sessionsToDisplay.map((session, index) => (
                    <tr key={index}>
                        <td>{session.nom}</td>
                        <td>{session.duree}</td>
                        <td>{session.date.toLocaleDateString()}</td>
                        <td>
                        <button onClick={() => handleSeanceClick()}>Voir les exercices</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>Précédent</button>
            <button onClick={handleNextPage} disabled={endIndex >= seance.length}>Suivant</button>
        </div>
        </div>
        );
};

export default TableauSeance;