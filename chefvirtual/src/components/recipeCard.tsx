
interface RecipeCardProps {

    imageUrl: string;
    title: string;
    type: 'salgada' | 'doce';

}

export const RecipeCard: React.FC<RecipeCardProps>=({imageUrl, title,type})=>{ //uso de React.FC pois criei uma interface antes, e ele permite passar propriedades com interface 

     return(
        <div className=" card">
            <img src={imageUrl} alt={title}/>
            <div className="card-content">
                <h3>{title}</h3>
                <a href="#" className={`btn ${type}`}> Acessar receita</a>

            </div>
        </div>
     )

}
