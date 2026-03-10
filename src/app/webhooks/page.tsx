'use client';

import { Footer } from '../Footer';
import { CodeBlock } from '../components/CodeBlock';
import { WebhooksDiagram } from '../components/WebhooksDiagram';

export default function WebhooksPage() {
  return (
    <>
      <article className="article">
        <header>
          <h1>웹훅(Webhooks)</h1>
          <p className="tagline">
            주석 이벤트를 외부 서비스에 자동으로 전송하기
          </p>
        </header>

        <section>
          <h2 id="overview">개요</h2>
          <p>
            웹훅을 사용하면 사용자가 주석과 상호작용할 때 외부 URL에서 주석
            데이터를 받을 수 있습니다. Slack, Discord, 커스텀 백엔드, CI/CD
            파이프라인 등과의 연동이 가능합니다.
          </p>
          <p>
            <code>webhookUrl</code> prop으로 웹훅 URL을 설정하면 주석이 생성,
            수정, 삭제되거나 제출될 때 이벤트가 자동으로 전송됩니다.
          </p>

          <WebhooksDiagram />
        </section>

        <section>
          <h2 id="configuration">설정</h2>
          <p>
            웹훅을 활성화하려면 <code>webhookUrl</code> prop을 추가하세요:
          </p>
          <CodeBlock
            language="tsx"
            copyable
            code={`import { Agentation } from "agentation";

function App() {
  return (
    <>
      <YourApp />
      <Agentation webhookUrl="https://your-server.com/webhook" />
    </>
  );
}`}
          />
          <p
            style={{
              marginTop: '0.75rem',
              fontSize: '0.8125rem',
              color: 'rgba(0,0,0,0.55)',
            }}
          >
            웹훅 URL이 설정되면 두 가지 옵션이 있습니다: 자동 전송(Auto-Send)을
            활성화하여 이벤트를 자동으로 발생시키거나, 툴바에서 &quot;주석
            전송&quot;을 수동으로 클릭하세요. 자동 전송이 켜지면 툴바 버튼이
            숨겨집니다.
          </p>
        </section>

        <section>
          <h2 id="events">이벤트</h2>
          <p>웹훅은 다음 이벤트에 대해 발생합니다:</p>
          <ul style={{ fontSize: '0.8125rem', color: 'rgba(0,0,0,0.65)' }}>
            <li>
              <code>annotation.add</code> &mdash; 새 주석 생성됨
            </li>
            <li>
              <code>annotation.delete</code> &mdash; 주석 삭제됨
            </li>
            <li>
              <code>annotation.update</code> &mdash; 주석 댓글 수정됨
            </li>
            <li>
              <code>annotations.clear</code> &mdash; 모든 주석 지워짐
            </li>
            <li>
              <code>submit</code> &mdash; &quot;주석 전송&quot; 클릭됨
            </li>
          </ul>
        </section>

        <section>
          <h2 id="webhook-payload">웹훅 페이로드</h2>
          <p>모든 이벤트는 다음 JSON 구조로 POST 요청을 전송합니다:</p>
          <CodeBlock
            language="json"
            code={`{
  "event": "annotation.add",
  "timestamp": 1706234567890,
  "url": "https://example.com/dashboard",
  "annotation": {
    "id": "1706234567890",
    "comment": "Button is cut off on mobile",
    "element": "button",
    "elementPath": "body > main > form > button.submit-btn",
    "timestamp": 1706234567890
  }
}`}
          />

          <h3 style={{ marginTop: '1.5rem' }}>이벤트별 페이로드</h3>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(0,0,0,0.65)' }}>
            <code>annotation.add</code> / <code>annotation.delete</code> /{' '}
            <code>annotation.update</code>
          </p>
          <CodeBlock
            language="json"
            code={`{
  "event": "annotation.add",
  "timestamp": 1706234567890,
  "url": "https://example.com/page",
  "annotation": { ... }
}`}
          />

          <p
            style={{
              marginTop: '1rem',
              fontSize: '0.8125rem',
              color: 'rgba(0,0,0,0.65)',
            }}
          >
            <code>annotations.clear</code>
          </p>
          <CodeBlock
            language="json"
            code={`{
  "event": "annotations.clear",
  "timestamp": 1706234567890,
  "url": "https://example.com/page",
  "annotations": [ ... ]
}`}
          />

          <p
            style={{
              marginTop: '1rem',
              fontSize: '0.8125rem',
              color: 'rgba(0,0,0,0.65)',
            }}
          >
            <code>submit</code>
          </p>
          <CodeBlock
            language="json"
            code={`{
  "event": "submit",
  "timestamp": 1706234567890,
  "url": "https://example.com/page",
  "output": "# Page Feedback\\n\\n...",
  "annotations": [ ... ]
}`}
          />
        </section>

        <section>
          <h2 id="client-callback">콜백과 함께 사용하기</h2>
          <p>
            웹훅을 <code>onSubmit</code> 및 기타 콜백 props와 함께 사용할 수
            있습니다. 이벤트 발생 시 두 가지 모두 실행됩니다:
          </p>
          <CodeBlock
            language="tsx"
            copyable
            code={`<Agentation
  webhookUrl="https://your-server.com/webhook"
  onSubmit={(output, annotations) => {
    // This fires in addition to the webhook
    console.log("Submitted:", annotations.length, "annotations");
  }}
  onAnnotationAdd={(annotation) => {
    // Track in analytics
    analytics.track("annotation_created");
  }}
/>`}
          />
        </section>

        <section>
          <h2 id="use-cases">활용 사례</h2>

          <h3>Slack 알림</h3>
          <CodeBlock
            language="typescript"
            code={`// Server webhook handler
app.post("/webhook/agentation", async (req, res) => {
  const { event, annotation, url } = req.body;

  if (event === "annotation.add") {
    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: \`New annotation on \${url}: "\${annotation.comment}"\`,
      }),
    });
  }

  res.json({ ok: true });
});`}
          />

          <h3>GitHub 이슈 생성</h3>
          <CodeBlock
            language="typescript"
            code={`app.post("/webhook/agentation", async (req, res) => {
  const { event, output, annotations } = req.body;

  if (event === "submit" && annotations.length > 0) {
    await fetch("https://api.github.com/repos/owner/repo/issues", {
      method: "POST",
      headers: {
        Authorization: \`Bearer \${process.env.GITHUB_TOKEN}\`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: \`[Feedback] \${annotations.length} annotation(s)\`,
        body: output,
        labels: ["feedback"],
      }),
    });
  }

  res.json({ ok: true });
});`}
          />

          <h3>실시간 대시보드</h3>
          <CodeBlock
            language="typescript"
            code={`// Server with WebSocket broadcast
app.post("/webhook/agentation", (req, res) => {
  const { event, annotation, url } = req.body;

  // Broadcast to connected dashboard clients
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({
      type: "annotation_event",
      event,
      annotation,
      url,
    }));
  });

  res.json({ ok: true });
});`}
          />
        </section>

        <section>
          <h2 id="security">보안 고려사항</h2>
          <ul>
            <li>
              <strong>HTTPS 사용</strong> &mdash; 웹훅 URL에는 항상 암호화된
              연결 사용
            </li>
            <li>
              <strong>출처 검증</strong> &mdash; 웹훅이 공개된 경우 요청 출처
              확인
            </li>
            <li>
              <strong>속도 제한(Rate limiting)</strong> &mdash; 남용을 방지하기
              위한 속도 제한 구현
            </li>
            <li>
              <strong>콘텐츠 정제</strong> &mdash; 주석 댓글에는 사용자 생성
              콘텐츠가 포함될 수 있으므로 렌더링 전에 정제 필요
            </li>
          </ul>
        </section>

        <section>
          <h2 id="testing">웹훅 테스트</h2>
          <p>개발 중 웹훅 테스트를 위한 도구들:</p>
          <ul style={{ fontSize: '0.8125rem', color: 'rgba(0,0,0,0.65)' }}>
            <li>
              <strong>webhook.site</strong> &mdash; 페이로드 테스트를 위한 무료
              공개 엔드포인트
            </li>
            <li>
              <strong>ngrok</strong> &mdash; 실제 URL로 테스트하기 위해 로컬
              서버를 외부에 노출
            </li>
            <li>
              <strong>RequestBin</strong> &mdash; 웹훅 페이로드 검사 및 디버그
            </li>
          </ul>

          <h3>빠른 테스트 설정</h3>
          <CodeBlock
            language="tsx"
            code={`// Use webhook.site for testing
<Agentation webhookUrl="https://webhook.site/your-unique-id" />

// Then create annotations and check webhook.site for payloads`}
          />
        </section>
      </article>

      <Footer />
    </>
  );
}
