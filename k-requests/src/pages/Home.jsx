import "../styles/home.css";

export default function Home() {
    return (
        <main className="homeMain">
            <section className="hero">
                <p className="pill">Private Requests Only</p>

                <h1 className="title">
                    Requests for <span className="highlight">Emmanuel</span>
                </h1>

                <p className="subtitle">
                    This page is dedicated to making requests directly through email.
                    <br />
                    Only <strong>Valencia</strong> is allowed to make requests here.
                </p>

                <div className="cardRow">
                    <div className="card">
                        <h3>Quick Requests</h3>
                        <p>Use the Chores page to send a request with date + time.</p>
                    </div>

                    <div className="card">
                        <h3>Respect the Schedule</h3>
                        <p>Please choose a realistic time and be clear about what you need.</p>
                    </div>

                    <div className="card">
                        <h3>Sweet & Simple</h3>
                        <p>Keep it short. Keep it loving. Keep it organized ❤️</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
