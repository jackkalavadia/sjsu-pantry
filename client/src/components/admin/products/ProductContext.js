export const productState = {
  products: null,
  addProductModal: false,
  editProductModal: {
    modal: false,
    pName: "",
    pDescription: "",
    pId: "",
    pCategory: "",
    pQuantity: "",
    pImages: null,
    pStatus: "",
  },
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case "fetchProductsAndChangeState":
      return {
        ...state,
        products: action.payload,
      };
    case "addProductModal":
      return {
        ...state,
        addProductModal: action.payload,
      };
    case "editProductModalOpen":
      return {
        ...state,
        editProductModal: {
          modal: true,
          pId: action.product.pId,
          pStatus: action.product.pStatus,
          pCategory: action.product.pCategory,
          pImages: action.product.pImages,
          pName: action.product.pName,
          pDescription: action.product.pDescription,
          pQuantity: action.product.pQuantity,
        },
      };
    case "editProductModalClose":
      return {
        ...state,
        editProductModal: {
          modal: false,
          pId: "",
          pName: "",
          pDescription: "",
          pCategory: "",
          pQuantity: "",
          pImages: null,
          pStatus: "",

        },
      };
    default:
      return state;
  }
};
