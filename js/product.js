function renderCarousel(product) {
  const $mainCarousel = $(".main-carousel .embla__container");
  const $thumbCarousel = $(".thumb-carousel .embla__container");

  product.images.forEach((image) =>
    $(
      [
        `<div class="embla__slide">`,
        `<div class="product-image">`,
        `<img src="${image}" alt="${product.title}" />`,
        `</div>`,
        `</div>`,
      ].join("")
    )
      .appendTo($mainCarousel)
      .clone()
      .appendTo($thumbCarousel)
  );
}

function setupCarousel() {
  // MAIN
  const mainRootNode = document.querySelector(".main-carousel .embla");
  const mainViewportNode = mainRootNode.querySelector(".embla__viewport");

  // Grab button nodes
  // const mainPrevButtonNode = mainRootNode.querySelector(".embla__prev");
  // const mainNextButtonNode = mainRootNode.querySelector(".embla__next");

  const mainEmbla = EmblaCarousel(mainViewportNode, {
    dragFree: false,
    align: "start",
  });

  // Add click listeners
  // mainPrevButtonNode.addEventListener("click", mainEmbla.scrollPrev, false);
  // mainNextButtonNode.addEventListener("click", mainEmbla.scrollNext, false);

  // THUMB
  const thumbRootNode = document.querySelector(".thumb-carousel .embla");
  const thumbViewportNode = thumbRootNode.querySelector(".embla__viewport");

  // Grab button nodes
  // const thumbPrevButtonNode = thumbRootNode.querySelector(".embla__prev");
  // const thumbNextButtonNode = thumbRootNode.querySelector(".embla__next");

  const thumbEmbla = EmblaCarousel(
    thumbViewportNode,
    {
      dragFree: true,
      align: "start",
    },
    [EmblaCarouselClassNames()]
  );

  // Add click listeners
  // thumbPrevButtonNode.addEventListener("click", thumbEmbla.scrollPrev, false);
  // thumbNextButtonNode.addEventListener("click", thumbEmbla.scrollNext, false);

  const slidesThumbs = thumbEmbla.slideNodes();

  const toggleThumbBtnsState = () => {
    thumbEmbla.scrollTo(mainEmbla.selectedScrollSnap());
    const previous = mainEmbla.previousScrollSnap();
    const selected = mainEmbla.selectedScrollSnap();
    slidesThumbs[previous].classList.remove("embla-thumbs__slide--selected");
    slidesThumbs[selected].classList.add("embla-thumbs__slide--selected");
  };

  mainEmbla.on("select", toggleThumbBtnsState);
  thumbEmbla.on("init", toggleThumbBtnsState);

  slidesThumbs.forEach((slide, index) => {
    slide.addEventListener("click", () => {
      mainEmbla.scrollTo(index);
    });
  });
}

function renderBreadcrumb(product) {
  $(".breadcrumb-item.active").text(product.title);
}

function ratingStar(rating) {
  let star = "";
  for (let i = 0; i < rating; i++) {
    star += `<i class="bi bi-star-fill"></i>`;
  }
  for (let i = 0; i < 5 - rating; i++) {
    star += `<i class="bi bi-star"></i>`;
  }
  return star;
}

async function handleAddToCart(product) {
  $(".btn-add-to-cart").prop("disabled", true);
  $(".btn-add-to-cart").html(`
    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
    <span class="visually-hidden" role="status">Loading...</span>
    Adding...
    `);

  const data = await addToCart(product.id, 1);

  // Lưu vào bộ nhớ trình duyệt
  localStorage.setItem("cart", JSON.stringify(data));

  window.location.href = `shopping-cart.html`;
}

function renderProductInfo(product) {
  const rating = ratingStar(product.rating);

  $(".product-info")
    .html(
      `
    <h1 class="product-title">
      ${product.title}
    </h1>

    <div class="product-ratings d-flex gap-1">
      <div class="stars d-flex">
        ${rating}
      </div>

      <div class="reviews">${product.rating} (${product.reviews.length} reviews)</div>
    </div>

    <p class="product-price my-5">
      <span class="sale-price display-1">$${product.discountPercentage}</span>
      <span
        class="origin-price display-6 text-decoration-line-through text-secondary"
        >$${product.price}</span
      >
    </p>

    <div class="d-flex flex-column gap-2">
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-outline-info">-</button>
        <button type="button" class="btn btn-outline-info">1</button>
        <button type="button" class="btn btn-outline-info">+</button>
      </div>

      <button type="button" class="btn btn-primary btn-add-to-cart">Add To Cart</button>
    </div>

    <div class="product-description mt-5">
      <h5>Description</h5>
      <p class="product-description">
        ${product.description}
      </p>
    </div>
    `
    )
    .find(".btn-add-to-cart")
    .click(() => handleAddToCart(product));
}

function renderProduct(product) {
  renderCarousel(product);
  setupCarousel();
  renderBreadcrumb(product);
  renderProductInfo(product);
}

$(function () {
  const searchParams = new URLSearchParams(location.search);

  const productId = searchParams.get("product-id");

  if (productId) {
    getProductById(productId).then(renderProduct);
  } else {
    // Hiển thị lỗi | không có sản phẩm
  }
});
