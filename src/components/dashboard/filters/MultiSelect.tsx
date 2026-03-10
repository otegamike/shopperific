




interface MultiSelectListProp {
    name: string,
    value: string | number
}

interface MultiSelectParameterProps {
    list: MultiSelectListProp[],
    selected: string | number,
    all?: string;
    changeSelection: (value: string) => void;
    style?: React.CSSProperties;
    className?: string;
}

export const MultiSelect = ({list, selected, all, changeSelection, style, className}: MultiSelectParameterProps) => {
  
  return (
    <select 
      className={`${className?className:""} filter__btn pill__btn button--tetirary`}
      style={{ transition: "all 0.3s ease-in-out" , ...style}}
      value={selected}
      onChange={(e) => changeSelection(e.target.value)}
    >
      <option value="">{all? all : "All"}</option>
      {list && list.map((option) => (
        <option key={option.name} value={option.value}>{option.name}</option>
      ))}
    </select>
  )
}