function setupCategoryCarousel() {
    const rootNode = document.querySelector(".embla");
    const viewportNode = rootNode.querySelector(".embla__viewport");
  
    // Grab button nodes
    const prevButtonNode = rootNode.querySelector(".embla__prev");
    const nextButtonNode = rootNode.querySelector(".embla__next");
  
    const embla = EmblaCarousel(viewportNode, {
      dragFree: true,
      align: "start",
    });
  
    // Add click listeners
    prevButtonNode.addEventListener("click", embla.scrollPrev, false);
    nextButtonNode.addEventListener("click", embla.scrollNext, false);
  }
  
  function renderCategoryCarousel(categories) {
    const $categories = $(".categories-carousel .embla__container");
  
    categories.forEach((cat) =>
      $(
        [
          `<div class="embla__slide">`,
          `<div class="category-item">`,
          `<a class="">${cat.name}</a>`,
          `</div>`,
          `</div>`,
        ].join(""),
      )
        .click(() => loadProductsByCateogy(cat))
        .appendTo($categories),
    );
  }
  
  function loadProductsByCateogy(category) {
    getProductsBySlug(category.slug).then(function (data) {
      $(".selected-category").text(category.name);
      renderProducts(".products-by-category", data.products);
    });
  }
  
  $(async function () {
    const categories = await getCategories();
    renderCategoryCarousel(categories);
    setupCategoryCarousel(categories);
    loadProductsByCateogy(categories[0]);
  });
  