# 📰 Trình Đọc RSS Cục Bộ Tích Hợp AI (Dự Án Portfolio)

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Ollama](https://img.shields.io/badge/AI-Ollama-orange) ![Dexie.js](https://img.shields.io/badge/DB-IndexedDB-lightgrey)

> Một ứng dụng đọc RSS hiện đại, ưu tiên cục bộ (Local-First), mang sức mạnh của **LLM Cục bộ** vào việc cập nhật tin tức hàng ngày của bạn. Được xây dựng với tiêu chí bảo mật, hiệu suất tối ưu và kiến trúc sạch (Clean Architecture).

## 🚀 Tính Năng Nổi Bật

- **🔒 Kiến Trúc Local-First**: Mọi dữ liệu (nguồn tin, bài báo) được lưu trữ CỤC BỘ trên trình duyệt của bạn bằng **IndexedDB (Dexie)**. Không theo dõi, bảo mật tuyệt đối.
- **✨ Giao Diện Glassmorphism**: Thiết kế hiện đại, hiệu ứng kính mờ (frosted glass) đẹp mắt, hỗ trợ Dark Mode mặc định.
- **🤖 Báo Cáo AI Hàng Ngày**: Tích hợp với **Ollama** để tạo tóm tắt tin tức chất lượng cao theo yêu cầu (On-Demand) sử dụng các mô hình LLM cục bộ (Llama 3, Qwen).
- **🛡️ Tiêu Chuẩn Doanh Nghiệp**: Tuân thủ chuẩn **Feature-Sliced Design (FSD)**, kiểm soát kiểu dữ liệu chặt chẽ với **Zod**, và hỗ trợ **PWA**.
- **⚡ Siêu Nhanh**: Cập nhật UI lạc quan (Optimistic UI), Grid dạng Masonry ảo hóa, và hỗ trợ chạy Offline.

## 🏗️ Kiến Trúc Kỹ Thuật

### Công Nghệ Sử Dụng (Tech Stack)

- **Frontend**: Next.js 14 (App Router), React 18, CSS Modules.
- **State/Data**: SWR (Fetching), Dexie (Persistence - IndexedDB), Zod (Validation).
- **AI Integration**: Custom Streaming API Route kết nối với Ollama instance cục bộ.
- **Style**: Hệ thống CSS Variables tùy chỉnh (Không phụ thuộc Tailwind).

### Mô Hình: Feature-Sliced Design (FSD)

Dự án tuân thủ nghiêm ngặt cấu trúc thư mục FSD để đảm bảo khả năng mở rộng:

```
src/
├── app/            # Next.js App Router (Lớp Entry)
├── entities/       # Thực thể kinh doanh (Model Feed, Article)
├── features/       # Kịch bản người dùng (FeedManager, NewsFeed, AIBriefing)
├── shared/         # Tiện ích dùng chung (DB, UI Kit)
└── widgets/        # Lớp Composition (Ghép nối)
```

## 🛠️ Hướng Dẫn Cài Đặt

### Yêu Cầu Tiên Quyết

- Node.js 18+
- [Ollama](https://ollama.com) (cho tính năng AI) đang chạy cục bộ tại port 11434.

### Các Bước Cài Đặt

1. **Clone repository**

   ```bash
   git clone https://github.com/yourusername/local-rss-reader.git
   cd local-rss-reader
   ```

2. **Cài đặt dependencies**

   ```bash
   cd apps/web
   npm install
   ```

3. **Chạy Server Phát Triển**

   ```bash
   npm run dev
   ```

4. **Kiểm Tra AI (Tùy chọn)**
   Đảm bảo Ollama đang chạy: `ollama run llama3`

## 🧪 Đảm Bảo Chất Lượng (QA)

- **Linting**: Đã cấu hình ESLint + Prettier.
- **Git Hooks**: Sử dụng Husky để kiểm tra code trước khi commit (pre-commit hooks).
- **Type Safety**: Chế độ Strict Mode được bật.

---

*Dự án này được xây dựng để minh họa năng lực Kỹ thuật Frontend & Tích hợp AI (AI Engineering).*
