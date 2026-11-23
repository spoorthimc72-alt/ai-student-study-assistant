# AI Student Study Assistant

A modern, responsive educational dashboard for engineering students. StudyAI combines a polished study workspace with interactive AI-style demonstrations for tutoring, note generation, quizzes, planning, PDF summarization, and progress tracking.

## Included experience

- Landing/dashboard experience with blue, purple, and white visual system
- Responsive sidebar navigation and mobile menu
- AI Tutor chat with suggested prompts and conversational answers
- Smart Notes generator with topic presets and copy interaction
- Quiz Generator with answer selection, instant feedback, and scoring
- Study Planner with add-task flow, completion tracking, and focus score
- PDF Summarizer upload affordance with sample generated summary
- Progress cards, weekly chart, streaks, and task completion metrics
- Demo login modal, search, About/Contact feedback actions, toasts, and smooth transitions

## Beginner-friendly version

The `simple-version` folder contains a much smaller version that is easier to explain in a college project:

- `simple-version/index.html` — page content
- `simple-version/style.css` — design and responsive layout
- `simple-version/script.js` — working interactions
- `simple-version/StudyAssistant.java` — optional Java example for a viva/backend explanation

Open `simple-version/index.html` directly in a browser. Websites use JavaScript for browser interactions; Java is a separate language, so the Java file is optional and is not required to run the website.

## Run the full version locally

```bash
pnpm install
pnpm dev
```

The development server uses port `3000` by default. The full project is built with React, Vite, TypeScript, Tailwind CSS, Lucide icons, and the Webdev React/Express starter.

## Demo account

- Email: `arjun@studyai.demo`
- Password: `demo123`

The college-project demo keeps interactive state in the browser so faculty can explore the experience without paid subscriptions or third-party API keys.
