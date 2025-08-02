# 🚀 Task Manager - Next.js Application

A modern, responsive task management application built with Next.js, TypeScript, and Tailwind CSS. Features user authentication, task CRUD operations, and a beautiful dark theme interface.

## ✨ Features

- 🔐 **User Authentication** - Secure login/signup with Clerk
- 📝 **Task Management** - Create, read, update, and delete tasks
- ⭐ **Priority System** - Mark tasks as important with star indicators
- ✅ **Status Tracking** - Mark tasks as completed or incomplete
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🌙 **Dark Theme** - Modern dark UI with green accent colors
- 🔍 **Task Filtering** - Organize tasks by status and importance
- 📊 **Task Overview** - View all tasks, completed tasks, important tasks, etc.

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS + DaisyUI
- **Authentication:** Clerk
- **Database:** Prisma (with your preferred database)
- **Icons:** React Icons
- **Notifications:** React Hot Toast

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A Clerk account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/signin
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   
   # Database
   DATABASE_URL="your_database_url"
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
├── app/
│   ├── components/
│   │   ├── Modals/
│   │   │   ├── CreateContent.tsx
│   │   │   ├── EditContent.tsx
│   │   │   └── Modal.tsx
│   │   ├── Sidebar/
│   │   │   └── Sidebar.tsx
│   │   ├── Tasks/
│   │   │   └── Tasks.tsx
│   │   └── taskItem/
│   │       └── TaskItem.tsx
│   ├── Context/
│   │   └── GlobalProvider.tsx
│   ├── signin/
│   ├── signup/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── prisma/
│   └── schema.prisma
└── public/
```

## 🎨 UI Components

### TaskItem Component
- Responsive card design with hover effects
- Status badges (Completed/Incomplete)
- Important task indicators
- Edit and delete functionality

### Sidebar Navigation
- Collapsible sidebar for mobile devices
- Navigation between different task views
- User profile integration
- Responsive design

### Modal System
- Create new tasks
- Edit existing tasks
- Form validation
- Dark theme consistent styling

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile:** 1 column layout
- **Small screens:** 2 columns
- **Medium screens:** 3 columns  
- **Large screens:** 4 columns

## 🔐 Authentication

User authentication is handled by Clerk, providing:
- Email/password authentication
- Social login options
- User profile management
- Protected routes

## 🎯 Task Features

### Task Properties
- **Title:** Task name/summary
- **Description:** Detailed task description
- **Date:** Due date or creation date
- **Status:** Completed or Incomplete
- **Priority:** Important flag

### Task Actions
- ✅ Mark as completed/incomplete
- ⭐ Toggle importance
- ✏️ Edit task details
- 🗑️ Delete task

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Clerk for authentication services
- Tailwind CSS for the utility-first CSS framework
- DaisyUI for beautiful UI components

## 📞 Support

If you have any questions or need help with setup, please:
- Open an issue on GitHub
- Check the documentation
- Contact the development team

---

**Happy Task Managing! 🎉**