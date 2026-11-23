import { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  BrainCircuit,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  FileText,
  Flame,
  GraduationCap,
  LayoutDashboard,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Paperclip,
  Plus,
  Search,
  Send,
  Sparkles,
  Target,
  Trophy,
  Upload,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

type Feature = "overview" | "chat" | "notes" | "quiz" | "planner" | "summarizer";

type Task = { id: number; title: string; subject: string; time: string; done: boolean; color: string };

const initialTasks: Task[] = [
  { id: 1, title: "Review dynamic programming", subject: "Algorithms", time: "09:00 AM", done: true, color: "violet" },
  { id: 2, title: "Practice circuit analysis", subject: "Electrical", time: "11:30 AM", done: false, color: "blue" },
  { id: 3, title: "Read OS scheduling notes", subject: "Operating Systems", time: "02:00 PM", done: false, color: "orange" },
  { id: 4, title: "Complete probability quiz", subject: "Mathematics", time: "05:30 PM", done: false, color: "emerald" },
];

const quickPrompts = [
  "Explain recursion simply",
  "Quiz me on networks",
  "Create notes on DBMS",
];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand-lockup">
      <div className="brand-mark"><BrainCircuit size={22} strokeWidth={2.4} /></div>
      {!compact && <div><strong>Study<span>AI</span></strong><small>Learn with clarity</small></div>}
    </div>
  );
}

function ProgressRing({ value }: { value: number }) {
  const circumference = 2 * Math.PI * 42;
  return (
    <div className="progress-ring" style={{ "--progress": `${(value / 100) * circumference}px` } as React.CSSProperties}>
      <svg viewBox="0 0 100 100"><circle className="ring-track" cx="50" cy="50" r="42" /><circle className="ring-value" cx="50" cy="50" r="42" /></svg>
      <div><b>{value}%</b><span>weekly goal</span></div>
    </div>
  );
}

