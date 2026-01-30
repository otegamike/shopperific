import "./become-seller.css"
import LoaderSvg from "../../../assets/svg/loader"
import Button from "../../buttons/button"

interface BecomeSellerProps {
    action: () => void,
    loading: boolean
}

function BecomeSellerContent( {action , loading }: BecomeSellerProps) {
    return (
        <div className="become__seller__content">
                {/* Hero Section */}
            <section className="hero">
                <h1>Become a Seller on <span className="logo">Shopperific</span></h1>
                <p className="subtitle">
                Start selling. Scale faster. Build your brand.
                </p>
                <p className="description">
                Shopperific gives you everything you need to sell online from product
                listings to payments, analytics, and customer communication all in
                one powerful dashboard.
                </p>
                <Button onClick={() => action()} state={loading?"disabled": "default"} className="primary-btn" content={loading? <LoaderSvg /> : "Start Selling"} />
            </section>

            {/* Why Sell */}
            <section className="section">
                <h2>Why sell on Shopperific</h2>
                <ul className="list">
                <li>Launch your store in minutes</li>
                <li>Create your own branded storefront</li>
                <li>List and manage products easily</li>
                <li>Track orders, inventory, and sales in real time</li>
                <li>Secure payments with reliable payouts</li>
                <li>Built-in messaging with customers</li>
                <li>Mobile-friendly seller dashboard</li>
                </ul>
            </section>

            {/* Who Can Sell */}
            <section className="section">
                <h2>Who can sell</h2>
                <ul className="list">
                <li>Must be 18 years or older</li>
                <li>Provide accurate personal or business details</li>
                <li>Sell legal, authentic, and original products</li>
                <li>Agree to Shopperific’s Seller Terms</li>
                </ul>
            </section>

            {/* How It Works */}
            <section className="section">
                <h2>How selling works</h2>
                <div className="steps">
                <div className="step">
                    <h3>Create your seller account</h3>
                    <p>Sign up, complete your profile, and set up your store.</p>
                </div>
                <div className="step">
                    <h3>Add your products</h3>
                    <p>Upload product details, images, pricing, and stock levels.</p>
                </div>
                <div className="step">
                    <h3>Start selling</h3>
                    <p>Your products go live once approved.</p>
                </div>
                <div className="step">
                    <h3>Get paid</h3>
                    <p>Receive payouts after successful order completion.</p>
                </div>
                </div>
            </section>

            {/* Responsibilities */}
            <section className="section">
                <h2>Your responsibility as a seller</h2>
                <ul className="list">
                <li>Fulfill orders on time</li>
                <li>Keep product information accurate</li>
                <li>Communicate professionally with customers</li>
                <li>Handle returns and issues fairly</li>
                <li>Follow platform rules and local laws</li>
                </ul>
            </section>

            {/* Terms Summary */}
            <section className="section muted">
                <h2>Seller Terms & Conditions (Summary)</h2>
                <ul className="list">
                <li>You are responsible for all activity on your seller account</li>
                <li>All listed products must be legal and non-counterfeit</li>
                <li>A service or commission fee may apply per sale</li>
                <li>Payouts are processed after order completion</li>
                <li>Failure to fulfill orders may result in penalties or suspension</li>
                <li>Sellers must follow return and refund policies</li>
                </ul>
                <p className="small-text">
                Full Seller Terms are available during signup.
                </p>
            </section>

            {/* FAQ */}
            <section >
                <h2 className="faq__title">Frequently Asked Questions</h2>

                <div className="faq">
                    <h4>How much does it cost to sell?</h4>
                    <p>Creating a seller account is free. A small fee applies per sale.</p>
                    </div>

                    <div className="faq">
                    <h4>How do I get paid?</h4>
                    <p>Payouts are sent to your selected payment method.</p>
                    </div>

                    <div className="faq">
                    <h4>What products can I sell?</h4>
                    <p>Physical or digital products that are legal and authentic.</p>
                    </div>

                    <div className="faq">
                    <h4>Can I run my own brand store?</h4>
                    <p>Yes. Every seller gets a dedicated storefront.</p>
                </div>
            </section>
        </div>
    )
}

export default BecomeSellerContent