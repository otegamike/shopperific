import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

interface ShopData {
    shopId: string;
    shopName: string;
    shopStats: {
        orders: number;
        totalRevenue: number;
        visits: number;
        pendingOrders: number;
    };
}

interface ShopRevenueChartProps {
    data: ShopData[];
}

const ShopRevenueChart: React.FC<ShopRevenueChartProps> = ({ data }) => {
    // Format data for Recharts
    const chartData = data.map((shop) => ({
        name: shop.shopName,
        Revenue: shop.shopStats.totalRevenue,
        Orders: shop.shopStats.orders,
    }));

    if (!chartData || chartData.length === 0) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center', opacity: 0.6 }}>
                <p>No shop data available for charts.</p>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', height: 300, marginTop: '0.5rem' }}>
            <h4 style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>Revenue & Orders by Shop</h4>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={chartData}
                    margin={{
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                    <XAxis dataKey="name" tick={{ fill: '#666' }} axisLine={false} tickLine={false} style={{fontSize: '10px', overflow: "clip"}} />
                    <YAxis yAxisId="left" tick={{ fill: '#666' }} axisLine={false} tickLine={false} style={{fontSize: '10px'}} tickFormatter={(val: number) => `$${val}`} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fill: '#666' }} axisLine={false} tickLine={false} style={{fontSize: '10px'}} />
                    <Tooltip
                        cursor={{ fill: '#f4f4f4' }}
                        contentStyle={{ borderRadius: '8px',  border: '1px solid var(--background-color)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: "12px", backgroundColor: "var(--background-grey)", backdropFilter: "blur(10px) brightness(140%)" }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar yAxisId="left" dataKey="Revenue" fill="var(--primary-color-600, #4facfe)" radius={[4, 4, 0, 0]} barSize={25} />
                    <Bar yAxisId="right" dataKey="Orders" fill="var(--primary-color-400, #38f9d7)" radius={[4, 4, 0, 0]} barSize={25} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ShopRevenueChart;