export default function Home() {
  const [active, setActive] = useState<Feature>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hi Arjun! I’m your study copilot. What would you like to understand today?" },
  ]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizChoice, setQuizChoice] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [uploaded, setUploaded] = useState(false);

  const completed = tasks.filter((task) => task.done).length;
  const visibleTasks = useMemo(() => tasks.filter((task) => `${task.title} ${task.subject}`.toLowerCase().includes(search.toLowerCase())), [tasks, search]);

  const navigate = (feature: Feature) => {
    setActive(feature);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleTask = (id: number) => setTasks((current) => current.map((task) => task.id === id ? { ...task, done: !task.done } : task));

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((current) => [...current, { id: Date.now(), title: newTask, subject: "Personal focus", time: "07:00 PM", done: false, color: "blue" }]);
    setNewTask("");
    toast.success("Task added to your study plan");
  };

  const generateNotes = () => {
    if (!topic.trim()) return toast.error("Enter a topic first");
    setNotes(`## ${topic}\n\n**Core idea:** ${topic} is best understood by breaking it into a simple definition, a practical example, and the steps used to solve related problems.\n\n**Remember:** Focus on the input, the process, and the expected output. Connect this topic to a real engineering use case and test yourself with one small example.\n\n**Exam tip:** Write the definition first, draw a small diagram if possible, then explain the trade-off or complexity in one line.`);
    toast.success("Your study notes are ready");
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const question = chatInput;
    setMessages((current) => [...current, { from: "user", text: question }, { from: "ai", text: `Here’s a simple way to think about “${question}”: start with the main concept, connect it to a small real-world example, and then practice one problem. Want me to turn this into a quick quiz?` }]);
    setChatInput("");
  };

  const startQuiz = () => { setQuizStarted(true); setQuizChoice(null); setQuizScore(null); };
  const submitQuiz = () => { if (quizChoice === null) return toast.error("Pick an answer first"); setQuizScore(quizChoice === 1 ? 100 : 0); };

  return (
    <div className="app-shell">
      <div className={`mobile-overlay ${sidebarOpen ? "show" : ""}`} onClick={() => setSidebarOpen(false)} />
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-top"><Logo /><button className="icon-button mobile-close" onClick={() => setSidebarOpen(false)}><X size={19} /></button></div>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="side-nav">
          <button className={active === "overview" ? "active" : ""} onClick={() => navigate("overview")}><LayoutDashboard size={18} /> Overview</button>
          <button className={active === "chat" ? "active" : ""} onClick={() => navigate("chat")}><MessageCircle size={18} /> AI Tutor <span className="new-pill">NEW</span></button>
          <button className={active === "notes" ? "active" : ""} onClick={() => navigate("notes")}><FileText size={18} /> Smart Notes</button>
          <button className={active === "quiz" ? "active" : ""} onClick={() => navigate("quiz")}><CircleHelp size={18} /> Quiz Generator</button>
          <button className={active === "planner" ? "active" : ""} onClick={() => navigate("planner")}><CalendarDays size={18} /> Study Planner</button>
          <button className={active === "summarizer" ? "active" : ""} onClick={() => navigate("summarizer")}><BookOpen size={18} /> PDF Summarizer</button>
        </nav>
        <div className="workspace-label second">INSIGHTS</div>
        <nav className="side-nav">
          <button onClick={() => navigate("overview")}><BarChart3 size={18} /> Progress tracker</button>
          <button onClick={() => toast.info("Your saved resources will appear here.")}><Trophy size={18} /> Achievements</button>
        </nav>
        <div className="sidebar-bottom"><div className="upgrade-card"><div className="upgrade-icon"><Sparkles size={17} /></div><strong>Make every session count.</strong><p>Build a better study habit with StudyAI.</p><button onClick={() => toast.success("You are already using the full demo experience!")}>Explore tips <ArrowRight size={14} /></button></div><button className="help-link" onClick={() => toast.info("StudyAI support: hello@studyai.demo")}><CircleHelp size={16} /> Help & feedback</button></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><button className="icon-button menu-button" onClick={() => setSidebarOpen(true)}><Menu size={21} /></button><div className="mobile-logo"><Logo compact /></div><div className="topbar-search"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search your workspace..." /><kbd>⌘ K</kbd></div><div className="topbar-actions"><button className="notification-button" onClick={() => toast.info("You have 3 focus suggestions for today.")}><Flame size={18} /><i /></button><div className="profile" onClick={() => setShowLogin(true)}><div className="avatar">AS</div><div><strong>Arjun Sharma</strong><span>Computer Science</span></div><ChevronRight size={15} /></div></div></header>

        <div className="page-wrap">
          {active === "overview" && <>
            <section className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-dot" /> Tuesday, November 23, 2026</div><h1>Good morning, Arjun<span>.</span></h1><p className="lead">Ready to make some progress today? Your AI study copilot is here to help.</p></div><button className="primary-button" onClick={() => navigate("chat")}><Sparkles size={17} /> Ask StudyAI <ArrowRight size={16} /></button></section>
            <section className="hero-card"><div className="hero-copy"><div className="hero-label"><Zap size={15} /> YOUR DAILY MOMENTUM</div><h2>Small steps.<br /><em>Big outcomes.</em></h2><p>You’re building a consistent learning habit. Keep your streak alive and finish one focused session today.</p><button className="light-button" onClick={() => navigate("planner")}>View today’s plan <ArrowRight size={15} /></button></div><div className="hero-art"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="floating-chip chip-one"><Target size={15} /> 7 day streak</div><div className="floating-chip chip-two"><Check size={14} /> 2 tasks done</div><div className="brain-sphere"><BrainCircuit size={74} strokeWidth={1.4} /></div></div></section>
            <div className="section-heading"><div><h2>Today at a glance</h2><p>A little progress every day compounds.</p></div><button className="text-button" onClick={() => navigate("overview")}>View full report <ArrowRight size={15} /></button></div>
            <section className="stats-grid"><div className="stat-card"><div className="stat-icon purple"><BookOpen size={18} /></div><div><span>Study time</span><strong>2h 40m</strong><small className="positive">↑ 18% <i>vs last week</i></small></div><div className="mini-bars purple-bars"><i /><i /><i /><i /><i /><i /><i /></div></div><div className="stat-card"><div className="stat-icon blue"><Check size={18} /></div><div><span>Tasks completed</span><strong>{completed} / {tasks.length}</strong><small className="positive">↑ 2 <i>today</i></small></div><div className="mini-bars blue-bars"><i /><i /><i /><i /><i /><i /><i /></div></div><div className="stat-card"><div className="stat-icon orange"><Trophy size={18} /></div><div><span>Average quiz score</span><strong>86%</strong><small className="positive">↑ 6% <i>this month</i></small></div><div className="mini-bars orange-bars"><i /><i /><i /><i /><i /><i /><i /></div></div></section>
            <section className="dashboard-grid"><div className="panel plan-panel"><div className="panel-heading"><div><h3>Today’s study plan</h3><p>{completed} of {tasks.length} tasks completed</p></div><button className="icon-button" onClick={() => navigate("planner")}><MoreHorizontal size={19} /></button></div><div className="task-progress"><span style={{ width: `${(completed / tasks.length) * 100}%` }} /></div><div className="task-list">{visibleTasks.map((task) => <div className={`task-row ${task.done ? "done" : ""}`} key={task.id}><button className={`check-circle ${task.done ? "checked" : ""}`} onClick={() => toggleTask(task.id)}>{task.done && <Check size={13} />}</button><div className={`task-dot ${task.color}`} /><div className="task-content"><strong>{task.title}</strong><span>{task.subject}</span></div><time>{task.time}</time></div>)}</div><button className="add-task" onClick={() => navigate("planner")}><Plus size={15} /> Add a task</button></div><div className="panel progress-panel"><div className="panel-heading"><div><h3>Weekly progress</h3><p>Keep the momentum going</p></div><button className="period-button">This week <ChevronRight size={14} /></button></div><div className="progress-chart"><div className="chart-y"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div><div className="chart-area"><div className="grid-lines"><i /><i /><i /><i /></div><svg viewBox="0 0 440 150" preserveAspectRatio="none"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#8b5cf6" stopOpacity=".25" /><stop offset="1" stopColor="#8b5cf6" stopOpacity="0" /></linearGradient></defs><path d="M0 125 C35 115, 45 95, 75 105 S115 90, 145 100 S180 60, 215 80 S245 45, 280 70 S320 55, 350 42 S390 52, 440 18 L440 150 L0 150Z" fill="url(#chartFill)" /><path d="M0 125 C35 115, 45 95, 75 105 S115 90, 145 100 S180 60, 215 80 S245 45, 280 70 S320 55, 350 42 S390 52, 440 18" fill="none" stroke="#7651e9" strokeWidth="3" strokeLinecap="round" /></svg><div className="chart-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div></div><div className="weekly-bottom"><ProgressRing value={72} /><div><strong>Great work!</strong><p>You’re ahead of your weekly goal. One more focused session will take you even further.</p><button className="text-button" onClick={() => navigate("planner")}>Keep going <ArrowRight size={14} /></button></div></div></div></section>
            <section className="section-heading feature-heading"><div><h2>Study smarter with AI</h2><p>Your all-in-one toolkit for mastering complex topics.</p></div></section><section className="feature-grid"><button onClick={() => navigate("chat")} className="feature-card featured"><div className="feature-card-top"><div className="feature-icon white-icon"><Bot size={20} /></div><span>AI POWERED</span></div><h3>Your personal AI tutor</h3><p>Get unstuck with clear, step-by-step explanations tailored to how you learn.</p><div className="feature-link">Start a conversation <ArrowRight size={15} /></div><div className="feature-glow" /></button><button onClick={() => navigate("notes")} className="feature-card"><div className="feature-icon purple-icon"><FileText size={20} /></div><h3>Smart notes</h3><p>Turn any complex topic into concise, exam-ready notes in seconds.</p><div className="feature-link purple-link">Create notes <ArrowRight size={15} /></div></button><button onClick={() => navigate("quiz")} className="feature-card"><div className="feature-icon blue-icon"><CircleHelp size={20} /></div><h3>Quiz generator</h3><p>Test your knowledge with adaptive questions and instant feedback.</p><div className="feature-link blue-link">Take a quiz <ArrowRight size={15} /></div></button></section>
          </>}

          {active === "chat" && <ToolPage icon={<Bot />} eyebrow="AI TUTOR" title="Ask anything. Understand everything." description="Your personal AI tutor explains difficult concepts in simple, memorable steps."><div className="tool-layout"><div className="chat-panel"><div className="chat-head"><div className="ai-avatar"><Bot size={19} /></div><div><strong>StudyAI Tutor</strong><span><i /> Online · Ready to help</span></div><button className="icon-button"><MoreHorizontal size={18} /></button></div><div className="messages">{messages.map((message, index) => <div key={index} className={`message ${message.from}`}><div className={message.from === "ai" ? "ai-avatar small" : "user-avatar"}>{message.from === "ai" ? <Sparkles size={14} /> : "AS"}</div><div className="message-bubble">{message.text}</div></div>)}</div><div className="prompt-row">{quickPrompts.map((prompt) => <button key={prompt} onClick={() => setChatInput(prompt)}>{prompt}</button>)}</div><div className="chat-compose"><button className="icon-button"><Paperclip size={18} /></button><input value={chatInput} onChange={(event) => setChatInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && sendMessage()} placeholder="Ask a question about your studies..." /><button className="send-button" onClick={sendMessage}><Send size={17} /></button></div></div><div className="side-tip"><div className="tip-icon"><Sparkles size={18} /></div><h3>How to get better answers</h3><p>Be specific about your subject and tell me how you want to learn.</p><ul><li><Check size={14} /> “Explain it like I’m new to this”</li><li><Check size={14} /> “Give me a real-world example”</li><li><Check size={14} /> “Quiz me after explaining”</li></ul></div></div></ToolPage>}

          {active === "notes" && <ToolPage icon={<FileText />} eyebrow="SMART NOTES" title="Make every topic easier to remember." description="Enter a topic and StudyAI will shape it into clean, focused revision notes."><div className="generator-layout"><div className="input-panel"><label>What are you studying?</label><textarea value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="e.g. OSI model, sorting algorithms, semiconductor physics..." /><div className="suggestions"><span>Try a topic</span>{["Binary trees", "Thermodynamics", "DBMS normalization"].map((item) => <button key={item} onClick={() => setTopic(item)}>{item}</button>)}</div><button className="primary-button wide" onClick={generateNotes}><Sparkles size={16} /> Generate smart notes</button></div><div className="output-panel"><div className="output-head"><div><span className="output-label">AI GENERATED NOTES</span><h3>{notes ? topic : "Your notes will appear here"}</h3></div>{notes && <button className="text-button" onClick={() => { navigator.clipboard?.writeText(notes); toast.success("Notes copied"); }}>Copy notes</button>}</div>{notes ? <div className="markdown-preview">{notes.split("\n").map((line, index) => line.startsWith("##") ? <h2 key={index}>{line.replace("## ", "")}</h2> : line.startsWith("**") ? <p key={index}><strong>{line.replaceAll("**", "")}</strong></p> : <p key={index}>{line}</p>)}</div> : <div className="empty-output"><div className="empty-icon"><FileText size={27} /></div><p>Start with a topic on the left and let your AI study partner do the heavy lifting.</p></div>}</div></div></ToolPage>}

          {active === "quiz" && <ToolPage icon={<CircleHelp />} eyebrow="QUIZ GENERATOR" title="Practice until it clicks." description="Turn any subject into a quick multiple-choice challenge and get instant feedback."><div className="quiz-layout"><div className="quiz-card"><div className="quiz-top"><span className="question-count">QUESTION 1 OF 5</span><span className="difficulty">MEDIUM</span></div><div className="quiz-progress"><span /></div>{!quizStarted ? <div className="quiz-start"><div className="quiz-illustration"><Target size={42} /></div><h3>Ready for a quick challenge?</h3><p>We’ll generate five questions based on core engineering concepts. No pressure, just practice.</p><button className="primary-button" onClick={startQuiz}>Start quiz <ArrowRight size={15} /></button></div> : <><h3>Which data structure follows the LIFO principle?</h3><div className="answer-list">{["Queue", "Stack", "Linked List", "Graph"].map((answer, index) => <button key={answer} className={quizChoice === index ? "selected" : ""} onClick={() => setQuizChoice(index)}><span>{String.fromCharCode(65 + index)}</span>{answer}{quizScore !== null && index === 1 && <Check size={17} />}</button>)}</div>{quizScore === null ? <button className="primary-button" onClick={submitQuiz}>Check answer <ArrowRight size={15} /></button> : <div className={`feedback ${quizScore ? "correct" : "wrong"}`}><strong>{quizScore ? "Correct — nice work!" : "Not quite. The answer is Stack."}</strong><span>{quizScore ? "LIFO means the last item added is the first one removed." : "Remember: stacks are like a pile of plates."}</span><button onClick={startQuiz}>Try another question</button></div>}</>}</div><div className="quiz-side"><div className="side-stat"><Trophy size={18} /><div><strong>86%</strong><span>Your average score</span></div></div><div className="side-stat"><Flame size={18} /><div><strong>4 days</strong><span>Quiz streak</span></div></div><div className="quiz-tip"><Sparkles size={17} /><strong>Pro tip</strong><p>Use quizzes after studying to move ideas from short-term to long-term memory.</p></div></div></div></ToolPage>}

          {active === "planner" && <ToolPage icon={<CalendarDays />} eyebrow="STUDY PLANNER" title="Your day, with a little more clarity." description="Build a realistic plan, focus on what matters, and celebrate what you finish."><div className="planner-layout"><div className="planner-card"><div className="planner-head"><div><span className="date-label">TUESDAY, NOV 23</span><h3>Today’s focus</h3></div><button className="primary-button small" onClick={addTask}><Plus size={15} /> Add task</button></div><div className="add-task-row"><input value={newTask} onChange={(event) => setNewTask(event.target.value)} onKeyDown={(event) => event.key === "Enter" && addTask()} placeholder="Add a new study task..." /><button onClick={addTask}><Plus size={17} /></button></div><div className="planner-list">{tasks.map((task) => <div className={`planner-task ${task.done ? "done" : ""}`} key={task.id}><button className={`check-circle ${task.done ? "checked" : ""}`} onClick={() => toggleTask(task.id)}>{task.done && <Check size={13} />}</button><div><strong>{task.title}</strong><span>{task.subject}</span></div><time>{task.time}</time></div>)}</div></div><div className="focus-card"><div className="focus-orb"><Target size={27} /></div><span className="output-label">FOCUS SCORE</span><strong>8.4<span>/10</span></strong><p>Your plan has a healthy mix of deep work and review.</p><div className="focus-bar"><span /></div><small>+12% from last week</small></div></div></ToolPage>}

          {active === "summarizer" && <ToolPage icon={<BookOpen />} eyebrow="PDF SUMMARIZER" title="Less scrolling. More understanding." description="Upload study material and get the important ideas, without the information overload."><div className="summarizer-layout"><div className={`upload-card ${uploaded ? "uploaded" : ""}`} onClick={() => setUploaded(true)}><div className="upload-icon">{uploaded ? <Check size={27} /> : <Upload size={27} />}</div>{uploaded ? <><h3>Operating_Systems_Notes.pdf</h3><p>Uploaded successfully · 2.4 MB</p><button className="text-button" onClick={(event) => { event.stopPropagation(); setUploaded(false); }}>Replace file</button></> : <><h3>Drop your PDF here</h3><p>or click to browse from your device</p><span>PDF files up to 10 MB</span></>}</div><div className="summary-card"><div className="output-head"><div><span className="output-label">SAMPLE SUMMARY</span><h3>Operating Systems — Process Scheduling</h3></div><div className="summary-badge"><Sparkles size={14} /> AI summary</div></div><div className="summary-points"><div><span>01</span><p><strong>Process scheduling</strong> decides which process runs next, balancing response time, throughput, and fairness.</p></div><div><span>02</span><p><strong>Preemptive algorithms</strong> can interrupt a running process, making them better for responsive interactive systems.</p></div><div><span>03</span><p><strong>Context switching</strong> saves the current process state before loading another, creating a small but important overhead.</p></div></div><button className="light-button dark-button" onClick={() => toast.success("Summary downloaded for your revision")}>Download summary <ArrowRight size={15} /></button></div></div></ToolPage>}
        </div>
        <footer className="site-footer"><div><Logo /><p>Study smarter. Learn with clarity.</p></div><div className="footer-links"><button onClick={() => toast.info("StudyAI is a college project demo built for engineering students.")}>About us</button><button onClick={() => toast.info("Contact: hello@studyai.demo")}>Contact</button><button onClick={() => toast.info("Privacy is respected in this demo experience.")}>Privacy</button></div><span>© 2026 StudyAI</span></footer>
      </main>
      {showLogin && <div className="modal-backdrop" onClick={() => setShowLogin(false)}><div className="login-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setShowLogin(false)}><X size={18} /></button><div className="login-brand"><Logo /></div><h2>Welcome back</h2><p>Sign in to keep your study momentum going.</p><input placeholder="Email address" defaultValue="arjun@studyai.demo" /><input placeholder="Password" type="password" defaultValue="demo123" /><button className="primary-button wide" onClick={() => { setLoggedIn(true); setShowLogin(false); toast.success("Welcome back, Arjun!"); }}>{loggedIn ? "Continue to dashboard" : "Sign in to StudyAI"}</button><small>Demo account: arjun@studyai.demo · demo123</small></div></div>}
    </div>
  );
}

function ToolPage({ icon, eyebrow, title, description, children }: { icon: React.ReactNode; eyebrow: string; title: string; description: string; children: React.ReactNode }) {
  return <section className="tool-page"><div className="tool-heading"><div className="tool-icon">{icon}</div><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p className="lead">{description}</p></div></div>{children}</section>;
}
