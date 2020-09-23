import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Row} from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import ApiService from "../../service/ApiService";
import {withRouter} from "react-router";
import {amenitiesMaps, tagsMaps} from "../../service/SiteConfig";
import {banners} from "../../service/constants";

function Maintenance(props) {
    const firstUpdate = useRef(true);
    const [bannersData, setBannersData] = useState([])
    const [search, setSearch] = useState('');
    const [bedroom, setBedroom] = useState(2)
    const [range1, setRange1] = useState({
        min: 5000,
        max: 30000
    })
    const [rangeBase1, setRangeBase1] = useState({
        min: 1000,
        max: 10000
    })
    const [range2, setRange2] = useState({
        min: 1000,
        max: 3000
    })
    const [rangeBase2, setRangeBase2] = useState({
        min: 2000,
        max: 10000
    })
    const [results, setResults] = useState([]);

    const getSearchResult = useCallback((...params) => {
        let payload = {
            cities: params[0]?.cities || [
                props.location?.state?.location || 'noida'
            ],
            states: params[0]?.states || [],
            minArea: params[0]?.minArea || 0,
            maxArea: params[0]?.maxArea || 0,
            minRent: params[0]?.minRent || 0,
            maxRent: params[0]?.maxRent || 0,
            societyNames: params[0]?.societyNames || [],
            term: params[0]?.search || '',
            bedrooms: params[0]?.bedrooms || [],
        };
        ApiService.callPost('/public/society/search', payload).then(response => {
            console.log(response);
            if (response.length) {
                setResults(response)
            } else {
                setResults([])
            }
        }).catch(error => {
            console.log(error.response ? error.response.data.message : error.message);
        })
    }, []);

    useEffect(() => {
        getSearchResult({
            search: props.location.state.search || ''
        });
        let filteredBanners = banners.filter((banner) => [3, 4].includes(banner.id))
        setBannersData(filteredBanners)
    }, [])

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        // clearTimeout(range1Timeout)
        // setTimeout(()=>{console.log('last value', range1)},1000)
        getSearchResult({
            minArea: range2.min,
            maxArea: range2.max,
            minRent: range1.min,
            maxRent: range1.max,
            bedrooms: [bedroom],
            search: props.location.state.search || ''
        })
    }, [range1, range2, props.location])

    return (
        <Row className="search-page-row">
            <aside className="col-lg-3 aside-block">
                {
                    bannersData.map((banner, index) => {
                        return (
                            <div className={`aside-card banner ${(index + 1) % 2 == 0 ? 'brokerage' : 'maintenance'}`}
                                 key={index} onClick={() => console.log(banner.id)}>
                                <div className="d-flex align-items-center">
                                    <div className="image">
                                        <img src={banner.bgImageUrl} alt="maintenance"/>
                                    </div>
                                    <div className="text">
                                        <h5>{banner.bigHeader}</h5>
                                        <p>{banner.content1}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                {/*<div className="aside-card maintenance">*/}
                {/*    <div className="d-flex">*/}
                {/*        <div className="image">*/}
                {/*            <img src="/images/brokerage.png" alt="maintenance"/>*/}
                {/*        </div>*/}
                {/*        <div className="text">*/}
                {/*            <h5>"Maintenance markups? Never!</h5>*/}
                {/*            <p>We charge market rates for maintenance work. Period. No hidden fees. No markups."</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="aside-card brokerage">*/}
                {/*    <div className="d-flex">*/}
                {/*        <div className="image">*/}
                {/*            <img src="images/brokerage.png" alt="Brokerage"/>*/}
                {/*        </div>*/}
                {/*        <div className="text">*/}
                {/*            <h5>No Brokerage</h5>*/}
                {/*            <p>We don't charge any brokerage for our services.</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="aside-card filters">
                    <div className="d-flex">
                        <h4>Applied Filters</h4>
                        <a href="javascript:void(0)" onClick={() => {
                            setRange1({
                                min: 5000,
                                max: 30000
                            });
                            setRange2({
                                min: 1000,
                                max: 3000
                            });
                        }}>Clear</a>
                    </div>
                    <hr/>
                    <h4>Area <span>sq. ft</span></h4>
                    <div className="text-center slider-range">
                        <InputRange
                            step={10}
                            onChange={value => setRange2(value)}
                            maxValue={5000}
                            minValue={1000}
                            draggableTrack={true}
                            value={range2}/>
                    </div>
                    {/*<div className="d-flex">*/}
                    {/*    <select className="form-control" onChange={(e) => setRangeBase2({...rangeBase2, min: e.target.value})}>*/}
                    {/*        <option>Min. Area</option>*/}
                    {/*        <option>Min. Area</option>*/}
                    {/*        <option>Min. Area</option>*/}
                    {/*        <option>Min. Area</option>*/}
                    {/*    </select>*/}
                    {/*    <select className="form-control" onChange={(e) => setRangeBase2({...rangeBase2, max: e.target.value})}>*/}
                    {/*        <option>Max Area</option>*/}
                    {/*        <option>Max Area</option>*/}
                    {/*        <option>Max Area</option>*/}
                    {/*        <option>Max Area</option>*/}
                    {/*    </select>*/}
                    {/*</div>*/}
                    <hr/>
                    <h4>No of Bedrooms</h4>
                    <div className="bedroom-tags">
                        {
                            [...Array(5)].map((fl, index) => {
                                if (index !== 0) {
                                    return <span onClick={() => {
                                        setBedroom(index)
                                    }} key={index} className={index === bedroom ? 'active' : ''}>
                                        {index + 1} BHK</span>
                                }
                            })
                        }
                    </div>
                    <hr/>
                    <h4>Budget </h4>
                    <div className="text-center slider-range">
                        <InputRange
                            step={100}
                            onChange={value => setRange1(value)}
                            maxValue={150000}
                            minValue={5000}
                            draggableTrack={true}
                            value={range1}/>
                    </div>
                    {/*<div className="d-flex">*/}
                    {/*    <select className="form-control" onChange={(e) => setRangeBase1({...rangeBase1, min: e.target.value})}>*/}
                    {/*        <option>2000</option>*/}
                    {/*        <option>2100</option>*/}
                    {/*        <option>5000</option>*/}
                    {/*        <option>6000</option>*/}
                    {/*    </select>*/}
                    {/*    <select className="form-control" onChange={(e) => setRangeBase1({...rangeBase1, max: e.target.value * 1000})}>*/}
                    {/*        <option>10k</option>*/}
                    {/*        <option>12k</option>*/}
                    {/*        <option>15k</option>*/}
                    {/*        <option>18k</option>*/}
                    {/*    </select>*/}
                    {/*</div>*/}
                </div>
            </aside>
            <section className="col-lg-9 sector-div">
                <form className="search-bar" onSubmit={(e) => {
                    e.preventDefault();
                    if (search) {
                        getSearchResult({
                            minArea: range2.min,
                            maxArea: range2.max,
                            minRent: range1.min,
                            maxRent: range1.max,
                            search,
                            bedrooms: [bedroom]
                        })
                    }
                }}>
                    <img src="/images/search.svg" alt="Search Icon"/>
                    <input type="search" className="form-control" value={search}
                           onChange={e => setSearch(e.target.value)} placeholder="Noida sector-78, Mahagun moderne"/>
                </form>
                <div className="heading">
                    <h2>Sector-78, Noida</h2>
                    <p>
                        <img src="/images/result-icon.svg" alt="Result Icon"/>
                        {results.length} result found
                    </p>
                </div>
                {results.map((item, ind) => (
                    <div className="sector-box" key={ind}
                         onClick={() => props.history.push(`society-details/${item.id}`, {
                             societyId: item.id,
                             societyName: item.name
                         })}>

                        <div className="sector-wrapper d-flex">
                            <div className="left-part col-lg-6">
                                <div className="tags">
                                    {item.tags && item.tags.map((tag, i) => {
                                        let instance = tagsMaps.find(tagInstance => tagInstance.key === tag)
                                        if (instance) {
                                            return (
                                                <span key={i} className="tag-name">{instance.value}</span>
                                            )
                                        }
                                    })}
                                    {/*<a href="/" className="btn">Trending</a>*/}
                                    {/*<a href="/" className="btn">Premium</a>*/}
                                </div>
                                <img src={item.societyImageUrl} alt="Missing"/>
                            </div>
                            <div className="right-part col-lg-6">
                                <div className="name-details">
                                    <h5>{item.name}</h5>
                                    <p className="address">{item.streetAddress1}, {item.city}</p>
                                </div>
                                <div className="amenities">
                                    <ul>
                                        {item.amenities.map((each, index) => {
                                            if (index >= 5) return null
                                            let amities = amenitiesMaps.find(item => item.key === each);
                                            if (amities) {
                                                return (
                                                    <li key={index}>
                                                        <img src={`/images/${amities.icon}.svg`} alt={each}/>
                                                        <span> {amities.value} </span>
                                                    </li>
                                                )
                                            }
                                        })}
                                    </ul>
                                </div>
                                <div className="rooms-available">
                                    <div className="room-type">
                                        <h3>2 BHK</h3>
                                        <small>{item.bhk2Count} available</small>
                                        <input type="range" min="1" max="100" value="50" />
                                    </div>
                                    <div className="room-type">
                                        <h3>3 BHK</h3>
                                        <small>{item.bhk3Count} available</small>
                                        <input type="range" min="1" max="100" value="50" />
                                    </div>
                                    <div className="room-type">
                                        <h3>4 BHK</h3>
                                        <small>{item.bhk4Count} available</small>
                                        <input type="range" min="1" max="100" value="50" />
                                    </div>
                                </div>
                                <div className="total-area">
                                    <div className="area-range">
                                        <label>Area Range</label>
                                        <p>{item.minArea}-{item.maxArea} sq. ft</p>
                                    </div>
                                    <div className="area-range rent-range">
                                        <label>Rent Range</label>
                                        <p>
                                            <NumberFormat value={item.minRent} displayType={'text'}
                                                          thousandSeparator={true} prefix={'₹'}/>
                                            &nbsp;-&nbsp;
                                            <NumberFormat value={item.maxRent} displayType={'text'}
                                                          thousandSeparator={true} prefix={'₹'}/>/Mo.
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </section>
        </Row>
    )
}

export default withRouter(Maintenance);
