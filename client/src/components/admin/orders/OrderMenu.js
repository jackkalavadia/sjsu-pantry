import React, { Fragment, useState, useContext } from "react";
import { OrderContext } from "./index";
import UpdateOrderModal from "./UpdateOrderModal";
import { filterOrder } from "./Actions";

const OrderMenu = (props) => {
  const { data, dispatch } = useContext(OrderContext);
  const [dropdown, setDropdown] = useState(false);
  return (
    <Fragment>
      <div className="col-span-1 flex items-center">
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0 w-full">

          <div
            style={{ background: "#303031" }}
            className="relative rounded-full text-gray-100 text-sm font-semibold uppercase"
          >

            <div
              style={{ background: "#303031" }}
              className={`${
                dropdown ? "" : "hidden"
              } absolute top-0 left-0 mt-12 rounded-lg overflow-hidden w-full md:w-48 flex flex-col z-10`}
            >
              <span
                onClick={(e) =>
                  filterOrder("All", data, dispatch, dropdown, setDropdown)
                }
                className="px-4 py-2 hover:bg-black text-center cursor-pointer"
              >
                All
              </span>

              <span
                onClick={(e) =>
                  filterOrder("Shipped", data, dispatch, dropdown, setDropdown)
                }
                className="px-4 py-2 hover:bg-black text-center cursor-pointer"
              >
                Shipped
              </span>
              <span
                onClick={(e) =>
                  filterOrder(
                    "Delivered",
                    data,
                    dispatch,
                    dropdown,
                    setDropdown
                  )
                }
                className="px-4 py-2 hover:bg-black text-center cursor-pointer"
              >
                Delivered
              </span>
              <span
                onClick={(e) =>
                  filterOrder(
                    "Cancelled",
                    data,
                    dispatch,
                    dropdown,
                    setDropdown
                  )
                }
                className="px-4 py-2 hover:bg-black text-center cursor-pointer"
              >
                Cancelled
              </span>
            </div>
          </div>

        </div>

        <UpdateOrderModal />
      </div>
    </Fragment>
  );
};

export default OrderMenu;
