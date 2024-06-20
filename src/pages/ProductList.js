import React, { Fragment } from "react";
import ReactImageMagnify from "react-image-magnify";
import { useParams } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const { productId } = useParams();
  const productsArr = [
    {
      id: "a1",

      title: "Colors",

      price: 100,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
    },

    {
      id: "a2",

      title: "Black and white Colors",

      price: 50,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
    },

    {
      id: "a3",

      title: "Yellow and Black Colors",

      price: 70,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
    },

    {
      id: "a4",

      title: "Blue Color",

      price: 100,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
    },
  ];

  const snglprdct = productsArr.filter((item) => item.id === productId);

  return (
    <Fragment>
      {snglprdct.map((e) => (
        <div className="single-main">
          <div className="single-left">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: e.imageUrl,
                },
                largeImage: {
                  src: e.imageUrl,
                  width: 1200,
                  height: 1800,
                },
              }}
            />
          </div>
          <div className="single-right">
            <div className="single-title">Title : {e.title}</div>
            <div className="single-mrp">
              MRP : $<del>{e.price + 999}</del>
            </div>
            <div className="single-price">Price : ${e.price}</div>
            <div className="single-desc">
              Description : Lorem ipsum carrots enhanced rebates. Excellent
              sayings of a man of sorrows, hates no prosecutors will unfold in
              the enduring of which were born
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default ProductList;
