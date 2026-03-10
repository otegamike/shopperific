import StatCard from "../../cards/statCard";

type OrderStatsProps = {
    stats: {
        pending: number;
        shipped: number;
        delivered: number;
        cancelled: number;
    }
}

function OrderStats({ stats }: OrderStatsProps) {
    return (
        <>
            <div className="stats__container"><div className="stats no-scrollbar">
                <StatCard className="stat__card red">
                    <h5>Pending</h5>
                    <p>{stats.pending || 0}</p>
                </StatCard>

                <StatCard className="stat__card green">
                    <h5>Shipped</h5>
                    <p>{stats.shipped || 0}</p>
                </StatCard>

                <StatCard className="stat__card purple">
                    <h5>Delivered</h5>
                    <p>{stats.delivered || 0}</p>
                </StatCard>

                <StatCard className="stat__card purple">
                    <h5>Cancelled</h5>
                    <p>{stats.cancelled || 0}</p>
                </StatCard>

            </div></div>
        </>
    )
}

export default OrderStats;
