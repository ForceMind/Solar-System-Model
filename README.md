# Solar System Model Web App / 太阳系模型网页应用

[English](#english) | [中文](#chinese)

<a name="english"></a>
## English

A 3D interactive Solar System model with gesture controls and real-time NASA data integration.

### Features

- **3D Solar System**: Interactive 3D visualization using Three.js and React Three Fiber.
- **Gesture Control**: Use your webcam to control the camera (MediaPipe Hands).
  - **Pinch (Index + Thumb)**: Zoom in/out.
  - **Open Hand Move**: Pan/Rotate the view.
- **NASA Data**: View real-time Near Earth Objects (Asteroids) passing by Earth.
- **Sci-Fi HUD**: Modern holographic interface with bilingual support (English/Chinese).
- **Time Axis**: Visual simulation time progression.

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
3.  **Rotate**: Keep your hand open and move it around.
4.  **Zoom**: Pinch your thumb and index finger together and move your hand forward/backward (simulated by pinch distance change).

### NASA API

The project uses the `DEMO_KEY` for NASA APIs. For production use, get a free API key from [api.nasa.gov](https://api.nasa.gov/) and update `src/services/nasa.ts`.

---

<a name="chinese"></a>
## 中文 (Chinese)

一个带有手势控制和实时 NASA 数据集成的 3D 交互式太阳系模型。

### 功能特点

- **3D 太阳系**：使用 Three.js 和 React Three Fiber 进行交互式 3D 可视化。
- **手势控制**：使用网络摄像头控制视角（MediaPipe Hands）。
  - **捏合（食指 + 拇指）**：放大/缩小。
  - **张开手掌移动**：平移/旋转视角。
- **NASA 数据**：查看实时经过地球的近地天体（小行星）。
- **科幻 HUD**：现代全息界面，支持中英文切换。
- **时间轴**：可视化的模拟时间进程。

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
3.  **旋转**：保持手掌张开并移动。
4.  **缩放**：捏合拇指和食指，并前后移动手部（通过捏合距离变化模拟）。

### NASA API

本项目使用 `DEMO_KEY` 调用 NASA API。如需生产环境使用，请从 [api.nasa.gov](https://api.nasa.gov/) 获取免费 API 密钥并更新 `src/services/nasa.ts`。
