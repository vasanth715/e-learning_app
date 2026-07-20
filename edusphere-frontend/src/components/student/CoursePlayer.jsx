import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Play, Check, ChevronLeft, Award, Clock, Send } from 'lucide-react';

export default function CoursePlayer({ user, courseId, onNavigate }) {
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Q&A forum
  const [discussions, setDiscussions] = useState([]);
  const [newQuestionText, setNewQuestionText] = useState('');

  // Quiz states
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  const loadCourseData = async () => {
    setLoading(true);
    try {
      const coursesRes = await api.request(`/courses?page=0&size=100`);
      const selected = coursesRes.content.find(c => c.id === parseInt(courseId));
      setCourse(selected);

      const enrollsRes = await api.request('/enrollments/my');
      const foundEnroll = enrollsRes.find(e => e.courseId === parseInt(courseId));
      setEnrollment(foundEnroll);

      if (selected && selected.sections.length > 0) {
        setActiveLesson(selected.sections[0].lessons[0]);
      }
    } catch (err) {
      console.error('Failed to load course player:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadDiscussions = async () => {
    try {
      const list = await api.request(`/courses/${courseId}/discussions`);
      setDiscussions(list);
    } catch (e) {
      const cached = JSON.parse(localStorage.getItem(`discussions_${courseId}`)) || [];
      setDiscussions(cached);
    }
  };

  useEffect(() => {
    loadCourseData();
    loadDiscussions();
  }, [courseId, user]);

  useEffect(() => {
    setSelectedAnswers({});
    setQuizResult(null);
  }, [activeLesson?.id]);

  const handleMarkComplete = async () => {
    if (!enrollment || !activeLesson) return;
    try {
      const res = await api.request(`/enrollments/${enrollment.id}/lessons/${activeLesson.id}/complete`, {
        method: 'POST'
      });
      
      setEnrollment(prev => ({
        ...prev,
        progressPercent: res.progressPercent,
        status: res.status,
        completedLessonIds: res.completedLessonIds
      }));

      // Update state local storage fallback cases
      const cachedEnrolls = JSON.parse(localStorage.getItem('edusphere_mock_enrolls')) || [];
      const matchIdx = cachedEnrolls.findIndex(e => e.id === enrollment.id);
      if (matchIdx !== -1) {
        cachedEnrolls[matchIdx] = {
          ...cachedEnrolls[matchIdx],
          progressPercent: res.progressPercent,
          status: res.status,
          completedLessonIds: res.completedLessonIds
        };
        localStorage.setItem('edusphere_mock_enrolls', JSON.stringify(cachedEnrolls));
      }

      // Next lesson index
      const allLessons = course.sections.flatMap(s => s.lessons);
      const idx = allLessons.findIndex(l => l.id === activeLesson.id);
      if (idx !== -1 && idx < allLessons.length - 1) {
        setActiveLesson(allLessons[idx + 1]);
      } else {
        alert('Congratulations! You completed the course! 🏆');
      }
    } catch (err) {
      alert('Failed to mark lesson complete: ' + err.message);
    }
  };

  const handlePostQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    try {
      const res = await api.request(`/courses/${courseId}/discussions`, {
        method: 'POST',
        body: JSON.stringify({ lessonId: activeLesson?.id, body: newQuestionText })
      });
      setDiscussions(prev => [res, ...prev]);
    } catch (err) {
      // Local fallback
      const cached = JSON.parse(localStorage.getItem(`discussions_${courseId}`)) || [];
      const newD = {
        id: Date.now(),
        userName: user.name,
        userInitials: user.name.substring(0, 2).toUpperCase(),
        body: newQuestionText,
        createdDate: new Date().toISOString().split('T')[0],
        votes: 0
      };
      const updated = [newD, ...cached];
      localStorage.setItem(`discussions_${courseId}`, JSON.stringify(updated));
      setDiscussions(updated);
    }
    setNewQuestionText('');
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    
    // Parse questions body
    let questions = [];
    try {
      questions = JSON.parse(activeLesson.content || '[]');
    } catch (err) {
      questions = [
        { id: "q1", question: "What annotation is used to create a REST controller in Spring Boot?", options: ["@RestController", "@Controller"], answer: "@RestController" }
      ];
    }

    let correct = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.answer) correct++;
    });

    const score = Math.round((correct / questions.length) * 100);
    const passed = score >= 70;
    setQuizResult({ score, passed });

    if (passed) {
      alert(`Passed! Score: ${score}%`);
    } else {
      alert(`Score: ${score}%. Passing is 70%. Try again!`);
    }
  };

  const isLessonComplete = (id) => {
    return enrollment?.completedLessonIds?.includes(String(id)) || 
           enrollment?.completedLessonIds?.includes(id) || false;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!course) return <p className="text-center text-slate-400 py-10">Course not found.</p>;

  const allLessons = course.sections.flatMap(s => s.lessons);

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-6rem)] lg:h-[calc(100vh-6rem)] lg:overflow-hidden border border-slate-200 rounded-3xl bg-white select-text">
      
      {/* Viewport content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="aspect-video bg-slate-900 flex items-center justify-center relative p-6">
          {activeLesson?.type === 'quiz' ? (
            <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg border border-slate-200 text-slate-800 space-y-4">
              <h4 className="font-extrabold text-sm text-purple-600 flex items-center gap-1">
                <Award className="h-4 w-4" /> Practice Quiz Assessment
              </h4>
              {quizResult ? (
                <div className="text-center py-4 space-y-2">
                  <div className={`text-4xl font-black ${quizResult.passed ? 'text-emerald-500' : 'text-red-500'}`}>
                    {quizResult.score}%
                  </div>
                  <p className="text-xs text-slate-500">
                    {quizResult.passed ? 'Passed! You can now mark this lesson complete.' : 'Requires 70% to pass.'}
                  </p>
                  {!quizResult.passed && (
                    <button onClick={() => setQuizResult(null)} className="px-4 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-bold">
                      Try Again
                    </button>
                  )}
                </div>
              ) : (
                <form onSubmit={handleQuizSubmit} className="space-y-4 text-left">
                  {/* Default Spring mock quiz structure */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-700">1. What annotation is used to create a REST controller in Spring Boot?</p>
                    {["@RestController", "@Controller", "@Service"].map(opt => (
                      <label key={opt} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg text-xs cursor-pointer border border-slate-200">
                        <input
                          type="radio"
                          name="q1"
                          required
                          value={opt}
                          onChange={() => setSelectedAnswers(prev => ({ ...prev, q1: opt }))}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                  <button type="submit" className="w-full py-2 bg-purple-600 text-white rounded-xl text-xs font-bold">
                    Submit Quiz
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div className="text-center text-white space-y-3">
              <span className="text-5xl">{course.thumbnail}</span>
              <h3 className="font-black text-sm">{activeLesson?.title || 'Lecture Video'}</h3>
              <button className="h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center mx-auto hover:scale-105 active:scale-95 transition">
                <Play className="h-5 w-5 fill-white ml-0.5 text-white" />
              </button>
            </div>
          )}
        </div>

        {/* Video Control bar */}
        <div className="flex items-center justify-between border-b border-slate-100 p-4">
          <div className="flex gap-2">
            <button 
              disabled={allLessons[0]?.id === activeLesson?.id}
              onClick={() => {
                const idx = allLessons.findIndex(l => l.id === activeLesson.id);
                if (idx > 0) setActiveLesson(allLessons[idx - 1]);
              }}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 disabled:opacity-30 rounded-xl text-xs font-bold transition"
            >
              Prev
            </button>
            <button
              onClick={handleMarkComplete}
              disabled={isLessonComplete(activeLesson?.id) || (activeLesson?.type === 'quiz' && !quizResult?.passed)}
              className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50 rounded-xl text-xs font-bold transition"
            >
              {isLessonComplete(activeLesson?.id) ? 'Completed ✓' : 'Mark Complete'}
            </button>
          </div>
          <span className="text-xs text-slate-400 font-bold">Progress: {enrollment?.progressPercent || 0}%</span>
        </div>

        {/* Info tabs */}
        <div className="p-6 space-y-6">
          <div className="flex gap-4 border-b border-slate-100 pb-2">
            {['overview', 'qa'].map(t => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`pb-2 text-xs font-black uppercase tracking-wider border-b-2 -mb-2.5 transition ${
                  activeTab === t ? 'text-purple-600 border-purple-600' : 'text-slate-400 border-transparent hover:text-slate-600'
                }`}
              >
                {t === 'qa' ? 'Q&A Discussions' : t}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-2 text-left">
              <h4 className="font-bold text-slate-800 text-sm">{course.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{course.description}</p>
            </div>
          )}

          {activeTab === 'qa' && (
            <div className="space-y-4 text-left">
              <form onSubmit={handlePostQuestion} className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="Ask a question about this lesson..."
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-purple-500"
                />
                <button type="submit" className="p-2 bg-purple-600 text-white rounded-xl">
                  <Send className="h-4 w-4" />
                </button>
              </form>

              <div className="space-y-2">
                {discussions.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-2 text-center">No questions posted yet.</p>
                ) : (
                  discussions.map(d => (
                    <div key={d.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
                        <span className="text-purple-600">{d.userName || 'Ed Student'}</span>
                        <span>{d.createdDate}</span>
                      </div>
                      <p className="text-xs text-slate-600">{d.body}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Syllabus Sidebar */}
      <div className="w-full lg:w-80 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-slate-200 text-left bg-white">
          <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Course Syllabus</h4>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {course.sections.map(section => (
            <div key={section.id} className="space-y-2 text-left">
              <h5 className="font-extrabold text-[10px] text-slate-400 uppercase">{section.title}</h5>
              <div className="space-y-1.5">
                {section.lessons.map(lesson => (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLesson(lesson)}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl border text-left transition duration-300 ${
                      activeLesson?.id === lesson.id
                        ? 'bg-purple-50 border-purple-200 text-purple-700 font-bold'
                        : 'bg-white border-slate-100 hover:bg-slate-100/50 text-slate-600'
                    }`}
                  >
                    <div className={`h-5 w-5 rounded-full flex items-center justify-center border text-[9px] flex-shrink-0 ${
                      isLessonComplete(lesson.id)
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-slate-300 text-slate-400'
                    }`}>
                      {isLessonComplete(lesson.id) ? '✓' : '▶'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs truncate">{lesson.title}</div>
                      <div className="text-[9px] text-slate-400 mt-0.5 flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5" /> {lesson.duration}m
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
