import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import '../App.css';
import _ from 'lodash';
import Amazon from './images/amazonLogo.jpg';
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/signupActions"
import { fetchProducts, clearProducts } from "../redux/actions/customerActions"
import { showAddProduct } from "../redux/actions/sellerActions"
import AddProduct from "../components/Seller/ProductModifictaion"
import './css/navbar.css'
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customersearchText: "",
            displayResultsOffset: 1,
            sellerProductSearch: "",
            category: "",
            sortType: "",
            redirectVar:"",
            showCart: false
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.fetchProducts = this.fetchProducts.bind(this);
        this.showAddProduct = this.showAddProduct.bind(this);
        this.onInputHandler = this.onInputHandler.bind(this);
        this.onSellerProductSearch = this.onSellerProductSearch.bind(this);

    }

    componentDidMount()
    {
        this.setState({
            sellerProductSearch : this.props.seller.searchTxt
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            customersearchText: nextProps.productSearchInput,
            category: nextProps.filterCategory,
            displayResultsOffset: nextProps.displayResultsOffset,
            sortType: nextProps.sortType,
            sellerProductSearch : nextProps.seller.searchTxt
        });
    }

    handleLogout = () => {
        this.props.clearProducts({})
        this.props.logoutUser({})
    }

    inputChangeHandler = (e) => {
        const value = e.target.value
        this.setState({
            [e.target.name]: value
        })
    }

    fetchProducts = (e) => {
        //e.preventDefault();
        let data = {
            searchText: this.state.customersearchText,
            filterCategory: this.state.category,
            displayResultsOffset: this.state.displayResultsOffset,
            sortType: this.state.sortType
        }
        this.props.fetchProducts(data)
    }
    showAddProduct() {
        this.props.showAddProduct();
    }

    customerCart() {
        this.setState({
            showCart: true
        })
    }
    onSellerProductSearch(e) {
        e.preventDefault();
        let redirectVar = <Redirect to={{
            pathname: "/seller/home/"+this.state.sellerProductSearch,
            state: {
                search: this.state.sellerProductSearch,
                isSeller: false,
            }
        }}  >

        </Redirect>
        this.setState({
            redirectVar: redirectVar
        })
    }

    onInputHandler(e)
    {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {
        let navBar = null;
        if (sessionStorage.getItem("email") !== null && sessionStorage.getItem("persona") === "customer") {
            navBar = (
                <div>
                    <ul class="nav navbar-nav">

                        <div class="input-group nav-bar-search">
                            <input type="text" class="form-control" onChange={this.inputChangeHandler} placeholder="Search" name="customersearchText" />
                            <div class="input-group-btn nav-bar-searchRadius">
                                <button class="btn btn-default nav-bar-searchIcon" onClick={() => this.fetchProducts()} type="submit"><i class="glyphicon glyphicon-search"></i></button>
                            </div>
                        </div>

                    </ul>
                    <ul class="nav navbar-nav">
                        <div class="dropdown">
                            <button class="dropbtn">  <span class="nav-bar-userDetails"> Hello, {sessionStorage.getItem('name')}</span> <br></br> <span class="nav-bar-bottom-text"> Account & Lists </span></button>
                            <div class="dropdown-content">
                                <li onClick="">

                                    <Link to="/customer/account" >      Your Account</Link>
                                </li>
                                <li onClick="">

                                    <Link to="/your-account/order-history" >     Your Order </Link>
                                </li>
                                <li onClick={this.handleLogout}>
                                    <Link to="/signin" >   Logout </Link>

                                </li>
                            </div>
                        </div>
                    </ul>
                    <ul class="nav navbar-nav">
                        <div class="dropdown">
                            <button class="dropbtn" onClick="">  <span class="nav-bar-userDetails"> Returns</span> <br></br> <span class="nav-bar-bottom-text"> & Orders </span></button>
                        </div>
                    </ul>
                    <ul class="nav navbar-nav">
                        <div class="dropdown">
                            <button class="dropbtn" onClick="">  <span class="nav-bar-userDetails"> Videos </span> <br></br> <span class="nav-bar-bottom-text"> Prime </span></button>
                        </div>
                    </ul>
                    <ul class="nav navbar-nav navbar-right" style={{ "padding-right": "20px" }}>
                        <div class="row nav-bar-cart-complete" onClick={() => this.customerCart()}>
                            <div class="col-md-6 nav-cart-icon nav-sprite">

                            </div>
                            <div class="col-md-6 nav-bar-cart">
                                Cart
                            </div>
                        </div>
                    </ul>
                </div>
            )
        } else if (sessionStorage.getItem("email") !== null && sessionStorage.getItem("persona") === "seller") {
            navBar = (
                <div>
                    {this.state.redirectVar}
                    <AddProduct></AddProduct>
                    <ul class="nav navbar-nav">
                        <form >
                            <div class="input-group nav-bar-search">
                                <input type="text" class="form-control" placeholder="Search" name="sellerProductSearch" value={this.state.sellerProductSearch} onChange = {this.onInputHandler} />
                                <div class="input-group-btn nav-bar-searchRadius">
                                    <Link to={{
            pathname: "/seller/home/"+this.state.sellerProductSearch,
            state: {
                search: this.state.sellerProductSearch,
                isSeller: false,
            }
        }}>  <button class="btn btn-default nav-bar-searchIcon" ><i class="glyphicon glyphicon-search"></i></button>
        </Link>
                                     </div>
                            </div>
                        </form>
                    </ul>
                    <ul class="nav navbar-nav">
                        <div class="dropdown">
                            <button class="dropbtn">  <span class="nav-bar-userDetails"> Hello, {sessionStorage.getItem('name')}</span> <br></br> <span class="nav-bar-bottom-text"> Account & Lists </span></button>
                            <div class="dropdown-content">
                                <li onClick="">

                                    <Link to="/seller/profile" >      Your Account</Link>
                                </li >
                                <li onClick="">

                                    <Link to="/seller/home" >     Your Products </Link>
                                </li>
                                <li onClick="">

                                    <Link to="/signin" >     Your Orders </Link>
                                </li>
                                <li onClick={this.handleLogout}>
                                    <Link to="/signin" >   Logout </Link>

                                </li>
                            </div>
                        </div>
                    </ul>
                    <ul class="nav navbar-nav">
                        <div class="dropdown">
                            <button class="dropbtn" onClick="">  <span class="nav-bar-userDetails"> Returns</span> <br></br> <span class="nav-bar-bottom-text"> & Orders </span></button>
                        </div>
                    </ul>
                    <ul class="nav navbar-nav">
                        <div class="dropdown">
                            {/* <button type="button" class="btn btn-primary" >
                    Launch demo modal
</button> */}
                            <button class="dropbtn" onClick={this.showAddProduct} >  <span class="nav-bar-userDetails"> Add a new</span> <br></br> <span class="nav-bar-bottom-text"> Product </span></button>
                        </div>
                    </ul>

                </div>
            )
        } else if (sessionStorage.getItem("email") !== null && sessionStorage.getItem("persona") === "admin") {
            navBar = (
                <div>
                    <div class="col-md-6">

                    </div>
                    <div class="col-md-2">
                        <ul class="nav navbar-nav">
                            <div class="" style={{ marginTop: "8%" }}>
                                <Link to="/signin" class="" style={{ color: "white" }} >   <span class=""> Manage Inventory Listings </span></Link >
                            </div>
                        </ul>
                    </div>
                    <div class="col-md-1">
                        <ul class="nav navbar-nav">
                            <div class="" style={{ marginTop: "32%" }}>
                                <Link to="/admin/sellers" class="" style={{ color: "white" }} >   <span class=""> Sellers  </span></Link >
                            </div>
                        </ul>
                    </div>
                    <div class="col-md-1">
                        <ul class="nav navbar-nav">
                            <div class="" style={{ marginTop: "35%" }}>
                                <Link to="/admin/orders" class="" style={{ color: "white" }} >   <span class=""> Orders </span></Link >
                            </div>
                        </ul>
                    </div>




                    <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/signin" onClick={this.handleLogout} style={{ color: "white" }}><span class="glyphicon glyphicon-log-out"></span> Logout</Link></li>
                    </ul>
                </div>
            )
        }
        let redirectVar = null;
        if (!sessionStorage.getItem("persona")) redirectVar = <Redirect to="/signin" />
        if (this.state.showCart) { redirectVar = <Redirect to={`/customer/${sessionStorage.getItem('id')}/cart`} /> }
        return (
            <div>
                {redirectVar}
                <nav class="navbar  nav-bar-complete" style={{ backgroundColor: "#111111", borderRadius: "0px", padding: "0px", margin: "0px", paddingTop: "3px", paddingBottom: "3px" }}>
                    <div class="container-fluid">
                        <div class="navbar-header" style={{ display: "inline" }}>
                            <img class="nav-bar-logo" src={Amazon} />
                        </div>

                        {navBar}
                    </div>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        seller : state.sellerReducer,
        productSearchInput: state.customer.productSearchInput,
        filterCategory: state.customer.filterCategory,
        displayResultsOffset: state.customer.displayResultsOffset,
        sortType: state.customer.sortType
    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchProducts: payload => dispatch(fetchProducts(payload)),
        clearProducts: payload => dispatch(clearProducts(payload)),
        logoutUser: payload => dispatch(logoutUser(payload)),
        showAddProduct: payload => dispatch(showAddProduct(true))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);