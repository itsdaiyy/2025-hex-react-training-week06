import { useEffect, useState } from "react";
import { clientGetProducts } from "../services/apiProducts";
import { clientAddCartItem } from "../services/apiCart";
import { Link } from "react-router-dom";

import ReactLoading from "react-loading";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isScreenLoading, setIsScreenLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsScreenLoading(true);
      const data = await clientGetProducts();
      setProducts(data.products);
      setIsScreenLoading(false);
    })();
  }, [setIsScreenLoading]);

  async function handleAddCartItem(id, qty) {
    setIsScreenLoading(true);
    await clientAddCartItem(id, qty);
    setIsScreenLoading(false);
  }

  return (
    <div className="container my-5">
      <div className="row gy-4">
        {products.map((product) => {
          const { id, imageUrl, title } = product;
          return (
            <div className="col-lg-3 col-md-4 col-6" key={id}>
              <div className="card h-100">
                <img
                  src={imageUrl}
                  className="card-img-top object-fit-cover"
                  alt={title}
                  style={{ aspectRatio: `3/2` }}
                />
                <div className="card-body  d-flex flex-column">
                  <h5 className="card-title fs-6">{title}</h5>
                </div>
                <div className="card-footer p-0 border-top-0">
                  <div
                    className="btn-group mt-auto w-100 "
                    role="group"
                    aria-label="Basic outlined example"
                  >
                    <button
                      className="btn btn-outline-secondary rounded-top-0"
                      type="button"
                      onClick={() => handleAddCartItem(id, 1)}
                    >
                      加入購物車
                    </button>
                    <Link
                      className="btn btn-outline-secondary rounded-top-0"
                      type="button"
                      to={`/products/${id}`}
                    >
                      查看細節
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isScreenLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.3)",
            zIndex: 999,
          }}
        >
          <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
