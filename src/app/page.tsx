'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { Footer } from './Footer';
import { HeroDemo } from './components/HeroDemo';

// 복사/체크 아이콘 애니메이션
const IconCopyAnimated = ({
  size = 24,
  copied = false,
}: {
  size?: number;
  copied?: boolean;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <style>{`
      .copy-icon, .check-icon {
        transition: opacity 0.2s ease, transform 0.2s ease;
      }
    `}</style>
    {/* 복사 아이콘 */}
    <g
      className="copy-icon"
      style={{
        opacity: copied ? 0 : 1,
        transform: copied ? 'scale(0.8)' : 'scale(1)',
        transformOrigin: 'center',
      }}
    >
      <path
        d="M4.75 11.25C4.75 10.4216 5.42157 9.75 6.25 9.75H12.75C13.5784 9.75 14.25 10.4216 14.25 11.25V17.75C14.25 18.5784 13.5784 19.25 12.75 19.25H6.25C5.42157 19.25 4.75 18.5784 4.75 17.75V11.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M17.25 14.25H17.75C18.5784 14.25 19.25 13.5784 19.25 12.75V6.25C19.25 5.42157 18.5784 4.75 17.75 4.75H11.25C10.4216 4.75 9.75 5.42157 9.75 6.25V6.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </g>
    {/* 체크마크 원형 */}
    <g
      className="check-icon"
      style={{
        opacity: copied ? 1 : 0,
        transform: copied ? 'scale(1)' : 'scale(0.8)',
        transformOrigin: 'center',
      }}
    >
      <path
        d="M12 20C7.58172 20 4 16.4182 4 12C4 7.58172 7.58172 4 12 4C16.4182 4 20 7.58172 20 12C20 16.4182 16.4182 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 10L11 14.25L9.25 12.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

// Shadow DOM 모달 컴포넌트
function ShadowModal({
  isOpen,
  isExiting,
  onClose,
}: {
  isOpen: boolean;
  isExiting: boolean;
  onClose: () => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!hostRef.current || shadowRootRef.current) return;
    shadowRootRef.current = hostRef.current.attachShadow({ mode: 'open' });
    setMounted(true);
  }, []);

  if (!isOpen) return <div ref={hostRef} style={{ display: 'none' }} />;

  const modalStyles = `
    @keyframes modalOverlayEnter {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes modalOverlayExit {
      from { opacity: 1; }
      to { opacity: 0; }
    }
    @keyframes modalEnter {
      from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
      to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    @keyframes modalExit {
      from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      to { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
    }
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(4px);
      z-index: 9999;
      animation: modalOverlayEnter 0.2s ease forwards;
    }
    .modal-overlay.exiting { animation: modalOverlayExit 0.15s ease forwards; }
    .modal-content {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      max-width: 400px;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06);
      z-index: 10000;
      padding: 1.5rem;
      animation: modalEnter 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .modal-content.exiting { animation: modalExit 0.15s ease forwards; }
    .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
    .modal-title { font-size: 1rem; font-weight: 600; color: #111; margin: 0; }
    .modal-close {
      width: 28px; height: 28px; border-radius: 50%; background: transparent; border: none;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      color: rgba(0, 0, 0, 0.4); transition: background 0.15s ease, color 0.15s ease;
    }
    .modal-close:hover { background: rgba(0, 0, 0, 0.05); color: rgba(0, 0, 0, 0.7); }
    .modal-body { color: rgba(0, 0, 0, 0.65); font-size: 0.875rem; line-height: 1.5; margin-bottom: 1.25rem; }
    .modal-body p + p { margin-top: 0.75rem; }
    .modal-footer { display: flex; justify-content: flex-end; gap: 0.5rem; }
    .modal-btn {
      padding: 0.5rem 1rem; font-size: 0.8125rem; font-weight: 600; border-radius: 8px;
      border: none; cursor: pointer; transition: background 0.15s ease, color 0.15s ease;
    }
    .modal-btn-secondary { background: transparent; color: rgba(0, 0, 0, 0.5); }
    .modal-btn-secondary:hover { background: rgba(0, 0, 0, 0.05); color: rgba(0, 0, 0, 0.8); }
    .modal-btn-primary { background: #3c82f7; color: white; }
    .modal-btn-primary:hover { background: #2d6fe0; }
  `;

  const modalContent = (
    <>
      <style>{modalStyles}</style>
      <div
        className={`modal-overlay${isExiting ? ' exiting' : ''}`}
        onClick={onClose}
      />
      <div className={`modal-content${isExiting ? ' exiting' : ''}`}>
        <div className="modal-header">
          <h3 className="modal-title">Shadow DOM 모달</h3>
          <button className="modal-close" onClick={onClose}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <p>
            이 모달은 shadow DOM 내부에서 렌더링되어 페이지로부터 스타일이
            격리됩니다.
          </p>
          <p>
            Agentation은 shadow DOM 경계 내부의 요소도 감지하고
            어노테이션(Annotation)할 수 있습니다.
          </p>
        </div>
        <div className="modal-footer">
          <button className="modal-btn modal-btn-secondary" onClick={onClose}>
            취소
          </button>
          <button className="modal-btn modal-btn-primary" onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div
      ref={hostRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        pointerEvents: 'none',
      }}
    >
      {mounted &&
        shadowRootRef.current &&
        createPortal(
          <div style={{ pointerEvents: 'auto' }}>{modalContent}</div>,
          shadowRootRef.current as unknown as Element,
        )}
    </div>
  );
}

