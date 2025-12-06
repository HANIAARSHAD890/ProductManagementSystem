$(document).ready(function () {

    loadCategories();

   function loadCategories() {
        apiGet("/categories").then(res => {
            console.log("Response received:", res); // Good for debugging
            $("#categoryList").html("");
            res.forEach(cat => {  // <-- use res, not res.data
                $("#categoryList").append(`
                    <div class="category-card">
                        <b>${cat.name}</b>
                        <p class="description">${cat.description}</p>
                        <button onclick="loadProducts(${cat.id})">View Products</button>
                    </div>
                `);
            });
        });
    }

});

function loadProducts(catId) {
    apiGet(`/categories/${catId}/products`).then(res => {
        $("#categoryProducts").html("");

        res.forEach(p => {  // <-- same here
            $("#categoryProducts").append(`
                <div class="product-card">
                    <b>${p.name}</b> - $${p.price}<br>
                    <span class="description">${p.description}</span><br>
                    Category: ${p.category}<br>
                    Stock Qty: ${p.stock_quantity}
                </div>
            `);
        });
    });
}
