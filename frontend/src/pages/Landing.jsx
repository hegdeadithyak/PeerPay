import { CardComponenet } from "../components/cardcomponent";
import { Section } from "../components/landing_section";

export function Landing() {
    return (
        <div className="landing-page">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Peer Pay</h1>
                    <nav className="space-x-4">
                        <a href="features" className="text-gray-600 hover:text-gray-800">Features</a>
                        <a href="signin" className="text-gray-600 hover:text-gray-800">Sign in</a>
                    </nav>
                </div>
            </header>
            <Section head="Send Money Instantly" subhead="Send money to friends and family instantly with Peer Pay." button="Get Started Now" button_directs="/signup" />
            <section id="features" className="features py-20 bg-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Features</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <CardComponenet title="Instant Transfers" description="Send money instantly to friends and family." />
                        <CardComponenet title="Secure" description="Your transactions are secure with Peer Pay." />
                        <CardComponenet title="Low Fees" description="We offer low fees for all transactions." />
                    </div>
                </div>
            </section>
            <Section head="Ready to Get Started?" subhead="Join thousands of users who trust Peer Pay for their transactions." button="Sign Up Now" button_directs="/signup "/>
        </div>
    );
}
