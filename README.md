# Portfolio Website - Shubham Bairwa

A modern, responsive portfolio website showcasing the work of Shubham Bairwa, a Computer Science student at IIIT Sricity.

## 🚀 Features

- **Full-Stack Portfolio**: React + TypeScript frontend with Express.js backend
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion for interactive elements
- **Project Showcase**: Featured projects with live demos and GitHub links
- **Skills Display**: Animated skill bars and technology icons
- **Contact Form**: Functional contact form with backend integration
- **Admin Dashboard**: Content management system for portfolio updates
- **Dark/Light Theme**: Theme toggle with persistent preferences

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Query** for data fetching
- **Radix UI** for accessible components

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **In-memory storage** (easily replaceable with database)
- **CORS** enabled for API access

## 📁 Project Structure

```
portfolio/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and configurations
├── server/                 # Backend Express server
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   └── storage.ts         # Data management
├── shared/                 # Shared types and schemas
└── dist/                  # Production build output
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YellowFlash106/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5000
   ```

### Production Build

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 📱 Projects Featured

- **StreamOn**: Social communication platform with real-time messaging and video calls
- **Tasky**: Full-stack task management application with JWT authentication
- **S-Commerce**: E-commerce platform with React frontend and Node.js backend

## 🎨 Customization

### Personal Information
Update your details in `server/storage.ts`:
- Name, bio, and contact information
- Skills and proficiency levels
- Project details and links
- Social media profiles

### Styling
- Colors and themes can be modified in `tailwind.config.ts`
- Animations in `client/src/lib/animations.ts`
- Component styles in individual component files

## � Security Features

- **Environment-based admin protection**: Admin routes only available in development
- **Rate limiting**: Prevents abuse with configurable limits
- **Input validation**: Sanitized contact form with email validation
- **Security headers**: Helmet.js with CSP, XSS, and clickjacking protection
- **CORS configuration**: Restricted origins in production
- **Error handling**: No sensitive data leakage in production

See [SECURITY.md](SECURITY.md) for detailed security configuration.

## 🚀 Deployment

### Environment Variables

Create a `.env.production` file:

```env
NODE_ENV=production
PORT=5000
# Add your production domain for CORS
ALLOWED_ORIGINS=https://yourdomain.com
```

### Production Build

```bash
npm run build
npm start
```

### Docker Deployment (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 5000
CMD ["npm", "start"]
```

### Platform Recommendations

- **Vercel**: Full-stack deployment with automatic HTTPS
- **Railway**: Simple full-stack hosting
- **Render**: Free tier with automatic deploys
- **Heroku**: Traditional but reliable

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run check` - Run TypeScript checks
- `npm start` - Start production server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Shubham Bairwa**
- **GitHub**: [@YellowFlash106](https://github.com/YellowFlash106)
- **LinkedIn**: [Your LinkedIn Profile]
- **Email**: [Your Email]

---

⭐ **Star this repo** if you found it helpful!