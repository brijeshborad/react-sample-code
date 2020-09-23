import React, {useState} from "react";
import './HowItWorks.scss';
import Header from "../../components/headers/Header";

function HowItWorks() {

    const [owner, setOwner] = useState(true)
    return (
        <>
            <Header/>
            <main className="main-wrapper">
                <div className="container">
                    <div className="row">
                        <h1 className="page-heading text-center col-md-12">How it works</h1>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="btn-tab btn-group" role="group">
                                <button type="button" onClick={() => setOwner(!owner)} className={`btn btn-blue ${owner ? 'active' : null}`}>Owner</button>
                                <button type="button" onClick={() => setOwner(!owner)} className={`btn btn-blue ${!owner ? 'active' : null}`}>Tenant</button>
                            </div>
                        </div>
                    </div>
                    {owner ?
                        (
                            <div className="row services owners">
                                <h2 className="col-md-12">For Owners</h2>
                                <div className="services-box">
                                    <div className="col-md-3">
                                        <div className="services-box-wrapper">
                                            <div className="icon-title">
                                                <img src="/images/mail.svg" alt="Mail" />
                                                <h5>Show your interest </h5>
                                            </div>
                                            <h6>Explore our flexible plans</h6>
                                            <p>Submit your details to us to start the process.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="services-box-wrapper">
                                            <div className="icon-title">
                                                <img src="/images/call.svg" alt="Call" />
                                                <h5>Talk to property manager </h5>
                                            </div>
                                            <h6>Digital onboarding</h6>
                                            <p>We will reach out and discuss your needs as a property owner to onboard you on our platform.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="services-box-wrapper">
                                            <div className="icon-title">
                                                <img src="/images/user.svg" alt="User" />
                                                <h5>Find the Perfect Tenant </h5>
                                            </div>
                                            <h6>Tenant management</h6>
                                            <p>We take care of  marketing, tenant screeing, verification and make the home move in ready</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="services-box-wrapper">
                                            <div className="icon-title">
                                                <img src="/images/settings.svg" alt="Settings" />
                                                <h5>Leave maintenance to us </h5>
                                            </div>
                                            <h6>No Markup maintenance</h6>
                                            <p>Our 24/7 Support Team will attend to maintenance issues and coordinate with our network of service providers-–with zero markup.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) :
                        (
                            <div className="row services renters">
                                <h2 className="col-md-12">For Tenants</h2>
                                <div className="services-box">
                                    <div className="col-md-3">
                                        <div className="services-box-wrapper">
                                            <div className="icon-title">
                                                <img src="/images/search-blue.svg" alt="Search" />
                                                <h5>Find your next home </h5>
                                            </div>
                                            <h6>Do your rental search with ease</h6>
                                            <p>Find properties that match your needs and budget with a customized search on our listings page or partner portals.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="services-box-wrapper">
                                            <div className="icon-title">
                                                <img src="/images/car.svg" alt="Car" />
                                                <h5>Assisted visits </h5>
                                            </div>
                                            <h6>Explore multiple options with contact less tours</h6>
                                            <p>Setup time with our team to take virtual tours or in person visits. </p>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="services-box-wrapper">
                                            <div className="icon-title">
                                                <img src="/images/receipt.svg" alt="Receipt" />
                                                <h5>Finalize your home </h5>
                                            </div>
                                            <h6>We take care of documentation</h6>
                                            <p>Once you have found your next home, complete the move in formalities</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="services-box-wrapper">
                                            <div className="icon-title">
                                                <img src="/images/truck.svg" alt="Shipping" />
                                                <h5>Move in </h5>
                                            </div>
                                            <h6>Look forward to a hassle-free moving</h6>
                                            <p>We make sure your new rental home is move-in ready. You can enter the property on your own any time within the move-in date.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </main>
        </>
    )
}

export default HowItWorks;

