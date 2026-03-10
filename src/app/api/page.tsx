'use client';

import { Footer } from '../Footer';
import { CodeBlock } from '../components/CodeBlock';

export default function APIPage() {
  return (
    <>
      <article className="article">
        <header>
          <h1>API</h1>
          <p className="tagline">개발자를 위한 프로그래매틱 접근</p>
        </header>

        <section>
          <h2 id="overview">개요</h2>
          <p>
            Agentation은 어노테이션을 자신의 워크플로우에 통합할 수 있는 콜백을
            제공합니다. 백엔드로 전송하거나, 터미널로 파이핑하거나, 자동화를
            트리거하거나, 커스텀 AI 연동을 구축할 수 있습니다.
          </p>
          <ul>
            <li>데이터베이스 또는 백엔드 서비스에 어노테이션 동기화</li>
            <li>피드백 패턴을 추적하는 분석 대시보드 구축</li>
            <li>커스텀 AI 연동 구축 (MCP 서버, 에이전트 도구)</li>
          </ul>
        </section>

        <section>
          <h2 id="props">Props</h2>
          <div className="props-list">
            <div className="prop-item">
              <div className="prop-header">
                <code className="prop-name">onAnnotationAdd</code>
                <span className="prop-type">
                  (annotation: Annotation) =&gt; void
                </span>
              </div>
              <p className="prop-desc">어노테이션이 생성될 때 호출됩니다</p>
            </div>
            <div className="prop-item">
              <div className="prop-header">
                <code className="prop-name">onAnnotationDelete</code>
                <span className="prop-type">
                  (annotation: Annotation) =&gt; void
                </span>
              </div>
              <p className="prop-desc">어노테이션이 삭제될 때 호출됩니다</p>
            </div>
            <div className="prop-item">
              <div className="prop-header">
                <code className="prop-name">onAnnotationUpdate</code>
                <span className="prop-type">
                  (annotation: Annotation) =&gt; void
                </span>
              </div>
              <p className="prop-desc">
                어노테이션 댓글이 편집될 때 호출됩니다
              </p>
            </div>
            <div className="prop-item">
              <div className="prop-header">
                <code className="prop-name">onAnnotationsClear</code>
                <span className="prop-type">
                  (annotations: Annotation[]) =&gt; void
                </span>
              </div>
              <p className="prop-desc">
                모든 어노테이션이 삭제될 때 호출됩니다
              </p>
            </div>
            <div className="prop-item">
              <div className="prop-header">
                <code className="prop-name">onCopy</code>
                <span className="prop-type">(markdown: string) =&gt; void</span>
              </div>
              <p className="prop-desc">
                복사 버튼 클릭 시 마크다운 출력과 함께 호출되는 콜백
              </p>
            </div>
            <div className="prop-item">
              <div className="prop-header">
                <code className="prop-name">onSubmit</code>
                <span className="prop-type">
                  (output: string, annotations: Annotation[]) =&gt; void
                </span>
              </div>
              <p className="prop-desc">
                &quot;어노테이션 전송&quot; 클릭 시 호출됩니다
              </p>
            </div>
            <div className="prop-item">
              <div className="prop-header">
                <code className="prop-name">copyToClipboard</code>
                <span className="prop-type">boolean</span>
                <span className="prop-default">기본값: true</span>
              </div>
              <p className="prop-desc">
                onCopy로 처리하는 경우 클립보드 복사를 방지하려면 false로 설정
              </p>
            </div>
            <div className="prop-item">
              <div className="prop-header">
                <code className="prop-name">endpoint</code>
                <span className="prop-type">string</span>
              </div>
              <p className="prop-desc">어노테이션 동기화를 위한 MCP 서버 URL</p>
            </div>
            <div className="prop-item">
              <div className="prop-header">
                <code className="prop-name">sessionId</code>
                <span className="prop-type">string</span>
              </div>
              <p className="prop-desc">사용할 기존 세션 ID</p>
            </div>
            <div className="prop-item">
              <div className="prop-header">
                <code className="prop-name">onSessionCreated</code>
                <span className="prop-type">
                  (sessionId: string) =&gt; void
                </span>
              </div>
              <p className="prop-desc">새 세션이 생성될 때 호출됩니다</p>
            </div>
            <div className="prop-item">
              <div className="prop-header">
                <code className="prop-name">webhookUrl</code>
                <span className="prop-type">string</span>
              </div>
              <p className="prop-desc">어노테이션 이벤트를 수신할 웹훅 URL</p>
            </div>
          </div>
        </section>

        <section>
          <h2 id="basic-usage">기본 사용법</h2>
          <p>코드에서 직접 어노테이션 데이터를 수신합니다:</p>
          <CodeBlock
            code={`import { Agentation, Annotation } from "agentation";

function App() {
  const handleAnnotation = (annotation: Annotation) => {
    console.log(annotation.element, annotation.comment);
  };

  return (
    <>
      <YourApp />
      <Agentation onAnnotationAdd={handleAnnotation} />
    </>
  );
}`}
          />
        </section>

        <section>
          <h2 id="annotation-type">Annotation 타입</h2>
          <p>
            콜백에 전달되는 <code>Annotation</code> 객체입니다. 전체 스키마는{' '}
            <a href="/schema">Agentation 포맷</a>을 참조하세요.
          </p>
          <CodeBlock
            code={`type Annotation = {
  // 필수
  id: string;              // 고유 식별자
  comment: string;         // 사용자의 어노테이션 텍스트
  elementPath: string;     // CSS 선택자 경로
  timestamp: number;       // Unix 타임스탬프 (ms)
  x: number;               // 뷰포트 너비의 % (0-100)
  y: number;               // 문서 상단에서 px
  element: string;         // 태그 이름 ("button", "div")

  // 권장
  url?: string;            // 페이지 URL
  boundingBox?: {          // 요소 크기
    x: number;
    y: number;
    width: number;
    height: number;
  };

  // 컨텍스트 (출력 형식에 따라 다름)
  reactComponents?: string;   // 컴포넌트 트리
  cssClasses?: string;
  computedStyles?: string;
  accessibility?: string;
  nearbyText?: string;
  selectedText?: string;      // 텍스트가 선택된 경우

  // 브라우저 컴포넌트 필드
  isFixed?: boolean;       // 고정 위치 요소
  isMultiSelect?: boolean; // 드래그 선택으로 생성됨
};`}
          />
        </section>

        <section>
          <h2 id="http-api">HTTP API</h2>
          <p>
            <code>agentation-mcp</code> 서버는 프로그래매틱 접근을 위한 REST
            API를 제공합니다:
          </p>

          <h3 style={{ marginTop: '1.25rem' }}>세션</h3>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.75rem',
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                    width: '5rem',
                    color: 'rgba(0,0,0,0.4)',
                  }}
                >
                  POST
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                  }}
                >
                  /sessions
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  새 세션 생성
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                    color: 'rgba(0,0,0,0.4)',
                  }}
                >
                  GET
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                  }}
                >
                  /sessions
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  모든 세션 목록
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '0.375rem 0',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                    color: 'rgba(0,0,0,0.4)',
                  }}
                >
                  GET
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                  }}
                >
                  /sessions/:id
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  어노테이션과 함께 세션 가져오기
                </td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ marginTop: '1.25rem' }}>어노테이션</h3>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.75rem',
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                    width: '5rem',
                    color: 'rgba(0,0,0,0.4)',
                  }}
                >
                  POST
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                  }}
                >
                  /sessions/:id/annotations
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  어노테이션 추가
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                    color: 'rgba(0,0,0,0.4)',
                  }}
                >
                  GET
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                  }}
                >
                  /annotations/:id
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  어노테이션 가져오기
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                    color: 'rgba(0,0,0,0.4)',
                  }}
                >
                  PATCH
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                  }}
                >
                  /annotations/:id
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  어노테이션 업데이트
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                    color: 'rgba(0,0,0,0.4)',
                  }}
                >
                  DELETE
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                  }}
                >
                  /annotations/:id
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  어노테이션 삭제
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                    color: 'rgba(0,0,0,0.4)',
                  }}
                >
                  POST
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                  }}
                >
                  /annotations/:id/thread
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  스레드 메시지 추가
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                    color: 'rgba(0,0,0,0.4)',
                  }}
                >
                  GET
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                  }}
                >
                  /sessions/:id/pending
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  대기 중인 어노테이션 가져오기
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '0.375rem 0',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                    color: 'rgba(0,0,0,0.4)',
                  }}
                >
                  GET
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                  }}
                >
                  /pending
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  모든 대기 중인 어노테이션 가져오기
                </td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ marginTop: '1.25rem' }}>이벤트 (SSE)</h3>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.75rem',
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                    width: '5rem',
                    color: 'rgba(0,0,0,0.4)',
                  }}
                >
                  GET
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                  }}
                >
                  /sessions/:id/events
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  세션 이벤트 스트림
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '0.375rem 0',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                    color: 'rgba(0,0,0,0.4)',
                  }}
                >
                  GET
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                  }}
                >
                  /events
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  전역 이벤트 스트림 (<code>?domain=...</code>으로 필터링 가능)
                </td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ marginTop: '1.25rem' }}>헬스 체크</h3>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.75rem',
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                    width: '5rem',
                    color: 'rgba(0,0,0,0.4)',
                  }}
                >
                  GET
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                  }}
                >
                  /health
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  헬스 체크
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '0.375rem 0',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                    color: 'rgba(0,0,0,0.4)',
                  }}
                >
                  GET
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                  }}
                >
                  /status
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  서버 상태
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2 id="real-time-events">실시간 이벤트</h2>
          <p>Server-Sent Events를 통해 실시간 이벤트를 구독합니다:</p>
          <CodeBlock
            language="bash"
            code={`# 세션 레벨: 단일 페이지의 이벤트
curl -N http://localhost:4747/sessions/:id/events

# 전역: 모든 세션의 이벤트
curl -N http://localhost:4747/events

# 도메인 필터: 특정 도메인 페이지의 이벤트
curl -N "http://localhost:4747/events?domain=localhost:3001"

# 연결 해제 후 재연결 (놓친 이벤트 재전송)
curl -N -H "Last-Event-ID: 42" http://localhost:4747/sessions/:id/events`}
          />
          <h3 style={{ marginTop: '1.25rem' }}>이벤트 유형</h3>
          <ul
            style={{
              fontSize: '0.8125rem',
              color: 'rgba(0,0,0,0.65)',
              marginTop: '0.5rem',
            }}
          >
            <li>
              <code>annotation.created</code> &mdash; 새 어노테이션 추가됨
            </li>
            <li>
              <code>annotation.updated</code> &mdash; 어노테이션 수정됨 (댓글,
              상태 등)
            </li>
            <li>
              <code>annotation.deleted</code> &mdash; 어노테이션 삭제됨
            </li>
            <li>
              <code>session.created</code> &mdash; 새 세션 시작됨
            </li>
            <li>
              <code>session.updated</code> &mdash; 세션 업데이트됨
            </li>
            <li>
              <code>session.closed</code> &mdash; 세션 종료됨
            </li>
            <li>
              <code>action.requested</code> &mdash; 에이전트 액션 요청됨
            </li>
            <li>
              <code>thread.message</code> &mdash; 어노테이션 스레드에 새 메시지
            </li>
          </ul>
        </section>

        <section>
          <h2 id="environment-variables">환경 변수</h2>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.75rem',
              marginTop: '1rem',
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.1)',
                    textAlign: 'left',
                    fontWeight: 500,
                  }}
                >
                  변수
                </th>
                <th
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.1)',
                    textAlign: 'left',
                    fontWeight: 500,
                  }}
                >
                  설명
                </th>
                <th
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.1)',
                    textAlign: 'left',
                    fontWeight: 500,
                  }}
                >
                  기본값
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                  }}
                >
                  AGENTATION_STORE
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.6)',
                  }}
                >
                  저장소 백엔드 (<code>memory</code> 또는 <code>sqlite</code>)
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                  }}
                >
                  sqlite
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '0.375rem 0',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                  }}
                >
                  AGENTATION_EVENT_RETENTION_DAYS
                </td>
                <td style={{ padding: '0.375rem 0', color: 'rgba(0,0,0,0.6)' }}>
                  이벤트 보관 일수
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                  }}
                >
                  7
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2 id="storage">저장소</h2>
          <p>
            기본적으로 데이터는 <code>~/.agentation/store.db</code>의 SQLite에
            저장됩니다. 인메모리 저장소를 사용하려면:
          </p>
          <CodeBlock
            language="bash"
            copyable
            code={`AGENTATION_STORE=memory npx agentation-mcp server`}
          />
        </section>

        <section>
          <h2 id="programmatic-usage">프로그래매틱 사용</h2>
          <CodeBlock
            language="typescript"
            code={`import { startHttpServer, startMcpServer } from 'agentation-mcp';

// 포트 4747에서 HTTP 서버 시작
startHttpServer(4747);

// MCP 서버 시작 (stdio를 통해 연결)
await startMcpServer('http://localhost:4747');`}
          />
          <p style={{ marginTop: '0.75rem', fontSize: '0.8125rem' }}>
            AI 에이전트 연동 및 사용 가능한 도구는 <a href="/mcp">MCP 서버</a>를
            참조하세요.
          </p>
        </section>
      </article>

      <style>{`
        .props-list {
          display: flex;
          flex-direction: column;
        }
        .prop-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 0.625rem 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }
        .prop-item:last-child {
          border-bottom: none;
        }
        .prop-header {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .prop-name {
          font-size: 0.8125rem;
          font-family: 'SF Mono', 'SFMono-Regular', ui-monospace, Consolas, monospace;
          color: rgba(0, 0, 0, 0.8);
        }
        .prop-type {
          font-size: 0.75rem;
          font-family: 'SF Mono', 'SFMono-Regular', ui-monospace, Consolas, monospace;
          color: rgba(0, 0, 0, 0.4);
        }
        .prop-default {
          font-size: 0.75rem;
          color: rgba(0, 0, 0, 0.4);
        }
        .prop-desc {
          font-size: 0.8125rem;
          font-weight: 450;
          line-height: 1.5;
          color: rgba(0, 0, 0, 0.55);
          margin: 0;
        }
      `}</style>

      <Footer />
    </>
  );
}
