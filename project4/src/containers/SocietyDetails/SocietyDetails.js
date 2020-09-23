import './SocietyDetails.scss';
import React, {useEffect, useState} from "react";
import Header from "../../components/headers/Header";
import ApiService from "../../service/ApiService";
import moment from "moment";
import {apartmentAmenitiesMap, apartmentTagMaps} from "../../service/SiteConfig";
import {banners} from "../../service/constants";
import NumberFormat from "react-number-format";
import {withRouter} from "react-router";

function SocietyDetails(props) {

    let [apartments, setApartments] = useState([])
    let [search, setSearch] = useState('')
    let [society, setSociety] = useState('')
    let [selectedApartment, setSelectedApartment] = useState({})
    let [societyBanners, setSocietyBanners] = useState([])
    const [bannersData, setBannersData] = useState([])
    let societyId = props.location.state?.societyId;

    if (!societyId) {
        const {params} = props.match;
        societyId = params.id;
    }

    const getSocietyBanner = () => {
        ApiService.callGet(`/public/society/${societyId}/banner`)
            .then((response) => {
                if (response.length) {
                    setSocietyBanners(response)
                }
            })
            .catch((error) => {
                console.error(error)
            })
    };
    const ordinalSuffixOf = (i) => {
        var j = i % 10,
            k = i % 100;
        if (j === 1 && k !== 11) {
            return "st";
        }
        if (j === 2 && k !== 12) {
            return "nd";
        }
        if (j === 3 && k !== 13) {
            return "rd";
        }
        return "th";
    }

    const getSocietyDetails = () => {
        ApiService.callGet(`/public/society/${societyId}`)
            .then((response) => {
                if (response.length) {
                    setSociety(response)
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }

    useEffect(() => {
        getSocietyBanner()
        getSocietyDetails()

        let filteredBanners = banners.filter((banner) => [7, 4].includes(banner.id))
        setBannersData(filteredBanners)

        ApiService.callGet(`/public/society/${societyId}/apartment`).then(response => {
            if (response.length) {
                setApartments(response)
                setSelectedApartment(response[0])
            } else {
                setApartments([])
            }
        }).catch(error => {
            console.log(error.response ? error.response.data.message : error.message);
        })
    }, [])

    return (
        <>
            <Header/>
            <main className="society-details">
                <section className="left-section">
                    <form className="search-bar" onSubmit={(e) => {
                        e.preventDefault();
                        props.history.push('/search', {search});
                    }}><img src="/images/search.svg" alt="Search Icon"/>
                        <input type="search" className="form-control" value={search}
                               onChange={e => setSearch(e.target.value)}
                               placeholder="Noida sector-78, Mahagun moderne"/>
                    </form>
                    <div className="heading">
                        <h2>Mahagun Moderne</h2>
                        <p>
                            Sector 78, Noida
                        </p>
                    </div>
                    <div className="white-box flat-box">
                        <div className="flats-available">
                            <div className="flat">
                                <h5>2 BHK</h5>
                                <small>21 available</small>
                                <input type="range" min="1" max="100" value="50"/>
                            </div>
                            <div className="flat">
                                <h5>3 BHK</h5>
                                <small>11 available</small>
                                <input type="range" min="1" max="100" value="50"/>
                            </div>
                            <div className="flat">
                                <h5>4 BHK</h5>
                                <small>14 available</small>
                                <input type="range" min="1" max="100" value="50"/>
                            </div>
                        </div>
                    </div>

                    <div className="four-blocks">
                        <div className="block-wrapper">
                            <div className="brokerage-block">
                                <img src={bannersData[0]?.bgImageUrl} alt="brokerage"/>
                                <h6>{bannersData[0]?.bigHeader}</h6>
                                <p>{bannersData[0]?.content1}</p>
                            </div>
                            {
                                societyBanners.map((item, index) => {
                                    return (
                                        <div className="bedroom-block" key={index}>
                                            <div className="bedroom-details">
                                                <p className="number">{item?.header}</p>
                                                <h5>{item?.bigHeader}</h5>
                                                <p>{item.content1}</p>
                                            </div>
                                            <hr/>
                                            <div className="quality">
                                                <img src={`/images/furnished.svg`} alt={item.key1}/>
                                                <span>{item.key1}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    {
                        apartments.map((item, index) => {
                            let availableFrom = moment(item.availableFrom);
                            let isActive = item.id === selectedApartment?.id ? 'active' : '';

                            return (
                                <>
                                    {
                                        index === 2 ? (
                                            <div className="blue-box" key={index}>
                                                <div className="maintenance-markups">
                                                    <img src={bannersData[1]?.bgImageUrl} alt="Maintenance"/>
                                                    <div className="wrapper">
                                                        <h6>{bannersData[1]?.bigHeader}</h6>
                                                        <p>{bannersData[1]?.content1}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null
                                    }
                                    <div className={`white-box available-apartments ${isActive}`} key={index}
                                         onClick={() => setSelectedApartment(item)}>
                                        <div className="apt-wrapper">
                                            <div className="heading">
                                                <div className="heading-wrapper">
                                                    <h5>{item.numOfBedRooms}BHK {item.areaSqFt} Sq.Ft</h5>
                                                    <span>Hot</span>
                                                </div>
                                                <div className="tag">
                                                    {item.tags && item.tags.map((tag, i) => {
                                                        let instance = apartmentTagMaps.find(tagInstance => tagInstance.key === tag)
                                                        if (instance) {
                                                            return (
                                                                <span key={i}>{instance.value}</span>
                                                            )
                                                        }
                                                        return false;
                                                    })}
                                                    {/*<span>...</span>*/}
                                                </div>
                                            </div>
                                            <div className="flat-amenities">
                                                <ul>
                                                    {item.amenities && item.amenities.map((amenity, i) => {
                                                        if (i >= 5) return false;
                                                        let instance = apartmentAmenitiesMap.find(itemInstance => itemInstance.key === amenity)
                                                        if (instance) {
                                                            return (
                                                                <li key={i}>
                                                                    <img src={`/images/${instance.icon}.svg`}
                                                                         alt={instance.value}/>
                                                                    <span>{instance.value}</span>
                                                                </li>
                                                            )
                                                        }
                                                        return false;
                                                    })}
                                                </ul>
                                            </div>
                                            <div className="footer">
                                                <div className="footer-wrapper">
                                                    <div className="monthly-rent">
                                                        <p>Monthly Rent</p>
                                                        <h5><NumberFormat value={item.expectedRent} displayType={'text'}
                                                                          thousandSeparator={true} prefix={'₹'}/></h5>
                                                    </div>
                                                    <div className="available-date">
                                                        <p>Available From</p>
                                                        <h5 dangerouslySetInnerHTML={{__html: availableFrom.format('Do MMM, YYYY').replace(/(\d)(st|nd|rd|th)/g, '$1<sup>$2</sup>')}}></h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </section>
                <aside className="right-sidebar">
                    <div className="amazon-ad border-box">
                        <div className="border-box-wrapper">
                            <h4>...</h4>
                            <p>6 Months of Amazon Prime on us</p>
                            <p>Visit the apartment this weekend.</p>
                            <p><a href="#">+88029348334</a></p>
                            <button className="green-btn"
                                    onClick={() => props.history.push('/contact-us', {society: props.location.state.societyName})}>
                                Contact Us
                            </button>
                        </div>
                    </div>
                    <div className="apartment-details border-box">
                        <div className="border-box-wrapper">
                            <h4>Apartment Details</h4>
                            <div className="details-wrapper">
                                {selectedApartment.amenities && selectedApartment.amenities.map((amenity, i) => {
                                    let instance = apartmentAmenitiesMap.find(itemInstance => itemInstance.key === amenity)
                                    if (instance) {
                                        return (
                                            <div className="details" key={i}>
                                                <img src={`/images/${instance.icon}.svg`} alt={instance.value}/>
                                                <span>{instance.value}</span>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                            <h5>Floor</h5>
                            <div className="floor-details">
                                {
                                    [...Array(10)].map((fl, index) => {
                                        return (
                                            <span key={index}
                                                  className={selectedApartment.floor === (index + 1) ? 'full' : ''}>
                                                {index + 1}{selectedApartment.floor === (index + 1)
                                                ? (<><sup>{ordinalSuffixOf(index + 1)}</sup> floor</>)
                                                : ''}
                                        </span>
                                        )
                                    })
                                }
                                {/*<span className="full">1st floor</span>*/}
                                {/*<span>2</span>*/}
                                {/*<span>3</span>*/}
                                {/*<span>4</span>*/}
                                {/*<span>5</span>*/}
                                {/*<span>6</span>*/}
                                {/*<span>7</span>*/}
                            </div>
                            <h5>Apartment features</h5>
                            <ul className="features">
                                {selectedApartment['externalUrl'] && (<li>Website : <a
                                    href={selectedApartment['externalUrl']}> Housing.com </a>
                                </li>)}

                                {
                                    selectedApartment['externalInfo']?.map((info, index) => {
                                        let infoData = info.split(':');
                                        if (infoData.length > 1) {
                                            switch (infoData[0]) {
                                                case 'building type':
                                                    return (
                                                        <li key={index}>Building type : <span
                                                            className="text-primary"> {infoData[1]} </span>
                                                        </li>)
                                                default:
                                                    return;
                                            }
                                        }
                                        return (<li key={index}>{infoData[0]}</li>)
                                    })
                                }
                            </ul>
                        </div>
                        <hr/>
                        <div className="border-box-wrapper available-from">
                            <div className="availability">
                                <div className="date">
                                    <p>Available From</p>
                                    <h6 dangerouslySetInnerHTML={{__html: moment(selectedApartment['availableFrom']).format('Do MMM, YYYY').replace(/(\d)(st|nd|rd|th)/g, '$1<sup>$2</sup>')}}></h6>
                                </div>
                                <button className="light-orange-btn"
                                        onClick={() => props.history.push('/contact-us', {
                                            appartment: `Mahagun Moderne ${selectedApartment.numOfBedRooms} BHK`,
                                            apartmentId: selectedApartment.id,
                                            society: selectedApartment.societyId
                                        })}>Interested
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="red-box">
                        <div className="teamwork-box">
                            <img src="/images/teamwork.svg" alt="Stay Connected with Neighbours"/>
                            <div className="details">
                                <h6>Stay Connected with Neighbours</h6>
                                <p><a href={society['telegramUrl']}> Click here to join our telegram
                                    community.</a></p>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>
        </>
    )
}

export default withRouter(SocietyDetails)
