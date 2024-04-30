import { useState } from "react";
import { Button, message } from "antd";
import { addToCart } from "../Api";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../redux/counterSlice";


function AddToCartButton({ item }) {
    const [loading, setLoading] = useState(false);
    const count = useSelector((state) => state.counter.value);
    const disPatch = useDispatch();


    const addProductToCart = () => {
        setLoading(true);
        addToCart(item.id).then((res) => {
            message.success(`${item.title} has been added to cart!`);
            setLoading(false);
        });
    };
    return (
        <Button
            type="link"
            onClick={() => {
                addProductToCart();
                disPatch(increment());
            }}
            loading={loading}
        >
            Add to Cart
        </Button>
    );
};

export default AddToCartButton;