import React from "react"
import "./card.css"

interface StatsCardProp {
    children?: React.ReactNode;
    className?: string;
    cardColor?: string;
    cardBorder?: string;
    cardTextColor?: string;
}

function StatCard({children, className, cardColor, cardBorder, cardTextColor}: StatsCardProp) {
  return (
    <div className={`new__stat__card ${className}`} 
    style={cardColor? { 
        "--card-background-color": cardColor, 
        "--card-border-color": cardBorder, 
        "--card-text-color": cardTextColor 
    } as React.CSSProperties : {}}>
        {children}
    </div>
  )
}

export default StatCard