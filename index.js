// http://localhost:3000/items

const searchInput = document.querySelector("#search");
// const productsDOM = document.querySelector(".products");
const productsCenter = document.querySelector(".products-center");
const btns = document.querySelectorAll(".btn");
let allProductsData = [];
const filters = {
  searchItems: "",
};

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((res) => {
      allProductsData = res.data;
      //   render products on DOM
      renderProducts(res.data, filters);
    })
    .catch((err) => console.log(err));
});

function renderProducts(_products, _filters) {
  const filteredProducts = _products.filter((p) =>
    p.title.toLowerCase().includes(filters.searchItems.toLowerCase())
  );
  productsCenter.innerHTML = "";
  //   render to DOM
  filteredProducts.forEach((item) => {
    // Create
    const productsDiv = document.createElement("div");
    productsDiv.classList.add("product");
    // Content
    productsDiv.innerHTML = `
        <div class="img-container">
            <img src="${item.image}" alt="p-${item.id}" class="product-img" />
        </div>
        <div class="product-desc">
            <p class="product-price">$ ${item.price}</p>
            <p class="product-title">${item.title}</p>
        </div>`;
    // Append to .products
    productsCenter.appendChild(productsDiv);
  });
}

searchInput.addEventListener("input", (e) => {
  filters.searchItems = e.target.value;
  renderProducts(allProductsData, filters);
});

// Filter based on categories

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const filter = e.target.dataset.filter
    filters.searchItems = filter;
    renderProducts(allProductsData, filters);
  });
});
