import { useState } from 'react';
import './Auth.css';

function Head(props : any){
    const [isCLicked, setIsClicked] = useState(false);

    //Fonction pour changer l'état de la variable isClicked lorsque l'utilisateur clique sur le bouton
    const handleClick = () => {
        setIsClicked(!isCLicked);
    }

    //Définition de la fonction Auth qui prend un nombre en argument et qui change la page en fonction de ce nombre avec la fonction onPageChange passé en props
    const Auth =(nbr : number) => {props.onPageChange(nbr)}

    //Définition des fonctions qui appellent la fonction Auth avec un nombre différent pour changer la page
    const signUp = ()=> {Auth(0); console.log("passe dans signUp")}
    const login =()=> {Auth(1);console.log("passe dans login")}
    const forgotPassword =()=> {Auth(2);console.log("passe dans forgotPassword")}

    return ( 
        <div>
            <nav className="navigation" onClick={handleClick}>
                <h1>TrainingPartner</h1>
                <ul>
                    <li><button className="nav" onClick={()=>{signUp()}}>Inscription</button></li>
                    <li><button className="nav" onClick={()=>{login()}}>Connexion</button></li>
                </ul>
            </nav>
        </div>
    )
}

export default Head;