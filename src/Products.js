import { Badge, Card, Image, List, Rate, Typography, Select, Radio } from "antd";
import { useEffect, useState } from "react";
import { getAllProducts, getProductsByCategory } from "./Api";
import { useParams } from "react-router-dom";
import AddToCartButton from "./Components/AddToCartButton";

function Products() {

    const [loading, setLoading] = useState(false);
    const param = useParams();
    const [items, setItems] = useState([]);
    const [sortOrder, setSortOrder] = useState("az");
    

    useEffect(() => {
        setLoading(true);
        (param?.categoryId ? getProductsByCategory(param.categoryId) : getAllProducts())
            .then((res) => {
                setItems(res.products);
                setLoading(false);
            });
    }, [param]);

    const getSortedItems = () => {
        const sortedItems = [...items];
        sortedItems.sort((a, b) => {
            const aLowerCaseTitle = a.title.toLowerCase();
            const bLowerCaseTitle = b.title.toLowerCase();

            if (sortOrder === "az") {
                return aLowerCaseTitle > bLowerCaseTitle ? 1 : aLowerCaseTitle === bLowerCaseTitle ? 0 : -1;
            } else if (sortOrder === "za") {
                return aLowerCaseTitle < bLowerCaseTitle ? 1 : aLowerCaseTitle === bLowerCaseTitle ? 0 : -1;
            } else if (sortOrder === "lowHigh") {
                return a.price > b.price ? 1 : a.price === b.price ? 0 : -1;
            } else if (sortOrder === "highLow") {
                return a.price < b.price ? 1 : a.price === b.price ? 0 : -1;
            }
        });
        return sortedItems;
    };

    return (
        <>
            <div className="productsContainer">
                <div>
                    <Typography.Text>Filter: </Typography.Text>
                    <Radio.Group
                        optionType="button"
                        onChange={(e, value) => {
                            setSortOrder(e.target.value);
                        }}
                    >
                        <Radio value="az"> alphabetically a to z</Radio>
                        <Radio value="za"> alphabetically z to a</Radio>
                        <Radio value="lowHigh"> Price low to high</Radio>
                        <Radio value="highLow"> Price high to low</Radio>
                    </Radio.Group>
                </div>
                <List
                    loading={loading}
                    grid={{ column: 4 }}
                    renderItem={(product, index) => {
                        return (
                            <Badge.Ribbon
                                className="itemCardBadge"
                                text={`- ${Math.floor(product.discountPercentage)}%`}
                                color="#fe2712"
                            >
                                <Card
                                    className="itemCard"
                                    hoverable
                                    title={false}
                                    key={index}
                                    cover={
                                        <Image className="itemCardImage" src={product.thumbnail} />
                                    }
                                    actions={[
                                        <Rate allowHalf disabled value={product.rating} />,
                                        <AddToCartButton item={product} />,
                                    ]}
                                >
                                    <Card.Meta
                                        title={
                                            <Typography.Paragraph>
                                                <p>{product.title}</p>
                                                Price: ${product.price}{" "}
                                                <Typography.Text delete type="danger">
                                                    ${parseFloat(product.price + (product.price * product.discountPercentage) / 100).toFixed(2)}
                                                </Typography.Text>
                                            </Typography.Paragraph>
                                        }
                                        description={
                                            <Typography.Paragraph
                                                ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
                                            >
                                                {product.description}
                                            </Typography.Paragraph>
                                        }
                                    ></Card.Meta>
                                </Card>
                            </Badge.Ribbon>
                        );
                    }}
                    dataSource={getSortedItems()}
                ></List>
            </div>

        </>
    );
}

export default Products;
