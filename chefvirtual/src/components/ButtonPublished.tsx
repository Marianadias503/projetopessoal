import { tv } from 'tailwind-variants';

// Definindo a interface do botão e usando o extends React.ButtonHTMLAttributes<HTMLButtonElement>
// para disponibilizar todas as propriedades de um componente button
interface ButtonPublishedProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  color: "primary" | "secondary";  
}

// Configurando o botão
const button = tv({
  base: 'rounded px-3 h-7 mr-5', 
  variants: {
    color: {
      primary: 'bg-[#F05050]',
      secondary: 'bg-purple-500',
    }
  }
});

// Uso do ...rest, pois quero passar para o botão apenas a color e title, caso usasse a props,
// eu teria que passar todas as propriedades do button manualmente, pois ela pega todas as propriedades,
// diferente do rest, que pega todas, porém exige que seja passado apenas os atributos extraídos
export const ButtonPublished: React.FC<ButtonPublishedProps> = ({ title, color, ...rest }) => {
  return (
    <button className={`${button({ color })}`} {...rest}>
      {title}
    </button>
  );
};
