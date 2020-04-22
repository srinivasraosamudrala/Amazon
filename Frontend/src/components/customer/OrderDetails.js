import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Divider from '@material-ui/core/Divider';
import _ from 'lodash';
import { fetchOrderDetails } from '../../redux/actions/orders'
import Loading from '../loading';
import '../css/orders.css'

class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: {
                "products": [],
                "address": {},
                "payment": {}
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.customerOrderDetails)
        this.setState({
            order: nextProps.customerOrderDetails
        })
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.props.fetchOrderDetails(params.id);
    }

    render() {
        return (
            <div className="container" style={{ width: "75%", align: "center", marginTop: "10px" }}>
                <Loading />
                <div className="row" style={{ fontSize: "13px" }}>
                    <Link to={'/customer/' + sessionStorage.getItem("id")} style={{ textDecoration: "none" }}>Your Account</Link> >
                    <Link to={'/my-orders'} style={{ textDecoration: "none" }}> Your Orders</Link> > <span style={{ color: "#c45500" }}>Order Details</span>
                </div>
                <div className="row">
                    <div className="col-md-5" style={{ padding: "10px 0px 10px" }}>
                        <p style={{ fontSize: "25px", margin: "0px" }}>Order Details</p>
                    </div>
                </div>
                <div className="row" style={{ fontSize: "14px" }}>
                    Ordered on {moment(this.state.order.placed_on).format("MMMM Do, YYYY")} | Order# {this.state.order._id}
                </div>
                <div className="row" style={{ borderRadius: "5px", border: "1.5px solid #edebeb", marginTop: "10px", marginBottom: "10px", padding: "10px" }}>
                    <div className="col-md-4">
                        <div style={{ fontSize: "13px", marginBottom: "4px" }}><b>Shipping Address</b></div>
                        <div style={{ fontSize: "13px" }}>{this.state.order.address.name}</div>
                        <div style={{ fontSize: "13px" }}>{this.state.order.address.line1}</div>
                        <div style={{ fontSize: "13px" }}>{this.state.order.address.line2}</div>
                        <div style={{ fontSize: "13px" }}>{this.state.order.address.city}, {this.state.order.address.state}, {this.state.order.address.zipcode}</div>
                        <div style={{ fontSize: "13px" }}>{this.state.order.address.country}</div>
                    </div>
                    <div className="col-md-4">
                        <div style={{ fontSize: "13px", marginBottom: "4px" }}><b>Payment Method</b></div>
                        <div style={{ fontSize: "13px" }}>
                            <img alt="Visa" src="https://images-na.ssl-images-amazon.com/images/G/01/checkout/payselect/card-logos-small/visa._CB485936331_.gif" />
                        &nbsp;<b>****</b> {_.isUndefined(this.state.order.payment.card_number) ? "" : this.state.order.payment.card_number.substr(12, 4)}
                        </div>
                    </div>
                    <div className="col-md-4" style={{ fontSize: "13px" }}>
                        <div style={{ fontSize: "13px", marginBottom: "2px" }} className="row"><b>Order Summary</b></div>
                        <div className="col-md-8" style={{ padding: "0px" }}>
                            Items(s) Subtotal:
                        </div>
                        <div className="col-md-4" style={{ float: "right" }}>
                            $ {this.state.order.total}
                        </div>
                        <div className="col-md-8" style={{ padding: "0px" }}>
                            Shipping & Handling:
                        </div>
                        <div className="col-md-4" style={{ float: "right" }}>
                            $ 0.0
                        </div>
                        <div className="col-md-8" style={{ padding: "10px 0px 0px" }}>
                            Total before tax:
                        </div>
                        <div className="col-md-4" style={{ float: "right", padding: "10px 15px 0px" }}>
                            $ {this.state.order.total}
                        </div>
                        <div className="col-md-7" style={{ padding: "0px" }}>
                            Estimated tax to be collected:
                        </div>
                        <div className="col-md-4" style={{ float: "right" }}>
                            $ {(this.state.order.total * 0.0925).toFixed(2)}
                        </div>
                        <div className="col-md-8" style={{ padding: "10px 0px 0px" }}>
                            <b>Grand Total:</b>
                        </div>
                        <div className="col-md-4" style={{ float: "right", padding: "10px 15px 0px" }}>
                            <b> $ {(this.state.order.total + (this.state.order.total * 0.0925)).toFixed(2)}</b>
                        </div>
                    </div>
                </div>
                <div>
                    {this.state.order.products.map(product => {
                        return (
                            <div className="row" style={{ borderRadius: "5px", border: "1.5px solid #edebeb", marginTop: "10px", marginBottom: "10px" }}>
                                <div className="row" style={{ margin: "10px 20px 10px" }}>
                                    <span style={{ fontWeight: "700", fontSize: "16px" }}>
                                        {product.tracking[product.tracking.length - 1].status}
                                                &nbsp;{moment(product.tracking[product.tracking.length - 1].updated_at).format("MMMM Do, YYYY")}
                                    </span>
                                </div>
                                <div className="row" style={{ marginLeft: "5px", marginBottom: "25px" }}>
                                    <div className="col-md-1"><img src={product.product_id.images[0]} style={{ height: "60px", width: "60px" }} /></div>
                                    <div className="col-md-8">
                                        <div className="row" style={{ fontSize: "13px" }}>
                                            <Link to={'/product/' + product.product_id._id}>{product.product_id.name}</Link>
                                        </div>
                                        <div className="row" style={{ fontSize: "12px", color: "#555555" }}>
                                            <p style={{ margin: "0px" }}>Sold By: <Link to={'/seller/' + product.seller_id._id}>{product.seller_id.name}</Link> | Product question?
                                                    <Link to={'/seller/' + product.seller_id._id}> Ask seller</Link></p>
                                        </div>
                                        <div className="row" style={{ fontSize: "12px", color: "#B12704", contrast: "6.9" }}>
                                            ${product.price}
                                        </div>
                                        <div className="row" style={{ marginTop: "5px" }}>
                                            <button style={{ backgroundColor: "#f0c14b", marginRight: "10px", height: "30px", padding: "3px 10px 3px", border: "1px solid #a88734" }}
                                                type="button" class="btn" >
                                                <img style={{ height: "20px", width: "20px" }}
                                                    src="https://m.media-amazon.com/images/G/01/AUIClients/YourAccountOrderHistoryCSSBuzz-bia_button_with_icon-9b49d8917348b252575f26251838e739ade8186a._V2_.png"></img> Buy it again
                                                    </button>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="row" style={{ marginBottom: "5px" }}>
                                            <button style={{ backgroundColor: "#e3e3e3", width: "100%", height: "30px", padding: "3px" }} type="button" class="btn orderButtons" >
                                                Ask Product Question
                                                    </button>
                                        </div>
                                        <div className="row" style={{ marginBottom: "5px" }}>
                                            <button style={{ backgroundColor: "#e3e3e3", width: "100%", height: "30px", padding: "3px" }} type="button" class="btn orderButtons" >
                                                Leave seller feedback
                                                    </button>
                                        </div>
                                        <div className="row">
                                            <button style={{ backgroundColor: "#e3e3e3", width: "100%", height: "30px", padding: "3px" }} type="button" class="btn orderButtons" >
                                                Write a product review
                                                    </button>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        customerOrderDetails: state.orders.customerOrderDetails
    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchOrderDetails: payload => dispatch(fetchOrderDetails(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);