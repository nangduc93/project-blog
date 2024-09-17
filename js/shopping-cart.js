function renderCartItemList(cart) {
  $(".cart-items").html(
    cart.products
      .map((item) => {
        return `
          <div class="card mb-3">
            <div class="row g-0">
              <div class="col-md-3">
                <img src="${item.thumbnail}" class="img-fluid rounded-start" alt="${item.title}" />
              </div>
              <div class="col-md-9">
                <div class="card-body">
                  <h5 class="card-title">${item.title}</h5>

                  <div
                    class="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button type="button" class="btn btn-outline-info">
                      -
                    </button>
                    <button type="button" class="btn btn-outline-info">
                      ${item.quantity}
                    </button>
                    <button type="button" class="btn btn-outline-info">
                      +
                    </button>
                  </div>

                  <button type="button" class="btn btn-danger">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join("")
  );
}

function renderCartSummary(cart) {
  $(".total-price").text("$" + cart.total);
  $(".total-discount-price").text("$" + cart.discountedTotal);
  $(".total-items").text(cart.totalQuantity);
}

function renderShoppingCart(cart) {
  if (!cart.totalQuantity || cart.totalQuantity === 0) {
    $(".cart-empty").removeClass("d-none");
  } else {
    renderCartItemList(cart);
    renderCartSummary(cart);
    $(".cart").removeClass("d-none");
  }
}

$(function () {
  const cartData = localStorage.getItem("cart");

  if (cartData) {
    const cart = JSON.parse(cartData);

    renderShoppingCart(cart);
  } else {
    renderShoppingCart({});
  }
});
