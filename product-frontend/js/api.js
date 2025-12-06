const BASE_URL = "http://localhost:5000/api";

// GET request
function apiGet(url) {
    return $.get(`${BASE_URL}${url}`);
}

// POST request
function apiPost(url, data) {
    return $.ajax({
        url: `${BASE_URL}${url}`,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data)
    });
}

// PUT request
function apiPut(url, data) {
    return $.ajax({
        url: `${BASE_URL}${url}`,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(data)
    });
}

// DELETE request
function apiDelete(url) {
    return $.ajax({
        url: `${BASE_URL}${url}`,
        type: "DELETE"
    });
}
