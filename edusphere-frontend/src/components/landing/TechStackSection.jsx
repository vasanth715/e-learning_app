import React, { useState } from 'react';

export default function TechStackSection() {
  const [activeCategory, setActiveCategory] = useState('AI');

  const categories = [
    { id: 'AI', label: 'ARTIFICIAL INTELLIGENCE' },
    { id: 'FRONTEND', label: 'FRONTEND' },
    { id: 'BACKEND', label: 'BACKEND' },
    { id: 'CLOUD', label: 'CLOUD / DEVOPS' },
    { id: 'MOBILE', label: 'MOBILE' }
  ];

  const techData = {
    AI: [
      { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'PyTorch', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
      { name: 'TensorFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
      { name: 'OpenCV', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' },
      { name: 'NumPy', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
      { name: 'Pandas', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' }
    ],
    FRONTEND: [
      { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original-wordmark.svg' },
      { name: 'Vue.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' }
    ],
    BACKEND: [
      { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'Spring Boot', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
      { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'Redis', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' }
    ],
    CLOUD: [
      { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
      { name: 'Google Cloud', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
      { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
      { name: 'Terraform', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg' },
      { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' }
    ],
    MOBILE: [
      { name: 'Swift', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg' },
      { name: 'Kotlin', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
      { name: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
      { name: 'React Native', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' }
    ]
  };

  return (
    <section className="space-y-6 text-left">
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-wider uppercase">OUR TECH STACK</h2>
        <p className="text-xs text-slate-400 mt-1.5">Explore the modern tools and ecosystems integrated within our learning paths.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start bg-slate-50/50 p-6 md:p-8 rounded-[36px] border border-slate-100">
        {/* Left Sidebar Category Menu */}
        <div className="w-full md:w-64 flex flex-col gap-1.5 flex-shrink-0">
          {categories.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full text-left px-5 py-3 rounded-2xl text-[10px] font-black tracking-wider transition-all duration-300 flex items-center gap-2.5 relative border ${
                  isActive
                    ? 'bg-purple-50 text-purple-700 border-purple-100/50 shadow-sm'
                    : 'bg-white text-slate-400 border-slate-100 hover:bg-slate-50 hover:text-slate-600'
                }`}
              >
                {/* Visual Active Blue Dot Indicator */}
                <span className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-purple-600 scale-125' : 'bg-slate-200'
                }`}></span>
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Right Logo Grid */}
        <div className="flex-1 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {techData[activeCategory].map((tech, idx) => (
              <div
                key={tech.name + idx}
                className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col items-center justify-center gap-2 hover:shadow-md hover:border-purple-200/50 transition duration-300 h-28 group"
              >
                <div className="h-12 w-12 flex items-center justify-center transition duration-500 group-hover:scale-110">
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className="h-full w-full object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg';
                    }}
                  />
                </div>
                <span className="font-bold text-slate-800 text-[11px] tracking-wide">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
