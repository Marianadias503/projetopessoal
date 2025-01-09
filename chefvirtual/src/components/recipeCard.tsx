
interface RecipeCardProps {

    imageUrl: string;
    title: string;
   
   

}

export const RecipeCard: React.FC<RecipeCardProps>=({imageUrl, title})=>{ //uso de React.FC pois criei uma interface antes, e ele permite passar propriedades com interface 

     return(
        <div className=" border-4 border-cyan-800 rounded  items-center bg-[#F0F0F0] w-40 p-2 m-auto   ">
            <img className="mb-5 w-1/2 m-auto mt-4" src={imageUrl} alt="recipe" />
            <button className="bg-[#B72C00] text-white text-[16px] rounded px-2  w-full "><h3>{title}</h3></button>
            
        
        </div>
     ) 

}
