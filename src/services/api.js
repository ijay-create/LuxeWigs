const BASE_URL = import.meta.env.VITE_API_URL;

/* =========================
   🔐 TOKEN HELPER
========================= */
const getToken = () => {
  return localStorage.getItem("token");
};

/* =========================
   ❤️ WISHLIST API
========================= */

// GET WISHLIST
export const fetchWishlist = async () => {
  const res = await fetch(`${BASE_URL}/wishlist`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return res.json();
};

// ADD TO WISHLIST
export const addWishlistItem = async (item) => {
  const res = await fetch(`${BASE_URL}/wishlist/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(item)
  });

  return res.json();
};

// REMOVE FROM WISHLIST
export const removeWishlistItem = async (id) => {
  const res = await fetch(`${BASE_URL}/wishlist/remove`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ id })
  });

  return res.json();
};

/* =========================
   🛍️ PRODUCT API (PUBLIC)
========================= */

// GET ALL PRODUCTS
export const fetchProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
};

// IMPORTANT FIX
// FeaturedWigs.jsx is importing getProducts
export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
};

// SEARCH PRODUCTS
export const searchProducts = async (query) => {
  const res = await fetch(
    `${BASE_URL}/products/search?q=${encodeURIComponent(query)}`
  );

  return res.json();
};

/* =========================
   🔒 ADMIN PRODUCT API
========================= */

// CREATE PRODUCT
export const createProduct = async (product) => {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(product)
  });

  return res.json();
};

// UPDATE PRODUCT
export const updateProduct = async (id, product) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(product)
  });

  return res.json();
};

// DELETE PRODUCT
export const deleteProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return res.json();
};

/* =========================
   ☁️ IMAGE UPLOAD API
========================= */

export const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    body: formData
  });

  return res.json();
};