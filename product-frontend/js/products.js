$(document).ready(function () {

    loadProducts();
function loadProducts() {
        apiGet("/products").then(res => {
            $("#productList").html(""); // Clear existing

            res.forEach(product => {
                $("#productList").append(`
                    <div class="product-card">
                        <b>${product.name}</b> - $${product.price}<br>
                        <span class="description">${product.description}</span><br>
                        Category: ${product.category}<br>
                        Stock Quantity: ${product.stock_quantity}<br>
                        <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
                       <button class="update-btn" onclick="showUpdateForm(${product.id})">Update</button>   
            <div class="updateForm" id="updateForm-${product.id}" style="display:none; margin-top:10px;">
                <input id="updateName-${product.id}" placeholder="Name" value="${product.name}"><br>
                <input id="updatePrice-${product.id}" placeholder="Price" value="${product.price}"><br>
                <input id="updateDescription-${product.id}" placeholder="Description" value="${product.description}"><br>
                <input id="updateCategory-${product.id}" placeholder="Category" value="${product.category}"><br>
                <input id="updateStock-${product.id}" placeholder="Stock Quantity" value="${product.stock_quantity}"><br>
                <button class="update-btn" onclick="updateProduct(${product.id})">Save</button>
                <button class="delete-btn" onclick="cancelUpdate(${product.id})">Cancel</button>
            </div>

                    </div>
                `);
            });
        });
    }

    // Add product
    $("#addBtn").click(function () {
        const newProduct = {
            name: $("#name").val(),
            price: parseFloat($("#price").val()),
            description: $("#description").val(),
            category: $("#category").val(),
            stock_quantity: parseInt($("#stock_quantity").val())
        };

        apiPost("/products", newProduct).then(() => {
            // Clear inputs
            $("#name").val("");
            $("#price").val("");
            $("#description").val("");
            $("#category").val("");
            $("#stock_quantity").val("");

            loadProducts(); // Reload product list
        });
    });

});


function showUpdateForm(id) {
    $(`#updateForm-${id}`).slideDown();
}

function cancelUpdate(id) {
    $(`#updateForm-${id}`).slideUp();
}

function updateProduct(id) {
    const updatedProduct = {
        name: $(`#updateName-${id}`).val(),
        price: parseFloat($(`#updatePrice-${id}`).val()),
        description: $(`#updateDescription-${id}`).val(),
        category: $(`#updateCategory-${id}`).val(),
        stock_quantity: parseInt($(`#updateStock-${id}`).val())
    };

    if (!updatedProduct.name || !updatedProduct.description || 
        isNaN(updatedProduct.price) || !updatedProduct.category || 
        isNaN(updatedProduct.stock_quantity)) {
        alert("Invalid input. Update cancelled.");
        return;
    }

    apiPut(`/products/${id}`, updatedProduct)
        .then(() => {
           $(`#updateName-${id}`).val(updatedProduct.name);
    $(`#updatePrice-${id}`).val(updatedProduct.price);
    $(`#updateDescription-${id}`).val(updatedProduct.description);
    $(`#updateCategory-${id}`).val(updatedProduct.category);
    $(`#updateStock-${id}`).val(updatedProduct.stock_quantity);

    $(`#updateForm-${id}`).slideUp();  // hide the form
        })
        .catch(err => console.error("Error updating product:", err));
        loadProducts();
}

function deleteProduct(id) {
    apiDelete(`/products/${id}`).then(() => {
        location.reload();
    });
}
