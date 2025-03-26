# Sử dụng Node.js image chính thức
FROM node:18-alpine AS builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép file package.json và lock file (nếu có)
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn
COPY . .

# Build ứng dụng Next.js
RUN npm run build

# Giai đoạn chạy ứng dụng
FROM node:18-alpine AS runner

WORKDIR /app

# Sao chép các file cần thiết từ builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Mở port (mặc định Next.js dùng 3000)
EXPOSE 3000

# Khởi động ứng dụng
CMD ["npm", "start"]