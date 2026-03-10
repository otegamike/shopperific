import Search from "../../contents/search/Search"


interface OrderFilters {
  children?: React.ReactNode;
  dynamic?: boolean;
}


function OrderFilters({children, dynamic}: OrderFilters) {
  return (
    <>
    <div className="filter__container"><div className="filters" style={dynamic?{"--mobile-template": "1fr" } as React.CSSProperties : {"--mobile-template": "1fr auto" } as React.CSSProperties }>
        <Search />
        <div className="filter__btns">
          {children}
        </div>
      </div></div>
    </>
  )
}

export default OrderFilters