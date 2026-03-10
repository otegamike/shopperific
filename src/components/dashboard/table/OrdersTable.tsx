import { motion, AnimatePresence } from "framer-motion";
import "./table.css";
import type { OrderDataInterface} from "../../../types/OrderInterface";
import useMediaQuery from "../../../hooks/useMediaQuery";

type OrdersTableProps = {
    ordersData: OrderDataInterface[];
}

const initialTableColumns: {key: keyof OrderDataInterface, width: string}[] = [
    {key:"image", width: "1fr"},
    {key:"productName", width: "1.5fr"}, 
    {key:"orderId", width: "1fr"}, 
    {key:"date", width: "1fr"}, 
    {key:"quantity", width: "0.8fr"}, 
    {key:"price", width: "1fr"},
    {key:"status", width: "1fr"} 
];


export default function OrdersTable({ ordersData }: OrdersTableProps) {
    
    const isMobile = useMediaQuery(768);
    const mobileTableColumns = initialTableColumns.filter(({key}) => key !== "orderId");
    const tableColumns = isMobile ? mobileTableColumns : initialTableColumns;
    const templateColumn = tableColumns.map(({width}) => width).join(" ");

    if (!ordersData || ordersData.length === 0) {
        return <div style={{ padding: "2rem", textAlign: "center" }}><p>No orders found</p></div>;
    }

    return (
        <div className="table__container" style={{ "--column-count": tableColumns.length, "--template-column": templateColumn } as React.CSSProperties}>
            <div className="table">
                <div className="table__row table__header">
                    {tableColumns.map(({key : col}) => (
                        <div key={`table-header-${col}`} className="table__cell table__header__cell" style={{ textTransform: "capitalize", fontWeight: "600" }}>
                            {col==="productName"?"name":col}
                        </div>
                    ))}
                </div>
                <div className="table__body">
                    <AnimatePresence>
                        {ordersData.map((order) => (
                            <TableRowComponent key={`table-row-${order._id}`} tableColumn={tableColumns.map(({key}) => key)} orderData={order} />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

type OrderRowComponentProp = {
    tableColumn: (keyof OrderDataInterface)[];
    orderData: OrderDataInterface;
    handleActions?: any;
}

export const TableRowComponent = ({ tableColumn, orderData }: OrderRowComponentProp) => {
    
    console.log(tableColumn);
    console.log(orderData);
    return (
        <motion.div initial={{ opacity: 0, x: -50, height: "auto" }} animate={{ opacity: 1, x: 0, height: "auto" }} exit={{ opacity: 0, x: -20, height: 0 }} transition={{ duration: 0.5 }}
            className="table__row table__body" data-id={orderData._id}>
            {tableColumn.map((key) => {
                if (key === "image") {
                    return (
                        <div key={`table-row-${orderData._id}-${key}`} className="table__cell table__body__cell">
                            <img src={orderData[key][0]} alt="" />
                        </div>
                    )
                } else if (key === "status") {
                    return (
                        <div key={`table-row-${orderData._id}-${key}`} className="table__cell table__body__cell">
                            <OrderStatus status={orderData[key]} />
                        </div>
                    )
                } else {
                    return (
                        <div key={`table-row-${orderData._id}-${key}`} className="table__cell table__body__cell">
                            <span className="cell__content">{orderData[key]}</span>
                        </div>
                    )
                }
            })}

            {/* <TableActions productId={productData._id} handleActions={handleActions} /> */}

        </motion.div>
    )
}

const OrderStatus = ({status}: {status: string}) => {
    return (
        <div>
            <span className="cell__content" style={{
                padding: "0.2rem 0.6rem",
                borderRadius: "20px",
                fontSize: "0.75rem",
                backgroundColor: status === 'pending' ? '#fff3cd' : '#d4edda',
                color: status === 'pending' ? '#856404' : '#155724'
            }}>
                {status}
        </span>
        </div>
    )
}