# ShopMini - Ứng dụng cửa hàng trực tuyến (BaiTH03)

## 1. Giải thích kiến trúc quản lý State

Dự án phân tách state theo 3 tầng dựa trên phạm vi sử dụng và tần suất cập nhật dữ liệu:

1. **Local State (`useState`)**:
   - **Dữ liệu lưu trữ:** Từ khóa tìm kiếm sản phẩm (`searchTerm` ở `HomePage`), dữ liệu nhập liệu form đăng nhập (`username`, `password`, `error` ở `LoginPage`), trạng thái đặt hàng thành công (`isSuccess` ở `CheckoutPage`).
   - **Lý do:** Đây là các trạng thái cục bộ chỉ phục vụ riêng cho giao diện hoặc tương tác ngắn hạn của một component duy nhất, không cần chia sẻ sang các trang khác.

2. **Context API (`ThemeContext`, `AuthContext`)**:
   - **Dữ liệu lưu trữ:** Giao diện sáng/tối (`theme`) và thông tin phiên đăng nhập người dùng (`user`).
   - **Lý do:** Dữ liệu cần truy cập toàn cục ở nhiều component (`Header`, `ProtectedRoute`, `LoginPage`, `CheckoutPage`) nhưng tần suất thay đổi thấp, logic cập nhật đơn giản. Context API giúp tránh truyền props qua nhiều cấp (prop drilling) mà không cần thêm boilerplate phức tạp.

3. **Redux Toolkit (`productsSlice`, `cartSlice`)**:
   - **Dữ liệu lưu trữ:** Danh sách sản phẩm tải từ API cùng trạng thái bất đồng bộ (`items`, `status`, `error`) và dữ liệu giỏ hàng (`items`, tổng số lượng, tổng tiền).
   - **Lý do:**
     - `productsSlice` cần xử lý gọi API bất đồng bộ (`createAsyncThunk`) và cache danh sách sản phẩm dùng chung giữa `HomePage` và `ProductDetailPage`.
     - `cartSlice` có nhiều nghiệp vụ cập nhật phức tạp (`addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`) kèm theo các selector tính toán dữ liệu dẫn xuất (tổng số lượng, tổng tiền) hiển thị đồng thời ở `Header`, `CartPage` và `CheckoutPage`.

## 2. Cấu trúc thư mục dự án

```text
shop-mini/
├── public/
├── src/
│   ├── app/
│   │   ├── store.ts                   # Cấu hình Redux store, RootState, AppDispatch
│   │   └── hooks.ts                   # Typed hooks (useAppDispatch, useAppSelector)
│   ├── features/
│   │   ├── products/
│   │   │   └── productsSlice.ts       # Gọi API sản phẩm bằng createAsyncThunk & xử lý trạng thái
│   │   └── cart/
│   │       └── cartSlice.ts           # Quản lý giỏ hàng (thêm, xóa, cập nhật SL) & selectors tổng
│   ├── contexts/
│   │   ├── ThemeContext.tsx           # Context giao diện sáng/tối & custom hook useTheme()
│   │   └── AuthContext.tsx            # Context đăng nhập giả lập & custom hook useAuth()
│   ├── components/
│   │   ├── Header.tsx                 # Header dùng chung (số lượng giỏ, user, đổi theme)
│   │   ├── ProductCard.tsx            # Thẻ hiển thị từng sản phẩm ở trang chủ
│   │   └── ProtectedRoute.tsx         # Bảo vệ route /checkout & lưu trang trước khi đăng nhập
│   ├── layouts/
│   │   └── MainLayout.tsx             # Bố cục chung bọc Header và nội dung các trang
│   ├── pages/
│   │   ├── HomePage.tsx               # Trang chủ: Lưới sản phẩm responsive & tìm kiếm theo tên
│   │   ├── ProductDetailPage.tsx      # Trang chi tiết sản phẩm (/products/:id)
│   │   ├── CartPage.tsx               # Trang giỏ hàng (/cart)
│   │   ├── LoginPage.tsx              # Trang đăng nhập (/login)
│   │   ├── CheckoutPage.tsx           # Trang thanh toán (/checkout)
│   │   └── NotFoundPage.tsx           # Trang 404 khi nhập sai đường dẫn
│   ├── types/
│   │   └── index.ts                   # Khai báo kiểu dữ liệu TypeScript (Product, CartItem, User)
│   ├── App.tsx                        # Khai báo hệ thống định tuyến (Routes)
│   ├── index.css                      # CSS giao diện Sáng/Tối & Responsive
│   └── main.tsx                       # Điểm khởi chạy, bọc Provider, ThemeProvider, AuthProvider, BrowserRouter
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```
