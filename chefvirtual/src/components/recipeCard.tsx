
interface RecipeCardProps {

    title: string;
   
   

}

export const RecipeCard: React.FC<RecipeCardProps>=({ title})=>{ //uso de React.FC pois criei uma interface antes, e ele permite passar propriedades com interface 

     return(
        <div className=" border-4 border-cyan-800 rounded  items-center bg-[#F0F0F0] w-40 p-2 m-auto   ">
            
            <button className="bg-[#B72C00] text-white text-[16px] rounded px-2  w-full "><h3>{title}</h3></button>
            
        
        </div>
     ) 

}
