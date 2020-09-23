import './Plans.scss';
import React, {useState} from "react";
import Header from "../../components/headers/Header";
import {plans} from "../../service/constants";

function Plans(props) {
    const [selectedPlan, setSelectedPlan] = useState('Managed');
    return (
        <>
            <Header/>
            <main className="plans-details main-wrapper">
                <div className="container">
                    <div className="row">
                        <h1 className="page-heading col-md-12">Our service plans</h1>
                    </div>
                    <div className="row price-plan">
                        {plans.map((plan, i) => (
                            <div key={i} onClick={() => setSelectedPlan(plan.name)}
                                 className={`col-lg-4 price-plan-col ${selectedPlan === plan.name ? 'active' : ''}`}>
                                <div className={`price-plan-box ${plan.color}`}>
                                    <div className="d-flex btn-price">
                                        <button className={`${plan.color}-btn btn text-capitalize`}>{plan.name}</button>
                                        <h6>{plan.price}</h6>
                                    </div>
                                    <p>{plan.shortInfo}</p>
                                    {plan.additional && <h4>{plan.additional}</h4>}
                                    <ul>
                                        {plan.features.map((feature, j) => (
                                            <li key={j}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="footer-btns">
                        <div className="cancel-btn">
                            <img src="/images/verified.svg" alt="Verified"/>
                            <h5>Cancel Anytime <br/>
                                <span> Instant refund if you are not satisfied with our services. </span></h5>
                        </div>
                        <button className="signup-btn btn"
                                onClick={() => props.history.push(`contact-us`, {plan: selectedPlan})}>
                            Sign Up Now
                        </button>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Plans
