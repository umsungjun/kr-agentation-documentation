'use client';

import { Footer } from '../Footer';
import { CodeBlock } from '../components/CodeBlock';
import { MCPDiagram } from '../components/MCPDiagram';

function ToolName({ children }: { children: string }) {
  return (
    <h3
      style={{
        fontFamily: "'SF Mono', monospace",
        fontSize: '0.75rem',
        letterSpacing: '-0.01em',
      }}
    >
      {children}
    </h3>
  );
}

export default function McpPage() {
  return (
    <>
      <article className="article">
        <header>
          <h1>MCP 서버</h1>
          <p className="tagline">
            모델 컨텍스트 프로토콜(Model Context Protocol)을 통해 AI 에이전트를
            웹 페이지 어노테이션에 연결
          </p>
        </header>

        <section>
          <h2 id="overview">개요</h2>
          <p>
            <code>agentation-mcp</code> 패키지는 AI 코딩 에이전트(예: Claude
            Code)가 Agentation 툴바로 생성된 웹 페이지 어노테이션을 받고 응답할
            수 있게 해주는 MCP 서버를 제공합니다. 복사-붙여넣기를 완전히 생략할
            수 있습니다 &mdash; 어노테이션만 하면 에이전트가 이미 전체
            컨텍스트를 갖고 있습니다.
          </p>
          <p>
            동일한 데이터 저장소를 공유하며 <strong>HTTP 서버</strong>(브라우저
            툴바용)와 <strong>MCP 서버</strong>(에이전트가 stdio로 접근)를 모두
            실행합니다.
          </p>
          <p
            style={{
              marginTop: '0.75rem',
              fontSize: '0.8125rem',
              color: 'rgba(0,0,0,0.55)',
            }}
          >
            <code>toolbar</code> → <code>server</code> → <code>agent</code>
          </p>

          <MCPDiagram />
        </section>

        <section>
          <h2 id="installation">설치</h2>
          <CodeBlock
            language="bash"
            copyable
            code={`npm install agentation-mcp
# 또는
pnpm add agentation-mcp`}
          />
        </section>

        <section>
          <h2 id="quick-start">빠른 시작</h2>

          <h3>1. 에이전트에 추가</h3>
          <p>지원되는 에이전트에 Agentation을 설정하는 가장 빠른 방법:</p>
          <CodeBlock
            language="bash"
            copyable
            code={`npx add-mcp "npx -y agentation-mcp server"`}
          />
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'rgba(0,0,0,0.55)',
              marginTop: '0.5rem',
            }}
          >
            <a
              href="https://github.com/neondatabase/add-mcp"
              target="_blank"
              rel="noopener noreferrer"
            >
              add-mcp
            </a>
            를 사용하여 설치된 에이전트(Claude Code, Cursor, Codex, Windsurf
            등)를 자동으로 감지하고 올바른 설정을 작성합니다.
          </p>

          <p style={{ marginTop: '0.75rem' }}>
            또는 Claude Code 전용 인터랙티브 마법사를 사용하세요:
          </p>
          <CodeBlock
            language="bash"
            copyable
            code={`npx agentation-mcp init`}
          />

          <h3>2. 설정 확인</h3>
          <CodeBlock
            language="bash"
            copyable
            code={`npx agentation-mcp doctor`}
          />
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'rgba(0,0,0,0.55)',
              marginTop: '0.5rem',
            }}
          >
            Node.js 버전, 에이전트 설정, 서버 연결 상태를 확인합니다.
          </p>
        </section>

        <section>
          <h2 id="cli-commands">CLI 명령어</h2>
          <CodeBlock
            language="bash"
            code={`npx agentation-mcp init      # 설정 마법사
npx agentation-mcp server    # 서버 시작
npx agentation-mcp doctor    # 설정 확인
npx agentation-mcp help      # 도움말 표시`}
          />
        </section>

        <section>
          <h2 id="server-options">서버 옵션</h2>
          <CodeBlock
            language="bash"
            code={`--port <port>      # HTTP 서버 포트 (기본값: 4747)
--mcp-only         # HTTP 서버 건너뛰고 stdio로만 MCP 실행
--http-url <url>   # MCP가 가져올 HTTP 서버 URL`}
          />
        </section>

        <section>
          <h2 id="claude-code">Claude Code</h2>
          <p>Claude Code를 Agentation MCP 서버에 연결하려면:</p>

          <h3>1. MCP 서버 추가</h3>
          <CodeBlock
            language="bash"
            copyable
            code={`npx add-mcp "npx -y agentation-mcp server"`}
          />
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'rgba(0,0,0,0.55)',
              marginTop: '0.5rem',
            }}
          >
            또는{' '}
            <code>claude mcp add agentation -- npx agentation-mcp server</code>
            를 사용하거나 인터랙티브 마법사 <code>npx agentation-mcp init</code>
            을 실행하세요.
          </p>

          <h3>2. Claude Code 재시작</h3>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(0,0,0,0.55)' }}>
            MCP 서버는 Claude Code가 시작될 때 자동으로 실행됩니다. 연결되면
            Claude가 Agentation 도구 전체를 사용하여 어노테이션을 읽고 응답할 수
            있습니다.
          </p>

          <h3>3. 연결 확인</h3>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(0,0,0,0.55)' }}>
            Claude Code에서 Claude에게 어노테이션 세션을 나열해 달라고 요청하여
            서버가 연결되었는지 확인할 수 있습니다. 서버가 실행 중이면 Claude가{' '}
            <code>agentation_list_sessions</code> 도구를 사용할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 id="mcp-tools">MCP 도구</h2>
          <p>
            <a
              href="https://modelcontextprotocol.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              모델 컨텍스트 프로토콜
            </a>
            을 통해 AI 에이전트에 9개의 도구가 제공됩니다:
          </p>

          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.75rem',
              marginTop: '1rem',
              marginBottom: '1.5rem',
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
                  도구
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
                  agentation_list_sessions
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.6)',
                  }}
                >
                  활성 어노테이션 세션 전체 목록
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                  }}
                >
                  agentation_get_session
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.6)',
                  }}
                >
                  모든 어노테이션과 함께 세션 가져오기
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                  }}
                >
                  agentation_get_pending
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.6)',
                  }}
                >
                  세션의 대기 중인 어노테이션 가져오기
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                  }}
                >
                  agentation_get_all_pending
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.6)',
                  }}
                >
                  모든 세션의 대기 중인 어노테이션 가져오기
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                  }}
                >
                  agentation_acknowledge
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.6)',
                  }}
                >
                  어노테이션을 확인됨으로 표시
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                  }}
                >
                  agentation_resolve
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.6)',
                  }}
                >
                  어노테이션을 해결됨으로 표시
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                  }}
                >
                  agentation_dismiss
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.6)',
                  }}
                >
                  이유와 함께 어노테이션 거부
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    fontFamily: 'monospace',
                    fontSize: '0.6875rem',
                  }}
                >
                  agentation_reply
                </td>
                <td
                  style={{
                    padding: '0.375rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.6)',
                  }}
                >
                  어노테이션 스레드에 답글 추가
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
                  agentation_watch_annotations
                </td>
                <td style={{ padding: '0.375rem 0', color: 'rgba(0,0,0,0.6)' }}>
                  새 어노테이션이 나타날 때까지 대기한 후 배치로 반환
                </td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ marginTop: '1.5rem' }}>도구 상세 설명</h3>

          <ToolName>agentation_list_sessions</ToolName>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(0,0,0,0.55)' }}>
            활성 어노테이션 세션 전체를 나열합니다. 어느 페이지에 피드백이
            있는지 확인할 때 사용합니다.
          </p>

          <ToolName>agentation_get_session</ToolName>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(0,0,0,0.55)' }}>
            모든 어노테이션과 함께 세션을 가져옵니다. 입력:{' '}
            <code>sessionId</code>
          </p>

          <ToolName>agentation_get_pending</ToolName>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(0,0,0,0.55)' }}>
            세션의 대기 중인(미확인) 어노테이션 전체를 가져옵니다. 어떤 피드백에
            주의가 필요한지 확인할 때 사용합니다. 입력: <code>sessionId</code>
          </p>
          <CodeBlock
            language="json"
            code={`// 응답
{
  "count": 1,
  "annotations": [{
    "id": "ann_123",
    "comment": "Button is cut off on mobile",
    "element": "button",
    "elementPath": "body > main > .hero > button.cta",
    "reactComponents": "App > LandingPage > HeroSection > Button",
    "intent": "fix",
    "severity": "blocking"
  }]
}`}
          />

          <ToolName>agentation_get_all_pending</ToolName>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(0,0,0,0.55)' }}>
            모든 세션의 대기 중인 어노테이션 전체를 가져옵니다. 모든 페이지에
            걸쳐 해결되지 않은 피드백을 확인할 때 사용합니다.
          </p>

          <ToolName>agentation_acknowledge</ToolName>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(0,0,0,0.55)' }}>
            어노테이션을 확인됨으로 표시합니다. 피드백을 확인했고 처리할
            예정임을 알릴 때 사용합니다. 입력: <code>annotationId</code>
          </p>

          <ToolName>agentation_resolve</ToolName>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(0,0,0,0.55)' }}>
            어노테이션을 해결됨으로 표시합니다. 피드백을 처리한 후 사용합니다.
            선택적으로 수행한 작업 요약을 포함할 수 있습니다. 입력:{' '}
            <code>annotationId</code>, 선택적 <code>summary</code>
          </p>

          <ToolName>agentation_dismiss</ToolName>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(0,0,0,0.55)' }}>
            어노테이션을 거부합니다. 피드백을 처리하지 않기로 결정했을 때 이유와
            함께 사용합니다. 입력: <code>annotationId</code>,{' '}
            <code>reason</code>
          </p>

          <ToolName>agentation_reply</ToolName>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(0,0,0,0.55)' }}>
            어노테이션 스레드에 답글을 추가합니다. 명확한 질문을 하거나
            업데이트를 제공할 때 사용합니다. 입력: <code>annotationId</code>,{' '}
            <code>message</code>
          </p>

          <ToolName>agentation_watch_annotations</ToolName>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(0,0,0,0.55)' }}>
            새 어노테이션이 나타날 때까지 대기한 후 배치를 수집하여 반환합니다.
            어노테이션이 생성될 때 자동으로 트리거됩니다 &mdash; 사용자가
            브라우저에서 어노테이션을 추가하면 에이전트가 자동으로 감지합니다.
            첫 번째 새 어노테이션 감지 후, 더 많은 어노테이션을 모으기 위해 배치
            윈도우 동안 기다렸다가 반환합니다. 핸즈프리 피드백 처리를 위해
            루프에서 사용하세요. 입력: 선택적 <code>sessionId</code>, 선택적{' '}
            <code>batchWindowSeconds</code> (기본값: 10, 최대: 60), 선택적{' '}
            <code>timeoutSeconds</code> (기본값: 120, 최대: 300)
          </p>
        </section>

        <section>
          <h2 id="hands-free-mode">핸즈프리 모드</h2>
          <p>
            자동 피드백 처리를 위해 루프에서{' '}
            <code>agentation_watch_annotations</code>를 사용합니다 &mdash;
            에이전트가 새 어노테이션을 자동으로 감지합니다:
          </p>
          <ol
            style={{
              fontSize: '0.8125rem',
              color: 'rgba(0,0,0,0.65)',
              marginTop: '0.5rem',
            }}
          >
            <li>
              에이전트가 <code>agentation_watch_annotations</code>를 호출
              (어노테이션이 나타날 때까지 대기)
            </li>
            <li>
              어노테이션 도착 &mdash; 수집 윈도우 후 에이전트가 배치를 수신
            </li>
            <li>
              에이전트가 각 어노테이션을 처리:
              <ul>
                <li>
                  <code>agentation_acknowledge</code> &mdash; 확인됨으로 표시
                </li>
                <li>코드 변경 수행</li>
                <li>
                  <code>agentation_resolve</code> &mdash; 완료됨으로 표시
                  (브라우저에서 어노테이션 사라짐)
                </li>
              </ul>
            </li>
            <li>
              에이전트가 다시 <code>agentation_watch_annotations</code>를 호출
              (루프)
            </li>
          </ol>
          <CodeBlock
            language="markdown"
            copyable
            code={`# CLAUDE.md 예시 지침
"watch mode"라고 하면, agentation_watch_annotations를 루프에서 호출하세요.
각 어노테이션에 대해: 확인, 수정, 요약과 함께 해결.
중지하거나 타임아웃이 될 때까지 계속 감시합니다.`}
          />
        </section>

        <section>
          <h2 id="critique-mode">비평 모드(Critique Mode)</h2>
          <p>
            핸즈프리 모드는 <em>사용자가</em> 어노테이션을 추가하기를
            기다립니다. 비평 모드는 반대입니다 &mdash; 에이전트가 헤드풀
            브라우저를 열고, 페이지를 위에서 아래로 스크롤하며, 사용자를 대신해
            툴바로 디자인 어노테이션을 추가합니다. 커서가 실시간으로 페이지를
            이동하는 것을 볼 수 있습니다.
          </p>
          <CodeBlock
            language="markdown"
            copyable
            code={`Critique the UI at http://localhost:3000`}
          />
          <ol
            style={{
              fontSize: '0.8125rem',
              color: 'rgba(0,0,0,0.65)',
              marginTop: '0.5rem',
            }}
          >
            <li>에이전트가 페이지에 헤드풀 브라우저를 엽니다</li>
            <li>위에서 아래로 스크롤하며 비평할 요소를 선택합니다</li>
            <li>각 요소로 커서를 이동하여 어노테이션 대화상자를 엽니다</li>
            <li>구체적이고 실행 가능한 피드백을 입력하고 제출합니다</li>
            <li>
              계층구조, 간격, 타이포그래피, 내비게이션, CTA에 걸쳐 5&ndash;8개의
              어노테이션을 반복합니다
            </li>
          </ol>
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'rgba(0,0,0,0.55)',
              marginTop: '0.5rem',
            }}
          >
            툴바에서 검토하고 수정할 항목을 결정합니다.
          </p>

          <h3>필요 조건</h3>
          <CodeBlock
            language="bash"
            copyable
            code={`npx skills add vercel-labs/agent-browser`}
          />
        </section>

        <section>
          <h2 id="self-driving-mode">자율 주행 모드(Self-Driving Mode)</h2>
          <p>
            비평 모드는 검토를 위해 어노테이션을 남깁니다. 자율 주행 모드는 한
            단계 더 나아갑니다 &mdash; 같은 에이전트가 어노테이션을 추가한 후 각
            문제도 수정합니다.
          </p>
          <CodeBlock
            language="markdown"
            copyable
            code={`Self-driving mode on http://localhost:3000`}
          />
          <ol
            style={{
              fontSize: '0.8125rem',
              color: 'rgba(0,0,0,0.65)',
              marginTop: '0.5rem',
            }}
          >
            <li>에이전트가 페이지에 헤드풀 브라우저를 엽니다</li>
            <li>
              요소로 스크롤하여 비평 어노테이션을 추가합니다 (툴바에서 확인
              가능)
            </li>
            <li>관련 소스 코드를 읽고 문제를 수정하기 위해 편집합니다</li>
            <li>
              <code>agentation_resolve</code> 호출 &mdash; 브라우저에서
              어노테이션이 사라집니다
            </li>
            <li>
              브라우저에서 수정 사항을 확인합니다 (개발 서버가 실행 중인 경우)
            </li>
            <li>다음 요소로 이동하여 반복합니다</li>
          </ol>
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'rgba(0,0,0,0.55)',
              marginTop: '0.5rem',
            }}
          >
            하나의 Claude Code 세션이 브라우저, 코드, 어노테이션 모두를
            처리합니다.
          </p>

          <h3>필요 조건</h3>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(0,0,0,0.55)' }}>
            비평 모드의 모든 요건에 더해 자율 주행 스킬이 필요합니다:
          </p>
          <CodeBlock
            language="bash"
            copyable
            code={`ln -s "$(pwd)/skills/agentation-self-driving" ~/.claude/skills/agentation-self-driving`}
          />
        </section>

        <section>
          <h2 id="types">TypeScript 타입</h2>
          <p>직접 연동을 구축할 때 사용하는 핵심 타입:</p>
          <CodeBlock
            language="typescript"
            code={`import type {
  Annotation,
  AnnotationIntent,    // "fix" | "change" | "question" | "approve"
  AnnotationSeverity,  // "blocking" | "important" | "suggestion"
  AnnotationStatus,    // "pending" | "acknowledged" | "resolved" | "dismissed"
  Session,
  SessionStatus,       // "active" | "approved" | "closed"
  SessionWithAnnotations,
  ThreadMessage,
  AFSEvent,
  AFSEventType,
  ActionRequest,
} from 'agentation-mcp';`}
          />
        </section>
      </article>

      <Footer />
    </>
  );
}
