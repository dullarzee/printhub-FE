const env = process.env.NEXT_PUBLIC_ENVIRONMENT;

const backendUrl =
  env === "dev" ? "http://localhost:8080" : "https://tomiwa_printhub.onrender";

const BEendpoints = {
  get_products: `${backendUrl}/api/products`,
  get_single_product: (id: string) => `${backendUrl}/api/products/${id}`,
  signup: `${backendUrl}/api/auth/signup`,
  login: `${backendUrl}/api/auth/login`,
  check_auth: `${backendUrl}/api/auth/checkAuth`,
  add_to_cart: `${backendUrl}/api/cart/add`,
  get_cart: (userId: string) => `${backendUrl}/api/cart/getAll/${userId}`,
  update_cart: (userId: string, productId: string, quantity: number) =>
    `${backendUrl}/api/cart/update/${userId}/${productId}/${quantity}`,
  delete_cart_item: (userId: string, productId: string) =>
    `${backendUrl}/api/cart/delete/${userId}/${productId}`,
};
export default BEendpoints;
