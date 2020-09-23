import React, {useEffect, useState} from "react";
import './ContactUs.scss';
import Header from "../../components/headers/Header";
import ApiService from "../../service/ApiService";
import {plans} from "../../service/constants";

function ContactUs(props) {
    const [apiSuccess, setApiSuccess] = useState('');
    const [contactUs, setContactUs] = useState({
        owner: false,
        name: '',
        plan: '',
        apartmentName: '',
        email: '',
        phnNumber: null,
        society: props.location.state?.society || '',
        appartmentid: props.location.state?.apartmentId || ''
    })

    useEffect(() => {
        setContactUs(prevState => {
            return {
                ...prevState,
                owner: !!(props.location.state && props.location.state.plan),
                plan: props.location.state?.plan,
                apartmentName: props.location.state?.appartment
            }
        })
    }, []);

    const submitInfo = (e) => {
        e.preventDefault()
        if (!contactUs.name && !contactUs.email) {
            return;
        }
        let name = contactUs.name.split(" ")
        let payload = {
            "email": contactUs.email,
            "firstName": name[0] || '',
            "lastName": name[1] || '',
            "phoneNumber": contactUs.phnNumber,
            "perferredTime": null,
            "plan_interested": contactUs.plan,
            "owner": contactUs.owner,
            "apartment_interested": contactUs.appartmentid || '',
            "society_interested": contactUs.society || ''
        }
        ApiService.callPost('/public/users/contactUs', payload)
            .then(response => {
                console.log('response: ', response)
                setContactUs({
                    owner: false,
                    name: '',
                    plan: '',
                    apartmentName: '',
                    email: '',
                    phnNumber: null,
                    society: props.location.state?.society || null,
                })
                setApiSuccess('You query has been sent successfully');
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <>
            <Header/>
            <main className="main-wrapper">
                <div className="container">
                    <div className="row contact-row">
                        <div className="col-md-5 img-col">
                            <img src="/images/house-1.jpg" alt=""/>
                        </div>
                        <div className="col-md-7">
                            <div className="contact-details">
                                {apiSuccess && <p className="text-success">{apiSuccess}</p>}
                                {/*<div className="sign-in">*/}
                                {/*    <span>Already a member? <a href=""> Sign in </a> </span>*/}
                                {/*</div>*/}
                                <h1>Contact Us</h1>
                                <form className="contact-form" onSubmit={(e) => submitInfo(e)}>
                                    <div className="form-group">
                                        <label className="form-check-label" htmlFor="owner">Owner</label>
                                        <input type="checkbox" name='owner' checked={contactUs.owner} id="owner"
                                               onChange={(e) => setContactUs({
                                                   ...contactUs,
                                                   owner: e.target.checked
                                               })}/> <span className="checkmark"></span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" required name='name' value={contactUs.name}
                                               className="form-control"
                                               id="name"
                                               onChange={(e) => setContactUs({...contactUs, name: e.target.value})}/>
                                    </div>
                                    {contactUs.owner &&
                                    <div className="row form-group">
                                        <div className="col">
                                            <label htmlFor="plan">Plan</label>
                                            <select onChange={(e) => setContactUs({
                                                ...contactUs,
                                                plan: e.target.value
                                            })} className="form-control" id="plan" name='plan' value={contactUs.plan}>
                                                <option value="">Select Plan</option>
                                                {plans.map((plan, index) => (
                                                    <option key={index} value={plan.name}>{plan.name}</option>
                                                ))}
                                            </select>
                                            {/*<input type="text" name='plan' value={contactUs.plan}*/}
                                            {/*       className="form-control" id="plan" onChange={(e) => setContactUs({*/}
                                            {/*    ...contactUs,*/}
                                            {/*    plan: e.target.value*/}
                                            {/*})}/>*/}
                                        </div>
                                        <div className="col">
                                            <label htmlFor="apt-name">Apartment/Society Name</label>
                                            <input type="text" name='apartmentName' value={contactUs.apartmentName}
                                                   className="form-control" id="apt-name"
                                                   onChange={(e) => setContactUs({
                                                       ...contactUs,
                                                       apartmentName: e.target.value
                                                   })}/>
                                        </div>
                                    </div>
                                    }
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input type="mail" required name='email' value={contactUs.email}
                                               className="form-control"
                                               id="email"
                                               onChange={(e) => setContactUs({...contactUs, email: e.target.value})}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phn-number">Phone Number</label>
                                        <input type="tel" name='phnNumber' value={contactUs.phoneNumber}
                                               className="form-control" id="phn-number" onChange={(e) => setContactUs({
                                            ...contactUs,
                                            phnNumber: e.target.value
                                        })}/>
                                    </div>
                                    <div className="form-group text-center">
                                        <button type="submit" className="btn orange-btn-submit">Submit
                                        </button>
                                    </div>
                                    <p className="text-center">We do not share your personal infomation. It is only used
                                        for communication with .</p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ContactUs;

