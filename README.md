# Portfolio & Blog API

这是一个为个人作品集网站提供后端支持的 RESTful API。它使用 Node.js、Express 和 MongoDB 构建，具备完整的作品集管理、博客功能、用户认证和授权。

**线上API基础URL:** `[在此处插入你的线上API部署链接]`

---

## 🚀 主要功能

-   **作品集管理 (Portfolio)**:
    -   对个人项目进行完整的 CRUD (创建、读取、更新、删除) 操作。
    -   接收并存储来自联系表单的访客消息。
-   **博客功能 (Blog)**:
    -   发布、更新和删除博客文章。
    -   用户可以对文章发表评论。
-   **用户系统 (Authentication)**:
    -   基于 JWT (JSON Web Tokens) 的安全用户注册和登录。
-   **授权系统 (Authorization)**:
    -   受保护的路由，确保只有内容所有者才能修改或删除自己的内容。
-   **安全与部署**:
    -   使用 `helmet` 设置安全HTTP头。
    -   使用 `bcryptjs` 对用户密码进行哈希加密。
    -   部署在 Render.com 上，实现了持续部署。

---

## 🛠️ 技术栈

-   **后端**: Node.js, Express.js
-   **数据库**: MongoDB (使用 Mongoose ODM)
-   **认证**: JSON Web Tokens (JWT)
-   **密码加密**: BcryptJS
-   **安全**: Helmet
-   **环境变量**: Dotenv
-   **部署**: Render.com

---

## 📚 API 端点文档 (Endpoints)

以下是所有可用的 API 接口。

### 認証 (Authentication)

| 请求方法 | 路径                  | 描述                         | 访问权限 | 请求体 (Body)                                  |
| :------- | :-------------------- | :--------------------------- | :------- | :--------------------------------------------- |
| `POST`   | `/api/users/register` | 注册一个新用户               | Public   | `{"username", "email", "password"}`            |
| `POST`   | `/api/users/login`    | 登录并获取 JWT Token         | Public   | `{"email", "password"}`                        |
| `GET`    | `/api/users/me`       | 获取当前登录用户的信息       | Private  | *N/A*                                          |

### 作品集 - 项目 (Portfolio: Projects)

| 请求方法 | 路径                 | 描述                         | 访问权限 | 请求体 (Body)                                  |
| :------- | :------------------- | :--------------------------- | :------- | :--------------------------------------------- |
| `GET`    | `/api/projects`      | 获取所有项目列表             | Public   | *N/A*                                          |
| `GET`    | `/api/projects/:id`  | 根据 ID 获取单个项目         | Public   | *N/A*                                          |
| `POST`   | `/api/projects`      | 创建一个新项目               | Private  | `{"title", "description", "imageUrl", ...}`    |
| `PUT`    | `/api/projects/:id`  | 根据 ID 更新一个项目         | Private  | `{"title", "description", "imageUrl", ...}`    |
| `DELETE` | `/api/projects/:id`  | 根据 ID 删除一个项目         | Private  | *N/A*                                          |

### 作品集 - 联系表单 (Portfolio: Contact Form)

| 请求方法 | 路径            | 描述                         | 访问权限 | 请求体 (Body)                       |
| :------- | :-------------- | :--------------------------- | :------- | :---------------------------------- |
| `POST`   | `/api/contact`  | 提交一条新的联系信息         | Public   | `{"name", "email", "message"}`      |

### 博客 - 文章 (Blog: Posts)

| 请求方法 | 路径            | 描述                         | 访问权限 | 请求体 (Body)                       |
| :------- | :-------------- | :--------------------------- | :------- | :---------------------------------- |
| `GET`    | `/api/blog`     | 获取所有博客文章列表         | Public   | *N/A*                               |
| `GET`    | `/api/blog/:id` | 根据 ID 获取单篇文章及其评论 | Public   | *N/A*                               |
| `POST`   | `/api/blog`     | 创建一篇新文章               | Private  | `{"title", "content"}`              |
| `PUT`    | `/api/blog/:id` | 根据 ID 更新一篇文章         | Private  | `{"title", "content"}`              |
| `DELETE` | `/api/blog/:id` | 根据 ID 删除一篇文章         | Private  | *N/A*                               |

### 博客 - 评论 (Blog: Comments)

| 请求方法 | 路径                           | 描述                         | 访问权限 | 请求体 (Body)                       |
| :------- | :----------------------------- | :--------------------------- | :------- | :---------------------------------- |
| `GET`    | `/api/blog/:postId/comments`   | 获取一篇文章下的所有评论     | Public   | *N/A*                               |
| `POST`   | `/api/blog/:postId/comments`   | 为一篇文章发表新评论         | Private  | `{"body"}`                          |

**注意**:
- **Public** 接口任何人都可以访问。
- **Private** 接口需要在请求的 `Headers` 中提供一个有效的 `Authorization: Bearer <TOKEN>`。

---

## 🚀 如何在本地运行

1.  克隆此仓库：
    ```bash
    git clone https://github.com/你的用户名/portfolio-blog-api.git
    ```
2.  进入项目目录：
    ```bash
    cd portfolio-blog-api
    ```
3.  安装依赖：
    ```bash
    npm install
    ```
4.  创建一个 `.env` 文件，并填入以下变量：
    ```env
    NODE_ENV=development
    PORT=5000
    MONGO_URI=<你的MongoDB连接字符串>
    JWT_SECRET=<你的JWT密钥>
    ```
5.  启动服务器：
    ```bash
    npm start
    ```
服务器将在 `http://localhost:5000` 上运行。
