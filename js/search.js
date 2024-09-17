function renderQuery() {
  const query = getSearchQueryFromUrl();

  $(".query").text('"' + query + '"');
}

function renderSearchResult(result) {
  $(".searching").addClass("d-none");

  if (result.total === 0) {
    $(".empty-result").removeClass("d-none");
  } else {
    $(".search-result").removeClass("d-none");
    renderProducts(".product-list", result.products);
  }
}

async function searchProduct(query) {
  const res = await client.get(
    `products/search?q=${query}&sortBy=price&order=desc`
  );

  return res.data;
}

function getSearchQueryFromUrl() {
  return new URLSearchParams(location.search).get("q");
}

function handleFilterFormChange() {
  const sortByPrice = $("#sort-by-price").val();

  const searchParams = new URLSearchParams(location.search);

  if (sortByPrice) {
    searchParams.set("sortBy", "price");
    searchParams.set("order", sortByPrice);
  } else {
    searchParams.delete("sortBy");
    searchParams.delete("order");
  }

  window.location.href = `search.html?${searchParams.toString()}`;
}

$(function () {
  const query = getSearchQueryFromUrl();

  if (query && query.trim().length > 0) {
    renderQuery(query);
    searchProduct(query).then(renderSearchResult);
    $(".filter-form").change(handleFilterFormChange);
  } else {
    // Hiển thị/xử lý trong trường hợp không có keyword
  }
});
