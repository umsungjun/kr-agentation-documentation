'use client';

import { useState } from 'react';
import { Footer } from '../Footer';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    title: '기본',
    items: [
      {
        question: 'Agentation이란 무엇인가요?',
        answer:
          'Agentation은 웹 페이지에 주석을 달고 AI 코딩 에이전트를 위한 구조화된 피드백을 생성하는 플로팅 툴바입니다. 요소를 클릭하거나, 텍스트를 선택하고, 에이전트가 파싱하여 코드베이스의 문제를 찾고 수정할 수 있는 마크다운을 복사하세요.</p><p>이 프로젝트는 AI 에이전트에게 더 나은 피드백을 제공하는 방법을 탐구한 <a href="https://benji.org/annotating" target="_blank" rel="noopener noreferrer" class="faq-link">Benji Taylor의 글</a>에서 시작되어, 누구나 사용할 수 있는 패키지로 발전했습니다.',
      },
      {
        question: '왜 스크린샷으로 주석을 달지 않나요?',
        answer:
          "스크린샷은 코드와의 연결을 잃습니다. 스크린샷에 주석을 달면 AI는 '파란 버튼'이 어떤 컴포넌트인지 추측해야 합니다. Agentation은 에이전트에게 코드베이스에서 <code>grep</code>으로 찾을 수 있는 <code>.sidebar > button.primary</code>와 같은 실제 선택자를 제공합니다. '이것을 고쳐줘'와 '<code>src/components/Button.tsx:42</code>에서 이것을 고쳐줘'의 차이입니다.",
      },
      {
        question: '어떻게 설치하나요?',
        answer:
          'npm으로 <code>npm install agentation -D</code>를 실행하여 설치한 다음, <code>&lt;Agentation /&gt;</code> 컴포넌트를 앱에 추가하세요. React 18 및 Next.js와 함께 작동합니다.',
      },
      {
        question: 'Claude Code 연동이 있나요?',
        answer:
          '네. 터미널에서 <code>npx skills add benjitaylor/agentation</code>을 실행한 후, Claude Code에서 <code>/agentation</code>을 입력하세요. 프레임워크를 자동으로 감지하고, 패키지를 설치하며, 프로바이더 컴포넌트를 생성하고, 레이아웃에 연결합니다.',
      },
    ],
  },
  {
    title: '사용법',
    items: [
      {
        question: '요소 식별은 어떻게 작동하나요?',
        answer:
          'Agentation은 클래스 이름, ID, 텍스트 콘텐츠, 시맨틱 구조를 사용하여 요소를 자동으로 식별합니다. 버튼은 텍스트로, 제목은 내용으로, 이미지는 <code>alt</code> 텍스트로 이름이 지정됩니다. 이를 통해 에이전트가 코드베이스에서 요소를 <code>grep</code>으로 쉽게 찾을 수 있습니다.',
      },
      {
        question: 'React 컴포넌트를 감지하나요?',
        answer:
          '네. React 페이지에서 Agentation은 파이버 트리를 탐색하여 주석이 달린 각 요소의 컴포넌트 계층 구조를 찾습니다. 툴팁과 출력에서 <code>&lt;App&gt; &lt;Dashboard&gt; &lt;Button&gt;</code>과 같은 컴포넌트 이름을 볼 수 있습니다. 이를 통해 에이전트가 수정할 정확한 컴포넌트 파일을 찾는 데 도움이 됩니다. 설정에서 감지 모드(필터됨, 스마트, 전체, 끄기)를 구성할 수 있습니다.',
      },
      {
        question: '텍스트 선택에 주석을 달 수 있나요?',
        answer:
          '네. 페이지의 임의 텍스트를 선택하여 특정 내용에 주석을 달 수 있습니다. 선택한 텍스트는 출력에 인용되어 에이전트가 코드에서 정확한 문자열을 검색하기 쉬워집니다.',
      },
      {
        question: '툴바를 어떻게 접나요?',
        answer:
          '<svg style="display:inline-block;vertical-align:-0.45em;width:1.5em;height:1.5em;margin:0 -0.1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M16.25 16.25L7.75 7.75" /><path d="M7.75 16.25L16.25 7.75" /></svg>를 클릭하거나 <code>Escape</code>를 눌러 툴바를 접으세요. 필요할 때까지 최소화된 상태로 유지됩니다.',
      },
      {
        question: '애니메이션을 일시정지할 수 있나요?',
        answer:
          '<svg style="display:inline-block;vertical-align:-0.45em;width:1.5em;height:1.5em;margin:0 -0.1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M8 6L8 18" /><path d="M16 18L16 6" /></svg>를 클릭하면 CSS 애니메이션, JavaScript 기반 모션, 동영상을 포함한 페이지의 모든 애니메이션이 즉시 멈춥니다. 다시 클릭하면 멈춘 지점에서 정확히 재개됩니다.',
      },
      {
        question: '마커 색상을 커스텀할 수 있나요?',
        answer:
          '<svg style="display:inline-block;vertical-align:-0.45em;width:1.5em;height:1.5em;margin:0 -0.1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.6504 5.81117C10.9939 4.39628 13.0061 4.39628 13.3496 5.81117C13.5715 6.72517 14.6187 7.15891 15.4219 6.66952C16.6652 5.91193 18.0881 7.33479 17.3305 8.57815C16.8411 9.38134 17.2748 10.4285 18.1888 10.6504C19.6037 10.9939 19.6037 13.0061 18.1888 13.3496C17.2748 13.5715 16.8411 14.6187 17.3305 15.4219C18.0881 16.6652 16.6652 18.0881 15.4219 17.3305C14.6187 16.8411 13.5715 17.2748 13.3496 18.1888C13.0061 19.6037 10.9939 19.6037 10.6504 18.1888C10.4285 17.2748 9.38135 16.8411 8.57815 17.3305C7.33479 18.0881 5.91193 16.6652 6.66952 15.4219C7.15891 14.6187 6.72517 13.5715 5.81117 13.3496C4.39628 13.0061 4.39628 10.9939 5.81117 10.6504C6.72517 10.4285 7.15891 9.38134 6.66952 8.57815C5.91193 7.33479 7.33479 5.91192 8.57815 6.66952C9.38135 7.15891 10.4285 6.72517 10.6504 5.81117Z"/><circle cx="12" cy="12" r="2.5"/></svg>를 클릭하여 주석 마커의 프리셋 색상 중에서 선택하세요. 선택한 색상은 <code>localStorage</code>에 저장됩니다.',
      },
      {
        question: '주석은 어디에 저장되나요?',
        answer:
          '기본적으로 주석은 페이지 경로명을 키로 하여 <code>localStorage</code>에 저장됩니다. 페이지 새로 고침 후에도 유지되지만 7일 후에는 삭제됩니다. 에이전트 동기화(Agent Sync)를 활성화하면 주석이 MCP 서버에 저장되어 페이지와 세션 전체에서 지속됩니다.',
      },
      {
        question: '에이전트 동기화(Agent Sync)란 무엇인가요?',
        answer:
          '에이전트 동기화(Agent Sync)는 브라우저 툴바를 MCP 서버에 연결하여 리뷰어와 AI 에이전트 간의 실시간 동기화를 가능하게 합니다. 주석이 페이지 전반에 걸쳐 유지되며 MCP 도구를 통해 액세스할 수 있습니다. 에이전트를 설정하려면 <code>npx add-mcp "npx -y agentation-mcp server"</code>를 실행하거나, Claude Code 전용으로는 <code>npx agentation-mcp init</code>을 실행한 후, 설정에서 에이전트 동기화를 활성화하세요.',
      },
    ],
  },
  {
    title: '출력',
    items: [
      {
        question: '어떤 출력 형식이 있나요?',
        answer:
          '네 가지 형식: <code>Compact</code>(최소 컨텍스트), <code>Standard</code>(균형 잡힌), <code>Detailed</code>(바운딩 박스 포함 전체 컨텍스트), <code>Forensic</code>(계산된 스타일 포함 최대 상세). AI 에이전트에게 필요한 컨텍스트 양에 따라 선택하세요.',
      },
      {
        question: '어떤 AI 에이전트와 함께 사용할 수 있나요?',
        answer:
          '텍스트 입력을 받는 모든 AI 코딩 에이전트와 사용할 수 있습니다. 마크다운 출력은 에이전트에 종속되지 않으며 Claude, GPT-4, Cursor, Copilot 등과 함께 작동합니다. 복사한 출력을 에이전트의 채팅에 붙여넣으면 됩니다.',
      },
      {
        question: '여러 사람이 주석을 공유할 수 있나요?',
        answer:
          '에이전트 동기화(Agent Sync)를 활성화하면 주석이 공유 서버에 동기화되어 여러 사용자나 에이전트가 액세스할 수 있습니다. 에이전트 동기화 없이는 주석이 각 사용자의 브라우저에 로컬로 저장되지만, 마크다운 출력을 복사하여 공유할 수 있습니다.',
      },
    ],
  },
  {
    title: '기술적인 내용',
    items: [
      {
        question: 'React 의존성이 있나요?',
        answer:
          '네, Agentation은 피어 의존성으로 React 18+가 필요합니다. 현대적인 React 애플리케이션에 원활하게 통합되도록 React 컴포넌트로 구축되었습니다.',
      },
      {
        question: 'TypeScript와 함께 사용할 수 있나요?',
        answer:
          '네. Agentation은 TypeScript로 작성되었으며 전체 타입 정의를 내보냅니다. <code>demoAnnotations</code>와 같은 props 및 설정 옵션이 완전히 타입 지정됩니다.',
      },
      {
        question: 'SSR/SSG와 함께 작동하나요?',
        answer:
          '네. Agentation은 페이지 로드 후 하이드레이션되는 클라이언트 측 컴포넌트입니다. Next.js, Remix, Astro 및 기타 SSR/SSG 프레임워크와 문제없이 작동합니다.',
      },
      {
        question: '성능에 영향을 미치나요?',
        answer:
          '영향이 최소화됩니다. Agentation은 이벤트 리스너만 추가하고 작은 툴바만 렌더링합니다. 기존 DOM을 수정하거나 네트워크 요청을 가로채지 않습니다. 주석 마커는 경량 SVG 오버레이입니다.',
      },
      {
        question: '프로덕션에 포함시켜야 하나요?',
        answer:
          '가능하지만, 개발 도구로 설계되었습니다. 개발 환경에서만 또는 기능 플래그 뒤에 조건부로 렌더링하는 것을 권장합니다. 툴바는 활성화될 때까지 사용자에게 보이지 않습니다.',
      },
      {
        question: 'iframe이나 Shadow DOM에 주석을 달 수 있나요?',
        answer:
          '현재 Agentation은 메인 문서의 요소에만 주석을 달 수 있습니다. iframe과 Shadow DOM 콘텐츠는 브라우저 보안 제한으로 인해 접근할 수 없습니다.',
      },
      {
        question: 'MCP 서버에서 better-sqlite3 문제가 발생합니다',
        answer:
          'MCP 서버는 네이티브 의존성으로 <code>better-sqlite3</code>를 사용하는데, Node.js 버전과 플랫폼에 따라 빌드나 런타임 문제가 가끔 발생할 수 있습니다. 문제가 발생하면 <a href="https://github.com/WiseLibs/better-sqlite3/blob/master/docs/troubleshooting.md" target="_blank" rel="noopener noreferrer" class="faq-link">better-sqlite3 문제 해결 가이드</a>를 참고하세요.',
      },
      {
        question: '버그를 보고하거나 기능을 요청하려면 어떻게 하나요?',
        answer:
          '<a href="https://github.com/benjitaylor/agentation/issues" target="_blank" rel="noopener noreferrer" class="faq-link">GitHub</a>에 이슈를 등록하세요. 풀 리퀘스트도 환영합니다.',
      },
    ],
  },
];

