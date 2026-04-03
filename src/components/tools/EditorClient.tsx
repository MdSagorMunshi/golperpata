'use client';

import { useState, useCallback } from 'react';

const STARTER_TEMPLATE = `---
শিরোনাম: "আপনার গল্পের শিরোনাম"
লেখক: "আপনার নাম"
বিষয়শ্রেণী: "ছোটগল্প"
ট্যাগ:
  - "ট্যাগ-১"
সংক্ষেপ: "গল্পের সংক্ষিপ্ত বিবরণ"
কপিরাইট_মুক্ত: true
প্রকাশকাল: ""
যোগ_করা_হয়েছে: "${new Date().toISOString().split('T')[0]}"
উৎস: ""
---

এখানে আপনার গল্প লিখুন।

## দ্বিতীয় অধ্যায়

আরও লিখুন...

> এটি একটি উদ্ধৃতি।

---

গল্পের শেষ।`;

export function EditorClient() {
  const [markdown, setMarkdown] = useState(STARTER_TEMPLATE);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [markdown]);

  const downloadFile = useCallback(() => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'গল্প.md';
    a.click();
    URL.revokeObjectURL(url);
  }, [markdown]);

  // Simple markdown rendering for preview
  const renderPreview = (md: string) => {
    // Split frontmatter from content
    const parts = md.split('---');
    let content = md;
    let frontmatter = '';

    if (parts.length >= 3) {
      frontmatter = parts[1];
      content = parts.slice(2).join('---');
    }

    // Parse frontmatter title and author
    const titleMatch = frontmatter.match(/শিরোনাম:\s*"([^"]+)"/);
    const authorMatch = frontmatter.match(/লেখক:\s*"([^"]+)"/);

    const html = content
      .split('\n\n')
      .map((block) => {
        const trimmed = block.trim();
        if (!trimmed) return '';
        if (trimmed.startsWith('## '))
          return `<h2 style="font-size:1.4rem;color:var(--রং-জাফরান);margin-top:2rem;margin-bottom:0.5rem;font-family:var(--ফন্ট-শিরোনাম)">${trimmed.replace('## ', '')}</h2>`;
        if (trimmed.startsWith('> '))
          return `<blockquote style="border-left:3px solid var(--রং-জাফরান);padding-left:1.5rem;font-style:italic;color:var(--রং-কালি-মাঝারি);margin:1rem 0">${trimmed.replace(/^> ?/gm, '')}</blockquote>`;
        if (trimmed === '---')
          return '<hr style="border:none;height:1px;background:var(--সীমা-হালকা);margin:2rem 0"/>';
        return `<p style="margin-bottom:1rem;line-height:2.0">${trimmed}</p>`;
      })
      .join('');

    return { titleMatch: titleMatch?.[1], authorMatch: authorMatch?.[1], html };
  };

  const { titleMatch, authorMatch, html } = renderPreview(markdown);

  return (
    <div>
      {/* Toolbar */}
      <div
        className="flex gap-3 mb-4 p-3 rounded"
        style={{
          background: 'var(--রং-পুরনো-কাগজ)',
          border: '1px solid var(--সীমা-হালকা)',
        }}
      >
        <button onClick={copyToClipboard} className="btn text-sm py-1 px-3">
          {copied ? '✓ কপি হয়েছে' : '📋 কপি'}
        </button>
        <button onClick={downloadFile} className="btn btn--primary text-sm py-1 px-3">
          ⬇ ডাউনলোড
        </button>
        <span className="text-xs self-center ml-auto" style={{ color: 'var(--রং-কালি-হালকা)' }}>
          {markdown.split(/\s+/).length} শব্দ
        </span>
      </div>

      {/* Split Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded overflow-hidden" style={{ border: '1px solid var(--সীমা-হালকা)' }}>
        {/* Editor */}
        <div>
          <div
            className="px-3 py-2 text-xs font-medium"
            style={{
              background: 'var(--রং-পুরনো-কাগজ)',
              borderBottom: '1px solid var(--সীমা-হালকা)',
              color: 'var(--রং-কালি-হালকা)',
            }}
          >
            মার্কডাউন
          </div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full p-4 text-sm resize-none"
            style={{
              background: 'var(--রং-কার্ড)',
              color: 'var(--রং-কালি)',
              fontFamily: 'var(--ফন্ট-কোড)',
              minHeight: '500px',
              border: 'none',
              outline: 'none',
              lineHeight: '1.8',
            }}
            spellCheck={false}
          />
        </div>

        {/* Preview — always light mode for paper look */}
        <div style={{ borderLeft: '1px solid var(--সীমা-হালকা)' }}>
          <div
            className="px-3 py-2 text-xs font-medium"
            style={{
              background: 'var(--রং-পুরনো-কাগজ)',
              borderBottom: '1px solid var(--সীমা-হালকা)',
              color: 'var(--রং-কালি-হালকা)',
            }}
          >
            প্রিভিউ
          </div>
          <div
            className="p-6"
            style={{
              background: '#f5f0e8',
              backgroundImage: 'url(/images/paper-light.png)',
              backgroundSize: '400px',
              minHeight: '500px',
              color: '#2c1810',
            }}
          >
            {titleMatch && (
              <h1
                className="text-2xl md:text-3xl mb-1 text-center"
                style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', color: '#2c1810' }}
              >
                {titleMatch}
              </h1>
            )}
            {authorMatch && (
              <p className="text-center text-sm mb-6" style={{ color: '#c17d10' }}>
                {authorMatch}
              </p>
            )}
            <div
              className="story-body"
              style={{ fontFamily: 'var(--ফন্ট-মূল)', lineHeight: '2.0', color: '#3d2b1f' }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
