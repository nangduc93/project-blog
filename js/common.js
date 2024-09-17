// Gọi API
// Render màn hình
// Gắn trình quản lý dữ liệu


const instance = axios.create({
    baseURL: 'https://dummyjson.com/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });

async function getCategories() {
    const res = await client.get("products/categories")

    return res.data;
}

function renderCategories(categories = []) {
    const $categories = $(".categories-dropdown");
  
    categories.forEach((cat) =>
      $(
        `<div><a class="dropdown-item list-style-none" href="collection.html?category=${cat.slug}">${cat.name}</a></div>`
      ).appendTo($categories)
    );
  }

  // SEARCH
function onSearchFormSubmit(e) {
    e.preventDefault();
  
    const $searchInput = $(".search-input");
    const query = $searchInput.val().trim();
  
    if (query.length === 0) {
      return;
    }
  
    $searchInput.val("");
    window.location.href = `search.html?q=${query}`;
  }
  
  // PRODUCTS
  async function getProductsBySlug(slug) {
    const res = await client.get(`products/category/${slug}`);
  
    return res.data;
  }
  
  async function getProductById(id) {
    const res = await client.get(`products/${id}`);
  
    return res.data;
  }
  
  function renderProducts(target, products) {
    const $target = $(target);
    $target.empty();
  
    products.forEach((p) => {
      $(
        [
          `<div class="card">`,
          `<img src="${p.thumbnail}" class="card-img-top" alt="${p.title}">`,
          `<div class="card-body">`,
          `<h5 class="card-title">${p.title}</h5>`,
          `<a href="product.html?product-id=${p.id}" class="btn btn-primary">Show detail</a>`,
          `</div>`,
          `</div>`,
        ].join("")
      ).appendTo($target);
    });
  }
  
  // SHOPING CART
  function renderCartButton() {
    const cartData = localStorage.getItem("cart");
  
    if (cartData) {
      const cart = JSON.parse(cartData);
      $(".btn-cart .badge").text(cart.totalQuantity);
    }
  }
  
  async function addToCart(id, quantity = 1) {
    const res = await client.post(`carts/add`, {
      userId: 1,
      products: [
        {
          id: id,
          quantity,
        },
        {
          id: 121,
          quantity: 2,
        },
        {
          id: 177,
          quantity: 1,
        },
      ],
    });
  
    return res.data;
  }
  
  $(function () {
    getCategories().then(renderCategories);
    $(".header .search-form").submit(onSearchFormSubmit);
    renderCartButton();
  });
  