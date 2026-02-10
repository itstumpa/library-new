// const {
//   cart,              // CartItem[]
//   addToCart,         // (product, quantity?) => void
//   removeFromCart,    // (productId) => void
//   updateQuantity,    // (productId, quantity) => void
//   clearCart,         // () => void
//   getCartTotal,      // () => number
//   getCartCount,      // () => number
//   isInCart,          // (productId) => boolean
// } = useCart();

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image: string;
  author?: string;
  stock: number;
  bestseller?: boolean;
  featured?: boolean;
  rating?: number;
  reviews?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  isInCart: (productId: string) => boolean;
}

export interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  getWishlistCount: () => number;
  moveToCart: (productId: string) => void;
}