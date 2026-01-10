# 🚀 Complaint Management System 📋

Welcome to the **Complaint Management System**! 🎉 This is a comprehensive full-stack application designed to streamline customer complaint handling, featuring real-time chat, sentiment analysis, automatic prioritization, and powerful analytics. Built with modern technologies for efficiency and scalability. 💪

## 📖 Table of Contents
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Architecture](#️-architecture)
- [🚀 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [🎯 Usage](#-usage)
- [🔗 API Endpoints](#-api-endpoints)
- [📊 Analytics & Insights](#-analytics--insights)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👥 Authors](#-authors)
- [🙏 Acknowledgments](#-acknowledgments)

## ✨ Features

### 🎯 Core Functionality
- **🔐 User Authentication**: Secure login and registration with JWT tokens 🔑
- **📝 Query Management**: Create, update, and track customer complaints/queries 📋
- **💬 Real-Time Chat**: Instant messaging between customers and support agents 💬
- **🏷️ Auto-Tagging**: Intelligent categorization of complaints using NLP 🤖
- **⚡ Auto-Priority**: Smart prioritization based on content analysis 📈
- **🔍 Duplicate Detection**: Prevent redundant ticket creation 🕵️‍♂️
- **😊 Sentiment Analysis**: Gauge customer emotions and satisfaction levels ❤️
- **📈 Analytics Dashboard**: Comprehensive insights and reporting 📊
- **👥 Multi-Tenant Support**: Handle multiple companies/organizations 🏢
- **🔒 Role-Based Access**: Different permissions for admins, agents, and customers 👤

### 🎨 User Interface
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile 📱
- **🌟 Modern UI**: Beautiful interface built with React and Tailwind CSS 🎨
- **⚡ Fast Performance**: Optimized with Vite for lightning-fast development 🚀
- **🎭 Interactive Components**: Smooth animations with Framer Motion ✨
- **📊 Data Visualization**: Charts and graphs using Recharts 📈

### 🔧 Advanced Features
- **🧠 AI-Powered Summarization**: Automatic complaint summarization 🤖
- **🎙️ Voice Input**: Support for voice-based complaint submission 🎤
- **🔄 Real-Time Updates**: Live status updates and notifications 🔔
- **📋 Ticket History**: Complete audit trail for all changes 📜
- **🎯 Smart Assignment**: Intelligent agent assignment based on expertise 🎯

## 🛠️ Tech Stack

### Backend 🖥️
- **Node.js** - Runtime environment 🚀
- **Express.js** - Web framework 🌐
- **MongoDB** - NoSQL database 🍃
- **Mongoose** - ODM for MongoDB 📊
- **Socket.io** - Real-time communication ⚡
- **JWT** - Authentication 🔐
- **bcryptjs** - Password hashing 🛡️
- **Natural** - Natural language processing 🧠
- **Sentiment** - Sentiment analysis 😊
- **@xenova/transformers** - AI/ML models 🤖

### Frontend 💻
- **React** - UI library ⚛️
- **Vite** - Build tool and dev server ⚡
- **Tailwind CSS** - Utility-first CSS framework 🎨
- **React Router** - Client-side routing 🛣️
- **Axios** - HTTP client 📡
- **Socket.io-client** - Real-time client 🔌
- **Recharts** - Data visualization 📊
- **Framer Motion** - Animation library 🎭
- **React Hot Toast** - Notification system 🍞
- **Heroicons** - Beautiful icons 🎯

### DevOps & Tools 🛠️
- **ESLint** - Code linting 🔍
- **Nodemon** - Auto-restart for development 🔄
- **Vercel** - Deployment platform ☁️

## 🏗️ Architecture

```
📁 ComplaintManagement/
├── 📁 backend/           # Node.js/Express server
│   ├── 📄 app.js         # Main application file
│   ├── 📁 controllers/   # Business logic
│   ├── 📁 models/        # MongoDB schemas
│   ├── 📁 routes/        # API endpoints
│   ├── 📁 middleware/    # Custom middleware
│   ├── 📁 utils/         # Utility functions
│   └── 📁 socket/        # Real-time chat logic
├── 📁 client1/           # React frontend
│   ├── 📄 index.html     # Entry point
│   ├── 📁 src/
│   │   ├── 📁 components/ # Reusable UI components
│   │   ├── 📁 pages/      # Page components
│   │   ├── 📁 context/    # React context providers
│   │   ├── 📁 api/        # API service functions
│   │   └── 📁 socket/     # Socket client setup
│   └── 📄 vite.config.js  # Vite configuration
└── 📄 README.md          # Project documentation 📖
```

## 🚀 Installation

### Prerequisites 📋
- **Node.js** (v16 or higher) 🟢
- **MongoDB** (local or cloud instance) 🍃
- **npm** or **yarn** 📦

### Backend Setup 🖥️

1. **Clone the repository** 📥
   ```bash
   git clone https://github.com/SHIVAM1422000/ComplaintManagment.git
   cd ComplaintManagment
   ```

2. **Navigate to backend directory** 📂
   ```bash
   cd backend
   ```

3. **Install dependencies** 📦
   ```bash
   npm install
   ```

4. **Set up environment variables** 🔧
   Create a `.env` file in the backend directory:
   ```env
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/complaint_management
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=development
   ```

5. **Start MongoDB** 🍃
   Make sure MongoDB is running on your system.

6. **Run the backend server** 🚀
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:8000` 🎉

### Frontend Setup 💻

1. **Open a new terminal** and navigate to client directory 📂
   ```bash
   cd ../client1
   ```

2. **Install dependencies** 📦
   ```bash
   npm install
   ```

3. **Start the development server** ⚡
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` 🎊

## ⚙️ Configuration

### Environment Variables 🔐
Configure the following environment variables in `backend/.env`:

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `8000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/complaint_management` |
| `JWT_SECRET` | JWT signing secret | `your_secret_key` |
| `NODE_ENV` | Environment mode | `development` |

### Database Setup 🍃
The application uses MongoDB. Make sure to:
1. Install MongoDB locally or use a cloud service like MongoDB Atlas ☁️
2. Update the `MONGODB_URI` in your `.env` file
3. The app will automatically create collections as needed ✨

## 🎯 Usage

### For Customers 👥
1. **Register/Login** 🔐
2. **Submit a Complaint** 📝
   - Fill out the complaint form
   - Add details, priority, and attachments if needed
3. **Chat with Support** 💬
   - Use the real-time chat feature
   - Get instant responses from support agents
4. **Track Progress** 📊
   - Monitor complaint status
   - View history and updates

### For Support Agents 👨‍💼
1. **Login to Dashboard** 📈
2. **View Inbox** 📬
   - See all assigned complaints
   - Filter by status, priority, or tags
3. **Manage Tickets** 🎫
   - Update status and priority
   - Assign to team members
   - Add internal notes
4. **Chat with Customers** 💬
   - Respond to customer messages
   - Provide solutions and updates
5. **Analyze Performance** 📊
   - View analytics and reports
   - Track resolution times and satisfaction

### For Administrators 👑
1. **User Management** 👥
   - Add/remove users
   - Assign roles and permissions
2. **System Configuration** ⚙️
   - Configure auto-tagging rules
   - Set up priority algorithms
3. **Analytics & Reporting** 📊
   - Comprehensive dashboards
   - Export reports and insights

## 🔗 API Endpoints

### Authentication 🔐
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Queries/Complaints 📋
- `GET /api/queries` - Get all queries
- `POST /api/queries` - Create new query
- `GET /api/queries/:id` - Get specific query
- `PUT /api/queries/:id` - Update query
- `DELETE /api/queries/:id` - Delete query

### Analytics 📊
- `GET /api/analytics/sentiment` - Sentiment analysis data
- `GET /api/analytics/trends` - Trend analysis
- `GET /api/analytics/summary` - General summary

### Chat 💬
- WebSocket events handled via Socket.io
- Real-time messaging between users

## 📊 Analytics & Insights

The system provides comprehensive analytics including:
- **📈 Sentiment Trends**: Track customer satisfaction over time
- **🎯 Resolution Metrics**: Average resolution times and success rates
- **🏷️ Category Analysis**: Most common complaint types
- **👥 Agent Performance**: Individual and team productivity metrics
- **📊 Dashboard Widgets**: Customizable visual insights

## 🤝 Contributing

We love contributions! 🎉 Here's how you can help:

1. **Fork the repository** 🍴
2. **Create a feature branch** 🌿
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes** 💾
   ```bash
   git commit -m 'Add amazing feature ✨'
   ```
4. **Push to the branch** 🚀
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request** 📝

### Development Guidelines 📏
- Follow ESLint rules 🔍
- Write meaningful commit messages 💬
- Add tests for new features 🧪
- Update documentation 📖
- Use conventional commit format 📝

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details. 📜

## 👥 Authors

- **Shivam Ojha** 👨‍💻
  - *Initial work* - [SHIVAM1422000](https://github.com/SHIVAM1422000)

## 🙏 Acknowledgments

- **React Team** for the amazing framework ⚛️
- **Tailwind CSS** for the utility-first approach 🎨
- **Socket.io** for real-time communication ⚡
- **MongoDB** for the flexible database 🍃
- **Open source community** for inspiration and tools 🌟

---

**Made with ❤️ by Shivam Ojha**

⭐ Star this repo if you found it helpful! 🌟

📧 **Contact**: [Your Email Here] | 🔗 **LinkedIn**: [Your LinkedIn]

🎯 **Live Demo**: [Add your deployed app link here]

🐛 **Report Issues**: [GitHub Issues](https://github.com/SHIVAM1422000/ComplaintManagment/issues)

📚 **Documentation**: [Add docs link if available]