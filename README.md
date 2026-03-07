## Quick Start – Local Development

### Prerequisites
- Git
- Docker Desktop

### Steps
1. Clone repo
   ```bash
   git clone https://github.com/Arpit-Rajvanshi/smart-productivity-habit-tracker.git
   cd smart-productivity-habit-tracker

# Smart Productivity & Habit Tracking System

## 1. Project Name & Overview
Smart Productivity & Habit Tracking System is a web-based productivity application that helps users manage daily tasks and build long-term habits. It supports task planning, habit streak tracking, reminders, and basic analytics to improve consistency and goal achievement.

## 2. Problem it Solves
Students and working individuals struggle with:
- forgetting tasks and deadlines
- inconsistency in habits
- lack of progress tracking
- no reminders for routines

This system provides a simple and structured tool for daily productivity.

## 3. Target Users (Personas)

### Persona 1: College Student
- Goal: Track assignments, routines, daily tasks
- Pain Point: Forgets deadlines, inconsistent habits

### Persona 2: Working Professional
- Goal: Manage work tasks + maintain personal habits
- Pain Point: Busy schedule, needs reminders

### Persona 3: Beginner Productivity User
- Goal: Build simple routines easily
- Pain Point: Finds existing apps too complex

## 4. Vision Statement
To develop a lightweight and easy-to-use productivity platform that improves consistency by combining task management, habit tracking, reminders, and progress analytics.

## 5. Key Features / Goals
- User authentication
- Task management (create/edit/delete/complete)
- Habit tracking with streak counter
- Reminders for tasks & habits
- Analytics dashboard (weekly/monthly progress)
- Responsive UI (mobile + desktop)

## 6. Success Metrics
- Users can manage tasks & habits without training
- 80%+ test users find it easy to use
- Reminders trigger correctly
- Streak tracking is accurate
- App runs using Docker successfully

## 7. Assumptions
- Users manually enter tasks/habits
- Users have a browser-enabled device
- Internet access available for hosted version

## 8. Constraints
- One semester timeline
- Must use free/open-source tools
- Basic student-level implementation
- Must ensure privacy/security for user data


## Branching Strategy (GitHub Flow)
We follow GitHub Flow:
- `main` branch is always stable
- For every feature, we create a separate feature branch
- After completion, we merge it into `main` via Pull Request

Branch naming format:
- feature/<feature-name>
Example:
- feature/readme-vision-doc

## Software Design

This project follows a layered architecture separating the frontend, API layer, business logic, and database layer.

### Architecture Diagram
![Architecture](design/architecture.png)

### Use Case Diagram
![Use Case](design/usecase.png)

### Database ER Diagram
![ER Diagram](design/er-diagram.png)

### UI Prototype (Figma)

Login Screen  
Dashboard  
Task Management  
Habit Tracker  
Analytics Dashboard