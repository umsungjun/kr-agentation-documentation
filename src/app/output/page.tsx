'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { Footer } from '../Footer';

type OutputFormat = 'compact' | 'standard' | 'detailed' | 'forensic';

const FORMAT_STORAGE_KEY = 'agentation-output-format';

function CodeBlock({
  code,
  language = 'tsx',
  textOpacity = 1,
}: {
  code: string;
  language?: string;
  textOpacity?: number;
}) {
  return (
    <Highlight theme={themes.github} code={code.trim()} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className="code-block"
          style={{ ...style, background: 'transparent' }}
        >
          <div
            style={{
              opacity: textOpacity,
              transition: 'opacity 0.15s ease-out',
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </div>
        </pre>
      )}
    </Highlight>
  );
}

function AnimatedCodeBlock({
  code,
  language,
}: {
  code: string;
  language?: string;
}) {
  const [textOpacity, setTextOpacity] = useState(1);
  const [displayedCode, setDisplayedCode] = useState(code);
  const pendingCode = useRef<string | null>(null);

  useEffect(() => {
    if (code === displayedCode) return;

    // 대상을 저장하고 페이드 아웃
    pendingCode.current = code;
    setTextOpacity(0);

    // 페이드 후 콘텐츠를 교체하고 다시 페이드 인
    const timer = setTimeout(() => {
      if (pendingCode.current) {
        setDisplayedCode(pendingCode.current);
        pendingCode.current = null;
        setTimeout(() => setTextOpacity(1), 20);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [code, displayedCode]);

  return (
    <CodeBlock
      code={displayedCode}
      language={language}
      textOpacity={textOpacity}
    />
  );
}

const outputExamples: Record<OutputFormat, string> = {
  standard: `## Page Feedback: /dashboard
**Viewport:** 1512x738

### 1. button.submit-btn
**Location:** \`.form-container > .actions > button.submit-btn\`
**Classes:** \`submit-btn primary\`
**React:** \`<App> <Dashboard> <FormActions> <SubmitButton>\`
**Position:** 450, 320 (120x40)
**Feedback:** Button text should say "Save" not "Submit"

### 2. span.nav-label
**Location:** \`.sidebar > nav > .nav-item > span\`
**React:** \`<App> <Sidebar> <NavItem>\`
**Selected:** "Settigns"
**Feedback:** Typo - should be "Settings"`,

  detailed: `## Page Feedback: /dashboard
**Viewport:** 1512x738
**URL:** https://myapp.com/dashboard
**User Agent:** Chrome/120.0

---

### 1. button.submit-btn

**Selector:** \`.form-container > .actions > button.submit-btn\`
**Classes:** \`.submit-btn\`, \`.primary\`
**React:** \`<App> <Dashboard> <FormActions> <SubmitButton>\`
**Bounding box:** x:450, y:320, 120x40px
**Nearby text:** "Cancel Save Changes"

**Issue:** Button text should say "Save" not "Submit"

---

### 2. span.nav-label

**Selector:** \`.sidebar > nav > .nav-item > span\`
**Classes:** \`.nav-label\`
**React:** \`<App> <Sidebar> <NavItem>\`
**Selected text:** "Settigns"
**Nearby text:** "Dashboard Settigns Profile"

**Issue:** Typo - should be "Settings"

---

**Search tips:** Use the class names, React components, or selectors above to find these elements. Try \`grep -r "SubmitButton"\` or \`grep -r "className.*submit-btn"\`.`,

  compact: `## Feedback: /dashboard

1. **.submit-btn**
   Button text should say "Save" not "Submit"

2. **.nav-label** ("Settigns...")
   Typo - should be "Settings"`,

  forensic: `## Page Feedback: /dashboard

**Environment:**
- Viewport: 1440x900
- URL: http://localhost:3000/dashboard
- User Agent: Mozilla/5.0 Chrome/142.0.0.0
- Timestamp: 2024-01-15T10:30:00.000Z
- Device Pixel Ratio: 2

---

### 1. button.submit-btn

**Full DOM Path:** \`body > div.app > main.dashboard > div.form-container > div.actions > button.submit-btn\`
**React:** \`<App> <Dashboard> <FormActions> <SubmitButton>\`

**CSS Classes:** \`submit-btn, primary\`
**Position:**
- Bounding box: x:450, y:320
- Dimensions: 120x40px
- Annotation at: 45.2% from left, 320px from top
**Computed Styles:** bg: rgb(59, 130, 246), font: 14px, weight: 600, padding: 8px 16px, radius: 6px
**Accessibility:** focusable

**Issue:** Button text should say "Save" not "Submit"

---

### 2. span.nav-label

**Full DOM Path:** \`body > div.app > aside.sidebar > nav > div.nav-item:nth-child(2) > span.nav-label\`
**React:** \`<App> <Sidebar> <NavItem>\`

**CSS Classes:** \`nav-label\`
**Selected text:** "Settigns"
**Position:**
- Bounding box: x:24, y:156
- Dimensions: 64x20px
- Annotation at: 3.2% from left, 156px from top
**Computed Styles:** font: 13px, weight: 500, color: rgb(55, 65, 81)
**Accessibility:** none

**Issue:** Typo - should be "Settings"`,
};

export default function OutputPage() {
  const [outputFormat, setOutputFormat] = useState<OutputFormat | null>(null);

  useEffect(() => {
    const savedFormat = localStorage.getItem(FORMAT_STORAGE_KEY);
    if (
      savedFormat &&
      ['compact', 'standard', 'detailed', 'forensic'].includes(savedFormat)
    ) {
      setOutputFormat(savedFormat as OutputFormat);
    } else {
      setOutputFormat('standard');
    }
  }, []);

  const handleFormatChange = useCallback((format: OutputFormat) => {
    setOutputFormat(format);
    localStorage.setItem(FORMAT_STORAGE_KEY, format);
    window.dispatchEvent(
      new CustomEvent('agentation-format-change', { detail: format }),
    );
  }, []);

  return (
    <>
      <article className="article">
        <header>
          <h1>출력</h1>
          <p className="tagline">
            Agentation이 AI 에이전트를 위한 피드백을 구조화하는 방법
          </p>
        </header>

        <section>
          <p>
            복사하면 에이전트가 파싱하고 조치할 수 있는 구조화된 마크다운이
            생성됩니다. 네 가지 형식이 제공됩니다:
          </p>
          {outputFormat && (
            <>
              <div className="format-toggle" style={{ marginTop: '0.75rem' }}>
                <button
                  className={outputFormat === 'compact' ? 'active' : ''}
                  onClick={() => handleFormatChange('compact')}
                >
                  Compact
                </button>
                <button
                  className={outputFormat === 'standard' ? 'active' : ''}
                  onClick={() => handleFormatChange('standard')}
                >
                  Standard
                </button>
                <button
                  className={outputFormat === 'detailed' ? 'active' : ''}
                  onClick={() => handleFormatChange('detailed')}
                >
                  Detailed
                </button>
                <button
                  className={outputFormat === 'forensic' ? 'active' : ''}
                  onClick={() => handleFormatChange('forensic')}
                >
                  Forensic
                </button>
              </div>
              <AnimatedCodeBlock
                code={outputExamples[outputFormat]}
                language="markdown"
              />
            </>
          )}
        </section>

        <section>
          <h2>각 형식의 사용 시기</h2>
          <ul>
            <li>
              <strong>Compact</strong> &mdash; 최소한의 컨텍스트로 빠른 피드백.
              간단한 수정에 적합.
            </li>
            <li>
              <strong>Standard</strong> &mdash; 대부분의 사용 사례에 맞는 균형
              잡힌 상세도. 위치와 클래스 포함.
            </li>
            <li>
              <strong>Detailed</strong> &mdash; 바운딩 박스와 인근 텍스트를
              포함한 전체 컨텍스트. 복잡한 이슈에 적합.
            </li>
            <li>
              <strong>Forensic</strong> &mdash; 계산된 스타일을 포함한 최대
              상세도. 레이아웃/스타일 이슈 디버깅에 적합.
            </li>
          </ul>
        </section>

        <section>
          <h2>React 컴포넌트 감지</h2>
          <p>
            React 앱에서 출력에는 주석이 달린 각 요소의 컴포넌트 트리가
            포함됩니다 (예:{' '}
            <code>&lt;App&gt; &lt;Dashboard&gt; &lt;SubmitButton&gt;</code>).
            상세 수준은 출력 형식에 따라 조정됩니다: Compact는 React 데이터를
            생략하고, Standard는 필터링된 컴포넌트를 표시하며, Detailed는 스마트
            매칭을 사용하고, Forensic은 모든 것을 표시합니다. 설정에서 React
            감지를 켜고 끌 수 있습니다.
          </p>
        </section>

        <section>
          <h2>왜 구조화된 출력인가요?</h2>
          <p>
            선택자와 클래스 이름을 통해 에이전트가 어떤 요소인지 추측하는 대신
            코드베이스를 직접 <code>grep</code>할 수 있습니다. 자세한 내용은{' '}
            <a href="/">작동 방식</a>을 참고하세요.
          </p>
        </section>

        <section>
          <h2>출력 커스터마이징</h2>
          <p>
            복사된 출력은 일반 마크다운입니다. 에이전트에 붙여넣기 전에 자유롭게
            편집하세요:
          </p>
          <ul>
            <li>
              <strong>컨텍스트 추가</strong> &mdash; &ldquo;대시보드 페이지 작업
              중입니다...&rdquo;로 시작하기
            </li>
            <li>
              <strong>우선순위 지정</strong> &mdash; 중요도에 따라 주석 순서
              변경
            </li>
            <li>
              <strong>불필요한 항목 제거</strong> &mdash; 관련 없는 주석 삭제
            </li>
            <li>
              <strong>지시사항 추가</strong> &mdash; &ldquo;이 이슈들을 수정하고
              테스트를 실행하세요&rdquo; 추가
            </li>
          </ul>
        </section>
      </article>

      <Footer />
    </>
  );
}
