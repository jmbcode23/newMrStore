import { HomeFilled } from "@ant-design/icons";
import { Menu, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import AppCart from "./AppCart";

function AppHeader() {

    const items = [
        {
            label: <HomeFilled />,
            key: "",
        },
        {
            label: "Men",
            key: "men",
            children: [
                {
                    label: "Men's Shirts",
                    key: "mens-shirts",
                },
                {
                    label: "Men's Shoes",
                    key: "mens-shoes",
                },
                {
                    label: "Men's Watches",
                    key: "mens-watches",
                },
            ],
        },
        {
            label: "Women",
            key: "women",
            children: [
                {
                    label: "Women's Dresses",
                    key: "womens-dresses",
                },
                {
                    label: "Women's Shoes",
                    key: "womens-shoes",
                },
                {
                    label: "Women's Watches",
                    key: "womens-watches",
                },
                {
                    label: "Women's Bags",
                    key: "womens-bags",
                },
                {
                    label: "Women's Jewellery",
                    key: "womens-jewellery",
                },
            ],
        },
        {
            label: "Fragrances",
            key: "fragrances",
        },
        {
            label: "Contact us",
            key: "contact",
        }
    ]

    const navigate = useNavigate();

    const onMenuClick = (item) => {
        navigate(`/${item.key}`);
    };

    return (

        <div className="appHeader">
            <Menu
                className="appMenu"
                onClick={onMenuClick}
                mode="horizontal"
                items={items}
            />
            <Typography.Title>MrStore</Typography.Title>
            <AppCart />
        </div>
    );
}
export default AppHeader;
