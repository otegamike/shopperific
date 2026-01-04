import "./card.css"

interface CardProps {
    cardClass?: string;
    content?: React.ReactNode;
    
}

export default function Card({cardClass, content}: CardProps) {
  return (
    <div className={ `card ${cardClass}`}>
        {content}
    </div>
  )
}
