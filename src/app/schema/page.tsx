'use client';

import { Footer } from '../Footer';
import { CodeBlock } from '../components/CodeBlock';
import { SchemaDiagram } from '../components/SchemaDiagram';

export default function SchemaPage() {
  return (
    <>
      <article className="article">
        <header>
          <h1>
            어노테이션 포맷 스키마{' '}
            <span
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: '0.5em',
                fontWeight: 500,
                color: '#4a9eff',
                border: '1px solid #4a9eff',
                borderRadius: '9999px',
                padding: '0.15em 0.5em',
                verticalAlign: 'middle',
                position: 'relative',
                top: '-0.1em',
              }}
            >
              v1.0
            </span>
          </h1>
          <p className="tagline">구조화된 UI 피드백을 위한 이식 가능한 포맷</p>
        </header>

        <section>
          <h2 id="overview">개요</h2>
          <p>
            어노테이션 포맷 스키마(AFS, Annotation Format Schema)는 AI 코딩
            에이전트가 안정적으로 파싱하고 처리할 수 있는 방식으로 UI 피드백을
            캡처하기 위해 Agentation이 만들고 사용하는 오픈 포맷입니다.
            <strong>실행 중인 앱을 위한 스마트 Figma 댓글</strong>이라고
            생각하면 됩니다 &mdash; 스레드, 상태 추적, 해결 워크플로우,
            에이전트가 실제로 이해할 수 있는 구조화된 메타데이터가 포함된 특정
            요소에 첨부된 지속적인 어노테이션입니다.
          </p>
          <p>
            이 스펙은 어노테이션 객체의 형태를 정의합니다. 도구는 이 포맷으로
            어노테이션을 생성하고, 에이전트는 생성 방법에 관계없이 이를 소비할
            수 있습니다.
          </p>

          <SchemaDiagram />
        </section>

        <section>
          <h2 id="what-this-unlocks">이 포맷이 가능하게 하는 것</h2>
          <p>
            구조화된 스키마는 단순히 깔끔한 데이터를 위한 것이 아닙니다 &mdash;
            완전히 새로운 워크플로우를 가능하게 합니다:
          </p>
          <ul>
            <li>
              <strong>양방향 통신</strong> &mdash; 에이전트가 어노테이션에
              답글을 달아 &ldquo;24px로 할까요, 16px로 할까요?&rdquo;라고 묻고
              같은 스레드에서 답변을 받을 수 있습니다
            </li>
            <li>
              <strong>상태 추적</strong> &mdash; 대기 중, 확인됨, 해결됨, 거부됨
              상태를 한눈에 확인
            </li>
            <li>
              <strong>페이지 간 조회</strong> &mdash; &ldquo;내 어노테이션이
              무엇인가요?&rdquo;가 사이트 전체에서 작동
            </li>
            <li>
              <strong>일괄 작업</strong> &mdash; &ldquo;모든 어노테이션
              삭제&rdquo; 또는 &ldquo;차단 이슈만 보여주세요&rdquo;
            </li>
            <li>
              <strong>지속적인 기록</strong> &mdash; 페이지 새로고침 및 브라우저
              세션에서도 피드백이 유지됨
            </li>
          </ul>
          <p>
            스키마 없이는 피드백이 일회성입니다. 스키마가 있으면 대화가 됩니다.
          </p>
        </section>

        <section>
          <h2 id="design-goals">설계 목표</h2>
          <ul>
            <li>
              <strong>에이전트 가독성</strong> &mdash; LLM이 추측 없이 파싱할 수
              있는 구조화된 데이터
            </li>
            <li>
              <strong>프레임워크 독립성</strong> &mdash; 모든 UI에서 작동하며,
              React는 추가 컨텍스트를 제공
            </li>
            <li>
              <strong>도구 독립성</strong> &mdash; 어떤 도구든 생성할 수 있고,
              어떤 에이전트든 소비할 수 있음
            </li>
            <li>
              <strong>사람이 작성</strong> &mdash; 사람(또는 자동화된 리뷰어)의
              피드백을 위해 설계됨
            </li>
            <li>
              <strong>최소한의 핵심</strong> &mdash; 필수 필드는 적고, 더 풍부한
              컨텍스트를 위한 선택적 필드가 많음
            </li>
          </ul>
        </section>

        <section>
          <h2 id="annotation-object">어노테이션 객체</h2>
          <p>어노테이션은 UI 요소에 첨부된 단일 피드백을 나타냅니다.</p>
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'rgba(0,0,0,0.55)',
              marginTop: '0.5rem',
              marginBottom: '1rem',
            }}
          >
            <strong>참고:</strong> 서버는 어노테이션을 동기화할 때 메타데이터
            필드(<code>sessionId</code>, <code>createdAt</code>,{' '}
            <code>updatedAt</code>)를 추가할 수 있습니다.
          </p>

          <h3>필수 필드</h3>
          <CodeBlock
            language="typescript"
            code={`{
  id: string;           // 고유 식별자 (예: "ann_abc123")
  comment: string;      // 사람의 피드백 ("Button is misaligned")
  elementPath: string;  // CSS 선택자 경로 ("body > main > button.cta")
  timestamp: number;    // Unix 타임스탬프 (ms)
  x: number;            // 뷰포트 너비의 % (0-100)
  y: number;            // 문서 상단에서 px (isFixed이면 뷰포트 기준)
  element: string;      // 태그 이름 ("button", "div", "input")
}`}
          />

          <h3>권장 필드</h3>
          <CodeBlock
            language="typescript"
            code={`{
  url: string;          // 어노테이션이 생성된 페이지 URL
  boundingBox: {        // 어노테이션 시점의 요소 위치
    x: number;
    y: number;
    width: number;
    height: number;
  };
}`}
          />

          <h3>선택적 컨텍스트 필드</h3>
          <CodeBlock
            language="typescript"
            code={`{
  // React 전용 (사용 가능한 경우)
  reactComponents: string;  // 컴포넌트 트리 ("App > Dashboard > Button")

  // 요소 세부 정보
  cssClasses: string;       // 클래스 목록 ("btn btn-primary disabled")
  computedStyles: string;   // 주요 CSS 속성
  accessibility: string;    // ARIA 속성, role
  nearbyText: string;       // 요소 내/주변의 표시 텍스트
  selectedText: string;     // 사용자가 강조 표시한 텍스트

  // 피드백 분류
  intent: "fix" | "change" | "question" | "approve";
  severity: "blocking" | "important" | "suggestion";
}`}
          />

          <h3>라이프사이클 필드</h3>
          <CodeBlock
            language="typescript"
            code={`{
  status: "pending" | "acknowledged" | "resolved" | "dismissed";
  resolvedAt: string;       // ISO 타임스탬프
  resolvedBy: "human" | "agent";
  thread: ThreadMessage[];  // 양방향 대화
}`}
          />

          <h3>브라우저 컴포넌트 필드</h3>
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'rgba(0,0,0,0.55)',
              marginBottom: '0.5rem',
            }}
          >
            이 선택적 필드들은 UI 렌더링을 위해 Agentation 브라우저 컴포넌트에서
            설정됩니다:
          </p>
          <CodeBlock
            language="typescript"
            code={`{
  isFixed: boolean;         // 요소가 fixed/sticky 위치를 가짐
  isMultiSelect: boolean;   // 드래그 선택으로 생성됨
  fullPath: string;         // 전체 DOM 경로 (짧은 elementPath와 비교)
  nearbyElements: string;   // 주변 DOM 요소에 대한 정보
}`}
          />
        </section>

        <section>
          <h2 id="typescript-definition">전체 TypeScript 정의</h2>
          <CodeBlock
            language="typescript"
            copyable
            code={`type Annotation = {
  // 필수
  id: string;
  comment: string;
  elementPath: string;
  timestamp: number;
  x: number;            // 뷰포트 너비의 % (0-100)
  y: number;            // 문서 상단에서 px (isFixed이면 뷰포트 기준)
  element: string;      // 태그 이름 ("button", "div")

  // 권장
  url?: string;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };

  // 선택적 컨텍스트
  reactComponents?: string;
  cssClasses?: string;
  computedStyles?: string;
  accessibility?: string;
  nearbyText?: string;
  selectedText?: string;

  // 브라우저 컴포넌트 필드
  isFixed?: boolean;       // 요소가 fixed/sticky 위치를 가짐
  isMultiSelect?: boolean; // 드래그 선택으로 생성됨
  fullPath?: string;       // 전체 DOM 경로
  nearbyElements?: string; // 주변 요소에 대한 정보

  // 피드백 분류
  intent?: "fix" | "change" | "question" | "approve";
  severity?: "blocking" | "important" | "suggestion";

  // 라이프사이클
  status?: "pending" | "acknowledged" | "resolved" | "dismissed";
  resolvedAt?: string;
  resolvedBy?: "human" | "agent";
  thread?: ThreadMessage[];
};

type ThreadMessage = {
  id: string;
  role: "human" | "agent";
  content: string;
  timestamp: number;
};`}
          />
        </section>

        <section>
          <h2 id="event-envelope">이벤트 봉투(Event Envelope)</h2>
          <p>실시간 스트리밍을 위해 어노테이션은 이벤트 봉투로 래핑됩니다:</p>
          <CodeBlock
            language="typescript"
            copyable
            code={`type AgentationEvent = {
  type: "annotation.created" | "annotation.updated" | "annotation.deleted"
      | "session.created" | "session.updated" | "session.closed"
      | "thread.message" | "action.requested";
  timestamp: string;     // ISO 8601
  sessionId: string;
  sequence: number;      // 순서 지정/재전송을 위한 단조 증가 값
  payload: Annotation | Session | ThreadMessage | ActionRequest;
};`}
          />
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'rgba(0,0,0,0.55)',
              marginTop: '0.5rem',
            }}
          >
            <code>sequence</code> 번호를 통해 클라이언트가 놓친 이벤트를
            감지하고 재전송을 요청할 수 있습니다. SSE 스트리밍 세부 사항은{' '}
            <a href="/mcp">MCP</a>를 참조하세요.
          </p>
        </section>

        <section>
          <h2 id="json-schema">JSON 스키마</h2>
          <p>모든 언어에서의 유효성 검사를 위한 스키마:</p>
          <CodeBlock
            language="json"
            copyable
            code={`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://agentation.dev/schema/annotation.v1.json",
  "title": "Annotation",
  "type": "object",
  "required": ["id", "comment", "elementPath", "timestamp", "x", "y", "element"],
  "properties": {
    "id": { "type": "string" },
    "comment": { "type": "string" },
    "elementPath": { "type": "string" },
    "timestamp": { "type": "number" },
    "x": { "type": "number", "description": "% of viewport width (0-100)" },
    "y": { "type": "number", "description": "px from document top" },
    "element": { "type": "string" },
    "url": { "type": "string", "format": "uri" },
    "boundingBox": {
      "type": "object",
      "properties": {
        "x": { "type": "number" },
        "y": { "type": "number" },
        "width": { "type": "number" },
        "height": { "type": "number" }
      },
      "required": ["x", "y", "width", "height"]
    },
    "reactComponents": { "type": "string" },
    "isFixed": { "type": "boolean" },
    "isMultiSelect": { "type": "boolean" },
    "fullPath": { "type": "string" },
    "nearbyElements": { "type": "string" },
    "intent": { "enum": ["fix", "change", "question", "approve"] },
    "severity": { "enum": ["blocking", "important", "suggestion"] },
    "status": { "enum": ["pending", "acknowledged", "resolved", "dismissed"] }
  }
}`}
          />
        </section>

        <section>
          <h2 id="example">어노테이션 예시</h2>
          <CodeBlock
            language="json"
            code={`{
  "id": "ann_k8x2m",
  "comment": "Button is cut off on mobile viewport",
  "elementPath": "body > main > .hero-section > button.cta",
  "timestamp": 1705694400000,
  "x": 45.5,
  "y": 480,
  "element": "button",
  "url": "http://localhost:3000/landing",
  "boundingBox": { "x": 120, "y": 480, "width": 200, "height": 48 },
  "reactComponents": "App > LandingPage > HeroSection > CTAButton",
  "cssClasses": "cta btn-primary",
  "nearbyText": "Get Started Free",
  "intent": "fix",
  "severity": "blocking",
  "status": "pending"
}`}
          />
        </section>

        <section>
          <h2 id="markdown-output">마크다운 출력 포맷</h2>
          <p>
            채팅 기반 에이전트에 붙여넣기 위해 어노테이션을 마크다운으로
            직렬화할 수 있습니다:
          </p>
          <CodeBlock
            language="markdown"
            code={`## Annotation #1
**Element:** button.cta
**Path:** body > main > .hero-section > button.cta
**React:** App > LandingPage > HeroSection > CTAButton
**Position:** 120px, 480px (200×48px)
**Feedback:** Button is cut off on mobile viewport
**Severity:** blocking`}
          />
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'rgba(0,0,0,0.55)',
              marginTop: '0.5rem',
            }}
          >
            상세 레벨 옵션(Compact → Forensic)은 <a href="/output">출력 포맷</a>
            을 참조하세요.
          </p>
        </section>

        <section>
          <h2 id="implementations">구현체</h2>
          <p>이 포맷을 생성하거나 소비하는 도구:</p>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.75rem',
              marginTop: '0.75rem',
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontWeight: 500,
                  }}
                >
                  Agentation (React)
                </td>
                <td
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.55)',
                    textAlign: 'right',
                  }}
                >
                  React 앱을 위한 클릭으로 어노테이션하는 툴바
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontWeight: 500,
                  }}
                >
                  Agentation MCP Server
                </td>
                <td
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.55)',
                    textAlign: 'right',
                  }}
                >
                  Claude Code 및 다른 MCP 클라이언트에 어노테이션 노출
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2 id="building">구현체 만들기</h2>
          <p>자신의 도구에서 Agentation 포맷 어노테이션을 생성하려면:</p>
          <ol style={{ paddingLeft: '1.25rem' }}>
            <li>
              필수 필드 캡처: <code>id</code>, <code>comment</code>,{' '}
              <code>elementPath</code>, <code>timestamp</code>, <code>x</code>,{' '}
              <code>y</code>, <code>element</code>
            </li>
            <li>
              에이전트 정확도 향상을 위한 권장 필드 추가: <code>url</code>,{' '}
              <code>boundingBox</code>
            </li>
            <li>
              React 앱의 경우 파이버 트리를 순회하여{' '}
              <code>reactComponents</code> 가져오기
            </li>
            <li>
              MCP/API 소비를 위해 JSON으로, 채팅 붙여넣기를 위해 마크다운으로
              출력
            </li>
          </ol>
          <p style={{ marginTop: '0.75rem' }}>
            요소 감지 및 React 컴포넌트 순회의 참조 구현은{' '}
            <a href="https://github.com/benjitaylor/agentation">
              Agentation 소스
            </a>
            를 참조하세요.
          </p>
        </section>

        <section>
          <h2 id="why">왜 이 포맷인가요?</h2>
          <p>
            기존 에이전트 프로토콜(MCP, A2A, ACP)은 도구와 메시징을
            표준화하지만, UI 피드백 문법은 정의하지 않습니다. 어떤 구조화된
            컨텍스트를 제공하느냐에 달려 있습니다.
          </p>
          <p>
            이 포맷은 그 간격을 채웁니다: &quot;사람이 UI를 가리키면, 에이전트가
            코드를 찾아 수정해야 한다&quot;는 시나리오를 위해 특별히 만든 이식
            가능한 와이어 포맷입니다. 비슷한 도구를 만드는 다른 분들에게도
            유용하기를 바랍니다.
          </p>
        </section>

        <section>
          <h2 id="versioning">버전 관리</h2>
          <p>
            현재 버전:{' '}
            <span
              style={{ color: '#4a9eff', fontFamily: "'SF Mono', monospace" }}
            >
              v1
            </span>
          </p>
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'rgba(0,0,0,0.55)',
              marginTop: '0.75rem',
            }}
          >
            스키마 URL:{' '}
            <code>https://agentation.dev/schema/annotation.v1.json</code>
          </p>
        </section>
      </article>

      <Footer />
    </>
  );
}
