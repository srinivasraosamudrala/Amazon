import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Signup from '../Signup';
import Login from '../Login';
import Navbar from '../Navbar';
import productcatalog from '../customer/productcatalog';
import SellerCatalog from '../Seller/productsCatlog';
import SellerProfilePage from "../Seller/profile"
import CustomerOrdersHome from '../customer/OrdersHome';
import CustomerOrderDetails from '../customer/OrderDetails';
import SellerOrdersHome from '../Seller/OrdersHome';
import SellerOrderDetails from '../Seller/OrderDetails';
import ProductDetailPage from '../customer/ProductDetailPage';
import AdminOrdersHome from '../Admin/Orders';
import SellerProfiles from '../Admin/Sellers';
import ProductReview from '../customer/ProductReview';

class Main extends Component {
    render() {
        return (
            <div>
                <Route path="/" component={Navbar} />
                <Route exact path="/signin" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/your-account/order-history" component={CustomerOrdersHome} />
                <Route exact path="/orders/:id" component={CustomerOrderDetails} />
                <Route exact path="/catalog" component={productcatalog} />
                <Route exact path="/seller/orders" component={SellerOrdersHome} />
                <Route exact path="/seller/orders/:id" component={SellerOrderDetails} />
                <Route exact path="/seller/home" component={SellerCatalog} />
                <Route exact path = "/seller/profile" component = {SellerProfilePage} />
                <Route path="/Product/:id" exact component={ProductDetailPage}/>
                <Route exact path="/admin/orders" component={AdminOrdersHome} />
                <Route exact path="/admin/sellers" component={SellerProfiles} />
                <Route exact path="/review/review-your-purchases" component={ProductReview} />
            </div>
        )
    }
}

export default Main;