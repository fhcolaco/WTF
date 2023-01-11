import React from "react";
import Layout from "./components/Layout";
import "./styles/dashboard.css"

const Dashboard = ({ Components, pageProps }) => {
    return (
        <Layout>
            <Components {...pageProps} />
        </Layout>
    );
}

export default Dashboard;