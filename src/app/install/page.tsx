'use client';

import { useState, useId, useRef, useEffect } from 'react';
import { motion, useAnimate, type AnimationSequence } from 'framer-motion';
import { Footer } from '../Footer';
import { CodeBlock } from '../components/CodeBlock';

function CopyablePackageManager({
  name,
  command,
}: {
  name: string;
  command: string;
}) {
  const [copied, setCopied] = useState(false);
  const [scope, animate] = useAnimate();
  const maskId = useId();

  // Same animation values as CodeBlock's CopyButton
  const inSequence: AnimationSequence = [
    [
      '[data-part="square-front"]',
      { y: [0, -4] },
      { duration: 0.12, ease: 'easeOut' },
    ],
    [
      '[data-part="square-back"]',
      { x: [0, -4] },
      { at: '<', duration: 0.12, ease: 'easeOut' },
    ],
    [
      '[data-part="square-front"], [data-part="square-back"]',
      {
        rx: [2, 7.25],
        width: [10.5, 14.5],
        height: [10.5, 14.5],
        rotate: [0, -45],
      },
      { at: '<', duration: 0.12, ease: 'easeOut' },
    ],
    [
      '[data-part="check"]',
      { opacity: [0, 1], pathOffset: [1, 0] },
      { at: '-0.03', duration: 0 },
    ],
    ['[data-part="check"]', { pathLength: [0, 1] }, { duration: 0.1 }],
  ];

  const outSequence: AnimationSequence = [
    [
      '[data-part="check"]',
      { pathOffset: [0, 1] },
      { duration: 0.1, ease: 'easeOut' },
    ],
    [
      '[data-part="check"]',
      { opacity: [1, 0], pathLength: [1, 0] },
      { duration: 0 },
    ],
    [
      '[data-part="square-front"], [data-part="square-back"]',
      {
        rx: [7.25, 2],
        width: [14.5, 10.5],
        height: [14.5, 10.5],
        rotate: [-45, 0],
      },
      { at: '+0.03', duration: 0.12, ease: 'easeOut' },
    ],
    [
      '[data-part="square-front"]',
      { y: [-4, 0] },
      { at: '<', duration: 0.12, ease: 'easeOut' },
    ],
    [
      '[data-part="square-back"]',
      { x: [-4, 0] },
      { at: '<', duration: 0.12, ease: 'easeOut' },
    ],
  ];

  const isFirstRender = useRef(true);
  const hasAnimatedIn = useRef(false);
  const inAnimation = useRef<ReturnType<typeof animate> | null>(null);
  const outAnimation = useRef<ReturnType<typeof animate> | null>(null);

  const animateIn = async () => {
    if (
      !inAnimation.current &&
      !outAnimation.current &&
      !hasAnimatedIn.current
    ) {
      const animation = animate(inSequence);
      inAnimation.current = animation;
      await animation;
      inAnimation.current = null;
      if (animation.speed === 1) hasAnimatedIn.current = true;
    } else if (outAnimation.current) {
      outAnimation.current.speed = -1;
    } else if (inAnimation.current) {
      inAnimation.current.speed = 1;
    }
  };

  const animateOut = async () => {
    if (inAnimation.current) {
      inAnimation.current.speed = -1;
    } else if (hasAnimatedIn.current && !outAnimation.current) {
      const animation = animate(outSequence);
      outAnimation.current = animation;
      await animation;
      outAnimation.current = null;
      if (animation.speed === 1) hasAnimatedIn.current = false;
    } else if (outAnimation.current) {
      outAnimation.current.speed = 1;
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    copied ? animateIn() : animateOut();
  }, [copied]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      title={`Copy: ${command}`}
      style={{
        all: 'unset',
        cursor: 'pointer',
        color: '#007AFF',
        whiteSpace: 'nowrap',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.125rem',
      }}
    >
      {name}
      <svg
        ref={scope}
        style={{ overflow: 'visible', position: 'relative', top: '1.5px' }}
        width={20}
        height={20}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        aria-hidden="true"
      >
        <motion.rect
          data-part="square-front"
          x="4.75"
          y="8.75"
          width="10.5"
          height="10.5"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <g mask={`url(#${maskId})`}>
          <motion.rect
            data-part="square-back"
            x="8.75"
            y="4.75"
            width="10.5"
            height="10.5"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </g>
        <motion.path
          data-part="check"
          initial={{ pathLength: 0, opacity: 0 }}
          d="M9.25 12.25L11 14.25L15 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <mask id={maskId} maskUnits="userSpaceOnUse">
          <rect width="24" height="24" fill="#fff" />
          <motion.rect
            data-part="square-front"
            x="4.75"
            y="8.75"
            width="10.5"
            height="10.5"
            rx="2"
            fill="#000"
            stroke="#000"
            strokeWidth="1.5"
          />
        </mask>
      </svg>
    </button>
  );
}