function FAQToggle({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="faq-item">
      <button
        className="faq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{item.question}</span>
        <span className={`faq-icon ${isOpen ? 'open' : ''}`}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 4.5L6 8L9.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
        <div className="faq-answer-inner">
          <p dangerouslySetInnerHTML={{ __html: item.answer }} />
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  const handleToggle = (key: string) => {
    setOpenKey(openKey === key ? null : key);
  };

  return (
    <>
      <style>{`
        .faq-category {
          margin-top: 0.5rem;
        }
        .faq-category + .faq-category {
          margin-top: 1.5rem;
        }
        .faq-category h2 {
          margin-bottom: 0.25rem;
        }
        .faq-item {
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }
        .faq-item:last-child {
          border-bottom: none;
        }
        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.625rem 0;
          font-size: 0.75rem;
          font-weight: 450;
          color: rgba(0, 0, 0, 0.55);
          text-align: left;
          cursor: pointer;
          transition: color 0.15s ease;
        }
        .faq-question:hover {
          color: rgba(0, 0, 0, 0.8);
        }
        .faq-icon {
          flex-shrink: 0;
          color: rgba(0, 0, 0, 0.3);
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), color 0.15s ease;
        }
        .faq-icon.open {
          transform: rotate(180deg);
          color: rgba(0, 0, 0, 0.5);
        }
        .faq-answer {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .faq-answer.open {
          grid-template-rows: 1fr;
        }
        .faq-answer-inner {
          overflow: hidden;
        }
        .faq-answer-inner p {
          padding-bottom: 1rem;
          font-size: 0.8125rem;
          line-height: 1.6;
          color: rgba(0, 0, 0, 0.55);
        }
        .faq-answer-inner p + p {
          padding-top: 0;
          margin-top: -0.5rem;
        }
        .faq-answer-inner code {
          font-family: "SF Mono", "SFMono-Regular", ui-monospace, Consolas, monospace;
          font-size: 0.75rem;
          background: rgba(0, 0, 0, 0.04);
          padding: 0.1rem 0.3rem;
          border-radius: 0.25rem;
          color: rgba(0, 0, 0, 0.65);
        }
        .faq-link {
          color: #2480ed;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .faq-link:hover {
          color: #74b1fd;
        }
      `}</style>
      <article className="article">
        <header>
          <h1>자주 묻는 질문</h1>
          <p className="tagline">Agentation에 대한 일반적인 질문들</p>
        </header>

        {faqCategories.map((category, catIndex) => (
          <div key={catIndex} className="faq-category">
            <h2>{category.title}</h2>
            {category.items.map((faq, itemIndex) => {
              const key = `${catIndex}-${itemIndex}`;
              return (
                <FAQToggle
                  key={key}
                  item={faq}
                  isOpen={openKey === key}
                  onToggle={() => handleToggle(key)}
                />
              );
            })}
          </div>
        ))}
      </article>

      <Footer />
    </>
  );
}
