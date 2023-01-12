import { createOrder } from "./FetchApi";
import { editQuantity } from "../product/FetchApi";
export const fetchData = async (cartListProduct, dispatch) => {
  dispatch({ type: "loading", payload: true });
  try {
    let responseData = await cartListProduct();
    if (responseData && responseData.Products) {
      setTimeout(function () {
        dispatch({ type: "cartProduct", payload: responseData.Products });
        dispatch({ type: "loading", payload: false });
      }, 1000);
    }
  } catch (error) {
    console.log(error);
  }
};


export const confirm = async(
      data,
      dispatch,
      state,
      setState,
      history
) => {
    try {
    let orderData = {
                    allProduct: JSON.parse(localStorage.getItem("cart")),
                    user: JSON.parse(localStorage.getItem("jwt")).user._id
                  };
                    let resposeData = await createOrder(orderData);
                    if (resposeData.success) {
                      let orderProducts = {allProduct: JSON.parse(localStorage.getItem("cart"))}
                      let res = await editQuantity(orderProducts);
                      localStorage.setItem("cart", JSON.stringify([]));

                      dispatch({ type: "cartProduct", payload: null });
                      dispatch({ type: "orderSuccess", payload: true });
                      setState({ clientToken: "", instance: {} });
                      dispatch({ type: "loading", payload: false });
                      return history.push("/");
                    } else if (resposeData.error) {
                      console.log(resposeData.error);
                    }
                  } catch (error) {
                    console.log(error);
                  }
};

export const editQty = async(data) => {
  try {
    let orderData = { allProduct: JSON.parse(localStorage.getItem("cart")) };
    //alert("editqty order data ",orderData);
    console.log("order data ",orderData);
    let res = await editQuantity(orderData);
  } catch (error) {
    console.log(error);
  }
};