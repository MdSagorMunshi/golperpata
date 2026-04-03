'use client';

import { useState } from 'react';
import { CATEGORIES } from '@/types/story';

const TEMPLATE = `---
শিরোনাম: "{title}"
লেখক: "{author}"
বিষয়শ্রেণী: "ছোটগল্প"
ট্যাগ:
  - "ক্লাসিক"
সংক্ষেপ: "{summary}"
কপিরাইট_মুক্ত: true
প্রকাশকাল: ""
যোগ_করা_হয়েছে: "{date}"
উৎস: ""
---

{body}`;

export function ConverterClient() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('ছোটগল্প');
  const [tags, setTags] = useState('');
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [isAI, setIsAI] = useState(false);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const convert = () => {
    const tagList = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const tagYaml = tagList.map((t) => `  - "${t}"`).join('\n');
    const today = new Date().toISOString().split('T')[0];

    // Auto-format body: add paragraph spacing
    const formattedBody = body
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    const aiLine = isAI ? '\nএআই_নির্মিত: true' : '';

    const md = `---
শিরোনাম: "${title}"
লেখক: "${author}"
বিষয়শ্রেণী: "${category}"
ট্যাগ:
${tagYaml}
সংক্ষেপ: "${summary}"
কপিরাইট_মুক্ত: true
প্রকাশকাল: ""
যোগ_করা_হয়েছে: "${today}"
উৎস: ""${aiLine}
---

${formattedBody}`;

    setOutput(md);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const blob = new Blob([output], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title || 'গল্প'}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input */}
        <div className="space-y-4">
          <h2
            className="text-xl mb-4"
            style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', color: 'var(--রং-জাফরান)' }}
          >
            তথ্য দিন
          </h2>

          <div>
            <label className="text-sm font-medium block mb-1" style={{ color: 'var(--রং-কালি-মাঝারি)' }}>
              শিরোনাম *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="গল্পের শিরোনাম"
              className="w-full px-3 py-2 rounded text-base"
              style={inputStyle}
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1" style={{ color: 'var(--রং-কালি-মাঝারি)' }}>
              লেখক *
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="লেখকের নাম"
              className="w-full px-3 py-2 rounded text-base"
              style={inputStyle}
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1" style={{ color: 'var(--রং-কালি-মাঝারি)' }}>
              বিষয়শ্রেণী
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded text-base"
              style={inputStyle}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1" style={{ color: 'var(--রং-কালি-মাঝারি)' }}>
              ট্যাগ (কমা দিয়ে আলাদা)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="ক্লাসিক, গ্রামীণ, মানবিকতা"
              className="w-full px-3 py-2 rounded text-base"
              style={inputStyle}
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1" style={{ color: 'var(--রং-কালি-মাঝারি)' }}>
              সংক্ষেপ (দুই-তিন বাক্যে)
            </label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="গল্পের সংক্ষিপ্ত বিবরণ..."
              className="w-full px-3 py-2 rounded text-base h-20 resize-y"
              style={inputStyle}
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1" style={{ color: 'var(--রং-কালি-মাঝারি)' }}>
              গল্পের মূল লেখা *
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="এখানে গল্পটি পেস্ট করুন..."
              className="w-full px-3 py-2 rounded text-base h-64 resize-y"
              style={{ ...inputStyle, lineHeight: '1.9' }}
            />
          </div>

          <div
            className="flex items-center gap-3 p-3 rounded"
            style={{
              background: isAI ? 'rgba(124, 58, 237, 0.08)' : 'var(--রং-পুরনো-কাগজ)',
              border: `1.5px solid ${isAI ? '#7C3AED' : 'var(--সীমা-হালকা)'}`,
              transition: 'all 200ms ease-out',
            }}
          >
            <input
              type="checkbox"
              id="ai-generated"
              checked={isAI}
              onChange={(e) => setIsAI(e.target.checked)}
              className="w-4 h-4 accent-[#7C3AED] cursor-pointer"
            />
            <label
              htmlFor="ai-generated"
              className="text-sm cursor-pointer select-none"
              style={{ color: isAI ? '#7C3AED' : 'var(--রং-কালি-মাঝারি)' }}
            >
              🤖 এই গল্পটি AI দ্বারা তৈরি
            </label>
          </div>

          <button onClick={convert} className="btn btn--primary w-full">
            রূপান্তর করুন
          </button>
        </div>

        {/* Output */}
        <div>
          <h2
            className="text-xl mb-4"
            style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', color: 'var(--রং-জাফরান)' }}
          >
            মার্কডাউন আউটপুট
          </h2>

          {output ? (
            <>
              <pre
                className="rounded p-4 text-sm overflow-auto max-h-[600px]"
                style={{
                  background: 'var(--রং-পুরনো-কাগজ)',
                  border: '1px solid var(--সীমা-হালকা)',
                  color: 'var(--রং-কালি)',
                  fontFamily: 'var(--ফন্ট-কোড)',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {output}
              </pre>
              <div className="mt-4 flex gap-3">
                <button onClick={copyToClipboard} className="btn flex-1">
                  {copied ? '✓ কপি হয়েছে!' : '📋 কপি'}
                </button>
                <button onClick={downloadFile} className="btn btn--primary flex-1">
                  ⬇ ডাউনলোড .md
                </button>
              </div>
            </>
          ) : (
            <div
              className="rounded p-8 text-center"
              style={{
                background: 'var(--রং-পুরনো-কাগজ)',
                border: '2px dashed var(--সীমা-হালকা)',
                color: 'var(--রং-কালি-বিবর্ণ)',
              }}
            >
              <p className="text-base" style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)' }}>
                রূপান্তরিত ফাইল এখানে দেখা যাবে
              </p>
              <p className="text-sm mt-2">
                বাম দিকে তথ্য পূরণ করুন ও &quot;রূপান্তর করুন&quot; চাপুন
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: 'var(--রং-কার্ড)',
  border: '1px solid var(--সীমা-হালকা)',
  color: 'var(--রং-কালি)',
  fontFamily: 'var(--ফন্ট-মূল)',
};
