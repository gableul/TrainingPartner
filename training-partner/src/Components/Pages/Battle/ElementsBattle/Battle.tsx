import "./Battle.css";
import Menus from './Menus/Menus';
import BarChart from '../../../Bar/BarChart';


function Battle(){
    return (
        <div>
            <div className='containerParagraphe'>
                <p className="paragraphe">Vous etes votre plus grand rival, et qui de mieux que vous pour le surpasser?
                Cette section vous permet de vous comparer avec une ancienne version de vous-même,
                et de mieux constater vos amélioration !</p>
            </div>
            <Menus/>
            <div className='containerBar'>
                <span className="Bar">  
                    <BarChart />
                </span>
            </div>
        </div>
    )
}

export default Battle;