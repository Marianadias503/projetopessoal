import React from "react";

interface ButtonPublishedProps {
  title: string;
  color: string; 
  textcolor?:string;
  position?: string; 
  top?: string; 
  left?: string; 
  right?: string; 
  bottom?: string; 
  className?: string;

}

export const ButtonPublished: React.FC<ButtonPublishedProps> = ({
  title,
  color,
  textcolor,
  position,
  top,
  left,
  right,
  bottom,
className,

}) => {
  return (
    <button
      className={`rounded px-3 h-7 mr-5 ${className} ${position} ${top} ${left} ${right} ${bottom}`} //estilos usando classes do tailwind 
      style={{backgroundColor:color, color:textcolor,}}//los fora do tailwid, usado para valores dinâmicos
    >
      {title}
    </button>
  );
};