function InstallSnippet() {
  const [copied, setCopied] = useState(false);
  const command = 'npm install agentation';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="install-snippet"
      title="클립보드에 복사"
    >
      <code>{command}</code>
      <IconCopyAnimated size={14} copied={copied} />
    </button>
  );
}

export default function AgentationDocs() {
  const [inputValue, setInputValue] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalExiting, setModalExiting] = useState(false);
  const [shadowModalOpen, setShadowModalOpen] = useState(false);
  const [shadowModalExiting, setShadowModalExiting] = useState(false);

  const openModal = () => {
    setModalOpen(true);
    setModalExiting(false);
  };

  const openShadowModal = () => {
    setShadowModalOpen(true);
    setShadowModalExiting(false);
  };

  const closeShadowModal = () => {
    setShadowModalExiting(true);
    setTimeout(() => {
      setShadowModalOpen(false);
      setShadowModalExiting(false);
    }, 150);
  };

  const closeModal = () => {
    setModalExiting(true);
    setTimeout(() => {
      setModalOpen(false);
      setModalExiting(false);
    }, 150);
  };

  return (
    <>
      <article className="article">
        <Link
          href="/blog/introducing-agentation-2"
          className="announcement-banner"
        >
          <span className="pulse-dot" />
          <span>
            <span style={{ fontWeight: 500 }}>2.0 신기능:</span> 실시간 에이전트
            동기화
          </span>
          <span style={{ color: '#4a9eff', marginLeft: '0.5rem' }}>&rarr;</span>
        </Link>
        <header style={{ position: 'relative' }}>
          <InstallSnippet />
          <h1
            style={{
              fontSize: '2rem',
              lineHeight: 1.15,
              marginBottom: '0.5rem',
            }}
          >
            <span className="sketchy-underline">버그를 가리키세요.</span>
            <br />
            AI가 <span className="pen-underline">고쳐줍니다.</span>
          </h1>
          <p className="tagline">
            Agentation은 UI 어노테이션(Annotation)을 AI 코딩 에이전트가 이해하고
            실행할 수 있는 구조화된 컨텍스트로 변환합니다. 아무 요소나 클릭하고,
            메모를 추가한 뒤, 결과물을 Claude Code, Cursor, 또는 원하는 AI
            도구에 붙여넣으세요.
          </p>
        </header>

        {/* 애니메이션 데모 */}
        <HeroDemo />

        <section>
          <h2>사용 방법</h2>
          <ol>
            <li>
              오른쪽 하단의{' '}
              <svg
                style={{
                  display: 'inline-block',
                  verticalAlign: '-0.45em',
                  width: '1.5em',
                  height: '1.5em',
                  margin: '0 -0.1em',
                }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11.5 12L5.5 12" />
                <path d="M18.5 6.75L5.5 6.75" />
                <path d="M9.25 17.25L5.5 17.25" />
                <path d="M16 12.75L16.5179 13.9677C16.8078 14.6494 17.3506 15.1922 18.0323 15.4821L19.25 16L18.0323 16.5179C17.3506 16.8078 16.8078 17.3506 16.5179 18.0323L16 19.25L15.4821 18.0323C15.1922 17.3506 14.6494 16.8078 13.9677 16.5179L12.75 16L13.9677 15.4821C14.6494 15.1922 15.1922 14.6494 15.4821 13.9677L16 12.75Z" />
              </svg>{' '}
              아이콘을 클릭해 활성화
            </li>
            <li>
              요소 위에 <strong>마우스를 올려</strong> 이름이 강조 표시되는 것을
              확인
            </li>
            <li>
              아무 요소나 <strong>클릭</strong>하여 어노테이션 추가
            </li>
            <li>
              피드백을 작성하고 <strong>추가</strong> 클릭
            </li>
            <li>
              <svg
                style={{
                  display: 'inline-block',
                  verticalAlign: '-0.45em',
                  width: '1.5em',
                  height: '1.5em',
                  margin: '0 -0.1em',
                }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M4.75 11.25C4.75 10.4216 5.42157 9.75 6.25 9.75H12.75C13.5784 9.75 14.25 10.4216 14.25 11.25V17.75C14.25 18.5784 13.5784 19.25 12.75 19.25H6.25C5.42157 19.25 4.75 18.5784 4.75 17.75V11.25Z" />
                <path d="M17.25 14.25H17.75C18.5784 14.25 19.25 13.5784 19.25 12.75V6.25C19.25 5.42157 18.5784 4.75 17.75 4.75H11.25C10.4216 4.75 9.75 5.42157 9.75 6.25V6.75" />
              </svg>
              을 클릭해 마크다운 형식으로 복사
            </li>
            <li>에이전트에 붙여넣기</li>
          </ol>
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'rgba(0,0,0,0.55)',
              marginTop: '1rem',
            }}
          >
            <strong
              style={{
                display: 'inline',
                margin: '-0.04em -0.06em',
                padding: '0.04em 0.06em',
                borderRadius: '0.2em 0.15em',
                backgroundImage:
                  'linear-gradient(75deg, rgba(250, 204, 21, 0.5), rgba(250, 204, 21, 0.15) 4%, rgba(250, 204, 21, 0.3) 96%, rgba(250, 204, 21, 0.6))',
              }}
            >
              참고:
            </strong>{' '}
            <Link href="/mcp">MCP</Link>를 사용하면 복사-붙여넣기 단계를 완전히
            생략할 수 있습니다 &mdash; 에이전트가 이미 여러분이 가리키는 것을
            봅니다. 그냥 &ldquo;내 피드백을 처리해줘&rdquo; 혹은
            &ldquo;어노테이션 3번을 수정해줘&rdquo;라고 말하면 됩니다.
          </p>
        </section>

        <section>
          <h2>에이전트가 활용하는 방법</h2>
          <p>
            Agentation은 코드베이스에 접근할 수 있는 AI 도구(Claude Code, Cursor
            등)와 함께 사용할 때 가장 효과적입니다. 출력물을 붙여넣으면
            에이전트는 다음 정보를 얻습니다:
          </p>
          <ul>
            <li>
              <strong>CSS 선택자</strong> &mdash; 코드베이스를 grep할 수 있는
              선택자
            </li>
            <li>
              <strong>React 컴포넌트 이름</strong> &mdash; 올바른 파일을 찾기
              위한 정보
            </li>
            <li>
              <strong>계산된 스타일(Computed Styles)</strong> &mdash; 현재
              외관을 이해하기 위한 정보
            </li>
            <li>
              <strong>여러분의 피드백</strong> &mdash; 의도와 우선순위 포함
            </li>
          </ul>
          <p>
            Agentation 없이는 요소를 직접 묘사(&ldquo;사이드바의 파란
            버튼&rdquo;)하고 에이전트가 맞게 추측하길 바라야 합니다.
            Agentation을 사용하면 <code>.sidebar &gt; button.primary</code>를
            그대로 전달해 에이전트가 직접 grep할 수 있습니다.
          </p>
        </section>

        {/* 인터랙티브 데모 섹션 - 모바일에서는 숨김 (도구는 데스크톱 전용) */}
        <section className="demo-section hide-on-mobile">
          <h2>직접 해보기</h2>
          <p>
            이 페이지에 툴바가 활성화되어 있습니다. 아래 데모 요소에
            어노테이션을 달아보세요:
          </p>

          <div className="demo-elements">
            <div className="button-group">
              <button
                className="demo-button"
                onClick={() => alert('기본 버튼 클릭!')}
              >
                기본
              </button>
              <button
                className="demo-button secondary"
                onClick={() => alert('보조 버튼 클릭!')}
              >
                보조
              </button>
              <button
                className="demo-button"
                onClick={openModal}
                style={{ background: '#3c82f7' }}
              >
                모달
              </button>
              <button
                className="demo-button"
                onClick={openShadowModal}
                style={{ background: '#7c3aed' }}
              >
                Shadow 모달
              </button>
            </div>

            <input
              type="text"
              className="demo-input"
              placeholder="이 텍스트를 선택해보세요..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            <div className="demo-card">
              <h3>예시 카드</h3>
              <p>
                이 카드를 클릭하거나 텍스트를 선택하여 어노테이션을
                만들어보세요. 출력에는 요소 경로와 여러분의 피드백이 포함됩니다.
              </p>
            </div>
          </div>
        </section>

        {/* 애니메이션 데모 - 모바일에서는 숨김 (도구는 데스크톱 전용) */}
        <section className="demo-section hide-on-mobile">
          <h2>애니메이션 일시정지 데모</h2>
          <p>
            툴바의{' '}
            <svg
              style={{
                display: 'inline-block',
                verticalAlign: '-0.45em',
                width: '1.5em',
                height: '1.5em',
                margin: '0 -0.1em',
              }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M8 6L8 18" />
              <path d="M16 18L16 6" />
            </svg>
            을 클릭해 이 애니메이션을 정지시켜보세요:
          </p>
          <div className="animation-demo">
            <div className="progress-bar-demo">
              <div className="progress-bar" />
            </div>
          </div>
        </section>

        <section>
          <h2>에이전트의 응답</h2>
          <p>
            <a href="/mcp">MCP 연동</a>과{' '}
            <a href="/schema">
              어노테이션 형식 스키마(Annotation Format Schema)
            </a>
            를 통해 에이전트는 단순히 어노테이션을 읽는 것을 넘어 응답할 수
            있습니다:
          </p>
          <ul>
            <li>
              <strong>&ldquo;내 어노테이션이 뭐가 있어?&rdquo;</strong> &mdash;
              페이지 전체의 피드백 목록 조회
            </li>
            <li>
              <strong>&ldquo;24px이 맞아, 16px이 맞아?&rdquo;</strong> &mdash;
              에이전트가 추가 정보 요청
            </li>
            <li>
              <strong>&ldquo;패딩 수정했어&rdquo;</strong> &mdash; 에이전트가
              요약과 함께 해결 처리
            </li>
            <li>
              <strong>&ldquo;모든 어노테이션 지워줘&rdquo;</strong> &mdash; 한
              번에 전체 해제
            </li>
          </ul>
          <p>
            여러분의 피드백은 허공으로 사라지는 일방통행이 아니라, 대화가
            됩니다.
          </p>
        </section>

        <section>
          <h2>베스트 프랙티스</h2>
          <ul>
            <li>
              <strong>구체적으로 작성하기</strong> &mdash; &ldquo;이거
              고쳐줘&rdquo; 보다 &ldquo;버튼 텍스트가 불명확함&rdquo;이 훨씬
              좋습니다
            </li>
            <li>
              <strong>어노테이션 하나에 이슈 하나</strong> &mdash; 에이전트가
              개별적으로 처리하기 쉽습니다
            </li>
            <li>
              <strong>맥락 포함하기</strong> &mdash; 기대했던 것과 실제 보이는
              것을 함께 설명하세요
            </li>
            <li>
              <strong>텍스트 선택 활용하기</strong> &mdash; 오탈자나 콘텐츠
              이슈는 해당 텍스트를 직접 선택하세요
            </li>
            <li>
              <strong>애니메이션 일시정지</strong> &mdash; 특정 애니메이션
              프레임에 어노테이션할 때 사용하세요
            </li>
          </ul>
        </section>

        <section>
          <h2>라이선스</h2>
          <p>
            Agentation은 개인 및 기업의 내부 사용에 한해 무료입니다. 본인
            프로젝트 어노테이션, 앱 디버깅, 팀 내 피드백 공유에 자유롭게
            사용하세요. Agentation을 판매 제품에 재배포하는 경우 상업용
            라이선스가 필요합니다. <a href="mailto:benji@dip.org">문의하기</a>
          </p>
        </section>

        <section className="quickstart-links">
          <p>
            <Link href="/mcp" className="styled-link">
              MCP로 실시간 동기화 설정하기 <span className="arrow">→</span>
            </Link>
          </p>
          <p>
            <Link href="/webhooks" className="styled-link">
              외부 서비스로 어노테이션 전송하기 <span className="arrow">→</span>
            </Link>
          </p>
          <p>
            <Link href="/api" className="styled-link">
              API로 나만의 연동 구축하기 <span className="arrow">→</span>
            </Link>
          </p>
        </section>
      </article>

      <Footer />

      {/* 테스트 모달 */}
      {modalOpen && (
        <>
          <style>{`
            @keyframes modalOverlayEnter {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes modalOverlayExit {
              from { opacity: 1; }
              to { opacity: 0; }
            }
            @keyframes modalEnter {
              from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.95);
              }
              to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
              }
            }
            @keyframes modalExit {
              from {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
              }
              to {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.95);
              }
            }
            .modal-overlay {
              position: fixed;
              inset: 0;
              background: rgba(255, 255, 255, 0.7);
              backdrop-filter: blur(4px);
              z-index: 9999;
              animation: modalOverlayEnter 0.2s ease forwards;
            }
            .modal-overlay.exiting {
              animation: modalOverlayExit 0.15s ease forwards;
            }
            .modal-content {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 90%;
              max-width: 400px;
              background: #fff;
              border-radius: 16px;
              box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06);
              z-index: 10000;
              padding: 1.5rem;
              animation: modalEnter 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
              font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            }
            .modal-content.exiting {
              animation: modalExit 0.15s ease forwards;
            }
            .modal-header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 1rem;
            }
            .modal-title {
              font-size: 1rem;
              font-weight: 600;
              color: #111;
              margin: 0;
            }
            .modal-close {
              width: 28px;
              height: 28px;
              border-radius: 50%;
              background: transparent;
              border: none;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              color: rgba(0, 0, 0, 0.4);
              transition: background 0.15s ease, color 0.15s ease;
            }
            .modal-close:hover {
              background: rgba(0, 0, 0, 0.05);
              color: rgba(0, 0, 0, 0.7);
            }
            .modal-body {
              color: rgba(0, 0, 0, 0.65);
              font-size: 0.875rem;
              line-height: 1.5;
              margin-bottom: 1.25rem;
            }
            .modal-footer {
              display: flex;
              justify-content: flex-end;
              gap: 0.5rem;
            }
            .modal-btn {
              padding: 0.5rem 1rem;
              font-size: 0.8125rem;
              font-weight: 600;
              border-radius: 8px;
              border: none;
              cursor: pointer;
              transition: background 0.15s ease, color 0.15s ease;
            }
            .modal-btn-secondary {
              background: transparent;
              color: rgba(0, 0, 0, 0.5);
            }
            .modal-btn-secondary:hover {
              background: rgba(0, 0, 0, 0.05);
              color: rgba(0, 0, 0, 0.8);
            }
            .modal-btn-primary {
              background: #3c82f7;
              color: white;
            }
            .modal-btn-primary:hover {
              background: #2d6fe0;
            }
          `}</style>
          <div
            className={`modal-overlay${modalExiting ? ' exiting' : ''}`}
            onClick={closeModal}
          />
          <div className={`modal-content${modalExiting ? ' exiting' : ''}`}>
            <div className="modal-header">
              <h3 className="modal-title">예시 모달</h3>
              <button className="modal-close" onClick={closeModal}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <p>
                이것은 예시 모달 다이얼로그입니다. 중요한 정보, 확인 메시지,
                또는 입력 폼을 표시하는 데 사용할 수 있습니다.
              </p>
              <p style={{ marginTop: '0.75rem' }}>
                모달 바깥을 클릭하거나 아래 버튼을 눌러 닫으세요.
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="modal-btn modal-btn-secondary"
                onClick={closeModal}
              >
                취소
              </button>
              <button
                className="modal-btn modal-btn-primary"
                onClick={closeModal}
              >
                확인
              </button>
            </div>
          </div>
        </>
      )}

      {/* Shadow DOM 모달 */}
      <ShadowModal
        isOpen={shadowModalOpen}
        isExiting={shadowModalExiting}
        onClose={closeShadowModal}
      />
    </>
  );
}
