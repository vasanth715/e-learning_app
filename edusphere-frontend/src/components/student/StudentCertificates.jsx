import React from 'react';

export default function StudentCertificates({ certificates, getCourseDetails }) {
  return (
    <div className="space-y-4 text-left">
      <h3 className="text-lg font-bold text-slate-800">Verified Certificates Log</h3>
      {certificates.length === 0 ? (
        <p className="text-xs text-slate-400 italic">No certificates issued yet. Complete 100% of an enrolled path to claim your credential.</p>
      ) : (
        <div className="grid gap-3">
          {certificates.map(c => {
            const details = getCourseDetails(c.courseId);
            return (
              <div key={c.id} className="bg-slate-50 p-4 border border-slate-100 rounded-2xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🏅</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{details.title}</h4>
                    <p className="text-[9px] text-slate-400 mt-0.5">Credential ID: CERT-{(c.id + '').substring(0, 6).toUpperCase()}</p>
                  </div>
                </div>
                <button
                  onClick={() => alert(`Downloading Certificate PDF for ${details.title}`)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Download PDF
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
