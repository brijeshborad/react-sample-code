import './Home.scss';
import React, {useEffect, useState} from "react";
import HomeHeader from "../../components/headers/HomeHeader";
import {Link} from "react-router-dom";

// const rooms = [
//     {key: 'all', value: 'All Properties'},
//     {key: '1bhk', value: '1 BHK'},
//     {key: '2bhk', value: '2 BHK'},
//     {key: '3bhk', value: '3 BHK'},
// ]

function Home() {
    const [fields, setFields] = useState({});

    // function handleChange(e) {
    //     let value = e.target.value;
    //     let name = e.target.name;
    //     setFields(prevState => {
    //         return {
    //             ...prevState,
    //             [name]: value
    //         }
    //     })
    // }

    useEffect(() => {
        document.body.classList.add('home-page')
        return () => {
            document.body.classList.remove('home-page')
        }
    })

    return (
        <>
            <HomeHeader/>
            <section className="home-banner">
                <div className="container-fluid">
                    <div className="row banner">
                        <div className="col-lg-7 banner-text">
                            <h1 className="banner-heading">Stress Free Property Management</h1>
                            <p>Project is professionally managed end-to-end property care company trying to solve
                                the hassles faced by property-owners living away from their property.</p>
                            <div className="banner-actions">
                                <Link to={{
                                    pathname: "/search",
                                    state: fields
                                }} className="btn orange-btn small text-capitalize mr-3">For Tenants</Link>
                                <Link to={{
                                    pathname: "/plans",
                                    state: fields
                                }} className="btn orange-btn text-capitalize small">For Homeowners</Link>

                            </div>
                        </div>
                        <div className="col-lg-5 banner-image text-center">
                            <div>
                                <img src="/images/banner-image.png" alt=""/>
                            </div>
                            <h5>Zero markup maintenance</h5>
                        </div>
                    </div>

                    <div className="core-services">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="services-card">
                                    <div className="card card-1">
                                        <img src="/images/lease-terms.png" alt="Lease Terms"/>
                                        <h3>Trusted Partner</h3>
                                    </div>
                                    <div className="card-wrapper">
                                        <div className="card card-2">
                                            <img src="/images/real-estate.png" alt="Real Estate"/>
                                            <h3>End to End Management</h3>
                                        </div>
                                        <div className="card card-3">
                                            <img src="/images/no-leasing-fees.png" alt="No Leasing Fees"/>
                                            <h3>Low cost maintenance</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="service-text">
                                    <h2 className="title particle">
                                        The Simpler, More Efficient Way to Manage Your Property
                                    </h2>
                                    <p>
                                        We offer complete range of services for property monitoring, leasing,
                                        maintenance, renovation, and tenant management solutions enabled by our
                                        state-of-the-art technology applications. We currently operate in Delhi/NCR
                                        region.
                                    </p>
                                    {/*<a href="#" className="orange-btn btn">See All Services</a>*/}
                                </div>
                            </div>
                        </div>
                    </div>


                    {/*<div className="perfect-home">*/}
                    {/*    <div className="row">*/}
                    {/*        <div id="tabs" className="form-tab">*/}
                    {/*            <div className="col-md-12">*/}
                    {/*                <h2 className="title text-center particle">*/}
                    {/*                    Find your perfect home*/}
                    {/*                </h2>*/}

                    {/*                <div className="tab-content card" id="nav-tabContent">*/}
                    {/*                    <nav>*/}
                    {/*                        <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">*/}
                    {/*                            <a className="nav-item nav-link active" id="nav-home-tab"*/}
                    {/*                               data-toggle="tab" href="#nav-home"*/}
                    {/*                               role="tab" aria-controls="nav-home"*/}
                    {/*                               aria-selected="true">For Rent</a>*/}
                    {/*                            <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab"*/}
                    {/*                               href="#nav-profile"*/}
                    {/*                               role="tab" aria-controls="nav-profile" aria-selected="false"> For*/}
                    {/*                                Owner</a>*/}
                    {/*                        </div>*/}
                    {/*                    </nav>*/}
                    {/*                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel"*/}
                    {/*                         aria-labelledby="nav-home-tab">*/}
                    {/*                        <p>*/}
                    {/*                            We'll work with you to make sure your home is all set up when you*/}
                    {/*                            arrive,*/}
                    {/*                            utilities and all. Unless you'd prefer to wait for the cable guy.*/}
                    {/*                        </p>*/}
                    {/*                        <form className="for-rent-form">*/}
                    {/*                            <div className="col-lg-6">*/}
                    {/*                                <input type="text" placeholder="Enter your Landmark Location"*/}
                    {/*                                       value={fields['location']}*/}
                    {/*                                       onChange={(e) => handleChange(e)}*/}
                    {/*                                       className="form-control"/>*/}
                    {/*                            </div>*/}
                    {/*                            <div className="col-lg-6">*/}
                    {/*                                <select className="form-control" name="properties">*/}
                    {/*                                    {rooms.map((item, index) => {*/}
                    {/*                                        return (*/}
                    {/*                                            <option key={index} value={item.key}*/}
                    {/*                                                    onClick={() => handleChange({*/}
                    {/*                                                        value: item.key,*/}
                    {/*                                                        name: 'properties'*/}
                    {/*                                                    })}>{item.value}</option>*/}
                    {/*                                        );*/}
                    {/*                                    })}*/}
                    {/*                                </select>*/}
                    {/*                            </div>*/}
                    {/*                            <div className="col-lg-6">*/}
                    {/*                                <select className="form-control" name="room">*/}
                    {/*                                    {rooms.map((item, index) => {*/}
                    {/*                                        return (*/}
                    {/*                                            <option key={index} value={item.key}*/}
                    {/*                                                    onClick={() => handleChange({*/}
                    {/*                                                        value: item.key,*/}
                    {/*                                                        name: 'room'*/}
                    {/*                                                    })}>{item.value}</option>*/}
                    {/*                                        );*/}
                    {/*                                    })}*/}
                    {/*                                </select>*/}
                    {/*                            </div>*/}
                    {/*                            <div className="col-lg-6">*/}
                    {/*                                <input type="text" name="price" value={fields['price']}*/}
                    {/*                                       onChange={(e) => handleChange(e)} placeholder="Price"*/}
                    {/*                                       className="form-control"/>*/}
                    {/*                            </div>*/}
                    {/*                            <div className="col-lg-12 text-center">*/}
                    {/*                                <Link to={{*/}
                    {/*                                    pathname: "/search",*/}
                    {/*                                    state: fields*/}
                    {/*                                }} className="btn orange-btn">Find Now</Link>*/}
                    {/*                            </div>*/}
                    {/*                        </form>*/}
                    {/*                    </div>*/}
                    {/*                    <div className="tab-pane fade" id="nav-profile" role="tabpanel"*/}
                    {/*                         aria-labelledby="nav-profile-tab">*/}
                    {/*                        <table className="table" cellSpacing="0">*/}
                    {/*                            <thead>*/}
                    {/*                            <tr>*/}
                    {/*                                <th>Project Name</th>*/}
                    {/*                                <th>Employer</th>*/}
                    {/*                                <th>Time</th>*/}
                    {/*                            </tr>*/}
                    {/*                            </thead>*/}
                    {/*                            <tbody>*/}
                    {/*                            <tr>*/}
                    {/*                                <td><a href="#">Work 1</a></td>*/}
                    {/*                                <td>Doe</td>*/}
                    {/*                                <td>john@example.com</td>*/}
                    {/*                            </tr>*/}
                    {/*                            <tr>*/}
                    {/*                                <td><a href="#">Work 2</a></td>*/}
                    {/*                                <td>Moe</td>*/}
                    {/*                                <td>mary@example.com</td>*/}
                    {/*                            </tr>*/}
                    {/*                            <tr>*/}
                    {/*                                <td><a href="#">Work 3</a></td>*/}
                    {/*                                <td>Dooley</td>*/}
                    {/*                                <td>july@example.com</td>*/}
                    {/*                            </tr>*/}
                    {/*                            </tbody>*/}
                    {/*                        </table>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className="properties-list">*/}
                    {/*    <div className="row">*/}
                    {/*        <div className="col-lg-12 text-center">*/}
                    {/*            <h2 className="title">Properties listed with us</h2>*/}
                    {/*        </div>*/}
                    {/*        <div className="properties-box">*/}
                    {/*            <div className="box card">*/}
                    {/*                <div className="box-img">*/}
                    {/*                    <img src="/images/property-1.png" alt="Property"/>*/}
                    {/*                </div>*/}
                    {/*                <div className="property-details">*/}
                    {/*                    <a href="#">Location</a>*/}
                    {/*                    <button href="#" className="btn orange-btn small">Details</button>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className="box card">*/}
                    {/*                <div className="box-img">*/}
                    {/*                    <img src="/images/property-1.png" alt="Property"/>*/}
                    {/*                </div>*/}
                    {/*                <div className="property-details">*/}
                    {/*                    <a href="#">Location</a>*/}
                    {/*                    <button href="#" className="btn orange-btn small">Details</button>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className="box card">*/}
                    {/*                <div className="box-img">*/}
                    {/*                    <img src="/images/property-1.png" alt="Property"/>*/}
                    {/*                </div>*/}
                    {/*                <div className="property-details">*/}
                    {/*                    <a href="#">Location</a>*/}
                    {/*                    <button href="#" className="btn orange-btn small">Details</button>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className="box card">*/}
                    {/*                <div className="box-img">*/}
                    {/*                    <img src="/images/property-1.png" alt="Property"/>*/}
                    {/*                </div>*/}
                    {/*                <div className="property-details">*/}
                    {/*                    <a href="#">Location</a>*/}
                    {/*                    <button className="btn orange-btn small">Details</button>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className="box card">*/}
                    {/*                <div className="box-img">*/}
                    {/*                    <img src="/images/property-1.png" alt="Property"/>*/}
                    {/*                </div>*/}
                    {/*                <div className="property-details">*/}
                    {/*                    <a href="#">Location</a>*/}
                    {/*                    <button href="#" className="btn orange-btn small">Details</button>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className="box card">*/}
                    {/*                <div className="box-img">*/}
                    {/*                    <img src="/images/property-1.png" alt="Property"/>*/}
                    {/*                </div>*/}
                    {/*                <div className="property-details">*/}
                    {/*                    <a href="#">Location</a>*/}
                    {/*                    <button href="#" className="btn orange-btn small">Details</button>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <div className="col-lg-12 text-center">*/}
                    {/*            <a href="#" className="btn orange-btn">Find More</a>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className="row why-best">*/}
                    {/*    <div className="col-lg-12 text-center">*/}
                    {/*        <h2 className="title">Why we are the Best</h2>*/}
                    {/*        <p>Our professionals are available 24/7 to monitor your property related issues so you can*/}
                    {/*            have peace of mind.</p>*/}
                    {/*    </div>*/}
                    {/*    <div className="card">*/}
                    {/*        <h3>Zero Brokerage</h3>*/}
                    {/*    </div>*/}
                    {/*    <div className="card">*/}
                    {/*        <h3>Service Based Plans</h3>*/}
                    {/*    </div>*/}
                    {/*    <div className="card">*/}
                    {/*        <h3>Ready to move in homes</h3>*/}
                    {/*    </div>*/}
                    {/*    <div className="card">*/}
                    {/*        <h3>Move in Co-ordination</h3>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className="row service-plan">*/}
                    {/*    <div className="col-lg-12 text-center">*/}
                    {/*        <h2 className="title">Our service plan</h2>*/}
                    {/*        <p>Our professionals are available 24/7 to monitor your property related issues so you can*/}
                    {/*            have peace of mind.</p>*/}
                    {/*    </div>*/}
                    {/*    <div className="col-lg-12 card">*/}
                    {/*        <div className="plan-block marketing">*/}
                    {/*            <h3>Marketing</h3>*/}
                    {/*            <p>Plan to help owner in identifying tenants and completing Documentation</p>*/}
                    {/*            <h3>₹ 2500/-</h3>*/}
                    {/*        </div>*/}
                    {/*        <div className="plan-block leasing">*/}
                    {/*            <h3>Leasing</h3>*/}
                    {/*            <p>A comprehensive plan build to manage end to end leasing formalities on owners*/}
                    {/*                behalf.</p>*/}
                    {/*            <h3>On request</h3>*/}
                    {/*        </div>*/}
                    {/*        <div className="plan-block managed">*/}
                    {/*            <h3>Managed</h3>*/}
                    {/*            <p>A Yearly Plan designed to maintain the rental home with complete peace of mind for*/}
                    {/*                owner.</p>*/}
                    {/*            <h3>On request</h3>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="col-lg-12 text-center">*/}
                    {/*        <a href="#" className="btn orange-btn">Find More</a>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </section>

            <footer>
                <div className="sofa-man">
                    <img src="/images/man-in-sofa.png" alt=""/>
                </div>
                <img src="/images/footer-bg.png" className="footer-bg" alt=""/>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 ml-auto">
                            <div className="contact-details">
                                <div className="footer-logo mb-4">
                                    <img src="/images/demo-logo.png" alt="..."/>
                                </div>
                                <h3>Contact Us</h3>
                                <ul>
                                    <li><a href="#">+ 1(408) 359 7099</a></li>
                                    <li><a href="#">+ 91(989) 730 4058</a></li>
                                    {/*<li><a href="#">+ 91(888) 217 7521</a></li>*/}
                                    <li><a href="#">info@demo.com</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Home
