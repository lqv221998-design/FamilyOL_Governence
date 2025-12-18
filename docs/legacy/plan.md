Kế hoạch Thực hiện - Trình đọc RSS Cục bộ
Mô tả Mục tiêu
Xây dựng một ứng dụng web cục bộ "Cao cấp" để tổng hợp và đọc các nguồn cấp dữ liệu RSS. Ứng dụng sẽ giải quyết vấn đề phổ biến về CORS khi tải RSS từ trình duyệt bằng cách sử dụng proxy backend cục bộ. Giao diện người dùng sẽ ở dạng thẻ (card-based), hiện đại và có tính thẩm mỹ cao.

Yêu cầu Người dùng Xem xét
IMPORTANT

Quyết định Kiến trúc: Chúng ta sẽ sử dụng Next.js (App Router). Lý do: Các nguồn RSS thường chặn yêu cầu từ trình duyệt (CORS). Một ứng dụng Client-Side thuần túy không thể tải RSS bên ngoài một cách đáng tin cậy. Next.js cho phép chúng ta có các API Routes (/api/rss) hoạt động như một proxy để lấy dữ liệu từ phía server và trả về cho client.

NOTE

Lưu trữ: Dữ liệu đăng ký (danh sách URL nguồn tin) sẽ được lưu trong localStorage để đơn giản và đảm bảo quyền riêng tư, dữ liệu sẽ nằm trên máy của bạn.

Tech Stack Đề xuất
Framework: Next.js 14+ (React, TypeScript)
Styling: Vanilla CSS (CSS Modules) với việc sử dụng rộng rãi CSS Variables cho theming.
Quản lý Trạng thái: React Context API + SWR (Stale-While-Revalidate) để lấy dữ liệu.
Phân tích RSS: rss-parser (sử dụng trong API routes).
Thiết kế Kiến trúc (MVVM / Clean Architecture)
Model: Interfaces định nghĩa Feed, Article, Subscription.
View: React Components (Cards, Grid, Modal).
ViewModel (Logic): Custom Hooks (useFeeds, useRSS) có khả năng tổng hợp dữ liệu.
Services: RssService (Backend) để xử lý các yêu cầu HTTP và phân tích cú pháp (parsing).
Thẩm mỹ & Thiết kế
Giao diện: Chế độ Tối (Dark Mode) mặc định.
Phong cách: Glassmorphism (nền bán trong suốt, hiệu ứng mờ), chuyển động mượt mà.
Bố cục: Masonry hoặc Grid phản hồi (Responsive) cho các thẻ tin.
Kế hoạch Kiểm thử (Verification)
Kiểm thử Tự động
Unit tests cho RSS Parser Service.
Xác minh API Route.
Kiểm thử Thủ công
Thêm các URL RSS hợp lệ/không hợp lệ.
Kiểm tra độ phản hồi của bố cục trên mobile/desktop.
Xác minh xử lý CORS bằng cách tải các nguồn đa dạng (ví dụ: VNExpress, TechCrunch).