export default function InstallPage() {
  return (
    <>
      <article className="article">
        <header>
          <h1>설치</h1>
          <p className="tagline">프로젝트에 Agentation을 시작하세요</p>
        </header>

        <section>
          <h2>설정 방법 선택</h2>
          <ul>
            <li>
              <strong>주석 기능만 필요한 경우</strong> &rarr; 아래 기본 설정
              (에이전트에 복사-붙여넣기)
            </li>
            <li>
              <strong>Claude Code를 사용 중인 경우</strong> &rarr;{' '}
              <code>/agentation</code> 스킬 추가 (컴포넌트 + MCP 서버 자동 설정)
            </li>
            <li>
              <strong>커스텀 에이전트를 만드는 경우</strong> &rarr; 실시간
              동기화를 위해 MCP 서버를 직접 실행
            </li>
          </ul>
          <p
            style={{
              fontSize: '0.875rem',
              color: 'rgba(0,0,0,0.5)',
              marginTop: '0.5rem',
            }}
          >
            대부분의 사용자: 기본 설정. Claude Code 사용자: 스킬을 사용하여 완전
            자동 설정.
          </p>
        </section>

        <section>
          <h2>패키지 설치</h2>
          <CodeBlock
            code="npm install agentation -D"
            language="bash"
            copyable
          />
          <p
            style={{
              fontSize: '0.875rem',
              color: 'rgba(0,0,0,0.5)',
              marginTop: '0.5rem',
            }}
          >
            또는{' '}
            <CopyablePackageManager
              name="yarn"
              command="yarn add agentation --dev"
            />
            ,{' '}
            <CopyablePackageManager
              name="pnpm"
              command="pnpm add agentation -D"
            />
            , 또는{' '}
            <CopyablePackageManager
              name="bun"
              command="bun add agentation -d"
            />
            을 사용하세요.
          </p>
        </section>

        <section>
          <h2>앱에 추가하기</h2>
          <p>
            React 앱의 어디서든 컴포넌트를 추가할 수 있으며, 가능하면 최상위
            레벨에 추가하세요.
            <code>NODE_ENV</code> 확인을 통해 개발 환경에서만 로드되도록 합니다.
          </p>
          <CodeBlock
            code={`import { Agentation } from "agentation";

function App() {
  return (
    <>
      <YourApp />
      {process.env.NODE_ENV === "development" && <Agentation />}
    </>
  );
}`}
            language="tsx"
          />
        </section>

        <section>
          <h2>Claude Code</h2>
          <p>
            Claude Code를 사용한다면 <code>/agentation</code> 스킬로
            Agentation을 자동으로 설정할 수 있습니다. 먼저 스킬을 설치하세요:
          </p>
          <CodeBlock
            code="npx skills add benjitaylor/agentation"
            language="bash"
            copyable
          />
          <p style={{ marginTop: '1rem' }}>
            그 다음 Claude Code에서 실행하세요:
          </p>
          <CodeBlock code="/agentation" language="bash" copyable />
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'rgba(0,0,0,0.45)',
              marginTop: '0.375rem',
            }}
          >
            프레임워크를 자동으로 감지하고, 패키지를 설치하며, 레이아웃에
            연결하고, MCP 서버 설정을 권장합니다.
          </p>
        </section>

        <section>
          <h2>
            에이전트 연동{' '}
            <span
              className="sketchy-underline"
              style={{ '--marker-color': '#febc2e' } as React.CSSProperties}
            >
              권장
            </span>
          </h2>
          <p>
            Agentation을{' '}
            <a
              href="https://modelcontextprotocol.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              MCP
            </a>
            를 지원하는 모든 AI 코딩 에이전트와 연결하세요. 이를 통해 실시간
            주석 동기화 및 양방향 통신이 가능합니다.
          </p>

          <h3>1. 에이전트에 MCP 서버 추가하기</h3>
          <p>
            지원되는 에이전트(Claude Code, Cursor, Codex, Windsurf 등)에
            Agentation을 설정하는 가장 쉬운 방법:
          </p>
          <CodeBlock
            code={`npx add-mcp "npx -y agentation-mcp server"`}
            language="bash"
            copyable
          />
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'rgba(0,0,0,0.45)',
              marginTop: '0.375rem',
            }}
          >
            {' '}
            <a
              href="https://github.com/neondatabase/add-mcp"
              target="_blank"
              rel="noopener noreferrer"
            >
              add-mcp
            </a>
            를 사용하여 설치된 에이전트를 자동 감지하고 올바른 설정을
            작성합니다. 9개 이상의 에이전트를 지원합니다.
          </p>

          <p style={{ marginTop: '1rem' }}>
            또는 Claude Code 전용 대화형 마법사를 사용하세요:
          </p>
          <CodeBlock code="npx agentation-mcp init" language="bash" copyable />

          <h3>2. 설정 확인하기</h3>
          <p>모든 것이 올바르게 설정되었는지 확인하세요:</p>
          <CodeBlock
            code="npx agentation-mcp doctor"
            language="bash"
            copyable
          />
          <p
            style={{
              fontSize: '0.875rem',
              color: 'rgba(0,0,0,0.5)',
              marginTop: '0.5rem',
            }}
          >
            서버는 기본적으로 포트 4747에서 실행됩니다. 변경하려면{' '}
            <code>--port 8080</code>을 사용하세요.
          </p>

          <h3>3. 컴포넌트 연결하기</h3>
          <p>React 컴포넌트가 서버를 가리키도록 설정하세요:</p>
          <CodeBlock
            code={`<Agentation
  endpoint="http://localhost:4747"
  onSessionCreated={(sessionId) => {
    console.log("Session started:", sessionId);
  }}
/>`}
            language="tsx"
          />
          <p
            style={{
              fontSize: '0.875rem',
              color: 'rgba(0,0,0,0.5)',
              marginTop: '0.5rem',
            }}
          >
            주석은 로컬에 저장되며 서버에 연결되면 동기화됩니다.
          </p>

          <ul
            style={{
              fontSize: '0.8125rem',
              color: 'rgba(0,0,0,0.6)',
              marginTop: '0.75rem',
              paddingLeft: '1.25rem',
            }}
          >
            <li style={{ marginBottom: '0.375rem' }}>
              <strong>로컬 우선(Local-first)</strong> &mdash; 오프라인에서도
              작동하며, 서버 연결 시 동기화됨
            </li>
            <li style={{ marginBottom: '0.375rem' }}>
              <strong>세션 연속성(Session continuity)</strong> &mdash; 페이지
              새로 고침 시 동일한 세션에 재연결
            </li>
            <li style={{ marginBottom: '0.375rem' }}>
              <strong>중복 없음(No duplicates)</strong> &mdash; 새로운 주석만
              업로드되며, 기존 주석은 건너뜀
            </li>
            <li>
              <strong>서버 권한(Server authority)</strong> &mdash; 에이전트
              변경사항(해결, 기각)이 재연결 시 우선 적용됨
            </li>
          </ul>

          <p
            style={{
              fontSize: '0.8125rem',
              color: 'rgba(0,0,0,0.5)',
              marginTop: '0.75rem',
            }}
          >
            따라서 자유롭게 주석을 달고 페이지를 새로 고침해도, 에이전트는
            중복된 내용 없이 연속된 세션으로 인식합니다.
          </p>

          <p style={{ marginTop: '1.5rem' }}>
            <strong>다른 에이전트:</strong> MCP를 지원하는 모든 도구를 연결할 수
            있습니다.
            <code>npx add-mcp &quot;npx -y agentation-mcp server&quot;</code>로
            자동 설정하거나, 에이전트의 MCP 설정에서 Agentation 서버를 직접
            지정하세요. 연결되면 에이전트에서{' '}
            <code>agentation_get_all_pending</code>,{' '}
            <code>agentation_list_sessions</code>,{' '}
            <code>agentation_resolve</code> 등의 도구를 사용할 수 있습니다.
          </p>
        </section>

        <section>
          <h2>요구 사항</h2>
          <ul>
            <li>
              <strong>React 18+</strong> &mdash; 최신 React 기능 사용
            </li>
            <li>
              <strong>클라이언트 전용(Client-side only)</strong> &mdash; DOM
              접근 필요
            </li>
            <li>
              <strong>데스크톱 전용(Desktop only)</strong> &mdash; 모바일
              기기에는 최적화되지 않음
            </li>
            <li>
              <strong>의존성 없음(Zero dependencies)</strong> &mdash; React 외
              런타임 의존성 없음
            </li>
          </ul>
        </section>

        <section>
          <h2>Props</h2>
          <p>
            모든 props는 선택 사항입니다. 설정 없이도 컴포넌트가 작동합니다.
          </p>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>
            콜백(Callbacks)
          </h3>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.875rem',
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    width: '35%',
                  }}
                >
                  <code>onAnnotationAdd</code>
                </td>
                <td
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  주석이 추가될 때 발생
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  <code>onAnnotationDelete</code>
                </td>
                <td
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  주석이 삭제될 때 발생
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  <code>onAnnotationUpdate</code>
                </td>
                <td
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  주석 댓글이 수정될 때 발생
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  <code>onAnnotationsClear</code>
                </td>
                <td
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  모든 주석이 지워질 때 발생
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  <code>onCopy</code>
                </td>
                <td
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  복사 버튼 클릭 시 발생 (마크다운을 전달받음)
                </td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem 0' }}>
                  <code>onSubmit</code>
                </td>
                <td
                  style={{
                    padding: '0.5rem 0',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  &quot;주석 전송&quot; 클릭 시 발생
                </td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>
            동작(Behavior)
          </h3>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.875rem',
            }}
          >
            <tbody>
              <tr>
                <td style={{ padding: '0.5rem 0', width: '35%' }}>
                  <code>copyToClipboard</code>
                </td>
                <td
                  style={{
                    padding: '0.5rem 0',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  추가 시 자동 복사 (기본값:{' '}
                  <code style={{ color: 'rgba(0,0,0,0.7)' }}>true</code>)
                </td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>
            에이전트 동기화(Agent Sync)
          </h3>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.875rem',
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    width: '35%',
                  }}
                >
                  <code>endpoint</code>
                </td>
                <td
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  서버 URL (예:{' '}
                  <code style={{ color: 'rgba(0,0,0,0.7)' }}>
                    &quot;http://localhost:4747&quot;
                  </code>
                  )
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  <code>sessionId</code>
                </td>
                <td
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  기존 세션에 참여 (선택 사항)
                </td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem 0' }}>
                  <code>onSessionCreated</code>
                </td>
                <td
                  style={{
                    padding: '0.5rem 0',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  새 세션 생성 시 발생 (
                  <code style={{ color: 'rgba(0,0,0,0.7)' }}>
                    sessionId: string
                  </code>{' '}
                  전달)
                </td>
              </tr>
            </tbody>
          </table>

          <p style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
            전체 props 참조 및 HTTP 엔드포인트는 <a href="/api">API</a>를
            참고하세요.
          </p>
        </section>

        <section>
          <h2>보안 참고사항</h2>
          <p>
            Agentation은 브라우저에서 실행되며 피드백 생성을 위해 DOM 콘텐츠를
            읽습니다. 기본적으로 어디에도 데이터를 전송하지{' '}
            <strong>않으며</strong> &mdash; 수동으로 복사하여 붙여넣기 전까지
            모든 것이 로컬에 유지됩니다.
          </p>
          <ul>
            <li>
              <strong>외부 요청 없음(No external requests)</strong> &mdash;
              기본적으로 모든 처리는 클라이언트 측에서 진행
            </li>
            <li>
              <strong>로컬 서버 전용(Local server only)</strong> &mdash;{' '}
              <code>endpoint</code> prop 사용 시 데이터는 로컬
              머신(localhost)으로만 전송
            </li>
            <li>
              <strong>데이터 수집 없음(No data collection)</strong> &mdash;
              원격으로 추적하거나 저장되는 것이 없음
            </li>
            <li>
              <strong>개발 전용(Dev-only)</strong> &mdash; 프로덕션에서
              제외하려면 <code>NODE_ENV</code> 확인을 사용하세요
            </li>
          </ul>
        </section>
      </article>

      <Footer />
    </>
  );
}
