import React, { useState } from 'react';
import { 
  X, Video, Image, Trash2, Film, Check, ArrowRight, ArrowLeft, UploadCloud
} from 'lucide-react';

export default function InstructorCourseBuilder({ isOpen, onClose, onSubmit, user }) {
  // Wizard state parameters
  const [wizardStep, setWizardStep] = useState(1); // 1: Info, 2: Media, 3: Curriculum
  
  // General Info states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Development');
  const [thumbnail, setThumbnail] = useState('💻');

  // Media states
  const [promoVideo, setPromoVideo] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  // Curriculum states
  const [curriculumSections, setCurriculumSections] = useState([
    {
      id: 1,
      title: "Introduction & Basic Setup",
      lessons: [
        { id: 101, title: "Course Welcome Overview", videoName: "promo_intro.mp4" }
      ]
    }
  ]);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [activeSectionId, setActiveSectionId] = useState(null);

  if (!isOpen) return null;

  const handleVideoUploadSimulate = () => {
    setIsUploadingVideo(true);
    setVideoProgress(0);
    const interval = setInterval(() => {
      setVideoProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploadingVideo(false);
          setPromoVideo("intro_course_overview.mp4");
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handleThumbnailUploadSimulate = () => {
    setIsUploadingThumbnail(true);
    setTimeout(() => {
      setIsUploadingThumbnail(false);
      let banner = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"; // Tech
      if (category === 'Design') {
        banner = "https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&w=600&q=80";
      } else if (category === 'Business') {
        banner = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80";
      }
      setThumbnailUrl(banner);
    }, 1000);
  };

  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return;
    setCurriculumSections(prev => [
      ...prev,
      {
        id: Date.now(),
        title: newSectionTitle,
        lessons: []
      }
    ]);
    setNewSectionTitle('');
  };

  const handleAddLesson = (sectionId) => {
    if (!newLessonTitle.trim()) return;
    setCurriculumSections(prev => prev.map(sec => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          lessons: [
            ...sec.lessons,
            { id: Date.now(), title: newLessonTitle, videoName: `lesson_chapter_${sec.lessons.length + 1}.mp4` }
          ]
        };
      }
      return sec;
    }));
    setNewLessonTitle('');
    setActiveSectionId(null);
  };

  const handleRemoveSection = (sectionId) => {
    setCurriculumSections(prev => prev.filter(sec => sec.id !== sectionId));
  };

  const handleRemoveLesson = (sectionId, lessonId) => {
    setCurriculumSections(prev => prev.map(sec => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          lessons: sec.lessons.filter(l => l.id !== lessonId)
        };
      }
      return sec;
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !price || !description.trim()) {
      alert("Please check and fill Step 1 general info details!");
      setWizardStep(1);
      return;
    }

    const payload = {
      title,
      description,
      price: parseFloat(price),
      originalPrice: parseFloat(price) * 1.5,
      category,
      thumbnail: thumbnailUrl || thumbnail,
      level: 'Beginner',
      status: 'pending_review',
      sections: curriculumSections.map(sec => ({
        title: sec.title,
        lessons: sec.lessons.map(les => ({
          title: les.title,
          videoUrl: les.videoName
        }))
      })),
      promoVideoUrl: promoVideo
    };

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden transition-all duration-300">
        
        {/* Modal Gradient Header with Progress indicators */}
        <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-left relative">
          <h3 className="text-lg font-black tracking-wide">Build New Course</h3>
          <p className="text-xs text-purple-100/90 mt-1">Configure professional media, intro video and lesson syllabus.</p>

          {/* Steps indicators capsules */}
          <div className="flex items-center gap-3 mt-4 text-[10px] font-black tracking-wide">
            <span className={`px-3 py-1 rounded-full flex items-center gap-1 transition ${wizardStep >= 1 ? 'bg-white text-purple-700' : 'bg-purple-500/30 text-purple-200'}`}>
              1. Info
            </span>
            <div className="h-0.5 w-6 bg-purple-400/30"></div>
            <span className={`px-3 py-1 rounded-full flex items-center gap-1 transition ${wizardStep >= 2 ? 'bg-white text-purple-700' : 'bg-purple-500/30 text-purple-200'}`}>
              2. Media uploads
            </span>
            <div className="h-0.5 w-6 bg-purple-400/30"></div>
            <span className={`px-3 py-1 rounded-full flex items-center gap-1 transition ${wizardStep >= 3 ? 'bg-white text-purple-700' : 'bg-purple-500/30 text-purple-200'}`}>
              3. Syllabus
            </span>
          </div>
        </div>

        {/* Modal content body based on wizard step */}
        <div className="p-6 text-left max-h-[60vh] overflow-y-auto space-y-4">
          
          {/* STEP 1: General Info details */}
          {wizardStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Course Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Advanced Java Spring Architect BootCamp"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-purple-500 transition font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Detailed Description</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Provide full description of target audience, outcomes, and syllabus scope..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-purple-500 transition leading-relaxed font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Price ($ USD)</label>
                  <input
                    type="number"
                    required
                    placeholder="99"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-purple-500 transition font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Domain Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-purple-500 transition font-bold text-slate-700"
                  >
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
              </div>

              {/* Choose Icon Emoji row */}
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Choose Subject Icon Emoji</label>
                <div className="grid grid-cols-5 gap-3 text-center">
                  {['💻', '🐍', '🎨', '🚀', '📊'].map(emoji => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setThumbnail(emoji)}
                      className={`p-3 rounded-2xl border text-xl transition-all duration-300 ${
                        thumbnail === emoji ? 'bg-purple-50 border-purple-500 shadow-sm shadow-purple-600/10' : 'bg-slate-50 border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Intro Video & Thumbnail cover Uploads */}
          {wizardStep === 2 && (
            <div className="space-y-5">
              
              {/* Promo Video drop container */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Course Promotional Video (Intro)</label>
                {promoVideo ? (
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-emerald-800">
                      <Film className="h-5 w-5 text-emerald-600 shrink-0" />
                      <div>
                        <div className="font-bold truncate">{promoVideo}</div>
                        <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Size: 42.5 MB • Status: 100% Uploaded</div>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setPromoVideo(null)}
                      className="p-1.5 bg-white text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition border border-emerald-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ) : isUploadingVideo ? (
                  <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                      <span>Uploading promo_intro_intro.mp4...</span>
                      <span>{videoProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-purple-600 h-full transition-all duration-300" style={{ width: `${videoProgress}%` }}></div>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={handleVideoUploadSimulate}
                    className="bg-slate-50/50 hover:bg-slate-50 border-2 border-dashed border-slate-200/80 hover:border-purple-400 p-8 rounded-3xl cursor-pointer text-center space-y-2 transition duration-300"
                  >
                    <UploadCloud className="h-8 w-8 text-slate-400 mx-auto" />
                    <div>
                      <p className="text-xs font-bold text-slate-700">Click to Upload Course Introductory Video</p>
                      <p className="text-[10px] text-slate-400 mt-1">Supports MP4, WebM formats (Max 100MB)</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Thumbnail / Cover Photo drop container */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Course Cover Thumbnail Image</label>
                {thumbnailUrl ? (
                  <div className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-sm relative group">
                    <img 
                      src={thumbnailUrl} 
                      alt="Thumbnail preview" 
                      className="h-36 w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                      <button 
                        type="button"
                        onClick={() => setThumbnailUrl(null)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-lg"
                      >
                        <Trash2 className="h-4 w-4" /> Replace Image
                      </button>
                    </div>
                  </div>
                ) : isUploadingThumbnail ? (
                  <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex items-center justify-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-purple-500"></div>
                    <span className="text-xs font-bold text-slate-500">Generating premium cover banner...</span>
                  </div>
                ) : (
                  <div 
                    onClick={handleThumbnailUploadSimulate}
                    className="bg-slate-50/50 hover:bg-slate-50 border-2 border-dashed border-slate-200/80 hover:border-purple-400 p-8 rounded-3xl cursor-pointer text-center space-y-2 transition duration-300"
                  >
                    <Image className="h-8 w-8 text-slate-400 mx-auto" />
                    <div>
                      <p className="text-xs font-bold text-slate-700">Click to Upload Course Cover Thumbnail</p>
                      <p className="text-[10px] text-slate-400 mt-1">Recommended size: 1280x720 (JPEG, PNG)</p>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* STEP 3: Curriculum Chapter/Section Syllabus Builder */}
          {wizardStep === 3 && (
            <div className="space-y-4">
              
              {/* Add New Section form */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Chapter 2: REST Controllers and Database Config"
                  value={newSectionTitle}
                  onChange={(e) => setNewSectionTitle(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-purple-500 transition font-medium"
                />
                <button
                  type="button"
                  onClick={handleAddSection}
                  className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-black shadow-md hover:scale-105 transition"
                >
                  + Add Chapter
                </button>
              </div>

              {/* Sections list feed */}
              <div className="space-y-4 pt-2">
                <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Curriculum Outline</h4>
                {curriculumSections.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No syllabus chapters added yet. Add a chapter above to start.</p>
                ) : (
                  <div className="space-y-3">
                    {curriculumSections.map((sec, secIdx) => (
                      <div key={sec.id} className="border border-slate-200/80 rounded-2xl overflow-hidden bg-slate-50/50">
                        
                        {/* Section header block */}
                        <div className="bg-slate-100 p-3.5 flex justify-between items-center border-b border-slate-200/60">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] bg-purple-600 text-white font-black px-1.5 py-0.5 rounded">CH {secIdx + 1}</span>
                            <span className="text-xs font-bold text-slate-800">{sec.title}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setActiveSectionId(sec.id)}
                              className="text-[10px] bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold px-2 py-1 rounded-lg border border-purple-200/30"
                            >
                              + Lesson
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveSection(sec.id)}
                              className="text-red-500 hover:text-red-700 p-1 hover:bg-white rounded-lg"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Section Lessons list */}
                        <div className="p-3 space-y-2">
                          {sec.lessons && sec.lessons.length > 0 ? (
                            <div className="space-y-1.5">
                              {sec.lessons.map((les, lesIdx) => (
                                <div key={les.id} className="bg-white p-2.5 rounded-xl border border-slate-100 flex items-center justify-between text-xs text-slate-700">
                                  <div className="flex items-center gap-2">
                                    <Film className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                                    <span>Lesson {lesIdx + 1}: {les.title}</span>
                                    <span className="text-[9px] text-slate-400 font-semibold italic">({les.videoName})</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveLesson(sec.id, les.id)}
                                    className="text-slate-400 hover:text-red-500 p-1"
                                  >
                                    <X className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-[10px] text-slate-400 italic text-center py-2">No lessons in this chapter yet.</p>
                          )}

                          {/* Inline Add Lesson Form */}
                          {activeSectionId === sec.id && (
                            <div className="mt-3 p-3 bg-white border border-slate-200 rounded-xl space-y-2 text-left">
                              <h5 className="text-[9px] font-black text-slate-500 uppercase">New Lesson</h5>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="e.g. Writing Endpoint Mapping methods"
                                  value={newLessonTitle}
                                  onChange={(e) => setNewLessonTitle(e.target.value)}
                                  className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-purple-500 font-medium"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleAddLesson(sec.id)}
                                  className="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-bold"
                                >
                                  Attach
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

        {/* Modal actions footer buttons */}
        <div className="p-6 border-t border-slate-100 flex gap-3 bg-slate-50/50">
          {wizardStep > 1 ? (
            <button
              type="button"
              onClick={() => setWizardStep(prev => prev - 1)}
              className="flex-1 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold transition"
            >
              Cancel
            </button>
          )}

          {wizardStep < 3 ? (
            <button
              type="button"
              onClick={() => setWizardStep(prev => prev + 1)}
              className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              Next <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFormSubmit}
              className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 shadow-lg shadow-purple-600/10"
            >
              <Check className="h-4 w-4" /> Submit Course
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
