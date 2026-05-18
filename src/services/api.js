const BASE_URL = import.meta.env.VITE_API_URL;

/* =========================
   TOKEN
========================= */
const getToken = () => localStorage.getItem("token");

/* =========================
   SAFE FETCH
========================= */
const safeFetch = async (url, options = {}) => {
  const res = await fetch(url, options);

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      data.message || "Request failed"
    );
  }

  return data;
};

/* =========================
   PRODUCTS
========================= */

// GET PRODUCTS
export const fetchProducts = async () => {
  const data = await safeFetch(
    `${BASE_URL}/products`
  );

  return data.products || [];
};

// alias

export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  const data = await res.json();

  return data.products; // ALWAYS array
};

// SEARCH PRODUCTS
export const searchProducts = async (query) => {
  const data = await safeFetch(
    `${BASE_URL}/products/search?q=${encodeURIComponent(
      query
    )}`
  );

  return data.products || [];
};

// CREATE PRODUCT
export const createProduct = async (product) => {
  return await safeFetch(
    `${BASE_URL}/products`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(product)
    }
  );
};

// UPDATE PRODUCT
export const updateProduct = async (
  id,
  product
) => {
  return await safeFetch(
    `${BASE_URL}/products/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(product)
    }
  );
};

// DELETE PRODUCT
export const deleteProduct = async (id) => {
  return await safeFetch(
    `${BASE_URL}/products/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
};

/* =========================
   IMAGE UPLOAD
========================= */

export const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  const data = await safeFetch(
    `${BASE_URL}/upload`,
    {
      method: "POST",
      body: formData
    }
  );

  // ✅ FINAL FIX
  return (
    data.url ||
    data.imageUrl ||
    data.secure_url ||
    ""
  );
};

/* =========================
   AUTH
========================= */

export const loginUser = async (
  email,
  password
) => {
  return await safeFetch(
    `${BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    }
  );
};

export const registerUser = async (
  name,
  email,
  password
) => {
  return await safeFetch(
    `${BASE_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    }
  );
};

/* =========================
   WISHLIST
========================= */

export const fetchWishlist = async () => {
  return await safeFetch(
    `${BASE_URL}/wishlist`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
};

export const addWishlistItem = async (
  item
) => {
  return await safeFetch(
    `${BASE_URL}/wishlist/add`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(item)
    }
  );
};

export const removeWishlistItem = async (
  id
) => {
  return await safeFetch(
    `${BASE_URL}/wishlist/remove`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({ id })
    }
  );
};