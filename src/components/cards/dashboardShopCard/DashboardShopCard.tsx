import EditSvg from "../../../assets/svg/editSvg";
import ProductsSvg from "../../../assets/svg/products";
import SettingsSvg from "../../../assets/svg/settings";
import type { DashboardShopData } from "../../../types/shopsInterface";
import "./dashboardShopCard.css";

export default function DashboardShopCard({ shop }: { shop: DashboardShopData }) {
    const totalSales = "45,200.00";
    const monthlyVisitors = "12.4k";
    const status = "Active";

    return (
        <div className="dashboard__shop__card">
            {/* Header */}
            <div className="card__header">
                <div className="card__info">
                    <img
                        src={shop.displayImageUrl || "https://cloud.appwrite.io/v1/storage/buckets/66fc88c70013898f7e77/files/66fc8938002bbaf917fd/view?project=66fc881e00201acc15dd&mode=admin"}
                        alt={shop.shopName}
                        className="card__image"
                    />
                    <div className="card__brand">
                        <h3 className="card__title">{shop.shopName}</h3>
                        <div className="card__products-count">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                <line x1="8" y1="21" x2="16" y2="21"></line>
                                <line x1="12" y1="17" x2="12" y2="21"></line>
                            </svg>
                            <span>{typeof shop.productsCount === 'number' && shop.productsCount > 0 ? `${shop.productsCount} Products` : "No Products"}</span>
                        </div>
                    </div>
                </div>

                <div className="card__status">
                    <div className="status__dot"></div>
                    {shop.status || status}
                </div>
            </div>

            {/* Stats Block */}
            <div className="card__stats">
                <div className="stat__block">
                    <div className="stat__label">Sales this month</div>
                    <div className="stat__value--primary">${shop.monthlySales || totalSales}</div>
                </div>
                <div className="stat__block stat__block--right">
                    <div className="stat__label">Monthly Visitors</div>
                    <div className="stat__value--secondary">{shop.visitors || monthlyVisitors}</div>
                </div>
            </div>

            {/* Actions */}
            <div className="card__actions">
                <button className="action__btn">
                    <EditSvg fill="#1a73e8" size={16} /> Edit
                </button>
                <button className="action__btn">
                    <ProductsSvg fill="#1a73e8" size={16} /> Products
                </button>
                <button className="action__btn action__btn--icon">
                    <SettingsSvg fill="#444" size={18} />
                </button>
            </div>
        </div>
    );
}
