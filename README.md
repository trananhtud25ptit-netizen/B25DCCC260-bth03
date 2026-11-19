# ShopMini - Ứng dụng cửa hàng trực tuyến (BaiTH03)

## Giải thích kiến trúc quản lý State

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
     