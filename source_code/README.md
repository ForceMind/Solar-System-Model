# Solar System Model Web App / 太阳系模型网页应用

[English](#english) | [中文](#chinese)

<a name="english"></a>
## English

A 3D interactive Solar System model with gesture controls, real-time NASA data integration, and realistic planetary simulation.

### Features

- **3D Solar System**: Interactive 3D visualization using Three.js and React Three Fiber.
- **Realistic Simulation**: 
  - Real planetary textures and rings.
  - Accurate moon systems (e.g., Earth's Moon).
  - Day/Night cycle with realistic lighting (terminator line).
- **Time Control**: 
  - Control simulation speed (0.1x to 5x).
  - Pause/Resume and Reverse time.
  - Visual time axis display.
- **Gesture Control**: Use your webcam to control the camera (MediaPipe Hands).
  - **Open Hand**: Zoom In.
  - **Fist**: Zoom Out.
  - **Pinch (Index + Thumb)**: Rotate/Pan the view.
- **NASA Data**: View real-time Near Earth Objects (Asteroids) passing by Earth.
- **Sci-Fi HUD**: Modern holographic interface with bilingual support (English/Chinese).
- **Navigation**: Double-click planets to focus, use "Back to Solar System" to reset.

### Setup

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Run the development server:
    ```bash
    npm run dev
    ```

3.  Open the browser at the provided URL (usually `http://localhost:5173`).

### Requirements

- Node.js 18+ (Recommended for Vite 5) or Node.js 16 (with Vite 4)
- Webcam (for gesture controls)
- Internet connection (for NASA API and MediaPipe models)

### Gesture Guide

1.  Click the **GESTURE LINK** toggle in the bottom right corner to enable the camera.
2.  Allow camera access.
3.  **Rotate**: Pinch your thumb and index finger together and move your hand.
4.  **Zoom In**: Keep your hand open.
5.  **Zoom Out**: Clench your hand into a fist.

### NASA API

The project uses the `DEMO_KEY` for NASA APIs. For production use, get a free API key from [api.nasa.gov](https://api.nasa.gov/) and update `src/services/nasa.ts`.

### Deployment

To deploy this application to a server (e.g., Nginx, Apache) or static hosting (Vercel, Netlify):

1.  **Build the project**:
    ```bash
    npm run build
    ```
    This will create a `dist` folder containing the static files.

2.  **Upload**: Upload the contents of the `dist` folder to your web server's public directory.

3.  **Nginx Configuration (Example)**:
    ```nginx
    server {
        listen 80;
        server_name your-domain.com;
        root /path/to/your/dist;
        index index.html;
        location / {
            try_files $uri $uri/ /index.html;
        }
    }
    ```

---

<a name="chinese"></a>
## 中文 (Chinese)

一个带有手势控制、实时 NASA 数据集成和真实行星模拟的 3D 交互式太阳系模型。

### 功能特点

- **3D 太阳系**：使用 Three.js 和 React Three Fiber 进行交互式 3D 可视化。
- **真实模拟**：
  - 真实的行星纹理贴图和光环。
  - 精确的卫星系统（如月球）。
  - 具有真实光照效果的昼夜交替（晨昏线）。
- **时间控制**：
  - 控制模拟速度（0.1倍 至 5倍）。
  - 暂停/继续以及时间倒流。
  - 可视化时间轴显示。
- **手势控制**：使用网络摄像头控制视角（MediaPipe Hands）。
  - **张开手掌**：放大视角。
  - **握拳**：缩小视角。
  - **捏合（食指 + 拇指）**：旋转/平移视角。
- **NASA 数据**：查看实时经过地球的近地天体（小行星）。
- **科幻 HUD**：现代全息界面，支持中英文切换。
- **导航**：双击行星聚焦，使用“返回太阳系”按钮复位。

### 安装与运行

1.  安装依赖：
    ```bash
    npm install
    ```

2.  运行开发服务器：
    ```bash
    npm run dev
    ```

3.  在浏览器中打开提供的 URL（通常是 `http://localhost:5173`）。

### 系统要求

- Node.js 18+（推荐用于 Vite 5）或 Node.js 16（使用 Vite 4）
- 网络摄像头（用于手势控制）
- 互联网连接（用于 NASA API 和 MediaPipe 模型加载）

### 手势指南

1.  点击右下角的 **GESTURE LINK**（手势连接）开关以启用摄像头。
2.  允许浏览器访问摄像头。
3.  **旋转**：捏合拇指和食指并移动手部。
4.  **放大**：保持手掌张开。
5.  **缩小**：握紧拳头。

### NASA API

本项目使用 `DEMO_KEY` 调用 NASA API。如需生产环境使用，请从 [api.nasa.gov](https://api.nasa.gov/) 获取免费 API 密钥并更新 `src/services/nasa.ts`。

### 部署

要将此应用部署到服务器（如 Nginx, Apache）或静态托管服务（Vercel, Netlify）：

1.  **构建项目**：
    ```bash
    npm run build
    ```
    这将创建一个包含静态文件的 `dist` 文件夹。

2.  **上传**：将 `dist` 文件夹的内容上传到您的 Web 服务器的公共目录。

3.  **Nginx 配置（示例）**：
    ```nginx
    server {
        listen 80;
        server_name your-domain.com;
        root /path/to/your/dist;
        index index.html;
        location / {
            try_files $uri $uri/ /index.html;
        }
    }
    ```
