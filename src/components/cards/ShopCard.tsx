
interface ShopCardProps {
    orientation?: string;
    className?: string;
    loading?: boolean;
}

function ShopCard({ orientation , className, loading = true }: ShopCardProps) {
  return (
    <div className={`shop__card ${orientation} ${className}`}>
        <span className={`shop__logo ${loading ? "skeleton__loader" : ""}`}></span>
        <span className="shop__group">
            <span className={`shop__name ${loading ? "skeleton__loader" : ""}`}></span>
            <span className={`shop__link ${loading ? "skeleton__loader" : ""}`}></span>
        </span>
    </div>
  )
}

export default ShopCard