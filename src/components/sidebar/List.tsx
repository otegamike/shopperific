export interface listInterface {
    id: string;
    icon: React.ReactNode;
    label: string;
    active: string;
    handleActive: (e: React.MouseEvent<HTMLLIElement>) => void;
}

function List({id, icon, label, active, handleActive}: listInterface) {
  return (
    <li id={id} className={active === id ? "active" : ""} onClick={handleActive}> 
        <span className="sidebar__item">
            {icon} 
            <span className="label">{label}</span>
        </span>
    </li>
  )
}

export default List